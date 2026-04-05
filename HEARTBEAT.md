# HEARTBEAT.md
# Routines périodiques de Clawdbot Prime ⚡
# Dernière mise à jour : 2026-02-24

---

## 🌅 ROUTINE QUOTIDIENNE D'AUTO-AMÉLIORATION (08h00 Europe/Paris)
> Cette routine est exécutée automatiquement chaque matin. Ne pas modifier sans raison.

### INSTRUCTIONS POUR L'AGENT (cron job "daily-retrospective")

Tu es Clawdbot Prime. C'est ta routine d'auto-amélioration du matin. Exécute les 5 étapes dans l'ordre, sans te précipiter.

**ÉTAPE 1 — LIS LE CONTEXTE**
1. Lis `MEMORY.md` pour avoir le contexte long-terme
2. Lis le fichier `memory/YYYY-MM-DD.md` de HIER (la date d'hier, pas aujourd'hui)
3. Si le fichier d'hier est vide ou absent, note-le explicitement dans ton rapport

**ÉTAPE 2 — ANALYSE LES TÂCHES DE LA VEILLE**
Pour chaque tâche logguée :
- ✅ Ce qui a été livré (proof = fichier ou output concret)
- ❌ Ce qui n'a pas été livré ou a échoué (avec la raison)
- ⚠️ Ce qui était en cours mais non terminé
- 💡 Ce qui a pris plus de temps que prévu (et pourquoi)

**ÉTAPE 3 — IDENTIFIE CE QUI A BIEN FONCTIONNÉ ET CE QUI A ÉCHOUÉ**
Sois honnête. Ce n'est pas un rapport pour faire bonne impression — c'est pour s'améliorer.
- WIN : [ce qui a bien marché, pourquoi, comment reproduire]
- FAIL : [ce qui a échoué, cause racine, comment éviter]
- PATTERN : [y a-t-il un pattern sur plusieurs jours ?]

**ÉTAPE 4 — PROPOSE 3 AMÉLIORATIONS CONCRÈTES**
Règles :
- Chaque amélioration doit être ACTIONNABLE immédiatement (pas "mieux communiquer")
- Elle doit avoir un impact mesurable sur ROAS, vitesse d'exécution, ou qualité des livrables
- Format : [Amélioration] → [Action concrète] → [Impact attendu]

**ÉTAPE 5 — METS À JOUR MEMORY.md**
- Ajoute les apprentissages durables qui méritent d'être retenus long-terme
- Mets à jour l'état des projets si quelque chose a changé
- Mets à jour les décisions si une nouvelle a été prise

**ÉTAPE 6 — PRÉPARE LE RAPPORT DISCORD**
Format du rapport :

```
⚡ RAPPORT QUOTIDIEN — [DATE]

📊 BILAN
✅ Livré : [liste]
❌ Échoué/manqué : [liste]
⚠️ En cours : [liste]

🏆 WIN DU JOUR
→ [ce qui a bien marché]

💥 FAIL DU JOUR
→ [ce qui a échoué + cause racine]

🔧 3 AMÉLIORATIONS PROPOSÉES
1. [Amélioration] → [action] → [impact]
2. [Amélioration] → [action] → [impact]
3. [Amélioration] → [action] → [impact]

📁 MEMORY.md : [mis à jour / rien de nouveau]
🎯 FOCUS DU JOUR : [la chose la plus importante à faire aujourd'hui]
```

**Si aucun log de la veille :** envoie quand même le rapport en notant "Pas de log hier — session manquante."

---

## 🔄 MAINTENANCE MÉMOIRE (tous les 3 jours via heartbeat)

Si la dernière mise à jour de MEMORY.md date de plus de 3 jours :
1. Lire les daily logs récents (`memory/*.md`)
2. Distiller les apprentissages dans MEMORY.md
3. Supprimer les infos obsolètes
4. Mettre à jour l'état des projets

---

## 💾 MONITORING STOCKAGE (chaque lundi)

Chaque lundi, exécuter la vérification suivante :

```bash
df -h / | tail -1
```

**Seuils d'alerte :**
- Espace disponible < 20% (< ~11.8 GB sur ce disque 59GB) → 🔴 ALERTE CRITIQUE
- Espace disponible entre 20-30% → 🟡 ATTENTION

**Si alerte déclenchée — envoyer ce message à Chef :**

```
⚠️ ALERTE STOCKAGE — [DATE]

Espace disque disponible : [X GB] ([X%])
Seuil critique : 20% (~11.8 GB)

Top consommateurs actuels :
- books/ PDFs : ~600 MB
- mission-control/node_modules/ : ~384 MB

Actions recommandées :
→ Valider suppression PDFs déjà résumés (libère ~600 MB)
→ Exécuter script de nettoyage mensuel
→ Script : ~/.openclaw/workspace/scripts/cleanup_monthly.sh
```

**Commande complète de vérification :**
```bash
AVAIL=$(df / | tail -1 | awk '{print $4}')
TOTAL=$(df / | tail -1 | awk '{print $2}')
PCT=$(( AVAIL * 100 / TOTAL ))
echo "Espace disque : $PCT% disponible"
if [ $PCT -lt 20 ]; then echo "🔴 ALERTE — Espace critique !"; fi
```

**Chaque 1er du mois — lancer le nettoyage auto :**
```bash
bash ~/.openclaw/workspace/scripts/cleanup_monthly.sh
```

---

## 🎬 SURVEILLANCE PLAYLIST YOUTUBE (09h00 Europe/Paris — quotidien)
> Playlist : https://www.youtube.com/playlist?list=PL0JPJ-FU3CV-d_Gyg2uAi1xeEEVjtm5hE
> INDEX.md = source de vérité : `~/.openclaw/workspace/playlist-openclaw/INDEX.md`

### INSTRUCTIONS POUR L'AGENT

**ÉTAPE 1 — Lancer le script de vérification**
```bash
python3 ~/.openclaw/workspace/playlist-openclaw/check_playlist.py
```
Analyser le JSON retourné. Si `new_videos` est vide → rien à faire, terminer silencieusement.

**ÉTAPE 2 — Si nouvelles vidéos détectées**

Pour chaque nouvelle vidéo dans `new_videos` :

1. Le transcript est déjà extrait dans `transcript-[N].txt`
2. Lire le transcript
3. Produire un résumé structuré avec ce format :
```markdown
# Vidéo [N] — [TITRE]
> ID: [id] | Mots: [N] | Statut: ✅ Traité le [DATE]

## 🎯 Concept Central
[2-3 phrases]

## 📌 Points Clés
[5-8 bullets avec les informations les plus actionnables]

## 💡 Insights Actionnables
[3-5 actions concrètes numérotées]

## 🏪 Applications pour drinknellio.com
[2-4 applications directes au business]

## ⚡ Citation Clé
> [citation mémorable]

## 🔗 Lien avec autres vidéos
[références croisées]
```
4. Sauvegarder dans `~/.openclaw/workspace/playlist-openclaw/video-[N]-summary.md`
5. Mettre à jour le statut dans INDEX.md : `⏳ en cours` → `✅ traité`

**ÉTAPE 3 — Mettre à jour MASTER-SUMMARY.md**
- Ajouter les nouveaux concepts clés dans la section concernée
- Ajouter les nouvelles applications pour drinknellio.com
- Mettre à jour la date "Dernière mise à jour"
- Ajouter dans la section "🔄 Nouvelles Vidéos Détectées"

**ÉTAPE 4 — Intégrer dans MEMORY.md**
- Si la vidéo contient des learnings durables ou des changements de capacités OpenClaw
- Ajouter dans la section "CAPACITÉS OPENCLAW MAÎTRISÉES"

**ÉTAPE 5 — Notifier sur Discord**
```
🎬 Nouvelle vidéo OpenClaw intégrée !

📹 [TITRE]
🔗 https://youtube.com/watch?v=[ID]
📝 Résumé : workspace/playlist-openclaw/video-[N]-summary.md

💡 Insight clé : [1 phrase]
🎯 Application drinknellio.com : [1 action concrète]
```

**Si YouTube bloque l'accès (erreur transcript) :**
- Marquer dans INDEX.md : `❌ accès bloqué — retry demain`
- Ne pas notifier Discord
- Réessayer automatiquement au prochain heartbeat (lendemain 9h)

---

## 📊 RAPPORT HEBDOMADAIRE PLAYLIST (lundi 08h00 Europe/Paris)
> S'exécute le lundi matin, avant le daily-retrospective

### INSTRUCTIONS POUR L'AGENT

1. Lire INDEX.md pour compter les vidéos de la semaine
2. Lire les nouveaux résumés (date = cette semaine)
3. Identifier le learning le plus impactant pour drinknellio.com
4. Envoyer sur Discord :

```
📊 RAPPORT PLAYLIST OPENCLAW — Semaine du [DATE]

📹 Total vidéos traitées : [N]/28
📥 Nouvelles cette semaine : [N]
🏆 Dernier apprentissage clé : [résumé en 1 phrase]
🎯 Action recommandée : [1 suggestion concrète pour drinknellio.com]
🔗 MASTER-SUMMARY mis à jour : workspace/playlist-openclaw/MASTER-SUMMARY.md
```

Si aucune nouvelle vidéo cette semaine → envoyer quand même le rapport avec "0 nouvelles vidéos".

---

## 🔴 SURVEILLANCE DISQUE TEMPS RÉEL (toutes les 30 min — PRIORITÉ ABSOLUE)
> Ajouté le 2026-02-24 sur instruction de Chef.
> Cette vérification doit être exécutée en PREMIER à chaque heartbeat, avant toute autre routine.
> Pour un intervalle strict de 30 min, créer un cron job dédié (voir commande ci-dessous).

### SEUILS D'ALERTE

| Espace libre | Action |
|:---:|--------|
| **> 3 GB** | ✅ Normal — continuer toutes les tâches |
| **< 3 GB** | 🔴 ALERTE — stopper toutes les tâches lourdes + Discord immédiat |
| **< 1 GB** | ☠️ CRITIQUE — stopper le gateway proprement |

### INSTRUCTIONS POUR L'AGENT

**ÉTAPE 1 — Mesurer l'espace disponible**
```bash
AVAIL_KB=$(df / | tail -1 | awk '{print $4}')
AVAIL_GB=$(echo "scale=1; $AVAIL_KB / 1048576" | bc)
echo "Espace disponible : ${AVAIL_GB} GB"
```

**ÉTAPE 2A — Si espace < 3 GB : STOP + ALERTE DISCORD**

Arrêter immédiatement :
- Tous les downloads en cours (megadl, yt-dlp, wget, curl lourds)
- Toutes les transcriptions Whisper en cours
- Tous les sub-agents en cours sur des tâches lourdes

Envoyer sur Discord (channel configuré) :
```
🔴 ALERTE DISQUE — [DATE] [HEURE]

Espace disponible : [X.X] GB — SEUIL CRITIQUE ATTEINT (< 3 GB)

🛑 Actions effectuées :
→ Toutes les tâches lourdes stoppées
→ Downloads / transcriptions interrompus

🗑️ Libérer en priorité :
→ ~/Downloads/ (vider)
→ /tmp/ fichiers volumineux
→ formations/ transcripts déjà traités
→ megadl résidus

⚠️ NE PAS relancer de tâches lourdes avant confirmation de Chef.
```

**ÉTAPE 2B — Si espace < 1 GB : STOP GATEWAY PROPREMENT**

```bash
# 1. Logger l'arrêt d'urgence
echo "$(date) — ARRÊT URGENCE DISQUE: $(df -h / | tail -1 | awk '{print $4}') libres" >> ~/workspace/checkpoints/disk-emergency.log

# 2. Tuer les processus lourds actifs
pkill -f "whisper" 2>/dev/null
pkill -f "megadl" 2>/dev/null
pkill -f "yt-dlp" 2>/dev/null

# 3. Vider /tmp proprement
find /tmp -name "*.mp4" -o -name "*.wav" -o -name "*.mp3" | xargs rm -f 2>/dev/null

# 4. Arrêt gateway propre
openclaw gateway stop
```

Tenter d'envoyer une dernière alerte Discord avant l'arrêt :
```
☠️ ARRÊT D'URGENCE — DISQUE CRITIQUE
Espace disponible : [X] GB (< 1 GB)
Gateway arrêté proprement.
Relancer manuellement après avoir libéré de l'espace.
```

### COMMANDE CRON (pour intervalle strict 30 min)
Pour une vérification toutes les 30 min exactement, ajouter ce cron job via OpenClaw :
```bash
openclaw cron add --schedule "*/30 * * * *" --name "disk-watchdog" --model claude-haiku-4 \
  --prompt "Vérifie l'espace disque disponible avec 'df / | tail -1 | awk \"{print \$4}\"'. Si < 3145728 KB (3 GB) → envoie une alerte Discord et stoppe les tâches lourdes. Si < 1048576 KB (1 GB) → arrête le gateway avec 'openclaw gateway stop'."
```

### ÉTAT ACTUEL DU DISQUE (2026-02-24)
- **Espace disponible** : 7.5 GB (zone sûre ✅)
- **Seuil d'alerte** : 3 GB
- **Seuil critique** : 1 GB
- **Cause principale de consommation** : formations/ transcripts + downloads MEGA

### RÈGLE D'OR
> Toute tâche qui écrit des fichiers > 500 MB doit d'abord vérifier l'espace disponible.
> En cas de doute : vérifier d'abord, télécharger ensuite.
