# How To Download Entrants & Upload To Sheet

## Concept Central
La pipeline de feedback client : VialSweep (giveaway) → Export → Google Sheet → Analysis → Insights — chaque étape est un data cleaning critique.

## Points Clés
- VialSweep Entrances tab export → email ou téléchargement direct (pour fichiers >1400 entrantes)
- Google Sheet import : File → Import → choisir « Insert new sheet » pour éviter l'écrasement
- Raw file (backup) + Clean file (analysis) : architecture avec 2 copies de sécurité
- Supprimer colonnes inutiles (IP, localisation) — garder email, nom, réponses produit
- Supprimer les entrées clients internes/test pour éviter la contamination des données

## Insights
Le processus semble simple (import data), mais c'est un filtre critique entre données brutes et données utilisables. Une seule ligne "test" ou réponse client biaisée dans ton sheet va skewer tous les insights IA. La discipline de nettoyage = fondation de la fiabilité analytique.

Pourquoi 2 sheets ? Raw = assurance que tu peux revenir sur une mauvaise décision. Clean = produit final sans artifacts. La majorité des bottlenecks ultérieurs (summaries buggés, filters cassés) vient d'un nettoyage incomplet ici.

## Applications drinknellio.com
**Pour Nellio UltraCalm :**
- Créer VialSweep giveaway : « Gagnez 3 mois de Nellio UltraCalm + coaching stress »
- Questions clés dans le survey giveaway : « Quelle est ta principale source de stress ? » (avatars), « As-tu essayé des solutions similaires ? » (competitive intel)
- Export → sheet + nettoyer immédiatement (pas de délai = pas d'oublis)
- Archiver raw file dans dossier "vaults" pour audit/compliance si nécessaire

## Citation Mémorable
« Si tu ne nettoies pas les données maintenant, tu vas lancer une IA sur du feedback contaminé — et c'est garbage in, garbage out. »
