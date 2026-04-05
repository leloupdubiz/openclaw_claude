"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Rocket, CheckCircle2, Clock, AlertCircle, PauseCircle,
  ChevronDown, ChevronUp, ExternalLink, Target, Calendar,
  TrendingUp, Layers, BookOpen, Cpu, Globe, Zap,
  Film, LayoutDashboard, Youtube, Database
} from "lucide-react";

type Status = "actif" | "terminé" | "en_pause" | "conception";

interface Projet {
  id: string;
  nom: string;
  description: string;
  status: Status;
  priorité: "P0" | "P1" | "P2" | "P3";
  icon: React.ElementType;
  couleur: string;
  progression: number;
  dateInit: string;
  objectif: string;
  tâches: { label: string; fait: boolean; enCours?: boolean }[];
  liens?: { label: string; url: string }[];
  tags: string[];
}

const PROJETS: Projet[] = [
  // ─── P0 — EVOLVE ADS ──────────────────────────────────────────────────────
  {
    id: "evolve-ads",
    nom: "EVOLVE — Batch #1 Marksman",
    description: "Pipeline complet exécuté : Research V2 → Avatars V2 → 50 hooks DE → 3 scripts UGC → Setup Meta CBO €65/j. Seul bloquer : 3 vidéos UGC à tourner.",
    status: "actif",
    priorité: "P0",
    icon: Target,
    couleur: "from-orange-500 to-amber-600",
    progression: 90,
    dateInit: "2026-02-20",
    objectif: "Lancer campagne Meta DE dès réception des 3 vidéos UGC",
    tâches: [
      { label: "Phase 1 — Research V2 (45 verbatims DE + Desire Map)", fait: true },
      { label: "Phase 2 — Avatars V2 (Sonja/Markus/Julia + 15 sub-avatars)", fait: true },
      { label: "Phase 2 — Angle Bank V2 (30 angles, 10 High Priority)", fait: true },
      { label: "Phase 3 — Hook Bank V2 (50 hooks DE natifs)", fait: true },
      { label: "Phase 3 — Scripts Batch #1 (3 scripts UGC 45-60s DE)", fait: true },
      { label: "Phase 3 — Briefs 3-2-2 (12 variantes Meta prêtes)", fait: true },
      { label: "Phase 4 — Campaign Setup (CBO €65/j, 2 adsets, règles auto)", fait: true },
      { label: "🔴 Tourner vidéo UGC S1 — Der Teufelskreis (script prêt)", fait: false, enCours: true },
      { label: "🔴 Tourner vidéo UGC S2 — Das Gedankenkarussell (script prêt)", fait: false },
      { label: "🔴 Tourner vidéo UGC S3 — Cortisol nachts (script prêt)", fait: false },
      { label: "Vérifier Meta Pixel (Purchase/IC/ATC/VC) + domaine BM", fait: false, enCours: true },
      { label: "Lancer campagne Meta Ads Manager", fait: false },
      { label: "Analyse 72h + rapport Marksman", fait: false },
      { label: "Décision Marksman → Sniper (J+14)", fait: false },
    ],
    liens: [
      { label: "Scripts UGC", url: "file:///Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/SCRIPTS_BATCH01.md" },
      { label: "Campaign Setup", url: "file:///Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/CAMPAIGN_SETUP_BATCH01.md" },
      { label: "Pipeline Status", url: "file:///Users/pc2/.openclaw/workspace/EVOLVE_RESULTS/EVOLVE_PIPELINE_STATUS.md" },
    ],
    tags: ["Meta Ads", "Allemand", "EVOLVE", "UGC", "CBO"],
  },
  // ─── P0 — NELLIO STUDIO ───────────────────────────────────────────────────
  {
    id: "nellio-studio",
    nom: "Nellio Studio",
    description: "Générateur de créatifs Meta Ads pour drinknellio.com. Backend Claude (claude-opus-4-5) port 3001. 3 features frontend manquantes. Pas de LaunchAgent → s'éteint au reboot.",
    status: "actif",
    priorité: "P0",
    icon: Zap,
    couleur: "from-pink-500 to-rose-600",
    progression: 62,
    dateInit: "2026-02-20",
    objectif: "Batch Generator 3-2-2 opérationnel → 12 créatifs Meta testables en 1 clic",
    tâches: [
      { label: "UI dark premium self-contained", fait: true },
      { label: "Backend Claude (claude-opus-4-5) port 3001", fait: true },
      { label: "generateScript() + generateImagePrompt() → Anthropic", fait: true },
      { label: "generateBatch() endpoint /api/generate/batch", fait: true },
      { label: "Panel config API key Anthropic (localStorage)", fait: true },
      { label: "Migration complète GPT-4 → Claude", fait: true },
      { label: "🔴 LaunchAgent créer (port 3001 s'éteint au reboot)", fait: false, enCours: true },
      { label: "🔴 Batch Generator UI 3-2-2 (frontend bouton)", fait: false, enCours: true },
      { label: "Historique persistant (localStorage)", fait: false },
      { label: "Export format Meta Ads (.csv / copier-coller)", fait: false },
    ],
    liens: [
      { label: "Nellio Studio (local)", url: "file:///Users/pc2/.openclaw/workspace/nellio-studio/public/index.html" },
      { label: "Backend API (port 3001)", url: "http://localhost:3001/api/health" },
    ],
    tags: ["Meta Ads", "Allemand", "Claude", "Créatifs", "DTC"],
  },
  // ─── P1 — OMNIA ───────────────────────────────────────────────────────────
  {
    id: "omnia-creative-os",
    nom: "OMNIA Creative OS",
    description: "Studio créatif full-stack (port 3002) — génération vidéo (Higgsfield/HeyGen), scripts DE, avatars. Avatars V2 mis à jour (18 avatars, 13 angles). Studio Clip + Multi-Scènes opérationnels.",
    status: "actif",
    priorité: "P1",
    icon: Film,
    couleur: "from-violet-500 to-purple-600",
    progression: 78,
    dateInit: "2026-02-22",
    objectif: "Générer des vidéos UGC DE avec avatars HeyGen + Higgsfield I2V",
    tâches: [
      { label: "Studio Clip — génération T2V (Higgsfield/kie.ai)", fait: true },
      { label: "Studio Clip — génération I2V (Higgsfield)", fait: true },
      { label: "HeyGen talking avatar (92 voix DE, voix NELLO custom)", fait: true },
      { label: "26 agents EVOLVE intégrés dans les prompts système", fait: true },
      { label: "AVATAR_PROFILES V2 — 18 avatars (Sonja/Markus/Julia + 15 SA)", fait: true },
      { label: "ANGLES_MAP V2 — 13 angles High+Medium avec hooks DE", fait: true },
      { label: "Multi-Scènes — génération clip par clip sans FFmpeg auto", fait: true },
      { label: "🟡 kie.ai Sora 2 — cassé (retourne 'image_url is required')", fait: false },
      { label: "🟡 Tester Higgsfield I2V sur S1/S2/S3 (nouveaux scripts)", fait: false, enCours: true },
      { label: "Export batch 12 ads vers Meta Ads Manager", fait: false },
    ],
    liens: [
      { label: "OMNIA Creative OS", url: "http://localhost:3002" },
    ],
    tags: ["Vidéo", "HeyGen", "Higgsfield", "UGC", "OMNIA"],
  },
  // ─── P1 — FORMATION ECOMTALENT ────────────────────────────────────────────
  {
    id: "ecomtalent",
    nom: "Formation EcomTalent (Whop)",
    description: "Formation Meta Ads / E-Commerce. 5/20 leçons transcrites et résumées. 15 leçons bloquées (token HLS expiré — nécessite reconnexion Whop).",
    status: "actif",
    priorité: "P1",
    icon: BookOpen,
    couleur: "from-orange-400 to-amber-500",
    progression: 25,
    dateInit: "2026-02-25",
    objectif: "20/20 leçons transcrites + résumées + intégrées bibliothèque",
    tâches: [
      { label: "Pipeline Whop download + Whisper configuré", fait: true },
      { label: "5 leçons transcrites et résumées (Digital Gold Rush, IA+Psych, CPM/ROAS, Process, Plan 30j)", fait: true },
      { label: "Master summary créé (ECOMTALENT_MASTER.md)", fait: true },
      { label: "Intégration bibliothèque (6 docs, catégorie EcomTalent)", fait: true },
      { label: "🔴 Reconnexion Whop pour régénérer tokens HLS (15 leçons bloquées)", fait: false, enCours: true },
      { label: "15 leçons restantes — transcription Whisper", fait: false },
      { label: "15 résumés restants → intégration bibliothèque", fait: false },
    ],
    liens: [
      { label: "Master Summary", url: "file:///Users/pc2/.openclaw/workspace/formations/whop-ecomtalent/ECOMTALENT_MASTER.md" },
      { label: "Bibliothèque", url: "http://localhost:4242" },
    ],
    tags: ["EcomTalent", "Formation", "Meta Ads", "Whop", "Bibliothèque"],
  },
  // ─── P1 — FORMATION CRO ───────────────────────────────────────────────────
  {
    id: "cro-formation",
    nom: "Formation CRO EVOLVE (Spencer)",
    description: "Formation CRO Spencer (MEGA). 67 transcripts disponibles, 61 résumés générés. Modules 3-8 non encore traités. Pipeline Groq actif mais cron supprimé ce matin.",
    status: "actif",
    priorité: "P1",
    icon: Database,
    couleur: "from-cyan-500 to-teal-600",
    progression: 55,
    dateInit: "2026-02-23",
    objectif: "8 modules complets transcrits + résumés + intégrés bibliothèque",
    tâches: [
      { label: "Module 1 — CRO Basics (4/4 résumés ✅)", fait: true },
      { label: "Module 2 — Why Do Ads Work (6+ résumés ✅)", fait: true },
      { label: "Pipeline Whisper + Groq autonome configuré", fait: true },
      { label: "67 transcripts disponibles dans .openclaw/workspace", fait: true },
      { label: "61 résumés générés dans summaries/", fait: true },
      { label: "🟡 Recréer cron de traitement (supprimé par erreur ce matin)", fait: false, enCours: true },
      { label: "Modules 3-8 : traiter les transcripts restants → résumés", fait: false },
      { label: "Intégration bibliothèque modules 3-8", fait: false },
    ],
    liens: [
      { label: "Summaries CRO", url: "file:///Users/pc2/.openclaw/workspace/formations/cro-evolve/summaries/" },
    ],
    tags: ["CRO", "Formation", "Spencer", "Bibliothèque", "Groq"],
  },
  // ─── P2 — BIBLIOTHÈQUE ────────────────────────────────────────────────────
  {
    id: "bibliotheque",
    nom: "Bibliothèque de Connaissances",
    description: "351 docs indexés, 40 catégories. EVOLVE complet (phases 1-4), EcomTalent, 62 livres, 28 vidéos, formations. Quelques fichiers V1 obsolètes à nettoyer.",
    status: "actif",
    priorité: "P2",
    icon: BookOpen,
    couleur: "from-emerald-500 to-teal-600",
    progression: 88,
    dateInit: "2026-02-22",
    objectif: "Source de vérité unique — tous les livrables EVOLVE accessibles",
    tâches: [
      { label: "62 livres résumés (Hormozi + DTC)", fait: true },
      { label: "28 vidéos playlist OpenClaw", fait: true },
      { label: "Formation EVOLVE Marketing (140 fichiers)", fait: true },
      { label: "EVOLVE Phases 1-4 V2 indexées (9 sections)", fait: true },
      { label: "EcomTalent (6 docs, 2 catégories)", fait: true },
      { label: "Pelegrini, CRO, OMNIA, KB indexés", fait: true },
      { label: "🟡 Nettoyer doublons research_v2/ (fichiers V1 chevauchant V2)", fait: false, enCours: true },
      { label: "Modules CRO 3-8 → intégration quand résumés prêts", fait: false },
      { label: "15 leçons EcomTalent → intégration quand débloquées", fait: false },
    ],
    liens: [
      { label: "Bibliothèque", url: "http://localhost:4242" },
    ],
    tags: ["Bibliothèque", "Connaissances", "EVOLVE", "DTC"],
  },
  // ─── P2 — SAAS OMNIA ──────────────────────────────────────────────────────
  {
    id: "saas-omnia",
    nom: "OMNIA SaaS — Conception",
    description: "SaaS full-stack pour opérateurs DTC. Conception théorique terminée (22KB, 11 sections). Aucun code écrit. Différé jusqu'à validation Nellio Studio + premières données Meta.",
    status: "en_pause",
    priorité: "P2",
    icon: Globe,
    couleur: "from-slate-500 to-slate-600",
    progression: 15,
    dateInit: "2026-02-22",
    objectif: "Build après Nellio Studio validé + premiers winners Meta identifiés",
    tâches: [
      { label: "Conception complète (22KB, 11 sections)", fait: true },
      { label: "Vision + modules + plan 90j documentés", fait: true },
      { label: "⏸️ Code — différé (priorité EVOLVE Batch #1)", fait: false },
      { label: "Architecture backend décidée", fait: false },
      { label: "MVP v0.1 — authentification + dashboard", fait: false },
    ],
    liens: [
      { label: "Conception OMNIA", url: "file:///Users/pc2/.openclaw/workspace/SAAS_OMNIA_CONCEPTION.md" },
    ],
    tags: ["SaaS", "DTC", "Conception", "Différé"],
  },
];

const STATUS_CONFIG = {
  actif:      { label: "Actif",      icon: TrendingUp,   class: "text-green-400 bg-green-400/10 border-green-400/20" },
  terminé:    { label: "Terminé",    icon: CheckCircle2, class: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  en_pause:   { label: "En pause",   icon: PauseCircle,  class: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  conception: { label: "Conception", icon: AlertCircle,  class: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
};

const PRIO_CONFIG = {
  P0: { label: "P0 Bloquant", class: "bg-red-500/15 text-red-400 border-red-500/20" },
  P1: { label: "P1 Business", class: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
  P2: { label: "P2 Valeur",   class: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  P3: { label: "P3 Futur",    class: "bg-slate-500/15 text-slate-400 border-slate-500/20" },
};

const FILTER_OPTIONS: { label: string; value: Status | "tous" }[] = [
  { label: "Tous", value: "tous" },
  { label: "Actifs", value: "actif" },
  { label: "Terminés", value: "terminé" },
  { label: "En pause", value: "en_pause" },
];

export function Projets() {
  const [filtre, setFiltre] = useState<Status | "tous">("tous");
  const [ouvert, setOuvert] = useState<string | null>("nellio-studio");

  const projets = filtre === "tous" ? PROJETS : PROJETS.filter(p => p.status === filtre);
  const enCours = PROJETS.filter(p => p.status === "actif").length;
  const terminés = PROJETS.filter(p => p.status === "terminé").length;
  const avgProgression = Math.round(PROJETS.reduce((s, p) => s + p.progression, 0) / PROJETS.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Rocket className="w-7 h-7 text-violet-400" />
            Projets
          </h2>
          <p className="text-slate-400 mt-1 text-sm">
            {enCours} actifs · {terminés} terminés · {PROJETS.length} au total · progression globale {avgProgression}%
          </p>
        </div>
        <div className="flex gap-2">
          {FILTER_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFiltre(opt.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                filtre === opt.value
                  ? "bg-violet-600/20 text-violet-400 border-violet-600/30"
                  : "text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-200"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Barre progression globale */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Progression globale</span>
          <span className="text-sm font-bold text-white">{avgProgression}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 transition-all duration-700"
            style={{ width: `${avgProgression}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-600">
          <span>Research & Setup</span>
          <span>Création</span>
          <span>Exécution & Scale</span>
        </div>
      </div>

      {/* Liste des projets */}
      <div className="space-y-3">
        {projets.map(projet => {
          const Icon = projet.icon;
          const statusCfg = STATUS_CONFIG[projet.status];
          const prioCfg = PRIO_CONFIG[projet.priorité];
          const StatusIcon = statusCfg.icon;
          const isOpen = ouvert === projet.id;
          const faitCount = projet.tâches.filter(t => t.fait).length;
          const enCoursCount = projet.tâches.filter(t => t.enCours && !t.fait).length;

          return (
            <div key={projet.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              {/* Header projet */}
              <button
                onClick={() => setOuvert(isOpen ? null : projet.id)}
                className="w-full flex items-center gap-4 p-5 hover:bg-slate-800/50 transition-colors text-left"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${projet.couleur} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white">{projet.nom}</span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1", statusCfg.class)}>
                      <StatusIcon className="w-3 h-3" />
                      {statusCfg.label}
                    </span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", prioCfg.class)}>
                      {prioCfg.label}
                    </span>
                    {enCoursCount > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {enCoursCount} en cours
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5 truncate">{projet.description}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-white">{projet.progression}%</div>
                    <div className="text-xs text-slate-500">{faitCount}/{projet.tâches.length} tâches</div>
                  </div>
                  <div className="w-24 hidden sm:block">
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div
                        className={cn(
                          "h-1.5 rounded-full",
                          projet.progression === 100
                            ? "bg-blue-500"
                            : "bg-gradient-to-r from-violet-500 to-blue-500"
                        )}
                        style={{ width: `${projet.progression}%` }}
                      />
                    </div>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>

              {/* Détails */}
              {isOpen && (
                <div className="border-t border-slate-800 p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Objectif</h4>
                      <p className="text-sm text-slate-300">{projet.objectif}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {projet.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {projet.liens && projet.liens.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Accès rapide</h4>
                        <div className="flex flex-col gap-1.5">
                          {projet.liens.map(lien => (
                            <a key={lien.url} href={lien.url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              {lien.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      Initialisé le {projet.dateInit}
                    </div>
                  </div>

                  {/* Tâches */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Tâches ({faitCount}/{projet.tâches.length})
                      </h4>
                      <span className="text-xs text-slate-500">{projet.progression}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all"
                        style={{ width: `${(faitCount / projet.tâches.length) * 100}%` }}
                      />
                    </div>
                    <ul className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                      {projet.tâches.map((tâche, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          {tâche.fait ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : tâche.enCours ? (
                            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={cn(
                            tâche.fait ? "text-slate-500 line-through" :
                            tâche.enCours ? "text-amber-300" :
                            "text-slate-300"
                          )}>
                            {tâche.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
