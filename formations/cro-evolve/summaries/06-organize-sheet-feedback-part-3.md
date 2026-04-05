# How To Organize Sheet With Feedback Data — Part 3

## Concept Central
Adapter le template de feedback sheet à des questionnaires perso (custom questions, réponses non-standard). Chaque client = config unique ; le framework reste : multiple choice (colonnes) + open-ended (réponses écrites).

## Points Clés
- **Multiple choice** : garder structure horizontale (réponse 1, réponse 2, etc. = colonnes COUNTIF)
- **Open-ended / Written** : `"For 2 bonus entries, explain..."` → résumé ChatGPT ultérieurement
- **Bonus entries pattern** : incite réponses texte détaillées (clients motivés à écrire long)
- **Questions custom** : if VialSweep a ajouté réponse (ex: "Travel bag" nouveaux) → ajouter manuellement colonne + copier réponse exacte
- **COUNTIF formula** : démarre toujours du haut (ex: G12:G1000) pour compter toutes occurrences
- **Marques personnalisées** : ne pas forcer template std ; adapter colonne ordre/questions si client perso
- **Duplicate colonnes pattern** : si 2 questions multiples identiques format → copier paste colonnes pour gain temps

## Insights
Templates sont guides, pas iron laws. Clients custom = flexibilité requise. Le gain : une fois structure correcte = ChatGPT résume auto (pas manuel). Trade-off : 20 min setup manuel = 2h économisées en résumé ultérieurement.

## Applications Drinknellio.com
- Nellio giveaway questions custom estimées :
  - How did you discover Nellio? (multiple choice)
  - Which Nellio format? (Poudre, liquid, capsule?) (multiple choice)
  - What problem does Nellio solve for you? (multiple choice)
  - Age group? (18-25, 25-35, etc.) (multiple choice)
  - For 2 bonus: Describe your stress/sleep issue before Nellio (open-ended)
  - For 2 bonus: How has Nellio improved your life? (open-ended)
  - For 2 bonus: Which ads got you interested? (open-ended)
- Copier colonne "options" si 2+ questions multiples format identique
- Ne pas réinventer ; adapter template existant (réduit error rate)

## Citation
> "This is a pretty custom one so I don't want you to be stressing about the charts or anything like that because these charts are all going to be broken... all I really care about is for all the ones that do have multiple choice, we can do the summaries."

---

**Statut** : ✅ Résumé généré  
**Transcript source** : 26. How To Organize Sheet With Feedback Data - Part 3.txt
