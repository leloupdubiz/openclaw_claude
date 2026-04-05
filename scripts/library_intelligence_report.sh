#!/bin/bash
# library_intelligence_report.sh
# Génère un rapport d'intelligence depuis la bibliothèque + web
# Usage : bash library_intelligence_report.sh [focus: saas|ecom|general|all]
# Appelé par cron "library-weekly-intelligence"

WORKSPACE="/Users/pc2/.openclaw/workspace"
OUTPUT_DIR="$WORKSPACE/INTELLIGENCE_REPORTS"
DATE=$(date +%Y-%m-%d)
FOCUS="${1:-all}"

mkdir -p "$OUTPUT_DIR"

echo "📊 Library Intelligence Report — $DATE"
echo "Focus: $FOCUS"
echo "---"

# Compter les docs par catégorie dans la bibliothèque
echo "Fetching library catalog..."
CATALOG=$(curl -s http://localhost:4242/api/catalog 2>/dev/null | head -c 50000)

echo "Library online: $([[ -n "$CATALOG" ]] && echo "✅" || echo "❌")"
echo "Output: $OUTPUT_DIR/intelligence_$DATE.md"
echo "Done — sub-agent will generate the full report."
