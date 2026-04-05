import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

// Mutation to seed initial data for the Mission Control
export const seed = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();

    // Seed Agents - EVOLVE Team
    const agents = [
      {
        name: "Creative Strategist",
        role: "EVOLVE Creative Lead",
        emoji: "🧠",
        description: "Desire-First strategy, Avatar→Angle pipeline, 5 Awareness Levels",
        status: "idle" as const,
      },
      {
        name: "Media Buyer",
        role: "EVOLVE Media Expert",
        emoji: "📊",
        description: "3-2-2 Structure, Marksman/Sniper testing, Kill Fast Protocol",
        status: "idle" as const,
      },
      {
        name: "Data Analyst",
        role: "EVOLVE Analytics",
        emoji: "📈",
        description: "Winner/Loser analysis, Learning docs, Evolve Growth Guide",
        status: "idle" as const,
      },
      {
        name: "Market Research",
        role: "EVOLVE Research",
        emoji: "🔎",
        description: "Desire Research, Avatar Architecture, Ad Library Spy",
        status: "idle" as const,
      },
      {
        name: "Video & Script",
        role: "EVOLVE Creative",
        emoji: "🎥",
        description: "5-Section structure, Awareness scripting, Hook formula",
        status: "idle" as const,
      },
      {
        name: "CRO & Funnel",
        role: "Conversion Expert",
        emoji: "🛍️",
        description: "Landing optimization, Checkout, AOV, Email flows",
        status: "idle" as const,
      },
    ];

    for (const agent of agents) {
      await ctx.db.insert("agents", {
        ...agent,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Seed Sample Tasks
    const tasks = [
      {
        title: "Setup Mission Control",
        description: "Initialize the dashboard and test all features",
        status: "done" as const,
        priority: "high" as const,
        assignee: "claw" as const,
        tags: ["setup", "mission-control"],
      },
      {
        title: "Research competitor ads",
        description: "Analyze Meta Ad Library for top 5 competitors",
        status: "todo" as const,
        priority: "high" as const,
        assignee: "claw" as const,
        tags: ["research", "evolve"],
      },
      {
        title: "Define primary desire",
        description: "Identify the dominant desire to channel for our product",
        status: "todo" as const,
        priority: "urgent" as const,
        assignee: "both" as const,
        tags: ["strategy", "evolve"],
      },
      {
        title: "Create avatar document",
        description: "Build core avatars and sub-avatars based on research",
        status: "todo" as const,
        priority: "medium" as const,
        assignee: "claw" as const,
        tags: ["avatar", "evolve"],
      },
    ];

    for (const task of tasks) {
      await ctx.db.insert("tasks", {
        ...task,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Seed Sample Content Ideas
    const content = [
      {
        title: "EVOLVE Method Explained",
        description: "Video explaining the 5-step EVOLVE framework",
        stage: "idea" as const,
        platform: "youtube" as const,
        tags: ["evolve", "education"],
      },
      {
        title: "Hook Writing Masterclass",
        description: "How to write 3-second hooks that stop the scroll",
        stage: "script" as const,
        platform: "youtube" as const,
        script: "[Hook] In this video, I'm going to show you the exact formula for writing hooks that capture attention in 3 seconds...",
        tags: ["hooks", "tutorial"],
      },
      {
        title: "Behind the Scenes: Testing 12 Ads",
        description: "Documentary-style content showing the 3-2-2 method in action",
        stage: "idea" as const,
        platform: "tiktok" as const,
        tags: ["bts", "testing"],
      },
    ];

    for (const item of content) {
      await ctx.db.insert("content", {
        ...item,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Seed Sample Memories
    const memories = [
      {
        title: "EVOLVE Core Insight",
        content: "The key realization: We don't create desire, we channel it. The market already has desires - our job is to identify and channel them effectively.",
        category: "insight" as const,
        tags: ["evolve", "desire", "fundamental"],
      },
      {
        title: "3-2-2 Method Decision",
        content: "Decided to adopt the 3-2-2 testing structure: 3 creatives × 2 body copies × 2 headlines = 12 ads per batch. This gives us enough variations to find winners without overspending.",
        category: "decision" as const,
        tags: ["evolve", "testing", "structure"],
      },
      {
        title: "Mission Control Setup",
        content: "Built the Mission Control dashboard to track all EVOLVE activities. Includes Task Board, Content Pipeline, Calendar, Memory, Team, and Office views.",
        category: "task" as const,
        tags: ["mission-control", "setup", "tools"],
      },
    ];

    for (const memory of memories) {
      await ctx.db.insert("memories", {
        ...memory,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Seed Sample Calendar Events
    const events = [
      {
        title: "Daily Content Review",
        description: "Review content pipeline and move items forward",
        startTime: now + 86400000, // Tomorrow
        type: "cron" as const,
        recurring: "daily" as const,
      },
      {
        title: "Weekly Performance Analysis",
        description: "Analyze ad performance and update Evolve Growth Guide",
        startTime: now + 604800000, // Next week
        type: "task" as const,
        recurring: "weekly" as const,
      },
      {
        title: "Team Sync",
        description: "Review all agent statuses and current tasks",
        startTime: now + 172800000, // Day after tomorrow
        type: "meeting" as const,
      },
    ];

    for (const event of events) {
      await ctx.db.insert("events", {
        ...event,
        createdAt: now,
      });
    }

    return { success: true, message: "Database seeded with EVOLVE team and sample data" };
  },
});
