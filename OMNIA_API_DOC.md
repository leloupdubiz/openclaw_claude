# OMNIA Creative OS — API Documentation
> Service : http://localhost:3002 | Version : v1 | Dernière mise à jour : 2026-02-27
> Stack : Node.js/Express · Anthropic Claude · HeyGen · Higgsfield

---

## 🟢 Health & Status

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/health` | Status du service + version |
| GET | `/api/credits` | Crédits API restants (Higgsfield/HeyGen) |

```bash
curl http://localhost:3002/api/health
# → {"status":"ok","service":"OMNIA Creative OS","port":3002}
```

---

## 🤖 Agents EVOLVE

### POST `/api/agents/chat`
Chat avec un agent EVOLVE (stream conversationnel).

**Body JSON :**
```json
{
  "agentId": "market-researcher",
  "history": [{"role": "user", "content": "Analyse le marché"}]
}
```

**Agents disponibles :**
| agentId | Rôle | Layer |
|---------|------|-------|
| `market-researcher` | Research désirs + verbatims DE | research |
| `avatar-architect` | Construit les core avatars | strategy |
| `ad-library-spy` | Analyse Ad Library concurrents | research |
| `research-synth` | Synthèse research | research |
| `strategy-lead` | Orchestrateur stratégie EVOLVE | strategy |
| `hook-writer` | Hooks 3 secondes DE | creation |
| `script-writer` | Scripts UGC/VSL DE | creation |
| `brief-creator` | Briefs créateurs | creation |
| `video-editor` | Direction vidéo | creation |
| `static-designer` | Ads images | creation |
| `campaign-builder` | Setup Meta CBO | execution |
| `budget-optimizer` | Gestion budget | execution |
| `seeding-manager` | Gestion UGC creators | execution |
| `perf-monitor` | Monitoring performances | analysis |
| `iteration-creator` | Variations créatives | creation |
| `scale-strategist` | Scale des winners | execution |
| `learning-analyst` | Analyse résultats | analysis |
| `sub-avatar-specialist` | Sub-avatars (15-30) | strategy |
| `angle-extractor` | Bank d'angles (30-90) | strategy |
| `concept-strategist` | Planning batches | strategy |
| `review-analyzer` | Mining reviews Amazon/Reddit | research |
| `awareness-mapper` | Mapping niveaux awareness | strategy |
| `market-sophistication-analyst` | Stage 1-5 | strategy |
| `creative-roadmap-manager` | Growth Guide + Roadmap | strategy |
| `foreplay-curator` | Swipe file ads | research |
| `research-doc-generator` | Research Doc EVOLVE complet | research |
| `creative-roadmap-builder` | Creative Roadmap Batch | strategy |
| `learnings-storage` | Archive learnings post-test | optimization |

**Réponse :**
```json
{"response": "Texte de la réponse de l'agent..."}
```

### POST `/api/agents/mission`
Lance la mission autonome prédéfinie d'un agent.

**Body JSON :**
```json
{"agentId": "strategy-lead"}
```

**Réponse :**
```json
{"result": "Output de mission...", "agentId": "strategy-lead", "timestamp": "..."}
```

### GET `/api/agents/results`
Récupère tous les derniers résultats de missions (depuis missionResults.json).

---

## 🎬 Génération Vidéo (Higgsfield / HeyGen)

### POST `/api/video/generate`
Génère une vidéo T2V ou I2V.

**Body JSON :**
```json
{
  "prompt": "...",
  "model": "higgsfield-ai/soul/standard",
  "imageUrl": "https://...",
  "duration": 10
}
```

### GET `/api/video/status/:taskId`
Vérifie le statut d'une génération vidéo.

### GET `/api/videos`
Liste toutes les vidéos générées (depuis videos.json).

### POST `/api/videos/cache-all`
Télécharge et met en cache toutes les vidéos dans `/public/downloads/`.

---

## 🎙️ Voiceover

### POST `/api/voiceover/generate`
Génère un voiceover HeyGen en allemand.

**Body JSON :**
```json
{
  "text": "Dein Cortisol ist nachts noch aktiv...",
  "voiceId": "de-DE-voice-id",
  "speed": 1.0
}
```

### GET `/api/voiceover/status/:taskId`
Vérifie le statut du voiceover.

### GET `/api/voiceovers`
Liste tous les voiceovers générés.

---

## 🖼️ Studio Clip (Variants + Voiceover)

### POST `/api/clip/generate-variants`
Génère des variantes vidéo avec avatars HeyGen.

**Body JSON :**
```json
{
  "prompt": "...",
  "avatarId": "...",
  "voiceId": "...",
  "script": "...",
  "angleId": "teufelskreis",
  "variantCount": 3
}
```

### GET `/api/clip/variants-status/:variantJobId`
Vérifie le statut des variantes.

### POST `/api/clip/select`
Sélectionne une variante pour un projet.

### POST `/api/clip/add-voiceover`
Ajoute un voiceover à une variante sélectionnée.

---

## 🎯 Hooks & Scripts

### GET `/api/hooks`
Retourne tous les hooks OMNIA (par angle, format et avatar).

```bash
curl http://localhost:3002/api/hooks
# → {hooks: [{angle: "teufelskreis", text: "...", avatars: [...]}], ...}
```

### POST `/api/hooks/variations`
Génère des variations d'un hook via Claude.

**Body JSON :**
```json
{
  "hookText": "Du schläfst schlecht WEIL du gestresst bist.",
  "angle": "teufelskreis",
  "avatarId": "SA-01",
  "count": 5
}
```

---

## 📦 Batch Production

### GET `/api/batches`
Retourne les configs des batches disponibles (batch1, batch2, batch3, batch4).

### POST `/api/batch/generate`
Lance une génération en batch (plusieurs créatifs d'un coup).

**Body JSON :**
```json
{
  "batchId": "batch1",
  "avatarId": "SA-01",
  "overrides": {}
}
```

### GET `/api/batch/jobs`
Liste tous les batch jobs en cours/terminés.

### POST `/api/batch/multiscene`
Lance un batch multi-scènes (génération cinématique complète).

### GET `/api/batch/multiscene/status/:batchJobId`
Vérifie le statut d'un batch multi-scènes.

---

## 👤 Avatars & Personnages

### GET `/api/avatars/list`
Liste tous les avatars OMNIA configurés.

### GET `/api/avatars/:avatarId`
Détail d'un avatar spécifique.

### POST `/api/avatars/save-profile`
Sauvegarde/met à jour un profil avatar.

### POST `/api/avatars/extract-reference-frame`
Extrait une frame de référence d'une vidéo pour créer un personnage.

### GET `/api/clip-avatars`
Liste les avatars HeyGen disponibles pour Studio Clip.

### GET `/api/clip-angles`
Liste les angles disponibles dans le Studio Clip.

### GET `/api/characters`
Liste les personnages custom créés.

### POST `/api/characters/save`
Sauvegarde un nouveau personnage.

### POST `/api/characters/create`
Crée un personnage via Higgsfield (génération image de référence).

### DELETE `/api/characters/:id`
Supprime un personnage.

---

## 🎬 Cinématique (Multi-Scènes)

### POST `/api/cinematic/generate`
Génère un storyboard cinématique (plusieurs scènes liées).

### POST `/api/cinematic/produce/:projectId`
Lance la production vidéo de chaque scène.

### POST `/api/cinematic/assemble/:projectId`
Assemble toutes les scènes en vidéo finale.

### GET `/api/cinematics`
Liste tous les projets cinématiques.

---

## 📁 Projets

### POST `/api/projects/create`
Crée un nouveau projet OMNIA.

**Body JSON :**
```json
{
  "name": "Batch #1 Marksman",
  "angleId": "teufelskreis",
  "avatarId": "SA-01"
}
```

### GET `/api/projects/list`
Liste tous les projets.

### GET `/api/projects/:projectId`
Détail d'un projet avec tous ses assets.

### GET `/api/projects/:projectId/export-zip`
Exporte un projet complet en ZIP (vidéos + voiceovers + métadonnées).

---

## 🖼️ Images & Assets

### GET `/api/assets/brand`
Retourne les assets brand Nellio (URLs publiques depuis `/assets/brand/`).

### POST `/api/image/host`
Upload et héberge une image temporairement (via tmpfiles.org).

**Body JSON :**
```json
{"imageBase64": "data:image/png;base64,..."}
```

**Réponse :**
```json
{"url": "https://tmpfiles.org/dl/..."}
```

### POST `/api/image/extract-from-url`
Extrait et télécharge une image depuis une URL externe.

---

## 🌐 Génération de Prompts

### POST `/api/prompt/generate`
Génère un prompt vidéo/image optimisé via Claude.

**Body JSON :**
```json
{
  "type": "ugc",
  "angle": "teufelskreis",
  "avatarId": "SA-01",
  "duration": 45
}
```

### POST `/api/generate/clip-prompt`
Génère un prompt spécialisé pour Studio Clip (HeyGen/Higgsfield).

### POST `/api/generate/visual-prompt`
Génère un prompt visuel pour images statiques.

---

## 🎬 Scènes

### GET `/api/scene-templates`
Retourne les templates de scènes disponibles.

### POST `/api/generate-scene-script`
Génère le script d'une scène via Claude.

### GET `/api/multiscene/status/:jobId`
Vérifie le statut d'une génération multi-scènes.

---

## 🔤 Traduction

### POST `/api/translate`
Traduit du texte en allemand via Claude.

**Body JSON :**
```json
{
  "text": "Ton corps fait des heures supplémentaires.",
  "targetLang": "de"
}
```

---

## 📋 HeyGen Direct

### GET `/api/heygen/avatars`
Liste tous les avatars HeyGen disponibles (1287 avatars, 92 voix DE).

### GET `/api/heygen/voices`
Liste les voix HeyGen disponibles filtrable par langue (DE).

---

## 🔑 Variables d'environnement requises

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Clé API Claude (sk-ant-...) |
| `HIGGSFIELD_KEY_ID` | ID clé Higgsfield |
| `HIGGSFIELD_KEY_SECRET` | Secret clé Higgsfield |
| `HEYGEN_API_KEY` | Clé API HeyGen |

> Stockées dans `~/.openclaw/credentials/anthropic.env`

---

## 🚀 Démarrage

```bash
# Démarrage via LaunchAgent (auto)
launchctl start com.clawdbot.omnia

# Ou manuel
cd ~/.openclaw/workspace/omnia && node server.js

# Vérification
curl http://localhost:3002/api/health
```
