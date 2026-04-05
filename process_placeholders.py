#!/usr/bin/env python3
"""Process 4 placeholder summaries in library/summaries/"""
import os, requests, time, re

GROQ_KEY = open(os.path.expanduser('~/.openclaw/credentials/anthropic.env')).read().split('GROQ_API_KEY=')[1].split()[0]

PLACEHOLDERS = [
    {
        "vid_id": "5NoTEUtr2gU",
        "file": "/Users/pc2/.openclaw/workspace/library/summaries/youri-ai-ugc-ads-arcads-2026.md",
        "title": "The NEW Way to Make AI UGC Ads in 2026",
        "author": "Youri van Hofwegen (@youricreates)",
        "lang": ["en", "fr"]
    },
    {
        "vid_id": "QoQBzR1NIqI",
        "file": "/Users/pc2/.openclaw/workspace/library/summaries/nicksaraev-claude-code-full-course-4h.md",
        "title": "CLAUDE CODE FULL COURSE 4 HOURS: Build & Sell (2026)",
        "author": "Nick Saraev",
        "lang": ["en"]
    },
    {
        "vid_id": "TNuXk8TI1Ac",
        "file": "/Users/pc2/.openclaw/workspace/library/summaries/ecomking-dropshipping-course-6h.md",
        "title": "Uncensored Full Dropshipping Course For Beginners ($30M Sales) — 6+ Hours",
        "author": "THE ECOM KING (Kamil Sattar)",
        "lang": ["en"]
    },
    {
        "vid_id": "8KmyF3pQQdI",
        "file": "/Users/pc2/.openclaw/workspace/library/summaries/jaxonpoulton-mass-producing-ai-videos-7k-month.md",
        "title": "The Dumbest Way to Make Money With AI Videos",
        "author": "Jaxon Poulton (@jaxonpoulton)",
        "lang": ["en"]
    },
]

SYS = """Tu es Clawdbot Prime, AI Chief E-Commerce Operator pour drinknellio.com.
Résume ce transcript en français structuré avec exactement ces sections :

## 🎯 Concept Central
[2-3 phrases — l'idée principale]

## 📌 Points Clés
[6-8 bullet points — les enseignements majeurs]

## 💡 Insights Actionnables
[4-5 bullet points — ce qu'on peut faire immédiatement]

## 🛒 Applications pour drinknellio.com
[3-4 bullet points spécifiques : Nellio UltraCalm, Meta Ads DE, EVOLVE, OMNIA]

## ⚡ Citations Clés
[2-3 citations directes ou paraphrases frappantes]

Sois précis, dense, pas de blabla. Connecte toujours au business drinknellio.com (anti-stress DE, Meta Ads, bundle €89.99, avatars: cadres/mères/étudiants/wellness)."""

def get_transcript(vid_id, langs):
    from youtube_transcript_api import YouTubeTranscriptApi
    api = YouTubeTranscriptApi()
    for lang in langs:
        try:
            segments = api.fetch(vid_id, languages=[lang])
            text = ' '.join(s.text for s in segments)
            print(f"  ✅ Transcript [{lang}]: {len(text)} chars")
            return text
        except Exception as e:
            print(f"  ⚠️ Lang [{lang}] failed: {e}")
    # Try auto
    try:
        segments = api.fetch(vid_id)
        text = ' '.join(s.text for s in segments)
        print(f"  ✅ Transcript [auto]: {len(text)} chars")
        return text
    except Exception as e:
        print(f"  ❌ All transcript attempts failed: {e}")
        return None

def groq_summarize(title, author, transcript):
    # Truncate to avoid token limit (25K chars ~ 6K tokens)
    trunc = transcript[:30000]
    for attempt in range(3):
        try:
            resp = requests.post(
                'https://api.groq.com/openai/v1/chat/completions',
                headers={'Authorization': f'Bearer {GROQ_KEY}', 'Content-Type': 'application/json'},
                json={
                    'model': 'llama-3.3-70b-versatile',
                    'messages': [
                        {'role': 'system', 'content': SYS},
                        {'role': 'user', 'content': f'Titre: {title}\nAuteur: {author}\n\nTranscript (extrait):\n{trunc}'}
                    ],
                    'max_tokens': 2000,
                    'temperature': 0.3
                },
                timeout=90
            )
            if resp.status_code == 429:
                wait = 65
                print(f"  ⏳ Rate limit hit, waiting {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            return resp.json()['choices'][0]['message']['content']
        except Exception as e:
            print(f"  ❌ Groq error (attempt {attempt+1}): {e}")
            time.sleep(10)
    return None

results = []
for p in PLACEHOLDERS:
    vid_id = p['vid_id']
    title = p['title']
    author = p['author']
    fpath = p['file']
    
    print(f"\n{'='*60}")
    print(f"📹 {title}")
    print(f"   ID: {vid_id} | Author: {author}")
    
    # Read current file to preserve header
    current = open(fpath).read() if os.path.exists(fpath) else ""
    
    # Get transcript
    transcript = get_transcript(vid_id, p['lang'])
    if not transcript:
        print(f"  ❌ SKIP — no transcript")
        results.append((vid_id, title, 'no_transcript'))
        time.sleep(5)
        continue
    
    # Generate summary
    print(f"  🤖 Generating summary via Groq...")
    summary = groq_summarize(title, author, transcript)
    if not summary:
        print(f"  ❌ SKIP — Groq failed")
        results.append((vid_id, title, 'groq_error'))
        continue
    
    # Extract header lines (up to first "---" or first "##")
    header_lines = []
    for line in current.split('\n'):
        if line.startswith('## ') or (line.strip() == '---' and len(header_lines) > 3):
            break
        # Skip old placeholder lines
        if 'STATUT' in line or 'Transcript en attente' in line or 'Placeholder' in line or 'À Propos' in line or 'À compléter' in line or 'Résumé Complet en Attente' in line:
            continue
        header_lines.append(line)
    
    # Remove trailing empty lines from header
    while header_lines and not header_lines[-1].strip():
        header_lines.pop()
    
    # Also strip "---" lines at end of header
    while header_lines and header_lines[-1].strip() == '---':
        header_lines.pop()
    
    header = '\n'.join(header_lines)
    
    new_content = f"{header}\n\n---\n\n{summary}\n\n---\n*Clawdbot Prime ⚡ — {time.strftime('%Y-%m-%d %H:%M')}*\n"
    
    with open(fpath, 'w') as f:
        f.write(new_content)
    
    print(f"  ✅ Saved to {os.path.basename(fpath)}")
    results.append((vid_id, title, 'done'))
    
    time.sleep(8)  # Be nice to APIs

print(f"\n{'='*60}")
done = [r for r in results if r[2]=='done']
fail = [r for r in results if r[2]!='done']
print(f"✅ Done: {len(done)}/{len(PLACEHOLDERS)}")
if fail:
    for r in fail:
        print(f"  ❌ {r[1]} ({r[2]})")
print("DONE")
