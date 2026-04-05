# 26. How To Organize Sheet With Feedback Data - Part 3

## Concept Central
**Customisation sheet feedback pour surveys complexes** — Adapter le template standard à des surveys très customisées (multi-questions, réponses variées). Créer des sections pour multiple-choice vs written answers, utiliser Jasper/ChatGPT pour résumer les réponses écrites.

## Points Clés
- **Quand c'est hyper-custom** (comme Warroad) :
  - 10+ questions très variables
  - Mix multiple-choice + written answers
  - Réponses complexes (multi-option)
- **Process** :
  1. Identifier questions WRITTEN (besoin résumé) vs MULTIPLE-CHOICE (pas de résumé)
  2. Pour written : copier colonnes correspondantes vers "export" sheet
  3. Convertir en PDF (Google Sheets → Download as PDF)
  4. Renommer logiquement (ex: "what-can-be-improved-warroad.pdf")
  5. Upload dans ChatGPT custom GPT + générer résumé
  6. Copy résumé → coller dans sheet, format clean
- **Multiple-choice handling** :
  - Filter formulas pour compter réponses (ex: travel bag = 952 mentions)
  - Dupliquer colonnes si plusieurs questions same format
  - Drag+drop pour réorganiser questions si ordre mauvais
- **Custom answer tagging** :
  - Si réponse manquante (ex: Pinterest vs Instagram) :
    - Aller VialSweep survey edit
    - Copier exact spelling
    - Ajouter catégorie dans sheet filter
- **Don't overdo charts** :
  - Charts automatiques peuvent être "broken" si questions mal alignées
  - Focus sur data clean + summaries = suffisant
  - Charts = nice-to-have, pas critical

## Insights
- Surveys custom = 10x plus travail mais 10x plus insights
- ChatGPT summaries REQUIERT data clean + questions claires
- Filter formulas = outil puissant (automatique counting)
- Typos dans réponses → manuellement nettoyer avant résumé
- Keep track du temps : custom surveys = peut prendre 2-3h par survey

## Applications drinknellio.com
- **Si Nellio lance survey très custom** (ex: flavor preference + health goal + price point) :
  - Written Q1: "How has Nellio changed your anxiety?" → Jasper résumé
  - Written Q2: "What improvement would you suggest?" → Jasper résumé
  - Multiple-choice : "Favorite flavor?" → count Framboise-Citron vs Autres
  - Multiple-choice : "Price perception?" → count Too High / Fair / Great Value
- **Résumé Jasper format** :
  - "Based on 147 customers: Most mentioned benefit = sleep improvement (64%), followed by anxiety relief (89%), 27% also cited focus improvement. Price objections = 12% said too high. Suggestions = larger 2-month packs, subscription option."
- **Timeline** : custom survey = 3h research + 1h Jasper + 30min sheet = 4.5h total

## Citation
> "C'est une survey très custom. Je ne veux pas que tu stresses trop sur les charts. On peut obtenir tous les pourcentages là. Ce qui m'importe, c'est les data clean + les résumés."

---
