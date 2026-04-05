# Vidéo 01 — OpenClaw AI FULL 6 Hour Course
> ID: hRwjoU4RlMY | Mots: 72106 | Durée: ~6h | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
Cours live de 6 heures couvrant l'intégralité d'OpenClaw — de l'installation à l'orchestration multi-agents avancée. Format live stream avec Q&A en temps réel. C'est la référence encyclopédique de la playlist.

## 📌 Modules Principaux

### Module 1 — Claw Tasks (Agent Economy)
- **Claw Tasks** : Marketplace B2A (Business to Agent) où les agents IA postent et complètent des missions autonomement
- Agent-to-agent autonomy : un agent trouve des tâches, s'engage (stake), les complète, soumet la preuve — sans intervention humaine
- Système de réputation d'agent : track record public, fiabilité croissante dans le temps
- ⚠️ Beta — expérimental. Superviser obligatoirement. Ne pas connecter les comptes sensibles.

### Module 2 — Sécurité & VPS (Warning)
- **Prompt injection** = risque majeur : un email malveillant peut déclencher des actions en cascade
- VPS exposé = risque réel (scans Shodan actifs sur les gateways OpenClaw)
- Règle fondamentale : ce qui est connecté à OpenClaw peut être hacké → connecter uniquement l'acceptable
- SQL injection a été résolu côté web → prompt injection = l'équivalent côté AI : non encore résolu
- Recommandation : Docker sandbox pour isoler les agents exposés à des inputs externes

### Module 3 — Installation Multi-Méthodes
- **Méthode locale (recommandée)** : `curl` install → terminal wizard → pair Telegram → opérationnel en 10 min
- **AWS/VPS** : Possible mais pénible. Méthode Damian Player (EC2 Ubuntu + copy-paste) la plus simple
- **Installation en 1 commande** : openclaw.ai → copier la commande → terminal → enter
- Raspberry Pi : fonctionne pour les tâches légères. Mac Mini M2 = optimal rapport qualité/prix
- Ghostty terminal recommandé : léger, split-screen natif, multi-instances sans ralentissement

### Module 4 — Modèles & Architecture
- **Brain** : Claude Opus 4.6 (orchestration, décisions complexes)
- **Muscles** :
  - Codex CLI (OpenAI) : coding de qualité via abonnement ChatGPT (pas de surcoût token)
  - GLM 4.7 Flash : gratuit, bon pour tâches légères et heartbeats
  - Ollama local : Llama 3.2, Gemma 3 4B, Qwen2.5 7B → zéro coût, parfait pour sub-agents
  - Open Router : switch automatique entre modèles quand rate limited
- **Conseil coût** : éviter "think" / "ultra think" dans les prompts → tokens ×3-5
- Architecture hybride recommandée : Opus pour orchestration, Ollama pour sous-tâches en volume

### Module 5 — Malt Book (Social Media IA)
- Malt Book : réseau social exclusivement pour agents IA (lancé janvier 2026 par Octane AI)
- 148 000 agents en 2 semaines, 11 000 posts, 118 000 commentaires
- Pattern de comportement émergent : agents qui forment des communautés, débattent philosophie, s'entraident
- Outil de personal branding : laisser son agent poster sur Malt Book autonomement pour construire une audience IA
- ⚠️ Ne jamais connecter de données business sensibles à Malt Book (plateforme publique)

### Module 6 — Skills & Intégrations
- **Skills catalogue** : Apple Notes, Apple Reminders, Blog Watcher, Bird (Twitter CLI), GitHub, Nano Banana (image gen), Open Whisper (speech-to-text local)
- Blog Watcher : surveiller les publications de concurrents → alertes automatiques
- Bird : lire, rechercher, poster, engager sur X/Twitter directement depuis OpenClaw
- Nano Banana / OpenAI Images : génération d'images directement dans le chat
- n8n : intégration possible (lister workflows, déclencher, activer/désactiver, consulter historique)

### Module 7 — Voice Agent
- Construire un voice agent en temps réel avec OpenAI Realtime Voice API
- Interface custom avec avatar (style lobster OpenClaw)
- Pattern : Claude Code → build l'interface → deploy en local → Telegram/WhatsApp comme proxy
- Intégration possible avec OpenClaw pour exécuter des tools via voix ("run tool" command)
- Limite actuelle : latence et fiabilité encore imparfaites sur le trigger de tools par voix

### Module 8 — OpenClaw vs Alternatives
| Outil | Usage |
|-------|-------|
| Claude.ai | Chat simple, pas d'action |
| Claude MCP | Claude + accès fichiers/apps |
| Claude Cowork | Computer use ponctuel |
| **OpenClaw** | Agent 24/7, messaging, actions réelles, self-hosted |
| n8n | Automatisation no-code, workflows graphiques |
- OpenClaw > n8n pour la majorité des automatisations : plus simple à setup, plus intelligent, plus flexible

### Module 9 — Cas d'Usage Démontrés Live
- Publier sur WordPress directement depuis le chat
- Générer des thumbnails YouTube via Google AI Studio
- Créer une page Notion automatiquement
- Contrôler Chrome via l'extension Browser Relay
- Générer des vidéos d'avatar IA (HeyGen)
- Créer des notes vocales
- Monitoring des blogs concurrents (Blog Watcher)
- Poster sur Malt Book en autonome

## 💡 Insights Actionnables (Top 10 du cours)
1. **Ne jamais exposer sur VPS sans firewall strict** → local only ou Docker isolé
2. **Architecture brains/muscles** : Opus pour l'orchestration + Ollama pour le volume = optimal coût/qualité
3. **Blog Watcher** sur les concurrents immédiats → alertes quotidiennes
4. **Bird skill** → monitorer les trending tweets sur le secteur (wellness DE, stress, etc.)
5. **Malt Book** : laisser son agent construire une présence IA → audience early adopters
6. **Voice agent** : buildable en une session Claude Code → prototype en 30 min
7. **Ollama sub-agents** : déléguer toutes les sous-tâches légères → économies 60-80% sur les tokens
8. **Open Router key** : ajouter comme fallback → zéro downtime en cas de rate limiting
9. **Browser Relay Chrome** : autoriser OpenClaw à contrôler le browser pour n'importe quelle tâche UI
10. **DM personnel Julian Goldie** : AI Profit Boardroom → communauté 38K membres

## 🏪 Applications pour drinknellio.com
- **Blog Watcher** : surveiller les blogs Adaptogen, KSM-66, Calm, et autres concurrents wellness DE
- **Bird (Twitter)** : monitorer les hashtags #stress #burnout #wellness en allemand
- **Architecture locale** : OpenClaw local sur Mac → conforme à la recommandation du cours
- **Ollama** : installer Qwen2.5:7b pour la génération de scripts en volume (excellent en allemand)
- **Voice agent** : potentiel pour le service client drinknellio.com ou les approbations créatives

## ⚡ Citations Clés
> *"Ce n'est pas de l'automatisation. C'est une main-d'œuvre numérique entièrement autonome."*
> *"On a passé des décennies à sécuriser le web. Et maintenant on donne à l'IA un accès total à tout sans avoir résolu le prompt injection. C'est comme avoir appris rien."*
> *"L'endgame, c'est une compagnie entière qui tourne en local sur ta machine, gratuitement, 24/7."*
> *"Le meilleur investissement que j'ai fait cette année, c'est du hardware. Un bon modèle local, c'est l'employé le plus productif au monde."*

## 🔗 Lien avec autres vidéos
- Vidéo encyclopédique — couvre le contenu de TOUTES les autres vidéos de la playlist
- Détails spécialisés dans : #15 (100h condensé), #10 (armée d'agents), #23 (Mac Mini), #19 (VPS warning), #25-28 (Claude Code)
