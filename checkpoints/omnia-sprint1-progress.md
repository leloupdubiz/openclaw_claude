# Progress — OMNIA Sprint 1
Démarré : 2026-02-24 17:42
Estimé : 3 blocs × 10 min

## Sous-tâches
- [x] OMNIA v1 opérationnel (port 3002, 5 modules)
- [ ] Bloc 1 : server.js — 6 nouvelles routes (voiceover, b-roll, cinematic, batch, hooks)
- [ ] Bloc 2 : index.html — 5 nouveaux tabs (Hook Bank, Voiceover, B-Roll, ZackD, Batch Gen)
- [ ] Bloc 3 : Test + polish + restart

## Nouvelles routes backend
- GET  /api/hooks → 75 hooks depuis hook_bank.md
- POST /api/voiceover/generate → ElevenLabs multilingual-v2 DE
- POST /api/broll/generate → Kling 3.0 product shots
- POST /api/cinematic/generate → ZackD style (multi-scene Claude + Kling/Sora)
- POST /api/batch/generate → queue de génération 12 créatives
- POST /api/ffmpeg/assemble → assembly local ffmpeg

## ZackD Style = Cinematic AI Animated
- 4-6 scènes × 3-5s = 15-30s total
- Kling 3.0 pour visuals cinématiques
- ElevenLabs V3 voiceover DE
- ffmpeg assembly: clips + audio + sous-titres
- Modèles kie.ai : kling/kling-3.0 + elevenlabs/text-to-speech-multilingual-v2

## Contexte de reprise
Port 3002 actif. Fichiers : omnia/server.js + omnia/public/index.html
