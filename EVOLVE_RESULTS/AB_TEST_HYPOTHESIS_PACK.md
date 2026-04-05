# A/B Test Hypothesis Pack — NLO_DE Lancement Marksman
> Créé : 2026-03-02 | Session autonome Clawdbot Prime ⚡
> Objectif : Structurer les hypothèses et critères de décision avant le lancement — décisions data-driven à 72h

---

## 🎯 CADRE DE TEST MARKSMAN

**Structure :** 3 angles × 2 Body Copies × 2 Headlines = 12 ads
**Budget :** ~€65/j CBO → distribution automatique Meta
**Durée phase 1 :** 72 heures sans toucher
**Critère winner :** ROAS > 2.5 ET CPP < €35 ET Impressions > 500/ad

---

## 📋 HYPOTHÈSES PAR ANGLE

### Angle #1 — DER TEUFELSKREIS (Script S1 — Avatar Sonja)
**Hypothèse de départ :** L'angle cortisol-stress-cycle résonne avec les audiences larges (Broad DE) qui reconnaissent le cercle vicieux mais n'en connaissent pas la cause physiologique.

**Prédiction :**
- Hook retention > 30% (pattern identification fort)
- CPP prédit : €28-38 (angle éducatif, conversion lente)
- Meilleure audience : Femmes 28-45

**Critères de décision à 72h :**

| Métrique | ✅ SCALE | 🟡 SURVEILLER | 🔴 STOP |
|----------|----------|---------------|---------|
| ROAS | > 2.5 | 1.5-2.5 | < 1.0 après 48h |
| CPP (€) | < 30 | 30-45 | > 50 |
| Hook retention 3s | > 35% | 25-35% | < 20% |
| CTR | > 1.5% | 0.8-1.5% | < 0.5% |
| CPM | < €15 | €15-25 | > €30 |

**Si winner :** Scale vers adset dédié Broad DE 28-45 Femmes · Budget +20%/48h
**Si perdant :** Analyser hook vs body copy (quel élément abandonne)

---

### Angle #2 — DAS GEDANKENKARUSSELL (Script S2 — Avatar Markus)
**Hypothèse de départ :** L'angle "rumination mentale le soir" est le plus universel — reconnaissable par les 3 avatars. Expected à sur-performer en reach vs taux de conversion.

**Prédiction :**
- Hook retention élevée (image forte) mais possible baisse conversion (angle générique)
- CPP prédit : €32-42
- Meilleure audience : Mixte 30-50

**Critères de décision à 72h :**

| Métrique | ✅ SCALE | 🟡 SURVEILLER | 🔴 STOP |
|----------|----------|---------------|---------|
| ROAS | > 2.5 | 1.5-2.5 | < 1.0 après 48h |
| CPP (€) | < 35 | 35-45 | > 50 |
| Hook retention 3s | > 40% | 30-40% | < 25% |
| CTR | > 1.2% | 0.7-1.2% | < 0.4% |

**Si winner :** Test audience Retargeting avec version courte 30s
**Si perdant mais hook fort :** Recrire body copy — problème probable = pas assez de différenciation produit

---

### Angle #3 — CORTISOL NACHTS (Script S3 — Avatar Markus professionnel)
**Hypothèse de départ :** L'angle scientifique "cortisol nocturne" sur-performe auprès des sceptiques éduqués (40-55 ans). Conversion plus faible en volume mais AOV potentiellement plus élevé.

**Prédiction :**
- Hook retention modérée (angle technique)
- CPP prédit : €35-50 mais LTV client > autres angles
- Meilleure audience : Hommes 35-55

**Critères de décision à 72h :**

| Métrique | ✅ SCALE | 🟡 SURVEILLER | 🔴 STOP |
|----------|----------|---------------|---------|
| ROAS | > 2.0 | 1.2-2.0 | < 0.8 après 48h |
| CPP (€) | < 40 | 40-55 | > 60 |
| Hook retention 3s | > 25% | 18-25% | < 15% |
| CTR | > 1.0% | 0.6-1.0% | < 0.35% |

**Note :** Seuil ROAS abaissé à 2.0 (vs 2.5) car LTV client sceptique tend à être supérieur (réachat auto)
**Si winner :** Paired avec ADV06 (advertorial "Arzt erklärt") en retargeting — combo fort

---

## 🧪 HYPOTHÈSES BODY COPY (BC)

### BC-A vs BC-B par angle
**Règle d'analyse :** Même hook, même headline → isoler l'impact du corps du texte

| Variable | BC-A | BC-B | Comment mesurer |
|----------|------|------|-----------------|
| Long vs court | 150 mots | 80 mots | CTR × CVR |
| Testimonial first | Non | Oui | Confiance initiale |
| Stats d'abord | Oui | Non | Sceptiques vs émotionnels |

**Décision à 72h :** Couper le BC avec CTR < 0.6% → garder le meilleur, créer BC-C avec les éléments des deux

---

## 🏷️ HYPOTHÈSES HEADLINES (H)

### H1 vs H2 par angle
**Format recommandé :**
- H1 : Bénéfice direct ("Endlich wieder durchschlafen")
- H2 : Curiosité/Tension ("Warum du morgens erschöpft bist — obwohl du 8h schläfst")

**Décision :** H avec CTR > 1.5% → winner. H avec CTR < 0.8% → couper à 48h.

---

## 📈 MATRICE DE DÉCISION 72H

```
SCÉNARIO 1 — Un angle clear winner (ROAS > 2.5)
→ Couper les 2 autres adsets
→ Ouvrir adset dédié winner avec budget x3
→ Dupliquer vers audience similaire (LAL 1% acheteurs)
→ Phase Sniper : 3 nouvelles créatifs sur cet angle seul

SCÉNARIO 2 — Aucun winner (tous ROAS < 1.5)
→ Ne PAS scale
→ Analyser : Pixel problème ? Landing page ? Créatif ?
→ Checker : Events Manager (Purchase trackés ?) + Meta Pixel Helper
→ Wait 48h supplémentaires avant décision finale

SCÉNARIO 3 — Deux angles proches (ROAS 1.8-2.5)
→ Garder les 2 actifs
→ Booster le budget global à €80/j
→ Tester BC-C (hybride) sur les 2 angles
→ Décision finale à J+5

SCÉNARIO 4 — Données insuffisantes (< 3 conversions/adset)
→ Budget insuffisant ou période trop courte
→ Solution : Augmenter à €80/j OU attendre J+5
→ Ne jamais décider sur < 3 purchases par adset
```

---

## ⏱️ CALENDRIER DE MONITORING

| Timing | Action | Seuil d'alerte |
|--------|--------|----------------|
| J+24h | Check CPM + CTR uniquement | CPM > €30 = alarme |
| J+48h | Première évaluation ROAS | ROAS < 0.8 = pause immédiate |
| J+72h | Décision Marksman | Scénario 1-2-3-4 |
| J+5 | Confirmation winner | Budget x3 sur winner |
| J+7 | Lancement Phase Sniper | 3 créatifs sur angle winner |

**Règle absolue :** Aucune modification campagne dans les 24h après lancement. L'algorithme Meta a besoin de temps pour l'apprentissage.

---

## 🔴 BLOQUEURS PRÉ-LANCEMENT (rappel)

Avant d'utiliser ce document, vérifier :
- [ ] Meta Pixel Purchase event trackée (Events Manager vert)
- [ ] Domaine validé dans Business Manager
- [ ] 4 événements AEM configurés (Purchase / IC / ATC / VC)
- [ ] URLs UTM configurées sur tous les ads

→ Référence complète : `META_PRELAUNCH_CHECKLIST.md`

---

*Clawdbot Prime ⚡ | 2026-03-02 | Format : Décision framework — utilisable directement au lancement*
