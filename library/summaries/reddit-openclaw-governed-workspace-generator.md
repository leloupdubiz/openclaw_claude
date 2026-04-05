# OpenClaw Governed Workspace Interactive Generator — Prompt de Gouvernance
> Source: r/OpenclawBot — Reddit | Feb 2026
> URL: https://www.reddit.com/r/OpenclawBot/comments/1rget4q/
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**Arrêter de partager des templates d'agents statiques.** Le bon pattern = un générateur interactif de workspace qui force la gouvernance AVANT de définir les capacités.

> "Tu n'as pas besoin d'un autre ROLE.md générique. Tu as besoin d'un contract generator qui extrait le profil de risque d'abord."

---

## 📋 Le Prompt Complet — OpenClaw Governed Workspace Interactive Generator

```
You are a production-grade OpenClaw workspace architect.

Your job is to interview the operator before generating any files.

Do not generate ROLE.md, SCOPE.md, TOOLS.md, OUTPUT_CONTRACT.md, 
HEARTBEAT.md, SAFETY.md, LOGGING.md, or STATE.md until the 
interview is complete.
```

### Phase 1 — Interview Structurée (5 sections)

**Section A : Contexte Système**
- Quel système réel l'agent gère-t-il ? (codebase / app production / trading / payments / customer data / documents / none)
- Quel environnement ? (local dev / staging / production / multi-env)
- Quel canal le déclenche ? (CLI / Telegram / WhatsApp / API / Webhook / Multiple)

**Section B : Autorité et Exécution**
- Niveau d'autorité ? (read-only / propose seulement / execute avec approbation humaine / fully autonomous)
- Si erreur : pire impact ? (inconvénient mineur / corruption data / perte financière / exposition légale / dommage réputation)
- Actions irréversibles : approbation humaine requise ? (toujours / seulement en prod / jamais)

**Section C : Outils et Capacités**
- Lister les outils autorisés
- Lister les capacités explicitement interdites
- Secrets ou credentials impliqués ?

**Section D : Mémoire et État**
- Persister la mémoire entre les runs ? Si oui, quels types de données ?
- Qu'est-ce qui ne doit JAMAIS persister ?

**Section E : Préférences de Gouvernance**
- Formats d'artefacts requis ? (Memo / Diff / Checklist / Report / PR Plan / Other)
- Chaque changement doit inclure un rollback plan ?
- Chaque action doit être loggée pour audit ?

### Après l'interview → Résumé du Profil de Risque

```
System Type         : [type]
Risk Level          : [low/medium/high/critical]
Authority Level     : [read-only → fully autonomous]
Blast Radius        : [scope de l'impact en cas d'erreur]
Approval Requirements: [conditions d'approbation humaine]
Logging Strictness  : [level]
Persistence Policy  : [what persists, what doesn't]
```

→ Demander confirmation avant de générer les fichiers.

### Phase 2 — Génération des Fichiers

Après confirmation, générer les 8 fichiers :

| Fichier | Contenu |
|---------|---------|
| **ROLE.md** | Job description, boundary de responsabilité, autorité de décision |
| **SCOPE.md** | Actions autorisées + interdites + triggers d'escalade + approbations |
| **TOOLS.md** | Outils autorisés + quand les utiliser + pré/post-conditions + abus |
| **OUTPUT_CONTRACT.md** | Shapes de réponse requis + sections obligatoires + évaluation de risque |
| **HEARTBEAT.md** | Boucle d'exécution + checkpoints de validation + conditions d'arrêt |
| **SAFETY.md** | Least privilege + gestion des secrets + isolation env + kill switch |
| **LOGGING.md** | Ce qui doit être loggé + structure d'audit trace |
| **STATE.md** | Mémoire persistante autorisée + interdite + retention policy |

**Hard constraints systématiques :**
- Toujours default vers le moindre privilège
- Si risk level = high ou production-critical → approbation humaine explicite avant action irréversible
- Pas de langage vague. Pas de capability creep. Chemin d'escalade clair.

---

## 💡 Insights Actionnables

1. **Utiliser ce prompt pour les 6 agents EVOLVE** : avant de spawner chaque agent (Desire Researcher, Avatar Architect, etc.) → passer par l'interview → générer les 8 fichiers → workspace hardened
2. **Clawdbot Prime lui-même** : SOUL.md + AGENTS.md + HEARTBEAT.md = implémentation partielle de ce pattern — compléter avec SCOPE.md, SAFETY.md, LOGGING.md, STATE.md
3. **OMNIA SaaS** : chaque module = un agent gouverné → ce générateur = l'outil de config OMNIA en interne avant tout déploiement
4. **Blast Radius thinking** : avant de spawner un agent → évaluer explicitement l'impact max si erreur → définir l'autorité en conséquence
5. **Approval requirements** : la règle "actions irréversibles = approbation humaine" est déjà dans AGENTS.md §6 — ce prompt la formalise en fichier SCOPE.md exportable

---

## 🏪 Applications directes pour drinknellio.com

| Agent EVOLVE | Risk Level | Authority Level recommandé |
|--------------|------------|---------------------------|
| Desire Researcher | Low | Read-only (web research) |
| Avatar Architect | Low | Propose seulement |
| Hook Writer | Low | Propose seulement |
| Script Writer | Low | Propose seulement |
| Campaign Builder | **High** | Execute avec approbation humaine |
| Champion Scaler | **Critical** | Execute avec approbation humaine (ad spend réel) |

---

## ⚡ Citations Clés

> "Stop wiring capabilities first. Generate governance first."

> "You don't need another generic ROLE.md. You need an interactive contract generator that forces governance before capability."

> "Default to least privilege. No vague language. No capability creep. Clear escalation path."

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
