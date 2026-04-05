# 03. Key Metrics For CRO

## Concept Central
**Shopify Score = diagnostic store health** — Multiplication simple (Conversion Rate × AOV) qui révèle si le problème est le produit/prix (0-100), l'optimisation site (100-250), la scalabilité (250-400), ou purement l'ad spend (400+). Métrique unique pour guider la stratégie CRO.

## Points Clés

### Définitions Core
- **CVR** (Conversion Rate) : % de visiteurs qui achètent
- **AOV** (Average Order Value) : € moyen par commande
- **RPS** (Revenue Per Session) : fonction de CVR × AOV
- **Shopify Score** : CVR (%) × AOV (€) = diagnostic santé

### Shopify Score Ranges
| Score | Diagnostic | Action Prioritaire |
|-------|-----------|-------------------|
| **0-100** | Produit/prix/traffic cassé | Fix produit OU enlever traffic bot |
| **100-250** | "Ça marche mais faiblement" | Optimiser pages + pricing |
| **250-400** | "Zone verte" | Scaler ads + continuer optimiser |
| **400+** | "Store génère énormément" | Focus uniquement ads (supply bottleneck) |

### Exemples
- 1% CVR × $50 AOV = 50 (problème majeur)
- 2% CVR × $100 AOV = 200 (correct, optimisable)
- 1% CVR × $250 AOV = 250 (scaling zone)
- 4.23% CVR × $152 AOV = 643 (scale hard, client passé de 75K → 220K en 45j)

### Add-to-Cart Ratio (métrique secondaire)
- **4:1+** : trop haut = problème funnel checkout / shipping / upsells
- **3:1** : range idéal
- **2:1** : "elite" = gens ajoutent ET achètent vraiment
- **Note** : ratio haut ≠ bonne conversion (trafic bas-qualité)

### ROAS Equation
**ROAS = CTR × CVR × AOV**

Pour lever ROAS : augmenter 2 des 3 (priorité = CVR + AOV)

### Insights Marge vs Score
- Hautes marges (70-85%) → scores souvent bas (prix élevé = CV bas)
- Marges moderées (50-55%) → scores plus hauts
- Sweet spot = balance prix attractive + marge saine

## Applications drinknellio.com

### Nellio Current State (hypothèse)
Supposons au lancement :
- **CVR** : 1.5% (nouveau produit, peu traffic)
- **AOV** : €28.50 (single pack)
- **Shopify Score** : 42 (problématique!)
- **Diagnostic** : product communication faible OU traffic bot-heavy

### Phase CRO Targets
- **Phase 1** : Score 150 (CVR 2.5%, AOV €28)
  - Tester headlines : "Dormir sans dépendre" vs "Anxiety relief naturel"
  - Clarifier hero image + produit
- **Phase 2** : Score 250 (CVR 3.5%, AOV €35)
  - AOV lift = bundler (2-pack à €50) 
  - Scaler ads quand score > 250
- **Phase 3** : Score 400+ (CVR 4%, AOV €100)
  - Subscription + upsells
  - Full ad spend scaling

### Monitoring
- Nellio dashboard : Shopify → Analytics → Conversion rate + AOV
- Weekly tracking : ploter score evolution vs ad spend
- Rule : si score reste < 150 après 2 semaines → pivot product/messaging

## Citation
> "Les trois métriques qui comptent : conversion rate et average order value. Si tu augmentes ces deux-là, tu augmentes ton ROAS. C'est le goal du program : te montrer exactement comment le faire."

---
