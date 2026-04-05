# How to Download Entrants & Upload to Google Sheet

## Concept Central
Processus systématique pour extraire les données de concours (via VialSweep) et les importer dans Google Sheets pour l'analyse de feedback client.

## Points Clés
- **VialSweep** : plateforme de gestion des concours (entrantes)
- **Processus de téléchargement** :
  1. Aller à l'onglet "Entries" dans VialSweep
  2. Exporter les données (large fichier = notification email)
  3. Télécharger le CSV depuis l'email notification
- **Préparation du Google Sheet** :
  1. Créer un template "clean file" (supprimer colonnes de métadonnées inutiles)
  2. Dupliquer en "raw file" (backup)
  3. Supprimer colonnes : IP, location, et tout après la dernière question
  4. Ajouter du text wrapping pour lisibilité
- **Données nettoyées** : Email, First Name, Last Name, + réponses aux questions

## Insights
Le nettoyage des données brutes est critique pour que les outils d'IA (ChatGPT, Jasper) puissent analyser correctement le feedback. Les colonnes de métadonnées = bruit.

## Applications drinknellio.com
- Si on lance des concours Nellio en Allemagne : extraire emails + profils d'acheteurs
- Préparer le feedback pour l'analyse sentiment (quels problèmes cherche le marché DE ?)
- Segmenter les répondants par source (Facebook, Instagram, TikTok)

## Citation
> "The reason why we do that is because it's all still here in the raw sheet, which is why we do that."
