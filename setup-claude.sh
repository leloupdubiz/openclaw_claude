#!/bin/bash
set -e

echo "╔════════════════════════════════════════════════╗"
echo "║  SETUP AUTOMATIQUE → CLAUDE 3.5 SONNET        ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Vérifier macOS version
OS_VERSION=$(sw_vers -productVersion)
echo "📱 macOS détecté : $OS_VERSION"

if [[ "$OS_VERSION" < "15.0" ]]; then
    echo "❌ ERREUR : macOS $OS_VERSION trop ancien"
    echo "   Nécessaire : macOS 15.0+ (Sequoia)"
    echo ""
    echo "➡️  Mets à jour via :  → Paramètres → Mise à jour"
    exit 1
fi

echo "✅ macOS compatible"
echo ""

# Backup
echo "📦 Étape 1/5 : Backup configuration..."
mkdir -p ~/Backups/OpenClaw
cp -r ~/.openclaw ~/Backups/OpenClaw/backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
echo "✅ Backup créé dans ~/Backups/OpenClaw/"
echo ""

# Installer OpenClaw
echo "📦 Étape 2/5 : Installation OpenClaw..."
if command -v brew &> /dev/null; then
    brew uninstall openclaw 2>/dev/null || true
    brew install openclaw
elif command -v npm &> /dev/null; then
    npm uninstall -g openclaw 2>/dev/null || true
    npm install -g openclaw
else
    echo "❌ Ni Homebrew ni npm trouvés"
    exit 1
fi
echo "✅ OpenClaw installé"
echo ""

# Créer config avec Claude
echo "📦 Étape 3/5 : Configuration Claude..."
mkdir -p ~/.openclaw

cat > ~/.openclaw/openclaw.json << 'EOFCFG'
{
  "version": "1.0",
  "default_model": "anthropic/claude-3-5-sonnet-20241022",
  "model": "anthropic/claude-3-5-sonnet-20241022",
  "providers": {
    "anthropic": {
      "enabled": true,
      "api_key": "",
      "models": [
        "claude-3-5-sonnet-20241022",
        "claude-3-opus-20240229",
        "claude-3-haiku-20240307"
      ]
    },
    "openai": {
      "enabled": true,
      "api_key": "",
      "models": [
        "gpt-4",
        "gpt-4-turbo-preview",
        "gpt-3.5-turbo"
      ]
    }
  },
  "preferences": {
    "language": "fr",
    "auto_save": true,
    "stream_responses": true
  }
}
EOFCFG

echo "✅ Configuration créée"
echo ""

# Instructions pour l'API key
echo "📦 Étape 4/5 : Configuration clé API..."
echo ""
echo "⚠️  ACTION REQUISE :"
echo "   1. Va sur https://console.anthropic.com/settings/keys"
echo "   2. Crée une nouvelle clé API"
echo "   3. Copie la clé (sk-ant-api03-...)"
echo ""
read -p "   Colle ta clé API Anthropic ici : " API_KEY

if [[ -n "$API_KEY" ]]; then
    # Mettre à jour le fichier config avec la clé
    sed -i.bak "s/\"api_key\": \"\"/\"api_key\": \"$API_KEY\"/" ~/.openclaw/openclaw.json
    echo "✅ Clé API configurée"
else
    echo "⚠️  Pas de clé fournie - configure plus tard avec :"
    echo "   openclaw config set anthropic.api_key VOTRE_CLE"
fi
echo ""

# Redémarrer gateway
echo "📦 Étape 5/5 : Redémarrage OpenClaw..."
openclaw gateway stop 2>/dev/null || true
sleep 2
openclaw gateway start
echo "✅ OpenClaw redémarré"
echo ""

# Vérification
echo "═══════════════════════════════════════════════════"
echo "✅ INSTALLATION TERMINÉE !"
echo "═══════════════════════════════════════════════════"
echo ""
echo "🧠 Modèle actif : Claude 3.5 Sonnet"
echo "📁 Config : ~/.openclaw/openclaw.json"
echo ""
echo "🚀 Teste-moi maintenant : envoie un message !"
echo ""
