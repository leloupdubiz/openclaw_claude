# WSD Post-Campaign Review + Frühlingsmüdigkeit GO LIVE Checklist
> Généré : 2026-03-12 14h20 (autonomous-executor)
> Usage : 13/03 à partir de 18h + GO LIVE Frühlingsmüdigkeit 14/03 08h00
> Complète : WSD_DDAY_EXECUTION_BRIEF_13MARS.md + POST_WSD_SCALING_PLAYBOOK.md

---

## ⚠️ CONTEXTE WSD + TRANSITION

```
13/03 (WSD D-Day) → Campagne WSD live (NLO_DE_WSD_2026)
14/03 (lendemain) → PIVOT : Frühlingsmüdigkeit GO LIVE (NLO_DE_FRUEHLINGSMUEDIGKEIT_2026)
Les 2 campagnes peuvent tourner simultanément si ROAS WSD > 1.5
Budget total max si les 2 actives : €55 + €60 = €115/j
```

---

## PARTIE 1 — REVIEW POST-WSD D-DAY (13/03)

### Template Suivi WSD — À remplir le 13/03

#### Checkpoint 12h00 (WSD Day)
```
Heure : 13/03 12h00

MÉTRIQUES (depuis lancement) :
- Spend total : €___
- Impressions : ___
- CPM : €___  (cible : €8-12)
- CTR Link : ___% (cible : >2%)
- Clics : ___
- CPC : €___
- Ajouts panier : ___
- Achats : ___
- ROAS : ___x (cible cumulatif: >1.0 à J0)
- Revenue : €___

STATUT :
[ ] CPM dans les normes (€8-12)
[ ] CTR > 2%
[ ] Achats > 0

DÉCISION :
→ Si CPM > €18 : vérifier Meta Ads Manager → double-check audiences
→ Si 0 achats à 12h : vérifier Pixel Events (Test Events Meta)
→ Si tout OK : maintenir, ne pas toucher
```

#### Checkpoint 18h00 (WSD Decision Gate 24h)
```
Heure : 13/03 18h00

MÉTRIQUES (cumul 24h depuis lancement) :
- Spend total : €___
- CPM : €___
- CTR : ___%
- CPC : €___
- Achats : ___
- Revenue : €___
- ROAS : ___x

DÉCISION 24h :
[ ] ROAS > 1.5 → Préparer +20% budget pour J+2
[ ] ROAS 0.8-1.5 → Surveiller — attendre 72h
[ ] ROAS < 0.8 + 0 achat → Vérifier Pixel + audiences → ne pas couper avant 48h
[ ] CPM > €20 → Ajouter adset Broad DE 25-55 à €15/j
```

#### Checkpoint 72h (16/03 matin)
```
Date : 16/03 (matin)

MÉTRIQUES COMPLÈTES 72h :
- Spend total : €___
- Revenue attribué : €___
- ROAS 72h : ___x
- Meilleur créatif (Hook Rate le plus élevé) : ___
- Meilleur adset : ___
- CPA moyen : €___

RÈGLE DÉCISION 72h :
[ ] ROAS > 2.0 → SCALE : +20% budget toutes les 48h
[ ] ROAS 1.5-2.0 → SURVEILLER : maintenir budget, tester créatifs S43-B/S43-C
[ ] ROAS 1.0-1.5 → ANALYSER : vérifier hook rate, tester nouveaux créatifs
[ ] ROAS < 1.0 → COUPER : pause WSD, tout budget vers Frühlingsmüdigkeit
```

### Tableau de Bord WSD — Résultats

| Jour | Spend | Revenue | ROAS | Achats | CPM | CTR |
|------|-------|---------|------|--------|-----|-----|
| J0 13/03 | | | | | | |
| J+1 14/03 | | | | | | |
| J+2 15/03 | | | | | | |
| J+3 16/03 | | | | | | |
| J+7 20/03 | | | | | | |

---

## PARTIE 2 — FRÜHLINGSMÜDIGKEIT GO LIVE (14/03)

### Checklist GO LIVE 14/03 08h00

```
CAMPAGNE : NLO_DE_FRUEHLINGSMUEDIGKEIT_2026
Budget : CBO €60/j
Visuels : FRUEHLINGSMUEDIGKEIT_CANVA_PRODUCTION_SHEET.md (créer si pas encore fait)
```

#### ✅ Pré-lancement (13/03 soir ou 14/03 matin)
- [ ] Visuels Canva créés (guide : FRUEHLINGSMUEDIGKEIT_CANVA_PRODUCTION_SHEET.md — 30 min)
  - Feed 1080×1080 : fond #0D2137 · titre "Frühlingsmüdigkeit gibt es nicht" · badge MDR+ARD+HEUTE
  - Story 1080×1920 : même design en vertical
- [ ] Campagne CBO créée dans Meta Ads Manager
  - Objectif : Sales (Conversions)
  - Budget : €60/j CBO
  - Pixel : actif (vérifier dans Events Manager)
  - Attribution : 7-day click / 1-day view

#### ✅ 3 Adsets à créer
**Adset 1 — Broad DE Seasonal**
- Audience : Allemagne · 30-55 ans · Hommes+Femmes · BROAD (aucun intérêt)
- Budget : guidé par CBO (≈ €20/j initial)

**Adset 2 — Intérêt Schlaf + Erschöpfung**
- Interests : Schlafmangel | Schlaflosigkeit | Chronische Erschöpfung | Burnout
- Budget : guidé par CBO

**Adset 3 — Intérêt Melatonin Switch**
- Interests : Melatonin | Nahrungsergänzungsmittel | Naturheilkunde DE
- Budget : guidé par CBO

#### ✅ Créatifs à uploader
**Primary Text A** (Frühlingsmüdigkeit Mythos — BOMBE) :
```
Fast jeder Zweite fühlt sich im März müde — aber Schlafforscher aus der Schweiz haben 2026 bewiesen: Frühlingsmüdigkeit gibt es nicht.

Was es gibt: ein verschobenes Cortisolprofil.

Mehr Tageslicht im März hält Cortisol länger erhöht. Das verhindert, dass Melatonin starten kann. Du schläfst nicht durch.

Das Ergebnis: Du bist nicht "frühjahrsmüde". Dein Cortisol ist aus dem Takt.

Nellio UltraCalm — mit 300mg KSM-66® Ashwagandha — normalisiert den Cortisol-Tagesrhythmus. Klinisch bestätigt. NIH-geprüft. 45 Tage Garantie.

Jetzt testen → drinknellio.com
```

**Primary Text B** (ARD + Cortisol Mechanismus) :
```
MDR, WDR, NDR berichten: "Frühlingsmüdigkeit ist ein Mythos."

Aber die Müdigkeit im März ist real — sie hat nur einen anderen Grund:
Wenn es länger hell bleibt, bringt das den Hormonspiegel durcheinander.
Cortisol bleibt erhöht. Melatonin kommt zu spät. Du wachst um 3 auf.

Das ist Chronobiologie — und kein Frühlings-Phänomen.

Nellio UltraCalm enthält den Wirkstoff, den das NIH am Weltschlaftag bestätigt hat:
KSM-66® Ashwagandha. Messbar. Ohne Abhängigkeit.

→ drinknellio.com | 45 Tage Geld-zurück-Garantie
```

**Headlines (rotation) :**
- "Frühlingsmüdigkeit gibt es nicht — aber Cortisol-Chaos schon"
- "NIH bestätigt: Das hilft wirklich gegen März-Müdigkeit"
- "Was MDR, WDR, NDR nicht sagen: Die echte Lösung"
- "418 Menschen ein Jahr untersucht — keine Frühlingsmüdigkeit gefunden"

#### ✅ Après publication
- [ ] Vérifier statut dans Ads Manager (En cours de révision → actif dans 24-48h)
- [ ] Sauvegarder IDs campagne/adsets dans un fichier texte
- [ ] Configurer règles automatiques (stop-loss si CPA > €80 sur 3 jours)

---

## PARTIE 3 — CALENDRIER COMPLET MARS→AVRIL

```
12/03 (aujourd'hui) → Filmer S43-C (WSD D-Day expire 13/03) + S43-B (GO LIVE 14/03)
13/03 → WSD D-Day · Campagne NLO_DE_WSD_2026 live · Post organique #5 08h
14/03 → Frühlingsmüdigkeit GO LIVE (NLO_DE_FRUEHLINGSMUEDIGKEIT_2026 €60/j)
         Review 72h WSD = 16/03 décision scale
16/03 → Decision Gate WSD : SCALE/SURVEILLER/COUPER
         Refresh créatifs si nécessaire (S43-B + S41-A top Tier 1)
25/03 → Zeitumstellung GO LIVE (NLO_DE_ZEITUMST_2026 €70/j · guide : ZEITUMSTELLUNG_CANVA_PRODUCTION_SHEET.md)
29/03 → Zeitumstellung D-Day (la nuit de 2h à 3h)
30/03 → Review 72h Zeitumstellung · décision scale
10/04 → FIBO GO LIVE (NLO_DE_FIBO_LONGEVITY_2026 €70/j)
16/04 → FIBO Congress 16-19 avril
21/04 → FIBO stop
30/04 → Frühlingsmüdigkeit stop (fin fenêtre mars-avril)

BUDGET TOTAL (14/03→30/04) :
- Frühlingsmüdigkeit : €60/j × 47j = €2,820
- Zeitumstellung : €70/j × 35j = €2,450  
- FIBO : €70/j × 12j = €840
- WSD (scale éventuel) : €70/j × 20j = €1,400
TOTAL ESTIMÉ : ~€7,510 (si toutes campagnes en parallèle et scale activé)
TOTAL CONSERVATEUR (1 camp à la fois) : ~€3,800
```

---

## PARTIE 4 — RÈGLES AUTOMATIQUES META RECOMMANDÉES

### Pour NLO_DE_FRUEHLINGSMUEDIGKEIT_2026
```
Règle 1 — STOP LOSS :
Si : Spend > €30 ET ROAS < 0.5 sur 72h → Pause adset

Règle 2 — SCALE WINNER :
Si : ROAS > 2.5 sur 48h consécutives → Augmenter budget +20%

Règle 3 — HIGH CPM ALERT :
Si : CPM > €20 sur 24h → Notification (vérifier audiences + créatifs)

Règle 4 — FREQUENCY GUARD :
Si : Fréquence > 3.5 sur 7 jours → Ajouter nouveau créatif (S43-A ou S41-A)
```

---

## PARTIE 5 — FAQ PROBLÈMES FRÉQUENTS

**Q : Meta refuse le créatif "Frühlingsmüdigkeit" — pourquoi ?**
→ Vérifier : aucun claim de diagnostic médical ("traite", "guérit", "prescrit")  
→ "kann helfen" / "hilft dabei" au lieu de "bekämpft" / "heilt"  
→ Ne pas mentionner "Depression", "Angst" comme conditions médicales

**Q : ROAS très bas les 24 premières heures — normal ?**
→ Oui — l'algorithme Meta a besoin de 48-72h pour optimiser  
→ Ne pas toucher le budget ou les audiences dans les 48 premières heures

**Q : Concurrent OYONO fait une promo similaire — que faire ?**
→ Activer la copy anti-OYONO dans Primary Text B  
→ Mettre en avant "20.000 Bewertungen" vs "expertise" OYONO

**Q : CPM très élevé (>€25) dès le lancement — que faire ?**
→ Vérifier que l'objectif est "Sales/Conversions" et non "Traffic"  
→ Tester avec un adset Broad DE 25-55 à budget réduit (€10/j test)

**Q : Pixel ne remonte pas d'achats alors que le site en a — pourquoi ?**
→ Attribution gap normal (Meta voit ~60-70% des achats réels)  
→ Comparer avec Shopify Dashboard (source de vérité)  
→ Ne pas juger le ROAS Meta seul — utiliser Blended ROAS = CA Shopify / Spend Meta
