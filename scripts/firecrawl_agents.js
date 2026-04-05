#!/usr/bin/env node
/**
 * firecrawl_agents.js — Intégration Firecrawl pour scripts Node.js Clawdbot
 * Usage depuis n'importe quel script :
 *   const fc = require('./firecrawl_agents');
 *   const md = await fc.scrape('https://amazon.de/dp/...');
 *   const data = await fc.extract(url, 'Extrais prix, avis, ingrédients');
 */

require('dotenv').config({ path: `${process.env.HOME}/.openclaw/credentials/anthropic.env` });

const API_KEY = process.env.FIRECRAWL_API_KEY;
const BASE = 'https://api.firecrawl.dev/v1';

if (!API_KEY) {
  console.warn('⚠️ FIRECRAWL_API_KEY manquante — ajouter dans ~/.openclaw/credentials/anthropic.env');
}

// Headers communs
const headers = () => ({
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
});

/**
 * Scrape une URL → markdown LLM-ready
 */
async function scrape(url, opts = {}) {
  const res = await fetch(`${BASE}/scrape`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      url,
      formats: ['markdown'],
      onlyMainContent: opts.mainContent ?? true,
      ...opts
    })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Scrape failed');
  return data.data?.markdown || '';
}

/**
 * Extraction structurée LLM — retourne JSON
 * @param {string} url
 * @param {string} prompt — "Extrais: prix, note, ingrédients"
 * @param {object} schema — JSON Schema optionnel
 */
async function extract(url, prompt, schema = null) {
  const body = { urls: [url], prompt };
  if (schema) body.schema = schema;
  
  const res = await fetch(`${BASE}/extract`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Extract failed');
  return data.data;
}

/**
 * Search + scrape automatique (remplace web_search + web_fetch)
 * @param {string} query
 * @param {number} limit — nb de résultats (défaut 5)
 */
async function search(query, limit = 5) {
  const res = await fetch(`${BASE}/search`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      query,
      limit,
      scrapeOptions: { formats: ['markdown'], onlyMainContent: true }
    })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Search failed');
  return data.data || [];
}

/**
 * Crawl un site entier → tableau de pages markdown
 * @param {string} url
 * @param {number} limit — max pages
 */
async function crawl(url, limit = 20) {
  // Lancer le job
  const res = await fetch(`${BASE}/crawl`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      url, limit,
      scrapeOptions: { formats: ['markdown'], onlyMainContent: true }
    })
  });
  const job = await res.json();
  if (!job.id) throw new Error('Crawl job failed: ' + JSON.stringify(job));
  
  // Polling jusqu'à completion
  const jobId = job.id;
  let attempt = 0;
  while (attempt < 30) {
    await new Promise(r => setTimeout(r, 3000));
    const check = await fetch(`${BASE}/crawl/${jobId}`, { headers: headers() });
    const status = await check.json();
    if (status.status === 'completed') return status.data || [];
    if (status.status === 'failed') throw new Error('Crawl failed');
    attempt++;
    process.stderr.write(`⏳ Crawl: ${status.completed || 0}/${limit} pages...\r`);
  }
  throw new Error('Crawl timeout');
}

// ─── CAS D'USAGE SPÉCIFIQUES NELLIO ──────────────────────────────────────────

/**
 * Scrape les avis Amazon.de d'un produit concurrent
 * @param {string} asin — ex: "B0CHFSHGYM"
 */
async function scrapeAmazonReviews(asin) {
  const url = `https://www.amazon.de/product-reviews/${asin}?reviewerType=all_reviews&sortBy=recent`;
  const md = await scrape(url, { mainContent: true });
  return md;
}

/**
 * Scrape une landing page concurrent pour analyse copywriting
 */
async function scrapeLandingPage(url) {
  return await extract(url,
    'Extrais: titre principal (H1), sous-titre, proposition de valeur, prix, claims principaux (liste), CTA, garanties, preuves sociales (nombre avis, rating), ingrédients si présents'
  );
}

/**
 * Recherche de reviews Trustpilot.de pour un produit
 */
async function searchTrustpilotDE(brand) {
  return await search(`site:trustpilot.com/review ${brand} Bewertungen`, 3);
}

/**
 * Veille Meta Ad Library via Firecrawl search
 */
async function searchMetaAdLibraryDE(keyword) {
  return await search(`Meta Ad Library "${keyword}" Deutschland anti-stress Ashwagandha 2026`, 5);
}

module.exports = { scrape, extract, search, crawl, scrapeAmazonReviews, scrapeLandingPage, searchTrustpilotDE, searchMetaAdLibraryDE };

// ─── CLI direct ───────────────────────────────────────────────────────────────
if (require.main === module) {
  const [,, cmd, ...args] = process.argv;
  const fns = { scrape, extract, search, crawl };
  if (fns[cmd]) {
    fns[cmd](...args).then(r => console.log(typeof r === 'string' ? r : JSON.stringify(r, null, 2))).catch(e => { console.error('❌', e.message); process.exit(1); });
  } else {
    console.log('Usage: node firecrawl_agents.js [scrape|extract|search|crawl] <url/query> [extra]');
  }
}
