# OpenClaw Agents qui s'Améliorent avec le Temps — Stack Exact après 40 Jours
> Source: @Saboo_Shubham_ (Shubham Saboo — Sr AI PM @Google · Awesome LLM Apps #1 GitHub 97K stars · 107K followers) — X Article | 27 Feb 2026
> URL: https://x.com/Saboo_Shubham_/status/2027463195150131572
> Stats: 27K vues · 821 bookmarks · 271 likes
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**"Mes agents deviennent plus intelligents chaque jour. Tout ce que je fais : leur parler."**

Pas de prompt tweaking. Pas de changement de modèle. Juste du feedback → ils l'écrivent. 40 jours → même modèle, mais des fichiers markdown qui s'enrichissent chaque semaine.

**3 layers · 8 agents · Telegram · 0 orchestration framework · Markdown = integration layer**

---

## 📐 Les 3 Layers du Stack

### Layer 1 — IDENTITY (Qui est cet agent)
```
SOUL.md     → qui est l'agent, ce qu'il fait, comment il se comporte
IDENTITY.md → business card : nom, rôle, vibe, one-liner
USER.md     → qui il aide (préférences, background, contexte)
```

**TV Character Trick :**
> "Quand je dis à Claude 'you have Dwight Schrute energy', il sait déjà ce que ça veut dire depuis son training data. Thorough, intense, prend son job très au sérieux. C'est 30 saisons de character development chargées gratuitement."

**Règle SOUL.md :** < 60 lignes. Si trop long → mange le contexte qui devrait aller au vrai travail.

### Layer 2 — OPERATIONS (Comment il opère)
```
AGENTS.md        → règles comportementales (startup routines, file reading order, mémoire, safety)
HEARTBEAT.md     → self-healing (vérif browser alive + cron jobs exécutés = paire nécessaire)
Specialist files → 6 fichiers extra pour Kelly : style guides, format refs, exemples réels, assignments
```

**Principe :** 
> "Si une correction n'atteint pas un fichier, elle n'existe pas à la prochaine session. AGENTS.md rend ça explicite pour que l'agent écrive tout."

**Specialist files :** Ajouter UNIQUEMENT quand tu identifies un pattern qui revient en correction. Pas avant.

**HEARTBEAT.md :** 
> "Agent teams are infrastructure. Infrastructure breaks." 
→ Builder après le premier failure — tu sais exactement quoi monitorer parce que tu l'as ressenti.

### Layer 3 — KNOWLEDGE (Ce qu'il a appris)
```
Tier 1 : MEMORY.md           → mémoire long-terme curatée (pas des raw logs — ce qui compte)
Tier 2 : memory/YYYY-MM-DD.md → logs quotidiens (matière première)
Tier 3 : Organized folders    → organized par person / project
Shared Context               → couche de connaissances cross-agents
```

**Section "BAD" dans MEMORY.md :**
> "Kelly a écrit elle-même la section BAD après des corrections. Elle catalogue ses propres erreurs pour ne pas les répéter. Cette section vaut plus que n'importe quel guide de prompt engineering."

**Règle maintenance :**
- Ne charger que : log d'aujourd'hui + log d'hier (pas toute l'histoire)
- Pruner les vieux logs toutes les 2 semaines
- Kelly a atteint 161,000 tokens → output quality s'est effondré → compact à 40K

---

## 🔑 Insights Clés

| Insight | Détail |
|---------|--------|
| **SOUL.md < 60 lignes** | Chaque ligne = contexte volé au travail réel |
| **TV character trick** | 30 saisons de training data chargées gratuitement |
| **Only J + J-1 logs** | Ne pas charger toute l'histoire — contextual bloat |
| **Section BAD dans MEMORY.md** | L'agent documente ses propres erreurs → self-improvement |
| **Specialist files = correction patterns** | Ne créer qu'après avoir identifié un pattern récurrent |
| **HEARTBEAT = infrastructure monitoring** | Build après le premier failure — pas avant |
| **Shared Context folder** | Cross-agent knowledge layer — un fichier que tous lisent |

---

## 💡 Insights Actionnables

1. **Ajouter une section "BAD" à MEMORY.md** de Clawdbot Prime → logger les erreurs passées → elles ne se répéteront plus jamais
2. **TV character trick** → donner des "personnalités populaires" aux 6 agents EVOLVE (ex: Desire Researcher = "Sherlock Holmes", Script Writer = "Don Draper")
3. **SOUL.md < 60 lignes** → auditer SOUL.md actuel, condensé si > 60 lignes
4. **Shared Context** → `workspace/AGENT_BRAND_CONTEXT/` existe déjà = exact Tier 3 décrit ici ✅
5. **Règle logs** : ne charger que J + J-1 dans les heartbeats → réduire context bloat

---

## 🏪 Applications directes pour drinknellio.com

| Application | Fichier / Action | Impact |
|-------------|-----------------|--------|
| Section BAD dans MEMORY.md | Ajouter "## Erreurs Permanentes" → toutes les corrections passées | Zéro répétition d'erreurs |
| TV character pour agents EVOLVE | Hook Writer = "David Ogilvy" / Script Writer = "Don Draper" | Personnalité plus ancrée |
| Specialist files Nellio Studio | `workspace/nellio-studio/CREATIVE_STANDARDS.md` → score 8/10 rules | Qualité auto-enforced |
| Shared Context enrichissement | Mettre meta-analyse 45 études + verbatims DE dans AGENT_BRAND_CONTEXT/ | Tous les agents voient les vrais insights |
| Logs pruning | Review + archive des daily logs > 2 semaines | Context window propre |

---

## ⚡ Citations Clés

> "My agents get smarter every day. All I do is talk to them."

> "Same model on day 1 and day 40. The difference is a stack of markdown files that get richer every single week."

> "The filesystem is the integration layer."

> "If a correction doesn't reach a file, it doesn't exist next session."

> "Kelly wrote the 'BAD' section herself after corrections. That section alone is worth more than any prompt engineering guide."

> "Agent teams are infrastructure. Infrastructure breaks."

---

## 🔗 Liens avec la bibliothèque

- **Atlas Session Lifecycle** (r/ClaudeAI) : même philosophie SOUL/MEMORY/AGENTS — confirme l'architecture
- **@kloss_xyz SOUL.md prompt** (ce batch) : TV character + < 60 lignes + Advanced Principles = ensemble complet
- **Top 10 Claude Code Tips** (ykdojo) : Tip #1 fresh context + #8 HANDOFF = même approche "mémoire externe"

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
