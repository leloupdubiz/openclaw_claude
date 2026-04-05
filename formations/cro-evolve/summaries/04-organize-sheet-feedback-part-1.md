# How To Organize Sheet With Feedback Data — Part 1

## Concept Central
Structurer les données de questionnaire client dans Google Sheets de façon que les filtres automatiques et les résumés IA fonctionnent. Chaque colonne répond = une structure standardisée (réponses multiples = colonnes, réponses écrites = rows).

## Points Clés
- **Email des testeurs internes** : à supprimer pour éviter data pollutée
- **Text wrapping** : activer pour lire les questions posées en entête
- **Colonne "Options"** : ajout obligatoire si réponses multiples (Instagram, TikTok, etc.)
- **Alignement questions/réponses** : vérifier ordre des questions dans sheet = ordre du formulaire VialSweep
- **Cas personnalisé** : si client custom réponses (Pinterest ajouté, etc.) → ajouter manuellement colonne + formule COUNTIF
- **Formule COUNTIF** : `=COUNTIF(G:G,"Instagram")` compte occurrences réponse
- **Ordre vertical des catégories** : doit matcher VialSweep original

## Insights
Les clients perso = risque d'erreur alignement. Toujours vérifier VialSweep en mode edit pour voir les vraies réponses proposées. Le travail de nettoyage (10-15 min) économise des heures d'itération ChatGPT.

## Applications Drinknellio.com
- Questions standard Nellio giveaway à aligner : How did you discover Nellio? (Instagram/TikTok/Google/word-of-mouth), What problem does Nellio solve? (stress/sleep/focus/energy), Store feedback, Product improvement
- Ajouter custom questions si needed (Age group, Product format preference, Willingness to repurchase)
- Lire VialSweep en mode edit pour confirmer les réponses existantes
- Vérifier colonne "Options" aligne chaque réponse multiple
- Ne pas modifier les questions standards (stress client confusion)

## Citation
> "The reason why we need to do that is because the way that this filtering system works is it will look all the way down through this column here and see for any answers that have the answer as Instagram."

---

**Statut** : ✅ Résumé généré  
**Transcript source** : 24. How To Organize Sheet With Feedback Data - Part 1.txt
