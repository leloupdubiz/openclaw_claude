#!/bin/bash
# Whisper + Groq pipeline — Module 2 CRO Research
# Transcrit → Résumé Groq → Supprime vidéo

TRANSCRIPTS="/Users/pc2/.openclaw/workspace/formations/cro-evolve/transcripts"
SUMMARIES="/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries"
MODULE2="/Users/pc2/.openclaw/workspace/formations/mega-import/2. CRO Research"
LOG="/tmp/whisper_module2.log"
CREDS="$HOME/.openclaw/credentials/anthropic.env"

# Charger les clés
if [ -f "$CREDS" ]; then
  export $(grep -v '^#' "$CREDS" | xargs)
fi

echo "[$(date '+%H:%M:%S')] ▶ Démarrage Module 2 Whisper + Groq pipeline" | tee -a "$LOG"

for VIDEO in "$MODULE2"/*.ts "$MODULE2"/*.mp4; do
  [ -f "$VIDEO" ] || continue
  
  NAME=$(basename "$VIDEO" .ts)
  NAME=$(basename "$NAME" .mp4)
  TRANSCRIPT="$TRANSCRIPTS/$NAME.txt"

  if [ -f "$TRANSCRIPT" ]; then
    echo "[$(date '+%H:%M:%S')] ⏩ Transcript déjà fait: $NAME" | tee -a "$LOG"
  else
    SIZE=$(du -sh "$VIDEO" | cut -f1)
    echo "[$(date '+%H:%M:%S')] 🔊 Transcription: $NAME ($SIZE)" | tee -a "$LOG"

    /Users/pc2/Library/Python/3.9/bin/whisper "$VIDEO" \
      --model large-v3-turbo \
      --language en \
      --output_format txt \
      --output_dir "$TRANSCRIPTS" \
      >> "$LOG" 2>&1

    if [ -f "$TRANSCRIPT" ]; then
      WORDS=$(wc -w < "$TRANSCRIPT")
      echo "[$(date '+%H:%M:%S')] ✅ Transcript OK: $NAME ($WORDS mots)" | tee -a "$LOG"
      rm "$VIDEO"
      echo "[$(date '+%H:%M:%S')] 🗑️  Vidéo supprimée: $NAME" | tee -a "$LOG"
      df -h / | tail -1 | tee -a "$LOG"
    else
      echo "[$(date '+%H:%M:%S')] ❌ Échec transcript: $NAME" | tee -a "$LOG"
      continue
    fi
  fi

  # --- RÉSUMÉ GROQ ---
  python3 - <<PYEOF >> "$LOG" 2>&1
import os, sys
from groq import Groq

name = "$NAME"
transcript_path = "$TRANSCRIPT"
summaries_dir = "$SUMMARIES"
groq_key = os.environ.get('GROQ_API_KEY', '')

if not groq_key:
    print(f"⚠️ GROQ_API_KEY manquant — résumé ignoré pour {name}")
    sys.exit(0)

# Déduire le nom du fichier de sortie depuis le nom de la vidéo
import re
num_match = re.match(r'^(\d+)', name)
video_num = int(num_match.group(1)) if num_match else 0
slug = re.sub(r'^[\d\.]+\s*(\(Evolve\))?\s*', '', name).lower()
slug = re.sub(r'[^a-z0-9]+', '-', slug).strip('-')
output_file = f"m02-{video_num:02d}-{slug}.md"
output_path = os.path.join(summaries_dir, output_file)

if os.path.exists(output_path):
    print(f"✅ Résumé déjà existant: {output_file}")
    sys.exit(0)

print(f"📝 Génération résumé Groq: {output_file}", flush=True)

client = Groq(api_key=groq_key)
with open(transcript_path, 'r') as f:
    transcript = f.read()[:25000]

SYSTEM = """Tu es un expert CRO e-commerce DTC. Analyse cette transcription et rédige un résumé structuré en français selon ce format EXACT :

# [TITRE] — Module CRO EVOLVE

## 🎯 Concept Central
[2-3 phrases]

## 📌 Points Clés
[6-8 bullet points actionnables]

## 💡 Insights Actionnables
[4-5 actions concrètes numérotées]

## 🏪 Applications pour drinknellio.com
[3-4 applications pour une boisson bien-être DTC, marché allemand, Meta Ads]

## ⚡ Citation Clé
> *[citation directe du formateur en anglais]*

## 🔗 Connexions avec autres modules
[Liens avec d'autres concepts du cours]"""

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": SYSTEM},
        {"role": "user", "content": f"Transcription '{name}' (Module 2 CRO Research):\n\n{transcript}"}
    ],
    max_tokens=2000,
    temperature=0.3
)

with open(output_path, 'w') as f:
    f.write(response.choices[0].message.content)
print(f"✅ Résumé généré: {output_file}")
PYEOF

  sleep 2
done

echo "[$(date '+%H:%M:%S')] ✅ Module 2 pipeline terminé (Whisper + Groq)" | tee -a "$LOG"
