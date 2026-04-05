#!/bin/bash
# Pipeline EcomTalent v2 — yt-dlp + Whisper + Groq
# 69 leçons, Mux HLS sans token

BASE="/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent"
TRANSCRIPTS="$BASE/transcripts"
SUMMARIES="$BASE/summaries"
TMP="/tmp/ecomtalent_dl"
LOG="$BASE/pipeline_v2.log"
WHISPER_BIN="/Users/pc2/Library/Python/3.9/bin/whisper"
GROQ_SCRIPT="$BASE/groq_summary.py"
SPEED_LIMIT="3000"  # 3 MB/s

mkdir -p "$TRANSCRIPTS" "$SUMMARIES" "$TMP"

echo "=== PIPELINE V2 START $(date) ===" >> "$LOG"

# Read all 69 lessons from JSON
python3 - << 'PYEOF'
import json, os, subprocess, time, sys

BASE = "/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent"
TRANSCRIPTS = f"{BASE}/transcripts"
SUMMARIES = f"{BASE}/summaries"
TMP = "/tmp/ecomtalent_dl"
LOG = f"{BASE}/pipeline_v2.log"
WHISPER = "/Users/pc2/Library/Python/3.9/bin/whisper"
GROQ_KEY_CMD = "grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2"

# Load lesson data
with open(f"{BASE}/hls_urls_v2.json") as f:
    lessons = json.load(f)

def log(msg):
    ts = time.strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    with open(LOG, "a") as f:
        f.write(line + "\n")

def already_done(lesson_id, title):
    """Check if transcript AND summary exist"""
    tid = lesson_id or title.lower().replace(' ','_')[:30]
    for f in os.listdir(TRANSCRIPTS):
        if lesson_id in f or tid in f:
            # Check if summary also exists
            base = f.replace('.txt','')
            for sf in os.listdir(SUMMARIES):
                if lesson_id in sf or tid in sf:
                    return True
    return False

def get_transcript_path(lesson_id):
    for f in os.listdir(TRANSCRIPTS):
        if lesson_id in f:
            return f"{TRANSCRIPTS}/{f}"
    return None

for lesson in lessons:
    idx = lesson['idx']
    lesson_id = lesson['id']
    pid = lesson['pid']
    title = lesson['t']
    safe_title = "".join(c if c.isalnum() or c in ' -_' else '' for c in title)[:50].strip()
    
    # Skip if already fully processed
    if already_done(lesson_id, safe_title):
        log(f"[{idx+1}/69] SKIP (done): {title[:50]}")
        continue
    
    # Check if transcript already exists (need only summary)
    existing_transcript = get_transcript_path(lesson_id)
    
    if not existing_transcript:
        log(f"[{idx+1}/69] ⬇️  DL: {title[:50]}")
        mux_url = f"https://stream.mux.com/{pid}.m3u8"
        out_file = f"{TMP}/{lesson_id}.mp3"
        
        # Download with yt-dlp
        dl_cmd = [
            "/opt/homebrew/bin/yt-dlp",
            "-x", "--audio-format", "mp3",
            "--audio-quality", "3",
            "--limit-rate", "3M",
            "--no-check-certificates",
            "--socket-timeout", "30",
            "-o", out_file,
            "--force-overwrites",
            mux_url
        ]
        
        result = subprocess.run(dl_cmd, capture_output=True, text=True, timeout=300)
        
        if result.returncode != 0 or not os.path.exists(out_file):
            log(f"[{idx+1}/69] ❌ DL FAIL: {result.stderr[-200:]}")
            continue
        
        file_size = os.path.getsize(out_file) / (1024*1024)
        log(f"[{idx+1}/69] ✅ DL OK ({file_size:.1f}MB) — Whisper...")
        
        # Transcribe with Whisper
        whisper_cmd = [
            WHISPER, out_file,
            "--model", "base",
            "--language", "en",
            "--output_format", "txt",
            "--output_dir", TRANSCRIPTS
        ]
        
        w_result = subprocess.run(whisper_cmd, capture_output=True, text=True, timeout=1800)
        
        # Cleanup audio
        os.remove(out_file)
        
        if w_result.returncode != 0:
            log(f"[{idx+1}/69] ❌ WHISPER FAIL: {w_result.stderr[-200:]}")
            continue
        
        # Find transcript file and rename with lesson_id
        for f in os.listdir(TRANSCRIPTS):
            if lesson_id in f or (safe_title[:10].lower() in f.lower() and f.endswith('.txt')):
                new_name = f"{lesson_id}.txt"
                os.rename(f"{TRANSCRIPTS}/{f}", f"{TRANSCRIPTS}/{new_name}")
                existing_transcript = f"{TRANSCRIPTS}/{new_name}"
                break
        
        if not existing_transcript:
            # Find most recently created .txt file
            txts = [f for f in os.listdir(TRANSCRIPTS) if f.endswith('.txt')]
            if txts:
                latest = max(txts, key=lambda x: os.path.getctime(f"{TRANSCRIPTS}/{x}"))
                new_name = f"{lesson_id}.txt"
                os.rename(f"{TRANSCRIPTS}/{latest}", f"{TRANSCRIPTS}/{new_name}")
                existing_transcript = f"{TRANSCRIPTS}/{new_name}"
        
        log(f"[{idx+1}/69] 🎙️  Transcript: {existing_transcript}")
    
    # Generate summary with Groq
    if existing_transcript and os.path.exists(existing_transcript):
        log(f"[{idx+1}/69] 🧠 Groq summary: {title[:50]}")
        
        with open(existing_transcript) as f:
            transcript_text = f.read()
        
        # Build summary with Groq
        groq_py = f'''
import os, sys
sys.path.insert(0, '/opt/homebrew/lib/python3.14/site-packages')
from groq import Groq

key = os.popen("grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2").read().strip()
client = Groq(api_key=key)

title = {repr(title)}
transcript = open({repr(existing_transcript)}).read()[:25000]

prompt = f"""You are a marketing expert summarizing an ecommerce ad creative course lesson.

Lesson: {{title}}
Transcript:
{{transcript}}

Write a structured summary in this format:
# {{title}}

## Core Concept
[2-3 sentences on the main idea]

## Key Points
[5-8 bullet points with the most actionable insights]

## Actionable Steps
[3-5 numbered actions to implement immediately]

## Application for drinknellio.com
[2-3 specific applications for a German market anti-stress drink brand]

## Key Quote
> [most memorable quote from the lesson]
"""

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{{"role":"user","content":prompt}}],
    max_tokens=1500
)
print(response.choices[0].message.content)
'''
        
        summary_path = f"{SUMMARIES}/{lesson_id}_summary.md"
        groq_result = subprocess.run(
            ["python3", "-c", groq_py],
            capture_output=True, text=True, timeout=120
        )
        
        if groq_result.returncode == 0 and groq_result.stdout.strip():
            with open(summary_path, "w") as f:
                f.write(groq_result.stdout)
            log(f"[{idx+1}/69] ✅ Summary saved: {summary_path}")
        else:
            log(f"[{idx+1}/69] ❌ GROQ FAIL: {groq_result.stderr[-200:]}")
    
    # Small pause between lessons
    time.sleep(2)

log("=== PIPELINE V2 DONE ===")
PYEOF

echo "Pipeline done: $(date)" >> "$LOG"
