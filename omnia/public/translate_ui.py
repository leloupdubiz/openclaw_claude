import re

with open('/Users/pc2/.openclaw/workspace/omnia/public/index.html', 'r') as f:
    content = f.read()

# Backup
with open('/Users/pc2/.openclaw/workspace/omnia/public/index.html.bak', 'w') as f:
    f.write(content)

replacements = [
    # Batch names
    ("Batch #1 — Der Cortisol-Wecker", "Batch #1 — Le Réveil au Cortisol"),
    ("Batch #1 — Cortisol-Wecker", "Batch #1 — Le Réveil au Cortisol"),
    ("Der Cortisol-Wecker", "Le Réveil au Cortisol"),
    ("Batch #2 — Gedankenkarussell", "Batch #2 — Le Carrousel de Pensées"),
    ("Batch #3 — Cortisol-Körper", "Batch #3 — Corps & Cortisol"),
    ("Cortisol-Körper Sichtbar", "Corps & Cortisol Visible"),
    ("Cortisol-Körper", "Corps & Cortisol"),
    ("Batch #4 — Alles versucht", "Batch #4 — J'ai Tout Essayé"),
    ("Alles versucht — jetzt das Richtige", "J'ai tout essayé — enfin la solution"),
    # Angle dropdown labels (keep value attr, change display text)
    (">Das 3-Uhr-Signal<", ">Le Signal 3h du Matin<"),
    (">Die Aufnahme-Revolution<", ">La Révolution d'Absorption<"),
    (">Das Kopfkino-Protokoll<", ">Le Protocole Mental<"),
    (">Der Cortisol-Wecker<", ">Le Réveil au Cortisol<"),
    (">Alles versucht<", ">J'ai Tout Essayé<"),
    # Avatar chips
    ("A1 · Die Erschöpfte Berufstätige", "A1 · La Pro Épuisée"),
    ("A2 · Die Überlastete Mutter", "A2 · La Mère Surchargée"),
    ("A3 · Der Burnout-Gefährdete ⭐", "A3 · Burnout Imminent ⭐"),
    ("A4 · Der Biohacker", "A4 · Le Biohacker"),
    # Select options avatars
    ("A1 — Die Erschöpfte Berufstätige (Core)", "A1 — La Pro Épuisée (Core)"),
    ("A1 — Die Erschöpfte Berufstätige", "A1 — La Pro Épuisée"),
    ("A2 — Die Überlastete Mutter (Core)", "A2 — La Mère Surchargée (Core)"),
    ("A2 — Die Überlastete Mutter", "A2 — La Mère Surchargée"),
    ("A3 — Der/Die Burnout-Gefährdete", "A3 — Burnout Imminent(e)"),
    ("A3 — Der Burnout-Gefährdete (Core)", "A3 — Burnout Imminent (Core)"),
    ("A3 — Der Burnout-Gefährdete", "A3 — Burnout Imminent"),
    ("A4 — Biohacker / Wellness-Enthusiast", "A4 — Biohacker / Bien-être"),
    ("A4 — Biohacker / Wellness", "A4 — Biohacker / Bien-être"),
    # Avatar data in JS objects (labels)
    ("Die Erschöpfte Berufstätige (Core)", "La Pro Épuisée (Core)"),
    ("Die Erschöpfte Berufstätige", "La Pro Épuisée"),
    ("Die Überlastete Mutter (Core)", "La Mère Surchargée (Core)"),
    ("Die Überlastete Mutter", "La Mère Surchargée"),
    ("Der/Die Burnout-Gefährdete (Core)", "Burnout Imminent (Core)"),
    ("Der/Die Burnout-Gefährdete", "Burnout Imminent(e)"),
    ("Der Burnout-Gefährdete", "Burnout Imminent"),
    ("Der Biohacker", "Le Biohacker"),
    # Script titles UGC
    ("Der Teufelskreis", "Le Cercle Vicieux"),
    ("Das Gedankenkarussell", "Le Carrousel de Pensées"),
    # Angle descriptions in dropdowns
    ("CORTISOL_MÉCANISME — Das 3-Uhr-Signal (-27.9% cortisol)", "CORTISOL_MÉCANISME — Le Signal 3h (-27.9% cortisol)"),
    ("SCHLAF_CHRONIQUE — Durchschlafen / Gedankenkarussell", "SCHLAF_CHRONIQUE — Insomnie / Pensées Nocturnes"),
    # UGC pipeline descriptions
    ("Génère automatiquement les 3 scripts UGC (Teufelskreis / Gedankenkarussell / Cortisol) via HeyGen avec sélection d'avatar photo-réaliste.",
     "Génère automatiquement les 3 scripts UGC (Cercle Vicieux / Carrousel de Pensées / Cortisol) via HeyGen avec sélection d'avatar photo-réaliste."),
    ("Génère automatiquement les 3 scripts UGC (Teufelskreis / Gedankenkarussell / Cortisol) via HeyGen.",
     "Génère automatiquement les 3 scripts UGC (Cercle Vicieux / Carrousel de Pensées / Cortisol) via HeyGen."),
    # Select options UGC scripts
    ('"teufelskreis">Der Teufelskreis<', '"teufelskreis">Le Cercle Vicieux<'),
    ('"gedankenkarussell">Das Gedankenkarussell<', '"gedankenkarussell">Le Carrousel de Pensées<'),
    # Emotion select
    (">😤 Frustration / Alles versucht<", ">😤 Frustration / J'ai tout essayé<"),
    # SA labels in JS
    ("A1-b — Freelancerin Sans Off · Gedankenspirale", "A1-b — Freelance Non-Stop · Spirale de Pensées"),
    ('A3-e — 3-Uhr-Wachlieger · Gedanken', "A3-e — Réveil 3h · Pensées Nocturnes"),
    ("SA-02 · Markus (Gedanken)", "SA-02 · Markus (Pensées)"),
    # Angle emotion labels
    ('😴 Schlaf · "3 Uhr morgens. Schon wieder wach."', '😴 Sommeil · "3h du matin. Encore réveillé(e)."'),
    ('🚫 Alles versucht · "Baldrian: nichts. Melatonin: müder."', '🚫 Tout essayé · "Valériane: rien. Mélatonine: encore plus fatigué(e)."'),
    # Concept prompt in JS
    ('Ex: "Der Cortisol-Wecker — Avatar SA-02"', 'Ex: "Le Réveil au Cortisol — Avatar SA-02"'),
    # Batch descriptions in JS strings
    ("Batch #1 — Cortisol-Wecker\n\n1.A", "Batch #1 — Le Réveil au Cortisol\n\n1.A"),
    ("Batch #3 — Cortisol-Körper Sichtbar", "Batch #3 — Corps & Cortisol Visible"),
    ("Batch #4 — Alles versucht\n\n4.A", "Batch #4 — J'ai Tout Essayé\n\n4.A"),
]

count = 0
not_found = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1
        print(f"OK  {old[:55]}")
    else:
        not_found += 1
        print(f"NF  {old[:55]}")

with open('/Users/pc2/.openclaw/workspace/omnia/public/index.html', 'w') as f:
    f.write(content)

print(f"\n✅ {count} remplacements | ⚠️ {not_found} non trouvés")
