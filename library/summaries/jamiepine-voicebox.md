# Voicebox — Studio de Synthèse Vocale Open-Source (Qwen3-TTS)
> Source : https://github.com/jamiepine/voicebox | Auteur : @jamiepine | Date : Mars 2026

## 🎯 Concept Central
Voicebox est l'alternative open-source locale à ElevenLabs, propulsée par Qwen3-TTS d'Alibaba. C'est un studio complet avec éditeur timeline multi-piste, clonage vocal depuis quelques secondes d'audio, et une API REST complète. Il tourne entièrement en local, sans cloud ni abonnement.

## 📌 Points Clés
- **Stack** : Tauri (Rust) + React + FastAPI Python + SQLite + Whisper transcription
- **Clonage vocal** : quelques secondes d'audio suffisent, haute fidélité
- **MLX backend** : 4-5x plus rapide sur Apple Silicon (M1/M2/M3)
- **Multi-track timeline** : éditeur DAW-like pour produire des narrations multi-voix
- **API REST locale** : `POST /generate`, `GET /profiles`, intégrable dans n'importe quel projet
- **Batch generation** : long-form content sans limite de caractères
- **Smart caching** : régénération instantanée avec voice prompt caching
- Export multi-formats, enregistrement en app, transcription auto Whisper

## 💡 Insights Actionnables
1. Télécharger Voicebox (Apple Silicon) : `Voicebox_aarch64.app.tar.gz` sur GitHub releases
2. Cloner une voix target en uploadant 10-30s d'audio d'un créateur DE
3. Utiliser l'API REST pour automatiser la génération depuis Nellio Studio
4. Produire des scripts UGC DE audio en batch : 10 variantes en une commande API

## 🏪 Applications pour drinknellio.com
- Générer les voiceovers allemands des scripts UGC Nellio sans dépendance ElevenLabs
- API REST intégrable dans Nellio Studio pour TTS automatique post-script
- Cloner une voix "Nellio brand voice" cohérente sur tous les créatifs vidéo

## ⚡ Citation Clé
> "Think of Voicebox as a local, free and open-source alternative to ElevenLabs — download models, clone voices, and generate speech entirely on your machine."
