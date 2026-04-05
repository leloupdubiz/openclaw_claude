# How To Organize Sheet With Feedback Data — Part 1

## Concept Central
**Structurer les données de feedback pour qu'elles s'alignent avec tes templates** = le pont entre collecte brute et analyse sistématique. Cette étape transforme un CSV en intelligence utilisable.

## Points Clés
- **Supprime les entrées problématiques** : emails clients, adresses internes, test entries — qui fausseraient l'analyse
- **Aligne les colonnes** du sheet de giveaway avec le template de feedback data :
  - Ajoute colonnes manquantes (ex: "options" s'il manque)
  - Supprime colonnes inutiles ou non pertinentes
  - Vérifie l'ordre des colonnes (questions et réponses doivent correspondre horizontalement)
- **Vérifie les réponses multiples** :
  - Retourne à VialSweep → Edit survey si tu doutes des options possibles
  - Copy/paste la réponse exacte (respect casse/accents) → sinon les formules de décompte ne la recognizeront pas
- **Cas spéciaux** : si le client a customisé le survey, ajoute les colonnes custom + mets à jour le template
- **Doublecheck ordre des questions** : parfois VialSweep les réordonne vs ce que tu attendais

## Insights
- 80% des erreurs post-analysis = mauvais nettoyage à cette étape
- Les **formules de décompte** (COUNTIF) sont fragiles : elles cassent si les données ne matchent pas exactement
- Un survey non-standard nécessite **50% plus de QA** qu'un survey template
- Cette étape = **très tedieuse**, mais ultra-critique pour les phases suivantes (AI summaries)

## Applications drinknellio.com
- **Avant d'envoyer le feedback Nellio à GPT pour summary** :
  - QA les questions clés : "Quel problème résout Nellio pour toi ?" doit être identique partout
  - Vérifie que les réponses multiples (stress, sommeil, nerfs, concentration) sont spelled uniformément
  - Crée un mapping : question → réponses possibles (dans un doc à part)
- **Checklist Nellio Giveaway** :
  - [ ] Raw file sauvegardé
  - [ ] Clean file : supprimé les emails internes
  - [ ] Colonnes alignées (email, prénom, nom, réponses)
  - [ ] Réponses multiples normalisées (Stress, stress, STRESS = Stress uniquement)
  - [ ] Ordre des questions vérifié
  - [ ] 0 lignes vides ou corrompues

## Citation
> « The reason why we want to do that is because the way that this filtering system works is it will look all the way down through this column here and see for any answers... it will then count that as an entry. So the reason why we want to do that is to make sure that if there is, for example, an extra column here, that in the clean sheet, we add that column. »
