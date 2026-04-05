# How To Organize Sheet With Feedback Data — Part 3

## CONCEPT CENTRAL
Pour les surveys custom où les questions/réponses varient par client, adapter dynamiquement le template en dupliquant structures (colonnes de questions + options) plutôt que refaire de zéro.

## POINTS CLÉS
- Si une question est multiple choice dans survey, dupliquer la structure "question + options" du template
- Pour chaque nouvelle réponse (ex: travel bag, blade tech), ajouter une ligne dans la section "options" avec COUNTIF vers cette réponse
- Ne pas stresser les charts/visuels si données custom : les % se recalculent automatiquement
- Garder les questions open-end (écrites) séparées pour les summaries GPT, ignorer les multiple choice pour GPT

## INSIGHTS
Le vrai pattern ici est "sois flexible sur les questions custom mais garde la structure COUNTIF/filtering intacte". Une fois une question mappée correctement, elle auto-update. C'est un semi-template : assez rigide pour fonctionner, assez flexible pour adapter.

## APPLICATIONS POUR DRINKNELLIO.COM
Si Nellio fait une survey allemand custom (ex: 15 questions au lieu de 11), ce process dit : duplique la structure pour questions 12-15, map les options, et GPT ignorera les multiple choice au summar. C'est la différence entre "casser le système" et "l'adapter intelligemment".

## CITATION CLÉ
"You're going to need to really customize it quite a bit and make sure that we get the correct answers in there... you can just copy these two and then obviously paste it over and then in that instance again you would update the question."
