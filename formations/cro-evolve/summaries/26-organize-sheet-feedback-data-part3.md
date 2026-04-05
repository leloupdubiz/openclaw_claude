# How To Organize Sheet With Feedback Data — Part 3 — Résumé CRO

## 🎯 Concept Central
Customisation de sheets pour clients non-template (comme Warroad). Les questions custom requièrent une **organisation flexible** : adapter le template plutôt que forcer le data dans une structure.

## 📌 Points Clés
- **Identifier multiple choice vs. written answers**
  - Multiple choice = summaries non-nécessaires (filtrables directement)
  - Written answers (avec "for 2 bonus entries") = summaries required

- **Duplication stratégique pour colonnes**
  - Si question custom en multiple choice: copier colonne existante + coller + update
  - Permet au filtering de fonctionner (count unique answers automatiquement)
  
- **Configuration pour renaming post-summary**
  - Ex: "Explain your answer to which product would you be most interested in" 
  - Post-summary: rename à "What are you looking for Warroad to make next?"
  - Insert la summary juste après (bold le titre pour lisibilité)

- **Charts vs. Percentages**
  - Charts dans le template peuvent être "broken" si custom
  - Pas grave : percentages auto-calculent depuis les filtres
  - Focus sur data accuracy, pas sur chart aesthetics

- **Pas de QA sur charts**
  - Laisser tomber les charts si trop customisés
  - Percentages dans le template suffisent

## 💡 Insights Appliqués

| Situation | Action |
|-----------|--------|
| Question custom multiple choice | Copier colonne + update question + update answers |
| Question custom written | Copy data → PDF → Chat GPT summarize → paste summary back |
| Answer manquante dans filtre | Finder la valeur exacte, ajouter spelling correct, drag-down |
| Chart cassé (custom questions) | Ignorer; rely sur percentages filters |

## 🍹 Applications drinknellio.com

1. **Warroad-style customization pour Nellio**
   - Si question custom (ex: "Product preference within Nellio range")
   - Duplicate la colonne template existante
   - Update les réponses (Calm, Sleep, Focus options)
   - Laisser le filtering faire son travail

2. **Summary workflow pour questions custom**
   - Copy written answers de la colonne → new sheet
   - Export as PDF
   - Upload to ChatGPT custom GPT
   - Paste summary back dans la colonne
   - Rename question post-summary si besoin

3. **Timeline expectation**
   - Compter : ~30-45 min par giveaway custom (full processing)
   - 2-3 giveaways = ~2 hours de time

## 📝 Citation
> "This is a pretty custom one so I don't want you to be stressing about the charts or anything like that because these charts are all going to be broken. We'll actually be able to get all the percentages inside of here, so I'm not too too worried about that."

---
**Type** : Advanced Organization SOP | **Audience** : CRO Ops, Custom Projects | **Langue** : FR
