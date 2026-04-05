# Guide Technique — Meta Pixel drinknellio.com
> Créé par Clawdbot Prime — 2026-02-28 07:10 (autonome)
> Objectif : Débloquer O1 KR2 — Pixel vérifié + domaine BM validé

---

## ÉTAPE 1 — Accéder à Events Manager

1. Aller sur **business.facebook.com**
2. Menu hamburger (☰) → **Events Manager**
3. Ou URL directe : https://business.facebook.com/events_manager2/

**Si tu n'as pas de compte Business Manager :**
- Créer sur business.facebook.com/overview
- Associer ta page Facebook drinknellio.com

---

## ÉTAPE 2 — Créer ou retrouver ton Pixel

### Si pas encore de Pixel :
1. Events Manager → **+ Connecter des sources de données**
2. **Web** → Continuer
3. Nommer le Pixel : `Nellio_Main_Pixel`
4. URL du site : `https://drinknellio.com`
5. **Créer le Pixel** → noter l'**ID Pixel** (format : 15 chiffres, ex: 1234567890123456)

### Si Pixel déjà créé :
- Events Manager → colonne gauche → ton Pixel → **Paramètres**
- Copier le **Pixel ID**

---

## ÉTAPE 3 — Installer le Pixel sur drinknellio.com

### Option A — Via Shopify (si drinknellio.com est sur Shopify)
1. Shopify Admin → **Paramètres** → **Applications et canaux de vente**
2. Chercher **Facebook & Instagram** → Ouvrir
3. Connecter → Entrer le Pixel ID
4. Activer les événements automatiques ✓

### Option B — Via Google Tag Manager (GTM)
1. GTM → Nouveau tag → **Meta Pixel**
2. Coller le Pixel ID
3. Déclencheur : **Toutes les pages**
4. Publier le conteneur

### Option C — Installation manuelle (code)
Coller dans le `<head>` de toutes les pages :
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TON_PIXEL_ID'); // ← remplacer par ton Pixel ID
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=TON_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

---

## ÉTAPE 4 — Vérifier les 4 événements clés

### Événements obligatoires avant lancement campagne

| Événement | Déclencheur | Où l'ajouter |
|-----------|-------------|-------------|
| **ViewContent** | Page produit visitée | Page produit |
| **AddToCart** | Clic "Ajouter au panier" | Bouton panier |
| **InitiateCheckout** | Début checkout | Page checkout |
| **Purchase** | Commande confirmée | Page confirmation |

### Vérification avec Meta Pixel Helper (Chrome Extension)
1. Installer : **Meta Pixel Helper** (Chrome Web Store — gratuit)
2. Aller sur drinknellio.com
3. Cliquer l'icône Pixel Helper → doit afficher : `✅ Pixel détecté — PageView`
4. Aller sur page produit → `✅ ViewContent`
5. Ajouter au panier → `✅ AddToCart`
6. Démarrer checkout → `✅ InitiateCheckout`

### Vérification dans Events Manager
1. Events Manager → ton Pixel → **Tester les événements**
2. URL : `https://drinknellio.com`
3. Ouvrir dans l'outil → naviguer → voir les événements remonter en temps réel

**Statut attendu :**
- Purchase ✅ Actif
- InitiateCheckout ✅ Actif
- AddToCart ✅ Actif
- ViewContent ✅ Actif

---

## ÉTAPE 5 — Valider le domaine dans Business Manager

**Pourquoi ?** — Requis par Apple iOS 14+ (ATT). Sans validation domaine → attribution défaillante → ROAS faussé.

### Méthode 1 — DNS TXT (recommandée, permanent)
1. Business Manager → **Paramètres** → **Sécurité de la marque** → **Domaines**
2. **Ajouter un domaine** → `drinknellio.com`
3. Choisir **Méthode DNS**
4. Copier l'enregistrement TXT (format : `facebook-domain-verification=xxxxxxxxxxxx`)
5. Aller dans ton registrar de domaine (Namecheap / GoDaddy / OVH / etc.)
6. **DNS** → **Ajouter un enregistrement TXT** :
   - Type : TXT
   - Host : @ (ou laisser vide)
   - Value : `facebook-domain-verification=xxxxxxxxxxxx`
   - TTL : automatique
7. Retourner dans Business Manager → **Vérifier le domaine**
8. Délai DNS : 5 min à 48h (généralement < 30 min)

### Méthode 2 — Meta-tag HTML
1. Copier la meta-tag : `<meta name="facebook-domain-verification" content="xxxxxxxxxxxx" />`
2. Coller dans le `<head>` de la page d'accueil uniquement
3. Business Manager → **Vérifier le domaine**

---

## ÉTAPE 6 — Configurer les événements prioritaires (Aggregated Event Measurement)

> Obligatoire depuis iOS 14 — limite à 8 événements par domaine, priorités à définir.

1. Events Manager → **Paramètres** → **Aggregated Event Measurement**
2. **Configurer les événements web**
3. Ordre de priorité recommandé :
   ```
   1. Purchase (priorité max — valeur réelle)
   2. InitiateCheckout
   3. AddToCart
   4. ViewContent
   5. Lead (si applicable)
   ```
4. Activer le **suivi de la valeur** pour Purchase (permet ROAS réel)

---

## ÉTAPE 7 — Vérification finale pré-lancement

### Checklist complète

**Pixel**
- [ ] Pixel ID noté : `___________________`
- [ ] Pixel Helper montre ✅ sur homepage
- [ ] ViewContent déclenché sur page produit
- [ ] AddToCart déclenché sur clic panier
- [ ] InitiateCheckout déclenché sur page paiement
- [ ] Purchase déclenché sur page confirmation (tester avec commande test)

**Business Manager**
- [ ] Domaine drinknellio.com validé ✅ (icône verte)
- [ ] Compte pub lié au Pixel
- [ ] Méthode de paiement configurée (CB ou PayPal)
- [ ] Limite de dépense quotidienne désactivée (ou > €65)

**Aggregated Event Measurement**
- [ ] 4 événements configurés avec priorités
- [ ] Suivi valeur activé pour Purchase

**Compte pub**
- [ ] Statut : Actif (pas de restriction)
- [ ] Devises : EUR
- [ ] Fuseau horaire : Europe/Paris

---

## DÉPANNAGE RAPIDE

| Problème | Solution |
|---------|---------|
| Pixel Helper ne détecte rien | Vérifier installation (code dans `<head>`) |
| PageView mais pas ViewContent | Ajouter `fbq('track', 'ViewContent')` sur page produit |
| Purchase ne remonte pas | Ajouter event sur page `/merci` ou `/order-confirmation` |
| Domaine "non vérifié" après 48h | Vérifier DNS avec `nslookup -type=TXT drinknellio.com` |
| Compte publicitaire désactivé | Contacter support Meta (business.facebook.com/help) |
| ROAS = 0 dans Ads Manager | Pixel non associé à la campagne (vérifier config ad) |

---

## INFOS UTILES

- **Support Meta Business** : https://business.facebook.com/help
- **Events Manager** : https://business.facebook.com/events_manager2/
- **Meta Pixel Helper** : https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc
- **Statut des services Meta** : https://metastatus.com/

---

*Guide créé autonomement par Clawdbot Prime — 2026-02-28 07:10*
*Étapes testées pour Shopify + installation manuelle. Adapter si autre CMS.*
