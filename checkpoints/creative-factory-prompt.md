Tu es un senior fullstack engineer. Tu travailles sur OMNIA Creative OS (port 3002), une app Node.js/Express + frontend HTML vanilla dans /Users/pc2/.openclaw/workspace/omnia/.

## MISSION : Builder la Creative Factory — 5 modules nouveaux

### CONTEXTE
- OMNIA server.js existe déjà (3800+ lignes) avec HeyGen API intégré
- HeyGen API key: sk_V2_hgu_khW4FP1iEV5_48t3oD04Lj1W4b0E5LqUsqno33wJXcha
- Anthropic API key (OAuth): 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
- Higgsfield API: 04faf316-8d27-4c39-8c20-b8ab680cd601:0c9dc0ccf8ab28e8e979c58c7ea416b08d42beab4887d48593aa78c5c4f1e153
- Scripts UGC prêts dans /Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/scripts_batch01.md (3 scripts DE, 50-60s)
- Brand packshot: /Users/pc2/.openclaw/workspace/omnia/public/assets/brand/nellio_16.png

### MODULE 1 — UGC AUTO-PIPELINE
Nouveau fichier: omnia/routes/ugc-pipeline.js
Endpoints à ajouter dans server.js:

POST /api/ugc/pipeline/start
- Lit les scripts depuis /Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/scripts_batch01.md (parser markdown)
- Extrait: hook, body, CTA pour chaque script (texte pur DE, sans markdown ni didascalies)
- Appelle GET https://api.heygen.com/v2/avatars avec header X-Api-Key
- Sélectionne automatiquement: 1 avatar femme photo-réelle (Sonja) + 1 homme photo-réel (Markus)
  - Critères: préférer noms avec "casual", "natural", "realistic"; éviter "cartoon", "anime", "stylized"
  - Fallback: prendre les 2 premiers avatars de genre différent
- Appelle GET https://api.heygen.com/v2/voices → filtre language="de" ou name contient "German"
  - Sélection auto: voix femme DE + voix homme DE
- Pour chaque script: POST https://api.heygen.com/v2/video/generate
  - dimension: { width: 1080, height: 1920 } (9:16)
  - character: { type: "avatar", avatar_id: selectedAvatarId, avatar_style: "normal" }
  - voice: { type: "text", voice_id: selectedVoiceId, input_text: scriptText }
  - background: { type: "color", value: "#1a1a2e" }
- Sauvegarde jobs dans data/ugc_jobs.json avec: { jobId, scriptIndex, scriptTitle, avatarId, voiceId, status, createdAt, videoUrl }
- Retourne: { started: 3, jobIds: [...] }

GET /api/ugc/pipeline/status
- Lit data/ugc_jobs.json
- Pour chaque job avec status != "completed": poll HeyGen GET /v1/video_status.get?video_id={jobId}
- Si completed + url: download video vers public/downloads/ugc_s{index}_{timestamp}.mp4
- Met à jour data/ugc_jobs.json
- Retourne: { jobs: [...avec statuts à jour...] }

GET /api/ugc/pipeline/results
- Retourne tous les UGC complétés avec URL locale

### MODULE 2 — VIDEO CLONER
Nouveau fichier: omnia/routes/video-cloner.js

POST /api/cloner/analyze
Body: { url?: string, transcript?: string, type: "competitor" }
- Si transcript fourni: utiliser directement
- Si url YouTube: tenter fetch du transcript via https://www.youtube.com/watch?v=ID (parser description)
- Analyse avec Claude (model: claude-opus-4-5):
  Prompt: Analyser cette vidéo publicitaire. Identifier:
  1. STRUCTURE: sections (Hook/Problem/Bridge/Mechanism/Proof/CTA) avec durée estimée
  2. TON: émotionnel, éducatif, choc, identification, etc.
  3. CLAIMS: toutes les affirmations produit utilisées
  4. FORMULES LINGUISTIQUES: expressions clés, patterns de phrases
  5. RYTHME: rapide, lent, pauses intentionnelles
  6. POINTS FORTS: ce qui fonctionne probablement bien
  7. POINTS FAIBLES: ce qui peut être amélioré
  Retourner un JSON structuré.
- Retourne: { analysis: {...} }

POST /api/cloner/generate
Body: { analysis: {...}, avatarGender: "female"|"male" }
- Génère avec Claude un script Nellio qui:
  * Respecte la MÊME structure temporelle (proportions des sections)
  * Remplace claims par ceux de Nellio: KSM-66, -28% cortisol (45 études, 3800 patients), 45j garantie, 4.8★/20K Bewertungen
  * Utilise verbatims authentiques: "fertig sein", "Gedankenkarussell", "todmüde", "Kreislauf"
  * Conserve le ton et le rythme identifiés
  * Langue: Allemand natif, 50-60 secondes
- Sélectionne avatar HeyGen selon gender
- Lance génération HeyGen
- Sauvegarde dans data/cloner_jobs.json
- Retourne: { scriptDE: "...", jobId: "...", analysis: {...} }

### MODULE 3 — IMAGE AD FACTORY
Nouveau fichier: omnia/routes/image-factory.js

POST /api/image-factory/generate
Body: { angle: "teufelskreis"|"gedankenkarussell"|"cortisol", format: "1:1"|"4:5"|"9:16", variant: 1|2 }
- Génère avec Claude un prompt Midjourney complet:
  * Style: photorealistic, professional ad photography, clean composition
  * Sujet: person matching avatar (Sonja/Markus) + produit Nellio stick-pack
  * Hook text overlay suggéré (DE, max 8 mots)
  * CTA suggéré (DE)
- Retourne: { midjourneyPrompt: "...", negativePrompt: "...", hookDE: "...", ctaDE: "...", specs: { width, height, ratio } }

POST /api/image-factory/batch
- Génère les 12 variantes 3-2-2 (3 angles × 2 variants × 2 formats: 1:1 et 4:5)
- Retourne: { prompts: [...12 items...] }

### MODULE 4 — AUTOMATION ENGINE
Nouveau fichier: omnia/automation-engine.js

class AutomationEngine:
- JobQueue avec priorités (ugc_video=3, image_batch=2, cloner=1)
- processQueue() : traite les jobs en attente un par un
- pollActiveJobs() : vérifie HeyGen toutes les 30s (setInterval)
- retryFailed() : retry automatique max 3 fois avec backoff exponentiel
- log(message) : écrit dans data/automation_log.json (rolling 500 lignes max)
- start() : démarre l'engine au boot du serveur

Endpoints dans server.js:
GET /api/automation/status → { queueLength, activeJobs, completedToday, recentLogs }
POST /api/automation/queue → { type, payload } — ajoute un job
POST /api/automation/run-all → lance: ugc pipeline (3 videos) + image batch (12 prompts)
DELETE /api/automation/clear → vide la queue (garder les completed)

### MODULE 5 — ONGLET FACTORY dans public/index.html
Ajouter un bouton onglet "🏭 Factory" dans la nav existante.
Section Factory avec 4 sous-sections (tabs internes):

**1. UGC Pipeline**
- Card avec titre "🎬 UGC Auto-Pipeline"
- Bouton "🚀 Lancer les 3 vidéos" → POST /api/ugc/pipeline/start
- Progress cards pour chaque script (S1 Teufelskreis / S2 Gedankenkarussell / S3 Cortisol)
- Status badge: pending → processing → done + thumbnail/player quand ready
- Polling auto toutes les 15s pendant processing
- Bouton download pour chaque vidéo complétée

**2. Video Cloner**
- Input: URL ou textarea "Colle le transcript ici"
- Bouton "🔍 Analyser la vidéo"
- Affiche l'analyse (structure, ton, claims) dans un card expandable
- Select "Avatar: Femme / Homme"
- Bouton "🎬 Cloner pour Nellio"
- Affiche le script généré + player vidéo quand prêt

**3. Image Factory**
- Select angle (3 options)
- Select format
- Bouton "Générer prompt Midjourney"
- Affiche le prompt dans une card avec bouton "📋 Copier"
- Bouton "Batch 3-2-2 Complet" → génère et affiche les 12 prompts dans une grid

**4. Automation Status**
- Badge live count "Queue: X"
- Toggle "▶️ Auto-mode ON/OFF" (polling continu)
- Bouton "🚀 Run All Pipeline" → POST /api/automation/run-all
- Log feed des dernières actions (live, 20 dernières lignes)

### STYLE CSS
Même style que le reste d'OMNIA: dark theme (#0d0d1a background), coral accents (#FF6B6B), cards avec border-radius 12px, backdrop-filter blur.

### RÈGLES D'IMPLÉMENTATION
1. Créer les fichiers routes/ séparément, les importer dans server.js
2. L'automation engine démarre dans server.js: const engine = require('./automation-engine'); engine.start();
3. Tous les outputs dans public/downloads/ avec naming descriptif
4. Gestion erreur robuste partout: try/catch, ne jamais crasher le serveur
5. Commenter le code en français
6. Ne pas modifier les routes existantes (append only)

### ORDRE D'EXÉCUTION
1. Lire server.js (grep les patterns existants pour cohérence)
2. Créer omnia/routes/ugc-pipeline.js
3. Créer omnia/routes/video-cloner.js
4. Créer omnia/routes/image-factory.js
5. Créer omnia/automation-engine.js
6. Modifier server.js: require les 4 nouveaux modules
7. Modifier public/index.html: ajouter onglet Factory
8. Vérifier syntax: node --check server.js
9. Redémarrer: (kill process sur 3002 si actif) && node server.js &
10. Tester: curl http://localhost:3002/api/automation/status

### NOTIFICATION DE FIN
Quand TOUT est terminé et que le serveur tourne sur 3002, exécute:
openclaw system event --text "Done: Creative Factory buildée dans OMNIA — UGC Pipeline + Video Cloner + Image Factory + Automation Engine + onglet Factory UI (port 3002)" --mode now
