---
name: Protocoles de travail — format, autonomie, priorisation
description: Règles de collaboration avec Chef : format de réponse par type de tâche, matrice d'autonomie vs validation, priorisation P0-P3, protocole anti-freeze
type: feedback
---

## Priorisation des demandes

**P0 — Bloquant immédiat** (exécuter sans attendre)
- Bug/erreur/régression en cours
- Livrable promis non livré
- Chef attend un output

**P1 — Impact business direct** (traiter dans le tour)
- Tout ce qui touche au ROAS, créatifs, Meta Ads, OMNIA
- Demandes liées aux phases EVOLVE actives

**P2 — Valeur claire mais différable**
- Amélioration sans impact immédiat, documentation, recherche exploratoire

**P3 — Nice-to-have**
- Optimisations cosmétiques, features futures

**Tie-break :** ce qui impacte le plus vite le plus de revenus prime.

## Format de réponse par type de tâche

| Type | Format |
|------|--------|
| Analyse | SITUATION → DIAGNOSTIC → IMPLICATION → ACTION |
| Création | CONTEXTE → LIVRABLE → VARIANTES → USAGE |
| Décision | QUESTION RÉELLE → OPTIONS → RECOMMANDATION → IMPLICATIONS |
| Exécution | OBJECTIF → (exécution) → RÉSULTAT → NEXT |
| Rapport | RÉSUMÉ (3 lignes) → DÉTAIL → ACTIONS |

## Autonomie vs Validation

**J'agis sans demander :**
- Lire fichiers, explorer, analyser
- Corriger un bug évident
- Continuer une tâche déjà commencée dans la même direction
- Préparer briefs, drafts, analyses
- Recherche web pour informer une recommandation
- Itérer 1 fois sur un output insuffisant
- Créer/modifier du code dans un projet existant si la direction est validée

**Je demande validation :**
- Dépenses réelles (ad spend, API calls coûteuses)
- Actions irréversibles hors workspace (emails, posts publics)
- Changement de direction stratégique
- Supprimer des fichiers ou données importants
- Lancer une campagne Meta

**Why:** Chef veut de l'autonomie maximale. Trop de demandes de validation = perte de temps. Pas assez = risque de diverger.
**How to apply:** Par défaut, agir. Ne demander que quand c'est irréversible ou coûteux.

## Règle bibliothèque
- **Toute question stratégie/marketing** → d'abord consulter `knowledge_index.md` puis, si besoin, creuser dans les fichiers sources (livres, formations)
- Toujours ancrer les recommandations dans les frameworks (Desire-First, 5 Awareness Levels, 3-2-2, Hormozi, Pellegrini)
- Ne jamais donner de conseil marketing générique — toujours lié aux principes de la bibliothèque

## Protocole tâches longues (anti-freeze)

- Toute tâche > 15 min → découper en blocs de max 10 min
- Checkpoint toutes les 10 min avec sauvegarde état
- Fichier progress : `checkpoints/[nom-tache]-progress.md`
- Jamais plus de 2 sous-agents en parallèle sur du lourd
- Browser fallback : browser → web_fetch → web_search → "données manquantes"

## Contraintes permanentes pour les outputs marketing
- Langue output : **Allemand** (marché cible)
- Produit : Nellio UltraCalm
- Méthode test : 3-2-2 (3 créatifs × 2 body × 2 headlines)
- Canal : Meta Ads (Facebook/Instagram) + Google Ads
- Hook < 3 secondes de lecture
- Desire-first (channel un désir existant)
- CTA explicite obligatoire en fin de script
