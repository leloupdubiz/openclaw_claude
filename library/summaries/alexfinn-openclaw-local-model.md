# OpenClaw Illimité — Modèle Local Mac Mini
> @AlexFinn | 26 Feb 2026 | Local LLM · Qwen 3.5 · LM Studio · Coût $0

## 🎯 Concept Central
Faire tourner OpenClaw sur un modèle local via LM Studio sur Mac Mini — zéro coût API, zéro dépendance cloud. Qwen 3.5 offre un rapport qualité/vitesse suffisant pour la majorité des tâches d'orchestration, avec une confidentialité totale des données.

## 📌 Points Clés
- **LM Studio** = interface locale pour charger et servir des LLMs (Qwen, Mistral, DeepSeek, etc.)
- **Qwen 3.5** recommandé pour le rapport performance/VRAM sur Apple Silicon
- Configuration : `ANTHROPIC_BASE_URL=http://localhost:1234/v1` dans les variables d'environnement
- Mac Mini M2/M4 = serveur LLM silencieux, toujours allumé, coût électrique < $10/mois
- Latence légèrement supérieure au cloud mais acceptable pour les agents non-temps-réel
- Possibilité de switcher dynamiquement entre local (tâches simples) et cloud (tâches complexes)
- Données sensibles (produits, clients, campagnes) restent en local — RGPD compliant

## 💡 Applications pour drinknellio.com / OMNIA / EVOLVE
- **EVOLVE agents** non critiques (logging, formatage, triage) tournent en local → économie sur tokens Claude
- **Nellio Studio** : batch generation de variations de hooks via modèle local → $0 au lieu de $50-100/mois en API
- **OMNIA SaaS** : offrir une option "self-hosted" aux clients sensibles à la confidentialité (avantage compétitif)
- **Budget optimization** : réserver Claude Opus/Sonnet pour les tâches à haute valeur (strategy, copywriting final)

## ⚡ Citation / Insight Clé
> "Un Mac Mini M2 à 600€ peut remplacer $200/mois d'API. ROI en 3 mois, illimité après."

## 🔗 Ressources
- LM Studio : https://lmstudio.ai
- Qwen 3.5 : https://huggingface.co/Qwen
- Thread original : @AlexFinn sur X (26 Feb 2026)
- Guide config local : `ANTHROPIC_BASE_URL=http://localhost:1234/v1`
