# Upload Knowledge Base à ChatGPT — Créer une Custom GPT Client-Obsessed

**Concept Central:** Transformer un Google Sheet de customer feedback (responses brutes + COUNTIF aggregates) en une Custom GPT = créer un "customer obsession engine" pour toute l'équipe et le client.

## Points Clés

- **Custom GPT Setup (ChatGPT Plus requis, $20/mois):**
  1. Profil → "My GPTs" → "Create"
  2. "Configure" button
  3. Name: "[Brand] Summary & Feedback Survey Data" (ex: "Nellio Feedback Intelligence")
  4. Description: "This GPT knows everything about [Brand] customers"
  5. Instructions: Copier le prompt standard (lien dans template)
  6. Upload files: PDFs des sections written-answer (ex: "What improvements", "Customer journey", etc)

- **Files to upload (NOT multiple choice data):**
  - Exporter chaque section written-answer en PDF separate
  - Name chaque PDF pour la question : "what-can-be-improved.pdf", "customer-journey.pdf", "emotional-transformation.pdf"
  - La GPT apprendra de TOUS les fichiers et synthétisera across themes

- **Prompt standard (très simple, mais efficace):**
  ```
  You are an expert customer insights analyst. 
  Based on the knowledge base (customer feedback files uploaded), 
  provide structured, actionable summaries.
  Always include:
  - Top themes by frequency
  - Exact customer quotes supporting each theme
  - Implied desires or needs (read between the lines)
  - Competitive comparison opportunities
  ```

- **Output dans le sheet.** Une fois la GPT créée:
  1. Copier le prompt pour Q1 (ex: "What do customers want improved?")
  2. Aller à Custom GPT
  3. Paste prompt + "answer this"
  4. Attendre la réponse (lent si beaucoup de data)
  5. Copy-paste la belle réponse dans le cell du sheet
  6. Bold le titre pour lisibilité client

- **Client access.** Une fois finalisée :
  1. "Share" → copier le lien
  2. "Anyone with link can use"
  3. Envoyer au client (ou team)
  4. Clients peuvent poser leurs propres questions : "What products should we launch?", "What do customers love most?" (la GPT answère en live)

- **Conversation starters (optional Polish).**
  - Ajouter des prompts pré-mades pour le client
  - Ex: "What products do customers want to see next?", "What problems are customers trying to solve?", "Why do customers choose us over competitors?"
  - Client clique le button → GPT answère instantly

## Insights

Une Custom GPT = 10 analyst hours résumées. Au lieu de lire 500 responses, le client/team pose une question et obtient insight synthétisé.

**Efficacité:** Tous les documents uploadés = trainés ensemble. La GPT crée des connexions cross-questions (ex: "Customers stress about X (Q5) mais veulent Y solution (Q6)").

L'upload de fichiers multiples >one-by-one. Elle synthétise mieux sur le set complet.

## Applications à drinknellio.com

- **"Nellio Customer Intelligence GPT"**
  1. Upload files :
     - "customer-experience-nellio.pdf" (réponses à "Describe your experience")
     - "symptom-relief-nellio.pdf" (réponses à "How did Nellio improve your X?")
     - "improvement-suggestions.pdf" (réponses à "What could we improve?")
     - "word-of-mouth-nellio.pdf" (réponses à "How would you describe Nellio to friends?")

  2. Conversation starters :
     - "What symptoms do Nellio customers struggle with most?"
     - "What results do customers experience (energy, sleep, focus)?"
     - "How does Nellio compare to other adaptogènes (Ashwagandha, Magnesium, L-Theanin) per customer feedback?"
     - "What customer objections or concerns are mentioned?"
     - "What marketing angles would resonate with Nellio customers?"

  3. Usage interne :
     - Copywriting team → "What language do customers use to describe their stress?"
     - Media buyer → "Which customer segments are most satisfied (demographic data)?"
     - Product team → "What product improvements are most requested?"

- **Partage client:** Envoyer le link au propriétaire drinknellio.com → il peut explorer les insights sans overhead analytique.

## Citation Clé

> "Now we have a great little summary here with quotes. Now you have your own custom GPT that you can just chat to and ask anything about your specific clients. Even better, the client can use it themselves."

**Type:** AI-powered synthesis | **Phase EVOLVE:** 3-4 (Insights & Strategy)