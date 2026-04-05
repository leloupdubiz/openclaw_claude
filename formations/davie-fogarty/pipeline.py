#!/usr/bin/env python3
"""
Pipeline Davie Fogarty — 38 vidéos YouTube → résumés Groq → .md
Avec cache + resume + anti-ban (kome.ai fallback)
"""

import os, json, time, requests
from pathlib import Path

# ─── CONFIG ───────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).parent
SUMMARIES_DIR = BASE_DIR / "summaries"
SUMMARIES_DIR.mkdir(exist_ok=True)

# Lire Groq key
def get_groq_key():
    env_path = Path.home() / ".openclaw/credentials/anthropic.env"
    content = env_path.read_text()
    for line in content.splitlines():
        if line.startswith("GROQ_API_KEY="):
            return line.split("=", 1)[1].strip()
    raise ValueError("GROQ_API_KEY not found")

GROQ_KEY = get_groq_key()

SYSTEM_PROMPT = """Tu es Clawdbot Prime, expert e-commerce DTC. Résume ce transcript de masterclass e-commerce en français structuré. Focus : insights actionnables pour drinknellio.com (anti-stress poudre marché allemand, Meta Ads, avatars stressed professionals / busy moms / students / wellness, AOV cible €89.99 bundle, angles Cortisol/Schlaf/Identité pro, pipeline créatif HeyGen/Higgsfield/kie.ai). Format: Concept Central, Points Clés, Insights Actionnables, Applications drinknellio.com, Citations Clés."""

# ─── VIDEOS (P0 first) ────────────────────────────────────────────────────────
VIDEOS = [
    # P0 — Priorités Nellio
    ("pb7o1gY7Zg4", "5 SECRETS THEY WON'T TELL YOU ABOUT E-COMMERCE"),
    ("p7T85ltBuIY", "How To Win At Facebook Ads in 2024"),
    ("5zOIeBYhOyM", "Conversion Rate Optimisation (CRO) | Double your Shopify sales in 2024"),
    ("MWW5hsZ6W8s", "How We Make Millions With Influencer Marketing"),
    ("J0V6UD5kVYU", "The Secret to Making Viral Content That Actually Sells"),
    ("z2duNKR4XHM", "How to Grow a Business Fast (Tips From an $1B Founder)"),
    ("FFgPr6gD4RE", "How To Scale Your Business Using 2 Key Concepts"),
    # Remaining 31
    ("567hU5QS_Wc", "10 Things To Guarantee Ecommerce Business Success | Oodie Founder"),
    ("T2tagxLhlv4", "Shopify Tutorial For Beginners 2025 - COMPLETE GUIDE"),
    ("_SV-lllg7J0", "Clickfunnels Tutorial For Beginners 2024"),
    ("313GvO3pScc", "Complete E-commerce Operations Guide (Advanced Tutorial)"),
    ("QPwQSqwjGX4", "How to Find Winning Shopify Products in 2024"),
    ("g0EkTJnrMto", "HOW TO SETUP KLAVIYO | Email Marketing Tutorial"),
    ("xUCMTXnBzKQ", "How I Find Products to Sell in 2024"),
    ("hBUWHa9lHEI", "Watch THIS before Dropshipping | 27 Year Old Millionaire"),
    ("jXCchw-c4GQ", "Facebook Ads Tutorial 2024 - How To Make Facebook Ads With Your Phone"),
    ("iYJDR3qU9rk", "How To Run Facebook Ads in 2024 - Beginners Tutorial"),
    ("AgNZaOczhs8", "How I Got Faster Shipping On Shopify"),
    ("lYzD0XXd0Fs", "SHOPIFY TUTORIAL FOR BEGINNERS 2024: 9 MISTAKES TO AVOID"),
    ("5gcSZVNmPWM", "Top 10 Shopify Apps You SHOULD BE Using In 2024"),
    ("bY6xhE0GYTw", "TikTok Ads Tutorial 2024"),
    ("oDQGbUI6YYE", "Google Ads Tutorial - 2024 FREE ECOM COURSE for Beginners"),
    ("qClPynP5prY", "Oodie Owner Reveals Secrets"),
    ("BjsTbaZlnVo", "5 Tips to Find a Winning Product"),
    ("b5p9FH-eRK4", "COMPLETE Shopify Tutorial 2023"),
    ("Jm4uarya86o", "Watch This First: How To Launch An E-Commerce Business"),
    ("zbWTbunM1Nk", "How I Made $200M With This Shopify Website"),
    ("EBpBSiQTM8U", "You Won't Believe How Easy It Is to Make Your FIRST Million!"),
    ("q9FLfCbWadY", "Think Twice Before You Dropship: How to Actually Make Money Online"),
    ("yfZGZAyOfk8", "How to Double Your Business Success in 12 Minutes"),
    ("2X_N6-WguPw", "Dropshipping is dead - Make a brand instead"),
    ("7U8vYps8fMk", "How Licensing Really Works"),
    ("x5H58apIw20", "How To Run Facebook Ads in 2024 (Complete Guide)"),
    ("nzoD0mQAnls", "Email Marketing For Beginners | Complete Step By Step Tutorial 2024"),
    ("hAq-Ia8R4DI", "$850M Founder Reveals His Secret Hiring Formula"),
    ("DTDIhdptOuw", "COMPLETE Shopify Tutorial For Beginners 2024"),
    ("oqlxeWwyNV0", "Google Ads Complete Guide 2024"),
    ("vo6aDcnPzCU", "Beginners Complete Dropshipping Tutorial for 2025 (11+ Hour Guide)"),
]

# ─── TRANSCRIPT ───────────────────────────────────────────────────────────────
def get_transcript_kome(video_id):
    """Fetch transcript via kome.ai (bypasses IP block)."""
    try:
        r = requests.post(
            'https://kome.ai/api/transcript',
            json={'video_id': video_id},
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'https://kome.ai',
                'Referer': 'https://kome.ai/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            timeout=30
        )
        if r.status_code == 200:
            data = r.json()
            return data.get('transcript', '')
        elif r.status_code == 429:
            print(f"  kome.ai 429 — waiting 60s...")
            time.sleep(60)
            # Retry once
            r2 = requests.post(
                'https://kome.ai/api/transcript',
                json={'video_id': video_id},
                headers={
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': 'https://kome.ai',
                    'Referer': 'https://kome.ai/',
                    'User-Agent': 'Mozilla/5.0'
                },
                timeout=30
            )
            if r2.status_code == 200:
                return r2.json().get('transcript', '')
        return None
    except Exception as e:
        print(f"  kome.ai error: {e}")
        return None

def get_transcript_ytt(video_id):
    """Fallback: youtube-transcript-api."""
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        api = YouTubeTranscriptApi()
        t = api.fetch(video_id, languages=['en'])
        return ' '.join([x.text for x in t])
    except Exception as e:
        if '429' in str(e):
            time.sleep(62)
            try:
                from youtube_transcript_api import YouTubeTranscriptApi
                api = YouTubeTranscriptApi()
                t = api.fetch(video_id, languages=['en'])
                return ' '.join([x.text for x in t])
            except:
                return None
        return None

def get_transcript(video_id):
    """Get transcript using kome.ai primary, ytt fallback."""
    transcript = get_transcript_kome(video_id)
    if transcript and len(transcript) > 100:
        return transcript
    # Fallback
    return get_transcript_ytt(video_id)

# ─── GROQ ──────────────────────────────────────────────────────────────────────
def call_groq(title, transcript):
    """Call Groq API for summary. Primary: llama-3.3-70b. Fallback: llama-3.1-8b-instant."""
    MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'meta-llama/llama-4-scout-17b-16e-instruct']

    def _call(model):
        return requests.post(
            'https://api.groq.com/openai/v1/chat/completions',
            headers={'Authorization': f'Bearer {GROQ_KEY}', 'Content-Type': 'application/json'},
            json={
                'model': model,
                'messages': [
                    {'role': 'system', 'content': SYSTEM_PROMPT},
                    {'role': 'user', 'content': f'Titre: {title}\n\nTranscript:\n{transcript[:25000]}'}
                ],
                'max_tokens': 2000,
                'temperature': 0.3
            },
            timeout=60
        )

    for model in MODELS:
        resp = _call(model)
        if resp.status_code == 200:
            print(f"  🤖 Model: {model}")
            return resp.json()['choices'][0]['message']['content']
        elif resp.status_code == 429:
            error_text = resp.text
            if 'tokens per day' in error_text or 'TPD' in error_text:
                print(f"  ⚠️  {model} daily limit reached — trying next model...")
                continue
            else:
                print(f"  Groq 429 (RPM) — waiting 62s...")
                time.sleep(62)
                resp2 = _call(model)
                if resp2.status_code == 200:
                    return resp2.json()['choices'][0]['message']['content']
                continue
        else:
            print(f"  ⚠️  {model} error {resp.status_code}")
            continue

    raise Exception(f"All Groq models failed")

# ─── FILE OPS ──────────────────────────────────────────────────────────────────
def slug(video_id, title):
    safe = title.lower()
    for c in ' |:/$€@#!?,\'\"()[]{}\\/%+*&^':
        safe = safe.replace(c, '-')
    while '--' in safe:
        safe = safe.replace('--', '-')
    safe = safe.strip('-')[:60]
    return f"{video_id}-{safe}"

def output_path(video_id, title):
    return SUMMARIES_DIR / f"{slug(video_id, title)}.md"

def is_done(video_id, title):
    return output_path(video_id, title).exists()

def save_summary(video_id, title, summary, transcript_len):
    md = f"""# {title}

**Source** : https://www.youtube.com/watch?v={video_id}  
**Auteur** : Davie Fogarty — The Oodie ($500M+)  
**Transcript** : {transcript_len} caractères  
**Résumé** : Groq llama-3.3-70b-versatile  

---

{summary}

---

*Généré automatiquement par Clawdbot Prime ⚡*
"""
    output_path(video_id, title).write_text(md, encoding='utf-8')
    print(f"  ✅ Saved: {output_path(video_id, title).name}")

# ─── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    total = len(VIDEOS)
    done = 0
    skipped = 0
    failed = []

    print(f"\n🚀 Davie Fogarty Pipeline — {total} vidéos\n")

    for i, (vid_id, title) in enumerate(VIDEOS, 1):
        print(f"[{i}/{total}] {title[:60]}...")

        if is_done(vid_id, title):
            print(f"  ⏭️  Already done — skip")
            skipped += 1
            done += 1
            continue

        # Fetch transcript
        transcript = get_transcript(vid_id)
        if not transcript:
            print(f"  ❌ No transcript available — marking retry_needed")
            (SUMMARIES_DIR / f"RETRY_{vid_id}.txt").write_text(f"{title}\nhttps://youtube.com/watch?v={vid_id}\n")
            failed.append((vid_id, title, "no_transcript"))
            time.sleep(3)
            continue

        print(f"  📝 Transcript: {len(transcript)} chars")

        # Generate summary
        try:
            summary = call_groq(title, transcript)
        except Exception as e:
            print(f"  ❌ Groq error: {e}")
            failed.append((vid_id, title, str(e)))
            time.sleep(5)
            continue

        save_summary(vid_id, title, summary, len(transcript))
        done += 1

        # Anti-ban: sleep between requests
        if i < total:
            time.sleep(4)

    print(f"\n✅ Done: {done}/{total} | Skipped (cached): {skipped} | Failed: {len(failed)}")
    if failed:
        print("\n⚠️  Failed videos:")
        for vid_id, title, reason in failed:
            print(f"  - {vid_id}: {title[:50]} [{reason}]")

    # Write status report
    status = {
        "total": total,
        "done": done,
        "failed": [(v, t, r) for v, t, r in failed],
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    (BASE_DIR / "pipeline_status.json").write_text(json.dumps(status, ensure_ascii=False, indent=2))
    print("📊 Status saved to pipeline_status.json")

if __name__ == "__main__":
    main()
