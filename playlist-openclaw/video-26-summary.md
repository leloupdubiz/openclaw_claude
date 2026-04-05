# Vidéo 26 — The Greatest Claude Code Workflow Ever (10x Your Speed)
> ID: WdD6uD_kupY | Mots: 3553 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
Le workflow optimal pour Claude Code en 2025 : **Ghostty terminal** (remplace VS Code/Cursor) + **multi-window multitasking** + **split terminal server/dev**.

## 📌 Points Clés

### Pourquoi Ghostty > VS Code/Cursor
- VS Code/Cursor : memory consumption énorme → 2e instance = computer qui rame
- Ghostty : terminal léger → 10 instances simultanées sans ralentissement
- Claude Code dans terminal = updates en premier (plan mode, nouvelles features)
- Interface split-screen native : terminal coding + logs serveur en vue simultanée

### Setup Ghostty
1. `ghostty.org` → Download (gratuit)
2. Themes personnalisables → choisir un dark theme
3. Split terminal : File → Split Right → deux terminaux côte à côte
4. Tabs multiples pour projets différents

### Workflow Multi-Projet
- **Fenêtre 1 (gauche)** : Claude Code en cours de build
- **Fenêtre 2 (droite)** : Serveur (`npm run dev`) + logs en temps réel
- **Fenêtre 3** : Second projet → multitask pendant que le premier build
- **Pattern** : Ne jamais regarder Twitter pendant qu'un agent travaille → ouvrir un 2e Claude

### Plan Mode (Shift+Tab×2)
- Mode conversation sans execution → parfait pour planifier avant de coder
- Pose beaucoup de questions → meilleur app résultant
- Toujours terminer par *"Feel free to ask me questions"*

### Gestion Multi-Agent sur Même Projet
- Créer des branches séparées : *"Create a new branch for this feature in a new work tree"*
- Nécessite GitHub setup
- Chaque agent dans son propre work tree → pas de conflits

### Gestion des Bugs
- Screenshot du bug → coller dans Claude → diagnostic + fix immédiat
- Server logs en temps réel (split terminal) → copier l'erreur directement dans Claude

## 💡 Insights Actionnables
1. **Installer Ghostty maintenant** → remplacer VS Code pour Claude Code
2. **Workflow split** : Toujours avoir le serveur à droite, Claude à gauche
3. **Jamais idle** : Pendant qu'un Claude build → ouvrir un 2e sur un autre projet
4. **Plan mode first** : 2-3 minutes de questions = 30 minutes de debug évités

## 🏪 Applications pour drinknellio.com
- Développement Nellio Studio dans Ghostty : Claude Code (gauche) + `npm start` backend (droite)
- Multi-fenêtres : Nellio Studio build + batch 3-2-2 generation en parallèle
- Plan mode pour les nouvelles features Nellio Studio : design before code

## ⚡ Citation Clé
> *"J'ai testé tous les workflows Claude Code existants. Celui-ci détruit tous les autres en vitesse, stabilité, et capacité de multitâche."*

## 🔗 Lien avec autres vidéos
- Prompting Claude Code vidéo #28
- Claude Code setup vidéo #25
