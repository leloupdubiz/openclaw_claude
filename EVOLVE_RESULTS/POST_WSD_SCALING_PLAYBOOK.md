# Post-WSD Scaling Playbook — NLO_DE_WSD_2026
> Créé le 2026-03-12 07h00 — autonomous tasks-generator
> Applicable dès J+3 WSD (16/03) si ROAS > 2.0 à 72h

---

## 🎯 Objectif

Protocol complet pour passer de **€55/j → €200+/j** après validation des premiers 72h WSD, avec créatifs refresh, expansion audiences, et transition vers Frühlingsmüdigkeit (14/03).

---

## Étape 1 — Decision Gate à 72h (J+3 = Lundi 16/03)

### Vérification des KPIs à 72h WSD

| KPI | Seuil SCALE | Seuil SURVEILLER | Seuil STOP |
|-----|-------------|-----------------|------------|
| ROAS (blended) | > 2.0 | 1.4 – 2.0 | < 1.4 |
| CPP (Coût par achat) | < €28 | €28 – €38 | > €38 |
| CTR (lien) | > 2.5% | 1.5% – 2.5% | < 1.5% |
| CPM | < €12 | €12 – €20 | > €20 |
| Fréquence (72h) | < 1.8 | 1.8 – 2.5 | > 2.5 |

**Règle décision :** Si ROAS > 2.0 ET CPP < €28 → SCALE | Si 1 seul critère manqué → SURVEILLER 48h | Si 2 critères manqués → STOP

---

## Étape 2 — Protocole Scale (si GO à J+3)

### 2A — Augmentation budget CBO (règle +20% max tous les 2 jours)

| Jour | Budget/j | Cumulatif | Condition |
|------|----------|-----------|-----------|
| J+3 (16/03) | €55 → **€66** | +20% | ROAS > 2.0 ✅ |
| J+5 (18/03) | €66 → **€80** | +20% | ROAS encore > 2.0 |
| J+7 (20/03) | €80 → **€96** | +20% | ROAS encore > 2.0 |
| J+9 (22/03) | €96 → **€115** | +20% | ROAS encore > 2.0 |
| J+11 (24/03) | €115 → **€140** | +20% | ROAS encore > 2.0 |
| J+14 (27/03) | Évaluation | €140/j stable | Décision: scale ou Zeitumstellung |

**Règle absolue :** Ne jamais augmenter de plus de 20% en 24h → risque reset algorithme Meta
**Exception :** Si ROAS > 3.5 → autoriser +30% une fois

### 2B — Budget total si scaling complet

| Scénario | Budget/j (16/03) | Budget/j (27/03) | Budget total mars |
|----------|-----------------|-----------------|-------------------|
| Conservateur | €66 | €115 | ~€1.200 |
| Moderé | €80 | €140 | ~€1.500 |
| Agressif | €115 | €200+ | ~€2.000+ |

**Recommendation :** Démarrer conservateur (€66 → €115) pour préserver les algorithmes. Passer agressif après J+14 si ROAS reste > 2.5.

---

## Étape 3 — Refresh Créatifs (semaine 16/03)

### Créatifs à uploader immédiatement après validation 72h

**Tier 1 — À filmer priorité absolue semaine 16/03 :**
| Script | Angle | Raison |
|--------|-------|--------|
| S40-B "Nature 22 RCTs" | Méta-analyse scientifique | Evergreen inattaquable — bureau 55s |
| S39-B "Nature viermal mehr" | Nature × NIH autorité | Skeptiker premium |
| S41-A "418 Erwachsene" | Frühlingsmüdigkeit précis | GO LIVE 14/03 Pivot |
| S12-A "Générique vs KSM-66" | Différenciation qualité | Evergreen |
| S14-B "Alles versucht" | Conversion P0 | Hook universel |

**Règle refresh :** Dès que fréquence > 2.0 sur un ad set → ajouter 2 nouveaux créatifs | Dès que CTR drop > 20% vs J+1 → créatif fatigué → remplacer

### Planning rotation créatifs

| Semaine | Créatifs actifs | Action |
|---------|----------------|--------|
| 13-15/03 (WSD + J+2) | S40-B, S38-B, S36-B (WSD) | Observer sans toucher |
| 16-20/03 | + S41-A, S40-B, S12-A | Upload batch refresh |
| 21-24/03 (pré-Zeitumstellung) | + S32-C, S33-B | Upload pré-Zeitumstellung |
| 25-28/03 (Zeitumstellung) | Nouvelle campagne NLO_DE_ZEITUMST | Lancer parallèle |

---

## Étape 4 — Expansion Audiences (J+7 si ROAS > 2.0)

### Audiences à déployer en séquence

**J+7 (20/03) — Ajout Lookalike 1%**
- Créer LAL 1% depuis Custom Audience "Acheteurs" (si > 100 achats) OU "Add to Cart 30j"
- Budget additionnel : +€20/j sur nouvel ad set
- Naming : `NLO_DE_WSD_LAL1_Käufer_2026`

**J+10 (23/03) — Ajout Retargeting chaud**
- Audience : Visiteurs page produit 7j non acheteurs
- Copy : retargeting anti-objection (OBJECTIONS_BANK_DE.md)
- Budget : +€15/j
- Naming : `NLO_DE_WSD_RT_VDP7j`

**J+14 (27/03) — Expansion LAL 2-3%**
- Si LAL 1% ROAS > 2.0 → ouvrir LAL 2% et LAL 3%
- Budget progressif : +€30/j
- Naming : `NLO_DE_WSD_LAL23_2026`

### Audiences à ne PAS toucher avant J+14
- Broad (laisser l'algorithme optimiser)
- Interest Stacks (changer les audiences = reset learning)

---

## Étape 5 — Transition vers Frühlingsmüdigkeit (14/03)

### Règle de transition budgets

| Situation à J+3 | WSD Budget | Frühlingsmüdigkeit Budget |
|-----------------|-----------|--------------------------|
| WSD ROAS > 2.0 | Maintenir €55/j | Lancer €60/j le 14/03 |
| WSD ROAS 1.4-2.0 | Réduire à €30/j | Lancer €60/j le 14/03 |
| WSD ROAS < 1.4 | Couper | Lancer €60/j le 14/03 |

**Règle absolue :** Lancer NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 le 14/03 QUE SOIT la performance WSD. Ce sont des campagnes indépendantes avec des créatifs différents.

### Synergies à exploiter
- WSD audiences (pixels + Custom Audiences) → seeding LAL pour Frühlingsmüdigkeit
- WSD copy qui performe → adapter pour Frühlingsmüdigkeit (swap "Weltschlaftag" → "Frühlingsmüdigkeit")
- WSD learnings (quel hook / quel ad set) → prioriser dans Frühlingsmüdigkeit

---

## Étape 6 — Règles d'Automatisation Meta (à configurer J0)

### 7 règles automatiques à activer

| # | Règle | Condition | Action |
|---|-------|-----------|--------|
| 1 | Stop-loss ROAS | ROAS < 1.0 pendant 48h | Pause ad set |
| 2 | Pause CPP élevé | CPP > €45 pendant 24h | Pause ad set |
| 3 | Alert CTR drop | CTR < 1.0% | Notification email |
| 4 | Scale winner | ROAS > 2.5 pendant 72h | +20% budget CBO |
| 5 | Fréquence alert | Fréquence > 3.0 | Notification |
| 6 | Budget cap journalier | Dépense > €80/j | Stop (protection) |
| 7 | Weekend boost | Samedi + Dimanche | +10% budget |

*Référence complète : META_AUTOMATION_RULES_DE.md*

---

## Étape 7 — KPIs à suivre semaine par semaine

### Template de rapport hebdomadaire

| Métrique | J+3 (16/03) | J+7 (20/03) | J+14 (27/03) | Objectif |
|---------|------------|------------|-------------|---------|
| ROAS blended | ? | ? | ? | > 2.0 |
| CPP | ? | ? | ? | < €28 |
| CA total | ? | ? | ? | > €500 |
| Achats | ? | ? | ? | > 18 |
| Budget dépensé | ? | ? | ? | ~€165 |
| Meilleur créatif | ? | ? | ? | S40-B ou S38-B |
| Meilleur ad set | ? | ? | ? | Broad ou Interest |

**Breakeven :** ROAS 1.40 (marges Nellio connues de Chef)
**Objectif M1 :** ROAS 2.0+ · CPP < €28 · CA > €1.000

---

## Récapitulatif décisions clés

```
J+3 (16/03) — DECISION GATE
├── ROAS > 2.0 → SCALE : +20% budget + Refresh créatifs + Upload S41-A + S40-B
├── ROAS 1.4-2.0 → SURVEILLER : Maintenir €55/j, changer créatif fatigué
└── ROAS < 1.4 → STOP WSD : Couper, conserver learnings, pivoter Frühlingsmüdigkeit

J+7 (20/03) — EXPANSION
└── Si scaling validé → Lookalike 1% + Retargeting + Upload batch 2 créatifs

J+14 (27/03) — STABILISATION
└── Décider si WSD continue ou transition complète vers Zeitumstellung (25/03)
```

---

## Fichiers associés

| Fichier | Usage |
|---------|-------|
| WSD_PERFORMANCE_TRACKER_13MARS.md | Template suivi J0-J+3 |
| POST_WSD_ACTIVATION_GUIDE.md | Calendrier 13/03→21/04 |
| META_AUTOMATION_RULES_DE.md | Règles automatiques Meta |
| SNIPER_PHASE_PLAYBOOK.md | Scale avancé post-winner |
| AB_TEST_HYPOTHESIS_PACK.md | Hypothèses test 72h |
| LOOKALIKE_AUDIENCE_STRATEGY_DE.md | Audiences LAL détail |
| CREATIVE_PERFORMANCE_TRACKER.md | Tracker créatifs |
| FILMING_PRIORITY_BRIEF_MARS2026.md | Scripts à filmer |
