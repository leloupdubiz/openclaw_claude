# Progress — Standardisation EVOLVE Universel
Démarré : 2026-03-07 18h41
Terminé : 2026-03-07 19h30

## TOUS LES BLOCS TERMINÉS ✅

## Sous-tâches
- [x] Bloc 1 : Upgrade prompt research — STEP 9 (20 désirs), STEP 11 (20 problèmes), STEP 14 (20 objections), STEP 14BIS (20 expériences), STEP 16 (15 sub-avatars), STEP 17 (10 angles), STEP 21 (30 hooks), STEP 22 (CRO audit) — standard 6000+ mots
- [x] Bloc 2 : Endpoint PDF (GET /api/evolve/universal/export-pdf/:slug) — HTML/print format ~50 pages — server.js
- [x] Bloc 3-4 : Agent UI Research (8 agents) + Strategy (7 agents) — dynamique par projet — renderEvolveAgents(phase)
- [x] Bloc 5 : Agent UI Execution (4 agents) + Optimization (5 agents) — même système
- [x] Bloc 6 : Endpoint agent-run (POST /api/evolve/universal/agent-run) — 24 agents avec prompts spécialisés par projet + historique conversation — server.js

## Fichiers modifiés
- `/Users/pc2/.openclaw/workspace/omnia/server.js` — prompt research étendu (STEPs 9→22) + endpoint /agent-run (24 agents) + endpoint /export-pdf
- `/Users/pc2/.openclaw/workspace/omnia/public/index.html` — EVOLVE_AGENTS définition (4 phases × agents), renderEvolveAgents(), euActivateAgent(), euSendAgent(), showAgentsLayer() mis à jour, euExportPDF(), DOMContentLoaded init

## ⚠️ RESTART OMNIA OBLIGATOIRE
Tous les changements server.js = inactifs jusqu'au restart.
`launchctl stop com.clawdbot.omnia && launchctl start com.clawdbot.omnia`

## Agents disponibles après restart

### RESEARCH (8)
- market-researcher · avatar-architect · ad-library-spy · research-synthesizer
- sub-avatar-specialist · review-analyzer · brandsearch-trendtrack-curator · research-doc-generator

### STRATEGY (7)
- strategy-lead · angle-extractor · concept-strategist · awareness-mapper
- market-sophistication-analyst · creative-roadmap-manager · creative-roadmap-builder

### EXECUTION (4)
- campaign-builder · budget-optimizer · ugc-coordinator · seeding-manager

### OPTIMIZATION (5)
- performance-monitor · iteration-creator · scale-strategist · learning-analyst · learnings-storage

## Standard Research prompt (tous projets)
- STEP 9 : 20 désirs (Intensité × Scope) + désir viral caché
- STEP 10 : 20 verbatims (langue client brut)
- STEP 11 : 20 problèmes (4 niveaux chacun)
- STEP 12 : 8-10 concurrents + carte positionnement
- STEP 13 : 10+ claims analysés (défendable/risque)
- STEP 14 : 20 objections groupées par type
- STEP 14BIS : 20 expériences customer journey (7 pré/3 achat/10 post)
- STEP 15 : 6+ segments avec LTV × volume
- STEP 16 : 15 sub-avatars (5 par Core Avatar)
- STEP 17 : 10 angles scorés + top 3 Marksman + structure 3-2-2
- STEP 18 : 5 winning ads analysés
- STEP 19 : Requêtes exactes (Ad Library, BrandSearch, TrendTrack, Amazon, Reddit...)
- STEP 20 : 20 insights créatifs actionnables
- STEP 21 : 30 hooks (Type A pattern interrupt / B question / C chiffre / D histoire)
- STEP 22 : CRO audit (ATF, PDP, Checkout, 10 tests A/B, 5 quick wins)
