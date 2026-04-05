# Ralph + Plankton — Autonomous Claude Code Loop
> @alxfazio | 4319 bk · 214K vues | Ralph · Plankton · Autonomous loop · Quality gates · frankbria/ralph-claude-code

## 🎯 Concept Central
Ralph est un système qui permet à Claude Code de tourner en boucle autonome sur des tâches de développement complexes. Plankton est le composant de quality gates — il vérifie chaque output de Claude avant de continuer. Ensemble, ils forment une boucle autonome de développement avec auto-correction.

## 📌 Points Clés
- **Ralph** : Wrapper autour de Claude Code qui gère le contexte, les retries, et la boucle de tâches longues
- **Plankton** : Agent de validation — teste le code généré, vérifie les critères de qualité, relance si échec
- **Boucle autonome** : Plan → Code → Test → Validate → (si fail : iterate) → (si pass : next task)
- **Quality gates** : Critères définis en amont (tests passent, pas d'erreurs console, performance benchmark OK)
- GitHub : `frankbria/ralph-claude-code` — open source, configurable
- Use case typique : "Construis-moi une feature complète" → Ralph décompose, code, teste, livre
- Compatible avec tout projet existant — s'installe en overlay sur Claude Code

## 💡 Applications pour drinknellio.com / OMNIA / EVOLVE
- **Nellio Studio dev** : Ralph pour implémenter de nouvelles features (Batch Generator, export) sans supervision constante
- **OMNIA SaaS build** : Utiliser Ralph pour les sprints de développement autonomes — définir les quality gates → laisser tourner
- **EVOLVE agents** : Plankton comme validation layer sur chaque output d'agent (vérifier que le script est bien en allemand, a un CTA, etc.)
- **Debugging** : Ralph + Plankton pour identifier et corriger les bugs en boucle sans intervention manuelle

## ⚡ Citation / Insight Clé
> "Ralph doesn't just write code. It writes code, tests it, fixes it, and delivers it. You set the quality bar — it meets it."

## 🔗 Ressources
- GitHub : https://github.com/frankbria/ralph-claude-code
- Thread original : @alxfazio sur X (4319 bk, 214K vues)
- Claude Code docs : https://docs.anthropic.com/claude-code
