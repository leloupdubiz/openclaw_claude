# CAMPAIGN_SETUP_BATCH01.md — Setup Meta Ads Complet
## Phase 4 EVOLVE — Campaign Builder | Batch Marksman #1
> Produit : Nellio UltraCalm — drinknellio.com
> Marché : Allemagne / DACH | Canal : Meta Ads (Facebook + Instagram)
> Méthode : 3-2-2 (3 Scripts × 2 Body Copies × 2 Headlines = 12 ads)
> Généré le : 2026-02-26

---

## SECTION 1 — Structure de Campagne

### Niveau Campagne

| Paramètre | Valeur | Justification |
|-----------|--------|---------------|
| **Objectif** | Sales (Conversions — Purchase) | On a un produit physique avec prix défini. Purchase = seul signal qui compte pour le ROAS. |
| **Type de budget** | **CBO (Campaign Budget Optimization)** | Meta alloue automatiquement vers l'adset qui performe le mieux. Idéal en phase test : évite le micro-management et laisse l'algorithme trouver la poche de profit. |
| **Budget journalier** | **€65/jour** (milieu de la fourchette €50-80) | Donne assez de volume de données en 72h pour avoir des signaux clairs sur au moins 2-3 Purchase par adset. En dessous de €50/j : signal trop faible sur 72h. Au-dessus de €80 : gaspillage avant optimisation. |
| **Attribution** | **7-day click / 1-day view** | Standard Meta recommandé pour e-commerce. Le 7j click capture les acheteurs qui réfléchissent 2-5 jours (typique nutraceutique). Le 1j view capte les conversions post-impression importantes pour mesurer l'impact vidéo UGC. |
| **Enchère** | Lowest Cost (Automatique) | Phase test = ne pas contraindre Meta avec un Cost Cap. Laisser l'algorithme explorer. Cost Cap uniquement en phase Scale. |
| **Schedule** | Aucune limitation horaire | L'audience DE est distribuée — ne pas limiter les heures de diffusion en phase test. |

---

### Niveau Adsets — 2 Adsets

#### Adset A — BROAD

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | NLO_DE_SALES_ADSA_BROAD_65€ |
| **Géo** | Allemagne uniquement (DE) |
| **Âge** | 28-50 ans |
| **Genre** | Tous |
| **Intérêts** | Aucun — Broad pur |
| **Exclusions** | Clients existants (liste CRM à uploader) + Visiteurs de drinknellio.com (pixel retargeting exclu) |
| **Placements** | **Advantage+ Placements (Auto)** — Meta optimise entre Reels, Feed, Stories. Les vidéos UGC 9:16 s'adaptent bien à tous. |
| **Budget** | CBO gère — estimé ~€33/j alloués |
| **Langue** | Allemand uniquement (setting audience par langue) |

**Rationale Broad** : Avec une vidéo UGC bien craftée et un hook fort, Meta trouve l'audience qualifiée seule via Advantage+. C'est l'adset de découverte — il permet d'identifier qui convertit réellement sans nos biais de ciblage.

---

#### Adset B — INTÉRÊTS

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | NLO_DE_SALES_ADSB_INT_65€ |
| **Géo** | Allemagne uniquement (DE) |
| **Âge** | 28-50 ans |
| **Genre** | Tous |
| **Intérêts** | Voir tableau ci-dessous |
| **Exclusions** | Idem Adset A |
| **Placements** | Advantage+ Placements (Auto) |
| **Budget** | CBO gère — estimé ~€32/j alloués |

**Intérêts suggérés (termes Meta exacts) :**

| Catégorie | Terme Meta | Taille audience DE (estimé) |
|-----------|-----------|----------------------------|
| Bien-être | Meditation | Large |
| Bien-être | Yoga | Large |
| Santé | Nahrungsergänzungsmittel | Moyen |
| Santé | Ashwagandha | Petit (mais très qualifié) |
| Santé | Schlaflosigkeit (Insomnia) | Moyen |
| Lifestyle | Burnout | Moyen |
| Lifestyle | Work-life balance | Large |
| Santé | Magnesium | Moyen |

**Combinaison recommandée** : Cibler (Meditation OR Yoga OR Schlaflosigkeit OR Burnout OR Nahrungsergänzungsmittel) — élargir si la taille d'audience < 500K.

**Rationale Intérêts** : Permet d'accélérer l'apprentissage Meta en indiquant des segments chauds. En parallèle du Broad, l'algo peut trouver des poches à CPM plus faible sur des audiences pré-qualifiées.

---

### Niveau Ads — 12 Ads (6 par Adset)

**Stratégie de répartition** : Phase 1 (J1-J3) = 6 ads P1 par adset (Body B1 uniquement — entrée émotionnelle, plus large reach). Si winner identifié → activer les 6 ads P2 (Body B2) en J4.

#### ADSET A — BROAD (6 ads P1)

| Ad N° | Nom complet | Script | Body | Headline | CTA |
|-------|-------------|--------|------|----------|-----|
| A-01 | NLO_S1_B1_H1_REEL | S1 — Teufelskreis | B1 Empathique | H1 "Schlecht schlafen..." | Jetzt testen |
| A-02 | NLO_S1_B1_H2_REEL | S1 — Teufelskreis | B1 Empathique | H2 "Dein Cortisol..." | Jetzt testen |
| A-03 | NLO_S2_B1_H1_REEL | S2 — Gedankenkarussell | B1 Empathique | H1 "Schlecht schlafen..." | Jetzt testen |
| A-04 | NLO_S2_B1_H2_REEL | S2 — Gedankenkarussell | B1 Empathique | H2 "Dein Cortisol..." | Jetzt testen |
| A-05 | NLO_S3_B1_H1_REEL | S3 — Cortisol nachts | B1 Empathique | H1 "Schlecht schlafen..." | Jetzt testen |
| A-06 | NLO_S3_B1_H2_REEL | S3 — Cortisol nachts | B1 Empathique | H2 "Dein Cortisol..." | Jetzt testen |

#### ADSET B — INTÉRÊTS (6 ads P1)

| Ad N° | Nom complet | Script | Body | Headline | CTA |
|-------|-------------|--------|------|----------|-----|
| B-01 | NLO_S1_B1_H1_REEL | S1 — Teufelskreis | B1 Empathique | H1 "Schlecht schlafen..." | Jetzt testen |
| B-02 | NLO_S1_B1_H2_REEL | S1 — Teufelskreis | B1 Empathique | H2 "Dein Cortisol..." | Jetzt testen |
| B-03 | NLO_S2_B1_H1_REEL | S2 — Gedankenkarussell | B1 Empathique | H1 "Schlecht schlafen..." | Jetzt testen |
| B-04 | NLO_S2_B1_H2_REEL | S2 — Gedankenkarussell | B1 Empathique | H2 "Dein Cortisol..." | Jetzt testen |
| B-05 | NLO_S3_B1_H1_REEL | S3 — Cortisol nachts | B1 Empathique | H1 "Schlecht schlafen..." | Jetzt testen |
| B-06 | NLO_S3_B1_H2_REEL | S3 — Cortisol nachts | B1 Empathique | H2 "Dein Cortisol..." | Jetzt testen |

> **Note** : Les 6 ads P2 (Body B2 — Éducatif/Scientifique) sont préparées mais activées uniquement si les P1 montrent un hook rate > 25% à 24h. Noms : NLO_S[1-3]_B2_H[1-2]_REEL.

---

## SECTION 2 — Naming Convention

### Système de nommage unifié

```
CAMPAGNE :  NLO_[MARCHÉ]_[OBJECTIF]_[DATE]
ADSET :     NLO_[ADSET]_[TARGETING]_[BUDGET]
AD :        NLO_[SCRIPT]_[BODY]_[HEADLINE]_[FORMAT]
```

### Exemples concrets — Batch Marksman #1

```
CAMPAGNE :
NLO_DE_SALES_20260226

ADSETS :
NLO_DE_SALES_20260226_ADSA_BROAD_CBO
NLO_DE_SALES_20260226_ADSB_INT_CBO

ADS :
NLO_S1_B1_H1_REEL      → Script 1 × Body Empathique × Headline Identification × Reels 9:16
NLO_S1_B1_H2_REEL      → Script 1 × Body Empathique × Headline Révélation × Reels 9:16
NLO_S2_B1_H1_REEL      → Script 2 × Body Empathique × Headline Identification × Reels 9:16
NLO_S2_B1_H2_REEL      → Script 2 × Body Empathique × Headline Révélation × Reels 9:16
NLO_S3_B1_H1_REEL      → Script 3 × Body Empathique × Headline Identification × Reels 9:16
NLO_S3_B1_H2_REEL      → Script 3 × Body Empathique × Headline Révélation × Reels 9:16
NLO_S1_B2_H1_REEL      → Script 1 × Body Éducatif × Headline Identification (P2)
NLO_S1_B2_H2_REEL      → Script 1 × Body Éducatif × Headline Révélation (P2)
[...idem S2 et S3 P2]
```

### Légende des codes

| Code | Signification |
|------|---------------|
| NLO | Nellio (marque) |
| DE | Deutschland (marché) |
| SALES | Objectif campagne |
| ADSA / ADSB | Adset A (Broad) / Adset B (Intérêts) |
| BROAD / INT | Type ciblage |
| CBO | Budget au niveau campagne |
| S1 / S2 / S3 | Script 1 (Teufelskreis) / 2 (Gedankenkarussell) / 3 (Cortisol nachts) |
| B1 / B2 | Body Copy 1 (Empathique) / Body Copy 2 (Éducatif) |
| H1 / H2 | Headline 1 (Identification) / Headline 2 (Révélation) |
| REEL | Format vidéo 9:16 vertical |

---

## SECTION 3 — Checklist Pre-Launch

### Technique — Tracking

- [ ] **Pixel Meta installé** sur drinknellio.com — vérifier via Meta Pixel Helper (extension Chrome)
- [ ] **Event Purchase** correctement configuré et déclenché sur la page de confirmation de commande
- [ ] **Event InitiateCheckout** déclenché à l'entrée du checkout
- [ ] **Event AddToCart** déclenché sur le bouton "In den Warenkorb"
- [ ] **Event ViewContent** déclenché sur la page produit UltraCalm
- [ ] **Conversions API (CAPI)** activée côté serveur — réduit l'impact iOS 14.5+ et améliore l'attribution de 15-30%
- [ ] **Test des events** dans Events Manager → onglet Test Events — simuler un achat complet

### UTM Parameters — Format recommandé

```
utm_source=facebook
utm_medium=paid_social
utm_campaign=NLO_DE_SALES_20260226
utm_content={{ad.name}}   ← variable dynamique Meta
utm_term={{adset.name}}   ← variable dynamique Meta
```

URL complète exemple :
```
https://drinknellio.com/products/ultracalm?utm_source=facebook&utm_medium=paid_social&utm_campaign=NLO_DE_SALES_20260226&utm_content={{ad.name}}&utm_term={{adset.name}}
```

### Compte & Compliance

- [ ] **Domaine drinknellio.com vérifié** dans Meta Business Manager → Brand Safety → Domaines
- [ ] **Business Manager compte** actif avec mode de paiement valide (carte DE ou SEPA)
- [ ] **Politique publicitaire Meta lue** — section Supplements & Health Products (voir Section 4)
- [ ] **Landing page** : URL de destination testée sur mobile (la majorité du trafic Meta DE est mobile)
- [ ] **Vitesse page** : Lighthouse score mobile > 60 (lent = CPC monte, ROAS descend)
- [ ] **Page Mentions Légales** (Impressum) présente sur drinknellio.com — obligatoire DE
- [ ] **Reviews 4.8/5 visibles** sur la page produit (preuve sociale critique pour le taux de conversion)

### Assets Créatifs

- [ ] **Vidéos UGC tournées** pour S1, S2, S3 (format 9:16, min 1080×1920px, MP4)
- [ ] **Sous-titres en allemand** ajoutés à chaque vidéo (85% des Reels sont regardés sans son)
- [ ] **Thumbnail personnalisée** pour chaque vidéo (frame 0-1s attractive — non autogénérée)
- [ ] **Body copies et headlines** prêts dans un doc texte (copy-paste direct dans Ads Manager)

---

## SECTION 4 — Claims Autorisés vs Interdits (Meta Allemagne)

### Règles générales Meta + marché DE

Meta interdit : les claims médicaux (diagnostic, traitement, guérison), les before/after impliquant une pathologie médicale, les superlatifs non prouvables. L'Allemagne ajoute une couche stricte via le **HWG (Heilmittelwerbegesetz)** — la loi allemande sur la publicité pour les remèdes/compléments.

---

### ✅ Claims OK pour Meta Ads DE (scientifiquement étayés)

| Claim du copy | Statut | Source / Justification |
|---------------|--------|------------------------|
| "Ashwagandha KSM-66 — 45 klinische Studien" | ✅ OK | Vrai — KSM-66 est la forme brevetée avec le plus d'études publiées |
| "Nachgewiesene Cortisol-Reduktion von fast 28%" | ✅ OK | Vrai — études Chandrasekhar et al. (2012), -27.9% mesuré en RCT |
| "L-Theanin erzeugt Alpha-Gehirnwellen" | ✅ OK | Vrai — mécanisme documenté, bien accepté par Meta |
| "Magnesiumglycinat — bioverfügbarste Form" | ✅ OK | Vrai — forme glycinate > oxyde en biodisponibilité |
| "4,8 von 5 — über 20.000 Bewertungen" | ✅ OK | Preuve sociale factuelle — garder les reviews vérifiables |
| "Kein Schlafmittel. Keine Abhängigkeit." | ✅ OK | Claim négatif vrai, non exagéré |
| "45 Tage Geld-zurück-Garantie" | ✅ OK | Engagement marchand, pas un claim santé |
| "Natürliche Inhaltsstoffe" | ✅ OK | Neutre, factuel |

---

### ⚠️ Claims à reformuler (risque de rejection Meta ou HWG)

| Claim original | Problème | Version Meta-compliant |
|----------------|----------|------------------------|
| *"Cortisol verhindert den Tiefschlaf"* | Trop médical direct — peut être lu comme diagnostic | → *"Ein hoher Cortisolspiegel kann die Erholung nachts beeinflussen"* |
| *"Hilft dir aus dem Stress-Schlaf-Teufelskreis heraus"* | "Hilft" = claim thérapeutique implicite selon HWG | → *"Unterstützt deinen Körper dabei, abends zur Ruhe zu kommen"* |
| *"Nellio UltraCalm wurde genau für diesen Kreislauf entwickelt"* | Mention implicite d'une condition médicale | → *"Nellio UltraCalm wurde für Menschen entwickelt, die abends schwer abschalten können"* |
| *"Wenn du aus diesem Kreislauf rauswillst"* (CTA) | "Kreislauf" dans ce contexte médical peut être flaggé | → *"Wenn du abends endlich zur Ruhe kommen willst"* |
| *"Schlechter Schlaf weil Cortisol zu hoch"* (dans headline) | Lien causalité directe — claim médical | → *"Cortisol abends zu hoch? So entspannst du dich besser."* |
| *"3.800 Patienten"* (Body B2) | "Patienten" = vocabulaire médical à éviter dans ads | → *"3.800 Teilnehmer in klinischen Studien"* |

---

### ❌ Claims interdits (à bannir absolument)

| Claim | Raison | Note |
|-------|--------|------|
| "Heilt Schlaflosigkeit" | Promesse de guérison — HWG §3 interdit | N'existe pas dans nos copies, mais à ne jamais écrire |
| "Klinisch bewiesen heilt..." | Tout "heilt" / "behandelt" = interdit | |
| "Ersetzt Schlaftabletten" | Claim médical de substitution | Utiliser : "Kein chemisches Schlafmittel" à la place |
| "Bei Burnout / Depression empfohlen" | Mention de pathologie = rejet garanti | Utiliser : "für Menschen unter Dauerstress" |
| "Ergebnisse garantiert" | Promesse de résultat sur un complément | La garantie 45j argent est OK, résultat garanti non |
| Avant/Après avec un problème médical visible | Meta strict sur before/after santé | UGC testimonial OK si non dramatisé |

---

## SECTION 5 — KPIs de Décision 72h (Marksman Dashboard)

### Tableau de décision

| Métrique | Seuil STOP 🔴 | Seuil MAINTIEN 🟡 | Seuil SCALE 🟢 | Comment mesurer |
|----------|--------------|------------------|----------------|-----------------|
| **CPM** | > €25 | €15-25 | < €15 | Ads Manager — colonne CPM |
| **Hook Rate (3s views / impressions)** | < 20% | 20-35% | > 35% | Video plays at 3s ÷ Impressions |
| **Hold Rate (25% views / 3s views)** | < 25% | 25-40% | > 40% | Video plays at 25% ÷ 3s plays |
| **CTR Link** | < 0,8% | 0,8-1,5% | > 1,5% | Link clicks ÷ Impressions |
| **CPC Link** | > €2,5 | €1,5-2,5 | < €1,5 | Spend ÷ Link clicks |
| **ROAS** | < 1,5x | 1,5-2,5x | > 2,5x | Revenue ÷ Ad spend |
| **CPA (Cost per Purchase)** | > €45 | €25-45 | < €25 | Spend ÷ Purchases |

### Lecture des données — Règles d'interprétation

**Priorité de lecture :**
1. Hook Rate en premier → filtre les créatifs qui ne captent pas
2. Hold Rate → filtre les créatifs qui ne retiennent pas (même si hook OK)
3. CTR Link → filtre les messages qui ne convertissent pas au clic
4. CPA / ROAS → décision finale d'échelle ou d'arrêt

**Seuil de données minimum** : attendre minimum **500 impressions et 50€ dépensés** par ad avant de décider d'un STOP. Un ad avec 5 impressions et 0 achat = pas de donnée, pas de décision.

**Fenêtre d'analyse** : J+3 (72h après activation). Ne pas analyser avant — l'algorithme est en phase d'apprentissage (Meta recommande 50 events par semaine pour sortir de la learning phase).

---

## SECTION 6 — Règles Automatiques Meta Recommandées

### Règle 1 — Stop Loss (Protection budget)

```
NOM : NLO_STOP_LOSS_AD
CONDITION : Si CPA > €60 ET Dépense > €30 sur une période de 2 jours
ACTION : Désactiver l'ad
TIMING : Vérification toutes les 12h
JUSTIFICATION : Un ad qui brûle €30+ avec CPA > 2x notre seuil STOP est confirmé perdant.
                €30 = assez de signal. Arrêt automatique évite la perte pendant le sommeil.
```

### Règle 2 — Escalation (Protection des winners)

```
NOM : NLO_ESCALATION_ADSET
CONDITION : Si ROAS > 3,0 sur 48h ET Dépense > €50
ACTION : Augmenter le budget adset de 20% (si ABO) OU notifier (si CBO)
TIMING : Vérification quotidienne à 8h CET
NOTE CBO : En CBO, ne pas toucher au budget campagne manuellement si Meta alloue bien.
           La règle déclenche une notification — Chef décide de scaler manuellement.
```

### Règle 3 — Notification CPM anormal

```
NOM : NLO_CPM_ALERT
CONDITION : Si CPM > €30 sur une période de 24h ET Dépense > €20
ACTION : Envoyer notification email + pause l'adset
TIMING : Vérification toutes les 24h
JUSTIFICATION : CPM > €30 sur DE en nutraceutique = signal d'audience saturée ou
                problème de qualité ad (Meta pénalise). Pause + investiguer avant de relancer.
```

### Règle 4 — Ad fatigue (Longevité)

```
NOM : NLO_FATIGUE_ALERT
CONDITION : Si Frequency > 3,5 ET Reach > 5.000 personnes uniques
ACTION : Notification — créer nouvelles variantes
TIMING : Vérification hebdomadaire
JUSTIFICATION : Frequency > 3,5 = sur-diffusion. L'ad commence à fatiguer l'audience.
                Signal pour préparer le prochain batch créatif.
```

### Création des règles dans Meta Ads Manager

```
Chemin : Ads Manager → Règles automatiques → Créer une règle
→ Sélectionner le niveau (Campagne / Adset / Ad)
→ Définir la condition (et les opérateurs logiques)
→ Définir l'action (désactiver / notification / modifier budget)
→ Définir la fréquence de vérification
→ Enregistrer + activer
```

---

## SECTION 7 — Plan Marksman → Sniper

### Phase Marksman (J1-J14) — Identifier le winner

**Objectif** : Parmi 3 scripts × 2 headlines, identifier quelle combinaison Script + Angle génère le meilleur ROAS de manière répétable.

**Critères de déclaration d'un winner (score Marksman) :**

Un script est déclaré **winner** si, après 72h minimum et 500+ impressions par ad :

| Critère | Valeur minimale |
|---------|----------------|
| Hook Rate | > 30% |
| Hold Rate | > 35% |
| CTR Link | > 1,2% |
| CPA | < €35 |
| ROAS | > 2,0x |
| Volume | Minimum 5 Purchase générés |

**Méthode de scoring** : Si un script performe au seuil SCALE (🟢) sur 3+ métriques parmi {Hook Rate, CTR, CPA, ROAS} → winner déclaré. Si tie entre 2 scripts → regarder le CPA final. CPA le plus bas = winner.

**Timing de la décision** :
- J+3 : Première lecture — arrêt des ads clairement perdants (STOP sur ≥ 3 métriques rouges)
- J+7 : Décision intermédiaire — identifier les 2 scripts en tête
- J+14 : Décision finale Marksman → un winner déclaré ou confirmation de non-performance (retour à la création)

---

### Phase Sniper (J15+) — Exploiter le winner

**Trigger** : Un script winner identifié avec ROAS > 2x confirmé.

**Actions Sniper immédiates :**

#### 1. Duplication de l'adset winner

```
ACTION : Dupliquer l'adset qui contient le winner
MODIFICATION : Augmenter le budget de 30-50% sur la copie
RÈGLE : Ne jamais modifier le budget de l'adset original qui performe — dupliquer.
        Modifier un adset en bonne santé = reset de la learning phase.
```

#### 2. Deep-dive créatif sur l'angle winner

```
NOUVEAU BATCH SNIPER :
- 5 nouveaux hooks sur l'angle winner (varier la structure des 3 premières secondes)
- 2 nouvelles body copies (tester approche "testimonial pur" vs actuelle)
- 1 nouvelle headline angle différent
= 10 nouvelles variantes du script winner
```

#### 3. Expansion d'audience (si winner confirmé sur Broad)

```
SI winner sur Adset A Broad :
→ Créer Lookalike 1% sur Purchasers (minimum 100 purchasers dans la liste)
→ Créer Lookalike 2-3% si volume insuffisant en 1%
→ Tester sur un nouvel adset séparé avec le même ad winner

SI winner sur Adset B Intérêts :
→ Tester le même ad en Broad pour voir si l'audience est plus large
```

#### 4. Scaling progressif (CBO ladder)

```
SEMAINE 1 SNIPER : €65/j → €100/j (si ROAS stable 48h)
SEMAINE 2 SNIPER : €100/j → €150/j (si ROAS stable)
SEMAINE 3 SNIPER : Décision scaling agressif ou plateau
RÈGLE : Ne jamais augmenter de plus de 30-50% par palier.
        Augmentation > 50% = reset learning phase = perte de performance.
```

#### 5. Nouveaux marchés DACH (si scaling DE confirmé)

```
APRÈS 30j de scaling profitable en DE :
→ Dupliquer la campagne → cibler Autriche (AT) + Suisse (CH) avec adaptation copy
→ Budget initial AT : €20/j | CH : €20/j
→ Valider si les mêmes scripts convertissent (culture similaire, même langue)
```

---

## RÉCAPITULATIF BUDGET BATCH MARKSMAN #1

| Poste | Montant | Durée |
|-------|---------|-------|
| Budget campagne Meta (CBO) | €65/jour | 14 jours |
| **Total test Marksman** | **~€910** | 14 jours |
| Budget minimum recommandé pour signal clair | €455 (7 jours) | — |
| Coût par insight créatif (12 ads) | ~€76/ad | — |

> **Note** : €910 sur 14 jours est un investissement de recherche créative + audience, pas une campagne de vente pure. L'objectif est d'identifier 1 winner ROAS > 2x qui justifie le scaling. Un winner trouvé peut générer 5-10x le budget test en phase Sniper.

---

*Document généré : 2026-02-26 | Clawdbot Prime ⚡ | Phase 4 EVOLVE*
