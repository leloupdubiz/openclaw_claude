#!/usr/bin/env python3
"""
EVOLVE CRO — Pipeline Automatisé Overnight
Download MEGA → Whisper → Claude Summary → Delete

Usage:
    export ANTHROPIC_API_KEY=sk-ant-...
    python3 pipeline_cro.py

Modules traités :
    Module 1 (CRO Basics)       — ✅ COMPLET (4/4 vidéos)
    Module 2 (CRO Research)     — 🔄 2 vidéos téléchargées (Whisper prévu)
    Module 3 (CRO Landing Pages)— ⏳ PDFs only, vidéos à télécharger
    Module 4 (CRO Testing)      — ⏳ À télécharger
    Module 5 (CRO Ongoing)      — ⏳ À télécharger
"""

import os
import sys
import json
import time
import subprocess
import glob
import re
from pathlib import Path
from datetime import datetime

# Auto-load API key from credentials file if not in env
CREDS_FILE = Path.home() / ".openclaw" / "credentials" / "anthropic.env"
if not os.environ.get("ANTHROPIC_API_KEY") and CREDS_FILE.exists():
    for line in CREDS_FILE.read_text().splitlines():
        if line.startswith("ANTHROPIC_API_KEY="):
            os.environ["ANTHROPIC_API_KEY"] = line.split("=", 1)[1].strip()
            break

# ─── CONFIG ───────────────────────────────────────────────────────────────────

MEGA_URL = "https://mega.nz/folder/0ANgVRJZ#aWLsBr00URk6vP56ucXGjQ"

WORKSPACE       = Path("/Users/pc2/.openclaw/workspace")
MEGA_IMPORT_DIR = WORKSPACE / "formations" / "mega-import"
TRANSCRIPTS_DIR = WORKSPACE / "formations" / "cro-evolve" / "transcripts"
SUMMARIES_DIR   = WORKSPACE / "formations" / "cro-evolve" / "summaries"

WHISPER_MODEL   = "large-v3-turbo"
CLAUDE_MODEL    = "claude-opus-4-5"
OLLAMA_MODEL    = "llama3.2"
OLLAMA_URL      = "http://localhost:11434/api/generate"
GROQ_MODEL      = "llama-3.3-70b-versatile"   # gratuit 30K tokens/min

# Mode auto : claude > groq > ollama > manual
def detect_mode():
    if os.environ.get("ANTHROPIC_API_KEY"): return "claude"
    if os.environ.get("GROQ_API_KEY"):      return "groq"
    if os.environ.get("USE_OLLAMA"):        return "ollama"
    return "manual"

SUMMARY_MODE = detect_mode()

# Modules déjà COMPLETS (skip)
MODULES_DONE = ["1. CRO Basics"]

# Disk space minimum requis (en MB) avant de télécharger
MIN_FREE_MB = 3000

# ─── HELPERS ──────────────────────────────────────────────────────────────────

def log(msg, level="INFO"):
    ts = datetime.now().strftime("%H:%M:%S")
    prefix = {"INFO": "ℹ️", "OK": "✅", "WARN": "⚠️", "ERROR": "❌", "STEP": "🔧"}.get(level, "•")
    print(f"[{ts}] {prefix}  {msg}", flush=True)

def get_free_mb():
    result = subprocess.run(["df", "-m", "/"], capture_output=True, text=True)
    lines = result.stdout.strip().split("\n")
    parts = lines[1].split()
    return int(parts[3])

def check_disk(required_mb=MIN_FREE_MB):
    free = get_free_mb()
    if free < required_mb:
        log(f"Disque insuffisant : {free}MB libre, {required_mb}MB requis", "ERROR")
        return False
    log(f"Disque OK : {free}MB libres", "OK")
    return True

def get_transcript_name(video_path: Path) -> Path:
    """Retourne le chemin du transcript .txt pour une vidéo."""
    stem = video_path.stem  # ex: "1. (Evolve) Understanding Your Product"
    return TRANSCRIPTS_DIR / f"{stem}.txt"

def get_summary_slug(stem: str) -> str:
    """Convertit le nom de fichier en slug pour le résumé."""
    # ex: "1. (Evolve) Understanding Your Product" -> "01-evolve-understanding-your-product"
    # Extraire le numéro
    m = re.match(r'^(\d+)[\.\s]+', stem)
    num = int(m.group(1)) if m else 0
    slug = re.sub(r'^[\d\.\s\(\)]+', '', stem)
    slug = re.sub(r'[^a-zA-Z0-9\s]', '', slug).strip().lower()
    slug = re.sub(r'\s+', '-', slug)
    return f"{num:02d}-{slug}"

def get_module_number(module_name: str) -> int:
    m = re.match(r'^(\d+)', module_name)
    return int(m.group(1)) if m else 99

def transcribe_video(video_path: Path) -> Path:
    """Lance Whisper sur la vidéo, retourne le chemin du transcript."""
    transcript_path = get_transcript_name(video_path)
    
    if transcript_path.exists():
        log(f"Transcript déjà existant: {transcript_path.name}", "OK")
        return transcript_path
    
    log(f"Transcription Whisper: {video_path.name}", "STEP")
    
    cmd = [
        "python3", "-m", "whisper",
        str(video_path),
        "--model", WHISPER_MODEL,
        "--language", "en",
        "--output_format", "txt",
        "--output_dir", str(TRANSCRIPTS_DIR),
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        log(f"Whisper error: {result.stderr[-500:]}", "ERROR")
        return None
    
    # Whisper génère le fichier avec le même nom que la vidéo
    expected = TRANSCRIPTS_DIR / f"{video_path.stem}.txt"
    if expected.exists():
        log(f"Transcript OK: {expected.name} ({expected.stat().st_size//1024}KB)", "OK")
        return expected
    
    log(f"Transcript introuvable après Whisper: {expected}", "ERROR")
    return None

def generate_summary_ollama(prompt: str, summary_path: Path) -> Path:
    """Génère un résumé via Ollama (LLM local)."""
    import urllib.request, json as jsonlib
    payload = jsonlib.dumps({"model": OLLAMA_MODEL, "prompt": prompt, "stream": False}).encode()
    req = urllib.request.Request(OLLAMA_URL, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            result = jsonlib.loads(resp.read())
            text = result.get("response", "")
            summary_path.write_text(text, encoding="utf-8")
            return summary_path
    except Exception as e:
        log(f"Ollama error: {e}", "ERROR")
        return None

def generate_summary_groq(prompt: str, summary_path: Path) -> Path:
    """Génère un résumé via Groq (gratuit, rapide)."""
    import groq as groq_sdk
    client = groq_sdk.Groq(api_key=os.environ["GROQ_API_KEY"])
    try:
        r = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=4096,
        )
        text = r.choices[0].message.content
        summary_path.write_text(text, encoding="utf-8")
        return summary_path
    except Exception as e:
        log(f"Groq error: {e}", "ERROR")
        return None

def generate_summary(transcript_path: Path, module_name: str, video_num: int) -> Path:
    """Génère un résumé depuis le transcript (Claude, Groq, Ollama, ou mode manuel)."""
    import anthropic
    
    slug = get_summary_slug(transcript_path.stem)
    # Numéroter avec le module pour avoir des slugs uniques
    module_num = get_module_number(module_name)
    summary_filename = f"m{module_num:02d}-{slug}.md"
    summary_path = SUMMARIES_DIR / summary_filename
    
    if summary_path.exists():
        log(f"Résumé déjà existant: {summary_path.name}", "OK")
        return summary_path
    
    mode = detect_mode()
    log(f"Génération résumé [{mode}]: {transcript_path.name}", "STEP")
    
    if mode == "manual":
        log("Mode manuel — résumé à générer manuellement (aucune API configurée)", "WARN")
        return None
    
    transcript = transcript_path.read_text(encoding='utf-8')
    word_count = len(transcript.split())
    
    # Tronquer si trop long (max ~100K tokens)
    if word_count > 50000:
        transcript = ' '.join(transcript.split()[:50000])
        log(f"Transcript tronqué à 50K mots", "WARN")
    
    prompt = f"""Tu es un expert en CRO (Conversion Rate Optimization) pour l'e-commerce.
Tu analyses la transcription d'une vidéo de formation CRO par Spencer (formation EVOLVE CRO).

**Module :** {module_name}
**Vidéo :** {transcript_path.stem}
**Mots :** {word_count}

**Transcription :**
{transcript}

---

Génère un résumé structuré en Markdown en utilisant EXACTEMENT ce format :

# {module_name} — {transcript_path.stem}
> Formateur : Spencer | Formation : EVOLVE CRO | Module : {module_num}

---

## 🎯 Concept Central
[2-3 phrases résumant l'idée principale]

---

## 📌 Points Clés
[5-8 bullets avec les informations les plus actionnables]

## 💡 Insights Actionnables
[3-5 actions concrètes numérotées]

## 🏪 Applications pour drinknellio.com
[2-4 applications directes pour une marque de boisson bien-être vendue en Allemagne via Meta Ads DTC]
*Contexte : drinknellio.com — Nellio UltraCalm (Ashwagandha, L-Theanin, Magnésium), marché allemand, ~€XX/mois en ads*

## ⚡ Citation Clé
> [citation directe mémorable du transcript, en italique]

## 🔗 Lien avec autres modules
[connexions avec CRO Basics, Research, Landing Pages, Testing, Ongoing]

---
*Résumé généré automatiquement depuis la transcription Whisper*
"""

    # Dispatch selon le mode détecté
    if mode == "groq":
        return generate_summary_groq(prompt, summary_path)
    
    if mode == "ollama":
        return generate_summary_ollama(prompt, summary_path)
    
    # Claude (mode par défaut si ANTHROPIC_API_KEY est valide)
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        log("Aucune API configurée (ANTHROPIC_API_KEY / GROQ_API_KEY / USE_OLLAMA)", "ERROR")
        return None
    
    client = anthropic.Anthropic(api_key=api_key)
    
    try:
        message = client.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}]
        )
        summary_text = message.content[0].text
        summary_path.write_text(summary_text, encoding='utf-8')
        log(f"Résumé sauvegardé: {summary_path.name} ({len(summary_text)//1024}KB)", "OK")
        return summary_path
    except Exception as e:
        log(f"Erreur Claude API: {e}", "ERROR")
        return None

def process_video(video_path: Path, module_name: str, video_num: int, delete_after=True):
    """Pipeline complet pour une vidéo : transcribe → summarize → delete."""
    log(f"{'='*60}", "INFO")
    log(f"VIDÉO: {video_path.name}", "STEP")
    log(f"Module: {module_name} | Taille: {video_path.stat().st_size//1024//1024}MB", "INFO")
    
    # 1. Transcription Whisper
    transcript = transcribe_video(video_path)
    if not transcript:
        log(f"ÉCHEC transcription — vidéo conservée", "ERROR")
        return False
    
    # 2. Résumé Claude
    summary = generate_summary(transcript, module_name, video_num)
    if not summary:
        log(f"ÉCHEC résumé — vidéo conservée (transcript OK)", "WARN")
        return False
    
    # 3. Suppression vidéo
    if delete_after:
        size_mb = video_path.stat().st_size // 1024 // 1024
        video_path.unlink()
        log(f"Vidéo supprimée ({size_mb}MB récupérés)", "OK")
    
    return True

def download_mega_module(module_dir: Path) -> bool:
    """Télécharge les fichiers manquants via megadl (full folder)."""
    if not check_disk(required_mb=4000):
        return False
    
    log(f"Lancement megadl → {MEGA_IMPORT_DIR}", "STEP")
    
    # megadl télécharge tout le dossier MEGA vers MEGA_IMPORT_DIR
    # Les fichiers déjà présents sont skippés (resume mode)
    cmd = [
        "megadl",
        "--path", str(MEGA_IMPORT_DIR),
        MEGA_URL
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=3600)
    
    if result.returncode == 0:
        log("megadl terminé avec succès", "OK")
        return True
    else:
        log(f"megadl error: {result.stderr[-300:]}", "ERROR")
        return False

def process_module(module_dir: Path):
    """Traite toutes les vidéos d'un module."""
    module_name = module_dir.name
    
    if module_name in MODULES_DONE:
        log(f"Module déjà complet, skip: {module_name}", "OK")
        return
    
    log(f"\n{'#'*60}")
    log(f"MODULE: {module_name}")
    log(f"{'#'*60}\n")
    
    # Trouver toutes les vidéos .mp4
    videos = sorted(module_dir.glob("*.mp4"))
    
    if not videos:
        log(f"Aucune vidéo .mp4 trouvée dans {module_name}", "WARN")
        log("Vérifier si des vidéos sont disponibles sur MEGA...", "INFO")
        return
    
    log(f"{len(videos)} vidéo(s) trouvée(s)", "INFO")
    
    success_count = 0
    for i, video in enumerate(videos, 1):
        ok = process_video(video, module_name, i, delete_after=True)
        if ok:
            success_count += 1
        time.sleep(2)  # Petite pause entre vidéos
    
    log(f"\n✅ Module {module_name}: {success_count}/{len(videos)} vidéos traitées", "OK")

def update_library_index():
    """Met à jour l'index de la bibliothèque avec les nouveaux résumés."""
    summaries = sorted(SUMMARIES_DIR.glob("*.md"))
    log(f"Bibliothèque : {len(summaries)} résumés disponibles dans {SUMMARIES_DIR}", "INFO")
    # Note: la bibliothèque (port 4242) relit automatiquement les fichiers
    # Pas besoin de restart

def main():
    log("="*60)
    log("EVOLVE CRO — PIPELINE AUTOMATISÉ", "STEP")
    log(f"Démarré le {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    log("="*60)
    
    # Vérifications initiales
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        log("❌ ANTHROPIC_API_KEY non définie !", "ERROR")
        log("   export ANTHROPIC_API_KEY=sk-ant-...", "ERROR")
        sys.exit(1)
    
    log(f"API Key: sk-ant-...{api_key[-8:]}", "OK")
    
    # S'assurer que les dossiers existent
    TRANSCRIPTS_DIR.mkdir(parents=True, exist_ok=True)
    SUMMARIES_DIR.mkdir(parents=True, exist_ok=True)
    
    # Disk check initial
    if not check_disk():
        log("Espace disque insuffisant pour démarrer", "ERROR")
        sys.exit(1)
    
    # ─── PHASE 1 : Traiter les vidéos déjà téléchargées ───────────────────────
    log("\n--- PHASE 1 : Traitement des vidéos existantes ---", "STEP")
    
    modules = sorted(MEGA_IMPORT_DIR.iterdir(), key=lambda p: p.name)
    
    for module_dir in modules:
        if not module_dir.is_dir():
            continue
        process_module(module_dir)
    
    # ─── PHASE 2 : Télécharger les modules manquants ──────────────────────────
    log("\n--- PHASE 2 : Vérification modules manquants ---", "STEP")
    
    # Vérifier si des vidéos sont manquantes (comparaison avec COURSE_OUTLINE)
    all_transcripts = list(TRANSCRIPTS_DIR.glob("*.txt"))
    log(f"Total transcripts produits: {len(all_transcripts)}", "INFO")
    
    # Si moins de 30 transcripts (le cours en a ~60-70), des vidéos manquent
    if len(all_transcripts) < 30:
        log("Des vidéos semblent manquantes — lancement téléchargement MEGA", "WARN")
        
        if check_disk(required_mb=5000):
            downloaded = download_mega_module(MEGA_IMPORT_DIR)
            if downloaded:
                # Retraiter après téléchargement
                log("\n--- PHASE 3 : Traitement post-téléchargement ---", "STEP")
                modules = sorted(MEGA_IMPORT_DIR.iterdir(), key=lambda p: p.name)
                for module_dir in modules:
                    if not module_dir.is_dir():
                        continue
                    process_module(module_dir)
        else:
            log("Pas assez de place pour télécharger — arrêt", "ERROR")
    
    # ─── FIN ──────────────────────────────────────────────────────────────────
    log("\n" + "="*60)
    log("PIPELINE TERMINÉ", "OK")
    
    summaries = list(SUMMARIES_DIR.glob("*.md"))
    transcripts = list(TRANSCRIPTS_DIR.glob("*.txt"))
    log(f"Transcripts: {len(transcripts)}")
    log(f"Résumés: {len(summaries)}")
    log(f"Disk libre: {get_free_mb()}MB")
    log(f"Terminé le {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    log("="*60)

if __name__ == "__main__":
    main()
