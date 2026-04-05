# How I Made $93,000 with One AI Agent — Lead Reactivation
> Source: @WontDieAverage_ (Igor) — X Article | 27 Feb 2026
> URL: https://x.com/WontDieAverage_/status/2027428955964219490
> Stats: 11K+ vues · 288 bookmarks · 104 likes
> Outil : BuildMyAgent + Twilio SMS · Modèle : Grok 4 Fast
> Intégré le: 2026-02-27

---

## 🎯 Concept Central

Chaque entreprise a une **base de leads morts** — des milliers de prospects qui n'ont pas répondu à l'époque, jamais re-contactés car trop coûteux humainement. Un agent IA de **lead reactivation** les contacte via SMS à coût quasi nul, réactive le 1% encore intéressé, et book des RDV automatiquement.

**Math simple :**
```
10,000 leads × 1% = 100 RDV
$20-50/RDV = $2,000-5,000 par campagne
→ $93,000 générés sur 1 seul client
```

---

## 📋 Le Système — Étape par Étape

### 1. Construire l'Agent (BuildMyAgent)
- Créer un agent avec le template **Google Calendar**
- Supprimer Gmail + Google Calendar tools (pas nécessaire au départ)
- Garder le prompt de base → supprimer la section FAQ → remplacer par : `"use your knowledge base for company information"`
- **Modèle recommandé** : **Grok 4 Fast** (cheap + très bon)

### 2. Knowledge Base RAG
Importer le site du client dans la knowledge base :
- Homepage
- About page
- Reviews/témoignages
- Pages produit/service

→ L'agent a accès RAG à toutes ces infos pour répondre avec précision

### 3. Le Flow de Questions (critique — prime sur tout le reste)

```
Question 1 — Uncovering the Pain
❌ "Are you interested in solar?"
✅ "How much are you paying for electricity? Does it feel like the bill has gone up lately?"

→ Quand ils disent "yeah it almost doubled" → ils l'ont dit eux-mêmes → vente facile

Question 2 — Soft Transition
"Would mornings or afternoons usually work best for a quick call?"
→ Pas d'engagement, juste du priming

Question 3 — Calendar Link
"Got it. You can find a morning time in my calendar here."
→ Lien calendrier (pas de booking in-conversation = taux de présence plus faible)
```

**Règle critique :** Lien calendrier > booking in-conversation. Les gens qui bookent en conversation ne viennent souvent pas. Ceux qui cliquent un lien calendrier = intent réel.

### 4. Lancer la Campagne

1. Créer un **sous-compte** BuildMyAgent pour le client
2. L'inviter comme member → il suit les conversations en temps réel
3. Personnaliser le branding (logo, couleurs)
4. Ajouter l'agent SMS créé
5. Connecter **Twilio** (enregistrement A2P avec les infos business du client — anti-spam)
6. Message d'ouverture exemple (solar) :
   ```
   "hey [prénom], wanted to call you but didn't want to disturb you 
   without texting first. we recently got a new rebate in [area] for 
   an additional $500 off. still looking to cut your bills with solar?"
   ```
7. Ajouter **2 follow-ups** espacés d'1 jour (sweet spot coût/résultats)
8. Délai de réponse : **30 secondes** (paraître humain)
9. Upload CSV des leads → lancer

---

## 💡 Insights Actionnables

1. **Lead reactivation pour drinknellio.com** : réactiver les clients qui ont acheté mais n'ont pas rebooké → SMS automatique "Wie geht es dir mit UltraCalm?" → re-engager avec une offre bundle → LTV × 2 minimum
2. **Question flow = le modèle des hooks Nellio** : ne pas demander "intéressé par Nellio ?" → demander "Comment tu gères ton stress au travail ces derniers temps ?" → ils se qualifient eux-mêmes
3. **Lien calendrier** vs booking forcé = même principe que CTA Meta Ads : ne pas forcer l'action immédiate, donner le contrôle → intent réel → meilleur CVR
4. **BuildMyAgent + Twilio** = stack minimal pour déployer un agent SMS d'outreach (à tester pour l'outreach influenceurs DE alternatif à DMs Instagram)
5. **Volume game** : plus la base de leads est grande, plus le ROI est massif. Si Nellio a 5K clients passés → 50 réactivés à €89.99 = €4,500 de CA sans aucune acquisition

---

## 🏪 Applications directes pour drinknellio.com

| Cas d'usage | Stack | Impact |
|-------------|-------|--------|
| **Réactivation clients passés** (30+ jours sans rachat) | BuildMyAgent + Twilio SMS DE | LTV × 2 · €89.99 bundle comme cible |
| **Lead reactivation opt-ins** (landing page visitors non-convertis + email capturé) | Agent SMS · question flow cortisol | +1% = dizaines de ventes récupérées |
| **Question flow modèle** pour les scripts UGC | "Wie viel Stress hast du gerade?" > "Interessiert an Nellio?" | ↑ Engagement, ↑ CVR, ↑ ROAS |
| **Outreach influenceurs DE** | Twilio SMS alternatif aux DMs | 1000 SMS/jour, 30s de délai = paraît humain |

---

## ⚡ Citations Clés

> "$93,000 in commission. from one client. here's exactly how it works."

> "Your first question should uncover pain. Don't ask: 'are you interested in solar?' Ask: 'how much are you paying for electricity?'"

> "1% is nothing? 10,000 old leads × 1% = 100 appointments. Some companies have millions of them."

> "Use a calendar link, not in-conversation booking. Calendar links produce higher intent appointments."

---

## 🔧 Stack Technique

| Outil | Rôle | Coût |
|-------|------|------|
| **BuildMyAgent** | Création agent SMS + knowledge base + sous-comptes clients | SaaS |
| **Twilio** | SMS A2P (enregistrement anti-spam requis) | ~$0.01/SMS |
| **Grok 4 Fast** | Modèle de l'agent (cheap, performant) | Cheap |

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-27*
