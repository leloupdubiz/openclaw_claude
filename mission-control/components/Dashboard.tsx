"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, CheckCircle2, XCircle, Loader2, RefreshCw,
  Target, Zap, AlertTriangle, TrendingUp, Clock, ArrowRight,
  Globe, BookOpen, Server, Film, Database, Rocket, Activity,
  ChevronRight, Circle, BarChart3, Flame
} from "lucide-react";

// ─── Services ────────────────────────────────────────────────────────────────
const SERVICES = [
  { id: "mc",      label: "Mission Control", port: 3000, url: "http://localhost:3000",      color: "blue" },
  { id: "omnia",   label: "OMNIA Studio",    port: 3002, url: "http://localhost:3002",      color: "violet" },
  { id: "library", label: "Bibliothèque",    port: 4242, url: "http://localhost:4242",      color: "amber" },
  { id: "nellio",  label: "Nellio Studio",   port: 3001, url: "http://localhost:3001/api/health", color: "pink" },
  { id: "convex",  label: "Convex DB",       port: 6790, url: "http://127.0.0.1:6790",     color: "slate" },
];

const COLOR_MAP: Record<string, string> = {
  blue:   "text-blue-400 bg-blue-400/10 border-blue-400/20",
  violet: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  amber:  "text-amber-400 bg-amber-400/10 border-amber-400/20",
  pink:   "text-pink-400 bg-pink-400/10 border-pink-400/20",
  slate:  "text-slate-400 bg-slate-400/10 border-slate-700",
};

const DOT_MAP: Record<string, string> = {
  blue: "bg-blue-400", violet: "bg-violet-400", amber: "bg-amber-400",
  pink: "bg-pink-400", slate: "bg-slate-500",
};

// ─── EVOLVE Pipeline ─────────────────────────────────────────────────────────
const EVOLVE_PHASES = [
  { id: "p1", label: "Phase 1 — Research V2",   done: true,  detail: "45 verbatims DE · Desire Map · Mechanisms" },
  { id: "p2", label: "Phase 2 — Avatars V2",    done: true,  detail: "Sonja/Markus/Julia · 15 sub-avatars · 30 angles" },
  { id: "p3", label: "Phase 3 — Création",      done: true,  detail: "50 hooks DE · 3 scripts UGC · 12 briefs 3-2-2" },
  { id: "p4", label: "Phase 4 — Campaign Setup",done: true,  detail: "CBO €65/j · 2 adsets · règles auto" },
  { id: "p4b",label: "Phase 4b — Launch",       done: false, detail: "⏳ Bloqué : 3 vidéos UGC à tourner + Meta BM" },
  { id: "p5", label: "Phase 5 — 72h Analysis",  done: false, detail: "Après lancement campagne" },
];

// ─── Blockers ─────────────────────────────────────────────────────────────────
const BLOCKERS = [
  { id: "ugc",    emoji: "🎬", label: "3 vidéos UGC à tourner",       detail: "S1 Teufelskreis · S2 Gedankenkarussell · S3 Cortisol nachts — scripts prêts", priority: "P0", human: true },
  { id: "pixel",  emoji: "📡", label: "Meta Pixel + BM domain",        detail: "Vérifier Purchase/IC/ATC/VC + domaine dans Business Manager", priority: "P0", human: true },
  { id: "whop",   emoji: "🔐", label: "EcomTalent 15/20 leçons bloquées", detail: "Reconnecter Whop pour régénérer tokens HLS", priority: "P1", human: true },
];

// ─── Projects summary ─────────────────────────────────────────────────────────
const PROJECTS = [
  { id: "evolve",   label: "EVOLVE Ads",     pct: 90, color: "orange",  status: "actif",      icon: Target },
  { id: "nellio",   label: "Nellio Studio",  pct: 62, color: "pink",    status: "actif",      icon: Zap },
  { id: "omnia",    label: "OMNIA Studio",   pct: 78, color: "violet",  status: "actif",      icon: Film },
  { id: "ecom",     label: "EcomTalent",     pct: 25, color: "amber",   status: "en_cours",   icon: BookOpen },
  { id: "cro",      label: "CRO Formation",  pct: 100, color: "teal",   status: "actif",      icon: TrendingUp },
  { id: "library",  label: "Bibliothèque",   pct: 88, color: "green",   status: "actif",      icon: Database },
  { id: "saas",     label: "SAAS OMNIA",     pct: 15, color: "slate",   status: "pausé",      icon: Rocket },
];

const PBAR_MAP: Record<string, string> = {
  orange: "bg-orange-500", pink: "bg-pink-500", violet: "bg-violet-500",
  amber: "bg-amber-500", teal: "bg-teal-500", green: "bg-green-500", slate: "bg-slate-500",
};

type PingStatus = "idle" | "checking" | "ok" | "error";

export function Dashboard() {
  const [pings, setPings] = useState<Record<string, PingStatus>>({});
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  async function checkAll() {
    const next: Record<string, PingStatus> = {};
    SERVICES.forEach(s => { next[s.id] = "checking"; });
    setPings({ ...next });

    await Promise.all(
      SERVICES.map(async svc => {
        try {
          await fetch(svc.url, { signal: AbortSignal.timeout(2500), mode: "no-cors" });
          setPings(p => ({ ...p, [svc.id]: "ok" }));
        } catch {
          setPings(p => ({ ...p, [svc.id]: "error" }));
        }
      })
    );
    setLastChecked(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
  }

  useEffect(() => { checkAll(); }, []);

  const onlineCount = Object.values(pings).filter(v => v === "ok").length;
  const donePhases = EVOLVE_PHASES.filter(p => p.done).length;
  const doneProjects = PROJECTS.filter(p => p.pct === 100).length;

  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <LayoutDashboard className="w-7 h-7 text-blue-400" />
            Command Center
          </h2>
          <p className="text-slate-400 mt-1 text-sm">Vue d'ensemble temps réel — drinknellio.com ⚡</p>
        </div>
        <button
          onClick={checkAll}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-slate-200 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Actualiser
          {lastChecked && <span className="text-slate-600 text-xs">{lastChecked}</span>}
        </button>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Services actifs", value: `${onlineCount}/${SERVICES.length}`,    sub: "localhost", icon: Activity,   color: "blue" },
          { label: "EVOLVE pipeline",  value: `${donePhases}/${EVOLVE_PHASES.length}`,sub: "phases done", icon: Target,    color: "orange" },
          { label: "Blockers actifs",  value: BLOCKERS.length.toString(),             sub: "actions humaines", icon: AlertTriangle, color: "red" },
          { label: "Projets en cours", value: PROJECTS.filter(p=>p.status==="actif").length.toString(), sub: "actifs", icon: Rocket, color: "violet" },
        ].map(kpi => {
          const Icon = kpi.icon;
          const colorClass = {
            blue: "text-blue-400 bg-blue-400/10 border-blue-500/20",
            orange: "text-orange-400 bg-orange-400/10 border-orange-500/20",
            red: "text-red-400 bg-red-400/10 border-red-500/20",
            violet: "text-violet-400 bg-violet-400/10 border-violet-500/20",
          }[kpi.color];
          return (
            <div key={kpi.label} className={cn("rounded-xl border p-5", colorClass)}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium opacity-70">{kpi.label}</p>
                  <p className="text-3xl font-bold mt-1">{kpi.value}</p>
                  <p className="text-xs opacity-50 mt-0.5">{kpi.sub}</p>
                </div>
                <Icon className="w-5 h-5 opacity-60" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Services */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-400" />
              Services locaux
            </h3>
            <span className="text-xs text-slate-500">{onlineCount}/{SERVICES.length} en ligne</span>
          </div>
          <div className="space-y-2.5">
            {SERVICES.map(svc => {
              const status = pings[svc.id] ?? "idle";
              return (
                <div key={svc.id} className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    status === "checking" ? "bg-slate-500 animate-pulse" :
                    status === "ok"       ? `${DOT_MAP[svc.color]} animate-pulse` :
                    status === "error"    ? "bg-red-500" : "bg-slate-600"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 truncate">{svc.label}</p>
                    <p className="text-xs text-slate-600">:{svc.port}</p>
                  </div>
                  <div className={cn("text-xs px-2 py-0.5 rounded-md border flex-shrink-0", COLOR_MAP[svc.color])}>
                    {status === "checking" ? <Loader2 className="w-3 h-3 animate-spin" /> :
                     status === "ok"       ? "✓ OK" :
                     status === "error"    ? "✗ Off" : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* EVOLVE Pipeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              EVOLVE Batch #1
            </h3>
            <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full">
              90% — Bloqué
            </span>
          </div>
          <div className="space-y-2.5">
            {EVOLVE_PHASES.map((phase, i) => (
              <div key={phase.id} className="flex items-start gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5",
                  phase.done
                    ? "bg-green-500/20 border border-green-500/30 text-green-400"
                    : "bg-slate-800 border border-slate-700 text-slate-500"
                )}>
                  {phase.done ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium truncate", phase.done ? "text-slate-200" : "text-slate-500")}>
                    {phase.label}
                  </p>
                  <p className="text-xs text-slate-600 truncate">{phase.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockers */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Blockers humains
            </h3>
            <span className="text-xs text-red-400">{BLOCKERS.length} actifs</span>
          </div>
          <div className="space-y-3">
            {BLOCKERS.map(b => (
              <div key={b.id} className={cn(
                "rounded-xl border p-3",
                b.priority === "P0"
                  ? "bg-red-500/5 border-red-500/20"
                  : "bg-amber-500/5 border-amber-500/20"
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{b.emoji}</span>
                  <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded",
                    b.priority === "P0" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                  )}>{b.priority}</span>
                  <span className="text-sm font-medium text-white truncate">{b.label}</span>
                </div>
                <p className="text-xs text-slate-500 ml-7">{b.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-slate-800/60 border border-slate-700 rounded-xl">
            <p className="text-xs text-slate-400">
              ✅ Tout le reste est <span className="text-green-400 font-medium">prêt</span> — pipeline EVOLVE complet, scripts prêts, campagne configurée. <span className="text-white font-medium">3 vidéos = lancement.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Projects Bar ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-violet-400" />
          Progression projets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map(proj => {
            const Icon = proj.icon;
            const barColor = PBAR_MAP[proj.color] ?? "bg-slate-500";
            return (
              <div key={proj.id} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-sm text-slate-200 truncate">{proj.label}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex-shrink-0">{proj.pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", barColor)}
                    style={{ width: `${proj.pct}%` }}
                  />
                </div>
                <div className={cn("text-xs",
                  proj.status === "actif" ? "text-green-400" :
                  proj.status === "pausé" ? "text-slate-500" : "text-amber-400"
                )}>
                  {proj.status === "actif" ? "● Actif" : proj.status === "pausé" ? "⏸ Pausé" : "◌ En cours"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
