# EVOLVE — Protocole de Handoff Inter-Agents
> Clawdbot Prime ⚡ | Créé le 2026-02-23

---

## Convention de Nommage des Fichiers

```
EVOLVE_RESULTS/[AGENT]-[PHASE]-[DATE]-output.md
```

**Exemples :**
```
desire-researcher-phase1-2026-02-23-output.md
avatar-architect-phase2-2026-03-01-output.md
hook-writer-phase3-2026-03-05-output.md
```

---

## Séquence des Handoffs

```
PHASE 1 — RESEARCH
  Input : Produit + competitors + marché cible
  └─ desire-researcher → desire_map.md
  └─ ad-library-spy → competitor_swipe.md
  └─ research-synthesizer → research_consolidated.md

PHASE 2 — STRATEGY
  Input : research_consolidated.md
  └─ avatar-architect → avatars_core.md
  └─ sub-avatar-specialist → avatars_sub.md
  └─ angle-extractor → angle_bank.md
  └─ concept-strategist → creative_roadmap.md

PHASE 3 — CRÉATION
  Input : creative_roadmap.md + avatars_sub.md
  └─ hook-writer → hook_bank.md
  └─ script-writer → scripts_batch_01.md
  └─ brief-creator → briefs_batch_01.md

PHASE 4 — EXÉCUTION
  Input : briefs_batch_01.md + assets validés
  └─ campaign-builder → campagnes Meta live
  └─ performance-analyst → report_72h.md
  └─ champion-scaler → scaling_plan.md
```

---

## Format Standard d'un Output Agent

```markdown
# [AGENT] — Output [PHASE] | [DATE]

## Brief Reçu
[Copier le brief exact fourni par Clawdbot Prime]

## Statut
- [ ] En cours | [x] Terminé | [ ] Bloqué

## Output Principal
[Contenu livré]

## Métadonnées
- Tokens utilisés : [N]
- Durée : [N min]
- Itérations : [N]
- Qualité estimée : [1-5]

## Handoff → Agent Suivant
- Fichier produit : [chemin]
- Input requis par le suivant : [ce dont il a besoin]
- Flags / points d'attention : [si applicable]

## Prochaine Étape
- Agent suivant : [nom]
- Trigger : [condition de passage]
```

---

## Fichiers Index

| Fichier | Description | Statut |
|---------|-------------|--------|
| `self_onboarding.md` | Product deep dive (source : Drive Chef) | ✅ Livré 2026-02-24 |
| `desire_map.md` | Desires dominants du marché allemand | ✅ Livré 2026-02-24 |
| `competitor_swipe.md` | Analyse concurrents (natural elements, Jello) | ✅ Livré 2026-02-24 |
| `competitor_deep_analysis.md` | Deep dive Jello + APlus + Nuclever | ✅ Livré 2026-02-24 |
| `buzzwords_DE.md` | 50+ buzzwords + 6 hooks DE | ✅ Livré 2026-02-24 |
| `objections_map.md` | 14 objections + beliefs + framework | ✅ Livré 2026-02-24 |
| `avatar_insights.md` | 4 avatars + 10 sub-avatars initiaux | ✅ Livré 2026-02-24 |
| `web_research_DE.md` | 4 Brave searches DE + 4 angles validés | ✅ Livré 2026-02-24 |
| `drive_synthesis.md` | Synthèse Google Drive Chef (produit + avatars + USPs) | ✅ Livré 2026-02-24 |
| `RESEARCH_PHASE1_COMPLETE.md` | Index Phase 1 + gaps + next steps | ✅ Livré 2026-02-24 |
| `avatars_core.md` | 3 core avatars + 15 sub-avatars + 30 hooks DE | ✅ Livré 2026-02-24 |
| `angle_bank.md` | 30-90 angles marketing | 🔴 À créer (Phase 2) |
| `creative_roadmap.md` | Plan de création créative | 🔴 À créer (Phase 2) |
| `hook_bank.md` | 10 hooks par angle prioritaire | 🔴 À créer (Phase 3) |
| `scripts_batch_01.md` | Scripts UGC/VSL en allemand | 🔴 À créer (Phase 3) |
| `briefs_batch_01.md` | Briefs créatifs pour UGC creators | 🔴 À créer (Phase 3) |
| `report_72h.md` | Analyse performance 72h post-launch | 🔴 À créer (Phase 4) |
| `scaling_plan.md` | Plan de scale des winners | 🔴 À créer (Phase 4) |

---

## Règles Handoff (non négociables)

1. **Aucun agent ne démarre sans l'output du précédent** — pas d'exception
2. **Chaque output = fichier `.md` dans ce dossier** avant de passer au suivant
3. **Clawdbot Prime valide chaque output** avant handoff
4. **En cas d'output insuffisant** : 1 itération corrective, puis escalade à Chef
5. **Langue des outputs** : Allemand (créatifs) / Français (analyses, briefs)

---

*Phase actuelle : Phase 2 — Strategy | avatars_core.md livré — Prochaine étape : angle_bank.md*
