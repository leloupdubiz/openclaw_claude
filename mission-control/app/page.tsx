"use client";

import { useState } from "react";
import { TaskBoard } from "@/components/TaskBoard";
import { ContentPipeline } from "@/components/ContentPipeline";
import { Calendar } from "@/components/Calendar";
import { MemoryScreen } from "@/components/Memory";
import { Team } from "@/components/Team";
import { Office } from "@/components/Office";
import { Library } from "@/components/Library";
import { Projets } from "@/components/Projets";
import { Interfaces } from "@/components/Interfaces";
import { Dashboard } from "@/components/Dashboard";
import { Evolve } from "@/components/Evolve";
import { Automations } from "@/components/Automations";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  Video,
  Calendar as CalendarIcon,
  Brain,
  Users,
  Building2,
  BookOpen,
  Rocket,
  Monitor,
  Target,
  Bot,
  Search,
  Layers,
  Wand2,
  Play,
  TrendingUp,
} from "lucide-react";

const TABS = [
  { id: "dashboard",          label: "Command Center", icon: LayoutDashboard, section: "chef",   badge: undefined },
  { id: "automations",        label: "Automations",    icon: Bot,             section: "chef",   badge: "8" },
  { id: "projets",            label: "Projets",         icon: Rocket,          section: "chef",   badge: "7" },
  { id: "interfaces",         label: "Interfaces",      icon: Monitor,         section: "chef",   badge: "6" },
  { id: "evolve-recherche",   label: "Recherche",       icon: Search,          section: "evolve", badge: "✅" },
  { id: "evolve-strategie",   label: "Stratégie",       icon: Layers,          section: "evolve", badge: "✅" },
  { id: "evolve-creation",    label: "Création",        icon: Wand2,           section: "evolve", badge: "✅" },
  { id: "evolve-execution",   label: "Exécution",       icon: Play,            section: "evolve", badge: "⏳" },
  { id: "evolve-optimisation",label: "Optimisation",    icon: TrendingUp,      section: "evolve", badge: undefined },
  { id: "taches",             label: "Tâches",          icon: ClipboardList,   section: "ops" },
  { id: "contenu",            label: "Contenu",         icon: Video,           section: "ops" },
  { id: "calendrier",         label: "Calendrier",      icon: CalendarIcon,    section: "ops" },
  { id: "memoire",            label: "Mémoire",         icon: Brain,           section: "ops" },
  { id: "equipe",             label: "Équipe",           icon: Users,           section: "ops" },
  { id: "bureau",             label: "Bureau",           icon: Building2,       section: "ops" },
  { id: "bibliotheque",       label: "Bibliothèque",    icon: BookOpen,        section: "ops" },
];

const SECTIONS = [
  { id: "chef",   label: "Chef" },
  { id: "evolve", label: "EVOLVE" },
  { id: "ops",    label: "Opérations" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const evolveSection = activeTab.startsWith("evolve-") ? activeTab.replace("evolve-", "") as "recherche"|"strategie"|"creation"|"execution"|"optimisation" : null;

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm">Mission Control</h1>
              <p className="text-xs text-slate-500">Clawdbot Prime ⚡</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {SECTIONS.map(section => {
            const tabs = TABS.filter(t => t.section === section.id);
            return (
              <div key={section.id} className="mb-4">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-1.5">
                  {section.label}
                </p>
                <ul className="space-y-0.5">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left text-sm",
                            isActive
                              ? section.id === "evolve"
                                ? "bg-orange-600/20 text-orange-400 border border-orange-600/30"
                                : "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          )}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium">{tab.label}</span>
                          {tab.badge && (
                            <span className={cn(
                              "ml-auto text-xs px-1.5 py-0.5 rounded-full",
                              section.id === "evolve"
                                ? "bg-orange-600/20 text-orange-400"
                                : "bg-violet-600/20 text-violet-400"
                            )}>
                              {tab.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800">
          <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center text-base flex-shrink-0">
                ⚡
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white text-xs truncate">Clawdbot Prime</p>
                <p className="text-xs text-slate-500">EVOLVE Certified</p>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 animate-pulse" title="En ligne" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-slate-950">
        <div className="p-8">
          {activeTab === "dashboard"           && <Dashboard />}
          {evolveSection                       && <Evolve section={evolveSection} />}
          {activeTab === "automations"         && <Automations />}
          {activeTab === "projets"             && <Projets />}
          {activeTab === "interfaces"          && <Interfaces />}
          {activeTab === "taches"       && <TaskBoard />}
          {activeTab === "contenu"      && <ContentPipeline />}
          {activeTab === "calendrier"   && <Calendar />}
          {activeTab === "memoire"      && <MemoryScreen />}
          {activeTab === "equipe"       && <Team />}
          {activeTab === "bureau"       && <Office />}
          {activeTab === "bibliotheque" && <Library />}
        </div>
      </main>
    </div>
  );
}
