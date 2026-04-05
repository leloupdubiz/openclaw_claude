Tu travailles sur OMNIA Creative OS, une plateforme de génération vidéo UGC AI.
Stack : Express.js (server.js, port 3002) + vanilla HTML/JS (public/index.html).

OBJECTIF : Construire un système de vidéos multi-scènes avec avatar cohérent pour contourner la limite 15s de Sora 2.

FICHIER DE PROGRESS : /Users/pc2/.openclaw/workspace/checkpoints/sprint2-progress.md
→ Mettre à jour ce fichier à chaque module terminé.

════════════════════════════════════════
MODULE 1 — AVATAR SEED SYSTEM
════════════════════════════════════════

Dans server.js, ajouter les endpoints suivants :

1. POST /api/avatars/save-profile
   Body : { avatarId, avatarName, basePrompt, visualParams, voiceId, taskId, thumbnailUrl }
   Action : Créer le dossier ./avatars/[avatarId]/ et sauvegarder avatar-profile.json avec :
   {
     "avatarId": "...",
     "avatarName": "...",
     "basePrompt": "...",
     "visualParams": {
       "seed": null,
       "referenceFrameUrl": null,
       "consistencyPrompt": "..."
     },
     "voiceId": "...",
     "createdAt": "...",
     "lastTaskId": "...",
     "thumbnailUrl": "..."
   }

2. GET /api/avatars/list
   Retourne la liste de tous les avatars sauvegardés depuis ./avatars/

3. GET /api/avatars/:avatarId
   Retourne le profil complet d'un avatar

4. POST /api/avatars/extract-reference-frame
   Body : { taskId, avatarId }
   Action :
   - Télécharger la vidéo kie.ai via son URL résultat (utiliser https.get ou fetch)
   - Extraire le frame à 0.5s avec ffmpeg (/opt/homebrew/bin/ffmpeg)
     Commande : ffmpeg -i input.mp4 -ss 0.5 -vframes 1 reference_frame.jpg
   - Sauvegarder comme ./avatars/[avatarId]/reference_frame.jpg
   - Mettre à jour avatar-profile.json avec visualParams.referenceFrameUrl
   - Retourner { success: true, frameUrl: "/avatars/[avatarId]/reference_frame.jpg" }

5. Servir les fichiers statiques : app.use('/avatars', express.static(path.join(__dirname, 'avatars')))

Créer le dossier avatars/ à la racine du projet.

Tester Module 1 : curl -s http://localhost:3002/api/avatars/list

════════════════════════════════════════
MODULE 2 — MULTI-SCENE VIDEO BUILDER
════════════════════════════════════════

Dans server.js, ajouter :

1. POST /api/multiscene/generate
   Body : {
     avatarId,
     template,
     scenes: [ { sceneType, scriptDE, visualPrompt, duration: 15 } ]
   }

   Pipeline :
   a) Pour chaque scène dans l'ordre :
      - Charger avatar-profile.json pour [avatarId] depuis ./avatars/[avatarId]/
      - Fonction consistencyAnchor(avatarProfile) :
        * Si referenceFrameUrl existe : ajouter dans le prompt
          "maintaining exact same person appearance as established, same face features, hair, skin tone, clothing style"
        * Sinon : utiliser basePrompt comme référence
      - Construire finalPrompt = scene.visualPrompt + " " + consistencyAnchor(profile)
      - Appeler POST https://api.kie.ai/api/v1/jobs/createTask
        Headers : { "x-api-key": "788b72e5007d63c06539d84fb5ddfa54", "Content-Type": "application/json" }
        Body : { model: "sora-2", input: { prompt: finalPrompt, duration: 15, resolution: "1080x1920" } }
      - Poll GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId={taskId} toutes les 10s, max 5 min
        Résultat dans : JSON.parse(data.resultJson).resultUrls[0]
      - Télécharger la vidéo → ./public/downloads/scene_[multisceneId]_[sceneIndex].mp4
      - Après scène 1 : si pas de referenceFrameUrl → appeler extract-reference-frame automatiquement

   b) Assemblage FFmpeg après toutes les scènes :
      - Créer /tmp/concat_[id].txt avec le contenu :
        file '/path/to/scene_X_0.mp4'
        file '/path/to/scene_X_1.mp4'
        ... etc
      - Commande concat : /opt/homebrew/bin/ffmpeg -f concat -safe 0 -i /tmp/concat_[id].txt -c copy ./public/downloads/multiscene_[id]_final.mp4
      - Sauvegarder dans videos.json avec type: "multiscene", sceneCount: N, avatarId
      - Retourner { success: true, videoId, finalUrl: "/downloads/multiscene_[id]_final.mp4" }

2. Ajouter un job store en mémoire pour suivre l'état :
   multisceneJobs = {} avec { jobId, status, currentScene, totalScenes, scenes: [], finalUrl }

3. GET /api/multiscene/status/:jobId
   Retourne l'état en temps réel

Dans public/index.html, ajouter une section "🎬 Multi-Scene Builder" :
- Insérer APRES la section Video Generator (chercher la div qui contient le bouton "Générer la vidéo")
- AVANT la section Video Library
- ID de section : #multiSceneSection
- UI en FRANÇAIS :
  * Titre : "🎬 Créateur Multi-Scènes"
  * Dropdown "Avatar" → options chargées depuis GET /api/avatars/list au chargement
  * 4 radio buttons : "30s (2 scènes)" / "60s (4 scènes)" / "90s (6 scènes)" / "Personnalisé"
  * Zone de scènes : générée dynamiquement selon la sélection
    - Pour chaque scène, une card avec :
      * Select type : Hook / Problème / Solution / Témoignage / CTA / B-Roll
      * Textarea "Script DE" (placeholder en allemand)
      * Textarea "Prompt visuel" (placeholder en anglais)
      * Bouton "Générer script DE" → appelle /api/generate-scene-script
  * Bouton primary "🎬 Générer la vidéo complète" → appelle /api/multiscene/generate
  * Div #multiSceneProgress : barre de progression + statut texte (masquée par défaut)
    Afficher : "Génération scène 2/4..." avec barre CSS animée
  * JS : polling /api/multiscene/status/:jobId toutes les 5s pendant génération

Tester Module 2 : curl -s http://localhost:3002/api/multiscene/status/test

════════════════════════════════════════
MODULE 3 — SCENE TEMPLATE LIBRARY
════════════════════════════════════════

Dans server.js, ajouter GET /api/scene-templates :

Retourner un objet JSON avec 4 templates :
- "ugc-classic" : Hook(15s) + Problem(15s) + Solution(15s) + CTA(15s)
- "testimonial" : Hook(15s) + Story(15s) + Result(15s) + Social Proof(15s)
- "demo" : Hook(15s) + B-Roll(15s) + Before/After(15s) + Offer(15s)
- "vsl-court" : Problem(15s) + Agitation(15s) + Mechanism(15s) + CTA(15s)

Chaque scène a un scriptHint en allemand adapté à Nellio UltraCalm.

Ajouter POST /api/generate-scene-script :
Body : { sceneType, scriptHint, avatarId }
Appeler Claude API (utiliser la fonction callClaude existante dans server.js) avec prompt :
"Tu es un expert copywriter Meta Ads pour le marché allemand DTC.
Génère un script UGC parlé de 15 secondes pour Nellio UltraCalm (poudre anti-stress, KSM-66 Ashwagandha 300mg + L-Theanin 400mg).
Type de scène : [sceneType]
Direction : [scriptHint]
Contraintes ABSOLUES :
- Allemand naturel et parlé (comme si quelqu'un parlait à son téléphone)
- Hook dès la première phrase
- Jamais de claims médicaux (pas heilt/behandelt/kuriert)
- Maximum 50 mots
Retourner le script brut uniquement, sans explication."

Dans index.html, dans la section Multi-Scene Builder :
- Ajouter un bouton "📋 Charger un template" au-dessus des cards de scènes
- Au clic : afficher un modal ou un menu déroulant avec les 4 templates
- Au clic sur un template : charger automatiquement les scènes (appeler /api/scene-templates, pré-remplir les selects de type)
- Après chargement template : bouton "Générer tous les scripts DE" → appeler /api/generate-scene-script pour chaque scène en séquence

Tester Module 3 : curl -s http://localhost:3002/api/scene-templates | python3 -m json.tool | head -30

════════════════════════════════════════
MODULE 4 — BATCH MULTI-SCENE
════════════════════════════════════════

Dans server.js, ajouter POST /api/batch/multiscene :
Body : {
  concepts: [
    {
      conceptId: "concept_1",
      avatarId: "sa-01",
      template: "ugc-classic",
      scenes: [ ... ]
    }
  ]
}

Logic de file d'attente séquentielle :
- Traiter les concepts UN PAR UN (pas en parallèle)
- Avant chaque génération de scène, vérifier l'espace disque :
  const { execSync } = require('child_process');
  const availKB = parseInt(execSync("df / | tail -1 | awk '{print $4}'").toString().trim());
  if (availKB < 3145728) { // < 3GB
    // Mettre en pause, log "Espace insuffisant - en attente"
    // Réessayer toutes les 60s
  }
- Émettre des events SSE progressifs via res.write() pour suivi temps réel
- Après completion de chaque concept : log dans console
- Retourner { success: true, jobId, conceptsQueued: N }

Dans index.html, dans la section Batch Generator existante (celle avec les avatars 3-2-2) :
- Ajouter en bas de la section un toggle checkbox "Mode Multi-Scènes (4 scènes × 15s)"
- Quand coché : afficher un nouveau champ "Template de scènes" avec les 4 options
- Quand décoché : comportement inchangé (mode actuel)

Tester Module 4 : curl -s -X POST http://localhost:3002/api/batch/multiscene -H "Content-Type: application/json" -d '{"concepts":[]}' 

════════════════════════════════════════
CONTRAINTES ABSOLUES
════════════════════════════════════════

1. NE JAMAIS CASSER les endpoints existants dans server.js
2. NE JAMAIS modifier la Video Library existante (section #videoLibrary dans index.html)
3. NE JAMAIS modifier le Batch Generator existant — seulement AJOUTER le toggle
4. Tous les nouveaux textes UI en FRANÇAIS
5. Tous les scripts générés en ALLEMAND
6. ffmpeg path = /opt/homebrew/bin/ffmpeg
7. Créer ./avatars/ à la racine du projet avec mkdir -p
8. Après chaque modification server.js : redémarrer le serveur
   pkill -f "node server.js" 2>/dev/null; sleep 2; node server.js &
   Attendre 3s puis tester avec curl

════════════════════════════════════════
ORDRE D'EXÉCUTION STRICT
════════════════════════════════════════

1. Lire server.js en entier pour comprendre la structure existante
2. Lire les 200 premières lignes de public/index.html pour comprendre la structure
3. Construire Module 1 → tester → mettre à jour sprint2-progress.md
4. Construire Module 2 → tester → mettre à jour sprint2-progress.md
5. Construire Module 3 → tester → mettre à jour sprint2-progress.md
6. Construire Module 4 → tester → mettre à jour sprint2-progress.md

Quand tout est terminé, exécuter :
openclaw system event --text "Sprint 2 terminé : Avatar Seed + Multi-Scene Builder + Templates + Batch Multi-Scene opérationnels dans OMNIA" --mode now
