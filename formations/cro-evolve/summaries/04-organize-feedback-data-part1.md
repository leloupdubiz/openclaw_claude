# Organiser Données Feedback (Part 1) — Alignment & Nettoyage

## Concept Central
L'étape critique entre raw data et AI-ready data : aligner colonnes de questions avec réponses options, supprimer entrées client/spam, valider structure pour la summarization AI.

## Points Clés
- **Step 1 : Delete Internal Entries** — Identifier emails internes (client, team) qui polluent les données → Supprimer
- **Step 2 : Toggle Text Wrapping** — Afficher les questions complètes dans l'interface pour validation
- **Step 3 : Add Missing Columns** → Si survey a X colonnes, clean sheet doit aussi avoir X colonnes
  - Exemple : VialSweep a `Email, First Name, Last Name, How Did You Hear?, Options`
  - Clean sheet doit avoir colonnes identiques pour le filtering + summarization
- **Step 4 : Validate Question/Answer Alignment** :
  - Vérifier que chaque `Options` column a réponses correctes (Instagram, TikTok, Google, etc.)
  - Si survey a changé (ex: "Pinterest" ajouté), ajouter nouvelle catégorie dans sheet
- **Step 5 : Handle Custom Surveys** → Certains clients = questions différentes → adapter structure

## Insights Professionnels
- **Bottleneck courant** : Questions réécrites ou réordonnées entre survey design et export → data misalignment
- **Filtering system** : Google Sheets filter/count ne fonctionne que si colonnes/réponses sont exactement alignées
- **Audit source** : Avoir VialSweep ouvert en parallèle pour vérifier réponses possibles par question

## Applications Nellio UltraCalm
1. **Structure Nellio Template** :
   - Email | First Name | Last Name | How Did You Hear (Multiple Choice) | Problem Type | Preferred Ingredient | Price Tolerance | Written Feedback
2. **Nettoyage anticipé** : Identifier entrants test (team emails: @drinknellio.com) dès import
3. **Validation pre-GPT** : Avant upload vers ChatGPT custom, vérifier colonnes complètes et cohérentes
   - ✅ Multiple choice alignées = filtres Google Sheets travaillent
   - ✅ Written answer sections = prêtes pour GPT summarization

## Citation Clé
> "So that way it is actually aligned and we can read this all the way down. It's the same thing for the order of these questions as well."

---

**Durée vidéo** : ~12 min | **Type** : Data Ops & Validation
