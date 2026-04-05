# Frühlingsmüdigkeit + WSD — Decision Brief 17/03 (J+3 Decision Gate)
> Généré le 2026-03-17 02h36 · autonomous-executor (tasks-generator)
> ⚠️ AUJOURD'HUI = DECISION GATE FRÜHLINGSMÜDIGKEIT (GO LIVE 14/03 + 72h = 17/03 MATIN)

---

## 🚨 CONTEXTE OPÉRATIONNEL

| Campagne | GO LIVE | J+72h (décision) | Statut |
|---------|---------|-----------------|--------|
| NLO_DE_WSD_2026 | 13/03 (présumé) | **16/03 ✅ passé** | → Appliquer POST_WSD_SCALING_PLAYBOOK.md |
| NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 | **14/03** | **⚠️ 17/03 = AUJOURD'HUI** | → Décision à prendre CE MATIN |
| NLO_DE_SALES (Frühlingsmüdigkeit) | **14/03** | **⚠️ 17/03 = AUJOURD'HUI** | → Décision parallèle |

**⚠️ Chef : vérifier Meta Ads Manager dans l'heure qui suit le réveil. Decision Gate active.**

---

## 📊 TABLEAU DE DÉCISION — FRÜHLINGSMÜDIGKEIT J+72h

### Règles SCALE / SURVEILLER / STOP

| Métrique | SCALE ✅ | SURVEILLER 🟡 | STOP 🔴 |
|---------|---------|--------------|--------|
| ROAS | > 2.0 | 1.4 – 2.0 | < 1.4 |
| CPP (Coût par Achat) | < €25 | €25 – €40 | > €40 |
| CTR (lien) | > 1.8% | 1.0 – 1.8% | < 1.0% |
| CPM | < €18 | €18 – €28 | > €28 |
| Fréquence | < 2.5 | 2.5 – 3.5 | > 3.5 |

### Décision SCALE
```
ROAS > 2.0 ET CPP < €25 :
→ Augmenter budget +20% (ex: €60/j → €72/j)
→ Dupliquer l'adset gagnant
→ Maintenir les 3 adsets actifs
→ Ajouter Primary Text S47-B "kognitive Dissonanz" en A/B test
```

### Décision SURVEILLER
```
ROAS 1.4-2.0 OU CPP €25-40 :
→ Maintenir budget actuel sans modifier
→ Identifier l'adset le plus performant
→ Couper l'adset le moins performant si CPP > 2× le meilleur
→ Attendre J+5 (19/03) pour prochaine décision
```

### Décision STOP
```
ROAS < 1.4 ET CPP > €40 :
→ Pauser les adsets déficitaires
→ Garder uniquement le meilleur adset en test à €20/j
→ Rafraîchir la créative : tester S47-B ou S42-B (nouveaux hooks)
→ Si à J+5 encore déficitaire → arrêter la campagne
```

---

## 🎯 CHECKLIST DECISION GATE — 17/03 MATIN

### Étape 1 — Lire les données (5 min)
```
Meta Ads Manager → NLO_DE_FRUEHLINGSMUEDIGKEIT_2026
→ Colonnes : ROAS · CPP · CTR · CPM · Fréquence · Achats · Dépense
→ Fenêtre : 14/03 → 17/03 (72h exactement)
→ Comparer par adset : Broad DE / Schlaf+Erschöpfung / Melatonin Switcher
```

### Étape 2 — Appliquer la décision (3 min)
```
→ Identifier le scénario (SCALE/SURVEILLER/STOP)
→ Exécuter les actions correspondantes (voir tableau ci-dessus)
```

### Étape 3 — Ajouter une nouvelle créative (si SCALE ou SURVEILLER)
```
Si adsets OK → ajouter S47-B "kognitive Dissonanz" comme 3ème Primary Text
Copy disponible dans SCRIPTS_BATCH47.md → BC1 (court) ou Body complet
→ Activer en test A/B face aux Primary Texts existants
```

### Étape 4 — Aligner WSD + Frühlingsmüdigkeit (2 min)
```
Si WSD toujours actif :
→ Vérifier le ROAS WSD (décision gate WSD était 16/03)
→ Si WSD ROAS > 2.0 : maintenir les 2 campagnes en parallèle
→ Si WSD ROAS < 1.4 : pauser WSD · concentrer budget sur Frühlingsmüdigkeit
```

---

## 📅 CALENDRIER OPÉRATIONNEL 17/03 → 30/04

### Phase 1 — Frühlingsmüdigkeit (MAINTENANT → 30/04)
| Date | Action |
|------|--------|
| 17/03 (AUJOURD'HUI) | Decision Gate 72h → SCALE/SURVEILLER/STOP |
| 19/03 | Si SURVEILLER : 2ème check · Si SCALE : +20% budget |
| 21-24/03 | Rafraîchir créative avec S47-B ou S47-A si fatigue (fréq > 2.5) |
| 25/03 | GO LIVE Zeitumstellung (campagne parallèle) |
| 30/03 | Post-Zeitumstellung J+1 review (48h data) |
| 10/04 | GO LIVE FIBO campagne (parallèle si budget) |
| 21/04 | Stop FIBO · Évaluer Frühlingsmüdigkeit |
| 30/04 | Stop Frühlingsmüdigkeit (fin fenêtre printanière) |

### Budget estimé Phase 1
| Scénario | Budget Frühlingsmüdig. | Budget Total (avec Zeitumst + FIBO) |
|---------|----------------------|-------------------------------------|
| SCALE | €72-86/j → €120/j | €190-220/j peak |
| SURVEILLER | €60/j maintenu | €130-160/j peak |
| STOP | €0 (test €20/j) | €70-100/j (Zeitumst seulement) |

---

## 🔄 AXES D'OPTIMISATION CRÉATIVE (Post-72h)

### Si CPM élevé (> €22) — Problème audience
→ Réduire Broad DE → tester 35-55 seulement
→ Exclure audience "Fitnessstudio + Biohacking" (trop compétitive au CPM)

### Si CTR faible (< 1.2%) — Problème hook vidéo
→ S47-B "kognitive Dissonanz" (hook nouveau tagesschau) = test immédiat
→ S45-A "7h aber brauchen 8h" = hook chiffré Pronova BKK
→ S42-B "naheliegende Erklärung" = formulaiton psychologique

### Si CPP élevé + CTR OK — Problème landing page
→ Vérifier drinknellio.com PDP (CRO_PDP_RECOMMENDATIONS.md)
→ Vérifier FAQ PDP mise à jour (FAQ_PDP_UPDATE_DE.md)
→ Vérifier bundle et upsell Aftersell (SHOPIFY_BUNDLE_SETUP_GUIDE.md)

### Si ROAS < breakeven 1.40 — Vérifier attribution
→ Meta Business Manager → Events Manager → Vérifier Pixel Purchase
→ Possible sous-attribution iOS 14+ (real ROAS peut être 20-30% plus élevé)
→ Croiser avec Shopify : commandes DE depuis 14/03 vs Meta attribution

---

## 🎬 TOURNAGE PRIORITAIRE — SEMAINE 17-21/03

### Tier 1 — Filmer CETTE SEMAINE (impact Frühlingsmüdigkeit direct)
| Script | Hook | Durée | Setup | Urgence |
|--------|------|-------|-------|---------|
| **S47-B** | "Tagesschau kognitive Dissonanz" | 50-55s | Terrasse/intérieur lumière naturelle | 🔴 P0 GO LIVE IMMÉDIAT |
| **S47-A** | "Frontiers KSM-66 Kinder" | 50-55s | Bureau/cuisine · éclairage naturel | 🔴 P0 Evergreen inattaquable |
| **S46-A** | "SWR sucht — findet nichts" | 55s | Bureau/cuisine matinal | 🔴 P0 GO LIVE IMMÉDIAT (déjà briefé) |

### Tier 2 — Filmer semaine 21-25/03 (Zeitumstellung)
| Script | Hook | Durée | Setup |
|--------|------|-------|-------|
| **S47-C** | "EU Zeitumstellung INÉDIT" | 45-50s | Bureau matinal |
| **S46-B** | "Kürzeste Nacht des Jahres" | 50-55s | Chambre matin (déjà briefé) |

---

## ✅ RÉCAPITULATIF ACTIONS IMMÉDIATES (17/03 matin)

```
ORDRE PRIORITÉ :
1. [HUMAIN] Meta Ads Manager → vérifier ROAS Frühlingsmüdigkeit → SCALE/SURVEILLER/STOP
2. [HUMAIN] Vérifier WSD campaign ROAS → décision parallèle
3. [HUMAIN] Filmer S47-B "kognitive Dissonanz" (50s terrasse · 15-25 min setup)
4. [HUMAIN] Filmer S47-A "KSM-66 Kinder" (50s intérieur · 15-25 min setup)
5. [AGENT] Créer campagne Zeitumstellung NLO_DE_ZEITUMST_2026 avant 23/03
   → Checklist dans ZEITUMSTELLUNG_J12_ACTIVATION_BRIEF.md
   → Canva dans ZEITUMSTELLUNG_CANVA_PRODUCTION_SHEET.md
```
