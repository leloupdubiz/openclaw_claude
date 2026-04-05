/**
 * UGC AUTO-PIPELINE — Creative Factory
 * Lit les scripts EVOLVE, sélectionne les avatars HeyGen, génère les vidéos en autonomie
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY || 'sk_V2_hgu_khW4FP1iEV5_48t3oD04Lj1W4b0E5LqUsqno33wJXcha';
const HEYGEN_BASE = 'https://api.heygen.com';
const SCRIPTS_PATH = '/Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/scripts_batch01.md';
const JOBS_FILE = path.join(__dirname, '..', 'data', 'ugc_jobs.json');
const WEB_SCRIPT = path.join(__dirname, '..', 'scripts', 'heygen_web_generate.cjs');
const { spawn } = require('child_process');
const DOWNLOADS_DIR = path.join(__dirname, '..', 'public', 'downloads');

// ─── Helpers ────────────────────────────────────────────────────────────────

function heygenGet(endpoint) {
  return fetch(`${HEYGEN_BASE}${endpoint}`, {
    headers: { 'X-Api-Key': HEYGEN_API_KEY, 'Accept': 'application/json' }
  }).then(r => r.json());
}

function heygenPost(endpoint, body) {
  return fetch(`${HEYGEN_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'X-Api-Key': HEYGEN_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json());
}

function loadJobs() {
  try {
    if (fs.existsSync(JOBS_FILE)) return JSON.parse(fs.readFileSync(JOBS_FILE, 'utf8'));
  } catch(e) {}
  return [];
}

function saveJobs(jobs) {
  fs.mkdirSync(path.dirname(JOBS_FILE), { recursive: true });
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
}

// ─── Parser Markdown scripts ────────────────────────────────────────────────

function parseScripts(mdContent) {
  const scripts = [];
  // Découper par "## Script N"
  const sections = mdContent.split(/^## Script \d+/m).slice(1);

  sections.forEach((section, i) => {
    // Titre
    const titleMatch = section.match(/^[^\n]*/);
    const title = titleMatch ? titleMatch[0].replace(/[^a-zA-Z0-9äöüÄÖÜß\s\-–—|]/g, '').trim() : `Script ${i+1}`;

    // Hook: texte entre > "*..." et (Créateur)
    const hookMatch = section.match(/\*\*HOOK[^*]*\*\*[\s\S]*?>\s*\*"([^"]+)"/);
    const hook = hookMatch ? hookMatch[1] : '';

    // Body: tous les blocs > *"..."*
    const bodyBlocks = [];
    const bodySection = section.match(/\*\*BODY[^*]*\*\*([\s\S]*?)\*\*CTA/);
    if (bodySection) {
      const bodyMatches = bodySection[1].matchAll(/>\s*\*"([^"]+)"/g);
      for (const m of bodyMatches) bodyBlocks.push(m[1]);
    }

    // CTA
    const ctaMatch = section.match(/\*\*CTA[^*]*\*\*[\s\S]*?>\s*\*"([^"]+)"/);
    const cta = ctaMatch ? ctaMatch[1] : '';

    // Script complet (texte pur)
    const fullText = [hook, ...bodyBlocks, cta].filter(Boolean).join(' ');

    // Avatar suggéré (A1 = femme Sonja, A2 = homme Markus)
    const avatarHint = section.includes('Sonja') && !section.includes('Markus') ? 'female' :
                       section.includes('Markus') && !section.includes('Sonja') ? 'male' : 'female';

    if (fullText.length > 50) {
      scripts.push({ index: i + 1, title: title.replace(/^\s*[-–—|]\s*/, ''), hook, body: bodyBlocks.join(' '), cta, fullText, avatarHint });
    }
  });

  return scripts;
}

// ─── Sélection auto avatar photo-réel ───────────────────────────────────────

function selectAvatar(avatars, gender) {
  const preferred = ['casual', 'natural', 'realistic', 'photo', 'real', 'lifestyle'];
  const avoided = ['cartoon', 'anime', 'stylized', '3d', 'avatar_3d'];

  // Filtrer par genre si le champ existe
  let pool = avatars.filter(a => {
    const name = (a.avatar_name || '').toLowerCase();
    const hasAvoided = avoided.some(w => name.includes(w));
    if (hasAvoided) return false;
    if (a.gender) return a.gender.toLowerCase() === gender;
    return true; // pas de genre renseigné → garder
  });

  if (pool.length === 0) pool = avatars; // fallback: tous les avatars

  // Score: préférer les noms contenant des mots "réalistes"
  pool.sort((a, b) => {
    const nameA = (a.avatar_name || '').toLowerCase();
    const nameB = (b.avatar_name || '').toLowerCase();
    const scoreA = preferred.filter(w => nameA.includes(w)).length;
    const scoreB = preferred.filter(w => nameB.includes(w)).length;
    return scoreB - scoreA;
  });

  return pool[0];
}

function selectVoice(voices, gender) {
  // Chercher une voix allemande
  const deVoices = voices.filter(v => {
    const lang = (v.language || v.locale || '').toLowerCase();
    const name = (v.display_name || v.name || '').toLowerCase();
    return lang.includes('de') || lang.includes('german') || name.includes('german') || name.includes('deutsch');
  });

  // Filtrer par genre
  const genVoices = deVoices.filter(v => {
    const g = (v.gender || '').toLowerCase();
    return g === gender || g === (gender === 'female' ? 'female' : 'male');
  });

  if (genVoices.length > 0) return genVoices[0];
  if (deVoices.length > 0) return deVoices[0];

  // Fallback: voix EN par genre
  const enVoices = voices.filter(v => {
    const g = (v.gender || '').toLowerCase();
    return g === gender;
  });
  return enVoices[0] || voices[0];
}

// ─── Téléchargement vidéo ────────────────────────────────────────────────────

async function downloadVideo(url, filename) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
  const filepath = path.join(DOWNLOADS_DIR, filename);
  const res = await fetch(url);
  const buffer = await res.buffer();
  fs.writeFileSync(filepath, buffer);
  return `/downloads/${filename}`;
}

// ─── ROUTES ─────────────────────────────────────────────────────────────────

// POST /api/ugc/pipeline/start — Lance la génération des 3 vidéos UGC
router.post('/start', async (req, res) => {
  try {
    // 1. Lire et parser les scripts
    if (!fs.existsSync(SCRIPTS_PATH)) {
      return res.status(404).json({ error: `Scripts non trouvés: ${SCRIPTS_PATH}` });
    }
    const mdContent = fs.readFileSync(SCRIPTS_PATH, 'utf8');
    const scripts = parseScripts(mdContent);

    if (scripts.length === 0) {
      return res.status(400).json({ error: 'Aucun script parsé depuis le fichier markdown' });
    }

    // 2. Récupérer avatars et voix HeyGen
    const [avatarsData, voicesData] = await Promise.all([
      heygenGet('/v2/avatars'),
      heygenGet('/v2/voices')
    ]);

    const avatars = avatarsData?.data?.avatars || [];
    const voices = voicesData?.data?.voices || voicesData?.data || [];

    if (avatars.length === 0) {
      return res.status(500).json({ error: 'Aucun avatar HeyGen disponible', raw: avatarsData });
    }

    // Sélection des avatars
    const femaleAvatar = selectAvatar(avatars, 'female');
    const maleAvatar = selectAvatar(avatars, 'male');
    const femaleVoice = selectVoice(voices, 'female');
    const maleVoice = selectVoice(voices, 'male');

    // 3. Générer une vidéo par script
    const jobs = loadJobs();
    const newJobs = [];

    for (const script of scripts) {
      const avatar = script.avatarHint === 'male' ? maleAvatar : femaleAvatar;
      const voice = script.avatarHint === 'male' ? maleVoice : femaleVoice;

      // Tronquer à 1500 chars max pour HeyGen
      const scriptText = script.fullText.slice(0, 1500);

      let result;
      try {
        result = await heygenPost('/v2/video/generate', {
          video_inputs: [{
            character: {
              type: 'avatar',
              avatar_id: avatar.avatar_id,
              avatar_style: 'normal'
            },
            voice: {
              type: 'text',
              voice_id: voice?.voice_id || voice?.id || '',
              input_text: scriptText,
              speed: 1.0
            },
            background: {
              type: 'color',
              value: '#0d0d1a'
            }
          }],
          dimension: { width: 1080, height: 1920 },
          aspect_ratio: '9:16'
        });
      } catch(e) {
        result = { error: e.message };
      }

      const jobId = result?.data?.video_id || result?.video_id || null;

      const job = {
        id: jobId || `local_${Date.now()}_${script.index}`,
        scriptIndex: script.index,
        scriptTitle: script.title,
        scriptHook: script.hook,
        avatarId: avatar?.avatar_id,
        avatarName: avatar?.avatar_name,
        voiceId: voice?.voice_id || voice?.id,
        voiceName: voice?.display_name || voice?.name,
        status: jobId ? 'processing' : 'failed',
        error: result?.error || null,
        createdAt: new Date().toISOString(),
        videoUrl: null,
        localPath: null
      };

      jobs.push(job);
      newJobs.push(job);
    }

    saveJobs(jobs);

    // Détecter si tous les jobs ont échoué par manque de crédits API → fallback Web UI
    const allFailedCredit = newJobs.every(j =>
      j.status === 'failed' && j.error?.code === 'MOVIO_PAYMENT_INSUFFICIENT_CREDIT'
    );
    if (allFailedCredit) {
      console.log('[ugc-pipeline] API credits épuisés → basculement Web UI automatique');
      // Lancer le script web en arrière-plan
      const child = spawn('node', [WEB_SCRIPT], { detached: true, stdio: 'ignore' });
      child.unref();
      return res.json({
        started: 0,
        total: newJobs.length,
        fallback: 'web_ui',
        message: 'Crédits API HeyGen épuisés — génération via Web UI lancée en arrière-plan (~2 min)',
        jobs: newJobs
      });
    }

    res.json({
      started: newJobs.filter(j => j.status === 'processing').length,
      total: newJobs.length,
      avatarsSelected: {
        female: { id: femaleAvatar?.avatar_id, name: femaleAvatar?.avatar_name },
        male: { id: maleAvatar?.avatar_id, name: maleAvatar?.avatar_name }
      },
      jobs: newJobs
    });

  } catch(e) {
    console.error('[ugc-pipeline] Erreur start:', e);
    res.status(500).json({ error: e.message });
  }
});

// POST /api/ugc/pipeline/start-web — Force génération via HeyGen Web UI (sans crédits API)
router.post('/start-web', async (req, res) => {
  try {
    if (!require('fs').existsSync(WEB_SCRIPT)) {
      return res.status(500).json({ error: 'Script web non trouvé: ' + WEB_SCRIPT });
    }
    const child = spawn('node', [WEB_SCRIPT], { detached: true, stdio: 'ignore' });
    child.unref();
    res.json({ ok: true, message: 'Génération Web UI lancée en arrière-plan — résultats dans ~2-3 min' });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/ugc/pipeline/status — Vérifie le statut des jobs en cours
router.get('/status', async (req, res) => {
  try {
    const jobs = loadJobs();
    const activeJobs = jobs.filter(j => j.status === 'processing' && j.id && !j.id.startsWith('local_'));

    // Mettre à jour les jobs actifs
    for (const job of activeJobs) {
      try {
        const pollRes = await heygenGet(`/v1/video_status.get?video_id=${job.id}`);
        const data = pollRes?.data || pollRes;
        const status = data?.status || '';

        if (status === 'completed' && data?.video_url) {
          // Télécharger la vidéo localement
          const filename = `ugc_s${job.scriptIndex}_${Date.now()}.mp4`;
          try {
            job.localPath = await downloadVideo(data.video_url, filename);
          } catch(dlErr) {
            job.localPath = null;
            job.videoUrl = data.video_url; // URL externe fallback
          }
          job.videoUrl = data.video_url;
          job.status = 'completed';
          job.completedAt = new Date().toISOString();
        } else if (status === 'failed' || status === 'error') {
          job.status = 'failed';
          job.error = data?.error || 'Erreur HeyGen';
        }
      } catch(e) {
        console.warn(`[ugc-pipeline] Poll job ${job.id} échoué:`, e.message);
      }
    }

    saveJobs(jobs);

    const summary = {
      total: jobs.length,
      pending: jobs.filter(j => j.status === 'pending').length,
      processing: jobs.filter(j => j.status === 'processing').length,
      completed: jobs.filter(j => j.status === 'completed').length,
      failed: jobs.filter(j => j.status === 'failed').length,
      jobs: jobs.slice(-20) // derniers 20
    };

    res.json(summary);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/ugc/pipeline/results — Liste les vidéos complétées
router.get('/results', (req, res) => {
  const jobs = loadJobs();
  const completed = jobs.filter(j => j.status === 'completed');
  res.json({ count: completed.length, results: completed });
});

// DELETE /api/ugc/pipeline/clear — Remet à zéro
router.delete('/clear', (req, res) => {
  saveJobs([]);
  res.json({ cleared: true });
});

module.exports = router;
