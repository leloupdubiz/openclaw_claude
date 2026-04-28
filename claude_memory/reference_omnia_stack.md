---
name: iCommerce (ex-OMNIA) — Architecture SaaS à reproduire
description: Structure complète d'iCommerce (ex-OMNIA) (7 modules SaaS) que Claude Code devra reproduire et améliorer — Command Center, EVOLVE, Studio Clip, AdSpy, Bibliothèque, Compta, Settings
type: reference
---

## iCommerce (ex-OMNIA) — SaaS à reproduire

OMNIA est un "Creative OS" pour opérateurs e-commerce DTC. Chef l'a construit avec OpenClaw. Mon job : le reproduire, le continuer, l'améliorer.

### Stack technique actuelle
- **Backend :** Node.js / Express (server.js monolithique ~5000+ lignes)
- **Frontend :** HTML/JS dans public/
- **Data :** JSON files (pas de DB relationnelle)
- **Routes :** image-factory.js, ugc-pipeline.js, video-cloner.js
- **Moteur :** automation-engine.js
- **Port :** 3002
- **Machine actuelle :** VM macOS ARM (/Users/pc2/.openclaw/workspace/omnia/)

### Les 7 modules à reproduire

#### 1. Command Center (CORE)
Dashboard principal — vue d'ensemble de tous les projets.
- OKR & Projets : objectifs → key results → tâches (matrice Eisenhower)
- To-Do : gestion tâches avec priorités P0-P3
- Mission Control : suivi missions agents
- KPI cards en haut (clips générés, progression EVOLVE, lancement Meta, projets actifs, OKR, todos)

#### 2. EVOLVE (CORE)
SaaS de recherche marketing automatisée — le cœur stratégique.
- Création de projets EVOLVE par produit (nom, URL, description, marchés cibles multi-pays, sites concurrents, URLs Amazon, BrandSearch, TrendTrack, subreddits, budget test)
- Pipeline 4 phases : Research → Strategy → Execution (avec progress bar visuelle)
- 8 agents de recherche autonomes (Market Researcher, Avatar Architect, Ad Library Spy, Research Synthesizer, Sub-Avatar Specialist, Review Analyzer, BrandSearch+TrendTrack, Research Doc Generator) — chacun avec statut actif/inactif et priorité P0-P2
- Dashboard data : désirs, verbatims, angles, hooks (compteurs)
- Onglets : Marché, Avatars, Angles, Concurrents, Hooks, Dashboard
- Bouton "Créer & Scraper les sources" pour lancer la recherche
- Support multi-marchés (FR, DE, EN, ES, IT)

#### 3. Studio Clip (CORE)
Générateur automatisé d'ads vidéo UGC/image/animation.
- Intègre kie.ai et HeyGen pour la génération vidéo IA
- Configuration d'avatars (19 configurés) et d'angles (9)
- Pipeline de génération batch
- Compteur de crédits kie.ai

#### 4. AdSpy Pro (INTELLIGENCE)
Veille concurrentielle sur les publicités.
- Monitoring des ads concurrents

#### 5. Bibliothèque (INTELLIGENCE)
Knowledge base complète avec moteur de recherche.
- 5 catégories : Formations, Vidéos & Playlists, Articles & Ressources Web, Livres, Stratégie & Outils
- Moteur de recherche full-text
- Stats : nombre de docs, lignes, taille
- API reload (/api/reload)

#### 6. Compta (INTELLIGENCE)
Clone/intégration Triple Whale — analytics e-commerce.
- Connexion à Triple Whale API (drinknellio.com synced)
- Workspaces : Summary, Marketing Acquisition, Creative Analysis, Website Conversion, Customer Retention
- Tools : Moby AI, Settings
- Pinned Metrics, Attribution par source, graphe Ad Spend vs Revenue
- Web Analytics, Store metrics
- Filtres temporels (Today, Yesterday, 7d, 30d, MTD) + vs Previous Period

#### 7. Settings (SYSTÈME)
Configuration de l'app.

### Éléments UI transversaux
- Sidebar gauche avec navigation par section (CORE, INTELLIGENCE, SYSTÈME)
- Compteur crédits kie.ai en bas de sidebar
- Toggle thème Sombre/Mono
- Design dark mode, cards avec métriques, progress bars colorées

### Code source
- **Repo Git :** https://github.com/leloupdubiz/openclaw_claude
- **Clone local :** `/Users/moha.k2l/Downloads/openclaw_claude/`
- **Code OMNIA :** `/Users/moha.k2l/Downloads/openclaw_claude/omnia/` (server.js = 6363 lignes)
- **Backup archive :** `/Users/moha.k2l/Downloads/openclaw-full-backup-20260405.tar.gz` (282 MB)
- Repo contient tout le workspace : OMNIA, EVOLVE_RESULTS, nellio-research, nellio-studio, formations, books, library, etc. (2527 fichiers, 133 MB)
