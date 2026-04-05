#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Patch Studio Clip pour rendre avatars, sub-avatars, angles et image produit
100% dynamiques en fonction du projet EVOLVE sélectionné.
"""

HTML = '/Users/pc2/.openclaw/workspace/omnia/public/index.html'

with open(HTML, 'r', encoding='utf-8') as f:
    content = f.read()

errors = []

# ═══ PATCH 1 : onCoreAvatarChange project-aware ═══════════════════════════
OLD1 = (
    'function onCoreAvatarChange() {\n'
    '  const core = document.getElementById(\'clipCoreAvatar\').value;\n'
    '  const subs = SUB_AVATAR_MAP[core] || [];\n'
    '  const subSel = document.getElementById(\'clipSubAvatar\');\n'
    '  subSel.innerHTML = subs.map(s =>\n'
    '    `<option value="${s.value}" data-angle="${s.angle}" data-hook="${s.hook}">${s.label}</option>`\n'
    '  ).join(\'\');\n'
    '  // Default: last sub-avatar (most specific) or starred one\n'
    '  const starred = subs.findIndex(s => s.label.startsWith(\'\u2b50\'));\n'
    '  subSel.selectedIndex = starred >= 0 ? starred : subs.length - 1;\n'
    '  onSubAvatarChange();\n'
    '}'
)
NEW1 = (
    'function onCoreAvatarChange() {\n'
    '  const core = document.getElementById(\'clipCoreAvatar\').value;\n'
    '  const activeMap = window.STUDIO_AVATAR_MAP || SUB_AVATAR_MAP;\n'
    '  const subs = activeMap[core] || [];\n'
    '  const subSel = document.getElementById(\'clipSubAvatar\');\n'
    '  const subGroup = subSel ? subSel.closest(\'.form-group\') : null;\n'
    '  if (subs.length) {\n'
    '    subSel.innerHTML = subs.map(s =>\n'
    '      `<option value="${s.value}" data-angle="${s.angle}" data-hook="${s.hook}">${s.label}</option>`\n'
    '    ).join(\'\');\n'
    '    const starred = subs.findIndex(s => s.label.startsWith(\'\u2b50\'));\n'
    '    subSel.selectedIndex = starred >= 0 ? starred : subs.length - 1;\n'
    '    if (subGroup) subGroup.style.display = \'\';\n'
    '  } else {\n'
    '    subSel.innerHTML = \'\';\n'
    '    if (subGroup) subGroup.style.display = \'none\';\n'
    '  }\n'
    '  onSubAvatarChange();\n'
    '}'
)
if OLD1 in content:
    content = content.replace(OLD1, NEW1, 1)
    print('OK patch 1: onCoreAvatarChange')
else:
    errors.append('MISS patch 1: onCoreAvatarChange')

# ═══ PATCH 2 : updateAngleSelect project-aware ════════════════════════════
OLD2 = (
    'function updateAngleSelect(recommendedAngle) {\n'
    '  const sel = document.getElementById(\'clipAngle\');\n'
    '  const rec = ALL_ANGLES.find(a => a.value === recommendedAngle);\n'
    '  const others = ALL_ANGLES.filter(a => a.value !== recommendedAngle);\n'
    '  sel.innerHTML = `<optgroup label="\u2b50 Recommand\u00e9 pour ce sub-avatar">\n'
    '      <option value="${rec?.value || recommendedAngle}">${rec?.label || recommendedAngle} \u2b50</option>\n'
    '    </optgroup>\n'
    '    <optgroup label="\u2500\u2500 Autres angles \u2500\u2500">\n'
    '      ${others.map(a => `<option value="${a.value}">${a.label}</option>`).join(\'\')}\n'
    '    </optgroup>`;\n'
    '  sel.value = rec?.value || recommendedAngle;\n'
    '}'
)
NEW2 = (
    'function updateAngleSelect(recommendedAngle) {\n'
    '  const sel = document.getElementById(\'clipAngle\');\n'
    '  const activeAngles = (window.STUDIO_ANGLES && window.STUDIO_ANGLES.length) ? window.STUDIO_ANGLES : ALL_ANGLES;\n'
    '  const rec = activeAngles.find(a => a.value === recommendedAngle) || activeAngles[0];\n'
    '  const others = activeAngles.filter(a => a.value !== (rec?.value));\n'
    '  if (!rec) { if(sel) sel.innerHTML = \'\'; return; }\n'
    '  if(sel) sel.innerHTML = `<optgroup label="\u2b50 Recommand\u00e9">\n'
    '      <option value="${rec.value}">${rec.label} \u2b50</option>\n'
    '    </optgroup>\n'
    '    <optgroup label="\u2500\u2500 Autres angles \u2500\u2500">\n'
    '      ${others.map(a => `<option value="${a.value}">${a.label}</option>`).join(\'\')}\n'
    '    </optgroup>`;\n'
    '  if(sel) sel.value = rec.value;\n'
    '}'
)
if OLD2 in content:
    content = content.replace(OLD2, NEW2, 1)
    print('OK patch 2: updateAngleSelect')
else:
    errors.append('MISS patch 2: updateAngleSelect')

# ═══ PATCH 3 : injectPackagingPrompt project-aware ════════════════════════
OLD3_START = 'function injectPackagingPrompt() {\n  const packagingDesc = \'holding a single-serve'
OLD3_END = '  }\n}\n\n// Traduit le prompt'

if OLD3_START in content:
    start_idx = content.index(OLD3_START)
    end_idx = content.index(OLD3_END, start_idx) + len(OLD3_END)
    NEW3 = (
        'function injectPackagingPrompt() {\n'
        '  const proj = window.studioProject;\n'
        '  const packagingDesc = proj && proj.packagingDesc ? proj.packagingDesc :\n'
        '    \'holding a single-serve powder stick packet, vertical format matte satin foil, top strip soft pastel pink, \'\n'
        '    + \'main body gradient from medium ocean blue (#2E6EB5) to pastel teal (#B5DED8), brand name "nellio" in white lowercase rounded sans-serif near top, \'\n'
        '    + \'"ULTRA CALM" in large white bold uppercase, "Calming Drink Mix" below, small oval pale yellow badge \'\n'
        '    + \'"RASPBERRY LEMONADE FLAVORED" with raspberry and lemon illustrations, \'\n'
        '    + \'four white circle icons: KSM-66 Ashwagandha, L-Theanine, Magnesium Glycinate, Vitamin D3\';\n'
        '  const el = document.getElementById(\'clipVisualPrompt\');\n'
        '  if (el) el.value = (el.value ? el.value + \'\\n\\n\' : \'\') + packagingDesc;\n'
        '}\n\n// Traduit le prompt'
    )
    content = content[:start_idx] + NEW3 + content[end_idx:]
    print('OK patch 3: injectPackagingPrompt')
else:
    errors.append('MISS patch 3: injectPackagingPrompt')

# ═══ PATCH 4 : updateStudioAvatarSelects → version complète ══════════════
# Chercher la version simple ajoutée ce soir
OLD4_MARKER = '// \u2500\u2500 Mise \u00e0 jour des s\u00e9lecteurs Avatar dans tous les onglets \u2500\u2500\u2500\u2500\u2500\nfunction updateStudioAvatarSelects()'

if OLD4_MARKER in content:
    start_idx = content.index(OLD4_MARKER)
    # Trouver la fermeture de la fonction
    brace_count = 0
    i = content.index('{', start_idx)
    while i < len(content):
        if content[i] == '{': brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_idx = i + 1
                break
        i += 1

    NEW4 = '''// ── Parser markdown strategy → avatars + angles structurés ──────────────
function parseStrategyMarkdown(md) {
  const result = { coreAvatars: [], subAvatarMap: {}, angles: [] };
  // Core Avatars : ### Avatar #N : **Name** | age ans
  const avatarRe = /###\\s+Avatar\\s+#(\\d+)\\s*:\\s*\\*\\*([^*\\n|]+)\\*\\*\\s*\\|?\\s*(\\d+)?/gi;
  let m;
  while ((m = avatarRe.exec(md)) !== null) {
    const n=m[1], name=m[2].trim(), age=m[3]||'';
    const id='AV'+n;
    result.coreAvatars.push({ id, label: name + (age?' ('+age+'ans)':'') });
    const block = md.slice(m.index, m.index+700);
    const hookM = block.match(/[Mm]icro.insight[^:]*:\\s*([^\\n]+)/i);
    const hook = hookM ? hookM[1].trim().slice(0,90) : name;
    result.subAvatarMap[id] = [{ value:id, label:'\uD83D\uDC64 '+name, angle:'angle-0', hook }];
  }
  // Angles : ### Angle #N : **"Name"**
  const angleRe = /###\\s+Angle\\s+#?\\d+\\s*:\\s*\\*\\*[\\u201C"]?([^*"\\n\\u201D]+)[\\u201D"]?\\*\\*/gi;
  while ((m = angleRe.exec(md)) !== null) {
    const name=m[1].trim();
    const block=md.slice(m.index,m.index+600);
    const scoreM=block.match(/Score[^:]*(\\d+)/i);
    const hookM=block.match(/Hook[^:]*FR[^:]*:\\s*\\*([^*\\n]+)\\*/i)||block.match(/Hook[^:]*:\\s*\\*([^*\\n]+)\\*/i);
    const score=scoreM?parseInt(scoreM[1]):70;
    const hookLabel=hookM?hookM[1].trim().slice(0,90):name;
    const id='angle-'+result.angles.length;
    result.angles.push({ value:id, label: score+'/100 · '+name+' — "'+hookLabel+'"', score });
  }
  result.angles.sort((a,b)=>b.score-a.score);
  // Assigner angles recommandés aux core avatars
  result.coreAvatars.forEach((av,i) => {
    const best = result.angles[i] || result.angles[0];
    if (best && result.subAvatarMap[av.id]) result.subAvatarMap[av.id][0].angle = best.value;
  });
  return result;
}

// ── Charger stratégie et adapter tous les selects ────────────────────────
async function loadProjectStrategyData(slug) {
  window.STUDIO_AVATAR_MAP = null;
  window.STUDIO_ANGLES = null;
  if (slug === 'nellio') {
    window.STUDIO_AVATAR_MAP = SUB_AVATAR_MAP;
    window.STUDIO_ANGLES = ALL_ANGLES;
    updateStudioAvatarSelects();
    return;
  }
  try {
    let md = '';
    for (const phase of ['strategy','research']) {
      const r = await fetch('/api/evolve/universal/phase/'+slug+'/'+phase);
      const d = await r.json();
      if (d.output && d.output.length > 200) { md = d.output; break; }
    }
    if (!md) {
      window.STUDIO_AVATAR_MAP = { 'AV1': [{ value:'AV1', label:'\uD83C\uDFAF Avatar Principal', angle:'angle-0', hook: (window.studioProject?.product||'') }] };
      window.STUDIO_ANGLES = [{ value:'angle-0', label:'\uD83C\uDFAF Angle principal — lancez Phase 2 Strategy pour les angles complets', score:70 }];
      const ctx=document.getElementById('studio-proj-context');
      if(ctx) ctx.innerHTML += ' <span style="color:var(--warning)">\u26A0\uFE0F Phase Strategy non générée — avatars et angles placeholder</span>';
    } else {
      const parsed = parseStrategyMarkdown(md);
      window.STUDIO_AVATAR_MAP = parsed.subAvatarMap;
      window.STUDIO_ANGLES = parsed.angles;
      if(window.studioProject) {
        window.studioProject.coreAvatars = parsed.coreAvatars;
        window.studioProject.angles = parsed.angles;
      }
    }
    updateStudioAvatarSelects();
  } catch(e) { console.warn('loadProjectStrategyData:',e); updateStudioAvatarSelects(); }
}

// ── Mise à jour de tous les selects avec données du projet actif ─────────
function updateStudioAvatarSelects() {
  const proj = window.studioProject;
  if (!proj) return;
  const coreAvatars = proj.coreAvatars || [];
  ['clipCoreAvatar','lfCoreAvatar','lfAvatarSelect'].forEach(function(id) {
    const sel = document.getElementById(id);
    if (sel && coreAvatars.length) {
      sel.innerHTML = coreAvatars.map(function(a,i) {
        return '<option value="'+a.id+'" '+(i===0?'selected':'')+'>'+a.label+'</option>';
      }).join('');
    }
  });
  if (typeof onCoreAvatarChange === 'function') onCoreAvatarChange();
  const imgProdEl = document.getElementById('imgAdProduct');
  if (imgProdEl) imgProdEl.value = proj.product || '';
  const imgBadge = document.getElementById('studio-product-img');
  if (imgBadge) { imgBadge.src = proj.productImageUrl||''; imgBadge.style.display = proj.productImageUrl?'':'none'; }
}'''

    content = content[:start_idx] + NEW4 + content[end_idx:]
    print('OK patch 4: updateStudioAvatarSelects + loadProjectStrategyData')
else:
    errors.append('MISS patch 4: updateStudioAvatarSelects')

# ═══ PATCH 5 : onStudioProjectChange appelle loadProjectStrategyData ══════
OLD5 = (
    '    await loadProjectStrategyData(\'nellio\');\n'
    '    return;\n'
    '  }\n'
    '\n'
    '  try {\n'
    '    if (ctx) ctx.innerHTML = \'<span style="color:var(--accent)">\u23f3 Chargement du projet...</span>\';\n'
    '    // Utilise la liste (endpoint actif) et filtre par slug \u2014 pas besoin de red\u00e9marrer OMNIA'
)
if OLD5 not in content:
    # version sans loadProjectStrategyData (avant patch)
    OLD5b = (
        '    updateStudioAvatarSelects();\n'
        '    return;\n'
        '  }\n'
        '\n'
        '  try {\n'
        '    if (ctx) ctx.innerHTML = \'<span style="color:var(--accent)">\u23f3 Chargement du projet...</span>\';\n'
        '    // Utilise la liste (endpoint actif) et filtre par slug \u2014 pas besoin de red\u00e9marrer OMNIA'
    )
    NEW5 = (
        '    await loadProjectStrategyData(\'nellio\');\n'
        '    return;\n'
        '  }\n'
        '\n'
        '  try {\n'
        '    if (ctx) ctx.innerHTML = \'<span style="color:var(--accent)">\u23f3 Chargement du projet...</span>\';\n'
        '    // Utilise la liste (endpoint actif) et filtre par slug \u2014 pas besoin de red\u00e9marrer OMNIA'
    )
    if OLD5b in content:
        content = content.replace(OLD5b, NEW5, 1)
        print('OK patch 5a: onStudioProjectChange Nellio branch')
    else:
        errors.append('MISS patch 5: onStudioProjectChange Nellio branch')
else:
    print('OK patch 5 already applied')

# ═══ PATCH 6 : fin onStudioProjectChange → appelle loadProjectStrategyData ═══
OLD6 = (
    '    updateStudioAvatarSelects();\n'
    '  } catch(e) {\n'
    '    if (ctx) ctx.innerHTML = `<span style="color:var(--error)">\u274c Erreur chargement projet : ${e.message}</span>`;\n'
    '    console.warn(\'onStudioProjectChange:\', e);\n'
    '  }\n'
    '}'
)
NEW6 = (
    '    await loadProjectStrategyData(slug);\n'
    '  } catch(e) {\n'
    '    if (ctx) ctx.innerHTML = `<span style="color:var(--error)">\u274c Chargement \u00e9chou\u00e9: ${e.message}</span>`;\n'
    '    console.warn(\'onStudioProjectChange:\', e);\n'
    '  }\n'
    '}'
)
if OLD6 in content:
    content = content.replace(OLD6, NEW6, 1)
    print('OK patch 6: onStudioProjectChange end → loadProjectStrategyData')
else:
    # try simpler version
    OLD6b = (
        '    updateStudioAvatarSelects();\n'
        '  } catch(e) {\n'
        '    if (ctx) ctx.innerHTML = `<span style="color:var(--error)">\u274c Erreur chargement projet</span>`;\n'
        '    console.warn(\'onStudioProjectChange:\', e);\n'
        '  }\n'
        '}'
    )
    if OLD6b in content:
        content = content.replace(OLD6b, NEW6, 1)
        print('OK patch 6b: onStudioProjectChange end')
    else:
        errors.append('MISS patch 6: onStudioProjectChange end')

# ═══ PATCH 7 : studioProject init avec packagingDesc + productImageUrl ════
NELLIO_INIT_MARKER = "slug: 'nellio',\n  product: 'Nellio UltraCalm',"
PACK_MARKER = "packagingDesc:"
if NELLIO_INIT_MARKER in content and PACK_MARKER not in content:
    idx = content.index(NELLIO_INIT_MARKER)
    # Find the closing }; of this object
    brace_start = content.index('{', max(0, idx-50))
    bc = 0
    i = brace_start
    while i < len(content):
        if content[i]=='{': bc+=1
        elif content[i]=='}':
            bc-=1
            if bc==0:
                old_block = content[brace_start:i+1]
                insertion = (
                    "  productImageUrl: '/assets/brand/nellio_16.png',\n"
                    "  packagingDesc: 'holding a single-serve powder stick packet, vertical format matte satin foil, "
                    "top strip soft pastel pink, main body gradient from medium ocean blue (#2E6EB5) to pastel teal "
                    "(#B5DED8), brand name \"nellio\" in white lowercase rounded sans-serif near top, \"ULTRA CALM\" "
                    "in large white bold uppercase, \"Calming Drink Mix\" below, small oval pale yellow badge "
                    "\"RASPBERRY LEMONADE FLAVORED\" with raspberry and lemon illustrations, four white circle icons: "
                    "KSM-66 Ashwagandha, L-Theanine, Magnesium Glycinate, Vitamin D3',\n"
                )
                # Insert after first property line
                first_nl = old_block.index('\n') + 1
                new_block = old_block[:first_nl] + insertion + old_block[first_nl:]
                content = content[:brace_start] + new_block + content[i+1:]
                print('OK patch 7: studioProject packagingDesc')
                break
        i+=1
else:
    if PACK_MARKER in content:
        print('OK patch 7: packagingDesc already present')
    else:
        errors.append('MISS patch 7: studioProject init')

with open(HTML, 'w', encoding='utf-8') as f:
    f.write(content)

print()
if errors:
    for e in errors: print('  ERROR:', e)
else:
    print('All patches applied successfully.')
