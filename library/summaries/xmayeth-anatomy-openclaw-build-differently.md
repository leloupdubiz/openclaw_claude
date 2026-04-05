# Anatomy of OpenClaw — Build Differently
> @xmayeth | 1726 bk · 626K vues | 6 composants · 2 mémoires · 5 erreurs · tokens÷3

## 🎯 Concept Central
Dissection complète de l'architecture interne d'un agent OpenClaw performant. La majorité des builders font 5 erreurs critiques qui consomment des tokens inutilement et dégradent les résultats. Comprendre les 6 composants et 2 types de mémoire permet de construire des agents 3× moins coûteux et 3× plus fiables.

## 📌 Points Clés
- **6 Composants essentiels** : Perception (inputs) · Mémoire (court/long terme) · Raisonnement (LLM) · Planification (task decomposition) · Action (tool calls) · Réflexion (self-evaluation)
- **2 Mémoires** :
  - *Court terme* : contexte de la conversation en cours (context window) — volatile
  - *Long terme* : vector store / fichiers persistants — durable entre sessions
- **5 Erreurs courantes** :
  1. Tout mettre dans le system prompt (context overflow)
  2. Pas de mémoire long terme → l'agent recommence de zéro à chaque session
  3. Tool calls non parallélisés → 3× plus lent
  4. Pas de self-verification → hallucinations non détectées
  5. Pas de fallback en cas d'erreur tool → agent bloqué
- **tokens÷3** : Optimiser ses prompts (compression, références fichiers) divise la consommation par 3

## 💡 Applications pour drinknellio.com / OMNIA / EVOLVE
- **EVOLVE agents** : Implémenter les 6 composants pour chaque agent — notamment la réflexion (self-check avant livraison)
- **OpenClaw config** : Corriger nos 5 erreurs — notamment paralléliser les tool calls et externaliser la mémoire long terme
- **Nellio Studio** : Ajouter une mémoire long terme (JSON local) pour mémoriser les hooks testés et leurs performances
- **Coûts API** : Appliquer tokens÷3 → économiser $60-100/mois sur les appels Claude

## ⚡ Citation / Insight Clé
> "Ton agent n'est pas lent parce que le LLM est lent. Il est lent parce que tu fais des tool calls en série au lieu d'en parallèle."

## 🔗 Ressources
- Thread original : @xmayeth sur X (1726 bk, 626K vues)
- Concepts avancés : voir aussi `shelpidwi3m-openclaw-vps-secure-setup-14-steps.md`
