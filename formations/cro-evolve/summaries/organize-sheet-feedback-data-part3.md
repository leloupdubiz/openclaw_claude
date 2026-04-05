# Organiser Données Feedback — Partie 3 Customisation

## Concept Central
Adapter la structure Google Sheet à des sondages customisés (champs supplémentaires, questions modifiées) requiert flexibilité dans l'approche : copier colonnes templates, ajouter réponses, mettre à jour les filtres.

## Points Clés
- **Pour sondages avec réponses supplémentaires** :
  - Si client a ajouté "Pinterest" à "Comment avez-vous découvert ?" → ajouter nouvelle ligne dans filtre
  - Copier formule colonne adjacente (ex: `=COUNTIF(G:G,"Pinterest")`)
  - Double-click pour auto-fill jusqu'en bas
  - Vérifier orthographe EXACTE (case-sensitive possible selon setup)

- **Pour colonnes multiple-choice additionnelles** :
  - Dupliquer 2 colonnes template (question + options)
  - Coller à côté de la structure existante
  - Mettre à jour texte question
  - Ajouter nouvelles réponses dropdown

- **Pour questions écrites (bonus entries)** :
  - Format : "For two bonus entries, [question]"
  - Réponses = texto libre, nécessiteront résumés IA plus tard
  - Ne pas filtrer comme multiple-choice
  - Laisser colonnes blanches pour résumés ChatGPT

- **Gestion de l'ordre questions** :
  - Si questions réordonnées vs formulaire original, drag-drop colonnes dans clean sheet
  - Important car aval (résumés IA, exports) suppose ordre logique

- **Template customisé exemple Warroad** :
  - Questions multiples-choice très différentes
  - Mix de "how did you hear", "age group", "product category", "flying products interest"
  - Chaque client = structure unique

## Insights
- Pas de one-size-fits-all : chaque sondage client = adaptation manuelle
- Le travail ici (30-45 min) économise heures aval (résumés IA plus nets)
- Formule copier-coller est itérative : pas d'erreur fatale, corrections rapides

## Applications drinknellio.com
**Sondage Nellio custom potentiel** :
1. Champs standard : source découverte, catégorie intérêt, prix perçu
2. Champs custom possibles : âge group, utilisation (sommeil vs stress vs énergie), fréquence achat
3. Questions écrites : "Amélioration souhaitée ?", "Recommanderiez-vous ?", "Témoignage client"

**Processus exact** :
- Créer sheet clean → dupliquer colonnes template → adapter structure
- Vérifier que formules comptent les bonnes réponses
- Tester en cherchant une valeur manuelle pour voir si elle apparaît

## Citation
> "Chaque sondage est unique. Pas de panic. Copier-coller les colonnes template, adapter les réponses, vérifier les formules. Itération rapide > perfection."

---

**Priorisation EVOLVE** : Phase 2 — Opérationnel  
**Complexité** : Moyenne (dépend du niveau de customisation client)
