# How To Organize Sheet With Feedback Data — Part 3

## Concept Central
**Customisation du template de feedback pour des surveys non-standards** = l'art de garder une infrastructure scalable tout en s'adaptant aux besoins spécifiques du client. Comment organiser des questions uniques sans casser le system.

## Points Clés
- Les surveys clients custom (vs template standard) nécessitent ajustements colonne par colonne
- **Processus pour chaque colonne custom** :
  - Identifie si c'est une question avec réponses multiples (checkbox) ou texte libre (bonus entries)
  - Ajoute les bonnes colonnes au sheet (ou duplique un template existant)
  - Copie les réponses exactes dans le template (case-sensitive)
  - Mets à jour les formules de comptage si nécessaire
- **Deux types de questions à gérer différemment** :
  - Questions multiples-réponses : ajoute colonnes de réponses + formules COUNTIF
  - Questions texte libre : ajoute colonne pour la réponse brute → préparé pour AI summary après
- **Exemple de custom survey** :
  - Q1 : Quelle catégorie Warroad te plaît le plus ? (Travel Bag, Blade Tech, etc.)
  - Q2 : Lequel de ces produits veux-tu voir next ? (texte libre ou multiples ?)
  - Besoin de cartographier les réponses → normaliser → mettre dans la bonne colonne
- **Attention aux pertes de données** : si tu renommes une question, assure-toi que les anciennes réponses mappent à la nouvelle question

## Insights
- Les surveys custom = **flexibilité** mais aussi **30% plus de travail** de setup
- La majorité des erreurs downstream (analyses cassées) = mauvais setup à cette étape
- Un template bien construit peut absorber 5-10 variations sans casser
- Les checklists (multiples-choix) sont plus faciles à analyser que le texte libre → bias vers les multiples-choix si possible

## Applications drinknellio.com
- **Si Nellio a des questions custom** (ex: symptômes spécifiques, durée d'utilisation avant achat) :
  - Mets les multiples-réponses en colonnes separées avec formules COUNTIF
  - Les questions texte libre → préparées pour export vers ChatGPT Custom GPT
  - Crée un mapping doc : "Question → réponses attendues"
- **Checklist pour Nellio custom survey** :
  - [ ] Questions multiples-réponses mappées à colonnes avec formules
  - [ ] Questions texte libre prêtes pour AI summary
  - [ ] Zéro question débordante ou non-alignée
  - [ ] 0 formules cassées
  - [ ] Mock-test : 10 entrées fictives → toutes les formules comptent correctement

## Citation
> « These are the core ones that every client will be asked, but some clients may ask us to add more answers that are more specific to their brand. Now, the final thing that I need to note is that there may be times where we also change the question. »
