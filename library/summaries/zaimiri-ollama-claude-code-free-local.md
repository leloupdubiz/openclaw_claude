# Ollama + Claude Code Gratuit — $200/mo → $0
> @zaimiri | 5383 bk · 242K vues | Ollama · Claude Code · ANTHROPIC_BASE_URL · Qwen 2.5 · DeepSeek

## 🎯 Concept Central
Utiliser Ollama pour faire tourner Claude Code (et autres outils Anthropic) sur des modèles locaux entièrement gratuits. En pointant `ANTHROPIC_BASE_URL` vers localhost, tous les outils qui utilisent l'API Anthropic fonctionnent avec Qwen 2.5 Coder, DeepSeek, ou tout autre modèle local — sans payer un centime.

## 📌 Points Clés
- **Variable clé** : `export ANTHROPIC_BASE_URL=http://localhost:11434/v1` (Ollama tourne sur le port 11434)
- **Modèles recommandés** :
  - `qwen2.5-coder:7b` — coding tasks (meilleur rapport qualité/vitesse)
  - `deepseek-r1:7b` — raisonnement
  - `mistral:7b` — tâches générales
- Commande Ollama : `ollama pull qwen2.5-coder && ollama serve`
- Économie : $200/mois d'API → $0 (+ coût électrique Mac Mini ~$5/mois)
- Limitations : contexte plus court, moins bon sur tâches très complexes → réserver Claude cloud pour ces cas
- Compatible avec n'importe quel SDK Anthropic, Claude Code CLI, LangChain, etc.

## 💡 Applications pour drinknellio.com / OMNIA / EVOLVE
- **Nellio Studio dev** : Tâches répétitives (refactoring, formatage, CRUD) tournent local → économie API significative
- **EVOLVE agents** simples (parsing, extraction, formatting) : 100% local, 0 coût
- **Budget allocation** : Définir une règle claire — local pour <80% des tâches, Sonnet pour créatifs, Opus pour stratégie
- **OMNIA SaaS** : Offrir une tier "self-hosted" avec Ollama backend — différenciateur fort vs concurrents cloud-only

## ⚡ Citation / Insight Clé
> "Stop paying $200/month for AI APIs. One `export` command and Claude Code runs free on your machine forever."

## 🔗 Ressources
- Ollama : https://ollama.ai
- Thread original : @zaimiri sur X (5383 bk, 242K vues) 🔥
- Setup : `ollama pull qwen2.5-coder:7b && export ANTHROPIC_BASE_URL=http://localhost:11434/v1`
- Modèles disponibles : https://ollama.com/library
