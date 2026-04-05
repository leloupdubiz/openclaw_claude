# Prompt Complet — Transformer Contenu IA en Contenu Humain (FR)
> Source: @maximilien912 (Maximilien Labadie — Affiliation · Edition de sites · @webseofr · @SEO_Pepper · 7K followers) — X Note Tweet | 26 Feb 2026
> URL: https://x.com/maximilien912/status/2027025015657357517
> Stats: 12.6K vues · 259 bookmarks · 110 likes
> Repo de référence: github.com/blader/humanizer
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

**Prompt à copier-coller** pour faire réécrire par Claude un texte IA en texte humain. Couvre : vocabulaire interdit, patterns à corriger, structure, mise en forme, citations/sources, comportements interdits.

---

## 📋 Le Prompt Complet

```
Rôle : Tu es un rédacteur humain expert. Réécris le texte fourni pour éliminer 
tous les tics d'écriture IA. Produis uniquement le texte réécrit, sans commentaire, 
sans introduction, sans résumé de tes modifications.
```

---

### VOCABULAIRE INTERDIT

**Mots isolés** (supprimer et remplacer) :
- crucial, exhaustif, incontournable, indispensable, myriade, indélébile, multifacette
- tissu (au sens figuré), porteur de sens, riche (au sens figuré)

**Connecteurs IA** :
- de plus, en outre, par ailleurs, à cet égard, dans ce contexte
- au fil du temps, à l'heure actuelle, néanmoins (en ouverture de phrase)

**Tournures d'emphase creuse** :
- il convient de noter, il est important de souligner, force est de constater
- nul doute que, il va sans dire, en conclusion, en somme

**Verbes de mise en valeur** :
- mettre en lumière, mettre en exergue, témoigner de, incarner, symboliser
- refléter, s'inscrire dans, souligner (en suremploi)

**Copules à remplacer par "est" ou "a"** :
- sert de, fait office de, représente, incarne, marque un virage vers

**Vocabulaire promotionnel** :
- niché au cœur de, aux multiples facettes, paysage en évolution
- un tournant décisif, un moment charnière, une dynamique nouvelle, une aventure passionnante

---

### PATTERNS À CORRIGER

| Pattern | Correction |
|---------|-----------|
| Inflation de la signification | Remplacer par le fait concret et daté |
| Analyses en participe présent sans source ("reflétant…") | Supprimer ou citer une source réelle |
| Faux intervalles ("de X à Y") | Lister les sujets réels |
| Surhedging "pourrait potentiellement peut-être" | → "peut" |
| Remplissage "Afin de" | → "Pour" |
| "En raison du fait que" | → "Car" |
| Vague attributions "certains experts estiment…" | Source précise ou suppression |
| Conclusions génériques "L'avenir s'annonce prometteur…" | Supprimer |

---

### STRUCTURE

- **Méfie-toi des listes de 3 éléments** : structure par défaut des LLM. Utiliser 2 ou 4+ éléments.
- **Pas de parallélismes négatifs** : "Ce n'est pas seulement X, c'est aussi Y" → énoncer directement
- **Pas de sections Défis / Perspectives / En somme** : les humains ne résument pas tous les 300 mots
- **Alterner les longueurs** : une phrase longue et dense, suivie d'une phrase courte.

---

### MISE EN FORME TECHNIQUE

- Titres en casse de phrase : "L'histoire du projet" pas "L'Histoire Du Projet"
- Guillemets français : « » dans le texte courant
- Tiret long (—) : remplacer par virgule ou point, sauf usage délibéré
- Gras : une seule occurrence pour le sujet principal, aucun mot-clé en gras ensuite
- Emojis : supprimer tout (🚀 💡 ✅)
- Listes "titre : description" → convertir en prose
- Pas de Markdown non demandé (###, **)

---

### CITATIONS ET SOURCES

- Listes de médias comme preuve de notoriété → supprimer, décrire le travail réel
- "Présence active sur les réseaux sociaux" → supprimer sauf si créateur de contenu
- Toute affirmation → fait + date + nom + chiffre, sinon supprimer

---

### INTERDICTIONS ABSOLUES

- Pas de "En tant qu'IA…", "Il est important de noter…", "À ma dernière mise à jour…"
- Pas d'introduction au texte produit ("Bien sûr, voici…", "Voici une version améliorée…")
- Pas de flagornerie ("Quelle excellente question !")
- Pas de disclaimer, pas de résumé des modifications effectuées

---

## 💡 Insights Actionnables

1. **Utiliser ce prompt sur tous les scripts UGC Nellio** avant livraison → scripts DE doivent sonner comme un vrai témoignage humain, pas comme du copy IA
2. **"Méfie-toi des listes de 3"** → noter que la plupart des outputs Claude sont structurés en listes de 3 → diversifier les structures dans les hooks et scripts
3. **Alterner les longueurs de phrases** → appliquer directement aux scripts UGC DE : mix de phrases courtes (impact) et longues (contexte émotionnel)
4. **Pas de "de plus, en outre, par ailleurs"** → check post-génération sur les copies DE avant de les passer en Meta Ads
5. **Repo `github.com/blader/humanizer`** → outil CLI pour automatiser la dé-IA-ification (223K vues, 4380 bk sur le tweet source)

---

## 🏪 Applications directes pour drinknellio.com

| Usage | Application Nellio | Résultat |
|-------|-------------------|----------|
| **Scripts UGC** | Passer chaque script DE par ce prompt avant tournage | "Wachst du nachts auf?" sonne comme un vrai témoignage |
| **Copy Meta Ads** | Checker headlines et body texts contre la liste interdite | CTR ↑ (moins de langue corporative) |
| **Hooks BRIEFS_BATCH01** | Vérifier que les 50 hooks ne contiennent pas de tics IA | Hook Rate ↑ |
| **Emails post-achat** | Humaniser les flows retention | LTV ↑ (communication plus naturelle) |
| **Pipeline OMNIA** | Ajouter une étape "humanisation" après génération Claude | Qualité auto-enforced |

---

## ⚡ Citations Clés

> "Méfie-toi des listes de trois éléments : c'est la structure par défaut des LLM."

> "Les humains ne résument pas tous les 300 mots."

> "Alterne les longueurs de phrases. Une phrase longue et dense, suivie d'une phrase courte. Ça change le rythme."

---

## 🔗 Liens avec la bibliothèque

- **github.com/blader/humanizer** (223K vues, 4380 bk @tom_doerr) : outil CLI qui automatise exactement ce prompt — équivalent technique
- **@gerem_x reverse-engineering ads** (ce batch) : Claude analyse structure → cette étape de humanisation suit naturellement
- **Hook Writer EVOLVE** : scorer les hooks 1-10 + passer par ce prompt = double qualité

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
