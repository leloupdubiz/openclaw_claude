# EMAIL WIN-BACK SEQUENCE DE — Réactivation Clients Silencieux
> Créé : 2026-03-03 23h35 | Source : Verbatims V1→V185 + Objections Bank DE
> Déclencheur : J+45 sans nouvelle commande (fin de la séquence post-achat E1→E5)
> Setup : Klaviyo flow — segment "no_purchase_45d"

---

## STRATÉGIE WIN-BACK

**Pourquoi :** ~30-40% des acheteurs uniques ne rachètent pas — souvent par friction ou oubli, pas par insatisfaction.
**Enjeu :** Réactiver 10% de ces clients = +LTV significatif sans coût acquisition.
**Ton :** Honnête, sans pression, sous-entend qu'on a remarqué leur absence.

**Séquence :** 3 emails sur 21 jours (J+45 / J+52 / J+66 depuis 1ère commande)

**Segment Klaviyo :** `placed_order >= 1` AND `days_since_last_purchase >= 45` AND `NOT active_subscriber`

---

## W1 — J+45 : "Alles in Ordnung?"

**Objet :** Wir haben dich vermisst, [Vorname] 🌙
**Pré-header :** Wie war dein Schlaf in den letzten Wochen?

---

**[CORPS]**

Hallo [Vorname],

Es ist jetzt ein paar Wochen her, seit du Nellio UltraCalm ausprobiert hast.

Wir fragen uns einfach: Wie läuft es?

Manche unserer Kunden sagen uns, dass sie nach 3-4 Wochen so gut schlafen, dass sie vergessen haben, nachzubestellen. 😄

Falls das der Fall ist — das ist eigentlich das beste Zeichen.

Andere sagen, sie haben die Wirkung nicht so gespürt, wie sie erwartet haben. Das passiert manchmal, wenn man noch nicht den richtigen Zeitpunkt oder die richtige Routine gefunden hat.

**Ein Tipp:** L-Theanin wirkt am stärksten wenn man UltraCalm 45-60 Minuten *vor* dem Schlafengehen nimmt — nicht direkt davor. Und die ersten 7 Tage sind oft noch nicht der Moment der größten Wirkung.

Falls du nochmal starten willst — oder einfach weitermachen:

👉 [CTA-BUTTON : Jetzt nachbestellen — mit 10% Treuerabatt]
Code: **TREUE10** (gültig 7 Tage)

Bei Fragen — antworte einfach auf diese E-Mail.

Gute Nacht,
Das Nellio Team

---

**KPIs cibles :** Open rate >30% · Click >8% · Achat >3%
**Setup Klaviyo :** Trigger = "Customer placed order" + condition "days since last order = 45"

---

## W2 — J+52 : "Dein Ergebnis nach 6 Wochen wäre..."

**Objet :** Was wäre passiert, wenn du weitergemacht hättest? 📊
**Pré-header :** Das sagen unsere Kunden nach 6 Wochen UltraCalm

---

**[CORPS]**

Hallo [Vorname],

Wenn du mit Nellio UltraCalm weitergemacht hättest, würdest du jetzt ungefähr in Woche 6 sein.

Was unsere Kunden in Woche 6 berichten:

✅ "Ich schlafe jetzt durch, ohne nachts aufzuwachen" — Markus, 38, Hamburg
✅ "Der Unterschied ist: ich bin morgens richtig ausgeruht, nicht nur weniger müde" — Sonja, 34, München
✅ "Ich habe aufgehört, meinen Wecker 3x zu snoozen" — Julia, 31, Berlin

Woche 6 ist auch der Moment, wo KSM-66® Ashwagandha seinen vollen Effekt auf das Cortisol entfaltet. Die ersten 2-3 Wochen sind der Aufbau.

Wenn du noch eine Packung hast — jetzt ist der richtige Zeitpunkt, wieder zu starten.

Wenn nicht:

👉 [CTA-BUTTON : 2-Monats-Pack — meistgekauft, bester Preis]

Oder starte nochmal mit dem 1-Monats-Pack:
👉 [CTA-BUTTON : 1 Monat nachbestellen + Code ZURÜCK10 (-10%)]

Das Angebot gilt bis [DATE+7].

Mit freundlichen Grüßen,
Das Nellio Team

P.S. Unsere 45-Tage-Garantie gilt auch für Nachbestellungen. Kein Risiko.

---

**KPIs cibles :** Open rate >25% · Click >6% · Achat >2%

---

## W3 — J+66 : "Letzte Chance — wir lassen dich los"

**Objet :** Keine weiteren E-Mails von uns (falls du das willst)
**Pré-header :** Aber zuerst — ein letztes Angebot für dich

---

**[CORPS]**

Hallo [Vorname],

Das ist unsere letzte Nachricht in dieser Serie.

Wir wollen dich nicht nerven — wenn du kein Interesse mehr hast, ist das völlig in Ordnung.

Bevor wir uns verabschieden, eine letzte Frage:

**Hat UltraCalm bei dir nicht gewirkt?**

Falls nicht — wir würden das gern wissen. Antworte einfach auf diese E-Mail mit einem kurzen "hat nicht gewirkt" — und wir schauen gemeinsam, was das Problem sein könnte. (Manchmal ist es nur eine Frage der Dosierung oder des Timings.)

Falls du einfach vergessen hast weiterzumachen:

👉 [CTA-BUTTON : Jetzt 15% sparen — Code LETZTER15]

(Unser stärkstes Angebot — gilt nur noch 48 Stunden.)

Nach dieser E-Mail hörst du von uns nur noch bei neuen Produkten oder wirklich wichtigen Updates.

Danke, dass du UltraCalm ausprobiert hast.

Das Nellio Team

---

**KPIs cibles :** Open rate >20% · Réponse directe >2% (feedback) · Achat >1.5%
**Action post-W3 :** Move segment vers "unengaged_win_back_failed" — réduire fréquence

---

## SETUP KLAVIYO — WIN-BACK FLOW

### Structure du Flow

```
TRIGGER : Customer placed order (first time)
  └─ Wait 45 days
    └─ Filter : days_since_last_purchase >= 45
      └─ W1 — Email "Alles in Ordnung?"
        └─ Wait 7 days
          └─ Filter : NOT opened_email AND NOT clicked_email
            └─ W2 — Email "Woche 6 Ergebnisse"
              └─ Wait 14 days
                └─ Filter : NOT placed_order_in_45_days
                  └─ W3 — Email "Letzte Chance"
                    └─ Add to segment: "win_back_series_complete"
```

### Segments à créer

| Segment | Condition |
|---------|-----------|
| `winback_eligible` | 1+ commande AND 45+ jours depuis dernière commande |
| `winback_converted` | A racheté pendant la série win-back |
| `winback_failed` | A terminé la série sans rachat |

### Codes promo à configurer
- `TREUE10` : -10% · valide 7j · segment winback_w1
- `ZURÜCK10` : -10% · valide 7j · segment winback_w2
- `LETZTER15` : -15% · valide 48h · segment winback_w3

### Règle d'or DSGVO
- Opt-out obligatoire sur chaque email (lien Abmelden en bas)
- Respecter unsubscribe immédiatement (max 10 jours légalement, viser < 24h)
- Ne pas relancer quelqu'un qui a déjà cliqué "Abmelden"

---

## CONNEXION STACK RÉTENTION COMPLET

| Moment | Outil | Fichier source |
|--------|-------|----------------|
| J+0 → J+30 | Email post-achat E1→E5 | `EMAIL_RETENTION_SEQUENCE_DE.md` |
| J+1, J+4, J+10, J+20, J+30 | SMS post-achat | `SMS_WHATSAPP_SEQUENCE_DE.md` |
| J+45 → J+66 | **Win-back 3 emails** | **Ce fichier** |
| Setup technique | Klaviyo guide | `KLAVIYO_SETUP_GUIDE_DE.md` |

**Stack rétention = COMPLET** ✅ → J+0 à J+66 couvert

---

## KPIs CIBLES WIN-BACK

| Métrique | Cible | Benchmark e-comm |
|----------|-------|------------------|
| Open rate W1 | >30% | 18-25% |
| Open rate W3 | >20% | 12-18% |
| Taux de réachat série | >5% | 2-4% |
| LTV impact | +€15-25 par client réactivé | — |
| Réponse feedback W3 | >1.5% | <1% |

**Projection :** Si 100 clients silencieux → 5 réactivés → +€125-250 CA sans coût acquisition
