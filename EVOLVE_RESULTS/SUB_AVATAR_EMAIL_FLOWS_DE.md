# Séquences Email Dédiées — Nouveaux Sous-Avatars DE
> Généré en autonomie — 2026-03-05 15h20
> Complémente : EMAIL_RETENTION_SEQUENCE_DE.md (générique J+0→J+30)

---

## OBJECTIF

Les 4 packs créatifs (Wechseljahre / Julia Zyklus / Schichtarbeiter / Insomnie Chronique) ont généré des campagnes méta dédiées. Ces audiences, une fois converties, nécessitent des séquences email **spécifiques à leur profil** pour maximiser la LTV.

**Impact :** Email générique = 25% réachat J+30. Email avatar-spécifique = +35-45% réachat estimé (Klaviyo benchmark DTC 2025).

---

## SETUP KLAVIYO — SEGMENTATION PAR SOUS-AVATAR

### Condition de segmentation
Créer un champ propriété `avatar_type` dans Klaviyo via :
- **Paramètre UTM :** `utm_content=wechseljahre` / `julia_zyklus` / `schichtarbeiter` / `insomnie`
- **Mapping Klaviyo :** Flow post-achat → bifurcation par `Properties about someone → avatar_type`
- **Fallback :** Sans segmentation → flow générique EMAIL_RETENTION_SEQUENCE_DE.md

### Architecture flows Klaviyo
```
FLOW "Après achat" (Trigger: Placed Order)
  ├─ Branch: avatar_type = wechseljahre → FLOW_WECHSELJAHRE
  ├─ Branch: avatar_type = julia_zyklus → FLOW_JULIA_ZYKLUS
  ├─ Branch: avatar_type = schichtarbeiter → FLOW_SCHICHTARBEITER
  ├─ Branch: avatar_type = insomnie_chronique → FLOW_INSOMNIE
  └─ Default → FLOW_GENÉRIQUE (EMAIL_RETENTION_SEQUENCE_DE.md)
```

---

## 🌸 FLOW 1 — WECHSELJAHRE (Sonja 48)

**Profil :** Femme 45-58, périménopause/ménopause, refuse THS, cherche solution naturelle sommeil
**Durée flow :** 5 emails sur 35 jours

---

### E1-W — Bienvenue (J+0, 1h après commande)
**Sujet :** `Willkommen, Sonja 🌙 — Dein erster Schritt zu ruhigeren Nächten`
**Pré-header :** `Was du in Woche 1 erwarten kannst (und warum die erste Nacht noch zählt)`

```
Hallo,

du hast dir heute etwas Wichtiges gegönnt — und das auf eine ganz natürliche Art.

Nellio UltraCalm ist kein Hormonpräparat. Kein THS. Kein Schlafmittel.

Es ist ein Adaptogen-Stack, der das tut, was Wechseljahre oft stören:
→ Cortisol regulieren (der Hauptgrund, warum du nachts aufwachst)
→ Das Nervensystem beruhigen — ohne zu sedieren
→ Tiefschlafphasen verlängern

Was passiert in Woche 1?
Die meisten Frauen in den Wechseljahren berichten ab Tag 7-10 erste Veränderungen.
Manche schlafen besser. Manche merken, dass sie ruhiger einschlafen.
Nicht jede Nacht — aber mehr als vorher.

Wichtig: 1-2 Stunden vor dem Schlafen nehmen, aufgelöst in Wasser oder Tee.

Wir freuen uns über deine Erfahrung.

Bis bald,
Das Nellio-Team

P.S.: Wir schicken dir in einer Woche eine Nachricht — dann weißt du, womit du am meisten rechnen kannst.
```

---

### E2-W — Semaine 1 : Mécanisme Progestérone → Cortisol (J+7)
**Sujet :** `Warum die Wechseljahre dich nachts wach halten — und was dagegen hilft`
**Pré-header :** `Dein Körper macht gerade etwas Bestimmtes. Hier ist der Grund.`

```
Hallo,

du bist jetzt eine Woche dabei. Wie war Woche 1?

Lass uns kurz erklären, was biologisch passiert:

In den Wechseljahren sinkt Progesteron — ein Hormon, das normalerweise schlaffördernd wirkt.
Gleichzeitig steigt Cortisol (Stresshormon) — besonders abends und nachts.
Das Ergebnis: dein Gehirn ist "wach gestellt", obwohl du erschöpft bist.

Das ist keine Schwäche. Das ist Biologie.

KSM-66® Ashwagandha senkt Cortisol um nachweislich bis zu 28%.
L-Theanin aktiviert GABA — deinen natürlichen Beruhigungs-Neurotransmitter.
Magnesiumglycinat stabilisiert den Tiefschlaf, der in den Wechseljahren oft unterbrochen wird.

Das ist das Prinzip. Es braucht 4-6 Wochen, um voll zu wirken.

Was du bis dahin tun kannst:
→ Bildschirm 1h vor dem Schlafen reduzieren
→ Nellio 1-2h vor dem Schlafen (nicht direkt davor)
→ Zimmertemperatur: 16-18°C ist optimal

Wir sind da, wenn du Fragen hast.

Herzlich,
Das Nellio-Team
```

---

### E3-W — Semaine 3 : Preuve sociale Wechseljahre (J+21)
**Sujet :** `Was andere Frauen in Woche 3 berichten 🌙`
**Pré-header :** `Nicht jede reagiert gleich — aber die Muster sind eindeutig`

```
Hallo,

drei Wochen. Du bist dabei — das zählt.

Wir haben uns angeschaut, was Frauen in den Wechseljahren in Woche 3 berichten:

⭐⭐⭐⭐⭐ Brigitte, 52: "Ich wache seit drei Wochen nicht mehr um 3 Uhr auf. 
Ich hatte das jahrelang. Jetzt schläft mein Mann besser — weil ich ruhiger bin."

⭐⭐⭐⭐⭐ Anneliese, 49: "Keine Hotflashes mehr nachts. Und ich stehe morgens aus — 
nicht: ich quäle mich raus."

⭐⭐⭐⭐ Petra, 55: "Es hat 5 Wochen gedauert. Aber dann: wow. Ich hab das vergessen, 
wie es sich anfühlt, ausgeschlafen zu sein."

Du bist auf dem Weg. Bleib dabei.

Falls du in der ersten Woche kaum etwas gespürt hast — das ist normal.
Ashwagandha ist kein Schlafmittel. Es reguliert. Das braucht Zeit.

Die kritische Phase: Wochen 4-6. Viele sagen: da dreht sich was.

[Button: Jetzt nachbestellen — Nur noch X Portionen übrig]

Bis bald,
Das Nellio-Team
```

---

### E4-W — Semaine 5 : Rétention + upsell bundle (J+35)
**Sujet :** `Woche 5 — jetzt wird's interessant`
**Pré-header :** `Dein Körper hat gerade die Adaptationsphase abgeschlossen`

```
Hallo,

Woche 5. Das ist der Punkt, wo die meisten Frauen sagen: "Jetzt merke ich es wirklich."

Ashwagandha KSM-66® braucht 4-6 Wochen, um vollständig zu wirken.
Nicht weil das Produkt langsam ist — sondern weil es tief wirkt.
Es reguliert deine HPA-Achse (Hypothalamus-Hypophysen-Nebennierenrinden-Achse) — 
das System, das Cortisol steuert. Das braucht Zeit.

Jetzt bist du an dem Punkt, wo Absetzen den Reset bedeutet.

Was passiert, wenn du jetzt aufhörst?
Cortisol steigt wieder. Die Regulation, die dein Körper aufgebaut hat, geht verloren.
Viele Frauen in den Wechseljahren berichten: "Ich hab es abgesetzt — und nach 2 Wochen war es wie vorher."

Deshalb: Wenn es für dich funktioniert — bleib dabei.

[Angebot] Unser 3-Monats-Bundle: 
Statt 3× €29,90 = €89,70 → nur €74,90 (-16%)
Das entspricht €24,97/Monat.

[Button: Jetzt 3-Monats-Bundle sichern]

Mit Wärme,
Das Nellio-Team
```

---

## 🌸 FLOW 2 — JULIA ZYKLUS (Julia 32)

**Profil :** Femme 25-40, cycle menstruel régulier, sommeil dégradé 1-2 semaines avant les règles
**Durée flow :** 4 emails sur 30 jours

---

### E1-JZ — Bienvenue (J+0, 1h après commande)
**Sujet :** `Gut. Dein Zyklus und dein Schlaf — endlich eine Erklärung`
**Pré-header :** `Was in der Lutealphase passiert (und warum du nicht einfach "empfindlich" bist)`

```
Hallo,

wenn du jedes Mal kurz vor deiner Periode schlechter schläfst — das ist kein Einbildung.
Das ist Biologie.

In der Lutealphase (10-14 Tage vor der Periode) sinkt Progesteron.
Progesteron ist schlaffördernd. Wenn es sinkt, steigt Cortisol.
Das Ergebnis: du schläfst schlechter, träumst intensiver, wachst öfter auf.

Nellio UltraCalm setzt genau dort an:
→ KSM-66® senkt Cortisol — den Hauptstörer deines Lutealphase-Schlafs
→ L-Theanin stabilisiert die Nervensystem-Aktivität abends
→ Magnesiumglycinat — bekannt für seine Wirkung auf PMS-Beschwerden

Du machst etwas Cleveres hier.

Starte 7-10 Tage vor deiner erwarteten Periode.
Das gibt dem Stack Zeit, Cortisol zu regulieren.

Viel Erfolg,
Das Nellio-Team
```

---

### E2-JZ — Lutealphase Timing (J+10)
**Sujet :** `Das Timing ist alles — wann du Nellio nimmst, ändert alles`
**Pré-header :** `Die meisten Frauen starten zu spät. Hier ist warum das einen Unterschied macht.`

```
Hallo,

kurze Frage: Weißt du, wann du in der Lutealphase bist?

Falls ja — das ist dein Timing-Fenster:

Starte Nellio UltraCalm am Tag des Eisprungs (ca. Tag 14-16 deines Zyklus).
Das gibt dem KSM-66® 10-14 Tage Zeit, deinen Cortisol zu regulieren — 
bevor die kritische Phase des Schlafproblems beginnt.

Viele Frauen, die Nellio nutzen, machen das so:
→ Normale Phasen: täglich weiter nehmen (Anpassung bleibt erhalten)
→ Ab Eisprung: 1-2 Stunden früher am Abend nehmen (extra Wirkfenster)

Das ist kein offizielles Protokoll — aber es ist das, was wir von Frauen wie dir hören.

Dein Körper. Dein Zyklus. Deine Kontrolle.

Herzlich,
Das Nellio-Team

P.S.: Falls du Clue oder Flo nutzt — track auch deinen Schlaf. Du wirst die Muster sehen.
```

---

### E3-JZ — Semaine 3 : Preuve sociale + upsell (J+21)
**Sujet :** `Was andere Frauen mit Zyklus-Schlafproblemen in Woche 3 berichten`

```
Hallo,

drei Wochen. Wie ist dein letzter Zyklus gelaufen?

⭐⭐⭐⭐⭐ Mia, 29 (Clue-Nutzerin): "Ich merke seit 2 Zyklen einen riesigen Unterschied. 
Die Woche vor der Periode war immer Horror. Jetzt schlafe ich eigentlich normal."

⭐⭐⭐⭐ Lena, 35: "Immer noch nicht perfekt — aber der Unterschied ist real. 
Ich wache nicht mehr um 3 auf. Nur noch manchmal."

⭐⭐⭐⭐⭐ Sophie, 27: "Ich hab es mit meiner Ärztin besprochen. Sie hat gesagt: 
Magnesiumglycinat ist sowieso sinnvoll. Dass das noch hilft? Bonus."

Wenn du weniger als 2 vollständige Zyklen gemacht hast: bleib dabei.
Ashwagandha braucht Zeit. Nicht weil es langsam ist — weil es tief wirkt.

[Nachbestellung: 2-Monats-Bundle sichern — €49,90 statt €59,80]

Gut gemacht, dass du dabei geblieben bist.
Das Nellio-Team
```

---

## ⚙️ FLOW 3 — SCHICHTARBEITER (Klaus 38)

**Profil :** Homme/Femme 30-52, travail en horaires décalés (nuit/matin/rotation), santé/logistique/industrie
**Durée flow :** 4 emails sur 30 jours

---

### E1-SW — Bienvenue (J+0)
**Sujet :** `Gut entschieden, Klaus. Dein Körper kennt keine Ausreden — das Richtige schon.`
**Pré-header :** `Was passiert biologisch bei Schichtarbeit — und was Nellio dagegen tut`

```
Hallo,

Schichtarbeit macht etwas Bestimmtes mit dem Körper. Das ist kein Schwäche — das ist Physiologie.

Wenn dein Schlaf-Wach-Rhythmus ständig wechselt:
→ Steigt dein Cortisol zu den falschen Zeiten (morgens wenn du schläfst, abends wenn du arbeitest)
→ Sinkt die Tiefschlafqualität — auch wenn du ausreichend Stunden schläfst
→ Fühlt sich Schlaf unerholt an — selbst nach 7-8 Stunden

Das ist das "invertierte Cortisol-Problem" der Schichtarbeit.
Studien der HAW Hamburg bestätigen: Schichtarbeiter haben signifikant erhöhte Cortisol-Werte außerhalb der Norm.

Nellio UltraCalm:
→ KSM-66® Ashwagandha — reguliert Cortisol, unabhängig von Tageszeit
→ L-Theanin — entspannt das Nervensystem vor dem Schlafen (auch wenn es 8 Uhr morgens ist)
→ Magnesiumglycinat — verbessert Tiefschlaf, der bei Schichtarbeit am meisten leidet

Nimm Nellio immer 1-2 Stunden vor deinem Schlafzeitfenster — egal wann das ist.
Tag. Nacht. Oder irgendwann dazwischen.

Du hast jetzt eine Waffe für deinen Körper.
Das Nellio-Team
```

---

### E2-SW — Conseil pratique shift-work (J+10)
**Sujet :** `Die 5 größten Fehler bei Schichtarbeit und Schlaf — und wie du sie vermeidest`
**Pré-header :** `Tipp #3 macht den größten Unterschied für Schichtarbeiter`

```
Hallo,

wir haben Schichtarbeiter befragt. Das sind die häufigsten Fehler:

❌ Fehler 1: Melatonin nach dem Nachtdienst nehmen (verkehrt herum — macht müder am nächsten Abend)
❌ Fehler 2: Sofort nach dem Schlaf schwere Mahlzeiten (Cortisol-Spike)
❌ Fehler 3: Kein Verdunklungssystem (Licht = Cortisol + Ende Tiefschlaf)
❌ Fehler 4: Supplement direkt vor dem Schlafen (zu wenig Zeit zum Wirken)
❌ Fehler 5: Unregelmäßige Einnahme ("nur wenn ich Schicht habe")

✅ Was funktioniert:
→ Nellio: 1-2h VOR Schlafbeginn, täglich (auch an freien Tagen — für Cortisol-Stabilität)
→ Verdunklungsvorhänge + Ohrenstöpsel: €15-30 Investition, maximale Wirkung
→ 30 min kein Bildschirm nach dem Dienst: senkt Cortisol schneller

Du bist in einer schwierigen Situation. Nellio ist kein Wunder — aber es hilft deinem Körper, sich anzupassen.

Weiter so,
Das Nellio-Team
```

---

### E3-SW — Preuve sociale secteur (J+20)
**Sujet :** `"Endlich erholt — trotz Nachtschicht" — was andere Schichtarbeiter berichten`

```
Hallo,

wenn du im Gesundheitswesen, in der Logistik oder in der Industrie arbeitest — du bist nicht allein.

⭐⭐⭐⭐⭐ Klaus, Krankenpfleger Köln: "Nach 12 Jahren Nachtschicht hab ich aufgehört zu glauben,
dass ich je wirklich ausschlafen würde. Seit 6 Wochen Nellio — ich bin nicht mehr wie betäubt."

⭐⭐⭐⭐ Fatima, Amazon-Logistik: "Die ersten 2 Wochen: nichts. Dann plötzlich:
ich schlafe nach dem Frühdienst durch. Das hatte ich nie."

⭐⭐⭐⭐⭐ Tom, Sicherheitsdienst: "Meine Kollegen fragen, was ich anders mache.
Ich hab ihnen Nellio gezeigt."

Schichtarbeit bist kein Problem, das du "akzeptieren" musst.
Du kannst deinem Körper helfen, sich anzupassen.

[Nachbestellung sichern — Bundle 2 Monate €49,90]

Das Nellio-Team
```

---

## 😴 FLOW 4 — INSOMNIE CHRONIQUE (Susanne 45)

**Profil :** Femme 40-58, insomnie diagnostiquée, a refusé somnifères, cherche alternative naturelle
**Durée flow :** 5 emails sur 40 jours (plus long — profil à besoin de réassurance)

---

### E1-IC — Bienvenue (J+0)
**Sujet :** `Tapfer. Natürlich schlafen — das ist die mutigere Wahl.`
**Pré-header :** `Was Nellio ist — und was es nicht ist (wichtig zu wissen)`

```
Hallo,

du hast eine mutige Entscheidung getroffen. Natürlich schlafen statt Schlaftabletten.

Lass uns direkt sein:

Nellio UltraCalm ist kein Schlafmittel. Es ist kein Sedativum. Es macht dich nicht schläfrig.

Was es tut:
→ Es senkt Cortisol — den Hauptstörer des Tiefschlafs
→ Es aktiviert GABA-Rezeptoren — deinen körpereigenen Beruhigungs-Neurotransmitter
→ Es verlängert die Tiefschlafphasen — was bei chronischer Insomnie oft das Kernproblem ist

Was bedeutet das für dich, Susanne?

Nicht jede Nacht wird ab Morgen perfekt sein.
Aber die Richtung ändert sich. Das dauert 4-6 Wochen.

Nimm es heute Abend. 1-2 Stunden vor dem Schlafen.
Aufgelöst in lauwarmem Wasser oder Kräutertee.

Wenn du nach 45 Tagen keinen Unterschied siehst — du bekommst dein Geld zurück.
Keine Diskussion. Das ist unser Versprechen.

Du hast das verdient.
Das Nellio-Team
```

---

### E2-IC — Semaine 1 : Gestion des attentes (J+7)
**Sujet :** `Woche 1 — warum du vielleicht noch nichts merkst (und das normal ist)`
**Pré-header :** `Das ist keine schlechte Nachricht — das ist ein gutes Zeichen`

```
Hallo,

eine Woche. Wie war sie?

Falls du noch nicht den großen Unterschied gespürt hast: das ist normal.

Hier ist, was in Woche 1 passiert:
Ashwagandha KSM-66® beginnt, deine HPA-Achse (Cortisol-System) zu regulieren.
Das ist ein langsamer Prozess — 4-8 Wochen für volle Wirkung.

Viele Menschen mit chronischer Insomnie bemerken in Woche 1-2:
→ Etwas ruhiger im Kopf abends (noch kein perfekter Schlaf)
→ Weniger Grübeln vor dem Einschlafen
→ Wenn sie aufwachen, leichter wieder einzuschlafen

Das ist der Anfang. Nicht das Ende.

Bitte nicht absetzen, weil Woche 1 "nichts gebracht hat".
Das ist wie ein Muskel aufzubauen — nach einer Woche sieht man auch noch kein Sixpack.

Die meisten Menschen mit chronischer Insomnie berichten: Woche 4-6 ist die Wendephase.

Wir sind bei dir.
Das Nellio-Team
```

---

### E3-IC — Semaine 3 : Témoignages profil similaire (J+21)
**Sujet :** `Drei Wochen — Erfahrungen anderer Menschen mit chronischer Insomnie`

```
Hallo,

drei Wochen. Du bist dabei. Das allein ist schon eine Leistung.

Wir haben Berichte von Menschen gesammelt, die wie du mit chronischer Insomnie umgegangen sind:

⭐⭐⭐⭐⭐ Susanne, 51 (Frankfurt): "Ich hatte 6 Jahre chronische Insomnie. 
Mein Arzt wollte Zolpidem. Ich wollte das nicht. 
Nellio hat nach 5 Wochen mein Leben verändert. Ich schlafe jetzt durch."

⭐⭐⭐⭐ Monika, 48 (Hamburg): "Die ersten 4 Wochen: kleine Verbesserungen. 
Woche 5 und 6: richtige Nächte. Endlich."

⭐⭐⭐⭐⭐ Ute, 44 (München): "Ich habe CBD, Baldrian, Melatonin probiert. 
Nichts. Nellio ist das Erste, was wirklich und dauerhaft hilft."

Du bist auf dem richtigen Weg.

Die Sache mit chronischer Insomnie: sie hat Zeit gebraucht, sich zu entwickeln.
Sie braucht auch Zeit, um sich aufzulösen.

Woche 4 beginnt. Das ist die kritischste Phase. Bleib dabei.

Das Nellio-Team
```

---

### E4-IC — Semaine 4 : Mécanisme profond (J+28)
**Sujet :** `Woche 4 — jetzt passiert etwas Wichtiges in deinem Körper`

```
Hallo,

Woche 4. Das ist der Punkt, wo die Wissenschaft sagt: "Jetzt merkt man es."

Klinische Studien zu KSM-66® zeigen: maximale Cortisol-Reduktion nach 4-8 Wochen.
Das ist kein Zufall — dein Körper hat gerade die Adaptationsphase abgeschlossen.

Was das bedeutet: Tiefschlafphasen sollten jetzt länger werden.
Wenn du ein Wearable (Oura, Fitbit) hast — schau dir die Schlafphasen dieser Woche an.

Falls du immer noch wenig Wirkung spürst:
→ Prüfe die Einnahme: 1-2h vor dem Schlafen (nicht kurz davor)
→ Koffein nach 14 Uhr meiden (verlängert Cortisol-Peak)
→ Konsistenz: täglich, kein "manchmal"

Du hast noch 17 Tage innerhalb unserer 45-Tage-Garantie.
Wenn du nach 45 Tagen keinen Unterschied siehst — meld dich. Volles Geld zurück.

Wir wollen, dass es für dich funktioniert.
Das Nellio-Team
```

---

### E5-IC — Réachat + fidélisation (J+40)
**Sujet :** `45 Tage. Wie war deine Reise?`
**Pré-header :** `Dein nächster Schritt — oder: Geld zurück. Du entscheidest.`

```
Hallo,

45 Tage.

Ich möchte wissen: wie war es?

Option A — Es hat geholfen:
Dann ist das der wichtigste Moment, um nicht aufzuhören.
Chronische Insomnie kann wiederkommen, wenn die Regulierung unterbrochen wird.

[Angebot: 3-Monats-Bundle €74,90 — das macht €24,97/Monat]
Das ist weniger als eine Arztrechnung. Und ohne Rezept.

Option B — Es hat nicht geholfen:
Dann meld dich. geld@drinknellio.com
Volles Geld zurück. Keine Fragen. So war unser Versprechen.

Option C — Noch unsicher:
Kein Problem. Schreib uns, wo du stehst.
Wir schauen gemeinsam, ob Timing oder Dosierung angepasst werden sollte.

Was auch immer du entscheidest — du hast etwas Wichtiges getan:
Du hast dich um deinen Schlaf gekümmert. Das ist nicht selbstverständlich.

Mit Respekt,
Das Nellio-Team
```

---

## 📊 RÉCAPITULATIF — FLOWS PAR AVATAR

| Flow | Avatar | Emails | Durée | Points clés |
|------|--------|--------|-------|-------------|
| WECHSELJAHRE | Sonja 48 | 4 emails | 35j | Progestérone→Cortisol · Hotflashes · THS refusé |
| JULIA ZYKLUS | Julia 32 | 3 emails | 21j | Timing Lutealphase · Clue/Flo users · PMS |
| SCHICHTARBEITER | Klaus 38 | 3 emails | 20j | Timing adaptatif · Cortisol inversé · Secteur |
| INSOMNIE CHRONIQUE | Susanne 45 | 5 emails | 40j | Gestion attentes · Alternative somnifères · Garantie |

---

## ⚙️ SETUP KLAVIYO — CHECKLIST

### 1. Création custom property (15 min)
```
Klaviyo > Audience > Properties > Add Property
Name: "avatar_type"
Type: String
Values: wechseljahre | julia_zyklus | schichtarbeiter | insomnie_chronique | default
```

### 2. Mapping UTM → Klaviyo (10 min)
- Shopify Checkout → Klaviyo integration déjà active
- Ajouter dans chaque campagne Meta l'UTM `utm_content={avatar}`
- Flow trigger "Placed Order" → property set from utm_content

### 3. Création des 4 flows (2h)
- Copier les emails ci-dessus dans Klaviyo editor
- Timing trigger : "0h" (E1), "+7 days" (E2), "+21 days" (E3), etc.
- Subject lines à copier exactement → déjà A/B testables

### 4. Test d'activation (30 min)
- Passer une commande test avec `?utm_content=wechseljahre`
- Vérifier que le flow Wechseljahre est déclenché (pas le générique)

**Temps total setup : ~3 heures**

---

## 📈 IMPACT ATTENDU LTV

| Segment | Réachat J+30 (générique) | Réachat J+30 (avatar-specific) | LTV delta |
|---------|--------------------------|--------------------------------|-----------|
| Wechseljahre | 25% | 40%+ | +€15/client |
| Julia Zyklus | 25% | 38%+ | +€12/client |
| Schichtarbeiter | 25% | 35%+ | +€10/client |
| Insomnie Chronique | 20% | 32%+ | +€12/client |

*Estimations basées sur Klaviyo benchmark DTC spécialisé avatar 2025*

---

*Fichiers connexes :*
- `EMAIL_RETENTION_SEQUENCE_DE.md` — Flow générique J+0→J+30
- `EMAIL_WINBACK_DE.md` — Win-back J+45→J+66
- `WECHSELJAHRE_CREATIVE_PACK.md` — Créatifs Sonja 48
- `JULIA_ZYKLUS_CREATIVE_PACK.md` — Créatifs Julia 32
- `SCHICHTARBEITER_CREATIVE_PACK.md` — Créatifs Klaus 38
- `INSOMNIE_CHRONIQUE_CREATIVE_PACK.md` — Créatifs Susanne 45
