#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# DAVIE FOGARTY — Pipeline smart 1 vidéo à la fois
# Transcript API YouTube → fallback Whisper → Résumé Groq → (supprime audio si Whisper) → suivante
# ═══════════════════════════════════════════════════════════════

BASE="/Users/pc2/.openclaw/workspace/formations/davie-fogarty"
SUMMARIES="$BASE/summaries"
TRANSCRIPTS="$BASE/transcripts"
TEMP="/tmp/smart_transcribe"
LOG="/tmp/davie-pipeline.log"
CREDS="$HOME/.openclaw/credentials/anthropic.env"
WHISPER="/Users/pc2/Library/Python/3.9/bin/whisper"
PYTHON3="/opt/homebrew/bin/python3"
DISCORD_CHANNEL="1476994301803102312"

mkdir -p "$SUMMARIES" "$TRANSCRIPTS" "$TEMP"
[ -f "$CREDS" ] && export $(grep -v '^#' "$CREDS" | xargs) 2>/dev/null
GROQ_KEY=$(grep GROQ_API_KEY "$CREDS" | cut -d= -f2)

log() { echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG"; }

log "═══ DAVIE FOGARTY PIPELINE START $(date) ═══"

# ─── TEST IP YOUTUBE ─────────────────────────────────────────
IP_OK=$("$PYTHON3" -c "
from youtube_transcript_api import YouTubeTranscriptApi
try:
    api = YouTubeTranscriptApi()
    api.fetch('pb7o1gY7Zg4')
    print('OK')
except Exception as e:
    print('BLOCKED')
" 2>/dev/null)

log "IP YouTube : $IP_OK"

"$PYTHON3" - <<PYEOF
import os, sys, subprocess, time, shutil, glob, json

base = "$BASE"
summaries = "$SUMMARIES"
transcripts = "$TRANSCRIPTS"
temp = "$TEMP"
whisper = "$WHISPER"
log_file = "$LOG"
groq_key = "$GROQ_KEY"
ip_ok = "$IP_OK" == "OK"

VIDEOS = [
    ("01", "567hU5QS_Wc", "10 Things To Guarantee Ecommerce Business Success - Oodie Founder"),
    ("02", "T2tagxLhlv4", "Shopify Tutorial For Beginners 2025 - COMPLETE GUIDE"),
    ("03", "_SV-lllg7J0", "Clickfunnels Tutorial For Beginners 2024"),
    ("04", "313GvO3pScc", "Complete E-commerce Operations Guide Advanced Tutorial"),
    ("05", "QPwQSqwjGX4", "How to Find Winning Shopify Products in 2024"),
    ("06", "MWW5hsZ6W8s", "How We Make Millions With Influencer Marketing"),
    ("07", "g0EkTJnrMto", "HOW TO SETUP KLAVIYO - Email Marketing Tutorial"),
    ("08", "pb7o1gY7Zg4", "5 SECRETS THEY WONT TELL YOU ABOUT E-COMMERCE"),
    ("09", "xUCMTXnBzKQ", "How I Find Products to Sell in 2024"),
    ("10", "hBUWHa9lHEI", "Watch THIS before Dropshipping - 27 Year Old Millionaire Davie Fogarty"),
    ("11", "jXCchw-c4GQ", "Facebook Ads Tutorial 2024 - How To Make Facebook Ads With Your Phone"),
    ("12", "iYJDR3qU9rk", "How To Run Facebook Ads in 2024 - Beginners Tutorial"),
    ("13", "AgNZaOczhs8", "How I Got Faster Shipping On Shopify"),
    ("14", "lYzD0XXd0Fs", "SHOPIFY TUTORIAL FOR BEGINNERS 2024 - 9 MISTAKES TO AVOID"),
    ("15", "p7T85ltBuIY", "How To Win At Facebook Ads in 2024"),
    ("16", "5gcSZVNmPWM", "Top 10 Shopify Apps You SHOULD BE Using In 2024"),
    ("17", "bY6xhE0GYTw", "TikTok Ads Tutorial 2024 - Start Here"),
    ("18", "oDQGbUI6YYE", "Google Ads Tutorial 2024 FREE ECOM COURSE for Beginners"),
    ("19", "qClPynP5prY", "Oodie Owner Reveals Secrets"),
    ("20", "BjsTbaZlnVo", "5 Tips to Find a Winning Product"),
    ("22", "Jm4uarya86o", "Watch This First - How To Launch An E-Commerce Business"),
    ("23", "zbWTbunM1Nk", "How I Made 200M With This Shopify Website"),
    ("24", "EBpBSiQTM8U", "How Easy It Is to Make Your FIRST Million"),
    ("25", "q9FLfCbWadY", "Think Twice Before You Dropship"),
    ("26", "yfZGZAyOfk8", "How to Double Your Business Success in 12 Minutes"),
    ("27", "2X_N6-WguPw", "Dropshipping is dead - Make a brand instead"),
    ("28", "FFgPr6gD4RE", "How To Scale Your Business Using 2 Key Concepts"),
    ("29", "7U8vYps8fMk", "How Licensing Really Works"),
    ("30", "x5H58apIw20", "How To Run Facebook Ads in 2024 Complete Guide"),
    ("31", "nzoD0mQAnls", "Email Marketing For Beginners Complete Tutorial 2024"),
    ("32", "hAq-Ia8R4DI", "850M Founder Reveals His Secret Hiring Formula"),
    ("33", "5zOIeBYhOyM", "Conversion Rate Optimisation CRO Double your Shopify sales"),
    ("34", "DTDIhdptOuw", "COMPLETE Shopify Tutorial For Beginners 2024"),
    ("35", "oqlxeWwyNV0", "Google Ads Complete Guide 2024"),
    ("36", "J0V6UD5kVYU", "The Secret to Making Viral Content That Actually Sells"),
    ("37", "z2duNKR4XHM", "How to Grow a Business Fast - 1B Founder Tips"),
    # #38 = 11h skippée intentionnellement
]

def log(msg):
    import datetime
    line = f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    with open(log_file, "a") as f: f.write(line + "\n")

def disk_free_gb():
    import shutil as sh
    return sh.disk_usage("/").free / 1024**3

def youtube_transcript(vid_id, outfile):
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        api = YouTubeTranscriptApi()
        t = api.fetch(vid_id)
        text = " ".join([x.text for x in t])
        with open(outfile, "w", encoding="utf-8") as f:
            f.write(text)
        return len(text) > 100
    except:
        return False

def whisper_transcribe(vid_id, title, outfile):
    """Download audio → Whisper → SUPPRIMER audio → return transcript path"""
    url = f"https://youtube.com/watch?v={vid_id}"
    tmp_audio = f"{temp}/{vid_id}.m4a"

    free = disk_free_gb()
    if free < 1.5:
        log(f"  🔴 Disque {free:.1f}GB — skip Whisper")
        return False

    log(f"  ⬇️  Download audio ({free:.1f}GB libre)...")
    ret = subprocess.run([
        "yt-dlp",
        "--format", "bestaudio[ext=m4a]/bestaudio/best",
        "--output", tmp_audio,
        "--no-playlist", "--limit-rate", "5M",
        "--quiet", "--no-warnings", url
    ], capture_output=True, timeout=300)

    if ret.returncode != 0 or not os.path.exists(tmp_audio):
        log(f"  ❌ DL fail")
        return False

    size_mb = os.path.getsize(tmp_audio) / 1024**2
    log(f"  🎙️  Whisper {size_mb:.0f}MB...")

    ret2 = subprocess.run([
        whisper, tmp_audio,
        "--model", "large-v3-turbo",
        "--language", "en",
        "--output_format", "txt",
        "--output_dir", temp,
        "--fp16", "False", "--verbose", "False"
    ], capture_output=True, timeout=1800)

    # ★ SUPPRIMER L'AUDIO IMMÉDIATEMENT après Whisper
    if os.path.exists(tmp_audio):
        os.remove(tmp_audio)
        log(f"  🗑️  Audio supprimé")

    # Trouver le txt Whisper
    txt_out = f"{temp}/{vid_id}.txt"
    if not os.path.exists(txt_out):
        for f in glob.glob(f"{temp}/*.txt"):
            txt_out = f; break

    if os.path.exists(txt_out):
        shutil.move(txt_out, outfile)
        log(f"  ✅ Transcript {os.path.getsize(outfile)//1024}KB")
        return True

    log(f"  ❌ Whisper output manquant")
    return False

def groq_summarize(title, transcript_file, outfile):
    try:
        from groq import Groq
        with open(transcript_file, encoding="utf-8", errors="ignore") as f:
            text = f.read()[:20000]
        if len(text.strip()) < 50:
            return False
        client = Groq(api_key=groq_key)
        resp = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role":"user","content":f"""Tu es Clawdbot Prime pour drinknellio.com.
Vidéo : {title} | Auteur : Davie Fogarty (fondateur Oodie, $850M+)
Formation : Fundamentals of Ecommerce

Résumé structuré en français :

# {title}
> Davie Fogarty | Fundamentals of Ecommerce

## 🎯 Concept Central
[2-3 phrases]

## 📌 Points Clés
[7-10 bullets avec chiffres]

## 💡 Insights Actionnables
[4-6 actions numérotées, concrètes]

## 🏪 Applications pour drinknellio.com
[3-5 applications directes — marché DE, Meta Ads, Nellio UltraCalm, scaling]

## ⚡ Citation Clé
> [phrase mémorable ou chiffre impactant]

Transcription :
{text}"""}],
            max_tokens=2000, temperature=0.3)
        with open(outfile, "w", encoding="utf-8") as f:
            f.write(resp.choices[0].message.content)
        return True
    except Exception as e:
        log(f"  ❌ Groq: {e}")
        return False

# ─── BOUCLE PRINCIPALE ───────────────────────────────────────
done = 0; skipped = 0; failed = 0

for num, vid_id, title in VIDEOS:
    slug = title.lower()
    for c in " /\\:*?\"<>|": slug = slug.replace(c, "_")
    slug = slug[:45]

    summary_file = f"{summaries}/{num}-{slug}.md"
    transcript_file = f"{transcripts}/{num}-{vid_id}.txt"

    # Skip si résumé déjà existant (format numéroté OU format vid_id)
    existing_by_vid = glob.glob(f"{summaries}/{vid_id}-*.md")
    if (os.path.exists(summary_file) and os.path.getsize(summary_file) > 200) or \
       (existing_by_vid and os.path.getsize(existing_by_vid[0]) > 200):
        log(f"[{num}] ✅ SKIP — {title}")
        skipped += 1
        continue

    free = disk_free_gb()
    log(f"[{num}/37] ▶ {title} | 💾 {free:.1f}GB")

    if free < 1.5:
        log(f"🔴 Disque {free:.1f}GB — ARRÊT")
        break

    # 1. Transcript : API YouTube d'abord (pas de download)
    if not os.path.exists(transcript_file) or os.path.getsize(transcript_file) < 100:
        if ip_ok and youtube_transcript(vid_id, transcript_file):
            log(f"  ✅ Transcript API YouTube")
        else:
            log(f"  ⚠️  API YouTube bloquée — fallback Whisper")
            if not whisper_transcribe(vid_id, title, transcript_file):
                failed += 1
                continue

    # 2. Résumé Groq
    log(f"  🧠 Groq...")
    if groq_summarize(title, transcript_file, summary_file):
        log(f"  ✅ OK → {os.path.basename(summary_file)}")
        done += 1
    else:
        failed += 1

    time.sleep(2)

log(f"═══ DONE : {done} résumés | {skipped} skips | {failed} fails ═══")

# Mise à jour INDEX.md
idx = f"{base}/INDEX.md"
if os.path.exists(idx):
    with open(idx) as f: content = f.read()
    count = len(glob.glob(f"{summaries}/*.md"))
    # Simple update count
    with open(f"{base}/pipeline_result.txt","w") as f:
        f.write(f"done={done}\nskipped={skipped}\nfailed={failed}\ntotal_summaries={count}\n")

PYEOF
