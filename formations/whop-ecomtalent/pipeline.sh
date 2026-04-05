#!/bin/bash
# Pipeline EcomTalent : download → transcribe → summarize
# Usage: bash pipeline.sh [lessonId] [hlsUrl] [title]

LESN_ID="$1"
HLS_URL="$2"
TITLE="$3"

BASE_DIR="$HOME/.openclaw/workspace/formations/whop-ecomtalent"
TRANSCRIPT_DIR="$BASE_DIR/transcripts"
SUMMARY_DIR="$BASE_DIR/summaries"
AUDIO_FILE="/tmp/ecomtalent_${LESN_ID}.mp3"
TRANSCRIPT_FILE="$TRANSCRIPT_DIR/${LESN_ID}.txt"
SUMMARY_FILE="$SUMMARY_DIR/${LESN_ID}.md"

mkdir -p "$TRANSCRIPT_DIR" "$SUMMARY_DIR"

# Skip si déjà fait
[ -f "$SUMMARY_FILE" ] && echo "✅ $LESN_ID déjà traité" && exit 0

echo "⬇️  Téléchargement: $TITLE"
yt-dlp -x --audio-format mp3 -o "$AUDIO_FILE" "$HLS_URL" --quiet 2>&1
if [ ! -f "$AUDIO_FILE" ]; then echo "❌ Download échoué pour $LESN_ID" && exit 1; fi

echo "🎙️  Transcription Whisper..."
/Users/pc2/Library/Python/3.9/bin/whisper "$AUDIO_FILE" \
  --model large-v3-turbo --language en \
  --output_format txt --output_dir /tmp/ \
  --fp16 False 2>/dev/null
TRANSCRIPT_TMP="/tmp/ecomtalent_${LESN_ID}.txt"
[ ! -f "$TRANSCRIPT_TMP" ] && echo "❌ Transcription échouée" && exit 1
cp "$TRANSCRIPT_TMP" "$TRANSCRIPT_FILE"
rm -f "$AUDIO_FILE" "$TRANSCRIPT_TMP"

echo "🧠  Résumé Groq..."
GROQ_KEY=$(grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2)
TRANSCRIPT_TEXT=$(cat "$TRANSCRIPT_FILE")
python3 << PYEOF
import os, json
from groq import Groq

client = Groq(api_key="$GROQ_KEY")
title = "$TITLE"
lesn_id = "$LESN_ID"
transcript = open("$TRANSCRIPT_FILE").read()[:30000]

prompt = f"""Tu es un expert en marketing digital et publicité Meta Ads.
Résume cette leçon EcomTalent de façon structurée et actionnable pour drinknellio.com.

Leçon : {title}

Transcript :
{transcript}

Format de réponse :
# {title}
> ID: {lesn_id} | Traité le $(date +%Y-%m-%d)

## 🎯 Concept Central
[2-3 phrases]

## 📌 Points Clés
[5-8 bullets actionnables]

## 💡 Frameworks & Méthodes
[Frameworks spécifiques mentionnés]

## 🏪 Application pour drinknellio.com
[2-4 applications concrètes]

## ⚡ Citation Clé
> [citation mémorable de la leçon]
"""

r = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role":"user","content":prompt}],
    max_tokens=2000
)
summary = r.choices[0].message.content
with open("$SUMMARY_FILE","w") as f:
    f.write(summary)
print(f"✅ Résumé sauvegardé: $SUMMARY_FILE")
PYEOF

echo "✅ $LESN_ID terminé: $TITLE"
