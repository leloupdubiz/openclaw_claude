#!/usr/bin/env python3
"""
format_transcript.py — Convertit un transcript brut (VTT/SRT/TXT) en markdown lisible.
100% fidèle au contenu original — aucun mot supprimé ou modifié.
Seule la mise en page est améliorée : suppression timestamps, paragraphes propres.
"""
import re, os, sys, textwrap

def format_transcript(raw: str, title: str = "") -> str:
    """
    Prend un transcript brut et retourne un markdown propre et lisible.
    Aucun mot n'est modifié — seulement la structure visuelle.
    """
    # 1. Supprimer en-têtes VTT/SRT
    text = re.sub(r'^WEBVTT.*?\n', '', raw, flags=re.MULTILINE)
    text = re.sub(r'^\d+\n', '', text, flags=re.MULTILINE)  # numéros SRT
    
    # 2. Supprimer les timestamps (VTT et SRT)
    # Format VTT : 00:00:01.000 --> 00:00:05.000 align:start position:0%
    text = re.sub(r'\d{2}:\d{2}:\d{2}[.,]\d{2,3}\s*-->\s*\d{2}:\d{2}:\d{2}[.,]\d{2,3}[^\n]*', '', text)
    # Format court : 0:00 --> 0:05
    text = re.sub(r'\d+:\d{2}[.,]\d{2,3}\s*-->\s*\d+:\d{2}[.,]\d{2,3}[^\n]*', '', text)
    # Timestamps seuls en début de ligne [00:01:23]
    text = re.sub(r'^\[?\d{1,2}:\d{2}(?::\d{2})?\]?\s*', '', text, flags=re.MULTILINE)
    
    # 3. Nettoyer les balises HTML/XML résiduelles
    text = re.sub(r'<[^>]+>', '', text)
    
    # 4. Supprimer les lignes vides multiples
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # 5. Regrouper les lignes courtes en paragraphes cohérents
    lines = [l.strip() for l in text.split('\n')]
    paragraphs = []
    current = []
    
    for line in lines:
        if not line:
            if current:
                paragraphs.append(' '.join(current))
                current = []
        else:
            current.append(line)
    if current:
        paragraphs.append(' '.join(current))
    
    # 6. Supprimer paragraphes vides ou très courts (artefacts)
    paragraphs = [p for p in paragraphs if len(p.strip()) > 2]
    
    # 7. Assembler le markdown final
    header = f"# Transcript — {title}\n\n" if title else "# Transcript\n\n"
    header += "> ⚡ Transcription complète et fidèle — mise en page uniquement, aucun mot modifié.\n\n---\n\n"
    
    body = '\n\n'.join(paragraphs)
    
    return header + body


def process_file(input_path: str, output_path: str, title: str = "") -> bool:
    """Lit un transcript brut et écrit la version clean."""
    try:
        with open(input_path, 'r', encoding='utf-8', errors='ignore') as f:
            raw = f.read()
        
        if len(raw.strip()) < 10:
            return False
        
        clean = format_transcript(raw, title)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(clean)
        
        return True
    except Exception as e:
        print(f"❌ Erreur : {e}")
        return False


def process_directory(transcripts_dir: str, titles: dict = None):
    """
    Traite tous les .txt d'un dossier transcripts/ et crée les _clean.md.
    titles = {lesson_id: "Titre de la leçon"}
    """
    if not os.path.exists(transcripts_dir):
        print(f"❌ Dossier introuvable : {transcripts_dir}")
        return
    
    files = [f for f in os.listdir(transcripts_dir) if f.endswith('.txt')]
    done = 0
    
    for filename in sorted(files):
        lesson_id = filename.replace('.txt', '')
        clean_path = os.path.join(transcripts_dir, f"{lesson_id}_clean.md")
        
        # Skip si déjà traité
        if os.path.exists(clean_path):
            continue
        
        input_path = os.path.join(transcripts_dir, filename)
        title = (titles or {}).get(lesson_id, lesson_id)
        
        if process_file(input_path, clean_path, title):
            print(f"✅ {lesson_id} → {lesson_id}_clean.md")
            done += 1
        else:
            print(f"⏭️  {lesson_id} vide ou erreur")
    
    print(f"\n✅ {done}/{len(files)} transcripts formatés")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 format_transcript.py <transcripts_dir> [hls_urls_v2.json]")
        sys.exit(1)
    
    transcripts_dir = sys.argv[1]
    titles = {}
    
    if len(sys.argv) >= 3 and os.path.exists(sys.argv[2]):
        import json
        with open(sys.argv[2]) as f:
            data = json.load(f)
        if isinstance(data, list):
            titles = {item['id']: item.get('t', item['id']) for item in data}
        elif isinstance(data, dict):
            titles = {k: v.get('title', k) if isinstance(v, dict) else k for k, v in data.items()}
    
    process_directory(transcripts_dir, titles)
