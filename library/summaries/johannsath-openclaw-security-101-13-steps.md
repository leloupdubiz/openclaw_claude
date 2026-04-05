# OpenClaw Security 101 — 13 Étapes
> @johann_sath (ex-Cisco) | 328 bk | Tailscale · Docker · SSH · Firewall · Prompt injection

## 🎯 Concept Central
Guide de sécurité pratique pour OpenClaw par un ex-ingénieur Cisco. 13 étapes non-négociables pour protéger son agent contre les attaques extérieures et les erreurs internes. Focus sur Tailscale pour l'accès réseau privé, Docker pour l'isolation, et les protections contre le prompt injection.

## 📌 Points Clés
- **Étape 1-3 — Réseau** : Tailscale (VPN mesh privé, zéro port exposé) · Pas d'IP publique directe · DNS privé
- **Étape 4-6 — Isolation** : Docker pour chaque composant · Volumes limités · Pas de `--privileged`
- **Étape 7-8 — Auth** : SSH keys Ed25519 uniquement · 2FA sur le panneau admin · Pas de root login
- **Étape 9-10 — Firewall** : UFW/nftables · Politique default DENY · Whitelist IP connues
- **Étape 11 — Secrets** : Jamais de clés API dans le code · `.env` chiffré ou vault · Rotation régulière
- **Étape 12 — Prompt injection** : Validation des inputs · Séparation stricte instructions système / données utilisateur
- **Étape 13 — Audit** : Logs de tous les tool calls · Alertes sur les actions sensibles · Review hebdomadaire
- **Tailscale** = solution recommandée pour accéder à son agent depuis partout sans exposer de ports

## 💡 Applications pour drinknellio.com / OMNIA / EVOLVE
- **Config OpenClaw actuelle** : Vérifier étapes 11-12 — nos clés API (HeyGen, Higgsfield, Anthropic) sont-elles bien dans `.env` ?
- **OMNIA SaaS** : Ce framework 13 étapes = checklist de sécurité pour chaque client onboardé
- **Tailscale** : Accéder à nos agents locaux depuis mobile en déplacement sans exposer le port 18789
- **Prompt injection protection** : Pour EVOLVE agents qui reçront des inputs externes (reviews minées, ad copy concurrents)

## ⚡ Citation / Insight Clé
> "Security isn't a feature you add at the end. It's the foundation you build on. Cisco lesson 1."

## 🔗 Ressources
- Thread original : @johann_sath sur X (328 bk)
- Tailscale : https://tailscale.com (plan gratuit jusqu'à 3 users)
- Docker : https://docs.docker.com/engine/security/
- Voir aussi : `shelpidwi3m-openclaw-vps-secure-setup-14-steps.md` (complémentaire)
