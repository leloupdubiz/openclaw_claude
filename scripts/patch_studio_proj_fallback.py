#!/usr/bin/env python3
"""
Fix onStudioProjectChange : use /api/evolve/universal/projects (list, already active)
instead of /api/evolve/universal/projects/:slug (new endpoint, needs server restart)
"""
HTML = '/Users/pc2/.openclaw/workspace/omnia/public/index.html'

OLD = """  // Projet EVOLVE Universel
  try {
    if (ctx) ctx.innerHTML = '<span style="color:var(--accent)">\u23f3 Chargement du projet...</span>';
    const r = await fetch(`/api/evolve/universal/projects/${slug}`);
    const meta = await r.json();"""

NEW = """  // Projet EVOLVE Universel
  try {
    if (ctx) ctx.innerHTML = '<span style="color:var(--accent)">\u23f3 Chargement du projet...</span>';
    // Utilise la liste (endpoint déjà actif) et filtre par slug
    const r = await fetch('/api/evolve/universal/projects');
    const listData = await r.json();
    const meta = (listData.projects || []).find(p => p.slug === slug) || {};
    if (!meta.slug) throw new Error('Projet non trouvé dans la liste');"""

with open(HTML, 'r', encoding='utf-8') as f:
    content = f.read()

if OLD not in content:
    print('❌ OLD text not found — trying byte search')
    # Try to find it
    idx = content.find('Projet EVOLVE Universel')
    print(f'Found at index: {idx}')
    print(repr(content[idx:idx+300]))
    exit(1)

content = content.replace(OLD, NEW, 1)
with open(HTML, 'w', encoding='utf-8') as f:
    f.write(content)
print('✅ patch_studio_proj_fallback applied')
