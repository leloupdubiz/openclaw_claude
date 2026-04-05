# Vidéo 03 — FREE OpenClaw: GLM 4.7 Flash + Ollama
> ID: UoTn-O9WPoc | Mots: 2935 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
Setup complet d'OpenClaw **entièrement gratuit** en combinant GLM 4.7 Flash (cloud, gratuit) et Ollama (modèles locaux). Zéro coût mensuel possible.

## 📌 Points Clés
- **GLM 4.7 Flash** : Modèle cloud de Zhipu AI — gratuit, capable, idéal pour un premier setup sans carte bleue
- **Ollama** : Runner de modèles locaux (Llama, Mistral, Gemma) — fonctionne entièrement en local, 0$/token
- **Architecture hybride** : GLM pour les tâches cloud, Ollama pour les tâches sensibles ou gourmandes en tokens
- **Compatibilité** : Fonctionne sur Mac, Windows, Linux — même Raspberry Pi pour Ollama
- **Limite GLM gratuit** : Rate limits plus serrés qu'Anthropic — ne pas l'utiliser pour des workflows haute fréquence

## 💡 Insights Actionnables
1. **Démarrer avec GLM 4.7 Flash** : Créer un compte Zhipu AI → copier la clé API → configurer dans OpenClaw
2. **Installer Ollama** : `brew install ollama` (Mac) → `ollama pull llama3.2` → pointer OpenClaw vers `http://localhost:11434`
3. **Architecture recommandée** : Opus pour les décisions stratégiques, Ollama (local) pour le traitement de données en volume

## 🏪 Applications pour drinknellio.com
- Tests de scripts publicitaires en volume sans coût API (Ollama)
- Surveillance quotidienne de la playlist/HEARTBEAT avec GLM Flash (économique)
- Génération de variantes de hooks en batch avec modèles locaux

## ⚡ Citation Clé
> "Vous pouvez avoir un OpenClaw entièrement fonctionnel sans dépenser un seul centime. GLM Flash + Ollama = setup gratuit et puissant."

## 🔗 Lien avec autres vidéos
- Suite logique de la vidéo #02 (Free update)
- Architecture brains/muscles détaillée en vidéo #15
