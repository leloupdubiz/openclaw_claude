#!/usr/bin/env python3
"""
tavily_agents.py — Research web LLM-optimisé pour Clawdbot Prime
Usage: python3 tavily_agents.py "<query>" [basic|advanced]
Clé API : ajouter TAVILY_API_KEY dans ~/.openclaw/credentials/anthropic.env
"""
import sys
import os

# Charger les credentials
from pathlib import Path
env_file = Path.home() / '.openclaw/credentials/anthropic.env'
if env_file.exists():
    for line in env_file.read_text().splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip())

try:
    from tavily import TavilyClient
except ImportError:
    print("❌ Installe tavily: pip3 install tavily-python")
    sys.exit(1)

API_KEY = os.environ.get('TAVILY_API_KEY', '')
if not API_KEY:
    print("⚠️  TAVILY_API_KEY manquante dans ~/.openclaw/credentials/anthropic.env")
    print("   Clé gratuite sur : https://tavily.com (1000 req/mois)")
    sys.exit(1)

client = TavilyClient(api_key=API_KEY)

query = ' '.join(sys.argv[1:-1]) if len(sys.argv) > 2 else (sys.argv[1] if len(sys.argv) > 1 else 'test')
depth = sys.argv[-1] if sys.argv[-1] in ['basic', 'advanced'] else 'advanced'

results = client.search(query, search_depth=depth, max_results=5)
for r in results.get('results', []):
    print(f"\n### {r['title']}")
    print(f"URL: {r['url']}")
    print(r.get('content', '')[:500])
    print('---')
