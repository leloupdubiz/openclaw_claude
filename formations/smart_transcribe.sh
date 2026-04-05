#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════
# SMART TRANSCRIBE — Pipeline universel formation
# Mode : 1 vidéo à la fois → transcrit → supprime → suivante
# Compatible : YouTube (transcript API), MEGA (Whisper), URLs directes
# Usage : ./smart_transcribe.sh --project <nom> --source <youtube|mega|local>
#         --input <playlist_url|mega_url|dossier> --output <dossier_summaries>
# ═══════════════════════════════════════════════════════════════════════

set -euo pipefail

# ─── CONFIG ──────────────────────────────────────────────────────────────
WHISPER_BIN="/Users/pc2/Library/Python/3.9/bin/whisper"
PYTHON3_GROQ="/opt/homebrew/bin/python3"
PYTHON3_WHISPER="/usr/bin/python3"
WORKSPACE="/Users/pc2/.openclaw/workspace"
CREDS="$HOME/.openclaw/credentials/anthropic.env"
TEMP_DIR="/tmp/smart_transcribe"
LOG_DIR="$WORKSPACE/formations/logs"

# Seuils disque
DISK_WARN_GB=3      # Alerte si < 3 GB
DISK_STOP_GB=1.5    # Stop si < 1.5 GB

# ─── ARGS ────────────────────────────────────────────────────────────────
PROJECT=""
SOURCE=""
INPUT=""
OUTPUT=""
LANG="fr"
MODEL_SIZE="large-v3-turbo"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project)  PROJECT="$2";  shift 2 ;;
    --source)   SOURCE="$2";   shift 2 ;;
    --input)    INPUT="$2";    shift 2 ;;
    --output)   OUTPUT="$2";   shift 2 ;;
    --lang)     LANG="$2";     shift 2 ;;
    --model)    MODEL_SIZE="$2"; shift 2 ;;
    *) echo "Arg inconnu : $1"; exit 1 ;;
  esac
done

# Validation
[ -z "$PROJECT" ] && echo "❌ --project requis" && exit 1
[ -z "$SOURCE"  ] && echo "❌ --source requis (youtube|mega|local)" && exit 1
[ -z "$INPUT"   ] && echo "❌ --input requis" && exit 1
[ -z "$OUTPUT"  ] && OUTPUT="$WORKSPACE/formations/$PROJECT/summaries"

# ─── INIT ────────────────────────────────────────────────────────────────
mkdir -p "$TEMP_DIR" "$OUTPUT" "$LOG_DIR"
[ -f "$CREDS" ] && export $(grep -v '^#' "$CREDS" | xargs) 2>/dev/null

GROQ_KEY=$(grep GROQ_API_KEY "$CREDS" 2>/dev/null | cut -d= -f2)
LOG="$LOG_DIR/${PROJECT}-$(date +%Y%m%d).log"
PROGRESS_FILE="$WORKSPACE/formations/$PROJECT/progress.json"

# ─── HELPERS ─────────────────────────────────────────────────────────────
log() { echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG"; }

disk_free_gb() {
  df / | tail -1 | awk '{print $4}' | xargs -I{} python3 -c "print(round({}/1048576, 1))"
}

check_disk() {
  local free=$(disk_free_gb)
  local free_int=$(echo "$free" | cut -d. -f1)
  if (( $(echo "$free < $DISK_STOP_GB" | bc -l) )); then
    log "☠️  DISQUE CRITIQUE : ${free} GB — ARRÊT D'URGENCE"
    notify_discord "☠️ **ARRÊT URGENCE** — Disque ${free} GB (< ${DISK_STOP_GB} GB)\nPipeline ${PROJECT} stoppé."
    exit 99
  fi
  if (( $(echo "$free < $DISK_WARN_GB" | bc -l) )); then
    log "🔴 ALERTE DISQUE : ${free} GB libre — stop downloads lourds"
    notify_discord "🔴 **ALERTE DISQUE** — ${free} GB libre\nPipeline ${PROJECT} suspendu."
    exit 98
  fi
  log "💾 Disque OK : ${free} GB libre"
}

notify_discord() {
  local msg="$1"
  # Via openclaw CLI (si disponible)
  openclaw message send --channel discord --to "channel:1476994301803102312" --message "$msg" 2>/dev/null || true
}

# ─── GROQ SUMMARIZE ──────────────────────────────────────────────────────
groq_summarize() {
  local title="$1"
  local transcript_file="$2"
  local outfile="$3"
  local project="$4"

  "$PYTHON3_GROQ" - <<PYEOF
import sys
try:
    from groq import Groq
except ImportError:
    sys.exit(1)

key = """$GROQ_KEY"""
title = """$title"""
project = """$project"""

with open("""$transcript_file""", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()[:20000]

if len(text.strip()) < 100:
    print("EMPTY_TRANSCRIPT")
    sys.exit(2)

client = Groq(api_key=key)
prompt = f"""Tu es Clawdbot Prime, AI Chief E-Commerce Operator pour drinknellio.com.
Formation : {project}
Titre de la leçon/vidéo : {title}

Produis un résumé structuré dense et actionnable en français :

# {title}
> Formation : {project}

## 🎯 Concept Central
[2-3 phrases — l'idée maîtresse, ce qui la rend unique]

## 📌 Points Clés
[7-10 bullets — les insights les plus denses, avec chiffres si disponibles]

## 💡 Insights Actionnables
[4-6 actions numérotées, concrètes, exécutables immédiatement]

## 🏪 Applications pour drinknellio.com
[3-5 applications directes — marché DE, Meta Ads, anti-stress/sommeil, avatar Nellio]

## ⚡ Citation Clé
> [la phrase la plus mémorable ou chiffre le plus impactant]

## 🔗 Connexions
[1-2 liens avec d'autres frameworks/formations déjà connus — EVOLVE, Pelegrini, etc.]

Transcription :
{text}
"""

resp = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[{"role":"user","content":prompt}],
    max_tokens=2200,
    temperature=0.3
)
summary = resp.choices[0].message.content
with open("""$outfile""", "w", encoding="utf-8") as f:
    f.write(summary)
print("OK:" + str(len(summary)))
PYEOF
}

# ─── TRANSCRIPT YOUTUBE ───────────────────────────────────────────────────
youtube_transcript() {
  local vid_id="$1"
  local outfile="$2"
  "$PYTHON3_GROQ" -c "
from youtube_transcript_api import YouTubeTranscriptApi
import sys
api = YouTubeTranscriptApi()
try:
    t = api.fetch('$vid_id')
    text = ' '.join([x.text for x in t])
    open('$outfile','w',encoding='utf-8').write(text)
    print('OK:'+str(len(text)))
except Exception as e:
    print('ERROR:'+str(e))
    sys.exit(1)
" 2>/dev/null
}

# ─── TRANSCRIPT WHISPER (avec download + suppression immédiate) ───────────
whisper_transcribe() {
  local url="$1"
  local title="$2"
  local outfile="$3"
  local tmp_video="$TEMP_DIR/$(echo "$title" | tr ' ' '_' | tr -dc '[:alnum:]_').mp4"

  log "  ⬇️  Download : $title"
  check_disk  # Vérifier avant chaque téléchargement

  # Télécharger audio seulement (beaucoup plus léger que vidéo)
  yt-dlp \
    --format "bestaudio[ext=m4a]/bestaudio" \
    --output "$tmp_video" \
    --no-playlist \
    --limit-rate 5M \
    --quiet \
    "$url" 2>>"$LOG"

  if [ ! -f "$tmp_video" ] || [ ! -s "$tmp_video" ]; then
    log "  ❌ Download fail : $title"
    return 1
  fi

  local size=$(du -sh "$tmp_video" | cut -f1)
  log "  🎙️  Whisper ($size) : $title"

  # Whisper → transcript
  "$WHISPER_BIN" "$tmp_video" \
    --model "$MODEL_SIZE" \
    --language "$LANG" \
    --output_format txt \
    --output_dir "$TEMP_DIR" \
    --fp16 False \
    --verbose False \
    2>>"$LOG"

  # Trouver le fichier txt généré
  local transcript_raw="$TEMP_DIR/$(basename "${tmp_video%.*}").txt"

  if [ -f "$transcript_raw" ]; then
    mv "$transcript_raw" "$outfile"
    log "  ✅ Transcript OK"
  else
    log "  ❌ Whisper output introuvable"
    rm -f "$tmp_video"
    return 1
  fi

  # ★ SUPPRESSION IMMÉDIATE de la vidéo
  rm -f "$tmp_video"
  log "  🗑️  Vidéo supprimée → disque libéré"
  return 0
}

# ─── PIPELINE MEGA ───────────────────────────────────────────────────────
process_mega() {
  log "📂 Source : MEGA — $INPUT"
  local project_dir="$WORKSPACE/formations/$PROJECT"
  local transcripts_dir="$project_dir/transcripts"
  mkdir -p "$transcripts_dir"

  # Lister les fichiers via megals ou index json si disponible
  local index_file="$project_dir/hls_urls.json"
  if [ -f "$index_file" ]; then
    log "📋 Index HLS trouvé : $index_file"
    "$PYTHON3_GROQ" - <<PYEOF
import json, os, subprocess, sys, time

with open("$index_file") as f:
    lessons = json.load(f)

project_dir = "$project_dir"
transcripts_dir = "$transcripts_dir"
output_dir = "$OUTPUT"
progress_file = "$project_dir/progress_smart.json"

# Charger ou init le progress
if os.path.exists(progress_file):
    with open(progress_file) as f:
        progress = json.load(f)
else:
    progress = {}

for lesson_id, lesson in lessons.items():
    title = lesson.get("title", lesson_id)
    url = lesson.get("url", "")
    slug = title.lower().replace(" ","_").replace("/","_")[:40]
    transcript_file = f"{transcripts_dir}/{lesson_id}.txt"
    summary_glob = f"{output_dir}/{lesson_id}*.md"

    # Skip si résumé déjà existant
    import glob
    if glob.glob(summary_glob) or progress.get(lesson_id) == "done":
        print(f"[SKIP] {title}")
        continue

    if not url:
        print(f"[NOURL] {title}")
        continue

    print(f"[START] {title}")

    # Download audio seulement
    tmp_audio = f"/tmp/smart_transcribe/{lesson_id}.m4a"
    os.makedirs("/tmp/smart_transcribe", exist_ok=True)

    ret = subprocess.run([
        "yt-dlp", "--format", "bestaudio[ext=m4a]/bestaudio",
        "--output", tmp_audio, "--no-playlist", "--limit-rate", "5M",
        "--quiet", url
    ], capture_output=True)

    if ret.returncode != 0 or not os.path.exists(tmp_audio):
        print(f"[DL_FAIL] {title}: {ret.stderr.decode()[:200]}")
        progress[lesson_id] = "dl_fail"
        with open(progress_file,"w") as f: json.dump(progress, f, indent=2)
        continue

    size_mb = os.path.getsize(tmp_audio)/1024/1024
    print(f"[DL_OK] {size_mb:.1f} MB — launching Whisper")

    # Whisper
    ret2 = subprocess.run([
        "$WHISPER_BIN", tmp_audio,
        "--model", "$MODEL_SIZE",
        "--language", "$LANG",
        "--output_format", "txt",
        "--output_dir", "/tmp/smart_transcribe",
        "--fp16", "False", "--verbose", "False"
    ], capture_output=True)

    # Supprimer immédiatement l'audio
    os.remove(tmp_audio)
    print(f"[DEL] Audio supprimé")

    txt_out = f"/tmp/smart_transcribe/{lesson_id}.txt"
    if not os.path.exists(txt_out):
        print(f"[WHISPER_FAIL] {title}")
        progress[lesson_id] = "whisper_fail"
        with open(progress_file,"w") as f: json.dump(progress, f, indent=2)
        continue

    # Copier transcript
    import shutil
    shutil.copy(txt_out, transcript_file)
    os.remove(txt_out)

    print(f"[TRANSCRIPT_OK] {os.path.getsize(transcript_file)} bytes")
    progress[lesson_id] = "transcribed"
    with open(progress_file,"w") as f: json.dump(progress, f, indent=2)
    time.sleep(1)  # Pause courte

print("[DONE] Transcription MEGA terminée")
PYEOF
  fi
}

# ─── PIPELINE YOUTUBE ─────────────────────────────────────────────────────
process_youtube() {
  log "📺 Source : YouTube — $INPUT"
  local project_dir="$WORKSPACE/formations/$PROJECT"
  local transcripts_dir="$project_dir/transcripts"
  mkdir -p "$transcripts_dir"

  # Récupérer la liste des vidéos
  log "📋 Récupération playlist..."
  local videos_json="$TEMP_DIR/${PROJECT}_playlist.json"
  yt-dlp --flat-playlist \
    --print-json \
    "$INPUT" 2>/dev/null > "$videos_json" || true

  local count=$(wc -l < "$videos_json" | tr -d ' ')
  log "🎬 $count vidéos trouvées"

  local num=0
  while IFS= read -r line; do
    ((num++))
    local vid_id=$(echo "$line" | "$PYTHON3_GROQ" -c "import json,sys; d=json.load(sys.stdin); print(d.get('id',''))")
    local title=$(echo "$line" | "$PYTHON3_GROQ" -c "import json,sys; d=json.load(sys.stdin); print(d.get('title','video_$num')[:60])")
    local duration=$(echo "$line" | "$PYTHON3_GROQ" -c "import json,sys; d=json.load(sys.stdin); print(d.get('duration',0))")

    [ -z "$vid_id" ] && continue

    # Nommer les fichiers
    local slug=$(echo "$title" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | tr -dc '[:alnum:]-' | cut -c1-40)
    local transcript_file="$transcripts_dir/$(printf '%02d' $num)-${vid_id}.txt"
    local summary_file="$OUTPUT/$(printf '%02d' $num)-${slug}.md"

    # Skip si déjà traité
    if [ -f "$summary_file" ]; then
      log "[$(printf '%02d' $num)/$count] ✅ SKIP — $title"
      continue
    fi

    # Skip vidéos > 4h (trop lourdes sans validation)
    if [ "$duration" -gt 14400 ] 2>/dev/null; then
      log "[$(printf '%02d' $num)/$count] ⏭️  SKIP (>4h) — $title (${duration}s)"
      continue
    fi

    log "[$(printf '%02d' $num)/$count] ▶ $title"
    check_disk

    # 1. Essayer transcript API YouTube d'abord (gratuit, rapide, pas de download)
    if [ ! -f "$transcript_file" ]; then
      log "  🔤 Transcript API YouTube..."
      local result=$(youtube_transcript "$vid_id" "$transcript_file" 2>/dev/null)
      if echo "$result" | grep -q "^OK"; then
        log "  ✅ Transcript API OK"
      else
        log "  ⚠️  API fail — fallback Whisper"
        rm -f "$transcript_file"
        # Fallback : Whisper avec download+suppression
        whisper_transcribe "https://youtube.com/watch?v=$vid_id" "$title" "$transcript_file" || {
          log "  ❌ Fail total — skip"
          continue
        }
      fi
    fi

    # 2. Résumé Groq
    if [ -f "$transcript_file" ] && [ -s "$transcript_file" ]; then
      log "  🧠 Groq résumé..."
      local gresult=$(groq_summarize "$title" "$transcript_file" "$summary_file" "$PROJECT" 2>/dev/null)
      if echo "$gresult" | grep -q "^OK"; then
        log "  ✅ Résumé OK — $summary_file"
        # Garder les transcripts (petits fichiers texte, utiles)
        # Pas besoin de les supprimer contrairement aux vidéos
      elif echo "$gresult" | grep -q "EMPTY"; then
        log "  ⚠️  Transcript vide"
      else
        log "  ❌ Groq fail"
      fi
    fi

    sleep 2  # Éviter rate limit Groq

  done < "$videos_json"
}

# ─── PIPELINE LOCAL ───────────────────────────────────────────────────────
process_local() {
  log "📁 Source : Local — $INPUT"
  local transcripts_dir="$WORKSPACE/formations/$PROJECT/transcripts"
  mkdir -p "$transcripts_dir"

  local count=$(ls "$INPUT"/*.mp4 "$INPUT"/*.mp3 "$INPUT"/*.m4a "$INPUT"/*.mkv "$INPUT"/*.mov 2>/dev/null | wc -l | tr -d ' ')
  log "🎬 $count fichiers audio/vidéo trouvés"

  local num=0
  for video in "$INPUT"/*.mp4 "$INPUT"/*.mp3 "$INPUT"/*.m4a "$INPUT"/*.mkv "$INPUT"/*.mov 2>/dev/null; do
    [ -f "$video" ] || continue
    ((num++))

    local title=$(basename "$video" | sed 's/\.[^.]*$//')
    local slug=$(echo "$title" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | tr -dc '[:alnum:]-' | cut -c1-40)
    local transcript_file="$transcripts_dir/$(printf '%02d' $num)-${slug}.txt"
    local summary_file="$OUTPUT/$(printf '%02d' $num)-${slug}.md"

    [ -f "$summary_file" ] && log "[$(printf '%02d' $num)] ✅ SKIP — $title" && continue

    log "[$(printf '%02d' $num)/$count] ▶ $title"
    check_disk

    # Whisper
    log "  🎙️  Whisper..."
    "$WHISPER_BIN" "$video" \
      --model "$MODEL_SIZE" \
      --language "$LANG" \
      --output_format txt \
      --output_dir "$transcripts_dir" \
      --fp16 False --verbose False 2>>"$LOG"

    local txt_out="$transcripts_dir/$title.txt"
    if [ -f "$txt_out" ]; then
      mv "$txt_out" "$transcript_file"
      log "  ✅ Transcript OK"

      # ★ SUPPRIMER la vidéo source immédiatement
      rm -f "$video"
      log "  🗑️  Vidéo supprimée : $video"

      # Groq
      log "  🧠 Groq..."
      groq_summarize "$title" "$transcript_file" "$summary_file" "$PROJECT" 2>/dev/null && log "  ✅ Résumé OK"
    else
      log "  ❌ Whisper fail"
    fi

    sleep 2
  done
}

# ─── MAIN ─────────────────────────────────────────────────────────────────
log "════════════════════════════════════════════════════════"
log "🚀 SMART TRANSCRIBE — Projet : $PROJECT"
log "📂 Source : $SOURCE | Input : $INPUT"
log "📤 Output : $OUTPUT"
log "════════════════════════════════════════════════════════"
check_disk

case "$SOURCE" in
  youtube) process_youtube ;;
  mega)    process_mega    ;;
  local)   process_local   ;;
  *)
    log "❌ Source inconnue : $SOURCE (youtube|mega|local)"
    exit 1
    ;;
esac

# Bilan
DONE=$(ls "$OUTPUT"/*.md 2>/dev/null | wc -l | tr -d ' ')
log "════════════════════════════════════════════════════════"
log "✅ TERMINÉ — $DONE résumés dans $OUTPUT"
log "💾 Disque final : $(disk_free_gb) GB libre"

notify_discord "✅ **Pipeline $PROJECT terminé**\n→ $DONE résumés générés\n→ Intégration bibliothèque : lancez la mise à jour library"
