# Organize Feedback Data — Part 1 (Structure & Alignement)

**Concept Central**  
Organiser les données de feedback dans un sheet correctement structuré est la clé pour que ChatGPT puisse synthétiser les insights efficacement. L'alignement des colonnes et des questions détermine la qualité des résumés IA.

---

## Points Clés

1. **Suppression des entrées contaminantes** :
   - Identifier et supprimer emails du client connus
   - Raison : éviter que réponses partenaires/internes biaisent les insights client

2. **Text wrapping** :
   - Activer pour toutes colonnes contenant les questions
   - But : visualiser les questions posées sans scroll horizontal

3. **Alignement vertical des questions** :
   - Vérifier l'ordre des questions dans le sheet = ordre de la survey VialSweep
   - Exemple : Q1 "How did you hear?", Q2 "Which category?", Q3 "Age group?" (si custom)
   - Si ordre différent → réorganiser colonnes par drag-and-drop

4. **Alignement horizontal des réponses** :
   - Pour chaque multiple-choice question, vérifier toutes les options possibles
   - Si une réponse manque (ex. Pinterest), ajouter manuellement et vérifier le spelling exact
   - Utiliser VialSweep survey settings pour retrouver les réponses originales si doute

5. **Structure template standard** :
   - Email | First Name | Last Name | Options (pivot column pour chaque question)
   - Questions open-ended marquées avec "For 2 bonus entries..."
   - Les réponses libres = ce qui sera envoyé à ChatGPT pour synthèse

6. **Cas custom** :
   - Certains clients ont surveys variées → adapter manuellement
   - Exemple : Warroad aveva questions très différentes (age group, product category custom)
   - Solution : copier-coller la structure "Options" pour chaque nouvelle question

---

## Insights

- 80% des erreurs de synthèse IA viennent d'un sheet mal aligné
- Doublon/spelling = ChatGPT va les compter séparément (ex. "Travel bags" vs "travel bag" = 2 catégories)
- Les questions custom nécessitent vérification manuelle — pas de raccourci
- Filtres Google Sheet peuvent valider l'alignement (dropdown count = nb réponses)

---

## Applications pour Nellio UltraCalm

| Question Typique | Réponses Attendues (Allemand) | Validation |
|-----------------|-------------------------------|-----------|
| "Wie haben Sie von uns gehört?" | Facebook, Instagram, TikTok, Google, Word of Mouth, YouTube, Andere | Vérifier spelling exact |
| "Quelle est votre plus grande préoccupation?" | Stress, Sommeil, Focus, Énergie, Relaxation | Adapter à avatars Nellio |
| "Bonus: Décrivez votre parcours" | Open-ended text | Exporter en PDF pour ChatGPT |

---

## Citation

> "You need to make sure that the question is aligned with the answers and the answers that are there are aligned with the answers that we have here."

*Alignement = fondation de la synthèse IA ; rigoureux dès le départ.*

---

**Statut** : ✅ Processus de validation avant upload ChatGPT
