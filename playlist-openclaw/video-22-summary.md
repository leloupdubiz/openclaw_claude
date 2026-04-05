# Vidéo 22 — How to Run ClawdBot for DIRT CHEAP
> ID: lxfakTpdz1Y | Mots: 2558 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
Guide complet pour minimiser le coût d'utilisation de ClawdBot — de $200/mois à moins de $10/mois avec les bonnes configurations.

## 📌 Points Clés

### Stack "Dirt Cheap" (< $10/mois)
- **Model principal** : GLM-4 Flash (gratuit) ou MiniMax (< $5/mois)
- **Coding muscle** : Codex via abonnement ChatGPT existant (pas de surcoût)
- **Web search** : Brave API (gratuit jusqu'à 2000 req/mois)
- **Local** : Ollama + Llama 3.2 pour le traitement en volume

### Les Pièges à Éviter
- **Le mot "think"** : Déclenche extended thinking → tokens x3-5 → coût explosif
- **Heartbeat trop fréquent** : Toutes les 5 min avec Opus = ruineux. Utiliser GLM Flash pour les heartbeats
- **Subagents mal scopés** : Un subagent par tâche atomique — pas de mega-tâches à un seul agent
- **Context window full** : Compacter régulièrement → éviter de re-processer tout le contexte

### Stratégie de Réduction des Coûts
1. Modèle par tâche : GLM pour monitoring, Codex pour coding, Opus uniquement pour décisions critiques
2. Activer auto-compaction → réduire la taille du contexte actif
3. Cron jobs hebdo plutôt que quotidiens pour les tâches non-urgentes
4. Cache des résultats : ne pas re-appeler l'API si la réponse est stable

## 💡 Insights Actionnables
1. Auditer les dépenses API des 7 derniers jours → identifier le poste le plus coûteux
2. Remplacer les heartbeats Opus par GLM Flash → économie immédiate
3. Éviter "think" et "ultra think" dans les prompts sauf si vraiment nécessaire

## 🏪 Applications pour drinknellio.com
- Heartbeat surveillance playlist → utiliser GLM Flash (gratuit, suffisant pour compter les vidéos)
- Monitoring Meta Ads quotidien → Codex (cheap) sauf pour les décisions de budget
- Scripts Nellio Studio → évaluer si Sonnet vs Opus justifie le surcoût sur la qualité des scripts allemands

## ⚡ Citation Clé
> *"Avec la bonne architecture, $10/mois peut te donner ce que d'autres paient $300/mois pour avoir."*

## 🔗 Lien avec autres vidéos
- Architecture brains/muscles complète vidéo #15
- GLM Flash setup vidéo #03
