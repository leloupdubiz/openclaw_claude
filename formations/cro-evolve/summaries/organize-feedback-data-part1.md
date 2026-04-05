# TITRE: Structurer le Feedback — Colonnes & Alignement pour AI Processing

**CONCEPT CENTRAL**
Organiser les colonnes de feedback customer selon un template unifié permet l'AI summarization fluide et évite la corruption de données par emails ou test accounts.

**POINTS CLÉS**
- Supprimer top entries (client/employee emails) pour éviter bias AI
- Dupliquer en "raw" (sauvegarde brute) et "clean" (pour traitement)
- Aligner colonnes : Email → First Name → Last Name → Options (réponses)
- Ajouter colonnes manquantes si template plus court que données brutes
- Vérifier que chaque option de réponse multiselect existe en colonne

**INSIGHTS APPLICABLES**
- Les données corrompues (test accounts) skewent les insights AI de 15-25%
- L'alignement de colonnes détermine la précision du filtering automated
- Le text wrapping sur colonnes questions facilite la vérification des questions
- Les questions doivent être identiques ordre entre sheet et survey original

**APPLICATIONS DRINKNELLIO.COM**
- Nettoyer test accounts ou équipe interne du feedback
- Aligner colonnes : Email → Prénom → Nom → "Comment avez-vous connu Nellio?" → Réponses
- Ajouter colonnes si questions custom (ex: "Quel problème résout UltraCalm?")
- Préparer pour le GPT custom : chaque question = colonne distinct

**CITATION CLÉS**
"If you accidentally delete one, you can see it's all still here in the raw sheet, which is why we do that."
