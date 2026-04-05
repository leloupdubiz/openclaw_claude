# SMS / WhatsApp Post-Achat DE — Séquence Rétention
> Créé : 2026-03-01 20h22 | Clawdbot Prime ⚡
> Contexte : Complément de EMAIL_RETENTION_SEQUENCE_DE.md — canal SMS/WhatsApp pour max LTV
> Principe : SMS = 98% open rate vs 25% email → canal prioritaire pour réactivation

---

## Stratégie

Email = nurturing long + contenu riche  
SMS/WhatsApp = déclencheurs comportementaux + urgence douce + réachat direct

**Ne pas dupliquer le contenu email** — SMS = complémentaire, pas redondant.

---

## Outils recommandés pour DE

| Outil | Usage | Prix |
|-------|-------|------|
| **Klaviyo SMS** | Intégré à email flows | ~$20/mois + $0.01/SMS |
| **SMSBump** | Spécialisé Shopify DE | ~$15/mois |
| **WhatsApp Business API** | Via Wati.io ou Respond.io | ~$50/mois |

**Recommandation :** Klaviyo SMS (même plateforme que email → segmentation identique).

---

## Séquence SMS — 5 messages sur 30 jours

### SMS #1 — J+1 (Lendemain livraison estimée)
**Trigger :** Livraison confirmée Shopify  
**Objectif :** Confirmer réception + 1er usage  

```
Nellio: Dein UltraCalm ist angekommen 📦
Tipp für heute Abend: 1 Messlöffel in 200ml kaltes Wasser — 30 Min vor dem Schlafen.
Wir sind gespannt auf deine ersten Nächte 🌙
Fragen? Antworte einfach auf diese SMS.
```

**Caractères :** 196 (< 160 = 2 SMS · optimiser si coût clé)

**Version courte (160 car.) :**
```
Nellio: UltraCalm angekommen ✅ Heute Abend: 1 Löffel in Wasser, 30 Min vor dem Schlafen. Wir sind gespannt auf deine ersten Nächte 🌙
```

---

### SMS #2 — J+4 (Check-in résultats)
**Trigger :** J+4 après commande  
**Objectif :** Engagement · répondre aux doutes (les premiers jours sont critiques)

```
Nellio: Hast du UltraCalm schon probiert?
Die meisten berichten ab Nacht 3-5 erste Veränderungen 💤
Wenn du Fragen hast — antworte einfach. Wir helfen gern.
Gute Nacht 🌙
```

---

### SMS #3 — J+10 (Social proof + Review request)
**Trigger :** J+10 après commande  
**Objectif :** Avis Trustpilot · réduction pour 2e commande en amorce

```
Nellio: Wie läuft es mit UltraCalm? 😴
20.000 Kunden haben schon eine Bewertung hinterlassen.
Was denkst du? → [LIEN TRUSTPILOT/GOOGLE]
Als Dankeschön: 10% auf deine nächste Bestellung mit Code DANKE10
```

---

### SMS #4 — J+20 (Réachat — stock warning)
**Trigger :** J+20 après commande (avant épuisement du stock ~30j)  
**Objectif :** Réachat avant rupture · urgence douce

```
Nellio: Dein UltraCalm geht bald aus 📦
Damit keine Pause entsteht: jetzt nachbestellen → [LIEN]
Code WEITER15 = -15% auf die nächste Dose.
Gültig 48h ⏳
```

---

### SMS #5 — J+30 (Réactivation ou upsell)
**Trigger :** J+30 · segmenté : acheteurs 1× vs réachats  
**Objectif :** Fidélisation · bundle

**Version A (n'a pas réacheté) :**
```
Nellio: Wie waren deine letzten 30 Nächte? 🌙
Falls du eine Pause hattest — kein Problem. UltraCalm wartet.
-20% auf deine nächste Bestellung: COMEBACK20 → [LIEN]
```

**Version B (a réacheté) :**
```
Nellio: Du schläfst besser — wir freuen uns 🌙
Tipp: Viele unserer Stammkunden kombinieren UltraCalm am Abend mit [Produkt complémentaire si applicable].
Danke, dass du dabei bist ❤️
```

---

## WhatsApp — Différenciation

WhatsApp = format plus riche que SMS (images, boutons, liens riches).  
Utiliser pour :
- **J+1 :** Message de bienvenue avec image produit + lien guide d'utilisation
- **J+7 :** Message "Résultats ?" avec image before/after ou testimonial

**Template WhatsApp J+1 (Wati.io / Respond.io) :**
```
Hallo [Prénom] 👋

Dein *Nellio UltraCalm* ist unterwegs — und wir möchten sicherstellen, dass du das Beste daraus machst.

🌙 *Dein Einschlaf-Ritual:*
→ 1 Messlöffel in 200ml Wasser
→ 30 Minuten vor dem Schlafen
→ Ab Nacht 3 merkst du's

Fragen? Antworte einfach hier.

Das Nellio-Team ⚡
```

---

## Légal DE — OBLIGATOIRE avant activation

| Obligation | Action |
|-----------|--------|
| Opt-in explicite | Case à cocher Shopify checkout "SMS-Marketing erlauben" — séparée de l'email |
| DSGVO / GDPR | Mention dans Datenschutzerklärung (SMS-Marketing, sous-traitant klaviyo.com) |
| Opt-out | Chaque SMS doit permettre désabonnement : "STOP antworten" |
| Frequenz | Max 2-3 SMS/mois pour ne pas spam-flaguer (opérateurs DE stricts) |

---

## KPIs Cibles

| Métrique | Benchmark DE | Objectif |
|---------|-------------|---------|
| Opt-in rate checkout | 20-35% | >25% |
| Open rate SMS | 90-98% | >95% |
| CTR SMS | 10-25% | >15% |
| Réachat via SMS (J30) | 8-15% | >10% |
| Opt-out rate | <5% | <3% |

---

## Setup Klaviyo SMS — Checklist rapide

- [ ] Activer Klaviyo SMS pour l'Allemagne (vérifier disponibilité pays)
- [ ] Ajouter numéro DE (Klaviyo fournit numéros locaux)
- [ ] Créer opt-in checkout Shopify (séparé email)
- [ ] Configurer flow SMS post-achat (J+1, J+4, J+10, J+20, J+30)
- [ ] Activer segmentation (acheteurs 1× vs repeat)
- [ ] Test SMS réception propre avant go-live

---

*Complète EMAIL_RETENTION_SEQUENCE_DE.md. Ensemble : email + SMS = stack rétention complet pour maximiser LTV 90j dès J+1.*
