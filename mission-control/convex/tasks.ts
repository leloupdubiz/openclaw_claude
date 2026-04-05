import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Tasks
export const getTasks = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").take(100);
  },
});

export const getTasksByStatus = query({
  args: { status: v.union(v.literal("todo"), v.literal("in-progress"), v.literal("review"), v.literal("done")) },
  handler: async (ctx, args) => {
    return await ctx.db.query("tasks").withIndex("by_status", (q) => q.eq("status", args.status)).take(100);
  },
});

export const getTasksByAssignee = query({
  args: { assignee: v.union(v.literal("me"), v.literal("claw"), v.literal("both")) },
  handler: async (ctx, args) => {
    return await ctx.db.query("tasks").withIndex("by_assignee", (q) => q.eq("assignee", args.assignee)).take(100);
  },
});

export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("todo"), v.literal("in-progress"), v.literal("review"), v.literal("done")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    assignee: v.union(v.literal("me"), v.literal("claw"), v.literal("both")),
    dueDate: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("tasks", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal("todo"), v.literal("in-progress"), v.literal("review"), v.literal("done"))),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent"))),
    assignee: v.optional(v.union(v.literal("me"), v.literal("claw"), v.literal("both"))),
    dueDate: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Content Pipeline
export const getContent = query({
  handler: async (ctx) => {
    return await ctx.db.query("content").order("desc").take(100);
  },
});

export const getContentByStage = query({
  args: { stage: v.union(
    v.literal("idea"),
    v.literal("script"),
    v.literal("thumbnail"),
    v.literal("filming"),
    v.literal("editing"),
    v.literal("published")
  )},
  handler: async (ctx, args) => {
    return await ctx.db.query("content").withIndex("by_stage", (q) => q.eq("stage", args.stage)).take(100);
  },
});

export const createContent = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    stage: v.union(
      v.literal("idea"),
      v.literal("script"),
      v.literal("thumbnail"),
      v.literal("filming"),
      v.literal("editing"),
      v.literal("published")
    ),
    platform: v.optional(v.union(
      v.literal("youtube"),
      v.literal("tiktok"),
      v.literal("instagram"),
      v.literal("twitter"),
      v.literal("blog")
    )),
    script: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("content", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateContent = mutation({
  args: {
    id: v.id("content"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    stage: v.optional(v.union(
      v.literal("idea"),
      v.literal("script"),
      v.literal("thumbnail"),
      v.literal("filming"),
      v.literal("editing"),
      v.literal("published")
    )),
    script: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    platform: v.optional(v.union(
      v.literal("youtube"),
      v.literal("tiktok"),
      v.literal("instagram"),
      v.literal("twitter"),
      v.literal("blog")
    )),
    publishDate: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Calendar Events
export const getEvents = query({
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").take(100);
  },
});

export const getUpcomingEvents = query({
  handler: async (ctx) => {
    const now = Date.now();
    return await ctx.db.query("events")
      .withIndex("by_startTime", (q) => q.gte("startTime", now))
      .order("asc")
      .take(50);
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    type: v.union(v.literal("task"), v.literal("reminder"), v.literal("cron"), v.literal("meeting")),
    recurring: v.optional(v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly"))),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const deleteEvent = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Memories
export const getMemories = query({
  handler: async (ctx) => {
    return await ctx.db.query("memories").order("desc").take(100);
  },
});

export const searchMemories = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const memories = await ctx.db.query("memories").order("desc").take(200);
    const lowerQuery = args.query.toLowerCase();
    return memories.filter(m => 
      m.title.toLowerCase().includes(lowerQuery) || 
      m.content.toLowerCase().includes(lowerQuery)
    );
  },
});

export const getMemoriesByCategory = query({
  args: { category: v.union(
    v.literal("conversation"),
    v.literal("task"),
    v.literal("insight"),
    v.literal("decision"),
    v.literal("agent")
  )},
  handler: async (ctx, args) => {
    return await ctx.db.query("memories").withIndex("by_category", (q) => q.eq("category", args.category)).take(100);
  },
});

export const createMemory = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.union(
      v.literal("conversation"),
      v.literal("task"),
      v.literal("insight"),
      v.literal("decision"),
      v.literal("agent")
    ),
    tags: v.optional(v.array(v.string())),
    relatedAgentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("memories", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Agents
export const getAgents = query({
  handler: async (ctx) => {
    return await ctx.db.query("agents").order("desc").take(50);
  },
});

export const createAgent = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    emoji: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("agents", {
      ...args,
      status: "idle",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateAgentStatus = mutation({
  args: {
    id: v.id("agents"),
    status: v.union(v.literal("idle"), v.literal("working"), v.literal("busy"), v.literal("offline")),
    currentTask: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteAgent = mutation({
  args: { id: v.id("agents") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
