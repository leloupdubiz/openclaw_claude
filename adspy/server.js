/**
 * ADSPY PRO — Backend Server
 * Port 3004 | Express + NeDB | Meta Ad Library API + boards persistence
 */
const express = require('./node_modules/express');
const cors = require('./node_modules/cors');
const path = require('path');
const fs = require('fs');
const https = require('https');

// NeDB
const Datastore = require('./node_modules/nedb');
const DB_DIR = path.join(__dirname, 'db');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);

const db = {
  boards:   new Datastore({ filename: path.join(DB_DIR, 'boards.db'),   autoload: true }),
  saved:    new Datastore({ filename: path.join(DB_DIR, 'saved.db'),    autoload: true }),
  tracker:  new Datastore({ filename: path.join(DB_DIR, 'tracker.db'),  autoload: true }),
  config:   new Datastore({ filename: path.join(DB_DIR, 'config.db'),   autoload: true }),
};

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve index.html with iframe headers (must be before express.static)
app.get('/', (req, res) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' http://localhost:3002 http://localhost:3000");
  res.sendFile('index.html', { root: __dirname });
});

app.use(express.static(__dirname));

// ============================================================
// META AD LIBRARY API
// ============================================================
const META_API_BASE = 'https://graph.facebook.com/v19.0';

async function fetchMeta(endpoint, params) {
  return new Promise((resolve, reject) => {
    const url = `${META_API_BASE}${endpoint}?${new URLSearchParams(params).toString()}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// GET /api/meta/token-status — check if token is valid
app.get('/api/meta/token-status', async (req, res) => {
  db.config.findOne({ key: 'fb_token' }, async (err, doc) => {
    if (!doc || !doc.value) return res.json({ valid: false, message: 'No token configured' });
    try {
      const result = await fetchMeta('/me', { access_token: doc.value, fields: 'id,name' });
      if (result.error) return res.json({ valid: false, message: result.error.message });
      res.json({ valid: true, user: result });
    } catch(e) {
      res.json({ valid: false, message: e.message });
    }
  });
});

// POST /api/meta/token — save FB token
app.post('/api/meta/token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token required' });
  db.config.update({ key: 'fb_token' }, { key: 'fb_token', value: token }, { upsert: true }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

// GET /api/meta/ads — search Meta Ad Library
app.get('/api/meta/ads', async (req, res) => {
  db.config.findOne({ key: 'fb_token' }, async (err, doc) => {
    if (!doc || !doc.value) {
      return res.json({ data: [], _source: 'mock', message: 'No FB token — showing mock data' });
    }
    try {
      const { q = '', country = 'DE', limit = 20, media_type = 'ALL', active_status = 'ACTIVE' } = req.query;
      const params = {
        access_token: doc.value,
        search_terms: q || 'ashwagandha stress',
        ad_reached_countries: `["${country}"]`,
        ad_active_status: active_status,
        fields: 'id,ad_creation_time,ad_creative_bodies,ad_creative_link_captions,ad_creative_link_descriptions,ad_creative_link_titles,ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,bylines,currency,demographic_distribution,estimated_audience_size,impressions,page_id,page_name,publisher_platforms,spend,languages',
        limit,
      };
      if (media_type !== 'ALL') params.ad_type = media_type;
      const result = await fetchMeta('/ads_archive', params);
      if (result.error) return res.json({ data: [], _source: 'error', message: result.error.message });
      res.json({ data: result.data || [], paging: result.paging, _source: 'meta' });
    } catch(e) {
      res.json({ data: [], _source: 'error', message: e.message });
    }
  });
});

// GET /api/meta/page/:pageId — get page ads
app.get('/api/meta/page/:pageId', async (req, res) => {
  db.config.findOne({ key: 'fb_token' }, async (err, doc) => {
    if (!doc || !doc.value) return res.json({ data: [], _source: 'mock' });
    try {
      const result = await fetchMeta('/ads_archive', {
        access_token: doc.value,
        search_page_ids: `["${req.params.pageId}"]`,
        ad_active_status: 'ALL',
        fields: 'id,ad_creation_time,ad_creative_bodies,ad_creative_link_titles,ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,page_name,spend,impressions',
        limit: 50,
      });
      res.json({ data: result.data || [], _source: 'meta' });
    } catch(e) { res.json({ data: [], _source: 'error', message: e.message }); }
  });
});

// ============================================================
// IMPORT DUPLICATES — Scrape Meta Ad Library, filter dup >= 2x, save to DB
// ============================================================

// POST /api/meta/import-duplicates
// Scrapes multiple keyword queries, groups by page, finds ads running 2+ copies, imports to a board
app.post('/api/meta/import-duplicates', async (req, res) => {
  db.config.findOne({ key: 'fb_token' }, async (err, doc) => {
    if (!doc || !doc.value) return res.status(400).json({ error: 'No FB token configured' });
    const token = doc.value;
    const { country = 'DE', min_dup = 2, board_id = null } = req.body;

    // Keywords to scrape — stress/sleep/wellness niche DE
    const QUERIES = [
      'ashwagandha', 'stress', 'schlaf', 'cortisol', 'magnesium entspannung',
      'l-theanin', 'burnout', 'einschlafen', 'durchschlafen', 'beruhigung'
    ];

    const FIELDS = [
      'id','page_id','page_name','ad_creative_bodies','ad_creative_link_titles',
      'ad_creative_link_descriptions','ad_snapshot_url','ad_delivery_start_time',
      'ad_delivery_stop_time','ad_creation_time','impressions','spend',
      'publisher_platforms','languages','bylines'
    ].join(',');

    let allAds = [];
    let errors = [];

    // Fetch all queries in sequence
    for (const q of QUERIES) {
      try {
        const params = {
          access_token: token,
          search_terms: q,
          ad_reached_countries: `["${country}"]`,
          ad_active_status: 'ACTIVE',
          fields: FIELDS,
          limit: 50,
        };
        const result = await fetchMeta('/ads_archive', params);
        if (result.error) { errors.push(`${q}: ${result.error.message}`); continue; }
        if (result.data) allAds = allAds.concat(result.data);
      } catch(e) { errors.push(`${q}: ${e.message}`); }
    }

    if (allAds.length === 0) {
      const hasPermError = errors.some(e => e.includes('permission'));
      return res.json({
        imported: 0, skipped: 0, errors,
        message: hasPermError
          ? 'TOKEN_MISSING_ADS_READ: Ton token n\'a pas la permission ads_read. Régénère un token sur https://developers.facebook.com/tools/explorer/ en ajoutant le scope "ads_read" avant de générer.'
          : 'No ads returned from Meta API'
      });
    }

    // Deduplicate by ad id
    const seen = new Set();
    allAds = allAds.filter(ad => { if (seen.has(ad.id)) return false; seen.add(ad.id); return true; });

    // Group by page_id to find pages with multiple active ads (= duplicating)
    const byPage = {};
    for (const ad of allAds) {
      const pid = ad.page_id || 'unknown';
      if (!byPage[pid]) byPage[pid] = { page_name: ad.page_name || pid, ads: [] };
      byPage[pid].ads.push(ad);
    }

    // Filter: only pages with >= min_dup active ads
    const duplicated = [];
    for (const [pid, group] of Object.entries(byPage)) {
      if (group.ads.length >= min_dup) {
        for (const ad of group.ads) {
          duplicated.push({ ...ad, _dup_count: group.ads.length, _page_id: pid });
        }
      }
    }

    if (duplicated.length === 0) {
      return res.json({ imported: 0, skipped: 0, total_scraped: allAds.length, errors, message: `No ads with ${min_dup}+ duplicates found` });
    }

    // Get or create target board
    const getBoardId = (cb) => {
      if (board_id) return cb(null, board_id);
      db.boards.findOne({ name: 'Meta Imports' }, (e, existing) => {
        if (existing) return cb(null, existing._id);
        db.boards.insert({ name: 'Meta Imports', emoji: '📥', count: 0, createdAt: Date.now() }, (e2, newB) => {
          cb(e2, newB ? newB._id : null);
        });
      });
    };

    getBoardId((berr, targetBoardId) => {
      if (berr || !targetBoardId) return res.status(500).json({ error: 'Could not find/create board' });

      let imported = 0, skipped = 0;
      let pending = duplicated.length;

      for (const ad of duplicated) {
        const body = (ad.ad_creative_bodies || [])[0] || '';
        const title = (ad.ad_creative_link_titles || [])[0] || '';
        const saveDoc = {
          ad_id: ad.id,
          page_id: ad._page_id,
          page_name: ad.page_name || ad._page_id,
          body: body.slice(0, 300),
          title: title.slice(0, 120),
          snapshot_url: ad.ad_snapshot_url || '',
          delivery_start: ad.ad_delivery_start_time || '',
          delivery_stop: ad.ad_delivery_stop_time || '',
          impressions: ad.impressions || {},
          spend: ad.spend || {},
          platforms: ad.publisher_platforms || [],
          languages: ad.languages || [],
          dup_count: ad._dup_count,
          board_id: targetBoardId,
          country,
          savedAt: Date.now(),
          source: 'meta_import',
        };

        // Check if already saved
        db.saved.findOne({ ad_id: ad.id }, (fe, found) => {
          if (found) {
            skipped++;
          } else {
            db.saved.insert(saveDoc, (ie) => { if (!ie) imported++; });
          }
          pending--;
          if (pending === 0) {
            // Update board count
            db.saved.count({ board_id: targetBoardId }, (ce, cnt) => {
              db.boards.update({ _id: targetBoardId }, { $set: { count: cnt || imported } }, {});
              res.json({
                imported,
                skipped,
                total_scraped: allAds.length,
                total_duplicated: duplicated.length,
                board_id: targetBoardId,
                errors: errors.length ? errors : undefined,
                message: `✅ ${imported} ads importées (dup ≥${min_dup}) dans le board "Meta Imports"`
              });
            });
          }
        });
      }
    });
  });
});

// GET /api/meta/saved — list all saved/imported ads with board info
app.get('/api/meta/saved', (req, res) => {
  const { board_id, source } = req.query;
  const query = {};
  if (board_id) query.board_id = board_id;
  if (source) query.source = source;
  db.saved.find(query).sort({ savedAt: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(docs);
  });
});

// GET /api/meta/check-token — debug token permissions
app.get('/api/meta/check-token', async (req, res) => {
  db.config.findOne({ key: 'fb_token' }, async (err, doc) => {
    if (!doc || !doc.value) return res.json({ ok: false, message: 'Pas de token configuré' });
    try {
      // Check /me
      const me = await fetchMeta('/me', { access_token: doc.value, fields: 'id,name' });
      if (me.error) return res.json({ ok: false, message: me.error.message, code: me.error.code });
      // Try a minimal ads_archive call
      const test = await fetchMeta('/ads_archive', {
        access_token: doc.value,
        search_terms: 'test',
        ad_reached_countries: '["DE"]',
        ad_active_status: 'ACTIVE',
        fields: 'id',
        limit: 1,
      });
      if (test.error) {
        return res.json({
          ok: false,
          user: me,
          permission_error: test.error.message,
          fix: 'Va sur https://developers.facebook.com/tools/explorer/ → sélectionne ton app → ajoute le scope "ads_read" → clique "Generate Access Token" → recolle le nouveau token dans ADSPY'
        });
      }
      res.json({ ok: true, user: me, ads_read: true, sample_count: (test.data||[]).length });
    } catch(e) { res.json({ ok: false, message: e.message }); }
  });
});

// ============================================================
// BOARDS API
// ============================================================

// GET /api/boards
app.get('/api/boards', (req, res) => {
  db.boards.find({}).sort({ createdAt: 1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: err.message });
    // Seed default boards if empty
    if (docs.length === 0) {
      const defaults = [
        { name: 'My Watchlist', emoji: '📋', count: 0, createdAt: Date.now() },
        { name: 'Competitors', emoji: '🏆', count: 0, createdAt: Date.now() + 1 },
        { name: 'Winners DE', emoji: '⚡', count: 0, createdAt: Date.now() + 2 },
        { name: 'Stress/Sleep Ads', emoji: '🧘', count: 0, createdAt: Date.now() + 3 },
      ];
      db.boards.insert(defaults, (e2, newDocs) => {
        res.json(newDocs);
      });
    } else {
      res.json(docs);
    }
  });
});

// POST /api/boards
app.post('/api/boards', (req, res) => {
  const { name, emoji = '📁' } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  db.boards.insert({ name, emoji, count: 0, createdAt: Date.now() }, (err, doc) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(doc);
  });
});

// DELETE /api/boards/:id
app.delete('/api/boards/:id', (req, res) => {
  db.boards.remove({ _id: req.params.id }, {}, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    db.saved.remove({ boardId: req.params.id }, { multi: true }, () => {
      res.json({ ok: true });
    });
  });
});

// ============================================================
// SAVED ITEMS API
// ============================================================

// GET /api/saved?boardId=...
app.get('/api/saved', (req, res) => {
  const query = req.query.boardId ? { boardId: req.query.boardId } : {};
  db.saved.find(query).sort({ savedAt: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(docs);
  });
});

// POST /api/saved
app.post('/api/saved', (req, res) => {
  const { boardId, type, data } = req.body; // type: 'ad' | 'store'
  if (!boardId || !type || !data) return res.status(400).json({ error: 'boardId, type, data required' });
  const item = { boardId, type, data, savedAt: Date.now() };
  db.saved.insert(item, (err, doc) => {
    if (err) return res.status(500).json({ error: err.message });
    // Update count
    db.boards.update({ _id: boardId }, { $inc: { count: 1 } }, {}, () => {});
    res.json(doc);
  });
});

// DELETE /api/saved/:id
app.delete('/api/saved/:id', (req, res) => {
  db.saved.findOne({ _id: req.params.id }, (err, doc) => {
    if (!doc) return res.status(404).json({ error: 'Not found' });
    db.saved.remove({ _id: req.params.id }, {}, (e2) => {
      db.boards.update({ _id: doc.boardId }, { $inc: { count: -1 } }, {}, () => {});
      res.json({ ok: true });
    });
  });
});

// ============================================================
// BRANDTRACKER API
// ============================================================

// GET /api/tracker
app.get('/api/tracker', (req, res) => {
  db.tracker.find({}).sort({ addedAt: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: err.message });
    // Seed if empty
    if (docs.length === 0) {
      const defaults = [
        { name: 'Natural Elements', domain: 'naturalelements.de', emoji: '🌿', pageId: null, active: 89, total: 340, visits: '120K', addedAt: Date.now() },
        { name: 'Trinkjello', domain: 'trinkjello.de', emoji: '⚗️', pageId: null, active: 28, total: 156, visits: '8.4K', addedAt: Date.now() + 1 },
        { name: 'Sauvai Cosmetics', domain: 'sauvai.com', emoji: '💧', pageId: null, active: 16, total: 626, visits: '897', addedAt: Date.now() + 2 },
        { name: 'Loop Earplugs', domain: 'loopearplugs.com', emoji: '🎵', pageId: null, active: 45, total: 309, visits: '3.2M', addedAt: Date.now() + 3 },
        { name: 'Blissy', domain: 'blissy.com', emoji: '😴', pageId: null, active: 85, total: 832, visits: '933K', addedAt: Date.now() + 4 },
      ];
      db.tracker.insert(defaults, (e2, newDocs) => res.json(newDocs));
    } else {
      res.json(docs);
    }
  });
});

// POST /api/tracker — add brand to track
app.post('/api/tracker', (req, res) => {
  const { name, domain, emoji = '🏷️', pageId = null } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  db.tracker.insert({ name, domain, emoji, pageId, active: 0, total: 0, visits: '—', addedAt: Date.now() }, (err, doc) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(doc);
  });
});

// DELETE /api/tracker/:id
app.delete('/api/tracker/:id', (req, res) => {
  db.tracker.remove({ _id: req.params.id }, {}, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

// ============================================================
// EXTENSION API — receive saved items from Chrome extension
// ============================================================
app.post('/api/extension/save', (req, res) => {
  const { type, source, data, boardId } = req.body;
  if (!data) return res.status(400).json({ error: 'data required' });
  
  // Auto-board if no boardId
  const targetBoardId = boardId || '__extension__';
  
  // Ensure extension board exists
  db.boards.findOne({ _id: '__extension__' }, (err, doc) => {
    const doSave = () => {
      db.saved.insert({ boardId: targetBoardId, type: type || 'ad', source, data, savedAt: Date.now() }, (e2, saved) => {
        db.boards.update({ _id: targetBoardId }, { $inc: { count: 1 } }, {}, () => {});
        res.json({ ok: true, id: saved._id });
      });
    };
    if (!doc) {
      db.boards.insert({ _id: '__extension__', name: 'Extension Saves', emoji: '🔌', count: 0, createdAt: Date.now() }, doSave);
    } else {
      doSave();
    }
  });
});

// GET /api/config
app.get('/api/config', (req, res) => {
  db.config.find({}, (err, docs) => {
    const cfg = {};
    docs.forEach(d => { cfg[d.key] = d.value; });
    // Never expose token value
    if (cfg.fb_token) cfg.fb_token = cfg.fb_token ? '***configured***' : null;
    res.json(cfg);
  });
});



// ============================================================
// START
// ============================================================
const PORT = 3004;
// Kill existing process on port
const { execSync } = require('child_process');
try { execSync(`lsof -ti:${PORT} | xargs kill -9 2>/dev/null`, { stdio: 'ignore' }); } catch(e) {}

setTimeout(() => {
  app.listen(PORT, () => {
    console.log(`✅ ADSPY PRO backend running on http://localhost:${PORT}`);
  });
}, 500);
