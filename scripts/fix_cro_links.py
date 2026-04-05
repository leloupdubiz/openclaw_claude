#!/usr/bin/env python3
"""
Répare les liens transcript morts dans les résumés CRO EVOLVE.
- Supprime les anciens liens cassés
- Cherche le bon fichier _formatted.md par correspondance de titre
- Insère le lien correct URL-encodé
"""
import os, re, glob, urllib.parse

WORKSPACE = "/Users/pc2/.openclaw/workspace"
CRO_SUMMARIES = f"{WORKSPACE}/formations/cro-evolve/summaries"
CRO_TRANSCRIPTS = f"{WORKSPACE}/formations/cro-evolve/transcripts"
LIBRARY_BASE = "http://localhost:4242/view?path="

# Indexer tous les fichiers _formatted.md disponibles
formatted_files = {}
for f in glob.glob(f"{CRO_TRANSCRIPTS}/*_formatted.md"):
    name = os.path.basename(f)
    # Clé = version normalisée (lowercase, sans ponctuation)
    key = re.sub(r'[^a-z0-9]', '', name.lower().replace('_formatted.md', ''))
    formatted_files[key] = name

def normalize(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

def find_formatted(summary_basename):
    """Trouve le fichier _formatted.md correspondant à un résumé."""
    slug = summary_basename.replace('.md', '')
    slug_norm = normalize(slug)
    
    # 1. Correspondance exacte normalisée
    if slug_norm in formatted_files:
        return formatted_files[slug_norm]
    
    # 2. Correspondance partielle — les mots clés du résumé dans le nom du transcript
    slug_words = set(re.sub(r'[^a-z0-9 ]', ' ', slug.lower()).split())
    slug_words -= {'the', 'a', 'an', 'of', 'to', 'is', 'in', 'and', 'how', 'for', 'your'}
    
    best_score = 0
    best_match = None
    for key, fname in formatted_files.items():
        fname_words = set(re.sub(r'[^a-z0-9 ]', ' ', fname.lower()).split())
        common = slug_words & fname_words
        if len(common) > best_score:
            best_score = len(common)
            best_match = fname
    
    if best_score >= 2:
        return best_match
    
    # 3. Sous-chaîne
    for key, fname in formatted_files.items():
        if slug_norm[:10] in key or key[:10] in slug_norm:
            return fname
    
    return None

fixed = 0
not_found = []

for sf in sorted(glob.glob(f"{CRO_SUMMARIES}/*.md")):
    with open(sf, encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Supprimer toute ligne commençant par > 📝 (lien transcript existant, correct ou cassé)
    clean = re.sub(r'^> 📝 .*\n?', '', content, flags=re.MULTILINE)
    
    # Trouver le bon fichier formaté
    basename = os.path.basename(sf)
    formatted_name = find_formatted(basename)
    
    if formatted_name:
        # URL-encoder le chemin (pour les espaces et caractères spéciaux)
        rel_path = f"formations/cro-evolve/transcripts/{formatted_name}"
        encoded = urllib.parse.quote(rel_path, safe='/:?=')
        link_line = f"> 📝 [Transcript formaté]({LIBRARY_BASE}{encoded})\n"
        new_content = link_line + "\n" + clean.lstrip('\n')
        
        with open(sf, 'w', encoding='utf-8') as f:
            f.write(new_content)
        fixed += 1
    else:
        not_found.append(basename)

print(f"✅ Liens CRO réparés : {fixed}")
if not_found:
    print(f"⚠️  Sans correspondance ({len(not_found)}) :")
    for n in not_found:
        print(f"   {n}")
