# Mission Control - Setup Guide

## 🚀 Quick Start

### 1. Installer les dépendances

```bash
cd /Users/pc2/.openclaw/workspace/mission-control
npm install
```

### 2. Initialiser Convex

```bash
npx convex dev
```

Cela va :
- Créer un projet Convex
- Démarrer le serveur de développement
- Générer les types

### 3. Configurer l'environnement

Créer `.env.local` :
```env
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
```

### 4. Démarrer l'application

```bash
npm run dev
```

Ouvrir http://localhost:3000

---

## 📋 Fonctionnalités

### 🎯 Task Board
- Créer des tâches assignées à toi ou à Claw
- Suivre le statut : Todo → In Progress → Review → Done
- Définir des priorités et dates d'échéance
- Tags pour l'organisation

### 🎬 Content Pipeline
- Idées → Script → Thumbnail → Filming → Editing → Published
- Écrire des scripts directement dans l'outil
- Attacher des images (thumbnails)
- Spécifier la plateforme (YouTube, TikTok, Instagram, etc.)

### 📅 Calendar
- Planifier des tâches et cron jobs
- Événements récurrents (daily, weekly, monthly)
- Visualisation mensuelle
- Types : Task, Reminder, Cron, Meeting

### 🧠 Memory
- Stocker conversations, insights, décisions
- Recherche globale dans toutes les mémoires
- Catégories : conversation, task, insight, decision, agent
- Tags pour faciliter la recherche

### 👥 Team
- Créer des agents avec rôles spécifiques
- Statuts : idle, working, busy, offline
- Assigner des tâches en cours
- Organiser par responsabilités

### 🏢 Office
- Vue visuelle de l'équipe
- Animations en temps réel
- Indicateurs de statut
- Postes de travail virtuels

---

## 🔗 Intégration avec OpenClaw

### Pour que Claw utilise le Mission Control :

**1. Tasks**
```
"Claw, ajoute cette tâche au board : [description]"
"Assigne-la à toi"
"Mets le statut à In Progress"
```

**2. Content**
```
"Ajoute cette idée de vidéo au pipeline"
"Écris le script pour [titre]"
"Déplace [titre] vers Filming"
```

**3. Calendar**
```
"Planifie cette tâche pour demain à 14h"
"Crée un cron job quotidien pour [action]"
```

**4. Memory**
```
"Sauvegarde cet insight dans la mémoire"
"Cherche dans les mémoires : [requête]"
```

**5. Team**
```
"Crée un agent pour [rôle]"
"Mets à jour le statut de [agent] à Working"
"Assigne la tâche [X] à [agent]"
```

---

## 🛠️ Personnalisation

### Ajouter un nouvel onglet

1. Créer un composant dans `/components/`
2. Ajouter dans `TABS` dans `app/page.tsx`
3. Ajouter le cas dans le switch de rendu

### Modifier le schéma

1. Éditer `convex/schema.ts`
2. Ajouter/mofifier les tables
3. Regénérer avec `npx convex dev`

### Créer des mutations personnalisées

1. Ajouter dans `convex/tasks.ts`
2. Utiliser avec `useMutation(api.tasks.nomFonction)`

---

## 📊 Structure des données

### Tasks
```typescript
{
  title: string
  description?: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: "me" | "claw" | "both"
  dueDate?: number
  tags?: string[]
}
```

### Content
```typescript
{
  title: string
  description?: string
  stage: "idea" | "script" | "thumbnail" | "filming" | "editing" | "published"
  script?: string
  thumbnailUrl?: string
  platform?: "youtube" | "tiktok" | "instagram" | "twitter" | "blog"
  publishDate?: number
  tags?: string[]
}
```

### Events
```typescript
{
  title: string
  description?: string
  startTime: number
  endTime?: number
  type: "task" | "reminder" | "cron" | "meeting"
  recurring?: "daily" | "weekly" | "monthly"
}
```

### Memories
```typescript
{
  title: string
  content: string
  category: "conversation" | "task" | "insight" | "decision" | "agent"
  tags?: string[]
  relatedAgentId?: string
}
```

### Agents
```typescript
{
  name: string
  role: string
  emoji: string
  description: string
  status: "idle" | "working" | "busy" | "offline"
  currentTask?: string
}
```

---

## 🎨 Thème

Le Mission Control utilise un thème sombre avec :
- Background : slate-950
- Cards : slate-800/900
- Accent : blue-600
- Text : slate-200 (primary), slate-400 (secondary)

---

## 🔧 Dépannage

### Convex ne se connecte pas
- Vérifier que `NEXT_PUBLIC_CONVEX_URL` est défini
- Relancer `npx convex dev`

### Erreurs de type
- Relancer `npx convex dev` pour regénérer les types
- Vérifier que le schéma est correct

### Composants qui ne s'affichent pas
- Vérifier les imports
- Vérifier les hooks Convex (useQuery, useMutation)

---

## 📚 Ressources

- [Convex Docs](https://docs.convex.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

**Mission Control ready for takeoff! 🚀**
