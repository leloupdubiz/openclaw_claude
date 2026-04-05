#!/usr/bin/env python3
"""
check_playlist.py — Surveillance automatique de la playlist OpenClaw
Usage: python3 check_playlist.py
Retourne: JSON avec les nouvelles vidéos détectées vs INDEX.md
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path

INDEX_FILE = Path(__file__).parent / "INDEX.md"
PLAYLIST_URL = "https://www.youtube.com/playlist?list=PL0JPJ-FU3CV-d_Gyg2uAi1xeEEVjtm5hE"

def get_known_ids():
    """Extrait les IDs connus depuis INDEX.md"""
    known = {}
    if not INDEX_FILE.exists():
        return known
    with open(INDEX_FILE) as f:
        for line in f:
            m = re.search(r'\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*([A-Za-z0-9_-]{11})\s*\|', line)
            if m:
                num, title, vid_id = m.group(1), m.group(2).strip(), m.group(3)
                known[vid_id] = {"num": num, "title": title}
    return known

def fetch_playlist_videos():
    """Récupère la liste des vidéos de la playlist via yt-dlp"""
    import subprocess
    import shutil
    # Chercher yt-dlp en priorité comme binaire (pas comme module Python)
    ytdlp_bin = shutil.which("yt-dlp") or "/opt/homebrew/bin/yt-dlp"
    result = subprocess.run(
        [ytdlp_bin, "--flat-playlist", "--print",
         "%(playlist_index)s|%(id)s|%(title)s", PLAYLIST_URL],
        capture_output=True, text=True, timeout=60
    )
    videos = []
    for line in result.stdout.strip().split('\n'):
        if '|' in line:
            parts = line.split('|', 2)
            if len(parts) == 3:
                idx, vid_id, title = parts
                videos.append({"index": idx.strip(), "id": vid_id.strip(), "title": title.strip()})
    return videos

def get_transcript(vid_id):
    """Extrait le transcript d'une vidéo"""
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        api = YouTubeTranscriptApi()
        transcript = api.fetch(vid_id)
        return " ".join([e.text for e in transcript])
    except Exception as e:
        return f"ERREUR: {e}"

def update_index(new_videos):
    """Ajoute les nouvelles vidéos à INDEX.md"""
    if not new_videos:
        return
    
    with open(INDEX_FILE, 'r') as f:
        content = f.read()
    
    today = datetime.now().strftime('%Y-%m-%d')
    new_lines = []
    for v in new_videos:
        words = len(v.get('transcript', '').split()) if 'transcript' in v else 0
        new_lines.append(
            f"| {v['num']} | {v['title'][:60]} | {v['id']} | {words} | {today} | ⏳ en cours |"
        )
    
    # Insérer avant "## 📋 Nouvelles Vidéos"
    insert_marker = "## 📋 Nouvelles Vidéos"
    if insert_marker in content:
        lines_str = "\n".join(new_lines)
        content = content.replace(
            "Aucune nouvelle vidéo détectée.",
            f"Aucune nouvelle vidéo détectée."  # Garder pour les prochains runs
        )
        # Ajouter dans le tableau
        last_row = content.rfind("| ✅ traité |")
        if last_row != -1:
            end_of_row = content.find("\n", last_row)
            content = content[:end_of_row+1] + lines_str + "\n" + content[end_of_row+1:]
    
    # Mettre à jour le total
    total_known = len(get_known_ids()) + len(new_videos)
    content = re.sub(
        r'Total vidéos : \d+ \| Traitées : \*\*\d+/\d+\*\*',
        f'Total vidéos : {total_known} | Traitées : **{total_known}/{total_known}**',
        content
    )
    content = re.sub(r'Dernière vérification : .+', f'Dernière vérification : {today}', content)
    
    with open(INDEX_FILE, 'w') as f:
        f.write(content)

def main():
    result = {
        "checked_at": datetime.now().isoformat(),
        "playlist_url": PLAYLIST_URL,
        "known_count": 0,
        "current_count": 0,
        "new_videos": [],
        "error": None
    }
    
    try:
        known = get_known_ids()
        result["known_count"] = len(known)
        
        current = fetch_playlist_videos()
        result["current_count"] = len(current)
        
        # Détecter les nouvelles vidéos
        for v in current:
            if v["id"] not in known:
                # Extraire le transcript
                transcript = get_transcript(v["id"])
                v["transcript"] = transcript
                v["num"] = str(len(known) + len(result["new_videos"]) + 1).zfill(2)
                result["new_videos"].append(v)
                
                # Sauvegarder le transcript
                outfile = Path(__file__).parent / f"transcript-{v['num']}.txt"
                with open(outfile, 'w') as f:
                    f.write(f"# Transcript: {v['title']}\n# ID: {v['id']}\n\n{transcript}")
        
        # Mettre à jour INDEX.md si nouvelles vidéos
        if result["new_videos"]:
            update_index(result["new_videos"])
        
    except Exception as e:
        result["error"] = str(e)
    
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0 if not result["error"] else 1

if __name__ == "__main__":
    sys.exit(main())
