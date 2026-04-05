#!/usr/bin/env python3
"""Fix PLACEHOLDER files in library/summaries/ by fetching transcripts and generating summaries."""
import os, requests, time, re

GROQ_KEY = open(os.path.expanduser('~/.openclaw/credentials/anthropic.env')).read().split('GROQ_API_KEY=')[1].split()[0]

SUMMARIES_DIR = "/Users/pc2/.openclaw/workspace/library/summaries"

PLACEHOLDERS = [
    {
        "file": "youri-ai-ugc-ads-arcads-2026.md",
        "video_id": "5NoTEUtr2gU",
        "title": "Youri AI — UGC Ads with Arcads 2026",
        "context": "UGC ads IA, Arcads, créatifs vidéo automatisés, Meta Ads 2026",
    },
    {
        "file": "nicksaraev-claude-code-full-course-4h.md",
        "video_id": "QoQBzR1NIqI",
        "title": "Nick Saraev — Claude Code Full Course (4h)",
        "context": "Claude Code, coding agent, développement assisté IA, workflows",
    },
    {
        "file": "ecomking-dropshipping-course-6h.md",
        "video_id": "TNuXk8TI1Ac",
        "title": "Ecomking — Dropshipping Course (6h)",
        "context": "dropshipping, e-commerce DTC, Meta Ads, scaling, produit gagnant",
    },
    {
        "file": "jaxonpoulton-mass-producing-ai-videos-7k-month.md",
        "video_id": "8KmyF3pQQdI",
        "title": "Jaxon Poulton — The Dumbest Way to Make Money With AI Videos ($7K/month)",
        "context": "mass production vidéos IA, revenus passifs, workflow automatisé, faceless content",
    },
]

SYS_TEMPLATE = """Tu es Clawdbot Prime, AI Chief E-Commerce Operator pour drinknellio.com.
Résume ce transcript en français structuré avec ces sections exactes :

## Concept Central
[2-3 phrases sur l'idée principale]

## Points Clés
[5-8 bullet points, les insights les plus importants]

## Insights Actionnables
[3-5 actions concrètes à implémenter]

## Applications drinknellio.com
[2-4 applications spécifiques pour Nellio UltraCalm — anti-stress DE, Meta Ads, créatifs IA, bundle €89.99]

## Citations Clés
[2-3 citations ou formulations marquantes du contenu]

Contexte thématique : {context}
Sois concis, orienté ROI, pas de blabla."""

def get_transcript(video_id):
    from youtube_transcript_api import YouTubeTranscriptApi
    api = YouTubeTranscriptApi()
    errors = []
    for langs in [['en'], ['fr'], ['en-US'], ['fr-FR'], None]:
        try:
            if langs:
                segments = api.fetch(video_id, languages=langs)
            else:
                segments = api.fetch(video_id)
            text = ' '.join(s.text for s in segments)
            print(f"  📥 Transcript ({langs}): {len(text)} chars")
            return text
        except Exception as e:
            errors.append(str(e))
            continue
    print(f"  ❌ All transcript attempts failed: {errors[-1]}")
    return None

def groq_summarize(title, transcript, context):
    sys_prompt = SYS_TEMPLATE.format(context=context)
    for attempt in range(3):
        try:
            resp = requests.post(
                'https://api.groq.com/openai/v1/chat/completions',
                headers={'Authorization': f'Bearer {GROQ_KEY}', 'Content-Type': 'application/json'},
                json={
                    'model': 'llama-3.3-70b-versatile',
                    'messages': [
                        {'role': 'system', 'content': sys_prompt},
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
            print(f"  ❌ Groq error (attempt {attempt+1}): {e}")
            time.sleep(5)
    return None

results = []
for item in PLACEHOLDERS:
    filepath = os.path.join(SUMMARIES_DIR, item['file'])
    print(f"\n{'='*60}")
    print(f"Processing: {item['title']} ({item['video_id']})")
    
    # Check it's actually a placeholder
    with open(filepath) as f:
        content = f.read()
    
    if 'PLACEHOLDER' not in content:
        print("  ⚠️  Not a placeholder, skipping")
        results.append((item['file'], 'not_placeholder'))
        continue
    
    # Get transcript
    transcript = get_transcript(item['video_id'])
    if not transcript:
        results.append((item['file'], 'no_transcript'))
        continue
    
    # Generate summary
    print(f"  🤖 Generating summary with Groq...")
    summary = groq_summarize(item['title'], transcript, item['context'])
    if not summary:
        results.append((item['file'], 'groq_error'))
        continue
    
    # Build new content — preserve YAML front matter if present
    # Extract front matter
    fm_match = re.match(r'^(---\n.*?\n---\n)', content, re.DOTALL)
    if fm_match:
        front_matter = fm_match.group(1)
        # Update exists: false → exists: true in front matter
        front_matter = front_matter.replace('exists: false', 'exists: true')
        new_content = front_matter + f"\n# {item['title']}\n\n"
        new_content += f"**Source**: https://youtube.com/watch?v={item['video_id']}\n\n"
        new_content += summary
    else:
        new_content = f"# {item['title']}\n\n"
        new_content += f"**Source**: https://youtube.com/watch?v={item['video_id']}\n\n"
        new_content += summary
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print(f"  ✅ Updated {item['file']}")
    results.append((item['file'], 'done'))
    
    time.sleep(5)

print(f"\n{'='*60}")
print("SUMMARY:")
for fname, status in results:
    emoji = '✅' if status == 'done' else '❌'
    print(f"  {emoji} {fname}: {status}")

done = sum(1 for _, s in results if s == 'done')
print(f"\nTotal: {done}/{len(PLACEHOLDERS)} placeholders fixed")
