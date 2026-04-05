# Lookalike & Advanced Audience Strategy — NLO_DE
> Clawdbot Prime ⚡ | Généré le 2026-03-02 | drinknellio.com
> Phase 2 scaling (post 100+ achats confirmés)

---

## 📊 OVERVIEW — SÉQUENCE D'AUDIENCES

```
PHASE 1 — MARKSMAN (J0 → J+21)
└─ Broad Allemagne 25-54 → 3 angles cold (test pur)

PHASE 2 — SNIPER (J+21 → J+60)
└─ Broad winner + LAL 1% Purchasers

PHASE 3 — SCALE (J+60 → J+90+)
└─ LAL 1-3% + Interest Stack + Retargeting pyramide
```

---

## 🎯 PHASE 1 — BROAD AUDIENCE (J0 → J+21)

### Setup actuel (déjà dans MEDIA_PLAN_LANCEMENT.md)

| Adset | Ciblage | Budget | Objectif |
|-------|---------|--------|----------|
| AS1 — Broad Femmes | Femmes 25-54 DE | CBO partagé | Tester 3 angles simultanément |
| AS2 — Broad Hommes | Hommes 28-50 DE | CBO partagé | Identifier quel genre répond |
| AS3 — Broad Mix | 25-54 DE (M+F) | CBO partagé | Donner liberté à l'algo |

**Objectif Phase 1 :** Identifier le winner parmi 3 angles. Minimum 50-100 achats.

---

## 🎯 PHASE 2 — LOOKALIKE AUDIENCE (J+21 → J+60)

### Prérequis : 100+ Purchasers dans Pixel

**Quand créer tes LAL :**
→ Dès 50 achats : LAL 1% possible mais moins précis
→ **100 achats : LAL 1% optimal** (recommandé minimum)
→ 500 achats : LAL 1-3-5% très précis

### Les 5 Custom Audiences à créer en priorité

```
CA #1 — Purchasers 90j
Source : Pixel → Purchase → 90 derniers jours
Usage : Exclusion systématique (ne jamais retargeter les acheteurs avec cold ads)
→ Créer dès J+1 (même avec 0 achats — la liste se remplit automatiquement)

CA #2 — ATC Non-Convertis 30j
Source : Pixel → AddToCart MINUS Purchase → 30 derniers jours
Usage : Retargeting hot (voir RETARGETING_CREATIVES_DE.md)
→ Créer dès J+1

CA #3 — Visiteurs PDP 30j
Source : Pixel → ViewContent → 30 derniers jours
Usage : Retargeting tiède
→ Créer dès J+1

CA #4 — Purchasers LTV (all time)
Source : Pixel → Purchase → Valeur élevée (top 25%)
Usage : Source LAL premium
→ Activer dès 50 achats

CA #5 — Engagés Facebook/Instagram 60j
Source : Facebook Page + Instagram → Tous les engagements → 60j
Usage : Warm audience alternative si Pixel faible
→ Créer maintenant (fonctionne sans données Pixel)
```

---

### Les 4 Lookalike Audiences à créer (dès 100 achats)

| LAL | Source | Taille | Priorité | Objectif |
|-----|--------|--------|----------|----------|
| LAL 1% DE | CA Purchasers 90j | ~870K personnes | 🔴 P0 | Most similar → cold scale |
| LAL 2% DE | CA Purchasers 90j | ~1.7M personnes | 🟡 P1 | Reach élargi |
| LAL 1% DE — LTV | CA Purchasers LTV | ~870K personnes | 🟡 P1 | Profil acheteur premium |
| LAL 3% DE | CA Purchasers 90j | ~2.6M personnes | 🟢 P2 | Volume scale |

**Comment créer dans Meta :**
```
Meta → Business Manager → Audiences
→ Créer une audience → Lookalike
→ Source : Custom Audience "Purchasers 90j"
→ Pays : Allemagne
→ Taille : 1%
→ Nommer : NLO_LAL-1%_DE_Purchasers90j_[DATE]
```

---

## 🎯 PHASE 3 — INTEREST STACK (J+60 → Scale)

### Quand l'utiliser
→ Quand LAL seul sature (fréquence >2.5 en 7j)
→ Pour toucher des segments non couverts par LAL
→ Test d'angles de niche (wellness, biohacking, etc.)

### Stack d'intérêts recommandés pour NLO_DE (Alemagne)

**Cluster 1 — Stress & Mental Health**
```
- "Burnout" (intérêt Facebook)
- "Stressabbau" 
- "Achtsamkeit"
- "Meditation"
- "Angststörung" *(utiliser avec précaution Meta policy)*
```
→ Audience estimée : 2-4M DE → Cibler F+M 28-50

**Cluster 2 — Sleep & Recovery**
```
- "Schlafstörungen"
- "Schlafqualität"
- "Erholung" 
- "Melatonin" *(concurrents = acheteurs potentiels)*
- "Natürliche Schlafmittel"
```
→ Audience estimée : 1-3M DE → Cibler F+M 30-55

**Cluster 3 — Supplements & Wellness**
```
- "Nahrungsergänzungsmittel"
- "Ashwagandha"
- "Magnesium"
- "L-Theanin"
- "Naturheilkunde"
```
→ Audience estimée : 3-5M DE → Cibler M+F 25-45

**Cluster 4 — Professional & Career**
```
- "Karriere" + "Stress"
- "Manager" + "Work-life balance"
- "Burnout Prävention"
- "Produktivität"
```
→ Audience estimée : 2-3M DE → Cibler M+F 28-45

**Cluster 5 — Maman Active** *(avatar Sonja)*
```
- "Mutter"
- "Vereinbarkeit Familie Beruf"
- "Kinderbetreuung"
- "Erschöpfung" 
```
→ Audience estimée : 1-2M DE → Cibler F 28-45

---

### Règles de combinaison Interest Stack

```
✅ Bon : 1 cluster par adset (3-5 intérêts max, OR non AND)
✅ Bon : Broad sans intérêts si algorithme performe bien
❌ Mauvais : Mélanger clusters différents dans 1 adset
❌ Mauvais : Intérêts trop spécifiques (<200K personnes)
❌ Mauvais : Stack >7 intérêts par adset
```

---

## 🔺 PYRAMIDE RETARGETING COMPLÈTE (Phase 3)

```
                🔥 ATC Non-convertis 7j (le plus chaud)
                    Budget : 10% du total Meta
                    Creative : urgence + testimonial
                    
              💛 Visiteurs PDP 14j (chaud)
                    Budget : 15% du total
                    Creative : proof social + FAQ
                    
          💙 Engagés Social 30j + Visiteurs PDP 30j (tiède)
                    Budget : 20% du total
                    Creative : storytelling + avant/après
                    
      🌊 Broad DE 25-54 + LAL 1% (froid — acquisition)
                    Budget : 55% du total
                    Creative : hooks 3s + désirs primaires
```

---

## 📊 BUDGET ALLOCATION RECOMMANDÉE (Post-Scale)

| Audience | % Budget | Budget à €200/j | Objectif |
|---------|----------|-----------------|----------|
| Broad / LAL 1% | 55% | €110 | Acquisition cold |
| LAL 2-3% | 15% | €30 | Scale élargi |
| Interest Stack winners | 15% | €30 | Niche ciblée |
| Retargeting pyramid | 15% | €30 | Conversion warm |

---

## ⚙️ NAMING CONVENTION AUDIENCES

```
Format : NLO_[TYPE]_[PAYS]_[DESCRIPTION]_[TAILLE/JOURS]_[DATE]

Exemples :
NLO_CA_DE_Purchasers_90j_2026-04
NLO_CA_DE_ATC_NonConv_30j_2026-04
NLO_LAL_DE_1pct_Purchasers90j_2026-04
NLO_INT_DE_Stress-Schlaf-Cluster1_2026-04
NLO_RT_DE_Visiteurs-PDP-14j_2026-04
```

---

## 📋 CHECKLIST AUDIENCES — SÉQUENCE CRÉATION

### Immédiatement (J0 — sans données)
- [ ] CA Purchasers 90j — créer (liste vide, se remplit auto)
- [ ] CA ATC Non-Convertis 30j — créer
- [ ] CA Visiteurs PDP 30j — créer
- [ ] CA Engagés Social 60j — créer

### Dès 50 achats (~J+21 si ROAS correct)
- [ ] CA Purchasers LTV — créer
- [ ] LAL 1% DE depuis Purchasers 90j — créer + tester en adset séparé

### Dès 100 achats (~J+35-45)
- [ ] LAL 1% DE depuis LTV — créer
- [ ] LAL 2% DE — créer
- [ ] Activer Retargeting ATC si adset dédié pas encore live

### Dès 300 achats (~J+60-90)
- [ ] LAL 3-5% DE — créer
- [ ] Interest Stack Cluster 1 (Stress) — tester 1 adset
- [ ] Pyramide retargeting complète — activer

---

## 🔬 TESTS D'AUDIENCES RECOMMANDÉS (Phase Sniper)

Une fois le winner d'angle identifié, tester EN PARALLÈLE :

| Test | Adset A | Adset B | Variable |
|------|---------|---------|----------|
| Test #1 | Broad 25-54 | LAL 1% | Broad vs LAL |
| Test #2 | F 25-54 | M 25-54 | Genre |
| Test #3 | 25-35 | 35-54 | Âge |
| Test #4 | Interest Sleep | Interest Stress | Cluster |

**Règle :** Changer 1 variable à la fois. Budget identique par adset. Durée min 72h.

---

## 🏆 AUDIENCES GAGNANTES THÉORIQUES (basé sur 145 verbatims)

| Rang | Profil | Raison |
|------|--------|--------|
| 🥇 | F 30-45 DE (Maman active) | 68 verbatims femmes surmenées famille/travail |
| 🥈 | M 32-45 DE (Manager pro) | 47 verbatims hommes cadres cortisol/performance |
| 🥉 | F+M 25-35 DE (Millénial stressé) | 30 verbatims "pas abschalten können" |

→ **À valider avec data Meta réelle — ne pas présupposer.**

---

*Fichier : EVOLVE_RESULTS/LOOKALIKE_AUDIENCE_STRATEGY_DE.md*
*Utilisé avec : MEDIA_PLAN_LANCEMENT.md · RETARGETING_CREATIVES_DE.md · AB_TEST_HYPOTHESIS_PACK.md*
