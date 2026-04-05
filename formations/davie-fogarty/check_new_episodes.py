#!/usr/bin/env python3
"""
Veille quotidienne — Nouvelle vidéo Davie Fogarty
Exécuté chaque jour à 09h15 Paris
"""

import os, json, time, requests
from pathlib import Path
import subprocess

PLAYLIST_ID = "PL8SmFe2l7_h2xt07uuVw4USeoT2RgUmpE"
BASE_DIR = Path(__file__).parent
KNOWN_IDS_FILE = BASE_DIR / "known_video_ids.json"
SUMMARIES_DIR = BASE_DIR / "summaries"
GROQ_KEY = open(Path.home() / ".openclaw/credentials/anthropic.env").read().split('GROQ_API_KEY=')[1].split('\n')[0].strip()

SYSTEM_PROMPT = """Tu es Clawdbot Prime, expert e-commerce DTC. Résume ce transcript de masterclass e-commerce en français structuré. Focus : insights actionnables pour drinknellio.com (anti-stress poudre marché allemand, Meta Ads, avatars stressed professionals / busy moms / students / wellness, AOV cible €89.99 bundle, angles Cortisol/Schlaf/Identité pro, pipeline créatif HeyGen/Higgsfield/kie.ai). Format: Concept Central, Points Clés, Insights Actionnables, Applications drinknellio.com, Citations Clés."""

def get_known_ids():
    if KNOWN_IDS_FILE.exists():
        return set(json.loads(KNOWN_IDS_FILE.read_text()))
    # Bootstrap from existing summaries
    ids = set()
    for f in SUMMARIES_DIR.glob("*.md"):
        vid_id = f.name.split("-")[0]
        if len(vid_id) == 11:
            ids.add(vid_id)
    return ids

def save_known_ids(ids):
    KNOWN_IDS_FILE.write_text(json.dumps(list(ids), indent=2))

def get_playlist_videos():
    """Get all video IDs from the playlist via yt-dlp."""
    result = subprocess.run(
        ['yt-dlp', '--flat-playlist', '-j', f'https://www.youtube.com/playlist?list={PLAYLIST_ID}'],
        capture_output=True, text=True, timeout=60
    )
    videos = []
    for line in result.stdout.strip().split('\n'):
        if line:
            try:
                data = json.loads(line)
                videos.append((data['id'], data.get('title', data['id'])))
            except:
                pass
    return videos

def get_transcript(video_id):
    try:
        r = requests.post(
            'https://kome.ai/api/transcript',
            json={'video_id': video_id},
            headers={'Accept': 'application/json', 'Content-Type': 'application/json',
                     'Origin': 'https://kome.ai', 'Referer': 'https://kome.ai/',
                     'User-Agent': 'Mozilla/5.0'},
            timeout=30
        )
        if r.status_code == 200:
            return r.json().get('transcript', '')
    except:
        pass
    return None

def call_groq(title, transcript):
    resp = requests.post(
        'https://api.groq.com/openai/v1/chat/completions',
        headers={'Authorization': f'Bearer {GROQ_KEY}', 'Content-Type': 'application/json'},
        json={'model': 'llama-3.3-70b-versatile',
              'messages': [{'role': 'system', 'content': SYSTEM_PROMPT},
                           {'role': 'user', 'content': f'Titre: {title}\n\nTranscript:\n{transcript[:25000]}'}],
              'max_tokens': 2000, 'temperature': 0.3},
        timeout=60
    )
    if resp.status_code == 429:
        time.sleep(62)
        resp = requests.post(
            'https://api.groq.com/openai/v1/chat/completions',
            headers={'Authorization': f'Bearer {GROQ_KEY}', 'Content-Type': 'application/json'},
            json={'model': 'llama-3.3-70b-versatile',
                  'messages': [{'role': 'system', 'content': SYSTEM_PROMPT},
                               {'role': 'user', 'content': f'Titre: {title}\n\nTranscript:\n{transcript[:25000]}'}],
                  'max_tokens': 2000, 'temperature': 0.3},
            timeout=60
        )
    return resp.json()['choices'][0]['message']['content']

def notify_discord(message):
    """Notify via openclaw discord (fallback: log)."""
    try:
        subprocess.run(['openclaw', 'say', '--channel', '1476994301803102312', message], 
                      capture_output=True, timeout=10)
    except:
        print("Discord notification:", message)

def main():
    print("🔍 Veille Davie Fogarty — Check nouvelles vidéos")
    known = get_known_ids()
    print(f"  Known IDs: {len(known)}")

    try:
        videos = get_playlist_videos()
        print(f"  Playlist videos: {len(videos)}")
    except Exception as e:
        print(f"  ❌ Erreur playlist: {e}")
        return

    new_videos = [(vid_id, title) for vid_id, title in videos if vid_id not in known]
    
    if not new_videos:
        print("  ✅ Aucune nouvelle vidéo")
        return

    print(f"  🆕 {len(new_videos)} nouvelle(s) vidéo(s) !")
    
    for vid_id, title in new_videos:
        print(f"  → Processing: {title[:60]}")
        transcript = get_transcript(vid_id)
        if not transcript:
            print(f"    ❌ No transcript")
            continue
        
        summary = call_groq(title, transcript)
        safe_title = title.lower()
        for c in ' |:/$€@#!?,\'\"()[]{}\\/%+*&^':
            safe_title = safe_title.replace(c, '-')
        while '--' in safe_title:
            safe_title = safe_title.replace('--', '-')
        safe_title = safe_title.strip('-')[:60]
        
        md_file = SUMMARIES_DIR / f"{vid_id}-{safe_title}.md"
        md_file.write_text(f"# {title}\n\n**Source** : https://www.youtube.com/watch?v={vid_id}\n**Auteur** : Davie Fogarty\n\n---\n\n{summary}\n\n---\n\n*Généré automatiquement par Clawdbot Prime ⚡*\n")
        known.add(vid_id)
        print(f"    ✅ Résumé créé")
        time.sleep(4)

    save_known_ids(known)
    
    # Restart library
    os.system("pkill -f 'node.*library/server.js'; sleep 1; cd ~/workspace/library && nohup node server.js > /tmp/clawdbot-library.log 2>&1 &")
    
    notify_discord(f"📚 Davie Fogarty — {len(new_videos)} nouvelle(s) vidéo(s) ajoutée(s) à la bibliothèque !")

if __name__ == "__main__":
    main()
