# Progress — Sprint 3 OMNIA
Démarré : 2026-02-24
Terminé : 2026-02-24

## Sous-tâches
- [x] Étape 0 : Lecture des fichiers (server.js ~580 lignes, index.html ~2400 lignes)
- [x] Tâche 1 : Backend Single Clip Generator (3 variantes)
- [x] Tâche 2 : Backend Système de Projets
- [x] Tâche 3 : Backend Voiceover complet (ElevenLabs direct)
- [x] Tâche 4 : Frontend Refonte page Multi-Scènes → Studio Clip
- [x] Tâche 5 : Désactiver assemblage FFmpeg auto

## Résultats des tests

### Endpoints ajoutés ✅
- POST /api/clip/generate-variants → OK (3 taskIds Sora 2 en parallèle)
- GET /api/clip/variants-status/:id → OK (status pending/done/failed par variante)
- POST /api/clip/select → OK (copie le clip + met à jour project.json)
- POST /api/projects/create → OK (crée ./projects/{projectId}/project.json)
- GET /api/projects/list → OK (liste des projets)
- GET /api/projects/:id → OK (détail projet)
- GET /api/projects/:id/export-zip → OK (Content-Type: application/zip)
- POST /api/voiceover/generate-project → OK (retourne erreur ElevenLabs key missing)
- POST /api/multiscene/generate → OK (reste fonctionnel)

### Frontend ✅
- Page #page-multiscene → refontée en Studio Clip 3 sections (Générateur + Variantes + Projet)
- injectPackagingPrompt() → description stick-pack Nellio (pas canister)
- generateClipVariants() → 3 cards avec spinners + polling 10s
- selectVariant() → border teal sur la card sélectionnée
- loadStudioProjects() + loadStudioProject() → gestion projets
- showCreateProjectModal() → prompt() pour créer un projet
- exportProjectZip() → ouvre /api/projects/:id/export-zip
- Sidebar : Sprint 2+3 → Studio Clip

### Packages
- archiver installé (npm install archiver --save)

## Désactivation FFmpeg auto
- processMultiSceneJob() : bloc concat + ffmpeg commenté
- Remplacé par : job.status = 'done', job.note = 'Assemblage auto désactivé'
- FFmpeg conservé pour : extract-reference-frame + conversion WebM variants

## Packaging Nellio
- NELLIO_PACKAGING_ANCHOR const dans server.js : stick-pack 2.5cm×15cm foil
- Pas de canister — description exacte injectée dans les prompts Sora 2
