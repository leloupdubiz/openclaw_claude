#!/usr/bin/env python3
"""
EcomTalent Full Pipeline — Download + Whisper + Groq
Signed URLs captured 2026-02-28, expire 2026-04-26
"""
import os, json, subprocess, time, sys

BASE = "/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent"
TRANSCRIPTS = f"{BASE}/transcripts"
SUMMARIES = f"{BASE}/summaries"
CONTENT_DIR = f"{BASE}/content"
LOG = f"{BASE}/pipeline_v2.log"
WHISPER = "/Users/pc2/Library/Python/3.9/bin/whisper"
YTDLP = "/opt/homebrew/bin/yt-dlp"

os.makedirs(TRANSCRIPTS, exist_ok=True)
os.makedirs(SUMMARIES, exist_ok=True)
os.makedirs(CONTENT_DIR, exist_ok=True)

# Load signed URLs from localStorage JSON file (written by browser)
SIGNED_JSON = f"{BASE}/signed_urls.json"

def log(msg):
    ts = time.strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    with open(LOG, "a") as f:
        f.write(line + "\n")

def get_groq_key():
    result = subprocess.run(
        "grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2",
        shell=True, capture_output=True, text=True
    )
    return result.stdout.strip()

def transcript_exists(lesson_id):
    return os.path.exists(f"{TRANSCRIPTS}/{lesson_id}.txt")

def summary_exists(lesson_id):
    return os.path.exists(f"{SUMMARIES}/{lesson_id}.md")

def download_video(lesson_id, signed_url, title):
    out_file = f"/tmp/ecom_{lesson_id}.mp4"
    if os.path.exists(out_file):
        os.remove(out_file)
    
    cmd = [
        YTDLP,
        "--no-check-certificates",
        "--limit-rate", "3M",
        "--socket-timeout", "30",
        "--retries", "3",
        "-o", out_file,
        "--merge-output-format", "mp4",
        "--quiet",
        signed_url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=1800)
    if result.returncode != 0 or not os.path.exists(out_file):
        return None, result.stderr[-300:]
    return out_file, None

def transcribe(audio_file, lesson_id):
    # Use Whisper base model (faster, good enough for English)
    cmd = [
        WHISPER, audio_file,
        "--model", "tiny",
        "--language", "en",
        "--output_format", "txt",
        "--output_dir", TRANSCRIPTS
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=1800)
    if result.returncode != 0:
        return False, result.stderr[-300:]
    
    # Rename output to lesson_id.txt
    base_name = os.path.splitext(os.path.basename(audio_file))[0]
    tmp_txt = f"{TRANSCRIPTS}/{base_name}.txt"
    target_txt = f"{TRANSCRIPTS}/{lesson_id}.txt"
    if os.path.exists(tmp_txt) and tmp_txt != target_txt:
        os.rename(tmp_txt, target_txt)
    elif not os.path.exists(target_txt):
        # Find most recent .txt in transcripts
        txts = [f for f in os.listdir(TRANSCRIPTS) if f.endswith('.txt') and lesson_id not in f]
        if txts:
            latest = max(txts, key=lambda x: os.path.getctime(f"{TRANSCRIPTS}/{x}"))
            os.rename(f"{TRANSCRIPTS}/{latest}", target_txt)
    
    return os.path.exists(target_txt), None

def generate_summary(lesson_id, title, groq_key):
    transcript_path = f"{TRANSCRIPTS}/{lesson_id}.txt"
    if not os.path.exists(transcript_path):
        return False, "No transcript"
    
    with open(transcript_path) as f:
        transcript = f.read()[:25000]
    
    groq_py = f'''
import sys
sys.path.insert(0, '/opt/homebrew/lib/python3.14/site-packages')
from groq import Groq
client = Groq(api_key={repr(groq_key)})
title = {repr(title)}
transcript = {repr(transcript)}
prompt = f"""Marketing expert summarizing an ecommerce ad creative training lesson.

Lesson: {{title}}
Transcript:
{{transcript}}

Structured summary:
# {{title}}

## Core Concept
[2-3 sentences on the main idea]

## Key Points
[5-8 bullet points with the most actionable insights]

## Actionable Steps
[3-5 numbered concrete actions]

## Application for Nellio UltraCalm (German market)
[2-3 specific applications for DE anti-stress drink brand on Meta Ads]

## Key Quote
> [most memorable quote]
"""
r = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{{"role":"user","content":prompt}}],
    max_tokens=1500,
    timeout=60
)
print(r.choices[0].message.content)
'''
    result = subprocess.run(
        ["python3", "-c", groq_py],
        capture_output=True, text=True, timeout=120
    )
    if result.returncode == 0 and result.stdout.strip():
        with open(f"{SUMMARIES}/{lesson_id}.md", "w") as f:
            f.write(result.stdout)
        return True, None
    return False, result.stderr[-300:]

def main():
    # Load lesson data
    if not os.path.exists(SIGNED_JSON):
        log(f"ERROR: {SIGNED_JSON} not found — run browser crawl first")
        sys.exit(1)
    
    with open(SIGNED_JSON) as f:
        lessons = json.load(f)
    
    groq_key = get_groq_key()
    if not groq_key:
        log("ERROR: No GROQ_API_KEY found")
        sys.exit(1)
    
    log(f"=== PIPELINE START — {len(lessons)} lessons, Groq key: {groq_key[:10]}... ===")
    
    stats = {"done": 0, "skipped": 0, "failed": 0}
    
    for lesson in lessons:
        idx = lesson['idx']
        lesson_id = lesson['id']
        signed_url = lesson['signedUrl']
        title = lesson['t']
        
        prefix = f"[{idx+1:02d}/69] {title[:45]}"
        
        # Skip if both transcript and summary exist
        has_transcript = transcript_exists(lesson_id)
        has_summary = summary_exists(lesson_id)
        
        if has_summary:
            log(f"SKIP {prefix}")
            stats["skipped"] += 1
            continue
        
        # Need to download if no transcript
        if not has_transcript:
            log(f"⬇️  {prefix}")
            audio_file, err = download_video(lesson_id, signed_url, title)
            if not audio_file:
                log(f"❌ DL FAIL {lesson_id}: {err}")
                stats["failed"] += 1
                continue
            
            size_mb = os.path.getsize(audio_file) / (1024*1024)
            log(f"🎙️  Whisper {prefix} ({size_mb:.0f}MB)")
            
            ok, err = transcribe(audio_file, lesson_id)
            os.remove(audio_file)  # Free disk space immediately
            
            if not ok:
                log(f"❌ WHISPER FAIL {lesson_id}: {err}")
                stats["failed"] += 1
                continue
            
            log(f"✅ Transcript {lesson_id}")
        
        # Generate summary
        log(f"🧠 Groq {prefix}")
        ok, err = generate_summary(lesson_id, title, groq_key)
        if ok:
            log(f"✅ Summary {lesson_id}")
            stats["done"] += 1
        else:
            log(f"❌ GROQ FAIL {lesson_id}: {err}")
            stats["failed"] += 1
        
        time.sleep(1)  # Brief pause between lessons
    
    log(f"=== DONE: {stats['done']} processed, {stats['skipped']} skipped, {stats['failed']} failed ===")

if __name__ == "__main__":
    main()
