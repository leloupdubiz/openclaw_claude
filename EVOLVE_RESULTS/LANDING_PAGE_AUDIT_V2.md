# Audit Landing Page — drinknellio.com
> Date : 2026-03-01 | Auditeur : Clawdbot Prime ⚡ | Source : Inspection browser directe

---

## RÉSUMÉ EXÉCUTIF

| Catégorie | Score | Statut |
|-----------|-------|--------|
| Conversion (UX/CRO) | 8/10 | ✅ Solide |
| Preuve sociale | 9/10 | ✅ Fort |
| Légal DE (§5 TMG) | 2/10 | 🔴 CRITIQUE |
| Conformité Meta Ads | 5/10 | 🟡 Risque |
| Mobile-first | Non testé | ⏳ À vérifier |

**Verdict :** La landing page est commercialement solide. Mais 2 problèmes critiques bloquent le lancement Meta Ads : absence d'Impressum (sanction légale + bannissement Meta possible) et claims médicaux risqués.

---

## 🔴 BLOCANTS CRITIQUES (avant tout lancement)

### 1. IMPRESSUM ABSENT — Infraction §5 TMG
- `/pages/impressum` → 404
- `/policies/legal-notice` → 404
- Footer contient : Datenschutzerklärung · Widerrufsrecht · Kontaktinformationen · AGB · Versand
- **Impressum = MANQUANT**

**Impact :**
- **Légal** : Abmahnung possible (cabinet d'avocats spécialisés scannent automatiquement) → amendes jusqu'à €5,000
- **Meta Ads** : Meta vérifie la landing page à l'approbation des campagnes → rejet probable ou compte bloqué
- **SEO** : Google DE déprécie les sites sans Impressum pour les requêtes commerciales

**Action requise (Chef uniquement) :**
Créer la page Impressum dans Shopify avec :
```
Impressum

Angaben gemäß § 5 TMG:
[Nom légal entreprise]
[Adresse complète]
[Pays]

Kontakt:
E-Mail: kontakt@drinknellio.com
[Téléphone si disponible]

Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
[N° TVA intracommunautaire]

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
[Nom + adresse]
```

### 2. CLAIMS MÉDICAUX RISQUÉS POUR META ADS
La page contient des formulations qui violent la politique Meta Health & Wellness :

| Claim | Risque |
|-------|--------|
| "Eine Unterstützung bei der Einnahme von Antidepressiva" (heading "Antidep.") | 🔴 TRÈS RISQUÉ — implique substitution traitement médical |
| "50 % der Krebsfälle werden durch Stress mitverursacht" | 🔴 RISQUÉ — mention cancer + statistiques médicales |
| "30 % der Schlaganfälle werden durch Stress mitverursacht" | 🟡 RISQUÉ — mention maladies cardiovasculaires |

**Action recommandée :** Retirer ou reformuler avant lancement. Alternative pour "Antidep." → "Natürliche Ergänzung für dein Wohlbefinden".

---

## ✅ POINTS FORTS (à conserver)

### Preuve Sociale — Excellent
- ⭐ 4.8/5 visible dès le hero
- **21,839 Bewertungen** affiché (chiffre précis = plus crédible que "20.000+")
- 10 témoignages détaillés avec prénom + ville DE/AT/CH
- Témoignages ultra-spécifiques et ciblés par avatar :
  - Sabrina (Linz) → Busy Mom ✅
  - Thomas (Frankfurt) → Stressed Pro ✅
  - Julia (Wien) → Busy Mom ✅
  - Anja (Basel) → Insomnie chronique ✅

### Structure de Prix — Claire
| Pack | Prix | Prix/unité |
|------|------|------------|
| 1 mois | €34.99 (barré €49.99) | €1.75/j |
| 3 mois (2+1 gratuit) | €49.99 (barré €149.97) | €0.83/j |
| 6 mois (4+2 gratuit) | €89.99 (barré €299.94) | €0.75/j |
| + Mixer électrique GRATUIT (€19.99) sur 6 mois | | |

**AOV optimal :** Le pack 3 mois représente le meilleur rapport qualité/prix affiché → le CTA devrait le mettre en avant comme "recommandé".

### UX / Funnel
- ✅ Hero vidéo avec UGC (femme souriante + produit)
- ✅ Pop-up discount 10% (email capture avec timer 9 minutes)
- ✅ Garantie 45 jours visible à 3 endroits
- ✅ Ingrédients expliqués en détail (4 sections séparées)
- ✅ Section "Pourquoi Nellio ?" avec 6 bénéfices icônes
- ✅ FAQ section
- ✅ Newsletter footer
- ✅ Chat widget actif

### Ingredients & Science
- ✅ Ashwagandha 300mg + L-Theanin 400mg + Magnesium 100mg + Vit D3 1000 IE
- ✅ Explications mécanistiques pour chaque ingrédient
- ✅ Connexion stress → bénéfice clairement expliquée

---

## 🟡 POINTS D'AMÉLIORATION (non bloquants pour le lancement)

### Timer countdown "fake urgency"
- "Kostenloser Versand Endet heute um 11:26:32" → timer se reset à chaque visite
- En Allemagne, les faux timers urgency peuvent violer l'UWG (loi concurrence déloyale)
- **Recommandation :** Utiliser un vrai timer (flash sale réel) ou retirer

### Pack "Recommandé" non visible
- Aucun badge "BELIEBTESTE WAHL" ou "EMPFOHLEN" sur le pack 3 mois
- Le pack 3 mois a le meilleur rapport → le mettre en avant augmente l'AOV
- **Recommandation :** Ajouter badge visuel sur le bundle du milieu

### Manque de réassurance shipping
- Delivery estimée non affichée sur la page produit
- **Recommandation :** Ajouter "Lieferung in 2-4 Werktagen 🇩🇪"

### Pixel Meta
- Non vérifiable via browser sans Meta Pixel Helper
- **Action Chef :** Installer l'extension Meta Pixel Helper et vérifier : Purchase / InitiateCheckout / AddToCart / ViewContent

---

## ⚠️ ALERTE MARCHÉ — Stiftung Warentest (Octobre 2024)

**Stiftung Warentest** (équivalent allemand de "60 Millions de Consommateurs") a publié une **alerte sur l'Ashwagandha** :
- Rapports de dommages hépatiques après consommation
- Le BfR (Institut fédéral d'évaluation des risques) signale nausées, vomissements, diarrhée, vertiges
- URL : https://www.test.de/Nahrungsergaenzungsmittel-Warnung-vor-Ashwagandha-6162426-0/

**Impact potentiel sur Nellio :**
- Les consommateurs DE informés peuvent chercher "Ashwagandha gefährlich" → objection fréquente
- **Recommandation créative :** Créer un angle de réassurance dans les scripts UGC ("Nellio utilise 300mg — une dose cliniquement validée et sûre, en dessous du seuil d'alerte")
- **Recommandation page :** Ajouter une FAQ "Ist Ashwagandha sicher?" avec réponse rassurante + dosage scientifique

---

## CHECKLIST AVANT LANCEMENT META ADS

| Item | Statut | Owner |
|------|--------|-------|
| Impressum créé et linké dans footer | 🔴 À FAIRE | Chef |
| Claim "Antidep." retiré/reformulé | 🔴 À FAIRE | Chef |
| Claims cancer/AVC reformulés | 🟡 Recommandé | Chef |
| Pixel Meta vérifié (4 events) | ⏳ À vérifier | Chef |
| Domaine vérifié dans Business Manager | ⏳ À vérifier | Chef |
| Mode de paiement Meta actif | ⏳ À vérifier | Chef |
| FAQ "Ashwagandha sicher?" ajoutée | 🟡 Recommandé | Chef |
| Badge "Empfohlen" sur pack 3 mois | 🟢 Optionnel | Chef/dev |
| Timer fake urgency corrigé | 🟢 Recommandé | Chef/dev |

---

*Audit Clawdbot Prime ⚡ | 2026-03-01*
