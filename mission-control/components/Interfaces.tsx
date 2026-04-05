"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Monitor, Globe, ExternalLink, Server, CheckCircle2,
  XCircle, Loader2, RefreshCw, BookOpen, LayoutDashboard,
  Zap, FileText, Info
} from "lucide-react";

interface Interface {
  id: string;
  nom: string;
  description: string;
  url: string;
  type: "web" | "fichier" | "api";
  status: "actif" | "inactif" | "local";
  port?: number;
  icon: React.ElementType;
  couleur: string;
  badge: string;
  fonctionnalités: string[];
  techStack: string[];
  note?: string;
}

const INTERFACES: Interface[] = [
  {
    id: "bibliotheque",
    nom: "Bibliothèque",
    description: "Accès à tous les résumés de livres, cours, knowledge bases et documents. 98 documents, 62 livres + 28 vidéos OpenClaw + 8 autres.",
    url: "http://localhost:4242",
    type: "web",
    status: "actif",
    port: 4242,
    icon: BookOpen,
    couleur: "from-amber-500 to-orange-500",
    badge: "⚡ Prod",
    fonctionnalités: [
      "62 résumés de livres individuels (Hormozi + DTC)",
      "28 vidéos OpenClaw (Alex Finn, Julian Goldie, etc.)",
      "Cours EVOLVE CRO (Spencer — en cours d'intégration)",
      "Knowledge Bases (E-Commerce, Ads, Architecture)",
      "Recherche full-text",
      "Structure par chaîne YouTube",
      "Rendu markdown + offline-first",
    ],
    techStack: ["Node.js", "Express", "Marked.js", "CSS natif"],
    note: "Fonctionne 100% hors-ligne (fonts + libs en local). LaunchAgent actif.",
  },
  {
    id: "mission-control",
    nom: "Mission Control",
    description: "Dashboard central de pilotage. Tâches, contenu, calendrier, mémoire, équipe, projets et interfaces.",
    url: "http://localhost:3000",
    type: "web",
    status: "actif",
    port: 3000,
    icon: LayoutDashboard,
    couleur: "from-blue-500 to-violet-600",
    badge: "🎛️ Core",
    fonctionnalités: [
      "Task Board (Todo → Done)",
      "Content Pipeline (Idée → Publié)",
      "Calendrier des événements",
      "Mémoire (conversations, insights)",
      "Équipe d'agents",
      "Vue Office",
      "Projets (ce panel)",
      "Interfaces (ce panel)",
    ],
    techStack: ["Next.js 14", "Convex (local)", "Tailwind CSS", "Radix UI"],
    note: "Convex local sur port 3210. LaunchAgent actif.",
  },
  {
    id: "nellio-studio",
    nom: "Nellio Studio",
    description: "Générateur de créatifs Meta Ads pour drinknellio.com. Hooks, scripts UGC et prompts image en allemand via Claude.",
    url: "file:///Users/pc2/.openclaw/workspace/nellio-studio/public/index.html",
    type: "fichier",
    status: "local",
    icon: Zap,
    couleur: "from-pink-500 to-rose-600",
    badge: "🎨 Studio",
    fonctionnalités: [
      "5 types de hooks Meta Ads",
      "4 audiences (professionals, moms, students, wellness)",
      "4 tons de message",
      "Génération script Claude (allemand)",
      "6 types d'images Midjourney",
      "Config API key (localStorage)",
    ],
    techStack: ["HTML/CSS/JS", "Anthropic API (Claude)", "Express backend port 3001"],
    note: "Frontend statique → backend Express sur port 3001. Démarrer avec : npm start dans nellio-studio/.",
  },
  {
    id: "convex-dashboard",
    nom: "Dashboard Convex",
    description: "Interface d'administration de la base de données Convex locale. Visualiser et modifier les données en temps réel.",
    url: "http://127.0.0.1:6790/?d=anonymous-mission-control",
    type: "web",
    status: "actif",
    port: 6790,
    icon: Server,
    couleur: "from-slate-500 to-slate-700",
    badge: "🗄️ DB Admin",
    fonctionnalités: [
      "Visualisation tables en temps réel",
      "Édition manuelle des données",
      "Logs des fonctions Convex",
      "Monitoring des mutations",
    ],
    techStack: ["Convex Local Backend"],
    note: "Disponible uniquement quand le LaunchAgent Mission Control est actif.",
  },
  {
    id: "nellio-backend",
    nom: "Nellio Studio Backend",
    description: "API Express proxiant les appels Claude (Anthropic) pour Nellio Studio. Évite les restrictions CORS du browser.",
    url: "http://localhost:3001/api/health",
    type: "api",
    status: "local",
    port: 3001,
    icon: Zap,
    couleur: "from-pink-500 to-rose-600",
    badge: "🎨 Nellio",
    fonctionnalités: [
      "POST /api/generate/script → Script UGC allemand",
      "POST /api/generate/image-prompt → Prompt Midjourney",
      "POST /api/generate/batch → 3-2-2 (12 variantes)",
      "GET /api/health → Status du serveur",
    ],
    techStack: ["Express.js", "Anthropic SDK", "claude-opus-4-5"],
    note: "Démarrer manuellement : cd nellio-studio && npm start. API key via header x-api-key.",
  },
  {
    id: "api-bibliotheque",
    nom: "API Bibliothèque",
    description: "API REST servant les 70 documents de la bibliothèque. Utilisable par n'importe quel script ou agent.",
    url: "http://localhost:4242/api",
    type: "api",
    status: "actif",
    port: 4242,
    icon: FileText,
    couleur: "from-teal-500 to-green-600",
    badge: "🔌 API",
    fonctionnalités: [
      "GET /api/catalog — catalogue complet",
      "GET /api/doc/:id — contenu d'un document",
      "GET /api/stats — stats globales",
    ],
    techStack: ["Express.js", "Node.js"],
    note: "Accessible depuis n'importe quel agent OpenClaw.",
  },
];

const TYPE_CONFIG = {
  web:     { label: "Interface Web",   class: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  fichier: { label: "Fichier Local",   class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  api:     { label: "API REST",        class: "bg-green-500/10 text-green-400 border-green-500/20" },
};

const STATUS_CONFIG = {
  actif:   { label: "En ligne",   icon: CheckCircle2, class: "text-green-400" },
  inactif: { label: "Hors ligne", icon: XCircle,      class: "text-red-400" },
  local:   { label: "Local",      icon: FileText,     class: "text-amber-400" },
};

export function Interfaces() {
  const [statuses, setStatuses] = useState<Record<string, "checking" | "ok" | "error" | null>>({});

  async function testerPort(iface: Interface) {
    if (iface.type === "fichier") return;
    setStatuses(s => ({ ...s, [iface.id]: "checking" }));
    try {
      const r = await fetch(iface.url, { signal: AbortSignal.timeout(3000), mode: "no-cors" });
      setStatuses(s => ({ ...s, [iface.id]: "ok" }));
    } catch {
      setStatuses(s => ({ ...s, [iface.id]: "error" }));
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Monitor className="w-7 h-7 text-blue-400" />
            Interfaces
          </h2>
          <p className="text-slate-400 mt-1 text-sm">
            {INTERFACES.filter(i => i.status === "actif").length} actives ·{" "}
            {INTERFACES.length} au total — créées par Clawdbot Prime ⚡
          </p>
        </div>
        <button
          onClick={() => INTERFACES.forEach(i => testerPort(i))}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Tout tester
        </button>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {INTERFACES.map(iface => {
          const Icon = iface.icon;
          const typeCfg = TYPE_CONFIG[iface.type];
          const statusCfg = STATUS_CONFIG[iface.status];
          const StatusIcon = statusCfg.icon;
          const pingStatus = statuses[iface.id];

          return (
            <div key={iface.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
              {/* Top */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${iface.couleur} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-white text-base">{iface.nom}</span>
                      <span className="text-xs font-medium px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                        {iface.badge}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{iface.description}</p>
                  </div>
                </div>

                {/* URL + Status */}
                <div className="mt-4 flex items-center gap-3">
                  <code className="flex-1 text-xs bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 font-mono truncate">
                    {iface.url}
                  </code>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {pingStatus === "checking" && (
                      <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                    )}
                    {pingStatus === "ok" && (
                      <span className="text-xs text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />OK</span>
                    )}
                    {pingStatus === "error" && (
                      <span className="text-xs text-red-400 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" />Erreur</span>
                    )}
                    <StatusIcon className={cn("w-4 h-4", statusCfg.class)} />
                  </div>
                </div>
              </div>

              {/* Fonctionnalités */}
              <div className="border-t border-slate-800 px-5 py-4 flex-1">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Fonctionnalités</h4>
                <ul className="grid grid-cols-1 gap-1">
                  {iface.fonctionnalités.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-violet-400 mt-0.5 flex-shrink-0">›</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack + Note */}
              <div className="border-t border-slate-800 px-5 py-3 bg-slate-950/50 space-y-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {iface.techStack.map(tech => (
                    <span key={tech} className={cn("text-xs px-2 py-0.5 rounded-md border", typeCfg.class)}>
                      {tech}
                    </span>
                  ))}
                </div>
                {iface.note && (
                  <p className="text-xs text-slate-500 flex items-start gap-1.5">
                    <Info className="w-3 h-3 flex-shrink-0 mt-0.5 text-slate-600" />
                    {iface.note}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-slate-800 px-5 py-3 flex gap-2">
                <a
                  href={iface.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-600/30 text-violet-400 hover:text-violet-300 rounded-lg text-xs font-medium transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Ouvrir
                </a>
                {iface.type !== "fichier" && (
                  <button
                    onClick={() => testerPort(iface)}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-medium transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Ping
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
