"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Memory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, Brain, MessageSquare, Lightbulb, GitBranch, Bot } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryIcons: Record<string, React.ReactNode> = {
  conversation: <MessageSquare className="w-4 h-4" />,
  task: <Brain className="w-4 h-4" />,
  insight: <Lightbulb className="w-4 h-4" />,
  decision: <GitBranch className="w-4 h-4" />,
  agent: <Bot className="w-4 h-4" />,
};

const categoryLabels: Record<string, string> = {
  conversation: "Conversation",
  task: "Tâche",
  insight: "Insight",
  decision: "Décision",
  agent: "Agent",
};

const categoryColors: Record<string, string> = {
  conversation: "bg-blue-500",
  task: "bg-purple-500",
  insight: "bg-yellow-500",
  decision: "bg-green-500",
  agent: "bg-pink-500",
};

export function MemoryView() {
  const memories = useQuery(api.tasks.getMemories) || [];
  const createMemory = useMutation(api.tasks.createMemory);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [newMemoryTitle, setNewMemoryTitle] = useState("");
  const [newMemoryContent, setNewMemoryContent] = useState("");
  const [newMemoryCategory, setNewMemoryCategory] = useState<string>("insight");
  const [isOpen, setIsOpen] = useState(false);

  const filteredMemories = searchQuery
    ? memories.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : memories;

  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryTitle.trim() || !newMemoryContent.trim()) return;
    
    await createMemory({
      title: newMemoryTitle,
      content: newMemoryContent,
      category: newMemoryCategory as any,
    });
    
    setNewMemoryTitle("");
    setNewMemoryContent("");
    setIsOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Mémoire</h2>
          <p className="text-muted-foreground">
            {memories.length} souvenirs stockés
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau souvenir
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un souvenir</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateMemory} className="space-y-4">
              <Input
                placeholder="Titre..."
                value={newMemoryTitle}
                onChange={(e) => setNewMemoryTitle(e.target.value)}
              />
              <div className="flex gap-2">
                {Object.keys(categoryLabels).map((cat) => (
                  <Button
                    key={cat}
                    type="button"
                    size="sm"
                    variant={newMemoryCategory === cat ? "default" : "outline"}
                    onClick={() => setNewMemoryCategory(cat)}
                  >
                    {categoryIcons[cat]}
                    <span className="ml-2">{categoryLabels[cat]}</span>
                  </Button>
                ))}
              </div>
              <textarea
                placeholder="Contenu du souvenir..."
                value={newMemoryContent}
                onChange={(e) => setNewMemoryContent(e.target.value)}
                className="w-full h-32 p-3 bg-background border rounded-lg resize-none"
              />
              <Button type="submit" className="w-full">
                Enregistrer
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les souvenirs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tous ({memories.length})</TabsTrigger>
          {Object.keys(categoryLabels).map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {categoryLabels[cat]} ({memories.filter(m => m.category === cat).length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {filteredMemories.map((memory) => (
            <Dialog key={memory._id}>
              <DialogTrigger asChild>
                <div className="bg-card p-4 rounded-lg cursor-pointer hover:border-primary/50 transition-colors border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${categoryColors[memory.category]}`}>
                        {categoryIcons[memory.category]}
                      </div>
                      <div>
                        <h3 className="font-medium">{memory.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(memory.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-secondary rounded">
                      {categoryLabels[memory.category]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {memory.content}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${categoryColors[memory.category]}`}>
                      {categoryIcons[memory.category]}
                    </div>
                    {memory.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {formatDate(memory.createdAt)}
                  </p>
                  <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                    {memory.content}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </TabsContent>

        {Object.keys(categoryLabels).map((cat) => (
          <TabsContent key={cat} value={cat} className="space-y-3">
            {filteredMemories.filter(m => m.category === cat).map((memory) => (
              <Dialog key={memory._id}>
                <DialogTrigger asChild>
                  <div className="bg-card p-4 rounded-lg cursor-pointer hover:border-primary/50 transition-colors border border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{memory.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(memory.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {memory.content}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{memory.title}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 whitespace-pre-wrap">
                    {memory.content}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
