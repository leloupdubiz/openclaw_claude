# ADSPY PRO — Brief de construction

## Objectif
Créer un SaaS HTML self-contained `index.html` qui duplique BrandSearch.co + TrendTrack.io fusionnés en un seul outil.

## Stack
- **Un seul fichier** : `/Users/pc2/.openclaw/workspace/adspy/index.html`
- HTML + CSS (Tailwind CDN) + Vanilla JS
- Aucun backend requis au départ — données mock réalistes intégrées dans le JS
- Design : dark premium, identique à BrandSearch (dark sidebar + white main area)

## Modules à construire (6 onglets principaux)

### 1. 🏪 Brand Library (copie BrandSearch Brand Library)
**Filtres en haut :**
- Search bar (AI search: brands, products, niches...)
- Filtres : Presets | Traffic | Ad count | Adspend | Markets | Niches AI | + Add filters
- Sort : Creation Date / Last Updated

**Chaque store card (grid 1 colonne, large card) :**
- Gauche : Screenshot/favicon + galerie produits (10 thumbnails scrollables)
- Centre-haut : Nom du store (lien) + pays création + date création + icônes sociales (FB, IG, TikTok, Twitter, YT, Pinterest, Trustpilot)
- Centre-milieu : "X of Y ads" + 4 ad thumbnails (vidéo/image) + sparkline 30D ads
- Droite-haut : EU/UK Adspend badge : impressions (ex: 3.7M) • budget (34K€) • €/jour (1K€) + % EU
- Droite-bas : Traffic : visites/mois + $/jour + sparkline 6 mois + % sources (FB% / Google%)
- Boutons : Save 💾 | ... | Analyze 🔍

**Données mock (10 stores minimum) :**
```js
const STORES = [
  { id: 1, domain: "drinknellio.com", name: "Nellio UltraCalm", niche: "Health & Wellness", country: "DE", created: "2024-01-15", traffic: 45200, trafficEst: "$13.5K/day", adCount: 47, activeAds: 12, euAdspend: { impressions: "2.1M", total: "18K€", perDay: "600€", euPct: 94 }, social: { fb: true, ig: true, tiktok: false }, products: ["UltraCalm Powder", "Bundle Pack", "Starter Kit"], adsTrend: [3,5,8,12,15,18,14,12,10,8], trafficTrend: [30,35,38,42,45,47,44,41,43,45], trafficSplit: { fb: 72, google: 14 } },
  { id: 2, domain: "naturalelements.de", name: "Natural Elements", niche: "Supplements", country: "DE", created: "2022-03-10", traffic: 120000, trafficEst: "$36K/day", adCount: 340, activeAds: 89, euAdspend: { impressions: "12.4M", total: "104K€", perDay: "3.4K€", euPct: 87 }, social: { fb: true, ig: true, tiktok: true }, products: ["Ashwagandha KSM-66", "Magnesium Complex", "Sleep Formula", "Stress Bundle"], adsTrend: [80,95,110,120,130,125,115,100,95,89], trafficTrend: [90,100,108,115,120,118,115,112,118,120], trafficSplit: { fb: 61, google: 21 } },
  { id: 3, domain: "bouf.com", name: "Bouf Hair Care", niche: "Beauty", country: "AU", created: "2016-12-30", traffic: 18700, trafficEst: "$6K/day", adCount: 158, activeAds: 33, euAdspend: { impressions: "283K", total: "3K€", perDay: "108€", euPct: 100 }, social: { fb: true, ig: true, tiktok: true, yt: true, trustpilot: true }, products: ["Growth Tonic", "Growth Shampoo", "Leave-In Mask", "Conditioner", "Starter Pack"], adsTrend: [20,25,28,30,33,35,33,30,28,33], trafficTrend: [14,15,16,17,18,19,19,18,18,19], trafficSplit: { fb: 52, google: 18 } },
  { id: 4, domain: "theopenup.com", name: "OpenUp Game", niche: "Relationships", country: "US", created: "2021-04-30", traffic: 11800, trafficEst: "$3K/day", adCount: 858, activeAds: 33, euAdspend: { impressions: "6.7M", total: "59K€", perDay: "2K€", euPct: 14 }, social: { ig: true, tiktok: true }, products: ["Pillow Talk Deck", "Let's Get Naked", "Mini Date Nights", "Intimacy Bundle"], adsTrend: [25,28,30,33,35,33,30,28,25,33], trafficTrend: [8,9,10,11,12,12,11,11,11,12], trafficSplit: { fb: 100 } },
  { id: 5, domain: "sauvai.com", name: "Sauvai Cosmetics", niche: "Hair Care", country: "FR", created: "2025-02-28", traffic: 897, trafficEst: "$265/day", adCount: 626, activeAds: 16, euAdspend: { impressions: "7.4M", total: "60K€", perDay: "2K€", euPct: 93 }, social: { ig: true, tiktok: true }, products: ["Sublime Serum 50ml", "Dermaroller 0.5mm", "Calme Shampoing", "Rituel Kit"], adsTrend: [5,8,10,12,15,16,14,13,15,16], trafficTrend: [0,0,2,5,8,9,10,9,9,10], trafficSplit: { fb: 100 } },
  { id: 6, domain: "loopEarplugs.com", name: "Loop Earplugs", niche: "Audio / Wellness", country: "BE", created: "2020-11-16", traffic: 3200000, trafficEst: "$960K/day", adCount: 309, activeAds: 45, euAdspend: { impressions: "45.2M", total: "380K€", perDay: "12.7K€", euPct: 78 }, social: { fb: true, ig: true, tiktok: true, yt: true }, products: ["Loop Quiet", "Loop Experience", "Loop Engage", "Loop Switch"], adsTrend: [30,35,38,40,45,44,43,42,44,45], trafficTrend: [2800,2900,2950,3000,3100,3150,3200,3180,3190,3200], trafficSplit: { fb: 45, google: 32 } },
  { id: 7, domain: "jello.de", name: "Trinkjello", niche: "Stress / Sleep", country: "DE", created: "2024-08-01", traffic: 8400, trafficEst: "$2.5K/day", adCount: 156, activeAds: 28, euAdspend: { impressions: "4.2M", total: "35K€", perDay: "1.2K€", euPct: 96 }, social: { ig: true, tiktok: true }, products: ["Jello Calm Powder", "Jello Sleep", "Bundle 3x"], adsTrend: [10,14,18,22,26,28,25,22,25,28], trafficTrend: [3,4,5,6,7,8,8,8,8,8], trafficSplit: { fb: 85, google: 10 } },
  { id: 8, domain: "ridge.com", name: "RIDGE Wallet", niche: "Accessories", country: "US", created: "2014-08-28", traffic: 2100000, trafficEst: "$630K/day", adCount: 1097, activeAds: 127, euAdspend: { impressions: "18.9M", total: "158K€", perDay: "5.3K€", euPct: 41 }, social: { fb: true, ig: true, tiktok: true, yt: true }, products: ["Carbon Fiber Wallet", "Titanium Wallet", "Aluminum Ridge", "Phone Case"], adsTrend: [110,115,118,120,125,127,125,122,124,127], trafficTrend: [1900,1950,2000,2050,2100,2080,2070,2080,2090,2100], trafficSplit: { fb: 38, google: 44 } },
  { id: 9, domain: "glovbeauty.com", name: "Glov Beauty", niche: "Skincare", country: "US", created: "2023-07-18", traffic: 467000, trafficEst: "$140K/day", adCount: 602, activeAds: 73, euAdspend: { impressions: "8.3M", total: "69K€", perDay: "2.3K€", euPct: 67 }, social: { fb: true, ig: true }, products: ["Cleansing Pad", "Micellar Glove", "Eye Patches", "Lifting Mask"], adsTrend: [55,60,65,68,70,73,71,69,71,73], trafficTrend: [380,400,420,440,455,467,462,455,460,467], trafficSplit: { fb: 54, google: 28 } },
  { id: 10, domain: "blissy.com", name: "Blissy", niche: "Sleep / Beauty", country: "US", created: "2019-04-16", traffic: 933000, trafficEst: "$280K/day", adCount: 832, activeAds: 85, euAdspend: { impressions: "14.1M", total: "118K€", perDay: "3.9K€", euPct: 29 }, social: { fb: true, ig: true, tiktok: true }, products: ["Silk Pillowcase", "Silk Eye Mask", "Silk Scrunchie", "Bundle Set"], adsTrend: [75,78,80,82,84,85,83,82,84,85], trafficTrend: [850,870,890,910,920,933,928,922,928,933], trafficSplit: { fb: 67, google: 22 } }
]
```

### 2. 🔍 Ad Discovery (copie BrandSearch Discovery + TrendTrack Ads fusionnés)
**Filtres :**
- Search bar (keywords, products, brands...)
- Tabs : Ads | UE/UK | Page | Shop
- Filtres : Statut | Date création | Dernière diffusion | Actif depuis | Format (vidéo/image/carousel) | Langue | Adspend | Ranking | Niche AI | CTA | Pays | Durée vidéo | Ad Rank
- Sort : Pertinence / Newest / Most Viewed / Longest Running

**Chaque ad card (grid 4 colonnes) :**
- Brand name + #rank + nb live ads
- Durée active (X jours)
- Dates diffusion
- Badge "Dupliquée X fois" si applicable
- Texte description (premiers 100 chars + "Voir plus")
- Thumbnail/créatif (vidéo avec play button ou image)
- Domain + headline + CTA button (Shop now / Learn more / etc.)
- Au hover : boutons Save (folder) + BrandTracker

**Données mock (20+ ads) :**
Créer des ads pour les stores ci-dessus, en allemand pour DE, en anglais pour US/AU

### 3. 🏬 Shops (copie TrendTrack Shops)
**Vue TABLE** (pas grid), colonnes :
- Infos du shop (screenshot + nom + URL + Shopify icon + date création + pays)
- Meilleurs ventes (3 product thumbnails + nb produits total)
- Catégorie
- Visites mensuelles (chiffre + mini sparkline)
- Meta Ads (pays flags + nb ads + mini sparkline rouge)
- Dernière pub (thumbnail)

**Presets tabs :** Tous les shops | Weekly Gems | Top Scaling | Market Leaders | Record d'ads | Record de trafic

**Filtres :** Trafic | Croissance trafic | Produits | Origine shop | Pays visiteurs | Niche | Date création | Langue | Devise | Thème Shopify | Application Shopify | Pixels | Plan Shopify | Trustpilot

**Données mock** : Utiliser les mêmes stores que Brand Library

### 4. 📡 Advertisers (copie TrendTrack Advertisers)
**Chaque advertiser card (liste, large cards) :**
- Logo + Nom + date création + pays + ancienneté (badge vert : nb pubs actives)
- Sparkline évolution ads (14 derniers jours)
- 14j : nb pubs lancées
- Dernières pubs (2 thumbnails)
- Principales landing pages (2 thumbnails)
- EU+UK section : Pubs UE (%), Impressions, Dépenses ($), 14j Moy Impr./jour, 14j Moy Dépenses/jour
- Évolution dépenses graph (sparkline)
- Pays ciblés : flags + %
- Boutons : Analytics Boutique | + BrandTracker

**Données mock** : Utiliser les mêmes brands

### 5. 🎯 BrandTracker (copie TrendTrack BrandTracker)
- Sidebar gauche : liste des brands trackées (logo + nom + nb ads actives + nb ads total + visites)
- Zone principale : timeline complète des ads d'une brand sélectionnée
- Bouton "+ Ajouter une brand" avec modal search

### 6. 📁 Swipe Files (copie BrandSearch Swipe Files)
- Sidebar : My Boards (expandable) + dossiers
- Zone principale : grid d'ads/stores sauvegardés dans le dossier sélectionné
- Bouton "+ New Board" et "+ New Folder"

---

## Design System (exact copy BrandSearch)
```css
/* Sidebar */
--sidebar-bg: #0d0d0d;
--sidebar-width: 240px;
/* Main content */
--main-bg: #ffffff;
--card-border: #e5e7eb;
--card-shadow: 0 1px 3px rgba(0,0,0,0.1);
/* Accents */
--accent-red: #ef4444; /* Brand Library icon */
--accent-blue: #3b82f6; /* Discovery icon */
--accent-purple: #8b5cf6; /* Swipe Files icon */
--accent-green: #10b981; /* Active status */
--accent-yellow: #f59e0b; /* EU badge */
/* Text */
--text-primary: #111827;
--text-secondary: #6b7280;
--text-xs: 11px;
--text-sm: 13px;
```

## Navigation (sidebar gauche — copie exacte BrandSearch)
```
[Logo ADSPY PRO] [collapse] [header-mode]

[🏪] [🔍] [📁] [🎯]  ← icônes modules (4 grandes icônes)
"Brand Library" (label sous icône active)

📊 Dashboard
⭐ Saved Items

[Search boards...] [+]
My Boards
  └ My Watchlist (3)
  └ Competitors (8)
  + New board

[Avatar] Hi, [user]!
```

## Features JavaScript
1. **showModule(name)** — switche entre Brand Library / Discovery / Shops / Advertisers / BrandTracker / Swipe Files
2. **filterStores(filters)** — filtre en temps réel les stores/ads
3. **Sparklines** — mini graphiques SVG inline (pas de lib externe)
4. **Modal** — pour voir le détail d'un store/ad (slide-over depuis la droite)
5. **Save to board** — bouton Save ouvre un dropdown pour choisir le board
6. **Search** — filtre instantané sur le nom/domaine/niche

## Fichier de sortie
`/Users/pc2/.openclaw/workspace/adspy/index.html`

Un seul fichier, tout dedans (HTML + CSS + JS), ~3000-5000 lignes.
Pas de dépendances externes sauf Tailwind CDN et éventuellement lucide-react ou heroicons pour les icônes SVG inline.

## Qualité attendue
- Interface pixel-perfect vs BrandSearch/TrendTrack
- Responsive (min 1280px)
- Interactions fluides (hover effects, transitions)
- Données mock réalistes et cohérentes
- Tous les filtres fonctionnels (même sur données mock)

Quand terminé, notifier :
openclaw system event --text "Done: ADSPY PRO index.html construit — 6 modules complets" --mode now
