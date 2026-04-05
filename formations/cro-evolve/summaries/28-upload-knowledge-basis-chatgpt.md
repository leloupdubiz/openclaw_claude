# Upload Knowledge Basis to ChatGPT — Résumé CRO

**Concept Central**  
Créer un Custom GPT entraîné sur vos données de feedback clients permet de synthétiser les insights automatiquement et de créer une ressource partageable (team + clients) pour explorer les données sans analyste manuel.

---

## Points Clés

1. **Configuration ChatGPT Premium** :
   - Abonnement requis (ChatGPT Pro, ~$20/mois)
   - Accès à "My GPTs" → Create custom GPT → Configure mode

2. **Structure du Custom GPT** :
   - **Nom** : "[Client Name] — Feedback Summary GPT" (ex. "Warroad Customer Insights")
   - **Description** : "Ce GPT connaît tout sur les clients de [Client]"
   - **Instructions** : Prompt standard qui analyse le feedback par fréquence, themes, insights stratégiques
   - **Files upload** : PDFs contenant les réponses textuelles des clients (questions open-ended)

3. **Préparation des fichiers (PDF)** :
   - Créer un sheet separate par question ouverte (ex. "What to improve", "Customer journey", etc.)
   - Copier TOUTES les réponses textuelles pour cette question
   - Aller File → Download as PDF
   - Renommer : "[ClientName]_[QuestionName].pdf"
   - Nettoyer la première ligne si elle contient juste la question

4. **Upload dans Custom GPT** :
   - Configure → Upload files
   - Sélectionner les PDFs (ex. improved_store.pdf, customer_journey.pdf)
   - Le GPT indexe automatiquement les documents

5. **Utilisation basique** :
   - Copier le prompt depuis le sheet (ex. "Basé sur les données, résume ce que les clients veulent améliorer")
   - Coller dans ChatGPT
   - GPT synthétise la réponse (freqency-ordered, par theme)
   - Copier la réponse → coller dans le sheet

6. **Optimisation : Conversation starters** :
   - Edit GPT → Add conversation starters
   - Exemples :
     - "What do customers from [Brand] want to see next?"
     - "What products should we build?"
     - "What do customers tell others about [Brand]?"
   - Clients peuvent cliquer un bouton au lieu de taper

7. **Partage** :
   - Click "Share" → Anyone with link can use
   - Envoyer le lien aux clients, team
   - Les clients peuvent poser des questions sans accès aux données brutes

---

## Insights

- 1 Custom GPT = synthèse complète du customer feedback en 10 min vs 3h manuel
- Multi-file upload = GPT voit les données dans contexte (ex. "What to improve" + "Customer journey" ensemble)
- Conversation starters = interface ultra-simple pour non-tech clients
- Chaque client reçoit son propre GPT entraîné sur SES données (privacy-respectful)

---

## Applications pour Nellio UltraCalm

| Étape | Exécution |
|-------|-----------|
| **GPT Name** | "Nellio UltraCalm — Customer Insights" |
| **Files à upload** | Why_Nellio.pdf, Customer_Journey.pdf, Product_Improvements.pdf (allemand) |
| **Prompt standard** | "Basé sur le feedback, synthétise par fréquence ce que les clients Nellio veulent voir améliorer" |
| **Conversation starters** | "Quels produits Nellio devrait-il lancer?", "Pourquoi les clients choisissent Nellio?" |
| **Partage** | Envoyer lien au team + optionnel aux partenaires (BrandSearch, TrendTrack) |

---

## Citation

> "What's really cool is we're actually going to be able to provide a client the ability to come in and just ask it whatever questions that we want, which is really cool."

*Custom GPT = délégation IA de l'analyse, pas sacrifice de contrôle.*

---

**Statut** : ✅ Processus production-ready, reproductible après chaque giveaway Nellio
