# OpenClaw Content Machine — 1 Podcast = 6 Contenus, Tout Automatisé (7 Agents)
> Source: @floriandarroman (Host @ProfitFounder — openclawlab.xyz · 28.5K followers) — X Article | 27 Feb 2026
> URL: https://x.com/floriandarroman/status/2027276000355336675
> Stats: 12.2K vues · 425 bookmarks · 161 likes
> Communauté: openclawlab.xyz (245 founders)
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**Un épisode de podcast enregistré → 6 pièces de contenu → Tout automatisé.** Le seul travail humain : s'asseoir, enregistrer, appuyer sur stop.

7 agents nommés orchestrés par OpenClaw + crons. Pipeline fonctionne pendant que l'auteur dort à Bali.

---

## 📋 Les 7 Étapes + Agents

### Step 0 — Trouver des Guests (Agent : Mona Lisa)
```
Mona Lisa (guest research agent) :
→ Crawl X, Reddit, Hacker News, Product Hunt
→ Filtre : funding rounds, product launches, revenue milestones récents
→ Draft DMs personnalisés (pas de templates, pas de bulk)
→ Chaque message référence quelque chose de spécifique sur le guest

Résultat : le matin → outreach prête → chef review et envoie
```

### Step 1 — Enregistrement (L'humain)
```
"C'est la SEULE chose que je fais."
→ Conversation avec le founder
→ Appuyer sur Stop
→ C'est tout.
```

### Step 2 — Détection + Transcription (Agent : Jimmy)
```
Jimmy (YouTube agent) surveille le RSS feed (1AM, mardi et vendredi)
→ Nouvelle épisode détectée → télécharge l'audio
→ OpenAI Whisper → transcription mot-par-mot avec timestamps
```

### Step 3 — Sélection Clips + Copywriting (Agent : Claude)
```
Claude (copy editor) scanne le transcript complet à 2AM
→ Identifie les 3 meilleurs moments "clip-worthy"
   (pas des quotes aléatoires — moments avec hook, tension, ou insight scroll-stopper)

Pour chaque moment :
→ Rédige un post X dans la voix de l'auteur
→ Fact-check chaque claim contre le transcript
→ Score chaque post sur une rubrique copywriting 1-10
→ Anything < 8 → réécrit

→ Génère aussi "Subtitle Notes" : noms propres, marques, termes techniques
   (pour que "ProtonMail" ne devienne pas "Proton emails" dans les sous-titres)

→ Tout push dans Notion avec timestamps exacts
```

### Step 4 — Video Editing (Agent : Adrien + Bob)
```
Adrien (video editor) prend les timestamps de Claude à 3:20AM
→ Extrait les clips du full episode via ffmpeg

Pipeline d'édition complète (bash script process_clip.sh + Python) :
→ Whisper transcription word-level pour timing
→ Smart cuts : supprime "um", "uh", "you know", silences > 0.5s
→ Subtitle generation : max 4 mots/ligne, sentence boundaries respectées
→ Proper nouns vérifiés contre les notes de Claude
→ Subtitle burn-in : texte blanc propre, pas de background box
→ Final encode : h264, AAC, 16:9, < 140 secondes

Bob (QA agent) à 4AM :
→ Check sous-titres mot-par-mot contre Whisper output
→ Vérifie que le clip ne s'arrête pas en plein milieu
→ Confirme encodage h264
→ Score < 10/10 = renvoyé à Adrien
```

### Step 5 — Scheduling (Agent : Dan)
```
Dan (X growth agent) prend les clips approuvés à 5AM
→ Upload chaque vidéo sur Typefully via API 3-step
→ Crée le draft avec le post copy
→ Schedule :
   • 4PM Bali (matin Europe)
   • 9PM Bali (matin US East)
   • 4AM Bali (soir US)

→ 3 posts · 3 clips · chaque jour · pendant que l'auteur dort
```

### Step 6 — Newsletter (Agent : Tyler)
```
Tyler prend le même transcript → extrait top insights, frameworks, takeaways
→ Structure en draft newsletter

Claude review avant envoi : tone, accuracy, structure
→ Part sur Beehiiv (2000 readers)
```

### Step 7 — Analytics Feedback Loop (Agent : Loop)
```
Loop (analytics agent) scrape les données d'engagement quotidiennement :
→ Quels clips ont eu des impressions
→ Quels posts ont floppé
→ Quels topics ont résonné

→ Tout dans le HQ Dashboard
→ Quand l'auteur s'assied pour enregistrer → il sait déjà ce que l'audience veut
```

---

## 🔧 Stack Technique Complète

| Outil | Rôle |
|-------|------|
| **OpenClaw** | Orchestration des agents + crons |
| **Whisper (OpenAI)** | Transcription audio avec timestamps |
| **ffmpeg** | Extraction vidéo + encodage |
| **Python scripts** | Smart cuts + génération SRT |
| **Typefully API** | Scheduling X avec native video |
| **Notion API** | Base de données contenu + tracking |
| **Beehiiv** | Newsletter |

---

## 💡 Insights Actionnables

1. **"Content Machine" Nellio** : 1 script UGC enregistré → agent transcript → Claude sélectionne 3 clips + copy DE → agent édition (ffmpeg smart cuts) → schedule sur TikTok DE / Instagram DE / Meta Ads → analytics loop
2. **Agent Mona Lisa (guest research)** → adapter pour Nellio : crawl X/Reddit DE → fondateurs e-commerce DTC → DMs personnalisés pour partenariats influenceurs DE
3. **Score copywriting 1-10 avant publication** → ajouter ce pattern dans le Hook Writer EVOLVE : chaque hook scoré sur une rubrique → anything < 8 réécrit automatiquement
4. **Subtitle Notes (noms propres protégés)** → applicable aux scripts UGC DE : "Magnesiumglycinat" ne doit pas devenir "Magnesium" dans les sous-titres
5. **QA Agent score 10/10 ou retour** → pattern "zéro défaut avant publication" directement applicable au Creative Brief Validator OMNIA

---

## 🏪 Applications directes pour drinknellio.com

| Étape Pipeline | Adaptation Nellio | Stack |
|----------------|-------------------|-------|
| **Mona Lisa** | Crawl influenceurs DE (Ashwagandha/Wellbeing/Stress) → DM personnalisé | OpenClaw + web_search |
| **Jimmy** | Détecte nouveaux scripts UGC finalisés → télécharge → Whisper | OpenClaw cron |
| **Claude Editor** | Sélectionne 3 moments forts du script → copy DE → score > 8/10 | Claude Opus |
| **Adrien** | Extrait clips → smart cuts → sous-titres DE → encode < 60s | ffmpeg + Python |
| **Bob QA** | Score 10/10 : accuracy sous-titres DE (termes techniques : Ashwagandha, Cortisol) | Agent QA |
| **Dan** | Schedule sur TikTok DE + Instagram + Meta Ads → créneaux optimaux | Typefully / Meta API |
| **Loop** | Analytics ROAS / CTR / engagement → feedback pour Batch #2 | Meta Ads API |

**Estimation impact :** 1 tournage UGC (30 min) → 6-10 pièces de contenu DE automatisées → ROAS organique + paid ×3

---

## ⚡ Citations Clés

> "One podcast episode turns into 6 content pieces. All automated."

> "Step 1: Record the episode. This is the ONLY thing I do. I sit down, have a conversation, and hit stop."

> "Score below 8 gets rewritten. Score below 10/10 for video = sent back to Adrien."

> "3 posts. 3 clips. Every single day. I'm asleep for all of it."

> "When I sit down to record again, I already know what my audience wants more of."

---

## 🔗 Liens avec la bibliothèque

- **Reddit Closed Loops** (ce batch) : ce pipeline = implémentation parfaite des 5 composants (Trigger → Context → Action → Artifact → Guardrails)
- **@polash_ai TikTok Agent** (ce batch) : Research-to-Brief → complémentaire — Florian fait Brief-to-Distribution
- **BRIEFS_BATCH01.md** : les 3 scripts Nellio prêts → ce pipeline peut les transformer en 18+ contenus DE

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
