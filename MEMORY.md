# MEMORY.md — Clawdbot Prime ⚡
> Mémoire long-terme consolidée. Dernière mise à jour : 2026-04-02 13h15

---

## 1. MON HUMAN — CHEF

- **Appelé :** Chef
- **Profil :** Entrepreneur / Operator e-commerce DTC
- **Timezone :** Europe/Paris (GMT+1)
- **Langue préférée :** Français (outputs ads : Allemand)
- **Style :** Data-driven, orienté performance, plans concrets, pas de généralités
- **Directive clé :** Travailler en autonomie — ne pas solliciter inutilement ("arrete de me solliciter")

---

## 2. SON E-COMMERCE — PRODUIT & CHIFFRES

### Brand : drinknellio.com
- **Produit phare :** Nellio UltraCalm — poudre boisson anti-stress, arôme Framboise-Citron
- **Marché cible :** Allemagne (langue : Allemand)
- **Canal :** DTC (direct-to-consumer)

### Fiche Produit
| Élément | Détail |
|---------|--------|
| Format | Poudre à dissoudre |
| Arôme | Framboise-Citron |
| Ashwagandha | 300mg |
| L-Theanin | 400mg |
| Magnesiumglycinat | 100mg |
| Vitamine D3 | 1000 I.E. |
| Rating | ⭐ 4.8/5 |
| Reviews | 20,000+ Bewertungen |
| Garantie | 45 Tage Geld-zurück-Garantie |

### Chiffres & Marges
- Aucune donnée de marge, pricing ou CA communiquée à ce stade.
- Budget test publicitaire estimé (EVOLVE) : $2,000–$5,000/mois minimum.

### Plateformes
- Publicité : **Meta Ads** (principal canal identifié)
- Stack analytics non précisé (Triple Whale possible)
- Outils créatifs non précisés (Foreplay possible)

### 4 Avatars Cibles Configurés
| Avatar | Âge | Persona |
|--------|-----|---------|
| stressed_professionals | 25-40 | Cadres surmenés |
| busy_moms | 30-45 | Mères actives |
| students | 18-25 | Étudiants stressés |
| wellness_enthusiasts | 25-45 | Passionnés bien-être |

---

## 3. FORMATION EVOLVE — FRAMEWORKS & AGENTS

### Formation EVOLVE
- **140+ fichiers** analysés (13 modules, transcriptions complètes)
- Analyse terminée le 2025-02-20
- Livrables : `EVOLVE_DEEP_ANALYSIS.md` · `EVOLVE_AGENTS_MAP.md` · `EVOLVE_EXECUTIVE_SUMMARY.md`

### 5 Frameworks Clés
| # | Framework | Principe | Impact |
|---|-----------|----------|--------|
| 1 | **Desire-First** | Channel un desire existant, ne vends pas un produit | ↑ ROAS 20-40% |
| 2 | **5 Awareness Levels** | Unaware → Problem → Solution → Product → Most Aware | ↑ Scalabilité |
| 3 | **Sub-Avatar System** | Core avatar → Sub-avatars → Angles spécifiques | ↑ Relevance |
| 4 | **3-2-2 Testing** | 3 créatifs × 2 body copies × 2 headlines = 12 ads/test | ↑ Testing velocity |
| 5 | **Marksman → Sniper → Scale** | Test 3 angles → Deep-dive winner → Scale | ↑ Hit rate |

### Architecture des Agents EVOLVE (20+ mappés)

**RESEARCH LAYER**
- 🔍 Desire Researcher — Desires dominants du marché
- 🕵️ Ad Library Spy — Monitoring compétiteurs
- 🧩 Research Synthesizer — Connexion des insights
- 📚 Review Analyzer — Mining Amazon/Reddit

**STRATEGY LAYER**
- 🧬 Avatar Architect — Core avatars
- 🔬 Sub-Avatar Specialist — Sub-avatars (15-30)
- 🎯 Angle Extractor — Angles (30-90)
- 📋 Concept Strategist — Planning batches Marksman/Sniper

**CREATION LAYER**
- ✍️ Hook Writer — Hooks 3 secondes
- 🎬 Script Writer — Scripts UGC/VSL
- 🎨 Brief Creator — Briefs créatifs
- 🎥 Video Editor — Production vidéo
- 🖼️ Static Designer — Ads images
- 👤 UGC Coordinator — Gestion créateurs

**EXECUTION LAYER**
- 📊 Campaign Builder — Setup Meta
- 💰 Budget Optimizer — Gestion spend
- ⚡ Champion Scaler — Scale des winners
- 🛡️ Rules Engine — Protections automatiques

**ANALYSIS LAYER**
- 📈 Performance Analyst — Data analysis
- 🧠 Learning Documenter — Documentation des insights
- 🔄 Iteration Creator — Variations

### Budget Estimé Exécution EVOLVE
| Phase | Coût | Délai |
|-------|------|-------|
| Research | $500-800 | 1-2 sem |
| Avatars + Strategy | $300-600 | 1-2 sem |
| Creation (batch #1) | $1,000-3,000 | 1-2 sem |
| Testing (ad spend) | $2,000-5,000+ | Ongoing |
| **TOTAL M1** | **$3,700-9,400** | 4-6 sem |

> **Note :** Chef n'a pas encore précisé budget, produit cible pour EVOLVE, ni timeline. Ces décisions restent en attente.

---

## 4. PROJETS EN COURS & ÉTAT

### A. Nellio Studio 🟡 EN COURS
**Objectif :** Outil de génération créative pour drinknellio.com
**Fichier principal :** `/Users/pc2/.openclaw/workspace/nellio-studio/public/index.html`

**État actuel (2026-02-23) :**
- ✅ UI self-contained (dark premium, glass morphism, offline-first)
- ✅ 5 types de hooks · 4 audiences · 4 tons · 6 types d'images · 4 plateformes · 4 styles
- ✅ `generateScript()` → appel backend Claude via `/api/generate/script`
- ✅ `generateImagePrompt()` → migré vers Claude via `/api/generate/image-prompt`
- ✅ Backend `server.js` → Anthropic SDK (claude-opus-4-5), port 3001
- ✅ Panel config API key Anthropic (localStorage `anthropic_api_key`, `sk-ant-...`)
- ✅ `generateBatch()` → endpoint `/api/generate/batch` (3-2-2) implémenté côté backend
- ❌ Bouton Batch Generator dans le frontend → À CONSTRUIRE
- ❌ Historique persistant (localStorage) → À CONSTRUIRE
- ❌ Export Meta Ads → À CONSTRUIRE

**Autres fichiers Nellio :**
- Backend : `nellio-studio/src/api/server.js` (Node.js/Express, port 3001, SDK Anthropic — **migré de OpenAI le 2026-02-22**)
- Config brand : `nellio-studio/config/drinknellio.json`
- Démarrage : `cd ~/workspace/nellio-studio && npm start`

**Design :**
- Référence : www.l3ns.ai/product
- Brand colors : Coral `#FF6B6B` · Mint `#4ECDC4` · Cream `#FFF5F5`
- Modèle : `claude-opus-4-5` (Anthropic, migré de GPT-4)
- API key : localStorage `anthropic_api_key` (`sk-ant-...`), jamais partagée

---

### B. OMNIA SaaS ✅ CONCEPTION TERMINÉE (pas de code)
**Fichier :** `/Users/pc2/.openclaw/workspace/SAAS_OMNIA_CONCEPTION.md` (22KB, 11 sections)
**Scope :** SaaS full-stack pour opérateurs DTC — automation A to Z
**Sections :** Vision → Problème → Modules → Fonctionnalités → Ordre dev → Effet levier → Architecture → Risques → Avantage compétitif → Plan 90j → Idées additionnelles
**Status :** Conception théorique uniquement — build code non commencé

---

### C. 62 Book Summaries ✅ TERMINÉ
**Fichier :** `/Users/pc2/.openclaw/workspace/books/RESUMES_COMPLETS_62_LIVRES.md`
**Contenu :** 4811 lignes · 62 résumés · Structure 7 sections chacun
**Base :** Frameworks Hormozi + marketing DTC

---

### D. Formation EVOLVE ✅ ANALYSE TERMINÉE
**Fichiers :**
- `EVOLVE_DEEP_ANALYSIS.md` (8,439 bytes)
- `EVOLVE_AGENTS_MAP.md` (22,801 bytes)
- `EVOLVE_EXECUTIVE_SUMMARY.md` (7,995 bytes)
- `EVOLVE MAIN COURSE/` — 140+ fichiers source

---

### E. Knowledge Base ✅ CRÉÉE
- `KB_ARCHITECTURE.md`
- `KB_ECOMMERCE.md`
- `KB_ADVERTISING.md`

### G. Discord Server ✅ OPTIMISÉ (2026-02-24)
**Structure :** 8 catégories · 16 channels · 2 vocaux · tous épinglés
**Catégories :** 📋 COMMAND CENTER · ⚡ NELLIO STUDIO · 🎯 EVOLVE · 📊 META ADS · 🧠 KNOWLEDGE · 🔧 SYSTEM · 🎙 VOCAL · 🏗️ OMNIA SAAS
**Features :** Voice activé · requireMention:false · daily-report → #daily-report · 28 vidéos YouTube dans #youtube-learning

---

### F. Formation EVOLVE CRO 🟡 EN COURS
**Source** : MEGA `https://mega.nz/folder/0ANgVRJZ#aWLsBr00URk6vP56ucXGjQ`
**Formateur** : Spencer | **Modules** : 8 (CRO Basics → Sales Optimizations)
**Fichiers** : `/workspace/formations/cro-evolve/` (summaries/ + transcripts/)
**Outils** : megadl + Whisper large-v3-turbo + pipeline.py
**État (mis à jour 2026-03-23)** :
- ✅ Module 1 CRO Basics (4 vidéos — 4 résumés)
- ✅ Module 2 : résumés générés (pipeline Whisper+Groq)
- ✅ 10 résumés supplémentaires générés le 2026-03-21 (session autonome) → dans `formations/cro-evolve/summaries/`
  - 1-understanding-your-product · 16-cro-research-twitter · 22-download-entrants-upload-sheet
  - 24-organize-sheet-feedback-data-part1 · 25-cro-hack-qa · 26-organize-sheet-feedback-data-part3
  - 28-upload-knowledge-basis-chatgpt · 3-getting-ready-research-branding · 3-key-metrics-cro · 30-summarize-data-custom-gpt
- ❌ Modules 3-8 : cron midnight pipeline (ID: 883c7963) actif mais statut avancement inconnu
- ⚠️ Library restart requis pour indexer les nouveaux résumés en UI
**Insight clé** : Ad-Focused CRO = tester landing pages par angle d'ad, mesurer au ROAS. PageDeck = outil principal ($149/mois, code EZA15 -15%). Shopify Score = AOV × CVR → cible 250+.

---

## 5. DÉCISIONS PRISES ENSEMBLE

| # | Décision | Contexte |
|---|----------|----------|
| 1 | **Nellio Studio = MVP personnel d'abord** | Scope réduit vs OMNIA SaaS complet |
| 2 | **UI statique d'abord** — `index.html` sans serveur | Rapidité d'itération |
| 3 | **Langue UI = Français, outputs = Allemand** | Marché allemand, user francophone |
| 4 | **Midjourney prompts > direct image API** | Meilleur contrôle créatif |
| 5 | **API key en localStorage uniquement** | Pas de backend pour la clé |
| 6 | **GPT-4 (pas gpt-4o)** | Choix explicite de modèle |
| 7 | **OMNIA SaaS = conception théorique uniquement** | Priorité à Nellio Studio opérationnel |
| 8 | **Book summaries = depuis connaissance intrinsèque** | PDFs non lisibles par les outils |
| 9 | **Design ref = l3ns.ai/product** | Référence esthétique premium |
| 10 | **Sora 2 = différé** | API pas encore disponible publiquement |
| 11 | **Nellio Studio → Anthropic (claude-opus-4-5)** | Migration complète depuis OpenAI GPT-4 le 2026-02-22 |
| 12 | **6 agents EVOLVE dotés de USER.md + MEMORY.md** | Contexte business partagé, continuité mémoire activée |
| 13 | **EVOLVE_RESULTS/ = dossier handoff inter-agents** | Convention nommage + index fichiers dans HANDOFF_PROTOCOL.md |
| 14 | **Memory flush activé** (`memoryFlush.enabled: true`) | Évite la perte de contexte lors des compactions |
| 15 | **Vector search = OpenAI uniquement** | Backend `memory-lancedb` impose `text-embedding-3-small/large` — pas d'option Claude |
| 16 | **Bibliothèque = 98 documents** | 62 livres + 28 vidéos playlist + 8 autres — vidéos intégrées le 2026-02-23 |
| 17 | **Clé API Anthropic stockée** | `~/.openclaw/credentials/anthropic.env` (chmod 600) — crédits à recharger sur console.anthropic.com |
| 18 | **Clé Groq ajoutée** | `GROQ_API_KEY=gsk_...` dans `~/.openclaw/credentials/anthropic.env` — modèle `llama-3.3-70b-versatile`, free tier, pipeline CRO summaries |
| 19 | **Market Research agent opérationnel** | SOUL.md v2 complet avec tool mapping, étapes d'exécution par plateforme (Google/Reddit/YouTube/Amazon/TikTok/Meta Ad Library/Shulex VOC), RESEARCH_DOC_TEMPLATE.md créé |
| 20 | **Pipeline Whisper+Groq autonome** | `whisper_module2.sh` mis à jour → transcrit ET génère le résumé Groq automatiquement après chaque vidéo |
| 21 | **PHASE 1 RESEARCH COMPLÈTE** | 6 fichiers EVOLVE_RESULTS/ livrés — PRIMARY DESIRE = "Reprendre le contrôle face au stress chronique" (CORTISOL angle) — Concurrent #1 = natural elements B0CHFSHGYM (€26.99 capsules) |
| 22 | **Google Drive Chef importé** | Product Overview Doc (790KB) sauvegardé → self_onboarding.md — pricing €34.99/€49.99/€89.99 — 6 USPs — 10 new science facts — 4 verbatim testimonials |
| 23 | **web_search NON configuré** | Brave API key manquante → `openclaw configure --section web` requis pour Google DE + Reddit DE recherches |
| 24 | **Whisper Python path fix** | Whisper = `/Users/pc2/Library/Python/3.9/bin/whisper` (pas python3 -m whisper) | Groq = `python3` (3.14) | Deux binaires différents |
| 25 | **Discord server restructuré** | 8 catégories · 16 channels texte + 2 vocaux · chaque channel = session isolée OpenClaw · briefs épinglés avec historique + tâches |
| 26 | **Voice Discord activé** | `channels.discord.voice.enabled: true` + guild config ouverte (pas de restriction par channel) · `/vc join` pour entrer · TTS manquant (besoin clé OpenAI) |
| 27 | **MEGA pipeline règle absolue** | NE JAMAIS megadl authentifié sans `--limit-speed=5000` → overflow en 2min à 60 MB/s · Toujours SIGSTOP pendant Whisper |
| 28 | **Cron midnight pipeline** | ID: 883c7963 · 00h00 Paris · relance `pipeline_smart.sh` pour M3-M8 CRO formation |
| 29 | **Autonomie technique** | Changements config/seuils = autonomie totale sans demander validation · Ne jamais solliciter Chef pour des décisions techniques évidentes et réversibles |
| 30 | **MEGA credentials** | leloupdelecom@gmail.com / 8Uf0cqW6V3mjwV · intégrées dans `pipeline_smart.sh` |
| 31 | **tmpfiles.org pour image hosting temporaire** | Gratuit, sans clé, Node 22 Blob natif. URLs expirent ~1 semaine. Endpoint `/api/image/host` dans OMNIA |
| 32 | **Brand assets = URL statique OMNIA** | Pas de base64 (trop lourd). Servis depuis `/assets/brand/` |
| 33 | **kie.ai sora-2-image-to-video CASSÉ** | Retourne toujours "image_url is required" même avec le champ passé — bug API, retry plus tard |
| 34 | **Higgsfield I2V = voie principale image-to-video** | API accepte URLs publiques. Modèles : `kling-video/v2.1/pro/image-to-video` + `higgsfield-ai/dop/preview` |
| 35 | **Packaging Nellio = STICK-PACK** (pas canister) | Sachet tubulaire ~2.5cm × 15cm, film métallisé, dégradé rose-bleu. Image réelle : `omnia/public/assets/brand/nellio_16.png`. NE JAMAIS écrire "canister" dans les prompts Sora 2 |
| 36 | **Sora 2 génère ~10s même avec duration:15** | Pour vidéo 40s → prévoir 4 scènes. Pour 60s → 6 scènes minimum |
| 37 | **Provider capability banners** | `#providerCapBanner` inline sous `#clipProvider`. Mis à jour par `updateClipModels()`. kie.ai + Higgsfield T2V = orange (vidéo silencieuse). HeyGen = vert (avatar parlant, TTS inclus) |
| 38 | **Market Sophistication DE = Stage 3-4** | Marché Ashwagandha/Anti-stress DE est saturé en claims basiques. Différenciateurs Nellio : KSM-66 exclusif, Framboise-Citron unique, 4-en-1 formule, 45j garantie. Angle CORTISOL_MÉCANISME reste #1 (score 90) |
| 39 | **Batch #1 Marksman validé** | 3 angles : CORTISOL_MÉCANISME (A3-e) + SCHLAF_CHRONIQUE (A2-a) + IDENTITE_PRO (A1-a) — Creative Roadmap dans `EVOLVE_RESULTS/creative_roadmap.md` |
| 40 | **9 corrections critiques OMNIA agents (2026-02-25)** | CBO exclusivement (pas ABO), Script 6 étapes obligatoire (Hook→Problem→Bridge→Mechanism→Proof→CTA), Rule of One, 4 catégories désirs Spencer, Trigger Event, Surf Scaling, Blended ROAS, Hook Rate+Hold Rate, Séquence itération EVOLVE M14 |
| 41 | **3 agents P0 manquants dans OMNIA** | Research Doc Generator · Creative Roadmap Builder · Learnings Storage — à créer |
| 42 | **Pipeline Whop 90 leçons lancé** | PID 53320 · rythme ~15min/leçon · fin estimée 26/02 matin |
| 43 | **EVOLVE_FULL_SYNTHESIS.md créé** | 53KB · 13 modules complets · via sous-agent evolve-full-read (17min) → `EVOLVE_RESULTS/EVOLVE_FULL_SYNTHESIS.md` |
| 44 | **Bibliothèque mise à jour** | 330 docs · 33 catégories · section EVOLVE Synthèse ajoutée (FULL_SYNTHESIS + GAPS_AGENTS) |
| 45 | **Shopify API token obtenu** | `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` · scopes : read_analytics/customers/orders/products · boutique "nellio" EUR · sauvegardé `~/.openclaw/credentials/shopify.env` |
| 46 | **Triple Whale Clone — analyse phase 1** | Cartographie complète app.triplewhale.com · 7 modules · plan build 4 phases → `EVOLVE_RESULTS/TRIPLEWHALE_CLONE_ANALYSIS.md` · Build sur Mission Control (Next.js + Convex) · bloqué sur Meta + Google + Klaviyo tokens |
| 47 | **EVOLVE Phase 3 terminée** | 7 livrables EVOLVE_RESULTS/ : BRIEF_CREATEUR_UGC, BODY_COPIES_LONGUES, EMAIL_RETENTION_SEQUENCE, COMPETITORS_MASTER, GLOSSAIRE_COPY_DE, RESEARCH_MASTER_SYNTHESIS, LANDING_PAGE_AUDIT · Phase 4 bloquée sur actions Chef |
| 48 | **Landing Page CRO Score : 61/100** | 4 gaps P0 identifiés dans `EVOLVE_RESULTS/LANDING_PAGE_AUDIT.md` · action Chef requise |
| 49 | **Alerte disque 2026-03-04** | Pic critique 784 MB → PDFs supprimés + caches nettoyés → 3.87 GB puis 8.5 GB (2026-03-05) · Playwright hors service (cache supprimé) → relay Chrome uniquement |
| 50 | **OAuth token Anthropic = INTERDIT dans SDK** | `sk-ant-oat01-` incompatible avec `@anthropic-ai/sdk` (x-api-key header). Toujours `callClaude()` fetch direct avec `Authorization: Bearer` + `anthropic-beta: oauth-2025-04-20`. Décision durable. |
| 51 | **OMNIA V4 2026-03-07** | Refonte complète : dark palette, 24 agents 4 phases, Studio Clip global sidebar, UGC History onglet (500 entries localStorage), Video Cloner (FB Ad Library + YouTube), EVOLVE Universel 18 STEPS, ~10040 lignes HTML. Disk critique 1.7 GB → remonté 4.2 GB après Arc cache flush. |

---

## 6. OBJECTIFS PAR HORIZON

### Court terme (maintenant → 2 semaines)
- [x] Migration GPT-4 → Claude complète (backend Nellio Studio)
- [x] Bibliothèque 98 docs + playlist par chaîne YouTube
- [ ] Finir transcription formation EVOLVE CRO (modules 2-8) — pipeline séquentiel à refaire
- [ ] Générer résumés modules 2-8 depuis transcripts
- [ ] Test end-to-end Nellio Studio dans browser (UI → API → output allemand)
- [ ] Batch Generator UI opérationnel (bouton frontend, méthode 3-2-2)
- [ ] Historique persistant localStorage (Nellio Studio)
- [ ] Export Meta Ads format (Nellio Studio)
- [ ] Configurer OpenAI key pour vector search (memory embeddings)
- [ ] Mettre à jour OpenClaw vers v2026.2.22-2 (validation Chef OK)

### Moyen terme (1-3 mois)
- [ ] Connexion API image directe (openai-image-gen ou nano-banana-pro)
- [ ] Export Meta Ads (format upload direct)
- [ ] Lancer phase EVOLVE : Desire Researcher + Ad Library Spy
- [ ] Premiers batches de créatifs testés sur Meta
- [ ] Identifier premiers winners (3-2-2)

### Long terme (3-12 mois)
- [ ] Intégration Sora 2 quand API disponible (vidéo 100% AI)
- [ ] Scaler les winners → $100K+/day (cible EVOLVE)
- [ ] Transformer Nellio Studio en OMNIA SaaS (si validation marché)
- [ ] Stack complet : Research → Creation → Testing → Scale automatisé

---

## 7. CAPACITÉS OPENCLAW MAÎTRISÉES

### Architecture Gateway
- Config JSON5 → `~/.openclaw/openclaw.json` · hot-reload automatique · `openclaw config set` pour edits ciblés
- Gateway local sur port 18789 · Control UI → http://127.0.0.1:18789/
- Version actuelle : 2026.2.21-2 · Update dispo : 2026.2.22-2

### Agents (7 configurés)
- **main** (Clawdbot Prime) → workspace `~/.openclaw/workspace` · modèle claude-sonnet-4-6
- **6 agents EVOLVE** (désactivés) → creative-strategist · cro-funnel · data-analyst · market-research · media-buyer · video-script
- Chaque agent a son propre workspace, SOUL.md, AGENTS.md, sessions isolées
- Activation : ajouter heartbeat + bindings dans `openclaw.json`

### Mémoire
- Fichiers Markdown dans workspace : `MEMORY.md` (long terme) + `memory/YYYY-MM-DD.md` (daily)
- Outils : `memory_search` (sémantique) + `memory_get` (lecture ciblée)
- **BUG ACTIF** : vector index cassé (0 chunks) — cause : aucun provider embeddings configuré
- Fix requis : `memorySearch.provider: "openai"` + clé API dans config
- FTS (full-text) est ready, vector est unknown
- Pre-compaction memory flush : flush silencieux automatique avant compaction

### Cron Jobs (scheduler Gateway)
- Persisté dans `~/.openclaw/cron/jobs.json`
- **daily-retrospective** (ID: 5b365ae8) · 08h00 Paris · → #daily-report
- **disk-watchdog** (ID: 70ab9ef2) · toutes les 30min · stop tâches si <3GB · gateway stop si <1GB
- **cro-pipeline-midnight** (ID: 883c7963) · 00h00 Paris · relance `pipeline_smart.sh` M3-M8 · à supprimer après succès
- Modes : `main` (heartbeat context) ou `isolated` (session dédiée propre)
- Delivery : `announce` → canal Discord/Telegram · `webhook` → HTTP POST · `none` → interne
- Override modèle par job : `model` + `thinking` level
- CLI : `openclaw cron add/list/run/remove`

### Heartbeat
- Main : toutes les 1h · target: last
- 6 agents spécialisés : **DISABLED**
- `activeHours` disponible pour restreindre aux heures de bureau
- `HEARTBEAT_OK` = rien à signaler, stripped automatiquement
- Alerte = reply sans HEARTBEAT_OK → livré au canal

### Sessions & Compaction
- `dmScope: main` (single user — OK)
- Reset quotidien à 4h00 local
- Compaction mode "safeguard" · `/compact` manuel dispo
- `/new` ou `/reset` pour nouvelle session
- `/status` → infos contexte · `/context list` → system prompt
- `/stop` → abort run en cours

### Subagents & Multi-agents
- `sessions_spawn` → lancer un sous-agent en session isolée (run ou session)
- `subagents(action=list/steer/kill)` → contrôler les sous-agents
- `sessions_list/history/send` → inter-session messaging
- maxConcurrent=4 · subagents maxConcurrent=8
- Multi-agent : chaque agent a workspace + agentDir + sessions séparés
- Bindings : routent les messages inbound vers le bon agent (par channel, peer, guild)

### Skills & ClawHub
- 51 skills bundlées disponibles · 6 ready (coding-agent, discord, healthcheck, peekaboo, skill-creator, weather)
- **0 skills installées** dans workspace ou shared
- ClawHub CLI : `clawhub search/install/update/publish`
- Skills prioritaires à installer : apple-notes · blogwatcher · clawhub · github · gemini

### Canaux (Channels)
- **Discord** : token configuré · guilds vides → delivery impossible
- **Webchat** : actif (channel principal actuel)
- Canaux disponibles : WhatsApp · Telegram · Discord · Slack · Signal · iMessage · Google Chat · Mattermost · MS Teams
- Fix Discord requis : guildId + channelId → fournir par Chef

### Sandboxing
- Mode actuel : OFF
- Options : `off` · `non-main` · `all`
- Docker requis · `scripts/sandbox-setup.sh` pour build image
- Recommandé pour sub-agents en mode autonome

### Sécurité (warnings actifs)
- ⚠️ `chmod 700 ~/.openclaw/credentials` — credentials dir trop permissif
- ⚠️ `gateway.nodes.denyCommands` mal configuré (noms de commandes invalides)
- ⚠️ Reverse proxy headers non trusted (OK car local only)

### Commandes CLI utiles
```bash
openclaw status / openclaw status --deep
openclaw cron list/add/run
openclaw agents list --bindings
openclaw memory status / index --force / search
openclaw skills list
openclaw channels status --probe
openclaw doctor / openclaw doctor --fix
openclaw security audit
openclaw config get/set/unset
/compact · /status · /new · /stop · /context list
```

---

## 8. STACK TECHNIQUE & CONTRAINTES

### Environnement
- Workspace : `/Users/pc2/.openclaw/workspace/`
- OS : Darwin 23.6.0 (arm64)
- Node.js : v22.22.0
- Shell : zsh
- Modèle actif : anthropic/claude-sonnet-4-6

### Contraintes Techniques
- Subagent spawn : `agents_list` → `allowAny: false` → spawn limité à `main` uniquement (gateway ouvert mais pairing partiel)
- Gateway : **activé** (pid 38674, approuvé 2026-02-22) — URL locale http://127.0.0.1:18789/ pour autoriser agents spécialisés
- Discord : erreur "Failed to resolve Discord application id" → config à vérifier (`openclaw channels status --probe`)
- Browser tool : Chrome extension non connectée
- Sora 2 API : pas encore disponible publiquement
- `openclaw cron list` : non disponible en shell
- Cron job daily-retrospective : **actif** (ID: `5b365ae8-df94-4c7b-b795-f673f04b26e5`, 08h00 Paris)

### Skills Disponibles (pertinentes)
- `openai-image-gen` — génération images directe
- `nano-banana-pro` — image gen alternative
- `coding-agent` — agent de développement
- `sag` — ElevenLabs TTS (pour storytime/voix)
- `weather`, `discord`, `healthcheck`, `skill-creator`

---

## 8. RÈGLES DE COMPORTEMENT (pour moi-même)

1. **Ne pas solliciter** Chef inutilement — travailler en autonomie
2. **Français par défaut** pour les échanges, Allemand pour les outputs publicitaires
3. **Direct et structuré** — Objectif → Analyse → Plan → Action
4. **ROI-obsessed** — chaque décision liée à ROAS, LTV ou croissance rentable
5. **Écrire dans les fichiers** — pas de "notes mentales"
6. **MEMORY.md** : uniquement en session directe avec Chef, jamais en groupe/Discord
7. **Fichiers daily** : `memory/YYYY-MM-DD.md` pour les logs bruts de session

---
## Mise à jour 2026-02-24 (rapport 08h00)

### Formation CRO EVOLVE — Avancement M2
- **Module 2 : 13/14 vidéos** transcrites + résumées (Whisper + Groq pipeline)
- Seule vidéo manquante : probablement absente du MEGA folder
- Tous les fichiers dans `formations/cro-evolve/summaries/`
- **Outils CRO clés identifiés** : PageDeck ($149/mo, code `EZA15` -15%), Atria/Foreplay, GoFullPage Chrome ext, Figma swipe file

### Décision #25 — Brave API à configurer
- Chef gère l'inscription Brave Search API lui-même
- Une fois la clé obtenue : `openclaw configure --section web` pour activer `web_search`
- Débloque : Google DE SERPs, Reddit DE, AnswerThePublic DE

### Décision #26 — Drive docs à récupérer
- Google Drive folder `1cwJTckTlnc5SEXzV5tjNiPOElS8hf52B` (MA RECHERCHE NELLIO ORIGINS)
- 5 fichiers clés dont Master Document (118KB) + Creative Roadmap (13KB)
- Méthode : Chef télécharge ZIP → dépôt dans `~/Downloads/` ou `~/workspace/EVOLVE_RESULTS/`

### Concurrents DE — Mise à jour
- **Jello (trinkjello.com)** = clone direct Nellio, lancé 2026-02-18, €39.99, cible femmes/ménopause
- **APlus Nutri SuperCalm** = marché FR, formule identique, €39.90
- **natural elements** (Amazon DE) = capsules, concurrent #1 DE (ASIN B0CHFSHGYM, €26.99)
- **Nuclever.fr** = capsules FR, 4.9/5, 323 reviews
- Analyse complète → `EVOLVE_RESULTS/competitor_deep_analysis.md`

### ⚠️ Alerte Disque — 2026-02-24 08h00
- **Espace disponible : 9.2GB (15%) — SEUIL CRITIQUE ATTEINT**
- Cause principale : résidus downloads MEGA + transcripts vidéo
- Action P0 : cleanup à exécuter dès que Chef donne le feu vert
- Leçon pipeline : megadl JAMAIS sur un dossier entier → 1 vidéo à la fois → supprimer avant suivante

### EVOLVE_RESULTS — État Phase 1 (10 fichiers)
- `self_onboarding.md` · `desire_map.md` · `competitor_swipe.md` · `competitor_deep_analysis.md`
- `buzzwords_DE.md` · `objections_map.md` · `avatar_insights.md`
- `RESEARCH_PHASE1_COMPLETE.md` · `drive_synthesis.md` · `HANDOFF_PROTOCOL.md`
- **Phase 1 complète** — Phase 2 (Avatar Architect) = prochaine étape

### Insight Marché Clé (cortisol + réglementation DE)
- CORTISOL = angle dominant mais **risque réglementaire** (médecins DE critiquent "cortisol-gesicht" sur Reddit)
- KSM-66 est l'exception sûre selon BfR → angle à utiliser dans les ads
- Accroche candidate : *"Dein Cortisol macht Überstunden."*

### Brave API — Bloqueur Web Search
- web_search NON configuré (Brave API key manquante)
- Chef gère inscription : https://api-dashboard.search.brave.com/register
- Une fois clé dispo → `openclaw configure --section web`

---

## Mise à jour 2026-02-24 (session 14:48)

### Phase 1 EVOLVE — COMPLÈTE ✅
- **9 fichiers livrés** dans `nellio-research/phase1/` + `EVOLVE_RESULTS/dashboard.html`
- Document 1 (31KB) + Document 2 (33KB) — templates EVOLVE remplis avec recherche fraîche
- Dashboard 8 onglets (70KB) — data-driven JS, bilingue DE/FR, badges sources

### Décision #27 — Protocole Anti-Freeze permanent
- Règles §T1-T7 dans AGENTS.md : blocs 10min max, checkpoints auto, max 2 agents parallèle
- Fichiers de progress : `workspace/checkpoints/[nom-tache]-progress.md`

### Décision #28 — Disk Watchdog actif
- Cron job `disk-watchdog` (ID: 70ab9ef2) toutes les 30min
- < 3GB → stop tâches + alerte Discord · < 1GB → gateway stop

### Intelligence Concurrentielle Clé (durable)
- **CalmifyDrink** = formule identique Nellio, actif Meta EN, BOGO → gap DE = opportunité
- **SpaceGoods** = goût horrible (8116 Trustpilot reviews) → avantage Nellio Himbeer-Zitrone
- **Jello (DE)** = clone exact lancé fév 2026, 0 reviews, garantie 30j inférieure
- **Gap DE** = aucune marque active Meta Ads cortisol+poudre boisson → Premier Mover
- **Sleepmaxxing** = +1500% DE 2025 → angle Nellio massif à exploiter
- **Angle "imbalance"** > "high cortisol" → moins de risque réglementaire (BfR)

---

## Mise à jour 2026-02-24 (session 17:12)

### Phase 3 EVOLVE — Scripts Marksman COMPLETS ✅
- **12 créatives · 9 scripts UGC verbatim** (en allemand) pour Batches #1-#4
- Fichier : `nellio-research/phase1/EVOLVE_PHASE3/scripts_batch_marksman.md` (19KB)
- Phase 2 déjà complète : `angle_bank.md` (42 angles) · `hook_bank.md` (75 hooks) · `creative_roadmap_v2.md` (10 batches)

### Décision #31 — kie.ai comme moteur de génération vidéo UGC
- **URL** : https://kie.ai | **Compte** : leloupdelecom@gmail.com / azerty
- **API Key** : `788b72e5007d63c06539d84fb5ddfa54` (stockée dans `~/.openclaw/credentials/anthropic.env`)
- **Solde actuel** : 9,810 crédits (~$50 valeur — ne jamais expirer)
- **Pricing clé** :
  - Sora 2 text-to-video 15s = **40 crédits = $0.20/vidéo** → 245 vidéos disponibles maintenant
  - Kling 3.0 1080P avec audio = 40 crédits/seconde → 15s = 600 crédits = $3
- **57 modèles** : Veo 3.1, Sora 2, Runway Aleph, Kling 3.0, ElevenLabs V3, Nano Banana Pro...
- **Limit** : 20 générations/10sec par compte, vidéos max 15s actuellement

### Décision #32 — Formation "Anti-Slop AI UGC System" intégrée
- **Source** : MEGA `https://mega.nz/folder/pBNDCarA#PQLaeNmUVUojoOpcBY_RIw`
- **Fichiers** : `formations/ugc-ai-system/` (5 modules .docx + ressources SORA + SUMMARY.md)
- **Pipeline validé** (5 étapes) :
  1. Référence UGC (Meta Ad Library / KALO / TikTok)
  2. Gemini Gem "UGC Deconstructor" → analyse vidéo + prompt initial
  3. Claude Project "Sora Prompt Optimizer" → raffinement pixel-perfect
  4. kie.ai API → génération vidéo ($0.20/vidéo Sora 2)
  5. Test Meta Ads → scale winners
- **Coût réel Nellio Batch #1** : ~$0.60 (3 vidéos) vs €900 méthode traditionnelle

### Décision #33 — Architecture OMNIA : Module AI UGC Generator
- **Scope** : Script DE → prompt Sora optimisé → kie.ai API → vidéo UGC 9:16 15s
- **Input** : script DE (depuis scripts_batch_marksman.md) + avatar profile + image produit
- **Output** : MP4 prêt Meta Ads + métadonnées
- **Priorité** : Module 2 dans OMNIA (après script generator déjà existant dans Nellio Studio)

### Anatomie Prompt UGC Parfait (mémoriser)
Structure obligatoire : `[Camera Setup] → [Character @username] → [Product desc pixel-perfect] → [Cinematography] → [Actions timestamped] → [Audio] → [UGC Keywords] → [Negative prompts]`
Erreurs qui crient "IA" : yeux morts, produit flottant, éclairage parfait, fond vide, mains robotiques, voix annonceur, caméra pro
Clé : iPhone 15 Pro selfie-style + natural lighting + un seul concept + conversationnel

### Décision #34 — Higgsfield AI — compte actif ✅
- **URL** : https://higgsfield.ai
- **Compte** : leloupdelecom@gmail.com / Sardine.2310
- **Status** : Authentifié (login 2FA résolu le 2026-02-24 20h46)
- **Usage** : Explorer pour image-to-video avec packaging Nellio réel (alternative au blocage kie.ai sora-2-image-to-video)
- **Browser tab ID** : `8172B1E67D9C8C8757D30524DAA37AD4`

### Décision #35 — Packaging Nellio = STICK-PACK (pas canister) ✅ CRITIQUE
- Le produit Nellio UltraCalm est un **stick-pack individuel** (sachet tubulaire ~2.5cm × 15cm)
- Matière : film métallisé mat/satin laminé
- Couleurs : bande rose pâle en haut → dégradé bleu océan (#2E6EB5) → teal pastel (#B5DED8)
- Texte : "nellio" lowercase arrondi blanc · "ULTRA CALM" bold uppercase blanc · "Calming Drink Mix"
- Badge oval fond jaune pâle : "RASPBERRY LEMONADE FLAVORED" + illustrations framboise/citron
- Image réelle : `omnia/public/assets/brand/nellio_16.png`
- Constante dans server.js : `NELLIO_PACKAGING_ANCHOR`
- ⚠️ NE JAMAIS écrire "white cylindrical canister" dans les prompts Sora 2 — c'est FAUX

### Décision #36 — Nouveau paradigme OMNIA : clip par clip + export ZIP
- Abandon de l'assemblage FFmpeg automatique (trop tôt, qualité non maîtrisée)
- Workflow validé : générer 3 variantes → sélectionner la meilleure → accumuler dans un projet → export ZIP → montage CapCut/Premiere
- FFmpeg conservé uniquement pour : extract-reference-frame + conversion WebM

### Décision #37 — Sora 2 génère ~10s même avec duration:15 demandé
- Pour une vidéo 40s → 4 scènes (et non 60s comme espéré)
- Pour 60s → prévoir 6 scènes minimum
- Coût réel d'une vidéo 40s : $0.80 (4 clips)

### Brave API — CONFIGURÉE ✅
- **Clé** : `BSABcNz8nHqp3mod-cIUJsWQiLqKHfx` — déjà dans TOOLS.md
- **Quota** : $5 crédits gratuits/mois (~1,000 requêtes)

### OMNIA Sprint 1 — Résultats clés (2026-02-24)
- **Batch #1 "Der Cortisol-Wecker"** : 3 vidéos Sora 2 générées ($0.60 total) ✅
  - Vidéo 1A SA-02 : taskId `71dd66baaac4a2e4a8cdfcba154f22cf`
  - Vidéo 1B SA-01 : taskId `15ae5fa2024ddce331b6a1b58818e004`
  - Vidéo 1C SA-04 : taskId `ae6c4ea2ad59dbee060b6a4e8c597259`
- **WebM/VP9 pipeline** : auto-encode activé dans `cacheVideoLocally()` — Arc/Chrome-safe ✅
- **kie.ai image-to-video** : BLOQUÉ — sora-2-image-to-video ne supporte pas URLs image en input → workaround = description textuelle ultra-détaillée du packaging dans le prompt
- **Packaging Nellio pour prompts Sora** : *"white matte cylindrical canister labeled 'Nellio UltraCalm' in mint-green typography, raspberry-lemon flavor 'Himbeer-Zitrone' in German, 300g, black cap"*
- **Crédits kie.ai restants** : ~9,690 (~242 vidéos Sora 2)
- **Images produit** : 8 assets dans `omnia/public/assets/brand/` (nellio_10 à nellio_15 + OG images)

### Décision #38 — Higgsfield API KEY ✅ (2026-02-25)
- **API Key ID** : `04faf316-8d27-4c39-8c20-b8ab680cd601`
- **API Key Secret** : `0c9dc0ccf8ab28e8e979c58c7ea416b08d42beab4887d48593aa78c5c4f1e153`
- **Format dans server.js** : `key_id:key_secret` (séparés par ":")
- **Intégré dans** : `omnia/server.js` (HIGGSFIELD_API_KEY) + `~/.openclaw/credentials/anthropic.env`
- **Modèles T2V** : `higgsfield-ai/soul/standard`, `higgsfield-ai/soul/preview`
- **Base URL** : `https://platform.higgsfield.ai`

### Décision #39 — HeyGen API KEY ✅ + Voix NELLO (2026-02-25)
- **API Key** : `sk_V2_hgu_khW4FP1iEV5_48t3oD04Lj1W4b0E5LqUsqno33wJXcha`
- **Intégré dans** : `omnia/server.js` (HEYGEN_API_KEY) + `~/.openclaw/credentials/anthropic.env`
- **1287 avatars** disponibles (femmes/hommes, debout/buste, styles variés)
- **92 voix allemandes** disponibles dont voix NELLO custom :
  | Voix | ID | Genre |
  |------|-----|-------|
  | NELLO 5.mp4 | `13e72664c716438f8161117e15b1a353` | female/DE |
  | NELLO 2(1).mp4 | `7879068349524adcbd557d6acc542057` | female/DE |
  | NELLO 3.mp4 | `2bd36df41d6447e5a9a726bc6d227496` | female/DE |
  | UGC ALL - Jeune.mp4 | `1ecbdc5b17234bc083d489b76e9ac178` | female/DE |
  | Sophie - german UGC | `835791897c4d4098ba008c8b1c2b7564` | female/DE |
- **Endpoint vidéo** : `POST /v2/video/generate` (avatar + voice + script DE)
- **Polling** : `GET /v1/video_status.get?video_id={id}`

### OMNIA Sprint 2 — Multi-Provider Studio Clip (2026-02-25)
- **3 providers intégrés** : kie.ai (Sora 2 / Kling 3.0) + Higgsfield (Soul T2V) + HeyGen (avatar talking head)
- **Nouvelles features** : durée sélectionnable (5/10/15/20s) + modèle sélectionnable + personnage Sora 2 + traduction DE→FR auto
- **Endpoint `/api/translate`** : Claude Haiku → traduction instantanée DE→FR pour preview scripts
- **HeyGen : voix NELLO déjà configurées** → utiliser en priorité pour cohérence brand

### Décision #40 — tmpfiles.org pour image hosting temporaire
- **Endpoint** : `POST /api/image/host` sur OMNIA → upload vers tmpfiles.org → URL publique
- **Fonctionnement** : Node 22 `FormData` + `Blob` natifs (pas de package tiers)
- **Format URL** : `http://tmpfiles.org/dl/{id}/{filename}` (directement téléchargeable)
- **Usage** : Brand assets Nellio + fichiers uploadés depuis le browser avant génération I2V
- **Limite** : URLs expirent (~1 semaine) — acceptable pour génération one-shot

### Décision #41 — kie.ai sora-2-image-to-video CASSÉ (2026-02-25)
- Retourne toujours "image_url is required" même en passant le champ
- Testé avec : URL Shopify CDN, URL tmpfiles.org, différents noms de champ (image, image_url, first_frame_image...)
- **Statut** : Impasse. À retester si kie.ai corrige leur API

### Décision #42 — Higgsfield I2V = voie principale pour image-to-video
- Modèles : `kling-video/v2.1/pro/image-to-video` + `higgsfield-ai/dop/preview`
- API accepte les URLs publiques (validé : "not enough credits" = auth + image URL OK)
- Backend OMNIA : detect `isI2V` → envoie `image_url` au lieu de `duration`
- **Blocker actuel** : crédits insuffisants sur le compte Higgsfield

### Décision #43 — Image picker UI dans prompt visuel (2026-02-25)
- 3 onglets : 📦 Assets Nellio (11 images) | 📤 Upload | 🔗 URL
- Brand assets servis en static depuis OMNIA (pas de base64 dans l'API — trop lourd)
- State : `_selectedImageUrl` / `_selectedImageBase64` / `_selectedImageLocal`
- Auto-upload avant génération si image locale (brand asset ou fichier uploadé)

### ✅ VÉRITÉ CONFIRMÉE — kie.ai Sora 2 (2026-02-25, par Chef)
- **Son & voix** : Sora 2 génère la voix parfaitement via `speech_text` — le personnage parle le script DE
- **Produit** : Sora 2 reproduit le produit À L'IDENTIQUE depuis l'image fournie — aucune hallucination
- **Bannière UI corrigée** : suppression du warning "produit halluciné" (était FAUX)
- **NE JAMAIS réécrire ces warnings** — Chef a confirmé les capacités réelles par expérience directe

### Décision #44 — Provider Capability Banners OMNIA (2026-02-25)
- **Objectif** : informer l'utilisateur des limites réelles de chaque provider avant génération
- **Implémentation** : `<div id="providerCapBanner">` sous `#clipProvider` · mis à jour par `updateClipModels()`
- **kie.ai** : 🗣 "Sora 2 prononce le script via speech_text — TTS natif"
- **Higgsfield T2V** : 🔇 "Vidéo silencieuse — pas de TTS"
- **Higgsfield I2V** : 🖼 "Image-to-Video — fidélité produit améliorée · vidéo muette"
- **HeyGen** : ✅ "Avatar parlant · TTS inclus · image produit possible"
- Status (2026-02-25 09h54) : HTML injecté ✅ · logique `updateClipModels()` en cours

### OMNIA Sprint 3 — Réorganisation + Multi-génération (2026-02-25 après-midi)
- **Sidebar** : 13 onglets → 7 (suppression doublons)
- **Studio Clip unifié** : 5 sub-tabs (UGC / B-Roll / Voiceover / ZackD / Long Form)
- **Long Form** : génération 4–8 scènes séquentielles, même avatar/angle, export ZIP
- **Hiérarchie Spencer** : cascade Core Avatar → Sub-Avatar → Angle (dynamique)
- **Prompt varié** : seed aléatoire (heure+lumière) + hook verbatim obligatoire en ouverture script
- **Multi-génération** : système `activeJobs` — jobs indépendants, polling séparé, cartes non-écrasées

### Décision #45 — Hiérarchie Spencer dans UI (2026-02-25)
- Core Avatar (A1/A2/A3/A4) → Sub-Avatar (filtré) → Angle (recommandé ⭐ en premier)
- `SUB_AVATAR_MAP` hardcodé en JS (19 avatars, plus rapide que fetch API)
- `clipAvatarSelect` → `<input type="hidden">` syncé par JS (compat backend)
- Badge hook verbatim client affiché après sélection sub-avatar

### Décision #46 — Prompt anti-répétition (2026-02-25)
- Seed aléatoire : heure (7 variantes) + lumière (7 variantes) → combinatoire 49 contextes de base
- Hook verbatim OBLIGATOIRE en ouverture du SCRIPT_DE (système prompt imposé à Claude)
- AVOID instruction : "NOT a generic stress/calm ad — use the avatar's real environment"
- Résultat vérifié : A1-a (Manager) → bureau/blazer ≠ A3-c (Alles-Versucher) → salle de bain/supplements

### Décision #47 — Multi-génération simultanée OMNIA (2026-02-25)
- `activeJobs = {}` — dict jobId → { interval, numVariants, aspectCSS }
- `createJobGroup(jobId, N, aspect, meta)` — groupe UI indépendant, prependé (jamais effacé)
- `startJobPolling(jobId, N, aspect)` — interval per-job
- IDs uniques : `variant-video-${jobId}-${i}` — pas de collision entre jobs
- `cancelJob(jobId)` — cancel + fade visuel
- Legacy : `currentVariantJobId` + `startVariantPolling()` no-op conservés pour compat

### Décision #50 — gateway.bind = lan (2026-02-25)
- Contexte : Chef sur VirtualBuddy (VM) — micro non accessible → dictation impossible
- Fix : `bind: "loopback"` → `bind: "lan"` (0.0.0.0)
- Gateway accessible sur `http://192.168.1.3:18789/` depuis machine principale
- Token : `7f9cb6822b7791c8280369c7bcae25700378c4a54e3e742a`
- Chef accède depuis machine principale → dictation macOS native (Fn+Fn) opérationnelle

### Décision #51 — CBO vs ABO — Correction CRITIQUE (2026-02-25 22h)
- EVOLVE 2025 = **CBO exclusivement** (Campaign Budget Optimization — pas ABO)
- ABO = trop de contrôle manuel, Meta sous-optimise. CBO = Meta répartit le budget au meilleur coût
- Structure : 1 Campaign CBO (€150-200/j) → 3-4 Ad Sets → 3-4 ads/set
- Correction appliquée dans server.js (7 occurrences), creative_roadmap.md, AGENT_BRAND_CONTEXT

### Décision #52 — Script Framework Spencer obligatoire (2026-02-25 22h)
- 6 étapes : Hook (0-3s) → Problem Agitation (3-10s) → Bridge (10-15s) → Mechanism (15-25s) → Proof (25-35s) → CTA (35-45s)
- Awareness Level → Type de script : UNAWARE = ne mentionne pas Nellio avant 20s
- Rule of One : 1 désir + 1 angle + 1 CTA par script. Si "und" entre 2 promesses = 2 scripts séparés

### Décision #53 — 4 Catégories Désirs Spencer M2 (2026-02-25 22h)
- Utility : "Ich will schlafen können" → angle SCHLAF
- Identity : "Ich will wieder die Person sein die ich war" → angle IDENTITE
- Freedom : "Ich will nicht mehr von Cortisol kontrolliert werden" → angle CORTISOL
- Superiority : "Ich will leistungsfähiger sein als mein Umfeld" → angle PERFORMANCE
- Chaque sub-avatar a une catégorie dominante → le hook DOIT résonner avec cette catégorie

### Décision #54 — Surf Scaling Protocol + Blended ROAS (2026-02-25 22h)
- Surf Scaling : check Blended ROAS toutes 2-4h (heures clés : 9h-14h + 17h-21h Paris)
- Paliers : +20% si stable 48h → Doubler si stable 72h → Dupliquer adset en nouveau CBO €100/j
- Blended ROAS = Revenue Shopify total / Meta Spend total (PAS le ROAS Meta in-platform)
- Targets Blended ROAS : < 2.0 arrêt scale / 2.0-2.5 maintenance / 2.5-3.5 Surf actif / > 3.5 expansion DACH

### Décision #55 — Trigger Events + Séquence Itération EVOLVE M14 (2026-02-25 22h)
- Trigger Event = moment où le sub-avatar passe de "subir" à "chercher activement une solution" — champ obligatoire
- Séquence itération M14 : image → headline → persona → hook → corps (ordre obligatoire, 1 variable à la fois)
- Hook Rate (% watch 3s / impressions, cible > 30%) + Hold Rate (% watch 25% / 3s, cible > 40%) = KPIs M8 prioritaires

### Décision #56 — EVOLVE Full Synthesis complète (2026-02-25 22h)
- Sous-agent `evolve-full-read` : lecture de 140 fichiers en 17m, 53KB synthèse produite
- Fichiers : `EVOLVE_RESULTS/EVOLVE_FULL_SYNTHESIS.md` (53KB) + `GAPS_AGENTS_POST_FULL_READ.md` (14KB)
- 3 agents manquants identifiés (P0) : Research Doc Generator / Creative Roadmap Builder / Learnings Storage
- 26 agents OMNIA confirmés opérationnels avec corrections post-synthèse

### Décision #57 — Bibliothèque EVOLVE étendue (2026-02-25 22h)
- STATIC_CATALOG maintenant 7 items (0=parent, 1=Synthèses, 2=Phase1, 3=Phase2, 4=Audit, 5=Handoffs, 6=KB)
- Nouvelle section "📊 Audit & Stratégie Créative" (4 docs : audit, market sophistication, youtube research, creative roadmap)
- Phase 2 : 3 → 5 docs (+ angle_bank_complete + awareness_mapping)
- buildEVOLVESynthesisCatalog() dynamique : détecte EVOLVE_FULL_SYNTHESIS.md automatiquement
- 330 docs total, 33 catégories

### Décision #58 — Ressources EVOLVE Drive sauvegardées (2026-02-25 23h25)
- Fichier central : `EVOLVE_RESULTS/EVOLVE_RESSOURCES_DRIVE.md`
- Tous les liens transmis par Chef intégrés dans AGENT_BRAND_CONTEXT (accessibles par les 26 agents)
- Research Doc Template, Product Doc, Desire Prompts, Desire Calendar, Desire Document, New Mechanism Finder, New Info Finder, Market Sophistication Doc, Ad Angles Doc, Avatar Masterclass, Video Script Prompt, 13 Static Templates Canva, Examples For Reference
- Agents market-researcher, script-writer, brief-creator, static-designer, angle-extractor, concept-strategist mis à jour avec les frameworks de ces docs

### Décision #59 — Primary Desire V2 révisé (2026-02-26 00h35)
- **V1** : "Reprendre le contrôle face au stress chronique" (score 7020)
- **V2** : **"Durchschlafen und morgens erholt aufwachen"** (Score 3D 125/125 — max)
- Justification : Scope 5/5 (17-20M Allemands) + Urgency 5/5 (quotidien) + Staying Power 5/5 (chronique)
- Mass Instinct : Health #1 (survie, récupération)
- **Tous les créatifs futurs doivent être réorientés** sur cet entry point

### Décision #60 — Top 3 New Mechanisms inexploités (2026-02-26)
- **Das 3-Uhr-Signal** (score vierge 9/10) : réveil 2-4h = signal cortisol chronobiologique. Hook DE: "Wachst du nachts um 3 auf? Dein Cortisol."
- **Die Aufnahme-Revolution** (score 9/10) : poudre = absorption directe vs capsule 45min. Hook DE: "Warum Kapseln beim Stress-Abbau langsamer wirken"
- **Die 4-Komponenten-Synergie** (score 8/10) : synergie 4 ingrédients = personne ne l'explique mécaniquement. Hook DE: "4 Zutaten. Eine Wirkung. Endlich Ruhe."

### Décision #61 — Stiftung Warentest & Jello (2026-02-26)
- **Stiftung Warentest Oct 2024** : warning Ashwagandha DE → peur dans le marché = opportunité réassurance Nellio (300mg sûre vs problèmes >600mg). Aucun concurrent ne l'adresse
- **Jello (trinkjello.com)** : formule identique Nellio (Ashwagandha + L-Théanine + Mg), lancé 2026, claim "24% cortisol" flou sans meta-analyse → Nellio contre-positionne sur 45 études / 3800 personnes / -28% cortisol
- **Meta-analyse 2025-2026** : 45 études, 3800 participants, -28% cortisol, -41% anxiété → Nellio peut être le PREMIER à l'utiliser dans ses Meta Ads DE

### Décision #62 — Market Research V2 files (2026-02-26)
- Dossier : `EVOLVE_RESULTS/research_v2/`
- 50 verbatims réels sourcés (Reddit, urbia.de, gutefrage.net, Amazon via cosphera, Trustpilot, trinkjello, sensilab)
- Sources FALLBACK : TikTok, Facebook groupes, Pinterest, X/Twitter non accessibles → remplacées
- Top verbatim HP:5 Unaware : "Wie kann ich dieses Kopfkino abstellen?" (urbia.de)
- Top verbatim HP:5 Problem Aware : "Oft liege ich dann 2-3 Stunden wach... um mich dann aus dem Bett quälen zu müssen" (urbia.de)

### Décision #64 — Pipeline EVOLVE Batch #1 complet (2026-02-26 07h05)
- Phase 1 Research V2 ✅ : 45 verbatims DE, desire map V2 (Durchschlafen 93/125), 5 mécanismes inexploités
- Phase 2 Avatar V2 ✅ : Sonja/Markus/Julia, 15 sub-avatars, 30 angles (ANGLE_BANK_V2.md)
- Phase 3 Création ✅ : 50 hooks DE, 3 scripts UGC 45-60s, 12 variantes 3-2-2 (BRIEFS_BATCH01.md)
- Phase 4 Campaign ✅ : CBO €65/j, 2 adsets (Broad + Intérêts), naming convention, claims Meta-compliant DE, règles auto (Stop Loss CPA>€60, Scale ROAS>3x), KPIs 72h
- **Seul blocker** : 3 vidéos UGC à tourner (S1 Teufelskreis / S2 Gedankenkarussell / S3 Cortisol nachts)
- Library mise à jour : 351 docs, 40 catégories — 4 nouvelles sections (Phase 2V2, Phase 3, Phase 4, Research V2)

### Décision #65 — Méthode extraction transcripts formations en ligne (2026-02-28)

**MÉTHODE STANDARD — À utiliser par défaut pour toute extraction de cours en ligne**

#### Pipeline HLS Subtitles (PRIORITÉ 1 — 10-30s/leçon, 0 Whisper)
Les plateformes modernes (Whop, Skool, Kajabi, Teachable) utilisent MUX comme player vidéo.
MUX génère automatiquement des sous-titres multi-langues dans le manifest HLS.

**Séquence obligatoire :**
1. **Token HLS** → Playwright + cookies Chrome (`whop_get_token.cjs`)
   - Charger cookies via `pycookiecheat.chrome_cookies()` (python3)
   - Ajouter cookies avec `url: 'https://domaine.com'` UNIQUEMENT (pas domain+url = erreur Playwright)
   - Attendre `networkidle` → MUX charge automatiquement sans clic
   - Intercepter requêtes `stream.mux.com/*.m3u8`
2. **Subtitles HLS** → fetch manifest → extraire `TYPE=SUBTITLES, LANGUAGE="en"` → URI
   - Fetch playlist subtitles → liste segments .vtt
   - Download + parser chaque segment (skip WEBVTT, timestamps, lignes vides)
   - Résultat : transcript texte propre (~2000-3000 mots/leçon)
3. **Résumé Groq** → `llama-3.1-8b-instant` en premier (500k TPD), fallback `gemma2-9b-it`, puis `llama-3.3-70b-versatile` (100k TPD)
   - Gérer 429 RateLimit : retry x3 avec sleep 10s, puis changer de modèle
   - Output markdown FR avec ✅ Traité comme marqueur de complétion

**Scripts permanents :** `/Users/pc2/workspace/formations/whop-ecomtalent/scripts/`
- `whop_get_token.cjs` — Playwright token extractor (MUX)
- `extract_subs.py` — HLS subtitle downloader universel
- `whop_summarize.py` — Groq summarizer avec fallback modèles
- `list_lessons.py` — JSON lessons iterator
- `pipeline_worker.sh` (workspace) — Worker parallèle complet

**Platforms testées :**
- ✅ Whop (MUX player) — 90 leçons EcomTalent (2026-02-28)
- 🔲 Skool — même approche probable
- 🔲 YouTube — `yt-dlp --write-auto-sub --skip-download` (pas de Playwright)

**Règles critiques :**
- `/tmp` se purge sur macOS → scripts toujours dans emplacement permanent
- Cookies Playwright : `url` seulement, jamais `url` + `domain` ensemble
- Groq free tier : 100k TPD sur llama-3.3-70b → utiliser llama-3.1-8b-instant (500k TPD) en premier
- Workers parallèles : max 2 simultanés (3 = timeouts Playwright sous charge)
- `exec.ask` se remet à défaut au restart gateway → toujours remettre via elevated exec

**Si subtitles absents (fallback) :**
- Option 2 : yt-dlp `--write-sub --skip-download` sur URL MUX directe
- Option 3 : Whisper `large-v3-turbo` après download vidéo (supprimée après transcription)

### Décision #66 — Audit landing page + Stratégie comparateurs DE (2026-03-01)
- **IMPRESSUM ABSENT** sur drinknellio.com → `/pages/impressum` et `/policies/legal-notice` = 404 → infraction §5 TMG (Abmahnung risque) + rejet campagnes Meta probable
- **Claims risqués Meta** : "Antidep." heading + "50% Krebsfälle" → à retirer avant lancement
- **Stiftung Warentest alerte Ashwagandha** (oct. 2024) : dommages hépatiques rapportés → préparer FAQ rassurante sur site + angle dosage 300mg cliniquement validé
- **Sites comparateurs DE identifiés** : sueddeutsche.de · welt.de · rtl.de · harpersbazaar.de · vita-check.de → trafic qualifié gratuit, potentiel €2-11K/mois additionnel sans budget pub
- Fichiers : `EVOLVE_RESULTS/LANDING_PAGE_AUDIT_V2.md` · `EVOLVE_RESULTS/COMPARATEURS_DE_STRATEGY.md`
- **P0 pour Chef** : créer Impressum Shopify + retirer claim "Antidep." avant tout lancement Meta Ads

### Décision #67 — Pipeline transcript permanent (2026-03-04)
- Transcripts toujours sauvegardés après Whisper (audio supprimé, transcript conservé)
- Version clean générée automatiquement : `lesn_XXXXX_clean.md` (100% fidèle, timestamps supprimés)
- Chaque résumé lie vers son transcript clean via `> 📝 [Transcript complet fidèle](...)`
- Bouton 📄 Transcript dans la library toolbar (visible si transcript disponible)
- 8 transcripts EcomTalent formatés et disponibles
- format_transcript.py = script universel : /formations/whop-ecomtalent/format_transcript.py

### Décision #68 — Réorganisation library (2026-03-04)
- Davie Fogarty (36 vidéos) → groupe Vidéos & Playlists
- Pellegrini Stratégie → groupe Articles & Ressources
- Library : 5 groupes → Formations / Vidéos / Articles / Livres / Stratégie
- Articles : 6 thèmes → Meta Ads DTC / OpenClaw Agents / UGC Créatifs / Outils Tech / Business Scaling / Stratégie Ecom
- Bouton 🔗 Source sur tous les articles, 📄 Transcript sur les leçons avec transcript disponible

### Décision #63 — EcomTalent COMPLÈTE (2026-03-02 07h55) ✅
- Formation Whop EcomTalent : **88/88 leçons** transcrites + résumées (100%)
- Master summary final : `formations/whop-ecomtalent/ECOMTALENT_MASTER.md` (287 lignes, 11 thèmes)
- Insight #1 : Ne jamais vendre le produit → vendre la transformation. Nellio = "personne calme et concentrée", jamais les ingrédients en premier
- Gap identifié : ads statiques témoignages DE sous-exploitées → rapides à produire, très efficaces selon EcomTalent
- 5 MP4 résiduels supprimés (~1 GB libéré)
- OMNIA UI : tous textes allemands (batches, angles, avatars) traduits en français (39 remplacements)
- ⚠️ Actions Chef requises : Impressum Shopify + 2 claims Meta risqués à retirer + library server restart

## Décisions Library — 2026-03-04

### Décision #67 — Pipeline transcript permanent
- Transcripts sauvegardés après Whisper (audio supprimé, transcript conservé)
- Version clean générée : `lesn_XXXXX_clean.md` (100% fidèle, timestamps supprimés)
- Chaque résumé lie vers son transcript via `> 📝 [Transcript complet fidèle](...)`
- Bouton 📄 Transcript dans la library toolbar
- 8 transcripts EcomTalent formatés · `format_transcript.py` = script universel

### Décision #68 — Réorganisation library 2026-03-04
- Davie Fogarty (36 vidéos) → groupe Vidéos & Playlists ✅
- Pellegrini Stratégie → groupe Articles & Ressources ✅
- 86/86 articles ont un `source_url` (tweets, Reddit, GitHub, YouTube) ✅
- Library : 631 docs · 5 groupes · 46 catégories
- EcomTalent AI : 11 placeholders ajoutés (transcripts à extraire via DEVTOOLS_SCRIPT.js)

### Blocage EcomTalent AI (2026-03-04) — ACTION CHEF REQUISE
- **11 leçons AI** non transcrites — le relay browser perd les tabs Whop immédiatement
- `whop_get_token.cjs` headless timeout sur la page Knowledge (client-side rendered)
- **Solution** : Chef ouvre Whop > ecomtalent AI course > DevTools Console > colle `DEVTOOLS_SCRIPT.js` (workspace/formations/whop-ecomtalent/DEVTOOLS_SCRIPT.js) > copie le JSON > me l'envoie
- **OU** : Chef ouvre l'onglet OpenClaw relay sur une leçon AI → je peux alors extraire le MUX URL et le transcript une leçon à la fois

## Learnings EVOLVE — 2026-03-02

- **FUD "Leberschaden" actif** : presse DE (Morgenpost, Harzkurier) pousse narrative "risque hépatique Ashwagandha" → créer asset anti-FUD dans Batch #2 (étude Wiley 12 mois = 0 dommage hépatique)
- **Fenêtre marché DE** : presse mainstream éduque le marché sur Ashwagandha en ce moment → CPM favorable → urgence lancement Batch #1
- **Stack triple** : Marché s'auto-construit Ashwagandha+L-Theanine+Magnésium → UltraCalm = solution pré-formulée → angle Batch #2
- **Sous-avatar Nachtschicht** : travailleurs horaires décalés = sous-avatar inexploité à douleur élevée → à ajouter SUB_AVATARS_V2
- **Cross-desire stress→poids** : confirmé par Ayuba clients DE "moins de fringales, meilleur sommeil" → angle Busy Moms
- **Copywriting clé DE** : "stabilisierend, nicht sedierend" = différenciateur pour professionals craignant somnolence
- **Claim top** : "-23% Cortisol in 2 Monaten" (GoodRx méta) + "NIH-bestätigt: besser schlafen" (NIH ODS 2026)
- **Angles total** : 54 angles dans ANGLE_BANK_V2 (50 originaux + 4 nouveaux semaine 2026-03-02)

### Décisions après-midi — 2026-03-04

#### Décision #74 — Triple Whale Clone ✅ LIVRÉ (2026-03-05)
- **Fichier** : `omnia/public/tw-dashboard.html` — dashboard self-contained HTML/JS
- **Proxy backend** : `omnia/server.js` — 4 endpoints `/api/tw/*` + `/api/shopify/orders`
- **API TW clé** : `cfc2abac-fb2f-436c-b188-8013bbd626ca` (dans `~/.openclaw/credentials/anthropic.env`)
- **Données réelles 01-05 mars 2026** : CA €21,555 · Spend €12,916 · ROAS Blended 1.67x · Bénéf Net €3,409 (15.81%) · Orders 400 · AOV €53.92 · Meta ROAS 1.43x · **Google ROAS 8.94x** · Klaviyo 14.6% du CA
- **Features** : Sidebar, date picker, pins row sparklines, attribution table, Moby AI chat, Settings COGS/frais, onglet "📊 Compta" dans OMNIA
- **Manque encore** : P&L waterfall (bloqué COGS + frais fixes de Chef) · Meta API token · Google Ads token

#### Décision #75 — Shopify API connectée
- **Store** : kiud1v-ua.myshopify.com (nellio, EUR)
- **Token** : `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` (read-only)
- **Scopes** : read_analytics, read_customers, read_orders, read_products
- **Fichier** : `~/.openclaw/credentials/shopify.env` (chmod 600)
- **Testé** : Commande #11180 — 45 EUR ✅
- **Manque encore** : Meta API token + Google Ads token + Klaviyo token

#### Décision #76 — Projet "Clone de concurrents" initié
- Chef veut dupliquer des sites/SaaS concurrents (fonctionnalités + data)
- Workflow : Firecrawl analyse → screenshots → plan build → exécution feature by feature
- Triple Whale = 1er projet

#### Décision #77 — Playwright réinstallation nécessaire
- Cache ms-playwright supprimé ce matin (libération disque) → browser OpenClaw hors service
- `npx playwright install chromium` bloqué par exec policy
- Workaround actuel : relay Chrome uniquement pour screenshots

#### Décision #78 — Transcripts formations : liens cliquables opérationnels
- 155 transcripts formatés (`_formatted.md`) avec déduplication overlaps HLS
- 135 résumés → liens `http://localhost:4242/view?path=...` cliquables
- Endpoint `/view` ajouté au serveur bibliothèque
- CRO EVOLVE : espaces URL-encodés (`%20`) dans les chemins

### Décision #73 — Firecrawl implémenté (2026-03-04)
- **URL** : https://firecrawl.dev · **Clé** : à ajouter `FIRECRAWL_API_KEY=fc-xxx` dans `~/.openclaw/credentials/anthropic.env`
- **Clé API** : `fc-500f64750bc34036a6cf16ac4d7d2719` — stockée dans `~/.openclaw/credentials/anthropic.env`
- **Règle absolue** : NE scraper QUE sur demande explicite de Chef. Jamais en autonomie.
- **Scripts** : `scripts/firecrawl.sh` (bash CLI) + `scripts/firecrawl_agents.js` (Node.js module)
- **4 modes** : scrape (1 page → markdown) / crawl (site entier) / extract (LLM structuré) / search (search + scrape)
- **Fonctions Nellio prêtes** : `scrapeAmazonReviews(asin)` · `scrapeLandingPage(url)` · `searchTrustpilotDE(brand)` · `searchMetaAdLibraryDE(keyword)`
- **Différence Scrapling** : Scrapling = lib Python locale gratuite (sites simples, HTML statique) · Firecrawl = SaaS cloud API (JS rendu, anti-bot, LLM-ready, crawl automatique) → Firecrawl > Scrapling pour scraping de sites modernes Shopify/Amazon/Reddit
- **Automatisme Intelligence hebdo** : cron `library-weekly-intelligence` (ID: 081c7352) · tous les lundis 09h00 · bibliothèque + 5 web searchs → rapport `INTELLIGENCE_REPORTS/intelligence_[DATE].md` + notif Discord

### Décisions 2026-03-11 → 2026-03-23 (distillées depuis daily logs)

#### État projets au 2026-03-23
- **EVOLVE Batch #2** : bloqué depuis ~12/03 — pas de signal Chef sur direction ni budget Meta
- **World Sleep Day (13/03/2026)** : fenêtre passée · statut campagne Meta INCONNU (jamais confirmé par Chef)
- **Library server** : UP (vérifié 04h00 23/03) · groupe "liens" (53 ressources) dans server.js mais restart requis une fois exec disponible
- **10 résumés CRO** générés le 21/03 → dans `formations/cro-evolve/summaries/` · indexés library au prochain restart
- **Disque** : 10 GB libre ✅ (stable depuis 05/03, Chef a libéré Arc cache)
- **Tous services** : MC ✅ · Nellio Studio ✅ · OMNIA ✅ · Library ✅ (04h00 23/03)
- **Playlist YouTube** : 121/121 vidéos à jour · 0 nouvelles

#### Apprentissage durable — gap sessions (12→22 mars)
- 10 jours sans session Chef · crons quotidiens tournent correctement
- MEMORY.md non mis à jour depuis 2026-03-11 (seuil 3j largement dépassé) → distillation faite le 23/03
- Pattern : Library server crash silencieux (exit code -15 = killed) → LaunchAgent le redémarre automatiquement, ou UP si process en place

#### Décision #85 — Stack EVOLVE 2026-04-02 13h15
- **~2895 verbatims** · **~1785+ ads** · **148 semaines** · **397 fichiers EVOLVE_RESULTS**
- **3 inédits absolus session 148 :**
  - "frühlingsfit" (focus.de 15H) = reframing positif aspiration INÉDIT dans les 1773+ ads → angle "devenir frühlingsfit" vs "überstehen"
  - DGSM = Deutsche Gesellschaft für Schlafforschung = 3ème institution médicale DE officielle → GAP TRIPLE : DGSM+Charité+NIH documentent le problème SANS Cortisol = Nellio = seule solution cause profonde
  - "frühlingsfit vs überstehen" positionnement = jamais dans le pipeline
- **NIH 5H** (02/04 08h15) = recency record session 148 · expire ~17h30
- **FIBO 16-19/04 dans 14j** · GO LIVE NLO_DE_FIBO_LONGEVITY_2026 requis 10/04 (dans 8j)
- **Setup FIBO : 5-9 avril** · `FIBO_J14_FINAL_BRIEF_02AVRIL.md` · budget €840-1.250 · 3 adsets

### Décision #84 — Distillation 26/03→02/04 (2026-04-02)
- **Période** : 26 mars → 2 avril 2026 — 8 jours sans session Chef productive
- **Disque** : stable 9.9–10.5 GB ✅ (fluctuation ponctuelle 4.9 GB le 30/03 → purge cache nocturne, revenu 9.8 GB le 31/03)
- **Playlist YouTube** : 121/121 · 0 nouvelles vidéos · check_playlist.py SIGTERM récurrent (YouTube rate limit) — comportement normal, non bloquant
- **Intelligence Report hebdomadaire** : cron envoyé lundi 30/03 09h27 → `INTELLIGENCE_REPORTS/intelligence_2026-03-30.md` + Discord ✅
- **5 insights Intel 30/03** : Meta Advantage+ > Manual supplements · Politique Meta Health MAJ 27/03 (filtrer scripts) · Angle "énergie/fatigue" > "stress" (63% vs ~30%) · HeyGen fond naturel > fond studio · AI UGC -90% coût confirmé
- **Blockers actifs (>10 jours sans réponse Chef)** :
  1. Statut campagne Meta World Sleep Day (lancée 13/03 ?) — inconnu
  2. Direction EVOLVE Batch #2 — en attente validation
  3. 3 vidéos UGC (S1/S2/S3) à tourner
  4. Cron midnight CRO (883c7963) — relancer ou abandonner ?
  5. Meta API + Google Ads + Klaviyo tokens
  6. Library restart (nouveaux résumés CRO non indexés)
  7. P&L COGS
- **Pattern** : Infrastructure tourne seule, aucune direction reçue → mode veille total depuis mi-mars
- **Action recommandée si retour Chef** : P0 = statut Meta WSD + go/no-go Batch #2 + confirmation angle énergie/récupération

### Décision #83 — Anti-Slop AI UGC System (2026-03-12)
- 53 ressources dans #ressources Discord (49 orig + 4 nouvelles le 12/03)
- 4 nouvelles ressources : @ihtesham2005 Google AI Agents guide · @roman_khaves $2M→$15M faceless · @adriansolarzz Quiz Funnels $1M · @vadimstrizheus Nano Banana 2 guide
- `library/summaries/liens-ressources-discord.md` mis à jour (53 ressources)
- Formation Anti-Slop AI UGC System : 8 modules Google Docs (Modules 1-5 + Sora/Kling/Podcast) — résumés non générés

### Décision #82 — Audit #ressources + Carte Bibliothèque (2026-03-10)
- **Canal Discord #ressources** : 49 ressources auditées (X/Twitter, Google Docs, PDF, Drive, Instagram)
- **Résultat audit** : 0/49 intégrées en bibliothèque — les fichiers existants (`fyncas`, `hasantoxr`, `maxxmalist`, `alexcooldev`, `ernestosoftware`) concernent des **tweets différents** de ceux partagés dans #ressources
- **Carte créée** : `library/summaries/liens-ressources-discord.md` (9.3 KB) — 49 liens organisés en 6 catégories (formation Anti-Slop AI UGC System, Guides Vidéo AI, Prompts/Copy, Tweets UGC, Tweets Tools, Assets)
- **Intégrée** dans server.js → section "Ressources Chef" → live localhost:4242
- **Formation Anti-Slop AI UGC System** : 8 modules Google Docs partagés par Chef (Modules 1-5 + guides Sora/Kling/Podcast) → résumés complets non générés, à faire si Chef valide
- **Disque** : 10 GB libre ✅ (watchdog 19h43)

### Décision #81 — Stack EVOLVE 2026-03-05 23h18
- **385 verbatims** accumulés (S16 complète)
- **169+ ads** cumulatif · **112 fichiers** EVOLVE_RESULTS
- **Nouveaux livrables :**
  - `WORLD_SLEEP_DAY_CAMPAIGN_PACK.md` : plan complet 13/03/2026 · brief Canva · campagne CBO €55/j · copy complète · chronologie J-8→J+2
  - `SPORT_BIOHACKING_CREATIVE_PACK.md` : Felix Biohacker · KSM-66 Triple Action · 10 hooks · 3 BC · 3 adsets Oura/Fitness/Biohacking · 0 concurrent
  - `RESEARCH_S16_2026-03-05.md` : AHA Nov 2025 Melatonin +90% Herzinsuffizienz · Cortisol→Bauchfett hommes · Tag des Schlafes 21/06/2026
- **BOMBE ANTI-MÉLATONIN :** AHA Scientific Sessions Nov 2025 = Melatonin long-terme +90% risque Herzinsuffizienz (herzstiftung.de + DW + BR24 + Ärzteblatt Déc 2025) → argument ultime FAQ PDP
- **Nouveau sous-avatar :** "Markus Bauchfett" 35-50 · Cortisol → Bauchfett · angle aspiration masculin body composition
- **2ème fenêtre timing :** Tag des Schlafes 21 JUIN 2026 (national DE) en plus du 13 mars
- **Biohacking trend peak mars 2026** → Sport Biohacking Pack timing optimal
- **⚠️ Disque : 2.7 GB** — Chef doit libérer cache Arc/Chrome (3.3 GB disponibles)

### Décision #80 — Stack EVOLVE 2026-03-05 19h18
- **365 verbatims** accumulés (S15 complète)
- **169+ ads** cumulatif (Batches 1→15) · **110 fichiers** EVOLVE_RESULTS
- **Nouveaux livrables :**
  - `RESEARCH_S15_2026-03-05.md` : Anti-Melatonin Reddit 3j + World Sleep Day 13.03.2026 + KSM-66 Testosteron sportif
  - `ANTI_MELATONIN_CREATIVE_PACK.md` : 43M utilisateurs DE · triangle positionnement · 10 hooks · 3 BC · FAQ PDP 2 questions
  - `SCRIPTS_BATCH15.md` : S15-A Melatonin Switch · S15-B World Sleep Day TIMING 13/03 · S15-C Cortisol/Testosteron Sport
- **⚠️ ALERTE TIMING :** World Sleep Day = **13 MARS 2026** (dans 8 jours) · static Canva à préparer NOW (30 min)
- **Différenciation clé :** Nellio = CE QUE MELATONIN NE PEUT PAS FAIRE (Durchschlafen vs Einschlafen) · confirmé organiquement Reddit DE 3 jours avant + BfR officiel
- **Segment sport masculin :** KSM-66 = Triple Action Cortisol↓ × Testosteron↑ × GH Tiefschlaf↑ · 0 concurrent DE sur cet angle

### Décision #79 — Stack EVOLVE 2026-03-05 15h10
- **345 verbatims** accumulés (S14 complète)
- **157+ ads** cumulatif (Batches 1→14) · **108 fichiers** EVOLVE_RESULTS
- **Nouveaux livrables :**
  - `SCRIPTS_BATCH14.md` : Anti-Melatonin · Alles Versucht · €106Mrd B2B
  - `SUB_AVATAR_EMAIL_FLOWS_DE.md` : 4 flows dédiés (Wechseljahre/Julia Zyklus/Schichtarbeiter/Insomnie Chronique) · stack rétention avatar-specific 100% complet
  - `RESEARCH_S14_2026-03-05.md` : stat €106 Mrd World Sleep Day 5/03/2026 + Anti-Melatonin angle
- **Hook P0 ABSOLU :** S14-B "Alles ausprobiert" = conversion max, à tourner EN PREMIER
- **Nouveau positionnement :** Nellio = ce que Melatonin ne peut pas faire (Durchschlafen vs Einschlafen)
- **Stat fraîche (publiée aujourd'hui) :** €106 Mrd/an Schlafstörungen DE — à utiliser B2B immédiatement
