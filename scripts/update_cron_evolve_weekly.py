#!/usr/bin/env python3
"""
Met à jour le cron evolve-weekly pour enrichir tous les projets EVOLVE Universel.
Utilisation : python3 update_cron_evolve_weekly.py
"""
import json, os, shutil

JOBS_FILE = '/Users/pc2/.openclaw/cron/jobs.json'
TARGET_ID = 'cc965d8c-49e1-4c81-851c-b21ece53ceb1'

NEW_NAME = 'evolve-weekly-enrich'
NEW_MESSAGE = """Tu es Clawdbot Prime. Mission : enrichissement hebdomadaire automatique de tous les projets EVOLVE Universel.

RÈGLE ABSOLUE : ne jamais écraser les fichiers existants. Chaque enrichissement = nouveau fichier daté enrichment-YYYY-MM-DD.md

═══════════════════════════════════════════════
ÉTAPE 1 — Lister tous les projets actifs
═══════════════════════════════════════════════
Lire le dossier : /Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/universal/
Chaque sous-dossier = 1 projet EVOLVE Universel.
Pour chaque, lire meta.json → récupérer : slug, product, url, markets, budget.

═══════════════════════════════════════════════
ÉTAPE 2 — Enrichir chaque projet via l'API OMNIA
═══════════════════════════════════════════════
Pour chaque projet (slug extrait de meta.json) :
  curl -s -X POST http://localhost:3002/api/evolve/universal/enrich \\
    -H "Content-Type: application/json" \\
    -d '{"slug":"[SLUG_DU_PROJET]"}'

Attendre la réponse (max 120s par projet). Logger : slug | chars | date | statut.

Si OMNIA est DOWN (curl échoue) :
- Faire les recherches web directement avec web_search (5 requêtes par projet)
- Sauvegarder dans /Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/universal/[slug]/enrichment-[date]-manual.md

═══════════════════════════════════════════════
ÉTAPE 3 — Enrichissement NELLIO (spécial)
═══════════════════════════════════════════════
Recherches web_search sur 5 axes (marché DE) :
1. Verbatims récents DE : "Ashwagandha" OR "Stress schlafen" OR "Cortisol" site:reddit.com OR gutefrage.net — 7 derniers jours
2. Nouveaux concurrents DE : stress supplement Ashwagandha kaufen 2025 2026 nouveauté
3. Études récentes : ashwagandha cortisol L-theanine magnesium 2025 2026 studie
4. Tendances DE : Schlaf verbessern Stress natürlich trending 2025
5. Avis Amazon DE : Ashwagandha Stress Bewertungen récents

Sauvegarder dans :
/Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/research_weekly/[DATE]/ENRICHMENT_NELLIO_[DATE].md
APPEND 1 ligne dans :
/Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/research_weekly/INDEX.md

═══════════════════════════════════════════════
ÉTAPE 4 — Rapport Discord final
═══════════════════════════════════════════════
Envoyer 1 message sur Discord :
"⚡ EVOLVE Weekly Enrichissement — [DATE]
📊 Projets traités : [N] projets EVOLVE Universel + Nellio
[Pour chaque projet] → [product] · enrichment-[date].md · [chars] chars ✅/❌
💡 Insight clé global : [1 observation notable]
📁 Fichiers : EVOLVE_RESULTS/universal/[slug]/enrichment-[date].md"
"""

# Backup
shutil.copy(JOBS_FILE, JOBS_FILE + '.pre-enrich-update.bak')

with open(JOBS_FILE, 'r') as f:
    data = json.load(f)

updated = False
for job in data.get('jobs', []):
    if job.get('id') == TARGET_ID:
        job['name'] = NEW_NAME
        job['payload']['message'] = NEW_MESSAGE
        # S'assurer que le timeout est suffisant (3600s = 1h pour tous les projets)
        job['payload']['timeoutSeconds'] = 3600
        updated = True
        print(f"✅ Job {TARGET_ID} mis à jour : {NEW_NAME}")
        break

if not updated:
    print(f"❌ Job {TARGET_ID} non trouvé")
    exit(1)

with open(JOBS_FILE, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ jobs.json mis à jour")
print(f"Backup : {JOBS_FILE}.pre-enrich-update.bak")
