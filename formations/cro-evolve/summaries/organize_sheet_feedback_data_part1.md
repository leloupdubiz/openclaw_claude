> 📝 [Transcript formaté](http://localhost:4242/view?path=formations/cro-evolve/transcripts/26.%20How%20To%20Organize%20Sheet%20With%20Feedback%20Data%20-%20Part%203_formatted.md)

# Résumé : Organiser Sheet Feedback Data — Partie 1 (How To Organize Sheet With Feedback Data - Part 1)

## Concept Central
L'organisation verticale et horizontale des données de feedback doit parfaitement correspondre au template "Raw Feedback Data" pour que les filtres automatisés et l'IA fonctionnent. Une colonne mal alignée = mauvais comptage + summaries cassées.

## Points Clés
- **Suppression des données internes** : commencer par effacer les emails de l'équipe/client (sinon corruption sentiment analysis)
- **Text wrapping obligatoire** : activer pour voir les questions complètes (sinon risque d'erreur d'alignement)
- **Alignement horizontal** :
  - Ajouter colonne "Options" si manquante (pour questions multiple-choice)
  - S'assurer que chaque réponse possibile dans le survey = une row dans le template
  - Exemple : "Comment avez-vous entendu parler ?" → [Facebook | Instagram | TikTok | Google | Word of mouth | YouTube | Autre]

- **Alignement vertical** :
  - L'ordre des questions dans le clean file = l'ordre dans Raw Feedback Data template
  - Si questions réordonnées = déplacer colonnes (drag & drop)
  - Si question manquante = ajouter nouvelle colonne

- **Correction d'erreurs** : retourner à VialSweep edit pour vérifier réponses officielles si doute

## Insights
- Les filtres automatisés du template cherchent verticalement : toute mauvaise spelling = comptage zéro
- Copier/coller sloppy = 80% du travail analytique qui explose
- Certains clients ont surveys hyper-customisés → adapter le template une fois, puis réutiliser

## Applications Drinknellio.com
1. **Survey Nellio UltraCalm giveaway** → align avec template standard :
   - Questions core : Comment entendu parler | Catégorie produit | Bénéfice perçu | Raison d'achat | Feedback libre
   - Répondre possible à chaque question = alignment garantit

2. **Éviter les pièges** :
   - Pas de double-spaces ou typos dans les réponses (=zéro match dans filtres)
   - Si on ajoute "Pinterest" = ajouter aussi dans options officiel du template

## Citation
_"Vous pouvez simplement copier cela et la coller, et tout devrait bien fonctionner. Mais si quelque chose est cassé, juste contactez et on va dupliquer une sheet."_
