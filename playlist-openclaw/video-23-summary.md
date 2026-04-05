# Vidéo 23 — You NEED a Mac Mini for ClawdBot
> ID: tqhmgHfT7v4 | Mots: 3408 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
Pourquoi le Mac Mini $600 est le hardware optimal pour ClawdBot — démonstration en live des performances, et comparaison avec alternatives.

## 📌 Points Clés

### Mac Mini vs Alternatives
| Hardware | Prix | Tokens locaux | Apps natives | Verdict |
|----------|------|--------------|--------------|---------|
| Laptop perso | 0$ | Ollama (limité) | Oui | Démarrer ici |
| Raspberry Pi | $70-150 | Très limité | Non | Trop faible |
| VPS cloud | $20-50/mois | Aucun | Non | À éviter |
| Mac Mini M2 | $600 | Ollama bons modèles | Oui | ⭐ Optimal |
| Mac Studio M2 | $2000+ | Modèles 70B+ | Oui | Si budget |

### Pourquoi Mac Mini Spécifiquement
- **Neural Engine** : Apple Silicon tourne les modèles locaux 3-5x plus vite que x86 à puissance équivalente
- **Autonomie apps** : iMessage, Calendar, Reminders, Shortcuts — natifs macOS → intégration parfaite
- **Consommation** : 10-15W → peut tourner 24/7 pour ~$2/mois d'électricité
- **Silent** : Fonctionnement silencieux — peut rester allumé dans n'importe quelle pièce
- **Prix** : $600 = meilleur rapport qualité/prix en computing en 2025

### Setup Mac Mini Optimal
1. Installer OpenClaw en 1 commande
2. Configurer Ollama + Llama 3.2 pour les tâches locales
3. Activer SSH remote access pour gérer depuis n'importe où
4. Brancher 24/7 → ClawdBot tourne en permanence

### Modèles Ollama sur Mac Mini
- `llama3.2:3b` → réponses basiques, rapide, RAM minime
- `qwen2.5:7b` → bon multilingual (allemand !), tient en 8GB RAM
- `llama3.2:8b` → bon généraliste, 8GB RAM
- `mistral:7b` → bon coding + reasoning

## 💡 Insights Actionnables
1. Si budget : acheter Mac Mini M2 8GB RAM → installer OpenClaw + Ollama dès réception
2. Si pas de budget maintenant : lancer sur le laptop actuel, metrics pendant 1 mois, décider ensuite
3. Remote access : `ssh user@mac-mini-local-ip` depuis n'importe quel appareil sur le réseau

## 🏪 Applications pour drinknellio.com
- Mac Mini dédié = infrastructure stable pour l'orchestration EVOLVE en production
- `qwen2.5:7b` local = muscle gratuit pour les scripts allemands en volume
- 24/7 availability = surveillance Meta Ads nocturne sans hardware dédié cloud

## ⚡ Citation Clé
> *"$600. C'est le prix d'un dîner pour 4 à Paris. Pour ça, t'as une compagnie entière qui tourne 24/7 pour toi."*

## 🔗 Lien avec autres vidéos
- Mac Studio pour use cases avancés vidéo #16
- Local models setup vidéo #15 et #03
