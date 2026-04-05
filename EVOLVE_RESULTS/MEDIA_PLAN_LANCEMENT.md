# MEDIA PLAN — Lancement Meta Ads drinknellio.com
> Créé par Clawdbot Prime — 2026-02-28 07h10 (autonome)
> Objectif : Première campagne Meta DE rentable — O1 OKR

---

## 1. STRUCTURE CAMPAGNE (3-2-2 Marksman)

### Architecture CBO

```
CAMPAGNE : NLO_DE_SALES_MARKSMAN_01
Budget   : €65/j CBO (≈ €1,950/mois)
Objectif : Sales (Purchase)
Pays     : Allemagne uniquement (DE)
Pixel    : À configurer (voir META_PIXEL_GUIDE.md)
```

### Adsets (3 — un par angle)

| Adset | Angle | Audience | Budget CBO |
|-------|-------|----------|------------|
| AS-01 | Das 3-Uhr-Signal | Broad 25-54 DE (genre mixte) | Auto-distribué |
| AS-02 | Die Aufnahme-Revolution | Broad 25-54 DE (genre mixte) | Auto-distribué |
| AS-03 | Das Kopfkino-Protokoll | Broad 25-54 DE (genre mixte) | Auto-distribué |

**Pourquoi Broad ?** — Marché DE sophistication Stage 3-4. Ciblage large laisse l'algorithme trouver le buyer intent. Plus de dépense initiale mais winners détectés plus vite.

### Ads par Adset (2 créatifs × 2 headlines = 4 ads/adset → 12 total)

**AS-01 — Das 3-Uhr-Signal**
- Ad 1A : Script S1 (Teufelskreis) + Headline "Schluss mit dem 3-Uhr-Erwachen"
- Ad 1B : Script S1 (Teufelskreis) + Headline "20.000 Deutsche schlafen wieder durch"
- Ad 1C : Script S1 (Teufelskreis VAR) + Headline "Schluss mit dem 3-Uhr-Erwachen"
- Ad 1D : Script S1 (Teufelskreis VAR) + Headline "20.000 Deutsche schlafen wieder durch"

**AS-02 — Die Aufnahme-Revolution**
- Ad 2A : Script S2 (Gedankenkarussell) + Headline "KSM-66: Das Ashwagandha das wirklich wirkt"
- Ad 2B : Script S2 + Headline "3x bessere Aufnahme als Kapseln"
- Ad 2C : Script S2 VAR + Headline "KSM-66: Das Ashwagandha das wirklich wirkt"
- Ad 2D : Script S2 VAR + Headline "3x bessere Aufnahme als Kapseln"

**AS-03 — Das Kopfkino-Protokoll**
- Ad 3A : Script S3 (Cortisol) + Headline "Cortisol nachts senken — endlich"
- Ad 3B : Script S3 + Headline "Warum du müde bist aber nicht schlafen kannst"
- Ad 3C : Script S3 VAR + Headline "Cortisol nachts senken — endlich"
- Ad 3D : Script S3 VAR + Headline "Warum du müde bist aber nicht schlafen kannst"

---

## 2. AUDIENCES DÉTAILLÉES

### Broad (recommandé pour Phase Marksman)
```
Pays        : Allemagne (DE)
Âge         : 25–54 ans
Genre       : Tous
Langue      : Allemand
Ciblage     : Aucun intérêt — Broad pur
Placements  : Automatic placements (Meta recommandé)
```

### Audiences de retargeting (Phase 2 — post 72h data)
À activer après identification du winner :
- Site visitors 30j (Pixel requis)
- Video views 75% (si vidéos UGC uploadées)
- Customer list (emails existants si disponibles)

### Exclusions (toujours actives)
- Acheteurs existants (customer list)
- Page fans (éviter la fatigue)

---

## 3. BUDGETS & SEUILS DE DÉCISION

### Budget Test Phase Marksman
| Période | Dépense | Action |
|---------|---------|--------|
| J1-J3 (72h) | ~€195 | Observer sans toucher |
| J3 | Analyse winner | ROAS > 1.5 = continuer / < 1.0 = stop adset |
| J4-J7 | ~€260 | Scale winner identifié |
| Semaine 2 | ~€455 | Phase Sniper — deep-dive |

### Seuils de décision
| KPI | Seuil Action | Décision |
|-----|-------------|---------|
| ROAS | > 2.5 sur 72h | Scale (Phase Sniper) |
| ROAS | 1.5 - 2.5 | Continuer, optimiser headlines |
| ROAS | < 1.0 sur 48h | Stop adset, tester variante |
| CPC | > €2.50 | Revoir creatives (hook faible) |
| CTR | < 1.5% | Hook insuffisant — tester autre |
| CPM | > €25 | Audience trop étroite ou période haute |
| Hook Rate (3s) | < 25% | Hook à changer en priorité |

### Budget mensuel estimatif (si winner identifié)
```
Phase Marksman (J1-J7)  : €455
Phase Sniper (J8-J14)   : €650 (scale progressif)
Phase Scale (J15-J30)   : €1,200+ (si ROAS > 2.5)
Total mois 1 (estimé)   : €2,305
```

---

## 4. CRÉATIFS DISPONIBLES (pré-approuvés)

### Scripts vidéo UGC (à tourner)
| Script | Angle | Avatar | Durée | Fichier |
|--------|-------|--------|-------|---------|
| S1 — Der Teufelskreis | Das 3-Uhr-Signal | Markus (A2) | ~45s | SCRIPTS_BATCH01.md |
| S2 — Das Gedankenkarussell | Das Kopfkino-Protokoll | Sonja (A1) | ~45s | SCRIPTS_BATCH01.md |
| S3 — Cortisol nachts | Die Aufnahme-Revolution | Julia (A3) | ~45s | SCRIPTS_BATCH01.md |

### Headlines (pre-approuvées 3-2-2)
**Batch A (Performance directe) :**
1. "Schluss mit dem 3-Uhr-Erwachen"
2. "20.000 Deutsche schlafen wieder durch"
3. "KSM-66: Das Ashwagandha das wirklich wirkt"
4. "3x bessere Aufnahme als Kapseln"
5. "Cortisol nachts senken — endlich"
6. "Warum du müde bist aber nicht schlafen kannst"

**Batch B (Social Proof) :**
7. "4.8/5 — 20.000+ Bewertungen"
8. "45 Tage Geld-zurück-Garantie. Risikofrei testen"

### Body copies
Voir `EVOLVE_RESULTS/CREATIVES_META_BATCH02.md` — 10 body copies disponibles

---

## 5. SETUP TECHNIQUE REQUIS (avant lancement)

### Checklist pré-lancement (humain requis)
- [ ] Meta Pixel installé et vérifié sur drinknellio.com (voir `META_PIXEL_GUIDE.md`)
- [ ] Événements actifs : Purchase ✓ · InitiateCheckout ✓ · AddToCart ✓ · ViewContent ✓
- [ ] Domaine validé dans Business Manager (DNS TXT ou Meta Tag)
- [ ] Pixel ID noté (format : 15 chiffres)
- [ ] Compte publicitaire actif (budget > €0, méthode paiement configurée)
- [ ] Page Facebook drinknellio.com créée et active
- [ ] 3 vidéos UGC tournées, montées et uploadées

### Post-lancement J1
- [ ] Vérifier spend > 0 dans Ads Manager (J+2h)
- [ ] Vérifier Events Manager : événements remontent bien
- [ ] Screenshot résultats J1 (baseline)

---

## 6. CALENDRIER D'EXÉCUTION

```
S1 (Sem 1 Mars) : Tourner 3 vidéos UGC + Vérifier Pixel + Setup BM
S2 (Sem 2 Mars) : Upload créatifs + Setup campagne + Lancement J-Day
S3 (J1-J7)      : Phase Marksman — Observer, no touch
S4 (J8-J14)     : Analyse winner + Phase Sniper
S5 (J15+)       : Scale si ROAS > 2.5 confirmé
```

---

## 7. STRUCTURE OMNIA POUR LE BUILD

### Naming convention ads
```
NLO_[TYPE]_[ANGLE_ID]_[SCRIPT_ID]_[HEADLINE_ID]
Ex : NLO_UGC_3UHR_S1_H01
```

### Tags UTM recommandés
```
utm_source=facebook
utm_medium=paid_social
utm_campaign=NLO_DE_MARKSMAN_01
utm_content={ad.name}
utm_term={adset.name}
```

---

## 8. METRICS DE REPORTING (72h post-lancement)

### Dashboard quotidien minimal
| Metric | Où trouver | Seuil alerte |
|--------|-----------|-------------|
| Spend | Ads Manager | > budget prévu |
| ROAS | Ads Manager | < 1.0 après 48h |
| CPM | Ads Manager | > €30 |
| CTR (link) | Ads Manager | < 1% |
| CPC | Ads Manager | > €2.50 |
| Add to Cart | Events Manager | 0 après 24h |
| Purchases | Events Manager | 0 après 48h |

### Rapport 72h (format)
Voir template dans `AGENTS.md §4` — Performance Analyst → report_72h.md

---

*Fichier créé autonomement par Clawdbot Prime — 2026-02-28 07:10*
*Prêt à exécuter dès que Chef confirme : vidéos tournées + pixel vérifié*
