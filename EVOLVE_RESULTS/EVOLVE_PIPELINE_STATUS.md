# EVOLVE Pipeline Status — Batch #1
> Dernière mise à jour : 2026-02-26
> Produit : Nellio UltraCalm | Marché : Allemagne / DACH | Canal : Meta Ads

---

## Phase 1 — Research ✅

**Livrables produits :**
- `DESIRE_MAP_V2.md` — Carte des désirs marché DE (score 4 desires dominants)
- `VERBATIMS_RAW.md` — 45 verbatims réels clients DE
- `COMPETITOR_SWIPE.md` — Analyse concurrents Meta Ads DE (si produit)

**Résumé** : Désir dominant identifié = D1 "Durchschlafen und erholt aufwachen" (93/125). Mécanisme central = boucle Stress ↔ Cortisol ↔ Mauvais sommeil.

---

## Phase 2 — Avatars & Angles ✅

**Livrables produits :**
- `AVATARS_CORE_V2.md` — 3 core avatars (Sonja / Markus / Julia)
- `ANGLE_BANK_V2.md` — 30 angles classés par potentiel
- `HOOK_BANK_V2.md` — 50 hooks en allemand

**Résumé** : 3 angles prioritaires retenus pour le Batch #1 :
- Angle #1 : Der Teufelskreis (boucle stress-sommeil)
- Angle #2 : Das Gedankenkarussell (cerveau qui ne s'arrête pas)
- Angle #3 : Cortisol nachts (mécanisme hormonal éducatif)

---

## Phase 3 — Création ✅

**Livrables produits :**
- `SCRIPTS_BATCH01.md` — 3 scripts UGC en allemand (S1/S2/S3, 45-60s)
- `BRIEFS_BATCH01.md` — 12 variantes 3-2-2 (S1×2×2 + S2×2×2 + S3×2×2)

**Résumé** : Matrix complète 3-2-2 produite. Body B1 (Empathique) en priorité test. Body B2 (Éducatif/Scientifique) en backup activé à J+3 si signal positif. 2 headlines : H1 Identification + H2 Révélation Cortisol.

---

## Phase 4 — Setup Campagne ✅

**Livrables produits :**
- `CAMPAIGN_SETUP_BATCH01.md` — Ce document (setup Meta Ads complet)

**Résumé du setup :**
- Objectif : Sales (Conversions — Purchase)
- Budget : CBO €65/jour — 2 adsets (Broad + Intérêts)
- Attribution : 7j click / 1j view
- 12 ads prêts (6 P1 actifs, 6 P2 en attente)
- Naming convention NLO_[MARCHÉ]_[OBJECTIF]_[DATE] défini
- Claims Meta/HWG-DE vérifiés et reformulés
- KPIs 72h définis + règles automatiques configurées
- Plan Marksman → Sniper formalisé

---

## Phase 4b — Lancement ⏳ (attend assets créatifs)

**Bloquants actuels :**
- 🔴 **Vidéos UGC non tournées** — 3 vidéos nécessaires (S1, S2, S3)
- 🔴 **Pixel Meta à vérifier** — confirmation installation + events
- 🔴 **Compte Meta Ads** — vérifier si campagne peut être lancée (mode de paiement, vérification domaine)
- 🟡 **Landing page drinknellio.com** — vérifier vitesse mobile + reviews visibles + Impressum présent

**Débloquant** : Livraison des 3 vidéos UGC par le créateur.

---

## Phase 4c — Analyse 72h ⏳

**En attente de :** Lancement campagne (Phase 4b)

**À faire après 72h de run :**
- Lire les KPIs par ad selon la grille de décision (Section 5 de CAMPAIGN_SETUP)
- Arrêter les ads sous le seuil STOP sur ≥ 3 métriques
- Identifier le/les scripts en tête
- Spawner le Performance Analyst pour rapport structuré → `REPORT_72H_BATCH01.md`

---

## Phase 5 — Scale winner ⏳

**En attente de :** Décision Marksman J+14

**Actions à déclencher si winner identifié :**
- Dupliquer l'adset winner (+30-50% budget)
- Produire Batch Sniper : 5 nouveaux hooks sur l'angle winner
- Créer Lookalike 1% sur Purchasers (besoin : min 100 acheteurs)
- Étudier expansion AT / CH après 30j de scaling DE profitable

---

## Assets Manquants pour le Lancement

| Asset | Type | Owner | Priorité |
|-------|------|-------|----------|
| Vidéo UGC Script S1 — "Der Teufelskreis" | Vidéo 9:16, 50-55s, sous-titres DE | Créateur (humain) | 🔴 P0 |
| Vidéo UGC Script S2 — "Das Gedankenkarussell" | Vidéo 9:16, 45-55s, sous-titres DE | Créateur (humain) | 🔴 P0 |
| Vidéo UGC Script S3 — "Cortisol nachts" | Vidéo 9:16, 50-60s, sous-titres DE | Créateur (humain) | 🔴 P0 |
| Confirmation Pixel Meta installé | Technique | Chef / dev | 🔴 P0 |
| Vérification domaine dans Business Manager | Technique | Chef | 🔴 P0 |
| Mode de paiement Meta Ads actif (DE) | Compte | Chef | 🟡 P1 |
| Reviews 20.000+ visibles sur page produit | CRO | Chef / dev | 🟡 P1 |
| Impressum présent sur drinknellio.com | Légal DE | Chef / dev | 🟡 P1 |

---

## Next Actions — Liste Priorisée

1. **🔴 [BLOQUANT] Tourner les 3 vidéos UGC** selon les notes créateur des SCRIPTS_BATCH01.md — format 9:16, sous-titres DE, thumbnail custom
2. **🔴 Vérifier Pixel Meta** via Meta Pixel Helper — confirmer Purchase, InitiateCheckout, AddToCart, ViewContent
3. **🔴 Vérifier le domaine** dans Meta Business Manager → Brand Safety → Domaines
4. **🟡 Activer Conversions API** (CAPI) côté serveur — réduit l'impact iOS 14.5+ de 15-30% sur l'attribution
5. **🟡 Audit mobile drinknellio.com** — vitesse (Lighthouse > 60), reviews visibles, CTA clair, Impressum OK
6. **🟡 Préparer les copies** (Body B1, Body B2, H1, H2) dans un Google Doc pour copy-paste rapide en Ads Manager
7. **🟢 Configurer les règles automatiques** Meta (Stop Loss, Escalation, CPM Alert) selon Section 6
8. **🟢 Uploader la liste clients** (CRM) comme audience d'exclusion dans les 2 adsets
9. **⏳ [POST-LANCEMENT J+3] Première lecture KPIs** selon grille Section 5 → décision arrêt / maintien / activation P2
10. **⏳ [POST-LANCEMENT J+14] Décision Marksman → Sniper** → si winner : spawner Champion Scaler

---

## Récapitulatif des Fichiers EVOLVE_RESULTS

| Fichier | Phase | Statut |
|---------|-------|--------|
| `DESIRE_MAP_V2.md` | Phase 1 | ✅ |
| `VERBATIMS_RAW.md` | Phase 1 | ✅ |
| `AVATARS_CORE_V2.md` | Phase 2 | ✅ |
| `ANGLE_BANK_V2.md` | Phase 2 | ✅ |
| `HOOK_BANK_V2.md` | Phase 3 | ✅ |
| `SCRIPTS_BATCH01.md` | Phase 3 | ✅ |
| `BRIEFS_BATCH01.md` | Phase 3 | ✅ |
| `CAMPAIGN_SETUP_BATCH01.md` | Phase 4 | ✅ |
| `EVOLVE_PIPELINE_STATUS.md` | Phase 4 | ✅ |
| `REPORT_72H_BATCH01.md` | Phase 4c | ⏳ À créer post-lancement |
| `SCALING_PLAN_BATCH01.md` | Phase 5 | ⏳ À créer si winner |

---

*Pipeline EVOLVE Batch #1 — Clawdbot Prime ⚡ | 2026-02-26*

## Update 2026-03-02 — Weekly Research Batch #2 complété · 15 verbatims DE · FUD Leberschaden actif presse DE · 4 nouveaux angles (51-54) dans ANGLE_BANK_V2 · Batch #2 brief prêt · Fenêtre lancement Meta favorable · Aucune campagne live confirmée
