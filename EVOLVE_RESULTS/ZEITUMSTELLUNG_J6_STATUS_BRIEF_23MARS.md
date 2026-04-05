# Zeitumstellung J-6 — Status Brief 23 Mars 2026
> Generiert : 2026-03-23 · Cron autonomous-executor 07h10

---

## ⚡ Situation actuelle (23/03 07h10)

| Campagne | Statut | Decision Gate |
|----------|--------|---------------|
| NLO_DE_ZEITUMST_2026 | ✅ GO LIVE depuis 22/03 | Decision Gate **25/03 matin** (72h) |
| NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 | ⚠️ LIVE J+9 | **DECISION GATE CE MATIN** (vérifier ROAS Meta) |
| NLO_DE_FIBO_LONGEVITY_2026 | 🔲 À configurer | GO LIVE 10/04 · Setup 5-9/04 |

---

## 🔴 DECISION GATE FRÜHLINGSMÜDIGKEIT — CE MATIN ABSOLU

**Durée campagne :** 14/03 → 23/03 = J+9 (seuil 72h largement dépassé)

**Action à faire (15 min dans Meta Ads Manager) :**

| Métrique | Seuil SCALE | Seuil SURVEILLER | Seuil STOP |
|----------|-------------|-----------------|------------|
| ROAS | > 2.0 | 1.5 - 2.0 | < 1.5 |
| CPP (Cost per Purchase) | < €35 | €35-€55 | > €55 |
| CTR (Link) | > 1.5% | 1.0-1.5% | < 1.0% |
| Hook Rate (Watch 3s) | > 30% | 20-30% | < 20% |

**Si SCALE :** +20% budget → €72/j → notifier canal Discord  
**Si SURVEILLER :** maintenir · tester nouvelles créatives (S45-B / S47-B / S48-A)  
**Si STOP :** couper · concentrer budget sur Zeitumstellung

---

## 📊 Decision Gate Zeitumstellung — 25/03 matin

**Campagne GO LIVE :** 22/03 08h00 (J0)  
**72h atteintes :** 25/03 08h00  
**Budget actuel :** €70/j (3 adsets)

**Seuils décision 25/03 :**

| Métrique | SCALE | SURVEILLER | STOP |
|----------|-------|-----------|------|
| ROAS blended | > 2.0 | 1.4-2.0 | < 1.4 |
| CPP | < €40 | €40-€60 | > €60 |
| CTR | > 1.5% | 1.0-1.5% | < 1.0% |
| Dépense totale | €140+ | OK | < €100 (sous-delivery) |

**Si SCALE :** +20% budget → €84/j → +20% demain 26/03 si stable  
**Si SURVEILLER :** maintenir · tester S88-A/B/C créatives nouvelles  
**Si STOP :** couper · post-mortem · garder Frühlingsmüdigkeit si ROAS > 2.0

---

## 🎬 Ordre de tournage prioritaire (23/03 → 29/03)

### Filmer CE MATIN (expire bientôt)
1. **S87-C "70% wartet nicht"** → BRISANT DAK · 45s · intérieur · expire 29/03
2. **S88-C "BR24 antwortet halb"** → GAP ARD · 45s · salon · evergreen GO LIVE IMMÉDIAT

### Filmer 23-25/03
3. **S88-A "Mehr Licht Weniger Schlaf"** → PARADOXE echo24 INÉDIT · 50s · fenêtre
4. **S87-A "RTL Andropause"** → Thomas #15 RTL · 45-50s · chambre/bureau
5. **S88-B "SHZ fragt"** → PREMIER SHZ · 45s · bureau · expire 29/03

### Filmer 24-27/03
6. **S86-A "Brisant 70%"** → ARD Das Erste INÉDIT · 45s · salon
7. **S87-B "BR24 GAP"** → evergreen · 50s · salon/cuisine

### Evergreen (n'importe quand)
8. **S83-C "Abendlicht paradoxe"** → 45s · terrasse/fenêtre
9. **S77-A "Chronobiologen GAP"** → angle inédit · bureau
10. **S65-C "bleierne Erschöpfung"** → Frühlingsmüdigk. · evergreen

---

## 📅 Calendrier Budget 23/03 → 21/04

| Période | Campagne | Budget/j | Dépense estimée |
|---------|----------|----------|-----------------|
| 22-29/03 | Zeitumstellung | €70 | €490 |
| 14-29/03 | Frühlingsmüdigkeit | €60-72 | €900-1,080 |
| 30/03-09/04 | Zeitumstellung (scale si winner) | €84+ | €840+ |
| 10-21/04 | FIBO Longevity | €70 | €770 |
| 14/03-30/04 | Frühlingsmüdigkeit (si scale) | €72-90 | €1,440+ |
| **TOTAL** | | | **~€4,500-5,500** |

---

## 💡 Nouveaux signaux (23/03 07h10)

- **shz.de PREMIER pipeline** : Schleswig-Holstein Zeitung · couverture 16/16 Bundesländer maintenant
- **echo24 paradoxe INÉDIT** : "mehr Licht / weniger Schlaf" → nouveau hook S88-A
- **BR24 GAP confirmé × 4 sessions** : le pattern est documenté → créatif evergreen S88-C
- **8 sources MSM en 24h** = PEAK J-6 momentum (ruhr24 + br + shz + brisant + monrose + allgaeuer + saarbruecker + echo24)
- **Total pipeline :** 1845 verbatims · 1065+ ads · 88 semaines · Coverage DE 100%

---

## 🎯 Prochaines étapes

1. **CE MATIN** → Vérifier ROAS Frühlingsmüdigkeit dans Meta Ads Manager
2. **CE MATIN** → Tourner S87-C + S88-C (2 scripts · ~15 min total setup)
3. **25/03 matin** → Decision Gate Zeitumstellung (72h)
4. **26-28/03** → Tourner Tier 1 scripts restants avant J0 Zeitumstellung
5. **5-9/04** → Setup campagne NLO_DE_FIBO_LONGEVITY_2026 (`FIBO_LONGEVITY_CREATIVE_PACK.md`)

---

## 📌 Fichiers clés

| Besoin | Fichier |
|--------|---------|
| Decision Gate FM CE MATIN | `ZEITUMSTELLUNG_J6_DECISION_BRIEF_23MARS.md` |
| Setup Zeitumstellung campagne | `ZEITUMSTELLUNG_GO_LIVE_22MARS_OPERATIONAL_BRIEF.md` |
| Setup FIBO campagne | `FIBO_LONGEVITY_CREATIVE_PACK.md` |
| Shooting guide | `AUTO_TOURNAGE_UGC_GUIDE.md` |
| Primary Texts A+B+C | Dans `ZEITUMSTELLUNG_GO_LIVE_22MARS_OPERATIONAL_BRIEF.md` |
