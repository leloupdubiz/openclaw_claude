#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Pipeline MASTER Pellegrini — Relance / Maintenance
# ═══════════════════════════════════════════════════════════════
# Usage :
#   ./pipeline.sh              → run complet (resume automatique)
#   ./pipeline.sh transcripts  → fetch transcripts uniquement
#   ./pipeline.sh groq         → résumés Groq depuis cache transcripts
#   ./pipeline.sh force        → re-traiter tout (écrase existants)
# ═══════════════════════════════════════════════════════════════

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE="/Users/pc2/.openclaw/workspace"

# Charger la clé Groq
export GROQ_API_KEY=$(grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2)

if [ -z "$GROQ_API_KEY" ]; then
  echo "❌ GROQ_API_KEY manquante dans ~/.openclaw/credentials/anthropic.env"
  exit 1
fi

echo "⚡ Pipeline MASTER Pellegrini"
echo "   Workspace : $SCRIPT_DIR"
echo "   GROQ_API_KEY : ${GROQ_API_KEY:0:20}..."
echo ""

case "${1:-run}" in
  transcripts)
    echo "📥 Mode : transcripts only"
    python3 "$SCRIPT_DIR/pipeline.py" --transcripts-only
    ;;
  groq)
    echo "🤖 Mode : Groq only (depuis cache)"
    python3 "$SCRIPT_DIR/pipeline.py" --groq-only
    ;;
  force)
    echo "🔄 Mode : force (re-traitement complet)"
    python3 "$SCRIPT_DIR/pipeline.py" --force
    ;;
  run|*)
    echo "🚀 Mode : run complet (resume)"
    python3 "$SCRIPT_DIR/pipeline.py"
    ;;
esac

echo ""
echo "📚 Restart library server..."
pkill -f "node.*library/server.js" 2>/dev/null || true
sleep 1
cd "$WORKSPACE/library" && nohup node server.js > /tmp/clawdbot-library.log 2>&1 &
sleep 2

echo "✅ Library server redémarré"
curl -s http://localhost:4242/api/stats | python3 -m json.tool 2>/dev/null | head -10 || echo "(stats non disponibles)"
