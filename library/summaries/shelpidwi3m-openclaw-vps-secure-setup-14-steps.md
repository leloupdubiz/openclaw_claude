# OpenClaw VPS Secure Setup — 14 Étapes
> @Shelpid_WI3M | 16.2K bk · 5M vues 🔥 | VPS · Prompt injection · Claude Opus 4.5 · Sécurité

## 🎯 Concept Central
Le guide de référence pour déployer OpenClaw sur un VPS de manière sécurisée en 14 étapes. Viral à 5M de vues car il révèle des attaques de prompt injection réelles sur des agents en production, et montre que Claude Opus 4.5 résiste à ~99% de ces attaques quand le setup est correct.

## 📌 Points Clés
- **14 Étapes** (ordre obligatoire) :
  1. VPS minimal (Ubuntu 22.04, 2 vCPU, 4GB RAM)
  2. SSH keys only (désactiver password auth)
  3. UFW firewall (ports 22, 80, 443 uniquement)
  4. Fail2ban (brute force protection)
  5. Docker + Docker Compose (isolation)
  6. Variables d'environnement dans `.env` (jamais en dur)
  7. Reverse proxy Nginx + SSL Let's Encrypt
  8. Secrets management (Vault ou AWS SSM)
  9. Logs centralisés (pas de données sensibles dans les logs)
  10. Rate limiting sur les endpoints OpenClaw
  11. Validation des inputs (whitelist, pas blacklist)
  12. Sandboxing des tool calls (pas d'accès filesystem non nécessaire)
  13. Monitoring (Uptime Kuma, alertes Discord)
  14. Backup automatique (daily, offsite)
- **Prompt injection** : attaque où un input malveillant redirige l'agent vers des actions non autorisées
- **Claude Opus 4.5** : ~99% de résistance aux injections connues — meilleur modèle pour agents exposés

## 💡 Applications pour drinknellio.com / OMNIA / EVOLVE
- **OMNIA SaaS** : Ce setup est la base infra pour tout déploiement client — checklist intégrable dans l'onboarding
- **OpenClaw actuel** : Vérifier que les étapes 2-6 sont appliquées sur notre config locale
- **EVOLVE agents publics** : Avant d'exposer un agent à des inputs externes, valider les 14 étapes
- **Security selling point** : Pour OMNIA — "14-point security audit inclus" comme différenciateur

## ⚡ Citation / Insight Clé
> "Prompt injection is the SQL injection of the AI era. The attack is trivial. The defense requires architecture, not patches."

## 🔗 Ressources
- Thread original : @Shelpid_WI3M sur X (16.2K bk — un des plus bookmarkés sur le sujet) 🔥
- Fail2ban : https://github.com/fail2ban/fail2ban
- Uptime Kuma : https://github.com/louislam/uptime-kuma
- OWASP LLM Top 10 : https://owasp.org/www-project-top-10-for-large-language-model-applications/
