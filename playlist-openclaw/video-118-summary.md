# Vidéo 118 — How to Make AI UGC Ads in 2026: Sora 2, Claude and the Full Workflow
> ID: Bek158H4XXs | Mots: ~8600 | Statut: ✅ Traité le 2026-03-01

## 🎯 Concept Central
Workflow complet pour créer des AI UGC ads sans outil tout-en-un (ex: Arcads) : Claude (prompts) → Sora 2 (hook visuel 15s) → 11Labs (voix clonée) → Nano Banana (image-to-image) → Cling (B-roll animé). L'objectif est de tester 10× plus de variations de hooks et de messages à coût marginal quasi nul (~$0.10/output Sora 2).

## 📌 Points Clés

- **Claude = meilleur pour les prompts T2V** : Créer un skill Claude dédié à la génération de prompts pour Sora 2 (camera shake, accent, device type, dialogue)
- **Sora 2 = hook vidéo 15s** : Meilleur pour UGC réaliste avec audio intégré. Pas besoin d'édition si le hook est autonome
- **11Labs = clonage de voix** : Cloner la voix du sujet Sora 2 en 10 secondes → voix-off pour le reste du script
- **Nano Banana + Cling = B-roll AI** : Nano Banana pour transformer une image de référence en JSON prompt, Cling pour animer l'image en vidéo
- **Higgsfield ou Kai = API marketplace** : Centralise tous les modèles T2V (Sora 2, Cling, Nano Banana) en un seul endroit
- **Récursive self-improvement loop** : Skill Claude qui note les scripts 0-10 sur hook quality, storytelling, persona alignment, curiosity loops, core desires. Minimum 8/10 requis pour passer
- **3 Dimensions psychologiques des ads** (article Sarah Levenger) :
  1. **Valence zone** : 4 quadrants émotionnels (panic, sadness, cozy/calm, annoyance) — diversifier les zones dans l'ad account
  2. **Self-concept anchor** : Actual self (problème actuel) vs Ideal self (aspirationnel) vs Ought self (devoir/culpabilité vers un proche)
  3. **Language intensity** : Haute intensité → bas du funnel (DR direct) / Basse intensité → haut du funnel (émotionnel, storytelling)

## 💡 Insights Actionnables

1. **Créer un skill Claude "T2V Prompter"** : Prendre les inputs basiques (sujet, dialogue, décor, device) et générer le prompt optimal pour Sora 2
2. **Tester la valence zone sur les top spenders** : Auditer les 10-30 meilleures pubs — cartographier dans quel quadrant émotionnel elles tombent — identifier les gaps
3. **Intégrer les 3 dimensions dans le script writing skill** : Ajouter valence zone + self-concept + language intensity comme critères de grading
4. **Commencer simple avec Sora 2** : Juste des hooks 15s avec un sujet qui parle — pas besoin du workflow complet pour démarrer
5. **Automatiser le feedback loop** : Skill "reflect" qui compare output vs ask et commit les learnings en mémoire Claude après 3 itérations infructueuses

## 🏪 Applications pour drinknellio.com

1. **AI UGC pour tester les avatars DE** : Créer 10 hooks Sora 2 avec différentes femmes allemandes (stressed_professionals, busy_moms, wellness_enthusiasts) → valider l'avatar gagnant avant shoot réel → coût < $5
2. **Valence mapping sur Nellio UltraCalm** : Produit anxiété/stress → naturellement dans "panic/annoyance" zone → créer des ads dans "cozy/calm" (ideal self) pour diversifier et toucher clients en début de parcours
3. **Self-concept diversity** : Actual self ("Ich bin gestresst") vs Ideal self ("Stell dir vor, du schläfst endlich durch") vs Ought self (pour le partenaire qui voit son conjoint stressé)
4. **Skill de grading des scripts DE** : Construire un skill Claude qui grade les scripts Nellio en allemand selon hook quality, persona alignment DE, desire tapping (Ruhe, Schlaf, Energie)

## ⚡ Citation Clé
> "It's not about what ad am I going to make — it's about what emotion, fear, motivator am I speaking to." — Maxim (Meta)

## 🔗 Lien avec autres vidéos
- Vidéo 117 (AI UGC realistic ads) : workflow complémentaire — cette vidéo va plus loin avec le stack complet
- Vidéos sur persona et sub-avatars : les 3 dimensions psychologiques viennent enrichir le framework persona déjà établi
- Vidéos skills Claude précédentes : confirme et approfondit l'usage des skills pour la production créative
