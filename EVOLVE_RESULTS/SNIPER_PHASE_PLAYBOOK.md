# SNIPER PHASE PLAYBOOK — NLO_DE
> Activé quand : 1 angle Marksman est clear winner à 72h. Rédigé 2026-03-03.

---

## C'EST QUOI LA PHASE SNIPER ?

**Marksman** = tester 3 angles larges → identifier lequel performe.  
**Sniper** = prendre l'angle winner → créer 8-15 variations → dominer ce segment.

> "Sniper mode is when you already know what works — now you go ALL IN on that angle and exhaust every variation before moving to the next." — Formation EVOLVE

---

## CRITÈRES DE PASSAGE MARKSMAN → SNIPER

### Seuil de déclenchement (72h data minimale)

| Signal | Seuil SNIPER | Action |
|--------|-------------|--------|
| ROAS angle winner | > 2.0 sur 72h | ✅ Déclencher Sniper |
| ROAS autres angles | < 1.4 | ✅ Couper les autres |
| CPP angle winner | < €18 | ✅ Signal profitable |
| Différence entre angles | Winner > 40% meilleur | ✅ Clear winner |

**Si aucun angle atteint ces seuils à 72h → prolonger Marksman 48h supplémentaires avant de décider.**

---

## ÉTAPE 1 — CONFIRMER LE WINNER

### Actions J+3 (72h après lancement)

1. Ouvrir Ads Manager → filtrer par campagne NLO_DE_SALES
2. Comparer par adset (= par angle) :
   - ROAS (colonne "Kauf-ROAS")
   - CPP (colonne "Kosten pro Kauf")
   - CTR Link (colonne "Link-CTR") — minimum 1.5%
   - Hook Rate à 3s (vidéo : "Video sah 3 Sekunden" / Total impressions)
3. Identifier l'angle winner → noter dans `CREATIVE_PERFORMANCE_TRACKER.md`

### Méthode de comparaison
```
ANGLE A : ROAS X.X | CPP €XX | CTR X.X% | Hook Rate X%
ANGLE B : ROAS X.X | CPP €XX | CTR X.X% | Hook Rate X%
ANGLE C : ROAS X.X | CPP €XX | CTR X.X% | Hook Rate X%

WINNER : [ANGLE X] — dominant sur [ROAS / CPP / CTR] critère principal
```

---

## ÉTAPE 2 — SNIPER : PLAN D'ITÉRATION CRÉATIVE

### Le principe
1 angle winner → explorer TOUTES ses dimensions :
- **Nouveaux hooks** (format, perspective, ton)
- **Nouvelles BC** (preuve scientifique, social proof, storytelling)
- **Nouveaux formats** (30s vs 60s, POV vs testimonial, talking head vs B-roll)
- **Nouveaux avatars** (même angle, personne différente)

### 15 variations Sniper à créer (par angle winner)

| # | Variation | Changement | Priorité |
|---|-----------|-----------|---------|
| SN-01 | Hook texte → Hook question | "Schläfst du auch schlecht?" | P0 |
| SN-02 | Hook statement → Hook chiffre | "73% der Deutschen..." | P0 |
| SN-03 | Hook normal → Hook confessionnel | "Ich glaube, ich war süchtig nach..." | P0 |
| SN-04 | Avatar Markus → Avatar Julia | Même script, femme 35 professionnelle | P0 |
| SN-05 | 60s → 30s (version condensée) | Garder hook + mécanisme + CTA seulement | P1 |
| SN-06 | BC longue → BC courte (2 lignes) | Test lisibilité mobile | P1 |
| SN-07 | Headline bénéfice → Headline social proof | "20.000 Deutsche..." | P1 |
| SN-08 | CTA "Jetzt kaufen" → CTA "Gratis testen" | Test aversion risque | P1 |
| SN-09 | Format 1:1 → Format 9:16 | Stories + Reels | P1 |
| SN-10 | Fond blanc → Fond lifestyle | Cuisine / chambre / bureau | P2 |
| SN-11 | Voix off → Sous-titres seuls | Test sans audio | P2 |
| SN-12 | Avatar solo → Couple/famille | Contexte relationnel | P2 |
| SN-13 | Journée normale → Avant/après | Structure transformation | P2 |
| SN-14 | Preuve testimonial → Preuve clinique | Stat meta-analyse 2026 | P2 |
| SN-15 | CTA direct → CTA éducatif | "Erfahre wie Nellio wirkt" | P2 |

### Méthode de production Sniper
- **Semaine 1 post-winner :** SN-01 à SN-05 (variations de hook et avatar)
- **Semaine 2 :** SN-06 à SN-10 (formats et copy)
- **Semaine 3 :** SN-11 à SN-15 (créatifs avancés)
- **Budget alloué :** 60% winner actuel + 40% test variations Sniper

---

## ÉTAPE 3 — STRUCTURE CAMPAGNE SNIPER

### Architecture recommandée post-72h

```
CAMPAGNE NLO_DE_SNIPER — CBO
Budget : €120/j (augmenté vs Marksman €65/j)

ADSET 01 — [ANGLE WINNER] CORE (winner original)
→ Budget minimum : 30% du CBO
→ Pas de modification — laisser l'algorithme optimiser

ADSET 02 — [ANGLE WINNER] HOOK VARIATIONS
→ SN-01 / SN-02 / SN-03
→ Tester quelle variation de hook booste le hook rate

ADSET 03 — [ANGLE WINNER] AVATAR VARIATIONS
→ SN-04 / SN-05
→ Même angle, profil différent

ADSET 04 — RETARGETING WINNER
→ Utiliser RETARGETING_CREATIVES_DE.md
→ Activer J+3 avec warm audience ATC/PDP
→ Budget séparé : €20/j extra
```

### Règles Sniper spécifiques
- **NE PAS** modifier le winner original (le laisser tourner)
- **NE PAS** lancer > 5 nouvelles variations par semaine (algorithme mémorisation)
- **Couper** toute variation Sniper sans achat en 72h + CPP > €40
- **Scaler** la variation Sniper winner avec +20% budget/72h si ROAS > 2.5

---

## ÉTAPE 4 — SCALING POST-SNIPER

### Seuils d'escalade budget

| Budget quotidien | Condition requise | Action |
|-----------------|------------------|--------|
| €65/j → €80/j | ROAS > 2.0 stable 72h | +20% |
| €80/j → €100/j | ROAS > 2.0 stable 5j | +20% |
| €100/j → €150/j | ROAS > 1.8 stable 7j | +50% |
| €150/j → €250/j | ROAS > 1.8 stable 10j | Nouvelle campagne |
| €250/j → €500/j | ROAS > 1.6 stable 14j | Scale horizontal (nouvelles audiences) |

### Scale horizontal au-delà de €200/j
1. Dupliquer la campagne winner → nouvelle campagne avec audiences LAL 1% (voir LOOKALIKE_AUDIENCE_STRATEGY_DE.md)
2. Tester Interest Stacks (voir même fichier)
3. Conserver l'originale — ne pas modifier celle qui tourne

---

## ÉTAPE 5 — APRÈS LE SNIPER : MARKSMAN 2

Quand l'angle Sniper est épuisé (fréquence > 4, CPM +50%, ROAS baisse > 20%) :
1. Revenir en Marksman sur 2 nouveaux angles (non testés en phase 1)
2. Sourcer depuis `ANGLE_BANK_V2.md` (angles 31-50 non encore testés)
3. Budget Marksman 2 : garder 70% sur winner Sniper actif + 30% test 2 nouveaux angles

---

## CHECKLIST SNIPER — À COCHER À J+3

- [ ] 72h data complète — Ads Manager filtré par adset
- [ ] Clear winner identifié (ROAS + CPP + CTR)
- [ ] Angles losers coupés (ou budget mini si incertain)
- [ ] `CREATIVE_PERFORMANCE_TRACKER.md` mis à jour avec statuts
- [ ] SN-01 à SN-05 briefés/produits
- [ ] Budget CBO augmenté à €120/j
- [ ] Retargeting activé (ADSET 04)
- [ ] Prochaine review planifiée à J+6

---

## RÉFÉRENCE FICHIERS SNIPER

| Fichier | Usage |
|---------|-------|
| `CREATIVE_PERFORMANCE_TRACKER.md` | Logger winners/losers |
| `AB_TEST_HYPOTHESIS_PACK.md` | Cadre décision 72h |
| `RETARGETING_CREATIVES_DE.md` | Activer retargeting J+3 |
| `LOOKALIKE_AUDIENCE_STRATEGY_DE.md` | Scale horizontal |
| `META_AUTOMATION_RULES_DE.md` | Protections budget auto |
| `SCRIPTS_BATCH01.md` + `SCRIPTS_BATCH03.md` | Scripts source pour variations |

---

*Sniper Phase déclenchée dès qu'un angle Marksman est clear winner à 72h.*  
*Si aucun winner clair → voir AB_TEST_HYPOTHESIS_PACK.md scénario "SURVEILLER".*
