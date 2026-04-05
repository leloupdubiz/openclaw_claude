# TOOLS.md — Notes locales & Config Système
> Clawdbot Prime ⚡ | Dernière mise à jour : 2026-02-23

---

## 🌐 Services Locaux Actifs

| Service | URL | Port | Démarrage | Logs |
|---------|-----|------|-----------|------|
| Mission Control (Next.js) | http://localhost:3000 | 3000 | LaunchAgent auto | `/tmp/clawdbot-mission-control.log` |
| Convex (backend MC) | http://127.0.0.1:6790 | 3210/6790 | LaunchAgent auto | `/tmp/clawdbot-mission-control.log` |
| Bibliothèque | http://localhost:4242 | 4242 | LaunchAgent auto | `/tmp/clawdbot-library.log` |
| Nellio Studio (frontend) | http://localhost:3001 | 3001 | Manuel (`npm start` dans nellio-studio/) | - |
| **OMNIA Creative OS** | **http://localhost:3002** | **3002** | **LaunchAgent auto** | `/tmp/clawdbot-omnia.log` |
| **ADSPY PRO** | **http://localhost:3004** | **3004** | **LaunchAgent auto** | `/tmp/clawdbot-adspy.log` |
| OpenClaw Gateway | http://127.0.0.1:18789 | 18789 | LaunchAgent auto | - |

### Vérification rapide des services
```bash
# Tous les services
curl -s http://localhost:3000 > /dev/null && echo "MC ✅" || echo "MC ❌"
curl -s http://localhost:4242 > /dev/null && echo "Library ✅" || echo "Library ❌"
curl -s http://localhost:3001/api/health > /dev/null && echo "Nellio ✅" || echo "Nellio ❌"
```

### LaunchAgents
```
~/Library/LaunchAgents/com.clawdbot.library.plist
~/Library/LaunchAgents/com.clawdbot.mission-control.plist
```

---

## 📁 Workspace Structure

| Dossier | Contenu |
|---------|---------|
| `~/workspace/` | Workspace principal Clawdbot Prime |
| `~/workspace/nellio-studio/` | Outil de génération créative (Claude API) |
| `~/workspace/mission-control/` | Dashboard Next.js (localhost:3000) |
| `~/workspace/library/` | Bibliothèque de documents (localhost:4242) |
| `~/workspace/playlist-openclaw/` | Résumés playlist YouTube (28 vidéos) |
| `~/workspace/books/resumes/` | 62 résumés de livres individuels |
| `~/workspace/memory/` | Logs quotidiens (YYYY-MM-DD.md) |
| `~/workspace/scripts/` | Scripts maintenance (cleanup_monthly.sh) |

---

## 🤖 APIs & Clés

| Service | Variable | Format | Stockage |
|---------|----------|--------|----------|
| Anthropic (Claude) | `ANTHROPIC_API_KEY` | `sk-ant-...` | `~/.openclaw/credentials/anthropic.env` (chmod 600) |
| Groq (LLM free tier) | `GROQ_API_KEY` | `gsk_...` | `~/.openclaw/credentials/anthropic.env` (même fichier) |
| Discord | Token | - | openclaw.json |

### Anthropic API
- **Fichier** : `~/.openclaw/credentials/anthropic.env`
- **Usage** : `source ~/.openclaw/credentials/anthropic.env` avant tout script Python
- **⚠️ Crédits insuffisants** au 2026-02-23 → recharger sur console.anthropic.com → Plans & Billing
- **Modules Python** : `pip3 install anthropic` (python3.9 système macOS)

### Brave Search API
- **Clé** : `BSABcNz8nHqp3mod-cIUJsWQiLqKHfx`
- **Config** : `tools.web.search.apiKey` dans openclaw.json
- **Usage** : `web_search` tool — country="DE", search_lang="de"
- **Quota** : $5 crédits gratuits/mois (~1,000 requêtes)
- **Compte** : openclawdpc2@outlook.fr / ddFbZbOAOTH859NF

### Higgsfield API ✅
- **URL** : https://cloud.higgsfield.ai
- **Login** : leloupdelecom@gmail.com / Sardine.2310
- **API Key ID** : `04faf316-8d27-4c39-8c20-b8ab680cd601`
- **API Key Secret** : `0c9dc0ccf8ab28e8e979c58c7ea416b08d42beab4887d48593aa78c5c4f1e153`
- **Usage** : T2V via `higgsfield-ai/soul/standard` ou `soul/preview` — intégré dans OMNIA Studio Clip

### HeyGen API ✅
- **URL** : https://app.heygen.com
- **API Key** : `sk_V2_hgu_khW4FP1iEV5_48t3oD04Lj1W4b0E5LqUsqno33wJXcha`
- **1287 avatars** · **92 voix DE** dont voix NELLO custom (IDs dans MEMORY.md §Décision #39)
- **Usage** : Talking head UGC DE — intégré dans OMNIA Studio Clip (provider HeyGen)

### BrandSearch.co (remplace Foreplay + Atria)
- **URL** : https://brandsearch.co
- **Login** : leloupdelecom@gmail.com / leloup
- **Capacités** : 160M+ ads, 6.5M+ Shopify brands, Spectre AI, Swipe Files
- **Usage** : Competitor ad spy + creative research + funnel reverse-engineering

### TrendTrack.io (trends + ad spend EU/UK)
- **URL** : https://trendtrack.io
- **Login** : laclairiere34@hotmail.com / 2fBkJfxY7XGZ6AA
- **Capacités** : 1M+ stores, real ad spend DE/EU/UK, match ads → landing pages
- **Usage** : Competitive intelligence + scaling patterns

### Groq API (free tier — summaries pipeline)
- **Fichier** : `~/.openclaw/credentials/anthropic.env` (même fichier, ligne `GROQ_API_KEY=gsk_...`)
- **Modèle** : `llama-3.3-70b-versatile` (30K tokens/min gratuit)
- **Usage** : génération automatique des résumés CRO après transcription Whisper
- **Console** : console.groq.com
- **Modules Python** : `pip3 install groq`
- **Lire la clé en bash** : `GROQ_API_KEY=$(grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2)`

### Nellio Studio API
- **Backend URL** : `http://localhost:3001`
- **Modèle** : `claude-opus-4-5`
- **Clé** : Stockée dans localStorage navigateur (`anthropic_api_key`)
- **Endpoints** :
  - `POST /api/generate/script` → Script UGC en allemand
  - `POST /api/generate/image-prompt` → Prompt Midjourney
  - `POST /api/generate/batch` → Batch 3-2-2 (12 variantes)
  - `GET /api/health` → Status du serveur

---

## 📦 Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| Node.js | v22.22.0 | Runtime |
| npm | - | Package manager |
| Python 3 | 3.x | Scripts, transcripts YouTube |
| Next.js | 14 | Mission Control |
| Convex | Local | Base de données MC |
| Express | - | Nellio Studio backend |
| @anthropic-ai/sdk | - | Claude API |
| youtube-transcript-api | - | Extraction transcripts |
| yt-dlp | - | Metadata playlist YouTube |
| clawhub | 0.7.0 | Registry de skills |

---

## 🖥️ Système

| Info | Valeur |
|------|--------|
| OS | Darwin 23.6.0 (arm64 — Apple Silicon) |
| Shell | zsh |
| Node path | `/opt/homebrew/bin/node` |
| Python path | `/usr/bin/python3` |
| Homebrew | `/opt/homebrew/bin` |
| Disque total | ~59GB |
| Disque libre | ~17GB (29%) — seuil alerte 20% |

---

## 🤖 Agents EVOLVE

| Agent | ID | Workspace |
|-------|-----|-----------|
| Creative Strategist | `creative-strategist` | `~/.openclaw/workspace-creative-strategist/` |
| Market Research | `market-research` | `~/.openclaw/workspace-market-research/` |
| Media Buyer | `media-buyer` | `~/.openclaw/workspace-media-buyer/` |
| Video & Script | `video-script` | `~/.openclaw/workspace-video-script/` |
| Data Analyst | `data-analyst` | `~/.openclaw/workspace-data-analyst/` |
| CRO & Funnel | `cro-funnel` | `~/.openclaw/workspace-cro-funnel/` |

**Statut** : Conceptuels — prompts mappés, non activés (gateway pairing en attente)

---

## 🔧 Commandes Utiles

```bash
# OpenClaw
openclaw status
openclaw cron list
openclaw agents list --bindings
openclaw memory status
openclaw skills list
openclaw doctor

# Services
launchctl list | grep clawdbot
tail -f /tmp/clawdbot-mission-control.log
tail -f /tmp/clawdbot-library.log

# Nellio Studio
cd ~/workspace/nellio-studio && npm start   # Port 3001

# Nettoyage mensuel
bash ~/workspace/scripts/cleanup_monthly.sh

# Playlist check
python3 ~/workspace/playlist-openclaw/check_playlist.py
```

---

## 📢 Discord

- **Guild ID** : `1474514473262776633`
- **Channel ID** : `1474514473787326700`
- **Config** : `requireMention: false` (répond sans @mention)
- **Statut** : Configuré — vérifier que le bot est dans le serveur

---

## 🔴 Bugs Actifs

| Bug | Priorité | Fix |
|-----|----------|-----|
| Memory vector search : 0 chunks, provider manquant | P1 | Requiert clé OpenAI → backend `memory-lancedb` (Claude non compatible) |
| `denyCommands` noms invalides dans gateway.nodes | P2 | Corriger selon la doc API |

---
*Mis à jour manuellement ou via session Clawdbot Prime*
