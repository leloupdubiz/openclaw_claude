# How To Organize Sheet With Feedback Data — Part 1 — Résumé CRO

## 🎯 Concept Central
L'organisation des données de feedback **dépend de l'alignement structural**. Avant AI summarization, chaque colonne, chaque question, chaque réponse doit correspondre **exactement** au template de reference. C'est un travail méticuleux mais **critique** pour la qualité finale.

## 📌 Points Clés
- **Suppression des emails clients**
  - Évite la bias de l'AI (favoriser internal emails)
  - Garde le data pur et customer-focused
  
- **Text wrapping activation**
  - Voir les questions complètes
  - Vérifier la cohérence des questions posées
  
- **Alignment par colonne**
  - Chaque colonne de réponses = doit matcher template
  - Si manque une réponse (ex: "Pinterest" comme option): ajouter colonne + verify in VialSweep
  - Si réponse extra: copier, coller, drag-down + double-click pour activer filtrage

- **Vérification des questions (ordre & texte)**
  - Template order ≠ réalité des questions = doit reorder colonnes
  - Questions changées = update texte dans template
  - Questions supprimées = delete colonne

## 💡 Insights Appliqués

| Problème | Solution |
|----------|----------|
| Questions mal alignées | Drag-drop colonnes pour reorder |
| Réponse option manquante | Ajouter colonne, verify VialSweep, copy exact spelling |
| Question modifiée | Update le texte dans le template |
| Email client dans data | Supprimer (bias risk) |

## 🍹 Applications drinknellio.com

1. **Template de référence pour Nellio feedback sheet**
   - Colonnes : Email | First Name | Last Name | How Heard | Life Changed | Missing Info | Price Feedback | Other
   - Vérifier chaque réponse existe : Facebook, Instagram, TikTok, Google, Influencer, Word-of-mouth, YouTube, Other
   
2. **Processus de QA avant summarization**
   - Chaque colonne = exactement alignée
   - Chaque réponse = valeur propre colonne
   - Aucun email @nellio (ou equivalent interne)

3. **Reordering si questions différentes par giveaway**
   - Ex: Giveaway DE vs. Giveaway FR = colonnes différentes
   - Standardizer avant AI summary

## 📝 Citation
> "The reason why we want to do that [align all columns] is because it's going to summarize everything here. You can see it does that for TikTok. It does that for a celeb and influencer, YouTube, etc."

---
**Type** : Data Organization SOP | **Audience** : CRO Ops, Data Cleaners | **Langue** : FR
