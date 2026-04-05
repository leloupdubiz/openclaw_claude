#!/bin/bash
# ⚡ Bibliothèque Clawdbot Prime — Démarrage rapide
cd "$(dirname "$0")"

# Kill si déjà en cours
pkill -f "node server.js" 2>/dev/null
sleep 1

# Démarrer le serveur
node server.js &

sleep 1.5
open http://localhost:4242

echo "⚡ Bibliothèque ouverte → http://localhost:4242"
