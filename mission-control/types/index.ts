import { cn } from "@/lib/utils";

export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type Assignee = "me" | "claw" | "both";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: Assignee;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
  tags?: string[];
}

export type ContentStage = "idea" | "script" | "thumbnail" | "filming" | "editing" | "published";

export interface ContentItem {
  _id: string;
  title: string;
  description?: string;
  stage: ContentStage;
  script?: string;
  thumbnailUrl?: string;
  platform?: "youtube" | "tiktok" | "instagram" | "twitter" | "blog";
  createdAt: number;
  updatedAt: number;
  publishDate?: number;
  tags?: string[];
}

export interface CalendarEvent {
  _id: string;
  title: string;
  description?: string;
  startTime: number;
  endTime?: number;
  type: "task" | "reminder" | "cron" | "meeting";
  recurring?: "daily" | "weekly" | "monthly" | null;
  createdAt: number;
}

export interface Memory {
  _id: string;
  title: string;
  content: string;
  category: "conversation" | "task" | "insight" | "decision" | "agent";
  createdAt: number;
  updatedAt: number;
  tags?: string[];
  relatedAgentId?: string;
}

export interface TeamAgent {
  _id: string;
  name: string;
  role: string;
  emoji: string;
  description: string;
  status: "idle" | "working" | "busy" | "offline";
  currentTask?: string;
  createdAt: number;
  updatedAt: number;
}
