# AUDIT — MEILLEURS OUTILS POUR AMÉLIORER OPENCLAW
> Clawdbot Prime ⚡ | drinknellio.com | Date : 2026-03-04

---

## RÉSUMÉ EXÉCUTIF

- **35 outils identifiés** · **8 catégories**
- **Quick Win #1** : Firecrawl (plugin Claude officiel — installation 1 commande)
- **Impact business estimé** : Automatiser la veille concurrents + scraping reviews DE → +20% d'insights actionnables pour les créatifs Meta Ads
- **ROI le plus rapide** : Tavily API (research automatique) + n8n (orchestration)

---

## CATÉGORIE 1 — SCRAPING & BROWSER AUTOMATION

---

### 1.1 FIRECRAWL ⭐ PRIORITY #1
- **URL** : https://firecrawl.dev
- **Prix** : Free (500 crédits/500 pages) | Hobby $16/mois | Standard $83/mois | Growth $333/mois | API usage-based
- **Catégorie** : Scraping
- **Complexité d'intégration : 1/5** (une commande CLI)
- **Impact Nellio : 5/5**

**Ce que ça apporte à OpenClaw :**
- Plugin Claude officiel (depuis jan 2026) — scraping natif dans toutes les conversations
- Scraping JavaScript-rendered (Amazon DE, Trustpilot DE, forums Deutsch)
- `/firecrawl:agent` : describe what you need → Firecrawl cherche automatiquement sur le web
- Extraction structurée → reviews clients → données pour Desire Researcher
- Anti-bot + rotation proxy intégrés

**Installation :**
```bash
# Via Claude Code Plugin (le plus simple)
claude install firecrawl

# Via MCP Server (pour OpenClaw custom skills)
npm install -g @firecrawl/mcp-server
# Ajouter dans openclaw.json sous mcpServers:
# { "firecrawl": { "command": "firecrawl-mcp", "env": { "FIRECRAWL_API_KEY": "YOUR_KEY" } } }

# Clé API : https://firecrawl.dev → Gratuit 500 crédits
```

---

### 1.2 PLAYWRIGHT
- **URL** : https://playwright.dev
- **Prix** : Open Source (gratuit)
- **Catégorie** : Browser Automation
- **Complexité : 3/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Automatiser la navigation sur Meta Ads Library (scraper les ads concurrents)
- Scraper BrandSearch.co automatiquement
- Remplir et soumettre des formulaires automatiquement
- Screenshots de landing pages concurrentes pour analyse CRO
- Intégration avec LLM via MCP Playwright

**Installation :**
```bash
npm install -g @playwright/test
npx playwright install chromium
# Pour MCP : npm install -g @microsoft/playwright-mcp
```

---

### 1.3 PUPPETEER
- **URL** : https://pptr.dev
- **Prix** : Open Source (gratuit)
- **Catégorie** : Browser Automation
- **Complexité : 3/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Alternative Playwright (plus ancien, plus documenté)
- Screenshots et PDF de pages concurrentes
- Automatisation tâches répétitives navigateur

**Installation :**
```bash
npm install puppeteer
```

---

### 1.4 BROWSERBASE
- **URL** : https://browserbase.com
- **Prix** : Free (1000 minutes/mois) | Starter $149/mois | Growth $499/mois
- **Catégorie** : Browser Automation Cloud
- **Complexité : 2/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Playwright/Puppeteer hébergé dans le cloud (pas besoin de gérer le navigateur local)
- Sessions stealthy (anti-détection)
- Compatible avec Claude Computer Use
- Idéal pour automatiser les tâches Meta Ads en arrière-plan

**Installation :**
```bash
npm install @browserbasehq/sdk
# API Key depuis browserbase.com
```

---

### 1.5 SCRAPINGBEE
- **URL** : https://scrapingbee.com
- **Prix** : Free (1000 crédits) | Freelance $49/mois | Startup $99/mois | Business $249/mois
- **Catégorie** : Scraping API
- **Complexité : 1/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- API simple pour scraper n'importe quelle page
- Gère les CAPTCHAs automatiquement
- Rotation de proxies incluse
- Extraction de données structurées via CSS selectors

**Installation :**
```bash
pip3 install scrapingbee
# ou curl avec API key
```

---

## CATÉGORIE 2 — IA LOCALE

---

### 2.1 OLLAMA ⭐ QUICK WIN
- **URL** : https://ollama.com
- **Prix** : Gratuit (open source) — coût : électricité + RAM
- **Catégorie** : IA Locale
- **Complexité : 1/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Exécuter des LLMs en local (0€ d'API)
- Agent automation sans frais de tokens
- Traitement de données confidentielles (prix, marges, données clients)
- Modèles recommandés pour le business Nellio :
  - `llama3.1:8b` — agent général, rapide (5GB RAM)
  - `qwen2.5:14b` — excellent pour l'analyse et le code (10GB RAM)
  - `mistral:7b` — raisonnement + multilingual DE (5GB RAM)
  - `deepseek-r1:8b` — raisonnement avancé (5GB RAM)

**Installation :**
```bash
# macOS (ARM — M1/M2/M3)
brew install ollama
ollama serve  # démarrer le service

# Modèles recommandés
ollama pull llama3.1:8b
ollama pull qwen2.5:14b
ollama pull mistral:7b

# Test
ollama run mistral "Analysiere diese Produktrezension auf Deutsch:"
```

---

### 2.2 LM STUDIO
- **URL** : https://lmstudio.ai
- **Prix** : Gratuit
- **Catégorie** : IA Locale (interface graphique)
- **Complexité : 1/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Interface graphique pour tester des modèles locaux
- Serveur OpenAI-compatible (drop-in replacement pour les scripts Python existants)
- Facilité de test avant d'intégrer via Ollama

**Installation :**
- Télécharger sur https://lmstudio.ai (macOS ARM natif)

---

### 2.3 JAN.AI
- **URL** : https://jan.ai
- **Prix** : Gratuit (open source)
- **Catégorie** : IA Locale (desktop app)
- **Complexité : 1/5**
- **Impact Nellio : 2/5**

**Ce que ça apporte à OpenClaw :**
- Application desktop similaire à ChatGPT mais 100% local
- Utile pour tâches sensibles (données pricing, stratégie)

**Installation :**
- Télécharger sur https://jan.ai

---

## CATÉGORIE 3 — RESEARCH & INTELLIGENCE

---

### 3.1 TAVILY API ⭐ QUICK WIN
- **URL** : https://tavily.com
- **Prix** : Free (1000 crédits/mois) | Researcher $39/mois | Business $99/mois
- **Catégorie** : Research
- **Complexité : 2/5**
- **Impact Nellio : 5/5**

**Ce que ça apporte à OpenClaw :**
- API de recherche web spécialement optimisée pour les LLM agents
- Résultats propres, structurés, sans HTML inutile
- Idéal pour automatiser la veille : reviews Amazon DE, forums Reddit DE, concurrents
- Intégration native dans les agents Claude / n8n
- 1000 requêtes gratuites/mois → suffisant pour usage modéré

**Installation :**
```bash
pip3 install tavily-python
# ou
npm install tavily

# Usage Python
from tavily import TavilyClient
client = TavilyClient(api_key="YOUR_KEY")
results = client.search("Ashwagandha Erfahrungen Deutschland 2026", search_depth="advanced")
```

---

### 3.2 PERPLEXITY API (Sonar)
- **URL** : https://docs.perplexity.ai
- **Prix** : Pay-per-use ($0.2-1/M tokens selon modèle) | Pro $20/mois (usage perso) | Enterprise $40+/user
- **Catégorie** : Research
- **Complexité : 2/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Recherche web temps réel avec citations sourcées
- Sonar Pro : deep research automatique (comme Perplexity Deep Research en API)
- Parfait pour : veille concurrents, analyse marché DE, pricing competitors
- Compatible avec n8n / OpenClaw agents

**Installation :**
```bash
pip3 install openai  # Compatible OpenAI SDK
# Endpoint: https://api.perplexity.ai
# Modèles: sonar, sonar-pro, sonar-reasoning
```

---

### 3.3 EXA.AI
- **URL** : https://exa.ai
- **Prix** : Free (1000 requêtes/mois) | API $25/mois | Growth $100/mois
- **Catégorie** : Research (semantic search)
- **Complexité : 2/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Recherche sémantique (trouve du contenu similaire, pas juste par mots-clés)
- Excellente pour le research de contenu viral, testimonials, hooks
- Trouve des articles et contenus de niche que Google manque
- Crawler + embeddings pour constitution de base de connaissances

**Installation :**
```bash
pip3 install exa-py
from exa_py import Exa
exa = Exa(api_key="YOUR_KEY")
```

---

### 3.4 SERP API
- **URL** : https://serpapi.com
- **Prix** : Free (100 req/mois) | Hobby $50/mois | Startup $150/mois
- **Catégorie** : Research (SERP data)
- **Complexité : 1/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Scraper les résultats Google DE (SEO, concurrents, shopping)
- Google Shopping DE : prix concurrents supplements
- Google Trends data structurée
- Pas de détection/blocage

**Installation :**
```bash
pip3 install google-search-results
```

---

## CATÉGORIE 4 — AUTOMATION WORKFLOWS

---

### 4.1 N8N ⭐ QUICK WIN
- **URL** : https://n8n.io
- **Prix** : Free (self-hosted illimité) | Cloud Starter $20/mois | Pro $50/mois | Enterprise custom
- **Catégorie** : Automation
- **Complexité : 2/5**
- **Impact Nellio : 5/5**

**Ce que ça apporte à OpenClaw :**
- Orchestrateur central pour tous les workflows IA
- 5815+ templates de workflows IA disponibles
- Intégrations natives : Meta Ads API, Claude, Slack, Discord, Google Sheets...
- Auto-reporting : rapport Meta Ads hebdomadaire dans Discord
- Scraping concurrent automatique → Claude analyse → rapport structuré
- Génération UGC automatisée : script → ElevenLabs voix → notification Discord

**Installation self-hosted (recommandé) :**
```bash
# Docker (recommandé)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# ou npm
npm install -g n8n
n8n start
# Interface : http://localhost:5678
```

---

### 4.2 MAKE.COM (ex-Integromat)
- **URL** : https://make.com
- **Prix** : Free (1000 ops/mois) | Core $10.59/mois | Pro $18.82/mois | Teams $34.12/mois
- **Catégorie** : Automation
- **Complexité : 1/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Plus simple que n8n visuellement
- Intégrations prêtes à l'emploi (Shopify, Meta, email, Slack)
- Automatiser les reports e-commerce Nellio
- Webhook → Claude → Discord notifications
- Moins de flexibilité que n8n mais plus rapide à démarrer

**Installation :**
- Compte sur make.com (no-install requis)

---

### 4.3 ZAPIER AI
- **URL** : https://zapier.com
- **Prix** : Free (100 tâches/mois) | Starter $19.99/mois | Pro $49/mois | Team $69/mois
- **Catégorie** : Automation
- **Complexité : 1/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Zaps IA : describe l'automation en langage naturel → génère le workflow
- Nombreuses intégrations e-commerce
- Moins puissant que n8n mais plus accessible

---

### 4.4 ACTIVEPIECES
- **URL** : https://activepieces.com
- **Prix** : Free (open source self-hosted) | Cloud $19/mois
- **Catégorie** : Automation (alternative n8n open source)
- **Complexité : 2/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Alternative open source à n8n, plus récente
- Spécialisé dans l'IA (agents natifs)
- Communauté active

---

## CATÉGORIE 5 — META ADS API TOOLS

---

### 5.1 META ADS API (Python SDK)
- **URL** : https://developers.facebook.com/docs/marketing-apis
- **Prix** : Gratuit (coûts = ad spend uniquement)
- **Catégorie** : Meta Ads
- **Complexité : 3/5**
- **Impact Nellio : 5/5**

**Ce que ça apporte à OpenClaw :**
- Accès complet aux données de campagnes (impressions, CPC, ROAS, CTR)
- Créer/modifier des campagnes programmatiquement
- Automation rules : stop-loss automatique (CPA > seuil → pause ad)
- Rapport automatique → Claude analyse → Discord alerte
- Upload créatifs en batch via API

**Installation :**
```bash
pip3 install facebook-business
# Configuration:
from facebook_business.api import FacebookAdsApi
FacebookAdsApi.init(access_token=YOUR_TOKEN, app_id=APP_ID, app_secret=APP_SECRET)
```

---

### 5.2 ADVERONIX / SUPERMETRICS (Reporting)
- **URL** : https://supermetrics.com
- **Prix** : Starter $99/mois | Essential $199/mois
- **Catégorie** : Meta Ads Reporting
- **Complexité : 1/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Export Meta Ads → Google Sheets → Claude analyse
- Dashboard automatisé sans code
- Alertes sur les KPIs critiques

---

### 5.3 BRANDSEARCH.CO (DÉJÀ INTÉGRÉ)
- **URL** : https://brandsearch.co
- **Prix** : Déjà souscrit (voir TOOLS.md)
- **Catégorie** : Meta Ads Intelligence
- **Complexité : 1/5**
- **Impact Nellio : 5/5**

**Ce que ça apporte à OpenClaw :**
- 160M+ ads en base
- Spectre AI : analyse des patterns gagnants
- Connexion avec Playwright pour automatiser la recherche des ads concurrents

---

## CATÉGORIE 6 — MONITORING & ALERTES

---

### 6.1 UPTIMEROBOT
- **URL** : https://uptimerobot.com
- **Prix** : Free (50 monitors, 5 min interval) | Pro $7/mois (1 min interval)
- **Catégorie** : Monitoring
- **Complexité : 1/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Monitoring drinknellio.com (uptime, temps de réponse)
- Alerte Discord si le site tombe
- Monitoring des services locaux (localhost:3000, 3001, 3002...)
- Webhook → Discord en cas d'incident

**Installation :**
- Compte gratuit sur uptimerobot.com → créer les monitors → webhook Discord

---

### 6.2 BETTER UPTIME
- **URL** : https://betteruptime.com
- **Prix** : Free (10 monitors) | Starter $25/mois
- **Catégorie** : Monitoring
- **Complexité : 1/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Status page publique pour drinknellio.com
- Incident management intégré
- Monitoring de performance (Core Web Vitals)

---

### 6.3 SENTRY (Error Tracking)
- **URL** : https://sentry.io
- **Prix** : Free (5k erreurs/mois) | Team $26/mois
- **Catégorie** : Monitoring
- **Complexité : 2/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Track les erreurs dans Nellio Studio + Mission Control
- Alertes sur les bugs critiques
- Performance monitoring

---

## CATÉGORIE 7 — PROMPT ENGINEERING & MANAGEMENT

---

### 7.1 LANGSMITH (LangChain)
- **URL** : https://smith.langchain.com
- **Prix** : Free (Developer) | Plus $39/mois | Enterprise custom
- **Catégorie** : Prompt Management
- **Complexité : 3/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Tracer toutes les interactions Claude (debug, audit)
- Evaluer la qualité des outputs (score automatique)
- Versionner les prompts des agents EVOLVE
- A/B test des prompts (mesurer quel prompt donne les meilleurs scripts DE)

**Installation :**
```bash
pip3 install langsmith
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_API_KEY="YOUR_KEY"
```

---

### 7.2 PROMPTFOO
- **URL** : https://promptfoo.dev
- **Prix** : Open source (gratuit)
- **Catégorie** : Prompt Testing
- **Complexité : 2/5**
- **Impact Nellio : 4/5**

**Ce que ça apporte à OpenClaw :**
- Tester les prompts des agents EVOLVE de façon systématique
- Comparer plusieurs versions de prompts (Desire Researcher, Hook Writer...)
- Score automatique sur critères définis
- CI/CD pour les prompts (éviter les régressions)

**Installation :**
```bash
npm install -g promptfoo
promptfoo init
promptfoo eval
```

---

### 7.3 PROMPTLAYER
- **URL** : https://promptlayer.com
- **Prix** : Free (2k requests/mois) | Pro $59/mois
- **Catégorie** : Prompt Management
- **Complexité : 2/5**
- **Impact Nellio : 3/5**

**Ce que ça apporte à OpenClaw :**
- Log et versioning des prompts
- Analytics sur les appels API Claude (coûts, latence, qualité)
- Dashboard de monitoring des prompts en production

---

## CATÉGORIE 8 — SKILLS OPENCLAW CUSTOM (CLAWHUB)

---

### 8.1 SKILLS DÉJÀ DISPONIBLES (installed)

| Skill | Description | Pertinence Nellio |
|-------|-------------|-------------------|
| `clawhub` | Gérer les skills ClawHub | Maintenance |
| `coding-agent` | Déléguer du code à des agents | ★★★★★ |
| `discord` | Actions Discord avancées | ★★★★ |
| `healthcheck` | Audit sécurité machine | ★★★ |
| `peekaboo` | Capture macOS UI | ★★★ |
| `skill-creator` | Créer de nouveaux skills | ★★★★★ |
| `video-frames` | Extraire frames vidéo (ffmpeg) | ★★★★ |
| `weather` | Météo | ★★ |

---

### 8.2 SKILLS CUSTOM À CRÉER (haute valeur)

**Skill #1 — `meta-ads-reporter`**
- Connecte Meta Ads API → extrait KPIs → génère rapport structuré → poste sur Discord
- Trigger : cron quotidien 08h00
- Impact : surveillance ROAS automatique

**Skill #2 — `review-miner-de`**
- Scrape reviews Trustpilot DE + Amazon DE pour les concurrents supplements
- Input : liste de produits/marques
- Output : fichier desires/objections formaté pour Desire Researcher

**Skill #3 — `ugc-pipeline`**
- Script DE → ElevenLabs voix → HeyGen avatar → notification Discord
- Automatise le pipeline UGC complet
- Input : script + avatar_id + voix_id

**Skill #4 — `ad-library-spy`**
- Playwright → Meta Ad Library → scrape les ads supplements DE actifs
- Output : fichier competitor_swipe.md
- Trigger : hebdomadaire automatique

---

## TOP 10 RECOMMANDATIONS PRIORITAIRES

| # | Outil | Impact | Complexité | Raison |
|---|-------|--------|------------|--------|
| 1 | **Firecrawl** | 5/5 | 1/5 | Plugin Claude officiel — scraping natif immédiat |
| 2 | **n8n (self-hosted)** | 5/5 | 2/5 | Orchestrateur central, 0€/mois, Meta Ads auto-reporting |
| 3 | **Tavily API** | 5/5 | 2/5 | 1000 req gratuites, research automatique DE |
| 4 | **Ollama + Qwen2.5** | 4/5 | 1/5 | LLM gratuit local, traitement données sensibles |
| 5 | **Meta Ads API Python** | 5/5 | 3/5 | Stop-loss auto + reporting → protège le budget ads |
| 6 | **UptimeRobot** | 4/5 | 1/5 | Monitoring drinknellio.com → alerte Discord si down |
| 7 | **ElevenLabs (déjà décidé)** | 5/5 | 1/5 | Voix DE clone pour UGC pipeline |
| 8 | **Playwright** | 4/5 | 3/5 | Automatise surveillance Meta Ad Library concurrents |
| 9 | **Perplexity Sonar API** | 4/5 | 2/5 | Research marché DE automatisé avec citations |
| 10 | **promptfoo** | 3/5 | 2/5 | Tester et versionner les prompts agents EVOLVE |

---

## ROADMAP D'INTÉGRATION — 3 PHASES

### PHASE 1 — QUICK WINS (Cette semaine, < 2h total)

**Objectif : Gains immédiats sans dev lourd**

```
□ 1. Firecrawl Plugin Claude
   claude install firecrawl
   → Scraping natif dans OpenClaw immédiat

□ 2. UptimeRobot
   → Compte gratuit + monitor drinknellio.com + webhook Discord
   → 15 minutes, 0€

□ 3. Ollama + Mistral 7B
   brew install ollama && ollama pull mistral:7b
   → LLM local pour tâches non-sensibles

□ 4. Tavily API Key
   → Compte gratuit sur tavily.com (1000 req/mois)
   → Ajouter dans TOOLS.md + scripts Python
```

**Temps estimé : 2h | Coût : 0€**

---

### PHASE 2 — MOYEN TERME (Semaines 2-4)

**Objectif : Automatiser la veille et les reports**

```
□ 5. n8n self-hosted (Docker)
   → Setup en 30 min
   → Workflow #1 : Meta Ads daily report → Discord
   → Workflow #2 : Alerte si ROAS < seuil
   → Workflow #3 : Scraping concurrent hebdomadaire

□ 6. Meta Ads API Python
   → Créer app sur developers.facebook.com
   → Script Python : pull_daily_metrics.py
   → Intégration n8n pour automatisation

□ 7. Playwright (Ad Library Spy)
   → Script mensuel : scraper ads supplements DE actifs
   → Output : competitor_swipe.md pour Desire Researcher

□ 8. Perplexity Sonar API
   → Intégration dans le skill Review Miner
   → Research automatique reviews DE + forum Deutsch
```

**Temps estimé : 8-12h dev | Coût : ~$20-40/mois**

---

### PHASE 3 — LONG TERME (Mois 2-3)

**Objectif : Pipeline EVOLVE entièrement automatisé**

```
□ 9. Skill Custom "meta-ads-reporter"
   → Cron 08h00 quotidien
   → Rapport formaté EVOLVE → Discord

□ 10. Skill Custom "ugc-pipeline"
   → Input : script DE → Output : vidéo HeyGen ready
   → Intégré dans Nellio Studio

□ 11. Skill Custom "review-miner-de"
   → Scraping Trustpilot DE + Amazon DE concurrents
   → Output structuré pour Desire Researcher

□ 12. LangSmith / promptfoo
   → Évaluation continue des prompts agents EVOLVE
   → A/B test scripts DE (mesurer qual hooks)

□ 13. Make.com (secondary)
   → Intégrations Shopify → reporting CA mensuel
   → Trigger alerts sur KPIs LTV

□ 14. Browserbase
   → Cloud browser pour les scraping sensibles
   → Remplace Playwright local sur tâches longues
```

**Temps estimé : 20-30h dev | Coût : ~$50-80/mois**

---

## COMMANDES D'INSTALLATION — QUICK WINS

```bash
# === QUICK WIN 1 — FIRECRAWL ===
# Option A : Plugin Claude Code (recommandé)
claude install firecrawl
# Option B : MCP Server
npx @firecrawl/mcp-server
# Récupérer API Key sur https://firecrawl.dev (gratuit 500 crédits)

# === QUICK WIN 2 — UPTIMEROBOT ===
# Pas d'install — compte web sur uptimerobot.com
# Créer monitor "HTTPS" sur https://drinknellio.com
# Webhook Discord : https://discord.com/api/webhooks/[CHANNEL_WEBHOOK_URL]

# === QUICK WIN 3 — OLLAMA ===
brew install ollama
ollama serve &
ollama pull mistral:7b      # ~4GB RAM
ollama pull qwen2.5:7b      # ~5GB RAM, meilleur pour DE
# Test
ollama run mistral:7b "Analysiere: Was sind die häufigsten Beschwerden über Schlafprobleme in Deutschland?"

# === QUICK WIN 4 — TAVILY ===
pip3 install tavily-python
# Script de test
python3 -c "
from tavily import TavilyClient
client = TavilyClient(api_key='YOUR_TAVILY_KEY')
results = client.search('Ashwagandha Schlaf Erfahrungen Deutschland 2026', search_depth='advanced')
for r in results['results'][:3]:
    print(r['title'], r['url'])
"

# === BONUS — N8N (Docker) ===
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  --restart unless-stopped \
  n8nio/n8n
# Interface : http://localhost:5678
```

---

*Audit réalisé par Clawdbot Prime ⚡ — Sources : firecrawl.dev, n8n.io, tavily.com, ollama.com, pinggy.io, humai.blog, docs.perplexity.ai, gaga.art*
