# Règles d'Automatisation Meta Ads — NLO_DE_SALES
> Clawdbot Prime ⚡ | Généré le 2026-03-02 | Basé sur MEDIA_PLAN_LANCEMENT.md + META_PRELAUNCH_CHECKLIST.md

---

## 🎯 Objectif
Configurer les règles automatiques Meta Ads Manager pour protéger le budget et scaler les winners **sans surveillance constante**.

---

## ACCÈS

Meta Ads Manager → Campagne NLO_DE_SALES → **Automated Rules** (icône en haut à droite)

---

## RÈGLE #1 — STOP-LOSS ABSOLU (Protection budget)

**Nom :** `NLO_STOP_LOSS_ROAS`
**Action :** Désactiver l'ad set
**Condition :** ROAS (7 jours) < 0.8 **ET** Spend > €30
**Plage de vérification :** Toutes les 12 heures
**Notification :** Email + push (activer les deux)

> *Contexte : Protège contre les adsets qui brûlent le budget sans aucun retour. Seuil 0.8 = perte nette même en comptant les conversions retardées.*

---

## RÈGLE #2 — PAUSE 48H (Test Marksman)

**Nom :** `NLO_PAUSE_48H_CPP`
**Action :** Désactiver l'ad set
**Condition :** Cost Per Purchase > €45 **ET** Spend > €65 **ET** Age de l'adset < 72 heures
**Plage de vérification :** Toutes les 24 heures
**Notification :** Email

> *Contexte : €65/j × 72h = €195 investis. Si le CPP dépasse €45 (marge nette négative estimée), stopper avant de perdre davantage. Pas besoin d'attendre 72h si ça dépasse €45 dès J+2.*

---

## RÈGLE #3 — SCALE WINNER (Augmentation budget)

**Nom :** `NLO_SCALE_WINNER_ROAS`
**Action :** Augmenter le budget de l'adset de **20%**
**Condition :** ROAS (3 jours glissants) > 2.5 **ET** Spend > €50 sur les 3 jours
**Plage de vérification :** Quotidienne (09:00 CET)
**Fréquence maximale :** 1 fois par semaine (éviter les augmentations en cascade)
**Notification :** Email + push

> *Contexte : +20% par palier = augmentation douce sans casser l'algorithme Meta. Ne pas dépasser +30% en une seule fois.*

---

## RÈGLE #4 — BUDGET CAP QUOTIDIEN (Safety net)

**Nom :** `NLO_DAILY_CAP`
**Action :** Désactiver la campagne
**Condition :** Spend du jour > €120 (soit 185% du budget €65)
**Plage de vérification :** Toutes les heures
**Notification :** Email + push immédiat

> *Contexte : Protège contre les spikes inexpliqués (bugs Meta, audiences incorrectes). €120 = 2× le budget prévu = signal d'anomalie.*

---

## RÈGLE #5 — ALERTE CPM ANORMAL

**Nom :** `NLO_ALERT_CPM`
**Action :** Envoyer une notification (pas de pause)
**Condition :** CPM > €18 **ET** Impressions du jour > 5,000
**Plage de vérification :** Quotidienne
**Notification :** Email

> *Contexte : CPM > €18 sur audience Broad DE 25-54 = signal de sur-enchère ou audience trop étroite. À investiguer, pas à stopper automatiquement.*

---

## RÈGLE #6 — ALERTE FRÉQUENCE (Fatigue créative)

**Nom :** `NLO_ALERT_FREQUENCY`
**Action :** Envoyer une notification
**Condition :** Fréquence (7 jours) > 3.5 **ET** CTR < 0.8%
**Plage de vérification :** Quotidienne
**Notification :** Email

> *Contexte : Fréquence > 3.5 + CTR en baisse = ad fatigue. Signal pour introduire de nouveaux créatifs (Batch #2 ou #3).*

---

## RÈGLE #7 — RÉACTIVATION SEASONAL (Week-end boost)

**Nom :** `NLO_WEEKEND_BOOST`
**Action :** Augmenter budget de 15%
**Condition :** Jour de la semaine = Samedi ou Dimanche
**Plage de vérification :** Quotidienne (00:01)
**Note :** Créer une règle inverse le lundi (−13% pour revenir au budget base)

> *Contexte : Le e-commerce DE performe généralement mieux le week-end. Test à valider sur 2-3 semaines de data.*

---

## ORDRE DE CRÉATION (Priorité)

| # | Règle | Priorité | Pourquoi |
|---|-------|----------|---------|
| 1 | STOP-LOSS ABSOLU | **P0** | Protège immédiatement le budget |
| 2 | PAUSE 48H CPP | **P0** | Stoppe les adsets perdants dès le départ |
| 3 | DAILY CAP | **P0** | Safety net absolue |
| 4 | SCALE WINNER | **P1** | Active dès qu'un winner émerge |
| 5 | ALERTE CPM | **P2** | Information → pas critique |
| 6 | ALERTE FRÉQUENCE | **P2** | Information → utile après 2 semaines |
| 7 | WEEKEND BOOST | **P3** | Optionnel — tester après 1 mois de data |

---

## TABLEAU DE BORD MONITORING 72H

Vérifier **2× par jour** (matin 9h + soir 21h) pendant les 72 premières heures :

| Métrique | Seuil Alerte | Action |
|---------|-------------|--------|
| ROAS | < 1.0 après 48h | Stopper l'adset |
| CPP | > €45 | Review créatifs + pause |
| CTR | < 0.8% | Tester nouveau hook |
| CPM | > €18 | Vérifier targeting |
| Fréquence | > 2.0 en < 72h | Audience trop étroite |
| Spend vs Budget | > 115% | Vérifier règle DAILY CAP |

---

## NOTES IMPORTANTES

1. **Ne jamais modifier le budget CBO manuellement** les 24 premières heures — laisser l'algorithme Meta se stabiliser.
2. **Les règles s'appliquent au niveau adset**, pas au niveau campagne CBO (sauf DAILY CAP).
3. **Attendre 72h de data** avant d'interpréter le ROAS — Meta a besoin de ce temps pour optimiser.
4. **iOS14 impact :** les conversions peuvent être sous-rapportées de 20-30%. Si ROAS affiché = 1.2, ROAS réel estimé = 1.4-1.6.

---

## CONFIGURATION RAPIDE (Copy-paste)

Pour créer via l'API Meta (si besoin d'automatisation) :
```
Endpoint : POST /v18.0/act_{AD_ACCOUNT_ID}/adrules
Headers : Authorization: Bearer {ACCESS_TOKEN}
```

Ou directement dans l'UI Ads Manager :
**Ads Manager → Campagne → ⋮ → Create Automated Rule**

---

*Créé pour lancement NLO_DE_SALES · Budget Marksman €65/j · 3 adsets × 12 ads · Audiences Broad DE 25-54*
