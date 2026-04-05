# Vidéo 19 — DO NOT Use a VPS for OpenClaw (Major Warning)
> ID: ev4iiGXlnh0 | Mots: 3705 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
Mise en garde forte et argumentée contre l'utilisation d'un VPS pour OpenClaw — et démonstration que le local est supérieur sur tous les axes.

## 📌 Points Clés

### Pourquoi VPS = Mauvaise Idée
- **Sécurité** : Un VPS expose OpenClaw à internet → prompt injection possible via n'importe quelle source externe
- **Complexité** : Sécuriser un VPS correctement prend des dizaines d'heures (firewall, SSH hardening, Docker, etc.)
- **Puissance réduite** : Pas d'accès à tes apps locales (calendar, messages, fichiers), browser limité, pas de models locaux
- **Coût** : VPS $20-50/mois + API tokens → plus cher que hardware local à long terme
- **Latence** : Round-trip réseau pour chaque action → workflows 2x plus lents

### Pourquoi Local = Supérieur
- **Sécurité par défaut** : Derrière ton firewall home, pas exposé à internet
- **Intégration native** : Accès direct à iMessage, Calendar, fichiers locaux, apps installées
- **Modèles locaux** : Ollama tourne en local → tokens gratuits
- **Debug facile** : Voir ce que fait le bot en temps réel sur ton écran
- **Performance** : Inférence locale rapide, pas de latence réseau

### Exception Valide pour VPS
- Si tu n'as absolument aucun appareil disponible 24/7 → VPS comme solution temporaire
- Dans ce cas : lire le guide de sécurité VPS (lien dans vidéo #11) avant de démarrer

## 💡 Insights Actionnables
1. Si actuellement sur VPS : migrer vers local dès que possible
2. Hardware minimal suffisant : tout laptop ou Mac Mini récent
3. Test immédiat : lancer OpenClaw sur le laptop → mesurer la différence de réactivité

## 🏪 Applications pour drinknellio.com
- OpenClaw tourne déjà en local sur Mac → architecture correcte ✅
- Éviter de déplacer vers VPS même si la machine doit voyager → utiliser le tunnel ngrok pour accès distant si besoin

## ⚡ Citation Clé
> *"Le VPS c'est le conseil des gens qui n'ont pas vraiment utilisé OpenClaw. Ceux qui l'utilisent vraiment tournent tous en local."*

## 🔗 Lien avec autres vidéos
- Argument local détaillé dans vidéo #15 et #23
- Sécurité VPS si incontournable dans vidéo #11
