# Creative Performance Tracker — NLO_DE_SALES
> Clawdbot Prime ⚡ | Généré le 2026-03-02 | Format : Copier dans Google Sheets ou Notion

---

## 🎯 Usage
Remplir après chaque check (J+2 / J+3 / J+7 / J+14) depuis Meta Ads Manager.
Identifier les winners, éliminer les losers, informer Batch #2.

---

## TABLEAU PRINCIPAL — TRACKERS ADS

### Structure nomenclature
`NLO_DE_[SCRIPT]_[BC]_[H]`
- Script : S1A / S1B / S1C / S2A / S2B / S2C / S3A / S3B / S3C
- BC : BC1 / BC2 (body copy)
- H : H1 / H2 (headline)

---

### Batch #1 — Vidéos UGC (à remplir post-lancement)

| Ad ID | Nom | Hook | Avatar | Spend | Reach | Impressions | CPM | CTR | CPC | Leads | CPL | Conv | CPP | ROAS | Statut |
|-------|-----|------|--------|-------|-------|-------------|-----|-----|-----|-------|-----|------|-----|------|--------|
| | NLO_DE_S1A_BC1_H1 | Der Teufelskreis | Markus | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S1A_BC1_H2 | Der Teufelskreis | Markus | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S1A_BC2_H1 | Der Teufelskreis | Markus | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S1A_BC2_H2 | Der Teufelskreis | Markus | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S2A_BC1_H1 | Das Gedankenkarussell | Sonja | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S2A_BC1_H2 | Das Gedankenkarussell | Sonja | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S2A_BC2_H1 | Das Gedankenkarussell | Sonja | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S2A_BC2_H2 | Das Gedankenkarussell | Sonja | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S3A_BC1_H1 | Cortisol nachts | Julia | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S3A_BC1_H2 | Cortisol nachts | Julia | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S3A_BC2_H1 | Cortisol nachts | Julia | | | | | | | | | | | | 🟡 Test |
| | NLO_DE_S3A_BC2_H2 | Cortisol nachts | Julia | | | | | | | | | | | | 🟡 Test |

### Statuts possibles
- 🟡 **Test** — En cours de test (< 72h ou budget insuffisant)
- 🟢 **Winner** — ROAS > 2.5 sur 3+ jours → à scaler
- 🔴 **Loser** — ROAS < 0.8 ou CPP > €45 → à couper
- 🟠 **Surveillé** — ROAS 1.0-2.5 → données insuffisantes, attendre
- ⚫ **Coupé** — Désactivé

---

### Batch #2 — Statiques (Canva — à produire)

| Ad ID | Nom | Visuel | Avatar | Spend | Impressions | CPM | CTR | Conv | CPP | ROAS | Statut |
|-------|-----|--------|--------|-------|-------------|-----|-----|------|-----|------|--------|
| | NLO_DE_STATIC01_BC1_H1 | Gedankenkarussell | Sonja | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC01_BC1_H2 | Gedankenkarussell | Sonja | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC01_BC2_H1 | Gedankenkarussell | Sonja | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC01_BC2_H2 | Gedankenkarussell | Sonja | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC02_BC1_H1 | Cortisol 3 Uhr | Markus | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC02_BC1_H2 | Cortisol 3 Uhr | Markus | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC02_BC2_H1 | Cortisol 3 Uhr | Markus | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC02_BC2_H2 | Cortisol 3 Uhr | Markus | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC03_BC1_H1 | Skeptiker Carousel | Tous | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC03_BC1_H2 | Skeptiker Carousel | Tous | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC03_BC2_H1 | Skeptiker Carousel | Tous | | | | | | | | 🔵 À créer |
| | NLO_DE_STATIC03_BC2_H2 | Skeptiker Carousel | Tous | | | | | | | | 🔵 À créer |

---

## ANALYSE PAR ANGLE (Remplir à J+7)

| Angle | Script(s) | Spend Total | Conv Total | ROAS Moyen | Verdict |
|-------|----------|-------------|------------|------------|---------|
| Der Teufelskreis (Stress loop) | S1A-S1B | | | | |
| Das Gedankenkarussell (Pensées) | S2A-S2B | | | | |
| Cortisol nachts (Nuit/Biologie) | S3A-S3B | | | | |
| Skeptiker Carousel (Sceptique) | STATIC03 | | | | |
| Cortisol 3 Uhr (Heure 3h) | STATIC02 | | | | |

### Règle de décision
```
ROAS > 2.5 (3 jours) → Angle WINNER → Passer en Sniper (plus de créatifs sur cet angle)
ROAS 1.5-2.5         → Angle correct → Conserver, itérer body copy ou hook
ROAS < 1.0 (48h)     → Angle LOSER → Couper immédiatement
```

---

## ANALYSE PAR AVATAR (Remplir à J+7)

| Avatar | Ads associés | ROAS | CPP | Insight |
|--------|-------------|------|-----|---------|
| Markus (35-45, cadre sceptique) | S1, STATIC02 | | | |
| Sonja (35-45, mama stressée) | S2, STATIC01 | | | |
| Julia (28-35, professionnelle) | S3 | | | |
| Broad (tous) | STATIC03, S3 | | | |

---

## ANALYSE PAR FORMAT (J+14)

| Format | ROAS Moyen | CTR Moyen | Note |
|--------|-----------|-----------|------|
| Vidéo UGC 45-65s | | | |
| Image statique 1:1 | | | |
| Carousel 3 slides | | | |

---

## LOG DÉCISIONS — WINNERS / LOSERS

| Date | Ad | Action | Raison | ROAS | Spend à date |
|------|----|--------|--------|------|--------------|
| | | | | | |

---

## RÉCAPITULATIF SEMAINE (Template hebdo)

```
=== REPORT SEMAINE [N] — NLO_DE_SALES ===
Période : [du] → [au]
Budget dépensé : €[X]
Conversions : [N]
ROAS global : [X.X]
CPP moyen : €[X]

WINNERS (à scaler) :
→ [Ad] — ROAS [X.X] — Angle [Y]

LOSERS (coupés) :
→ [Ad] — ROAS [X.X] — Coupé J+[N]

INSIGHTS CRÉATIFS :
→ [Observation 1]
→ [Observation 2]

BUDGET SEMAINE SUIVANTE :
→ Winners : €[X]/j × [N] adsets = €[Y]/j
→ Nouveaux tests : €[X]/j × [N] adsets = €[Y]/j
→ Total : €[Z]/j
```

---

## CONVERSION EN GOOGLE SHEETS

Pour importer ce tracker dans Google Sheets :
1. Créer un nouveau fichier Google Sheets
2. Renommer les onglets : "Batch #1 Vidéos" / "Batch #2 Statiques" / "Analyse Angles" / "Log Décisions" / "Report Hebdo"
3. Copier chaque tableau dans l'onglet correspondant
4. Ajouter une formule ROAS automatique : `=IF(E2>0, N2/E2, 0)` (colonne ROAS = Revenus/Spend)
5. Mettre en couleur conditionnel : Rouge si ROAS < 1.0, Orange < 2.0, Vert > 2.5

---

*Ce tracker est le référentiel unique pour toutes les décisions media buying NLO_DE.*
