# Vidéo 11 — OpenClaw Full Course: Setup, Skills, Voice, Memory & More
> ID: vte-fDoZczE | Mots: 10540 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
Cours complet et méthodique (60-70h d'expérience distillées) : sécurité, VPS vs local, modèles, Telegram, skills, mémoire, heartbeat, crons, et fichiers de configuration clés.

## 📌 Points Clés

### Setup & Sécurité
- **VPS via Hostinger** : One-click install, Docker isolé, $7/mois minimum
- **Règle de sécurité fondamentale** : Traiter OpenClaw comme un assistant virtuel non-trusted — ne jamais connecter les comptes principaux (email, crypto, etc.)
- **Docker exec** pour accès terminal : `docker ps` → copier ID → `docker exec -it [ID] /bin/bash`

### Modèles
- **Opus 4.6** pour tâches complexes/stratégiques, Codex pour coding, Kimi/autre pour batch
- **Switch auto** : Configurer une règle dans `SOUL.md` pour switcher selon le type de tâche
- **Commande custom** : Créer `/model [opus|codex]` pour switch rapide

### Telegram Setup
- BotFather → `/newbot` → copier token → `openclaw channels add telegram`
- Pairage via code OTC → confirmer dans Telegram
- Groups séparés par sujet (groupes Telegram = sessions isolées par topic)
- Audio transcription : installer Whisper localement via `openclaw skills install`

### Skills
- Skill = fichier `SKILL.md` + scripts optionnels dans sous-dossier
- Skills bundlées disponibles : weather, coding-agent, github, voice-calling, spotify
- ClawHub : registre public de skills communautaires → `clawhub install [slug]`
- Créer une skill custom : *"Make a skill that does [X]"* → OpenClaw écrit le SKILL.md lui-même

### Mémoire
- `MEMORY.md` = mémoire long terme (lu à chaque session main)
- `memory/YYYY-MM-DD.md` = logs quotidiens bruts
- Activer memory flush : `compaction.memoryFlush.enabled: true`
- Activer session memory : `memorySearch.experimental.sessionMemory: true`
- **QMD vector backend** : Recherche sémantique — nettement supérieure au keyword search par défaut
- OpenClaw ne lit que 2 jours de daily logs par défaut → mettre les éléments importants dans MEMORY.md

### Fichiers de Configuration
- `SOUL.md` : Personnalité, valeurs, style de communication du bot
- `USER.md` : Informations sur l'utilisateur (objectifs, préférences, contexte)
- `IDENTITY.md` : Nom, rôle, équipe de sous-agents
- `TOOLS.md` : Notes locales (SSH hosts, devices, voix TTS)
- `HEARTBEAT.md` : Tâches périodiques à chaque heartbeat

### Heartbeat & Crons
- Heartbeat = check périodique (défaut 30 min, off par défaut → activer)
- Cron = tâche à heure précise (`openclaw cron add`)
- Pattern : Heartbeat pour checks continus, Cron pour rapports à heures fixes

### Sub-Agents
- Spawner depuis sessions → travaille en background
- Visible dans Gateway dashboard → Sessions tab
- Parallélisation via *"Spawn multiple sub-agents and run tasks in parallel"*

## 💡 Insights Actionnables
1. **Interview identity** : *"Donne-moi un interview pour mettre à jour USER.md et IDENTITY.md"*
2. **Memory QMD** : Activer vector search pour retrouver n'importe quel élément de la mémoire
3. **Telegram channels séparés** : Un groupe = un sujet = une session isolée
4. **GitHub bot account** : Créer un compte GitHub dédié au bot → tous ses outputs versionnés automatiquement

## 🏪 Applications pour drinknellio.com
- Fix prioritaire : activer QMD vector search (bug actif en workspace)
- Créer groupe Telegram dédié "drinknellio-strategy" → sessions séparées du main
- GitHub bot : versionner tous les outputs EVOLVE (desire maps, hook banks, scripts)
- Heartbeat 30 min pour monitoring des cron jobs actifs

## ⚡ Citations Clés
> *"Plus tu ajoutes de choses à OpenClaw, plus il devient insécurisé. Ne connecte que ce que tu acceptes de voir hacké un jour."*
> *"Un skill c'est juste un fichier Markdown. Si tu peux le décrire, tu peux en faire un skill."*

## 🔗 Lien avec autres vidéos
- Cours complet de référence — couvre les bases de vidéos #02 à #24
- VPS vs local débattu en détail dans vidéo #19
- Memory avancée dans vidéo #09 et #24
