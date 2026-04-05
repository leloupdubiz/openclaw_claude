# Pinchtab — Contrôle de Navigateur via HTTP pour les Agents AI
> Source : https://x.com/heynavtoor/status/2028922003365986705 | Auteur : @heynavtoor | Date : Mars 2026

## 🎯 Concept Central
Pinchtab est un binaire Go de 12MB qui transforme Chrome en outil contrôlable par n'importe quel agent AI via une API HTTP plain. Zéro framework imposé, zéro screenshot coûteux — il utilise l'accessibility tree pour des interactions précises et économiques en tokens. Alternative légère à Playwright pour les agents.

## 📌 Points Clés
- **12MB Go binary** : installation one-click, zero config, zero dependency
- **HTTP API** : n'importe quel langage peut contrôler Chrome (curl, Python, Node, Claude)
- **Accessibility tree** : lit les éléments sans screenshot = 10-100x moins de tokens
- **Commands** : `pinchtab nav`, `pinchtab snap`, `pinchtab click e5`, `pinchtab fill e3 "text"`, `pinchtab press e7 Enter`
- **Multi-instance** : orchestration de plusieurs onglets Chrome simultanément
- **Stealth injection** : contourne les détections anti-bot basiques
- **Persistance de session** : cookies et auth conservés entre les actions
- GitHub : `pinchtab/pinchtab`

## 💡 Insights Actionnables
1. Installer le binaire Pinchtab et l'exposer sur `localhost:XXXX`
2. Connecter Claude Code à Pinchtab via tool call HTTP pour browser automation
3. Utiliser pour scraper des pages derrière authentification (Meta Ads Manager, Shopify)
4. Remplacer les screenshots coûteux par des `snap` accessibility tree dans les agents

## 🏪 Applications pour drinknellio.com
- Automatiser l'extraction de données Meta Ads Manager sans screenshot = économie de tokens
- Agent de monitoring qui surveille les KPIs drinknellio.com automatiquement
- Scraper les landing pages des concurrents DE sans être bloqué par anti-bot basiques

## ⚡ Citation Clé
> "Pinchtab gives AI agents precise, reliable control over browsers. Framework-agnostic, token-efficient, 12MB binary."
