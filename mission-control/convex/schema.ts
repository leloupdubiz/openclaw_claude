import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("review"),
      v.literal("done")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
    assignee: v.union(
      v.literal("me"),
      v.literal("claw"),
      v.literal("both")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    dueDate: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  })
    .index("by_status", ["status"])
    .index("by_assignee", ["assignee"])
    .index("by_assignee_status", ["assignee", "status"]),

  content: defineTable({
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
    script: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    platform: v.optional(v.union(
      v.literal("youtube"),
      v.literal("tiktok"),
      v.literal("instagram"),
      v.literal("twitter"),
      v.literal("blog")
    )),
    createdAt: v.number(),
    updatedAt: v.number(),
    publishDate: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  })
    .index("by_stage", ["stage"])
    .index("by_platform", ["platform"]),

  events: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    type: v.union(
      v.literal("task"),
      v.literal("reminder"),
      v.literal("cron"),
      v.literal("meeting")
    ),
    recurring: v.optional(v.union(
      v.literal("daily"),
      v.literal("weekly"),
      v.literal("monthly")
    )),
    createdAt: v.number(),
  })
    .index("by_startTime", ["startTime"])
    .index("by_type", ["type"]),

  memories: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.union(
      v.literal("conversation"),
      v.literal("task"),
      v.literal("insight"),
      v.literal("decision"),
      v.literal("agent")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    tags: v.optional(v.array(v.string())),
    relatedAgentId: v.optional(v.string()),
  })
    .index("by_category", ["category"])
    .index("by_createdAt", ["createdAt"])
    .index("by_relatedAgent", ["relatedAgentId"]),

  agents: defineTable({
    name: v.string(),
    role: v.string(),
    emoji: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("idle"),
      v.literal("working"),
      v.literal("busy"),
      v.literal("offline")
    ),
    currentTask: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"]),
});
