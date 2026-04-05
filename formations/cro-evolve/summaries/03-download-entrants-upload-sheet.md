# How To Download Entrants & Upload To Sheet — Pipeline Feedback

## Concept Central
Extraire les données de giveaway (VialSweep) → Google Sheet = base pour résumés et insights clients. Processus répétable, semi-automatisé.

## Points Clés
1. **Export depuis VialSweep** :
   - Login → Onglet "Entrances" du giveaway terminé
   - Click export (peut envoyer email si volume > 1400 entrants)
   - Vérifier email de notification (settings VialSweep)
   - Télécharger le .csv

2. **Import dans Google Sheet** :
   - Accès au client asset drive → dossier du client
   - Template : "Purchaser's Giveaway Feedback Survey"
   - File > Import > Insert new sheet
   - Importer le CSV

3. **Nettoyage des données** :
   - Dupliquer sheet → nommer "raw file" et "clean file"
   - Supprimer colonnes inutiles (IP, location, tout avant First Name)
   - Supprimer tout après la dernière question
   - Toggle text wrapping pour voir questions

4. **Suppression entrants clients** :
   - Identifier emails internes/team = supprimer (sinon pollue l'AI)
   - Garder dans raw file pour sécurité (restore si besoin)

## Insights
- Structure sheet dès le départ = gain de temps énorme
- Raw + clean = mauvaise suppression n'est pas irréversible
- Automation: import new sheet vs manual copy-paste

## Applications drinknellio.com
- Si giveaway Nellio lancé : export→sheet→clean
- Supprimer emails internes (@nellio ou testing)
- Préparer pour summarization GPT en une session

## Citation
> "I like to duplicate this again and just call this the raw file... And then inside of here, I just call this the clean file."

---
*Généré depuis la formation EVOLVE — Phase 1, Video 22*
