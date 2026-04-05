# Claude Code Best Practices — Guide Officiel
> @Meer_AIIT | 1208 bk | Anthropic docs · Boris Cherny · Context Window · Plan Mode · CLAUDE.md · Self-Verify

## 🎯 Concept Central
Synthèse des best practices officielles Claude Code combinant la documentation Anthropic et les recommandations de Boris Cherny (créateur de Claude Code chez Anthropic). Le CLAUDE.md, le Plan Mode, et la gestion du context window sont les trois piliers d'une utilisation professionnelle.

## 📌 Points Clés
- **CLAUDE.md** : Fichier de configuration racine — définit le contexte projet, les conventions, les règles. L'agent le lit à chaque session. Critique pour la cohérence.
- **Plan Mode** : Avant de coder, demander à Claude de "plan" (décomposer en étapes) — réduit les erreurs de 60%+
- **Context Window management** : Ne jamais laisser le contexte se remplir passivement. Compacter régulièrement avec `/compact`. Lire les fichiers avec offset/limit, pas en entier.
- **Self-Verify** : Claude vérifie son propre output avant de le rendre — demander explicitement "vérify this works"
- **Parallel tool calls** : Claude peut appeler plusieurs outils simultanément → gain de vitesse 3-5×
- **Avoid over-thinking** : Ne pas utiliser "think"/"ultra think" sans raison → tokens ×3-5 inutilement
- **Git commits fréquents** : Committer après chaque tâche réussie — permet de rollback proprement
- **Structured outputs** : Demander JSON/Markdown structuré → plus facile à traiter dans les pipelines

## 💡 Applications pour drinknellio.com / OMNIA / EVOLVE
- **Notre CLAUDE.md** : Vérifier qu'il contient bien le contexte Nellio (produit, marché DE, stack tech, conventions) → relire et enrichir
- **Plan Mode sur EVOLVE** : Avant chaque tâche complexe d'agent, demander le plan d'abord → valider → exécuter
- **Context window** : Implémenter `/compact` régulier dans nos sessions longues — économie de tokens
- **Self-Verify** : Intégrer dans le checklist de livraison de chaque agent EVOLVE — "vérify output matches criteria"

## ⚡ Citation / Insight Clé
> "CLAUDE.md is the difference between a tool and a partner. The more context you give upfront, the less you correct after."

## 🔗 Ressources
- Thread original : @Meer_AIIT sur X (1208 bk)
- Docs officielles : https://docs.anthropic.com/claude-code
- Boris Cherny (créateur) : @bcherny sur X
- Voir aussi : `heynavtoor-claude-cowork-3file-system.md` (système 3 fichiers complémentaire)
