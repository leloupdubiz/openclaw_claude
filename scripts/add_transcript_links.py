#!/usr/bin/env python3
import os, glob, re

# --- EcomTalent ---
summaries_dir = '/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent/summaries'
transcripts_dir = '/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent/transcripts'

updated = 0
skipped = 0

for summary_file in glob.glob(f'{summaries_dir}/lesn_*.md'):
    basename = os.path.basename(summary_file)
    m = re.match(r'(lesn_[a-zA-Z0-9]+)', basename)
    if not m:
        skipped += 1
        continue
    lid = m.group(1)
    transcript_file = f'{transcripts_dir}/{lid}.txt'

    with open(summary_file, 'r', encoding='utf-8') as f:
        content = f.read()

    if '📝 Transcript' in content:
        skipped += 1
        continue

    exists = os.path.exists(transcript_file)
    link = f'> 📝 Transcript : `formations/whop-ecomtalent/transcripts/{lid}.txt`\n\n' if exists else '> 📝 Transcript : non disponible\n\n'

    with open(summary_file, 'w', encoding='utf-8') as f:
        f.write(link + content)
    updated += 1

print(f'EcomTalent — Updated: {updated} | Skipped: {skipped}')

# --- CRO EVOLVE ---
cro_summaries = '/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries'
cro_transcripts = '/Users/pc2/.openclaw/workspace/formations/cro-evolve/transcripts'

cro_updated = 0
cro_skipped = 0

for summary_file in glob.glob(f'{cro_summaries}/*.md'):
    basename = os.path.basename(summary_file)
    slug = basename.replace('.md', '')

    with open(summary_file, 'r', encoding='utf-8') as f:
        content = f.read()

    if '📝 Transcript' in content:
        cro_skipped += 1
        continue

    transcript_file = f'{cro_transcripts}/{slug}.txt'
    if not os.path.exists(transcript_file):
        matches = glob.glob(f'{cro_transcripts}/*{slug[:15]}*.txt')
        transcript_file = matches[0] if matches else None

    if transcript_file and os.path.exists(transcript_file):
        rel = os.path.basename(transcript_file)
        link = f'> 📝 Transcript : `formations/cro-evolve/transcripts/{rel}`\n\n'
    else:
        link = '> 📝 Transcript : non disponible\n\n'

    with open(summary_file, 'w', encoding='utf-8') as f:
        f.write(link + content)
    cro_updated += 1

print(f'CRO EVOLVE — Updated: {cro_updated} | Skipped: {cro_skipped}')
