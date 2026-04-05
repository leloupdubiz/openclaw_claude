"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TeamAgent } from "@/types";
import { formatDate, cn } from "@/lib/utils";
import { Plus, Trash2, Edit2, Bot, User, Code, PenTool, Palette, BarChart } from "lucide-react";

const ROLE_ICONS: Record<string, React.ReactNode> = {
  developer: <Code className="w-5 h-5" />,
  writer: <PenTool className="w-5 h-5" />,
  designer: <Palette className="w-5 h-5" />,
  analyst: <BarChart className="w-5 h-5" />,
  default: <Bot className="w-5 h-5" />,
};

const STATUS_COLORS = {
  idle: "bg-slate-500",
  working: "bg-green-500",
  busy: "bg-red-500",
  offline: "bg-slate-700",
};

const STATUS_LABELS: Record<string, string> = {
  idle: "inactif",
  working: "en travail",
  busy: "occupé",
  offline: "hors ligne",
};

export function Team() {
  const agents = useQuery(api.tasks.getAgents) || [];
  const createAgent = useMutation(api.tasks.createAgent);
  const updateAgentStatus = useMutation(api.tasks.updateAgentStatus);
  const deleteAgent = useMutation(api.tasks.deleteAgent);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    role: "",
    emoji: "🤖",
    description: "",
  });

  const handleCreateAgent = async () => {
    if (!newAgent.name.trim() || !newAgent.role.trim()) return;
    
    await createAgent({
      name: newAgent.name,
      role: newAgent.role,
      emoji: newAgent.emoji,
      description: newAgent.description,
    });
    
    setNewAgent({ name: "", role: "", emoji: "🤖", description: "" });
    setIsCreating(false);
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Équipe</h2>
          <p className="text-slate-400 text-sm mt-1">
            {agents.length} agents • {agents.filter(a => a.status === "working").length} en travail
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un agent
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Nom de l'agent..."
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              className="flex-1 px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white"
            />
            <input
              type="text"
              placeholder="Emoji"
              value={newAgent.emoji}
              onChange={(e) => setNewAgent({ ...newAgent, emoji: e.target.value })}
              className="w-16 px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white text-center"
            />
          </div>
          <input
            type="text"
            placeholder="Rôle (ex : Développeur, Rédacteur, Designer)..."
            value={newAgent.role}
            onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 mb-3 text-white"
          />
          <textarea
            placeholder="Description des responsabilités..."
            value={newAgent.description}
            onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 mb-3 text-white h-20 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateAgent}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Créer l'agent
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent._id}
            agent={agent}
            onStatusChange={(status, task) => updateAgentStatus({ id: agent._id, status, currentTask: task })}
            onDelete={() => deleteAgent({ id: agent._id })}
          />
        ))}
      </div>

      {agents.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aucun agent configuré</p>
          <p className="text-sm mt-2">Créez votre premier agent pour commencer à construire votre équipe</p>
        </div>
      )}
    </div>
  );
}

function AgentCard({
  agent,
  onStatusChange,
  onDelete,
}: {
  agent: TeamAgent;
  onStatusChange: (status: TeamAgent["status"], task?: string) => void;
  onDelete: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(agent.currentTask || "");

  const handleStatusUpdate = (newStatus: TeamAgent["status"]) => {
    onStatusChange(newStatus, currentTask);
    if (newStatus !== "working") {
      setCurrentTask("");
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
            {agent.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-slate-200">{agent.name}</h3>
            <p className="text-sm text-slate-400">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("w-3 h-3 rounded-full", STATUS_COLORS[agent.status])} title={STATUS_LABELS[agent.status]} />
          <button onClick={onDelete} className="p-1 hover:bg-red-500/20 text-red-500 rounded opacity-0 hover:opacity-100 transition-opacity">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-4">{agent.description}</p>

      {agent.currentTask && (
        <div className="bg-slate-900 rounded p-2 mb-3">
          <p className="text-xs text-slate-500 mb-1">Tâche actuelle :</p>
          <p className="text-sm text-slate-300">{agent.currentTask}</p>
        </div>
      )}

      {isEditing ? (
        <div className="space-y-2">
          {agent.status === "working" && (
            <input
              type="text"
              placeholder="Sur quoi travaillent-ils ?"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 text-sm text-white"
            />
          )}
          <div className="flex gap-2">
            {(["idle", "working", "busy", "offline"] as const).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                className={cn(
                  "px-3 py-1 rounded text-xs capitalize",
                  agent.status === status
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                )}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsEditing(false)}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            Annuler
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-white"
        >
          <Edit2 className="w-4 h-4" />
          Mettre à jour le statut
        </button>
      )}
    </div>
  );
}
