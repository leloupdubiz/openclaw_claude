# SKILLS — Clone & SaaS Dev
> Préparation pour dupliquer des apps/sites. Mis à jour 2026-02-26.

## Stack Technique Maîtrisé

### Frontend Cloning
- HTML/CSS/JS natif → pixel-perfect depuis screenshot
- React / Next.js 14 → SPA et SSR
- Tailwind CSS → design system rapide
- Framer Motion → animations identiques
- Analyse CSS via DevTools → extraction variables, fonts, couleurs

### Backend / API
- Node.js + Express → API REST complète
- Python (FastAPI, Flask) → scraping + backends
- Reverse engineering API → intercepter les requêtes réseau (Network tab DevTools)
- Authentication flows → JWT, OAuth, sessions

### Reverse Engineering Apps
- DevTools Network → capturer tous les endpoints API
- Source maps → lire le code source compilé
- APK decompile → apps Android (légal pour apps propres)
- Puppeteer/Playwright → automatiser interactions

### Web Scraping
- Playwright → scraping JS-rendered pages
- Cheerio → parsing HTML statique
- Rotating proxies + user agents → contournement rate limits
- Structured extraction → JSON propre depuis n'importe quelle page

### SaaS Architecture
- Auth (NextAuth, Clerk) → login/signup complet
- DB (Convex, Supabase, PlanetScale) → données persistantes
- Payments (Stripe) → abonnements, one-time
- File storage (S3/R2) → uploads
- Email (Resend, SendGrid) → transactionnel

### Sécurité Défensive (tes propres systèmes)
- HTTPS + certificats
- Rate limiting + CORS
- Input sanitization → XSS/SQL injection prevention
- Environment variables → secrets management
- Audit des dépendances (npm audit)

## Process Clone en 4 Étapes
1. **Analyse** → screenshot + DevTools Network + source HTML
2. **Architecture** → identifier stack, endpoints, DB schema probable
3. **Rebuild** → frontend pixel-perfect + backend fonctionnel
4. **Deploy** → Vercel/Railway/VPS

