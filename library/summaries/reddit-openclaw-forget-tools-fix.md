# OpenClaw Oublie ses Outils, Dérive, Devient Instable — Causes & Fixes
> Source: r/OpenclawBot — Reddit | Feb 2026
> URL: https://www.reddit.com/r/OpenclawBot/comments/1r8fzrj/
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

Les 3 plaintes récurrentes sur OpenClaw ("il oublie ses outils", "quel provider est safe", "comment sécuriser en production") ne sont **pas des problèmes de prompt. Ce sont des problèmes d'architecture.**

---

## 📋 Diagnostic & Fix — 4 Problèmes

### 1. "Il Oublie Qu'il a des Outils"

**Causes :**
- Les déclarations d'outils ne sont pas chargées de façon consistante dans le profil de l'agent actif
- La mémoire de session n'est pas résumée et réhydratée correctement
- La context window sature avant que les déclarations de capacités soient ré-introduites

**Fix :**
```
→ TOOLS.md + metadata des skills DOIVENT faire partie du profil requis pour ce type d'agent
→ Si pas dans le profil de chargement obligatoire → dégrade avec le temps
→ Ce n'est pas une défaillance d'intelligence. C'est une discipline de chargement.
```

### 2. "Quel Provider est Safe et Cost-Effective ?"

**Risques d'un setup non isolé :**
- 1 seule API key → single point of failure
- 1 seul provider → aucun fallback
- Pas d'abstraction → tout s'effondre ensemble

**Setup safe recommandé :**
```
✓ Provider abstraction layer
✓ Key rotation strategy
✓ Request budgeting par agent
✓ Isolation par rôle d'agent
✓ Logging discipline
```

**Pourquoi les comptes se font flaguer :**
- Volume sans throttling
- Workloads d'automatisation mixés dans une seule identité
- Agents expérimentaux non séparés des agents de production

### 3. "Comment Rendre OpenClaw Safe en Production ?"

**A — Isolation**
```
- Agents séparés par préoccupation
- Répertoires de session distincts
- Permissions d'outils contrôlées
```

**B — Memory Hygiene** (si négligée → hallucinations, outil confusion, dérive de rôle)
```
- Compacter les sessions
- Pruner les logs
- Cap sur la taille des fichiers
- Résumer l'historique
```

**C — Gouvernance dans AGENTS.md**
```
- Ce que chaque agent peut accéder
- Quels fichiers se chargent
- Quels outils sont permis
- Ce qui déclenche une escalade
→ Gouvernance vague = comportement vague
```

### 4. Le Vrai Problème : Pas de Cadence d'Évolution

**Ce que la plupart font :**
- "Ça marche"
- "Il peut appeler des outils"
- "Il peut chaîner des skills"

**Ce que personne ne définit :**
```
- Structure de log quotidien
- Boucle de review hebdomadaire
- Règles de promotion en mémoire long-terme
- Seuils d'escalade de confiance
- Guardrails de budget de contexte
```

> **Sans cadence → pas d'amélioration. OpenClaw accumule de l'entropie.**

**L'entropie ressemble à :**
- Oubli de capacités
- Raisonnement plus lent
- Exécution incohérente
- Instabilité provider

---

## ✅ Ce que la Production OpenClaw Requiert Vraiment

```
□ Token baseline mesuré avant la première interaction
□ Profils de contexte par rôle (role-based context profiles)
□ Discipline de skill registration
□ Provider abstraction + throttling
□ Cadence de session hygiene
□ File size caps (workspace boundaries structurées)
□ Règles de gouvernance sur quand les agents peuvent modifier des fichiers
```

> **"C'est de l'infrastructure. Pas du prompting."**

---

## 💡 Insights Actionnables

1. **TOOLS.md de Clawdbot Prime** : vérifier qu'il est chargé dans TOUS les agents EVOLVE → add en required profile à chaque spawn
2. **Memory Hygiene** : `HEARTBEAT.md` § "Maintenance Mémoire" déjà en place → étendre avec file size cap (>50KB = compact)
3. **Provider isolation** : Anthropic (Claude) + Groq (summaries) séparés ✅ → ajouter budget par agent dans la config
4. **Cadence de review** : `HEARTBEAT.md` § "Routine Quotidienne" → boucle hebdomadaire à renforcer (trust escalation thresholds manquants)
5. **Token baseline** : mesurer le contexte consommé au démarrage d'une session Clawdbot Prime → référence pour détecter la dérive

---

## 🏪 Applications directes pour drinknellio.com

| Problème | État actuel | Fix à appliquer |
|----------|------------|----------------|
| TOOLS.md chargé dans tous les agents | Partiellement (Clawdbot Prime oui, agents EVOLVE non) | Add TOOLS.md dans chaque workspace agent |
| Memory hygiene | HEARTBEAT.md règle 3 jours OK | Ajouter file size cap + session compact |
| Provider isolation | Claude + Groq séparés ✅ | Ajouter budget request par agent |
| Cadence d'évolution | Daily retrospective à 08h00 ✅ | Ajouter weekly trust review |

---

## ⚡ Citations Clés

> "It's not intelligence failure. It's loading discipline."

> "OpenClaw gives you structure. It doesn't enforce operational maturity."

> "Governance is vague → behaviour will be vague."

> "Without cadence, OpenClaw doesn't improve. It accumulates entropy."

> "That's infrastructure. Not prompting."

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
