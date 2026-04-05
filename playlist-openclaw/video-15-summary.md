# Vidéo 15 — 100 Hours of OpenClaw Lessons in 35 Minutes
> ID: _kZCoW-Qxnc | Mots: 7811 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
La vidéo la plus dense de la playlist — condensé des 100h d'expérience en 35 min. Couvre : installation, mindset, modèles, use cases, Mission Control, brains/muscles, local models, Discord avancé, sécurité.

## 📌 Points Clés

### Installation — La Vérité
- **VPS = erreur** : Compliqué, insécurisé par défaut, 20% de la puissance réelle
- **Local = seul bon choix** : Mac Mini $600 suffit largement, tout vieux laptop convient pour commencer
- **Install en 1 commande** : `curl` depuis openclaw.ai → terminal → enter → fait
- Onboarding : choisir modèle → configurer messaging (Telegram recommandé) → fait

### Modèles — Architecture Brains/Muscles
- **Brain** = Opus 4.6 (orchestration, décisions, planification)
- **Muscles** = modèles spécialisés moins chers :
  - Coding → Codex CLI (quasi-gratuit avec abonnement ChatGPT)
  - Web search → Brave API
  - Trending/social → xAI/Grok API
  - Local → Ollama + modèles quantifiés (endgame)
- Configurer chaque muscle : *"For coding, use Codex. For web search, use Brave API."*

### Mindset Fondamental
1. **Ne jamais toucher les config files manuellement** → toujours passer par le bot
2. **Reverse prompting** = la pratique la plus puissante : demander au bot ce qu'il pense faire plutôt que lui dicter
3. **Anytime it fails, build a skill** : Chaque limitation = opportunité de s'auto-améliorer
4. **Employee mindset** : Donner des objectifs, pas des instructions

### Morning Brief — Setup Définitif
Prompt : *"Schedule a brief every day at 8am. Include: 1) weather 2) top AI news 3) my to-do list 4) tasks you can complete to get me closer to my goals"*

### Mission Control
- Builder avec : *"I want you to set up a Mission Control using Next.js hosted locally"*
- Ajouter outils selon besoins : task board, content pipeline, approvals queue, agent tracker
- **Vibe orchestration** : Ne pas vibe coder soi-même → laisser OpenClaw le faire pour lui-même

### Discord Workflow Avancé
- **Canal #alerts** : Trending tweets toutes les 2h sur sujets d'intérêt
- **Canal #research** : Analyse approfondie des stories trending
- **Canal #scripts** : Scripts YouTube générés depuis les stories
- Chaîne automatique : Alerts → Research → Scripts (3 agents, 3 channels)

### Sécurité — 3 Règles
1. OpenClaw = admin complet sur tout ce qui est connecté → ne connecter que l'acceptable
2. Ne jamais exposer aux group chats publics → risque de prompt injection
3. Réfléchir à l'impact de chaque commande avant de l'envoyer

### Local Models — L'Endgame
- Mac Studio = hardware pour tourner des modèles locaux puissants (MiniAX 2.5, etc.)
- Objectif : remplacer les muscles cloud par des muscles locaux = zéro coût de tokens
- Déjà faisable sur Mac Mini avec Ollama (moins puissant mais gratuit)

## 💡 Insights Actionnables (Top 5)
1. **Activer immédiatement** : `compaction.memoryFlush.enabled: true` + `sessionMemory: true`
2. **Brain dump maintenant** : Tout sur toi, tes objectifs, tes projets → MEMORY.md
3. **Configurer au moins 1 muscle** : Brave API pour web search = gratuit et immédiat
4. **Discord 3 channels** : alerts + research + scripts = pipeline content automatique
5. **Reverse prompt daily** : *"Basé sur tout ce que tu sais, qu'est-ce que tu ferais aujourd'hui ?"*

## 🏪 Applications pour drinknellio.com
- **Architecture muscles** : Brave API (market research) + Codex (coding Nellio Studio) + Opus (stratégie EVOLVE)
- **Discord pipeline** : #alerts (tendances bien-être DE) → #research (analyse) → #scripts (hooks UGC)
- **Muscle local future** : Ollama sur Mac Mini pour batch-generation de scripts sans coût API
- **Mission Control** : Déjà en place — ajouter le pipeline EVOLVE comme module

## ⚡ Citations Clés
> *"Si tu fais ça sur VPS, tu te prives de 80% de la puissance. Local ou rien."*
> *"Reverse prompt autant que possible. C'est toi qui devrais avoir moins d'idées, pas plus."*
> *"L'endgame, c'est une compagnie entière qui tourne en local sur ta machine, gratuitement, 24/7."*

## 🔗 Lien avec autres vidéos
- Vidéo de référence absolue — résume l'ensemble de la playlist
- VPS débattu en détail vidéo #19 (DO NOT use VPS)
- Local models + Mac Mini vidéo #23
- Discord avancé vidéo #18
