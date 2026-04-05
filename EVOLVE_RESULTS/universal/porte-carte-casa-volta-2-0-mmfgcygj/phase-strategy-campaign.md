# SETUP CAMPAGNE META — CasaVolta Wallet 2.0
> Méthode EVOLVE · Marché FR · Mars 2026

---

## PHASE MARKSMAN — OBJECTIF

**But :** Identifier l'angle gagnant parmi 3. Pas encore scaler.  
**Budget :** €65/jour (minimum viable pour data significative en FR)  
**Durée :** 72h minimum avant toute décision  
**Structure :** CBO exclusivement (algorithme Meta optimise l'allocation)

---

## STRUCTURE CAMPAGNE CBO MARKSMAN

```
CAMPAGNE : "CasaVolta_Marksman_Batch1" — CBO — €65/j
│
├── ADSET 1 — "Preuve_FR_HommesCibles" — Hommes 25-45 FR
│   ├── Ad 1a : Script S1 + BC1-A1 + H1 ("362 avis · 4,8/5 · Vérifiez")
│   └── Ad 1b : Script S1 + BC2-A1 + H3 ("Note réelle : 4,8/5")
│
├── ADSET 2 — "Cadeau_FR_Femmes" — Femmes 28-52 FR
│   ├── Ad 2a : Script S2 + BC1-A2 + H5 ("Le cadeau qu'il utilisera 10 ans")
│   └── Ad 2b : Script S2 + BC2-A2 + H6 ("Livraison avant [date]")
│
└── ADSET 3 — "Mecanisme_FR_EDC" — Hommes 22-40 FR
    ├── Ad 3a : Script S3 + BC1-A3 + H9 ("Portefeuille slim · 11 cartes · 12mm")
    └── Ad 3b : Script S3 + BC1-A3 + H11 ("7 cartes en 1 pression")
```

---

## CIBLAGE DÉTAILLÉ

### Adset 1 — Preuve / Solution-Aware
- **Genre :** Hommes
- **Âge :** 25-45 ans
- **Pays :** France
- **Intérêts :** Minimalisme, EDC (Every Day Carry), Accessoires mode homme, Productivity, Organisation personnelle
- **Comportements :** Acheteurs en ligne actifs, Appareils iOS/Android premium
- **Exclusions :** Clients existants CasaVolta
- **Placement :** Automatic (laisser Meta optimiser)
- **Landing :** /pages/casavolta-avis-verifies

### Adset 2 — Cadeau / Problem-Aware
- **Genre :** Femmes
- **Âge :** 28-52 ans
- **Pays :** France
- **Intérêts :** Idées cadeaux, Mode masculine, Shopping en ligne, Fête des pères, Anniversaire
- **Comportements :** Acheteurs fréquents en ligne
- **Landing :** /pages/cadeau-homme-wallet

### Adset 3 — Mécanisme / Product-Aware
- **Genre :** Hommes
- **Âge :** 22-40 ans
- **Pays :** France
- **Intérêts :** EDC, Gadgets, Tech accessories, Slim wallet, Ridge wallet, Ekster, Secrid
- **Comportements :** Tech early adopters
- **Landing :** /pages/casavolta-mecanisme

---

## CONFIGURATION CAMPAGNE

### Paramètres généraux
| Paramètre | Valeur |
|-----------|--------|
| Type de campagne | Ventes (Purchase) |
| Optimisation | Conversions (Purchase) |
| Attribution | 7j click + 1j view |
| Pixel | ✅ Actif sur toutes les pages |
| CBO | ✅ Budget campagne (pas adset) |
| Budget journalier | €65/j |
| Plage horaire | 24h (laisser Meta) |
| Enchères | Coût le plus bas (phase test) |

### Événements pixel à vérifier
- ✅ PageView → toutes les pages
- ✅ ViewContent → landing pages + PDP
- ✅ AddToCart → panier
- ✅ InitiateCheckout → checkout
- ✅ Purchase → confirmation commande (avec valeur dynamique)

---

## KPIs ET SEUILS DE DÉCISION

### Seuils Phase Marksman (72h)

| KPI | Couper | Maintenir | Scaler |
|-----|--------|-----------|--------|
| Hook Rate (2s view / impression) | < 20% | 20-35% | > 35% |
| Hold Rate (25% view / 2s view) | < 30% | 30-50% | > 50% |
| CTR (lien) | < 0.8% | 0.8-1.5% | > 1.5% |
| CPC | > €1.50 | €0.80-1.50 | < €0.80 |
| CPA (achat) | > €45 | €25-45 | < €25 |
| ROAS | < 1.2x | 1.2-2.0x | > 2.0x |
| CPM | > €30 | €15-30 | — |

### Règle de décision 72h
```
SI un adset a CPA < €25 ET ROAS > 2.0x → PASSER EN SNIPER sur cet angle
SI tous les adsets ont CPA > €45 → Changer les creatives (pas le ciblage)
SI Hook Rate < 20% sur tous → Changer les hooks en priorité
SI Hold Rate < 30% → Le hook fonctionne, le contenu ne suit pas
```

---

## PHASE SNIPER (post-Marksman)

Une fois l'angle winner identifié :

```
CAMPAGNE SNIPER : même angle, 3 variations
Budget : €130-200/j
Structure :
├── Adset unique (winner du Marksman)
│   ├── Variation V1 : Même angle, ton différent
│   ├── Variation V2 : Même angle, narrateur différent  
│   └── Variation V3 : Même angle, format différent (ex: static vs vidéo)
```

**Objectif Sniper :** Trouver la variation qui maximise le ROAS sur l'angle déjà validé.

---

## PHASE SCALE (post-Sniper)

Méthode **Surf Scaling** (EVOLVE) :

```
Semaine 1 : €65/j (Marksman)
Semaine 2 : €130/j si ROAS > 2.0x (×2)
Semaine 3 : €260/j si ROAS maintenu (×2)
Semaine 4 : €500/j si ROAS maintenu (×2)

RÈGLE : Ne jamais doubler si ROAS < 2.0x
RÈGLE : En cas de drop ROAS → revenir au palier précédent 48h
```

### Signaux de scale
- ✅ ROAS > 2.0x stable sur 3 jours consécutifs
- ✅ Fréquence < 2.5 (audience pas encore saturée)
- ✅ CPA stable (pas d'inflation)
- ✅ Stock suffisant pour absorber le volume

---

## RÈGLES AUTOMATIQUES META (Budget Protector)

```
RÈGLE 1 — Stop Loss Adset :
  SI CPA > €50 pendant 48h → DÉSACTIVER l'adset
  
RÈGLE 2 — Stop Loss Ad :
  SI dépense > €30 ET 0 achats → DÉSACTIVER l'ad

RÈGLE 3 — Escalation :
  SI ROAS > 2.5x pendant 3 jours → Augmenter budget de 20%
  
RÈGLE 4 — Fréquence Alert :
  SI Fréquence > 3.0 → Notifier pour renouveler les creatives
```

---

## CHECKLIST LANCEMENT

**Avant de lancer :**
- [ ] Pixel vérifié sur toutes les pages
- [ ] Événements Purchase testés (Meta Events Manager)
- [ ] 3 adsets configurés avec les bons ciblages
- [ ] 6 ads uploadées (2 par adset)
- [ ] Landings dédiées en ligne et testées sur mobile
- [ ] UTMs configurés (utm_source=meta&utm_medium=paid)
- [ ] CBO activé niveau campagne
- [ ] Budget journalier : €65

**Premier check :** 24h après le lancement
- Hook Rate de chaque ad
- CPM (si > €40 → problème de ciblage ou créatif rejeté)
- Pixel fires OK ?

---

## PLANNING MOIS 1

| Semaine | Action | Budget | Objectif |
|---------|--------|--------|----------|
| S1 (J1-7) | Lancement Marksman · 3 angles · 6 ads | €65/j = €455 | Identifier l'angle winner |
| S2 (J8-14) | Sniper sur angle winner · 3 variations | €65-130/j | Maximiser ROAS |
| S3-4 (J15-30) | Scale progressif si ROAS > 2.0x | €130-260/j | Augmenter volume |

**Budget total mois 1 estimé :** €1,500-3,000 selon performances

---
*Document généré : 2026-03-07*
