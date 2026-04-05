# Audit Correction — "Durchschlafen" vs "Einschlafen"
> Créé : 2026-03-01 | Session autonome Clawdbot Prime ⚡
> Source : Insight Research S4 — Primary Desire V2 = "Durchschlafen" (93/145 verbatims)

---

## ⚡ POURQUOI CE CHANGEMENT

**Primary Desire V2 confirmé :** "Durchschlafen und morgens erholt aufwachen" → 93/145 verbatims
**Concurrent Primal Harvest** : positionné "Einschlafen" (= "die ultimative Einschlafhilfe")
**Opportunité :** UltraCalm possède le "Durchschlafen" — plus universel, plus fort, non pris par concurrents
**Gap actuel :** Plusieurs créatifs utilisent encore "einschlafen" comme bénéfice principal

**Règle :** "Einschlafen" = feature secondaire. "Durchschlafen + morgens erholt" = desire #1 à cibler.

---

## 🔍 OCCURRENCES À CORRIGER PAR FICHIER

### SCRIPTS_BATCH01.md — Script 1 "Teufelskreis"
**Ligne problématique :**
```
AVANT : "und trotzdem nicht einschlafen können"
APRÈS : "und trotzdem nicht wirklich schlafen können — stundenlang wach, kurz schlafen, wieder wach"
```
**Ligne problématique :**
```
AVANT : "Sie helfen dir einzuschlafen. Aber sie senken deinen Cortisol nicht."
APRÈS : "Sie helfen dir kurz einzuschlafen. Aber du schläfst nicht durch — und morgens bist du genauso fertig."
```
**Ligne CTA — à enrichir :**
```
AVANT : "mich wirklich erholt gefühlt"
APRÈS : "mich wirklich erholt gefühlt — und das erste Mal seit Monaten durchgeschlafen"
```

### BRIEFS_BATCH01.md
**Ligne problématique :**
```
AVANT : "Melatonin hilft dir einzuschlafen — aber es senkt deinen Cortisol nicht."
APRÈS : "Melatonin hilft dir einzuschlafen — aber es löst das Durchschlafen-Problem nicht. Morgens bist du trotzdem fertig."
```

### HOOK_BANK_V2.md — Hook angle "Einschlafen"
```
AVANT : "Was wenn das Problem nicht Einschlafen ist — sondern dein Cortisol?"
APRÈS : "Was wenn das Problem nicht Einschlafen ist — sondern Durchschlafen? Und dein Cortisol hält dich wach."
```

### STATIC_ADS_BATCH02_SPECS.md — Ligne body copy
```
AVANT : "Endlich wieder einschlafen — ohne Gedankenkarussell."
APRÈS : "Endlich wieder durchschlafen — und morgens ausgeruht aufwachen."
```

---

## ✅ HOOKS CORRECTS À UTILISER (déjà optimisés "Durchschlafen")

Ces hooks sont déjà corrects — à prioriser en test :

```
✅ "Endlich durchschlafen — ohne Schlafmittel" (STATIC_ADS_BATCH02_SPECS)
✅ "20.000 Deutsche... Endlich durchschlafen." (CREATIVES_META_BATCH02)
✅ "Melatonin hilft beim Einschlafen. Nicht beim Durchschlafen." (youtube_research_DE)
✅ "Endlich durchschlafen" — CTA magique confirmé (GLOSSAIRE_COPY_DE)
```

---

## 🪝 NOUVEAUX HOOKS DURCHSCHLAFEN (5 nouvelles options)

```
H-DC-01: "Kein Einschlafen-Problem. Ein Durchschlafen-Problem. Und das ist der Unterschied."
H-DC-02: "Endlich durchschlafen. Nicht einmal aufwachen. Nicht zweimal die Uhr checken."
H-DC-03: "Um 3 Uhr aufgewacht — wieder. Kennst du das?"
H-DC-04: "Melatonin hilft beim Einschlafen. UltraCalm beim Durchschlafen."
H-DC-05: "Morgens erholt aufwachen — nicht nur 'irgendwie geschlafen haben'."
```

**Top priorité test :** H-DC-04 (différenciateur direct vs Melatonin/concurrents) + H-DC-03 (pain ultra-spécifique)

---

## 📋 RÈGLE GLOBALE À APPLIQUER (OMNIA + Nellio Studio)

Mettre à jour dans `AGENT_BRAND_CONTEXT` d'OMNIA :

```
RÈGLE COPY :
- Primary message : "durchschlafen / morgens erholt aufwachen"
- Secondary : "Gedanken abschalten / innere Ruhe"  
- NE PAS utiliser "einschlafen" comme bénéfice principal
- "einschlafen" = OK pour comparer (Melatonin context) ou pain statement
- Headline minimum : 1 mention "durchschlafen" ou "erholt aufwachen" par ad
```

---

## ⚡ NEXT ACTION POUR CHEF

1. **Script S1 :** Appliquer corrections ci-dessus avant tournage (2 lignes à modifier)
2. **Brief créateur :** Briefer créateurs sur "Durchschlafen" comme outcome central (pas "einschlafen")
3. **Split test :** H-DC-04 vs H-DC-03 en static ad (zéro tournage requis)
4. **OMNIA :** Ajouter règle copy dans AGENT_BRAND_CONTEXT

---

*Clawdbot Prime ⚡ | Source : Research S4 · Primary Desire V2 · Competitive Intel Primal Harvest DE*
