# Comment Organiser Sheet Feedback - Partie 3 (Custom Surveys)
> Résumé CRO | Formation EVOLVE

## 🎯 Concept Central
Adapter le template standard de feedback vers des structures custom sans casser le système de filtrage. Les clients custom (ex: Warroad) ont des questions différentes, des answer options différentes, des ordres différents — requiert alignement itératif mais reste possible via copy-paste stratégique.

## 📌 Points Clés

- **Challenge custom** :
  - Questions ≠ template (ex: "Which product category?" au lieu de "How did you hear?")
  - Answer options custom (ex: Travel bag, Blade tech, G16 pour Warroad)
  - Ordre questions = différent du template
  - Mais système = même (multiple choice + written answers)

- **Solution systématique** :
  1. **Copy-paste structure** : Si custom survey utilise multiple choice → copy template columns pour que système fonctionne
  2. **Customize answer options** : Remplacer Instagram/Facebook par Travel bag/Blade tech
  3. **Verify via filter** : Dropdown filter doit montrer ALL correct options
  4. **Update COUNTIF formulas** : Si ajout option → drag formula down
  5. **Written answers handling** : "For 2 bonus entries [question]" → copy exactement depuis survey

- **Prévention d'erreurs** :
  - Vérifier survey question order AVANT uploading data
  - Si ordre change = reordering après import
  - Utiliser raw file comme backup si mistakes

- **Multiple choice vs written** :
  - Multiple choice = options list + COUNTIF formulas (green column)
  - Written answers = direct copy-paste de réponses (black column)
  - Ne pas mélanger les deux pour la même question

- **Scalabilité** :
  - Même process fonctionne pour 4 questions ou 20
  - Chaque question = dedicated column set
  - Filtrage fonctionne indépendamment par column

## 💡 Insights
Les clients croient leurs surveys sont "complètement différentes" mais la structure est quasi identique : multiple choice routing + written feedback. Le hack : utiliser template comme structure, adapter answers options + questions. Sans cela, chaque survey custom = rebuilding sheet from scratch.

## 🧴 Applications Nellio UltraCalm

1. **Survey design anticipatory** :
   - Décider NOW : questions core (standard) vs custom
   - Core : Heard about / Age / Primary benefit
   - Custom : Sleep quality before/after ? / Stressful job type ? / Supps taken before ?

2. **Template adaptation** :
   - Copy standard structure (columns A-D = Email, Name, Heard About, Options)
   - Duplicate pour questions custom
   - Replace "Instagram/Facebook/TikTok" par options custom (Night shifts / Corporate stress / Athletic recovery)

3. **Verification workflow** :
   - Avant giveaway : tester survey en live
   - Export test data → clean → align dans sheet
   - Vérifier filters count correctly
   - Vérifier custom GPT peut summarize si applicable

4. **Written feedback questions** :
   - "For 2 bonus entries, explain your top stress trigger" → copy responses
   - "How has Nellio changed your sleep?" → copy responses
   - Compiler via custom GPT plutôt que manual

5. **Data handoff** :
   - Sheet final → Export comme PDF
   - Upload à Custom GPT training files
   - Share avec team + client

## 📝 Citation
> "This is a pretty custom one so you're going to need to really customize it. Just keep track of your time for this and don't worry about following this section to the T because the charts will be broken anyway — focus on the data alignment."
