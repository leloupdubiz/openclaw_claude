# Vidéo 28 — You're Prompting Claude Code Wrong. Here's How to Do It Correctly
> ID: 7WuKgc3-_-s | Mots: 3008 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
10 tips officiels d'Anthropic (extraits du guide de prompting Claude Code) — chacun avec un impact mesurable sur la qualité, la vitesse, et la réduction des hallucinations.

## 📌 Points Clés — Les 10 Tips

### 1. Expliquer ses Motivations
- Ne pas juste dire QUOI builder → dire POURQUOI
- *"Build a calendar. The idea is that all notes, tasks, and everything we add can be stored on this calendar."*
- Claude fait proactivement des décisions cohérentes avec la motivation

### 2. Ne Plus s'Inquiéter du Context Window
- Auto-compaction intelligente activée → une session peut durer des jours sans /clear
- Vrai test : app fantasy football buildée en 3 jours, 12h, sans clear une seule fois

### 3. Charger le Contexte au Début de Chaque Session
- Prompt de démarrage : *"Take a look at the app and architecture. Understand deeply how it works inside and out. Ask me any questions. This will be the basis for our conversation."*
- Copier-coller ce prompt au début de chaque nouvelle session → base toujours solide

### 4. Utiliser GitHub Massivement
- Claude a accès automatique à tous les commits → se souvient des sessions passées
- Setup : créer un repo GitHub → *"Commit code to this repository after each change"*

### 5. Règle "Summary After Tool Use" (débutants)
- Ajouter dans `claude.md` : *"After completing a task involving tool use, provide a quick summary"*
- Force Claude à expliquer ce qu'il fait → apprendre en observant

### 6. Régler l'Eagerness
- Claude trop eager (fait trop) → `claude.md` : *"Do not act before instructions"*
- Claude trop passif → `claude.md` : *"Default to action. Implement ideas without asking for approval first."*

### 7. Le Mot "Think" = Tokens x3
- "Think", "think harder", "ultra think" → extended thinking activé → coût x3-5
- Alternative : "consider", "evaluate" → même effet sans déclencher extended thinking

### 8. Vision = Arme Secrète
- Claude Opus 4.5/4.6 = meilleur modèle vision au monde pour les images multiples
- Coller des screenshots → UI inspiration, bug diagnosis, design reference
- Plusieurs images à la fois → Claude synthétise toutes les inspirations

### 9. Parallel Tool Calls Rule
- Dans `claude.md` : *"Use parallel tool calls maximum. Spin up sub-agents for concurrent tasks."*
- Claude fait plusieurs choses à la fois → gains de temps massifs

### 10. Investigate Before Answering Rule
- Dans `claude.md` : *"Investigate existing code thoroughly before making any changes"*
- Réduit les hallucinations et les régressions de 50%+

## 💡 Insights Actionnables (Top 3 à faire maintenant)
1. **`claude.md` setup** : Ajouter tips #5, #9, #10 immédiatement → amélioration permanente
2. **Prompt de démarrage** : Bookmarker le tip #3 → l'utiliser à chaque nouvelle session Claude Code
3. **GitHub setup** : Si pas encore fait → créer repo dédié pour chaque projet → mémoire persistante

## 🏪 Applications pour drinknellio.com
- `claude.md` de Nellio Studio : ajouter les règles #5, #9, #10 maintenant
- Tip #1 : Toujours expliquer le contexte business quand on ajoute une feature à Nellio Studio
- Tip #8 : Screenshots des ads concurrents → Claude extrait les patterns visuels et copy

## ⚡ Citations Clés
> *"Le mot 'think' est le seul keyword qui change vraiment comment Claude Code fonctionne. Utilise-le à bon escient."*
> *"Ces 10 règles viennent directement d'Anthropic. Je ne les ai pas inventées. Mets-les dans ton claude.md ce soir."*

## 🔗 Lien avec autres vidéos
- Workflow Ghostty terminal vidéo #26
- Build in Public avec Claude Code vidéo #25
- Claude Code débutant vidéo #27 (Cowork)
