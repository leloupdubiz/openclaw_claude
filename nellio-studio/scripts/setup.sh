#!/bin/bash
# NELLIO STUDIO - Setup Script
# Erstellt alle notwendigen Dateien und startet den Server

echo "🎬 NELLIO STUDIO Setup"
echo "======================"

# Prüfe Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nicht gefunden. Bitte installieren: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js gefunden"

# Installiere Dependencies
echo "📦 Installiere Dependencies..."
npm install

# Prüfe .env
if [ ! -f .env ]; then
    echo "📝 Erstelle .env Datei..."
    echo "OPENAI_API_KEY=dein_api_key_hier" > .env
    echo "PORT=3000" >> .env
    echo "⚠️  Bitte öffne .env und füge deinen OpenAI API Key ein!"
fi

# Erstelle Verzeichnisse
mkdir -p logs
mkdir -p generated/scripts
mkdir -p generated/images

echo ""
echo "✅ Setup abgeschlossen!"
echo ""
echo "🚀 Starte Server mit: npm start"
echo "📝 Oder Entwicklermodus: npm run dev"
echo ""
echo "📱 Öffne danach: http://localhost:3000"
echo ""
