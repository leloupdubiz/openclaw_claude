#!/usr/bin/env python3
"""Patch loadStudioProjects() and add project management JS in index.html"""

HTML = '/Users/pc2/.openclaw/workspace/omnia/public/index.html'

OLD = """async function loadStudioProjects() {
  try {
    const r = await fetch('/api/projects/list');
    const projects = await r.json();
    const sel = document.getElementById('studioProjectSelect');
    if (!sel) return;
    sel.innerHTML = '<option value="">-- Sélectionner un projet --</option>' +
      projects.map(p => `<option value="${p.projectId}">${p.projectName}${p.clips?.length ? ' (' + p.clips.length + ' clips)' : ''}</option>`).join('');
  } catch(e) { console.warn('loadStudioProjects:', e); }
}"""

NEW = r"""// ── État projet actif dans Studio Clip ─────────────────────────
window.studioProject = {
  slug: 'nellio',
  product: 'Nellio UltraCalm',
  url: 'https://drinknellio.com',
  markets: ['DE'],
  budget: 65,
  coreAvatars: [
    { id:'A1', label:'\u{1F469}\u200D\u{1F4BC} A1 \u2014 Professionnelle Surcharg\u00e9e' },
    { id:'A2', label:'\u{1F469}\u200D\u{1F467} A2 \u2014 M\u00e8re en Surcharge' },
    { id:'A3', label:'\u{1F525} A3 \u2014 En Risque Burnout' },
    { id:'A4', label:'\u{1F9EC} A4 \u2014 Biohacker / Bien-\u00eatre' }
  ],
  angles: []
};

// ── Charger la liste de projets EVOLVE dans le sélecteur ────────
async function loadStudioProjects() {
  const evolveSelect = document.getElementById('studioEvolveProject');
  if (!evolveSelect) return;
  try {
    const r = await fetch('/api/evolve/universal/projects');
    const d = await r.json();
    const projects = d.projects || [];
    const current = evolveSelect.value;
    const opts = ['<option value="nellio">\u2b50 Nellio UltraCalm</option>']
      .concat(projects.map(p => `<option value="${p.slug}">${p.product || p.slug}</option>`));
    evolveSelect.innerHTML = opts.join('');
    if (current && evolveSelect.querySelector(`option[value="${current}"]`)) evolveSelect.value = current;
  } catch(e) { console.warn('loadStudioProjects (EVOLVE):', e); }

  // Legacy : projets clips vid\u00e9o
  try {
    const r2 = await fetch('/api/projects/list');
    const clips = await r2.json();
    const clipSel = document.getElementById('studioProjectSelect');
    if (clipSel) clipSel.innerHTML = '<option value="">-- Projet clip --</option>' +
      clips.map(p => `<option value="${p.projectId}">${p.projectName}</option>`).join('');
  } catch(e) {}
}

// ── Changement de projet EVOLVE \u2192 adapter tous les onglets ──────
async function onStudioProjectChange() {
  const evolveSelect = document.getElementById('studioEvolveProject');
  const slug = evolveSelect?.value || 'nellio';
  const badge = document.getElementById('studio-proj-badge');
  const ctx = document.getElementById('studio-proj-context');
  const sub = document.getElementById('studio-proj-sub');

  if (slug === 'nellio') {
    window.studioProject = {
      slug: 'nellio', product: 'Nellio UltraCalm',
      url: 'https://drinknellio.com', markets: ['DE'], budget: 65,
      coreAvatars: [
        { id:'A1', label:'\u{1F469}\u200D\u{1F4BC} A1 \u2014 Professionnelle Surcharg\u00e9e' },
        { id:'A2', label:'\u{1F469}\u200D\u{1F467} A2 \u2014 M\u00e8re en Surcharge' },
        { id:'A3', label:'\u{1F525} A3 \u2014 En Risque Burnout' },
        { id:'A4', label:'\u{1F9EC} A4 \u2014 Biohacker / Bien-\u00eatre' }
      ],
      angles: []
    };
    if (badge) badge.textContent = 'DE \u{1F1E9}\u{1F1EA}';
    if (sub) sub.textContent = 'Nellio UltraCalm \u00b7 UGC \u00b7 Animation \u00b7 B-Roll \u00b7 Images \u00b7 Cloner';
    if (ctx) ctx.innerHTML = '<span>\u{1F3AF} drinknellio.com</span><span>\u{1F48A} Ashwagandha \u00b7 L-Theanin \u00b7 Magnesium \u00b7 D3</span><span>\u2b50 4.8/5 \u00b7 20k Bewertungen</span><span>\u{1F4C5} Budget: 65\u20ac/j</span>';
    updateStudioAvatarSelects();
    return;
  }

  try {
    if (ctx) ctx.innerHTML = '<span style="color:var(--accent)">\u23f3 Chargement du projet...</span>';
    const r = await fetch(`/api/evolve/universal/projects/${slug}`);
    const meta = await r.json();
    const markets = Array.isArray(meta.markets) ? meta.markets : [meta.market || 'FR'];
    const flagMap = { DE:'\u{1F1E9}\u{1F1EA}', FR:'\u{1F1EB}\u{1F1F7}', EN:'\u{1F1EC}\u{1F1E7}', US:'\u{1F1FA}\u{1F1F8}', ES:'\u{1F1EA}\u{1F1F8}', IT:'\u{1F1EE}\u{1F1F9}' };
    window.studioProject = {
      slug, product: meta.product || slug,
      url: meta.url || '', markets, budget: meta.budget || 50,
      coreAvatars: (meta.avatars||[]).length ? meta.avatars : [{ id:'AV1', label:'\u{1F3AF} Avatar Principal' }],
      angles: meta.angles || []
    };
    const marketStr = markets.map(m => flagMap[m]||m).join(' ');
    if (badge) badge.textContent = marketStr;
    if (sub) sub.textContent = `${meta.product} \u00b7 UGC \u00b7 Animation \u00b7 B-Roll \u00b7 Images \u00b7 Cloner`;
    if (ctx) ctx.innerHTML = [
      `<span>\u{1F3AF} ${meta.url || slug}</span>`,
      `<span>\u{1F30D} March\u00e9: ${markets.join(', ')}</span>`,
      `<span>\u{1F4C5} Budget: ${meta.budget||'\u2014'}\u20ac/j</span>`,
      meta.description ? `<span>\u{1F4DD} ${meta.description.slice(0,80)}...</span>` : ''
    ].filter(Boolean).join('');
    updateStudioAvatarSelects();
  } catch(e) {
    if (ctx) ctx.innerHTML = `<span style="color:var(--error)">\u274c Erreur chargement projet</span>`;
    console.warn('onStudioProjectChange:', e);
  }
}

// ── Mise \u00e0 jour des s\u00e9lecteurs Avatar dans tous les onglets ─────
function updateStudioAvatarSelects() {
  const proj = window.studioProject;
  if (!proj) return;
  const coreAvatarSel = document.getElementById('clipCoreAvatar');
  if (coreAvatarSel && proj.coreAvatars?.length) {
    coreAvatarSel.innerHTML = proj.coreAvatars.map((a,i) =>
      `<option value="${a.id}" ${i===0?'selected':''}>${a.label}</option>`
    ).join('');
    if (typeof onCoreAvatarChange === 'function') onCoreAvatarChange();
  }
  const lfAvatarSel = document.getElementById('lfCoreAvatar') || document.getElementById('lfAvatarSelect');
  if (lfAvatarSel && proj.coreAvatars?.length) {
    lfAvatarSel.innerHTML = proj.coreAvatars.map((a,i) =>
      `<option value="${a.id}" ${i===0?'selected':''}>${a.label}</option>`
    ).join('');
  }
  const imgProdEl = document.getElementById('imgAdProduct');
  if (imgProdEl && !imgProdEl.value) imgProdEl.value = proj.product;
}"""

with open(HTML, 'r', encoding='utf-8') as f:
    content = f.read()

if OLD not in content:
    print('❌ OLD text not found')
    exit(1)

content = content.replace(OLD, NEW, 1)

with open(HTML, 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ patch_studio_js applied')
