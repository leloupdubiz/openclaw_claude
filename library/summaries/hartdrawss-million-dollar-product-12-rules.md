# Million Dollar Product — 12 Règles pour Builder ce que les Users Adorent
> Source: @Hartdrawss (Harshil Tomar — $100K rev, 50+ MVPs buildés) — X Article | 27 Feb 2026
> URL: https://x.com/Hartdrawss/status/2027270166422372763
> Stats: 15.7K vues · 352 bookmarks · 163 likes
> Auteur: Founder, AI product & design pour founders et entreprises
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**Le vrai problème n'est jamais le stack** (Next.js vs Remix, Supabase vs Firebase, Claude vs GPT). Le problème est que personne ne s'arrête pour réfléchir au produit. Le monde est inondé de vibe-coded look-alikes. Voici les 12 couches qui différencient un produit à $50K d'un produit à $500K.

---

## 📋 Les 12 Règles

### 1. User Persona d'abord — avant une seule ligne de code
- "Founders" ou "SMBs" = une catégorie, pas un persona
- Un vrai persona : workflow quotidien exact + frustration spécifique + workaround actuel + niveau de technicité
- **Test** : "Si tu ne peux pas décrire ton user cible en 2 phrases, tu n'es pas prêt à builder"

### 2. Définir ce que le produit doit RESSENTIR avant d'ouvrir Figma
- Fast & minimal (power users) OU guided & hand-holdy (débutants) = produits fondamentalement différents
- **Aha moment** = le moment où l'utilisateur expérimente sa première valeur → tout l'UX doit être engineered pour y arriver LE PLUS VITE POSSIBLE

### 3. Brand Foundation avant le premier composant
- Brand = la somme de chaque décision que le produit prend face au user
- "Scaling your focus" vs "Choose a plan" → radicalement différents
- "Work, Draft" vs "Untitled document 3" → chaque micro-décision compound en trust ou confusion

### 4. Information Architecture avant les screens
- Mapper chaque page, section, user flow sur papier AVANT de designer
- Naviguer : sidebar, top nav, ou bottom tabs ? Chaque choix communique quelque chose
- **Règle critique** : grouper les features par USER INTENT, pas par structure du codebase

### 5. Layout Consistency across roles — non négociable
- Même comportement de composant pour tous les rôles
- Même hiérarchie visuelle admin/manager/user
- Définir un master layout grid et ne jamais le briser

### 6. Design System avant le premier screen
- Token system en premier : spacing scale + type scale + colour tokens
- Component library : chaque composant avec TOUS ses états (default, hover, active, disabled, error)
- "C'est le seul différenciateur entre un produit qui semble coûter $500 et un qui semble coûter $50,000"

### 7. Couleur = décision de rétention (pas d'esthétique)
- Mauvaise question : "Quelles couleurs j'aime ?"
- **Bonne question** : "Quelles couleurs mon user fait-il CONFIANCE ?"
- Couleur sémantique : success, warning, error, informational → souvent le plus ignoré → le plus important

### 8. Chaque état du produit doit être designé
- Happy path = ce qui est designé. Tout le reste = ce qui est ignoré.
- **États critiques** : loading, empty (zero-data), error, edit, success
- **Zero-data state** = le premier état que CHAQUE nouveau user voit → détermine s'il revient le jour 2
- "Something went wrong" = pas un message d'erreur. C'est un trigger d'abandon.

### 9. Onboarding = collecter juste assez
- **Minimum information nécessaire pour une première session de valeur** = tout le reste est de la friction
- **Progressive disclosure** : trust gagné avant que la data soit collectée, pas l'inverse
- Jamais gater le produit derrière 10 étapes de setup

### 10. Performance = feature produit
- Cible : < 2 secondes pour toute action core
- Skeleton screens > spinners (performance perçue > performance réelle)
- "Les users ne blâment pas leur connexion internet quand une app est lente. Ils blâment le produit."

### 11. Micro interactions = la différence
- Animation sweet spot : 150ms – 300ms (assez rapide pour sembler snappy, assez lent pour que le cerveau enregistre)
- "Smooth" vs "Clunky" — la différence = micro interactions. Fonctionnalité identique.

### 12. Builder pour la 2ème session, pas la 1ère
- **Activation event** = l'action spécifique qui prédit fortement la rétention long-terme
- Identifier cet event → ingéniérer TOUTE la première session pour y mener le plus vite possible
- "Day 3 retention est le vrai test. Si les users ne reviennent pas — le produit a échoué. Pas le marketing. Le produit."

---

## 💡 Insights Actionnables

1. **Checklist Nellio Studio** : appliquer les 12 règles à l'audit UX du frontend (`public/index.html`) — en particulier zero-data state, skeleton screens, et tous les états d'erreur API Anthropic
2. **Checklist OMNIA SaaS** : avant de coder quoi que ce soit → règle 1 (persona) + règle 2 (feel) + règle 3 (brand) → fondations d'abord
3. **Design System Nellio Studio** : token system (coral #FF6B6B, mint #4ECDC4, cream #FFF5F5) formalisé AVANT d'ajouter le Batch Generator UI
4. **Aha Moment Nellio Studio** : quel est le premier moment de valeur ? → le premier script UGC généré en DE → tout le UX doit y mener en < 60 secondes
5. **Error messages** : "Clé API invalide" > "Something went wrong" — vérifier tous les messages d'erreur Nellio Studio

---

## 🏪 Applications directes pour drinknellio.com

| Règle | Application Nellio Studio | Application OMNIA SaaS |
|-------|--------------------------|----------------------|
| **#1 Persona** | Défini (stressed pros / busy moms / students / wellness) | À définir : opérateur DTC solo vs team de 5 |
| **#2 Feel** | Rapide + premium (cf. l3ns.ai) | Guided pour onboarder facilement |
| **#8 Zero-data state** | Page sans API key configurée → CTA "Configurer votre clé" clair | Premier accès sans projet → wizard de création |
| **#9 Onboarding** | 1 étape : entrer la clé API → générer → valeur immédiate | Max 3 étapes avant le premier brief généré |
| **#12 2ème session** | Activation event = 1er batch 3-2-2 complet généré ET exporté | Activation = premier créatif importé dans Meta |

---

## ⚡ Citations Clés

> "The problem is never the stack. The problem is that nobody stopped to think about the product."

> "UX is not a design decision. It is a product decision. Treat it like one."

> "95% of vibe coded products only design the happy path. The edge cases are where users quit or where they fall in love."

> "Day one retention is easy. Day three retention is the real test."

> "Most founders think great products come from great ideas. They don't. They come from great decisions made at every layer of the product."

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
