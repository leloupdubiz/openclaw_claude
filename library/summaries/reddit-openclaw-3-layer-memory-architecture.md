# Ne Pas "Entraîner l'Agent en Chat" — Architecture Mémoire 3 Couches
> Source: r/OpenclawBot — Reddit | Feb 2026
> URL: https://www.reddit.com/r/OpenclawBot/comments/1qvvodz/
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**Arrêter de penser "le bot se souvient de choses". Penser en termes de couches.**

> "Si tu entraînes l'agent dans les threads de chat, tu fais fausse route."

L'entraînement = éditer la vérité en Couche 1 (fichiers workspace). Jamais en conversation.

---

## 📋 Les 3 Couches

### Couche 1 — Local Workspace (Source de Vérité)
```
Caractéristiques : Gratuit · Persistant · Boring (dans le bon sens)
Vit dans : repo ou dossier workspace OpenClaw
Règle : Tout ce que tu serais en colère de perdre → ici
```

**Structure recommandée :**
```
workspace/
├── agent/
│   ├── IDENTITY.md      → Qui est l'agent, pourquoi il existe
│   ├── POLICIES.md      → Ce qu'il doit toujours respecter (safety boundaries)
│   ├── STYLE.md         → Ton et formatting
│   ├── EXAMPLES.md      → Bons et mauvais outputs → ancre la consistance
│   ├── RUNBOOK.md       → Comment l'agent opère, debug order
│   ├── CURRENT_STATE.md → État rolling du monde (en cours / bloqué / priorité)
│   ├── CONTEXT_PACK.md  → ⭐ LE FICHIER CLÉ — seul fichier garanti à chaque run
│   └── CHANGELOG.md     → Historique des changements de comportement (drift visible)
├── memory/
│   ├── summaries/
│   │   ├── daily_YYYY-MM-DD.md
│   │   ├── facts.md
│   │   └── decisions.md
│   └── runs/
│       └── 2026-02-04T091200Z_run_001/
│           ├── input.json
│           ├── plan.md
│           ├── actions.log
│           ├── output.md
│           └── evidence/
├── scripts/
│   ├── build_context_pack.ts
│   └── refresh_current_state.ts
└── docs/
    ├── product/
    ├── integrations/
    └── security/
```

### Couche 2 — Memory Store (Persistant mais non-autoritaire)
```
Caractéristiques : Persistant · Relativement cheap
Usage : Summaires · Notes long-terme · Embeddings · Faits dérivés
Règle : N'JAMAIS traiter comme autoritaire — seulement comme helper
```

### Couche 3 — Model Context Window (Éphémère)
```
Caractéristiques : Cher · Éphémère · Reset à chaque session/provider change
Règle : Toujours reconstruire depuis Couche 1 (assisté par Couche 2)
Objectif système : Couche 3 peut être détruite à tout moment et reconstruite
```

---

## 🔄 Le Workflow

### "Entraîner" l'agent = Éditer Couche 1
```
1. Editer IDENTITY / POLICIES / STYLE / EXAMPLES / RUNBOOK
2. Script compilateur → lit les fichiers → produit CONTEXT_PACK.md
   (délibérément court pour tenir dans chaque requête)
3. CONTEXT_PACK.md = seule chose garantie envoyée au modèle à chaque fois
```

### Heartbeat → Mise à jour de CURRENT_STATE.md
```
→ Job cheap (lecture de fichiers locaux)
→ N'appelle le modèle que si résumé nécessaire
```

### Run d'un message utilisateur
```
1. Retrieval first :
   - Lire CONTEXT_PACK.md + CURRENT_STATE.md
   - Optionnellement : quelques snippets mémoire pertinents
2. Composer le prompt runtime (pas d'assumption de persistance)
3. Exécuter
4. Écrire les artefacts :
   - Décisions dans memory/decisions.md
   - Logs dans runs/
   - Changes dans CHANGELOG.md
```

---

## ⭐ Version Minimale (3 fichiers)

Pour 80% du bénéfice :
```
agent/IDENTITY.md      → Qui est l'agent
agent/CURRENT_STATE.md → État actuel du monde
agent/CONTEXT_PACK.md  → Prompt compilé injectable
```

---

## 💡 Insights Actionnables

1. **CONTEXT_PACK.md manquant** dans Clawdbot Prime → à créer : compilation de SOUL.md + IDENTITY.md + USER.md + état EVOLVE actuel → fichier court garanti dans chaque session
2. **CURRENT_STATE.md** = exactement ce que `memory/YYYY-MM-DD.md` fait → renommer ou créer un fichier de rolling state distinct (statut en cours, blockers, priorité du jour)
3. **CHANGELOG.md** = absent → à créer pour tracker les changements de comportement de Clawdbot Prime et détecter la dérive
4. **"Entraîner en chat" → éditer Couche 1** : tout ce que Chef "apprend" à Clawdbot Prime dans une conversation → immédiatement écrit dans MEMORY.md ou AGENTS.md (pas laissé dans le chat)
5. **Scripts `build_context_pack.ts` et `refresh_current_state.ts`** → à créer pour automatiser la reconstruction du contexte injecté à chaque run

---

## 🏪 Applications directes pour drinknellio.com

| Composant 3-Layer | État actuel Clawdbot Prime | À faire |
|-------------------|---------------------------|---------|
| **Couche 1 — Source of Truth** | MEMORY.md + SOUL.md + AGENTS.md + HEARTBEAT.md ✅ | Créer CONTEXT_PACK.md compilé |
| **CURRENT_STATE.md** | memory/YYYY-MM-DD.md (quotidien) | Créer fichier rolling state |
| **CONTEXT_PACK.md** | Absent ❌ | Build script → 500-1000 tokens max |
| **CHANGELOG.md** | Absent ❌ | Créer dans memory/ |
| **memory/runs/** | Absent ❌ | Pattern à implémenter pour agents EVOLVE |

---

## ⚡ Citations Clés

> "If you're training your agent in chat threads, you're doing it wrong."

> "The entire goal of the system is that layer three can be destroyed at any time and safely reconstructed."

> "CONTEXT_PACK is the only thing guaranteed to be sent to the model every time."

> "If you want to go further: wire the boot sequence so the agent always rebuilds context the same way, no matter which model or provider is active."

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
