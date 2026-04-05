# Formation : The Anti-Slop AI UGC System
> Intégré le 2026-02-24 | Clawdbot Prime ⚡
> Source : MEGA `https://mega.nz/folder/pBNDCarA#PQLaeNmUVUojoOpcBY_RIw`
> Outil principal : kie.ai (API Key : `788b72e5007d63c06539d84fb5ddfa54`)

---

## 🎯 Concept Central

**UGC IA = $1-10/vidéo en 10 minutes vs $100-500/vidéo en 1 semaine.**
Pas de remplacement de la stratégie — exécution de la stratégie 50× plus vite.
Le marché est à <5% d'adoption. Fenêtre = Facebook Ads 2014-2016.

---

## 📌 Les 7 Erreurs Qui Crient "IA" (à éviter absolument)

1. Yeux morts, visage figé
2. Produit flottant (pas tenu naturellement)
3. Éclairage parfait (trop propre)
4. Fond vide
5. Mains robotiques
6. Voix "annonceur"
7. Caméra professionnelle

---

## ⚡ Le Pipeline Complet (5 étapes)

### ÉTAPE 1 — Sources de référence
- **KALO DATA** → tri par ad spend → UGC format → winners concurrents
- **Meta Ad Library** → vidéos actives >30 jours = winners prouvés
- **TikTok** → UGC organique à fort engagement
- **Tes propres winners** → dupliquer ce qui a déjà converti

**Green Flags d'une bonne référence :**
✅ Visage clair dès la première image | ✅ Éclairage "vie réelle" naturel
✅ iPhone quality (pas pro) | ✅ Fond simple et habité | ✅ Contact visuel direct
✅ Produit manipulé naturellement | ✅ Ton conversationnel | ✅ Une seule idée

### ÉTAPE 2 — Deconstruction Gemini Gem
- Créer un "Gem" custom dans Gemini avec le master-prompt UGC DECONSTRUCTOR
- Uploader la vidéo référence → Gemini extrait :
  - Script complet transcrit
  - Breakdown caméra, lumière, performance
  - Prompt Sora ready-to-use
- Commande : *"analyze this video in depth and make it into a sora 2 prompt using all the knowledge you have"*

### ÉTAPE 3 — Raffinement Claude Project
- Créer un "Project" Claude avec le master-prompt SORA PROMPT OPTIMIZER
- Coller le prompt Gemini + commande :
  *"Refine this Sora prompt. Follow your instructions perfectly. Adhere to the uploaded knowledge base. Make it flawless."*
- Résultat : prompt 99.9% précis

**Logique de stacking :**
- Gemini = créatif, voit le big picture, déconstruit les vidéos
- Claude = soldat, précision technique, suit les règles
- ChatGPT = à éviter (paresseux sur les détails)

### ÉTAPE 4 — Génération Vidéo
- **Higgsfield** — qualité élevée
- **kie.ai** — 60% moins cher qu'OpenAI (recommandé)
  - API Key : `788b72e5007d63c06539d84fb5ddfa54`
  - 57 modèles : Veo 3.1, Runway Aleph, Kling 3.0, ElevenLabs V3...
  - Limite actuelle : 15s max par clip
- ⚠️ **NE PAS utiliser Freepik** → limite de caractères dans les prompts = résultats mediocres

### ÉTAPE 5 — Bibliothèque de Prompts
Nommage : `Character-Setting-Type-Prompt.txt`
Ex : `FrauMueller-Kueche-Testimonial-Prompt.txt`
Après 20 déconstructions = arsenal réutilisable pour toutes les campagnes

---

## 🏗️ Anatomie d'un Prompt UGC Parfait

```
[CAMERA SETUP]
casual, selfie-style IPHONE 15 PRO front-camera vertical video (9:16)
Filename: "IMG_XXXX.MOV"

[CHARACTER]
→ AVANT : Description physique détaillée (âge, cheveux, yeux, vêtements, ton)
→ APRÈS création Sora : Remplacé par @username.sora.character (consistance garantie)

[PRODUCT DESCRIPTION]
Produit tenu naturellement à hauteur poitrine, pouce sur le label.
Description pixel-perfect générée via ChatGPT depuis image produit.

[CINEMATOGRAPHY]
Camera Shot: Medium close-up | Légèrement high angle
Lens: iPhone 15 Pro (~24mm) | No depth of field
Motion: Très léger sway naturel | Pas de jitter
Lighting: Lumière naturelle douce fenêtre
Color: HDR auto-tone | Palette chaude naturelle | Pas de filtre
Resolution: 1080x1920, 30fps, vertical

[ACTIONS - timestamped]
- 0s: [geste + ligne de dialogue]
- 2s: [action physique]
- 4s: [autre geste]
...

[AUDIO & AMBIENCE]
iPhone mic audio: voix claire + écho léger maison
Sons ambiants naturels (oiseaux, cuisine...)
No music | No cuts | One continuous take

[UGC AUTHENTICITY KEYWORDS]
smartphone selfie, handheld realism, home/bedroom/kitchen,
bright natural light, influencer-style monologue, direct-to-camera,
authentic recommendation, conversational delivery,
raw unfiltered TikTok aesthetic, real voice, authentic performance,
micro hand jitters, single continuous take, unedited

[UNIVERSAL QUALITY CONTROL NEGATIVES]
subtitles, captions, watermark, text overlays, words on screen, logo,
poor lighting, blurry footage, low resolution, artifacts,
inconsistent character appearance, audio sync issues, amateur quality,
cartoon effects, unrealistic proportions, distorted hands,
artificial lighting, oversaturation, compression noise, camera shake
```

---

## 🎬 Consistance des Personnages (Point Clé)

**Avant (mauvais)** : chaque vidéo = nouveau visage → impossible de construire une "creator brand"

**Après (système SORA)** :
1. Générer un personnage avec Sora → il reçoit un @username
2. Utiliser ce @username dans tous les prompts suivants
3. Résultat : même "créateur IA" sur 50 vidéos → familiarité, confiance, brand ambassador virtuel

**Vrais vs IA (test 100 personnes, 20 vidéos) :**
- 47% ont identifié des vidéos IA comme RÉELLES
- Les 3 "les plus authentiques" : 2 étaient de l'IA

---

## 💡 Application pour drinknellio.com

### Personnages à créer (selon avatars Nellio)
| Avatar | Profil Sora | Décor |
|--------|------------|-------|
| SA-02 Insomnaque | Femme/Homme 38-44, fatiguée, naturelle | Chambre nuit, lit défait |
| SA-01 Mère | Femme 33-38, casual, cuisine | Table cuisine matin |
| SA-04 Manager | Homme 38-46, costume décontracté | Bureau ou salon soir |
| SA-09 Papa | Homme 40-46, détendu | Salon après travail |

### Workflow Nellio Studio → kie.ai
```
Script DE (déjà écrit Phase 3)
→ Prompt Nellio Claude Optimizer (à créer)
→ kie.ai API (788b72e5...)
→ Vidéo UGC 9:16 15s
→ Meta Ads DE
```

### Coût estimé Marksman Batch #1 (3 créatives)
- Ancienne méthode : 3 × €300 = €900 + 3 semaines
- kie.ai méthode : 3 × ~€5 = **€15 + quelques heures**

---

## 🔧 Outils Identifiés

| Outil | Usage | Coût |
|-------|-------|------|
| **kie.ai** | Génération vidéo principale | $1-10/vidéo |
| **Higgsfield** | Alternative premium | Plus cher |
| **Gemini Gem** | Deconstruction + prompt initial | Inclus Google AI |
| **Claude Project** | Raffinement prompt | Inclus Claude |
| **ChatGPT 4o** | Description produit depuis image | Usage ponctuel |
| **KALO DATA** | Spy tool ad spend | Payant |
| **Meta Ad Library** | Références concurrents | Gratuit |
| **Sora** | Personnages consistants (@username) | OpenAI |

---

## 🚀 Intégration OMNIA/Nellio Studio

**Module "AI UGC Generator" à ajouter dans OMNIA :**

```
INPUT
→ Script DE (sélectionner depuis scripts_batch_marksman.md)
→ Avatar (dropdown: SA-02/SA-01/SA-04/SA-09)
→ Image produit Nellio

PIPELINE
→ Claude : génère prompt Sora-optimized (CHARACTER + PRODUCT + ACTIONS)
→ kie.ai API : génère vidéo 9:16 15s
→ Preview dans l'interface
→ Export MP4 + métadonnées Meta Ads

OUTPUT
→ Vidéo UGC prête pour upload Meta Ads
→ Coût : ~$5/vidéo | Délai : 10-15 min
```

**Priorité dans la roadmap OMNIA :** Module 2 (après le script generator déjà opérationnel)

---

## 📊 Mindset Clés (Applicables Immédiatement)

1. **Volume > Perfection** — à $5/vidéo, tester 20 variations > polir 1
2. **Références d'abord** — toujours partir de winners prouvés, pas d'idées ego
3. **Spécificité du prompt** = qualité de l'output (12 mots vagues → slop / 200 mots précis → winner)
4. **Consistance personnages** = brand ambassador virtuel (pas juste des vidéos one-shot)
5. **Gemini→Claude pipeline** = stacker les LLMs selon leurs forces respectives

---

*Résumé généré par Clawdbot Prime ⚡ | 2026-02-24*
*Fichiers source : `/formations/ugc-ai-system/*.docx`*
