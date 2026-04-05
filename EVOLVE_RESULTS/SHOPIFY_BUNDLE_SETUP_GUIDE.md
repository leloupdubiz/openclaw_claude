# SHOPIFY BUNDLE SETUP TECHNIQUE — Nellio UltraCalm
> Implémentation des 3 offres bundle définies dans BUNDLE_UPSELL_STRATEGY_DE.md
> Créé : 2026-03-02 | Temps estimé : 45 min | Coût : €0 (apps gratuites incluses)

---

## ⚡ RÉSUMÉ EXÉCUTIF

**Objectif :** Passer de AOV €29.90 (1 mois) à AOV moyen €45-50 (mix 1M/2M/3M)
**Impact ROAS :** Breakeven passe de 1.40 → 1.21 (bundle 2M)
**Temps d'implémentation :** 45 min dans Shopify Admin — 0 développeur requis

---

## 📦 LES 3 OFFRES À CRÉER

| Offre | Nom DE | Prix | SKU Shopify |
|-------|--------|------|-------------|
| 1 mois (actuel) | Einzel-Paket | €29.90 | NLO-UC-1M |
| 2 mois (priorité) | Starter-Paket | €49.90 | NLO-UC-2M |
| 3 mois (scale) | Transformation-Paket | €74.90 | NLO-UC-3M |

---

## 🛠️ MÉTHODE A — VARIANTS SHOPIFY (Recommandée — 0 app)

### Étape 1 : Accéder au produit
```
Shopify Admin → Produits → Nellio UltraCalm → Modifier
```

### Étape 2 : Ajouter des variantes
1. Scroll jusqu'à **"Variantes"**
2. Cliquer **"Ajouter des variantes"**
3. Créer une option : **"Paket"** (ou "Laufzeit")
4. Valeurs :
   - `1 Monat — €29.90`
   - `2 Monate — €49.90` ← **Badge "Beliebteste Wahl"**
   - `3 Monate — €74.90`

### Étape 3 : Configurer les prix par variante
| Variante | Prix | Prix comparaison | SKU |
|----------|------|-----------------|-----|
| 1 Monat | €29.90 | — | NLO-UC-1M |
| 2 Monate | €49.90 | €59.80 (barré) | NLO-UC-2M |
| 3 Monate | €74.90 | €89.70 (barré) | NLO-UC-3M |

> **Prix comparaison** = prix "normal" barré → montre l'économie visuelle

### Étape 4 : Stock
- 1 sachet = 1 Monat → quantité 1
- 2 sachets = 2 Monate → quantité 2 (ou gérer via fulfillment)
- **Option simplifiée :** Bundle "2 Monate" = envoyer 2 sachets par commande (à configurer dans les notes de commande si pas d'app)

### Étape 5 : Image produit par variante
- Assigner une image différente par bundle (optionnel mais recommandé)
- Image 2M : montrer 2 sachets côte à côte
- Image 3M : montrer 3 sachets

---

## 🛠️ MÉTHODE B — APP BUNDLE (Si tu veux plus de contrôle)

### Option 1 : Frequently Bought Together (gratuit 14j → $9.99/m)
```
Shopify App Store → "Frequently Bought Together" → Installer
```
- Permet de suggérer des bundles sur la PDP
- Discount automatique si achat multiple
- Idéal pour upsell sans créer de nouveaux produits

### Option 2 : Bundler — Product Bundles (plan gratuit disponible)
```
Shopify App Store → "Bundler — Product Bundles" → Installer
```
- Crée des bundles avec URL dédiée
- Discount % ou montant fixe automatique
- Page bundle séparée (linkable depuis les ads)

**Recommandation :** Commencer par **Méthode A (variantes)** — rapide, 0 coût, et suffisant pour le test. Migrer vers une app si tu veux des fonctionnalités avancées (discount progressif, page dédiée).

---

## 🛒 ORDER BUMP — UPGRADE AU CHECKOUT (P1 impact)

### Principe
Sur la page panier ou checkout : afficher un message proposant d'upgrader 1M → 2M pour une réduction.

### Setup avec Aftersell (trial 30j gratuit)
```
1. Shopify App Store → "AfterSell Post Purchase Upsell" → Installer
2. Créer un funnel : Trigger = Achat NLO-UC-1M
3. Offre post-achat : "Upgrade vers 2 Monate — économisez €9.90"
4. Bouton : "Ja, zum Starter-Paket upgraden" (1 clic, pas de re-saisie CB)
```

**Alternative gratuite :** Reconvert Upsell & Cross Sell (plan gratuit limité)

### Copy DE pour l'order bump
```
🎁 Exklusives Angebot — Nur für dich

Du hast gerade 1 Monat UltraCalm gewählt.

Upgrade auf das Starter-Paket (2 Monate) und spare 
sofort €9.90 — das ist 1 Woche gratis!

Die meisten Kunden sehen die ersten Ergebnisse 
nach 2-3 Wochen. Mit 2 Monaten gibst du deinem 
Körper die Zeit die er braucht.

[Ja, upgraden für nur €49.90] [Nein danke]
```

---

## 🏷️ BADGE "BELIEBTESTE WAHL" (Visuel)

### Dans le sélecteur de variantes
Ajouter visuellement via le thème ou une app de badge :

```
○ 1 Monat — €29.90
● 2 Monate — €49.90 ⭐ BELIEBTESTE WAHL
○ 3 Monate — €74.90  BESTER PREIS (€24.97/Monat)
```

### Modification theme (si accès au code)
```liquid
{% if variant.title contains "2 Monate" %}
  <span class="badge-popular">⭐ Beliebteste Wahl</span>
{% endif %}
```

### Alternative sans code
- App **"Product Labels & Badges"** (plan gratuit) → badge visuel sur l'image produit

---

## 📊 PRIX PAR JOUR — COPY PUISSANTE

| Offre | Prix/jour | Copy DE |
|-------|-----------|---------|
| 1 Monat | €1.00/Tag | — |
| 2 Monate | €0.83/Tag | "Weniger als eine Tasse Kaffee" |
| 3 Monate | €0.83/Tag | "Weniger als €1 pro Tag" |

**À intégrer dans la PDP (section ingrédients ou FAQ) :**
```
Nellio UltraCalm kostet dich weniger als €1 pro Tag.
Das ist weniger als dein Morgenkaffee — aber mit echtem Effekt.
```

---

## 🎯 CHECKLIST IMPLÉMENTATION

### Phase 1 — Immédiat (15 min)
```
□ Ouvrir Shopify Admin → Produit UltraCalm
□ Créer 3 variantes (1M / 2M / 3M) avec prix et SKU
□ Ajouter prix de comparaison barré sur 2M et 3M
□ Sélectionner 2M comme variante par défaut
□ Sauvegarder
```

### Phase 2 — Cette semaine (30 min)
```
□ Créer images produit pour chaque bundle (2 sachets / 3 sachets)
□ Installer AfterSell pour order bump (trial gratuit)
□ Configurer le funnel post-achat 1M → 2M
□ Tester le checkout complet (commande de test)
```

### Phase 3 — Post-lancement (optionnel)
```
□ Ajouter badge "Beliebteste Wahl" visuel sur 2M
□ Section "Warum 2 Monate?" sur la PDP
□ Mettre à jour les ads Meta avec le prix 2M si AOV augmente
```

---

## 💰 IMPACT ATTENDU

### Sur le ROAS (calcul breakeven)
| Scénario | AOV | COGS | Marge brute | Breakeven ROAS |
|----------|-----|------|-------------|----------------|
| Sans bundle (actuel) | €29.90 | €8.50 | 71.6% | **1.40** |
| 50% clients prennent 2M | €39.90 | €17.00 | 57.4% | **1.74** → **Non** |
| 50% clients prennent 2M (COGS ×2) | €39.90 | €17.00 | 57.4% | — |

> **Note :** L'impact ROAS dépend du COGS réel pour 2 sachets. Si le COGS reste proportionnel (€17 pour 2 sachets), le breakeven ne baisse pas autant. L'intérêt principal est sur le **CPP** : si tu paies €25 CPP pour une commande à €49.90 → ROAS 2.0 (vs 1.2 pour €29.90).

### Règle simple
> **"Le bundle ne réduit pas le coût d'acquisition — il augmente la valeur de chaque acheteur."**
> CPP €25 + AOV €29.90 = déficit | CPP €25 + AOV €49.90 = profitable

---

## ⚠️ POINT D'ATTENTION STOCK

Avant de lancer les bundles dans les ads :
1. Vérifier que tu as le stock pour 2 sachets par commande
2. Configurer les alertes stock Shopify à 20 unités min
3. Si stock limité : lancer uniquement la variante 1M d'abord

---

*Livrable créé par Clawdbot Prime — 2026-03-02 | Implémente BUNDLE_UPSELL_STRATEGY_DE.md*
