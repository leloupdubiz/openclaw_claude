#!/bin/bash
# ⚡ Mission Control — Démarrage automatique
# Convex local backend + Next.js dev server

export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

MC_DIR="/Users/pc2/.openclaw/workspace/mission-control"
LOG="/tmp/clawdbot-mission-control.log"
NPM="/opt/homebrew/bin/npm"
NPX="/opt/homebrew/bin/npx"

cd "$MC_DIR"
echo "[$(date '+%H:%M:%S')] ⚡ Mission Control démarrage..." >> "$LOG"

# Nettoyage des processus existants
pkill -f "convex-local-backend" 2>/dev/null
pkill -f "convex dev" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

# 1. Convex local backend (port 3210)
echo "[$(date '+%H:%M:%S')] Démarrage Convex..." >> "$LOG"
echo "n" | "$NPX" convex dev --yes >> "$LOG" 2>&1 &
CONVEX_PID=$!
echo "[$(date '+%H:%M:%S')] Convex PID $CONVEX_PID" >> "$LOG"

# Attendre que Convex soit prêt
sleep 6

# 2. Next.js dev server (port 3000)
echo "[$(date '+%H:%M:%S')] Démarrage Next.js..." >> "$LOG"
"$NPM" run dev >> "$LOG" 2>&1 &
NEXT_PID=$!
echo "[$(date '+%H:%M:%S')] Next.js PID $NEXT_PID → http://localhost:3000" >> "$LOG"

# Garder le script en vie (LaunchAgent surveille via KeepAlive)
wait
