# Scrapling + Claude Code — Scraping de l'Ad Library Meta
> Source : https://x.com/micahberkley/status/2028546867080855868 | Auteur : @micahberkley | Date : Mars 2026

## 🎯 Concept Central
La combinaison Scrapling (Python, bypass Cloudflare automatique) + Claude Code permet de scraper la Meta Ad Library à grande échelle et d'extraire des insights concurrentiels structurés. Scrapling est 774x plus rapide que BeautifulSoup et contourne nativement les protections anti-bot.

## 📌 Points Clés
- **Scrapling** : framework Python, 774x plus rapide que BeautifulSoup, bypass Cloudflare auto
- Claude Code génère le script de scraping en quelques minutes
- Meta Ad Library accessible sans authentification (données publiques)
- Extraction : créatifs, copies, durées de diffusion, pays ciblés
- Pipeline : Scrapling → parse HTML → Claude analyse → insight structuré
- GitHub : `D4Vinci/Scrapling` — pip install scrapling
- Combinable avec Playwright pour les pages JS-heavy

## 💡 Insights Actionnables
1. `pip install scrapling` + demander à Claude Code d'écrire le scraper Ad Library
2. Scraper les top ads des concurrents Nellio sur Meta (Ashwagandha, stress DE)
3. Extraire les hooks des ads les plus durables (>30 jours = probable winner)
4. Automatiser le scraping hebdomadaire via cron + stocker dans EVOLVE_RESULTS/

## 🏪 Applications pour drinknellio.com
- Spy automatisé sur les concurrents Nellio dans la niche stress/bien-être DE
- Identifier les hooks et angles qui tournent le plus longtemps = winners validés
- Alimenter la recherche EVOLVE Phase 1 avec des données Ad Library réelles

## ⚡ Citation Clé
> "Scrapling + Claude Code = your automated ad spy agent. No SaaS subscription needed."
