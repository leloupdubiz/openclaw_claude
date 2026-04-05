"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Memory } from "@/types";
import { formatDate, cn } from "@/lib/utils";
import { Search, Plus, Trash2, Tag, MessageSquare, Lightbulb, FileText, Bot, GitCommit } from "lucide-react";

const CATEGORY_COLORS = {
  conversation: "bg-blue-500",
  task: "bg-green-500",
  insight: "bg-yellow-500",
  decision: "bg-red-500",
  agent: "bg-purple-500",
};

const CATEGORY_ICONS = {
  conversation: <MessageSquare className="w-4 h-4" />,
  task: <FileText className="w-4 h-4" />,
  insight: <Lightbulb className="w-4 h-4" />,
  decision: <GitCommit className="w-4 h-4" />,
  agent: <Bot className="w-4 h-4" />,
};

const CATEGORY_LABELS: Record<string, string> = {
  conversation: "Conversation",
  task: "Tâche",
  insight: "Insight",
  decision: "Décision",
  agent: "Agent",
};

export function MemoryScreen() {
  const memories = useQuery(api.tasks.getMemories) || [];
  const searchMemories = useQuery(api.tasks.searchMemories, { query: "" }) || [];
  const createMemory = useMutation(api.tasks.createMemory);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newMemory, setNewMemory] = useState({
    title: "",
    content: "",
    category: "insight" as const,
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  const displayedMemories = searchQuery
    ? memories.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory
    ? memories.filter(m => m.category === selectedCategory)
    : memories;

  const handleCreateMemory = async () => {
    if (!newMemory.title.trim() || !newMemory.content.trim()) return;
    
    await createMemory({
      title: newMemory.title,
      content: newMemory.content,
      category: newMemory.category,
      tags: newMemory.tags,
    });
    
    setNewMemory({ title: "", content: "", category: "insight", tags: [] });
    setIsCreating(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !newMemory.tags.includes(tagInput.trim())) {
      setNewMemory({ ...newMemory, tags: [...newMemory.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Mémoire</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau Souvenir
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher dans les souvenirs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-white"
        >
          <option value="">Toutes les catégories</option>
          <option value="conversation">Conversation</option>
          <option value="task">Tâche</option>
          <option value="insight">Insight</option>
          <option value="decision">Décision</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      {isCreating && (
        <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <input
            type="text"
            placeholder="Titre du souvenir..."
            value={newMemory.title}
            onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 mb-3 text-white"
          />
          <select
            value={newMemory.category}
            onChange={(e) => setNewMemory({ ...newMemory, category: e.target.value as typeof newMemory.category })}
            className="px-3 py-2 bg-slate-900 rounded border border-slate-700 text-sm mb-3"
          >
            <option value="conversation">Conversation</option>
            <option value="task">Tâche</option>
            <option value="insight">Insight</option>
            <option value="decision">Décision</option>
            <option value="agent">Agent</option>
          </select>
          <textarea
            placeholder="Contenu du souvenir..."
            value={newMemory.content}
            onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 mb-3 text-white h-32 resize-none"
          />
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Ajouter un tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              className="px-3 py-1 bg-slate-900 rounded border border-slate-700 text-sm"
            />
            <button
              onClick={addTag}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm"
            >
              Ajouter
            </button>
          </div>
          {newMemory.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-3">
              {newMemory.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-slate-700 rounded-full text-xs flex items-center gap-1">
                  {tag}
                  <button
                    onClick={() => setNewMemory({ ...newMemory, tags: newMemory.tags.filter(t => t !== tag) })}
                    className="hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleCreateMemory}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Sauvegarder
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
        {displayedMemories.map((memory) => (
          <MemoryCard key={memory._id} memory={memory} />
        ))}
      </div>

      {displayedMemories.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>Aucun souvenir trouvé</p>
          <p className="text-sm mt-2">Créez votre premier souvenir ou ajustez votre recherche</p>
        </div>
      )}
    </div>
  );
}

function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded text-white", CATEGORY_COLORS[memory.category])}>
          {CATEGORY_ICONS[memory.category]}
        </div>
        <span className="text-xs text-slate-500">{formatDate(memory.createdAt)}</span>
      </div>
      
      <h3 className="font-semibold text-slate-200 mb-2">{memory.title}</h3>
      <p className="text-sm text-slate-400 line-clamp-3 mb-3">{memory.content}</p>
      
      {memory.tags && memory.tags.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {memory.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
