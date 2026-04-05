# How To Download Entrants & Upload To Sheet

## Concept Central
**Pipeline automatisé de feedback client** : exporter des giveaway VialSweep → importer dans Google Sheet → organiser pour analyse IA ultérieure. La structure de données est critique — alignement colonnes/questions = succès de la synthèse.

## Points Clés
- **VialSweep export** : Entrance tab → export (fichier ou email si >1400 entrants)
- **2 sheets obligatoires** : "raw" (sauvegarde brute) + "clean" (données préparées)
- **Nettoyage mécanique** : supprimer colonnes IP/location/traquage, garder email/prénom/nom/réponses
- **Alignement structure** : colonnes + questions dans clean sheet = identiques à template raw feedback data
- **Gestion questions custom** : certains clients ajoutent/modifient questions — relire VialSweep settings et adapter
- **Drag-fill pattern** : pour copier filtres ou formules vers le bas (double-click poignée)

## Insights
La qualité des données d'entrée détermine la synthèse IA finale. Une seule colonne mal alignée = bruit systématique dans le résumé. Créer un "raw" = assurance contre les erreurs.

## Applications drinknellio.com
- **Giveaway Nellio** : exporter entrants → importer dans clean sheet
- **Questions fixes** : "Comment avez-vous entendu parler ?", "Effet sur votre vie ?", "Amélioration produit ?"
- **Colonnes à garder** : email, prénom, nom, source (Facebook/Instagram/TikTok/etc), effet perçu, suggestions
- **Volume** : préparer pour 1000+ entrants (gestion d'email automatique)

## Citation
> "The reason why we do that is because it's just going to basically mess up the data for this specific survey when we leverage AI."

---
