"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ContentItem, ContentStage } from "@/types";
import { formatDate, getStatusColor, cn } from "@/lib/utils";
import { Plus, FileText, Image, Video, Edit2, ChevronRight, Youtube, Twitter } from "lucide-react";

const STAGES: { id: ContentStage; label: string; icon: React.ReactNode }[] = [
  { id: "idea", label: "Idée", icon: <Plus className="w-4 h-4" /> },
  { id: "script", label: "Script", icon: <FileText className="w-4 h-4" /> },
  { id: "thumbnail", label: "Miniature", icon: <Image className="w-4 h-4" /> },
  { id: "filming", label: "Tournage", icon: <Video className="w-4 h-4" /> },
  { id: "editing", label: "Montage", icon: <Edit2 className="w-4 h-4" /> },
  { id: "published", label: "Publié", icon: <ChevronRight className="w-4 h-4" /> },
];

const PLATFORM_ICONS = {
  youtube: <Youtube className="w-4 h-4 text-red-500" />,
  tiktok: <span className="text-sm font-bold text-pink-500">TT</span>,
  instagram: <span className="text-sm font-bold text-pink-600">IG</span>,
  twitter: <Twitter className="w-4 h-4 text-blue-400" />,
  blog: <FileText className="w-4 h-4 text-slate-400" />,
};

export function ContentPipeline() {
  const content = useQuery(api.tasks.getContent) || [];
  const createContent = useMutation(api.tasks.createContent);
  const updateContent = useMutation(api.tasks.updateContent);
  
  const [isCreating, setIsCreating] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState({
    title: "",
    platform: "youtube" as const,
    description: "",
  });

  const handleCreate = async () => {
    if (!newContent.title.trim()) return;
    await createContent({
      title: newContent.title,
      stage: "idea",
      platform: newContent.platform,
      description: newContent.description,
    });
    setNewContent({ title: "", platform: "youtube", description: "" });
    setIsCreating(false);
  };

  const moveContent = async (item: ContentItem, newStage: ContentStage) => {
    await updateContent({ id: item._id, stage: newStage });
  };

  const getContentByStage = (stage: ContentStage) => {
    return content.filter((c) => c.stage === stage);
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Pipeline de Contenu</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvelle Idée
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <input
            type="text"
            placeholder="Titre du contenu..."
            value={newContent.title}
            onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 mb-3 text-white"
          />
          <div className="flex gap-3 mb-3">
            <select
              value={newContent.platform}
              onChange={(e) => setNewContent({ ...newContent, platform: e.target.value as typeof newContent.platform })}
              className="px-3 py-1 bg-slate-900 rounded border border-slate-700 text-sm"
            >
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter/X</option>
              <option value="blog">Blog</option>
            </select>
          </div>
          <textarea
            placeholder="Description / notes..."
            value={newContent.description}
            onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 mb-3 text-white text-sm h-20 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Créer
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
          onUpdate={(updates) => updateContent({ id: selectedContent._id, ...updates })}
        />
      )}

      <div className="grid grid-cols-6 gap-3 h-[calc(100vh-200px)] overflow-x-auto">
        {STAGES.map((stage) => (
          <div key={stage.id} className="bg-slate-800/50 rounded-lg p-3 min-w-[180px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {stage.icon}
                <h3 className="font-semibold text-slate-200 text-sm">{stage.label}</h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded">
                {getContentByStage(stage.id).length}
              </span>
            </div>

            <div className="space-y-2">
              {getContentByStage(stage.id).map((item) => (
                <ContentCard
                  key={item._id}
                  item={item}
                  onClick={() => setSelectedContent(item)}
                  onMove={(stage) => moveContent(item, stage)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentCard({
  item,
  onClick,
  onMove,
}: {
  item: ContentItem;
  onClick: () => void;
  onMove: (stage: ContentStage) => void;
}) {
  const currentStageIndex = STAGES.findIndex((s) => s.id === item.stage);
  const nextStage = STAGES[currentStageIndex + 1]?.id;

  return (
    <div
      onClick={onClick}
      className="bg-slate-800 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-blue-500 transition-colors group"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-slate-200 line-clamp-2">{item.title}</h4>
        {item.platform && PLATFORM_ICONS[item.platform]}
      </div>

      {item.description && (
        <p className="text-xs text-slate-400 line-clamp-2 mb-2">{item.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {formatDate(item.createdAt)}
        </span>
        {nextStage && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMove(nextStage);
            }}
            className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-opacity"
          >
            Avancer →
          </button>
        )}
      </div>
    </div>
  );
}

function ContentDetailModal({
  content,
  onClose,
  onUpdate,
}: {
  content: ContentItem;
  onClose: () => void;
  onUpdate: (updates: Partial<ContentItem>) => void;
}) {
  const [editedScript, setEditedScript] = useState(content.script || "");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl border border-slate-700 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{content.title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className={cn("px-2 py-1 rounded text-xs text-white", getStatusColor(content.stage))}>
              {content.stage}
            </span>
            {content.platform && (
              <span className="flex items-center gap-1 text-sm text-slate-400">
                {PLATFORM_ICONS[content.platform]}
                {content.platform}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
            <p className="text-slate-300">{content.description || "Pas de description"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Script</label>
            <textarea
              value={editedScript}
              onChange={(e) => setEditedScript(e.target.value)}
              placeholder="Rédigez votre script ici..."
              className="w-full px-3 py-2 bg-slate-800 rounded border border-slate-700 text-white h-40 resize-none"
            />
            <button
              onClick={() => onUpdate({ script: editedScript })}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Sauvegarder le script
            </button>
          </div>

          {content.thumbnailUrl && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Miniature</label>
              <img src={content.thumbnailUrl} alt="Miniature" className="rounded-lg max-h-40" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
