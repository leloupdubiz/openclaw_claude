#!/usr/bin/env python3
"""Audit le catalog library : vérifie que chaque doc.file existe sur disque."""
import urllib.request, json, os

WORKSPACE = "/Users/pc2/.openclaw/workspace"
BASE_URL = "http://localhost:4242"

# Récupérer le catalog
req = urllib.request.urlopen(f"{BASE_URL}/api/catalog", timeout=10)
catalog = json.loads(req.read())

missing = []
ok = 0

for cat in catalog:
    for doc in cat.get("docs", []):
        file_rel = doc.get("file", "")
        if not file_rel:
            continue
        abs_path = os.path.join(WORKSPACE, file_rel)
        alt_path = os.path.join(WORKSPACE, "..", file_rel)
        if os.path.exists(abs_path) or os.path.exists(os.path.normpath(alt_path)):
            ok += 1
        else:
            missing.append({
                "id": doc.get("id"),
                "title": doc.get("title", "?")[:50],
                "file": file_rel,
                "category": cat.get("name", "?")
            })

print(f"✅ Docs OK      : {ok}")
print(f"💀 Docs manquants: {len(missing)}")
if missing:
    print("\nDétail :")
    for d in missing:
        print(f"  [{d['category']}] {d['title']}")
        print(f"    → {d['file']}")
