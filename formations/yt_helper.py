#!/usr/bin/env python3
"""
Helper: get YouTube transcript via yt-dlp (bypasses IP blocks on youtube-transcript-api).
Falls back to youtube-transcript-api if yt-dlp fails.
"""
import os, re, subprocess, tempfile, time

def vtt_to_text(vtt_content):
    """Parse VTT subtitle file to plain text."""
    lines = vtt_content.split('\n')
    seen = set()
    texts = []
    for line in lines:
        line = line.strip()
        if not line or line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:'):
            continue
        if re.match(r'^\d{2}:\d{2}:\d{2}\.\d{3} -->', line):
            continue
        # Remove inline timing tags like <00:00:01.280><c> text</c>
        cleaned = re.sub(r'<[^>]+>', '', line).strip()
        if cleaned and cleaned not in seen:
            seen.add(cleaned)
            texts.append(cleaned)
    return ' '.join(texts)

def get_transcript_ytdlp(video_id, languages=('en', 'fr')):
    """Download subtitles via yt-dlp, return (text, lang) or (None, None)."""
    with tempfile.TemporaryDirectory() as tmpdir:
        for lang in languages:
            try:
                cmd = [
                    'yt-dlp',
                    '--write-auto-subs',
                    f'--sub-langs', lang,
                    '--skip-download',
                    '--quiet',
                    '--no-warnings',
                    '--output', os.path.join(tmpdir, '%(id)s'),
                    f'https://www.youtube.com/watch?v={video_id}'
                ]
                result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
                
                # Find the downloaded VTT file
                vtt_file = os.path.join(tmpdir, f'{video_id}.{lang}.vtt')
                if os.path.exists(vtt_file):
                    with open(vtt_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                    text = vtt_to_text(content)
                    if len(text) > 100:
                        return text, lang
                        
                # Try alternate filename formats
                for f in os.listdir(tmpdir):
                    if f.endswith('.vtt') and lang in f:
                        with open(os.path.join(tmpdir, f), 'r', encoding='utf-8') as fp:
                            content = fp.read()
                        text = vtt_to_text(content)
                        if len(text) > 100:
                            return text, lang
                            
            except subprocess.TimeoutExpired:
                print(f"  ⚠️ yt-dlp timeout for {video_id} ({lang})")
            except Exception as e:
                print(f"  ⚠️ yt-dlp error for {video_id} ({lang}): {e}")
            
            time.sleep(2)
    
    return None, None

def get_transcript(video_id, languages=('en', 'fr')):
    """Try youtube-transcript-api first, fallback to yt-dlp."""
    # Try yt-dlp first (more reliable when IP is blocked)
    text, lang = get_transcript_ytdlp(video_id, languages)
    if text:
        return text, lang
    
    # Fallback: youtube-transcript-api
    try:
        import signal
        def handler(signum, frame):
            raise TimeoutError("API timeout")
        signal.signal(signal.SIGALRM, handler)
        signal.alarm(15)
        try:
            from youtube_transcript_api import YouTubeTranscriptApi
            api = YouTubeTranscriptApi()
            for lang in languages:
                try:
                    segs = api.fetch(video_id, languages=[lang])
                    text = ' '.join(s.text for s in segs)
                    if len(text) > 100:
                        return text, lang
                except Exception:
                    continue
        finally:
            signal.alarm(0)
    except Exception as e:
        pass
    
    return None, None

if __name__ == '__main__':
    import sys
    vid = sys.argv[1] if len(sys.argv) > 1 else 'BnYFwQEAJls'
    print(f"Testing transcript fetch for {vid}...")
    text, lang = get_transcript(vid)
    if text:
        print(f"✅ Got transcript in '{lang}': {len(text)} chars")
        print(text[:500])
    else:
        print("❌ Failed to get transcript")
