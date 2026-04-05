# GAPS — Agents OMNIA vs Formation EVOLVE Complète
> Clawdbot Prime ⚡ | Produit le 2026-02-25
> Basé sur lecture intégrale EVOLVE + analyse server.js OMNIA (3186 lignes)

---

## RÉSUMÉ EXÉCUTIF

OMNIA est une infrastructure de **production créative** excellente (vidéos, voiceovers, hooks, scripts DE). Elle **ne couvre pas** la couche stratégique EVOLVE qui vient AVANT la production : Research, Avatar building, Angle Planning, Creative Roadmap. De plus, la boucle de **feedback post-lancement** (learnings, iteration tracking, scaling) est absente.

**Status** : OMNIA = Phase 3 seulement (Exécution) | EVOLVE = Phases 1-4 complètes

---

## AGENT PAR AGENT — GAPS IDENTIFIÉS

### 1. 🔍 Desire Researcher (`desire-researcher`)

**Mission actuelle** :
> "Analyser le marché DE stress/sleep et identifier les 3 désirs émergents les plus puissants non encore couverts"

**Ce qui manque vs EVOLVE** :
- ❌ **Pas de pipeline de research réel** — l'agent génère des désirs conceptuellement, sans interroger de vraies sources (Amazon DE, Reddit DE, Facebook Ad Library DE)
- ❌ Pas de connection à des outils (Brave MCP, Shillix, Answer the Public) pour trouver des verbatims réels
- ❌ Pas de classification des désirs selon les 4 niveaux EVOLVE (Utility / Identity / Freedom / Superiority)
- ❌ Pas d'analyse de Market Sophistication du marché DE actuel (on est à quel stage ?)
- ❌ Pas de Research Doc structuré en output (juste du texte non structuré)

**Ce qu'il devrait faire selon EVOLVE (M3)** :
1. Scraper Amazon DE reviews sur concurrents (Baldrian, Sunday Natural, etc.) → extraire verbatims exacts
2. Analyser Reddit DE (r/schlafprobleme, r/angst, r/ernaehrung) → expressions naturelles
3. Analyser Facebook Ad Library DE pour identifier les angles non encore utilisés
4. Produire un Research Doc avec : Verbatim | Source | Catégorie (Desire/Problem/Objection) | Hook Potential

**Fix recommandé** :
```javascript
// Mission prompt amélioré
mission: `Utilise les données suivantes issues de vraies sources pour identifier les désirs DE :
[Reviews Amazon DE concurrents - provided]
[Thread Reddit DE - provided]
Classifie selon : Utility / Identity / Freedom / Superiority
Extrais 20 verbatims exacts en DE
Identifie les 3 désirs non couverts par les concurrents actuels`
```

---

### 2. 🧬 Avatar Architect (`avatar-architect`) + Sub-Avatar Specialist (`sub-avatar-specialist`)

**Mission actuelle** :
> "Proposer 3 nouveaux sub-avatars pour A1 (Erschöpfte Berufstätige)"

**Ce qui manque vs EVOLVE (M4)** :
- ❌ OMNIA a 4 core avatars fixes (hardcodés dans USER.md) → pas les 15-30 sub-avatars attendus
- ❌ Les sub-avatars générés ne sont pas stockés / récupérables dans le système OMNIA
- ❌ Les avatars dans `/api/avatars/list` sont des "personnages visuels" pour vidéos, pas des avatars marketing
- ❌ Pas de Trigger Events documentés pour chaque sub-avatar
- ❌ Pas de mapping : Sub-avatar → Désir → Angle → Hook (la chaîne EVOLVE complète)
- ❌ Les hooks hardcodés dans `/api/hooks` (SA-01 à SA-15) ne sont pas liés à des sub-avatars avec profils détaillés

**Ce qu'il devrait faire selon EVOLVE (M4)** :
1. Pour chaque Core Avatar → générer 15-30 sub-avatars avec : âge exact, situation précise, trigger event, désir caché, désir exprimé, solutions essayées, verbatim exact DE
2. Stocker dans un fichier structuré `data/sub_avatars.json`
3. Lier chaque sub-avatar aux angles qu'il est susceptible de résonner avec

**Fix recommandé** :
```javascript
// Endpoint à créer : POST /api/sub-avatars/generate
// Output format :
{
  id: "A1-c",
  core_avatar: "A1",
  name: "Manager 38 ans Munich",
  age: 38,
  situation: "Chef de projet IT, 2 enfants, promotion il y a 18 mois",
  trigger_event: "Burnout silencieux démarré après promotion",
  problem: "Dort mal depuis 18 mois, irritable, perd ses moyens au travail",
  desire_exprime: "Dormir mieux",
  desire_cache: "Retrouver qui il était avant la promotion",
  solutions_essayees: ["Melatonin 1mg", "Baldrian", "apps de méditation"],
  verbatim_de: "Ich bin so müde aber wenn ich ins Bett gehe, dreht sich mein Kopf einfach weiter",
  best_angles: ["cortisol", "identite"],
  best_hooks: ["reframe", "stat"]
}
```

---

### 3. ✍️ Hook Writer (`hook-writer`)

**Mission actuelle** :
> "Écrire 10 hooks en allemand pour l'avatar A3-c (Alles-Versucher) sur l'angle Cortisol"

**Ce qui fonctionne** : 
- ✅ Les 30 hooks hardcodés `/api/hooks` sont bons, couvrent 5 types (stat, story, proclamation, question, reframe)
- ✅ Le endpoint `/api/hooks/variations` génère des variations

**Ce qui manque vs EVOLVE (M6)** :
- ❌ Les hooks ne sont pas générés depuis des verbatims réels de research → ils sonnent parfois conceptuels
- ❌ Le "Rule of One" n'est pas enforced : certains hooks ciblent plusieurs désirs à la fois
- ❌ Pas de scoring des hooks (Hook Rate potentiel estimé)
- ❌ Les hooks ne sont pas liés à des sub-avatars spécifiques (juste des angles larges)
- ❌ Pas de mapping awareness level → type de hook recommandé

**Fix recommandé** :
- Enrichir le prompt hook-writer avec des verbatims réels DE extraits de la research
- Forcer le Rule of One dans le prompt : "1 avatar, 1 désir, 1 hook"
- Ajouter le awareness level dans le brief

---

### 4. 🎬 Script Writer (`script-writer`)

**Mission actuelle** :
> "Écrire 3 scripts UGC de 45s en allemand pour les avatars A1/A2/A3 sur l'angle Schlaf"

**Ce qui fonctionne** :
- ✅ Génère des scripts en allemand
- ✅ Mention du format "phone-recorded, authentique"

**Ce qui manque vs EVOLVE (M6)** :
- ❌ Pas de structure systematique Hook → Problem Agitation → Bridge → Mechanism → Proof → CTA
- ❌ Le script ne commence pas toujours par un hook de type EVOLVE (<3s, pattern interrupt)
- ❌ Les scripts ne s'appuient pas sur des verbatims réels extraits de la research DE
- ❌ Pas de "open loop" ou storytelling systématique
- ❌ Les scripts sont générés sans Awareness Level précis → peuvent mal matcher le marché DE

**Fix recommandé** :
```javascript
// System prompt amélioré pour script-writer
`SCRIPT FRAMEWORK OBLIGATOIRE :
1. HOOK (0-3s) : <8 mots, pattern interrupt, parmi ces types : question/stat/story/proclamation/reframe
2. PROBLEM AGITATION (3-8s) : Amplifier la douleur avec le verbatim exact du marché DE
3. BRIDGE (8-12s) : "Bis ich entdeckt habe..." ou "Dann hab ich..."
4. MECHANISM (12-20s) : KSM-66 → mécanisme biologique → chiffre précis
5. PROOF (20-30s) : Chiffre étude ou nombre d'utilisateurs
6. CTA (30-45s) : Simple, direct, risque-zéro

RÈGLE : Le script doit sonner parlé, PAS écrit. Utilisez contractions, hésitations légères.
CONTRAINTE : Maximum 1 désir par script (Rule of One).`
```

---

### 5. 📊 Campaign Builder (`campaign-builder`)

**Mission actuelle** :
> "Rédiger le setup complet d'une campagne Meta ABO pour le test Marksman Nellio DE"

**Ce qui manque vs EVOLVE (M8)** :
- ❌ L'agent génère du TEXTE mais n'est pas connecté à Meta Ads API → pas d'action réelle
- ❌ La structure est ABO dans le prompt mais EVOLVE recommande CBO
- ❌ Pas de Media Buying Template 2025 implémenté (5 campaign types)
- ❌ Pas de Column Setup recommandé pour Meta
- ❌ Pas de 3-2-2-2 (avec landing page test) dans le prompt
- ❌ La Raw Content Campaign n'est pas dans le scope

**Ce qu'il devrait générer** :
- Campaign structure complète avec CBO
- Ad set names standardisés (Batch_01, Champions, Page_Test_LP1)
- Audience setup précis pour Allemagne
- Budget allocation et règles de scaling

---

### 6. ⚡ Performance Monitor + Learning Analyst (`perf-monitor` + `learning-analyst`)

**Mission actuelle** :
> "Créer le template d'analyse performance 72h" / "Template de rapport post-test 72h EVOLVE"

**Ce qui manque vs EVOLVE (M9)** :
- ❌ Ces agents génèrent des templates mais ne reçoivent **pas les vraies données Meta** → no actual analysis
- ❌ Pas de Hook Rate / Hold Rate trackés dans OMNIA
- ❌ Pas de spreadsheet Learnings persistant dans le système
- ❌ Pas de méthode "Rewrite Loser Into Winner" implémentée
- ❌ Pas d'archive winner/loser avec leurs attributs (avatar, angle, hook type, résultats)

**Fix critique** :
```javascript
// Endpoint à créer : POST /api/learnings/add
// Input : ad_id, spend, ctr, hook_rate, hold_rate, cpa, roas, verdict (winner/loser), analysis, next_actions
// Storage : data/learnings.json
// Output : insights consolidés par angle, par avatar, par hook type
```

---

### 7. 🔄 Iteration Creator (`iteration-creator`)

**Mission actuelle** :
> "Proposer 5 variantes d'itération pour le hook cortisol A3-c winner"

**Ce qui manque vs EVOLVE (M14)** :
- ❌ L'agent génère des idées d'itération dans le vide (sans data réelle d'un ad qui a performé)
- ❌ La sequence d'itération EVOLVE (image → headline → benefits → persona) n'est pas respectée
- ❌ Les itérations ne sont pas liées à une hypothèse documentée
- ❌ Pas de tracking pour savoir quelles itérations ont été testées et avec quels résultats

**Fix recommandé** :
- Connecter l'iteration-creator aux vraies données learnings
- Forcer la sequence : d'abord image/visual test, puis headline, puis persona

---

### 8. 📈 Scale Strategist (`scale-strategist`)

**Mission actuelle** :
> "Définir un plan de scale 14 jours pour un winner Meta Nellio DE à ROAS 3.2 / €200/j initial"

**Ce qui manque vs EVOLVE (M9 + M11)** :
- ❌ Le plan de scale ne mentionne pas le Surf Scaling Protocol (check toutes les 2-4h)
- ❌ Pas de reset budget à minuit
- ❌ Pas de Blended ROAS comme métrique principale
- ❌ Pas de Promo Campaign Protocol intégré
- ❌ La règle "+20% / doubler" de EVOLVE n'est pas dans le prompt

---

### 9. 🤖 Agents Manquants (Non implémentés dans OMNIA)

#### A. Research Doc Generator (NOUVEAU — CRITIQUE)
**Ce qu'il doit faire** :
- Lire des reviews/forums en input
- Extraire : Verbatim | Catégorie (Desire/Problem/Objection/Solution Tried) | Hook Potential 1-5
- Produire un Research Doc structuré Google Sheets-compatible

#### B. Ad Library Spy (NOUVEAU — IMPORTANT)
**Ce qu'il doit faire** :
- Analyser Facebook Ad Library DE (via Brave search ou API)
- Extraire : Marque | Format | Hook | Durée active | Angle estimé
- Identifier les angles saturés vs les blancs

#### C. Creative Roadmap Builder (NOUVEAU — IMPORTANT)
**Ce qu'il doit faire** :
- Prendre en input : Research insights + Avatars prioritaires + Angles retenus
- Produire un Creative Roadmap 12 ads (3 angles × 4 créatifs)
- Colonnes : Ad ID | Sub-Avatar | Angle | Hook | Format | Body Copy | CTA | Hypothèse | Status

#### D. Landing Page Analyst (NOUVEAU — IMPORTANT)
**Ce qu'il doit faire** :
- Analyser la landing page drinknellio.com
- CTR bon mais CPA mauvais = problème LP → identifier les frictions
- Recommander des améliorations basées sur les avatars (CRO)

#### E. Surf Scaling Manager (NOUVEAU — UTILE)
**Ce qu'il doit faire** :
- Recevoir les KPIs Shopify + Meta toutes les 2-4h
- Calculer le Blended ROAS
- Recommander l'action budget (maintenir / +20% / doubler / réduire)

---

## TABLEAU DE SYNTHÈSE DES GAPS

| Domaine EVOLVE | Couvert dans OMNIA ? | Niveau | Action Requise |
|----------------|---------------------|--------|----------------|
| Psychology (M2) | ❌ Aucun agent | CRITIQUE | Intégrer awareness/sophistication dans les prompts existants |
| Research VoC (M3) | ❌ Aucun pipeline réel | CRITIQUE | Créer Research Doc Generator |
| Research Competitors (M3) | ❌ Aucune intégration Ad Library | IMPORTANT | Créer Ad Library Spy |
| Core Avatars (M4) | ✅ Partiel (4 avatars) | OK | Enrichir |
| Sub-Avatars (M4) | ⚠️ Mission existe mais non stocké | IMPORTANT | Créer endpoint + storage |
| Angle Planning (M5) | ❌ Aucun Creative Roadmap | IMPORTANT | Créer Creative Roadmap Builder |
| 3-2-2 Planning (M5) | ⚠️ Mentionné mais non structuré | IMPORTANT | Formaliser dans campaign-builder |
| Scripts DE (M6) | ✅ Partiellement | OK | Améliorer framework Hook→CTA |
| Hooks DE (M6) | ✅ 30 hooks + variations | BON | Enrichir avec verbatims réels |
| Static ads (M6) | ❌ Conceptuel seulement | UTILE | Lier à Creative OS templates |
| UGC pipeline (M7) | ✅ Brief creator + UGC coord | BON | Ajouter "match creator to avatar" |
| Raw content campaign (M7) | ❌ Absent | UTILE | Ajouter dans campaign-builder |
| Meta setup (M8) | ⚠️ Textuel uniquement, ABO | IMPORTANT | Passer à CBO, Media Buying Template 2025 |
| Hook Rate/Hold Rate (M8) | ❌ Absent | IMPORTANT | Ajouter dans perf-monitor |
| Learnings tracking (M9) | ⚠️ Template seulement | CRITIQUE | Créer learnings storage + feedback loop |
| Iteration sequence (M14) | ❌ Absent | IMPORTANT | Formaliser image→headline→persona |
| Whitelisting (M10) | ❌ Absent | UTILE | Ajouter workflow partnership ads |
| Promo campaign (M11) | ❌ Absent | IMPORTANT | Ajouter promo setup + surf scaling |
| Scale Protocol (M9) | ⚠️ Partiel | IMPORTANT | +20%/doubler + Blended ROAS |
| Product Research (M13) | N/A (Nellio déjà choisi) | N/A | — |
| Feedback loop complet | ❌ Absent | CRITIQUE | Architecture end-to-end |

---

## PRIORITÉS D'ACTION

### P0 — Critiques (bloquent le business maintenant)

1. **Research Doc Generator** : Sans verbatims réels DE, tous les outputs sont hypothétiques
2. **Learnings Storage + Feedback Loop** : Sans tracker winner/loser avec attributs, on ne progresse pas
3. **Script Framework Hook→CTA** : Améliorer le prompt script-writer pour respecter le framework EVOLVE

### P1 — Importants (impact ROAS direct)

4. **Sub-Avatar Storage** : Stocker les 15-30 sub-avatars dans `data/sub_avatars.json`
5. **Creative Roadmap Builder** : Planifier avant d'exécuter (12 ads batch structuré)
6. **Campaign Builder CBO** : Passer de ABO à CBO dans les recommendations
7. **Hook Rate / Hold Rate** : Ajouter dans le template de performance
8. **Promo Campaign Protocol** : Surf scaling pour Black Friday, Muttertag

### P2 — Utiles (valeur claire, différable)

9. **Ad Library Spy** : Identifier les angles saturés vs blancs dans le marché DE
10. **Landing Page Analyst** : CRO basé sur les avatars EVOLVE
11. **Whitelisting Workflow** : Partnership ads avec micro-créatrices DE
12. **Surf Scaling Manager** : Automatiser les décisions de budget toutes les 2-4h

---

## VÉRIFICATION NODE --CHECK

```bash
node --check /Users/pc2/.openclaw/workspace/omnia/server.js
# À exécuter avant toute modification du server.js
```

---

*Produit par Clawdbot Prime ⚡ | 2026-02-25*
*Basé sur lecture intégrale EVOLVE + analyse OMNIA server.js (3186 lignes)*
