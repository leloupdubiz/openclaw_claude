# 24. How To Organize Sheet With Feedback Data - Part 1

## Concept Central
**Normalisation structures feedback survey** — Aligner les colonnes/questions du clean sheet avec le template feedback existant, colonne par colonne + ligne par ligne. Garantir que chaque réponse map exactement à sa question, et que l'ordre est cohérent.

## Points Clés
- **Delete step 1** : supprimer lignes d'email client (Admin, TestEmail) → polluent summarization AI
- **Alignment process** (2 dimensions) :
  1. **Horizontal** : colonnes réponses alignées avec template
  2. **Vertical** : ordre questions dans clean sheet = ordre template
- **Column matching exact** :
  - Template : Email, First Name, Last Name, Options, [Questions...]
  - Clean sheet : MUST avoir same colonnes dans same ordre
  - Ajouter colonnes vides si nécessaire (padding)
- **Modifier questions si client custom** :
  - Vérifie via VialSweep edit que les réponses proposées sont correctes
  - Si client a ajouté réponse (ex: Pinterest) → créer catégorie, drag filter down
  - Si client a changé question text → remplacer exact wording
- **Answer validation workflow** :
  1. Ouvrir VialSweep survey edit
  2. Vérifier réponses proposées pour chaque question
  3. Copier exact spelling (CASE SENSITIVE)
  4. Aligner dans clean sheet
- **Order fix** : si questions sont mal ordonnées → click+hold colonne → déplacer à bon endroit
- **Text wrapping** : essentiel pour lire les questions longues

## Insights
- Typo dans question = AI summarization échoue
- Ordre des questions importe : must match template pour filters fonctionner
- Custom questions/réponses = 10% des clients seulement
- Process fastidieux MAIS bloquant : une mauvaise align = tout downstream casse
- VialSweep edit = source de truth pour surveiller

## Applications drinknellio.com
- **Standard questions Nellio** (si survey giveaway) :
  1. "How did you hear about us?" → FB/IG/TikTok/Google/Word of Mouth/Influencer/Other
  2. "What health challenge brought you here?" → Sleep/Anxiety/Stress/Focus/Combination
  3. "Price concern?" → Too High / Fair / Great Value
  4. "How will Nellio improve your life?" → [Open ended]
  5. "Product improvement suggestions?" → [Open ended]
- **Alignment checkpoints** :
  - Email, First Name, Last Name, Hear About Us, Health Goal, Price Perception, Life Change, Improvement Ideas
  - Same order as template
  - No extra columns (delete if present)
- **Custom question rare** : si Chef ajoute "Favorite flavor?" → ajouter colonne correspondante

## Citation
> "Il y a deux façons d'organiser : horizontalement avec les réponses de chaque question, et verticalement avec les questions elles-mêmes. Si c'est pas aligné, tout ce qu'on résume après casse."

---
