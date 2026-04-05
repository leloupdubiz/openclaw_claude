#!/usr/bin/env python3
"""
Pipeline complet : Playlist MASTER @mpellegrini7
Génère les transcripts FR + résumés Groq pour chaque épisode
Usage: python3 pipeline.py [--force] [--groq-only] [--transcripts-only]
"""

import os
import sys
import json
import time
import requests
import re
import http.cookiejar
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────
GROQ_KEY = os.environ.get('GROQ_API_KEY', '')
BASE_DIR = Path(__file__).parent
SUMMARIES_DIR = BASE_DIR / 'summaries'
TRANSCRIPTS_DIR = BASE_DIR / 'transcripts_cache'  # Cache des transcripts bruts
INDEX_FILE = BASE_DIR / 'INDEX.md'
CHECKPOINT_FILE = Path('/Users/pc2/.openclaw/workspace/checkpoints/master-pellegrini-progress.md')
SUMMARIES_DIR.mkdir(exist_ok=True)
TRANSCRIPTS_DIR.mkdir(exist_ok=True)
CHECKPOINT_FILE.parent.mkdir(exist_ok=True)

SYSTEM_PROMPT = """Tu es Clawdbot Prime, expert e-commerce DTC. Résume ce transcript de masterclass e-commerce en français structuré. Focus : Meta Ads, créatives, scaling, copywriting, offre, mindset. Application spécifique à drinknellio.com (anti-stress poudre marché allemand, avatars : stressed professionals / busy moms / students / wellness enthusiasts, AOV cible €89.99 bundle, angles : Cortisol/Schlaf/Identité pro).

Format OBLIGATOIRE :
# [Titre de l'épisode]
## 🎯 Concept Central
(2-3 phrases)
## 📌 Points Clés
(5-8 bullets)
## 💡 Insights Actionnables
(3-5 numérotés)
## 🏪 Applications directes drinknellio.com
| Insight | Application | Impact |
|---------|-------------|--------|
## ⚡ Citations Clés
(2-4 citations verbatim du transcript)"""

# ── Playlist (ordre chronologique #1 → #43) ──────────────────────────────────
PLAYLIST = [
    ("ExwE3W61HUg", "SCALING, PRODUIT GAGNANT, CRÉATIVES HACKS, 20 MILLIONS | MASTER #1"),
    ("q-1EIvSRgJg", "200 MILLIONS, GOOGLE ADS, DROPSHIPPING, CANAUX INEXPLOITÉS - Gabriel Dxb | MASTER #2"),
    ("Rb4IjG6JH9A", "SCALING PROCESS, MARCHÉ US, TIKTOK SHOP | MASTER #3"),
    ("FJs5XphakTo", "1'200'000€/MOIS, CRÉATION DE MARQUE, STRATÉGIE ADS 2025 | MASTER #4"),
    ("KmwLcUndss0", "PIRES ERREURS, MARCHÉ US, SCALING, PRODUCTIVITÉ | MASTER #5"),
    ("FB_ch2XvZS0", "CREATIVES IA, SCALING, DEEPWORK, REUSSIR 2025 | MASTER #6"),
    ("sZaGPiE42pk", "20'000'000€/AN, TEMU, ARNAQUES, PRODUIT GAGNANT | MASTER #7"),
    ("G2Arm_dmm9c", "TIKTOK SHOP, PRODUITS, CRO, CREATIVE WINNER | MASTER #8"),
    ("bZ9a0pJbiSM", "50 MILLIONS, SCALING HACKS, MARKETING, IA, MARQUE | MASTER #9"),
    ("kJIhT6b1sJs", "SCALING, FACEBOOK ADS, A/B TESTING, DROPSHIPPING IA | MASTER #10"),
    ("JjIwFi4CRrM", "700'000€/MOIS, TVA, ARNAQUES, CHINE, TIKTOK ADS | MASTER #11"),
    ("7tD6tNYaTsY", "VISION, SCALING, A PLAYER, EXIT, MARQUE, IA | MASTER #12"),
    ("CZ0rK5gM9xQ", "SCALING, ÉQUIPE, SOP 30K/DAY, CREATIVE STRATEGIST | MASTER #13"),
    ("ztAEP1buHgo", "200 MILLIONS, MARCHÉ US, SCALING META, VSL, FUNNEL | MASTER #14"),
    ("POyOGFg279w", "PRODUCTIVITÉ, SCALING, AOV, PRODUIT, STRUCTURE | MASTER #15"),
    ("AoaPfeOdz8E", "100'000€/JOUR, FASHION, PSP, ÉQUIPE, DROPSHIPPING | MASTER #16"),
    ("TF2GmuI68bI", "25'000'000€/AN ADSPEND, SCALING META, CROISSANCE D'ÉQUIPE, MARCHÉ US/CA | MASTER #17"),
    ("PdbB0TwY2RY", "HIGH TICKET, NOUVELLE IA VO3, SCALING, OFFRE, APPLOVIN | MASTER #18"),
    ("OTfGj1c0YPw", "110'000€ PERDUS, META SETUP, RECURRING, MARQUE, ÉQUIPE | MASTER #19"),
    ("-lhY3dieWVU", "DÉCISIONS SOP, TRACKING LIST, SYSTÈME CRÉATIVES, OUTILS IA & V03 | MASTER #20"),
    ("CZ2UFY1yFCc", "IA, SCALING HACK, META ADS, LANDING PAGES | MASTER #21"),
    ("9mEkl8pvH1E", "8 FIGURES, COPYWRITING IA, SCALING HACKS, META ADS | MASTER #22"),
    ("G1tKeAiBx5Y", "+10'000'000€, META ADS, MARQUE FR, CRÉATIVES PROCESS, SCALE | MASTER #23"),
    ("K0ivaKNqRD8", "120 BOUTIQUES, 1M€/MOIS EN SEO, REVENTE, AMAZON FBA, SOP, ÉQUIPE | MASTER #24"),
    ("Us6LYoYmcv0", "SCALING META, LANDING PAGES, CRÉATIVES HACKS, HORMOZI, SANTÉ 1% | MASTER #25"),
    ("x1i_wpH3AjI", "EXPERT IA, UPDATE META, GUIDE GPT, CRÉATIVES IA, DEEPWORK HACKS | MASTER #26"),
    ("BIeqEQJ7zMA", "Q4 CHECKLIST, MISTAKES TO AVOID, BFCM STRATEGY, OFFER, CREATIVES, TIKTOK SHOP | MASTER #27"),
    ("7IrVAu6diSk", "ORGANISATION, ROUTINE, RECHERCHE PRODUIT, PRODUCTIVITÉ | MASTER #28"),
    ("P-5TpnYJMY8", "SCALING, EXIT, GOOGLE ADS, RECURRING, RECRUTEMENT, UPSELL | MASTER #29"),
    ("83wnD0bt79A", "350M€ PROCESS, SCALING, RECRUTEMENT, META ADS, IA | MASTER #30"),
    ("ufWtt-gWzL8", "MRR, SCALING US, TEAM, RECRUTEMENT, VISION 2026 | MASTER #31"),
    ("xSn9QrZPoTI", "DE 0€ À 100K€, 100K À 1M€ PAR MOIS (en 2026), META ADS | MASTER #32"),
    ("xMbDSuR-g34", "AI Scaling, Creatives, Productivity, Meta Ads | MASTER #33"),
    ("CFijt3CuhKw", "1M€ EN 6H, RECURRING, 20M€, MARQUE FR | MASTER #34"),
    ("ZFwZj7dpOks", "VISION, ADVERTORIALS, CREATIVE TIPS | MASTER #35"),
    ("qAtvstPWA5k", "PRODUIT, OFFRE 100M€, CRÉATION MARQUE, PLAN 2026 | MASTER #36"),
    ("M8GX7dd6rNc", "2'500'000€/MOIS, SCALING, BUSINESS PLAN, META ADS | MASTER #37"),
    ("tpkuvwSJF4Y", "SCALING HACKS, META 2026, LOI ATTRACTION, TIPS MARKETING | MASTER #38"),
    ("BFYy9FLCojQ", "PLAN 2026, PRODUIT, 25'000'000€ | MASTER #39"),
    ("bEYKXodP0P0", "1M€+/MOIS, ADVERTORIALS, VALUE RAFALE | MASTER #40"),
    ("iuHAeqx4JP8", "€60M, COPYWRITING, POSITIONING, VISION | MASTER #41"),
    ("aXsRx0gG3fo", "MANUS AI, ÉQUIPE, PROCESS 0€-17K€/DAY | MASTER #42"),
    ("zWKE6cAyZ7k", "IA PROCESS, FUNNEL, CRO HACK | MASTER #43"),
]

def make_api_session():
    """Crée une session requests avec cookies Chrome pour contourner les blocks IP."""
    session = requests.Session()
    session.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    # Essaie de charger les cookies Chrome exportés
    cookie_file = '/tmp/yt-cookies.txt'
    if os.path.exists(cookie_file):
        try:
            cj = http.cookiejar.MozillaCookieJar(cookie_file)
            cj.load()
            session.cookies = cj
        except Exception:
            pass
    return session

def get_transcript(video_id, languages=['fr', 'en']):
    """Récupère le transcript via yt_helper (yt-dlp + fallback youtube-transcript-api)."""
    try:
        import sys
        sys.path.insert(0, '/Users/pc2/.openclaw/workspace/formations')
        from yt_helper import get_transcript as _get
        text, lang = _get(video_id, languages=tuple(languages))
        return text, lang
    except Exception as e:
        return None, None

def groq_summary(title, transcript, max_retries=6):
    """Génère un résumé via Groq avec retry automatique sur rate limit."""
    for attempt in range(max_retries):
        try:
            resp = requests.post(
                'https://api.groq.com/openai/v1/chat/completions',
                headers={'Authorization': f'Bearer {GROQ_KEY}', 'Content-Type': 'application/json'},
                json={
                    'model': 'llama-3.3-70b-versatile',
                    'messages': [
                        {'role': 'system', 'content': SYSTEM_PROMPT},
                        {'role': 'user', 'content': f'Titre : {title}\n\nTranscript :\n\n{transcript[:25000]}'}
                    ],
                    'max_tokens': 2000,
                    'temperature': 0.3
                },
                timeout=60
            )
            data = resp.json()
            if 'choices' in data:
                return data['choices'][0]['message']['content']
            elif 'error' in data:
                err = data['error']
                code = err.get('code', '')
                if 'rate_limit' in code or 'rate_limit' in str(code):
                    msg = err.get('message', '')
                    m = re.search(r'try again in ([\d.]+)s', msg)
                    wait = float(m.group(1)) + 3 if m else 65
                    print(f"  ⏳ Rate limit — attente {wait:.0f}s (tentative {attempt+1}/{max_retries})...")
                    time.sleep(wait)
                    continue
                else:
                    print(f"  Groq error: {err}")
                    time.sleep(10)
                    if attempt < max_retries - 1:
                        continue
                    return None
        except Exception as e:
            print(f"  Groq exception: {e}")
            if attempt < max_retries - 1:
                time.sleep(15)
                continue
            return None
    return None

def ep_num_from_title(title, idx):
    m = re.search(r'MASTER #(\d+)', title, re.IGNORECASE)
    return int(m.group(1)) if m else (idx + 1)

def summary_filename(ep_num):
    return f"master-{ep_num:02d}.md"

def transcript_cache_path(video_id):
    return TRANSCRIPTS_DIR / f"{video_id}.txt"

def save_checkpoint(processed, total, stats):
    with open(CHECKPOINT_FILE, 'w') as f:
        f.write(f"# Progress — Master Pellegrini Pipeline\n")
        f.write(f"Traité : {processed}/{total}\n\n")
        f.write(f"## Stats\n")
        f.write(f"- ✅ Résumés générés : {stats['ok']}\n")
        f.write(f"- ❌ Transcripts indisponibles : {stats['no_transcript']}\n")
        f.write(f"- ⚠️ Erreurs Groq : {stats['groq_error']}\n\n")
        f.write(f"## Dernière mise à jour\n{time.strftime('%Y-%m-%d %H:%M:%S')}\n")

def restart_library():
    os.system("pkill -f 'node.*library/server.js' 2>/dev/null; sleep 1; cd /Users/pc2/.openclaw/workspace/library && nohup node server.js > /tmp/clawdbot-library.log 2>&1 &")
    time.sleep(2)

def build_index(results):
    ok = sum(1 for r in results if '✅' in r['status'])
    no_t = sum(1 for r in results if 'transcript' in r['status'])
    err = sum(1 for r in results if 'erreur' in r['status'])
    
    lines = [
        f"# 📋 INDEX — Playlist MASTER @mpellegrini7\n\n",
        f"Généré le : {time.strftime('%Y-%m-%d %H:%M')}\n\n",
        f"**Statut** : ✅ {ok} résumés | ❌ {no_t} sans transcript | ⚠️ {err} erreurs\n\n",
        "| # | Titre | Statut | Fichier |\n",
        "|---|-------|--------|--------|\n"
    ]
    for r in sorted(results, key=lambda x: x['num']):
        lines.append(f"| {r['num']:02d} | {r['title'][:60]} | {r['status']} | {r.get('file', '—')} |\n")
    with open(INDEX_FILE, 'w') as f:
        f.writelines(lines)

def main():
    force = '--force' in sys.argv
    groq_only = '--groq-only' in sys.argv
    transcripts_only = '--transcripts-only' in sys.argv

    if not GROQ_KEY and not transcripts_only:
        print("❌ GROQ_API_KEY manquante")
        sys.exit(1)

    results = []
    stats = {'ok': 0, 'no_transcript': 0, 'groq_error': 0}
    total = len(PLAYLIST)

    print(f"🚀 Pipeline Master Pellegrini — {total} épisodes")
    if groq_only:
        print("   Mode : Groq only (utilise cache transcripts)")
    elif transcripts_only:
        print("   Mode : Transcripts only (pas de Groq)")
    print(f"{'─'*60}")

    for i, (video_id, title) in enumerate(PLAYLIST):
        ep_num = ep_num_from_title(title, i)
        fn = summary_filename(ep_num)
        summary_path = SUMMARIES_DIR / fn
        transcript_cache = transcript_cache_path(video_id)
        
        print(f"\n[{i+1:02d}/{total}] #{ep_num} — {title[:55]}...")

        # Skip si résumé déjà complet
        if summary_path.exists() and not force:
            content = summary_path.read_text()
            if len(content) > 200 and '❌' not in content[:50]:
                print(f"  ⏭️  Déjà traité → {fn}")
                stats['ok'] += 1
                results.append({'num': ep_num, 'title': title, 'status': '✅ résumé complet', 'file': fn})
                continue

        # Récupération transcript
        transcript = None
        lang = None

        if groq_only:
            # Mode groq-only : utilise le cache
            if transcript_cache.exists():
                transcript = transcript_cache.read_text()
                lang = 'cache'
                print(f"  📂 Transcript depuis cache ({len(transcript):,} chars)")
            else:
                print(f"  ⚠️ Pas de cache transcript → skip")
                stats['no_transcript'] += 1
                results.append({'num': ep_num, 'title': title, 'status': '❌ pas de cache', 'file': '—'})
                continue
        else:
            # Mode normal : fetch transcript
            if transcript_cache.exists() and not force:
                transcript = transcript_cache.read_text()
                lang = 'cache'
                print(f"  📂 Transcript depuis cache ({len(transcript):,} chars)")
            else:
                print(f"  📥 Récupération transcript...")
                transcript, lang = get_transcript(video_id)
                if transcript:
                    # Sauvegarder dans le cache
                    transcript_cache.write_text(transcript)
                    print(f"  ✅ Transcript {lang} — {len(transcript):,} chars (mis en cache)")

        if not transcript:
            print(f"  ❌ Transcript indisponible")
            stats['no_transcript'] += 1
            results.append({'num': ep_num, 'title': title, 'status': '❌ transcript indisponible', 'file': '—'})
            # Stub minimal
            if not summary_path.exists():
                summary_path.write_text(f"# {title}\n\n> ❌ Transcript indisponible (video_id: {video_id})\n")
            continue

        if transcripts_only:
            stats['ok'] += 1
            results.append({'num': ep_num, 'title': title, 'status': '✅ transcript mis en cache', 'file': '—'})
            continue

        # Génération résumé Groq
        print(f"  🤖 Génération résumé Groq...")
        summary = groq_summary(title, transcript)

        if not summary:
            print(f"  ⚠️ Erreur Groq après retries")
            stats['groq_error'] += 1
            results.append({'num': ep_num, 'title': title, 'status': '⚠️ erreur Groq', 'file': '—'})
            continue

        # Sauvegarde résumé
        summary_path.write_text(f"<!-- video_id: {video_id} -->\n{summary}\n")
        stats['ok'] += 1
        results.append({'num': ep_num, 'title': title, 'status': '✅ résumé généré', 'file': fn})
        print(f"  💾 Sauvegardé → {fn}")

        # Pause pour respecter le rate limit Groq (12K TPM)
        # ~7K tokens par call → 1 call/min safe
        print(f"  ⏳ Pause 62s (rate limit Groq 12K TPM)...")
        time.sleep(62)

        # Checkpoint toutes les 10 vidéos
        if (i + 1) % 10 == 0:
            save_checkpoint(i + 1, total, stats)
            print(f"\n⚡ Checkpoint {i+1}/{total}")

        # Restart library toutes les 5 vidéos
        if (i + 1) % 5 == 0:
            print(f"  🔄 Restart library server...")
            restart_library()

    # Index final
    results.sort(key=lambda x: x['num'])
    build_index(results)
    save_checkpoint(total, total, stats)
    
    # Restart final
    restart_library()

    print(f"\n{'═'*60}")
    print(f"✅ Pipeline terminé !")
    print(f"   Résumés générés : {stats['ok']}/{total}")
    print(f"   Transcripts indisponibles : {stats['no_transcript']}")
    print(f"   Erreurs Groq : {stats['groq_error']}")

    return stats

if __name__ == '__main__':
    main()
