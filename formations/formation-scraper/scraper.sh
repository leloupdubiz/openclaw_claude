#!/bin/bash
# ============================================================
# FORMATION SCRAPER — Agent Pipeline Ultra-Optimisé
# Disk-aware · One-at-a-time · Auto-resume · Groq summary
# ============================================================

set -euo pipefail

# ── CONFIG ──────────────────────────────────────────────────
BASE="$HOME/.openclaw/workspace/formations/whop-ecomtalent"
SCRAPER_DIR="$HOME/.openclaw/workspace/formations/formation-scraper"
LESSONS_JSON="$SCRAPER_DIR/lessons.json"
LOG="$BASE/pipeline.log"
TRANSCRIPTS="$BASE/transcripts"
SUMMARIES="$BASE/summaries"
TMP_PREFIX="/tmp/fsc_"

WHISPER="/Users/pc2/Library/Python/3.9/bin/whisper"
WHISPER_MODEL="large-v3-turbo"

GROQ_KEY=$(grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2)

# Seuils disque (en KB)
DISK_MIN_KB=2097152      # 2.0 GB  → pause download
DISK_STOP_KB=1572864     # 1.5 GB  → arrêt complet
DISK_RESUME_KB=2621440   # 2.5 GB  → reprise après pause

# ── UTILITAIRES ─────────────────────────────────────────────
log() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"; }

disk_free_kb() { df / | tail -1 | awk '{print $4}'; }
disk_free_gb() { echo "scale=1; $(disk_free_kb) / 1048576" | bc; }

check_disk() {
  local avail; avail=$(disk_free_kb)
  if [ "$avail" -lt "$DISK_STOP_KB" ]; then
    log "☠️  STOP — Disque critique : $(disk_free_gb) GB libres"
    cleanup_tmp
    exit 2
  elif [ "$avail" -lt "$DISK_MIN_KB" ]; then
    log "⏸️  PAUSE — Disque bas : $(disk_free_gb) GB. Attente libération..."
    while [ "$(disk_free_kb)" -lt "$DISK_RESUME_KB" ]; do
      sleep 30
      log "💾  Attente... $(disk_free_gb) GB libres"
    done
    log "▶️  Reprise — $(disk_free_gb) GB libres"
  fi
}

cleanup_tmp() {
  rm -f "${TMP_PREFIX}"*.mp4 "${TMP_PREFIX}"*.txt 2>/dev/null || true
}

# ── DOWNLOAD ────────────────────────────────────────────────
download_lesson() {
  local id="$1" url="$2"
  local mp4="${TMP_PREFIX}${id}.mp4"

  check_disk

  log "⬇️  DOWNLOAD $id"
  # yt-dlp en mp4 direct (pas -x : évite bug codec ffprobe sur Mux HLS)
  if ! yt-dlp --quiet --no-warnings \
       --merge-output-format mp4 \
       -o "$mp4" "$url" 2>>"$LOG"; then
    log "❌ DL_FAIL $id"
    return 1
  fi

  # Vérifie taille > 500 KB
  local size; size=$(stat -f%z "$mp4" 2>/dev/null || echo 0)
  if [ "$size" -lt 524288 ]; then
    log "❌ DL_EMPTY $id (${size} bytes)"
    rm -f "$mp4"
    return 1
  fi

  log "✅ DL_OK $id ($(echo "scale=1; $size/1048576" | bc) MB)"
  echo "$mp4"
}

# ── TRANSCRIPTION ────────────────────────────────────────────
transcribe_lesson() {
  local id="$1" mp4="$2"
  local txt_out="${TMP_PREFIX}${id}.txt"
  local transcript="$TRANSCRIPTS/${id}.txt"

  check_disk

  log "🎙️  WHISPER $id"
  if ! "$WHISPER" "$mp4" \
      --model "$WHISPER_MODEL" \
      --language en \
      --output_format txt \
      --output_dir /tmp/ \
      --fp16 False \
      >> "$LOG" 2>&1; then
    log "❌ WHISPER_FAIL $id"
    rm -f "$mp4"
    return 1
  fi

  # Whisper nomme le fichier d'après le basename du mp4
  local whisper_out="/tmp/$(basename "$mp4" .mp4).txt"
  if [ ! -f "$whisper_out" ]; then
    log "❌ WHISPER_NO_OUTPUT $id"
    rm -f "$mp4"
    return 1
  fi

  mv "$whisper_out" "$transcript"
  rm -f "$mp4"   # ← SUPPRESSION IMMÉDIATE après transcription
  log "✅ WHISPER_OK $id ($(wc -w < "$transcript") mots)"
  echo "$transcript"
}

# ── RÉSUMÉ GROQ ──────────────────────────────────────────────
summarize_lesson() {
  local id="$1" title="$2" transcript="$3"
  local summary="$SUMMARIES/${id}.md"
  local today; today=$(date +%Y-%m-%d)

  log "🧠  GROQ $id"
  python3 - "$title" "$id" "$transcript" "$today" << 'PYEOF'
import sys
from groq import Groq
import os

title, lesn, transcript_path, today = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
groq_key = os.popen("grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2").read().strip()

with open(transcript_path) as f:
    transcript = f.read()[:28000]

client = Groq(api_key=groq_key)
prompt = f"""Résume cette leçon EcomTalent (marketing digital / pub Meta) de façon structurée et actionnable.
Contexte business : drinknellio.com — produit anti-stress/sommeil (Nellio UltraCalm), marché allemand.
Leçon : {title}

Transcript :
{transcript}

Format de sortie (markdown) :
# {title}
> ID: {lesn} | Traité le {today}

## 🎯 Concept Central
[2-3 phrases — l'idée maîtresse]

## 📌 Points Clés
[6-8 bullets actionnables]

## 💡 Frameworks & Méthodes
[Frameworks spécifiques mentionnés]

## 🏪 Application drinknellio.com (marché DE)
[2-4 actions concrètes stress/sommeil Allemagne]

## ⚡ Citation Clé
> [citation mémorable de Spencer]
"""

resp = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": prompt}],
    max_tokens=1800
)
print(resp.choices[0].message.content)
PYEOF
}

# ── PIPELINE PRINCIPAL ───────────────────────────────────────
run_pipeline() {
  local batch="${1:-0}"   # 0 = toutes les leçons, N = limite N leçons

  mkdir -p "$TRANSCRIPTS" "$SUMMARIES"
  log "═══════════════════════════════════════"
  log "🚀 PIPELINE START | Disk: $(disk_free_gb) GB | Batch: ${batch:-ALL}"
  log "═══════════════════════════════════════"

  local count=0 done=0 skipped=0 failed=0

  # Lecture du JSON ordonné
  while IFS= read -r line; do
    local id title url order
    id=$(echo "$line" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d['id'])")
    title=$(echo "$line" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d['title'])")
    url=$(echo "$line" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d['url'])")

    # Skip si déjà résumé
    if [ -f "$SUMMARIES/${id}.md" ]; then
      log "⏭️  SKIP $title"
      ((skipped++)) || true
      continue
    fi

    # Skip si URL manquante
    if [ -z "$url" ] || [ "$url" = "null" ]; then
      log "⚠️  NO_URL $id — $title"
      ((failed++)) || true
      continue
    fi

    # Disk check global avant chaque leçon
    check_disk

    log "───────────────────────────────────────"
    log "📚 [$((count+1))] $title"

    # Étape 1 : Download
    local mp4
    if ! mp4=$(download_lesson "$id" "$url"); then
      ((failed++)) || true; continue
    fi

    # Étape 2 : Transcription
    local transcript
    if ! transcript=$(transcribe_lesson "$id" "$mp4"); then
      ((failed++)) || true; continue
    fi

    # Étape 3 : Résumé Groq → fichier
    if summarize_lesson "$id" "$title" "$transcript" > "$SUMMARIES/${id}.md" 2>>"$LOG"; then
      log "✅ DONE $title | Disk: $(disk_free_gb) GB"
      ((done++)) || true
    else
      log "❌ GROQ_FAIL $id"
      rm -f "$SUMMARIES/${id}.md"
      ((failed++)) || true
    fi

    ((count++)) || true
    [ "$batch" -gt 0 ] && [ "$count" -ge "$batch" ] && break

  done < <(python3 -c "
import json
with open('$LESSONS_JSON') as f:
    lessons = json.load(f)
lessons.sort(key=lambda x: x.get('order', 999))
for l in lessons:
    print(json.dumps(l))
")

  local total; total=$(ls "$SUMMARIES"/*.md 2>/dev/null | wc -l | tr -d ' ')
  log "═══════════════════════════════════════"
  log "🏁 PIPELINE DONE | ✅ $done faits | ⏭️ $skipped skippés | ❌ $failed échoués"
  log "📊 Total summaries : $total/69 | Disk: $(disk_free_gb) GB"
  log "═══════════════════════════════════════"

  openclaw system event --text "EcomTalent pipeline: $total/69 leçons résumées" --mode now 2>/dev/null || true
}

# ── STATUS ──────────────────────────────────────────────────
show_status() {
  local done; done=$(ls "$SUMMARIES"/*.md 2>/dev/null | wc -l | tr -d ' ')
  local todo=$((69 - done))
  local disk; disk=$(disk_free_gb)
  echo ""
  echo "📊 EcomTalent Pipeline Status"
  echo "──────────────────────────────"
  printf "  ✅ Done  : %s/69\n" "$done"
  printf "  ⏳ Todo  : %s\n" "$todo"
  printf "  💾 Disk  : %s GB libres\n" "$disk"
  echo ""
  if [ "$done" -gt 0 ]; then
    echo "  Dernières leçons résumées :"
    ls -t "$SUMMARIES"/*.md 2>/dev/null | head -5 | while read -r f; do
      echo "    · $(basename "$f" .md)"
    done
  fi
  echo ""
}

# ── POINT D'ENTRÉE ───────────────────────────────────────────
case "${1:-run}" in
  run)    run_pipeline "${2:-0}" ;;
  status) show_status ;;
  clean)  cleanup_tmp; echo "Nettoyage /tmp OK" ;;
  *)      echo "Usage: bash scraper.sh [run [N]|status|clean]" ;;
esac
