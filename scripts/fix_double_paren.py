import glob, re
dirs = [
    '/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent/summaries',
    '/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries',
]
fixed = 0
for d in dirs:
    for f in glob.glob(f'{d}/*.md'):
        with open(f) as fh: c = fh.read()
        new = re.sub(r'(http://localhost:4242/view\?path=[^\)]+)\)+', r'\1)', c)
        if new != c:
            with open(f,'w') as fh: fh.write(new)
            fixed += 1
print(f'Fixed: {fixed}')
