# ⚡ Clawdbot Prime — Workspace

> AI Chief E-Commerce Operator | drinknellio.com | EVOLVE Framework

Repo de backup complet du workspace OpenClaw. Contient toute la mémoire, tous les projets, tous les SaaS et tous les processus.

---

## 📁 Structure

| Dossier/Fichier | Contenu |
|-----------------|---------|
| `MEMORY.md` | Mémoire long-terme consolidée (source de vérité) |
| `AGENTS.md` | Protocole de travail + architecture multi-agents |
| `SOUL.md` | Persona + cadre de réflexion stratégique |
| `HEARTBEAT.md` | Routines automatiques (daily, disk watchdog, playlist) |
| `USER.md` | Profil Chef + business context |
| `TOOLS.md` | Services locaux, APIs, stack technique |
| `memory/` | Logs quotidiens YYYY-MM-DD.md |
| `EVOLVE_RESULTS/` | 400+ fichiers EVOLVE (research, avatars, scripts, hooks) |
| `research_weekly/` | Research hebdomadaire automatisée |
| `nellio-studio/` | SaaS génération créative (Express + Claude API) |
| `omnia/` | OMNIA Creative OS (Next.js + vidéo IA) |
| `mission-control/` | Dashboard Next.js + Convex |
| `adspy/` | AdSpy Pro local |
| `library/` | Bibliothèque 100+ résumés (Express local) |
| `formations/` | Pipelines transcription Whisper + résumés CRO/EVOLVE |
| `scripts/` | Scripts maintenance, watchdog, cleanup |
| `playlist-openclaw/` | 28 vidéos OpenClaw résumées |
| `books/` | 62 résumés livres business |
| `EVOLVE_AGENTS_MAP.md` | Architecture 20+ agents EVOLVE |
| `KB_*.md` | Knowledge bases (Architecture, E-commerce, Advertising) |

---

## 🚀 Bootstrap sur un nouveau PC

### 1. Installer les dépendances système
```bash
# Homebrew (macOS)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node git gh python3

# OpenClaw
npm install -g openclaw
```

### 2. Cloner ce repo
```bash
gh auth login
git clone https://github.com/leloupdubiz/openclaw_claude.git ~/workspace
cd ~/workspace
```

### 3. Configurer les clés API
```bash
mkdir -p ~/.openclaw/credentials
# Créer le fichier avec tes clés :
cat > ~/.openclaw/credentials/anthropic.env << 'EOF'
ANTHROPIC_API_KEY=sk-ant-XXXX
GROQ_API_KEY=gsk_XXXX
EOF
chmod 600 ~/.openclaw/credentials/anthropic.env
```

### 4. Installer les SaaS locaux
```bash
# Nellio Studio
cd ~/workspace/nellio-studio && npm install && npm start  # Port 3001

# Library
cd ~/workspace/library && npm install && node server.js  # Port 4242

# OMNIA
cd ~/workspace/omnia && npm install && npm start  # Port 3002

# Mission Control
cd ~/workspace/mission-control && npm install && npm run dev  # Port 3000
```

### 5. Configurer OpenClaw
```bash
# Copier le workspace comme repo OpenClaw
openclaw configure
# Pointer workspace vers ~/workspace
```

---

## 🔑 APIs Requises

| Service | Où obtenir |
|---------|-----------|
| Anthropic (Claude) | console.anthropic.com |
| Groq (free) | console.groq.com |
| Brave Search | api.search.brave.com |
| HeyGen | app.heygen.com |
| Higgsfield | cloud.higgsfield.ai |

---

## 📊 Projets Actifs

1. **Nellio UltraCalm** — drinknellio.com — Meta Ads DE
2. **EVOLVE** — Méthode marketing complète (Phase 1 Research ✅)
3. **Nellio Studio** — Générateur créatifs Claude
4. **OMNIA Creative OS** — Studio vidéo IA complet
5. **Mission Control** — Dashboard opérationnel

---

*Dernière sync : 2026-04-05*
