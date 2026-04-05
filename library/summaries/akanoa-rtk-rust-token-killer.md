# RTK — Rust Token Killer : -60 à -90% de tokens Claude Code
> Source: @_Akanoa_ → GitHub: rtk-ai/rtk | 27 Feb 2026
> URL: https://x.com/_Akanoa_/status/2027431590377181606 · https://github.com/rtk-ai/rtk
> Stats tweet: 26K vues · 659 bookmarks
> Licence: MIT · Version: 0.22.2 · Binaire Rust unique, zéro dépendances
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**RTK (Rust Token Killer)** est un proxy CLI qui filtre et compresse les sorties de commandes AVANT qu'elles n'atteignent le contexte de Claude. Résultat : **-60 à -90% de tokens consommés** sur les opérations dev courantes, sans changer la façon de travailler.

```
Session normale Claude Code : ~150,000 tokens
Avec RTK : ~45,000 tokens → -70% reduction
```

---

## 📊 Économies par Commande

| Commande | Standard | RTK | Économies |
|----------|----------|-----|-----------|
| `ls / tree` (×10) | 2,000 | 400 | **-80%** |
| `cat / read` (×20) | 40,000 | 12,000 | **-70%** |
| `grep / rg` (×8) | 16,000 | 3,200 | **-80%** |
| `git status` (×10) | 3,000 | 600 | **-80%** |
| `git diff` (×5) | 10,000 | 2,500 | **-75%** |
| `git add/commit/push` (×8) | 1,600 | 120 | **-92%** |
| `npm test / pytest` (×5) | 25,000 | 2,500 | **-90%** |
| **TOTAL session** | **~118,000** | **~23,900** | **-80%** |

---

## ⚙️ Comment ça fonctionne

```
SANS RTK :
Claude tape "git status"
  → shell exécute
  → 50 lignes de raw output (~2000 tokens) → Claude

AVEC RTK (hook transparent) :
Claude tape "git status"
  → PreToolUse hook intercepte
  → réécrit automatiquement en "rtk git status"
  → RTK filtre/groupe/déduplique
  → "3 modified, 1 untracked ✓" (~10 tokens) → Claude
```

**4 stratégies de compression :**
1. **Smart Filtering** : supprime noise (commentaires, whitespace, boilerplate)
2. **Grouping** : agrège les items similaires (fichiers par directory, erreurs par type)
3. **Truncation** : garde le contexte utile, coupe la redondance
4. **Deduplication** : collapse les lignes de log répétées avec compteur

---

## 🛠️ Installation (macOS — 2 minutes)

```bash
# 1. Installer
brew install rtk

# 2. Vérifier que c'est le bon rtk (PAS le Type Kit)
rtk --version  # doit montrer "rtk 0.22.2"
rtk gain       # doit montrer les stats de savings

# 3. Init global avec hook (RECOMMANDÉ)
rtk init --global
# → Installe le hook PreToolUse dans ~/.claude/hooks/rtk-rewrite.sh
# → Crée ~/.claude/RTK.md (10 lignes, 99.5% token savings)
# → Modifier ~/.claude/settings.json avec le hook

# 4. Vérifier
rtk init --show  # Vérifie que le hook est installé et exécutable
```

⚠️ **ATTENTION** : Il existe 2 repos nommés "rtk" sur GitHub. Le bon = `rtk-ai/rtk`. Si `rtk gain` n'existe pas → mauvais package installé.

---

## 🎮 Commandes Principales

```bash
# Fichiers
rtk ls .              # Directory tree compact
rtk read file.rs      # Smart file reading
rtk read file.rs -l aggressive  # Signatures seulement (strip bodies)
rtk grep "pattern" .  # Recherche groupée

# Git (les plus utilisés)
rtk git status        # Compact
rtk git log -n 10     # One-line commits
rtk git diff          # Condensed
rtk git push          # → "ok ✓ main"
rtk git commit -m "msg"  # → "ok ✓ abc1234"

# Tests (game changer)
rtk test cargo test   # Échecs seulement (-90% tokens)
rtk pytest            # Échecs seulement (-90% tokens)
rtk tsc               # Erreurs TypeScript groupées par fichier

# Analytics
rtk gain              # Stats de savings avec temps d'exécution
rtk gain --graph      # + ASCII graph des 30 derniers jours
rtk discover          # Commandes où rtk aurait économisé des tokens
```

---

## 💡 Feature "tee" — Récupérer les détails en cas d'échec

**Problème sans tee** : RTK filtre trop → Claude perd les stack traces → relance la commande 2-3x → gaspille des tokens.

**Solution** : Sur échec, RTK sauvegarde le raw output et affiche :
```
✓ cargo test: 15 passed
[full output: ~/.local/share/rtk/tee/1707753600_cargo_test.log]
```
Claude lit le fichier plutôt que de re-run → économie de tokens.

---

## 📈 Exemple Réel — 3 jours de session

```
Total commands: 133
Input tokens: 30.5K
Output tokens: 10.7K
Tokens saved: 25.3K (83.0%)

By Command:
rtk git status  41 commands → 17.4K tokens saved (83%)
rtk git push    54 commands → 3.4K tokens saved (92%)
rtk grep        15 commands → 3.2K tokens saved (27%)
rtk ls          23 commands → 1.4K tokens saved (37%)
```

---

## 💡 Insights Actionnables

1. **Installer RTK sur la machine de Chef maintenant** : `brew install rtk && rtk init --global` → économie immédiate sur les sessions Claude Code (OMNIA, Nellio Studio, etc.)
2. **RTK discover** : scanner les sessions existantes pour voir combien de tokens auraient été économisés → `rtk discover --all` → mesurer le ROI exact
3. **Impact sur les coûts Anthropic** : si les sessions Claude Code consomment 150K tokens → avec RTK : 45K → économies directes sur la facture Anthropic
4. **Hook transparent** : Claude Code ne voit pas la réécriture → aucun changement de comportement, que des économies
5. **Auto-rewrite 100%** vs Suggest 70-85% → utiliser auto-rewrite (hook-first mode) pour garantir les économies

---

## 🏪 Applications directes pour drinknellio.com

| Application | Impact |
|-------------|--------|
| **Sessions Claude Code OMNIA/Nellio Studio** | -70% tokens consommés → -70% coût Anthropic par session de code |
| **Sessions agents EVOLVE** | Chaque agent qui lit des fichiers → rtk read → moins de contexte utilisé |
| **Git workflows** | Chaque `git push/commit/status` → rtk → quasi gratuit en tokens |
| **Logs analyse** | `rtk log app.log` → dédupliqué → contexte plus propre pour les agents |

---

## ⚡ Citations Clés

> "Typical session without rtk: ~150,000 tokens. With rtk: ~45,000 tokens → 70% reduction."

> "rtk git push → 'ok ✓ main'. That's it. Not 15 lines."

> "100% rtk adoption across all conversations and subagents, zero token overhead in Claude's context." (avec le hook auto-rewrite)

---

## 🔧 Installation Rapide (TL;DR)

```bash
brew install rtk           # Installer
rtk --version              # Vérifier (doit montrer 0.22.2)
rtk gain                   # Vérifier que c'est Token Killer (pas Type Kit)
rtk init --global          # Hook global + RTK.md
# → Accepter le patch de settings.json : y
# → Redémarrer Claude Code
rtk init --show            # Vérifier que le hook est actif
```

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
