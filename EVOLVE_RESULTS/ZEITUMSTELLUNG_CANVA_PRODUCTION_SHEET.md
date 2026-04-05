# Zeitumstellung 29/03 — Canva Production Sheet
> Clawdbot Prime ⚡ | 2026-03-08 09h53 | Session autonome cron
> Guide copier-coller step-by-step pour créer 2 visuels Meta en 35-40 min

---

## Contexte

**Événement :** Zeitumstellung Sommerzeit — dimanche 29 mars 2026 à 02h00
**Fenêtre de campagne :** Lancer le **25/03 (mercredi)** · Stop le **31/03**
**Temps de création :** ~35-40 minutes (2 visuels + config campagne)
**Plateforme :** Canva → export → Meta Ads Manager
**Campagne :** NLO_DE_ZEITUMST_2026 (déjà détaillée dans ZEITUMSTELLUNG_CREATIVE_PACK.md)

---

## VISUEL 1 — Feed 1080×1080

### Setup Canva
1. Ouvrir canva.com → "Erstellen" → "Benutzerdefinierte Größe"
2. Saisir : **1080 x 1080 px**
3. Nommer : "NLO_DE_Zeitumstellung_Feed_01"

### Palette Couleurs (copier-coller hex)
| Élément | Couleur | Hex |
|---------|---------|-----|
| Fond principal | Bleu nuit profond | **#0D1B2A** |
| Accent 1 | Or chaud (alarme) | **#D4A017** |
| Accent 2 | Blanc doux | **#F0EDE8** |
| Texte principal | Blanc pur | **#FFFFFF** |
| Badge urgence | Rouge doux | **#C0392B** |

### Typographie
- **Titre principal :** Montserrat Bold (ou Bold équivalent)
- **Sous-titre :** Montserrat SemiBold
- **Corps/fine print :** Lato Regular ou Open Sans

### Layout — Structure en 4 zones (coordonnées approximatives 1080×1080)

```
┌─────────────────────────────────────────────┐
│  [BADGE URGENCE] "29. März · 02:00 Uhr"    │  ← Zone 1 : Haut, 80px hauteur
│                                             │
│  ════════════════════════════════════════   │
│                                             │
│         Du verlierst eine Stunde.           │  ← Zone 2 : Titre (centre haut)
│         Dein Körper verliert mehr.          │     Montserrat Bold 52-58px
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  🕐 02:00–03:00 Uhr = deine Tiefschlafphase │  ← Zone 3 : Explication (centre)
│  DAK + AOK + NDR bestätigen:                │     Montserrat SemiBold 28px
│  Mehrere Tage Anpassung nötig.              │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│    [LOGO NELLIO] UltraCalm                  │  ← Zone 4 : CTA bas
│    Bereite deinen Rhythmus vor.             │     Lato Regular 22px
│    drinknellio.com                          │
└─────────────────────────────────────────────┘
```

### Textes Exacts à Copier-Coller

**Badge haut (petit texte sur fond rouge #C0392B, coins arrondis 8px) :**
```
29. März · Sommerzeit · Jetzt vorbereiten
```

**Titre principal (2 lignes, Montserrat Bold 52px, couleur #FFFFFF) :**
```
Du verlierst eine Stunde.
Dein Körper verliert mehr.
```

**Sous-titre / Explication (Montserrat SemiBold 26px, couleur #D4A017) :**
```
2:00–3:00 Uhr: Deine wichtigste Tiefschlafphase
wird gestohlen – jedes Jahr aufs Neue.
```

**Zone info institutions (Lato Regular 22px, couleur #F0EDE8) :**
```
DAK · AOK · NDR · Helios-Kliniken:
„Der Körper braucht mehrere Tage zur Anpassung."
```

**CTA bas (Montserrat Bold 24px, couleur #D4A017) :**
```
Bereite dich vor — nicht danach.
drinknellio.com · 45 Tage Geld-zurück
```

### Éléments Visuels (Canva library)
- **Icône horloge** : chercher "clock" dans Canva → choisir icône minimaliste blanche
- **Diviseur** : ligne horizontale fine #D4A017, 80% largeur
- **Badge** : rectangle avec coins arrondis 8px, fond #C0392B

### Export
Format : **PNG 1080×1080** (ou JPG si poids > 5MB)
Nom fichier : `NLO_DE_Zeitumst_Feed_01_v1.png`

---

## VISUEL 2 — Story/Réels 1080×1920

### Setup Canva
1. "Erstellen" → "Instagram Story" (automatiquement 1080×1920)
2. Nommer : "NLO_DE_Zeitumstellung_Story_01"

### Palette : Identique au Feed + dégradé vertical

**Fond :** Dégradé vertical — #0D1B2A (haut) → #1A2F42 (bas)

### Layout Story (4 zones verticales)

```
┌─────────────────────┐
│                     │
│  [ICÔNE HORLOGE]    │  ← Zone 1 : Haut 30% de la story
│  grand, centré      │
│                     │
│ ━━━━━━━━━━━━━━━━━━  │
│                     │
│  29. März:          │  ← Zone 2 : Titre 20%
│  Sie werden dir     │
│  eine Stunde        │
│  stehlen.           │
│                     │
│ ━━━━━━━━━━━━━━━━━━  │
│                     │
│ Zwischen 2 und 3    │  ← Zone 3 : Corps 30%
│ Uhr nachts passiert │
│ das – ausgerechnet  │
│ in deiner tiefsten  │
│ Schlafphase.        │
│                     │
│ DAK · AOK · NDR     │
│ warnen alle davor.  │
│                     │
│ ━━━━━━━━━━━━━━━━━━  │
│                     │
│ [NELLIO LOGO]       │  ← Zone 4 : CTA 20%
│ Bereite dich vor.   │
│ drinknellio.com     │
└─────────────────────┘
```

### Textes Exacts Story

**Titre principal (Montserrat Bold 58px, centré, #FFFFFF) :**
```
29. März:
Sie stehlen
dir eine Stunde
Schlaf.
```

**Corps (Montserrat SemiBold 32px, centré, #F0EDE8) :**
```
Ausgerechnet zwischen 2 und 3 Uhr —
in deiner wichtigsten Tiefschlafphase.

DAK, AOK und NDR bestätigen:
Dein Körper braucht Tage zur Erholung.
```

**Badge institutions (Lato Regular 24px, couleur #D4A017) :**
```
5 offizielle Quellen. 1 Botschaft.
Bereite deinen Körper vor.
```

**CTA (Montserrat Bold 28px, #FFFFFF) :**
```
Nellio UltraCalm
Ashwagandha · L-Theanin · Magnesium
drinknellio.com
45 Tage Geld-zurück-Garantie
```

### Export Story
Format : **PNG 1080×1920**
Nom fichier : `NLO_DE_Zeitumst_Story_01_v1.png`

---

## Configuration Campagne Meta

### Structure NLO_DE_ZEITUMST_2026

**Niveau Campagne :**
- Nom : `NLO_DE_ZEITUMST_2026`
- Objectif : **Conversions (Purchases)**
- Budget : **CBO €70/jour**
- Dates : **25/03/2026 → 31/03/2026** (7 jours max)

**Ad Set 1 — Broad Deutschland**
- Nom : `ZEITUMST_Broad_DE_30-60`
- Audience : Allemagne · Âge 30-60 · Tous sexes
- Pas d'intérêts (Broad = Advantage+ Audience)
- Budget : €30/j

**Ad Set 2 — Schlafstörungen / Gesundheit**
- Nom : `ZEITUMST_Schlaf_Interests`
- Intérêts : Schlafstörungen · Schlafqualität · Natürliche Schlafmittel · Ashwagandha · Nahrungsergänzungsmittel
- Âge : 35-60 · Tous sexes · DE
- Budget : €25/j

**Ad Set 3 — Seasonal Timing (Zeitumstellung)**
- Nom : `ZEITUMST_Seasonal`
- Intérêts : Saisonale Gesundheit · Chronobiologie · Schlaf-Wach-Rhythmus · Biorhythmus
- Âge : 30-55 · Tous sexes · DE
- Budget : €15/j

### Primary Texts à Copier-Coller

**Primary Text A (Institutionnel) :**
```
Die DAK, die AOK und das NDR haben alle vor derselben Woche gewarnt.

Am 29. März wird die Uhr um 2:00 Uhr nachts auf 3:00 Uhr vorgestellt — 
ausgerechnet in deiner tiefsten Schlafphase.

Helios-Kliniken listen die Folgen: Schlafstörungen, Konzentrationsschwäche, 
depressive Verstimmungen, Gereiztheit.

Nellio UltraCalm hilft, deinen Cortisol-Rhythmus zu regulieren — 
sodass dein Körper besser mit dieser Verschiebung umgeht.

Ashwagandha (KSM-66®) · L-Theanin 400mg · Magnesiumglycinat
Kein Melatonin. Keine Gewöhnung. Ohne Nebenwirkungen.

⭐ 4.8/5 · 20.000+ Bewertungen · 45 Tage Geld-zurück-Garantie

👉 Jetzt bestellen — bevor die Uhr umgestellt wird.
```

**Primary Text B (Mécanisme Cortisol) :**
```
Weißt du, was genau zwischen 2 und 3 Uhr nachts passiert?

Das ist deine tiefste Tiefschlafphase. Genau dann stellt die Zeitumstellung 
die Uhr um — und stört deinen circadianen Rhythmus für Tage.

Dein Cortisol weiß nicht, dass die Uhr umgestellt wurde.
Dein Körper schüttet ihn weiter zur falschen Zeit aus.
Das Ergebnis: Müdigkeit, Konzentrationsprobleme, schlechtere Stimmung.

Nellio UltraCalm unterstützt deinen natürlichen Cortisol-Rhythmus —
nicht durch Hormone, sondern durch den klinisch getesteten Stack:
Ashwagandha (KSM-66®) + L-Theanin + Magnesiumglycinat.

In 15 Studien mit 873 Erwachsenen messbar wirksam.
45 Tage testen — ohne Risiko.
```

### Headlines
1. `Zeitumstellung: Bereite deinen Cortisol-Rhythmus vor`
2. `29. März: Die Stunde, die dein Körper nicht kennt`
3. `DAK + AOK + NDR warnen. Jetzt vorbereiten.`
4. `Kein Melatonin. Kein Risiko. Natürlicher Schlaf.`

---

## Calendrier Précis 8-31 Mars

| Date | Action |
|------|--------|
| **8 mars (dimanche)** | Créer 2 visuels Canva (ce guide — 35 min) |
| **9-10 mars** | WSD en priorité (campagne WSD live 11/03) |
| **11-17 mars** | WSD live · **préparer copy Zeitumstellung** |
| **18-24 mars** | Upload visuels · configurer campagne · programmer |
| **25 mars (mercredi)** | **GO LIVE** NLO_DE_ZEITUMST_2026 |
| **27-28 mars** | Peak momentum médiatique · amplifier si ROAS > 2.0 |
| **29 mars (dimanche)** | Zeitumstellung · Story organique optionnelle |
| **30-31 mars** | Analyse 72h · STOP ou scale selon data |

---

## Seuils de Décision 72h (25-28 mars)

| Métrique | SCALE 🟢 | OBSERVER 🟡 | STOP 🔴 |
|----------|----------|-------------|--------|
| ROAS | > 2.5 | 1.5-2.5 | < 1.0 |
| CPC | < €0.60 | €0.60-1.00 | > €1.50 |
| CTR | > 1.5% | 0.8-1.5% | < 0.5% |
| CPP | < €25 | €25-40 | > €50 |

---

## Checklist Exécution (35-40 min total)

**Canva (20-25 min) :**
- [ ] Ouvrir canva.com
- [ ] Créer Feed 1080×1080 (couleurs + textes ci-dessus)
- [ ] Exporter PNG : `NLO_DE_Zeitumst_Feed_01_v1.png`
- [ ] Créer Story 1080×1920 (textes adaptés)
- [ ] Exporter PNG : `NLO_DE_Zeitumst_Story_01_v1.png`

**Meta Ads Manager (15 min) :**
- [ ] Créer campagne NLO_DE_ZEITUMST_2026
- [ ] Configurer 3 ad sets (budgets ci-dessus)
- [ ] Uploader visuels Feed + Story
- [ ] Copier Primary Texts A et B
- [ ] Copier 4 Headlines
- [ ] Programmer START : **25/03/2026** · END : **31/03/2026**
- [ ] Vérifier Pixel Purchase actif sur drinknellio.com
- [ ] Activer campagne en "Geplant" (pas encore live)

**Optionnel (5 min) :**
- [ ] Story organique pour le 29/03 matin

---

## Note Complémentaire

Ce guide est à utiliser EN PLUS du ZEITUMSTELLUNG_CREATIVE_PACK.md qui contient :
- 10 hooks détaillés (Tier 1→3)
- 3 body copies complètes
- FAQ PDP 2 questions Shopify
- Analyse audience et sous-segments (Schichtarbeiter, Herzprobleme)

**Le présent guide = focus production visuelle + config campagne.**
