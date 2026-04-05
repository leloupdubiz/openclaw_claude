#!/usr/bin/env python3
"""
Patch Studio Clip pour rendre avatars, sub-avatars, angles et image produit
100% dynamiques en fonction du projet EVOLVE sélectionné.
"""

HTML = '/Users/pc2/.openclaw/workspace/omnia/public/index.html'

# ── Patch 1 : rendre onCoreAvatarChange et updateAngleSelect project-aware ──────
OLD1 = """function onCoreAvatarChange() {
  const core = document.getElementById('clipCoreAvatar').value;
  const subs = SUB_AVATAR_MAP[core] || [];
  const subSel = document.getElementById('clipSubAvatar');
  subSel.innerHTML = subs.map(s =>
    `<option value="${s.value}" data-angle="${s.angle}" data-hook="${s.hook}">${s.label}</option>`
  ).join('');
  // Default: last sub-avatar (most specific) or starred one
  const starred = subs.findIndex(s => s.label.startsWith('\u2b50'));
  subSel.selectedIndex = starred >= 0 ? starred : subs.length - 1;
  onSubAvatarChange();
}"""

NEW1 = """function onCoreAvatarChange() {
  const core = document.getElementById('clipCoreAvatar').value;
  // Utilise les avatars du projet actif (STUDIO_AVATAR_MAP) ou Nellio par défaut
  const activeMap = window.STUDIO_AVATAR_MAP || SUB_AVATAR_MAP;
  const subs = activeMap[core] || [];
  const subSel = document.getElementById('clipSubAvatar');
  if (subs.length) {
    subSel.innerHTML = subs.map(s =>
      `<option value="${s.value}" data-angle="${s.angle}" data-hook="${s.hook}">${s.label}</option>`
    ).join('');
    const starred = subs.findIndex(s => s.label.startsWith('\u2b50'));
    subSel.selectedIndex = starred >= 0 ? starred : subs.length - 1;
    document.querySelector('.form-group:has(#clipSubAvatar)').style.display = '';
  } else {
    // Pas de sub-avatars pour ce projet → cacher le select
    subSel.innerHTML = '';
    const subGroup = document.querySelector('.form-group:has(#clipSubAvatar)');
    if (subGroup) subGroup.style.display = 'none';
  }
  onSubAvatarChange();
}"""

# ── Patch 2 : updateAngleSelect project-aware ──────────────────────────────────
OLD2 = """function updateAngleSelect(recommendedAngle) {
  const sel = document.getElementById('clipAngle');
  const rec = ALL_ANGLES.find(a => a.value === recommendedAngle);
  const others = ALL_ANGLES.filter(a => a.value !== recommendedAngle);
  sel.innerHTML = `<optgroup label="\u2b50 Recommand\u00e9 pour ce sub-avatar">
      <option value="${rec?.value || recommendedAngle}">${rec?.label || recommendedAngle} \u2b50</option>
    </optgroup>
    <optgroup label="\u2500\u2500 Autres angles \u2500\u2500">
      ${others.map(a => `<option value="${a.value}">${a.label}</option>`).join('')}
    </optgroup>`;
  sel.value = rec?.value || recommendedAngle;
}"""

NEW2 = """function updateAngleSelect(recommendedAngle) {
  const sel = document.getElementById('clipAngle');
  // Utilise les angles du projet actif (STUDIO_ANGLES) ou Nellio par défaut
  const activeAngles = window.STUDIO_ANGLES && window.STUDIO_ANGLES.length ? window.STUDIO_ANGLES : ALL_ANGLES;
  const rec = activeAngles.find(a => a.value === recommendedAngle) || activeAngles[0];
  const others = activeAngles.filter(a => a.value !== (rec?.value || recommendedAngle));
  if (!rec) { sel.innerHTML = ''; return; }
  sel.innerHTML = `<optgroup label="\u2b50 Recommand\u00e9">
      <option value="${rec.value}">${rec.label} \u2b50</option>
    </optgroup>
    <optgroup label="\u2500\u2500 Autres angles \u2500\u2500">
      ${others.map(a => `<option value="${a.value}">${a.label}</option>`).join('')}
    </optgroup>`;
  sel.value = rec.value;
}"""

# ── Patch 3 : injectPackagingPrompt project-aware ─────────────────────────────
OLD3 = """function injectPackagingPrompt() {
  const packagingDesc = 'holding a single-serve powder stick packet, vertical format matte satin foil, top strip soft pastel pink, main body gradient from medium ocean blue (#2E6EB5) to pastel teal (#B5DED8), brand name "nellio" in white lowercase rounded sans-serif near top, "ULTRA CALM" in large white bold uppercase, "Calming Drink Mix" below, small oval pale yellow badge "RASPBERRY LEMONADE FLAVORED" with raspberry and lemon illustrations, four white circle icons: KSM-66 Ashwagandha, L-Theanine, Magnesium Glycinate, Vitamin D3';
  const el = document.getElementById('clipVisualPrompt');
  if (el && !el.value.includes('nellio')) {
    el.value = (el.value ? el.value + '\\n\\n' : '') + packagingDesc;
  }
}"""

NEW3 = """function injectPackagingPrompt() {
  // Utilise la description packaging du projet actif
  const proj = window.studioProject;
  const packagingDesc = proj?.packagingDesc ||
    'holding a single-serve powder stick packet, vertical format matte satin foil, top strip soft pastel pink, main body gradient from medium ocean blue (#2E6EB5) to pastel teal (#B5DED8), brand name "nellio" in white lowercase rounded sans-serif near top, "ULTRA CALM" in large white bold uppercase, "Calming Drink Mix" below, small oval pale yellow badge "RASPBERRY LEMONADE FLAVORED" with raspberry and lemon illustrations, four white circle icons: KSM-66 Ashwagandha, L-Theanine, Magnesium Glycinate, Vitamin D3';
  const el = document.getElementById('clipVisualPrompt');
  if (el) {
    el.value = (el.value ? el.value + '\\n\\n' : '') + packagingDesc;
  }
}"""

# ── Patch 4 : Ajouter loadProjectStrategyData + update updateStudioAvatarSelects ──
# Remplacer updateStudioAvatarSelects (ajouté ce soir) avec version complète
OLD4 = """// \u2500\u2500 Mise \u00e0 jour des s\u00e9lecteurs Avatar dans tous les onglets \u2500\u2500\u2500\u2500\u2500
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

NEW4 = """// \u2500\u2500 Parser markdown strategy \u2192 avatars + angles structur\u00e9s \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function parseStrategyMarkdown(md) {
  const result = { coreAvatars: [], subAvatarMap: {}, angles: [] };

  // \u2014 Core Avatars : ### Avatar #N : **Name** | age ans
  const avatarRe = /###\s+Avatar\s+#(\d+)\s*:\s*\*\*([^*\n|]+)\*\*\s*\|?\s*(\d+)?\s*ans?/gi;
  let m;
  while ((m = avatarRe.exec(md)) !== null) {
    const n = m[1], name = m[2].trim(), age = m[3] || '';
    const id = 'AV' + n;
    result.coreAvatars.push({ id, label: `\ud83e\uddd1 ${name}${age?' · '+age+' ans':''}` });
    // Sub-avatar = le core lui-même + extraire le Primary Desire
    const desireMatch = md.slice(m.index, m.index + 600).match(/Primary Desire\*\*\s*:\s*([^\n\-]+)/i);
    const hookMatch   = md.slice(m.index, m.index + 600).match(/[Mm]icro.insight[^:]*:\s*([^\n]+)/i);
    const desire = desireMatch ? desireMatch[1].trim().slice(0,80) : name;
    const hook   = hookMatch   ? hookMatch[1].trim().replace(/\u00b7[^$]*/,'').trim().slice(0,80) : desire;
    result.subAvatarMap[id] = [
      { value: id, label: `\ud83d\udc64 ${name} (core)`, angle: 'A1', hook }
    ];
  }

  // \u2014 Angles : ### Angle #N : **"Name"** ou ### N. **"Name"**
  const angleRe = /###\s+Angle\s+#?\d+\s*:\s*\*\*["\u201c]?([^*"\n\u201d]+)["\u201d]?\*\*/gi;
  let scoreBlock = md;
  while ((m = angleRe.exec(md)) !== null) {
    const name = m[1].trim();
    const block = md.slice(m.index, m.index + 600);
    const scoreMatch = block.match(/Score[^:]*:\s*(\d+)/i);
    const hookMatch  = block.match(/Hook[^:]*FR[^:]*:\s*\*([^*\n]+)\*/i) ||
                       block.match(/Hook[^:]*:\s*\*([^*\n]+)\*/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;
    const hookLabel = hookMatch ? hookMatch[1].trim().slice(0,90) : name;
    const id = 'angle-' + name.toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,20);
    // Assigner l'angle recommand\u00e9 au premier sub-avatar de chaque core
    if (result.subAvatarMap[result.coreAvatars[result.angles.length % result.coreAvatars.length]?.id]) {
      const cid = result.coreAvatars[result.angles.length % result.coreAvatars.length].id;
      if (result.angles.length === 0 || result.subAvatarMap[cid][0].angle === 'A1')
        result.subAvatarMap[cid][0].angle = id;
    }
    result.angles.push({ value: id, label: `\ud83c\udfaf ${score}/100 \u00b7 ${name} \u2014 "${hookLabel}"`, score });
  }

  // Trier angles par score desc
  result.angles.sort((a,b) => b.score - a.score);

  // Assigner angles recommand\u00e9s aux sub-avatars de fa\u00e7on distribu\u00e9e
  const topAngles = result.angles.slice(0, result.coreAvatars.length);
  result.coreAvatars.forEach((av, i) => {
    const subs = result.subAvatarMap[av.id] || [];
    subs.forEach(s => { if (s.angle === 'A1' && topAngles[i]) s.angle = topAngles[i].value; });
  });

  return result;
}

// \u2500\u2500 Charger les donn\u00e9es strategy du projet et adapter tous les selects \u2500\u2500\u2500\u2500
async function loadProjectStrategyData(slug) {
  // R\u00e9init globals pour ce projet
  window.STUDIO_AVATAR_MAP = null;
  window.STUDIO_ANGLES = null;

  if (slug === 'nellio') {
    // Nellio : utiliser les maps hardcod\u00e9es
    window.STUDIO_AVATAR_MAP = SUB_AVATAR_MAP;
    window.STUDIO_ANGLES = ALL_ANGLES;
    updateStudioAvatarSelects();
    return;
  }

  try {
    // Essayer strategy d'abord, puis research si pas disponible
    let md = '';
    for (const phase of ['strategy','research']) {
      const r = await fetch(`/api/evolve/universal/phase/${slug}/${phase}`);
      const d = await r.json();
      if (d.output && d.output.length > 200) { md = d.output; break; }
    }

    if (!md) {
      // Pas de phase g\u00e9n\u00e9r\u00e9e encore \u2192 placeholder
      window.STUDIO_AVATAR_MAP = { 'AV1': [{ value:'AV1', label:'\ud83c\udfaf Avatar Principal', angle:'angle-main', hook: window.studioProject?.product + ' \u2014 solution id\u00e9ale' }] };
      window.STUDIO_ANGLES = [{ value:'angle-main', label:'\ud83c\udfaf Angle principal \u2014 \u00e0 d\u00e9finir via Phase 2 Strategy' }];
      const ctx = document.getElementById('studio-proj-context');
      if (ctx) ctx.innerHTML += ' <span style="color:var(--warning)">\u26a0\ufe0f Phase Strategy non encore g\u00e9n\u00e9r\u00e9e \u2014 lance la Phase 2 dans EVOLVE pour avoir les avatars complets</span>';
    } else {
      const parsed = parseStrategyMarkdown(md);
      window.STUDIO_AVATAR_MAP = parsed.subAvatarMap;
      window.STUDIO_ANGLES = parsed.angles;
      // Enrichir studioProject avec les donn\u00e9es pars\u00e9es
      window.studioProject.coreAvatars = parsed.coreAvatars;
      window.studioProject.angles = parsed.angles;
    }
    updateStudioAvatarSelects();
  } catch(e) {
    console.warn('loadProjectStrategyData:', e);
    updateStudioAvatarSelects();
  }
}

// \u2500\u2500 Mise \u00e0 jour de tous les selects avec les donn\u00e9es du projet actif \u2500\u2500\u2500\u2500\u2500
function updateStudioAvatarSelects() {
  const proj = window.studioProject;
  if (!proj) return;

  // \u2014 Core Avatar select (UGC + Long Form)
  const coreAvatars = proj.coreAvatars || [];
  ['clipCoreAvatar','lfCoreAvatar','lfAvatarSelect'].forEach(id => {
    const sel = document.getElementById(id);
    if (sel && coreAvatars.length) {
      sel.innerHTML = coreAvatars.map((a,i) =>
        `<option value="${a.id}" ${i===0?'selected':''}>${a.label}</option>`
      ).join('');
    }
  });

  // \u2014 D\u00e9clencher la cascade Core \u2192 Sub \u2192 Angle
  if (typeof onCoreAvatarChange === 'function') onCoreAvatarChange();

  // \u2014 Champ produit dans le g\u00e9n\u00e9rateur image
  const imgProdEl = document.getElementById('imgAdProduct');
  if (imgProdEl) imgProdEl.value = proj.product || '';

  // \u2014 Mettre \u00e0 jour le badge image produit
  const imgBadge = document.getElementById('studio-product-img');
  if (imgBadge) {
    if (proj.productImageUrl) {
      imgBadge.src = proj.productImageUrl;
      imgBadge.style.display = '';
    } else {
      imgBadge.style.display = 'none';
    }
  }

  // \u2014 Long Form : champ produit
  const lfProd = document.getElementById('lfProduct') || document.getElementById('lfProductName');
  if (lfProd) lfProd.value = proj.product || '';
}"""

# ── Patch 5 : onStudioProjectChange appelle loadProjectStrategyData ──────────
OLD5 = """    updateStudioAvatarSelects();
    return;
  }

  try {
    if (ctx) ctx.innerHTML = '<span style="color:var(--accent)">\u23f3 Chargement du projet...</span>';
    // Utilise la liste (endpoint actif) et filtre par slug \u2014 pas besoin de red\u00e9marrer OMNIA"""

NEW5 = """    await loadProjectStrategyData('nellio');
    return;
  }

  try {
    if (ctx) ctx.innerHTML = '<span style="color:var(--accent)">\u23f3 Chargement du projet...</span>';
    // Utilise la liste (endpoint actif) et filtre par slug \u2014 pas besoin de red\u00e9marrer OMNIA"""

OLD6 = """    updateStudioAvatarSelects();
  } catch(e) {
    if (ctx) ctx.innerHTML = `<span style="color:var(--error)">\u274c Erreur chargement projet</span>`;
    console.warn('onStudioProjectChange:', e);
  }
}"""

NEW6 = """    await loadProjectStrategyData(slug);
  } catch(e) {
    if (ctx) ctx.innerHTML = `<span style="color:var(--error)">\u274c Erreur chargement projet : ${e.message}</span>`;
    console.warn('onStudioProjectChange:', e);
  }
}"""

# ── Patch 6 : Nellio studioProject init avec packagingDesc + productImageUrl ──
OLD7 = """window.studioProject = {
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
};"""

NEW7 = """window.studioProject = {
  slug: 'nellio',
  product: 'Nellio UltraCalm',
  url: 'https://drinknellio.com',
  markets: ['DE'],
  budget: 65,
  productImageUrl: '/assets/brand/nellio_16.png',
  packagingDesc: 'holding a single-serve powder stick packet, vertical format matte satin foil, top strip soft pastel pink, main body gradient from medium ocean blue (#2E6EB5) to pastel teal (#B5DED8), brand name "nellio" in white lowercase rounded sans-serif near top, "ULTRA CALM" in large white bold uppercase, "Calming Drink Mix" below, small oval pale yellow badge "RASPBERRY LEMONADE FLAVORED" with raspberry and lemon illustrations, four white circle icons: KSM-66 Ashwagandha, L-Theanine, Magnesium Glycinate, Vitamin D3',
  coreAvatars: [
    { id:'A1', label:'\u{1F469}\u200D\u{1F4BC} A1 \u2014 Professionnelle Surcharg\u00e9e' },
    { id:'A2', label:'\u{1F469}\u200D\u{1F467} A2 \u2014 M\u00e8re en Surcharge' },
    { id:'A3', label:'\u{1F525} A3 \u2014 En Risque Burnout' },
    { id:'A4', label:'\u{1F9EC} A4 \u2014 Biohacker / Bien-\u00eatre' }
  ],
  angles: []
};"""

patches = [
    (OLD1, NEW1, 'onCoreAvatarChange project-aware'),
    (OLD2, NEW2, 'updateAngleSelect project-aware'),
    (OLD3, NEW3, 'injectPackagingPrompt project-aware'),
    (OLD4, NEW4, 'loadProjectStrategyData + updateStudioAvatarSelects'),
    (OLD5, NEW5, 'onStudioProjectChange → loadProjectStrategyData Nellio'),
    (OLD6, NEW6, 'onStudioProjectChange → loadProjectStrategyData generic'),
    (OLD7, NEW7, 'studioProject init with packagingDesc + productImageUrl'),
]

with open(HTML, 'r', encoding='utf-8') as f:
    content = f.read()

for old, new, label in patches:
    if old in content:
        content = content.replace(old, new, 1)
        print(f'✅ {label}')
    else:
        print(f'❌ NOT FOUND: {label}')

with open(HTML, 'w', encoding='utf-8') as f:
    f.write(content)

print('\nDone.')
