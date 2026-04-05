# Ce que la Plupart des Setups OpenClaw Ratent — Workspace Layout Idéal
> Source: r/OpenclawBot — Reddit | Feb 2026
> URL: https://www.reddit.com/r/OpenclawBot/comments/1qtjqfu/
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**La différence entre un script et un système** = le HEARTBEAT.md.

> "OpenClaw n'est pas une IA qui fait des tâches. C'est un environnement d'exploitation always-on pour une petite organisation digitale."

La plupart des setups : Prompt → Run → Output → Terminé.
Le bon setup : **Heartbeat → État → Outils → Logs → Mémoire → Décisions → Heartbeat...**

---

## 📋 Les 5 Catégories de Fichiers

### 1. Identité et Règles d'Opération
| Fichier | Rôle |
|---------|------|
| `AGENTS.md` | Roster et responsabilités |
| `IDENTITY.md` | Voix et principes (comportement consistant) |
| `SOUL.md` | Valeurs et personnalité |
| `SAFETY.md` | Guardrails — ce que l'agent ne fera JAMAIS |
| `STATUS.md` | État actuel + définition de "healthy" |

### 2. Ce que le Système Fait Quand Personne ne Regarde
| Fichier | Rôle |
|---------|------|
| **`HEARTBEAT.md`** ⭐ | **LE fichier clé. La différence entre chatbot et operator always-on.** |

Ce que HEARTBEAT.md définit :
- Ce que l'agent vérifie
- À quelle fréquence
- Ce qui compte comme inactivité normale
- Ce qui compte comme une défaillance
- → Si gateway meurt ou workflow stalle : escalade / retry / stop

### 3. Couche d'Exécution
| Composant | Rôle |
|-----------|------|
| `skills/` | Capacités de l'agent |
| `scripts/` | Automations répétables |
| `dist/` | Output compilé/packagé |
| `TOOLS.md` | Bridge entre ce qu'on demande et ce que le système peut exécuter |

### 4. Mémoire et Apprentissage
| Composant | Rôle |
|-----------|------|
| `memory/` | Contexte long-terme |
| `data/` | Inputs/outputs qui doivent persister |
| `LOGGING_TEMPLATE.md` | Ne pas perdre d'évidence quand ça casse. **Logging = obligatoire pour la fiabilité.** |

### 5. Mission Control
| Fichier | Rôle |
|---------|------|
| `EXECUTION_BOARD.md` | Work in progress actuel |
| `CONTENT_QUEUE.md` | Ce à shipper ensuite |
| `OPS_NOTES.md` | Apprentissages en cours de run |
| `PLAN_90D.md` | La vision long terme → empêche la dérive semaine à semaine |

---

## 🔄 La Boucle Système

```
HEARTBEAT maintient l'état
    ↓
État guide l'utilisation des outils
    ↓
Utilisation des outils génère des logs
    ↓
Logs alimentent la mémoire
    ↓
Mémoire change les décisions futures
    ↓
HEARTBEAT relance
```

**vs la plupart des setups :**
```
Prompt → Run → Output → Fin
(Pas de mémoire. Pas d'état. Pas d'apprentissage. Pas d'autonomie.)
```

---

## 💡 Insights Actionnables

1. **Clawdbot Prime est bien aligné** avec ce pattern ✅ : AGENTS.md + SOUL.md + IDENTITY.md + HEARTBEAT.md + memory/ en place
2. **Fichiers manquants** : EXECUTION_BOARD.md (work in progress EVOLVE), CONTENT_QUEUE.md (scripts à tourner), OPS_NOTES.md, LOGGING_TEMPLATE.md
3. **STATUS.md** : manquant → à créer avec l'état "healthy" de Clawdbot Prime (services up, mémoire < 50KB, disk > 3GB, agents EVOLVE status)
4. **PLAN_90D.md** → manquant → à créer : Roadmap 90 jours Nellio (Batch #1 lancement, Batch #2, Scale winners, OMNIA SaaS V1)
5. **LOGGING_TEMPLATE.md** → format de log standardisé pour les sessions → actuellement ad hoc dans memory/YYYY-MM-DD.md

---

## 🏪 Applications directes pour drinknellio.com

| Fichier | Statut | Valeur pour Nellio |
|---------|--------|-------------------|
| AGENTS.md ✅ | Complet | Protocole multi-agents EVOLVE |
| SOUL.md ✅ | Complet | Comportement Clawdbot Prime |
| HEARTBEAT.md ✅ | Complet | Routines autonomes 08h00 |
| memory/ ✅ | Actif | Logs quotidiens + MEMORY.md |
| TOOLS.md ✅ | Complet | Stack technique |
| **EXECUTION_BOARD.md** ❌ | Absent | Status EVOLVE Phase 1-4 |
| **CONTENT_QUEUE.md** ❌ | Absent | Queue scripts UGC à produire |
| **STATUS.md** ❌ | Absent | État santé du système |
| **PLAN_90D.md** ❌ | Absent | Roadmap Nellio 90 jours |
| **LOGGING_TEMPLATE.md** ❌ | Absent | Format standardisé logs |

---

## ⚡ Citations Clés

> "The key file is HEARTBEAT.md because it is where autonomy comes from. No heartbeat means no operator behaviour. Just an expensive CLI that waits for you."

> "OpenClaw is not an AI that does tasks. It is an always-on operating environment for a small digital organisation. Policies, roles, memory, tools, and logs. The workspace is the organisation chart."

> "HEARTBEAT.md is the difference between a chatbot and an always-on operator."

> "This is the difference between a script and a system."

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
