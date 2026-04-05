#!/bin/bash
# firecrawl.sh — Wrapper Firecrawl API pour Clawdbot Prime
# Usage :
#   bash firecrawl.sh scrape <URL>                    → markdown d'une page
#   bash firecrawl.sh crawl <URL> [max_pages]         → crawl site entier
#   bash firecrawl.sh extract <URL> "<prompt>"        → extraction structurée LLM
#   bash firecrawl.sh search "<query>"               → search + scrape résultats
#
# Prérequis : FIRECRAWL_API_KEY dans ~/.openclaw/credentials/anthropic.env

set -e

# Charger la clé
if [ -f ~/.openclaw/credentials/anthropic.env ]; then
  source ~/.openclaw/credentials/anthropic.env
fi

API_KEY="${FIRECRAWL_API_KEY:-fc-500f64750bc34036a6cf16ac4d7d2719}"
BASE_URL="https://api.firecrawl.dev/v1"

if [ -z "$API_KEY" ]; then
  echo "❌ FIRECRAWL_API_KEY manquante."
  echo "   → Ajouter dans ~/.openclaw/credentials/anthropic.env :"
  echo "   FIRECRAWL_API_KEY=fc-xxxxxxxxxxxxxxxxx"
  echo "   → Clé gratuite sur : https://www.firecrawl.dev/app/api-keys"
  exit 1
fi

CMD="${1:-scrape}"
URL="$2"
EXTRA="$3"

case "$CMD" in

  scrape)
    # Scrape une page → markdown LLM-ready
    echo "🔥 Scraping: $URL"
    curl -s -X POST "$BASE_URL/scrape" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -d "{
        \"url\": \"$URL\",
        \"formats\": [\"markdown\"],
        \"onlyMainContent\": true
      }" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    md = data['data'].get('markdown', '')
    print(md[:8000])  # Limité à 8K chars
else:
    print('❌ Erreur:', data.get('error', 'Unknown'))
"
    ;;

  crawl)
    # Crawl site entier (async)
    MAX="${EXTRA:-10}"
    echo "🔥 Crawling: $URL (max $MAX pages)"
    JOB=$(curl -s -X POST "$BASE_URL/crawl" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -d "{
        \"url\": \"$URL\",
        \"limit\": $MAX,
        \"scrapeOptions\": {\"formats\": [\"markdown\"], \"onlyMainContent\": true}
      }")
    JOB_ID=$(echo "$JOB" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id',''))")
    echo "Job ID: $JOB_ID"
    echo "→ Vérifier : bash firecrawl.sh status $JOB_ID"
    ;;

  status)
    # Récupérer résultat crawl
    JOB_ID="$URL"
    echo "📊 Status job: $JOB_ID"
    curl -s "$BASE_URL/crawl/$JOB_ID" \
      -H "Authorization: Bearer $API_KEY" | python3 -c "
import sys, json
data = json.load(sys.stdin)
status = data.get('status', '?')
docs = data.get('data', [])
print(f'Status: {status} | Pages: {len(docs)}')
for d in docs[:3]:
    meta = d.get('metadata', {})
    print(f'  → {meta.get(\"title\",\"?\")} ({meta.get(\"url\",\"\")})')
    print(f'    {d.get(\"markdown\",\"\")[:200]}...')
"
    ;;

  extract)
    # Extraction structurée LLM
    PROMPT="${EXTRA:-Extrais les informations principales}"
    echo "🤖 Extraction LLM: $URL"
    echo "Prompt: $PROMPT"
    curl -s -X POST "$BASE_URL/extract" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -d "{
        \"urls\": [\"$URL\"],
        \"prompt\": \"$PROMPT\"
      }" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    print(json.dumps(data.get('data', {}), indent=2, ensure_ascii=False))
else:
    print('❌', data.get('error', 'Unknown'))
"
    ;;

  search)
    # Search + scrape automatique
    QUERY="$URL"
    echo "🔍 Search + Scrape: $QUERY"
    curl -s -X POST "$BASE_URL/search" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -d "{
        \"query\": \"$QUERY\",
        \"limit\": 5,
        \"scrapeOptions\": {\"formats\": [\"markdown\"], \"onlyMainContent\": true}
      }" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    results = data.get('data', [])
    for r in results:
        meta = r.get('metadata', {})
        print(f'### {meta.get(\"title\", \"?\")}')
        print(f'URL: {meta.get(\"url\", \"\")}')
        print(r.get('markdown', '')[:500])
        print('---')
else:
    print('❌', data.get('error'))
"
    ;;

  *)
    echo "Usage: bash firecrawl.sh [scrape|crawl|extract|search|status] <url/query> [options]"
    ;;
esac
