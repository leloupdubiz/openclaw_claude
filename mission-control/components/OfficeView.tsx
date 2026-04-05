"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TeamAgent } from "@/types";
import { Monitor, Coffee, Code, PenTool, BarChart3, Search } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

const workIcons: Record<string, React.ReactNode> = {
  "Orchestrateur": <BarChart3 className="w-5 h-5" />,
  "Creative": <PenTool className="w-5 h-5" />,
  "Media": <BarChart3 className="w-5 h-5" />,
  "Analytics": <BarChart3 className="w-5 h-5" />,
  "Research": <Search className="w-5 h-5" />,
  "Conversion": <BarChart3 className="w-5 h-5" />,
  "Content": <Code className="w-5 h-5" />,
};

export function OfficeView() {
  const agents = useQuery(api.tasks.getAgents) || [];

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      idle: "Inactif",
      working: "En travail",
      busy: "Occupé",
      offline: "Hors ligne",
    };
    return labels[status] || status;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Bureau Virtuel</h2>
          <p className="text-muted-foreground">
            Vue d'ensemble de l'activité de l'équipe
          </p>
        </div>
      </div>

      <div className="flex-1 bg-card rounded-lg p-8 relative overflow-hidden">
        {/* Office floor */}
        <div className="absolute inset-0 bg-gradient-to-b from-card to-muted/20" />
        
        {/* Grid layout for agents */}
        <div className="relative grid grid-cols-4 gap-8 h-full">
          {agents.map((agent, idx) => (
            <div key={agent._id} className="relative">
              {/* Desk */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-muted rounded-lg border border-border" />
              
              {/* Chair */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-16 bg-secondary rounded-full" />
              
              {/* Agent avatar */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
                <div className="relative">
                  <div className="text-5xl mb-2">{agent.emoji}</div>
                  {/* Status indicator */}
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(agent.status)}`} />
                </div>
                
                {/* Computer screen */}
                <div className="mt-4 bg-background border-2 border-border rounded-lg p-2 w-28 mx-auto">
                  {agent.status === "working" || agent.status === "busy" ? (
                    <div className="flex items-center justify-center gap-1">
                      <Monitor className="w-4 h-4 text-primary animate-pulse" />
                      {workIcons[agent.role]}
                    </div>
                  ) : agent.status === "idle" ? (
                    <Coffee className="w-4 h-4 text-muted-foreground mx-auto" />
                  ) : (
                    <Monitor className="w-4 h-4 text-muted-foreground mx-auto" />
                  )}
                </div>
                
                {/* Agent info */}
                <div className="mt-2 bg-background/80 backdrop-blur rounded-lg px-3 py-2 min-w-[120px]">
                  <p className="font-medium text-sm truncate">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{getStatusLabel(agent.status)}</p>
                  {agent.currentTask && (
                    <p className="text-xs text-primary truncate mt-1">{agent.currentTask}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty slots for future agents */}
          {Array.from({ length: Math.max(0, 8 - agents.length) }).map((_, idx) => (
            <div key={`empty-${idx}`} className="relative opacity-30">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-muted rounded-lg border border-dashed border-border" />
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
                <div className="text-5xl mb-2">❓</div>
                <div className="mt-4 bg-background border-2 border-dashed border-border rounded-lg p-2 w-28 mx-auto">
                  <Monitor className="w-4 h-4 text-muted-foreground mx-auto" />
                </div>
                <div className="mt-2 bg-background/80 rounded-lg px-3 py-2">
                  <p className="text-sm text-muted-foreground">Disponible</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats bar */}
        <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase">Agents actifs</p>
              <p className="text-2xl font-bold">{agents.filter(a => a.status === "working").length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">En pause</p>
              <p className="text-2xl font-bold">{agents.filter(a => a.status === "idle").length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Occupés</p>
              <p className="text-2xl font-bold">{agents.filter(a => a.status === "busy").length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Hors ligne</p>
              <p className="text-2xl font-bold">{agents.filter(a => a.status === "offline").length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
