#!/usr/bin/env python3
"""Génère 10 résumés CRO structurés en FR via Anthropic Claude."""

import os
import json
from anthropic import Anthropic

# Charger API Anthropic
API_KEY = os.getenv("ANTHROPIC_API_KEY")
if not API_KEY:
    # Fallback : lire depuis le fichier des credentials
    cred_file = os.path.expanduser("~/.openclaw/credentials/anthropic.env")
    if os.path.exists(cred_file):
        with open(cred_file) as f:
            for line in f:
                if line.startswith("ANTHROPIC_API_KEY="):
                    API_KEY = line.split("=", 1)[1].strip()
                    break

if not API_KEY:
    print("❌ ANTHROPIC_API_KEY not found")
    exit(1)

client = Anthropic(api_key=API_KEY)

# Transcripts à traiter
transcripts = {
    "understanding_your_product": "1. (Evolve) Understanding Your Product.txt",
    "cro_research_twitter": "16. CRO Research - Twitter.txt",
    "download_entrants_upload_sheet": "22. How To Download Entrants & Upload To Sheet.txt",
    "organize_sheet_feedback_part1": "24. How To Organize Sheet With Feedback Data - Part 1.txt",
    "cro_optimization_hack": "25. Conversion Rate Optimization Hack.txt",
    "organize_sheet_feedback_part3": "26. How To Organize Sheet With Feedback Data - Part 3.txt",
    "upload_knowledge_basis_chatgpt": "28. How To Upload Knowledge Basis To Chat GPT.txt",
    "getting_ready_research_branding": "3. (Evolve) Getting Ready To Do Research + Branding.txt",
    "key_metrics_cro": "3. Key Metrics For CRO.txt",
    "summarize_data_custom_gpt": "30. How To Summarize All Data & Create a Custom GPT.txt",
}

transcripts_dir = os.path.expanduser("~/.openclaw/workspace/formations/cro-evolve/transcripts")
summaries_dir = os.path.expanduser("~/.openclaw/workspace/formations/cro-evolve/summaries")
os.makedirs(summaries_dir, exist_ok=True)

PROMPT_TEMPLATE = """Tu es un expert en CRO et marketing digital. Analyse ce transcript de formation et génère un résumé structuré EN FRANÇAIS.

TRANSCRIPT:
{transcript}

FORMAT EXACT (structure obligatoire) :

# [Titre Court du Concept]

## 🎯 Concept Central
[1-2 lignes : l'idée maîtresse]

## 📌 Points Clés
- [Point 1]
- [Point 2]
- [Point 3]
- [Point 4]
- [Point 5]

## 💡 Insights Stratégiques
[Paragraphe de 3-4 lignes : ce qu'il faut retenir pour améliorer les conversions]

## 📊 Applications pour drinknellio.com
- **Landing Page** : [Comment appliquer à la PDP Nellio]
- **Copy** : [Angle ou hook exploitable]
- **CRO** : [Test ou optimisation à faire]

## 📖 Citation Clé
> "[Citation exacte ou paraphrasée du transcript]"

---

Sois concis mais complet. Pas de blabla. Code markdown parfait.
"""

def slugify(filename):
    """Convertit le nom du fichier en slug."""
    return filename.replace(" ", "_").replace(".", "_").replace("(", "").replace(")", "").replace("-", "_").replace("___", "_").replace("__", "_").lower()

def generate_summary(slug, filename):
    """Génère le résumé pour un transcript."""
    filepath = os.path.join(transcripts_dir, filename)
    
    if not os.path.exists(filepath):
        print(f"❌ Fichier manquant : {filepath}")
        return False
    
    # Lire le transcript
    with open(filepath, 'r', encoding='utf-8') as f:
        transcript = f.read()
    
    # Tronquer si trop long (Groq a des limites)
    if len(transcript) > 10000:
        transcript = transcript[:10000]
    
    print(f"⏳ {slug}... (lecture: {len(transcript)} chars)")
    
    # Appeler Claude
    try:
        message = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=1500,
            messages=[
                {
                    "role": "user",
                    "content": PROMPT_TEMPLATE.format(transcript=transcript)
                }
            ]
        )
        
        summary_text = message.content[0].text
        
        # Sauvegarder
        output_path = os.path.join(summaries_dir, f"{slug}.md")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(summary_text)
        
        print(f"✅ {slug}.md")
        return True
    
    except Exception as e:
        print(f"❌ Erreur {slug}: {str(e)}")
        return False

# Génération
print("\n🚀 Démarrage génération 10 résumés CRO...\n")
count = 0
for slug, filename in transcripts.items():
    if generate_summary(slug, filename):
        count += 1

print(f"\n✅ {count}/10 résumés générés")
