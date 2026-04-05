# WSD Performance Tracker & Decision Sheet — 13 Mars 2026
> Session autonome | 2026-03-12 02h30 | Template décisions post-lancement

---

## ⚠️ CONTEXTE CRITIQUE
**WSD = AUJOURD'HUI (13/03)** — Fenêtre unique 2026. Ce fichier = guide d'analyse pour les 72h post-lancement.  
**Campagne active :** NLO_DE_WSD_2026 (CBO €55/j · 3 adsets)  
**Pivot planifié :** Frühlingsmüdigkeit NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 GO LIVE **14/03**

---

## SECTION 1 — CHECKPOINTS HORAIRES (13/03)

### 07h45 — GO/NO-GO Final
| Check | ✅ / ❌ | Action si ❌ |
|-------|--------|-------------|
| Campagne NLO_DE_WSD_2026 statut = ACTIVE | | Vérifier BM → ads manager → relancer |
| Pixel Purchase event vert | | Events Manager → Test Events |
| Budget €55/j distribué | | CBO = auto → attendre 2h |
| 3 adsets approuvés | | Si refus : voir FAQ Refus Meta ci-dessous |

### 12h00 — Vérification midi J0
| Métrique | Cible | Réel | Décision |
|---------|-------|------|---------|
| Impressions total | >1.000 | | Log |
| CPM | <€8 | | Si >€15 → vérifier audience overlap |
| CTR | >2% | | Si <1% → vérifier visuel + copy |
| Clics lien | >50 | | Log |

### 18h00 — Seuils décision soir J0
| Métrique | Arrêt | Surveiller | Scale |
|---------|-------|-----------|-------|
| CPP (coût/achat) | >€50 | €30-50 | <€30 |
| CTR lien | <1.5% | 1.5-3% | >3% |
| ROAS 6h | <1.0 | 1.0-1.5 | >2.0 |
| Fréquence | >2.5 | 1.5-2.5 | <1.5 |

### 21h00 — Post #5 WSD publié
- Publier Post #5 organique IG/FB (copy dans WSD_D1_MORNING_CHECKLIST_12MARS.md)
- Vérifier engagement Posts #1-#4

---

## SECTION 2 — ANALYSE 24H (14/03 08h)

### Tableau de bord J+1 WSD
| Métrique | Cible 24h | Réel 24h | Status |
|---------|----------|---------|--------|
| Spend total | €55 | ________ | |
| Impressions | >10.000 | ________ | |
| Clics lien | >500 | ________ | |
| CTR moyen | >2% | ________% | |
| CPP moyen | <€40 | €________ | |
| Achats total | >1 | ________ | |
| Revenue | | €________ | |
| ROAS 24h | >1.5 | ________x | |
| Blended ROAS | >2.0 | ________x | |

### Règles de décision 24h

**Si ROAS Blended > 2.5 à 24h :**
→ Augmenter budget WSD +20% (€55 → €66/j)
→ Lancer NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 en parallèle (€60/j)
→ Budget total : €126/j

**Si ROAS Blended 1.5-2.5 à 24h :**
→ Maintenir WSD €55/j
→ Lancer Frühlingsmüdigkeit €60/j = €115/j total
→ Surveiller ratio 72h

**Si ROAS Blended < 1.5 à 24h :**
→ Ne pas scale WSD
→ Lancer quand même Frühlingsmüdigkeit (angle différent)
→ Analyser quel adset performe le mieux → concentrer budget

**Si 0 achats à 24h :**
→ Vérifier Pixel (Events Manager → Test Events → Purchase)
→ Vérifier que la landing page load en <3s (Google PageSpeed)
→ Vérifier que le produit est en stock
→ NE PAS couper avant 48h minimum

---

## SECTION 3 — ANALYSE 72H DÉCISION FINALE (16/03 08h)

### WSD Performance Summary

| Adset | Spend | ROAS | CPP | Achats | Décision |
|-------|-------|------|-----|--------|---------|
| [Adset 1 - Broad] | €________ | ___x | €___ | ___ | SCALE / MAINTENIR / COUPER |
| [Adset 2 - Schlaf Intérêts] | €________ | ___x | €___ | ___ | SCALE / MAINTENIR / COUPER |
| [Adset 3 - Retargeting] | €________ | ___x | €___ | ___ | SCALE / MAINTENIR / COUPER |
| **TOTAL** | **€________** | **___x** | **€___** | **___** | |

### Analyse par Créatif

| Creative | Hook Rate (3s) | Hold Rate (25%) | CTR | CVR | Décision |
|---------|---------------|----------------|-----|-----|---------|
| [Creative 1] | ___% | ___% | ___% | ___% | WINNER / LOSER |
| [Creative 2] | ___% | ___% | ___% | ___% | WINNER / LOSER |
| [Creative 3] | ___% | ___% | ___% | ___% | WINNER / LOSER |

**Hook Rate cible :** >30% · **Hold Rate cible :** >40%

### Décision Scale 72h

**SCALE (si ROAS Blended >2.0 sur 72h)**
```
→ Augmenter CBO WSD de +20% par 24h
→ Dupliquer adset winner dans nouveau CBO €55/j
→ Continuer jusqu'au 19/03 (J+6)
→ Pivot total Frühlingsmüdigkeit le 20/03
```

**SURVEILLER (si ROAS Blended 1.5-2.0)**
```
→ Maintenir budget WSD inchangé
→ Tester nouvelle copy Primary Text (S32-A / S33-A)
→ Analyser timing 9h-14h vs 17h-21h
→ Décision définitive J+5
```

**COUPER (si ROAS Blended <1.5)**
```
→ Réduire WSD à €30/j (minimum tracking)
→ Concentrer budget sur Frühlingsmüdigkeit
→ Analyser logs Triple Whale (tw-dashboard.html)
→ Identifier winner créatif pour prochaine itération
```

---

## SECTION 4 — PIVOT FRÜHLINGSMÜDIGKEIT (14/03)

### Campagne NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 — GO LIVE 14/03

**Setup rapide (15 min) :**
1. [ ] Créer campagne CBO · Nom : NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 · Budget : €60/j
2. [ ] Adset 1 : Broad DE 30-55 · "Frühjahrsmüdigkeit" copy
3. [ ] Adset 2 : Schlaf + Erschöpfung intérêts
4. [ ] Adset 3 : Melatonin Switcher (retargeting chaud WSD)
5. [ ] Créatif : Visuel Canva (guide : FRUEHLINGSMUEDIGKEIT_CANVA_PRODUCTION_SHEET.md)
6. [ ] Primary Text : **"Frühjahrsmüdigkeit gibt es nicht. Aber das hier schon."**

**Primary Text Complet BC1 — Frühlingsmüdigkeit Pivot :**
```
MDR. Spiegel. ARD. NDR. Und jetzt die ZEIT.

Alle schreiben es diese Woche: Frühjahrsmüdigkeit existiert klinisch nicht.

Aber was wirklich existiert: Cortisol, der im Frühjahr zu lange erhöht bleibt.
Der deine Tiefschlafphasen stört.
Der dich morgens erschöpft aufwachen lässt — obwohl du 7 Stunden geschlafen hast.

Nellio UltraCalm adressiert genau das.
→ KSM-66® Ashwagandha (-28% Cortisol klinisch belegt)
→ L-Theanin (Tiefschlaf ohne Sedierung)
→ Magnesiumglycinat (+18% Tiefschlaf — Méta-Analyse 27 Studien)

⭐ 4.8/5 · 20.000+ Bewertungen · 45 Tage Garantie
Jetzt testen — Link in der Bio.
```

**Headlines rotation :**
- "Nicht Frühjahrsmüdigkeit — Cortisol"
- "ARD + ZEIT + MDR sind sich einig"
- "Warum März müder macht als der Kalender sagt"
- "Das Cortisol-Problem, das die Medien endlich erklären"

---

## SECTION 5 — CALENDRIER MARS-AVRIL RÉCAP

| Date | Campagne | Budget/j | Statut |
|------|---------|---------|--------|
| 11/03 ✅ | WSD NLO_DE_WSD_2026 | €55 | LANCÉE |
| 13/03 | WSD D-Day WSD | €55 | SURVEILLER |
| 14/03 | Frühlingsmüdigkeit NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 | +€60 | GO LIVE |
| 15-19/03 | WSD + Frühlingsmüdigk. | €55+€60=€115 | ANALYSE |
| 20/03 ≈ | WSD → STOP si ROAS <1.5 | | DÉCISION |
| 21-24/03 | Frühlingsmüdigkeit seul | €60 | MAINTAIN |
| 25/03 | Zeitumstellung NLO_DE_ZEITUMST_2026 | +€70 | GO LIVE |
| 25-31/03 | Frühlingsmüdigk. + Zeitumstellung | €60+€70=€130 | |
| 01-09/04 | Frühlingsmüdigk. + Zeitumst. | €130 | ANALYSE |
| 10/04 | FIBO NLO_DE_FIBO_LONGEVITY_2026 | +€70 | GO LIVE |
| 10-21/04 | 3 campagnes peak | €200 | PEAK |
| 22/04 | FIBO STOP | | |
| 23-30/04 | Frühlingsmüdigk. seul | €60 | WIND DOWN |

**Budget total estimé :** ~€2.515 sur 47 jours

---

## SECTION 6 — FAQ PROBLÈMES FRÉQUENTS

**🔴 Campagne refusée Meta :**
→ Vérifier claims : pas de "heilt", "behandelt", "garantiert Heilung"
→ Retirer tout % chiffré dans le copy primary text si refusé
→ Remplacer "28% Cortisol" → "klinisch nachgewiesen" (mention générique)
→ Attendre 24h et réessayer sans modification (bots Meta instables)

**🔴 CPM > €15 anormal :**
→ Vérifier audience overlap (Facebook Audience Overlap tool)
→ Élargir audience si <500K
→ Désactiver adset le plus cher → doubler budget sur le meilleur

**🔴 0 achat après 48h :**
→ Vérifier Pixel : Events Manager → Test Events → simuler achat
→ Vérifier landing page : GTmetrix score >70 / LCP <3s
→ Vérifier stock Shopify

**🔴 ROAS Triple Whale vs Meta discordant :**
→ Normal : Triple Whale = attribution 1-day click / Meta = 7-day view
→ Utiliser Blended ROAS (Revenue Shopify Total / Meta Spend Total) comme référence
→ Décision sur Blended ROAS uniquement

**🟡 OYONO concurrent actif :**
→ Contre-stratégie : "20.000 echte Bewertungen > 1 Expertenhotline"
→ Si OYONO intensifie : augmenter budget +20% pour saturer la fenêtre

---
*Généré automatiquement par session autonome 02h30 CET — 2026-03-12*
