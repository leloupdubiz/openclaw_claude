# ROI & Breakeven Calculator — NLO_DE_SALES
> Clawdbot Prime ⚡ | Généré le 2026-03-02 | drinknellio.com

---

## 📊 HYPOTHÈSES DE BASE (à remplir par Chef)

| Paramètre | Valeur par défaut | Ta valeur |
|-----------|------------------|-----------|
| Prix de vente HT | €29.90 | _______ |
| COGS (coût produit + fulfillment) | €8.50 | _______ |
| Marge brute par commande | €21.40 | _______ |
| % marge brute | 71.6% | _______ |
| Budget Meta test (CBO) | €65/j | _______ |
| Durée test Marksman | 72h (3j) | _______ |
| Budget test total | €195 | _______ |

---

## 🎯 BREAKEVEN ROAS

```
Breakeven ROAS = Prix de vente / Marge brute par commande
             = €29.90 / €21.40
             = 1.40

→ Si ROAS > 1.40 : tu es rentable (couvre COGS + ad spend)
→ Si ROAS > 2.00 : marge nette solide pour scaler
→ Si ROAS > 3.00 : winner confirmé → Scale agressif
```

**Règle simple :** Chaque €1 dépensé en Meta doit rapporter €1.40 minimum en CA.

---

## 📈 SCÉNARIOS ROAS — 3 cas

### Budget journalier : €65/j

| Scénario | ROAS | CA/j | Commandes/j | Profit/j | Profit/30j |
|----------|------|------|-------------|----------|------------|
| 🔴 Pessimiste | 1.0 | €65 | 2.2 | **-€19.90** | -€597 |
| 🟡 Breakeven | 1.4 | €91 | 3.0 | **€0** | €0 |
| 🟢 Cible Marksman | 1.8 | €117 | 3.9 | **+€26.10** | +€783 |
| 🚀 Winner | 2.5 | €162.50 | 5.4 | **+€71.90** | +€2,157 |
| ⚡ Champion | 3.5 | €227.50 | 7.6 | **+€136.90** | +€4,107 |

> **Calcul profit/j :** (CA × marge%) - budget Meta
> Exemple ROAS 2.5 : (€162.50 × 71.6%) - €65 = €116.35 - €65 = **€51.35** 
> *(Note : profit net après COGS mais avant frais fixes opérationnels)*

### Budget scaler : €200/j (si winner confirmé)

| Scénario | ROAS | CA/j | Profit/j | Profit/30j |
|----------|------|------|----------|------------|
| 🟢 Winner maintenu | 2.5 | €500 | **+€158** | +€4,740 |
| ⚡ Champion | 3.0 | €600 | **+€229** | +€6,870 |
| 🏆 Scale max | 3.5 | €700 | **+€301** | +€9,030 |

### Budget scale agressif : €500/j (champion identifié)

| Scénario | ROAS | CA/j | Profit/j | Profit/30j |
|----------|------|------|----------|------------|
| ⚡ Champion | 3.0 | €1,500 | **+€574** | +€17,220 |
| 🏆 Scale max | 3.5 | €1,750 | **+€752** | +€22,560 |

---

## 🧮 CALCUL ROAS EN TEMPS RÉEL

```
ROAS = CA généré / Budget Meta dépensé

Exemple :
- Budget dépensé en 72h : €195
- CA attribué Meta (avec -30% iOS underreporting) : €312
- ROAS apparent : 1.6

Correction iOS14 (+30%) :
- ROAS réel estimé : 1.6 × 1.30 = 2.08 ✅ Winner potentiel
```

**⚠️ Important :** Meta sous-reporte ~20-30% des conversions (iOS14). 
→ Si ROAS Meta = 1.5, **ROAS réel estimé = 1.95-2.00**

---

## 💰 SIMULATION TEST MARKSMAN (72h — €195 total)

| Seuil de décision | Condition | Action |
|-------------------|-----------|--------|
| ✅ **CONTINUE → SNIPER** | ROAS >1.8 sur l'angle le plus fort | Couper les 2 losers, doubler le winner |
| ⚠️ **OPTIMISE** | ROAS 1.4-1.8 | Itérer hooks/copy du meilleur adset |
| 🔴 **STOP** | ROAS <1.0 après 48h | Couper immédiatement, réviser avatars |
| 📊 **ATTENDRE** | ROAS instable J+1 | Ne pas toucher, data insuffisante |

---

## 📊 CPP (COÛT PAR PURCHASE) CIBLES

```
CPP Cible Rentable = Prix de vente / Breakeven ROAS
                   = €29.90 / 1.40
                   = €21.36

CPP Cible Profitable = Prix de vente / ROAS Cible (2.5)
                     = €29.90 / 2.50
                     = €11.96
```

| Objectif | CPP Max | Interprétation |
|----------|---------|----------------|
| Breakeven | €21.36 | Couvre COGS, 0 profit |
| Rentable | €16.61 | ROAS 1.8 — profit modeste |
| **Cible test** | **€11.96** | ROAS 2.5 — go scale |
| Champion | €8.54 | ROAS 3.5 — scale agressif |

---

## 📅 PLANNING BUDGET MENSUEL (3 phases)

### Phase 1 — Marksman (Semaine 1-2) : €390 total
```
J1-J3 : €65/j × 3 = €195 (test 3 angles)
J4-J7 : €65/j × 4 = €260 (double le winner)
Total : ~€390 sur 7j
ROI attendu si ROAS 2.0 : €780 CA → +€168 profit net
```

### Phase 2 — Sniper (Semaine 2-3) : €910 total
```
J8-J14 : €130/j × 7 = €910 (focus angle winner)
Total : ~€910 sur 7j
ROI attendu si ROAS 2.5 : €2,275 CA → +€718 profit net
```

### Phase 3 — Scale (Semaine 3-4) : €2,800 total
```
J15-J21 : €200/j × 7 = €1,400 
J22-J28 : €200/j × 7 = €1,400
Total : ~€2,800 sur 14j
ROI attendu si ROAS 2.5 : €7,000 CA → +€2,212 profit net
```

**Budget test total M1 : ~€4,100 → CA attendu : ~€10,055 → Profit net estimé : ~€3,098**

*(Basé sur ROAS moyen 2.5 et marge 71.6% — exclut frais fixes, remboursements ~5%, Shopify fees)*

---

## 🔄 SEUILS D'ESCALADE BUDGET

| Signal | Condition | Action budget |
|--------|-----------|---------------|
| Augmenter +20% | ROAS >2.5 pendant 48h consécutives | Passer €65 → €78 |
| Augmenter +50% | ROAS >3.0 stable 4j | Passer à palier supérieur |
| Doubler | ROAS >3.5 sur 7j | Scale agressif |
| Maintenir | ROAS 2.0-2.5 stable | Ne rien toucher |
| Réduire -30% | ROAS <1.8 sur 48h | Optimiser avant de couper |
| Couper | ROAS <1.0 après 48h | Stop immédiat |

**Règle d'or :** Ne jamais modifier le budget d'une campagne active de plus de 20% par jour (signal algorithme Meta).

---

## 🎯 OBJECTIFS FINANCIERS Q2 2026

| Métrique | M1 (Mars) | M2 (Avril) | M3 (Mai) |
|---------|-----------|-----------|---------|
| Budget Meta | €4,100 | €8,000 | €15,000 |
| ROAS cible | 2.0 | 2.5 | 3.0 |
| CA cible | €8,200 | €20,000 | €45,000 |
| Profit net cible | €1,752 | €6,320 | €18,600 |
| Commandes | 274 | 669 | 1,505 |

---

## 📋 CHECKLIST FINANCIÈRE AVANT LANCEMENT

- [ ] Calculer ton COGS réel (produit + packaging + fulfilment + shipping DE)
- [ ] Vérifier le prix de vente HT actuel sur drinknellio.com
- [ ] Confirmer la marge brute réelle → recalculer breakeven ROAS
- [ ] Définir ton "max CPP acceptable" avant de lancer
- [ ] Configurer la règle Stop-Loss ROAS <0.8 dans Meta (voir META_AUTOMATION_RULES_DE.md)
- [ ] Budget test M1 disponible et validé (recommandé : minimum €500 pour signal valide)

---

*Fichier : EVOLVE_RESULTS/ROI_BREAKEVEN_CALCULATOR.md*
*Utilisé avec : MEDIA_PLAN_LANCEMENT.md · META_AUTOMATION_RULES_DE.md · AB_TEST_HYPOTHESIS_PACK.md*
