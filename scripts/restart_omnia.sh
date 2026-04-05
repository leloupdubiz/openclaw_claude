#!/bin/zsh
# Redémarre OMNIA via LaunchAgent
launchctl kickstart -k gui/$(id -u)/com.clawdbot.omnia
echo "OMNIA redémarré via LaunchAgent"
sleep 3
curl -s http://localhost:3002/api/health
