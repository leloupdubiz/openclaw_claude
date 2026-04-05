#!/bin/bash
# Transcription séquentielle M3+M4 — smallest first

WHISPER="/Users/pc2/Library/Python/3.9/bin/whisper"
TRANSCRIPTS="/Users/pc2/.openclaw/workspace/formations/cro-evolve/transcripts"
SUMMARIES="/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries"
MEGA_IMPORT="/Users/pc2/.openclaw/workspace/formations/mega-import"
LOG="/tmp/transcribe_sequential.log"
CREDS="$HOME/.openclaw/credentials/anthropic.env"

[ -f "$CREDS" ] && export $(grep -v '^#' "$CREDS" | xargs)
mkdir -p "$TRANSCRIPTS" "$SUMMARIES"
> "$LOG"

log() { echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG"; }

log "🚀 TRANSCRIPTION SÉQUENTIELLE — démarrage"
log "💾 Disque : $(df -h / | tail -1 | awk '{print $4}') libre"
log "📝 Transcripts existants : $(ls "$TRANSCRIPTS"/*.txt 2>/dev/null | wc -l | tr -d ' ')"

DONE=0; SKIP=0; FAIL=0

# Liste vidéos triées par taille croissante (smallest first)
while IFS= read -r VIDEO; do
  [ -f "$VIDEO" ] || continue
  NAME=$(basename "$VIDEO")
  NAME_NOEXT="${NAME%.*}"
  TRANSCRIPT="$TRANSCRIPTS/$NAME_NOEXT.txt"
  SIZE=$(du -sh "$VIDEO" 2>/dev/null | cut -f1)
  MODULE_DIR=$(dirname "$VIDEO")
  MOD_N=$(basename "$MODULE_DIR" | grep -oE '^[0-9]+')
  MOD_PAD=$(printf "%02d" "${MOD_N:-99}")
  VID_NUM=$(echo "$NAME_NOEXT" | grep -oE '^[0-9]+')
  VID_PAD=$(printf "%02d" "${VID_NUM:-0}")
  SLUG=$(echo "$NAME_NOEXT" | sed 's/^[0-9\.\ ]*//;s/[^a-zA-Z0-9]/-/g;s/-\+/-/g;s/^-//;s/-$//' | tr '[:upper:]' '[:lower:]')
  OUT="$SUMMARIES/m${MOD_PAD}-${VID_PAD}-${SLUG}.md"

  # Skip si déjà transcrit
  if [ -f "$TRANSCRIPT" ]; then
    log "⏩ Déjà fait [$SIZE] : $NAME_NOEXT"
    rm -f "$VIDEO"
    SKIP=$((SKIP+1))
    continue
  fi

  log "🔊 [$SIZE] : $NAME_NOEXT"

  "$WHISPER" "$VIDEO" \
    --model large-v3-turbo \
    --language en \
    --output_format txt \
    --output_dir "$TRANSCRIPTS" >> "$LOG" 2>&1

  if [ -f "$TRANSCRIPT" ]; then
    WORDS=$(wc -w < "$TRANSCRIPT")
    rm -f "$VIDEO"
    log "✅ OK ($WORDS mots) — Disque: $(df -h / | tail -1 | awk '{print $4}')"
    DONE=$((DONE+1))

    # Résumé Groq
    [ -f "$OUT" ] && log "⏩ Résumé existant" && continue
    log "📝 Résumé → m${MOD_PAD}-${VID_PAD}"
    python3 - <<PYEOF >> "$LOG" 2>&1
import os
try:
    from groq import Groq
    key = os.environ.get('GROQ_API_KEY','')
    if not key: exit(0)
    txt = open("$TRANSCRIPT").read()[:25000]
    client = Groq(api_key=key)
    r = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role":"system","content":"Expert CRO DTC e-commerce. Résumé structuré en français:\n# [TITRE] — Module CRO M$MOD_PAD\n## 🎯 Concept Central\n## 📌 Points Clés (5-8 bullets)\n## 💡 Insights Actionnables (3-5)\n## 🏪 Applications drinknellio.com\n## ⚡ Citation Clé\n## 🔗 Connexions EVOLVE"},
            {"role":"user","content":f"Vidéo: $NAME_NOEXT\nModule: M$MOD_PAD\n\n{txt}"}
        ],
        max_tokens=2000, temperature=0.3)
    open("$OUT",'w').write(r.choices[0].message.content)
    print("OK")
except Exception as e:
    print(f"ERREUR: {e}")
PYEOF
    [ -f "$OUT" ] && log "✅ Résumé OK" || log "⚠️ Résumé échec"
  else
    log "❌ ÉCHEC : $NAME_NOEXT"
    FAIL=$((FAIL+1))
  fi

done < <(find "$MEGA_IMPORT" \( -name "*.ts" -o -name "*.mp4" \) -size +1k -exec stat -f "%z %N" {} \; 2>/dev/null | sort -n | sed 's/^[0-9]* //')

log "══════════════"
log "🎉 TERMINÉ — ✅ $DONE transcrits | ⏩ $SKIP skippés | ❌ $FAIL échecs"
log "📝 Total transcripts : $(ls "$TRANSCRIPTS"/*.txt 2>/dev/null | wc -l | tr -d ' ')"
log "📋 Total résumés     : $(ls "$SUMMARIES"/*.md 2>/dev/null | wc -l | tr -d ' ')"
log "💾 Disque final : $(df -h / | tail -1 | awk '{print $4}')"
log "══════════════"
