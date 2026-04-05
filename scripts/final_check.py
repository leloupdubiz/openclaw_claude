import glob, re, os, urllib.parse
WORKSPACE = '/Users/pc2/.openclaw/workspace'
dirs = [
    f'{WORKSPACE}/formations/whop-ecomtalent/summaries',
    f'{WORKSPACE}/formations/cro-evolve/summaries',
]
dead, ok = [], 0
for d in dirs:
    for sf in glob.glob(f'{d}/*.md'):
        content = open(sf, encoding='utf-8', errors='ignore').read()
        links = re.findall(r'\[Transcript[^\]]*\]\(http://localhost:4242/view\?path=([^)]+)\)', content)
        for link in links:
            decoded = urllib.parse.unquote(link)
            abs_path = os.path.join(WORKSPACE, decoded)
            if os.path.exists(abs_path):
                ok += 1
            else:
                dead.append((os.path.basename(sf), decoded))
print(f'Liens OK: {ok} | Morts: {len(dead)}')
for s, l in dead[:10]:
    print(f'  MORT: {s} -> {os.path.basename(l)}')
