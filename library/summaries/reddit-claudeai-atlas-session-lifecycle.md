# Atlas Session Lifecycle — Mémoire Persistante + Lifecycle Management pour Claude Code
> Source: r/ClaudeAI — u/anombyte93 ($33K AUD en 3 mois avec Claude Code) | Feb 2026
> Reddit: https://www.reddit.com/r/ClaudeAI/comments/1r0n1qz/
> GitHub: https://github.com/anombyte93/atlas-session-lifecycle
> Install: `curl -fsSL https://raw.githubusercontent.com/anombyte93/atlas-session-lifecycle/main/install.sh | bash`
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**Claude Code n'a aucune mémoire persistante entre sessions.** Chaque nouvelle conversation repart de zéro. Trois problèmes qui s'accumulent :

1. **No persistent memory** : contexte, décisions, progrès perdus → on réexplique les mêmes choses à chaque fois
2. **Project sprawl** : fichiers s'accumulent à la racine sans organisation
3. **No lifecycle management** : les projets ont des goals, mais aucun mécanisme pour tracker la progression

**Solution : `/start` skill** — 5-file memory bank + organisation auto + lifecycle "Soul Purpose" de l'init jusqu'à la clôture.

---

## 📋 Les 5 Fichiers de Mémoire (`session-context/`)

| Fichier | Contenu |
|---------|---------|
| `CLAUDE-activeContext.md` | État de la session courante, goals, progression |
| `CLAUDE-decisions.md` | Décisions d'architecture et leur rationale |
| `CLAUDE-patterns.md` | Patterns de code établis et conventions |
| `CLAUDE-troubleshooting.md` | Problèmes communs et solutions prouvées |
| `CLAUDE-soul-purpose.md` | L'objectif unique du projet + critères de complétion |

---

## 🔄 Le Skill `/start` — 2 Modes Auto-Détectés

### Init Mode (première fois — pas de `session-context/`)
```
1. Capturer le "soul purpose" du projet (objectif unique)
2. Détecter l'environnement (git status, fichiers existants, stack)
3. Bootstrapper les 5 fichiers mémoire depuis templates
4. Scanner les fichiers root → proposer une organisation map
5. Générer/mettre à jour CLAUDE.md
6. Onboarder Ralph Loop (auto / manuel / skip)
```

### Reconcile Mode (sessions suivantes — `session-context/` existe)
```
1. Valider et réparer les fichiers de session (depuis templates si corrompus)
2. Lancer /init → refresh CLAUDE.md depuis l'état actuel du codebase
3. Lire le soul purpose + contexte actif → comprendre où on en était
4. Auto-évaluer la complétion du soul purpose
5. Présenter la décision lifecycle : Continue / Close / Redefine
6. Si Close : Harvest durable knowledge (decisions, patterns, troubleshooting)
```

**Invariant clé :** L'IA n'JAMAIS ferme un soul purpose. Elle évalue et suggère. L'humain décide.

---

## 🛡️ `/stepback` — Protocole pour Quand le Debug Déraille

Si bloqué après 2+ tentatives sur le même bug :
```
1. Inventorier TOUTES les tentatives de fix et leurs hypothèses
2. Trouver le fil commun entre les échecs
3. Rechercher l'architecture (requêtes Perplexity obligatoires)
4. Tester l'hypothèse la plus large d'abord
5. Présenter : fix symptôme vs fix architecture
```

---

## ⚙️ Lifecycle "Soul Purpose"

```
Define → Work → Reconcile → Assess → Close ou Continue
              │                    └─► Harvest learnings
              │                    └─► Archive purpose
              └─► Self-assess completion
              └─► User decides (jamais l'IA)
```

**Customisation** (`custom.md`) : instructions en plain English pour modifier le comportement par phase (Init / Reconcile / Always). Exemple :
```
## Always
- Keep tone direct and concise. No fluff.
- Never suggest closing a soul purpose unless all tests pass.
```

---

## 💡 Insights Actionnables

1. **Installer pour le build OMNIA SaaS** : `/start` au début de chaque session Claude Code → mémoire persistante des décisions archi, des patterns, des bugs résolus → pas de réexplication
2. **Soul Purpose OMNIA** = "Construire OMNIA SaaS V1 opérationnel pour un opérateur DTC" → lifecycle clair jusqu'à la livraison
3. **`CLAUDE-troubleshooting.md`** = log des bugs résolus → directement applicable au pattern `workspace/memory/learnings.md` déjà en place
4. **`/stepback`** = exactement le protocole §T3 de AGENTS.md (reprise intelligente) → l'automatiser dans Claude Code
5. **Soul Purpose Nellio Studio** = "Générer Batch #1 Marksman complet (3 scripts UGC DE prêts à tourner)" → lifecycle tracker

---

## 🏪 Applications directes pour drinknellio.com

| Projet | Soul Purpose | Mode actuel |
|--------|-------------|-------------|
| **Nellio Studio** | "Batch Generator UI + Export Meta Ads fonctionnels" | ❌ Pas de lifecycle tracking |
| **OMNIA SaaS** | "V1 opérationnel 26 agents + UI pour opérateur DTC" | ❌ Pas de lifecycle tracking |
| **Build EVOLVE Pipeline** | "Pipeline Batch #2 automatisé end-to-end" | ❌ Pas de lifecycle tracking |

**Après installation :**
```bash
# Dans chaque projet Claude Code
curl -fsSL https://raw.githubusercontent.com/anombyte93/atlas-session-lifecycle/main/install.sh | bash
# Puis dans Claude Code :
/start
```

---

## ⚡ Citations Clés

> "Claude Code has no persistent memory between sessions. Every new conversation starts from zero."

> "Soul purpose is the single objective this project exists to achieve."

> "Key invariant: The AI never closes a soul purpose. It assesses and suggests; the user decides."

> "/stepback — if you've hit the same error after 2+ fix attempts, /stepback forces you to zoom out."

> "$33K AUD in 3 months purely from vibes. Just build shit, make it yours, think like a developer."

---

## 🔗 Liens avec la bibliothèque

- **AgentOps** (ce batch) : complémentaire — AgentOps = pipeline skills (/rpi, /crank), Atlas = lifecycle mémoire persistante → les deux ensemble = Claude Code sessions professionnelles
- **Reddit 3-layer memory** (ce batch) : Atlas implémente exactement la Couche 1 (CONTEXT_PACK = CLAUDE.md) + Couche 2 (memory bank 5 fichiers)
- **AGENTS.md §T3 (Reprise Intelligente)** : `/stepback` est l'implémentation Claude Code de ce protocole

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
