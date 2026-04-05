# How To Organize Sheet With Feedback Data - Part 3

## Concept Central
Customiser un sheet de feedback pour un client avec des questions non-standard : aligner les réponses custom + gérer les colonnes vides.

## Points Clés
- Certains clients demandent des questions spécifiques (ex: "Quelle catégorie Warroad t'intéresse le plus ?" vs. template standard)
- Si une réponse ne figura pas dans la dropdown originale, la formule COUNTIF ne la compte pas — tu dois ajouter la catégorie manuellement
- Process : trouver la réponse (chercher dans le survey original), copier EXACTEMENT son spelling, ajouter comme nouvelle option
- Forcer la formule COUNTIF à commencer du bon index (ex: G12:G200 vs. G16:G200) — sinon tu comptes les mauvaises lignes
- Le même processus s'applique pour réorganiser les questions dans un ordre différent du survey — drag et drop les colonnes, puis valide les formules

## Insights
Les "edge cases" clients rendent le travail de sheet organisation 3x plus complexe que prévu. Un client avec 50 questions custom vs. notre template à 11 questions = 40 heures de matching + validation au lieu de 4.

L'erreur coûteuse : accepter un survey custom sans documenter la mapping des réponses AVANT de l'uploader au sheet. 

## Applications drinknellio.com
**Pour Nellio UltraCalm :**
- Si on lance une survey giveaway custom (cas probable) :
  - Questions template Nellio : stress source | usage frequency | prix acceptable | brands concurrents testés
  - Questions custom possibles : symptômes d'anxiété | horaire de prise optimal | allergies/ingredients
- Dès que les réponses arrivent, IMMÉDIATEMENT :
  1. Créer colonne "options" avec toutes les réponses uniques
  2. Valider que la formule COUNTIF pointe vers la bonne range
  3. Tester 1 COUNTIF avant de l'appliquer sur 20 colonnes
- Document : « Warroad_FeedbackMapping.md » qui trace question ↔ réponses possibles

## Citation Mémorable
« Un client veut des questions spécifiques, tu dis ok, tu lui dis après que tu as besoin de 20 heures de setup. Pas oublie la mapping d'abord. »
