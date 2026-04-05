#!/bin/bash
# Pipeline intelligent — download + process en parallèle
# megadl en background + watchdog qui transcrit + supprime au fur et à mesure

MEGA_URL="https://mega.nz/folder/0ANgVRJZ#aWLsBr00URk6vP56ucXGjQ"
MEGA_IMPORT="/Users/pc2/.openclaw/workspace/formations/mega-import"
TRANSCRIPTS="/Users/pc2/.openclaw/workspace/formations/cro-evolve/transcripts"
SUMMARIES="/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries"
WHISPER="/Users/pc2/Library/Python/3.9/bin/whisper"
LOG="/tmp/pipeline_smart.log"
CREDS="$HOME/.openclaw/credentials/anthropic.env"

[ -f "$CREDS" ] && export $(grep -v '^#' "$CREDS" | xargs)
mkdir -p "$TRANSCRIPTS" "$SUMMARIES"
echo "" > "$LOG"

log() { echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG"; }
free_gb() { df -g / | tail -1 | awk '{print $4}'; }
file_stable() {
  local f="$1"; local s1 s2
  s1=$(stat -f%z "$f" 2>/dev/null || echo 0)
  sleep 3
  s2=$(stat -f%z "$f" 2>/dev/null || echo 0)
  [ "$s1" = "$s2" ] && [ "$s1" -gt "1000" ]
}

process_video() {
  local VIDEO="$1"; local MODULE_NUM="$2"
  local _BASENAME; _BASENAME=$(basename "$VIDEO")
  local NAME_NOEXT="${_BASENAME%.*}"
  local TRANSCRIPT="$TRANSCRIPTS/$NAME_NOEXT.txt"

  # Skip placeholder (0 bytes)
  local SIZE=$(stat -f%z "$VIDEO" 2>/dev/null || echo 0)
  if [ "$SIZE" -lt 1000 ]; then
    log "⏩ Placeholder ignoré : $NAME_NOEXT"
    rm -f "$VIDEO"; return 0
  fi

  if [ -f "$TRANSCRIPT" ]; then
    log "⏩ Transcript existant : $NAME_NOEXT — suppression vidéo"
    rm -f "$VIDEO"; return 0
  fi

  log "🔊 [$(du -sh "$VIDEO" | cut -f1)] Transcription : $NAME_NOEXT"
  # Pause megadl pendant la transcription pour économiser le disque
  [ -n "$MEGADL_PID" ] && kill -STOP $MEGADL_PID 2>/dev/null && log "⏸  megadl pausé"
  "$WHISPER" "$VIDEO" --model large-v3-turbo --language en \
    --output_format txt --output_dir "$TRANSCRIPTS" >> "$LOG" 2>&1

  if [ -f "$TRANSCRIPT" ]; then
    log "✅ Transcript OK ($(wc -w < "$TRANSCRIPT") mots)"
    rm -f "$VIDEO"
    log "🗑️  Vidéo supprimée — Disque : $(free_gb)GB"
    # Reprendre megadl après transcription
    [ -n "$MEGADL_PID" ] && kill -CONT $MEGADL_PID 2>/dev/null && log "▶️  megadl repris"

    # Résumé Groq
    local NUM=$(echo "$NAME_NOEXT" | grep -oE '^[0-9]+')
    local NUM_PAD=$(printf "%02d" "${NUM:-0}")
    local SLUG=$(echo "$NAME_NOEXT" | sed 's/^[0-9\.\ ]*//;s/[^a-zA-Z0-9]/-/g;s/-\+/-/g;s/^-//;s/-$//' | tr '[:upper:]' '[:lower:]')
    local OUT="$SUMMARIES/m${MODULE_NUM}-${NUM_PAD}-${SLUG}.md"

    [ -f "$OUT" ] && log "⏩ Résumé existant" && return 0

    log "📝 Résumé Groq → $(basename $OUT)"
    python3 - <<PYEOF >> "$LOG" 2>&1
import os; from groq import Groq
key = os.environ.get('GROQ_API_KEY','')
if not key: exit(0)
txt = open("$TRANSCRIPT").read()[:25000]
client = Groq(api_key=key)
r = client.chat.completions.create(model="llama-3.3-70b-versatile",
  messages=[{"role":"system","content":"Expert CRO DTC. Résumé structuré en français:\n# TITRE — Module CRO\n## 🎯 Concept Central\n## 📌 Points Clés\n## 💡 Insights Actionnables\n## 🏪 Applications drinknellio.com\n## ⚡ Citation Clé\n## 🔗 Connexions"},
            {"role":"user","content":f"Vidéo: $NAME_NOEXT\n\n{txt}"}],
  max_tokens=2000, temperature=0.3)
open("$OUT",'w').write(r.choices[0].message.content)
print("✅ $(basename $OUT)")
PYEOF
  else
    log "❌ Échec transcription : $NAME_NOEXT"
  fi
}

log "🚀 PIPELINE SMART — démarrage ($(free_gb)GB libres)"

# Lancer megadl en background
log "📥 megadl en background..."
megadl -u "leloupdelecom@gmail.com" -p "8Uf0cqW6V3mjwV" --limit-speed=5000 --path "$MEGA_IMPORT" "$MEGA_URL" >> "$LOG" 2>&1 &
MEGADL_PID=$!
log "   PID megadl: $MEGADL_PID"

# Watchdog : traiter les vidéos au fur et à mesure
PROCESSED=()
while kill -0 $MEGADL_PID 2>/dev/null || [ ${#READY[@]} -gt 0 ]; do
  for MODULE_DIR in "$MEGA_IMPORT"/*/; do
    MODULE_NAME=$(basename "$MODULE_DIR")
    MODULE_NUM=$(echo "$MODULE_NAME" | grep -oE '^[0-9]+')
    MODULE_NUM_PAD=$(printf "%02d" "${MODULE_NUM:-99}")

    for VIDEO in "$MODULE_DIR"*.ts "$MODULE_DIR"*.mp4; do
      [ -f "$VIDEO" ] || continue
      VNAME=$(basename "$VIDEO")
      # Vérifier si déjà traité
      [[ " ${PROCESSED[@]} " =~ " $VNAME " ]] && continue
      # Vérifier si stable (download terminé)
      file_stable "$VIDEO" || continue

      PROCESSED+=("$VNAME")
      process_video "$VIDEO" "$MODULE_NUM_PAD"
    done
  done

  # Disk check
  FREE=$(free_gb)
  if [ "$FREE" -lt 2 ] && kill -0 $MEGADL_PID 2>/dev/null; then
    log "⚠️ Disque bas (${FREE}GB) — pause megadl"
    kill -STOP $MEGADL_PID
    # Attendre que le disque remonte au-dessus de 2GB (Whisper libère espace)
    while [ "$(free_gb)" -lt 2 ]; do sleep 15; done
    log "▶️  Reprise megadl (disque: $(free_gb)GB)"
    kill -CONT $MEGADL_PID
  fi

  sleep 5
done

# Traitement final
log "📥 megadl terminé — traitement final..."
for MODULE_DIR in "$MEGA_IMPORT"/*/; do
  MODULE_NAME=$(basename "$MODULE_DIR")
  MODULE_NUM=$(echo "$MODULE_NAME" | grep -oE '^[0-9]+')
  MODULE_NUM_PAD=$(printf "%02d" "${MODULE_NUM:-99}")
  for VIDEO in "$MODULE_DIR"*.ts "$MODULE_DIR"*.mp4; do
    [ -f "$VIDEO" ] || continue
    VNAME=$(basename "$VIDEO")
    [[ " ${PROCESSED[@]} " =~ " $VNAME " ]] && continue
    process_video "$VIDEO" "$MODULE_NUM_PAD"
  done
done

log "══════════════════════"
log "🎉 TERMINÉ"
log "📝 Transcripts : $(ls $TRANSCRIPTS/*.txt 2>/dev/null | wc -l)"
log "📋 Résumés : $(ls $SUMMARIES/*.md 2>/dev/null | wc -l)"
log "💾 Disque : $(free_gb)GB"
log "══════════════════════"
