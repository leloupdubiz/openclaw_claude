# NELLIO STUDIO
## Creative Generator SaaS für Drinknellio.com

---

## 🚀 SCHNELLSTART (5 Minuten)

### 1. Installation

```bash
cd nellio-studio
npm install
```

### 2. Konfiguration

Erstelle `.env` Datei:
```
OPENAI_API_KEY=dein_api_key_hier
PORT=3000
```

### 3. Starten

```bash
npm start
```

Öffne http://localhost:3000 im Browser

---

## 📁 PROJEKTSTRUKTUR

```
nellio-studio/
├── public/              # Frontend (HTML/CSS/JS)
│   └── index.html       # Hauptinterface
├── src/
│   └── api/
│       └── server.js    # Backend API
├── config/
│   └── drinknellio.json # Brand Konfiguration
├── package.json         # Dependencies
└── README.md           # Diese Datei
```

---

## 🎯 FUNKTIONEN

### 1. UGC Video Script Generator
- 5 Hook Typen (Problem, Curiosity, Transformation, Social Proof, Contrarian)
- 4 Zielgruppen (Berufstätige, Mütter, Studenten, Wellness-Fans)
- Anpassbare Tonalität und Dauer
- Strukturierte Scripts (Hook → Problem → Solution → Proof → CTA)

### 2. Static Image Prompt Generator
- 6 Bildtypen (Hero, Flatlay, UGC, Testimonial, Transformation)
- Plattform-optimiert (Instagram, TikTok, Facebook)
- 4 Stilrichtungen (Minimalist, Cozy, Premium, Authentic)
- Fertige Midjourney Prompts

### 3. Batch Generator (3-2-2)
- Generiere mehrere Scripts auf einmal
- Kampagnen-optimiert
- Zeitersparnis

---

## 🔧 ANPASSUNGEN

### Brand Konfiguration

Bearbeite `config/drinknellio.json`:
- Produkt Details
- Zielgruppen
- Marketing Angles
- Farben & Stil

### Neue Scripts hinzufügen

Bearbeite die Templates in `public/index.html`:
```javascript
const hooks = {
  deine_kategorie: [
    "Dein Hook hier...",
    "Noch ein Hook..."
  ]
};
```

---

## 🚀 DEPLOYMENT

### Option 1: Vercel (Frontend only)
```bash
npm i -g vercel
vercel --prod
```

### Option 2: Render/Railway (Fullstack)
```bash
# Push zu GitHub
# Verbinde mit Render
# Setze Environment Variables
```

### Option 3: Local Network (Sofort verfügbar)
```bash
# Finde deine IP
ifconfig | grep inet

# Teile Link mit Team
http://DEINE-IP:3000
```

---

## 📱 VERWENDUNG

### Schritt 1: Script generieren
1. Wähle Hook Typ
2. Wähle Zielgruppe
3. Setze Dauer
4. Klicke "Generieren"
5. Kopiere das Script

### Schritt 2: Video produzieren
- Nutze das Script als Vorlage
- Filme mit Smartphone
- Nutze CapCut oder Premiere
- Füge Captions hinzu

### Schritt 3: Bild generieren
1. Wähle Bildtyp
2. Wähle Plattform
3. Klicke "Generieren"
4. Kopiere Midjourney Prompt
5. Generiere in Discord

### Schritt 4: Upload
- Meta Ads Manager
- TikTok Ads
- Instagram/Facebook

---

## 🎨 MIDJOURNEY WORKFLOW

1. Kopiere Prompt aus Nellio Studio
2. Gehe zu discord.com/channels/@me
3. Schreibe `/imagine` im Midjourney Bot
4. Füge Prompt ein
5. Warte auf Generation
6. Wähle Variation (V1-V4) oder Upscale (U1-U4)
7. Downloade das Bild

---

## 💡 TIPPS

### Für bessere Scripts:
- Teste verschiedene Hook Typen
- Passe an deine Stimme an
- Füge persönliche Details hinzu
- Teste mit echter Zielgruppe

### Für bessere Bilder:
- Generiere 4 Varianten
- Wähle beste Ausgangsbasis
- Nutze Vary für Feintuning
- Inpaint für Korrekturen

### Für bessere Performance:
- A/B teste 3 Scripts gleichzeitig
- Wechsle Creatives alle 2-3 Wochen
- Behalte Winner, pausiere Loser
- Nutze Insights für neue Scripts

---

## 🔮 ROADMAP

### Version 1.1 (nächste Woche)
- [ ] Auto-Übersetzung EN/FR
- [ ] Video Analyse Integration
- [ ] Mehr Hook Varianten
- [ ] Export zu Meta Ads

### Version 1.2 (nächsten Monat)
- [ ] Sora 2 Integration (wenn verfügbar)
- [ ] Automatische Bildgenerierung (API)
- [ ] Performance Tracking
- [ ] A/B Test Automation

### Version 2.0 (zukünftig)
- [ ] Multi-Brand Support
- [ ] Team Collaboration
- [ ] Advanced Analytics
- [ ] White-Label Option

---

## 🆘 SUPPORT

Bei Fragen oder Problemen:
1. Prüfe die Konsole (F12 → Console)
2. Stelle sicher, dass API Key gesetzt ist
3. Überprüfe Brand Konfiguration
4. Kontaktiere mich

---

**Erstellt für Drinknellio.com** | **Powered by OpenAI GPT-4**
