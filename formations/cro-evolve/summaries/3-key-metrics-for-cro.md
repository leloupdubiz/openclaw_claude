# Métriques Clés pour CRO — Diagnostic de Santé Store

**Concept Central:** Trois chiffres résument la santé d'un e-commerce : Conversion Rate (%), Average Order Value (€), et l'agrégat "Shopify Score". Ces 3 métriques dictent où concentrer l'effort (CRO site vs ad scaling).

## Points Clés

### Définitions Fondamentales
- **CVR / Conversion Rate** = (Sessions with conversion / Total sessions) × 100. Ex: 2% = 2 achats par 100 visiteurs.
- **AOV / Average Order Value** = Revenue / Orders. Ex: €100 AOV = client moyen dépense 100€.
- **RPS / Revenue Per Session** = (CVR × AOV). Fonction directe des deux. Ex: 2% × €100 = €2 par session.
- **Shopify Score** = CVR × AOV. Diagnostic métrique clé.

### Shopify Score Bandings

| Score | Range | Signal | Action |
|-------|-------|--------|--------|
| **0-100** | 1% CVR × €50 AOV | Produit ne communique pas la valeur OU traffic bot/low-intent | Fix product, pricing, traffic source |
| **100-250** | Quelques % CVR × AOV | On convert, mais pas assez pour scale | Focus CRO site : landing page, PDP, checkout |
| **250-400** | ~1% × €250 OU ~5% × €50 | Sweet spot | Scale ads + continue CRO site |
| **400+** | 4%+ CVR × €150+ AOV | Elite. Store handles traffic very well | Focus sur ads scaling, créatif, volume |

- **Exemple concret du transcript:** Client avec 4.23% CVR + €152 AOV = Score 643. À 75K/mo, escalade ads massively → 220K/mo en 45 jours (focus ads, pas site).

### Add-to-Cart Ratio (métrique secondaire)
- Idéal = **2:1** (2 add-to-carts par 1 conversion). Signale intérêt client vraiment fort.
- Acceptable = **3:1**
- Red flag = **4:1+** (clients ajoutent mais n'achètent pas → friction checkout, shipping cost shock, etc)

### ROAS Equation

**ROAS** = Conversion Rate × AOV × CTR (click-through-rate)

Les deux principaux leviers = **CVR** et **AOV** (CTR dépend surtout du creative/copy).
- Great ads → boost CTR + CVR
- Great pages → boost CVR + AOV

### Marge vs Conversion Rate Trade-off

- **Haute marge (70-85%)** = pricing élevé = typically conversion rate plus basse.
- **Marge normale (50-55%)** = pricing agressif = conversion rate potentiellement plus haute.
- **Optimum:** trouver le sweet spot entre marge + conversion. Une marge de 96% avec 0.5% CVR = perte d'échelle.

## Insights

**Shopify Score = diagnostic instantané.** Sans autres data, ce chiffre seul dit exact où dépenser son énergie.

Les métriques ne sont pas atomiques. Augmenter AOV sans killing CVR = 2x profit. Mais testing de pricing agressif can tank CVR temporairement.

**Beaucoup confondent "high traffic" avec "traffic quality."** Un score 50 avec 100k sessions ≠ plus bon qu'un score 300 avec 10k sessions.

## Applications à drinknellio.com

### Nellio Current State (hypothétique, à valider)
Supposons actuellement sur drinknellio.com :
- CVR ~ 1.5% (average pour supplement DTC allemand)
- AOV ~ €45 (une boîte Nellio + upsell faible)
- **Shopify Score = 67** → **Zone 0-100 = RED**

**Action immédiate :**
1. **Product/Pricing:** Nellio est-il sous-priced ? (€29 vs competitors €25-40 ?) Ou la proposition de valeur n'est pas clear sur la page ?
2. **Traffic quality:** Est-on envoyer du bot/spam traffic ? Vérifier sources Meta Ads exactes.
3. **Page health:** Landing page communique-t-elle les bénéfices clairement ? 4.8/5 stars + 20k reviews = visible ? 45-day money-back = prominent ?

### Target State (Phase EVOLVE outcome)
Après Phase 3-4 EVOLVE avec messaging correct + page CRO:
- CVR → **2.5%** (meilleure targeting + message clarity)
- AOV → **€65** (bundle offer : Nellio + Sleep Kit, ou 3-month subscription discount)
- **Shopify Score = 162** → **Zone 100-250 = faire de la CRO aggressif**

### Stratégie par Zone

**Si Score < 250 (Nellio now):** 
- Pause la scaling d'ads
- Focus : Landing page redesign (EVOLVE Phase 3), pricing test, Foreplay ad spy

**Si Score 250-400 (after EVOLVE):**
- Continuer CRO (headline split test, hero image, social proof placement)
- Lancer le scale graduel des ads Meta

**Si Score 400+ (holy grail):**
- Scale ads hard
- Focus sur creative production (hooks, scripts, UGC)
- Minimiser site CRO work

## Citation Clé

> "If you are 400+, you need to focus on scaling ads hard. Your store is handling traffic incredibly well. This brand with 4% CVR, $150 AOV was doing 75K/month. We focused on ads and scaled to 220K/month in 45 days—because we knew the ads were the only problem."

**Type:** Diagnostic métrique | **Phase EVOLVE:** 1-2 (Research & Strategy)