"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  MessageSquare, Send, Bot, Brain, BarChart2, Search,
  Video, ShoppingCart, TrendingUp, Lock, Circle,
  ChevronRight, Sparkles, Clock, AlertTriangle, Zap
} from "lucide-react";

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
      { role: "agent", content: "Prêt à mapper les désirs dominants du marché allemand pour Nellio UltraCalm. Donne-moi 3 concurrents directs et je commence la surveillance Meta Ad Library.", timestamp: Date.now() - 60000 * 5 },
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
      { role: "agent", content: "En attente du desire_map.md du Market Research. Une fois reçu, je construis les 3 core avatars + 20 sub-avatars pour le marché allemand, puis j'extrais 30-90 angles prioritaires.", timestamp: Date.now() - 60000 * 3 },
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
      { role: "agent", content: "Spécialisé scripts UGC en allemand. Structure par hook : Question-Problème / Choc-Statistique / Identification-Avatar / Promesse-Bénéfice / Curiosité-Gap. Prêt dès que les angles sont définis.", timestamp: Date.now() - 60000 * 7 },
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
      { role: "agent", content: "Structure de test recommandée : 3 campagnes ABO (100€/j chacune) × 2 adsets × 2 ads = 12 créatifs testés simultanément. Kill au bout de 72h si ROAS < seuil.", timestamp: Date.now() - 60000 * 2 },
    ],
  },
  {
    id: "data-analyst",
    nom: "Data Analyst",
    emoji: "📈",
    rôle: "Performance Analyst & Champion Scaler",
    description: "Analyse les résultats des campagnes, identifie winners et losers, documente les learnings dans l'Evolve Growth Guide, orchestre le scale des champions.",
    spécialités: ["Winner/Loser analysis", "Shopify Score (AOV × CVR)", "ROAS attribution multi-touch", "Scaling plan (budget × duplication)", "Evolve Growth Guide"],
    phaseEVOLVE: "Phase 4 — Exécution",
    statut: "conceptuel",
    couleur: "from-green-600 to-emerald-700",
    couleurText: "text-green-400",
    inputRequis: "72h de data post-lancement (Meta + Shopify)",
    outputProduit: "report_72h.md · scaling_plan.md · growth_guide_update.md",
    stubMessages: [
      { role: "agent", content: "KPI de référence pour le marché allemand : Shopify Score cible 250-400 (AOV × CVR). En dessous de 250 → CRO d'abord, pas de scale. Au-dessus de 400 → push budget agressif.", timestamp: Date.now() - 60000 * 10 },
    ],
  },
  {
    id: "cro-funnel",
    nom: "CRO & Funnel",
    emoji: "🛍️",
    rôle: "Conversion Optimizer & Funnel Architect",
    description: "Optimise les landing pages par angle d'ad, le checkout, l'AOV via upsells, et les flows email/SMS post-achat. Basé sur la formation EVOLVE CRO de Spencer.",
    spécialités: ["Ad-Focused CRO (landing pages par avatar)", "PageDeck optimization", "Checkout friction removal", "AOV upsell strategy", "Email flows retention"],
    phaseEVOLVE: "Phase 4+ — CRO & Retention",
    statut: "conceptuel",
    couleur: "from-teal-600 to-cyan-700",
    couleurText: "text-teal-400",
    inputRequis: "Campagnes actives + data Shopify (CVR, AOV, abandonment rate)",
    outputProduit: "lp_audit.md · cro_plan.md · email_flows.md",
    stubMessages: [
      { role: "agent", content: "Formation EVOLVE CRO (Spencer) en cours d'intégration. Module 1 assimilé : Shopify Score = AOV × CVR. PageDeck = outil #1 pour landing pages rapides (code EZA15 -15%). Prêt à auditer drinknellio.com dès que les campagnes sont actives.", timestamp: Date.now() - 60000 * 1 },
    ],
  },
];

const STATUT_CONFIG = {
  actif:     { label: "Actif",      class: "text-green-400 bg-green-400/10 border-green-400/20", dot: "bg-green-400" },
  standby:   { label: "Standby",    class: "text-amber-400 bg-amber-400/10 border-amber-400/20", dot: "bg-amber-400" },
  conceptuel: { label: "Conceptuel", class: "text-slate-400 bg-slate-400/10 border-slate-700",     dot: "bg-slate-600" },
};

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function AgentChats() {
  const [selectedAgent, setSelectedAgent] = useState<string>("market-research");
  const [messages, setMessages] = useState<Record<string, Message[]>>(
    Object.fromEntries(AGENTS.map(a => [a.id, [...a.stubMessages]]))
  );
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agent = AGENTS.find(a => a.id === selectedAgent)!;
  const chatMessages = messages[selectedAgent] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedAgent]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;
    const userMsg: Message = { role: "user", content: input.trim(), timestamp: Date.now() };
    setMessages(prev => ({ ...prev, [selectedAgent]: [...(prev[selectedAgent] || []), userMsg] }));
    setInput("");
    setIsSending(true);

    // Simulated agent response
    await new Promise(r => setTimeout(r, 800));
    const agentMsg: Message = {
      role: "agent",
      content: getAgentResponse(agent, input.trim()),
      timestamp: Date.now(),
    };
    setMessages(prev => ({ ...prev, [selectedAgent]: [...(prev[selectedAgent] || []), agentMsg] }));
    setIsSending(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <MessageSquare className="w-7 h-7 text-violet-400" />
          Agents EVOLVE
        </h2>
        <p className="text-slate-400 mt-1 text-sm">
          6 agents spécialisés · Pipeline Research → Strategy → Création → Exécution
        </p>
      </div>

      {/* Alerte statut conceptuel */}
      <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-300">
          <span className="font-semibold">Agents conceptuels</span> — Prompts mappés dans AGENTS.md. Activation via gateway pairing (chaque agent a son workspace + SOUL.md). Les chats ci-dessous simulent leurs réponses attendues.
        </div>
      </div>

      <div className="flex gap-5 h-[calc(100vh-320px)] min-h-[500px]">
        {/* Sidebar agents */}
        <div className="w-64 flex-shrink-0 space-y-1.5 overflow-y-auto">
          {AGENTS.map(a => {
            const statutCfg = STATUT_CONFIG[a.statut];
            const isSelected = selectedAgent === a.id;
            const unread = (messages[a.id] || []).length;
            return (
              <button
                key={a.id}
                onClick={() => setSelectedAgent(a.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all",
                  isSelected
                    ? "bg-slate-800 border border-slate-700"
                    : "border border-transparent hover:bg-slate-800/60"
                )}
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${a.couleur} flex items-center justify-center text-base flex-shrink-0`}>
                  {a.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-200 truncate">{a.nom}</span>
                    <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", statutCfg.dot)} />
                  </div>
                  <p className="text-xs text-slate-500 truncate">{a.phaseEVOLVE}</p>
                </div>
                {isSelected && <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Chat principal */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          {/* Chat header */}
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
                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-400 border border-violet-600/30">
                  {agent.phaseEVOLVE}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">{agent.rôle}</p>
            </div>
          </div>

          {/* Messages */}
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
                        <Sparkles className="w-3 h-3 text-violet-400 flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-slate-500 font-medium uppercase tracking-wider mb-1">Input requis</p>
                    <p className="text-slate-400 text-xs">{agent.inputRequis}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium uppercase tracking-wider mb-1">Output produit</p>
                    <p className={cn("text-xs font-mono", agent.couleurText)}>{agent.outputProduit}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
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
                    ? "bg-violet-600/30 border border-violet-600/30 text-violet-100"
                    : "bg-slate-800 border border-slate-700 text-slate-200"
                )}>
                  <p>{msg.content}</p>
                  <p className="text-xs opacity-50 mt-1 text-right">{formatTime(msg.timestamp)}</p>
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    ⚡
                  </div>
                )}
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3 justify-start">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${agent.couleur} flex items-center justify-center text-sm flex-shrink-0 mt-0.5`}>
                  {agent.emoji}
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={`Brief pour ${agent.nom}...`}
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-600/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isSending}
                className="p-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 px-1">
              Simulation — agents réels activables via gateway pairing OpenClaw
            </p>
          </div>
        </div>

        {/* Panel infos agent */}
        <div className="w-52 flex-shrink-0 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Pipeline EVOLVE</h4>
            <div className="space-y-2">
              {AGENTS.map((a, i) => {
                const isActive = a.id === selectedAgent;
                const isPast = i < AGENTS.findIndex(ag => ag.id === selectedAgent);
                return (
                  <div key={a.id} className="flex items-center gap-2">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                      isActive ? `bg-gradient-to-br ${a.couleur}` : isPast ? "bg-slate-700" : "bg-slate-800 border border-slate-700"
                    )}>
                      {isPast ? "✓" : i + 1}
                    </div>
                    <span className={cn("text-xs truncate", isActive ? "text-white font-medium" : "text-slate-500")}>
                      {a.nom}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Activation</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-1.5"><Lock className="w-3 h-3 flex-shrink-0 mt-0.5 text-slate-600" />Gateway pairing requis</p>
              <p className="flex items-start gap-1.5"><Zap className="w-3 h-3 flex-shrink-0 mt-0.5 text-slate-600" />Workspace isolé par agent</p>
              <p className="flex items-start gap-1.5"><Clock className="w-3 h-3 flex-shrink-0 mt-0.5 text-slate-600" />SOUL.md + MEMORY.md configurés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAgentResponse(agent: Agent, userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (agent.id === "market-research") {
    if (lower.includes("start") || lower.includes("commenc") || lower.includes("lance"))
      return "Pour démarrer la Phase 1 : j'ai besoin de (1) la liste de 5 concurrents directs sur le marché allemand, (2) les 3-5 keywords Meta Ad Library à surveiller. Je produis un desire_map.md avec les désirs classés par intensité × scope sous 2h.";
    if (lower.includes("concurrent") || lower.includes("competitor"))
      return "Meta Ad Library cibles : rechercher 'beruhigung', 'stress relief', 'magnesium schlaf', 'ashwagandha stress'. Je scanne les 50 dernières créas des tops acteurs et extrait les angles récurrents.";
    return "Prêt à mapper les désirs. Donne-moi les concurrents directs + 72h pour un desire_map complet du marché allemand.";
  }

  if (agent.id === "creative-strategist") {
    if (lower.includes("avatar"))
      return "Core avatar #1 'Berufsstress' (25-40, cadre surmené, Berlin/Munich) : désir = performance calme, not 'se détendre'. Angle → 'Le hack des Top Performers pour rester focus sous pression'. Hook potentiel : '97% des managers qui performent sous stress font ÇA le matin...'";
    if (lower.includes("angle"))
      return "Top 3 angles prioritaires pour Nellio (hypothèse avant research) : 1/ Performance focus (professionnels), 2/ Nuit récupératrice (35-50 ans), 3/ Natural vs pharma (wellness enthusiasts). À valider avec desire_map.";
    return "En attente du desire_map.md pour construire les avatars. En parallèle, je peux préparer la structure du creative_roadmap si tu veux.";
  }

  if (agent.id === "video-script") {
    if (lower.includes("hook") || lower.includes("script"))
      return "Hook type #1 (Choc-Statistique) : '73% der deutschen Manager fühlen sich chronisch gestresst — und die meisten greifen zur falschen Lösung.' | Hook type #2 (Identification) : 'Wenn du abends nicht abschalten kannst... Das hier hat mir geholfen.'";
    if (lower.includes("allemand") || lower.includes("german"))
      return "Exemples hooks en allemand — Pattern Curiosité-Gap : 'Was passiert in deinem Gehirn, wenn du Ashwagandha nimmst? Die Antwort hat mich überrascht.' | Pattern Promesse : 'Wie ich meinen Stresslevel in 14 Tagen um 40% gesenkt habe — ganz natürlich.'";
    return "Prêt à rédiger les hooks et scripts. Donne-moi l'angle prioritaire + l'avatar cible, je produis 10 hooks + 3 scripts UGC en allemand sous 30 min.";
  }

  if (agent.id === "media-buyer") {
    if (lower.includes("budget") || lower.includes("spend"))
      return "Budget test recommandé : 3 campagnes ABO × €100/j = €300/j. Par campagne : 2 adsets × 2 ads = 4 créas. Durée : 72h minimum avant décision. Budget total test : ~€900. Seuil ROAS minimum : 1.5× en semaine 1, 2.5× en semaine 3.";
    if (lower.includes("campagne") || lower.includes("structure"))
      return "Structure 3-2-2 : [Campagne 1 — Avatar Berufsstress] → [Adset A : intérêts stress/performance] + [Adset B : broad 25-40 DE] → [Ad 1 : Hook choc] + [Ad 2 : Hook identification]. × 3 angles = 12 ads au total.";
    return "Structure 3-2-2 prête à configurer. Besoin de : 12 créatifs finaux + audiences validées + pixel installé sur drinknellio.com.";
  }

  if (agent.id === "data-analyst") {
    if (lower.includes("kpi") || lower.includes("métrique"))
      return "KPIs prioritaires semaine 1 : ROAS (cible 1.5+), CPM (€ DE moyen ~€8-15), CTR (cible 1.5%+), CPC (cible <€1), CPA. Shopify Score = AOV × CVR → cible 250-400. Si Score < 250 → fix CRO avant scale.";
    if (lower.includes("winner") || lower.includes("scale"))
      return "Critères champion : ROAS > 2.5× sur 72h consécutives + volume >15 achats. Si confirmé → duplication horizontale (new adsets same creative) + augmentation budget 20%/j max pour éviter disruption algorithme.";
    return "Prêt à analyser dès que les campagnes sont actives. Dashboard KPI configuré sur Shopify Score + ROAS Meta.";
  }

  if (agent.id === "cro-funnel") {
    if (lower.includes("landing") || lower.includes("page"))
      return "Audit landing page drinknellio.com recommandé : 1/ Vitesse (>90 PageSpeed), 2/ Above fold = hook de l'ad, 3/ Social proof visible (4.8/5 · 20K reviews), 4/ CTA unique et répété, 5/ Offre claire avec garantie 45j. PageDeck pour créer des LP par angle.";
    if (lower.includes("shopify") || lower.includes("score") || lower.includes("cvr"))
      return "Shopify Score actuel non mesuré. Pour le calculer : AOV × CVR × 100. Si AOV = €45 et CVR = 2% → Score = 90 (mauvais). Pour atteindre 250 : soit AOV à €65 (upsell) soit CVR à 3.5% (CRO). Les deux = Score 227. Objectif 300+.";
    return "Formation EVOLVE CRO intégrée (Module 1). Ad-Focused CRO = créer une LP par angle d'ad. Prêt à auditer drinknellio.com et proposer les 3 quick wins CRO.";
  }

  return "Brief reçu. Je traite et reviens avec un plan d'action structuré.";
}
