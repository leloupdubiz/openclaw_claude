# Progress — Sprint 2 OMNIA — Multi-Scène System
Démarré : 2026-02-24 21:36
Terminé : 2026-02-24 22:00

## Sous-tâches
- [x] Module 1 : Avatar Seed System (endpoints + dossier avatars/)
- [x] Module 2 : Multi-Scene Video Builder (backend + UI HTML)
- [x] Module 3 : Scene Template Library (endpoints + génération script)
- [x] Module 4 : Batch Multi-Scene (endpoints + UI HTML)

## Endpoints ajoutés

### Module 1 — Avatar Seed System
- `POST /api/avatars/save-profile` — Sauvegarder un profil avatar dans ./avatars/[avatarId]/
- `GET /api/avatars/list` — Lister tous les avatars sauvegardés
- `GET /api/avatars/:avatarId` — Récupérer un profil par ID
- `POST /api/avatars/extract-reference-frame` — Télécharger vidéo + extraire frame 0.5s via ffmpeg
- `app.use('/avatars', express.static(...))` — Servir les fichiers avatars

### Module 2 — Multi-Scene Video Builder
- `POST /api/multiscene/generate` — Lancer génération multi-scènes async (retourne jobId)
- `GET /api/multiscene/status/:jobId` — Polling statut (running/done/failed)
- Helper `consistencyAnchor(avatarProfile)` — Injecte la cohérence visuelle dans les prompts
- Store in-memory `multisceneJobs` — Track des jobs

### Module 3 — Scene Template Library
- `GET /api/scene-templates` — Retourne 4 templates (ugc-classic, testimonial, demo, vsl-court)
- `POST /api/generate-scene-script` — Génère un script DE 15s via Claude pour une scène

### Module 4 — Batch Multi-Scene
- `POST /api/batch/multiscene` — Lancer un batch de concepts multi-scènes (async séquentiel)
- `GET /api/batch/multiscene/status/:batchJobId` — Polling statut batch

## Modifications HTML (public/index.html)
- Ajout nav item "Multi-Scènes" dans la sidebar (section Sprint 2)
- Ajout page `#page-multiscene` entre Video Generator et Video Library
- Ajout toggle Mode Multi-Scènes dans la section Batch Generator
- Ajout fonctions JS : `loadAvatarsList()`, `updateSceneCards()`, `loadMsTemplate()`, `generateSceneScript()`, `generateMultiScene()`, `pollMultiSceneStatus()`, `toggleBatchMultiSceneMode()`
- Appel `loadAvatarsList()` + `updateSceneCards()` dans l'init + showPage

## Tests validés
- `curl http://localhost:3002/api/avatars/list` → [] (liste vide) ✅
- `POST /api/avatars/save-profile` → profile sauvegardé ✅
- `GET /api/avatars/test-avatar-01` → profil récupéré ✅
- `GET /api/multiscene/status/test` → {"error":"not found"} ✅
- `GET /api/scene-templates` → 4 templates ✅
- `POST /api/batch/multiscene` → success + batchJobId ✅
- `GET /api/` (HTML) → 200 OK ✅

## Décisions techniques
- kie.ai API appelée avec `x-api-key` header (différent du Bearer token OAuth Claude)
- processMultiSceneJob() est une fonction partagée entre `/api/multiscene/generate` et le batch
- Store in-memory pour les jobs (reset au restart serveur) — suffisant pour usage mono-session
- consistencyAnchor() retourne le texte d'ancrage selon referenceFrameUrl ou basePrompt
- Batch vérifie l'espace disque (>3GB) avant chaque concept
- LaunchAgent rechargé pour persistance après restart
