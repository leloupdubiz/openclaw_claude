#!/bin/bash
# Pipeline EVOLVE CRO — Tous modules restants (M3-M8)
# Whisper (python3.9) + Groq → transcription + résumé automatique
# Usage : bash pipeline_all_modules.sh

MEGA_URL="https://mega.nz/folder/0ANgVRJZ#aWLsBr00URk6vP56ucXGjQ"
MEGA_IMPORT="/Users/pc2/.openclaw/workspace/formations/mega-import"
TRANSCRIPTS="/Users/pc2/.openclaw/workspace/formations/cro-evolve/transcripts"
SUMMARIES="/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries"
WHISPER="/Users/pc2/Library/Python/3.9/bin/whisper"
LOG="/tmp/pipeline_all_modules.log"
CREDS="$HOME/.openclaw/credentials/anthropic.env"
DISK_MIN_GB=5

# Charger clés API
[ -f "$CREDS" ] && export $(grep -v '^#' "$CREDS" | xargs)

log() { echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG"; }
free_gb() { df -g / | tail -1 | awk '{print $4}'; }

mkdir -p "$TRANSCRIPTS" "$SUMMARIES"
echo "" > "$LOG"
log "🚀 PIPELINE ALL MODULES — démarrage"
log "💾 Disque libre : $(free_gb)GB"
log "📝 Transcripts existants : $(ls $TRANSCRIPTS/*.txt 2>/dev/null | wc -l)"

# ─── PHASE 1 : Téléchargement megadl ─────────────────────────────────────────
DISK=$(free_gb)
if [ "$DISK" -lt "$DISK_MIN_GB" ]; then
  log "❌ Disque insuffisant (${DISK}GB < ${DISK_MIN_GB}GB) — arrêt"
  exit 1
fi

log "📥 Lancement megadl (skip fichiers déjà téléchargés)..."
megadl --path "$MEGA_IMPORT" "$MEGA_URL" >> "$LOG" 2>&1
log "📥 megadl terminé — code retour: $?"

# ─── PHASE 2 : Transcription + Résumé ────────────────────────────────────────
# Modules déjà traités (skip)
DONE_MODULES=("1. CRO Basics" "2. CRO Research")

process_video() {
  local VIDEO="$1"
  local MODULE_NAME="$2"
  local MODULE_NUM="$3"

  NAME=$(basename "$VIDEO")
  NAME_NOEXT="${NAME%.*}"
  TRANSCRIPT="$TRANSCRIPTS/$NAME_NOEXT.txt"

  # Skip si transcript déjà fait
  if [ -f "$TRANSCRIPT" ]; then
    log "⏩ Déjà transcrit : $NAME_NOEXT"
  else
    SIZE=$(du -sh "$VIDEO" | cut -f1)
    log "🔊 [$SIZE] Transcription : $NAME_NOEXT"

    "$WHISPER" "$VIDEO" \
      --model large-v3-turbo \
      --language en \
      --output_format txt \
      --output_dir "$TRANSCRIPTS" >> "$LOG" 2>&1

    if [ -f "$TRANSCRIPT" ]; then
      WORDS=$(wc -w < "$TRANSCRIPT")
      log "✅ Transcript OK : $NAME_NOEXT ($WORDS mots)"
      rm "$VIDEO"
      log "🗑️  Vidéo supprimée — Disque : $(free_gb)GB"
    else
      log "❌ Échec transcription : $NAME_NOEXT"
      return 1
    fi
  fi

  # ── Résumé Groq ────────────────────────────────────────────────────────────
  NUM_MATCH=$(echo "$NAME_NOEXT" | grep -oE '^[0-9]+')
  NUM_PAD=$(printf "%02d" "${NUM_MATCH:-0}")
  SLUG=$(echo "$NAME_NOEXT" | sed 's/^[0-9\.]*//;s/^ *//;s/[^a-zA-Z0-9]/-/g;s/--*/-/g;s/^-//;s/-$//' | tr '[:upper:]' '[:lower:]')
  SUMMARY_FILE="$SUMMARIES/m${MODULE_NUM}-${NUM_PAD}-${SLUG}.md"

  if [ -f "$SUMMARY_FILE" ]; then
    log "⏩ Résumé existant : $(basename $SUMMARY_FILE)"
    return 0
  fi

  log "📝 Génération résumé Groq : $(basename $SUMMARY_FILE)"

  python3 - <<PYEOF >> "$LOG" 2>&1
import os, sys, re
from groq import Groq

groq_key = os.environ.get('GROQ_API_KEY', '')
if not groq_key:
    print("⚠️ GROQ_API_KEY manquant")
    sys.exit(0)

transcript_path = "$TRANSCRIPT"
output_path = "$SUMMARY_FILE"
name = "$NAME_NOEXT"
module_name = "$MODULE_NAME"

with open(transcript_path, 'r') as f:
    transcript = f.read()[:25000]

client = Groq(api_key=groq_key)

SYSTEM = """Tu es un expert CRO e-commerce DTC. Rédige un résumé structuré en français EXACTEMENT selon ce format :

# [TITRE DE LA VIDÉO] — Module CRO EVOLVE

## 🎯 Concept Central
[2-3 phrases résumant l'idée principale]

## 📌 Points Clés
[6-8 bullets actionnables]

## 💡 Insights Actionnables
[4-5 actions concrètes numérotées]

## 🏪 Applications pour drinknellio.com
[3-4 applications pour une boisson bien-être DTC, marché allemand, Meta Ads]

## ⚡ Citation Clé
> *[citation directe du formateur en anglais]*

## 🔗 Connexions avec autres modules
[Liens avec d'autres concepts du cours CRO]"""

resp = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": SYSTEM},
        {"role": "user", "content": f"Module : {module_name}\nVidéo : {name}\n\nTranscription :\n{transcript}"}
    ],
    max_tokens=2000,
    temperature=0.3
)

with open(output_path, 'w') as f:
    f.write(resp.choices[0].message.content)
print(f"✅ Résumé généré : {os.path.basename(output_path)}")
PYEOF

  sleep 2
}

# Parcourir tous les modules téléchargés
for MODULE_DIR in "$MEGA_IMPORT"/*/; do
  MODULE_NAME=$(basename "$MODULE_DIR")

  # Skip modules déjà traités
  SKIP=0
  for DONE in "${DONE_MODULES[@]}"; do
    [ "$MODULE_NAME" = "$DONE" ] && SKIP=1 && break
  done
  [ "$SKIP" -eq 1 ] && log "⏩ Module déjà traité : $MODULE_NAME" && continue

  # Extraire numéro de module
  MODULE_NUM=$(echo "$MODULE_NAME" | grep -oE '^[0-9]+')
  MODULE_NUM_PAD=$(printf "%02d" "${MODULE_NUM:-99}")

  log ""
  log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  log "📂 MODULE : $MODULE_NAME"
  log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Traiter .ts et .mp4
  VIDEO_COUNT=0
  for VIDEO in "$MODULE_DIR"*.ts "$MODULE_DIR"*.mp4; do
    [ -f "$VIDEO" ] || continue
    VIDEO_COUNT=$((VIDEO_COUNT + 1))
    process_video "$VIDEO" "$MODULE_NAME" "$MODULE_NUM_PAD"
    # Vérifier espace disque
    if [ "$(free_gb)" -lt "$DISK_MIN_GB" ]; then
      log "⚠️ Disque critique ($(free_gb)GB) — pause"
      sleep 60
    fi
  done

  [ "$VIDEO_COUNT" -eq 0 ] && log "⚠️ Aucune vidéo dans $MODULE_NAME (PDFs only)"
done

# ─── RAPPORT FINAL ────────────────────────────────────────────────────────────
log ""
log "══════════════════════════════════════"
log "🎉 PIPELINE TERMINÉ"
log "📝 Transcripts : $(ls $TRANSCRIPTS/*.txt 2>/dev/null | wc -l)"
log "📋 Résumés : $(ls $SUMMARIES/*.md 2>/dev/null | wc -l)"
log "💾 Disque libre : $(free_gb)GB"
log "══════════════════════════════════════"
