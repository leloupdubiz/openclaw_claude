#!/usr/bin/env python3
"""
Générer des résumés structurés pour la formation EVOLVE MARKETING
Source : formations/evolve-marketing/ (140 .txt organisés en 12 modules)
Output : formations/evolve-marketing/summaries/ (1 .md par .txt)
Moteur : Groq llama-3.1-8b-instant (200K TPD) via python3 (3.14)
"""

import os, re, sys, time
from pathlib import Path
from groq import Groq

# ── Config ─────────────────────────────────────────────────────────────────────
WORKSPACE   = Path("/Users/pc2/.openclaw/workspace")
SOURCE_DIR  = WORKSPACE / "formations" / "evolve-marketing"
OUTPUT_DIR  = SOURCE_DIR / "summaries"
LOG_FILE    = Path("/tmp/evolve_marketing_summaries.log")
CREDS_FILE  = Path.home() / ".openclaw" / "credentials" / "anthropic.env"
GROQ_MODEL  = "llama-3.1-8b-instant"   # 200K TPD — quota disponible

# ── Load Groq key ──────────────────────────────────────────────────────────────
api_key = ""
if CREDS_FILE.exists():
    for line in CREDS_FILE.read_text().splitlines():
        if line.startswith("GROQ_API_KEY="):
            api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
if not api_key:
    api_key = os.environ.get("GROQ_API_KEY", "")
if not api_key:
    print("❌ GROQ_API_KEY introuvable", flush=True)
    sys.exit(1)

client = Groq(api_key=api_key)

# ── Module mapping ─────────────────────────────────────────────────────────────
MODULE_MAP = {
    "2":  { "num": "02", "name": "Why Do Ads Work",           "icon": "🧠", "tag": "Psychologie" },
    "3":  { "num": "03", "name": "What Ads To Make",          "icon": "🔍", "tag": "Research" },
    "4":  { "num": "04", "name": "How To Create Avatars",     "icon": "🧍", "tag": "Avatars" },
    "5":  { "num": "05", "name": "How To Plan Ads",           "icon": "📋", "tag": "Préparation" },
    "6":  { "num": "06", "name": "How To Make Ads",           "icon": "🎨", "tag": "Exécution" },
    "7":  { "num": "07", "name": "How To Get UGC",            "icon": "🚶", "tag": "UGC" },
    "8":  { "num": "08", "name": "How To Run Ads",            "icon": "🏃", "tag": "Testing" },
    "9":  { "num": "09", "name": "How To Analyze & Scale",    "icon": "📊", "tag": "Scale" },
    "10": { "num": "10", "name": "How To Run Whitelisted Ads","icon": "📄", "tag": "Whitelisted" },
    "11": { "num": "11", "name": "Run & Scale Promos",        "icon": "🚀", "tag": "Promos" },
    "13": { "num": "13", "name": "Product Research",          "icon": "🛍️", "tag": "Product" },
    "14": { "num": "14", "name": "Break Down Winning Ads",    "icon": "🏆", "tag": "Winning Ads" },
}

def slugify(text):
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"[\s_]+", "-", text.strip())
    text = re.sub(r"-+", "-", text)
    return text[:60]

def get_module_key(folder_name):
    m = re.match(r"^(\d+)", folder_name)
    return m.group(1) if m else None

def get_video_num(filename):
    m = re.match(r"^(\d+)[\.\s]", filename)
    return int(m.group(1)) if m else 0

def generate_summary(content, title, module_name):
    prompt = f"""Tu es Clawdbot Prime, expert e-commerce DTC et Meta Ads.
Résume ce transcript de la formation EVOLVE Marketing.
Module : {module_name} | Vidéo : {title}
Business : drinknellio.com — Nellio UltraCalm (anti-stress), marché allemand, Meta Ads.

Format Markdown :

## 🎯 Concept Central
[2-3 phrases]

## 📌 Points Clés
[5-8 bullets actionnables]

## 💡 Insights Actionnables
[3-5 actions numérotées]

## 🏪 Applications pour drinknellio.com
[2-4 applications directes]

## ⚡ Citation Clé
> [citation mémorable]

Transcript :
{content[:5000]}"""

    for attempt in range(3):
        try:
            resp = client.chat.completions.create(
                model=GROQ_MODEL,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=900,
                temperature=0.3
            )
            return resp.choices[0].message.content.strip()
        except Exception as e:
            err_str = str(e)
            # Rate limit — attendre selon le message d'erreur
            if "rate_limit" in err_str.lower() or "429" in err_str:
                wait = 30 if attempt == 0 else 60
                print(f"  ⚠️  Rate limit — attente {wait}s", flush=True)
                time.sleep(wait)
            elif attempt < 2:
                print(f"  ⚠️  Retry {attempt+1}/3 : {e}", flush=True)
                time.sleep(5)
            else:
                raise

# ── Main ───────────────────────────────────────────────────────────────────────
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Lister tous les fichiers par module
tasks = []
for folder in sorted(SOURCE_DIR.iterdir()):
    if not folder.is_dir() or folder.name == "summaries":
        continue
    mod_key = get_module_key(folder.name)
    if not mod_key or mod_key not in MODULE_MAP:
        continue
    mod = MODULE_MAP[mod_key]
    txt_files = sorted(
        [f for f in folder.glob("*.txt")],
        key=lambda f: get_video_num(f.name)
    )
    for f in txt_files:
        tasks.append((mod, f))

total = len(tasks)
print(f"📚 {total} fichiers à résumer via Claude claude-haiku-4-5", flush=True)

done = 0
skipped = 0
errors = 0

for (mod, txt_path) in tasks:
    vid_num = get_video_num(txt_path.name)
    clean_title = re.sub(r"^\d+[\.\s]+", "", txt_path.stem).strip()
    clean_title = re.sub(r"\.mp4$", "", clean_title, flags=re.IGNORECASE).strip()
    slug = slugify(clean_title)
    out_name = f"m{mod['num']}-{vid_num:02d}-{slug}.md"
    out_path = OUTPUT_DIR / out_name

    if out_path.exists() and out_path.stat().st_size > 200:
        skipped += 1
        continue

    try:
        content = txt_path.read_text(errors="replace").strip()
    except Exception as e:
        print(f"  ❌ Lecture : {txt_path.name} — {e}", flush=True)
        errors += 1
        continue

    if len(content) < 50:
        print(f"  ⚠️  Vide, skip : {txt_path.name}", flush=True)
        skipped += 1
        continue

    print(f"  [{done+skipped+1}/{total}] → {out_name}", flush=True)

    try:
        summary = generate_summary(content, clean_title, mod['name'])
        header = f"# {mod['icon']} {clean_title}\n> Module {mod['num']} — {mod['name']} | EVOLVE MARKETING\n\n"
        out_path.write_text(header + summary + "\n", encoding="utf-8")
        done += 1
        time.sleep(1.5)  # Groq rate limit : ~30 req/min sur llama-3.1-8b-instant
    except Exception as e:
        print(f"  ❌ Claude échoué : {txt_path.name} — {e}", flush=True)
        errors += 1
        with open(LOG_FILE, "a") as lf:
            lf.write(f"ERROR: {txt_path} — {e}\n")

print(f"\n✅ Terminé : {done} générés | {skipped} skipped | {errors} erreurs", flush=True)
print(f"📁 Output : {OUTPUT_DIR}", flush=True)
