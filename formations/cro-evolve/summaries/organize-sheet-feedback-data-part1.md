# Organiser Données Feedback — Partie 1 Structure

## Concept Central
Préparer les données brutes du sondage pour analyse IA requiert un alignement parfait : colonnes questions = colonnes sheet, réponses codées = réponses formulaire. Toute divergence brise les filtres et résumés aval.

## Points Clés
- **Suppression des entrées invalides** :
  - Lire les 2-3 premières (souvent test ou emails client)
  - Supprimer (les données brutes restent dans raw sheet)

- **Text wrapping** :
  - Sélectionner colonnes questions → Toggle text wrapping
  - Voir les questions entières (esthétique + vérification)

- **Alignement colonnes horizontal** :
  - Vérifier que ordre colonnes = ordre formulaire original
  - Ajouter colonnes "options" si manquantes (ex: si sondage a "options" que sheet n'a pas)
  - Peut nécessiter drag-drop pour réordonner

- **Filtrage par réponse multiple** :
  - Formule compte automatiquement toutes occurrences d'une réponse dans une colonne
  - Ex: "Instagram" → le filtre comptera tous les "Instagram" → apparaît dans résumé catégorie

- **Discordances à corriger** :
  - Question manquante vs sondage : ajouter colonne
  - Réponse manquante vs sondage : ajouter valeur + vérifier orthographe exacte (case-sensitive possible)
  - Question répondée différemment : remplacer texte pour correspondre formulaire original

## Insights
- Chaque divergence entre sheet et formulaire = risque d'erreur aval
- Pas d'automatisation possible ; vérification humaine obligatoire question-par-question
- L'ordre des colonnes impacte directement le résumé visuel

## Applications drinknellio.com
**Sondage Nellio customer feedback** :
1. Champ 1 : "Comment avez-vous découvert Nellio ?" → réponses: Facebook, Instagram, TikTok, Google, Word of Mouth, Autre
2. Champ 2 : "Quel bénéfice principal ?" → réponses: Calme, Sommeil, Énergie
3. Champ 3 : "Prix perçu ?" → réponses: Bon marché, Normal, Premium
4. Colonnes questions écrites (bonus entries) → "Améliorations", "Témoignage"

**Processus exact** : Vérifier que chaque colonne dans clean sheet match exactement ce qu'on avait dans formulaire VialSweep

## Citation
> "Les données sont au formateur de sondage ce que l'ADN est au biologiste. Une déformation mineure = mutations graves aval."

---

**Priorisation EVOLVE** : Phase 2 — Opérationnel  
**Effort estimé** : 30-45 min par sondage (100-200 entrants)
