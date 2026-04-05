# How To Organize Sheet With Feedback Data — Part 1

## CONCEPT CENTRAL
Aligner les colonnes du fichier clean avec la structure du template feedback dans le système de rapport (questions + réponses multiples choix + colonnes options) pour que le système de filtrage automatique fonctionne.

## POINTS CLÉS
- Supprimer les entrées test (emails clients/team) en haut du sheet
- Activer text wrapping pour voir les questions complet dans les colonnes
- Ajouter colonne "options" pour aligner horizontalement avec le template feedback de destination
- Vérifier que chaque question du sheet clean correspond exactement aux réponses du template (ex: Instagram, TikTok, etc.)
- Si une réponse manque (ex: Pinterest ajouté après), ajouter la ligne dans le template et utiliser COUNTIF pour la tracker

## INSIGHTS
Le système fonctionne avec COUNTIF (count-by-filter) : si tu dis "options = Instagram", ça compte tous les Instagram du sheet. Si l'ordre des questions ou réponses décale, tout casse. C'est donc un travail de precision mais hyper répétable une fois maîtrisé.

## APPLICATIONS POUR DRINKNELLIO.COM
Après une giveaway Nellio, utiliser ce process pour : nettoyer feedback allemand, aligner questions (Où t'as entendu parler? Comment t'utilises? Objection principale?), et créer un dashboard filtrable montrant les sources top, objections top, use cases. Donne data pour cibler les angles.

## CITATION CLÉ
"The reason why we need to do that is because the way that this filtering system works is it will look all the way down through this column here and see for any answers that have the answer as Instagram... It will then count that as an entry."
