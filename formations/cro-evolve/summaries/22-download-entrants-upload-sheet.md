# Download Entrants & Upload to Sheet — Résumé CRO

**Concept Central**  
Convertir les données brutes d'une campagne giveaway (VialSweep) en Google Sheet structuré est l'étape mécanique mais critique qui prépare les données pour la synthèse IA et l'analyse d'insights clients.

---

## Points Clés

1. **Processus de téléchargement** :
   - Aller dans VialSweep → Entrances tab → Export data (attendre email si >1.4K entrants)
   - Télécharger le fichier CSV / XLS

2. **Préparation du sheet** :
   - Créer 2 versions : **RAW** (backup des données originales) + **CLEAN** (pour analyse)
   - Dans CLEAN, supprimer : IP location + colonnes non-essentielles jusqu'à first name
   - Supprimer les colonnes après la dernière question

3. **Nettoyage des données** :
   - Supprimer entrées test (emails du client connus)
   - Text wrapping activé pour lire les questions
   - Aligner colonnes avec le template "raw feedback data"

4. **Alignement structure** :
   - Vérifier que questions et réponses correspondent au template attendu
   - Ajouter colonnes manquantes manuellement si nécessaire (ex. Pinterest ajouté après coup)
   - Vérifier spelling des réponses multiples (ex. "Travel bags" vs. "travel bag")

5. **Validation finale** :
   - Doubler-cliquer colonne pivot pour compter entrées par catégorie
   - Assurer que filtres fonctionnent correctement
   - Prêt pour upload IA (ChatGPT custom GPT)

---

## Insights

- La qualité des données détermine la qualité des résumés IA : garbage in = garbage out
- 2 versions (RAW + CLEAN) sauvent des erreurs irréversibles
- Custom surveys nécessitent vérification manuelle — ne pas assumer que tout aligne automatiquement
- Timing : ~30 min par giveaway (1.4K entrants)

---

## Applications pour Nellio UltraCalm

| Étape | Application |
|-------|------------|
| **Source de données** | VialSweep giveaway (pré-configuré) → Export entrants |
| **Questions typiques** | How did you hear? (Facebook/Instagram/TikTok/Google) → Aligner avec Nellio |
| **Nettoyage** | Supprimer entrées internes (team @nellio.com) |
| **Validation** | Vérifier réponses allemandes (qualité orthographe/spelling) |
| **Prochaine étape** | Exporter en PDF → Upload ChatGPT custom GPT pour synthèse |

---

## Citation

> "If you accidentally delete one, you can see it's all still here in the raw sheet, which is why we do that."

*Versionning = sécurité ; RAW sheet = assurance contre erreurs de manipulation.*

---

**Statut** : ✅ Processus mécanique, reproductible à chaque giveaway Nellio
