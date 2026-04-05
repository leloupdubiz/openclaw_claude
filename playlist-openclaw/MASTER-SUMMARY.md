# MASTER-SUMMARY.md — Playlist OpenClaw
> 118 vidéos traitées | Dernière mise à jour : 2026-03-01
> Source : https://www.youtube.com/playlist?list=PL0JPJ-FU3CV-d_Gyg2uAi1xeEEVjtm5hE

---

## 🎯 Vue d'Ensemble

La playlist couvre **l'écosystème complet OpenClaw** : installation, architecture, modèles, use cases business, Claude Code, et l'émergence d'une économie d'agents autonomes. Elle s'adresse aux opérateurs e-commerce, créateurs, et entrepreneurs qui veulent automatiser leur business avec des agents IA 24/7.

**Auteur** : Julian Goldie (CEO Goldie Agency, 300K+ followers X)
**Profil playlist** : Progression du plus général (setup) au plus avancé (multi-agents, revenus)

---

## 🏗️ Concepts Clés par Thème

### 1. Architecture Fondamentale — Brains & Muscles

Le modèle optimal identifié dans la playlist :

```
BRAIN (Orchestration)
  └─ Claude Opus 4.6 — décisions stratégiques, planification complexe

MUSCLES (Exécution)
  ├─ Codex CLI (OpenAI) — coding de qualité, via abonnement ChatGPT
  ├─ Claude Sonnet 4.6 — travail quotidien, 80% qualité Opus à 20% du prix
  ├─ GLM 4.7 Flash — heartbeats, monitoring, tâches légères (GRATUIT)
  ├─ Ollama local — batch processing, sous-agents en volume (GRATUIT)
  └─ Open Router — fallback automatique si rate limited
```

**Règle coût** : Ne jamais utiliser les mots "think" ou "ultra think" sans nécessité → tokens ×3-5

---

### 2. Hardware — La Hiérarchie Optimale

| Hardware | Prix | Verdict |
|----------|------|---------|
| Laptop perso | 0€ | ✅ Commencer maintenant |
| Mac Mini M2 (8GB) | ~600€ | ⭐ Optimal rapport Q/P |
| Mac Studio M2 | 2000€+ | Pour modèles 70B+ locaux |
| VPS cloud | 20-50€/mois | ❌ À éviter (sécurité + puissance réduite) |

**Pourquoi local > VPS** : privacy, apps natives, Ollama, performance, debug, consommation (~10W)

---

### 3. Modèles Locaux (Ollama)

Modèles recommandés pour Mac Mini 8GB :
- `qwen2.5:7b` — excellent multilingue, très bon en **allemand** 🇩🇪
- `llama3.2:8b` — bon généraliste
- `mistral:7b` — coding + reasoning
- `gemma3:4b` — sous-tâches légères, très rapide

---

### 4. Sécurité — Les 3 Règles Absolues

1. **Prompt injection** non résolue → tout input externe peut déclencher des actions
2. Ne connecter que ce qu'on accepte de voir compromis un jour
3. Ne jamais exposer la gateway OpenClaw sur internet sans Docker sandbox

---

### 5. Fichiers de Configuration Essentiels

| Fichier | Rôle | Impact |
|---------|------|--------|
| `SOUL.md` | Personnalité + directives business du bot | ⭐⭐⭐⭐⭐ |
| `USER.md` | Contexte sur l'utilisateur | ⭐⭐⭐⭐ |
| `MEMORY.md` | Mémoire long-terme consolidée | ⭐⭐⭐⭐⭐ |
| `HEARTBEAT.md` | Tâches périodiques automatiques | ⭐⭐⭐⭐ |
| `AGENTS.md` | Protocoles multi-agents | ⭐⭐⭐ |
| `claude.md` (Claude Code) | Règles comportement Claude Code | ⭐⭐⭐⭐ |

---

### 6. Skills Prioritaires à Installer

| Skill | Utilité | Priorité |
|-------|---------|----------|
| `blog-watcher` | Surveiller les blogs concurrents | 🔴 P0 |
| `bird` (Twitter CLI) | Monitoring tendances X/Twitter | 🔴 P0 |
| `coding-agent` | Déléguer le dev à Claude Code | 🔴 P0 |
| `github` | Versionner tous les outputs | 🟡 P1 |
| `apple-notes` | Intégration macOS native | 🟡 P1 |
| `open-whisper` | Speech-to-text local | 🟢 P2 |
| `nano-banana` | Génération d'images | 🟢 P2 |

---

### 7. Patterns d'Automatisation Récurrents

**Pattern Universel** :
```
SURVEILLER → SYNTHÉTISER → PROPOSER → APPROUVER → EXÉCUTER
```

**Pattern Discord (vidéo #15)** :
```
#alerts (trending toutes les 2h) → #research (analyse) → #scripts (output créatif)
```

**Pattern Contenu (vidéo #18)** :
```
Monitor trends → Generate content → Approval queue → Auto-post
```

**Pattern Agents (vidéo #10)** :
```
Agent Research → Agent Strategy → Agent Creation → Agent Execution
└── Output chaque agent = input du suivant (fichiers .md)
```

---

### 8. Claude Code — Les 10 Règles d'Or (vidéo #28)

1. Expliquer les motivations, pas juste le quoi
2. Ne plus s'inquiéter du context window (auto-compaction)
3. Charger le contexte en début de session avec un prompt dédié
4. Utiliser GitHub massivement (mémoire inter-sessions)
5. "Summary after tool use" dans `claude.md` pour apprendre
6. Régler l'eagerness (trop actif ou trop passif → corriger dans `claude.md`)
7. Le mot "think" = tokens ×3 → utiliser "consider" ou "evaluate" à la place
8. Vision = arme secrète (screenshots pour UI inspiration, bug diagnosis)
9. Parallel tool calls rule dans `claude.md` → gains de temps massifs
10. "Investigate before answering" → réduit les hallucinations de 50%+

---

### 9. Claw Tasks & Économie d'Agents (émergent)

- Marketplace B2A (Business to Agent) : agents postent et complètent des missions
- 148 000 agents actifs sur Malt Book en 2 semaines (janvier 2026)
- Comportements émergents : communautés, débats, coopération IA-à-IA
- Signal fort : l'économie d'agents autonomes est déjà en marche

---

### 10. Outils Complémentaires OpenClaw

| Outil | Rôle complémentaire |
|-------|---------------------|
| **Ghostty** | Terminal optimal pour Claude Code (multi-instances, split) |
| **Malt Book** | Social media pour agents IA (early adopter advantage) |
| **Claude Cowork** | Computer use ponctuel (audit abonnements, media kit, PRD) |
| **n8n** | Workflows graphiques, mais OpenClaw plus flexible |

---

## 🏆 Meilleures Pratiques Identifiées

### Setup (J0-J7)
✅ Local > VPS, toujours
✅ Brain dump dans MEMORY.md dès le premier jour
✅ SOUL.md + USER.md remplis via interview bot
✅ Morning brief configuré (cron 8h00)
✅ 1 seul canal messaging pour commencer (Telegram recommandé)

### Optimisation (J7-J30)
✅ Architecture brains/muscles configurée (Ollama pour sous-agents)
✅ Discord avec 3 channels dédiés (alerts/research/scripts)
✅ Memory flush activé + QMD vector backend
✅ Skills installées selon les besoins réels

### Scaling (J30+)
✅ Mission Control en place (Next.js, local)
✅ Agents spécialisés avec SOUL.md dédié
✅ GitHub bot account → tous les outputs versionnés
✅ Approval queues pour tout contenu public

---

## 🚀 Applications Concrètes pour drinknellio.com

### Immédiat (cette semaine)
| Action | Vidéo Source | Impact |
|--------|-------------|--------|
| Installer Blog Watcher (concurrents wellness DE) | #01, #06 | Monitoring permanent |
| Installer Bird (trending X en allemand) | #01, #18 | Insights marché quotidiens |
| Configurer Ollama + Qwen2.5:7b | #03, #15, #22 | Scripts DE en volume gratuit |
| Fix memory vector search (QMD) | #09, #11 | Retrouver n'importe quel insight |
| Ajouter "Investigate before answering" dans claude.md | #28 | Meilleure qualité outputs |

### Court terme (1-2 semaines)
| Action | Vidéo Source | Impact |
|--------|-------------|--------|
| Discord pipeline : #alerts → #research → #scripts | #15, #18 | Veille + création automatisée |
| Lancer Desire Researcher (Phase 1 EVOLVE) | #10, #05 | Base de toute la stratégie |
| GitHub bot account pour les outputs EVOLVE | #11, #28 | Mémoire inter-sessions |
| Créer la skill EVOLVE-research custom | #09, #21 | Standardiser le protocol |

### Moyen terme (1-3 mois)
| Action | Vidéo Source | Impact |
|--------|-------------|--------|
| Mac Mini dédié OpenClaw | #23 | Infrastructure stable 24/7 |
| Multi-agents EVOLVE (6 agents) | #10, #05 | Séquence Research → Scale |
| Voice agent pour approbations créatives | #01, #27 | Review scripts en 30s |
| Batch generation Nellio Studio via Ollama | #03, #22 | 0€ de tokens pour le volume |

---

## 📊 Roadmap d'Implémentation Priorisée

```
SEMAINE 1 — FONDATIONS
  ├─ Blog Watcher + Bird installés
  ├─ Ollama + Qwen2.5 opérationnel
  ├─ Memory fix (QMD vector)
  └─ claude.md rules #9 + #10

SEMAINE 2 — INTELLIGENCE
  ├─ Discord pipeline (3 channels)
  ├─ Desire Researcher lancé (Phase 1 EVOLVE)
  └─ GitHub bot + auto-commit outputs

SEMAINE 3-4 — CRÉATION
  ├─ Séquence EVOLVE Phase 2-3
  ├─ Batch 3-2-2 opérationnel (Nellio Studio)
  └─ Premiers créatifs allemands testés sur Meta

MOIS 2-3 — SCALE
  ├─ Data 72h → identifier champions
  ├─ Mac Mini si EVOLVE décolle
  └─ Stack complet autonome
```

---

## 🔄 Nouvelles Vidéos Détectées
*(Section mise à jour automatiquement par le heartbeat)*

### 2026-03-01 — Vidéo #118 : AI UGC Workflow Complet
**Titre** : How to Make AI UGC Ads in 2026: Sora 2, Claude and the Full Workflow
**ID** : Bek158H4XXs
**Insights clés** :
- Stack : Claude (prompts) → Sora 2 (hook 15s) → 11Labs (voix) → Nano Banana → Cling (B-roll)
- 3 dimensions psychologiques des ads : Valence zone / Self-concept anchor / Language intensity
- Skill Claude récursif pour grader les scripts (min 8/10 requis pour passer)
- Application directe : créer 10 hooks Sora 2 pour les avatars DE de Nellio à ~$1 total
**Résumé** : `playlist-openclaw/video-118-summary.md`

---

*Fichier maintenu automatiquement par le heartbeat quotidien — ne pas éditer manuellement*
