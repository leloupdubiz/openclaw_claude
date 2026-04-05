"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Clock, Zap, AlertTriangle, CheckCircle2, XCircle,
  Shield, Target, Bot, Lock,
  PauseCircle, ChevronDown, ChevronRight, GitBranch
} from "lucide-react";

// ─── CRON JOBS ────────────────────────────────────────────────────────────────
const CRONS = [
  {
    id: "disk-watchdog",
    name: "Disk Watchdog",
    schedule: "Toutes les 30 min",
    icon: "🖥️",
    status: "ok",
    model: "claude-haiku",
    lastRun: "28 min ago",
    nextRun: "dans 2 min",
    category: "system",
    description: "Mesure espace disque. Alerte Discord < 3 GB. Arrêt gateway < 1 GB.",
    rules: ["< 3 GB → kill whisper/megadl + alerte Discord", "< 1 GB → openclaw gateway stop + alerte critique", "> 3 GB → NO_REPLY silencieux"],
  },
  {
    id: "autonomous-executor",
    name: "Autonomous Executor",
    schedule: "Toutes les 4h",
    icon: "⚡",
    status: "error",
    model: "claude-sonnet",
    lastRun: "3h ago",
    nextRun: "dans 1h",
    category: "ops",
    description: "Exécute les tâches P1/P2 sans intervention humaine. Lit OKR_TASKS.md, coche les tâches, loggue chaque action, notifie Discord sur livrables significatifs.",
    rules: [
      "Lit OKR_TASKS.md + MEMORY.md en entrée",
      "Exécute P1 → P2 dans l'ordre",
      "1 retry auto avant de marquer ❌ BLOQUÉ",
      "Notifie Discord uniquement sur livrables significatifs",
      "Timeout : 20 min max",
    ],
  },
  {
    id: "tasks-generator",
    name: "Tasks Generator",
    schedule: "Quotidien 07h00 Paris",
    icon: "📋",
    status: "idle",
    model: "claude-sonnet",
    lastRun: "—",
    nextRun: "demain 07h00",
    category: "ops",
    description: "Génère de nouvelles tâches P1/P2 depuis les OKRs. Vérifie les services DOWN. Envoie le brief matinal Discord.",
    rules: [
      "Si tâches P1 < 3 restantes → génère de nouvelles depuis OKRs non atteints",
      "Vérifie services 3000/3001/3002/4242 — restart si DOWN",
      "Recalcule % progression de chaque projet",
      "Discord morning brief : terminé / queue / KRs / bloqueurs",
    ],
  },
  {
    id: "daily-retrospective",
    name: "Daily Retrospective",
    schedule: "Quotidien 08h00 Paris",
    icon: "🌅",
    status: "ok",
    model: "claude-sonnet",
    lastRun: "hier 08h00",
    nextRun: "demain 08h00",
    category: "ops",
    description: "Auto-amélioration quotidienne. Analyse la session de la veille, identifie wins/fails, propose 3 améliorations, met à jour MEMORY.md, envoie rapport Discord.",
    rules: [
      "Lit MEMORY.md + daily log de la veille",
      "Identifie wins, fails, patterns sur plusieurs jours",
      "Propose 3 améliorations actionnables avec impact mesurable",
      "Met à jour MEMORY.md si learning durable",
      "Envoie rapport Discord même si pas de log hier",
    ],
  },
  {
    id: "cro-summaries-missing",
    name: "CRO Summaries Missing",
    schedule: "Quotidien 20h00",
    icon: "📝",
    status: "idle",
    model: "claude-haiku",
    lastRun: "—",
    nextRun: "ce soir 20h00",
    category: "learning",
    description: "Génère les résumés CRO manquants depuis les transcripts. Reload la bibliothèque après.",
    rules: [
      "Lit transcripts dans formations/cro-evolve/transcripts/",
      "Génère résumé structuré FR par transcript manquant",
      "Sauvegarde dans formations/cro-evolve/summaries/",
      "curl POST /api/reload sur la bibliothèque après",
    ],
  },
  {
    id: "playlist-daily-check",
    name: "Playlist Daily Check",
    schedule: "Quotidien 09h00",
    icon: "▶️",
    status: "ok",
    model: "défaut",
    lastRun: "hier 09h00",
    nextRun: "demain 09h00",
    category: "learning",
    description: "Vérifie les nouvelles vidéos de la playlist OpenClaw YouTube. Génère résumé + mise à jour MASTER-SUMMARY.md + notification Discord si nouvelle vidéo.",
    rules: [
      "Lance check_playlist.py → JSON de nouvelles vidéos",
      "Si new_videos vide → NO_REPLY silencieux",
      "Sinon → résumé structuré (Concept + Points Clés + Insights + Application drinknellio.com)",
      "Sauvegarde video-N-summary.md + update INDEX.md + MASTER-SUMMARY.md",
      "Notification Discord si nouvelle vidéo",
    ],
  },
  {
    id: "evolve-weekly",
    name: "EVOLVE Weekly",
    schedule: "Lundi 06h00 Paris",
    icon: "🎯",
    status: "idle",
    model: "claude-sonnet",
    lastRun: "—",
    nextRun: "lundi 06h00",
    category: "evolve",
    description: "Research hebdo DE + mise à jour Angle Bank + rapport optimisation. 3 blocs séquentiels : Market Researcher → Angle Extractor → Performance Analyst.",
    rules: [
      "Bloc 1 Research : 5 axes (verbatims DE / concurrents / études / tendances / Amazon)",
      "Bloc 2 Strategy : APPEND dans ANGLE_BANK_V2.md (ne jamais écraser)",
      "Bloc 3 Optimization : rapport winners/losers + recommandation Batch suivant",
      "Notifie Discord en 1 seul message résumant les 3 blocs",
      "Timeout : 10 min max",
    ],
  },
  {
    id: "playlist-weekly-report",
    name: "Playlist Weekly Report",
    schedule: "Lundi 08h00",
    icon: "📊",
    status: "idle",
    model: "défaut",
    lastRun: "—",
    nextRun: "lundi 08h00",
    category: "learning",
    description: "Rapport hebdomadaire de la playlist OpenClaw. Compte les vidéos traitées, identifie le learning le plus impactant pour drinknellio.com.",
    rules: [
      "Lit INDEX.md pour compter vidéos de la semaine",
      "Identifie learning le plus impactant pour drinknellio.com",
      "Envoie rapport Discord même si 0 nouvelles vidéos",
    ],
  },
];

// ─── BLOCKERS (P0 — humain requis) ───────────────────────────────────────────
const BLOCKERS_P0 = [
  {
    id: "ugc-s1", emoji: "🎬", label: "Tourner vidéo UGC S1 — Der Teufelskreis",
    detail: "Script prêt dans EVOLVE_RESULTS/SCRIPTS_BATCH01.md",
    impact: "Bloque lancement campagne Meta",
  },
  {
    id: "ugc-s2", emoji: "🎬", label: "Tourner vidéo UGC S2 — Das Gedankenkarussell",
    detail: "Script prêt dans EVOLVE_RESULTS/SCRIPTS_BATCH01.md",
    impact: "Bloque lancement campagne Meta",
  },
  {
    id: "ugc-s3", emoji: "🎬", label: "Tourner vidéo UGC S3 — Cortisol nachts",
    detail: "Script prêt dans EVOLVE_RESULTS/SCRIPTS_BATCH01.md",
    impact: "Bloque lancement campagne Meta",
  },
  {
    id: "pixel", emoji: "📡", label: "Vérifier Meta Pixel sur drinknellio.com",
    detail: "Vérifier Purchase / IC / ATC / VC dans Meta Events Manager",
    impact: "Sans pixel = tracking impossible, attribution cassée",
  },
  {
    id: "bm", emoji: "📡", label: "Valider domaine dans Meta Business Manager",
    detail: "Domaine drinknellio.com à vérifier dans BM → Business Settings → Brand Safety",
    impact: "Bloque création des campagnes",
  },
];

// ─── GAPS IDENTIFIÉS ──────────────────────────────────────────────────────────
const GAPS = [
  {
    id: "research-zero", severity: "critical", label: "Research Phase 0 active",
    desc: "Aucune campagne lancée = 0 donnée réelle. Toutes les décisions sont des hypothèses non validées.",
    missing: "Desire Researcher · Ad Library Spy · Data Meta",
    impact: "ROAS potentiellement sous-optimal sans validation marché réelle",
  },
  {
    id: "sub-avatars", severity: "high", label: "Sub-avatars non testés en campagne",
    desc: "15 sub-avatars définis (Sonja/Markus/Julia) mais aucun adset live pour valider les angles.",
    missing: "Campagne Meta active",
    impact: "Ciblage basé sur hypothèses — winner inconnu",
  },
  {
    id: "ecomtalent", severity: "high", label: "15/20 leçons EcomTalent bloquées",
    desc: "Tokens HLS Whop expirés. 5 leçons transcrites, 15 inaccessibles.",
    missing: "Reconnexion Whop pour régénérer tokens HLS",
    impact: "Formation incomplète — frameworks manquants",
  },
  {
    id: "convex", severity: "medium", label: "Convex DB non auto-démarré",
    desc: "npx convex dev requiert auth cloud. Pas de credentials Convex configurés.",
    missing: "npx convex login (action humaine)",
    impact: "Mission Control tourne sans DB Convex — features temps réel limitées",
  },
  {
    id: "roas-monitoring", severity: "medium", label: "Monitoring ROAS absent",
    desc: "Aucun dashboard de performance Meta connecté. Suivi manuel uniquement.",
    missing: "Lancement campagne + connexion API Meta",
    impact: "Scaling aveugle post-lancement",
  },
  {
    id: "omnia-agents", severity: "medium", label: "23/26 agents EVOLVE non testés",
    desc: "3 agents validés (Research Doc, Creative Roadmap, Learnings Storage). 23 restants à tester.",
    missing: "Sessions de test par agent",
    impact: "Pipeline EVOLVE en 1 clic non opérationnel",
  },

];

// ─── TÂCHES BLOQUÉES ──────────────────────────────────────────────────────────
const TASKS_BLOCKED = [
  {
    id: "t1", priority: "P1", label: "Débloquer 15 leçons EcomTalent",
    reason: "Tokens HLS Whop expirés — nécessite reconnexion manuelle",
    action: "Se reconnecter à Whop.com → page EcomTalent → régénérer tokens HLS",
    project: "EcomTalent",
  },
  {
    id: "t2", priority: "P2", label: "LaunchAgent Convex (port 6790)",
    reason: "Convex nécessite auth cloud (npx convex dev) — pas de credentials configurés",
    action: "npx convex login dans mission-control/",
    project: "Mission Control",
  },
  {
    id: "t3", priority: "P1", label: "autonomous-executor — delivery error",
    reason: "Delivery mode 'last' cassé → erreur à chaque exécution",
    action: "Corriger le delivery mode du cron (passer sur 'discord')",
    project: "Automations",
  },
  {
    id: "t4", priority: "P2", label: "Monitoring ROAS Command Center",
    reason: "Post-lancement uniquement — pas de campagne active",
    action: "Attendre lancement campagne Meta → connecter API",
    project: "OMNIA",
  },
  {
    id: "t5", priority: "P2", label: "23 agents EVOLVE restants à tester",
    reason: "Aucune priorité immédiate sans campagne active",
    action: "Session de test dédiée par agent (1 agent = 30 min)",
    project: "OMNIA",
  },
];

// ─── AUTONOMY RULES ───────────────────────────────────────────────────────────
const AUTONOMY_YES = [
  "Lire fichiers, explorer le workspace, analyser",
  "Écrire / mettre à jour la mémoire (MEMORY.md + daily logs)",
  "Corriger un bug évident dans le code existant",
  "Continuer une tâche déjà commencée dans la même direction",
  "Préparer briefs, drafts, analyses",
  "Recherche web pour informer une recommandation",
  "Itérer 1 fois sur un output insuffisant",
  "Restart services DOWN (launchctl)",
  "Créer fichiers dans un projet existant (même direction)",
  "Modifier config/seuils techniques (réversible)",
];

const AUTONOMY_ASK = [
  "Dépenses réelles (ad spend, API calls coûteuses)",
  "Actions irréversibles hors workspace (emails, posts publics)",
  "Changement de direction stratégique (produit, avatar, angle)",
  "Spawner des agents coûteux",
  "Supprimer des fichiers ou données importants",
  "Ambiguïté sur le scope (2 interprétations très différentes)",
  "Tâche > 30 min avec direction non 100% claire",
];

// ─── DIRECTIVES ───────────────────────────────────────────────────────────────
const DIRECTIVES = [
  { icon: "🎯", title: "Performance avant tout", desc: "Chaque recommandation doit impacter ROAS, LTV, ou croissance. Si ça ne scale pas, ça n'existe pas." },
  { icon: "⚡", title: "Direct et structuré", desc: "Jamais de 'Great question!'. Format : Objectif → Analyse → Plan → Action." },
  { icon: "🔍", title: "Investigate before acting", desc: "Explorer les fichiers/contexte avant tout changement. Parallel tool calls autant que possible." },
  { icon: "💾", title: "Si non écrit = n'existe pas", desc: "Toute session sans log daily = mémoire perdue. Chaque output → fichier .md avant de passer au suivant." },
  { icon: "🔴", title: "Jamais de livrable incomplet", desc: "Est-ce directement utilisable sans modification ? Si non → le finir avant de livrer." },
  { icon: "🇩🇪", title: "Allemand pour les créatifs", desc: "Tous les outputs publicitaires, scripts, hooks = Allemand. Dialogue = Français." },
  { icon: "📏", title: "Tâches longues → blocs 10 min", desc: "Toute tâche > 15 min est découpée en blocs de 10 min max avec checkpoint + sauvegarde." },
  { icon: "🔄", title: "Séquence EVOLVE obligatoire", desc: "Research → Avatar → Création → Campagne → Scale. Aucune phase ne peut être sautée." },
];

// ─── OKRs ─────────────────────────────────────────────────────────────────────
const OKRS = [
  {
    id: "o1", label: "O1 — Lancer campagne Meta DE rentable", horizon: "Mars 2026", color: "red",
    krs: [
      { label: "3 vidéos UGC tournées (S1/S2/S3)", done: false, value: "0/3" },
      { label: "Meta Pixel + BM domain validé", done: false, value: "❌" },
      { label: "Campagne CBO €65/j lancée", done: false, value: "❌" },
      { label: "ROAS > 1.5 sur 72h", done: false, value: "❌" },
      { label: "Winner Marksman identifié", done: false, value: "❌" },
    ],
  },
  {
    id: "o2", label: "O2 — Nellio Studio optimisé", horizon: "Mars 2026", color: "green",
    krs: [
      { label: "Batch Generator 3-2-2 frontend", done: true, value: "✅ 27/02" },
      { label: "Export Meta Ads (CSV/JSON)", done: true, value: "✅ 27/02" },
      { label: "Historique localStorage", done: true, value: "✅ 27/02" },
    ],
  },
  {
    id: "o3", label: "O3 — Research continue marché DE", horizon: "Q2 2026", color: "amber",
    krs: [
      { label: "4 semaines research hebdo accumulées", done: false, value: "0/4" },
      { label: "100+ verbatims DE archivés", done: false, value: "45/100" },
      { label: "Angle Bank V2 enrichi (50+ angles)", done: false, value: "30/50" },
    ],
  },
  {
    id: "o4", label: "O4 — OMNIA Creative OS opérationnel", horizon: "Q2 2026", color: "violet",
    krs: [
      { label: "26 agents EVOLVE testés et validés", done: false, value: "3/26" },
      { label: "Pipeline Research→Création→Export en 1 clic", done: false, value: "❌" },
      { label: "10 créatifs générés prêts Meta", done: false, value: "0/10" },
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  ok:      "bg-green-500/10 border-green-500/20 text-green-400",
  error:   "bg-red-500/10 border-red-500/20 text-red-400",
  idle:    "bg-slate-500/10 border-slate-600 text-slate-400",
};

const CATEGORY_COLORS: Record<string, string> = {
  system:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ops:     "bg-violet-500/10 text-violet-400 border-violet-500/20",
  learning:"bg-amber-500/10 text-amber-400 border-amber-500/20",
  evolve:  "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const OKR_COLORS: Record<string, string> = {
  red:    "border-red-500/20 bg-red-500/5",
  green:  "border-green-500/20 bg-green-500/5",
  amber:  "border-amber-500/20 bg-amber-500/5",
  violet: "border-violet-500/20 bg-violet-500/5",
};

const OKR_BADGE: Record<string, string> = {
  red:    "bg-red-500/10 text-red-400 border-red-500/20",
  green:  "bg-green-500/10 text-green-400 border-green-500/20",
  amber:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export function Automations() {
  const [expandedCron, setExpandedCron] = useState<string | null>(null);
  const [expandedOkr, setExpandedOkr] = useState<string | null>("o1");

  const okCount    = CRONS.filter(c => c.status === "ok").length;
  const errorCount = CRONS.filter(c => c.status === "error").length;
  const idleCount  = CRONS.filter(c => c.status === "idle").length;
  const [expandedGap, setExpandedGap] = useState<string | null>(null);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Bot className="w-7 h-7 text-violet-400" />
          Automations & Règles
        </h2>
        <p className="text-slate-400 mt-1 text-sm">Crons actifs · Directives permanentes · OKRs · Règles d'autonomie</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Crons actifs", value: CRONS.length.toString(), sub: "jobs planifiés", icon: Clock, color: "violet" },
          { label: "En bonne santé", value: okCount.toString(), sub: "dernière exéc OK", icon: CheckCircle2, color: "green" },
          { label: "En erreur", value: errorCount.toString(), sub: "à investiguer", icon: XCircle, color: "red" },
          { label: "En attente", value: idleCount.toString(), sub: "jamais exécuté", icon: PauseCircle, color: "slate" },
        ].map(kpi => {
          const Icon = kpi.icon;
          const c = {
            violet: "text-violet-400 bg-violet-400/10 border-violet-500/20",
            green:  "text-green-400 bg-green-400/10 border-green-500/20",
            red:    "text-red-400 bg-red-400/10 border-red-500/20",
            slate:  "text-slate-400 bg-slate-400/10 border-slate-700",
          }[kpi.color];
          return (
            <div key={kpi.label} className={cn("rounded-xl border p-5", c)}>
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

      {/* ── CRONS ── */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-violet-400" />
          Cron Jobs ({CRONS.length})
        </h3>
        <div className="space-y-2">
          {CRONS.map(cron => {
            const isOpen = expandedCron === cron.id;
            return (
              <div key={cron.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 p-4 hover:bg-slate-800/50 transition-colors text-left"
                  onClick={() => setExpandedCron(isOpen ? null : cron.id)}
                >
                  {/* status dot */}
                  <div className={cn("w-2 h-2 rounded-full flex-shrink-0",
                    cron.status === "ok"    ? "bg-green-400 animate-pulse" :
                    cron.status === "error" ? "bg-red-400 animate-pulse" :
                    "bg-slate-600"
                  )} />
                  {/* emoji */}
                  <span className="text-lg flex-shrink-0">{cron.icon}</span>
                  {/* name + schedule */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{cron.name}</p>
                    <p className="text-xs text-slate-500 truncate">{cron.schedule}</p>
                  </div>
                  {/* badges */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border hidden sm:inline-flex", CATEGORY_COLORS[cron.category])}>
                      {cron.category}
                    </span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border", STATUS_COLORS[cron.status])}>
                      {cron.status === "ok" ? "✓ OK" : cron.status === "error" ? "✗ Erreur" : "⏳ Idle"}
                    </span>
                    <span className="text-xs text-slate-600 hidden md:inline">{cron.model}</span>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-800 p-4 space-y-4">
                    {/* timing */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Dernière exécution</p>
                        <p className="text-sm text-slate-200">{cron.lastRun}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Prochaine exécution</p>
                        <p className="text-sm text-slate-200">{cron.nextRun}</p>
                      </div>
                    </div>
                    {/* description */}
                    <div>
                      <p className="text-xs text-slate-500 mb-1.5">Description</p>
                      <p className="text-sm text-slate-300">{cron.description}</p>
                    </div>
                    {/* rules */}
                    <div>
                      <p className="text-xs text-slate-500 mb-2">Règles d'exécution</p>
                      <ul className="space-y-1.5">
                        {cron.rules.map((rule, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="text-violet-500 mt-0.5 flex-shrink-0">→</span>
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* error banner */}
                    {cron.status === "error" && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <p className="text-xs text-red-400">Dernière exécution en erreur — delivery mode "last" cassé. À investiguer.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── OKRs ── */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-orange-400" />
          OKRs actifs
        </h3>
        <div className="space-y-2">
          {OKRS.map(okr => {
            const isOpen = expandedOkr === okr.id;
            const done = okr.krs.filter(k => k.done).length;
            const pct = Math.round((done / okr.krs.length) * 100);
            return (
              <div key={okr.id} className={cn("border rounded-xl overflow-hidden", OKR_COLORS[okr.color])}>
                <button
                  className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left"
                  onClick={() => setExpandedOkr(isOpen ? null : okr.id)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{okr.label}</p>
                    <p className="text-xs text-slate-500">{okr.horizon} · {done}/{okr.krs.length} KRs atteints</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", {
                          "bg-green-500": okr.color === "green",
                          "bg-red-500":   okr.color === "red",
                          "bg-amber-500": okr.color === "amber",
                          "bg-violet-500":okr.color === "violet",
                        })}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border font-mono", OKR_BADGE[okr.color])}>{pct}%</span>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-white/5 p-4">
                    <ul className="space-y-2">
                      {okr.krs.map((kr, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className={cn("w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                            kr.done ? "bg-green-500/20 border border-green-500/30" : "bg-slate-800 border border-slate-700"
                          )}>
                            {kr.done && <span className="text-green-400 text-xs">✓</span>}
                          </div>
                          <span className={cn("text-sm flex-1", kr.done ? "text-slate-300 line-through" : "text-slate-300")}>{kr.label}</span>
                          <span className="text-xs text-slate-500 font-mono">{kr.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Blockers P0 ── */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          Blockers P0 — Action humaine requise ({BLOCKERS_P0.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {BLOCKERS_P0.map(b => (
            <div key={b.id} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{b.emoji}</span>
                <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded">P0</span>
              </div>
              <p className="text-sm font-medium text-white">{b.label}</p>
              <p className="text-xs text-slate-500">{b.detail}</p>
              <div className="flex items-center gap-1.5 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                <p className="text-xs text-red-400/80">{b.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gaps identifiés ── */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5 text-amber-400" />
          Gaps identifiés ({GAPS.length})
        </h3>
        <div className="space-y-2">
          {GAPS.map(gap => {
            const isOpen = expandedGap === gap.id;
            const severityStyle = {
              critical: "border-red-500/30 bg-red-500/5",
              high:     "border-amber-500/30 bg-amber-500/5",
              medium:   "border-yellow-500/20 bg-yellow-500/5",
              low:      "border-slate-600 bg-slate-800/30",
            }[gap.severity];
            const badgeStyle = {
              critical: "bg-red-500/20 text-red-400 border-red-500/30",
              high:     "bg-amber-500/20 text-amber-400 border-amber-500/30",
              medium:   "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
              low:      "bg-slate-700 text-slate-400 border-slate-600",
            }[gap.severity];
            return (
              <div key={gap.id} className={cn("border rounded-xl overflow-hidden", severityStyle)}>
                <button
                  className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left"
                  onClick={() => setExpandedGap(isOpen ? null : gap.id)}
                >
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border font-semibold uppercase flex-shrink-0", badgeStyle)}>
                    {gap.severity}
                  </span>
                  <p className="text-sm font-medium text-white flex-1">{gap.label}</p>
                  {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="border-t border-white/5 p-4 space-y-3">
                    <p className="text-sm text-slate-300">{gap.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-slate-800/60 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Ce qui manque</p>
                        <p className="text-xs text-slate-300">{gap.missing}</p>
                      </div>
                      <div className="bg-slate-800/60 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Impact</p>
                        <p className="text-xs text-slate-300">{gap.impact}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tâches bloquées ── */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-slate-400" />
          Tâches bloquées ({TASKS_BLOCKED.length})
        </h3>
        <div className="space-y-2">
          {TASKS_BLOCKED.map(t => (
            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5",
                  t.priority === "P1" ? "bg-orange-500/20 text-orange-400" : "bg-slate-700 text-slate-400"
                )}>{t.priority}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{t.label}</p>
                    <span className="text-xs text-slate-600 border border-slate-700 px-2 py-0.5 rounded">{t.project}</span>
                  </div>
                  <p className="text-xs text-red-400/70 mt-1">⛔ {t.reason}</p>
                  <p className="text-xs text-slate-500 mt-1">→ {t.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Autonomie + Directives ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Autonomie */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Règles d'autonomie
          </h3>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-xs font-semibold text-green-400 uppercase tracking-wide">J'agis sans demander</p>
            </div>
            <ul className="space-y-1.5">
              {AUTONOMY_YES.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wide">Je demande avant d'agir</p>
            </div>
            <ul className="space-y-1.5">
              {AUTONOMY_ASK.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Directives */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            Directives permanentes
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {DIRECTIVES.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                <span className="text-xl flex-shrink-0">{d.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{d.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
