# OpenClaw Mission Control

A custom dashboard to track your OpenClaw agents, tasks, content pipeline, and memories.

## Features

- **Task Board**: Track tasks assigned to you or your AI agents
- **Content Pipeline**: Manage content creation from idea to published
- **Calendar**: Schedule tasks and cron jobs
- **Memory**: Store and search through all your digital memories
- **Team**: Manage your AI agent team
- **Office**: Visual representation of your agents working

## Tech Stack

- **Framework**: Next.js 14
- **Database**: Convex (real-time)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI

## Setup

### 1. Install Dependencies

```bash
cd mission-control
npm install
```

### 2. Setup Convex

```bash
npx convex dev
```

This will:
- Create a Convex project
- Start the Convex dev server
- Generate the convex.json config

### 3. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

### Adding Tasks

1. Go to the **Tasks** tab
2. Click "New Task"
3. Assign to yourself or Claw
4. Track status: Todo → In Progress → Review → Done

### Content Pipeline

1. Add content ideas in the **Content** tab
2. Move through stages: Idea → Script → Thumbnail → Filming → Editing → Published
3. Write scripts directly in the tool
4. Track platform (YouTube, TikTok, etc.)

### Calendar

1. Schedule tasks and cron jobs
2. Set recurring events (daily, weekly, monthly)
3. View upcoming events at a glance

### Memory

1. Store conversations, insights, decisions
2. Search through all memories
3. Categorize by type (conversation, task, insight, decision, agent)
4. Add tags for organization

### Team

1. Create AI agents with specific roles
2. Track their status (idle, working, busy, offline)
3. Assign current tasks
4. Organize by responsibilities

### Office

1. Visual overview of your team
2. See who's working in real-time
3. Animated workstations
4. Quick status indicators

## Integration with OpenClaw

To have OpenClaw use this Mission Control:

1. **Tasks**: Tell Claw to "add this to the task board"
2. **Content**: "Add this video idea to the pipeline"
3. **Calendar**: "Schedule this task in the calendar"
4. **Memory**: "Save this insight to memory"
5. **Team**: "Create a new agent for [role]"

## Customization

The Mission Control is built to be customized. You can:

- Add new tabs and features
- Modify the schema for your needs
- Create custom workflows
- Integrate with other tools

## License

MIT
