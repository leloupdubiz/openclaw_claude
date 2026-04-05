# Organiser le Sheet de Feedback — Part 1 : Cleaning et Alignment

**Concept Central:** La qualité de l'output AI (résumés customer insights) dépend 100% de la qualité du data input. Le cleaning est une tâche critique, pas une tâche "administrative."

## Points Clés

- **Suppression des test entries.** Avant tout : effacer top rows si emails clients ou test. (Raison : l'IA va summarizer ces fakes et polluer les insights réels.)

- **Text wrapping toggle.** Cliquer la colonne des questions → Enable text wrapping → voir le texte complet. Cela prépare à la prochaine étape : alignment.

- **Structure du "Raw Feedback Data" master template:**
  - Colonne 1 = Email
  - Colonne 2 = First Name
  - Colonne 3 = Last Name
  - Colonne 4 = Options (la réponse à "Comment vous nous avez entendu parler" par ex)
  - Colonnes suivantes = Questions et leurs réponses

- **Alignment horizontal.** Le clean sheet doit avoir le même nombre et ordre de colonnes que le "Raw Feedback Data" section (le template). Sinon, la copy-paste décale tout.
  - **Exemple:** Si template attend [Email, First Name, Last Name, Options, Q1, Q2, Q3...]
  - Et ton clean sheet a [Email, First Name, Last Name, Q1, Options, Q2, Q3...]
  - → Ajouter colonne "Options" à la bonne place dans clean sheet AVANT copy-paste

- **COUNTIF formula pour chaque réponse.** Pour chaque option possible (ex: "Facebook", "Instagram", "TikTok" sous "How did you hear?") :
  - `=COUNTIF([CLEAN_SHEET_COLUMN_RANGE], "Instagram")`
  - Cette formula = le compte automatique des votes par option. Elle alimentera les charts.

- **Vérification croisée VialSweep.** Si doute sur les réponses valides pour une question :
  - Retourner à VialSweep → Edit tab du survey → voir toutes les options
  - Copier exactement l'orthographe (case-sensitive pour COUNTIF)
  - Si une option manque du survey mais répond dans les data (typo par exemple), décider : laisser ou corriger.

- **Les questions avec réponses écrites.** "Pour 2 entrées bonus, explique ton parcours" → Ces réponses ne vont PAS dans le template avec COUNTIF. Elles vont directement à la custom GPT pour summarization.

## Insights

**Garbage in, garbage out.** Une colonne décalée d'une position = tous les COUNTIF cassés + toutes les AI summaries incorrectes en aval.

L'alignment forcé crée de la clarté. Sans étapes strict, on perd temps en debug plus tard.

**Orthographe exacte = non-négociable.** "Instagram" ≠ "instagram" dans une COUNTIF.

## Applications à drinknellio.com

- **Si on reçoit 200 responses de giveaway Nellio :**
  - "How did you hear about Nellio?" → Options : Paid Ads, Instagram, TikTok, Word of Mouth, Google, Influencer, Reddit, Affiliate
  - Créer les COUNTIF pour chacun (donne top acquisition channels)
  - "What's your biggest stress trigger?" → Multiple choice ou written ?
    - Si multiple choice : COUNTIF pour Work, Relationships, Health, Sleep, Financial, etc.
    - Si written : export vers GPT pour summary
  - "Describe your experience with Nellio" → Written → GPT summary

- **Checklist pre-GPT upload :**
  - [ ] Raw file = backup (intouché)
  - [ ] Clean file = nettoyé (test entries supprimées)
  - [ ] Colonnes alignées = match template
  - [ ] COUNTIF formulas = validées
  - [ ] Orthographe questions = match VialSweep original

## Citation Clé

> "The reason we need to clean this sheet is because the way the filtering system works will look all the way down through this column and see for any answers that have 'Instagram'—it will count that as an entry. So make sure alignment is perfect."

**Type:** Data cleaning | **Phase EVOLVE:** 3 (Exécution)