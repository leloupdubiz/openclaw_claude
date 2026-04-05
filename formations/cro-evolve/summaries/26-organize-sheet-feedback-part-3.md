# Organiser le Sheet de Feedback — Part 3 : Customisation et Summaries

**Concept Central:** Chaque client custom = survey custom. Le template flexible doit s'adapter à des questions uniques tout en conservant la logique COUNTIF/GPT-summary.

## Points Clés

- **Identifiez les types de questions :**
  - **Multiple choice** = COUNTIF + counts affichés. Ex: "Category best represents you" → Traveler, Backpacker, Adventure seeker
  - **Written answer** (bonus entries) = Text à envoyer à GPT pour summarization. Ex: "Explain your answer to Q4"

- **Copier-coller structures pour custom questions.** Si tu as une nouvelle multiple-choice :
  1. Dupliquer une paire existante (2 colonnes : Q + Options rows)
  2. Coller à la place appropriée
  3. Updater le question label
  4. Updater les option values
  5. Copier la COUNTIF formula vers chaque option row

- **Ordre des questions.** Si le clean sheet a ordre différent du template master :
  1. **Ne pas modifier les questions dans le master.** C'est le source of truth.
  2. Ou identifier exactement quel ordre le client voulait
  3. Reorder les colonnes dans clean sheet AVANT copy-paste
  4. Valider l'ordre match le survey original envoyé au client

- **Les réponses "Written answer".**
  - Format : "For 2 bonus entries: [question texte]"
  - Ne pas COUNTIF ces sections
  - Copier la réponse texte complète + Question label
  - Exporter vers PDF → Upload à Custom GPT pour synthesis

- **Chart updates si colonnes break.**
  - Si un COUNTIF range était `=COUNTIF(G12:G500, "Instagram")`
  - Et tu ajoutes une colonne au début = G devient H
  - Tous les COUNTIF doivent updater aussi (sinon charts cassées)
  - Solution rapide : ne pas ajouter colonnes au milieu. Ajouter à la fin et reorganize après.

## Insights

**La flexibilité = risque si non trackée.** Chaque customisation doit matcher exactement le survey original, sinon l'IA reçoit des data missaligned.

Les clients "very custom surveys" demandent plus d'effort de cleanup que les clients utilisant le template standard.

Le gain : chaque question peut être unique à la brand, vs one-size-fits-all.

## Applications à drinknellio.com

- **Si Nellio voulait un survey custom (vs template standard) :**
  - Q1 (Multiple): "How did you hear about Nellio?" → Options: Paid Ads, Friends, Reddit, Influencer DE, Google, TikTok, Other
  - Q2 (Multiple): "Which symptom matters most?" → Stress, Sleep, Focus, Anxiety, All equally
  - Q3 (Multiple): "What's your profession?" → Tech, Healthcare, Student, Parent, Executive, Other
  - Q4 (Multiple): "Which flavor would you try?" → Raspberry-Lemon (current), Mint-Lavender, Tropical, Other
  - Q5 (Written): "Describe your experience with Nellio. What changed for you?" → For 2 bonus entries
  - Q6 (Written): "What improvements would you suggest?" → For 2 bonus entries

  **Sheet Mapping:**
  - [Email | FirstName | LastName | Options | Q1_Hearing | Q2_Symptom | Q3_Profession | Q4_Flavor | Q5_Experience | Q6_Improvements]
  - Q1-Q4 = COUNTIF per option
  - Q5-Q6 = Export texte seul → GPT custom summary

- **Warroad example du transcript** = super custom (age groups, category, products, etc). Même logique : COUNTIF pour MC, texte pour written.

## Citation Clé

> "For this one, this is a pretty custom survey. We don't really have to follow the charts to a T because these charts are going to be broken. The important thing is making sure the COUNTIF formulas work and the written answers are ready for GPT summarization."

**Type:** Data customization | **Phase EVOLVE:** 3 (Exécution)