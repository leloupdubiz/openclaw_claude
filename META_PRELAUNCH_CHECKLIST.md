# META PRE-LAUNCH CHECKLIST — NLO_DE_SALES
> Clawdbot Prime | 2026-03-01 | Tout ce que Chef doit faire avant de cliquer "Publier"

---

## Statut Actuel

| Élément | Status | Référence |
|---------|--------|-----------|
| Meta Pixel installé | ❓ À vérifier | META_PIXEL_GUIDE.md |
| Domaine validé BM | ❓ À vérifier | META_PIXEL_GUIDE.md §5 |
| 4 événements configurés | ❓ À vérifier | META_PIXEL_GUIDE.md §4 |
| Campagne structure | ✅ Prête | MEDIA_PLAN_LANCEMENT.md |
| Créatifs vidéo | ❌ À tourner | SCRIPTS_BATCH01.md |
| Créatifs statiques | 🟡 À produire | CANVA_PRODUCTION_SHEET.md |
| Copy ads (body+headline) | ✅ Prête | SCRIPTS_BATCH01/02/03.md |
| CRO PDP | 🟡 À implémenter | CRO_PDP_RECOMMENDATIONS.md |

---

## CHECKLIST COMPLÈTE — Par Ordre d'Exécution

### PHASE A — TECHNIQUE (avant toute dépense)

#### A1. Meta Business Manager
- [ ] Compte BM actif sur business.facebook.com
- [ ] Page Facebook drinknellio.com liée au BM
- [ ] Compte publicitaire DE créé (devise : EUR)
- [ ] Limite de dépense publicitaire configurée (recommandé : €150/j au départ)
- [ ] Méthode de paiement ajoutée + vérifiée
- [ ] 2FA activé sur le compte BM

#### A2. Meta Pixel (voir META_PIXEL_GUIDE.md pour détail)
- [ ] Pixel créé dans Events Manager
- [ ] Pixel installé sur drinknellio.com (Shopify app ou header code)
- [ ] **Purchase** configuré + déclenché ✓ (tester avec achat test)
- [ ] **InitiateCheckout** configuré + déclenché ✓
- [ ] **AddToCart** configuré + déclenché ✓
- [ ] **ViewContent** configuré + déclenché ✓
- [ ] Meta Pixel Helper Chrome extension → vert sur toutes les pages

#### A3. Domaine + iOS14
- [ ] Domaine drinknellio.com ajouté dans BM → Brand Safety → Domaines
- [ ] Méta-tag OU DNS TXT vérifié (status : Verified ✓)
- [ ] Aggregated Event Measurement configuré (priorité événements)
- [ ] Ordre priorité : **Purchase (1) → InitiateCheckout (2) → AddToCart (3) → ViewContent (4)**

#### A4. Catalogue Produit (si Dynamic Ads prévus)
- [ ] Catalogue créé dans Commerce Manager
- [ ] Feed drinknellio.com synchronisé (Shopify → Meta = automatique)
- [ ] UltraCalm visible dans le catalogue + prix correct
- [ ] Images catalogue conformes (fond blanc, 1:1, >500×500px)

---

### PHASE B — CRÉATIFS (avant upload)

#### B1. Spécifications techniques Meta
- [ ] Format vidéo : MP4, H.264, 16:9 (Feed) ou 9:16 (Stories/Reels)
- [ ] Résolution vidéo : min 1080×1080 (carré) ou 1080×1920 (vertical)
- [ ] Durée vidéo : 15-60s recommandé (max 240s)
- [ ] Taille fichier : max 4GB
- [ ] Format image : JPG ou PNG, min 1080×1080px
- [ ] Ratio texte/image : <20% (sinon portée réduite)

#### B2. Naming convention (OBLIGATOIRE pour tracking)
Format : `NLO_DE_[BATCH]_[SCRIPT]_[BODYCOPY]_[HEADLINE]`
- [ ] Batch #1 : NLO_DE_S1A_BC1_H1 ... NLO_DE_S1C_BC2_H2 (12 ads)
- [ ] Batch statiques : NLO_DE_STATIC01_BC1_H1 ... (12 ads si produits)
- [ ] Validation : chaque ad nommé avant upload

#### B3. Copy ads (body copy + headlines)
- [ ] 2 body copies par angle préparées (voir SCRIPTS_BATCH01.md)
- [ ] 2 headlines par angle préparées
- [ ] CTA sélectionné : **"Jetzt kaufen"** (conversion) ou **"Mehr erfahren"** (trafic froid)
- [ ] URL destination avec UTM : `drinknellio.com/products/ultracalm?utm_source=meta&utm_medium=paid&utm_campaign=NLO_DE_SALES&utm_content=[NOM_AD]`

#### B4. Statiques (si prêts avant vidéos)
- [ ] STATIC-01 produit (Gedankenkarussell) — voir CANVA_PRODUCTION_SHEET.md
- [ ] STATIC-02 (Cortisol 3 Uhr) — recommandé en premier
- [ ] STATIC-03 (Skeptiker carousel 3 slides)

---

### PHASE C — STRUCTURE CAMPAGNE (voir MEDIA_PLAN_LANCEMENT.md)

#### C1. Campagne CBO
- [ ] Objectif : **Sales** (pas Traffic, pas Reach)
- [ ] Budget : €65/j CBO (réparti automatiquement entre adsets)
- [ ] Attribution : **7-day click + 1-day view** (standard)
- [ ] Calendrier : démarrer un **mardi ou mercredi matin** (éviter lundi = compétition bid)
- [ ] Nom campagne : **NLO_DE_SALES_CBO_[DATE]**

#### C2. Adsets (3 angles Marksman)
Pour chaque adset :
- [ ] Audience : Allemagne — 25-54 ans — tous genres
- [ ] Targeting : **Broad** (pas d'intérêts — algorithme 2025)
- [ ] Exclusions : clients existants (liste Custom Audience)
- [ ] Placement : **Advantage+ Placements** (Meta optimise seul)
- [ ] Nom adset : NLO_DE_[ANGLE]_BROAD_DE25-54

Angles Marksman :
- [ ] Adset #1 : NLO_DE_DURCHSCHLAFEN_BROAD_DE25-54
- [ ] Adset #2 : NLO_DE_GEDANKENKARUSSELL_BROAD_DE25-54
- [ ] Adset #3 : NLO_DE_SKEPTIKER_BROAD_DE25-54

#### C3. Ads (par adset)
- [ ] 3-4 créatifs par adset (mix vidéo + statique si disponibles)
- [ ] Vérifier aperçu : Mobile Feed, Stories, Reels
- [ ] Liens de destination : tous actifs (tester 1 clic avant lancement)
- [ ] Pixel associé à chaque ad ✓

---

### PHASE D — CONTRÔLES FINAUX (J-1 avant lancement)

#### D1. PDP drinknellio.com
- [ ] H1 → "Endlich wieder durchschlafen" (CRO_PDP_RECOMMENDATIONS.md P0)
- [ ] Badge KSM-66® visible dans ingrédients
- [ ] CTA bouton → bénéfice (pas "Warenkorb" générique)
- [ ] Garantie 45j visible above the fold
- [ ] Test achat complet (mobile) → Purchase event déclenché ✓
- [ ] Temps de chargement mobile < 3s (vérifier sur PageSpeed Insights)

#### D2. Tracking & Analytics
- [ ] Pixel Helper → vert sur : /, /products/ultracalm, /cart, /checkout, /thank-you
- [ ] UTM paramètres fonctionnels (tester lien → vérifier dans GA4 ou Shopify Analytics)
- [ ] Shopify Analytics → commande test visible
- [ ] Triple Whale ou autre attribution configuré (si applicable)

#### D3. Légal (OBLIGATOIRE pour marché DE)
- [ ] Impressum complet sur drinknellio.com (§ 5 TMG — obligatoire en DE)
- [ ] Datenschutzerklärung (DSGVO conforme — cookie consent + Meta Pixel mentionné)
- [ ] AGB (Allgemeine Geschäftsbedingungen) visibles
- [ ] Widerrufsrecht (droit de rétractation 14j) mentionné
- [ ] **Attention :** Claims santé sur les ads → éviter "heilt", "behandelt" → préférer "unterstützt", "kann helfen"

#### D4. Compte Meta — État avant lancement
- [ ] Aucune restriction publicitaire active sur le compte
- [ ] Politique publicitaire Meta : suppléments alimentaires = **autorisés** (pas de CBD, pas de médicaments)
- [ ] Check : les créatifs ne contiennent pas de before/after, pas de claims médicaux absolus
- [ ] Budget journalier total confirmé (€65/j = ~€1.950/mois — OK sur le compte de paiement)

---

### PHASE E — LANCEMENT & MONITORING (J0)

#### E1. Lancement
- [ ] Heure recommandée : **08h00–10h00 heure DE** (mardi ou mercredi)
- [ ] Vérifier que toutes les ads passent en "Active" (pas "In Review" bloquant)
- [ ] Si "In Review" > 24h → support Meta + vérifier policy

#### E2. Monitoring 72h (voir MEDIA_PLAN_LANCEMENT.md pour seuils)

**À vérifier toutes les 12h :**
| Métrique | Seuil STOP | Seuil SCALE |
|----------|-----------|-------------|
| CPM | >€25 → vérifier audience | Normal: €8-15 |
| CTR | <0.8% → créatif faible | >2% = excellent |
| CPC | >€2 → hook problème | <€1 = bon |
| ROAS | <1.0 après 48h → STOP adset | >2.5 après 72h → Scale |
| CPP (Cost/Purchase) | >€40 → réviser | <€20 = target |

**Actions automatiques recommandées :**
- [ ] Rule Meta : si dépense >€30 et 0 purchase → pause adset
- [ ] Rule Meta : si ROAS >3.5 → augmenter budget +30%

#### E3. Day 3 — Première décision Marksman
- [ ] Identifier l'angle winner (ROAS, CTR, CPP)
- [ ] Arrêter les 2 losers si data claire
- [ ] Passer en mode Sniper sur le winner (→ MEDIA_PLAN_LANCEMENT.md §Sniper)

---

## Résumé — Ce que Chef doit faire (dans l'ordre)

```
SEMAINE -2 (maintenant) :
  1. PDP : 3 changements P0 (H1 + KSM-66® badge + CTA) → 20 min
  2. Pixel : installer + vérifier 4 events → META_PIXEL_GUIDE.md
  3. Domaine : valider dans BM → META_PIXEL_GUIDE.md §5

SEMAINE -1 :
  4. Statiques : produire 3 visuels Canva → CANVA_PRODUCTION_SHEET.md
  5. BM : créer structure campagne (pas encore activer)
  6. Légal : vérifier Impressum + Datenschutz + AGB

J-1 :
  7. Test achat complet (mobile)
  8. Vérifier tous les liens UTM
  9. Confirmer budget disponible

J0 (mardi ou mercredi, 08h00) :
  10. Activer campagne
  11. Vérifier statut "Active" dans 2h
  12. Premier check metrics à midi

J+3 :
  13. Décision Marksman — winner ou pivot
```

---

*Livrable créé par Clawdbot Prime — 2026-03-01 | drinknellio.com*
