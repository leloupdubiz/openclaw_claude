# Comment Organiser Sheet avec Feedback - Partie 1
> Résumé CRO | Formation EVOLVE

## 🎯 Concept Central
Structurer les données client brutes en colonnes alignées avec un template de "raw feedback data" permettant aux filtres Excel et à l'IA ultérieure de compter/résumer les réponses correctement. Le succès dépend de l'alignment exact : questions dans le bon ordre, réponses compilées sous les bons headers.

## 📌 Points Clés

- **Step 1 : Supprimer internal emails**
  - Identifier et supprimer top rows = emails internes/testeurs
  - Pourquoi ? Les skew les données lors du AI summarization

- **Step 2 : Enable text wrapping**
  - Sélectionner colonne → Toggle text wrapping
  - Visualiser les questions complètes (actuellement masquées)

- **Step 3 : Ajouter colonne "options"**
  - Si template a colonne "options" mais clean sheet ne l'a pas → ajouter
  - Raison : Filtre counting system scan cette colonne pour "Instagram", "TikTok", etc.
  - Sinon → résumé erroné

- **Step 4 : Question-answer alignment**
  - Vérifier CHAQUE question du sheet = CHAQUE question du template
  - Ordre DOIT être identique (horizontalement + verticalement)
  - Si question manquante ou déplacée → ajouter/déplacer colonne

- **Step 5 : Answer option verification**
  - Vérifier dans VialSweep qu'on a TOUS les answer options
  - Parfois client ajoute nouvelles options → ajouter category dans sheet
  - Ex : Si "Pinterest" option ajoutée → ajouter row Pinterest + COUNTIF formula

- **Advanced : Custom survey handling**
  - Certains clients = questions custom (Warroad case)
  - Chaque custom question = custom answer options
  - Procédure = même mais plus itérations alignment

## 💡 Insights
L'alignment n'est pas cosmétique — c'est fonctionnel. Les sheets utilisent COUNTIF pour scanner colonnes spécifiques à la recherche de valeurs précises. Misalignment = filtres broken et GPT reçoit garbage data. La template existe pour standardiser, mais clients custom = travail alignment manuel.

## 🧴 Applications Nellio UltraCalm

1. **Survey design** : Prédéfinir questions avant giveaway (ex: 1. Heard about / 2. Primary benefit / 3. Life change / 4. Improvements / 5. Age group)
2. **Column structure** : Email | Name | Heard (Facebook/TikTok/Instagram/Google) | Benefit (Calme/Focus/Sommeil) | Life Change (Text) | Improvements (Text)
3. **Option verification** : Avant lancer survey, lister ALL answer options (prevent omissions)
4. **Raw file preservation** : Faire backup avant clean (error recovery)
5. **Template consistency** : Si utiliser même structure pour multi-surveys → standardiser headers

## 📝 Citation
> "You need to make sure that the question aligns with the answers and the answers that are there are aligned with the template. Misalignment = broken filtering system + inaccurate AI summaries."
