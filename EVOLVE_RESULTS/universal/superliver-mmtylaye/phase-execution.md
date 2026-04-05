# CAMPAIGN BUILDER - SuperLiver
## Produit: Complément hépatique | Budget: 500€ | Marchés: FR, DE

---

## 1️⃣ STRUCTURE CAMPAGNE CBO (Campaign Budget Optimization)

### Architecture Recommandée:
```
📊 CAMPAGNE PRINCIPALE
├─ Budget: 500€/jour (CBO activé)
├─ Objectif: Conversions (Lead capture/Vente)
├─ Fenêtre attribut: 7 jours
└─ 4 ADSETS (répartition 80/20)
    ├─ ADSET 1: Cold Audience - Intérêts santé (40%)
    ├─ ADSET 2: Cold Audience - Lookaliked (25%)
    ├─ ADSET 3: Interest+Behaviors (20%)
    └─ ADSET 4: Warm Audience (15%)
```

### Budget Distribution Jour 1-7:
| Adset | % Budget | Montant | Cible |
|-------|----------|---------|-------|
| **Intérêts Santé** | 40% | 200€ | 18-65 ans FR/DE |
| **Lookalike 1%** | 25% | 125€ | Basé conversions site |
| **Interests + Behaviors** | 20% | 100€ | Acheteurs supplements |
| **Warm (Website retargeting)** | 15% | 75€ | Visiteurs 30j |

---

## 2️⃣ AUDIENCES DÉTAILLÉES (MARCHÉ FR)

### 🔵 ADSET 1: COLD - INTÉRÊTS SANTÉ
**Taille audience:** 180K-250K | **CPC estimé:** 0.80-1.20€

**Intérêts principaux:**
- "Santé naturelle" + "Compléments alimentaires" 
- "Détox hépatique" + "Foie santé"
- "Naturothérapie" + "Médecine holistique"
- "Wellness" + "Nutrition"

**Exclusions:**
- Intérêts pharmacie conventionnelle
- Audiences concurrentes (hépatodetox, etc.)

---

### 🟢 ADSET 2: COLD - LOOKALIKE 1%
**Base:** Conversions site 90j (si >100) OU newsletter emails (si >5K)
**Taille:** 80K-120K par marché | **Performance:** +15-25% vs cold

**Variantes si données limitées:**
- Lookalike 1-2% depuis visiteurs site (web retargeting)
- Lookalike depuis email engagés

---

### 🟡 ADSET 3: INTÉRÊTS + BEHAVIORS
**Taille audience:** 120K-180K | **Précision:** Moyenne-Haute

**Combinaison:**
- Intérêts: "Santé" + "Wellness"
- Behaviors: "Acheteurs suppléments" + "Intéressés santé"
- Age: 35-65 ans (sweet spot compléments)
- Langue: Français OU Allemand

---

### 🔴 ADSET 4: WARM - RETARGETING SITE
**Audience:** Website visitors 30 derniers jours
**Segments:**
- Tous visiteurs (panier moyen)
- Visiteurs page produit (intention élevée)
- Visiteurs panier abandonné (+conversion)

---

## 3️⃣ RÈGLES AUTOMATIQUES FACEBOOK ADS

### 📌 STOP-LOSS (Pauser immédiatement)

| Condition | Délai | Action |
|-----------|-------|--------|
| **Hook Rate < 10%** | 24h | ⏸️ Pauser adset |
| **CPA > 25€** | 48h | ⏸️ Pauser adset |
| **ROAS < 0.6x** | 72h | ❌ Supprimer adset |
| **CPR > 2.50€** | 36h | ⏸️ Pauser adset |

### 📈 SCALE (Augmenter budget)

| Condition | Délai | Action |
|-----------|-------|--------|
| **ROAS > 1.8x** | 48h | ⬆️ +25% budget |
| **CPA < 12€ + 50+ conv.** | 72h | ⬆️ +40% budget |
| **Hook Rate > 35%** | 36h | ⬆️ +15% budget |

### 💰 BUDGET CAP & CONTRÔLE

```
☝️ Limites quotidiennes:
  • Max par Adset: 150€/jour (pour éviter waste)
  • Min: 20€/jour (données suffisantes)
  • Spend daily: ±10% tolérance
  • Check: 2x/jour (8h + 20h)
```

---

## 4️⃣ KPIs DÉCISION 72H

### TABLEAU DE DÉCISION MAÎTRE

| **Métrique** | **Seuil Winner** | **Seuil Loser** | **Action** |
|---|---|---|---|
| **Hook Rate (%)** | >32% | <12% | ⬆️ Garder / ❌ Couper |
| **Hold Rate (%)** | >28% | <10% | ⬆️ Scaler / ❌ Pauser |
| **CPA (€)** | <10€ | >20€ | ⬆️ +50% budget / ❌ Stop |
| **CPR (€)** | <1.80€ | >3.00€ | ⬆️ Monter bid / ⏸️ Pause |
| **ROAS** | >1.8x | <0.7x | ⬆️ +40% / ❌ Couper |
| **CTR (%)** | >1.5% | <0.6% | ⬆️ Garder / ❌ Revoir créa |
| **Conversion Rate** | >4% | <1.5% | ⬆️ Scaler / ❌ Test nouvelle copy |

### Scoring Adset Jour 3:
```
✅ SUPER WINNER: ROAS >1.8 + CPA <10€ 
   → Augmenter 50% du budget jour 4

⚠️ NEUTRAL: ROAS 1.2-1.5 + CPA 12-15€
   → Maintenir, revoir creatives jour 5

❌ LOSER: ROAS <0.8 OU CPA >20€
   → Pauser immédiatement
```

---

## 5️⃣ PLANNING LANCEMENT

### 📅 TIMELINE JOUR-PAR-JOUR

#### **J-3 (Préparation)**
- [ ] Account audit (pixels, events, conversions)
- [ ] Segments audiences finalisés (tailles validées)
- [ ] 3-4 creatives prêtes (format mobile 1200×628 + 1080×1350)
- [ ] Landing page testée (mobile optimisé, 72h conversion window)
- [ ] Règles automatiques programmées
- [ ] Dashboard monitoring préparé

---

#### **J0 (LANCEMENT)**
```
🚀 09:00 → Campagne LIVE
├─ 4 Adsets lancés simultanément
├─ Budget: 500€ réparti
├─ Tracking: Pixel + UTM params
├─ Notification alerts activées
│
📊 10:00 → Check initial
├─ Delivery OK? (pas de policy issues)
├─ Click volume détectable?
├─ CTR >0.5% en 1h?
│
19:00 → First Daily Report
├─ Impressions: >5K?
├─ CPC: <1.50€?
├─ Note: Documenter performances
```

---

#### **J+1 à J+3 (OBSERVATION)**
| Heure | Action | Seuil |
|-------|--------|-------|
| **08h** | Check delivery + CPA trend | Hook >15%? |
| **14h** | Analyze adset performance | ROAS trend |
| **20h** | Document daily spend | Budget tracking |
| **J+3 23h** | **DÉCISION CRITIQUE** | Winners/Losers scoring |

**Décisions J+3:**
- ✅ Winner: +25-50% budget J+4
- ⚠️ Neutral: Rotation creative J+5
- ❌ Loser: Pauser immédiatement

---

#### **J+7 (REVIEW HEBDO)**
```
📈 ANALYSIS DEEP-DIVE:
├─ Total Spend: ~3,500€
├─ Conversions: X (CPA = 3,500/X)
├─ ROAS Global: ?
├─ Best Adset: ? (scaler à 250€/jour)
├─ Worst Adset: ❌ (couper complètement)
├─ New Creative: Tester variante texte
└─ Next Week: Scale winners + test DE
```

---

#### **J+14 (SCALING & EXPANSION)**
**Si ROAS > 1.3:**
```
🎯 SCALE STRATEGY:
├─ Budget: 500€ → 750€/jour
├─ Adsets: Dupliquer winners
├─ Lookalikes: Créer 2% + 3%
├─ Expansion DE: Lancer marché allemand (200€/jour)
└─ Retargeting: Activer upsell campaign
```

**Si ROAS 0.8-1.3:**
```
⚙️ OPTIMIZATION:
├─ Test 3 creatives nouvelles
├─ Revoir copy (landing page)
├─ Affiner audiences (±5ans)
├─ Budget: Stable 500€
└─ Retest: 7 jours
```

**Si ROAS < 0.8:**
```
🛑 PAUSE & DIAGNOSTIC:
├─ Analyser: Pixel tracking OK?
├─ Product-market fit: OK?
├─ Landing page: Conversion issue?
├─ Budget: Réduire à 250€ test
└─ Action: Revoir offer + creatives
```

---

## 📊 DASHBOARD MONITORING QUOTIDIEN

**Metrics à tracker en temps réel:**
```
KPI Temps Réel (Matin 08h)
├─ Budget dépensé: ___€
├─ Impressions: ___ (cible: >4K)
├─ Clicks: ___ (CTR: _%)
├─ CPC: ___€
├─ Hook Rate: __% 
└─ Leads/Conv: ___ (CPA: ___€)

KPI Décision (Soir 20h)
├─ Spend vs Budget: ±10%?
├─ ROAS Trend: ↗/→/↘
├─ Best Adset: ___
├─ CPR Leaders: ___
└─ Action demain: [PAUSER/SCALER/HOLD]
```

---

## 🎯 OBJECTIFS CIBLES J+7

| Métrique | Target | Réaliste |
|----------|--------|----------|
| **Conversions** | 150-200 | Coût: 25-30€ |
| **ROAS Global** | >1.2x | Break-even + profit test |
| **Adset % Paused** | <30% | 1-2 adsets max |
| **CPR Moyen** | <2.00€ | Viabilité court-terme |
| **Cost/Lead** | <15€ | Budget efficient |

---

## ⚠️ RISQUES & CONTINGENCY

| Risque | Signal | Plan B |
|--------|--------|--------|
| Policy rejection | Ad paused J0 | Landing page review + resubmit |
| Hook rate très bas (<8%) | Audience pas intéressée | Switcher intérêts jour 2 |
| Pixel tracking failures | 0 conversions tracées | Vérifier event setup + API |
| Budget burn sans conversions | Spend >200€ + 0 conv. | Pauser tout, diagnostiquer |

---

**Prêt à lancer? Confirmez:**
- ✅ Creatives finalisées?
- ✅ Pixel Super Pixel installé?
- ✅ Landing page convertit?
- ✅ Budget approuvé 500€/jour?