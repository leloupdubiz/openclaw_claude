# Setup OpenClaw sur VPS Sécurisé — Sans Mac Mini
> Source: @businessbarista (Alex Lieberman — 285K followers) — X Thread | 27 Feb 2026
> URL: https://x.com/businessbarista/status/2027446578793836682
> Stats: 24.5K vues · 741 bookmarks · 260 likes
> Auteur: Co-fondateur Morning Brew, founder @tenex_labs · 285K followers
> Engineer invité: @seejayhess
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

Guide step-by-step pour déployer OpenClaw sur un VPS Hetzner (<$10/mois) de façon sécurisée, sans Mac Mini. L'agent surveille emails, Slack, gère la to-do list — en autonomie 24/7.

---

## 📋 Les 6 Étapes

### 1. Créer un VPS sur Hetzner
```
→ Hetzner.com (datacenter Européen, RGPD-friendly)
→ Config : 8GB RAM, Ubuntu, US East
→ Coût : $5-10/mois
→ Temps : 2 minutes
```

### 2. Installer Tailscale (sécurité réseau)
```
→ Tailscale rend le serveur INVISIBLE sur l'internet public
→ Comme passer d'une maison sur Google Maps 
  à une résidence privée où seuls vos appareils entrent
→ SANS Tailscale : les bots attaquent le serveur 
  en quelques secondes après qu'il soit live
```

### 3. Hardening serveur
```
→ SSH keys only (pas de password)
→ Firewall configuré
→ Intrusion prevention
→ Auto security updates
→ Red teaming IA : donner à Claude l'ordre d'essayer 
  de break-in → patcher ce qu'il trouve
```

### 4. Installer OpenClaw + onboarding
```
→ Choisir le model provider (Anthropic recommandé)
→ Connecter Telegram via BotFather
→ Configurer les hooks de mémoire longue
→ Les hooks auto-save sessions + contexte 
  → l'agent devient plus smart avec le temps
```

### 5. Setup le Gateway
```
→ C'est la pièce centrale qui rend le système vraiment puissant
→ Message bus qui permet :
  - Agent principal ↔ sous-agents
  - Réception messages Telegram/Discord/Slack
  - Orchestration complète
→ C'est ce qui le maintient running 24/7
```

### 6. Former l'agent
```
→ Dumper un maximum d'infos sur soi :
  préférences, workflows, outils
→ Cas de @seejayhess :
  - Surveille ses emails
  - Surveille son Slack
  - Gère sa to-do list en autonomie
```

---

## 💡 Insights Actionnables

1. **VPS Hetzner** = alternative sécurisée au Mac Mini pour Chef si setup local pose des problèmes — €5-10/mois, EU-based (RGPD OK)
2. **Tailscale = protection obligatoire** : sans ça, bots attaquent immédiatement → à vérifier sur le setup actuel de Clawdbot Prime
3. **Red teaming IA** : demander à Claude de tenter de break-in son propre serveur → le forcer à trouver ses propres failles → pattern à appliquer sur OMNIA quand lancé
4. **Memory hooks auto-save** : confirme que la config `memoryFlush.enabled: true` de Clawdbot Prime est le bon pattern (Décision #14)
5. **"Treat it like an employee"** : pattern universel — même insight que @profitfounder ce même batch

---

## 🏪 Applications directes pour drinknellio.com

| Application | Description | Impact |
|-------------|-------------|--------|
| **VPS Hetzner comme backup** | Si le Mac Mini de Chef tombe → VPS EU pour continuer 24/7 | Uptime continu |
| **Hardening actuel** | Vérifier config SSH + firewall sur la machine actuelle | Sécurité |
| **Red teaming** | Demander à Claude d'essayer d'accéder à la config OpenClaw → patches | Sécurité pro |
| **Gateway + Telegram** | Déjà en place pour Clawdbot Prime — confirme la bonne architecture | ✅ Validé |

---

## ⚡ Citations Clés

> "Without Tailscale, bots start attacking your server within seconds of it going live."

> "The gateway is the piece that makes it actually powerful. It's the message bus."

> "Dump as much info about yourself as possible. Tell it your preferences, your workflows, your tools."

> "CJ's agent monitors his email, Slack, and manages his to-do list autonomously."

---

## 🔧 Stack Technique Complet

| Outil | Rôle | Coût |
|-------|------|------|
| **Hetzner VPS** | Serveur cloud EU, 8GB RAM Ubuntu | $5-10/mois |
| **Tailscale** | Réseau privé (invisible internet public) | Gratuit |
| **SSH Keys** | Auth sécurisée, pas de password | Gratuit |
| **OpenClaw** | Agent IA central | Licence |
| **Telegram BotFather** | Canal de communication | Gratuit |

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
