# Organiser Données Feedback Custom (Part 3) — Mapping Complexe

## Concept Central
Pour les surveys clients custom avec beaucoup de questions différentes (multiple choice, written, variances) : un protocole de mapping systématique pour que chaque question/réponse soit prête pour le filtrage + summarization GPT.

## Points Clés
- **Challenge** : Custom surveys ≠ template standard → colonnes différentes, questions réordonnées
- **Solution** : Dupliquer colonnes pour aligner avec structure existante
  - Exemple : Si nouveau client a "Multiple Choice" × 2 colonnes manquantes
  - Dupliquer [Options columns] × 2, update questions + réponses possibles
- **Validation par filtrage** : Tester filter pour chaque option (ex: "Travel Bag" category → compte X entrants)
  - Si filtre retourne 0 = mismatch entre réponse réelle et cell formula
- **Pour written answers** : Utiliser colonnes "For 2 Bonus Entries" + texte réponse brut
- **Post-Import Cleanup** :
  1. Copy réponses multiple choice du survey
  2. Paste dans colonnes correspondantes
  3. Run filters pour valider match
  4. Drop summary formulas (sera remplacé par GPT)

## Insights Professionnels
- **Custom surveys = contrainte opérationnelle** mais plus précis (questions alignées avec sales narrative)
- **Pattern** : Plus on a de questions, plus de temps de cleanup → budget temps en conséquence
- **Avantage** : Filters + summaries restent utilisables même avec colonnes rearrangées si aligned correctement

## Applications Nellio UltraCalm
1. **Si on fait survey custom Nellio** :
   - Bien organiser questions en amont (problem type → trigger → ingredient → price)
   - Identifier colonnes "multiple choice" (filtrable) vs "written" (pour GPT)
2. **Nellio Template Simplifié** :
   - Cols 1-3 : Email, First Name, Last Name (fixed)
   - Cols 4-8 : Multiple Choice (How Did You Hear, Problem Type, Product Preference, etc.)
   - Cols 9-11 : Written (Why Nellio?, What Improved?, Recommendation?)
3. **QA check** : Avant de passer à GPT, run filter sur chaque multiple choice → vérifier counts logiques

## Citation Clé
> "And you can update this stuff all just kind of by going through it. I don't want to break this sheet because again this is actually my template but I think you get the idea."

---

**Durée vidéo** : ~10 min | **Type** : Advanced Data Ops
