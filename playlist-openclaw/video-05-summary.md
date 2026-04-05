# Vidéo 05 — Openclaw: Mission Control + Agent Teams
> ID: GpQcz_eKiNo | Mots: 4203 | Statut: ✅ Traité le 2026-02-23

## 🎯 Concept Central
Construire un **Mission Control** (dashboard Next.js) et organiser des **équipes d'agents spécialisés** — chaque agent a un rôle, un workspace, et des skills dédiés.

## 📌 Points Clés
- **Mission Control** : Dashboard Next.js vibe-codé par OpenClaw lui-même → remplace l'interface gateway basique
- **Agent Teams** : Plusieurs instances d'OpenClaw avec des rôles différents (Research, Creative, Developer, Analyst)
- **Orchestration** : L'agent principal (brain) délègue aux agents spécialisés (muscles) via sessions isolées
- **Handoff protocol** : L'output d'un agent devient automatiquement l'input du suivant — fichiers comme interface
- **Bindings Discord** : Chaque agent répond dans son propre channel Discord → organisation visuelle claire

## 💡 Insights Actionnables
1. **Prompt de création MC** : *"Build me a Mission Control using Next.js hosted locally with a task board, agent tracker, and content pipeline"*
2. **Créer agents spécialisés** : Chaque agent a son propre `SOUL.md` avec rôle précis
3. **Protocole handoff** : Sauvegarder les outputs dans des fichiers `.md` avant de passer à l'agent suivant
4. **Reverse prompting équipe** : Demander à chaque agent *"Qu'est-ce que tu peux accomplir aujourd'hui pour avancer nos objectifs ?"*

## 🏪 Applications pour drinknellio.com
- Architecture EVOLVE : Desire Researcher → Avatar Architect → Hook Writer → Script Writer (séquence handoff)
- Mission Control déjà en place (localhost:3000) → ajouter pipeline EVOLVE comme onglet
- Agent Research pour la surveillance de Meta Ad Library et tendances marché allemand

## ⚡ Citation Clé
> "Ton Mission Control, c'est ton QG. C'est là que tu vois tout ce qui se passe, tout ce que tes agents construisent pour toi."

## 🔗 Lien avec autres vidéos
- Base de tout le système multi-agents EVOLVE → connecte vidéos #10, #15, #18
- Architecture brains/muscles expliquée dans vidéo #15
