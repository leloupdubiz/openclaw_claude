#!/usr/bin/env python3
"""
Pipeline EVOLVE CRO — Download + Transcription automatique (overnight)
Stratégie : megadl → watchdog disque → Whisper → suppression → loop

Usage : python3 pipeline.py
Log   : /tmp/cro_pipeline.log
Status: /workspace/formations/cro-evolve/pipeline_status.json
"""

import os, sys, subprocess, time, json, signal
from pathlib import Path
from datetime import datetime

# ─── CONFIG ──────────────────────────────────────────────────────────────────
MEGA_URL       = "https://mega.nz/folder/0ANgVRJZ#aWLsBr00URk6vP56ucXGjQ"
DOWNLOAD_DIR   = Path("/Users/pc2/.openclaw/workspace/formations/mega-import")
TRANSCRIPT_DIR = Path("/Users/pc2/.openclaw/workspace/formations/cro-evolve/transcripts")
SUMMARY_DIR    = Path("/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries")
STATUS_FILE    = Path("/Users/pc2/.openclaw/workspace/formations/cro-evolve/pipeline_status.json")
LOG_FILE       = Path("/tmp/cro_pipeline.log")
WHISPER_MODEL  = "large-v3-turbo"
DISK_STOP_GB   = 5.0   # Arrêter megadl sous ce seuil
DISK_RESUME_GB = 7.0   # Reprendre megadl au-dessus de ce seuil

# ─── UTILS ───────────────────────────────────────────────────────────────────
def log(msg):
    ts = datetime.now().strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    with open(LOG_FILE, 'a') as f:
        f.write(line + "\n")

def free_disk_gb():
    st = os.statvfs('/')
    return (st.f_bavail * st.f_frsize) / (1024**3)

def load_status():
    if STATUS_FILE.exists():
        with open(STATUS_FILE) as f:
            return json.load(f)
    return {"processed": [], "failed": [], "started_at": str(datetime.now())}

def save_status(s):
    with open(STATUS_FILE, 'w') as f:
        json.dump(s, f, indent=2, ensure_ascii=False)

def is_fully_downloaded(ts_path: Path) -> bool:
    """Vérifie qu'un .ts n'est pas en cours de téléchargement"""
    tmp = ts_path.parent / f".megatmp.{ts_path.name}"
    if tmp.exists():
        return False
    # Aussi vérifier si le fichier a une taille stable
    size1 = ts_path.stat().st_size
    time.sleep(1)
    size2 = ts_path.stat().st_size
    return size1 == size2

def get_ready_videos():
    """Retourne les .ts complètement téléchargés et pas encore transcrits"""
    ready = []
    for ts in sorted(DOWNLOAD_DIR.rglob("*.ts")):
        stem = ts.stem
        transcript = TRANSCRIPT_DIR / f"{stem}.txt"
        if transcript.exists():
            continue  # Déjà transcrit
        if is_fully_downloaded(ts):
            ready.append(ts)
    return ready

# ─── TRANSCRIPTION ───────────────────────────────────────────────────────────
def transcribe_and_delete(video_path: Path, status: dict) -> bool:
    stem = video_path.stem
    transcript_path = TRANSCRIPT_DIR / f"{stem}.txt"
    size_mb = video_path.stat().st_size // (1024*1024)

    if transcript_path.exists():
        log(f"  ↩ Déjà transcrit : {stem}")
        video_path.unlink(missing_ok=True)
        return True

    log(f"  🎙 [{size_mb}MB] Transcription : {stem}")
    start = time.time()

    try:
        result = subprocess.run([
            sys.executable, "-m", "whisper",
            str(video_path),
            "--model", WHISPER_MODEL,
            "--language", "en",
            "--output_format", "txt",
            "--output_dir", str(TRANSCRIPT_DIR),
            "--verbose", "False"
        ], capture_output=True, text=True, timeout=2400)  # 40 min max
    except subprocess.TimeoutExpired:
        log(f"  ⏱ TIMEOUT {stem} — skip")
        status["failed"].append({"name": stem, "reason": "timeout"})
        return False

    duration = int(time.time() - start)

    if result.returncode == 0 and transcript_path.exists():
        words = len(transcript_path.read_text().split())
        log(f"  ✅ {stem} → {words} mots en {duration}s")
        log(f"  🗑  Suppression vidéo : {video_path.name}")
        video_path.unlink()
        status["processed"].append({"name": stem, "words": words, "duration_s": duration})
        save_status(status)
        return True
    else:
        log(f"  ❌ ERREUR : {stem}\n{result.stderr[-300:]}")
        status["failed"].append({"name": stem, "reason": result.stderr[-100:]})
        save_status(status)
        return False

# ─── PIPELINE PRINCIPAL ──────────────────────────────────────────────────────
def run_pipeline():
    TRANSCRIPT_DIR.mkdir(parents=True, exist_ok=True)
    SUMMARY_DIR.mkdir(parents=True, exist_ok=True)
    status = load_status()
    status["started_at"] = str(datetime.now())

    log(f"\n{'='*55}")
    log(f"🚀 PIPELINE EVOLVE CRO — démarrage")
    log(f"💾 Disque libre : {free_disk_gb():.1f}GB")
    log(f"📝 Transcripts existants : {len(list(TRANSCRIPT_DIR.glob('*.txt')))}")
    log(f"{'='*55}\n")

    # Phase 1 : Traiter les vidéos déjà présentes
    ready = get_ready_videos()
    if ready:
        log(f"📂 {len(ready)} vidéo(s) présentes à traiter d'abord...")
        for vp in ready:
            transcribe_and_delete(vp, status)

    # Phase 2 : Boucle megadl + watchdog
    dl_process = None
    rounds = 0
    MAX_ROUNDS = 50  # Sécurité anti-boucle infinie

    while rounds < MAX_ROUNDS:
        rounds += 1
        free = free_disk_gb()
        log(f"\n--- Round {rounds} | Disque : {free:.1f}GB libre ---")

        # Lancer/relancer megadl si disque OK
        if free >= DISK_RESUME_GB:
            if dl_process is None or dl_process.poll() is not None:
                log(f"📥 Lancement megadl (disque: {free:.1f}GB)")
                dl_process = subprocess.Popen(
                    ["megadl", "--path", str(DOWNLOAD_DIR), MEGA_URL],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL
                )
                log(f"   PID megadl: {dl_process.pid}")
        else:
            # Tuer megadl si disque trop bas
            if dl_process and dl_process.poll() is None:
                log(f"⚠️  Disque bas ({free:.1f}GB) — arrêt megadl")
                dl_process.terminate()
                dl_process.wait(timeout=5)
                dl_process = None

        # Attendre et chercher des vidéos à traiter
        waited = 0
        found_any = False
        while waited < 60:  # Check toutes les 10s pendant 60s
            time.sleep(10)
            waited += 10

            # Vérifier si megadl a terminé
            if dl_process and dl_process.poll() is not None:
                log("✅ megadl terminé — traitement final")
                # Traiter tout ce qui reste
                for vp in get_ready_videos():
                    transcribe_and_delete(vp, status)
                # Pipeline terminé
                goto_end = True
                break

            ready = get_ready_videos()
            if ready:
                found_any = True
                # Pauser megadl pendant la transcription si disque bas
                if free_disk_gb() < DISK_STOP_GB and dl_process and dl_process.poll() is None:
                    log(f"⏸  Pause megadl (disque bas)")
                    dl_process.send_signal(signal.SIGSTOP)

                for vp in ready:
                    transcribe_and_delete(vp, status)

                # Reprendre megadl
                if dl_process and dl_process.poll() is None:
                    try:
                        dl_process.send_signal(signal.SIGCONT)
                        log(f"▶️  Reprise megadl")
                    except:
                        pass
                break  # Recommencer la boucle principale
        else:
            # 60s sans vidéo ni fin megadl — megadl encore actif ?
            if dl_process and dl_process.poll() is None:
                log("⏳ En attente download... (megadl actif)")
                continue
            else:
                log("✅ megadl terminé et aucune vidéo en attente")
                break

        if 'goto_end' in dir() and goto_end:
            break

    # ─── FIN ─────────────────────────────────────────────────────────────────
    if dl_process and dl_process.poll() is None:
        dl_process.terminate()

    transcripts = list(TRANSCRIPT_DIR.glob("*.txt"))
    total_words = sum(len(Path(t).read_text().split()) for t in transcripts)

    log(f"\n{'='*55}")
    log(f"🎉 PIPELINE TERMINÉ")
    log(f"📝 {len(transcripts)} transcripts | {total_words:,} mots total")
    log(f"✅ Traités : {len(status.get('processed', []))}")
    log(f"❌ Échecs  : {len(status.get('failed', []))}")
    log(f"💾 Disque  : {free_disk_gb():.1f}GB libre")
    log(f"{'='*55}")
    log(f"⏭  PROCHAINE ÉTAPE : ouvrir une session Clawdbot Prime")
    log(f"   → 'Génère les résumés CRO depuis les transcripts'")

    status["status"] = "transcription_complete"
    status["completed_at"] = str(datetime.now())
    status["transcripts"] = [t.name for t in sorted(transcripts)]
    status["total_words"] = total_words
    save_status(status)

if __name__ == "__main__":
    run_pipeline()
