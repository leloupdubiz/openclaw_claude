"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Target, Send, Sparkles, ChevronRight, Clock, AlertTriangle,
  Lock, Zap, Image as ImageIcon, RefreshCw, Copy, CheckCheck,
  Wand2, Users, BookOpen, TrendingUp, MessageSquare, Layers,
  Play, Download
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// SECTION A — PIPELINE AGENTS (ex-AgentChats)
// ═══════════════════════════════════════════════════════════════════

interface Message {
  role: "user" | "agent";
  content: string;
  timestamp: number;
}

interface Agent {
  id: string;
  nom: string;
  emoji: string;
  rôle: string;
  description: string;
  spécialités: string[];
  phaseEVOLVE: string;
  statut: "conceptuel" | "actif" | "standby";
  couleur: string;
  couleurText: string;
  inputRequis: string;
  outputProduit: string;
  stubMessages: Message[];
}

const AGENTS: Agent[] = [
  {
    id: "market-research",
    nom: "Market Research",
    emoji: "🔎",
    rôle: "Desire Researcher & Ad Library Spy",
    description: "Identifie les désirs dominants du marché allemand, analyse la Meta Ad Library des concurrents, et synthétise les insights pour alimenter la stratégie créative.",
    spécialités: ["Desire mapping (intensité × scope)", "Meta Ad Library surveillance", "Review mining (Amazon/Reddit DE)", "Research synthesis"],
    phaseEVOLVE: "Phase 1 — Research",
    statut: "conceptuel",
    couleur: "from-violet-600 to-purple-700",
    couleurText: "text-violet-400",
    inputRequis: "Produit + marché cible + liste concurrents",
    outputProduit: "desire_map.md · competitor_swipe.md · research_consolidated.md",
    stubMessages: [
      { role: "agent", content: "Phase 1 ✅ Complète — 45 verbatims DE, Desire Map V2. Primary desire : 'Durchschlafen und morgens erholt aufwachen' (Score 3D 125/125). Mécanisme vierge #1 : Das 3-Uhr-Signal (réveil cortisol 2-4h, angle inexploité).", timestamp: Date.now() - 60000 * 5 },
    ],
  },
  {
    id: "creative-strategist",
    nom: "Creative Strategist",
    emoji: "🧠",
    rôle: "Avatar Architect & Angle Extractor",
    description: "Construit les core avatars et sub-avatars à partir du desire mapping. Extrait 30-90 angles testables, planifie les batches Marksman/Sniper.",
    spécialités: ["Core avatar building", "Sub-avatar system (15-30)", "Angle extraction (30-90)", "Creative roadmap planning", "5 Awareness Levels mapping"],
    phaseEVOLVE: "Phase 2 — Strategy",
    statut: "conceptuel",
    couleur: "from-blue-600 to-cyan-700",
    couleurText: "text-blue-400",
    inputRequis: "desire_map.md (output Market Research)",
    outputProduit: "avatars_core.md · avatars_sub.md · angle_bank.md · creative_roadmap.md",
    stubMessages: [
      { role: "agent", content: "Phase 2 ✅ Complète — Sonja (Berufsstress, 32), Markus (Erschöpfter Vater, 38), Julia (Wellness-Bewusste, 27). 15 sub-avatars, 30 angles livrés. Top angle Marksman : A1 CORTISOL_MÉCANISME + A2 SCHLAF_CHRONIQUE + A3 IDENTITE_PRO.", timestamp: Date.now() - 60000 * 3 },
    ],
  },
  {
    id: "video-script",
    nom: "Video & Script",
    emoji: "🎥",
    rôle: "Hook Writer & Script Writer",
    description: "Rédige les hooks 3 secondes et les scripts UGC/VSL complets en allemand. Génère 10 hooks par angle prioritaire selon la structure 5-sections.",
    spécialités: ["Hook 3 secondes (5 patterns)", "Scripts UGC 60-120s en allemand", "VSL structure 5-sections", "Briefs créateurs", "Adaptation par avatar"],
    phaseEVOLVE: "Phase 3 — Création",
    statut: "conceptuel",
    couleur: "from-pink-600 to-rose-700",
    couleurText: "text-pink-400",
    inputRequis: "angle_bank.md · avatars_sub.md (output Creative Strategist)",
    outputProduit: "hook_bank.md · scripts_batch_01.md · briefs_batch_01.md",
    stubMessages: [
      { role: "agent", content: "Phase 3 ✅ Complète — 50 hooks DE natifs, 3 scripts UGC 45-60s (S1 Teufelskreis / S2 Gedankenkarussell / S3 Cortisol nachts), 12 briefs 3-2-2 prêts. 🔴 Reste : tourner les 3 vidéos.", timestamp: Date.now() - 60000 * 7 },
    ],
  },
  {
    id: "media-buyer",
    nom: "Media Buyer",
    emoji: "📊",
    rôle: "Campaign Builder & Budget Optimizer",
    description: "Configure les campagnes Meta Ads selon la structure 3-2-2, gère le budget, protège l'ad spend avec des règles automatiques. Orchestre Marksman → Sniper → Scale.",
    spécialités: ["Structure 3-2-2 (12 ads/batch)", "Marksman testing (3 angles larges)", "Sniper deep-dive (winner × 10 hooks)", "Kill Fast Protocol (72h)", "Budget rules & stop-loss"],
    phaseEVOLVE: "Phase 4 — Exécution",
    statut: "conceptuel",
    couleur: "from-orange-600 to-amber-700",
    couleurText: "text-orange-400",
    inputRequis: "scripts_batch_01.md + assets vidéo finalisés",
    outputProduit: "Campagnes Meta live · report_72h.md",
    stubMessages: [
      { role: "agent", content: "Phase 4 ✅ Setup complet — NLO_DE_SALES_20260226, CBO €65/j, 2 adsets (Broad 25-55 DE + Intérêts Wellness/Stress), 12 ads 3-2-2, Stop Loss CPA>€60, Scale ROAS>3×. 🔴 En attente : vidéos UGC + pixel BM.", timestamp: Date.now() - 60000 * 2 },
    ],
  },
  {
    id: "data-analyst",
    nom: "Data Analyst",
    emoji: "📈",
    rôle: "Performance Analyst & Champion Scaler",
    description: "Analyse les résultats des campagnes, identifie winners et losers, documente les learnings dans l'Evolve Growth Guide.",
    spécialités: ["Winner/Loser analysis", "Shopify Score (AOV × CVR)", "ROAS attribution", "Scaling plan", "Evolve Growth Guide"],
    phaseEVOLVE: "Phase 5 — Analyse",
    statut: "conceptuel",
    couleur: "from-green-600 to-emerald-700",
    couleurText: "text-green-400",
    inputRequis: "72h de data post-lancement (Meta + Shopify)",
    outputProduit: "report_72h.md · scaling_plan.md",
    stubMessages: [
      { role: "agent", content: "En attente du lancement campagne. KPIs cibles : Shopify Score 250+ (AOV × CVR), ROAS 1.5× S1, 2.5× S3. Stop Loss : CPA > €60 → pause auto. Champion criteria : ROAS > 3× sur 72h consécutives.", timestamp: Date.now() - 60000 * 10 },
    ],
  },
  {
    id: "cro-funnel",
    nom: "CRO & Funnel",
    emoji: "🛍️",
    rôle: "Conversion Optimizer & Funnel Architect",
    description: "Optimise les landing pages par angle d'ad, le checkout, l'AOV via upsells.",
    spécialités: ["Ad-Focused CRO", "PageDeck optimization", "Checkout friction", "AOV upsell", "Email flows"],
    phaseEVOLVE: "Phase 4+ — CRO",
    statut: "conceptuel",
    couleur: "from-teal-600 to-cyan-700",
    couleurText: "text-teal-400",
    inputRequis: "Campagnes actives + data Shopify",
    outputProduit: "lp_audit.md · cro_plan.md · email_flows.md",
    stubMessages: [
      { role: "agent", content: "Formation EVOLVE CRO intégrée (Module 1-2). Shopify Score = AOV × CVR → cible 250+. PageDeck code EZA15 (-15%). Prêt à auditer drinknellio.com dès que les campagnes sont actives.", timestamp: Date.now() - 60000 * 1 },
    ],
  },
];

const STATUT_CONFIG = {
  actif:      { label: "Actif",       class: "text-green-400 bg-green-400/10 border-green-400/20",  dot: "bg-green-400" },
  standby:    { label: "Standby",     class: "text-amber-400 bg-amber-400/10 border-amber-400/20",  dot: "bg-amber-400" },
  conceptuel: { label: "Conceptuel",  class: "text-slate-400 bg-slate-400/10 border-slate-700",     dot: "bg-slate-600" },
};

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function getAgentResponse(agent: Agent, msg: string): string {
  const l = msg.toLowerCase();
  if (agent.id === "market-research") {
    if (l.includes("desire") || l.includes("primary")) return "Primary Desire V2 confirmé : 'Durchschlafen und morgens erholt aufwachen' — Score 3D 125/125. Scope : 17-20M Allemands (Schlafstörungen chroniques). Entry point recommandé pour cold audience : Desire #2 'Gedankenkarussell stoppen' — pain quotidien le plus conscient.";
    if (l.includes("concurrent") || l.includes("jello")) return "Top concurrent : Jello (trinkjello.com) — formule identique Nellio, lancé 2026, claim '24% cortisol' sans méta-analyse. Opportunité Nellio : contre-positionner sur 45 études / 3800 personnes / -28% cortisol. Stiftung Warentest Oct 2024 = warning Ashwagandha → angle réassurance inexploité.";
    return "Phase 1 ✅. 45 verbatims réels DE, 5 new mechanisms, meta-analyse 2025-2026. Pour relancer la research sur un nouveau produit ou angle, donne-moi le brief.";
  }
  if (agent.id === "creative-strategist") {
    if (l.includes("avatar") || l.includes("sonja")) return "Core Avatars V2 : Sonja (Berufsstress, 32 Munich, 'Ich kann abends nicht abschalten'), Markus (Erschöpfter Vater, 38 Köln, 'Ich schlafe durch, aber ich fühle mich nicht erholt'), Julia (Wellness-Bewusste, 27 Berlin, 'Ich suche natürliche Lösung ohne Chemie'). 15 sub-avatars disponibles.";
    if (l.includes("angle") || l.includes("marksman")) return "Batch #1 Marksman — 3 angles : A1 CORTISOL_MÉCANISME (score 90), A2 SCHLAF_CHRONIQUE (score 85), A3 IDENTITE_PRO (score 80). Top new mechanism vierge : Das 3-Uhr-Signal (réveil 2-4h = pic cortisol). Aucun concurrent ne l'utilise actuellement.";
    return "Phase 2 ✅. Angle Bank V2 avec 30 angles dont 10 High Priority. Creative roadmap prêt pour Batch #1.";
  }
  if (agent.id === "video-script") {
    if (l.includes("hook") || l.includes("s1") || l.includes("teufelskreis")) return "Script S1 'Der Teufelskreis' — Hook : 'Kennst du das? Du liegst im Bett, der Körper ist müde... aber der Kopf dreht sich im Kreis.' Durée : 50s. Avatar : Sonja. Angle : A1 CORTISOL_MÉCANISME. Fichier complet : EVOLVE_RESULTS/SCRIPTS_BATCH01.md";
    if (l.includes("s2") || l.includes("gedanken")) return "Script S2 'Das Gedankenkarussell' — Hook : 'Es ist 23 Uhr. Du schließt die Augen... und sofort fängt dein Kopf an zu rasen.' Durée : 55s. Avatar : Markus. Angle : A2 SCHLAF_CHRONIQUE.";
    return "Phase 3 ✅. 50 hooks DE, 3 scripts UGC, 12 briefs 3-2-2 livrés. La seule étape manquante : filmer les 3 vidéos avec les scripts fournis.";
  }
  if (agent.id === "media-buyer") {
    if (l.includes("budget") || l.includes("cbo")) return "Structure CBO : NLO_DE_SALES_20260226, budget €65/j. Adset A : Broad 25-55 DE (€35/j). Adset B : Intérêts Wellness+Stress DE (€30/j). 3 ads par adset = 6 ads au total (P1 × H1+H2 sur S1+S2+S3). Rules : Stop Loss CPA>€60, Scale +30% si ROAS>3× 2j consécutifs.";
    if (l.includes("règle") || l.includes("rule") || l.includes("stop")) return "Règles automatiques Meta configurées : Stop Loss automatique (CPA > €60 → pause ad), Scale progressif (ROAS > 3× sur 2j → +30% budget), Cap journalier €200 max semaine 1. KPIs 72h : Hook Rate >25%, Hold Rate >40%, CTR >1.5%, CPM <€12 DE.";
    return "Phase 4 setup ✅. Campagne prête à lancer dans Ads Manager. Copy-paste depuis CAMPAIGN_SETUP_BATCH01.md. Seul blocker : vidéos UGC.";
  }
  if (agent.id === "data-analyst") {
    if (l.includes("kpi") || l.includes("score")) return "Shopify Score = AOV × CVR. Si AOV €34.99 et CVR 2% → Score 70 (danger zone). Cible 250+ : soit AOV €50+ (upsell 2-pack) soit CVR 3.5%+ (CRO). Objectif : atteindre Score 300+ avant de scaler.";
    return "En attente des 72h de data post-lancement. Dashboard KPI configuré : ROAS, CPA, Hook Rate, Hold Rate, Shopify Score. Seuil champion : ROAS > 3× sur 72h consécutives.";
  }
  if (agent.id === "cro-funnel") {
    if (l.includes("landing") || l.includes("pagedeck")) return "PageDeck = outil #1 pour LP par angle. Code EZA15 = -15%. Structure LP recommandée : Hero = hook de l'ad, Section 2 = proof social (4.8/5, 20K reviews), Section 3 = mechanism (3-Uhr-Signal), Section 4 = formule + ingrédients, Section 5 = garantie 45j + CTA.";
    return "Prêt à auditer drinknellio.com. Quick wins CRO : 1/ LP dédiée par angle d'ad, 2/ Upsell 2-pack (AOV +43%), 3/ Checkout 1-step. PageDeck pour builder rapidement.";
  }
  return "Brief reçu. Plan d'action en cours.";
}

// ═══════════════════════════════════════════════════════════════════
// SECTION B — GÉNÉRATEUR D'IMAGES AD (ex-Nellio Studio image)
// ═══════════════════════════════════════════════════════════════════

const AVATARS_AD = [
  { id: "sonja",    label: "Sonja — Berufsstress (32)",  desc: "Manager surmenée, Munich" },
  { id: "markus",   label: "Markus — Père épuisé (38)", desc: "Père actif, Cologne" },
  { id: "julia",    label: "Julia — Wellness (27)",      desc: "Consciente bien-être, Berlin" },
  { id: "generic",  label: "Audience large",             desc: "Broad 25-55 DE" },
];

const ANGLES_AD = [
  { id: "cortisol",  label: "CORTISOL_MÉCANISME",  desc: "Das 3-Uhr-Signal / -27.9% cortisol" },
  { id: "schlaf",    label: "SCHLAF_CHRONIQUE",     desc: "Durchschlafen / Gedankenkarussell" },
  { id: "identite",  label: "IDENTITE_PRO",         desc: "High Performer / Stille Energie" },
  { id: "natural",   label: "NATURAL_PROOF",        desc: "Kein Melatonin / 45 études" },
];

const FORMATS_AD = [
  { id: "feed_square",  label: "Feed carré",        spec: "1:1 (1080×1080px)" },
  { id: "story_9_16",   label: "Story/Reels",        spec: "9:16 (1080×1920px)" },
  { id: "feed_4_5",     label: "Feed portrait",      spec: "4:5 (1080×1350px)" },
  { id: "banner",       label: "Bannière texte",     spec: "16:9 (1200×628px)" },
];

const STYLES_AD = [
  { id: "ugc",        label: "UGC Authentique",  desc: "Selfie front-cam, naturel, bruit ambiant" },
  { id: "lifestyle",  label: "Lifestyle Premium",desc: "Appartement moderne, lumière naturelle" },
  { id: "product",    label: "Product Hero",     desc: "Stick-pack packshot, fond minimaliste" },
  { id: "scientific", label: "Scientifique",     desc: "Molécules, graphes, credibility visual" },
];

function buildImagePrompt(avatar: string, angle: string, format: string, style: string, hookText: string): string {
  const avatarData = AVATARS_AD.find(a => a.id === avatar);
  const angleData  = ANGLES_AD.find(a => a.id === angle);
  const formatData = FORMATS_AD.find(f => f.id === format);
  const styleData  = STYLES_AD.find(s => s.id === style);

  const contextMap: Record<string, string> = {
    cortisol:  "cortisol stress biology, brain activity visualization, molecular structure overlay",
    schlaf:    "restless night visualization, dark bedroom with clock showing 3AM, exhausted expression transitioning to peaceful sleep",
    identite:  "professional in modern German city office, calm focus, high performance energy",
    natural:   "natural ingredients flat lay, herbs and powder, clean minimal aesthetic",
  };

  const avatarVisual: Record<string, string> = {
    sonja:   "German woman 30s, professional attire, tired but hopeful expression, Munich apartment background",
    markus:  "German man 35-40, slightly disheveled, dad-fatigue energy, home office setting",
    julia:   "German woman late 20s, wellness aesthetic, clean natural makeup, Berlin loft",
    generic: "diverse German adults 25-55, relatable everyday setting",
  };

  const styleVisual: Record<string, string> = {
    ugc:        "vertical smartphone selfie style, 9:16, raw authentic lighting, no color grading, real person vibe, slight camera shake, conversational energy",
    lifestyle:  "editorial lifestyle photography, natural window light, muted warm tones, aspirational but approachable",
    product:    "product photography hero shot, Nellio UltraCalm raspberry-lemon powder stick-pack (slim tube ~2.5cm×15cm, metallic pink-blue gradient packaging), clean white or dark background, dramatic lighting",
    scientific: "medical-science visual language, data overlay, clean infographic elements, credibility-first aesthetic, white lab-clean background",
  };

  const hookOverlay = hookText
    ? `\n\nTEXT OVERLAY (in German, bold white font, ${format === "story_9_16" ? "top 1/4 of frame" : "lower third"}): "${hookText}"`
    : "";

  return `Midjourney prompt for Meta Ad — ${formatData?.label} (${formatData?.spec})

--

${styleVisual[style]}

SUBJECT: ${avatarVisual[avatar]}

CONTEXT/THEME: ${contextMap[angle] || angleData?.desc}

BRAND ELEMENT: Nellio UltraCalm raspberry-lemon stick-pack visible (slim metallic tube, drinknellio.com branding)

MOOD: Before/after emotional arc — problem (stress, sleeplessness) resolved by Nellio. German premium DTC aesthetic.

META ADS OPTIMIZED: High contrast, instant thumb-stop visual, clear focal point, ${formatData?.spec} ratio${hookOverlay}

--ar ${format === "story_9_16" ? "9:16" : format === "feed_4_5" ? "4:5" : format === "banner" ? "16:9" : "1:1"} --v 6.1 --style raw --q 2`;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION CONFIGS
// ═══════════════════════════════════════════════════════════════════

type EvolveSection = "recherche" | "strategie" | "creation" | "execution" | "optimisation";

const SECTION_CONFIG: Record<EvolveSection, {
  label: string;
  emoji: string;
  color: string;
  colorText: string;
  badge: string;
  description: string;
  agentIds: string[];
}> = {
  recherche: {
    label: "Recherche",
    emoji: "🔍",
    color: "from-violet-600 to-purple-700",
    colorText: "text-violet-400",
    badge: "Phase 1 ✅",
    description: "Desire mapping marché DE · Analyse concurrents Meta Ad Library · Review mining Amazon/Reddit",
    agentIds: ["market-research"],
  },
  strategie: {
    label: "Stratégie",
    emoji: "🧠",
    color: "from-blue-600 to-cyan-700",
    colorText: "text-blue-400",
    badge: "Phase 2 ✅",
    description: "Core avatars + sub-avatars · Extraction 30 angles · Creative roadmap Batch #1",
    agentIds: ["creative-strategist"],
  },
  creation: {
    label: "Création",
    emoji: "🎨",
    color: "from-pink-600 to-rose-700",
    colorText: "text-pink-400",
    badge: "Phase 3 ✅",
    description: "50 hooks DE · 3 scripts UGC 45-60s · 12 briefs 3-2-2 · Générateur image Midjourney",
    agentIds: ["video-script"],
  },
  execution: {
    label: "Exécution",
    emoji: "🚀",
    color: "from-orange-600 to-amber-700",
    colorText: "text-orange-400",
    badge: "Phase 4 ⏳",
    description: "Setup campagne Meta CBO €65/j · 3-2-2 Marksman · Stop Loss + règles automatiques",
    agentIds: ["media-buyer"],
  },
  optimisation: {
    label: "Optimisation",
    emoji: "📈",
    color: "from-green-600 to-teal-700",
    colorText: "text-green-400",
    badge: "Phase 5 ⏳",
    description: "KPIs 72h · Shopify Score · Champion scaling · CRO landing page par angle",
    agentIds: ["data-analyst", "cro-funnel"],
  },
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function Evolve({ section = "recherche" }: { section?: EvolveSection }) {
  const [activeTab, setActiveTab] = useState<"pipeline" | "creation">("pipeline");
  const sectionCfg = SECTION_CONFIG[section];

  // Pipeline state
  const [selectedAgent, setSelectedAgent] = useState("market-research");
  const [messages, setMessages] = useState<Record<string, Message[]>>(
    Object.fromEntries(AGENTS.map(a => [a.id, [...a.stubMessages]]))
  );
  const [chatInput, setChatInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Image gen state
  const [avatar, setAvatar]   = useState("sonja");
  const [angle, setAngle]     = useState("cortisol");
  const [format, setFormat]   = useState("story_9_16");
  const [style, setStyle]     = useState("ugc");
  const [hookText, setHookText] = useState("Wachst du nachts um 3 auf? Dein Cortisol spricht zu dir.");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const agent = AGENTS.find(a => a.id === activeAgent) ?? AGENTS.find(a => a.id === selectedAgent)!;
  const chatMessages = messages[agent?.id ?? selectedAgent] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedAgent]);

  const handleSend = async () => {
    if (!chatInput.trim() || isSending) return;
    const targetAgent = agent?.id ?? selectedAgent;
    const userMsg: Message = { role: "user", content: chatInput.trim(), timestamp: Date.now() };
    setMessages(prev => ({ ...prev, [targetAgent]: [...(prev[targetAgent] || []), userMsg] }));
    setChatInput("");
    setIsSending(true);
    await new Promise(r => setTimeout(r, 700));
    const agentMsg: Message = {
      role: "agent",
      content: getAgentResponse(agent, chatInput.trim()),
      timestamp: Date.now(),
    };
    setMessages(prev => ({ ...prev, [targetAgent]: [...(prev[targetAgent] || []), agentMsg] }));
    setIsSending(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedPrompt("");
    await new Promise(r => setTimeout(r, 600));

    // Try backend first, fallback to local generation
    try {
      const apiKey = typeof window !== "undefined" ? localStorage.getItem("anthropic_api_key") : null;
      if (apiKey) {
        const res = await fetch("http://localhost:3001/api/generate/image-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey },
          body: JSON.stringify({ avatar, angle, format, style, hookText, product: "Nellio UltraCalm", market: "DE" }),
          signal: AbortSignal.timeout(15000),
        });
        if (res.ok) {
          const data = await res.json();
          setGeneratedPrompt(data.prompt || buildImagePrompt(avatar, angle, format, style, hookText));
          setIsGenerating(false);
          return;
        }
      }
    } catch {}

    // Local fallback
    setGeneratedPrompt(buildImagePrompt(avatar, angle, format, style, hookText));
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // For création section, show the image generator tab too
  const showCreationTab = section === "creation";
  const sectionAgents = AGENTS.filter(a => sectionCfg.agentIds.includes(a.id));
  const defaultAgent = sectionAgents[0]?.id ?? selectedAgent;

  // Auto-select the right agent when section changes
  const activeAgent = sectionCfg.agentIds.includes(selectedAgent) ? selectedAgent : defaultAgent;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-2xl">{sectionCfg.emoji}</span>
            EVOLVE — {sectionCfg.label}
          </h2>
          <p className="text-slate-400 mt-1 text-sm">{sectionCfg.description}</p>
        </div>
        <span className={cn(
          "text-xs px-3 py-1.5 rounded-full border font-semibold flex-shrink-0",
          section === "recherche" || section === "strategie" || section === "creation"
            ? "bg-green-600/10 text-green-400 border-green-600/20"
            : "bg-orange-600/10 text-orange-400 border-orange-600/20"
        )}>
          {sectionCfg.badge}
        </span>
      </div>

      {/* Status banner */}
      <div className="flex items-start gap-3 bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
        <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-orange-300">
          <span className="font-semibold">Phases 1-4 complètes ✅</span> — Seul blocker : <span className="text-white font-semibold">3 vidéos UGC à filmer</span> (scripts prêts) + vérification Meta Pixel + BM. Pipeline complet dans <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded">EVOLVE_RESULTS/</code>
        </div>
      </div>

      {/* Sub-tab Création uniquement pour la section création */}
      {showCreationTab && (
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 w-fit">
          {([
            { id: "pipeline", label: "Scripts & Hooks", icon: Target },
            { id: "creation", label: "Image Ad",        icon: ImageIcon },
          ] as const).map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── PIPELINE TAB ── */}
      {(!showCreationTab || activeTab === "pipeline") && activeTab !== "creation" && (
        <div className="flex gap-5 h-[calc(100vh-360px)] min-h-[500px]">
          {/* Agent list — only shown if multiple agents in this section */}
          {sectionAgents.length > 1 && (
          <div className="w-60 flex-shrink-0 space-y-1.5 overflow-y-auto">
            {sectionAgents.map(a => {
              const isSelected = activeAgent === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setSelectedAgent(a.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all",
                    isSelected ? "bg-slate-800 border border-slate-700" : "border border-transparent hover:bg-slate-800/60"
                  )}
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${a.couleur} flex items-center justify-center text-base flex-shrink-0`}>
                    {a.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-slate-200 truncate">{a.nom}</span>
                      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", STATUT_CONFIG[a.statut].dot)} />
                    </div>
                    <p className="text-xs text-slate-500 truncate">{a.phaseEVOLVE}</p>
                  </div>
                  {isSelected && <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
          )}

          {/* Chat */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-slate-800">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.couleur} flex items-center justify-center text-xl flex-shrink-0`}>
                {agent.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-white">{agent.nom}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", STATUT_CONFIG[agent.statut].class)}>
                    {STATUT_CONFIG[agent.statut].label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-600/20 text-orange-400 border border-orange-600/30">
                    {agent.phaseEVOLVE}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{agent.rôle}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Agent info card */}
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
                <p className="text-sm text-slate-300">{agent.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500 font-medium uppercase tracking-wider mb-1">Spécialités</p>
                    <ul className="space-y-0.5">
                      {agent.spécialités.map(s => (
                        <li key={s} className="text-slate-400 flex items-start gap-1.5">
                          <Sparkles className="w-3 h-3 text-orange-400 flex-shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-slate-500 font-medium uppercase tracking-wider mb-1">Input requis</p>
                      <p className="text-slate-400">{agent.inputRequis}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium uppercase tracking-wider mb-1">Output</p>
                      <p className={cn("font-mono", agent.couleurText)}>{agent.outputProduit}</p>
                    </div>
                  </div>
                </div>
              </div>

              {chatMessages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "agent" && (
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${agent.couleur} flex items-center justify-center text-sm flex-shrink-0 mt-0.5`}>
                      {agent.emoji}
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[75%] rounded-xl px-4 py-2.5 text-sm",
                    msg.role === "user"
                      ? "bg-orange-600/20 border border-orange-600/30 text-orange-100"
                      : "bg-slate-800 border border-slate-700 text-slate-200"
                  )}>
                    <p>{msg.content}</p>
                    <p className="text-xs opacity-40 mt-1 text-right">{formatTime(msg.timestamp)}</p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">⚡</div>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="flex gap-3">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${agent.couleur} flex items-center justify-center text-sm`}>
                    {agent.emoji}
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 flex gap-1">
                    {[0, 150, 300].map(d => (
                      <span key={d} className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder={`Brief pour ${agent.nom}...`}
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-600/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!chatInput.trim() || isSending}
                  className="p-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 px-1">Simulation agents EVOLVE — activation via gateway pairing OpenClaw</p>
            </div>
          </div>

          {/* Pipeline sidebar */}
          <div className="w-48 flex-shrink-0 space-y-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Pipeline EVOLVE</h4>
              <div className="space-y-2">
                {AGENTS.map((a, i) => {
                  const isCurrent = sectionCfg.agentIds.includes(a.id);
                  const sectionOrder = ["market-research","creative-strategist","video-script","media-buyer","data-analyst","cro-funnel"];
                  const currentIdx = sectionOrder.indexOf(sectionCfg.agentIds[0]);
                  const agentIdx = sectionOrder.indexOf(a.id);
                  const isPast = agentIdx < currentIdx;
                  return (
                    <div key={a.id} className="flex items-center gap-2">
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                        isCurrent ? `bg-gradient-to-br ${a.couleur}` : isPast ? "bg-slate-700 text-slate-400" : "bg-slate-800 border border-slate-700 text-slate-600"
                      )}>
                        {isPast ? "✓" : i + 1}
                      </div>
                      <span className={cn("text-xs truncate", isCurrent ? "text-white font-medium" : isPast ? "text-slate-400" : "text-slate-600")}>
                        {a.nom}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Statut</h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p className="flex items-start gap-1.5"><Lock className="w-3 h-3 text-slate-600 mt-0.5 flex-shrink-0" />Gateway pairing requis</p>
                <p className="flex items-start gap-1.5"><Zap className="w-3 h-3 text-slate-600 mt-0.5 flex-shrink-0" />Workspace isolé/agent</p>
                <p className="flex items-start gap-1.5"><Clock className="w-3 h-3 text-slate-600 mt-0.5 flex-shrink-0" />SOUL.md + MEMORY.md configurés</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CRÉATION TAB ── */}
      {activeTab === "creation" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Config panel */}
          <div className="space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                <Wand2 className="w-4 h-4 text-pink-400" />
                Générateur Image Ad — Meta DE
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Génère des prompts Midjourney optimisés Meta Ads pour drinknellio.com. Basé sur les avatars V2 et angles EVOLVE Batch #1.
              </p>

              {/* Avatar */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Avatar cible</label>
                <div className="grid grid-cols-2 gap-2">
                  {AVATARS_AD.map(a => (
                    <button
                      key={a.id}
                      onClick={() => setAvatar(a.id)}
                      className={cn(
                        "text-left px-3 py-2.5 rounded-xl border text-xs transition-all",
                        avatar === a.id
                          ? "bg-pink-600/20 border-pink-600/40 text-pink-300"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                      )}
                    >
                      <p className="font-medium">{a.label}</p>
                      <p className="text-slate-500 mt-0.5">{a.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Angle */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Angle créatif</label>
                <div className="grid grid-cols-2 gap-2">
                  {ANGLES_AD.map(a => (
                    <button
                      key={a.id}
                      onClick={() => setAngle(a.id)}
                      className={cn(
                        "text-left px-3 py-2.5 rounded-xl border text-xs transition-all",
                        angle === a.id
                          ? "bg-orange-600/20 border-orange-600/40 text-orange-300"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                      )}
                    >
                      <p className="font-medium">{a.label}</p>
                      <p className="text-slate-500 mt-0.5">{a.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format + Style */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Format</label>
                  <div className="space-y-1.5">
                    {FORMATS_AD.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFormat(f.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg border text-xs transition-all",
                          format === f.id
                            ? "bg-violet-600/20 border-violet-600/40 text-violet-300"
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                        )}
                      >
                        <p className="font-medium">{f.label}</p>
                        <p className="text-slate-500">{f.spec}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Style</label>
                  <div className="space-y-1.5">
                    {STYLES_AD.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg border text-xs transition-all",
                          style === s.id
                            ? "bg-teal-600/20 border-teal-600/40 text-teal-300"
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                        )}
                      >
                        <p className="font-medium">{s.label}</p>
                        <p className="text-slate-500">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hook text */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Hook overlay DE <span className="text-slate-600 font-normal">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={hookText}
                  onChange={e => setHookText(e.target.value)}
                  placeholder="Texte allemand à superposer sur l'image..."
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-600/50 transition-colors"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 disabled:opacity-50 rounded-xl text-white font-semibold text-sm transition-all"
              >
                {isGenerating
                  ? <><RefreshCw className="w-4 h-4 animate-spin" />Génération en cours…</>
                  : <><Wand2 className="w-4 h-4" />Générer le prompt Midjourney</>
                }
              </button>
            </div>

            {/* Config note */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Backend Nellio Studio</h4>
              <p className="text-xs text-slate-500 mb-2">Pour des prompts enrichis via Claude, configurer la clé API :</p>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  placeholder="sk-ant-..."
                  defaultValue={typeof window !== "undefined" ? localStorage.getItem("anthropic_api_key") ?? "" : ""}
                  onChange={e => { if (typeof window !== "undefined") localStorage.setItem("anthropic_api_key", e.target.value); }}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none"
                />
                <span className="text-xs text-slate-600">:3001</span>
              </div>
            </div>
          </div>

          {/* Output panel */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-pink-400" />
                  Prompt généré
                </h3>
                {generatedPrompt && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-all"
                  >
                    {copied ? <><CheckCheck className="w-3.5 h-3.5 text-green-400" />Copié !</> : <><Copy className="w-3.5 h-3.5" />Copier</>}
                  </button>
                )}
              </div>

              {!generatedPrompt && !isGenerating && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                      <Wand2 className="w-6 h-6 text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-500">Configure les options et clique sur Générer</p>
                    <p className="text-xs text-slate-600">Avatar · Angle · Format · Style · Hook DE</p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-pink-400 animate-spin mx-auto" />
                    <p className="text-sm text-slate-400">Construction du prompt optimisé Meta…</p>
                  </div>
                </div>
              )}

              {generatedPrompt && !isGenerating && (
                <div className="flex-1 overflow-y-auto">
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                    {generatedPrompt}
                  </pre>
                </div>
              )}
            </div>

            {/* Quick tips */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Workflow recommandé</h4>
              <ol className="space-y-1.5">
                {[
                  "Choisir l'avatar + angle du Batch #1 Marksman",
                  "Format Story 9:16 pour test cold audience Meta",
                  "Style UGC = meilleur thumb-stop pour DE",
                  "Copier le prompt → Midjourney v6.1",
                  "Combiner avec scripts UGC S1/S2/S3",
                  "Builder brief complet dans BRIEFS_BATCH01.md",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 flex-shrink-0 text-[10px] mt-0.5">{i+1}</span>
                    {tip}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
