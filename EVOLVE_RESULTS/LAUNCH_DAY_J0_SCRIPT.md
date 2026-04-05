# Launch Day J0 — Script Opérationnel Heure par Heure
> Clawdbot Prime ⚡ | Généré le 2026-03-02 | drinknellio.com
> À utiliser le jour du lancement de NLO_DE_SALES

---

## ⚡ CHECKLIST PRÉ-LANCEMENT (J-1 — la veille)

Avant de dormir la veille du lancement :

- [ ] Pixel Helper : 4 events OK (Purchase / IC / ATC / VC)
- [ ] Domaine validé dans Meta BM (vert)
- [ ] AEM configuré (8 événements prioritisés)
- [ ] Campagne CBO en mode BROUILLON — structure prête
- [ ] 3 adsets créés (3 angles Marksman), budget OFF
- [ ] 12 ads uploadés, nommés (NLO_DE_S1A_BC-1_H1, etc.), en revue
- [ ] URLs destination vérifiées (UTM ok, landing page charge en <3s)
- [ ] Klaviyo : flow post-achat activé en mode test
- [ ] Meta Automation Rules : 4 règles P0 configurées (stop-loss, pause CPP, daily cap, alert)
- [ ] Compte bancaire / CB rechargé pour Meta (€500+ minimum)

**Heure recommandée de publication :** 8h-9h heure française (7h-8h Allemagne) — audience active.

---

## 🚀 J0 — LANCEMENT (CHRONOLOGIE)

### 07h45 — Wake up check
```
✅ Services UP : Nellio (3001) · OMNIA (3002) · Library (4242)
✅ Meta Business Manager : aucune alerte compte
✅ Pixel Helper : vert sur drinknellio.com
✅ Email perso : aucun email Meta "Annonce refusée" pendant la nuit
```
Si une annonce refusée : ouvrir Meta, identifier la raison, corriger avant publication.

---

### 08h00 — Publication campagne
```
1. Meta Ads Manager → Campagne NLO_DE_SALES
2. Vérifier status = BROUILLON
3. Cliquer "Publier"
4. Confirmer les 3 adsets actifs, budget CBO total €65/j
5. Prendre screenshot de confirmation → sauvegarder
```
**Heure UTC recommandée :** 07h00 UTC (8h Paris) — début d'activité DE.

---

### 08h15 — Confirmation de livraison
```
Meta → Adsets → Status "En livraison" ou "En apprentissage"
→ Si "En revue" : normal, attendre 30-60 min
→ Si "Refusée" : aller dans l'ad concernée, lire la raison
→ Si "Suspendue" : vérifier compte BM, mode paiement
```

---

### 09h30 — Premier check métriques (1h30 après lancement)

| Métrique | Ce que tu regardes | Action si anormal |
|---------|-------------------|------------------|
| Impressions | >500 par adset | Si 0 → vérifier budget/approbation |
| CPM | €5-20 (normal) | Si >€40 → audience trop étroite |
| CTR | >1% (objectif 2-3%) | Si <0.5% → hook problème |
| Spend | En cours de dépense | Si €0 → approbation pending |

**⚠️ NE PAS TOUCHER LES ADS dans les premières 24h.** L'algorithme Meta est en phase d'apprentissage.

---

### 12h00 — Check mi-journée (4h après lancement)

```
Métriques à noter dans CREATIVE_PERFORMANCE_TRACKER.md :
- Spend par adset
- Impressions / Reach
- CPM / CPC / CTR
- Clics vers landing page

Questions clés :
→ Quel adset dépense le plus ? (Meta favorise naturellement le meilleur)
→ Y a-t-il déjà des clics ? → Si oui, la landing page est chargée
→ Y a-t-il un achat ? → Très peu probable J+0 mais noter si oui
```

Poster dans Discord/Notes : "J0 12h — [X] impressions, [Y] clics, [Z] dépensé"

---

### 15h00 — Vérification Pixel (si premiers clics)

```
1. Aller sur drinknellio.com avec Pixel Helper activé
2. Ajouter un produit au panier → vérifier ATC event
3. Commencer checkout → vérifier IC event
4. Simuler achat test (si possible) → vérifier Purchase

Si events manquants → Events Manager Meta → Tester Events
```

---

### 18h00 — Bilan J0 soir

**Tableau à remplir :**

| Adset | Angle | Spend | Impressions | Clics | CTR | CPM | CPC | Achats |
|-------|-------|-------|-------------|-------|-----|-----|-----|--------|
| NLO_DE_AS1 | [Angle 1] | €__ | ____ | ___ | __% | €__ | €__ | __ |
| NLO_DE_AS2 | [Angle 2] | €__ | ____ | ___ | __% | €__ | €__ | __ |
| NLO_DE_AS3 | [Angle 3] | €__ | ____ | ___ | __% | €__ | €__ | __ |

**Analyse soir J0 :**
- Quel adset a le CTR le plus élevé ? → Angle potentiellement fort
- Quel adset a le CPM le plus bas ? → Audience la plus réceptive
- Y a-t-il des achats ? → Si oui : note l'heure + montant + source (quel ad)

**⛔ À NE PAS FAIRE ce soir :**
- Couper un adset (trop tôt)
- Augmenter le budget
- Modifier les ads
- Paniquer si ROAS = 0 (normal J0 — délai attribution 1-7j)

---

### 20h00 — Setup monitoring automatique

```
1. Meta → Business Suite → Notifications
   → Activer : "Annonce refusée", "Dépense inhabituelle", "Résultats nuls"
   
2. Vérifier que les 7 règles d'automatisation sont actives
   (voir META_AUTOMATION_RULES_DE.md)
   
3. Configurer alerte email/SMS si ROAS < 0.8 pendant 24h

4. Programmer check J+1 matin à 9h
```

---

### 22h00 — Dernière vérification J0

```
✅ Campagne active → Status "En livraison"
✅ Budget dépensé aujourd'hui : ~€20-65 (selon heure de publication)
✅ Aucune notification d'anomalie Meta
✅ Notes J0 enregistrées dans CREATIVE_PERFORMANCE_TRACKER.md
✅ Klaviyo : vérifier si des sessions email ont été créées

→ Dormir. L'algorithme travaille.
```

---

## 📅 J+1 — MATIN (Check 72h démarré)

### 09h00 — Analyse J0 complète

```
Données à récupérer dans Meta (fenêtre 24h J0) :
- Spend total
- Impressions / Reach
- CTR moyen
- CPC moyen  
- Achats (0-2 probables)
- ROAS apparent (si achats)
```

**Décision J+1 :**

| Condition | Action |
|-----------|--------|
| 0 achats, CTR >1.5% | Normal → continuer, surveiller J+2 |
| 0 achats, CTR <0.5% | Hook problème → ne pas couper encore, attendre 48h total |
| 1-2 achats, ROAS >1.0 | Très bon signal → ne pas toucher |
| 0 spend sur un adset | Vérifier approbation ou budget |

---

## 📅 J+2 — DÉCISION INTERMÉDIAIRE

### Analyse 48h

```
Si 0 achats sur tous les adsets après 48h :
→ Vérifier le Pixel (events bien reçus ?)
→ Vérifier la landing page (checkout fonctionnel ?)
→ Vérifier l'audience (trop étroite ? exclusions trop larges ?)
→ Ne couper que si Spend >€100 avec 0 résultat

Si 1-2 achats isolés :
→ Identifier quel adset → quel ad
→ Augmenter légèrement la priorité dans le CBO (ne pas toucher le budget)
```

---

## 📅 J+3 — DÉCISION MARKSMAN 72H

### Check final 72h — voir AB_TEST_HYPOTHESIS_PACK.md §Matrice décision

```
Données à analyser :
- ROAS apparent + correction iOS14 (+30%)
- CPP vs seuil breakeven (€21.36)
- Quel angle a le plus d'achats ?
- Quel créatif (hook/copy) a le meilleur CTR ?

Décision selon seuils :
→ ROAS >1.8 corrigé → PHASE SNIPER (couper 2 losers, doubler winner)
→ ROAS 1.4-1.8 → OPTIMISER (itérer copy/hook du meilleur)
→ ROAS <1.0 après €195 → STOP → débriefing angles
```

---

## 📊 LOG DE LANCEMENT (à remplir au fil de J0)

```markdown
## Log Lancement NLO_DE_SALES
Date : ____________________
Heure publication : ________

### 08h00 — Publication
- Status : _______________
- Première approbation : __:__

### 12h00 — Check mid
- Spend : €_____
- Impressions : _______
- Clics : ______

### 18h00 — Bilan soir
- Spend total : €_____
- Meilleur CTR : Adset __ → ___%
- Achats : ___
- ROAS apparent : ___

### Notes
___________________________
```

---

## 🚨 PROBLÈMES FRÉQUENTS J0 — SOLUTIONS

| Problème | Cause probable | Solution |
|---------|----------------|----------|
| "En revue" bloqué >2h | Système Meta lent | Attendre 24h max, contact support si >48h |
| Annonce refusée | Copy non conforme | Lire la raison Meta, modifier la phrase incriminée |
| Spend €0 après 4h | Pas d'approbation | Vérifier notifications Meta, relancer la revue |
| CPM >€40 | Audience trop niche | Vérifier les exclusions (trop restrictives ?) |
| 0 clics | Hook ou visuel faible | Ne rien faire J0 — attendre 48h |
| Pixel ne fire pas | Shopify installé ? | Reinstaller via Shopify App Store |
| Landing page 500 | Serveur overload | Contacter Shopify support immédiatement |
| Compte suspendu | Politique Meta | Contact Meta Business Support via chat |

---

*Fichier : EVOLVE_RESULTS/LAUNCH_DAY_J0_SCRIPT.md*
*Utilisé avec : META_PRELAUNCH_CHECKLIST.md · AB_TEST_HYPOTHESIS_PACK.md · META_AUTOMATION_RULES_DE.md · CREATIVE_PERFORMANCE_TRACKER.md*
