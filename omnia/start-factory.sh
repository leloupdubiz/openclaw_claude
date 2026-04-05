#!/bin/bash
# 🏭 Creative Factory — Démarrage OMNIA avec les nouveaux modules
# Exécuter: bash start-factory.sh

echo "⚡ Démarrage OMNIA Creative Factory..."

# Tuer l'instance existante si active
pkill -f "node.*server.js" 2>/dev/null && echo "→ Instance précédente arrêtée" && sleep 1

# Vérifier les dépendances
cd /Users/pc2/.openclaw/workspace/omnia
node --check server.js 2>&1 && echo "✅ Syntax OK" || { echo "❌ Erreur syntax server.js — vérifier les logs"; exit 1; }

# Démarrer
node server.js &
echo "→ OMNIA démarré (PID: $!)"
echo "→ URL: http://localhost:3002"
echo "→ Onglet Factory: http://localhost:3002 → 🏭 Creative Factory"
echo ""
echo "Test des endpoints:"
sleep 2
curl -s http://localhost:3002/api/automation/status | python3 -c "import json,sys; d=json.load(sys.stdin); print('✅ Automation Engine:', 'Actif' if d.get('isRunning') else 'Inactif')" 2>/dev/null || echo "⏳ Serveur en démarrage..."
