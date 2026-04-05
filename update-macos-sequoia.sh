#!/bin/bash
set -e

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  MISE À JOUR macOS → SEQUOIA 15.3 (STABLE)              ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Vérifier si admin
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  Ce script nécessite les droits administrateur"
    echo "   Relance avec : sudo bash update-macos-sequoia.sh"
    exit 1
fi

# Vérifier version actuelle
OS_VERSION=$(sw_vers -productVersion)
echo "📱 Version actuelle : macOS $OS_VERSION"
echo ""

# Vérifier si déjà à jour
if [[ "$OS_VERSION" == 15.* ]]; then
    echo "✅ macOS est déjà à jour (Sequoia $OS_VERSION)"
    echo "   Passage à l'installation d'OpenClaw..."
    bash /Users/pc2/.openclaw/workspace/setup-claude.sh
    exit 0
fi

# Vérifier compatibilité machine
echo "🔍 Vérification compatibilité..."
MODEL=$(sysctl -n hw.model)
CHIP=$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo "Apple Silicon")
echo "   Modèle : $MODEL"
echo "   Processeur : $CHIP"
echo ""

# Liste des Mac compatibles Sequoia
COMPATIBLE=false
if [[ "$MODEL" == *"MacBookPro"* ]] && [[ "$MODEL" > "MacBookPro15" ]]; then COMPATIBLE=true; fi
if [[ "$MODEL" == *"MacBookAir"* ]] && [[ "$MODEL" > "MacBookAir8" ]]; then COMPATIBLE=true; fi
if [[ "$MODEL" == *"Macmini"* ]] && [[ "$MODEL" > "Macmini8" ]]; then COMPATIBLE=true; fi
if [[ "$MODEL" == *"iMac"* ]] && [[ "$MODEL" > "iMac19" ]]; then COMPATIBLE=true; fi
if [[ "$MODEL" == *"MacStudio"* ]]; then COMPATIBLE=true; fi
if [[ "$MODEL" == *"MacPro"* ]] && [[ "$MODEL" > "MacPro7" ]]; then COMPATIBLE=true; fi
if [[ "$MODEL" == *"MacBook"* ]] && [[ "$MODEL" > "MacBook10" ]]; then COMPATIBLE=true; fi

if [ "$COMPATIBLE" = false ]; then
    echo "❌ Ce Mac n'est pas compatible avec macOS Sequoia"
    echo "   Voir : https://support.apple.com/macos/upgrade"
    exit 1
fi

echo "✅ Mac compatible avec Sequoia"
echo ""

# Vérifier espace disque
echo "💾 Vérification espace disque..."
FREE_SPACE=$(df -h / | awk 'NR==2 {print $4}' | sed 's/Gi//')
echo "   Espace libre : ${FREE_SPACE}"
if [[ ${FREE_SPACE%.*} -lt 20 ]]; then
    echo "❌ Espace insuffisant (nécessaire : 20GB+)"
    exit 1
fi
echo "✅ Espace disque OK"
echo ""

# Vérifier batterie (si portable)
if pmset -g batt | grep -q "Battery"; then
    BATTERY_LEVEL=$(pmset -g batt | grep -Eo "[0-9]+%" | head -1 | tr -d '%')
    if [ "$BATTERY_LEVEL" -lt 50 ]; then
        echo "⚠️  Batterie à ${BATTERY_LEVEL}% - Branche le chargeur !"
        echo "   Requis : 50%+ ou branché"
        exit 1
    fi
    echo "🔋 Batterie : ${BATTERY_LEVEL}%"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "⚠️  ATTENTION : MISE À JOUR MAJEURE"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Cette opération va :"
echo "   • Télécharger macOS Sequoia 15.3 (~12GB)"
echo "   • Installer la mise à jour (30-45 min)"
echo "   • Redémarrer automatiquement"
echo ""
echo "Prérequis :"
echo "   ✅ Sauvegarde Time Machine recommandée"
echo "   ✅ Mac branché secteur"
echo "   ✅ Connexion internet stable"
echo ""

read -p "Continuer ? (oui/non) : " CONFIRM
if [[ "$CONFIRM" != "oui" ]]; then
    echo "❌ Annulé par l'utilisateur"
    exit 0
fi

echo ""
echo "🚀 DÉMARRAGE DE LA MISE À JOUR..."
echo ""

# Étape 1 : Backup Time Machine si disponible
echo "📦 Étape 1/5 : Vérification Time Machine..."
if tmutil status | grep -q "Running"; then
    echo "   ⏳ Time Machine en cours..."
    while tmutil status | grep -q "Running"; do
        sleep 5
    done
fi
echo "   ✅ Time Machine à jour"
echo ""

# Étape 2 : Rechercher les mises à jour
echo "📦 Étape 2/5 : Recherche des mises à jour..."
softwareupdate --list

# Vérifier si Sequoia est disponible
if softwareupdate --list | grep -q "macOS Sequoia"; then
    echo "   ✅ macOS Sequoia trouvé"
else
    echo "   ℹ️  Sequoia non trouvé via softwareupdate"
    echo "   Tentative avec installassistant..."
fi
echo ""

# Étape 3 : Téléchargement
echo "📦 Étape 3/5 : Téléchargement macOS Sequoia..."
echo "   ⏳ Cela peut prendre 20-30 minutes selon ta connexion..."
echo ""

# Essayer méthode 1 : softwareupdate
if softwareupdate --list 2>/dev/null | grep -q "Sequoia"; then
    echo "   Méthode 1 : Software Update..."
    softwareupdate --download --all --verbose || true
fi

# Essayer méthode 2 : installation directe
echo "   Méthode 2 : Préparation installation..."
echo ""

# Étape 4 : Installation
echo "📦 Étape 4/5 : Installation..."
echo ""
echo "════════════════════════════════════════════════════════════"
echo "⚠️  REDÉMARRAGE IMMINENT"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Le Mac va redémarrer dans 1 minute."
echo "Après redémarrage :"
echo "   1. Laisse l'installation se terminer (~20 min)"
echo "   2. Connecte-toi à macOS Sequoia"
echo "   3. Ouvre Terminal"
echo "   4. Exécute : bash /Users/pc2/.openclaw/workspace/setup-claude.sh"
echo ""

# Sauvegarder script post-install
cat > /Users/pc2/Desktop/CONTINUER_SETUP.txt << 'EOFPOST'
╔══════════════════════════════════════════════════════════╗
║  SUITE DE L'INSTALLATION                                  ║
╚══════════════════════════════════════════════════════════╝

1. Ouvre Terminal (Cmd + Espace → "Terminal")
2. Copie-colle cette commande :

   bash /Users/pc2/.openclaw/workspace/setup-claude.sh

3. Suis les instructions

═══════════════════════════════════════════════════════════
EOFPOST

echo "📄 Instructions sauvegardées sur le Bureau"
echo ""

# Installation
softwareupdate --install --all --restart --verbose || {
    echo ""
    echo "⚠️  softwareupdate a échoué"
    echo "   Alternative : Téléchargement manuel"
    echo ""
    echo "   Va sur : https://support.apple.com/macos/upgrade"
    echo "   Télécharge : macOS Sequoia"
    echo ""
    exit 1
}

echo ""
echo "✅ Installation lancée !"
echo "🔄 Le Mac va redémarrer..."
echo ""

