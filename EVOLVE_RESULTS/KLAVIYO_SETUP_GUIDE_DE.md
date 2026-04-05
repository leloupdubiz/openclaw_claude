# Guide Setup Klaviyo — drinknellio.com
> Clawdbot Prime ⚡ | Généré le 2026-03-02 | Basé sur EMAIL_RETENTION_SEQUENCE_DE.md + SMS_WHATSAPP_SEQUENCE_DE.md

---

## 🎯 Objectif
Configurer les flows email + SMS post-achat DE dans Klaviyo en < 2 heures.
Stack complet : E1→E5 (30 jours) + SMS J+1/J+4/J+10/J+20/J+30

---

## ÉTAPE 1 — Connexion Shopify × Klaviyo (10 min)

### 1.1 Installer l'app Klaviyo sur Shopify
1. Shopify Admin → Apps → Rechercher "Klaviyo: Email Marketing & SMS"
2. Installer → Autoriser les permissions
3. Dans Klaviyo : Settings → Integrations → Shopify → **Connect**
4. Entrer l'URL de la boutique : `drinknellio.com`
5. ✅ Vérifier que les events Shopify arrivent : Klaviyo → Analytics → Metrics → "Placed Order" doit apparaître

### 1.2 Configurer les propriétés de profil
Dans Klaviyo → Settings → Custom Properties, ajouter :
- `language` → `de` (Allemand)
- `avatar_type` → string (stressed_professional / busy_mom / student / wellness)
- `order_count` → number

---

## ÉTAPE 2 — Configuration Email (20 min)

### 2.1 Domaine d'envoi
1. Klaviyo → Settings → Email → Sender Information
2. From email : `hallo@drinknellio.com`
3. From name : `Nellio UltraCalm`
4. Klaviyo → Settings → Email → Sending Domains → **Add Domain** → `drinknellio.com`
5. Ajouter les enregistrements DNS (DKIM + CNAME) chez ton hébergeur DNS
6. Attendre 24-48h pour validation → cliquer **Verify**

### 2.2 Template de base
1. Klaviyo → Content → Templates → Create Template
2. Layout recommandé :
   - Header : Logo Nellio centré (max 200px)
   - Couleur fond : `#FFFFFF`
   - Couleur accent : `#1A1A2E` (bleu nuit)
   - Font : Inter ou Helvetica
   - Footer : Adresse DE obligatoire + lien désabonnement (légal DSGVO)
3. Sauvegarder comme "Template Base Nellio DE"

---

## ÉTAPE 3 — Flow Post-Achat (45 min)

### 3.1 Créer le flow
1. Klaviyo → Flows → Create Flow → **Browse Ideas** → "Post-Purchase Thank You"
2. Renommer : **"UltraCalm Post-Purchase DE"**
3. Trigger : **Placed Order** (Shopify event)

### 3.2 Structure du flow (copier exactement)

```
[TRIGGER] Placed Order
    │
    ├─ Filtre : country = "DE" OU "AT" OU "CH"
    │
    ▼
[EMAIL 1] — E1 Danke + Erste Schritte  ← Délai : 0h (immédiat)
    │
    ▼
[SMS 1] — SMS J+1 Check-in              ← Délai : 1 jour après trigger
    │
    ▼
[EMAIL 2] — E2 Erste Erfahrung J+3     ← Délai : 3 jours après trigger
    │
    ▼
[SMS 2] — SMS J+4 Routine              ← Délai : 4 jours après trigger
    │
    ▼
[EMAIL 3] — E3 Social Proof J+7        ← Délai : 7 jours après trigger
    │
    ▼
[SMS 3] — SMS J+10 Communauté          ← Délai : 10 jours après trigger
    │
    ▼
[EMAIL 4] — E4 Réachat J+14            ← Délai : 14 jours après trigger
    │
    ▼
[SMS 4] — SMS J+20 Rappel              ← Délai : 20 jours après trigger
    │
    ▼
[EMAIL 5] — E5 Referral J+30           ← Délai : 30 jours après trigger
    │
    ▼
[SMS 5] — SMS J+30 Fidélité            ← Délai : 30 jours après trigger
```

### 3.3 Copier les contenus

Pour chaque email/SMS, ouvrir `EMAIL_RETENTION_SEQUENCE_DE.md` et `SMS_WHATSAPP_SEQUENCE_DE.md` et copier-coller les contenus **tels quels**.

**Paramètres pour chaque email :**
- Subject line : copier depuis le fichier
- Pré-header : copier depuis le fichier
- Corps : copier depuis le fichier
- Template : "Template Base Nellio DE"

**⚠️ Personnalisation dynamique :**
Dans le corps des emails, utiliser :
```
{{ person.first_name|default:"" }}        → Prénom
{{ event.extra.line_items.0.title }}      → Nom du produit
```

---

## ÉTAPE 4 — Configuration SMS Klaviyo (20 min)

### 4.1 Activer SMS
1. Klaviyo → Settings → SMS → **Get Started**
2. Choisir un numéro DE (indicatif +49) → ~$5-10/mois
3. Renseigner l'adresse légale DE (obligatoire pour l'activation)
4. Déposer les Terms of Service (Klaviyo les génère automatiquement)

### 4.2 DSGVO — Opt-in obligatoire
⚠️ **CRITIQUE** — Sans opt-in séparé pour SMS, les messages sont illégaux en Allemagne.

**Sur Shopify :**
1. Online Store → Themes → Customize → Footer / Checkout
2. Ajouter une checkbox au checkout :
   ```
   ☐ Ich stimme zu, SMS-Marketingnachrichten von Nellio UltraCalm zu erhalten. 
     Jederzeit abmeldbar mit STOP. Datenschutz: drinknellio.com/datenschutz
   ```
3. Dans Klaviyo → Forms → SMS Consent Form → lier au checkout

### 4.3 Sender ID
- Nom affiché : **NELLIO** (max 11 caractères)
- À renseigner dans Klaviyo → SMS → Sender ID

---

## ÉTAPE 5 — Segments (10 min)

Klaviyo → Segments → Create Segment

### Segment 1 : Acheteurs actifs 30j
- Condition : "Has done event" → Placed Order → "in the last 30 days"
- Nom : `nllio_active_30j`

### Segment 2 : Risque churn (J+14 sans réachat)
- Condition : "Has done event" → Placed Order → "between 14 and 45 days ago"
- AND : "Has NOT done event" → Placed Order → "in the last 14 days"
- Nom : `nllio_churn_risk`

### Segment 3 : VIP (2+ commandes)
- Condition : "Number of Orders" → is greater than → 1
- Nom : `nllio_vip_repeat`

---

## ÉTAPE 6 — Tests & Validation (15 min)

### Checklist avant activation du flow :
- [ ] Flow en mode **Manual** d'abord (pas Live)
- [ ] S'envoyer un test de chaque email (Preview → Send Test)
- [ ] Vérifier l'affichage mobile (Gmail + Apple Mail)
- [ ] Vérifier que les liens fonctionnent (CTA → drinknellio.com)
- [ ] Vérifier le lien de désabonnement (DSGVO obligatoire)
- [ ] Placer une commande test → vérifier que le flow se déclenche
- [ ] Vérifier la réception du SMS J+1
- [ ] Passer le flow en **Live** ✅

---

## ÉTAPE 7 — KPIs à surveiller (Dashboard)

| Métrique | Cible | Alerte |
|---------|-------|--------|
| Open Rate emails | > 35% | < 20% |
| Click Rate emails | > 8% | < 3% |
| Unsubscribe Rate | < 0.5% | > 1% |
| SMS Delivery Rate | > 95% | < 85% |
| SMS Opt-out Rate | < 3% | > 5% |
| Réachat J30 | > 25% | < 10% |
| Revenue per recipient | > €15 | < €5 |

### Tableau de bord Klaviyo :
Klaviyo → Analytics → Flows → "UltraCalm Post-Purchase DE" → **Flow Analytics**

---

## ⏱️ Temps Total Estimé : 2h

| Étape | Durée |
|-------|-------|
| Connexion Shopify × Klaviyo | 10 min |
| Config email (domaine + template) | 20 min |
| Build du flow + copier contenus | 45 min |
| Config SMS + DSGVO | 20 min |
| Segments | 10 min |
| Tests + validation | 15 min |

---

## 🔴 Blockers possibles

| Problème | Solution |
|---------|---------|
| DNS pas encore propagé | Attendre 24h · utiliser outil MXToolbox |
| Numéro DE non disponible | Prendre numéro AT (+43) en attendant |
| Shopify n'envoie pas les events | Réinstaller l'app Klaviyo + vérifier permissions API |
| SMS opt-in non configuré | Utiliser Klaviyo Form SMS consent widget temporairement |

---

*Tous les contenus email/SMS sont dans `EMAIL_RETENTION_SEQUENCE_DE.md` et `SMS_WHATSAPP_SEQUENCE_DE.md` — copier-coller direct, 0 rédaction supplémentaire requise.*
