/**
 * VIDEO CLONER — Auto-Pipeline
 * 1. Colle URL → scrape auto (Firecrawl / yt-dlp / YouTube API)
 * 2. Claude analyse la structure de l'ad
 * 3. Charge le research du projet EVOLVE sélectionné
 * 4. Claude génère un script adapté au produit + avatars + angles du projet
 * 5. HeyGen lance la vidéo en background
 */

const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');
const fetch   = require('node-fetch');

const HEYGEN_API_KEY    = process.env.HEYGEN_API_KEY    || 'sk_V2_hgu_khW4FP1iEV5_48t3oD04Lj1W4b0E5LqUsqno33wJXcha';
const ANTHROPIC_TOKEN   = process.env.ANTHROPIC_SESSION_TOKEN ||
  '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';
const FIRECRAWL_KEY     = process.env.FIRECRAWL_API_KEY || 'fc-500f64750bc34036a6cf16ac4d7d2719';
const KIE_API_KEY       = process.env.KIE_API_KEY       || '788b72e5007d63c06539d84fb5ddfa54';
const KIE_BASE          = 'https://api.kie.ai';
const HEYGEN_BASE       = 'https://api.heygen.com';
const CLONER_JOBS_FILE  = path.join(__dirname, '..', 'data', 'cloner_jobs.json');
const EVOLVE_DIR        = path.join(__dirname, '..', '..', 'EVOLVE_RESULTS', 'universal');

// ─── Claude (OAuth) ───────────────────────────────────────────────────────────
async function callClaude({ model = 'claude-haiku-4-5', messages, system, max_tokens = 3000 }) {
  const body = { model, messages, max_tokens };
  if (system) body.system = system;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ANTHROPIC_TOKEN}`,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'oauth-2025-04-20',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.content?.[0]?.text || '';
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────
function loadJobs() {
  try { if (fs.existsSync(CLONER_JOBS_FILE)) return JSON.parse(fs.readFileSync(CLONER_JOBS_FILE, 'utf8')); } catch(e) {}
  return [];
}
function saveJobs(jobs) {
  fs.mkdirSync(path.dirname(CLONER_JOBS_FILE), { recursive: true });
  fs.writeFileSync(CLONER_JOBS_FILE, JSON.stringify(jobs, null, 2));
}

// ─── HeyGen ───────────────────────────────────────────────────────────────────
const heygenPost = (ep, body) => fetch(`${HEYGEN_BASE}${ep}`, {
  method: 'POST',
  headers: { 'X-Api-Key': HEYGEN_API_KEY, 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
}).then(r => r.json());

const heygenGet = (ep) => fetch(`${HEYGEN_BASE}${ep}`, {
  headers: { 'X-Api-Key': HEYGEN_API_KEY, 'Accept': 'application/json' }
}).then(r => r.json());

// ─── kie.ai ───────────────────────────────────────────────────────────────────
const kiePost = (ep, body) => fetch(`${KIE_BASE}${ep}`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${KIE_API_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
}).then(r => r.json());

const kieGet = (ep) => fetch(`${KIE_BASE}${ep}`, {
  headers: { 'Authorization': `Bearer ${KIE_API_KEY}` }
}).then(r => r.json());

// ─── Modèles disponibles ──────────────────────────────────────────────────────
const VIDEO_PROVIDERS = {
  'kling-3':        { label: 'Kling 3.0 ⚡',    api: 'kie', model: 'kling-3.0',                eta: 180, duration: 5 },
  'kling-2.1-pro':  { label: 'Kling 2.1 Pro',   api: 'kie', model: 'kling-2.1-pro',            eta: 150, duration: 5 },
  'sora-2':         { label: 'Sora 2 T2V',      api: 'kie', model: 'sora-2-text-to-video',     eta: 600, duration: 5 },
  'sora-2-pro':     { label: 'Sora 2 Pro',      api: 'kie', model: 'sora-2-pro-text-to-video', eta: 720, duration: 5 },
  'veo-3':          { label: 'Veo 3',           api: 'kie', model: 'veo-3',                    eta: 300, duration: 5 },
  'heygen':         { label: 'HeyGen Avatar',   api: 'heygen', model: null,                    eta: 180, duration: null },
};

// ─── URL Detection ────────────────────────────────────────────────────────────
function detectUrlType(url = '') {
  if (url.includes('youtube.com') || url.includes('youtu.be'))           return 'youtube';
  if (url.includes('facebook.com/ads/library') || url.includes('fb.com/ads/library')) return 'fb_adlibrary';
  if (url.includes('facebook.com') || url.includes('fb.watch'))          return 'facebook';
  if (url.includes('tiktok.com'))                                         return 'tiktok';
  if (url.includes('instagram.com'))                                      return 'instagram';
  if (url.includes('fbcdn.net') || url.includes('cdninstagram.com'))     return 'direct_video';
  return 'unknown';
}

// ─── Extractors ───────────────────────────────────────────────────────────────
async function firecrawlScrape(url) {
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${FIRECRAWL_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true, timeout: 20000 })
    });
    const data = await res.json();
    const raw = data.data?.markdown || data.data?.content || '';
    // Nettoyer nav/liens markdown
    return raw.replace(/^#{1,3} .+$/gm,'').replace(/\[.*?\]\(.*?\)/g,'').replace(/!\[.*?\]\(.*?\)/g,'').trim() || null;
  } catch(e) { console.warn('[firecrawl]', e.message); return null; }
}

async function ytDlpTranscript(url) {
  const { execSync } = require('child_process');
  const os = require('os');
  const tmp = path.join(os.tmpdir(), `cloner_${Date.now()}`);
  try {
    execSync(`/opt/homebrew/bin/yt-dlp --no-playlist --extract-audio --audio-format mp3 --audio-quality 5 -o "${tmp}.%(ext)s" "${url}" 2>/dev/null`, { timeout: 60000 });
    const mp3 = `${tmp}.mp3`;
    if (!fs.existsSync(mp3)) return null;
    if (fs.statSync(mp3).size > 50*1024*1024) { fs.unlinkSync(mp3); return null; }
    execSync(`"/Users/pc2/Library/Python/3.9/bin/whisper" "${mp3}" --model small --language de --output_format txt --output_dir "${os.tmpdir()}" 2>/dev/null`, { timeout: 120000 });
    const txt = `${tmp}.txt`;
    if (fs.existsSync(txt)) { const t = fs.readFileSync(txt,'utf8'); [mp3,txt].forEach(f=>{try{fs.unlinkSync(f)}catch{}}); return t.trim()||null; }
    try{fs.unlinkSync(mp3)}catch{}; return null;
  } catch(e) { console.warn('[yt-dlp]', e.message); try{fs.unlinkSync(`${tmp}.mp3`)}catch{}; return null; }
}

async function youtubeTimedText(url) {
  try {
    const vid = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (!vid) return null;
    const res = await fetch(`https://www.youtube.com/api/timedtext?v=${vid}&lang=de&fmt=json3`, { headers:{'User-Agent':'Mozilla/5.0'} });
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.events||[]).flatMap(e=>(e.segs||[]).map(s=>s.utf8||'')).join(' ').trim() || null;
  } catch(e) { return null; }
}

async function extractText(url) {
  const type = detectUrlType(url);
  console.log(`[cloner] extract type=${type} url=${url.slice(0,80)}`);
  switch(type) {
    case 'youtube':      return await youtubeTimedText(url) || await ytDlpTranscript(url);
    case 'fb_adlibrary': return await firecrawlScrape(url)  || await ytDlpTranscript(url);
    case 'facebook':     return await ytDlpTranscript(url)  || await firecrawlScrape(url);
    case 'tiktok':
    case 'instagram':
    case 'direct_video': return await ytDlpTranscript(url);
    default:             return await firecrawlScrape(url);
  }
}

// ─── Load EVOLVE project research ─────────────────────────────────────────────
async function loadProjectResearch(slug) {
  if (!slug) return null;
  const dir = path.join(EVOLVE_DIR, slug);
  if (!fs.existsSync(dir)) return null;

  const read = (file) => {
    const p = path.join(dir, file);
    return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').slice(0, 4000) : '';
  };

  // Charger meta.json pour infos produit
  let meta = {};
  try { meta = JSON.parse(fs.readFileSync(path.join(dir,'meta.json'),'utf8')); } catch(e) {}

  // Charger les phases clés (limité pour rester dans le contexte Claude)
  const research  = read('phase-research.md');
  const strategy  = read('phase-strategy.md');
  const avatars   = read('phase-avatars.md');
  const angles    = read('phase-angles.md');

  // Lire les enrichissements récents si disponibles
  const enrichFiles = fs.readdirSync(dir).filter(f => f.startsWith('enrichment-')).sort().slice(-1);
  const enrichment  = enrichFiles.length ? read(enrichFiles[0]).slice(0, 2000) : '';

  return { meta, research, strategy, avatars, angles, enrichment };
}

// ─── ROUTE principale : /api/cloner/auto-clone ────────────────────────────────
// Corps : { url, slug, transcript?, avatarGender?, avatarId?, voiceId? }
router.post('/auto-clone', async (req, res) => {
  const { url, slug, transcript, avatarGender = 'female', avatarId, voiceId,
          videoProvider = 'kling-3', format = '9:16' } = req.body;

  if (!url && !transcript) {
    return res.status(400).json({ error: 'url ou transcript requis' });
  }

  try {
    // ── ÉTAPE 1 : Extraction du contenu ───────────────────────────────────────
    let content = transcript;
    let extractionMethod = 'manual';

    if (!content && url) {
      content = await extractText(url);
      extractionMethod = detectUrlType(url);
    }

    if (!content || content.length < 30) {
      return res.json({
        step: 'extraction_failed',
        needsTranscript: true,
        urlType: url ? detectUrlType(url) : 'manual',
        message: detectUrlType(url) === 'fb_adlibrary'
          ? "Facebook Ad Library bloqué. Ouvre l'ad, copie le texte dit dans la vidéo, colle-le dans le champ Transcript."
          : "Extraction automatique impossible. Colle le texte/transcript de la vidéo ci-dessous."
      });
    }

    // ── ÉTAPE 2 : Analyse structure avec Claude ────────────────────────────────
    const analysisRaw = await callClaude({
      model: 'claude-haiku-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: `Analyse ce transcript d'ad vidéo. Retourne UNIQUEMENT ce JSON (pas de markdown) :
{
  "estimatedDuration": <secondes>,
  "structure": {
    "hook":      {"text":"...","technique":"...","durationEstimate":<s>},
    "problem":   {"text":"...","durationEstimate":<s>},
    "bridge":    {"text":"...","durationEstimate":<s>},
    "mechanism": {"text":"...","durationEstimate":<s>},
    "proof":     {"text":"...","durationEstimate":<s>},
    "cta":       {"text":"...","durationEstimate":<s>}
  },
  "tone": "émotionnel|éducatif|choc|identification|autorité|aspirationnel",
  "rhythm": "rapide|modéré|lent",
  "hookTechnique": "...",
  "keyPhrases": ["..."],
  "competitorProduct": "...",
  "claims": ["..."]
}

TRANSCRIPT:
${content.slice(0, 3000)}` }]
    });

    let analysis = {};
    try {
      const m = analysisRaw.match(/\{[\s\S]+\}/);
      analysis = JSON.parse(m ? m[0] : analysisRaw);
    } catch(e) { analysis = { raw: analysisRaw, parseError: true }; }

    // ── ÉTAPE 3 : Charger le research du projet ────────────────────────────────
    const projectData = slug ? await loadProjectResearch(slug) : null;
    const meta = projectData?.meta || {};

    // Construire le contexte produit depuis le projet ou fallback Nellio
    const productContext = projectData ? `
PRODUIT : ${meta.product || meta.name || 'Inconnu'}
URL : ${meta.url || ''}
MARCHÉS : ${(meta.markets||[]).join(', ')}
BUDGET : ${meta.budget || 'N/D'}

== RESEARCH (désirs, verbatims, problèmes) ==
${projectData.research.slice(0, 2500)}

== STRATÉGIE (angles, messaging) ==
${projectData.strategy.slice(0, 1500)}

== AVATARS ==
${projectData.avatars.slice(0, 1000)}

== ANGLES PRIORITAIRES ==
${projectData.angles.slice(0, 800)}

${projectData.enrichment ? `== ENRICHISSEMENT RÉCENT ==\n${projectData.enrichment}` : ''}
` : `
PRODUIT : Nellio UltraCalm (poudre boisson anti-stress, arôme Framboise-Citron)
URL : drinknellio.com | MARCHÉ : Allemagne | FORMAT : poudre à dissoudre

INGRÉDIENTS CLÉS :
- Ashwagandha KSM-66 300mg — 45 études cliniques, -28% cortisol prouvé
- L-Theanin 400mg → Alpha-Gehirnwellen → Ruhe ohne Schläfrigkeit
- Magnesiumglycinat 100mg → Nervensystem stabilisieren
- Vitamine D3 1000 I.E.

PREUVE SOCIALE : 4,8/5 Sterne · 20.000+ Bewertungen · 45 Tage Geld-zurück-Garantie

VERBATIMS AUTHENTIQUES (utiliser ces mots exacts) :
- "fertig sein" · "Dauerstress" · "Gedankenkarussell" · "todmüde"
- "wirklich erholt aufwachen" · "endlich mal durchschlafen"

ANGLES GAGNANTS (par ordre de priorité) :
1. CORTISOL_MÉCANISME : KSM-66 bloque cortisol → cerveau en mode récupération
2. SCHLAF_CHRONIQUE : le stress empêche de dormir → Nellio coupe le cycle
3. IDENTITE_PRO : cadres surmenés qui refusent de s'effondrer
`;

    // ── ÉTAPE 4 : Génération script adapté ────────────────────────────────────
    const scriptPrompt = `Tu es un expert copywriter Meta Ads spécialisé en DTC.

Ta mission : REPRODUIRE EXACTEMENT la structure de cette publicité concurrente, mais avec le produit et les données de recherche ci-dessous.

== STRUCTURE CONCURRENTE À REPRODUIRE ==
${JSON.stringify(analysis.structure || {}, null, 2)}

TON : ${analysis.tone || 'émotionnel'}
RYTHME : ${analysis.rhythm || 'modéré'}
DURÉE CIBLE : ~${analysis.estimatedDuration || 30}s
HOOK TECHNIQUE ORIGINAL : ${analysis.hookTechnique || analysis.structure?.hook?.technique || 'identification'}

== DONNÉES PRODUIT & RESEARCH ==
${productContext}

== RÈGLES DE GÉNÉRATION ==
- Respecter EXACTEMENT les mêmes proportions de temps entre les sections
- Utiliser le même HOOK TECHNIQUE que l'original (${analysis.hookTechnique || 'identification'})
- Langue : ${(meta.markets||[]).some(m=>m.toLowerCase().includes('de')||m.toLowerCase().includes('all')) ? 'Allemand natif, conversationnel' : (meta.markets||['fr'])[0] === 'fr' ? 'Français natif, conversationnel' : 'Langue du marché cible, natif conversationnel'}
- Format UGC caméra frontale
- Interdit : superlatifs vides, promesses irréalistes, jargon médical
- Utiliser les verbatims authentiques du research quand disponibles
- CTA direct, sans ambiguïté

Retourne UNIQUEMENT le script (texte pur, prêt TTS, sans didascalies) :`;

    const scriptFinal = await callClaude({
      model: 'claude-haiku-4-5',
      max_tokens: 2000,
      messages: [{ role: 'user', content: scriptPrompt }]
    });

    // ── ÉTAPE 5 : Sauvegarder + répondre immédiatement ────────────────────────
    const jobId = `cloner_${Date.now()}`;
    const provider = VIDEO_PROVIDERS[videoProvider] || VIDEO_PROVIDERS['sora-2'];
    const jobs  = loadJobs();
    jobs.push({
      id: jobId, scriptDE: scriptFinal, status: 'script_ready',
      slug, url, extractionMethod, videoProvider, provider: provider.label,
      analysis: { tone: analysis.tone, rhythm: analysis.rhythm, estimatedDuration: analysis.estimatedDuration },
      createdAt: new Date().toISOString(), videoUrl: null, kieTaskId: null, heygenJobId: null
    });
    saveJobs(jobs);

    res.json({
      jobId, scriptDE: scriptFinal,
      analysis: { tone: analysis.tone, rhythm: analysis.rhythm, estimatedDuration: analysis.estimatedDuration,
                  hookTechnique: analysis.hookTechnique, competitorProduct: analysis.competitorProduct },
      projectUsed: meta.product || meta.name || (slug ? slug : 'Nellio'),
      extractionMethod, contentLength: content.length,
      videoProvider, providerLabel: provider.label, providerEta: provider.eta,
      status: 'script_ready'
    });

    // ── ÉTAPE 6 : Génération vidéo en background ──────────────────────────────
    (async () => {
      try {
        const fmtMap = { '9:16':'1080x1920', '16:9':'1920x1080', '1:1':'1080x1080', '4:5':'1080x1350' };
        const resolution = fmtMap[format] || '1080x1920';

        let kieTaskId = null, heygenJobId = null, videoError = null;

        if (provider.api === 'kie') {
          // ── kie.ai : Sora 2 / Veo 3 / Kling ─────────────────────────────────
          const videoPrompt = `UGC-style talking head video, person speaking directly to camera, 9:16 vertical format, natural authentic setting. Script content: ${scriptFinal.slice(0, 500)}`;
          const kieBody = { model: provider.model, input: { prompt: videoPrompt, duration: provider.duration || 5, resolution } };
          const r = await kiePost('/api/v1/jobs/createTask', kieBody);
          kieTaskId = r?.data?.taskId || r?.data?.task_id;
          if (!kieTaskId) videoError = JSON.stringify(r?.message || r?.error || r);
          console.log(`[cloner] kie.ai ${provider.model} task: ${kieTaskId || 'FAIL:'+videoError}`);

        } else if (provider.api === 'heygen') {
          // ── HeyGen talking head ───────────────────────────────────────────────
          let selAvatar = avatarId, selVoice = voiceId;
          if (!selAvatar) {
            const d = await heygenGet('/v2/avatars');
            const pool = (d?.data?.avatars||[]).filter(a => !a.gender || a.gender.toLowerCase() === avatarGender);
            selAvatar = pool[0]?.avatar_id;
          }
          if (!selVoice) {
            const d = await heygenGet('/v2/voices');
            const voices = d?.data?.voices || d?.data || [];
            const marketLang = (meta?.markets||['de'])[0].toLowerCase();
            const langFilter = marketLang.includes('fr') ? ['fr','french'] : ['de','german'];
            selVoice = voices
              .filter(v => { const l=(v.language||v.locale||'').toLowerCase(); return langFilter.some(x=>l.includes(x)); })
              .filter(v => { const g=(v.gender||'').toLowerCase(); return g===avatarGender||!g; })
              [0]?.voice_id;
          }
          if (selAvatar) {
            const dims = format === '16:9' ? { width:1920, height:1080 } : { width:1080, height:1920 };
            const r = await heygenPost('/v2/video/generate', {
              video_inputs: [{ character: { type:'avatar', avatar_id:selAvatar, avatar_style:'normal' },
                voice: { type:'text', voice_id:selVoice||'', input_text:scriptFinal.slice(0,1500), speed:1.0 },
                background: { type:'color', value:'#0d0d1a' } }],
              dimension: dims, aspect_ratio: format
            });
            heygenJobId = r?.data?.video_id || r?.video_id;
            if (!heygenJobId) videoError = JSON.stringify(r?.error || r?.message || r);
          } else { videoError = 'No HeyGen avatar available'; }
        }

        const all = loadJobs(); const i = all.findIndex(j => j.id === jobId);
        if (i >= 0) {
          all[i].kieTaskId   = kieTaskId;
          all[i].heygenJobId = heygenJobId;
          all[i].videoError  = videoError;
          all[i].status      = (kieTaskId || heygenJobId) ? 'processing' : 'script_only';
          saveJobs(all);
        }
      } catch(e) { console.warn('[cloner] video bg error:', e.message); }
    })();

  } catch(e) {
    console.error('[cloner] auto-clone error:', e);
    res.status(500).json({ error: e.message });
  }
});

// ─── ROUTE legacy : /analyze (backward compat) ────────────────────────────────
router.post('/analyze', async (req, res) => {
  const { url, transcript } = req.body;
  if (!url && !transcript) return res.status(400).json({ error: 'url ou transcript requis' });
  try {
    const content = transcript || (url ? await extractText(url) : null);
    if (!content) return res.json({ needsTranscript: true, urlType: detectUrlType(url||''),
      message: "Extraction impossible — colle le transcript manuellement." });
    const raw = await callClaude({ model:'claude-haiku-4-5', max_tokens:1500, messages:[{role:'user',
      content:`Analyse ce transcript d'ad. JSON uniquement :\n{\n"estimatedDuration":<s>,\n"structure":{"hook":{"text":"","technique":"","durationEstimate":<s>},"problem":{"text":"","durationEstimate":<s>},"bridge":{"text":"","durationEstimate":<s>},"mechanism":{"text":"","durationEstimate":<s>},"proof":{"text":"","durationEstimate":<s>},"cta":{"text":"","durationEstimate":<s>}},\n"tone":"","rhythm":"","hookTechnique":"","keyPhrases":[],"competitorProduct":"","claims":[]\n}\n\nTRANSCRIPT:\n${content.slice(0,3000)}`}]});
    let analysis; try { const m=raw.match(/\{[\s\S]+\}/); analysis=JSON.parse(m?m[0]:raw); } catch(e) { analysis={raw,parseError:true}; }
    res.json({ analysis, originalTranscriptLength: content.length });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ─── ROUTE legacy : /generate (backward compat) ──────────────────────────────
router.post('/generate', async (req, res) => {
  const { analysis, avatarGender='female', slug } = req.body;
  if (!analysis) return res.status(400).json({ error: 'analysis requis' });
  // Rediriger vers auto-clone avec l'analyse déjà faite
  req.body.url = null; req.body.transcript = JSON.stringify(analysis);
  res.redirect(307, '/api/cloner/auto-clone');
});

// ─── ROUTE : statut d'un job cloner spécifique ───────────────────────────────
router.get('/job/:jobId', async (req, res) => {
  try {
    const jobs = loadJobs();
    const job  = jobs.find(j => j.id === req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job non trouvé' });

    if (job.status === 'processing') {
      try {
        if (job.kieTaskId) {
          // ── Poll kie.ai ──────────────────────────────────────────────────────
          const d = await kieGet(`/api/v1/jobs/recordInfo?taskId=${job.kieTaskId}`);
          const state = d?.data?.state;
          if (state === 'success') {
            const resultJson = d.data.resultJson ? JSON.parse(d.data.resultJson) : {};
            const videoUrl = resultJson.url || resultJson.video_url || d.data.resultJson?.url;
            job.videoUrl = videoUrl; job.status = 'completed'; job.completedAt = new Date().toISOString();
          } else if (state === 'failed' || state === 'error') {
            job.status = 'failed'; job.videoError = d?.data?.message || 'kie.ai failed';
          }
          // 'running', 'queued' → encore en cours
        } else if (job.heygenJobId) {
          // ── Poll HeyGen ──────────────────────────────────────────────────────
          const d = await heygenGet(`/v1/video_status.get?video_id=${job.heygenJobId}`);
          const s = d?.data || d;
          if (s?.status === 'completed' && s?.video_url) {
            job.videoUrl = s.video_url; job.status = 'completed'; job.completedAt = new Date().toISOString();
          } else if (s?.status === 'failed') {
            job.status = 'failed'; job.videoError = typeof s.error === 'object' ? JSON.stringify(s.error) : (s.error || 'HeyGen failed');
          }
        }
        // Persister les changements
        if (job.status !== 'processing') {
          const all = loadJobs(); const i = all.findIndex(j => j.id === job.id);
          if (i >= 0) { Object.assign(all[i], job); saveJobs(all); }
        }
      } catch(e) { console.warn('[cloner] poll error:', e.message); }
    }

    res.json({
      jobId: job.id, status: job.status,
      kieTaskId: job.kieTaskId || null, heygenJobId: job.heygenJobId || null,
      videoUrl: job.videoUrl || null, scriptDE: job.scriptDE,
      videoError: job.videoError || null, provider: job.provider || null,
      createdAt: job.createdAt, completedAt: job.completedAt || null
    });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ─── ROUTE : statut de tous les jobs ─────────────────────────────────────────
router.get('/status', async (req, res) => {
  try {
    const jobs = loadJobs();
    res.json({ total: jobs.length, jobs: jobs.slice(-20) });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
