"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ClipboardList, CheckCircle2, Clock, Circle,
  AlertCircle, Zap, Film, Target, LayoutDashboard,
  Plus, ChevronDown, ChevronUp, TrendingUp
} from "lucide-react";

interface Tâche {
  id: string;
  titre: string;
  projet: string;
  projetIcon: React.ElementType;
  statut: "fait" | "en_cours" | "à_faire" | "bloqué";
  priorité: "P0" | "P1" | "P2" | "P3";
  assigné: "chef" | "claw" | "les_deux";
  progression?: number; // pour les tâches en cours
  note?: string;
}

const TÂCHES: Tâche[] = [
  // ── EN COURS ─────────────────────────────────────────────────────────────────
  {
    id: "t1",
    titre: "Whisper Module 2 vidéo 3 — CRO Research",
    projet: "EVOLVE CRO Formation",
    projetIcon: Film,
    statut: "en_cours",
    priorité: "P1",
    assigné: "claw",
    progression: 50,
    note: "3. (Evolve) Getting Ready To Do Research + Branding.mp4 — 16MB en transcription",
  },
  {
    id: "t2",
    titre: "Résumé vidéo 3 Module 2 (à faire après Whisper)",
    projet: "EVOLVE CRO Formation",
    projetIcon: Film,
    statut: "en_cours",
    priorité: "P1",
    assigné: "claw",
    progression: 30,
    note: "En attente transcript Whisper",
  },
  {
    id: "t3",
    titre: "Batch Generator UI 3-2-2 (frontend Nellio Studio)",
    projet: "Nellio Studio",
    projetIcon: Zap,
    statut: "en_cours",
    priorité: "P0",
    assigné: "claw",
    progression: 35,
    note: "Backend /api/generate/batch OK — bouton frontend à construire",
  },
  {
    id: "t4",
    titre: "Mise à jour Mission Control — tous les onglets",
    projet: "Mission Control",
    projetIcon: LayoutDashboard,
    statut: "en_cours",
    priorité: "P2",
    assigné: "claw",
    progression: 85,
    note: "Projets + Agents Chats + TaskBoard en cours de mise à jour",
  },

  // ── À FAIRE ──────────────────────────────────────────────────────────────────
  {
    id: "t5",
    titre: "Télécharger les 7 vidéos restantes Module 2 MEGA",
    projet: "EVOLVE CRO Formation",
    projetIcon: Film,
    statut: "à_faire",
    priorité: "P1",
    assigné: "claw",
    note: "megadl — disk OK 12GB libre",
  },
  {
    id: "t6",
    titre: "Configurer clé API Anthropic pour pipeline overnight",
    projet: "EVOLVE CRO Formation",
    projetIcon: Film,
    statut: "à_faire",
    priorité: "P1",
    assigné: "chef",
    note: "Fournir sk-ant-... → export ANTHROPIC_API_KEY puis lancer pipeline_cro.py",
  },
  {
    id: "t7",
    titre: "Test end-to-end Nellio Studio (UI → API → script DE)",
    projet: "Nellio Studio",
    projetIcon: Zap,
    statut: "à_faire",
    priorité: "P0",
    assigné: "chef",
    note: "Ouvrir index.html → entrer sk-ant-... → générer script allemand",
  },
  {
    id: "t8",
    titre: "Historique persistant localStorage (Nellio Studio)",
    projet: "Nellio Studio",
    projetIcon: Zap,
    statut: "à_faire",
    priorité: "P0",
    assigné: "claw",
  },
  {
    id: "t9",
    titre: "Export Meta Ads format (Nellio Studio)",
    projet: "Nellio Studio",
    projetIcon: Zap,
    statut: "à_faire",
    priorité: "P1",
    assigné: "claw",
  },
  {
    id: "t10",
    titre: "Phase 1 EVOLVE — Desire Researcher (marché DE)",
    projet: "EVOLVE — Méthode Ads",
    projetIcon: Target,
    statut: "à_faire",
    priorité: "P1",
    assigné: "les_deux",
    note: "Démarrer quand Chef donne le go — besoin de 3 concurrents directs",
  },
  {
    id: "t11",
    titre: "Phase 1 EVOLVE — Ad Library Spy Meta",
    projet: "EVOLVE — Méthode Ads",
    projetIcon: Target,
    statut: "à_faire",
    priorité: "P1",
    assigné: "claw",
    note: "Dépend du Desire Researcher",
  },
  {
    id: "t12",
    titre: "Configurer OpenAI API key pour vector search mémoire",
    projet: "Mission Control",
    projetIcon: LayoutDashboard,
    statut: "à_faire",
    priorité: "P2",
    assigné: "chef",
    note: "memory-lancedb requiert text-embedding-3-small (OpenAI uniquement)",
  },

  // ── BLOQUÉ ───────────────────────────────────────────────────────────────────
  {
    id: "t13",
    titre: "Pipeline overnight EVOLVE CRO complet (Modules 2-5)",
    projet: "EVOLVE CRO Formation",
    projetIcon: Film,
    statut: "bloqué",
    priorité: "P1",
    assigné: "claw",
    note: "Bloqué : ANTHROPIC_API_KEY manquante pour summaries automatiques",
  },

  // ── FAIT ─────────────────────────────────────────────────────────────────────
  {
    id: "t20",
    titre: "Module 1 CRO Basics — 4/4 vidéos traitées",
    projet: "EVOLVE CRO Formation",
    projetIcon: Film,
    statut: "fait",
    priorité: "P1",
    assigné: "claw",
  },
  {
    id: "t21",
    titre: "Migration Nellio Studio GPT-4 → Claude (Anthropic SDK)",
    projet: "Nellio Studio",
    projetIcon: Zap,
    statut: "fait",
    priorité: "P0",
    assigné: "claw",
  },
  {
    id: "t22",
    titre: "28 vidéos OpenClaw — transcriptions + résumés FR",
    projet: "Bibliothèque",
    projetIcon: LayoutDashboard,
    statut: "fait",
    priorité: "P2",
    assigné: "claw",
  },
  {
    id: "t23",
    titre: "6 agents EVOLVE configurés (workspace + SOUL.md + MEMORY.md)",
    projet: "EVOLVE — Méthode Ads",
    projetIcon: Target,
    statut: "fait",
    priorité: "P1",
    assigné: "claw",
  },
  {
    id: "t24",
    titre: "EVOLVE_RESULTS/ + HANDOFF_PROTOCOL.md",
    projet: "EVOLVE — Méthode Ads",
    projetIcon: Target,
    statut: "fait",
    priorité: "P1",
    assigné: "claw",
  },
  {
    id: "t25",
    titre: "Audit complet OpenClaw — 6 étapes",
    projet: "Mission Control",
    projetIcon: LayoutDashboard,
    statut: "fait",
    priorité: "P2",
    assigné: "claw",
  },
  {
    id: "t26",
    titre: "Bibliothèque 98 docs — LaunchAgent port 4242",
    projet: "Bibliothèque",
    projetIcon: LayoutDashboard,
    statut: "fait",
    priorité: "P2",
    assigné: "claw",
  },
  {
    id: "t27",
    titre: "Memory flush activé (memoryFlush.enabled: true)",
    projet: "Mission Control",
    projetIcon: LayoutDashboard,
    statut: "fait",
    priorité: "P2",
    assigné: "claw",
  },
  {
    id: "t28",
    titre: "SOUL.md refonte — auto-correction + 10 règles Claude Code",
    projet: "Mission Control",
    projetIcon: LayoutDashboard,
    statut: "fait",
    priorité: "P2",
    assigné: "claw",
  },
];

const STATUT_CONFIG = {
  fait:     { label: "Terminé",   icon: CheckCircle2, class: "text-slate-500", bg: "bg-slate-800/30 border-slate-800" },
  en_cours: { label: "En cours",  icon: Clock,        class: "text-amber-400 animate-pulse", bg: "bg-amber-500/5 border-amber-500/20" },
  à_faire:  { label: "À faire",   icon: Circle,       class: "text-slate-400", bg: "bg-slate-900 border-slate-800" },
  bloqué:   { label: "Bloqué",    icon: AlertCircle,  class: "text-red-400",   bg: "bg-red-500/5 border-red-500/20" },
};

const PRIO_CONFIG = {
  P0: "text-red-400 bg-red-500/10",
  P1: "text-orange-400 bg-orange-500/10",
  P2: "text-blue-400 bg-blue-500/10",
  P3: "text-slate-400 bg-slate-500/10",
};

const ASSIGNÉ_CONFIG = {
  chef:     { label: "Chef",    class: "bg-blue-600/20 text-blue-400" },
  claw:     { label: "Claw ⚡", class: "bg-violet-600/20 text-violet-400" },
  les_deux: { label: "Ensemble", class: "bg-green-600/20 text-green-400" },
};

const SECTIONS = [
  { id: "en_cours", label: "En cours", count: true },
  { id: "bloqué",   label: "Bloqué",   count: true },
  { id: "à_faire",  label: "À faire",  count: true },
  { id: "fait",     label: "Terminé",  count: true, collapsed: true },
] as const;

export function TaskBoard() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({ fait: true });
  const [filter, setFilter] = useState<"tous" | "chef" | "claw" | "P0" | "P1">("tous");

  const filtered = TÂCHES.filter(t => {
    if (filter === "chef") return t.assigné === "chef" || t.assigné === "les_deux";
    if (filter === "claw") return t.assigné === "claw" || t.assigné === "les_deux";
    if (filter === "P0") return t.priorité === "P0";
    if (filter === "P1") return t.priorité === "P0" || t.priorité === "P1";
    return true;
  });

  const stats = {
    enCours: TÂCHES.filter(t => t.statut === "en_cours").length,
    àFaire:  TÂCHES.filter(t => t.statut === "à_faire").length,
    bloqué:  TÂCHES.filter(t => t.statut === "bloqué").length,
    fait:    TÂCHES.filter(t => t.statut === "fait").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ClipboardList className="w-7 h-7 text-blue-400" />
            Tâches
          </h2>
          <p className="text-slate-400 mt-1 text-sm">
            {stats.enCours} en cours · {stats.bloqué} bloqué{stats.bloqué > 1 ? "s" : ""} · {stats.àFaire} à faire · {stats.fait} terminées
          </p>
        </div>
        {/* Filtres */}
        <div className="flex gap-1.5">
          {(["tous","P0","P1","claw","chef"] as const).map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                filter === f
                  ? "bg-blue-600/20 text-blue-400 border-blue-600/30"
                  : "text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white"
              )}
            >
              {f === "tous" ? "Toutes" : f === "claw" ? "Claw ⚡" : f === "chef" ? "Chef" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      {SECTIONS.map(section => {
        const tâches = filtered.filter(t => t.statut === section.id);
        if (tâches.length === 0) return null;
        const isCollapsed = collapsed[section.id];
        const statut = STATUT_CONFIG[section.id];
        const StatutIcon = statut.icon;

        return (
          <div key={section.id} className="space-y-2">
            {/* Section header */}
            <button
              onClick={() => setCollapsed(c => ({ ...c, [section.id]: !c[section.id] }))}
              className="w-full flex items-center gap-3 px-1 py-1 hover:opacity-80 transition-opacity text-left"
            >
              <StatutIcon className={cn("w-4 h-4", statut.class)} />
              <span className="text-sm font-semibold text-slate-300">{statut.label}</span>
              <span className="text-xs text-slate-600 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                {tâches.length}
              </span>
              <div className="flex-1" />
              {isCollapsed ? <ChevronDown className="w-3.5 h-3.5 text-slate-600" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-600" />}
            </button>

            {/* Cards */}
            {!isCollapsed && (
              <div className="space-y-2 pl-1">
                {tâches.map(t => {
                  const StatIcon = STATUT_CONFIG[t.statut].icon;
                  const ProjIcon = t.projetIcon;
                  return (
                    <div key={t.id} className={cn("border rounded-xl p-4 transition-colors", STATUT_CONFIG[t.statut].bg)}>
                      <div className="flex items-start gap-3">
                        <StatIcon className={cn("w-4 h-4 flex-shrink-0 mt-0.5", STATUT_CONFIG[t.statut].class)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className={cn(
                              "text-sm font-medium",
                              t.statut === "fait" ? "text-slate-500 line-through" : "text-slate-200"
                            )}>
                              {t.titre}
                            </span>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", PRIO_CONFIG[t.priorité])}>
                                {t.priorité}
                              </span>
                              <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", ASSIGNÉ_CONFIG[t.assigné].class)}>
                                {ASSIGNÉ_CONFIG[t.assigné].label}
                              </span>
                            </div>
                          </div>

                          {/* Projet */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <ProjIcon className="w-3 h-3 text-slate-600" />
                            <span className="text-xs text-slate-600">{t.projet}</span>
                          </div>

                          {/* Note */}
                          {t.note && (
                            <p className="text-xs text-slate-500 mt-1.5 italic">{t.note}</p>
                          )}

                          {/* Barre de progression si en cours */}
                          {t.statut === "en_cours" && t.progression !== undefined && (
                            <div className="mt-2.5">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-slate-500">Progression</span>
                                <span className="text-xs font-medium text-amber-400">{t.progression}%</span>
                              </div>
                              <div className="w-full bg-slate-800 rounded-full h-1.5">
                                <div
                                  className="h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all"
                                  style={{ width: `${t.progression}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
