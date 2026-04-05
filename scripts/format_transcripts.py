#!/usr/bin/env python3
"""
format_transcripts.py v2
Reformatte les transcripts HLS (EcomTalent + CRO EVOLVE).
- Supprime les doublons mid-phrase (artifact HLS : séquence de mots répétée 2x)
- Structure en paragraphes lisibles
- 100% contenu fidèle — aucun mot unique supprimé
- Sauvegarde en _formatted.md
- Met à jour le lien dans chaque résumé
"""
import os, re, glob


# ─── DÉDUPLICATION WORD-LEVEL ─────────────────────────────────────────────────

def deduplicate_word_level(text):
    """
    Supprime les séquences de mots répétées consécutivement.
    Pattern HLS : "...phrase A phrase B phrase A phrase B completed."
    → "...phrase A phrase B completed."
    
    Algorithme :
    1. Tokeniser en mots
    2. Chercher les séquences répétées (5–25 mots) adjacentes
    3. Supprimer la première occurrence du doublon (garder la 2e qui contient souvent la fin)
    """
    words = text.split()
    n = len(words)
    result = []
    i = 0
    
    while i < n:
        # Chercher une répétition de longueur 5 à 25 mots commençant à position i
        found_dup = False
        for dup_len in range(25, 4, -1):
            if i + dup_len * 2 > n:
                continue
            chunk1 = words[i:i + dup_len]
            chunk2 = words[i + dup_len:i + dup_len * 2]
            if chunk1 == chunk2:
                # Doublon exact trouvé — skip la première occurrence
                i += dup_len
                found_dup = True
                break
            # Doublon partiel : chunk2 commence par les derniers mots de chunk1
            # Ex: chunk1 ends with "A B C" and chunk2 starts with "A B C ..."
            # Ce cas = overlap de sous-titres où la fin de chunk1 = début de chunk2
        
        if not found_dup:
            result.append(words[i])
            i += 1
    
    return ' '.join(result)


def clean_transcript(text):
    """Nettoyage de base du texte brut."""
    # Supprimer les annotations [Music], [Applause], etc.
    text = re.sub(r'\[music\]', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\[applause\]', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\[laughter\]', '', text, flags=re.IGNORECASE)
    # Normaliser les espaces multiples
    text = re.sub(r'  +', ' ', text)
    return text.strip()


def split_into_paragraphs(text, sentences_per_para=5):
    """
    Découpe le texte en paragraphes de ~5 phrases.
    Coupe aussi aux transitions naturelles.
    """
    # Split en phrases
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z])', text.strip())
    
    BREAK_TRIGGERS = re.compile(
        r"^(now let'?s|let'?s (now |talk|move|do)|alright[,.]|all right[,.]|"
        r"okay[,\s]+so|so (now|let'?s|to summarize|the key)|"
        r"moving on|next[,\s]|in conclusion|to wrap|here'?s (what|how|the)|"
        r"so,?\s+think about it|think about it,?$|"
        r"product number \d|exercise|take \d+ seconds)",
        re.IGNORECASE
    )
    
    paragraphs = []
    current = []
    
    for s in sentences:
        s = s.strip()
        if not s:
            continue
        
        if BREAK_TRIGGERS.match(s) and current:
            paragraphs.append(' '.join(current))
            current = [s]
        else:
            current.append(s)
            if len(current) >= sentences_per_para:
                paragraphs.append(' '.join(current))
                current = []
    
    if current:
        paragraphs.append(' '.join(current))
    
    return [p for p in paragraphs if len(p.strip()) > 10]


def add_section_markers(paragraphs):
    """Ajoute des marqueurs visuels aux sections clés."""
    SECTION_RE = re.compile(
        r"^(so,?\s+)?let'?s (now )?talk|exercise|let'?s do a (quick )?exercise|"
        r"take \d+ seconds|let me (give you|show you) (a |an )example|"
        r"in conclusion|to summarize|to wrap|so the key",
        re.IGNORECASE
    )
    EXERCISE_RE = re.compile(r"exercise|take \d+ seconds|go\.$", re.IGNORECASE)
    
    result = []
    for p in paragraphs:
        first = p.split('.')[0]
        if EXERCISE_RE.search(first):
            result.append(f"\n> 🎯 **Exercice**\n\n{p}")
        elif SECTION_RE.match(first):
            result.append(f"\n---\n\n{p}")
        else:
            result.append(p)
    return result


def format_transcript(raw_text, title=""):
    """Pipeline complet de formatage."""
    # 1. Nettoyer
    text = clean_transcript(raw_text)
    if len(text.strip()) < 50:
        return None
    
    # 2. Dédupliquer les overlaps word-level
    text = deduplicate_word_level(text)
    
    # 3. Paragraphes
    paragraphs = split_into_paragraphs(text)
    
    # 4. Marqueurs de sections
    paragraphs = add_section_markers(paragraphs)
    
    # 5. Assembler
    clean_title = re.sub(r'^[\d\.\s]+', '', title).strip() or title
    header = f"# {clean_title}\n> Transcript complet — 100% du contenu original\n\n---\n\n"
    body = "\n\n".join(paragraphs)
    
    return header + body


# ─── MISE À JOUR RÉSUMÉ ───────────────────────────────────────────────────────

def update_summary_link(summary_file, formatted_rel_path):
    with open(summary_file, 'r', encoding='utf-8') as f:
        content = f.read()
    new_link = f'> 📝 Transcript formaté : `{formatted_rel_path}`\n'
    if '📝 Transcript' in content:
        content = re.sub(r'> 📝 Transcript[^\n]*\n', new_link, content, count=1)
    else:
        content = new_link + '\n' + content
    with open(summary_file, 'w', encoding='utf-8') as f:
        f.write(content)


def fuzzy_find(transcript_slug, summaries_dir):
    words = re.sub(r'[^a-z0-9 ]', ' ', transcript_slug.lower()).split()
    key_words = [w for w in words if len(w) > 4][:3]
    for sf in glob.glob(f"{summaries_dir}/*.md"):
        name = os.path.basename(sf).lower()
        if any(w in name for w in key_words):
            return [sf]
    return []


# ─── CONFIG JOBS ──────────────────────────────────────────────────────────────
JOBS = [
    {
        "name": "EcomTalent",
        "transcripts": "/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent/transcripts",
        "summaries": "/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent/summaries",
        "rel_prefix": "formations/whop-ecomtalent/transcripts",
        "id_fn": lambda f: (re.match(r'(lesn_[a-zA-Z0-9]+)', os.path.basename(f)) or [None, None])[1]
                           if re.match(r'(lesn_[a-zA-Z0-9]+)', os.path.basename(f)) else None,
        "find_fn": lambda lid, sdir: glob.glob(f"{sdir}/{lid}*.md") if lid else [],
    },
    {
        "name": "CRO EVOLVE",
        "transcripts": "/Users/pc2/.openclaw/workspace/formations/cro-evolve/transcripts",
        "summaries": "/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries",
        "rel_prefix": "formations/cro-evolve/transcripts",
        "id_fn": lambda f: os.path.splitext(os.path.basename(f))[0],
        "find_fn": lambda slug, sdir: (
            glob.glob(f"{sdir}/{slug}.md") or
            glob.glob(f"{sdir}/{re.sub(r'[^a-z0-9]', '_', slug.lower())}.md") or
            fuzzy_find(slug, sdir)
        ),
    },
]

# ─── MAIN ─────────────────────────────────────────────────────────────────────
grand_total_fmt = 0
grand_total_upd = 0

for job in JOBS:
    print(f"\n{'='*60}\n📚 {job['name']}\n{'='*60}")
    
    all_txts = sorted(glob.glob(f"{job['transcripts']}/*.txt"))
    # Exclure fichiers _clean.md / déjà formatés
    all_txts = [f for f in all_txts if '_clean' not in f and '_formatted' not in f]
    print(f"  📄 {len(all_txts)} transcripts")
    
    fmt_count = 0
    upd_count = 0
    no_sum = 0
    
    for txf in all_txts:
        slug = os.path.splitext(os.path.basename(txf))[0]
        title = re.sub(r'^[\d\.\s]+', '', slug.replace('_', ' ')).strip()
        
        fmt_name = slug + '_formatted.md'
        fmt_path = os.path.join(job['transcripts'], fmt_name)
        fmt_rel  = f"{job['rel_prefix']}/{fmt_name}"
        
        try:
            with open(txf, 'r', encoding='utf-8', errors='ignore') as f:
                raw = f.read()
        except Exception as e:
            print(f"  ❌ {slug}: {e}")
            continue
        
        result = format_transcript(raw, title)
        if not result:
            continue
        
        with open(fmt_path, 'w', encoding='utf-8') as f:
            f.write(result)
        fmt_count += 1
        
        # Mettre à jour le résumé
        lesson_id = job['id_fn'](txf)
        summaries = job['find_fn'](lesson_id or slug, job['summaries'])
        if summaries:
            for sf in summaries:
                update_summary_link(sf, fmt_rel)
                upd_count += 1
        else:
            no_sum += 1
    
    print(f"  ✅ Formatés     : {fmt_count}")
    print(f"  🔗 Résumés MàJ  : {upd_count}")
    if no_sum:
        print(f"  ⚠️  Sans résumé : {no_sum}")
    grand_total_fmt += fmt_count
    grand_total_upd += upd_count

print(f"\n{'='*60}")
print(f"TOTAL : {grand_total_fmt} formatés | {grand_total_upd} résumés mis à jour")
print(f"{'='*60}")
