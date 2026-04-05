#!/bin/bash
# reboot_services.sh — Recovery LaunchAgents clawdbot au @reboot
# Créé le 2026-03-01 — fallback si LaunchAgents purgés par outil tiers

sleep 30  # Attendre que le système soit prêt

PLISTS=(
  "com.clawdbot.library"
  "com.clawdbot.omnia"
  "com.clawdbot.nellio-studio"
)

for label in "${PLISTS[@]}"; do
  PLIST="$HOME/Library/LaunchAgents/${label}.plist"
  if [ -f "$PLIST" ]; then
    launchctl unload "$PLIST" 2>/dev/null
    launchctl load "$PLIST" 2>/dev/null
    echo "$(date) — Loaded $label" >> /tmp/clawdbot-reboot-recovery.log
  else
    echo "$(date) — MISSING $PLIST — démarrage direct" >> /tmp/clawdbot-reboot-recovery.log
    # Fallback direct si plist manquant
    case $label in
      com.clawdbot.library)
        cd /Users/pc2/.openclaw/workspace/library && nohup node server.js >> /tmp/clawdbot-library.log 2>&1 &
        ;;
      com.clawdbot.omnia)
        cd /Users/pc2/.openclaw/workspace && nohup node omnia/server.js >> /tmp/clawdbot-omnia.log 2>&1 &
        ;;
      com.clawdbot.nellio-studio)
        cd /Users/pc2/.openclaw/workspace/nellio-studio && nohup node src/api/server.js >> /tmp/clawdbot-nellio.log 2>&1 &
        ;;
    esac
  fi
done
