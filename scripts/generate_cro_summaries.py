#!/usr/bin/env python3
import os
import json
import subprocess
from groq import Groq

# Load Groq API key
groq_key = subprocess.check_output("grep GROQ_API_KEY ~/.openclaw/credentials/anthropic.env | cut -d= -f2", shell=True).decode().strip()
client = Groq(api_key=groq_key)

# Define transcripts and output mapping
transcripts = {
    "Understanding Your Product": {
        "file": "1. (Evolve) Understanding Your Product.txt",
        "slug": "01_understanding_your_product"
    },
    "CRO Research - Twitter": {
        "file": "16. CRO Research - Twitter.txt",
        "slug": "16_cro_research_twitter"
    },
    "How To Download Entrants": {
        "file": "22. How To Download Entrants & Upload To Sheet.txt",
        "slug": "22_download_entrants_sheet"
    },
    "Organize Sheet Feedback Part 1": {
        "file": "24. How To Organize Sheet With Feedback Data - Part 1.txt",
        "slug": "24_organize_sheet_feedback_part1"
    },
    "CRO Hack - QA Pages": {
        "file": "25. Conversion Rate Optimization Hack.txt",
        "slug": "25_cro_hack_qa_pages"
    },
    "Organize Sheet Feedback Part 3": {
        "file": "26. How To Organize Sheet With Feedback Data - Part 3.txt",
        "slug": "26_organize_sheet_feedback_part3"
    },
    "Upload Knowledge Basis ChatGPT": {
        "file": "28. How To Upload Knowledge Basis To Chat GPT.txt",
        "slug": "28_upload_knowledge_chatgpt"
    },
    "Getting Ready Research Branding": {
        "file": "3. (Evolve) Getting Ready To Do Research + Branding.txt",
        "slug": "03_getting_ready_research"
    },
    "Key Metrics For CRO": {
        "file": "3. Key Metrics For CRO.txt",
        "slug": "09_key_metrics_cro"
    },
    "Summarize Data Create Custom GPT": {
        "file": "30. How To Summarize All Data & Create a Custom GPT.txt",
        "slug": "30_summarize_create_custom_gpt"
    }
}

base_path = "/Users/pc2/.openclaw/workspace/formations/cro-evolve/transcripts"
output_path = "/Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries"

os.makedirs(output_path, exist_ok=True)

prompt_template = """Tu es un expert en CRO et e-commerce. Lis ce transcript de formation et génère un résumé structuré en FRANÇAIS.

Format obligatoire (respecte à la lettre):
# {title}

## Concept Central
[Une phrase qui capture l'essence]

## Points Clés
- [Point 1]
- [Point 2]
- [Point 3]

## Insights
- [Insight 1 sur la conversion ou l'optimisation]
- [Insight 2 actionnable]

## Applications pour Nellio UltraCalm (drinknellio.com)
- [Action 1 concrète]
- [Action 2 concrète]

## Citation
> "[Extrait du transcript]"

---

TRANSCRIPT À RÉSUMER:
{content}

Génère le résumé maintenant."""

def read_transcript(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def generate_summary(title, content):
    """Generate summary using Groq API"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=800,
        messages=[
            {
                "role": "user",
                "content": prompt_template.format(title=title, content=content[:3000])  # Limit content size
            }
        ]
    )
    return response.choices[0].message.content

def save_summary(slug, content):
    """Save summary to file"""
    filepath = os.path.join(output_path, f"{slug}.md")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Sauvegardé: {filepath}")
    return filepath

# Generate all summaries
results = []
for idx, (title, config) in enumerate(transcripts.items(), 1):
    file_path = os.path.join(base_path, config["file"])
    
    print(f"\n[{idx}/10] Traitement: {title}")
    print(f"  📄 Lecture: {config['file']}")
    
    try:
        content = read_transcript(file_path)
        print(f"  🤖 Génération du résumé...")
        summary = generate_summary(title, content)
        
        filepath = save_summary(config["slug"], summary)
        results.append({
            "index": idx,
            "title": title,
            "slug": config["slug"],
            "file": filepath,
            "status": "✅"
        })
    except Exception as e:
        print(f"  ❌ Erreur: {str(e)}")
        results.append({
            "index": idx,
            "title": title,
            "slug": config["slug"],
            "status": "❌",
            "error": str(e)
        })

# Summary report
print("\n" + "="*60)
print("RAPPORT FINAL — 10 Résumés CRO")
print("="*60)
for r in results:
    status = r["status"]
    title = r["title"]
    print(f"{status} [{r['index']:02d}] {title}")

success_count = sum(1 for r in results if r["status"] == "✅")
print(f"\n✅ Succès: {success_count}/10")
print(f"📁 Dossier: {output_path}")

# Return JSON for cron logging
print("\n" + json.dumps(results, ensure_ascii=False, indent=2))
