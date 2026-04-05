# 5 Mois de Claude Code — Le Knowledge Flywheel & AgentOps Plugin
> Source: r/ClaudeAI (Reddit) — u/boshu2 | Feb 2026
> URL: https://www.reddit.com/r/ClaudeAI/comments/1r6cn6t/
> GitHub: github.com/boshu2/agentops
> Install: `npx skills@latest add boshu2/agentops --all -g`
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**La vraie limite = la context window, pas le modèle.**

Quand un agent fait tout dans une seule conversation, la fenêtre se remplit de choses dont il n'a pas besoin au moment d'écrire le code. C'est pourquoi les résultats sont inconsistants.

**Solution :** Traiter l'agent comme un pipeline DevOps :
- Étapes isolées
- Validation gates
- **Contexte frais à chaque phase**

Et construire un **Knowledge Flywheel** par-dessus : chaque session compound sur la précédente. Les apprentissages sont extraits automatiquement, indexés, scorés, et réinjectés dans la session suivante.

> Session 10 a du contexte que Session 1 n'avait pas.

---

## 📋 Les 9 Skills du Plugin AgentOps

| Skill | Description |
|-------|-------------|
| `/research` | Explore le codebase, écrit les findings dans un fichier |
| `/plan` | Décompose en issues avec des "dependency waves" |
| `/pre-mortem` | Des juges frais valident le plan AVANT de coder |
| `/crank` | Workers parallèles, contexte isolé, lead valide et commit |
| `/vibe` | Juges frais valident le CODE (pas la conversation) |
| `/post-mortem` | Extrait les apprentissages, suggère quoi builder ensuite |
| `/rpi "goal"` | **Chain les 6 skills ci-dessus, 1 commande, walk away** |
| `/council` | Multi-model review sur n'importe quoi, zero setup |
| `/evolve` | Définir des goals repo, améliore jusqu'à ce qu'ils soient verts |

**Architecture :** Skills chainés → invoquent un Go CLI automatiquement via hooks → knowledge injection + transcript mining + validation gates. Pas de config.

---

## 💡 Insights Actionnables

1. **Context Window = le vrai problème** sur les sessions OMNIA longues → appliquer le pattern "étapes isolées + contexte frais" pour chaque phase EVOLVE (Research / Strategy / Creation / Execution = 4 sessions distinctes)
2. **Knowledge Flywheel** = exactement ce que `memory/YYYY-MM-DD.md` + `MEMORY.md` font pour Clawdbot Prime → mais AgentOps l'automatise (extraction + indexation + injection)
3. **`/pre-mortem`** (juges frais valident le plan avant de coder) = pattern à appliquer avant chaque launch de campagne Meta Nellio → un agent frais valide le Creative Roadmap avant que le Campaign Builder exécute
4. **`/rpi "goal"`** = one-command pipeline complet → à implémenter pour EVOLVE : `/rpi "Générer Batch #2 Nellio DE"` → chain research + hook writing + scripts + briefs en une commande
5. **`/council`** = multi-model review → à utiliser pour valider les claims Meta Ads DE (conformité légale) avant lancement

---

## 🏪 Applications directes pour drinknellio.com

| Skill AgentOps | Application Nellio | Phase EVOLVE |
|----------------|-------------------|--------------|
| `/research` | Explore `EVOLVE_RESULTS/` → findings contextualisés | Avant chaque phase |
| `/plan` | Décompose Batch #2 en waves (Research → Avatar → Hooks → Scripts) | Phase 2-3 |
| `/pre-mortem` | Valide Creative Roadmap AVANT lancement Meta Ads | Phase 3→4 |
| `/crank` | Workers parallèles : 3 scripts UGC en simultané | Phase 3 |
| `/post-mortem` | Après 72h data Meta → extraire learnings → alimenter Batch #3 | Phase 4 |
| `/evolve` | Goal : "Atteindre ROAS > 3x" → améliore jusqu'au seuil | Phase 4+ |

---

## 🔧 Installation

```bash
# Installer le plugin (compatible Claude Code, Codex, Cursor)
npx skills@latest add boshu2/agentops --all -g

# Démarrer dans Claude Code
/quickstart

# Tout est local — pas de config cloud
```

---

## ⚡ Citations Clés

> "It's the context window, not the model. When your agent does everything in one conversation, the window fills up with stuff it doesn't need."

> "I started treating my agent like a pipeline: isolated stages, validated gates, fresh context at each phase."

> "The knowledge flywheel means session 10 has context session 1 didn't."

> "/rpi 'goal' — Chains all six, one command, walk away."

---

## 🔗 Liens avec la bibliothèque

- **RTK (Rust Token Killer)** (ce batch) : complémentaire — RTK réduit les tokens par commande, AgentOps optimise l'architecture de la session → ensemble = sessions Claude Code ultra-efficaces
- **Reddit 3-layer memory** (ce batch) : confirme le pattern Knowledge Flywheel — Couche 1 + Couche 2 auto-alimentées
- **AGENTS.md §T4** : "Sub-agents séquentiels" → `/crank` (workers parallèles) vs séquentiel = choix architectural à faire selon la tâche

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
