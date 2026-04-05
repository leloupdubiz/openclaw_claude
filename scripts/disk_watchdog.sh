#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# DISK WATCHDOG — Surveillance disque toutes les 30 min
# Seuils : 3 GB → alerte | 1.5 GB → stop pipelines | 0.5 GB → arrêt gateway
# ═══════════════════════════════════════════════════════════════

LOG="/tmp/disk_watchdog.log"
WORKSPACE="/Users/pc2/.openclaw/workspace"
DISCORD_CHANNEL="1476994301803102312"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG"; }

# Espace libre en GB (1 décimale)
free_gb() {
  df / | tail -1 | awk '{print $4}' | python3 -c "import sys; v=int(sys.stdin.read()); print(round(v/1048576,1))"
}

FREE=$(free_gb)
log "CHECK: ${FREE} GB libres"

# ─── SEUIL 0.5 GB — ARRÊT D'URGENCE ─────────────────────────
if python3 -c "import sys; sys.exit(0 if $FREE < 0.5 else 1)" 2>/dev/null; then
  log "☠️  CRITIQUE < 0.5 GB — arrêt gateway"

  # Tuer processus lourds
  pkill -f "whisper" 2>/dev/null
  pkill -f "megadl" 2>/dev/null
  pkill -f "yt-dlp" 2>/dev/null
  pkill -f "pipeline" 2>/dev/null

  # Nettoyer /tmp
  find /tmp -name "*.mp4" -o -name "*.wav" -o -name "*.mp3" -o -name "*.m4a" | xargs rm -f 2>/dev/null

  # Discord
  openclaw message send --channel discord \
    --to "channel:$DISCORD_CHANNEL" \
    --message "☠️ ARRÊT URGENCE — Disque ${FREE} GB (< 0.5 GB)\nGateway stoppé. Libère de l'espace immédiatement." 2>/dev/null || true

  openclaw gateway stop 2>/dev/null
  exit 99
fi

# ─── SEUIL 1.5 GB — STOP PIPELINES ──────────────────────────
if python3 -c "import sys; sys.exit(0 if $FREE < 1.5 else 1)" 2>/dev/null; then
  log "🔴 CRITIQUE < 1.5 GB — stop tous les pipelines"

  pkill -f "whisper" 2>/dev/null
  pkill -f "megadl" 2>/dev/null
  pkill -f "yt-dlp" 2>/dev/null
  pkill -f "smart_transcribe" 2>/dev/null
  pkill -f "pipeline" 2>/dev/null

  # Libérer /tmp
  find /tmp -name "*.mp4" -o -name "*.wav" -o -name "*.mp3" -o -name "*.m4a" -o -name "*.ts" | xargs rm -f 2>/dev/null

  # Rapport top consommateurs
  TOP=$(du -sh $WORKSPACE/formations/*/transcripts $WORKSPACE/formations/*/videos ~/Downloads 2>/dev/null | sort -rh | head -5 | tr '\n' ' ')

  openclaw message send --channel discord \
    --to "channel:$DISCORD_CHANNEL" \
    --message "🔴 ALERTE DISQUE CRITIQUE — ${FREE} GB libre (< 1.5 GB)
Tous les pipelines stoppés.
Top consommateurs : $TOP
→ Action requise : supprimer les transcripts/vidéos non nécessaires." 2>/dev/null || true

  exit 2
fi

# ─── SEUIL 3 GB — ALERTE ─────────────────────────────────────
if python3 -c "import sys; sys.exit(0 if $FREE < 3.0 else 1)" 2>/dev/null; then
  log "🟡 ALERTE < 3 GB — notification Chef"

  # Eviter spam : ne re-notifier que si pas notifié dans les 2 dernières heures
  LAST_ALERT="/tmp/disk_last_alert"
  NOW=$(date +%s)
  if [ -f "$LAST_ALERT" ]; then
    LAST=$(cat "$LAST_ALERT")
    DIFF=$((NOW - LAST))
    if [ $DIFF -lt 7200 ]; then
      log "  (alerte déjà envoyée il y a ${DIFF}s — skip)"
      exit 0
    fi
  fi
  echo "$NOW" > "$LAST_ALERT"

  # Libérer /tmp automatiquement
  FREED=$(find /tmp -name "*.mp4" -o -name "*.wav" -o -name "*.mp3" -o -name "*.m4a" 2>/dev/null | xargs du -sc 2>/dev/null | tail -1 | awk '{print $1}')
  find /tmp -name "*.mp4" -o -name "*.wav" -o -name "*.mp3" -o -name "*.m4a" | xargs rm -f 2>/dev/null
  FREED_MB=$((${FREED:-0} / 1024))

  openclaw message send --channel discord \
    --to "channel:$DISCORD_CHANNEL" \
    --message "🟡 ALERTE DISQUE — ${FREE} GB libre
/tmp nettoyé auto (+${FREED_MB} MB récupérés).
Surveille : téléchargements en cours, transcriptions actives." 2>/dev/null || true

  exit 1
fi

# ─── OK ───────────────────────────────────────────────────────
log "✅ OK: ${FREE} GB libres"
exit 0
