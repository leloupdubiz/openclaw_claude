# LEARNINGS.md — Clawdbot Prime ⚡
> Erreurs, leçons et règles. Créé le 2026-02-27.
> Règle absolue : refaire la même erreur = impardonnable.

---

## Format
```
## [DATE] — [Titre de l'erreur]
**Situation** : Ce qui s'est passé
**Cause** : Pourquoi ça a échoué
**Leçon** : Ce que j'ai appris
**Règle** : Ce que je fais différemment maintenant
```

---

## 2026-02-27 — YouTube IP Rate Limit (429)

**Situation** : Pipeline Pellegrini (44 vidéos) — YouTube a bloqué l'IP après ~6 fetches consécutifs de transcripts
**Cause** : Trop de requêtes rapides sans délai entre chaque fetch
**Leçon** : youtube-transcript-api déclenche un ban IP temporaire (quelques heures) si on fetch en rafale sans pause
**Règle** : Toujours ajouter `time.sleep(5)` entre chaque fetch transcript YouTube. Si 429 → attendre 60s + retry 1 fois. Si encore 429 → marquer "retry_needed" + passer au suivant. Ne jamais fetch plus de 10 vidéos sans pause de 30s.

---

## 2026-02-27 — kie.ai Sora-2-image-to-video cassé

**Situation** : Tentative d'appel API kie.ai pour I2V → erreur "image_url is required" même avec le champ passé
**Cause** : Bug API kie.ai côté serveur (non reproductible localement)
**Leçon** : Les APIs tierce sont instables — toujours avoir un fallback (Higgsfield était la voie principale alternative)
**Règle** : Pour tout pipeline créatif : définir Provider A + Provider B avant de commencer. Si Provider A fail → basculer sur B sans bloquer la tâche.

---

## 2026-02-27 — MEGA downloads sans speed limit = overflow disque

**Situation** : megadl authentifié sans `--limit-speed=5000` → 60 MB/s → overflow en 2 min
**Cause** : Aucune limite de vitesse définie → disque rempli avant fin du téléchargement
**Leçon** : MEGA peut télécharger à 60+ MB/s → 7.5 GB disponibles = ~2 min pour overflow
**Règle** : TOUJOURS ajouter `--limit-speed=5000` à megadl. TOUJOURS faire `SIGSTOP` pendant Whisper (gros consommateur CPU+RAM). Vérifier `df -h /` avant tout download > 1 GB.

---

## 2026-02-27 — Pipeline sous-agent sans checkpoint = perte totale si timeout

**Situation** : Sub-agent pipeline Pellegrini timeout → perte des résumés en cours de génération
**Cause** : Pas de système de cache/checkpoint → toute la progression perdue si interruption
**Leçon** : Pour les tâches longues avec des APIs, toujours sauvegarder progressivement
**Règle** : Tout pipeline > 10 éléments = fichier de cache obligatoire (ex: `transcripts/cache/{id}.txt`). Vérifier existence du cache avant chaque fetch. Si cache existe → skip le fetch, utiliser le cache.

---

## 2026-02-27 — Transcript youtube-transcript-api (Python 3.14) — API changée

**Situation** : `YouTubeTranscriptApi.get_transcript()` → AttributeError (méthode supprimée)
**Cause** : Nouvelle version de youtube-transcript-api (Python 3.14) a changé l'API
**Leçon** : `api = YouTubeTranscriptApi()` → `t = api.list(vid_id)` → `transcripts[0].fetch()` = nouveau workflow
**Règle** : Toujours tester l'API avec 1 vidéo avant de lancer un batch. Pattern correct documenté dans TOOLS.md.

---

*Mis à jour après chaque erreur significative par Clawdbot Prime ⚡*
