# Thomas Andropause — PDP FAQ + Shopify Update Guide
> Généré : 2026-03-08 07h00 (cron tasks-generator)
> Durée d'implémentation : ~20 min dans Shopify
> Dernier sous-avatar non encore représenté sur drinknellio.com PDP

---

## Contexte

Sous-avatar Thomas Andropause (#15) est désormais couvert par :
- ✅ Scripts Batch #24 (S24-B "Seit ich 45 bin")
- ✅ Scripts Batch #25 (S25-A "Sie funktionieren" + S25-C Testosteron)
- ✅ Scripts Batch #26 (S26-A "Männer verlieren schneller" + S26-B "8h trotzdem")
- ✅ Thomas Andropause Email Flow DE (5 emails J+0→J+60)

**Manquant :** FAQ PDP sur drinknellio.com adaptée au profil Thomas.
Sans cette FAQ, le trafic provenant des campagnes Thomas convertit moins bien (objections non adressées sur la PDP).

**Priorité :** P0 avant lancement campagne Thomas (après Pixel Meta validé)

---

## FAQ PDP — 2 questions à ajouter dans Shopify

### Question 1
**Q : "Kann Nellio UltraCalm mir bei Erschöpfung und Konzentrationsproblemen helfen?"**

**A (copier-coller) :**
> Ja — und das hat einen biologischen Grund. Wenn Tiefschlaf nachlässt (was ab 40 häufiger passiert), sinkt die Ausschüttung von Wachstumshormonen und die Testosteron-Regulation leidet. Nellio UltraCalm mit KSM-66® Ashwagandha senkt Cortisol nachweislich und verbessert die Tiefschlafqualität — was sich direkt auf Energie und Konzentration auswirkt. Die ersten Ergebnisse sind typischerweise nach 4–6 Wochen spürbar.

---

### Question 2
**Q : "Ich schlafe bereits 7-8 Stunden — warum bin ich trotzdem müde?"**

**A (copier-coller) :**
> Das liegt oft nicht an der Schlafdauer, sondern an der Tiefschlafqualität. Bei erhöhtem Cortisolspiegel — durch Stress oder altersbedingte hormonelle Veränderungen — bleibt der Schlaf oberflächlich, selbst bei 8 Stunden. Nellio UltraCalm adressiert genau diesen Mechanismus: Cortisol regulieren, damit dein Körper echten Tiefschlaf erreichen kann. Das ist der Unterschied zwischen Schlafdauer und echter Erholung.

---

## Bloc "Für Männer ab 40" — Section PDP optionnelle

*(Ajouter sous la section ingrédients si la PDP a une section sous-avatars)*

**Titel :** Besonders effektiv ab 40

**Texte (copier-coller) :**
> Ab dem 40. Lebensjahr verändert sich bei vielen Männern der Schlaf — weniger Tiefschlaf, mehr Cortisol, weniger Erholung. Das MDR und mehrere aktuelle Studien bestätigen: Schlaf und Hormonhaushalt sind direkt verbunden.
>
> Nellio UltraCalm mit KSM-66® Ashwagandha ist speziell für Menschen konzipiert, deren Schlaf nicht mehr so ist wie früher — ohne Hormone, ohne Abhängigkeit.

---

## Checklist implémentation (20 min)

### Shopify PDP (15 min)
- [ ] Aller dans **Products → Nellio UltraCalm → Description/Page**
- [ ] Trouver la section FAQ (ou la créer si absente)
- [ ] Ajouter Question 1 + Réponse 1 (copier-coller ci-dessus)
- [ ] Ajouter Question 2 + Réponse 2 (copier-coller ci-dessus)
- [ ] (Optionnel) Ajouter bloc "Für Männer ab 40" sous section ingrédients
- [ ] Save + Preview mobile

### Meta Ads (5 min — après tournage)
- [ ] Dans la campagne NLO_DE_THOMAS_ANDROPAUSE, utiliser **URL parameter** : `?utm_content=thomas-andropause`
- [ ] Configurer Pixel event : Purchase → Tag la page de confirmation
- [ ] Vérifier que les FAQ s'affichent correctement sur mobile (test Chrome devtools)

---

## Impact attendu

| Métrique | Avant FAQ Thomas | Après FAQ Thomas | Delta |
|----------|-----------------|-----------------|-------|
| CVR Thomas traffic | ~1.2% (générique) | ~1.8-2.2% | +50-80% |
| Questions SAV "pourquoi fatigué si je dors 8h" | Fréquent | Réduit | -40% |
| LTV Thomas (Email flow J+0→J+60) | Base | +€12-18 | +Delta |

---

## Notes légales

- Utiliser "kann helfen bei" (pas "heilt" ou "therapiert")
- Sources disponibles : MDR ARD · gesundheitsinstitut-sundao.de · trted.de · t-online.de
- Consulter Impressum DE pour disclaimer santé si nécessaire
- Ne pas mentionner Andropause directement dans la FAQ PDP (terme médical prescriptif) → rester sur "Männer ab 40" + symptômes
