# How To Organize Sheet With Feedback Data - Part 1

## Concept Central
**Google Sheet = centre de commande de la recherche**. Organiser les colonnes/réponses pour qu'elles **matchent exactement** la structure pour la summarization IA.

## Points Clés
- **Supprimer emails internes** (clients, team) = contamination data
- **Toggle text wrapping** = voir les questions qu'on a posées
- **Aligner colonnes** : options possibles d'une question = colonnes filtrables dans le sheet
- **Vérifier l'ordre des questions** : VialSweep peut les réarranger vs. le template
- **Columns optionnelles = ajouter manuellement** si on a changé le survey
- **Raw + Clean files** = sécurité (rollback rapide si erreur)

## Insights CRO
Une seule mauvaise colonne = réponses comptées zéro ou mauvaise catégorie = données cassées pour GPT.
L'ordre de colonnes = fondamental pour les filtres de décompte automatiques.

## Applications drinknellio.com
1. **Créer raw file** = sauvegarde brute VialSweep (jamais toucher)
2. **Clean file** = travail actuel
   - Supprimer : adresses IP, locations, tout avant prenoms
   - Ajouter colonne "options" si réponses multiples
3. **Questions clés Nellio** :
   - "Comment as-tu entendu parler ?" → options: Facebook, Instagram, TikTok, Google, Influenceur, Autres
   - "Quel âge ?" → options: 18-25, 25-35, 35-45, 45-55, 55+
   - "Problème principal ?" → options: Stress, Sommeil, Focus, Énergie, Autre

## Citation
> "The reason why I'm just deleting these three [client emails] is because again, it's just going to basically mess up the data for this specific survey when we leverage AI."
