# Comment Télécharger Entrants & Uploader en Google Sheet
> Résumé CRO | Formation EVOLVE

## 🎯 Concept Central
Automatiser l'extraction et le nettoyage des données giveaway/survey depuis VialSweep vers Google Sheets pour permettre l'analyse CRO ultérieure. Le processus combine export brut → raw file backup → clean file processing → alignment de colonnes pour compatibilité IA.

## 📌 Points Clés

- **VialSweep export workflow** :
  1. Log in → Find completed giveaway
  2. Click "Entrants" tab
  3. Export data (small ~auto-download | large ~email notification)
  4. Récupérer via email (ex: EZA@gmail.com)

- **Google Sheets setup** :
  1. File → Import → Insert new sheet
  2. Upload CSV téléchargé depuis VialSweep
  3. Dupliquer en "raw file" (backup original)
  4. Créer "clean file" (travail actif)

- **Nettoyage obligatoire** :
  - Supprimer colonnes avant "first name" (IP, location, etc.)
  - Supprimer colonnes après dernière question
  - Supprimer entrées d'emails internes (employés, testeurs)
  - Sélectionner column → shift-click → right-click "Delete columns"

- **Alignment avec template** :
  - Match colonne names avec raw feedback data sheet
  - Ajouter "options" column si manquant
  - Assurer ordre questions = ordre template

- **Outil bonus** : VialSweep "edit" section pour vérifier answer options si sheet unclear

## 💡 Insights
Le workflow sépare délibérément raw (immutable) et clean (processable) pour éviter la perte de données. L'alignment des colonnes est critique car le filtre counting system du template recherche des valeurs spécifiques dans des colonnes ordonnées — misalignment = données résumées erronées et GPT-3 confusion.

## 🧴 Applications Nellio UltraCalm

1. **Survey giveaway** : Si Nellio lance concours (ex: 100 potion gratuites) → utiliser VialSweep entry export
2. **Data structure** : Colonnes : Email | First Name | Last Name | Heard About (Instagram/Facebook/TikTok) | Primary Benefit | Life Change | Improvements
3. **Raw backup** : Conserver fichier raw avant AI processing (protection contre errors)
4. **Clean processing** : Nettoyer avant uploading vers Custom GPT pour summaries
5. **Template alignment** : Si format custom survey → pre-align sheets avant giveaway launch

## 📝 Citation
> "Duplicate this sheet and call it 'raw file' — that's the original data you can go back to if you need to change something. Then create a 'clean file' where you'll delete extra columns and prepare for import."
