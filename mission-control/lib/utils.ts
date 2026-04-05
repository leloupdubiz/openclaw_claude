import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    "todo": "bg-slate-500",
    "in-progress": "bg-blue-500",
    "review": "bg-yellow-500",
    "done": "bg-green-500",
    "idea": "bg-purple-500",
    "script": "bg-blue-500",
    "thumbnail": "bg-pink-500",
    "filming": "bg-orange-500",
    "editing": "bg-cyan-500",
    "published": "bg-green-500",
    "idle": "bg-gray-500",
    "working": "bg-green-500",
    "busy": "bg-red-500",
    "offline": "bg-slate-700",
  }
  return colors[status] || "bg-gray-500"
}
