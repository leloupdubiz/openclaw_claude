#!/usr/bin/env python3
"""Convertit les liens transcript en URLs cliquables http://localhost:4242/view?path=..."""
import os, re, glob

LIBRARY_BASE = "http://localhost:4242/view?path="

dirs = [
    "/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent/summaries",
    "/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries",
]

updated = 0
for d in dirs:
    for f in glob.glob(f"{d}/*.md"):
        with open(f, 'r', encoding='utf-8') as fh:
            content = fh.read()

        # Remplacer tout lien transcript existant (formaté ou brut, cliquable ou backtick)
        def make_link(m):
            path_val = m.group(1)
            label = "Transcript formaté" if "formatted" in path_val else "Transcript"
            return f'> 📝 [{label}]({LIBRARY_BASE}{path_val})'

        new = re.sub(
            r'> 📝 (?:\[[^\]]*\]\([^\)]*\)|[^\n]*?)(formations/[^\s`\)\n]+)',
            make_link,
            content
        )

        if new != content:
            with open(f, 'w', encoding='utf-8') as fh:
                fh.write(new)
            updated += 1

print(f"✅ {updated} résumés mis à jour → liens http://localhost:4242/view?path=...")
