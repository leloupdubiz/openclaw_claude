#!/usr/bin/env python3
import os, requests, time, json

GROQ_KEY = open(os.path.expanduser('~/.openclaw/credentials/anthropic.env')).read().split('GROQ_API_KEY=')[1].split()[0]

VIDEOS = [
    ("KFNfQwmLnS8", "Vibe Coding with Codeplaybook #1"),
    ("XjDRuB3cmbM", "Vibe Coding with Codeplaybook #2"),
    ("fjECCYAhIHM", "Vibe Coding with Codeplaybook #3"),
    ("fi1E2-tnEVA", "Vibe Coding with Codeplaybook #4"),
    ("XLxqmIwThj0", "Vibe Coding with Codeplaybook #5"),
    ("Okgzirbvro0", "Vibe Coding with Codeplaybook #6"),
    ("qUE-nVUrpq4", "Vibe Coding with Codeplaybook #7"),
    ("ByQ0IYURnB8", "Vibe Coding with Codeplaybook #8"),
    ("Nj0tn2qlT0s", "Vibe Coding with Codeplaybook #9"),
    ("kYW7UVnyhcM", "Vibe Coding with Codeplaybook #10"),
    ("mFGa3TNjCOo", "Vibe Coding with Codeplaybook #11"),
    ("44TVLZZMbO0", "Vibe Coding with Codeplaybook #12"),
    ("Fwb0mjIdYvU", "Vibe Coding with Codeplaybook #13"),
    ("Z4O2HNffTX8", "Vibe Coding with Codeplaybook #14"),
    ("UMmFG6cEVKg", "Vibe Coding with Codeplaybook #15"),
    ("8KmyF3pQQdI", "The Dumbest Way to Make Money With AI Videos"),
]

SYS = """Tu es Clawdbot Prime. Résume ce transcript en français structuré.
Format: Concept Central, Points Clés, Insights Actionnables, Applications drinknellio.com (anti-stress DE, Meta Ads, bundle €89.99, créatifs IA), Citations Clés.
Focus: vibe coding, développement IA, outils no-code/AI pour créer des apps et workflows, applicable à Nellio Studio / Mission Control / OMNIA."""

SUMMARIES_DIR = "/Users/pc2/.openclaw/workspace/formations/vibe-coding-codeplaybook/summaries"
os.makedirs(SUMMARIES_DIR, exist_ok=True)

def get_transcript(video_id):
    try:
        import sys
        sys.path.insert(0, '/Users/pc2/.openclaw/workspace/formations')
        from yt_helper import get_transcript as _get
        text, lang = _get(video_id, languages=('en', 'fr'))
        return text
    except Exception as e:
        print(f"  ❌ Transcript error: {e}")
        return None

def groq_summarize(title, transcript):
    for attempt in range(3):
        try:
            resp = requests.post(
                'https://api.groq.com/openai/v1/chat/completions',
                headers={'Authorization': f'Bearer {GROQ_KEY}', 'Content-Type': 'application/json'},
                json={
                    'model': 'llama-3.3-70b-versatile',
                    'messages': [
                        {'role': 'system', 'content': SYS},
                        {'role': 'user', 'content': f'Titre: {title}\n\nTranscript:\n{transcript[:25000]}'}
                    ],
                    'max_tokens': 2000,
                    'temperature': 0.3
                },
                timeout=60
            )
            if resp.status_code == 429:
                print("  ⏳ Rate limit, sleeping 62s...")
                time.sleep(62)
                continue
            resp.raise_for_status()
            return resp.json()['choices'][0]['message']['content']
        except Exception as e:
            print(f"  ❌ Groq error: {e}")
            time.sleep(5)
    return None

results = []
for i, (vid_id, title) in enumerate(VIDEOS, 1):
    print(f"[{i}/{len(VIDEOS)}] {title} ({vid_id})")
    
    out_file = os.path.join(SUMMARIES_DIR, f"{vid_id}.md")
    if os.path.exists(out_file):
        print(f"  ✅ Already exists, skipping")
        results.append((vid_id, title, 'skipped'))
        continue
    
    print("  📥 Getting transcript...")
    transcript = get_transcript(vid_id)
    if not transcript:
        results.append((vid_id, title, 'no_transcript'))
        time.sleep(5)
        continue
    
    print(f"  📝 Transcript: {len(transcript)} chars. Summarizing...")
    summary = groq_summarize(title, transcript)
    if not summary:
        results.append((vid_id, title, 'groq_error'))
        continue
    
    with open(out_file, 'w') as f:
        f.write(f"# {title}\n\n")
        f.write(f"**Source**: https://youtube.com/watch?v={vid_id}\n\n")
        f.write(summary)
    
    print(f"  ✅ Saved")
    results.append((vid_id, title, 'done'))
    
    if i < len(VIDEOS):
        time.sleep(5)

ok = [r for r in results if r[2] == 'done']
skip = [r for r in results if r[2] == 'skipped']
fail = [r for r in results if r[2] not in ('done', 'skipped')]
print(f"\n✅ Done: {len(ok)} | Skipped: {len(skip)} | Failed: {len(fail)}")
print(json.dumps({'ok': len(ok), 'skip': len(skip), 'fail': len(fail), 'results': results}, indent=2))
