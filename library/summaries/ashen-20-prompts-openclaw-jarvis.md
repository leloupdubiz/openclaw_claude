# 20 Prompts to Feed Your OpenClaw — From Clanker to Jarvis
> Source: @ashen_one (Ashen) — X Article | 26 Feb 2026
> URL: https://x.com/ashen_one/status/2027117946049589745
> Stats: 178K+ vues · 2034 bookmarks · 525 likes
> Auteur: Tech founder · 52K followers · Telaga Charity/Nigeria
> Intégré le: 2026-02-27

---

## 🎯 Concept Central

OpenClaw ne démarre jamais comme Jarvis — il démarre comme un "Clanker" (robot stupide). Ce guide liste les **20 configurations/prompts** qui transforment un agent générique en Jarvis fonctionnel. Chaque prompt correspond à une brique de l'architecture qui fait fonctionner un agent de façon autonome et fiable.

**Usage recommandé** : copier cet article entier → le donner à OpenClaw → dire :
> *"Here is a list of 20 prompts I want to improve you with, read them all and see if we need them. If we're already doing it, lmk, if not, tell me how each could be beneficial for us if implemented. Don't install them immediately, let's decide together."*

---

## 📋 Les 20 Configurations Clés

### Architecture Fichiers (Fondations)
| # | Fichier | Description |
|---|---------|-------------|
| 1 | **SOUL.md** | Personnalité complète — voix, vocabulaire, framework de décision, anti-slop standards. L'agent parle comme une personne spécifique, pas un chatbot. |
| 2 | **USER.md** | Profil complet du fondateur — planning, plateformes, audience, niche contenu, sources de revenus, compétiteurs, détails personnels. Agent a le contexte complet sans demander. |
| 3 | **HEARTBEAT.md** | Checks périodiques batchés (calendrier, Todoist, brand deal tracker) via heartbeat polls plutôt que des crons séparés. |
| 4 | **TOOLS.md** | Setup local : SSH, chemins API, targets de déploiement, outils installés, noms de machines. Pas de documentation — juste les faits dont l'agent a besoin pour opérer. |
| 5 | **LEARNINGS.md** | Après toute correction/erreur : fixer → écrire la leçon → écrire une règle → relire au début de session. Refaire la même erreur = impardonnable. |
| 6 | **MEMORY.md** | Mémoire long-terme curatée — pas de logs bruts. Insights distillés, états des projets, décisions clés. < 100 lignes. Sous-fichiers (memory/projects.md, memory/people.md). |

### Règles d'Exécution
| # | Règle | Description |
|---|-------|-------------|
| 7 | **Security** | Ne jamais deviner les config changes — lire la doc d'abord. Fixer les erreurs immédiatement. Jamais de force push git. API keys centralisées dans .secrets. |
| 8 | **Vibecoding** | Tout ce qui sort doit passer le "human test" : pas de langage AI générique ("In today's fast-paced world"), pas de formatting robotique. Si un user peut dire que c'est de l'IA → failed. |
| 9 | **Planning** | Écrire les plans, jamais de notes mentales. Queue discipline — ne jamais dropper un message silencieusement. Definition of done = commande de vérification + commit hash + URL live. Pour 3+ étapes : écrire le plan d'abord. |
| 10 | **Error Handling** | Self-improvement loop : correction → leçon → règle → relecture au démarrage. |

### Tools Recommandés
| # | Outil | Usage |
|---|-------|-------|
| 11 | **Gemini API** | Génération d'images (Imagen 3) pour visuels de contenu |
| 11 | **Voicebox** | Voice cloning local (Qwen3-TTS), sans dépendance cloud |
| 11 | **Brave Search API** | Web search sans Google (déjà configuré ✅) |
| 11 | **AgentMail** | Gestion email automatisée |
| 11 | **xAI API** | Grok/X integration pour live Twitter intelligence |
| 11 | **LarryBrain Pro** | 32 skills on demand |
| 11 | **here.now** | Static hosting gratuit pour prototypes/outils internes |

### Protocoles Opérationnels
| # | Protocole | Description |
|---|-----------|-------------|
| 12 | **Mission Control** | Dashboard local pour visibilité opérationnelle |
| 13 | **Communication** | Toujours tagger @QUELQU'UN dans Discord. Répondre directement aux messages, pas dans le flux du channel. Liens directs vers fichiers. |
| 14 | **Task Board** | Kanban view depuis Mission Control |
| 15 | **Status Updates** | Avant toute opération > 10s : prévenir l'utilisateur. "Generating image, gimme 30 seconds" > silence. |
| 16 | **Content** | Rien ne publie sans approbation humaine. Draft → canal approval → approve/reject → publier ou supprimer. Jamais de publication autonome. |
| 17 | **Autonomy** | Rules claires : peut faire librement (lire fichiers, search web, bug fixes). Doit demander (dépenser de l'argent, supprimer resources prod, changer modèle de revenus). |
| 18 | **Multi Agent** | Hiérarchie claire : qui décide, qui exécute, qui approuve. Jamais de publication sans l'approbateur désigné. |
| 19 | **Browser Rules** | Chrome Browser Relay (profile="chrome") pour sites avec session signée. Navigateur isolé (profile="openclaw") pour automatisation web générale. |
| 20 | **Memory is Limited** | Si tu veux te souvenir → écrire dans un fichier. Les "mental notes" ne survivent pas aux redémarrages de session. Files do. |

---

## ✅ Statut Clawdbot Prime (auto-évaluation)

| # | Prompt | Statut |
|---|--------|--------|
| 1 | SOUL.md | ✅ Existant + complet |
| 2 | USER.md | ✅ Existant + complet |
| 3 | HEARTBEAT.md | ✅ Existant + crons actifs |
| 4 | TOOLS.md | ✅ Existant + à jour |
| 5 | LEARNINGS.md | ❌ Absent — à créer |
| 6 | MEMORY.md | ✅ Existant (44KB, dense) |
| 7 | Security | ✅ Partiellement (via AGENTS.md §6) |
| 8 | Vibecoding | ✅ Anti-slop dans SOUL.md |
| 9 | Planning | ✅ AGENTS.md §T1-T7 |
| 10 | Error Handling | ⚠️ Partiel — pas de LEARNINGS.md dédié |
| 11 | Good Tools | ⚠️ Brave Search ✅ · Gemini/Voicebox ❌ |
| 12 | Mission Control | ✅ localhost:3000 |
| 13 | Communication | ✅ Discord configuré |
| 14 | Task Board | ❌ Absent |
| 15 | Status Updates | ✅ Checkpoints actifs |
| 16 | Content Approval | ❌ Absent (contenu auto sans approval pour les résumés) |
| 17 | Autonomy | ✅ AGENTS.md §6 |
| 18 | Multi Agent | ✅ AGENTS.md §B |
| 19 | Browser Rules | ✅ Configuré |
| 20 | Memory is Limited | ✅ MEMORY.md + daily logs |

**Gaps critiques à adresser :**
1. ❌ **LEARNINGS.md** → créer `workspace/memory/learnings.md`
2. ❌ **Content Approval** → implémenter pour le contenu auto (résumés, posts)

---

## 💡 Insights Actionnables

1. **Créer LEARNINGS.md maintenant** : `workspace/memory/learnings.md` — documenter les erreurs et patterns des sessions passées (ex: YouTube rate limit 429, pipeline kie.ai cassé, etc.)
2. **Implémenter le "Human Test"** dans le script prompt de Nellio Studio : avant chaque output créatif, vérifier qu'aucun marker IA générique ne subsiste
3. **AgentMail** : configurer pour automatiser les emails outreach influenceurs DE (synergies avec le use case Ernesto)
4. **here.now** : pour héberger des prototypes OMNIA ou pages de test A/B Nellio rapidement
5. **Content Approval Channel** : créer un channel Discord #content-approval pour que les posts faceless Nellio soient approuvés avant publication

---

## 🏪 Applications directes pour drinknellio.com

| Prompt | Application Nellio |
|--------|-------------------|
| **LEARNINGS.md** | Logger tous les échecs créatifs (ads qui ne convertissent pas + raison) → feed dans le prochain batch brief |
| **Human Test (Vibecoding)** | Appliquer sur chaque script UGC DE avant production HeyGen |
| **Content Approval** | Channel Discord #content-approval → approve/reject les posts organiques DE avant publication |
| **Multi-Agent Hierarchy** | Clawdbot Prime = approbateur · Agents EVOLVE = exécutants · aucun agent ne publie sans validation |
| **Status Updates** | Pour les tâches longues (transcription, génération batch) → checkpoint Discord systématique |

---

## ⚡ Citations Clés

> "It NEVER starts off as Jarvis, always as a Stupid Clanker."

> "Text beats brain — if you didn't write it down, it didn't happen."

> "Nothing goes live without human approval. Draft → approval channel → human reviews → approved = posted."

> "When in doubt, ask. But don't ask about things you should obviously handle yourself."

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-27*
