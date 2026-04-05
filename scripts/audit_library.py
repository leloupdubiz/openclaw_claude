#!/usr/bin/env python3
"""
Audit complet de la bibliothèque :
1. Liens transcript morts (fichier _formatted.md introuvable)
2. Résumés vides ou trop courts
3. Liens malformés
"""
import os, re, glob, json, urllib.request

WORKSPACE = "/Users/pc2/.openclaw/workspace"
SUMMARIES_DIRS = [
    f"{WORKSPACE}/formations/whop-ecomtalent/summaries",
    f"{WORKSPACE}/formations/cro-evolve/summaries",
]
LIBRARY_URL = "http://localhost:4242"

issues = {"dead_links": [], "empty_summaries": [], "malformed_links": [], "ok": 0}

for sdir in SUMMARIES_DIRS:
    formation = "ecomtalent" if "ecomtalent" in sdir else "cro-evolve"
    for sf in sorted(glob.glob(f"{sdir}/*.md")):
        with open(sf, encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # 1. Résumé vide / trop court
        text_only = re.sub(r'> 📝.*\n', '', content).strip()
        if len(text_only) < 100:
            issues["empty_summaries"].append({
                "file": sf,
                "formation": formation,
                "size": len(content)
            })
            continue

        # 2. Vérifier les liens transcript
        link_matches = re.findall(r'\[Transcript[^\]]*\]\(([^)]+)\)', content)
        for link in link_matches:
            # Lien cliquable http://localhost:4242/view?path=...
            if link.startswith("http://localhost:4242/view?path="):
                rel_path = link.split("?path=")[1]
                abs_path = os.path.join(WORKSPACE, rel_path)
                if not os.path.exists(abs_path):
                    issues["dead_links"].append({
                        "summary": sf,
                        "link": link,
                        "missing_file": abs_path,
                        "formation": formation
                    })
                else:
                    issues["ok"] += 1
            elif link.startswith("formations/"):
                # Lien relatif non converti
                abs_path = os.path.join(WORKSPACE, link)
                issues["malformed_links"].append({
                    "summary": sf,
                    "link": link,
                    "formation": formation
                })
            else:
                issues["malformed_links"].append({
                    "summary": sf,
                    "link": link,
                    "formation": formation
                })

print(f"\n{'='*60}")
print(f"AUDIT BIBLIOTHÈQUE")
print(f"{'='*60}")
print(f"✅ Liens OK       : {issues['ok']}")
print(f"💀 Liens morts    : {len(issues['dead_links'])}")
print(f"⚠️  Liens malformés: {len(issues['malformed_links'])}")
print(f"📭 Résumés vides  : {len(issues['empty_summaries'])}")

if issues["dead_links"]:
    print(f"\n💀 LIENS MORTS ({len(issues['dead_links'])}):")
    for d in issues["dead_links"][:10]:
        print(f"  {os.path.basename(d['summary'])} → {d['missing_file']}")

if issues["malformed_links"]:
    print(f"\n⚠️  LIENS MALFORMÉS ({len(issues['malformed_links'])}):")
    for d in issues["malformed_links"][:10]:
        print(f"  {os.path.basename(d['summary'])} → {d['link']}")

if issues["empty_summaries"]:
    print(f"\n📭 RÉSUMÉS VIDES ({len(issues['empty_summaries'])}):")
    for d in issues["empty_summaries"][:10]:
        print(f"  {os.path.basename(d['file'])} ({d['size']} bytes)")

# Sauvegarder pour le fix
import json
with open(f"{WORKSPACE}/scripts/audit_results.json", "w") as f:
    json.dump(issues, f, indent=2)
print(f"\n💾 Résultats sauvegardés → scripts/audit_results.json")
