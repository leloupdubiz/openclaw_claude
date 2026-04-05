# CREATIVE FATIGUE — Détection & Combat NLO_DE
> Guide opérationnel anti-saturation Meta Ads. Rédigé 2026-03-03.

---

## C'EST QUOI LA FATIGUE CRÉATIVE ?

Meta montre le même ad à la même personne trop souvent → plus d'impact → ROAS chute.  
Sur un marché comme l'Allemagne (population limitée pour notre niche), la fatigue arrive **plus vite** que sur un marché US.

**Sur DE (niche anti-stress/sommeil, cible 25-54) : marché estimé 8-12M personnes.**  
Avec €65/j, un ad peut atteindre 3,000-5,000 personnes/jour → saturation en 2-4 semaines.

---

## SIGNAUX D'ALARME — FATIGUE CRÉATIVE

### Surveiller ces métriques 2× par jour (matin + soir)

| Métrique | Signal normal | 🟠 Attention | 🔴 Fatigue confirmée |
|----------|--------------|-------------|---------------------|
| **Fréquence** | < 2.0 | 2.0 – 3.0 | > 3.5 |
| **CPM** | < €15 | €15 – €20 | > €25 (+40% vs baseline) |
| **CTR Link** | > 1.5% | 1.0 – 1.5% | < 1.0% |
| **Hook Rate 3s** | > 30% | 20 – 30% | < 20% |
| **ROAS** | > 2.0 | 1.5 – 2.0 | < 1.5 (stable 48h) |
| **CPP** | < €18 | €18 – €30 | > €35 |

### Règle d'or
> "Si la fréquence dépasse 3.5 ET le ROAS baisse simultanément : c'est de la fatigue. Agir dans les 24h."

---

## CALENDRIER PRÉVENTIF — ROTATION DES CRÉATIFS

### Règle de durée de vie estimée par format

| Format | Audience cible DE | Durée de vie estimée |
|--------|------------------|---------------------|
| Vidéo UGC 60s | Cold broad | 3-4 semaines |
| Vidéo UGC 30s | Cold broad | 4-5 semaines |
| Static image | Cold broad | 2-3 semaines |
| Carousel | Cold broad | 3-4 semaines |
| Advertorial | Cold broad | 5-7 semaines |
| Vidéo UGC retargeting | Warm audience | 1-2 semaines |

### Calendrier de rotation recommandé NLO_DE

```
SEMAINE 1-2 (lancement) :
→ Batch #1 Vidéo (3 scripts UGC) + Batch #2 Statiques (3 visuels)
→ Monitoring : fréquence quotidienne

SEMAINE 3-4 :
→ Introduire Batch #3 Vidéo (Das Abend-Ritual / 7 Uhr Beweis / Skeptiker)
→ Couper le créatif le plus faible du Batch #1 (ROAS < 1.5)
→ Monitoring : fréquence 2×/j si > 2.0

SEMAINE 5-6 :
→ Variations Sniper (SN-01 à SN-05) si winner identifié
→ Retirer 50% des Batch #1 si fréquence > 3.0
→ Introduire 2 nouveaux hooks sur l'angle winner

SEMAINE 7+ :
→ Rotation complète : fresh batch basé sur research S4/S5
→ Tester format advertorial (ADVERTORIAL_DE_BATCH01.md)
→ TikTok Ads activation (voir TIKTOK_ADS_BRIEF_DE.md)
```

---

## ACTIONS ANTI-FATIGUE PAR NIVEAU

### 🟠 ATTENTION (fréquence 2.0-3.0)

**Ne pas paniquer — intervenir progressivement :**

1. **Élargir l'audience** → passer de Broad DE 25-54 à Broad DE 22-60
2. **Ajouter un nouveau créatif** → introduire 1 variation (hook différent, même angle)
3. **Ne pas couper** le créatif fatigué immédiatement → réduire son budget de 30%
4. **Vérifier** si la baisse vient de la fréquence ou d'un problème externe (jour de paye, événement DE)

### 🔴 FATIGUE CONFIRMÉE (fréquence > 3.5 + ROAS en baisse)

**Protocole d'urgence :**

1. **IMMÉDIAT** : Ajouter 2-3 nouveaux créatifs issus du backlog (Batch #3, Sniper variations)
2. **24h** : Couper le créatif fatigué (ne sauvegarder que les winners)
3. **48h** : Tester un nouveau format (si on avait vidéo → tester static, si static → tester carousel)
4. **72h** : Si ROAS toujours < 1.5 → réduire budget de 30% en attendant les nouveaux créatifs

### Macro-rotation (pour éviter la fatigue structurelle)

| Période | Action |
|---------|--------|
| Mensuel | Produire 3-5 nouveaux créatifs (nouvelles variation hooks ou avatar) |
| Bi-mensuel | Nouveaux scripts complets (une session Research → 3 scripts) |
| Trimestriel | Nouveau batch Marksman (tester 2-3 angles complètement nouveaux) |

---

## TECHNIQUES DE RAFRAÎCHISSEMENT CRÉATIF

### 1. Nouveau hook (même vidéo, hook différent)
- Réutiliser la vidéo existante en changeant uniquement le hook (3 premières secondes)
- Meta traite ça comme un nouvel ad → reset partiel de la fatigue
- **Temps de production : 30 min** (recouper dans CapCut)

### 2. Nouveau avatar (même script, acteur différent)
- Même script word-for-word, personne différente
- Idéal pour tester genre/âge sans changer l'angle
- **Temps de production : 1 créateur Billo + 48h**

### 3. Nouveau format (même message, format différent)
- Vidéo → Carousel 3 slides avec verbatims
- Vidéo → Static "avant/après" 1:1
- **Temps de production : 1h Canva**

### 4. Advertorial (même angle, format éditorial)
- Copier l'angle winner → le reformater en article natif Facebook
- Fréquence percue différente par l'algo Meta
- **Voir ADVERTORIAL_DE_BATCH01.md + ADVERTORIAL_DE_BATCH02.md (6 prêts)**

---

## TRACKER FRÉQUENCE — TEMPLATE HEBDO

Copier dans un Google Sheets ou Notion :

```
SEMAINE [N] — du [DATE] au [DATE]

| Créatif | Impressions | Fréquence | CPM | CTR | ROAS | Status |
|---------|------------|-----------|-----|-----|------|--------|
| S1-BC1-H1 | | | | | | 🟢/🟠/🔴 |
| S1-BC1-H2 | | | | | | |
| S1-BC2-H1 | | | | | | |
| ... | | | | | | |

ACTION PRISE : [couper / élargir / nouveau créatif ajouté]
PROCHAINE REVIEW : [date]
```

---

## BUDGET BUFFER ANTI-FATIGUE

**Toujours avoir 3-5 créatifs en "réserve" prêts à activer immédiatement.**

Stock actuel NLO_DE (au 2026-03-03) :
- Batch #1 vidéo : 3 scripts ✅ (tournage requis)
- Batch #3 vidéo : 3 scripts ✅ (tournage requis)
- Batch #2 statiques : 12 specs ✅ (production Canva requise)
- Advertorials : 6 complets ✅ (copy prête, landing page à configurer)
- Hooks Sniper : 15 variations documentées ✅ (dans SNIPER_PHASE_PLAYBOOK.md)

→ **Capacité buffer : ample** si Chef produit les visuels Canva + tourne les vidéos.

---

## MÉMO — 3 RÈGLES ANTI-FATIGUE

> 1. **Fréquence < 3.5** — Always. Au-dessus : agir.  
> 2. **Toujours avoir 2-3 créatifs prêts en attente** — Ne jamais se retrouver sans backup.  
> 3. **Rafraîchir le hook en premier** (plus rapide) avant de produire un nouveau script complet.

---

*Ce guide complète META_AUTOMATION_RULES_DE.md (règle #6 : alerte fréquence) et CREATIVE_PERFORMANCE_TRACKER.md (colonne fréquence).*
