"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TeamAgent } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Bot, User, Sparkles } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

const defaultAgents = [
  { name: "Clawdbot Prime", role: "Orchestrateur", emoji: "⚡", description: "AI Chief E-Commerce Operator" },
  { name: "Creative Strategist", role: "Creative", emoji: "🧠", description: "Hooks, angles, offers" },
  { name: "Media Buyer", role: "Media", emoji: "📊", description: "Meta/TikTok/Google Ads" },
  { name: "Data Analyst", role: "Analytics", emoji: "📈", description: "KPIs, attribution, LTV" },
  { name: "Market Research", role: "Research", emoji: "🔎", description: "Competitive analysis, avatars" },
  { name: "CRO & Funnel", role: "Conversion", emoji: "🛍️", description: "Landing pages, AOV" },
  { name: "Video & Script", role: "Content", emoji: "🎥", description: "UGC scripts, VSL" },
];

export function TeamView() {
  const agents = useQuery(api.tasks.getAgents) || [];
  const createAgent = useMutation(api.tasks.createAgent);
  const updateAgentStatus = useMutation(api.tasks.updateAgentStatus);
  
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentRole, setNewAgentRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim() || !newAgentRole.trim()) return;
    
    await createAgent({
      name: newAgentName,
      role: newAgentRole,
      emoji: "🤖",
      description: "",
    });
    
    setNewAgentName("");
    setNewAgentRole("");
    setIsOpen(false);
  };

  const handleInitializeTeam = async () => {
    for (const agent of defaultAgents) {
      await createAgent(agent);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Équipe</h2>
          <p className="text-muted-foreground">
            {agents.length} agents • {agents.filter(a => a.status === "working").length} actifs
          </p>
        </div>
        <div className="flex gap-2">
          {agents.length === 0 && (
            <Button onClick={handleInitializeTeam} variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              Initialiser l'équipe EVOLVE
            </Button>
          )}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouvel agent</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateAgent} className="space-y-4">
                <Input
                  placeholder="Nom de l'agent..."
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                />
                <Input
                  placeholder="Rôle..."
                  value={newAgentRole}
                  onChange={(e) => setNewAgentRole(e.target.value)}
                />
                <Button type="submit" className="w-full">
                  Créer
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
            key={agent._id}
            className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{agent.emoji}</div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
            </div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <p className="text-sm text-primary mb-2">{agent.role}</p>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase">Statut</span>
                <select
                  value={agent.status}
                  onChange={(e) => updateAgentStatus({ 
                    id: agent._id as any, 
                    status: e.target.value as any 
                  })}
                  className="bg-background border rounded px-2 py-1 text-sm"
                >
                  <option value="idle">Inactif</option>
                  <option value="working">En travail</option>
                  <option value="busy">Occupé</option>
                  <option value="offline">Hors ligne</option>
                </select>
              </div>
              {agent.currentTask && (
                <div className="mt-2">
                  <span className="text-xs text-muted-foreground uppercase">Tâche actuelle</span>
                  <p className="text-sm truncate">{agent.currentTask}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {agents.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Bot className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucun agent configuré</h3>
          <p className="text-muted-foreground max-w-md mb-4">
            Commencez par initialiser l'équipe EVOLVE avec tous les agents nécessaires pour votre opération e-commerce.
          </p>
          <Button onClick={handleInitializeTeam}>
            <Sparkles className="w-4 h-4 mr-2" />
            Initialiser l'équipe EVOLVE
          </Button>
        </div>
      )}
    </div>
  );
}
