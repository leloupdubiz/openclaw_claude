# Triple Whale Clone — Analyse Complète & Plan de Build
> Analysé le 2026-03-04 | Source : app.triplewhale.com (session live Chef) + site public

---

## 1. ARCHITECTURE FONCTIONNELLE COMPLÈTE

### Navigation principale
```
├── Moby (AI Chat Assistant)
├── Summary Dashboard ← PAGE CENTRALE
├── Favorites
├── Core Workspaces
│   ├── Marketing Acquisition
│   ├── Creative Analysis
│   ├── Website Conversion
│   ├── Customer Retention
│   └── Discovery
├── Custom Workspaces (drag & drop)
├── Data (sources de données)
└── Settings
```

---

## 2. FEATURES PAR MODULE

### 📊 Summary Dashboard
**Sections :**
- **Date Picker** : Today / Yesterday / Last 7d / Last 30d / Custom + "Previous period" toggle
- **Pins** (métriques drag & drop configurables) :
  - ROAS, Total Sales, Ads Spend, COGS, Shipping, Payment Gateways
  - Chaque metric : valeur actuelle + % trend vs période précédente + sparkline
- **Custom Metrics** : Net Profit, Net Margin (formules custom)
- **Attribution Table** :
  - Modèles : First Click / Last Click / Linear / Time Decay / Data-Driven
  - Fenêtres : Lifetime / 1d / 7d / 28d
  - Type : Event / View
  - Colonnes : Source, Budget, Spend, CV (conversions), ROAS, Clicks, Impressions, CTR, CPM, CPA, ROAS (TW), NC ROAS, Purchases, NCP, NCV, NC CPA, Discount codes, Links, Spend
  - Sources : Meta, Klaviyo, Google Ads + "Add more sources"
- **Web Analytics** :
  - CVR, Users, Sessions, Pages/Session, Session Duration, Bounce Rate
  - New Users, New Users%, Sessions with Add to Cart, Add to Cart%, Cost per Add to Cart, Cost per Session
- **Store** : Orders, True AOV, Returns
- **Meta Ads** : Breakdown spend + ROAS par ad channel

### 🎯 Marketing Acquisition
- Performance par canal (Meta, Google, TikTok, Klaviyo...)
- Drill-down campagne → adset → ad
- Budget vs Spend
- ROAS, CPA, NC ROAS (New Customer)

### 🎨 Creative Analysis (Creative Cockpit)
- Performance par créatif (vidéo/image)
- Hook Rate, Hold Rate, CTR, CVR par créatif
- Thumbnail preview des ads
- Tri par ROAS, Spend, CVR
- Tag créatifs (format, angle, script)

### 🌐 Website Conversion
- Funnel de conversion (Sessions → Add to Cart → Checkout → Achat)
- Heatmaps / comportement page
- CVR par page produit
- A/B test results

### 👥 Customer Retention
- Cohort analysis (rétention par mois d'acquisition)
- LTV curves
- Repeat purchase rate
- Segmentation RFM
- Churn prediction

### 🔍 Discovery
- Insights automatiques ("Your ROAS dropped 20% vs last week")
- Anomaly detection
- Recommandations actionnables

### 🤖 Moby (AI Assistant)
- Chat interface : "What was my ROAS last week vs this week?"
- Create an Agent : automation de reporting
- Build a Report : rapport auto sur une période
- Generate Creatives : brief créatif AI

### 🔌 Intégrations (60+)
- Shopify (commandes, produits, clients)
- Meta Ads (campagnes, adsets, ads, créatifs)
- Google Ads
- Klaviyo (email revenue)
- TikTok Ads, Pinterest Ads
- WooCommerce, BigCommerce
- Northbeam, Rockerbox (attribution alternative)
- Triple Pixel (pixel first-party propriétaire)

---

## 3. DATA MODEL (reverse-engineered)

### Core entities
```
Shop { id, name, shopify_domain, currency, timezone }
Order { id, shop_id, total, created_at, customer_id, source_channel, discount_code }
Customer { id, shop_id, email, ltv, order_count, first_order_date, last_order_date }
AdChannel { id, shop_id, platform, account_id }
Campaign { id, channel_id, name, status, budget, spend, impressions, clicks, conversions, roas }
AdSet { id, campaign_id, name, ... }
Ad { id, adset_id, name, creative_url, hook_rate, hold_rate, ctr, cvr, roas }
WebSession { id, shop_id, user_id, source, medium, campaign, pages, duration, converted }
Attribution { order_id, ad_id, model, weight, revenue }
```

### Métriques calculées
```
ROAS = Revenue / Ad Spend
NC ROAS = New Customer Revenue / Ad Spend
True AOV = Total Revenue / Orders
Net Profit = Revenue - COGS - Ad Spend - Shipping - Payment Fees
Net Margin = Net Profit / Revenue
CVR = Orders / Sessions
CPA = Ad Spend / Conversions
LTV(90d) = Avg Order Value × Avg Frequency (90j)
```

---

## 4. STACK TECHNIQUE (Triple Whale)

Reverse-engineered :
- **Frontend** : React (Next.js probable) + recharts/D3 pour les graphes
- **Backend** : Node.js / microservices
- **Data** : ClickHouse ou BigQuery (analytics at scale)
- **Real-time** : WebSockets pour les updates live
- **Auth** : OAuth (Shopify) + JWT
- **Pixel** : JS first-party + server-side events

---

## 5. PLAN DE BUILD — NOTRE VERSION

### Stack recommandé
- **Frontend** : Next.js 14 (App Router) + Tailwind + Recharts
- **Backend** : Express/Node + Convex (déjà en place dans Mission Control)
- **DB** : Convex (real-time) + PostgreSQL pour le historique long-terme
- **Intégrations** : Shopify API + Meta Marketing API + Google Ads API + Klaviyo API
- **Auth** : NextAuth + OAuth Shopify

### Phase 1 — MVP (2-3 semaines) ← VALEUR IMMÉDIATE
**Objectif : Summary Dashboard opérationnel pour drinknellio.com**

```
P0 — Core
├── Date Picker (Today / Last 7d / Last 30d / Custom)
├── Shopify Integration (orders, revenue, AOV, CVR)
├── Meta Ads Integration (spend, ROAS, CPA, impressions)
├── Klaviyo Integration (email revenue)
├── Google Ads Integration (spend, ROAS)
└── Summary Dashboard :
    ├── KPI Cards (ROAS, Revenue, Ad Spend, Net Profit, Net Margin)
    ├── Attribution Table (Meta + Google + Klaviyo)
    ├── Trend sparklines
    └── Period comparison (vs previous)
```

### Phase 2 — Marketing Acquisition + Creative (3-4 semaines)
```
├── Marketing Acquisition workspace
│   ├── Drill-down Campaign → AdSet → Ad
│   ├── NC ROAS (nouveau client vs récurrent)
│   └── Budget pacing
└── Creative Analysis
    ├── Hook Rate / Hold Rate par créatif
    ├── Thumbnail preview des ads Meta
    └── Tag system
```

### Phase 3 — Retention + AI (4-6 semaines)
```
├── Customer Retention
│   ├── Cohort analysis
│   ├── LTV 30/60/90d
│   └── RFM segmentation
└── AI Assistant (Moby clone)
    ├── Chat interface → Claude API
    ├── Query builder sur nos données
    └── Alertes automatiques (ROAS drop, anomalies)
```

### Phase 4 — Scale + Pixel
```
├── Custom dashboards (drag & drop)
├── Triple Pixel equivalent (first-party pixel)
├── Multi-shop support
└── Rapports automatiques (email/Discord)
```

---

## 6. AVANTAGES DE NOTRE VERSION

| Feature | Triple Whale | Notre Version |
|---------|-------------|---------------|
| Prix | $299-999/mois | Gratuit (owned) |
| Données | Cloud TW | Notre serveur |
| IA | Moby (générique) | Claude (optimisé Nellio) |
| Langue UI | Anglais | Français |
| Custom | Limité | Total |
| Intégration EVOLVE | ❌ | ✅ |
| Alertes Discord | ❌ | ✅ |
| Données EVOLVE (avatars, angles) | ❌ | ✅ |

---

## 7. CE QUI EST DÉJÀ CONSTRUIT (Mission Control)

Mission Control (localhost:3000) a déjà :
- ✅ Next.js 14 + Convex backend
- ✅ Structure de dashboard
- ✅ UI dark premium

**→ On build sur Mission Control, pas from scratch.**

---

## 8. DÉCISION REQUISE

**Pour démarrer le build Phase 1 :**

1. **Shopify API** : besoin du Private App Token drinknellio.com (Admin API)
2. **Meta API** : besoin du `access_token` Meta Business Manager
3. **Google Ads API** : besoin du Developer Token + Customer ID
4. **Klaviyo API** : besoin de la clé API Klaviyo

→ Avec ces 4 clés, je peux lancer le build complet Phase 1 immédiatement.
→ Sans les clés, je peux construire le frontend avec des données mock réalistes.

**Ta décision : mock d'abord ou clés d'abord ?**
