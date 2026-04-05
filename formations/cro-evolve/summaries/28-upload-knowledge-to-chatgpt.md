# 28. How To Upload Knowledge Basis To Chat GPT

## Concept Central
**Custom ChatGPT pour feedback automation** — Créer un ChatGPT custom (payant, $20/mois) qui connaît toutes les réponses survey et génère automatiquement des résumés structurés. Upload de PDFs = knowledge base pour l'IA.

## Points Clés
- **Prerequisites** :
  - ChatGPT Plus ($20/mois) : accès aux custom GPTs
  - Profile → My GPTs → Create new GPT
- **GPT setup workflow** :
  1. **Configure** :
     - Name : "Pardon My Fro Customer Feedback" (ou client name)
     - Description : "This GPT knows everything about PMF customers"
     - Instructions : paster prompt standard (fourni dans le template)
  2. **Upload files** :
     - Prendre ONLY written answers (pas multiple-choice)
     - Créer export sheet avec : question + toutes les réponses
     - Download as PDF
     - Upload dans ChatGPT
  3. **Iterate per question** :
     - Une question = un PDF (max 3-4 PDFs par GPT pour perf)
     - "improved_store_pmf.pdf", "product_suggestions_pmf.pdf", etc.
- **Prompt standard** (fourni) :
  - Structuré pour extraire patterns
  - "By order of frequency" = mention count
  - Client logo option (cosmétique)
  - Output = quotes + patterns + actionable insights
- **Results** :
  - GPT outputs résumé structuré
  - Copy-paste dans sheet
  - Bold titre pour lisibilité client
  - Clients peuvent ask follow-up questions au GPT (custom knowledge)

## Insights
- Custom GPT = automation feedback sans Jasper
- Upload PDFs = GPT devient knowledge base client
- Process = 5-10 min par question (vs 30 min manuel)
- Client peut interagir directement avec GPT (questions supplémentaires)
- Quotes + frequency = format résumé que clients comprennent

## Applications drinknellio.com
- **Nellio Custom GPT Workflow** :
  1. Créer "Nellio UltraCalm Customer Insights" GPT
  2. Prompts prédéfinis :
     - "Summarize sleep/anxiety benefits mentioned most"
     - "Extract pricing objections with frequency"
     - "Identify common side effects or concerns"
  3. Upload PDFs :
     - "sleep_improvements_nellio.pdf" (réponses Q1)
     - "price_concerns_nellio.pdf" (réponses Q2)
     - "improvement_suggestions_nellio.pdf" (réponses Q3)
  4. Génération résumé :
     - "Most customers report: sleep improvement (78%), anxiety relief (64%), focus bonus (32%). Price objections: 9% too high, 67% great value. Feature requests: flavor variety (34%), bigger packs (28%), subscription option (12%)."
  5. Chef can share GPT link avec team ou client pour interactive Q&A

## Citation
> "Go ahead and get the first summary. Copy this beautiful answer que ChatGPT a donné, et pop it right dans le sheet en double-cliquant et en pasting. From there, on peut juste bold le title pour que ce soit plus facile à lire."

---
