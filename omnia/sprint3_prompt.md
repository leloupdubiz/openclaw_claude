Tu travailles sur OMNIA Creative OS (Express.js port 3002, vanilla HTML/JS).

OBJECTIF : Refactoriser la page Multi-Scènes selon le nouveau paradigme — génération clip par clip avec sélection manuelle, sans assemblage FFmpeg automatique.

FICHIER DE PROGRESS : /Users/pc2/.openclaw/workspace/checkpoints/sprint3-progress.md
(Créer ce fichier au départ, mettre à jour à chaque étape terminée)

════════════════════════════════════════
PACKAGING NELLIO ULTRACALM — DESCRIPTION EXACTE
(À INJECTER DANS TOUS LES PROMPTS SORA 2)
════════════════════════════════════════

Le packaging est un STICK-PACK individuel (sachet tubulaire ~2.5cm × 15cm), PAS un canister.

Description pour les prompts Sora 2 :
"a single-serve powder stick packet, vertical format 2.5cm × 15cm, matte satin foil material,
top strip soft pastel pink, main body gradient from medium ocean blue (#2E6EB5) flowing through
a soft wave into pastel teal (#B5DED8), brand name 'nellio' in white lowercase rounded sans-serif
near top, below it 'ULTRA CALM' in large white bold uppercase on two lines, below that 'Calming
Drink Mix' in smaller white text, small oval pale yellow badge with 'RASPBERRY LEMONADE FLAVORED'
and tiny raspberry and lemon illustrations, four white circle icons listing KSM-66 Ashwagandha /
L-Theanine / Magnesium Glycinate / Vitamin D3"

Chemin image produit (à servir depuis Express) : /assets/brand/nellio_16.png
URL accessible : http://localhost:3002/assets/brand/nellio_16.png

════════════════════════════════════════
ÉTAPE 0 — LIS D'ABORD
════════════════════════════════════════

1. Lis server.js en entier (Read tool)
2. Lis public/index.html lignes 1-400
3. Lis public/index.html lignes 400-800
4. Lis public/index.html lignes 800-1200
5. Lis public/index.html lignes 1200-fin
6. Identifie :
   - La section Multi-Scènes existante (ID #page-multiscene ou #multiSceneSection)
   - La section Batch Generator
   - Les fonctions JS existantes pour le multi-scène
   - Les endpoints existants (multiscene/generate, avatars/*, scene-templates)

════════════════════════════════════════
TÂCHE 1 — BACKEND : SINGLE CLIP GENERATOR (3 variantes)
════════════════════════════════════════

Dans server.js, modifier/ajouter :

A) POST /api/clip/generate-variants
   Body : { avatarId, sceneType, scriptDE, visualPrompt, projectId }
   
   Action : Lancer 3 générations Sora 2 en PARALLÈLE (Promise.all) avec des prompts légèrement variés :
   
   const variants = [
     visualPrompt + " " + anchor,
     visualPrompt + " slightly different angle, " + anchor,
     visualPrompt + " closer framing, " + anchor
   ];
   
   Pour chaque variante :
   - POST https://api.kie.ai/api/v1/jobs/createTask
     Headers : { "Authorization": "Bearer " + KIE_API_KEY, "Content-Type": "application/json" }
     Body : { model: "sora-2-text-to-video", input: { prompt: variant, duration: 15, resolution: "1080x1920" } }
   
   Retourner immédiatement : { success: true, variantJobId, taskIds: [id1, id2, id3] }
   
   Stocker dans variantJobs[variantJobId] = { status: "generating", taskIds: [...], results: [], avatarId, sceneType, projectId }

B) GET /api/clip/variants-status/:variantJobId
   Pour chaque taskId dans variantJobs[variantJobId].taskIds :
   - Poll GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId={taskId}
     Headers : { "Authorization": "Bearer " + KIE_API_KEY }
   - Si success : extraire URL depuis JSON.parse(data.resultJson).resultUrls[0]
   - Télécharger → ./public/downloads/variant_[variantJobId]_[index].mp4
   - Convertir en WebM : /opt/homebrew/bin/ffmpeg -y -i input.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -pix_fmt yuv420p -vf scale=720:1280 -c:a libopus -b:a 128k output.webm
   
   Retourner : {
     status: "done|partial|pending",
     variants: [
       { index: 0, status: "done|pending|failed", webmUrl: "/downloads/...", mp4Url: "/downloads/..." },
       ...
     ]
   }

C) POST /api/clip/select
   Body : { variantJobId, selectedIndex, projectId, sceneType, label }
   Action :
   - Copier le mp4/webm sélectionné vers ./public/downloads/project_[projectId]_[sceneType]_selected.mp4 et .webm
   - Charger ./projects/[projectId]/project.json
   - Ajouter la scène sélectionnée dans project.clips[]
   - Sauvegarder
   - Retourner { success: true, clipUrl }

════════════════════════════════════════
TÂCHE 2 — BACKEND : SYSTÈME DE PROJETS
════════════════════════════════════════

Créer le dossier ./projects/ s'il n'existe pas.

A) POST /api/projects/create
   Body : { projectName, avatarId, concept }
   Action : Créer ./projects/[projectId]/project.json avec :
   {
     "projectId": "proj_" + Date.now(),
     "projectName": "...",
     "avatarId": "...",
     "concept": "...",
     "clips": [],
     "createdAt": "...",
     "updatedAt": "..."
   }
   Retourner { success: true, projectId }

B) GET /api/projects/list
   Lire tous les ./projects/[id]/project.json, retourner array

C) GET /api/projects/:projectId
   Retourner ./projects/[projectId]/project.json

D) GET /api/projects/:projectId/export-zip
   Créer un ZIP de tous les MP4 clips sélectionnés dans project.clips[]
   Utiliser le module 'archiver' (npm install archiver si pas présent)
   Nom du ZIP : [projectName]_clips_[date].zip
   Retourner le fichier en téléchargement direct

E) Ajouter dans package.json si 'archiver' pas déjà présent :
   npm install archiver --save (exécuter en shell)

F) Servir les projets statique : app.use('/projects', express.static(path.join(__dirname, 'projects')))

════════════════════════════════════════
TÂCHE 3 — BACKEND : VOICEOVER COMPLET
════════════════════════════════════════

Modifier POST /api/voiceover/generate (ou créer s'il n'existe pas) :
Body : { scriptDE, voiceId, projectId, stability, similarityBoost }

Action :
- Appeler ElevenLabs API (si clé disponible) ou retourner { error: "ElevenLabs API key not configured" }
- Paramètres voix : stability: body.stability || 0.85, similarity_boost: body.similarityBoost || 0.90
- Sauvegarder audio → ./public/downloads/voiceover_[projectId].mp3
- Mettre à jour project.json avec voiceoverUrl
- Retourner { success: true, audioUrl }

Vérifier si ELEVENLABS_API_KEY est dans les env vars. Sinon retourner un message clair.

════════════════════════════════════════
TÂCHE 4 — FRONTEND : REFONTE PAGE MULTI-SCÈNES
════════════════════════════════════════

Remplacer/refactoriser COMPLÈTEMENT la section Multi-Scènes dans index.html.
Chercher la section actuelle (ID #page-multiscene ou #multiSceneSection) et la REMPLACER.

NOUVELLE STRUCTURE DE LA PAGE (en français, dark theme cohérent avec OMNIA) :

```
┌──────────────────────────────────────────────┐
│  🎬 Studio Clip — Génération Scène par Scène │
├──────────────────────────────────────────────┤
│  [Sélectionner un projet ▼] [+ Nouveau projet]│
├──────────────────────────────────────────────┤
│  SECTION A : GENERATEUR DE CLIP              │
│  ┌────────────────────────────────────────┐  │
│  │ Avatar : [select ▼] (chargé /api/avatars/list)│
│  │ Type de scène : [Hook ▼]               │
│  │ Script DE : [textarea]                 │
│  │ Prompt visuel : [textarea pré-rempli]  │
│  │   [auto-injecte packaging Nellio]      │
│  │ [🎬 Générer 3 variantes — 40 crédits] │
│  └────────────────────────────────────────┘  │
│                                              │
│  SECTION B : COMPARAISON 3 VARIANTES        │
│  [Variante 1] [Variante 2] [Variante 3]     │
│  Chaque card : player 9:16 + [✅ Sélect.]   │
│                             + [🔄 Régénér.] │
│                                              │
│  SECTION C : PROJET EN COURS                │
│  Clips sélectionnés : [liste]               │
│  [🎵 Générer voiceover DE complet]          │
│  [📦 Exporter ZIP pour montage]             │
└──────────────────────────────────────────────┘
```

DÉTAILS HTML/JS :

SECTION PROJET :
```html
<div id="studioProjectBar" style="display:flex; gap:12px; align-items:center; margin-bottom:16px; padding:12px; background:rgba(255,255,255,0.05); border-radius:8px">
  <select id="studioProjectSelect" onchange="loadStudioProject()" style="flex:1">
    <option value="">-- Sélectionner un projet --</option>
  </select>
  <button onclick="showCreateProjectModal()" class="btn-secondary" style="white-space:nowrap">+ Nouveau projet</button>
</div>
```

SECTION GÉNÉRATEUR :
```html
<div class="clip-generator-panel">
  <div class="form-grid-2">
    <div class="form-group">
      <label>Avatar</label>
      <select id="clipAvatarSelect" onchange="updateConsistencyAnchor()"></select>
    </div>
    <div class="form-group">
      <label>Type de scène</label>
      <select id="clipSceneType" onchange="updateScriptHint()">
        <option value="Hook">🎣 Hook</option>
        <option value="Problem">😰 Problème</option>
        <option value="Solution">✨ Solution</option>
        <option value="CTA">📣 CTA</option>
        <option value="Testimonial">💬 Témoignage</option>
        <option value="B-Roll">🎥 B-Roll</option>
      </select>
    </div>
  </div>
  
  <div class="form-group">
    <label>Script DE <button onclick="generateClipScript()" class="btn-xs">Générer ✨</button></label>
    <textarea id="clipScript" rows="4" placeholder="Script en allemand (40-60 mots)..."></textarea>
  </div>
  
  <div class="form-group">
    <label>Prompt visuel Sora 2 <button onclick="injectPackagingPrompt()" class="btn-xs">+ Packaging</button></label>
    <textarea id="clipVisualPrompt" rows="5" placeholder="Description visuelle pour Sora 2..."></textarea>
    <small id="consistencyHint" style="color:#888; font-size:11px; margin-top:4px; display:block"></small>
  </div>
  
  <button onclick="generateClipVariants()" id="clipGenerateBtn" class="btn-primary btn-large">
    🎬 Générer 3 variantes <span style="opacity:0.7; font-size:12px">(40 crédits × 3 = 120 crédits)</span>
  </button>
</div>
```

SECTION VARIANTES (affichée après génération) :
```html
<div id="variantSection" style="display:none; margin-top:24px">
  <h3 style="margin-bottom:16px">Choisissez la meilleure variante</h3>
  <div id="variantCards" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px">
    <!-- 3 cards générées dynamiquement -->
  </div>
  <div id="variantPollStatus" style="text-align:center; padding:16px; display:none">
    <div class="spinner"></div>
    <p id="variantPollText">Génération en cours... (2-3 min par variante)</p>
  </div>
</div>
```

Template d'une card variante :
```html
<!-- Généré en JS pour chaque variante -->
<div class="variant-card" id="variant-card-{i}" style="background:rgba(255,255,255,0.05); border-radius:12px; overflow:hidden; border:2px solid transparent">
  <div style="position:relative; aspect-ratio:9/16; background:#111; overflow:hidden">
    <video id="variant-video-{i}" style="width:100%; height:100%; object-fit:cover" loop muted playsinline 
           onmouseenter="this.play()" onmouseleave="this.pause()">
    </video>
    <div id="variant-loading-{i}" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:#111">
      <div class="spinner-large"></div>
    </div>
  </div>
  <div style="padding:12px; display:flex; gap:8px">
    <button onclick="selectVariant({i})" class="btn-primary" style="flex:1">✅ Sélectionner</button>
    <button onclick="regenerateVariant({i})" class="btn-secondary">🔄</button>
  </div>
  <div style="padding:0 12px 12px; font-size:11px; color:#888">Variante {i+1}</div>
</div>
```

SECTION PROJET EN COURS :
```html
<div id="studioProjectPanel" style="display:none; margin-top:32px; padding:20px; background:rgba(255,255,255,0.03); border-radius:12px; border:1px solid rgba(255,255,255,0.1)">
  <h3 style="margin-bottom:16px">📁 Projet en cours : <span id="studioProjectName">--</span></h3>
  
  <div id="studioClipsList" style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px">
    <!-- Clips sélectionnés -->
  </div>
  
  <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:flex-start">
    <div style="flex:1; min-width:200px">
      <label style="font-size:12px; color:#888; display:block; margin-bottom:4px">Script complet pour voiceover</label>
      <textarea id="fullScriptDE" rows="6" placeholder="Script complet en allemand pour ElevenLabs..." style="width:100%"></textarea>
      <button onclick="generateProjectVoiceover()" class="btn-secondary" style="margin-top:8px; width:100%">
        🎵 Générer voiceover DE complet (ElevenLabs)
      </button>
    </div>
    <div style="display:flex; flex-direction:column; gap:8px">
      <button onclick="exportProjectZip()" class="btn-primary">
        📦 Exporter ZIP (MP4 clips)
      </button>
      <small style="color:#888; font-size:11px; text-align:center">Pour CapCut / Premiere</small>
    </div>
  </div>
</div>
```

FONCTIONS JS À AJOUTER (dans la section script) :

```javascript
// State
let currentVariantJobId = null;
let currentProjectId = null;
let variantPollInterval = null;

// Injecter la description packaging Nellio dans le prompt
function injectPackagingPrompt() {
  const packagingDesc = 'holding a single-serve powder stick packet blue-to-teal gradient matte satin foil "nellio" lowercase white rounded font "ULTRA CALM" bold white uppercase "Calming Drink Mix" raspberry lemon badge pale yellow "RASPBERRY LEMONADE FLAVORED"';
  const el = document.getElementById('clipVisualPrompt');
  if (el && !el.value.includes('nellio')) {
    el.value += (el.value ? ' ' : '') + packagingDesc;
  }
}

// Mettre à jour le hint de cohérence selon l'avatar sélectionné
async function updateConsistencyAnchor() {
  const avatarId = document.getElementById('clipAvatarSelect')?.value;
  const hint = document.getElementById('consistencyHint');
  if (!avatarId || !hint) return;
  try {
    const r = await fetch('/api/avatars/' + avatarId);
    const profile = await r.json();
    if (profile.visualParams?.referenceFrameUrl) {
      hint.textContent = '✅ Frame de référence disponible — cohérence visuelle active';
      hint.style.color = '#4ECDC4';
    } else {
      hint.textContent = '⚠️ Pas encore de frame de référence pour cet avatar';
      hint.style.color = '#FF9F43';
    }
  } catch {}
}

// Générer script DE pour la scène
async function generateClipScript() {
  const sceneType = document.getElementById('clipSceneType')?.value;
  const avatarId = document.getElementById('clipAvatarSelect')?.value;
  const r = await fetch('/api/generate-scene-script', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ sceneType, scriptHint: '', avatarId })
  });
  const d = await r.json();
  if (d.script) document.getElementById('clipScript').value = d.script;
}

// Lancer génération 3 variantes
async function generateClipVariants() {
  const avatarId = document.getElementById('clipAvatarSelect')?.value;
  const sceneType = document.getElementById('clipSceneType')?.value;
  const scriptDE = document.getElementById('clipScript')?.value;
  const visualPrompt = document.getElementById('clipVisualPrompt')?.value;
  
  if (!visualPrompt) { alert('Remplis le prompt visuel'); return; }
  
  document.getElementById('variantSection').style.display = 'block';
  document.getElementById('variantPollStatus').style.display = 'block';
  document.getElementById('variantCards').innerHTML = '';
  
  const r = await fetch('/api/clip/generate-variants', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ avatarId, sceneType, scriptDE, visualPrompt, projectId: currentProjectId })
  });
  const d = await r.json();
  if (!d.success) { alert('Erreur: ' + (d.error || 'inconnue')); return; }
  currentVariantJobId = d.variantJobId;
  
  // Créer les 3 cards de chargement
  document.getElementById('variantCards').innerHTML = [0,1,2].map(i => `
    <div class="variant-card" id="variant-card-${i}" style="background:rgba(255,255,255,0.05); border-radius:12px; overflow:hidden; border:2px solid transparent">
      <div style="position:relative; aspect-ratio:9/16; background:#111; display:flex; align-items:center; justify-content:center">
        <div class="spinner-large" id="variant-loading-${i}"></div>
        <video id="variant-video-${i}" style="width:100%; height:100%; object-fit:cover; display:none" loop muted playsinline
               onmouseenter="this.play()" onmouseleave="this.pause()"></video>
      </div>
      <div style="padding:12px; display:flex; gap:8px">
        <button onclick="selectVariant(${i})" class="btn-primary" style="flex:1; opacity:0.4" disabled id="variant-select-${i}">✅ Sélectionner</button>
        <button onclick="regenerateVariant(${i})" class="btn-secondary" id="variant-regen-${i}">🔄</button>
      </div>
      <div style="padding:0 12px 12px; font-size:11px; color:#888">Variante ${i+1}</div>
    </div>
  `).join('');
  
  document.getElementById('variantPollText').textContent = 'Génération en cours... (2-3 min)';
  startVariantPolling();
}

function startVariantPolling() {
  if (variantPollInterval) clearInterval(variantPollInterval);
  variantPollInterval = setInterval(async () => {
    const r = await fetch('/api/clip/variants-status/' + currentVariantJobId);
    const d = await r.json();
    
    let allDone = true;
    d.variants.forEach((v, i) => {
      if (v.status === 'done' && v.webmUrl) {
        const video = document.getElementById('variant-video-' + i);
        const loading = document.getElementById('variant-loading-' + i);
        const btn = document.getElementById('variant-select-' + i);
        if (video && video.style.display === 'none') {
          video.src = v.webmUrl;
          video.style.display = 'block';
          if (loading) loading.style.display = 'none';
          if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
        }
      }
      if (v.status !== 'done' && v.status !== 'failed') allDone = false;
    });
    
    if (allDone) {
      clearInterval(variantPollInterval);
      document.getElementById('variantPollStatus').style.display = 'none';
      document.getElementById('variantPollText').textContent = '✅ Variantes prêtes !';
    }
    const done = d.variants.filter(v => v.status === 'done').length;
    document.getElementById('variantPollText').textContent = `Génération en cours... ${done}/3 variante(s) prête(s)`;
  }, 10000);
}

async function selectVariant(variantIndex) {
  if (!currentVariantJobId) return;
  const sceneType = document.getElementById('clipSceneType')?.value || 'scene';
  const r = await fetch('/api/clip/select', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ variantJobId: currentVariantJobId, selectedIndex: variantIndex, projectId: currentProjectId, sceneType })
  });
  const d = await r.json();
  if (d.success) {
    // Highlight la card sélectionnée
    [0,1,2].forEach(i => {
      const card = document.getElementById('variant-card-' + i);
      if (card) card.style.border = i === variantIndex ? '2px solid #4ECDC4' : '2px solid transparent';
    });
    // Recharger le projet
    if (currentProjectId) loadStudioProject();
    alert('✅ Clip sélectionné et ajouté au projet !');
  }
}

async function regenerateVariant(variantIndex) {
  // Pour l'instant, relancer une génération complète
  if (confirm('Régénérer toutes les variantes ?')) generateClipVariants();
}

// Gestion des projets
async function loadStudioProjects() {
  const r = await fetch('/api/projects/list');
  const projects = await r.json();
  const sel = document.getElementById('studioProjectSelect');
  if (sel) {
    sel.innerHTML = '<option value="">-- Sélectionner un projet --</option>' +
      projects.map(p => `<option value="${p.projectId}">${p.projectName}</option>`).join('');
  }
}

async function loadStudioProject() {
  const projectId = document.getElementById('studioProjectSelect')?.value;
  if (!projectId) { document.getElementById('studioProjectPanel').style.display = 'none'; return; }
  currentProjectId = projectId;
  const r = await fetch('/api/projects/' + projectId);
  const proj = await r.json();
  document.getElementById('studioProjectPanel').style.display = 'block';
  document.getElementById('studioProjectName').textContent = proj.projectName;
  
  const list = document.getElementById('studioClipsList');
  if (list) {
    list.innerHTML = proj.clips?.length ? proj.clips.map((c, i) => `
      <div style="display:flex; align-items:center; gap:12px; padding:8px; background:rgba(255,255,255,0.05); border-radius:8px">
        <span style="color:#4ECDC4; font-size:14px">🎬</span>
        <div style="flex:1">
          <span style="font-weight:600">${c.sceneType}</span>
          <span style="color:#888; font-size:12px; margin-left:8px">${c.label || ''}</span>
        </div>
        <a href="${c.mp4Url}" download style="color:#4ECDC4; font-size:12px">↓ MP4</a>
      </div>
    `).join('') : '<p style="color:#666; font-style:italic">Aucun clip sélectionné pour l\'instant</p>';
  }
  
  // Pré-remplir le script pour le voiceover
  const fullScript = proj.clips?.map(c => c.scriptDE || '').filter(Boolean).join('\n\n') || '';
  const scriptEl = document.getElementById('fullScriptDE');
  if (scriptEl && !scriptEl.value) scriptEl.value = fullScript;
}

function showCreateProjectModal() {
  const name = prompt('Nom du projet (ex: "Batch 2 Cortisol SA-02")');
  if (!name) return;
  const concept = prompt('Concept (ex: "Der Cortisol-Wecker — Avatar SA-02")');
  createStudioProject(name, concept || '');
}

async function createStudioProject(projectName, concept) {
  const avatarId = document.getElementById('clipAvatarSelect')?.value || '';
  const r = await fetch('/api/projects/create', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ projectName, avatarId, concept })
  });
  const d = await r.json();
  if (d.success) {
    await loadStudioProjects();
    document.getElementById('studioProjectSelect').value = d.projectId;
    await loadStudioProject();
  }
}

async function generateProjectVoiceover() {
  const scriptDE = document.getElementById('fullScriptDE')?.value;
  if (!scriptDE) { alert('Script vide'); return; }
  const r = await fetch('/api/voiceover/generate', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ scriptDE, projectId: currentProjectId, stability: 0.85, similarityBoost: 0.90 })
  });
  const d = await r.json();
  if (d.audioUrl) {
    alert('✅ Voiceover généré ! ' + d.audioUrl);
  } else {
    alert('⚠️ ' + (d.error || d.message || 'Erreur ElevenLabs'));
  }
}

function exportProjectZip() {
  if (!currentProjectId) { alert('Sélectionne un projet'); return; }
  window.open('/api/projects/' + currentProjectId + '/export-zip', '_blank');
}
```

AUSSI dans la fonction d'initialisation de la page (chercher où les avatars sont chargés au démarrage, ou dans showPage / DOMContentLoaded) :
- Appeler loadStudioProjects() et loadAvatarsList()
- Appeler updateConsistencyAnchor() si un avatar est déjà sélectionné

════════════════════════════════════════
TÂCHE 5 — SUPPRIMER/DÉSACTIVER L'ASSEMBLAGE FFMPEG AUTO
════════════════════════════════════════

Dans server.js, dans la fonction processMultiSceneJob() :
- NE PAS SUPPRIMER la fonction (pour ne pas casser les routes existantes)
- Ajouter au début de la fonction : return; // Désactivé — nouveau paradigme clip par clip
- OU commenter l'appel à execSync ffmpeg concat (garder les scenes mais ne pas concaténer)

En fait : garder FFmpeg UNIQUEMENT pour :
1. extract-reference-frame (déjà OK)
2. La conversion WebM dans clip/variants-status
3. Future : ajout sous-titres sur un clip unique

Commenter le bloc d'assemblage dans processMultiSceneJob (la partie avec concat_[jobId].txt).

════════════════════════════════════════
CONTRAINTES ABSOLUES
════════════════════════════════════════

1. NE JAMAIS casser les endpoints existants (avatars, scene-templates, generate-scene-script, batch)
2. NE PAS modifier la Video Library existante
3. Tous les textes UI en FRANÇAIS
4. Tous les scripts générés en ALLEMAND
5. Après chaque modif serveur : pkill -f "node server.js" 2>/dev/null; sleep 2; cd /Users/pc2/.openclaw/workspace/omnia && node server.js > /tmp/omnia-server.log 2>&1 &; sleep 3
6. Tester chaque endpoint avec curl avant de continuer
7. Le packaging Nellio dans les prompts = stick-pack blue/teal (description ci-dessus), PAS un canister

════════════════════════════════════════
TESTS PAR TÂCHE
════════════════════════════════════════

Tâche 1 : curl -s -X POST http://localhost:3002/api/clip/generate-variants -H "Content-Type: application/json" -d '{"visualPrompt":"test german woman","sceneType":"Hook"}' | python3 -m json.tool
Tâche 2 : curl -s -X POST http://localhost:3002/api/projects/create -H "Content-Type: application/json" -d '{"projectName":"Test Sprint 3","avatarId":"sa-02","concept":"Cortisol test"}' | python3 -m json.tool && curl -s http://localhost:3002/api/projects/list | python3 -m json.tool
Tâche 3 : curl -s -X POST http://localhost:3002/api/voiceover/generate -H "Content-Type: application/json" -d '{"scriptDE":"Test script","projectId":"test"}' | python3 -m json.tool
Tâche 5 : vérifier que /api/multiscene/generate répond toujours (même si désactivé)

════════════════════════════════════════
QUAND TOUT EST TERMINÉ
════════════════════════════════════════

1. Faire un restart final + test tous les nouveaux endpoints
2. Mettre à jour sprint3-progress.md
3. Exécuter : openclaw system event --text "Sprint 3 OMNIA terminé : Single Clip Generator 3 variantes + Projet System + ZIP Export + Packaging Nellio stick-pack corrigé" --mode now
