# How To Organize Sheet With Feedback Data - Part 1

## Concept Central
Structurer un sheet de feedback client pour que les formules et les IA puissent les analyser : colonnes alignées + questions organisées = outputs utilisables.

## Points Clés
- Architecture core : email | first name | last name | [questions en colonnes] | options (dropdown counter)
- Les dropdowns (filtres) requièrent une colonne dédiée pour chaque question multiple-choice — la formule COUNTIF compte les réponses
- Alignement critique : si une question du survey change d'ordre/de wording dans le sheet, les formules cassent
- Options answers en dropdown : créer une colonne "options" avec les réponses possibles, puis COUNTIF pour les compter
- Template de référence : recopier la structure du survey original, colonne par colonne

## Insights
C'est un travail de QA invisible mais capital : tu peux avoir 1000 réponses, mais si ta structure n'aligne pas question ↔ réponse, tu peux pas analyser. L'erreur classique : décaler une question dans le sheet, et soudain 400 réponses se comptent dans la mauvaise catégorie.

Le secret : un "raw feedback data" template que tu dupliques pour chaque client — puis tu valides colonne par colonne. Oui c'est tedieux, oui c'est critique.

## Applications drinknellio.com
**Pour Nellio UltraCalm :**
- Template de survey questions :
  - « Comment as-tu entendu parler de Nellio ? » (Facebook | Instagram | TikTok | Google | Word-of-mouth | Autre)
  - « Quel est ton principal driver de stress ? » (Travail | Famille | Santé | Finances | Autre)
  - « As-tu essayé d'autres solutions de stress ? » (Oui | Non)
- Assurer que chaque réponse multiple-choice a une colonne "options" pour le COUNTIF
- Archiver template dans folder « Survey_Templates »

## Citation Mémorable
« Si tu aligns pas les colonnes maintenant, tu vas passer 2 heures plus tard à débugger pourquoi ChatGPT dit que personne n'aime ton produit. »
