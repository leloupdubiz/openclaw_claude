#!/bin/bash
# ⚡ Nettoyage mensuel automatique — Clawdbot Prime
WORKSPACE="/Users/pc2/.openclaw/workspace"
LOG="$WORKSPACE/memory/cleanup_$(date +%Y-%m).log"
echo "=== NETTOYAGE $(date '+%Y-%m-%d %H:%M') ===" > "$LOG"
echo "" > /tmp/clawdbot-library.log
echo "[$(date)] Tronqué" > /tmp/clawdbot-library.log
echo "✅ /tmp logs tronqués" >> "$LOG"
if [ -d "$WORKSPACE/mission-control/.next/cache" ]; then
  SIZE=$(du -sh "$WORKSPACE/mission-control/.next/cache" 2>/dev/null | cut -f1)
  rm -rf "$WORKSPACE/mission-control/.next/cache"
  echo "✅ .next/cache supprimé ($SIZE)" >> "$LOG"
fi
find "$WORKSPACE/memory" -name "*.md" -mtime +60 2>/dev/null | while read f; do
  gzip -9 "$f" && echo "✅ Compressé : $(basename $f)" >> "$LOG"
done
echo "Disque après :" >> "$LOG"
df -h / | tail -1 >> "$LOG"
cat "$LOG"
