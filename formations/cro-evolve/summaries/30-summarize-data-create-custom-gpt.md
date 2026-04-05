# Summarizer Toutes les Data et Créer une Custom GPT — Orchestration Complète

**Concept Central:** Une fois toute la data nettoyée (VialSweep → Google Sheet) et les questions written-answer extraites, orchestrer une Custom GPT pour synthétiser les themes clés = génère un "Customer Insights Report" utilisable par tout le monde (team, client, ad copywriter).

## Points Clés

### Orchestration End-to-End

1. **Extraction des sections written-answer.**
   - Aller au clean sheet
   - Copier UNIQUEMENT les réponses texte (pas les multiple-choice data)
   - Créer un nouveau sheet "Export"
   - Paste les réponses
   - Delete le top row (header)
   - File → Download as PDF
   - Rename chaque PDF par question : "what-can-be-improved-nellio.pdf"

2. **Custom GPT creation (ChatGPT Plus, $20/mo).**
   - Create GPT
   - Configure → Name: "[Brand] Customer Intelligence Report"
   - Instructions: Copier le prompt (un simple, efficace template fourni)
   - Upload files: Tous les PDFs des written answers
   - Logo (optionnel mais nice) : upload client logo

3. **Initial summary generation.**
   - Aller au GPT
   - Paste le prompt pour Q1 : "What do customers want to see improved on our store?"
   - GPT répond avec les themes clés (sorted par frequency)
   - Copy-paste la réponse dans le sheet
   - Bold le titre
   - Repeat pour chaque question

4. **Client access & conversation starters.**
   - Share GPT avec lien
   - Ajouter conversation starters (prompts pré-mades)
   - Client peut poser ses propres questions : "What products do customers love most?", "Why do they choose us?"
   - GPT answère in real-time off la knowledge base

### Avantages de la Custom GPT vs manual reading

- **Speed:** 1-2 heures pour synthétiser 500 responses vs 15+ heures manuel
- **Consistency:** Même theme est regroupé (pas de duplication)
- **Insight augmentation:** La GPT crée des connexions cross-questions (ex: "stress at work" mentioned in Q5 + "want focus product" in Q6 → implies customers want focus solution)
- **Client enablement:** Lieu de juste un rapport statique, le client a un outil interactif

### Variabilité de sortie GPT

- Parfois les résumés sont légèrement différents selon le run (LLM non-deterministic)
- Solution : Run 2-3 fois, pick le meilleur résumé
- Ou fournir un prompt plus structuré ("Number your themes 1-5, provide 1-2 customer quotes per theme")

### Fichiers finaux

- **Knowledge base input:** PDFs de toutes les questions written-answer
- **Output pour client:** 
  - Un sheet avec tous les résumés synthétisés
  - Un lien vers la Custom GPT (pour exploration interactive)
  - Un rapport PDF (optional, si client préfère format statique)

## Insights

**La GPT est meilleure quand les PDFs sont complets.** Si tu uploads 5 PDFs partielles au lieu d'une complète, la GPT a une vue fragmentée.

**Prompt quality = output quality.** Un prompt vague ("summarize feedback") → réponse vague. Un prompt structuré ("Identify top 5 customer pain points by frequency, provide quotes") → réponse actionable.

**Les clients adorent l'interactivité.** Au lieu de "voici votre rapport," c'est "voici votre Customer GPT—ask it anything."

## Applications à drinknellio.com

### Nellio Giveaway Feedback Workflow (complet)

1. **VialSweep campaign termine** (200-500 respondents cible)
   - Export CSV
   - Upload Google Sheet template

2. **Clean et organize**
   - Raw file backup
   - Multiple-choice data → COUNTIF formulas
   - Written-answer data = extract separate

3. **Nellio Custom GPT creation**
   - 4 written questions (from survey) → 4 PDFs:
     - "customer-experience-nellio.pdf" (Q5: Describe your experience)
     - "improvement-suggestions-nellio.pdf" (Q6: What improvements?)
     - (hypothetical Q7-Q8 if exist)
   
4. **Initial summaries (GPT run)**
   - Prompt Q5: "Based on customer feedback, what results are they experiencing with Nellio? Summarize by theme (sleep, focus, stress relief), include exact quotes."
   - Prompt Q6: "What product improvements and new variants do customers want? Order by frequency."
   - Paste résumés dans sheet, bold titles

5. **GPT finalization & client access**
   - Share link
   - Conversation starters:
     - "What are Nellio's top benefits per customers?"
     - "What symptoms do Nellio customers have in common?"
     - "Which customer segment is most satisfied (if demographics collected)?"
     - "What competitors are mentioned? How do we compare?"
   
6. **Usage interne**
   - **Copywriting:** "What language do customers use to describe their results? Pull exact quotes for testimonials."
   - **Product team:** "What flavors/dosages are mentioned as desired?"
   - **Media buyer:** "What customer avatar is most satisfied? Use that for lookalike targeting."
   - **Ad creative:** "What fears/objections appear? Create ads addressing them."

### Actual prompt example (simple, effective)

```
You are an expert customer insights analyst for the brand Nellio UltraCalm.
Using the customer feedback knowledge base provided, answer the following question:

"What are the top customer-reported benefits and results from using Nellio?"

Your response should include:
1. Top 5 benefits (ordered by frequency mentioned)
2. 2-3 direct customer quotes per benefit
3. Common customer segments mentioning each benefit (if inferrable)
4. Any surprising insights or unexpected use cases

Format: Markdown with headers, keep it scannable.
```

## Citation Clé

> "What's really cool is now we have a custom GPT trained on all your customer feedback. Anyone on the team can ask it questions. Or you can send the link to your client and they have an interactive way to explore their own customer data—instead of a static report, it's an asset they use daily."

**Type:** AI synthesis orchestration | **Phase EVOLVE:** 3-4 (Creative strategy & insights)