# Organize Feedback Data — Part 3 (Customization & Scaling)

**Concept Central**  
Les surveys custom et les variations par client nécessitent une approche flexible mais structurée. Savoir adapter le template pour des questions non-standard permet de traiter n'importe quel feedback dataset rapidement.

---

## Points Clés

1. **Surveys custom vs. template standard** :
   - Template Nellio = 6 questions core + bonus entries (written)
   - Custom clients = variations de questions, ordres différents, réponses supplémentaires
   - Exemple : Warroad avait survey très customisée (age groups, product categories propriétaires)

2. **Stratégie d'adaptation** :
   - **Copier la structure "Options"** pour chaque nouvelle question au lieu de la réinventer
   - **Vérifier les réponses multiples** en retournant dans VialSweep survey settings
   - **Cloner les colonnes pivot** pour accélérer (ex. question multiples-choice new = copier Q1's pivot structure)
   - **Pas de raccourcis** : chaque question custom doit avoir ses réponses validées

3. **Gestion des réponses multiples-choice** :
   - Utiliser FILTER() pour compter automatiquement les options
   - Drag down pivot pour tous les choix
   - Spelling exact = condition sine qua non (Travel bag ≠ travel bags)

4. **Questions open-ended (Bonus)** :
   - "For 2 bonus entries..." = signale une question écrite
   - Ces questions seront exportées en PDF → ChatGPT custom GPT
   - Pas besoin de pivot column pour written answers

5. **Validation de structure** :
   - Q1, Q2, Q3... doivent aligner horizontalement et verticalement
   - Dropper colonnes dans le bon ordre si nécessaire
   - Tester que les filtres comptent bien les réponses avant d'envoyer à ChatGPT

6. **Cas extrême : surveys très différentes** :
   - Ne pas essayer de forcer dans le template
   - Créer une variation de template spécifique au client
   - Documenter les changements pour les sessions futures

---

## Insights

- Templates pré-configurés économisent 80% du temps, mais flexibilité = clé
- Spelling et capitalization comptent pour les pivots (Google Sheets ≠ case-insensitive par défaut)
- Un seul typo peut splitter une catégorie et fausser l'analyse (ex. "Stress" vs "stress")
- Complexité réelle : pas dans la structure, mais dans la validation des réponses

---

## Applications pour Nellio UltraCalm

| Scénario | Approach |
|---------|----------|
| **Question standard** | "Wie haben Sie von uns gehört?" → Use template pivot structure |
| **Question custom (Nellio)** | "Welche Besorgnis ist bei Ihnen dominant?" → Copier structure option, adapter réponses (Stress, Sleep, Focus, Energy) |
| **Bonus written** | "Beschreiben Sie Ihre Nellio-Reise..." → Export en PDF, upload ChatGPT |
| **Validation** | Vérifier spelling allemand, accents (ü, ä, ö), pas de mixed case |

---

## Citation

> "Just make sure that it obviously starts up at the top so this should actually probably be like g12 is what this should be because then it'll actually count from the top."

*Structure = critère technique ; indexation = outil de validation.*

---

**Statut** : ✅ Framework reproductible pour tous les futurs giveaways Nellio
