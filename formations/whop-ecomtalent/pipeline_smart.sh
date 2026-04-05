#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# ECOMTALENT — Pipeline smart 1 vidéo à la fois
# Download audio → Whisper → Résumé Groq → SUPPRIMER audio → suivante
# ═══════════════════════════════════════════════════════════════

BASE="/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent"
SUMMARIES="$BASE/summaries"
TRANSCRIPTS="$BASE/transcripts"
TEMP="/tmp/smart_transcribe"
LOG="$BASE/pipeline_smart.log"
CREDS="$HOME/.openclaw/credentials/anthropic.env"
WHISPER="/Users/pc2/Library/Python/3.9/bin/whisper"
PYTHON3="/opt/homebrew/bin/python3"

mkdir -p "$SUMMARIES" "$TRANSCRIPTS" "$TEMP"
[ -f "$CREDS" ] && export $(grep -v '^#' "$CREDS" | xargs) 2>/dev/null
GROQ_KEY=$(grep GROQ_API_KEY "$CREDS" | cut -d= -f2)

log() { echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG"; }

# ─── SÉCURITÉ DISQUE ─────────────────────────────────────────
check_disk() {
  FREE_KB=$(df / | tail -1 | awk '{print $4}')
  FREE_GB=$(echo "scale=1; $FREE_KB / 1048576" | bc)
  log "💾 Disque : ${FREE_GB} GB libre"
  if (( FREE_KB < 1572864 )); then  # < 1.5 GB
    log "🔴 DISQUE CRITIQUE — ARRÊT"
    exit 99
  fi
}

# ─── GROQ RÉSUMÉ ─────────────────────────────────────────────
groq_summarize() {
  local title="$1" transcript="$2" outfile="$3"
  "$PYTHON3" - <<PYEOF
from groq import Groq
key = """$GROQ_KEY"""
title = """$title"""
with open("""$transcript""", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()[:20000]
if len(text.strip()) < 50:
    print("EMPTY"); exit(2)
client = Groq(api_key=key)
resp = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[{"role":"user","content":f"""Tu es Clawdbot Prime pour drinknellio.com.
Formation EcomTalent. Leçon : {title}

Résumé structuré en français :

# {title}
> Formation : EcomTalent — Meta Ads & E-Commerce

## 🎯 Concept Central
[2-3 phrases]

## 📌 Points Clés
[7-10 bullets avec chiffres si disponibles]

## 💡 Insights Actionnables
[4-6 actions numérotées]

## 🏪 Applications pour drinknellio.com
[3-5 applications — marché DE, Meta Ads, Nellio UltraCalm]

## ⚡ Citation Clé
> [phrase mémorable]

Transcription :
{text}"""}],
    max_tokens=2000, temperature=0.3)
summary = resp.choices[0].message.content
open("""$outfile""", "w", encoding="utf-8").write(summary)
print("OK:" + str(len(summary)))
PYEOF
}

# ─── MAIN ────────────────────────────────────────────────────
log "═══ ECOMTALENT SMART PIPELINE START $(date) ═══"
check_disk

HLS_FILE="$BASE/hls_urls.json"
if [ ! -f "$HLS_FILE" ]; then
  log "❌ hls_urls.json introuvable — tokens Whop requis"
  exit 1
fi

"$PYTHON3" - <<PYEOF
import json, os, subprocess, sys, time, shutil, glob

base = "$BASE"
summaries = "$SUMMARIES"
transcripts = "$TRANSCRIPTS"
temp = "$TEMP"
whisper = "$WHISPER"
log_file = "$LOG"

def log(msg):
    import datetime
    line = f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    with open(log_file, "a") as f: f.write(line + "\n")

def disk_ok():
    import shutil as sh
    free = sh.disk_usage("/").free / 1024**3
    return free > 1.5, free

def groq_summarize(title, transcript_file, outfile):
    result = subprocess.run(
        ["$PYTHON3", "$BASE/pipeline_smart.sh"],
        capture_output=True, text=True
    )
    # On va appeler groq directement en python ici
    try:
        from groq import Groq
        import os
        key = os.getenv("GROQ_API_KEY", "")
        if not key:
            with open("$CREDS") as f:
                for line in f:
                    if line.startswith("GROQ_API_KEY="):
                        key = line.strip().split("=",1)[1]
        with open(transcript_file, encoding="utf-8", errors="ignore") as f:
            text = f.read()[:20000]
        if len(text.strip()) < 50:
            return False
        client = Groq(api_key=key)
        resp = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role":"user","content":f"""Tu es Clawdbot Prime pour drinknellio.com.
Formation EcomTalent. Leçon : {title}

Résumé structuré en français :

# {title}
> Formation : EcomTalent — Meta Ads & E-Commerce

## 🎯 Concept Central
[2-3 phrases]

## 📌 Points Clés
[7-10 bullets avec chiffres si disponibles]

## 💡 Insights Actionnables
[4-6 actions numérotées]

## 🏪 Applications pour drinknellio.com
[3-5 applications directes — marché DE, Meta Ads, Nellio UltraCalm]

## ⚡ Citation Clé
> [phrase mémorable]

Transcription :
{text}"""}],
            max_tokens=2000, temperature=0.3)
        summary = resp.choices[0].message.content
        # ★ Ajouter lien vers transcript clean en tête de résumé
        lesson_id_local = os.path.basename(outfile).split("_")[0]  # lesn_XXXXX
        clean_rel = f"../transcripts/{lesson_id_local}_clean.md"
        transcript_link = f"> 📝 [Transcript complet fidèle]({clean_rel})\n\n"
        with open(outfile, "w", encoding="utf-8") as f:
            f.write(transcript_link + summary)
        return True
    except Exception as e:
        log(f"  ❌ Groq fail: {e}")
        return False

with open("$HLS_FILE") as f:
    lessons = json.load(f)

total = len(lessons)
done = 0; skipped = 0; failed = 0

for lesson_id, lesson in lessons.items():
    title = lesson.get("title", lesson_id)
    url = lesson.get("url", "")

    slug = title.lower()
    for c in " /\\:*?\"<>|": slug = slug.replace(c, "_")
    slug = slug[:45]

    summary_file = f"{summaries}/{lesson_id}_{slug}.md"
    transcript_file = f"{transcripts}/{lesson_id}.txt"

    # Skip si déjà traité
    if os.path.exists(summary_file) and os.path.getsize(summary_file) > 200:
        log(f"[SKIP] {title}")
        skipped += 1
        continue

    if not url:
        log(f"[NOURL] {title} — tokens Whop requis")
        failed += 1
        continue

    ok, free = disk_ok()
    if not ok:
        log(f"🔴 DISQUE CRITIQUE ({free:.1f}GB) — ARRÊT")
        sys.exit(99)
    log(f"[{done+skipped+failed+1}/{total}] ▶ {title} | 💾 {free:.1f}GB")

    # 1. Download audio seulement (léger)
    tmp_audio = f"{temp}/{lesson_id}.m4a"
    os.makedirs(temp, exist_ok=True)

    log(f"  ⬇️  Download audio...")
    ret = subprocess.run([
        "yt-dlp",
        "--format", "bestaudio[ext=m4a]/bestaudio/best",
        "--output", tmp_audio,
        "--no-playlist",
        "--limit-rate", "5M",
        "--quiet", "--no-warnings",
        url
    ], capture_output=True, timeout=300)

    if ret.returncode != 0 or not os.path.exists(tmp_audio):
        err = ret.stderr.decode()[:150]
        log(f"  ❌ Download fail: {err}")
        failed += 1
        continue

    size_mb = os.path.getsize(tmp_audio) / 1024**2
    log(f"  ✅ Audio {size_mb:.0f}MB téléchargé")

    # 2. Whisper
    if not os.path.exists(transcript_file):
        log(f"  🎙️  Whisper...")
        ret2 = subprocess.run([
            whisper, tmp_audio,
            "--model", "large-v3-turbo",
            "--language", "en",
            "--output_format", "txt",
            "--output_dir", temp,
            "--fp16", "False",
            "--verbose", "False"
        ], capture_output=True, timeout=1800)

        whisper_out = f"{temp}/{lesson_id}.txt"
        # Chercher le fichier généré par Whisper (peut avoir un nom différent)
        for f in glob.glob(f"{temp}/*.txt"):
            if os.path.basename(tmp_audio).replace(".m4a","") in f or lesson_id in f:
                whisper_out = f
                break

        # ★ SUPPRIMER L'AUDIO IMMÉDIATEMENT
        if os.path.exists(tmp_audio):
            os.remove(tmp_audio)
            log(f"  🗑️  Audio supprimé → disque libéré")

        if os.path.exists(whisper_out) and os.path.getsize(whisper_out) > 50:
            shutil.copy(whisper_out, transcript_file)
            os.remove(whisper_out)
            log(f"  ✅ Transcript {os.path.getsize(transcript_file)//1024}KB sauvegardé")
            # ★ Formater le transcript en markdown lisible (100% fidèle)
            clean_file = f"{transcripts}/{lesson_id}_clean.md"
            try:
                import sys as _sys
                _sys.path.insert(0, base)
                from format_transcript import process_file
                if process_file(transcript_file, clean_file, title):
                    log(f"  📄 Transcript clean → {lesson_id}_clean.md")
            except Exception as _e:
                log(f"  ⚠️ Format transcript fail: {_e}")
        else:
            log(f"  ❌ Whisper fail")
            failed += 1
            time.sleep(2)
            continue
    else:
        # Audio déjà téléchargé mais pas utilisé → supprimer quand même
        if os.path.exists(tmp_audio):
            os.remove(tmp_audio)
        log(f"  ✅ Transcript existant")

    # 3. Groq résumé
    log(f"  🧠 Groq résumé...")
    if groq_summarize(title, transcript_file, summary_file):
        log(f"  ✅ Résumé OK")
        done += 1
    else:
        failed += 1

    time.sleep(3)  # Éviter rate limit Groq + laisser souffler le disque

log(f"═══ DONE : {done} résumés | {skipped} skips | {failed} fails ═══")
PYEOF
