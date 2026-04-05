"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TeamAgent } from "@/types";
import { cn } from "@/lib/utils";
import { Bot, Monitor, Coffee, Zap } from "lucide-react";

const STATUS_CONFIG = {
  idle: { color: "bg-slate-500", icon: Coffee, label: "Inactif" },
  working: { color: "bg-green-500", icon: Monitor, label: "En travail" },
  busy: { color: "bg-red-500", icon: Zap, label: "Occupé" },
  offline: { color: "bg-slate-700", icon: Bot, label: "Hors ligne" },
};

export function Office() {
  const agents = useQuery(api.tasks.getAgents) || [];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Bureau Virtuel</h2>
          <p className="text-slate-400 text-sm mt-1">
            Suivez votre équipe en temps réel
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-400">En travail</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500" />
            <span className="text-slate-400">Inactif</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-400">Occupé</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-8 min-h-[500px]">
        {/* Plateau du bureau */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {agents.map((agent) => (
            <Workstation key={agent._id} agent={agent} />
          ))}
        </div>

        {agents.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-500">
            <Bot className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg">Le bureau est vide</p>
            <p className="text-sm mt-2">Ajoutez des agents dans la section Équipe pour les voir ici</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Workstation({ agent }: { agent: TeamAgent }) {
  const config = STATUS_CONFIG[agent.status];
  const Icon = config.icon;

  return (
    <div className="relative">
      {/* Bureau */}
      <div className="bg-slate-800 rounded-lg p-4 border-2 border-slate-700 relative">
        {/* Indicateur de statut */}
        <div
          className={cn(
            "absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-slate-900",
            config.color,
            agent.status === "working" && "animate-pulse"
          )}
        />

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 transition-all",
              agent.status === "working" ? "bg-slate-700 ring-2 ring-green-500/50" : "bg-slate-700"
            )}
          >
            {agent.emoji}
          </div>
          <h3 className="font-medium text-slate-200 text-sm text-center">{agent.name}</h3>
          <p className="text-xs text-slate-500">{agent.role}</p>
        </div>

        {/* Écran d'ordinateur */}
        <div
          className={cn(
            "rounded-lg p-3 mb-3 transition-all",
            agent.status === "working"
              ? "bg-slate-900 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              : "bg-slate-900 border border-slate-700"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon className={cn("w-4 h-4", config.color.replace("bg-", "text-"))} />
            <span className={cn("text-xs font-medium", config.color.replace("bg-", "text-"))}>
              {config.label}
            </span>
          </div>
          {agent.currentTask ? (
            <p className="text-xs text-slate-400 line-clamp-2">{agent.currentTask}</p>
          ) : (
            <p className="text-xs text-slate-600 italic">Aucune tâche active</p>
          )}
        </div>

        {/* Clavier */}
        <div className="flex justify-center">
          <div
            className={cn(
              "w-20 h-2 rounded-full transition-all",
              agent.status === "working"
                ? "bg-slate-600 animate-pulse"
                : "bg-slate-700"
            )}
          />
        </div>
      </div>
    </div>
  );
}
