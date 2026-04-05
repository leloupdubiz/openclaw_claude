# How To Organize Sheet With Feedback Data — Part 1

## Concept Central
**Alignement parfait données ↔ template** : chaque réponse client doit correspondre à sa question dans le bon ordre, avec les bonnes catégories. L'IA synthétise en cascade vertical (questions) et horizontal (réponses groupées).

## Points Clés
- **Suppression top lignes** : emails client + test entries → à supprimer (bruite les pattern)
- **Text wrapping** : activer pour voir les questions longues complètement
- **Structure colonne** : email → prénom → nom → options (flexible) → réponses thématiques
- **Colonnes custom** : si client a ajouté une option (ex: Pinterest), ajouter catégorie correspondante dans le template
- **Ordre question** : doit correspondre exact aux colonnes dans raw feedback data section
- **Exemple filtre** : colonne "comment avez-vous entendu" cherche Instagram → compte automatiquement tous les Instagram
- **Doublon colonne** : si question manque en ordre, ajouter colonne vide plutôt que décaler tout

## Insights
Google Sheets filtre + compte par colonne = synthèse manuelle possible avant IA. Alignement parfait = résultats fiables, pas besoin de post-nettoyage.

## Applications drinknellio.com
- **Clean sheet Nellio** : aligner sur template "Raw Feedback Data"
- **Questions core** : (définies par EVOLVE)
  - Comment avez-vous découvert Nellio ?
  - Quel est le principal bénéfice perçu ?
  - Amélioration produit souhaitée ?
  - Autre feedback libre
- **Colonne "options"** : regrouper les réponses fermées (source, catégorie, etc)
- **Vérification** : comparer VialSweep survey settings avant de copier/coller

## Citation
> "The reason why we want to do that is because the way that this filtering system works is it will look all the way down through this column and see for any answers..."

---
