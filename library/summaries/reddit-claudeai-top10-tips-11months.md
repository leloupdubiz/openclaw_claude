# Top 10 Tips Claude Code — 11 Mois d'Usage Intensif
> Source: r/ClaudeAI — u/ykdojo | Feb 2026
> Reddit: https://www.reddit.com/r/ClaudeAI/comments/1qcan9z/
> GitHub (40+ tips complets): https://github.com/ykdojo/claude-code-tips
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

11 mois d'usage quotidien intensif. Le résumé distillé en 10 principes. La bibliothèque complète = 40+ tips sur GitHub.

> **"Le contexte IA est comme du lait : meilleur frais et condensé."**

---

## 📋 Les 10 Tips (+ 1 Bonus)

### 1. Minimiser le Contexte Fourni
```
Règle : Plus le contexte est long → moins bonnes les performances
Tips :
→ Nouvelle conversation à chaque nouveau topic
→ Conversation 1 : trouver quels fichiers éditer
→ Conversation 2 : (fresh) décider comment les éditer exactement
```

### 2. Résoudre par Étapes
```
→ Ne pas donner un problème trop large d'un coup
→ Décomposer en sous-problèmes
→ Si encore trop grand → décomposer encore
```

### 3. Ne Pas Toujours Sauter à l'Écriture de Code
```
Claude = excellent aussi pour :
→ Comprendre un codebase
→ Research
→ Brainstorming
→ Discussions architecturales

"Faire assez de préparation avant de coder = clé pour du code de qualité."
```

### 4. Maîtriser Git avec Claude
```
→ Laisser Claude gérer les tâches Git/GitHub CLI
→ Commit messages automatiques
→ Branching, pulling
→ Permettre pull automatiquement MAIS PAS push (push = plus risqué)
→ Bonus : git bisect automatisé (avec test script)
```

### 5. Vérifier l'Output de Différentes Façons
```
→ Lui demander d'écrire des tests
→ Utiliser GitHub Desktop (visual client) pour review les changements
→ Générer un draft PR → reviewer avant de marquer "ready"
```

### 6. Laisser l'IA Vérifier son Propre Travail
```
Prompt qui fonctionne très bien :
"Double check everything, every single claim in what you produced 
and at the end make a table of what you were able to verify."

→ Playwright MCP ou /chrome pour vérifier une web app
→ Pour /chrome : utiliser accessibility tree refs (pas coordonnées)
→ Pour CLI interactif : tmux (send commands → capture output → verify)
```

### 7. Configurer un Status Line Custom
```
Status line personnalisée montre :
- Modèle actif
- Répertoire courant
- Branch git
- Nombre de fichiers non commités
- Sync status avec origin
- Barre de progression pour l'usage de tokens ← crucial
```
→ Config dans le [repo GitHub](https://github.com/ykdojo/claude-code-tips)

### 8. Handoff Document entre Sessions ⭐
```
Avant de finir une session :
"Put the rest of the plan in HANDOFF.md. Explain what you have tried, 
what worked, what didn't work, so that the next agent with fresh context 
is able to just load that file and nothing else to get started."

→ Nouvelle session : donner seulement le path de HANDOFF.md
→ Bonus : /compact command pour résumer la conversation
→ Bonus : "half-clone" command (garde la 2ème moitié de la conversation)
```

### 9. Utiliser la Voix
```
→ Voice transcription locale = communication plus rapide
→ Options Mac : SuperWhisper / MacWhisper / Super Voice Assistant
→ Claude comprend même si transcription imparfaite
→ "Comme appeler un ami au lieu de lui envoyer des messages"
```

### 10. Jongler Plusieurs Sessions en Parallèle
```
→ Max 3-4 tâches simultanées au début
→ Méthode "Cascade" :
  - Nouvelle tâche → nouvel onglet à droite
  - Sweep de gauche à droite → oldest to newest
  - Direction constante (sauf check spécifique)
```

### Bonus — Alias `claude` → `c`
```bash
# Dans ~/.zshrc ou ~/.bashrc :
alias c='claude'

# Combinaisons :
c -c  # Continue la dernière conversation
c -r  # Liste les conversations récentes pour reprendre
```

---

## 💡 Insights Actionnables

1. **Handoff.md pattern** → immédiatement applicable à toutes les sessions OMNIA et Nellio Studio → demander à Claude de créer `HANDOFF.md` à la fin de chaque session longue
2. **Context window = milk (frais et condensé)** → confirme la stratégie T6 de AGENTS.md : sessions séparées pour Research / Strategy / Creation / Execution
3. **"Double check every claim + make a table"** → prompt template à ajouter à SOUL.md §Protocole d'Auto-Correction pour les livrables
4. **Token usage progress bar** → configurer dans le setup Claude Code de Chef → visibility sur quand compacter
5. **RTK + Claude Code tips 1 (minimize context)** = duo parfait : RTK compresse les outputs → moins de tokens gaspillés → contexte plus propre plus longtemps

---

## 🏪 Applications directes pour drinknellio.com

| Tip | Application Nellio/OMNIA | Priorité |
|-----|--------------------------|----------|
| **#8 Handoff.md** | Fin de chaque session Claude Code OMNIA/Nellio Studio | P0 immédiat |
| **#1 Fresh context** | Session Research séparée de session Code séparée de session Review | ✅ Déjà dans AGENTS.md §T6 |
| **#6 Self-verify table** | Valider les claims Meta Ads DE + conformité légale | P1 |
| **Alias `c`** | Setup sur Mac de Chef → speed up accès Claude Code | Bonus |
| **#3 Prep avant code** | Avant OMNIA build : research + architecture → PUIS code | P1 |

---

## 🔗 Ressources

- **GitHub 40+ tips complets** : https://github.com/ykdojo/claude-code-tips
- **Super Voice Assistant** (open source) : https://github.com/ykdojo/super-voice-assistant
- **Half-clone command** : https://github.com/ykdojo/claude-code-tips#half-clone-to-reduce-context

---

## ⚡ Citations Clés

> "AI context is like milk; it's best served fresh and condensed."

> "Doing enough preparation before jumping into writing code is one of the essential keys for producing high quality code."

> "Double check everything, every single claim in what you produced and at the end make a table of what you were able to verify."

> "Whenever I start a new task, I just open a new tab on the right. Then I sweep left to right — oldest to newest."

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
