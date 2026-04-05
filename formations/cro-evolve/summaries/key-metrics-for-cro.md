# Key Metrics for CRO — Résumé CRO

**Concept Central**  
Trois métriques dominent la CRO : Conversion Rate (CR), Average Order Value (AOV), et Revenue Per Session (RPS). En comprendre les inter-relations et savoir diagnostiquer les problèmes via le "Shopify Score" transforme votre capacité de scaling.

---

## Points Clés

### 1. Définitions Essentielles

| Métrique | Calcul | Signification |
|----------|--------|--------------|
| **CVR / CR** | Sessions converties / Total sessions | Pourcentage du trafic qui achète |
| **AOV** | Revenue totale / Nombre commandes | Panier moyen en € |
| **RPS** | Revenue totale / Sessions | Revenue par visiteur (CR × AOV) |

### 2. Shopify Score (Core Diagnostic)

**Formula** : Conversion Rate (%) × AOV (€) = Shopify Score

**Interprétation** :
- **0–100** : Produit ne communique pas la valeur, traffic de qualité douteuse, ou pricing cassé → FIX PRODUCT/TRAFFIC
- **100–250** : Baseline viable, mais conversion/AOV trop faible pour scaler → OPTIMIZE PAGES
- **250–400** : Excellent — ready to scale ads, pages performent bien → SCALE ADS HARD
- **400+** : Elite performance — tout fonctionne, focus uniquement sur volume trafic → CREATE BETTER ADS

**Exemple concret** :
- Client à 4.23% CR × $152 AOV = Shopify Score ~644 → Scaled de $75K à $220K/mois en 45j (ads seuls)

### 3. Add-to-Cart Ratio (Métrique secondaire)

- **Ideal** : 2:1 (pour 1 conversion, 3 ATCs)
- **Acceptable** : 3:1 ou mieux
- **Red flag** : 4:1 ou pire (beaucoup de ATCs, peu de conversions = checkout friction)
- **Action** : Si ATCs élevés + CR basse → investiguer shipping costs, upsells trop agressifs, ou form complexity

### 4. Return on Ad Spend (ROAS) — Formula complète

**ROAS = CR × AOV × CTR**

Pour l'améliorer, focus sur **2 des 3** :
- CR (great pages)
- AOV (upsells, product positioning)
- CTR (great ads)

### 5. Marges vs. Shopify Score (Trade-off)

- **Haute marge (70-85%)** → Shopify Score tend à baisser (moins d'espace pricing)
- **Marge modérée (50-55%)** → Shopify Score tend à être plus élevé (pricing flexible)
- **Solutions** :
  - Testez le prix (repricing tests)
  - Augmentez perceived value (copy, social proof, testimonials)
  - Optimisez features communication

---

## Insights

- **Shopify Score** = le diagnostic le plus utile (1 chiffre = toute la stratégie)
- Scaling ads sans optimiser les pages = gaspillage garanti
- AOV > CR pour la scalabilité (CR drop en montée de volume ; AOV reste stable)
- "Add to cart ratio" = détecteur de friction hidden

---

## Applications pour Nellio UltraCalm

| Métrique | Current (Hypothétique) | Target | Action |
|----------|----------------------|--------|--------|
| **CR** | À mesurer | 2-3% | Baseline page optimization |
| **AOV** | €39.99 (supposé) | €50-60 | Upsell (2nd pack, shipping bundle) |
| **Shopify Score** | À calculer | 250+ | Determine scaling threshold |
| **ATCs** | À mesurer | <3:1 | Monitor checkout flow |

**Priorité immédiate** : 
1. Installer pixel Meta/GA4 (mesurer CR)
2. Calculer Shopify Score actuel
3. Identifier si limité par product/price/traffic (voir 0-100 range)
4. Itérer sur pages avant scaling ads

---

## Citation

> "The goal is to increase conversion rate and average order value with all the things that I'm about to show you, but when you increase conversion rate and average order value, that allows you to scale further."

*CR + AOV = leviers de scalabilité ; mais CR baisse en volume → AOV stabilité = clé.*

---

**Statut** : 🔴 **Critique pour Nellio** — Calcul Shopify Score urgent avant Phase 4 (Campaign Builder)
