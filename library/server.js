const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4242;
const WORKSPACE = path.resolve(__dirname, '..');
const RESUMES_DIR = path.join(WORKSPACE, 'books', 'resumes');
const PLAYLIST_DIR = path.join(WORKSPACE, 'playlist-openclaw');

// ─── CATALOGUE STATIQUE (non-livres) ────────────────────────────────────────
const STATIC_CATALOG = [
  // ── EVOLVE MARKETING — Parent ──────────────────────────────────────────────
  {
    category: "🎯 EVOLVE MARKETING",
    color: "#6366f1",
    isParent: true,
    docs: []
  },
  {
    category: "📋 Synthèses de Formation EVOLVE",
    color: "#6366f1",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-executive-summary", title: "EVOLVE : Executive Summary", subtitle: "Synthèse stratégique globale", tags: ["EVOLVE","Meta Ads","Stratégie"], file: "EVOLVE_EXECUTIVE_SUMMARY.md", icon: "🎯" },
      { id: "evolve-deep-analysis",     title: "EVOLVE : Analyse Approfondie", subtitle: "Décryptage des 13 modules", tags: ["EVOLVE","Frameworks","DTC"], file: "EVOLVE_DEEP_ANALYSIS.md", icon: "🔬" },
      { id: "evolve-agents-map",        title: "EVOLVE : Carte des 20+ Agents", subtitle: "Architecture multi-agents complète", tags: ["EVOLVE","Agents","Automation"], file: "EVOLVE_AGENTS_MAP.md", icon: "🗺️" }
    ]
  },
  {
    category: "🔍 Phase 1 — Desire Research",
    color: "#818cf8",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-desire-map",               title: "Desire Map",                  subtitle: "Désirs dominants marché DE", tags: ["EVOLVE","Research","Desires"], file: "EVOLVE_RESULTS/desire_map.md", icon: "🧠" },
      { id: "evolve-web-research-de",          title: "Web Research DE",             subtitle: "Recherche terrain marché allemand", tags: ["EVOLVE","Research","Allemagne"], file: "EVOLVE_RESULTS/web_research_DE.md", icon: "🌐" },
      { id: "evolve-objections-map",           title: "Objections Map",              subtitle: "Objections clients identifiées", tags: ["EVOLVE","Research","Objections"], file: "EVOLVE_RESULTS/objections_map.md", icon: "🚧" },
      { id: "evolve-competitor-swipe",         title: "Competitor Swipe File",       subtitle: "Analyse ads concurrents", tags: ["EVOLVE","Concurrents","Ads"], file: "EVOLVE_RESULTS/competitor_swipe.md", icon: "🕵️" },
      { id: "evolve-competitor-deep-analysis", title: "Competitor Deep Analysis",    subtitle: "Analyse concurrentielle approfondie", tags: ["EVOLVE","Concurrents"], file: "EVOLVE_RESULTS/competitor_deep_analysis.md", icon: "📊" },
      { id: "evolve-research-phase1-complete", title: "Research Phase 1 — Rapport",  subtitle: "Rapport complet Phase 1", tags: ["EVOLVE","Research","Rapport"], file: "EVOLVE_RESULTS/RESEARCH_PHASE1_COMPLETE.md", icon: "✅" }
    ]
  },
  {
    category: "🧬 Phase 2 — Avatars & Angles",
    color: "#a78bfa",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-avatars-core",        title: "Core Avatars",              subtitle: "4 core avatars + 19 sub-avatars", tags: ["EVOLVE","Avatars","Stratégie"], file: "EVOLVE_RESULTS/avatars_core.md", icon: "👥" },
      { id: "evolve-avatar-insights",     title: "Avatar Insights",           subtitle: "Insights profonds par avatar", tags: ["EVOLVE","Avatars","Insights"], file: "EVOLVE_RESULTS/avatar_insights.md", icon: "💡" },
      { id: "evolve-buzzwords-de",        title: "Buzzwords DE",              subtitle: "Mots-clés puissants en allemand", tags: ["EVOLVE","Copywriting","Allemand"], file: "EVOLVE_RESULTS/buzzwords_DE.md", icon: "🔑" },
      { id: "evolve-angle-bank-complete", title: "Angle Bank Complet",        subtitle: "40 angles — pipeline Spencer désir→comportement→gap→angle", tags: ["EVOLVE","Angles","Stratégie"], file: "EVOLVE_RESULTS/angle_bank_complete.md", icon: "🎯" },
      { id: "evolve-awareness-mapping",   title: "Awareness Mapping",         subtitle: "19 sub-avatars × 5 niveaux d'awareness — type d'ad par persona", tags: ["EVOLVE","Awareness","Avatars"], file: "EVOLVE_RESULTS/awareness_mapping.md", icon: "🧭" }
    ]
  },
  {
    category: "📊 Audit & Stratégie Créative",
    color: "#f59e0b",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-audit-complet",         title: "Audit Complet Phase 1 & 2", subtitle: "Gaps identifiés, erreurs agents, plan d'action", tags: ["EVOLVE","Audit","Strategy"], file: "EVOLVE_RESULTS/AUDIT_COMPLET_PHASE1_PHASE2.md", icon: "🔍" },
      { id: "evolve-market-sophistication", title: "Market Sophistication DE",  subtitle: "Marché Stage 3-4 — angles saturés vs différenciateurs Nellio", tags: ["EVOLVE","Market","Sophistication"], file: "EVOLVE_RESULTS/market_sophistication.md", icon: "📡" },
      { id: "evolve-youtube-research-de",   title: "YouTube & Google Research DE", subtitle: "Intent recherche + verbatims Reddit + solutions alternatives", tags: ["EVOLVE","Research","YouTube"], file: "EVOLVE_RESULTS/youtube_research_DE.md", icon: "🎬" },
      { id: "evolve-creative-roadmap",      title: "Creative Roadmap Batch #1", subtitle: "Marksman 3 créatifs × 3-2-2 = 12 ads — structure complète prête", tags: ["EVOLVE","Creative","Roadmap"], file: "EVOLVE_RESULTS/creative_roadmap.md", icon: "🗺️" }
    ]
  },
  // ── Phase 2 V2 — Avatars & Angles (nouveaux fichiers 2026-02-26) ──────────
  {
    category: "🧬 Phase 2 V2 — Avatars & Angles (2026-02-26)",
    color: "#a78bfa",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-avatars-core-v2",   title: "Core Avatars V2",       subtitle: "Sonja / Markus / Julia — 3 avatars ancrés verbatims réels", tags: ["EVOLVE","Avatars","V2"], file: "EVOLVE_RESULTS/AVATARS_CORE_V2.md", icon: "👥" },
      { id: "evolve-sub-avatars-v2",    title: "Sub-Avatars V2",         subtitle: "15 sub-avatars (5 par core avatar) — hooks DE compacts", tags: ["EVOLVE","Avatars","Sub"], file: "EVOLVE_RESULTS/SUB_AVATARS_V2.md", icon: "🔬" },
      { id: "evolve-angle-bank-v2",     title: "Angle Bank V2",          subtitle: "30 angles — 10 High / 10 Medium / 10 Low + hooks DE natifs", tags: ["EVOLVE","Angles","V2"], file: "EVOLVE_RESULTS/ANGLE_BANK_V2.md", icon: "🎯" }
    ]
  },
  // ── Phase 3 — Création Batch #1 ─────────────────────────────────────────
  {
    category: "🎨 Phase 3 — Création Batch #1",
    color: "#ec4899",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-hook-bank-v2",      title: "Hook Bank V2",            subtitle: "50 hooks DE — 5 types × 10 angles High Priority", tags: ["EVOLVE","Hooks","DE"], file: "EVOLVE_RESULTS/HOOK_BANK_V2.md", icon: "🎣" },
      { id: "evolve-scripts-batch01",   title: "Scripts Batch #1",        subtitle: "3 scripts UGC DE complets 45-60s (Teufelskreis / Gedankenkarussell / Cortisol)", tags: ["EVOLVE","Scripts","UGC","DE"], file: "EVOLVE_RESULTS/SCRIPTS_BATCH01.md", icon: "🎬" },
      { id: "evolve-briefs-batch01",    title: "Briefs 3-2-2 Batch #1",   subtitle: "12 variantes — 2 body copies × 2 headlines × 3 scripts", tags: ["EVOLVE","Briefs","3-2-2"], file: "EVOLVE_RESULTS/BRIEFS_BATCH01.md", icon: "📋" }
    ]
  },
  // ── Phase 4 — Setup Campagne Meta ────────────────────────────────────────
  {
    category: "🚀 Phase 4 — Setup Campagne Meta",
    color: "#0ea5e9",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-campaign-setup",    title: "Campaign Setup Batch #1", subtitle: "Structure CBO €65/j, 2 adsets, naming, claims Meta-compliant, règles auto", tags: ["EVOLVE","Meta Ads","Campaign"], file: "EVOLVE_RESULTS/CAMPAIGN_SETUP_BATCH01.md", icon: "📊" },
      { id: "evolve-pipeline-status",   title: "Pipeline Status",         subtitle: "Suivi complet EVOLVE — phases 1→4 ✅, lancement ⏳", tags: ["EVOLVE","Pipeline","Status"], file: "EVOLVE_RESULTS/EVOLVE_PIPELINE_STATUS.md", icon: "🗺️" }
    ]
  },
  // ── Research V2 ──────────────────────────────────────────────────────────
  {
    category: "🔍 Research V2 — Desire Map (2026-02-26)",
    color: "#6ee7b7",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-verbatims-v2",      title: "Verbatims Raw V2",        subtitle: "45 verbatims réels DE (Reddit, forums santé, Amazon)", tags: ["EVOLVE","Research","Verbatims"], file: "EVOLVE_RESULTS/research_v2/VERBATIMS_RAW.md", icon: "💬" },
      { id: "evolve-desire-map-v2",     title: "Desire Map V2",           subtitle: "Top 5 desires scorés — Primary: Durchschlafen (93/125)", tags: ["EVOLVE","Research","Desires"], file: "EVOLVE_RESULTS/research_v2/DESIRE_MAP_V2.md", icon: "🧠" },
      { id: "evolve-new-mechanisms-v2", title: "New Mechanisms V2",       subtitle: "5 mécanismes inexploités + hooks DE (Cortisolabend-Spike, 3-Uhr-Signal...)", tags: ["EVOLVE","Mécanismes","Science"], file: "EVOLVE_RESULTS/research_v2/NEW_MECHANISMS.md", icon: "🔬" },
      { id: "evolve-new-info-v2",       title: "New Information V2",      subtitle: "5 insights marché (Stiftung Warentest, Mintel, concurrents)", tags: ["EVOLVE","Research","Insights"], file: "EVOLVE_RESULTS/research_v2/NEW_INFORMATION.md", icon: "📡" },
      { id: "evolve-research-doc-v2",   title: "Research Doc Officiel V2", subtitle: "Research Document EVOLVE complet", tags: ["EVOLVE","Research","Doc"], file: "EVOLVE_RESULTS/research_v2/RESEARCH_DOC_V2.md", icon: "📄" }
    ]
  },
  {
    category: "🗃️ Handoffs & Protocoles",
    color: "#c4b5fd",
    parentCategory: "🎯 EVOLVE MARKETING",
    docs: [
      { id: "evolve-handoff-protocol",      title: "Handoff Protocol",       subtitle: "Protocole inter-agents EVOLVE", tags: ["EVOLVE","Agents","Process"], file: "EVOLVE_RESULTS/HANDOFF_PROTOCOL.md", icon: "🔄" },
      { id: "evolve-self-onboarding",       title: "Self Onboarding (Drive)", subtitle: "Doc produit importé Google Drive", tags: ["EVOLVE","Produit","Nellio"], file: "EVOLVE_RESULTS/self_onboarding.md", icon: "📥" },
      { id: "evolve-drive-synthesis",       title: "Drive Synthesis",         subtitle: "Synthèse docs Google Drive", tags: ["EVOLVE","Research","Nellio"], file: "EVOLVE_RESULTS/drive_synthesis.md", icon: "📁" },
      { id: "evolve-master-doc",            title: "Master Document",         subtitle: "Document maître rempli", tags: ["EVOLVE","Research","Master"], file: "EVOLVE_RESULTS/master_document_filled.md", icon: "📓" }
    ]
  },
  {
    category: "🏗️ Stratégie & Knowledge Base",
    color: "#10b981",
    docs: [
      { id: "saas-omnia", title: "OMNIA SaaS — Conception", subtitle: "Vision, modules, plan 90 jours", tags: ["SaaS","Conception","DTC"], file: "SAAS_OMNIA_CONCEPTION.md", icon: "🚀" },
      { id: "kb-ecommerce", title: "KB : E-Commerce", subtitle: "Fondamentaux DTC, acquisition, rétention", tags: ["E-Commerce","DTC","KB"], file: "KB_ECOMMERCE.md", icon: "🛍️" },
      { id: "kb-advertising", title: "KB : Advertising", subtitle: "Meta Ads, créatifs, scaling, ROAS", tags: ["Meta Ads","Publicité","KB"], file: "KB_ADVERTISING.md", icon: "📊" },
      { id: "kb-architecture", title: "KB : Architecture", subtitle: "Stack, systèmes, automatisation", tags: ["Tech","Architecture","KB"], file: "KB_ARCHITECTURE.md", icon: "⚙️" }
    ]
  },
  // ── ECOMTALENT — Formation Ads (Whop) ─────────────────────────────────────
  ...getEcomTalentCatalog(),
  {
    category: "🎩 Pelegrini — Stratégie E-Commerce",
    color: "#f43f5e",
    docs: [
      {
        id: "pelegrini-part1",
        title: "Stratégie E-Com Part. 1 — Mindset, Produit & Funnel",
        subtitle: "+25M€ en 2025 · Mindset · Produit Winner · Copywriting · Recherche Marketing",
        tags: ["Pelegrini","Mindset","Produit","Copywriting","Funnel","Meta Ads"],
        file: "formations/pelegrini-strategie/pelegrini-part1-mindset-produit-funnel.md",
        icon: "🧠",
        source_url: "https://x.com/mpellegrini7/status/2026165905236099498"
      },
      {
        id: "pelegrini-part2",
        title: "Stratégie E-Com Part. 2 — Meta Ads & Scaling",
        subtitle: "+25M€ en 2025 · CBO Testing · Andromeda 2026 · CONDOR · 100K/day",
        tags: ["Pelegrini","Meta Ads","Scaling","CBO","Andromeda","CONDOR"],
        file: "formations/pelegrini-strategie/pelegrini-part2-meta-ads-scaling.md",
        icon: "🚀",
        source_url: "https://x.com/mpellegrini7/status/2026171913870115102"
      }
    ]
  }
];

// ─── MÉTADONNÉES LIVRES ───────────────────────────────────────────────────────
const BOOK_METADATA = {
  1:  { icon: "📘", tags: ["Copywriting","Classique","CRITICAL"], priority: "🔴" },
  2:  { icon: "📗", tags: ["Publicité","Copywriting","Classique"], priority: "🔴" },
  3:  { icon: "💰", tags: ["Offres","Hormozi","Business"], priority: "🔴" },
  4:  { icon: "🧠", tags: ["Psychologie","Copywriting","Persuasion"], priority: "🔴" },
  5:  { icon: "🎯", tags: ["Copywriting","Leads","Direct Response"], priority: "🔴" },
  6:  { icon: "✍️", tags: ["Copywriting","Sales Letter"], priority: "🟡" },
  7:  { icon: "📜", tags: ["Copywriting","Classique","Email"], priority: "🟡" },
  8:  { icon: "📰", tags: ["Copywriting","Ads","Sugarman"], priority: "🟡" },
  9:  { icon: "🏦", tags: ["Monétisation","Hormozi","Business Models"], priority: "🟡" },
  10: { icon: "🔗", tags: ["Leads","Acquisition","Hormozi"], priority: "🟡" },
  11: { icon: "📣", tags: ["Advertising","Hormozi","Playbook"], priority: "🟡" },
  12: { icon: "🤝", tags: ["Sales","Closing","Hormozi"], priority: "🟠" },
  13: { icon: "📓", tags: ["Journal","Hormozi"], priority: "🟠" },
  14: { icon: "📂", tags: ["Chapitres","Hormozi"], priority: "🟠" },
  15: { icon: "🏷️", tags: ["Branding","Hormozi","Playbook"], priority: "🟠" },
  16: { icon: "💼", tags: ["Closing","Sales","Hormozi"], priority: "🟠" },
  17: { icon: "⚡", tags: ["Cash","Rapide","Hormozi"], priority: "🟠" },
  18: { icon: "🏆", tags: ["Ads","Créatifs","Hormozi"], priority: "🟠" },
  19: { icon: "🪝", tags: ["Hooks","Copywriting","Hormozi"], priority: "🟠" },
  20: { icon: "💌", tags: ["Lead Nurture","Email","Hormozi"], priority: "🟠" },
  21: { icon: "♾️", tags: ["LTV","Rétention","Hormozi"], priority: "🟠" },
  22: { icon: "🤖", tags: ["Marketing","Automation","Hormozi"], priority: "🟠" },
  23: { icon: "📈", tags: ["Pricing","Augmentation","Hormozi"], priority: "🟠" },
  24: { icon: "💲", tags: ["Pricing","Stratégie","Hormozi"], priority: "🟠" },
  25: { icon: "✅", tags: ["Preuve","Sociale","Hormozi"], priority: "🟠" },
  26: { icon: "🔄", tags: ["Rétention","Clients","Hormozi"], priority: "🟠" },
  27: { icon: "🗺️", tags: ["Scaling","Roadmap","Hormozi"], priority: "🟠" },
  28: { icon: "💸", tags: ["Copywriting","7 Figures"], priority: "🟠" },
  29: { icon: "💵", tags: ["Sales","Persuasion"], priority: "🟠" },
  30: { icon: "🌐", tags: ["Funnels","Brunson","DotCom"], priority: "🟠" },
  31: { icon: "🧘", tags: ["Psychologie","Mindset","Maltz"], priority: "🟠" },
  32: { icon: "🎨", tags: ["Créativité","Inspiration"], priority: "🟠" },
  33: { icon: "🎭", tags: ["Persuasion","Manipulation"], priority: "🟠" },
  34: { icon: "📝", tags: ["Sales Letter","Dan Kennedy"], priority: "🟠" },
  35: { icon: "🎰", tags: ["Sales","Probabilité"], priority: "🟠" },
  36: { icon: "🤖", tags: ["IA","Copywriting","Claude"], priority: "🟠" },
  37: { icon: "😶", tags: ["Passive Income","Faceless"], priority: "🟠" },
  38: { icon: "📋", tags: ["Marketing","Aide-Mémoire"], priority: "🟠" },
  39: { icon: "🖤", tags: ["Affiliation","Hormozi"], priority: "🟠" },
  40: { icon: "👩‍💼", tags: ["Scaling","Leila Hormozi"], priority: "🟠" },
  41: { icon: "🚀", tags: ["Funnel","Launch","Registration"], priority: "📋" },
  42: { icon: "👑", tags: ["Funnel","VIP","Upgrade"], priority: "📋" },
  43: { icon: "🙏", tags: ["Funnel","Thank You","Pages"], priority: "📋" },
  44: { icon: "📊", tags: ["Analytics","Recap","Launch"], priority: "📋" },
  45: { icon: "📓", tags: ["Journal","Hormozi","Daily"], priority: "📋" },
  46: { icon: "📂", tags: ["Chapitres perdus","Hormozi"], priority: "📋" },
  47: { icon: "🏗️", tags: ["Scaling","Stage 0","Foundation"], priority: "📈" },
  48: { icon: "🔬", tags: ["Scaling","Stage 1","Validation"], priority: "📈" },
  49: { icon: "🌱", tags: ["Scaling","Stage 2","Growth"], priority: "📈" },
  50: { icon: "⚙️", tags: ["Scaling","Stage 3","Systems"], priority: "📈" },
  51: { icon: "📈", tags: ["Scaling","Stage 4","Scale"], priority: "📈" },
  52: { icon: "🎯", tags: ["Scaling","Stage 5","Optimization"], priority: "📈" },
  53: { icon: "🌍", tags: ["Scaling","Stage 6","Expansion"], priority: "📈" },
  54: { icon: "👑", tags: ["Scaling","Stage 7","Dominance"], priority: "📈" },
  55: { icon: "🏛️", tags: ["Scaling","Stage 8","Legacy"], priority: "📈" },
  56: { icon: "🏰", tags: ["Scaling","Stage 9","Empire"], priority: "📈" },
  57: { icon: "🖥️", tags: ["Landing Page","Templates","CRO"], priority: "🛠️" },
  58: { icon: "🎬", tags: ["VSL","Scripts","Vidéo"], priority: "🛠️" },
  59: { icon: "📋", tags: ["SOPs","Opérations","Process"], priority: "🛠️" },
  60: { icon: "✅", tags: ["Checklists","Templates"], priority: "🛠️" },
  61: { icon: "🔀", tags: ["Funnel","Architecture","Avancé"], priority: "🛠️" },
  62: { icon: "📁", tags: ["Swipe File","Références","Inspiration"], priority: "🛠️" },
};

// ─── MÉTADONNÉES VIDÉOS PLAYLIST ─────────────────────────────────────────────
const VIDEO_METADATA = {
  1:  { icon: "🎓", tags: ["Cours Complet","Setup","OpenClaw"], priority: "🔴" },
  2:  { icon: "🆕", tags: ["Update","Features","OpenClaw"], priority: "🟡" },
  3:  { icon: "🦙", tags: ["GLM","Ollama","Local LLM"], priority: "🟡" },
  4:  { icon: "⚡", tags: ["Update","Features","OpenClaw"], priority: "🟡" },
  5:  { icon: "🏗️", tags: ["Mission Control","Multi-Agents","Teams"], priority: "🔴" },
  6:  { icon: "🤖", tags: ["Automation","Build","Workflows"], priority: "🔴" },
  7:  { icon: "🧠", tags: ["Claude Sonnet","Build","Projects"], priority: "🟡" },
  8:  { icon: "🚀", tags: ["Claude Sonnet","OpenClaw","Productivité"], priority: "🟡" },
  9:  { icon: "💡", tags: ["Tips","Optimisation","Skills"], priority: "🔴" },
  10: { icon: "💰", tags: ["Agents","Monétisation","$1M"], priority: "🔴" },
  11: { icon: "📘", tags: ["Cours Complet","Setup","Voice","Memory"], priority: "🔴" },
  12: { icon: "⚠️", tags: ["Tips Critiques","Priorité","Action"], priority: "🔴" },
  13: { icon: "⚡", tags: ["Use Cases","Productivité","5 Tips"], priority: "🔴" },
  14: { icon: "🔬", tags: ["Claude Sonnet","Analyse","Model"], priority: "🟡" },
  15: { icon: "⏱️", tags: ["Synthèse","100h","Leçons"], priority: "🔴" },
  16: { icon: "💸", tags: ["Investissement","$20K","Setup"], priority: "🟡" },
  17: { icon: "🏆", tags: ["Claude Opus","ClawdBot","Upgrade"], priority: "🟡" },
  18: { icon: "🎯", tags: ["6 Use Cases","Productivité","Vie"], priority: "🔴" },
  19: { icon: "🚫", tags: ["Sécurité","Anti-VPS","Local"], priority: "🔴" },
  20: { icon: "🤯", tags: ["ClawdBot","Use Cases","5 Tips"], priority: "🔴" },
  21: { icon: "📈", tags: ["ClawdBot","10x","Amélioration"], priority: "🔴" },
  22: { icon: "💰", tags: ["Coût","Cheap","Optimisation"], priority: "🔴" },
  23: { icon: "🖥️", tags: ["Mac Mini","Hardware","Local"], priority: "🟡" },
  24: { icon: "🦞", tags: ["ClawdBot","Setup","Guide"], priority: "🟡" },
  25: { icon: "💵", tags: ["Claude Code","$500K","Success"], priority: "🔴" },
  26: { icon: "⚡", tags: ["Claude Code","Workflow","10x"], priority: "🔴" },
  27: { icon: "🤝", tags: ["Claude Code","Cowork","Tutorial"], priority: "🔴" },
  28: { icon: "🎯", tags: ["Prompting","Claude Code","Méthode"], priority: "🔴" },
};

// ─── DONNÉES VIDÉOS PAR CHAÎNE ────────────────────────────────────────────────
const CHANNEL_DATA = [
  {
    channel: "Julian Goldie SEO",
    icon: "🎙️",
    color: "#6366f1",
    videos: [
      { n: 1,  title: "OpenClaw AI FULL 6 Hour Course" },
      { n: 2,  title: "New FREE OpenClaw Update!" },
      { n: 3,  title: "FREE OpenClaw: GLM 4.7 Flash + Ollama" },
      { n: 4,  title: "NEW OpenClaw Update is INSANE!" },
      { n: 5,  title: "Mission Control + Agent Teams" },
      { n: 6,  title: "Build and Automate ANYTHING!" },
      { n: 7,  title: "Build ANYTHING With Claude Sonnet 4.6!" },
      { n: 8,  title: "Claude Sonnet 4.6 + OpenClaw is INSANE!" },
      { n: 9,  title: "Make OpenClaw 10X Better in 1 Click!" },
    ]
  },
  {
    channel: "Florian Darroman",
    icon: "🧑‍💻",
    color: "#f59e0b",
    videos: [
      { n: 10, title: "AI Agents Army to Make $1M/year" },
    ]
  },
  {
    channel: "Tech With Tim",
    icon: "🖥️",
    color: "#10b981",
    videos: [
      { n: 11, title: "OpenClaw Full Course: Setup, Skills, Voice, Memory" },
    ]
  },
  {
    channel: "Alex Finn",
    icon: "⚡",
    color: "#a855f7",
    videos: [
      { n: 12, title: "You NEED to do this with OpenClaw immediately!" },
      { n: 13, title: "5 OpenClaw Use Cases — Productivity MACHINE" },
      { n: 14, title: "Claude Sonnet 4.6 — Greatest Model for OpenClaw?" },
      { n: 15, title: "100 Hours of OpenClaw Lessons in 35 Minutes" },
      { n: 16, title: "I Just Spent $20,000 on OpenClaw. Here's Why..." },
      { n: 17, title: "Claude Opus 4.6 — MASSIVE Upgrade for ClawdBot" },
      { n: 18, title: "6 OpenClaw Use Cases That Will Change Your Life" },
      { n: 19, title: "DO NOT Use a VPS for OpenClaw (Major Warning)" },
      { n: 20, title: "5 Insane ClawdBot Use Cases" },
      { n: 21, title: "Make ClawdBot 10x Better (5 Easy Steps)" },
      { n: 22, title: "Run ClawdBot for DIRT CHEAP" },
      { n: 23, title: "You NEED a Mac Mini for ClawdBot" },
      { n: 24, title: "ClawdBot Is the Most Powerful AI Tool" },
      { n: 25, title: "How I Made $500,000 with Claude Code" },
      { n: 26, title: "The Greatest Claude Code Workflow Ever" },
      { n: 27, title: "Claude Cowork: Beginner to Expert in 18 Minutes" },
      { n: 28, title: "You're Prompting Claude Code Wrong" },
    ]
  },
  {
    channel: "AI UGC & Ads",
    icon: "🎯",
    color: "#ec4899",
    videos: [
      { n: 118, title: "How to Make AI UGC Ads in 2026: Sora 2, Claude and the Full Workflow" },
    ]
  }
];

// ─── CHARGEMENT DYNAMIQUE PLAYLIST YOUTUBE (par chaîne) ──────────────────────
function buildPlaylistCatalog() {
  const result = [];

  for (const ch of CHANNEL_DATA) {
    const docs = [];

    // Cours 5 use cases rattaché à Alex Finn (vidéo source = #13)
    if (ch.channel === 'Alex Finn') {
      docs.push({
        id: 'openclaw-5-usecases',
        title: '5 Use Cases OpenClaw — Cours Complet',
        subtitle: 'Guide structuré — 320 lignes',
        tags: ['OpenClaw', 'Productivité', 'Prompts', 'Cours'],
        file: 'cours_openclaw_5_usecases.md',
        icon: '📘',
        priority: '🔴',
        exists: true,
        isCourse: true
      });
    }

    for (const v of ch.videos) {
      const pad = String(v.n).padStart(2, '0');
      const filename = `video-${pad}-summary.md`;
      const filepath = path.join(PLAYLIST_DIR, filename);
      const meta = VIDEO_METADATA[v.n] || { icon: '🎬', tags: ['OpenClaw'], priority: '🟡' };
      const exists = fs.existsSync(filepath);
      let lines = 0;
      if (exists) {
        try { lines = fs.readFileSync(filepath, 'utf8').split('\n').length; } catch (e) {}
      }
      docs.push({
        id: `video-${pad}`,
        num: v.n,
        title: v.title,
        subtitle: `Résumé vidéo #${v.n}`,
        tags: meta.tags,
        file: `playlist-openclaw/${filename}`,
        icon: meta.icon,
        priority: meta.priority,
        exists,
        lines,
        isStub: lines < 10
      });
    }

    result.push({
      category: `${ch.icon} ${ch.channel}`,
      color: ch.color,
      parentCategory: "📺 YouTube — Playlist OpenClaw",
      docs
    });
  }

  return result;
}

// ─── CHARGEMENT DYNAMIQUE DES 62 LIVRES ────────────────────────────────────
function buildBookCatalog() {
  const files = fs.readdirSync(RESUMES_DIR).filter(f => f.endsWith('.md')).sort();
  const allBooks = [];

  for (const filename of files) {
    const filepath = path.join(RESUMES_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split('\n');
    const titleLine = lines[0] || '';
    const m = titleLine.match(/^## (\d+)\. (.+)$/);
    if (!m) continue;

    const num = parseInt(m[1]);
    const raw = m[2].trim();
    let title, author;
    if (raw.includes(' - ')) {
      const parts = raw.split(' - ', 2);
      title = parts[0].trim();
      author = parts[1].trim();
    } else {
      title = raw;
      author = '—';
    }

    const meta = BOOK_METADATA[num] || { icon: '📄', tags: [], priority: '—' };
    const isStub = lines.length < 15;

    allBooks.push({
      id: `book-${String(num).padStart(2, '0')}`,
      num,
      title,
      author,
      subtitle: author !== '—' ? `par ${author}` : 'Document de référence',
      tags: meta.tags,
      file: `books/resumes/${filename}`,
      icon: meta.icon,
      priority: meta.priority,
      isStub,
      lines: lines.length,
      exists: true
    });
  }

  // Sous-catégories
  const subcats = [
    {
      category: "📚 Classiques du Copywriting",
      color: "#f59e0b",
      filter: b => b.num >= 1 && b.num <= 11
    },
    {
      category: "📋 Playbooks & Références Hormozi",
      color: "#fb923c",
      filter: b => b.num >= 12 && b.num <= 40
    },
    {
      category: "🚀 Book Launch — $100M Money Models",
      color: "#e879f9",
      filter: b => b.num >= 41 && b.num <= 46
    },
    {
      category: "📈 Scaling Roadmap — 9 Stages",
      color: "#34d399",
      filter: b => b.num >= 47 && b.num <= 56
    },
    {
      category: "🛠️ Collections & Templates",
      color: "#60a5fa",
      filter: b => b.num >= 57 && b.num <= 62
    }
  ];

  return subcats.map(sub => ({
    category: sub.category,
    color: sub.color,
    docs: allBooks.filter(sub.filter)
  }));
}

// ─── CATALOGUE CRO EVOLVE ─────────────────────────────────────────────────────
const CRO_DIR = path.join(WORKSPACE, 'formations', 'cro-evolve', 'summaries');
const CRO_MODULES = {
  '01': { name: 'CRO Basics',              icon: '🏗️', color: '#ef4444' },
  '02': { name: 'CRO Research',            icon: '🔍', color: '#f97316' },
  '03': { name: 'CRO Landing Pages',       icon: '📄', color: '#eab308' },
  '04': { name: 'CRO Testing',             icon: '🧪', color: '#22c55e' },
  '05': { name: 'CRO Ongoing',             icon: '🔄', color: '#14b8a6' },
  '06': { name: 'CRO Customer Feedback',   icon: '💬', color: '#3b82f6' },
  '07': { name: 'CRO Heatmaps',            icon: '🗺️', color: '#8b5cf6' },
  '08': { name: 'CRO Sales Optimizations', icon: '💰', color: '#ec4899' },
};

function slugToTitle(slug) {
  return slug
    .replace(/^m\d+-\d+-/, '')
    .replace(/---/g, ' — ')
    .replace(/-+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bCro\b/g, 'CRO')
    .replace(/\bMeta\b/g, 'Meta')
    .replace(/\bA B\b/g, 'A/B')
    .replace(/\bSeo\b/g, 'SEO')
    .trim();
}

// ─── CATALOGUE DAVIE FOGARTY ─────────────────────────────────────────────────
const FOGARTY_DIR = path.join(WORKSPACE, 'formations', 'davie-fogarty', 'summaries');

function buildDavieFogartyCatalog() {
  if (!fs.existsSync(FOGARTY_DIR)) return [];

  const files = fs.readdirSync(FOGARTY_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('RETRY'))
    .sort();

  const totalDocs = files.length;
  if (totalDocs === 0) return [];

  const docs = files.map(file => {
    const videoId = file.split('-')[0];
    const titleSlug = file.replace(/^[^-]+-/, '').replace('.md', '');
    const title = titleSlug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    return {
      id: `fogarty-${videoId}`,
      title,
      subtitle: `🎯 Davie Fogarty · $500M Oodie Founder · https://youtube.com/watch?v=${videoId}`,
      tags: ['Davie Fogarty', 'Oodie', 'E-commerce', 'DTC', 'Shopify', 'Meta Ads'],
      file: `formations/davie-fogarty/summaries/${file}`,
      icon: '🛍️',
      exists: true
    };
  });

  return [{
    category: `📚 Davie Fogarty — $500M Oodie Founder (${totalDocs} résumés)`,
    color: '#f97316',
    docs
  }];
}

function buildCROCatalog() {
  if (!fs.existsSync(CRO_DIR)) return [];

  const files = fs.readdirSync(CRO_DIR).filter(f => f.endsWith('.md')).sort();
  const totalDocs = files.length;

  // Carte unique plate — tous modules M01-M08 réunis
  const docs = files.map(file => {
    const match = file.match(/^m(\d+)-(\d+)-/);
    const modKey  = match ? match[1] : '01';
    const vidNum  = match ? match[2] : '00';
    const mod     = CRO_MODULES[modKey] || { name: `Module ${modKey}`, icon: '📖', color: '#6b7280' };
    const id      = `cro-${file.replace('.md', '')}`;
    const title   = slugToTitle(file.replace('.md', ''));
    return {
      id,
      title,
      subtitle: `${mod.icon} M${modKey} · ${mod.name} · Vidéo ${vidNum}`,
      tags: ['CRO', 'EVOLVE', mod.name],
      file: `formations/cro-evolve/summaries/${file}`,
      icon: mod.icon,
      exists: true
    };
  });

  return [{
    category: `🎓 EVOLVE CRO — Formation Complète (${totalDocs} résumés)`,
    color: '#6366f1',
    docs
  }];
}

// ─── CATALOGUE AI UGC MARKETING MANIA ────────────────────────────────────────
const MANIA_DIR = path.join(WORKSPACE, 'formations', 'ugc-ai-system');
const MANIA_MODULES = {
  '01': { name: 'Foundation Mindset',                        icon: '🧠', color: '#f59e0b' },
  '02': { name: 'Finding & Analyzing Reference Videos',      icon: '🔍', color: '#f97316' },
  '03': { name: 'Video Analysis & Script Extraction',        icon: '📝', color: '#10b981' },
  '04': { name: 'Prompt Refinement with Claude',             icon: '🤖', color: '#3b82f6' },
  '05': { name: 'The Production Pipeline',                   icon: '🎬', color: '#8b5cf6' },
};

function buildMarketingManiaCatalog() {
  if (!fs.existsSync(MANIA_DIR)) return [];

  const allDocs = [];

  // Résumé global en premier
  allDocs.push({
    id: 'mania-summary',
    title: 'Anti-Slop AI UGC System — Synthèse',
    subtitle: '⚡ Synthèse globale · Pipeline complet',
    tags: ['UGC','IA','kie.ai','Sora','Marketing Mania'],
    file: 'formations/ugc-ai-system/SUMMARY.md',
    icon: '⚡',
    exists: true
  });

  // Modules 01-05
  for (const [modKey, mod] of Object.entries(MANIA_MODULES).sort()) {
    const files = fs.readdirSync(MANIA_DIR)
      .filter(f => f.startsWith(modKey + '-Module') && f.endsWith('.txt'));
    for (const file of files) {
      allDocs.push({
        id: `mania-m${modKey}`,
        title: `M${modKey} — ${mod.name}`,
        subtitle: `${mod.icon} Module ${modKey} · AI UGC Mania`,
        tags: ['UGC','IA','Marketing Mania', mod.name],
        file: `formations/ugc-ai-system/${file}`,
        icon: mod.icon,
        exists: true
      });
    }
  }

  // Ressources bonus (prompts templates)
  const bonusFiles = fs.readdirSync(MANIA_DIR)
    .filter(f => f.endsWith('.txt') && !f.match(/^\d{2}-Module/) && f !== '00-Group Buy.txt')
    .sort();
  for (const file of bonusFiles) {
    const name = file.replace(/^\d+-/, '').replace('.txt', '');
    allDocs.push({
      id: `mania-bonus-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: name,
      subtitle: '📄 Template · Prompt Sora',
      tags: ['UGC','Templates','Prompts','Sora'],
      file: `formations/ugc-ai-system/${file}`,
      icon: '📄',
      exists: true
    });
  }

  return [{
    category: `🎬 AI UGC Marketing Mania (${allDocs.length} ressources)`,
    color: '#f59e0b',
    docs: allDocs
  }];
}

// ─── CATALOGUE EVOLVE MARKETING (summaries auto-découverts) ──────────────────
const EVOLVE_MKT_SUMMARIES = path.join(WORKSPACE, 'formations', 'evolve-marketing', 'summaries');
const EVOLVE_MKT_MODULES = {
  '02': { name: 'Why Do Ads Work',           icon: '🧠', color: '#6366f1' },
  '03': { name: 'What Ads To Make',          icon: '🔍', color: '#8b5cf6' },
  '04': { name: 'How To Create Avatars',     icon: '🧍', color: '#a78bfa' },
  '05': { name: 'How To Plan Ads',           icon: '📋', color: '#7c3aed' },
  '06': { name: 'How To Make Ads',           icon: '🎨', color: '#4f46e5' },
  '07': { name: 'How To Get UGC',            icon: '🚶', color: '#4338ca' },
  '08': { name: 'How To Run Ads',            icon: '🏃', color: '#3730a3' },
  '09': { name: 'How To Analyze & Scale',    icon: '📊', color: '#312e81' },
  '10': { name: 'How To Run Whitelisted Ads','icon': '📄', color: '#1e1b4b' },
  '11': { name: 'Run & Scale Promos',        icon: '🚀', color: '#581c87' },
  '13': { name: 'Product Research',          icon: '🛍️', color: '#7e22ce' },
  '14': { name: 'Break Down Winning Ads',    icon: '🏆', color: '#9333ea' },
};

function buildEVOLVEMarketingCatalog() {
  if (!fs.existsSync(EVOLVE_MKT_SUMMARIES)) return [];

  const files = fs.readdirSync(EVOLVE_MKT_SUMMARIES).filter(f => f.endsWith('.md')).sort();
  if (files.length === 0) return [];

  // Grouper par module
  const byModule = {};
  for (const file of files) {
    const match = file.match(/^m(\d+)-/);
    const modKey = match ? match[1] : '00';
    if (!byModule[modKey]) byModule[modKey] = [];
    byModule[modKey].push(file);
  }

  const totalDocs = files.length;
  const result = [];

  // Parent header (remplace les 5 entrées STATIC_CATALOG EVOLVE MARKETING)
  result.push({
    category: '🎯 EVOLVE MARKETING',
    color: '#6366f1',
    isParent: true,
    docs: []
  });

  // Une sous-catégorie par module
  for (const [modKey, modFiles] of Object.entries(byModule).sort()) {
    const mod = EVOLVE_MKT_MODULES[modKey] || { name: `Module ${modKey}`, icon: '📖', color: '#6b7280' };
    const docs = modFiles.map(file => {
      const vidMatch = file.match(/^m\d+-(\d+)-/);
      const vidNum   = vidMatch ? vidMatch[1] : '00';
      const id       = `evmkt-${file.replace('.md', '')}`;
      const title    = slugToTitle(file.replace('.md', ''));
      return {
        id,
        title,
        subtitle: `${mod.icon} M${modKey} · ${mod.name} · Vidéo ${vidNum}`,
        tags: ['EVOLVE', 'Marketing', mod.name],
        file: `formations/evolve-marketing/summaries/${file}`,
        icon: mod.icon,
        exists: true
      };
    });
    result.push({
      category: `${mod.icon} M${modKey} — ${mod.name}`,
      color: mod.color,
      parentCategory: '🎯 EVOLVE MARKETING',
      docs
    });
  }

  return result;
}

// ─── CATALOGUE SYNTHÈSE COMPLÈTE EVOLVE (auto-découverte) ────────────────────
function buildEVOLVESynthesisCatalog() {
  const EVOLVE_RESULTS = path.join(WORKSPACE, 'EVOLVE_RESULTS');
  const docs = [];

  // Synthèse complète (générée par lecture intégrale 140 fichiers)
  const synthPath = path.join(EVOLVE_RESULTS, 'EVOLVE_FULL_SYNTHESIS.md');
  if (fs.existsSync(synthPath)) {
    docs.push({ id: 'evolve-full-synthesis', title: 'Synthèse Complète EVOLVE (140 fichiers)', subtitle: 'Lecture intégrale M2→M14 — tous frameworks, règles, méthodes Spencer', tags: ['EVOLVE','Synthèse','Complet'], file: 'EVOLVE_RESULTS/EVOLVE_FULL_SYNTHESIS.md', icon: '📖' });
  }

  // Gaps agents post lecture complète
  const gapsPath = path.join(EVOLVE_RESULTS, 'GAPS_AGENTS_POST_FULL_READ.md');
  if (fs.existsSync(gapsPath)) {
    docs.push({ id: 'evolve-gaps-agents', title: 'Gaps Agents — Post Lecture Complète', subtitle: 'Ce qui manque dans chaque agent vs formation complète', tags: ['EVOLVE','Audit','Agents'], file: 'EVOLVE_RESULTS/GAPS_AGENTS_POST_FULL_READ.md', icon: '🔎' });
  }

  // Research doc
  const researchPath = path.join(EVOLVE_RESULTS, 'research_doc_filled.md');
  if (fs.existsSync(researchPath)) {
    docs.push({ id: 'evolve-research-doc-filled', title: 'Research Doc (rempli)', subtitle: 'Template Spencer rempli pour Nellio DE', tags: ['EVOLVE','Research','Template'], file: 'EVOLVE_RESULTS/research_doc_filled.md', icon: '📝' });
  }

  if (docs.length === 0) return [];

  return [{
    category: `📖 Synthèse Complète Formation (${docs.length} doc${docs.length > 1 ? 's' : ''})`,
    color: '#10b981',
    parentCategory: '🎯 EVOLVE MARKETING',
    docs
  }];
}

// ─── CATALOGUE MASTER PELLEGRINI (auto-découverte) ───────────────────────────
const MASTER_PELLEGRINI_DIR = path.join(WORKSPACE, 'formations', 'master-pellegrini', 'summaries');

function buildMasterPellegriniCatalog() {
  if (!fs.existsSync(MASTER_PELLEGRINI_DIR)) return [];

  const files = fs.readdirSync(MASTER_PELLEGRINI_DIR)
    .filter(f => f.endsWith('.md') && f.startsWith('master-'))
    .sort();

  if (files.length === 0) return [];

  const docs = files.map(file => {
    // Extract episode number from filename (master-01.md → 1)
    const numMatch = file.match(/master-(\d+)\.md/);
    const epNum = numMatch ? parseInt(numMatch[1]) : 0;

    // Read title from file
    let title = `MASTER #${epNum}`;
    let subtitle = `Épisode #${epNum} — @mpellegrini7`;
    let isStub = false;
    try {
      const content = fs.readFileSync(path.join(MASTER_PELLEGRINI_DIR, file), 'utf8');
      const lines = content.split('\n');
      // Title is first non-comment line starting with #
      for (const line of lines) {
        if (line.startsWith('# ') && !line.startsWith('<!-- ')) {
          title = line.replace(/^# /, '').trim();
          break;
        }
      }
      isStub = content.includes('❌ Transcript indisponible') || lines.length < 10;
    } catch (e) {}

    return {
      id: `master-pellegrini-${String(epNum).padStart(2, '0')}`,
      num: epNum,
      title,
      subtitle,
      tags: ['Meta Ads', 'Scaling', 'DTC', 'E-commerce', 'Pellegrini'],
      file: `formations/master-pellegrini/summaries/${file}`,
      icon: isStub ? '⏳' : '🎬',
      exists: !isStub,
      isStub
    };
  });

  const available = docs.filter(d => !d.isStub).length;

  return [{
    category: `🎬 Playlist MASTER — Pellegrini (${available}/${docs.length} résumés)`,
    color: '#f97316',
    docs
  }];
}

// ─── CATALOGUE HIGGSFIELD AI (auto-découverte) ────────────────────────────────
const HIGGSFIELD_DIR = path.join(WORKSPACE, 'formations', 'higgsfield-ai', 'summaries');

function buildHighsfieldCatalog() {
  if (!fs.existsSync(HIGGSFIELD_DIR)) return [];

  const VIDEO_ORDER = [
    'BnYFwQEAJls','McwoKOIxIPY','nUgx8ETiR1g','jQvHqKrGhy8','yvuVH6Zg5Vk',
    'nnGFEUeL-P0','6j8-F7GE2UE','AdjllfZuqYM','M-A5GNDJpuc','II9AdFNgzpU','IuDQZk-ndk4'
  ];

  const files = fs.readdirSync(HIGGSFIELD_DIR).filter(f => f.endsWith('.md'));
  if (files.length === 0) return [];

  const docs = files.map(file => {
    const videoId = file.replace('.md', '');
    let title = videoId;
    try {
      const content = fs.readFileSync(path.join(HIGGSFIELD_DIR, file), 'utf8');
      const line = content.split('\n').find(l => l.startsWith('# '));
      if (line) title = line.replace(/^# /, '').trim();
    } catch (e) {}
    return {
      id: `higgsfield-${videoId}`,
      title,
      subtitle: `Higgsfield AI — youtube.com/watch?v=${videoId}`,
      tags: ['Higgsfield','AI Video','UGC','Kling','B-Roll','Créatifs','Meta Ads'],
      file: `formations/higgsfield-ai/summaries/${file}`,
      icon: '🎬',
      source_url: `https://youtube.com/watch?v=${videoId}`,
      exists: true,
      _order: VIDEO_ORDER.indexOf(videoId)
    };
  }).sort((a, b) => a._order - b._order);

  return [{
    category: `🤖 Higgsfield AI — Créatifs & Workflows (${docs.length} vidéos)`,
    color: '#6366f1',
    docs
  }];
}

// ─── CATALOGUE VIBE CODING CODEPLAYBOOK (auto-découverte) ─────────────────────
const VIBECODING_DIR = path.join(WORKSPACE, 'formations', 'vibe-coding-codeplaybook', 'summaries');

function buildVibeCodingCatalog() {
  if (!fs.existsSync(VIBECODING_DIR)) return [];

  const VIDEO_ORDER = [
    'KFNfQwmLnS8','XjDRuB3cmbM','fjECCYAhIHM','fi1E2-tnEVA','XLxqmIwThj0',
    'Okgzirbvro0','qUE-nVUrpq4','ByQ0IYURnB8','Nj0tn2qlT0s','kYW7UVnyhcM',
    'mFGa3TNjCOo','44TVLZZMbO0','Fwb0mjIdYvU','Z4O2HNffTX8','UMmFG6cEVKg'
  ];

  const files = fs.readdirSync(VIBECODING_DIR).filter(f => f.endsWith('.md'));
  if (files.length === 0) return [];

  const docs = files.map(file => {
    const videoId = file.replace('.md', '');
    let title = videoId;
    try {
      const content = fs.readFileSync(path.join(VIBECODING_DIR, file), 'utf8');
      const line = content.split('\n').find(l => l.startsWith('# '));
      if (line) title = line.replace(/^# /, '').trim();
    } catch (e) {}
    const idx = VIDEO_ORDER.indexOf(videoId);
    return {
      id: `vibecoding-${videoId}`,
      title,
      subtitle: `Vibe Coding CodePlaybook — Episode ${idx >= 0 ? idx + 1 : '?'}`,
      tags: ['Vibe Coding','Cursor','Claude Code','IA','No-Code','Dev','Automatisation'],
      file: `formations/vibe-coding-codeplaybook/summaries/${file}`,
      icon: '💻',
      source_url: `https://youtube.com/watch?v=${videoId}`,
      exists: true,
      _order: idx >= 0 ? idx : 999
    };
  }).sort((a, b) => a._order - b._order);

  return [{
    category: `💻 Vibe Coding CodePlaybook (${docs.length} épisodes)`,
    color: '#10b981',
    docs
  }];
}

// ─── ASSIGNATION DES FORMATIONS ───────────────────────────────────────────────
function assignFormation(catName) {
  const n = catName;
  if (n.includes('EVOLVE CRO')) return 'evolve-cro';
  if (n.includes('EcomTalent') || n.includes('Ecom Talent')) return 'ecomtalent';
  if (n.includes('Davie Fogarty')) return 'davie-fogarty';
  if (n.includes('AI UGC') || n.includes('Marketing Mania')) return 'ai-ugc';
  if (n.includes('Pellegrini') || n.includes('Pelegrini')) return 'pellegrini-strat';
  // Tout le reste dans formations group → EVOLVE ADS
  return 'evolve-ads';
}

const FORMATION_DEFS = [
  { id: 'evolve-ads',        label: 'EVOLVE ADS',              emoji: '🎯', color: '#6366f1', subtitle: 'Méthode complète — Desire Research · Avatars · Angles · Scripts · Campagnes Meta' },
  { id: 'evolve-cro',        label: 'EVOLVE CRO',              emoji: '🎓', color: '#8b5cf6', subtitle: 'Optimisation conversion · Landing pages · AOV · Checkout' },
  { id: 'ecomtalent',        label: 'EcomTalent',              emoji: '🎓', color: '#a78bfa', subtitle: 'Formation Whop — 88 leçons Ads & Scaling DTC' },
  { id: 'ai-ugc',            label: 'AI UGC Marketing Mania',  emoji: '🎬', color: '#4f46e5', subtitle: 'Créatifs IA · UGC · Scripts · Hooks' },
];

// ─── ASSIGNATION DES GROUPES ──────────────────────────────────────────────────
function assignGroup(cat) {
  const name = cat.category || '';
  const parent = cat.parentCategory || '';

  // Vidéos
  if (name.includes('Playlist MASTER') || name.includes('YouTube — Playlist') ||
      parent.includes('Playlist MASTER') || parent.includes('YouTube — Playlist')) return 'videos';
  if (['Julian Goldie SEO','Alex Finn','Tech With Tim','Florian Darroman'].some(c => name.includes(c))) return 'videos';
  if (name.includes('Davie Fogarty')) return 'videos';

  // Liens #ressources (carte dédiée page d'accueil)
  if (name.includes('Liens — Ressources') || name.includes('Liens #ressources')) return 'liens';

  // Articles
  if (name.includes('Ressources Chef')) return 'articles';
  if ((name.includes('Pellegrini') || name.includes('Pelegrini')) && name.includes('Stratégie')) return 'articles';

  // Livres
  if (name.includes('Résumés de Livres') || name.includes('Classiques du Copywriting') ||
      name.includes('Playbooks & Références') || name.includes('Book Launch') ||
      name.includes('Scaling Roadmap') || name.includes('Collections & Templates')) return 'livres';

  // Stratégie
  if (name.includes('Stratégie & Knowledge Base')) return 'strategie';

  // Défaut : formations
  return 'formations';
}

// ─── CATALOGUE COMPLET ────────────────────────────────────────────────────────
function getEcomTalentCatalog() {
  const summariesDir = path.join(WORKSPACE, 'formations/whop-ecomtalent/summaries');
  const masterFile = path.join(WORKSPACE, 'formations/whop-ecomtalent/ECOMTALENT_MASTER.md');

  let docs = [];

  // Master summary toujours en premier
  if (fs.existsSync(masterFile)) {
    docs.push({
      id: 'ecomtalent-master',
      title: 'EcomTalent — Master Summary (88 leçons)',
      subtitle: 'Synthèse complète · 11 thèmes · 88 leçons',
      tags: ['EcomTalent', 'Meta Ads', 'Ads', 'DTC', 'Synthèse'],
      file: 'formations/whop-ecomtalent/ECOMTALENT_MASTER.md',
      icon: '🎓',
      exists: true
    });
  }

  // Toutes les leçons
  const transcriptsDir = path.join(WORKSPACE, 'formations/whop-ecomtalent/transcripts');
  if (fs.existsSync(summariesDir)) {
    const files = fs.readdirSync(summariesDir).filter(f => f.endsWith('.md')).sort();
    files.forEach((file, i) => {
      const lessonId = file.replace('.md', '').split('_')[0]; // lesn_XXXXX
      const id = `ecomtalent-lesson-${String(i+1).padStart(2,'0')}`;
      let title = `Leçon ${String(i+1).padStart(2,'0')}`;
      let subtitle = '';
      try {
        const content = fs.readFileSync(path.join(summariesDir, file), 'utf8');
        const firstLine = content.split('\n').find(l => l.startsWith('# '));
        if (firstLine) title = firstLine.replace(/^#\s*/, '').slice(0, 80);
        const subtitleLine = content.split('\n').find(l => l.startsWith('> ') && !l.includes('Transcript'));
        if (subtitleLine) subtitle = subtitleLine.replace(/^>\s*/, '').slice(0, 120);
      } catch(e) {}

      // Vérifier si un transcript clean existe
      const cleanTranscriptFile = `formations/whop-ecomtalent/transcripts/${lessonId}_clean.md`;
      const cleanTranscriptId = `ecomtalent-transcript-${lessonId}`;
      const hasTranscript = fs.existsSync(path.join(WORKSPACE, cleanTranscriptFile));

      docs.push({
        id,
        title,
        subtitle,
        tags: ['EcomTalent', 'Ads', 'Formation'],
        file: `formations/whop-ecomtalent/summaries/${file}`,
        icon: '📝',
        exists: true,
        ...(hasTranscript ? { transcript_id: cleanTranscriptId, transcript_file: cleanTranscriptFile } : {})
      });

      // Ajouter le transcript clean comme doc séparé (accessible via /api/doc/:id)
      if (hasTranscript) {
        docs.push({
          id: cleanTranscriptId,
          title: `📄 Transcript — ${title}`,
          subtitle: '100% fidèle · Mise en page uniquement · Aucun mot modifié',
          tags: ['EcomTalent', 'Transcript', 'Fidèle'],
          file: cleanTranscriptFile,
          icon: '📄',
          exists: true,
          isTranscript: true
        });
      }
    });
  }

  // ── EcomTalent AI — 11 leçons (placeholders — transcripts à extraire) ──
  const AI_LESSONS = [
    { n: 1, ch: 'Introduction', t: 'EcomTalent AI — Introduction au cours' },
    { n: 2, ch: 'Génération Contenu IA', t: 'Générer du Contenu avec l\'IA — Vue d\'ensemble' },
    { n: 3, ch: 'Génération Contenu IA', t: 'Images IA pour les Ads — Outils & Workflows' },
    { n: 4, ch: 'Génération Contenu IA', t: 'Vidéo IA — Créer des Assets Créatifs Scalables' },
    { n: 5, ch: 'Génération Contenu IA', t: 'Voice & Avatar IA — UGC Synthétique à Grande Échelle' },
    { n: 6, ch: 'Agents & Automation', t: 'Agents IA — Automatiser la Recherche Créative' },
    { n: 7, ch: 'Agents & Automation', t: 'ChatGPT & Claude — Prompt Engineering pour Ads' },
    { n: 8, ch: 'Agents & Automation', t: 'Workflows n8n/Make — Automatiser la Production' },
    { n: 9, ch: 'Stratégie IA Ads', t: 'Stratégie IA pour Meta Ads — Intégrer l\'IA dans le Process' },
    { n: 10, ch: 'Stratégie IA Ads', t: 'Testing IA — A/B Test Créatifs Générés par IA' },
    { n: 11, ch: 'Stratégie IA Ads', t: 'Scale avec l\'IA — Système Complet de Production Créative' },
  ];

  const aiDocs = AI_LESSONS.map(l => ({
    id: `ecomtalent-ai-lesson-${String(l.n).padStart(2,'0')}`,
    title: l.t,
    subtitle: `📚 Chapitre: ${l.ch} · ⏳ Transcript à extraire (EcomTalent AI — 3h 26m)`,
    tags: ['EcomTalent', 'IA', 'AI UGC', 'Formation', 'En attente'],
    file: null,
    icon: '🤖',
    exists: false,
    source_url: 'https://whop.com/joined/ecomtalent/knowledge-KBhMkENW27qoZB/app/'
  }));

  const aiCategory = {
    category: `🤖 EcomTalent AI — Leçons IA (11 leçons · transcripts à extraire)`,
    group: 'formations',
    formation: 'ecomtalent',
    color: '#8b5cf6',
    docs: aiDocs
  };

  return [
    {
      category: `🎓 EcomTalent — Formation Complète (${docs.length} leçons)`,
      group: 'formations',
      formation: 'ecomtalent',
      color: '#fb923c',
      docs
    },
    aiCategory
  ];
}

function getFullCatalog() {
  const bookCatalog = buildBookCatalog();
  const playlistCatalog = buildPlaylistCatalog();
  const croCatalog = buildCROCatalog();
  const maniaCatalog = buildMarketingManiaCatalog();
  const fogartyCatalog = buildDavieFogartyCatalog();
  const evolveMktCatalog = buildEVOLVEMarketingCatalog(); // modules depuis summaries/ (par vidéo)
  const evolveSynthCatalog = buildEVOLVESynthesisCatalog(); // synthèse complète + gaps agents
  const masterPellegriniCatalog = buildMasterPellegriniCatalog(); // Playlist MASTER Pellegrini
  const higsfieldCatalog = buildHighsfieldCatalog();               // Higgsfield AI
  const vibeCodingCatalog = buildVibeCodingCatalog();              // Vibe Coding CodePlaybook

  // STATIC_CATALOG: 0=parent, 1=Synthèses, 2=Phase1, 3=Phase2, 4=Audit, 5=Handoffs, 6=KB
  const staticEvolve = STATIC_CATALOG.slice(0, 6); // tout EVOLVE sauf KB

  // Assembler section EVOLVE : statique + synthèse dynamique + modules vidéo
  const evolveSection = [
    ...staticEvolve,
    ...evolveSynthCatalog,
    ...(evolveMktCatalog.length > 1 ? evolveMktCatalog.slice(1) : [])
  ];

  const rawCatalog = [
    ...evolveSection,                // EVOLVE MARKETING (parent + subcategories statiques + modules)
    ...croCatalog,                   // EVOLVE CRO — carte unique plate
    ...maniaCatalog,                 // AI UGC Marketing Mania — carte unique plate
    // ── Davie Fogarty ──────────────────────────────────────────────────────
    ...(fogartyCatalog.length > 0 ? [
      {
        category: "📚 Davie Fogarty — $500M Oodie Founder",
        color: "#f97316",
        isParent: true,
        docs: []
      },
      ...fogartyCatalog
    ] : []),
    // ── Playlist MASTER Pellegrini ──────────────────────────────────────────
    ...(masterPellegriniCatalog.length > 0 ? [
      {
        category: "🎬 Playlist MASTER — Pellegrini",
        color: "#f97316",
        isParent: true,
        docs: []
      },
      ...masterPellegriniCatalog
    ] : []),
    // ── Higgsfield AI ──────────────────────────────────────────────────────
    ...(higsfieldCatalog.length > 0 ? [
      {
        category: "🤖 Higgsfield AI — Créatifs & Workflows",
        color: "#6366f1",
        isParent: true,
        docs: []
      },
      ...higsfieldCatalog
    ] : []),
    // ── Vibe Coding CodePlaybook ────────────────────────────────────────────
    ...(vibeCodingCatalog.length > 0 ? [
      {
        category: "💻 Vibe Coding CodePlaybook",
        color: "#10b981",
        isParent: true,
        docs: []
      },
      ...vibeCodingCatalog
    ] : []),
    {
      category: "📺 YouTube — Playlist OpenClaw",
      color: "#a855f7",
      isParent: true,
      docs: []
    },
    ...playlistCatalog,              // Par chaîne YouTube
    {
      category: "📚 Résumés de Livres (62)",
      color: "#f59e0b",
      isParent: true,
      docs: []
    },
    ...bookCatalog,
    ...STATIC_CATALOG.slice(6),     // Stratégie & KB
    {
      category: "📌 Ressources Chef",
      color: "#f43f5e",
      docs: [
        {
          id: "alexcooldev-ai-influencer-factory",
          title: "AI Influencer Factory at Scale",
          subtitle: "@alexcooldev — Arcads + OpenClaw · 27 Feb 2026",
          tags: ["UGC","AI","Scaling","OpenClaw","Arcads","Influencer"],
          file: "library/summaries/alexcooldev-ai-influencer-factory.md",
          icon: "🏭",
          source_url: "https://x.com/alexcooldev/status/2027386287091777694",
          exists: true
        },
        {
          id: "juggmotion-750k-63-days-ecom-playbook",
          title: "$750K en 63 Jours — Playbook Ecom DTC (Shopify Apps + Bans + Meta Ads)",
          subtitle: "@JuggMotion — 197 bk · Mindset · Kaching/TxtCart/Disputifier · Chargebacks < 0.3% · Direct product first",
          tags: ["DTC","Ecom","Shopify","Playbook","Meta Ads","Chargebacks","AOV","Bundle","Nellio","Scaling"],
          file: "library/summaries/juggmotion-750k-63-days-ecom-playbook.md",
          icon: "💰",
          exists: true
        },
        {
          id: "starksarq-ai-fruit-drama-viral-formula",
          title: "La Formule des 300M Vues — Structure + Taboo + Unserious Packaging",
          subtitle: "@starks_arq — 1036 bk · 145K vues · AI fruit drama · Stated vs Revealed Preference · Viral psychology",
          tags: ["Viral","Psychologie","Contenu","Hook","Stated vs Revealed","Taboo","DTC","Nellio","Marketing","Format"],
          file: "library/summaries/starksarq-ai-fruit-drama-viral-formula.md",
          icon: "🍌",
          exists: true
        },
        {
          id: "daievolutionhub-vidbee-video-downloader",
          title: "VidBee — Téléchargeur Vidéo 1000+ Sites (Open Source)",
          subtitle: "@DAIEvolutionHub — 979 bk · github.com/nexmoe/VidBee · Ad spy · Research · yt-dlp alternative",
          tags: ["Video","Downloader","Open Source","Research","Ad Spy","EVOLVE","Pipeline","Tools","YouTube","VidBee"],
          file: "library/summaries/daievolutionhub-vidbee-video-downloader.md",
          icon: "⬇️",
          exists: true
        },
        {
          id: "socialwithaayan-seedance2-prompt-library",
          title: "Seedance 2.0 — Bibliothèque de 500+ Prompts Video IA (Cinéma, UGC, Pub)",
          subtitle: "@socialwithaayan — 431 bk · github.com/YouMind-OpenLab/awesome-seedance-2-prompts · Cinematic · UGC · Ads · Free",
          tags: ["Seedance","Video IA","Prompts","ByteDance","B-rolls","Cinéma","UGC","Pub","Nellio","OMNIA"],
          file: "library/summaries/socialwithaayan-seedance2-prompt-library.md",
          icon: "🎬",
          exists: true
        },
        {
          id: "alexfinn-openclaw-complete-guide-44min",
          title: "The Only OpenClaw Video You'll Ever Need (~44min)",
          subtitle: "@AlexFinn ($300K ARR solo) — 207 bk · Setup complet · Use cases · Local models · ⚠️ Placeholder",
          tags: ["OpenClaw","Tutorial","Setup","Local Models","Use Cases","Alex Finn","Guide","Complet"],
          file: "library/summaries/alexfinn-openclaw-complete-guide-44min.md",
          icon: "🎬",
          exists: true
        },
        {
          id: "alexfinn-openclaw-local-model",
          title: "OpenClaw Illimité — Modèle Local (Mac Mini)",
          subtitle: "@AlexFinn — Qwen 3.5 + LM Studio · 26 Feb 2026",
          tags: ["OpenClaw","Local Model","Qwen","LM Studio","Agents","Cost"],
          file: "library/summaries/alexfinn-openclaw-local-model.md",
          icon: "🖥️",
          source_url: "https://x.com/alexfinn/status/2027096146661998662",
          exists: true
        },
        {
          id: "kahelecom-scale-1m-month",
          title: "Scale à $1M/month — Guide Complet 6 Piliers",
          subtitle: "@KahelEcom — Agence Luma · 860K vues · 8K bookmarks",
          tags: ["DTC","Scaling","Meta Ads","AOV","Offre","Backend","Creative"],
          file: "library/summaries/kahelecom-scale-1m-month.md",
          icon: "🚀",
          source_url: "https://x.com/kahelecom/status/2012817087560032503",
          exists: true
        },
        {
          id: "sourfraser-meta-andromeda-creative-diversity",
          title: "Stratégie Meta Post-Andromeda — Creative Diversity (4 Leviers, 5 Étapes)",
          subtitle: "@sourfraser (Fraggle · 700 créatifs/mois) — 139 bk · Persona × Messaging × Hook × Format · Nellio Batch #1",
          tags: ["Meta Ads","Andromeda","Creative Diversity","DTC","Persona","Hook","Format","ROAS","Nellio","DE"],
          file: "library/summaries/sourfraser-meta-andromeda-creative-diversity.md",
          icon: "📊",
          source_url: "https://x.com/sourfraser/status/2028208725291368736",
          exists: true
        },
        {
          id: "everestchris-saas-1k-mrr-24h-reddit-no-pitch",
          title: "SaaS $1k MRR en 24h — Reddit Sans Pitch (Stratégie Restraint)",
          subtitle: "@everestchris6 (Unloopa) — 150 bk · Reddit 1.1M vues · $0 budget · Système complet → guide → 1 ligne de vente",
          tags: ["SaaS","Reddit","Growth","$0","Acquisition","Lancement","OMNIA","Nellio","Organique","Viral"],
          file: "library/summaries/everestchris-saas-1k-mrr-24h-reddit-no-pitch.md",
          icon: "🚀",
          source_url: "https://x.com/everestchris6/status/2028178013125542092",
          exists: true
        },
        {
          id: "cybersudo-osinttools-io-directory",
          title: "osinttools.io — Annuaire Centralisé de Centaines d'Outils OSINT",
          subtitle: "@Cyber_Sudo — 231 bk · osinttools.io/tools · Username · Domain · Image · Social · Research agents EVOLVE",
          tags: ["OSINT","Research","Sécurité","Username","Email","Domain","Social Media","EVOLVE","Investigation","Tools"],
          file: "library/summaries/cybersudo-osinttools-io-directory.md",
          icon: "🔎",
          source_url: "https://x.com/Cyber_Sudo",
          exists: true
        },
        {
          id: "mkbijaksana-beginner-roadmap-ai-agents-2026",
          title: "Beginner Roadmap to Master AI Agents in 2026 — 6 Mois, Tout Gratuit",
          subtitle: "@mkbijaksana (ex-Google/Microsoft) — 2292 bk · 383K vues · Python→LangGraph→CrewAI→Multi-agents→Deploy",
          tags: ["AI Agents","Roadmap","Formation","LangGraph","CrewAI","Mémoire","Python","OMNIA","Architecture","Gratuit"],
          file: "library/summaries/mkbijaksana-beginner-roadmap-ai-agents-2026.md",
          icon: "🗺️",
          source_url: "https://x.com/mkbijaksana",
          exists: true
        },
        {
          id: "mobbin-ui-design-reference-library",
          title: "Mobbin — Bibliothèque de Référence UI/UX (Apps + Sites Réels)",
          subtitle: "mobbin.com — Screenshots UI de vraies apps/sites · Flows · Pricing · PDP · Landing pages · Design inspiration",
          tags: ["Design","UI","UX","Référence","Landing Page","OMNIA","Nellio","Flows","Patterns","Inspiration"],
          file: "library/summaries/mobbin-ui-design-reference-library.md",
          icon: "🎨",
          source_url: "https://mobbin.com",
          exists: true
        },
        {
          id: "mikefutia-claude-code-nano-banana-skill-dtc",
          title: "Claude Code + Nano Banana 2 — Skill Auto-JSON pour Product Shots DTC Professionnels",
          subtitle: "@mikefutia (Kitsch & MAELYS) — 135 bk · Texte → JSON structuré → NB2 API · Style lock · Zéro slot machine",
          tags: ["Claude Code","Nano Banana","DTC","Product Shots","Skill","JSON","Ad Creative","Nellio","Automatisation"],
          file: "library/summaries/mikefutia-claude-code-nano-banana-skill-dtc.md",
          icon: "📸",
          source_url: "https://x.com/mikefutia",
          exists: true
        },
        {
          id: "camilleroux-scrapling-web-scraping-cloudflare",
          title: "Scrapling — Web Scraping 774× plus Rapide, Bypass Cloudflare Automatique",
          subtitle: "@CamilleRoux — 186 bk · github.com/D4Vinci/Scrapling · Python · CLI · async · Remplace BeautifulSoup",
          tags: ["Scraping","Python","Cloudflare","Research","EVOLVE","Agent","BeautifulSoup","async","CLI","Outils"],
          file: "library/summaries/camilleroux-scrapling-web-scraping-cloudflare.md",
          icon: "🕷️",
          source_url: "https://github.com/D4Vinci/Scrapling",
          exists: true
        },
        {
          id: "parulgautam-ai-cinematic-video-prompts-director",
          title: "Pourquoi tes Vidéos IA 'Cinématiques' Semblent Cheap (Et Comment Corriger)",
          subtitle: "@Parul_Gautam7 — 285 bk · 40K vues · Shot language · JSON template · Grille 3×3 · Anchor phrase · Timeline prompts",
          tags: ["Video","AI","Prompts","Cinématic","Higgsfield","VSL","Nellio","B-rolls","Shot","Production"],
          file: "library/summaries/parulgautam-ai-cinematic-video-prompts-director.md",
          icon: "🎥",
          source_url: "https://x.com/Parul_Gautam7",
          exists: true
        },
        {
          id: "zaimiri-ollama-claude-code-free-local",
          title: "Arrêter de Payer Claude Code — Ollama + Modèles Locaux Gratuits (Setup 10 min)",
          subtitle: "@zaimiri — 5383 bk · 242K vues · ANTHROPIC_BASE_URL=localhost · Qwen 2.5 Coder · DeepSeek · $200/mo → $0",
          tags: ["Claude Code","Ollama","Local","Gratuit","Qwen","DeepSeek","Dev","OMNIA","Coût","Autonomie"],
          file: "library/summaries/zaimiri-ollama-claude-code-free-local.md",
          icon: "⚙️",
          source_url: "https://x.com/zaimiri/status/2027341952732250402",
          exists: true
        },
        {
          id: "xmayeth-anatomy-openclaw-build-differently",
          title: "Anatomy of OpenClaw — Guide Interne pour Builder des Agents Différemment",
          subtitle: "@xmayeth — 1726 bk · 626K vues · 6 composants · 2 mémoires · 5 erreurs · tokens ÷3 · bot $300/jour en 4h",
          tags: ["OpenClaw","Architecture","Mémoire","Bootstrap","Workspace","Tokens","Gateway","Agent","Erreurs","Compaction"],
          file: "library/summaries/xmayeth-anatomy-openclaw-build-differently.md",
          icon: "🧠",
          source_url: "https://x.com/xmayeth",
          exists: true
        },
        {
          id: "shelpidwi3m-openclaw-vps-secure-setup-14-steps",
          title: "OpenClaw VPS Secure Setup — 14 Étapes + Cas Réel Prompt Injection",
          subtitle: "@Shelpid_WI3M — 16.2K bk · 5M vues 🔥 · Prompt injection réel (inbox effacée) · Claude Opus 4.5 ~99% résistance",
          tags: ["OpenClaw","Sécurité","VPS","Prompt Injection","Tailscale","Sandbox","Allowlist","Claude Opus","Ubuntu","Setup"],
          file: "library/summaries/shelpidwi3m-openclaw-vps-secure-setup-14-steps.md",
          icon: "🛡️",
          source_url: "https://x.com/Shelpid_WI3M",
          exists: true
        },
        {
          id: "gregisenberg-openclaw-upwork-500k-year",
          title: "Greg Isenberg : OpenClaw $1K Upwork Gigs → $500K/year (52 min)",
          subtitle: "@gregisenberg — 682 bk · 32.5K vues · OpenClaw = 24/7 digital employees · ⚠️ Placeholder — transcription manuelle",
          tags: ["OpenClaw","Business","Freelance","Upwork","Agents","$500K","Greg Isenberg","Digital Employees","OMNIA"],
          file: "library/summaries/gregisenberg-openclaw-upwork-500k-year.md",
          icon: "💰",
          source_url: "https://x.com/gregisenberg",
          exists: true
        },
        {
          id: "alxfazio-ralph-plankton-claude-code-autonomous",
          title: "Ralph + Plankton — Autonomous Claude Code Loop avec Quality Gates",
          subtitle: "@alxfazio — 4319 bk · 214K vues · Ralph (auto yes/no/enter) · Plankton (slop guard) · frankbria/ralph-claude-code",
          tags: ["Claude Code","Automation","Ralph","Plankton","Quality Gates","Dev","OMNIA","Loop","Autonomous","SWE"],
          file: "library/summaries/alxfazio-ralph-plankton-claude-code-autonomous.md",
          icon: "🔄",
          source_url: "https://x.com/alxfazio/status/2027473676690665745",
          exists: true
        },
        {
          id: "vasuman-100x-business-ai-agents-6-lessons",
          title: "100x a Business with AI Agents — 6 Leçons Réelles ($3M ARR, ex-Meta)",
          subtitle: "@vasuman (Varick Agents) — 6175 bk · 650K vues · Context · Memory · Catch Exceptions · SaaS is Dead · 3 mois max",
          tags: ["AI Agents","Architecture","OMNIA","Production","Context","Memory","SaaS","Enterprise","Handoff","EVOLVE"],
          file: "library/summaries/vasuman-100x-business-ai-agents-6-lessons.md",
          icon: "🤖",
          source_url: "https://x.com/vasuman/status/2010473638110363839",
          exists: true
        },
        {
          id: "viktoroddy-landing-pages-nano-banana-antigravity",
          title: "Landing Pages Premium IA — Nano Banana Pro 2 + Antigravity + VEO 3 (7 Étapes)",
          subtitle: "@viktoroddy (designrocket.io) — 425 bk · 13.9K vues · Design tokens first · VEO 3 hero video · Glassmorphism specs",
          tags: ["Design","Landing Page","Nano Banana","Antigravity","VEO 3","UI","OMNIA","Nellio","Premium","Glassmorphism"],
          file: "library/summaries/viktoroddy-landing-pages-nano-banana-antigravity.md",
          icon: "🎨",
          source_url: "https://x.com/viktoroddy",
          exists: true
        },
        {
          id: "johannsath-openclaw-security-101-13-steps",
          title: "OpenClaw Security 101 — 13 Étapes pour Sécuriser son Agent IA",
          subtitle: "@johann_sath (ex-Cisco) — 328 bk · 26K vues · Tailscale · Docker sous-agents · DMs only · Auto-audit",
          tags: ["OpenClaw","Sécurité","Security","Tailscale","Docker","SSH","Firewall","Prompt Injection","Configuration"],
          file: "library/summaries/johannsath-openclaw-security-101-13-steps.md",
          icon: "🔒",
          source_url: "https://x.com/johann_sath",
          exists: true
        },
        {
          id: "lorenzopravata-vsl-ads-that-print-10m",
          title: "VSL Ads That Print — Structure Complète +$10M · Meta Ads Cold Traffic",
          subtitle: "@lorenzo_pravata (Growthub · $100M+ revenue) — 5 éléments obligatoires · Problem Unaware hook · 75s-3min · Higgsfield B-rolls",
          tags: ["VSL","Meta Ads","Script","Cold Traffic","DTC","Video","Copywriting","Conversion","Nellio","DE"],
          file: "library/summaries/lorenzopravata-vsl-ads-that-print-10m.md",
          icon: "📹",
          source_url: "https://x.com/lorenzo_pravata",
          exists: true
        },
        {
          id: "jaxonpoulton-mass-producing-ai-videos-7k-month",
          title: "Mass Producing AI Videos — $7K/mois (Process Complet)",
          subtitle: "@jaxonpoulton — 1754 bk · 51K vues · $500K+ GMV creator · Pipeline mass production AI videos",
          tags: ["AI Video","Production","UGC","Mass Production","Workflow","TikTok","Reels","Création"],
          file: "library/summaries/jaxonpoulton-mass-producing-ai-videos-7k-month.md",
          icon: "🎬",
          source_url: "https://x.com/jaxonpoulton",
          exists: true
        },
        {
          id: "oliverhenry-saas-dead-larrybrain-openclaw",
          title: "SaaS is Finally Dead — Comment OpenClaw va Changer Internet (LarryBrain)",
          subtitle: "@oliverhenry — 2195 bk · 403K vues · 1 skill = 1 SaaS remplacé · LarryBrain marketplace 30+ skills",
          tags: ["OpenClaw","Skills","SaaS","LarryBrain","Local","Marketing","OMNIA","Stratégie","TikTok","Architecture"],
          file: "library/summaries/oliverhenry-saas-dead-larrybrain-openclaw.md",
          icon: "💀",
          source_url: "https://x.com/oliverhenry",
          exists: true
        },
        {
          id: "vmlops-antigravity-awesome-skills-900",
          title: "Antigravity Awesome Skills — 900+ Skills IA pour Claude, Copilot, Gemini, Cursor",
          subtitle: "@_vmlops — 1635 bk · 77K vues · github.com/sickn33/antigravity-awesome-skills",
          tags: ["Claude Code","Skills","AI","GitHub","Automation","Cursor","Copilot","Gemini","Workflow"],
          file: "library/summaries/vmlops-antigravity-awesome-skills-900.md",
          icon: "🔌",
          source_url: "https://github.com/sickn33/antigravity-awesome-skills",
          exists: true
        },
        {
          id: "imlucasnova-0-a-500k-mois-ecom-supplement",
          title: "De 0 à 500K€/mois — Stratégies Exactes d'une Marque DTC Compléments (Cas Réel FR)",
          subtitle: "@ImLucasnova (Nemesis Invest) — Sites comparateurs · Ticket à gratter +50% LTV · VIP 20%→80% CA",
          tags: ["Ecom","DTC","Compléments","LTV","Fidélisation","Comparateurs","Ticket","VIP","Stratégie","FR"],
          file: "library/summaries/imlucasnova-0-a-500k-mois-ecom-supplement.md",
          icon: "📈",
          source_url: "https://x.com/ImLucasnova",
          exists: true
        },
        {
          id: "meeraiit-claude-code-best-practices-official",
          title: "Best Practices Claude Code — Docs Officiels Anthropic + Boris Cherny (Créateur)",
          subtitle: "@Meer_AIIT — 1208 bk · 142K vues · Context Window · Plan Mode · CLAUDE.md · Self-Verify",
          tags: ["Claude Code","Best Practices","Anthropic","Context Window","CLAUDE.md","Plan Mode","Boris Cherny"],
          file: "library/summaries/meeraiit-claude-code-best-practices-official.md",
          icon: "⚡",
          source_url: "https://x.com/Meer_AIIT/status/2020143873096557010",
          exists: true
        },
        {
          id: "heynavtoor-claude-cowork-3file-system",
          title: "Claude Cowork 10x ChatGPT — Système 3 Fichiers qui Remplace le Prompting",
          subtitle: "@heynavtoor — 2083 bk · 85K vues · about-me.md · brand-voice.md · working-style.md · Templates",
          tags: ["Claude","Claude Desktop","Cowork","Context","Files","Prompting","Brand Voice","Templates","Workflow"],
          file: "library/summaries/heynavtoor-claude-cowork-3file-system.md",
          icon: "📁",
          source_url: "https://x.com/heynavtoor",
          exists: true
        },
        {
          id: "anthonyeclipse-ai-cracked-demo-video",
          title: "\"AI is Officially Cracked\" — Démonstration Virale Ecom IA (Placeholder)",
          subtitle: "@AnthonyEclipse (Multi-7-Fig Ecom) — 1481 bk · 117K vues · Vidéo 10s — Transcription requise",
          tags: ["Ecom","AI","Video","Viral","Placeholder","Démonstration","Anthony Eclipse"],
          file: "library/summaries/anthonyeclipse-ai-cracked-demo-video.md",
          icon: "🤯",
          source_url: "https://x.com/AnthonyEclipse",
          exists: true
        },
        {
          id: "sukhsaroy-ghosttrack-osint-data-exposure",
          title: "GhostTrack — Exposition OSINT : ce qu'on Peut Trouver avec un Numéro de Téléphone",
          subtitle: "@sukh_saroy — 1235 bk · Phone/IP/Username → Localisation · 5 protections · 6K GitHub stars",
          tags: ["OSINT","Sécurité","Privacy","GhostTrack","Digital","Protection","Business","Meta Ads"],
          file: "library/summaries/sukhsaroy-ghosttrack-osint-data-exposure.md",
          icon: "🔐",
          source_url: "https://x.com/sukh_saroy",
          exists: true
        },
        {
          id: "amirmushich-50-design-prompts-nano-banana",
          title: "50 Prompts Design IA — Catalogue Complet (ex-Warner Music, PepsiCo, Spotify)",
          subtitle: "@AmirMushich — 15,034 bk · 1.66M vues · Branded Products · Brand Kit · Mockups · Photo Campaign",
          tags: ["Design","Prompts","Brand","Midjourney","Image AI","Mockups","Creative","Visual","Packaging"],
          file: "library/summaries/amirmushich-50-design-prompts-nano-banana.md",
          icon: "🎨",
          source_url: "https://x.com/AmirMushich",
          exists: true
        },
        {
          id: "ecomtalent-skill-first-video-ads-convert",
          title: "Skills First, Business Second — La Compétence #1 en Ecom (Ads qui Convertissent)",
          subtitle: "@ecomtalent — 259 bk · Hook = 2-3s · Fatigue 3-4 sem · Research+Angle+CTA · EcomTalent.io",
          tags: ["Ecom","Creative","Video Ads","Meta Ads","Hook","Copywriting","Compétence","UGC","Recrutement"],
          file: "library/summaries/ecomtalent-skill-first-video-ads-convert.md",
          icon: "🎯",
          source_url: "https://x.com/ecomtalent",
          exists: true
        },
        {
          id: "maximilien912-prompt-de-ai-ify-content",
          title: "Prompt Complet — Transformer Contenu IA en Contenu Humain (FR)",
          subtitle: "@maximilien912 — 259 bk · Vocabulaire interdit · Patterns IA · Structure · github.com/blader/humanizer",
          tags: ["Copywriting","Prompt","IA","Humaniser","Scripts","Copy","SEO","French","Anti-IA"],
          file: "library/summaries/maximilien912-prompt-de-ai-ify-content.md",
          icon: "✍️",
          source_url: "https://x.com/maximilien912",
          exists: true
        },
        {
          id: "sabooshubham-openclaw-agents-better-overtime",
          title: "OpenClaw Agents qui s'Améliorent avec le Temps — Stack Exact 40 Jours",
          subtitle: "@Saboo_Shubham_ (Sr AI PM @Google) — 821 bk · 3 Layers · TV Character · Section BAD · Shared Context",
          tags: ["OpenClaw","Agent Design","SOUL.md","MEMORY.md","AGENTS.md","Identity","Knowledge","Stack"],
          file: "library/summaries/sabooshubham-openclaw-agents-better-overtime.md",
          icon: "🤖",
          source_url: "https://x.com/Saboo_Shubham_",
          exists: true
        },
        {
          id: "githubprojects-awesome-openclaw-usecases",
          title: "Awesome OpenClaw Usecases — Catalogue Communautaire de Cas d'Usage",
          subtitle: "@GithubProjects — 119 bk · github.com/hesamsheikh/awesome-openclaw-usecases · Automation cookbook",
          tags: ["OpenClaw","GitHub","Use Cases","Automation","Workflows","Community","Open Source"],
          file: "library/summaries/githubprojects-awesome-openclaw-usecases.md",
          icon: "📚",
          source_url: "https://github.com/hesamsheikh/awesome-openclaw-usecases",
          exists: false
        },
        {
          id: "klossxyz-soul-md-improvement-prompt",
          title: "Prompt SOUL.md — 14 Principes Opérationnels (Peter Steinberger + klöss)",
          subtitle: "@kloss_xyz — 2636 bookmarks · 65K vues · Brevity · Opinions · Advanced Operating Principles",
          tags: ["OpenClaw","SOUL.md","Prompt Engineering","Agent Design","Operating Principles","Memory","Orchestration"],
          file: "library/summaries/klossxyz-soul-md-improvement-prompt.md",
          icon: "🧠",
          source_url: "https://x.com/kloss_xyz",
          exists: true
        },
        {
          id: "geremx-reverse-engineer-winning-ads",
          title: "Reverse-Engineering Créatives Concurrentes — Pipeline 5 Étapes",
          subtitle: "@gerem_x — Vmake → ElevenLabs → Claude → CapCut → Remontage · Bibliothèque B-Rolls",
          tags: ["Creative","UGC","Ecom","CapCut","ElevenLabs","Claude","B-Roll","Meta Ads","Concurrents"],
          file: "library/summaries/geremx-reverse-engineer-winning-ads.md",
          icon: "🎬",
          source_url: "https://x.com/gerem_x",
          exists: true
        },
        {
          id: "benjaminsehl-liquid-skills-shopify",
          title: "Liquid Skills — Standards Shopify par le Product Director d'Online Store",
          subtitle: "@benjaminsehl (Shopify) — 107K vues · BEM · Design Tokens · Web Components · Progressive Enhancement",
          tags: ["Shopify","Liquid","CSS","Standards","Claude Code","CRO","Design Tokens","Web Components"],
          file: "library/summaries/benjaminsehl-liquid-skills-shopify.md",
          icon: "🛍️",
          source_url: "https://x.com/benjaminsehl",
          exists: true
        },
        {
          id: "floriandarroman-openclaw-content-machine-podcast",
          title: "OpenClaw Content Machine — 1 Podcast = 6 Contenus (7 Agents Nommés)",
          subtitle: "@floriandarroman — Mona Lisa · Jimmy · Claude · Adrien · Bob · Dan · Loop · Whisper+ffmpeg",
          tags: ["OpenClaw","Content","Podcast","Multi-Agent","Automation","Whisper","ffmpeg","Typefully"],
          file: "library/summaries/floriandarroman-openclaw-content-machine-podcast.md",
          icon: "🎙️",
          source_url: "https://x.com/floriandarroman",
          exists: true
        },
        {
          id: "reddit-claudeai-top10-tips-11months",
          title: "Top 10 Tips Claude Code — 11 Mois d'Usage Intensif",
          subtitle: "r/ClaudeAI — Minimize Context · Handoff.md · Self-Verify · Cascade Sessions · 40+ tips GitHub",
          tags: ["Claude Code","Tips","Context Window","Handoff","Git","Voice","Performance","Workflow"],
          file: "library/summaries/reddit-claudeai-top10-tips-11months.md",
          icon: "💡",
          source_url: "https://www.reddit.com/r/ClaudeAI/",
          exists: true
        },
        {
          id: "reddit-claudeai-atlas-session-lifecycle",
          title: "Atlas Session Lifecycle — Mémoire Persistante pour Claude Code ($33K AUD)",
          subtitle: "r/ClaudeAI — /start · Soul Purpose · 5-file Memory Bank · /stepback · Lifecycle",
          tags: ["Claude Code","Memory","Session","Lifecycle","Soul Purpose","Atlas","Persistent"],
          file: "library/summaries/reddit-claudeai-atlas-session-lifecycle.md",
          icon: "🗺️",
          source_url: "https://www.reddit.com/r/ClaudeAI/",
          exists: true
        },
        {
          id: "reddit-claudeai-agentops-knowledge-flywheel",
          title: "5 Mois Claude Code — Knowledge Flywheel & AgentOps Plugin (9 Skills)",
          subtitle: "r/ClaudeAI — Context Window · Isolated Stages · /rpi /crank /pre-mortem /evolve",
          tags: ["Claude Code","AgentOps","Knowledge Flywheel","Context Window","Pipeline","Skills","DevOps"],
          file: "library/summaries/reddit-claudeai-agentops-knowledge-flywheel.md",
          icon: "🌀",
          source_url: "https://www.reddit.com/r/ClaudeAI/",
          exists: true
        },
        {
          id: "reddit-openclaw-3-layer-memory-architecture",
          title: "Architecture Mémoire 3 Couches — Ne pas Entraîner en Chat",
          subtitle: "r/OpenclawBot — Source of Truth · CONTEXT_PACK.md · CURRENT_STATE.md · Couche 1/2/3",
          tags: ["OpenClaw","Memory","Architecture","CONTEXT_PACK","Workspace","State","Couches"],
          file: "library/summaries/reddit-openclaw-3-layer-memory-architecture.md",
          icon: "🧠",
          source_url: "https://www.reddit.com/r/OpenclawBot/",
          exists: true
        },
        {
          id: "reddit-openclaw-workspace-layout-ideal",
          title: "Workspace Layout Idéal — Ce que la Plupart des Setups Ratent",
          subtitle: "r/OpenclawBot — HEARTBEAT · 5 catégories · Boucle système · Organisation digitale",
          tags: ["OpenClaw","Workspace","HEARTBEAT","Architecture","Memory","Governance","System"],
          file: "library/summaries/reddit-openclaw-workspace-layout-ideal.md",
          icon: "🗂️",
          source_url: "https://www.reddit.com/r/OpenclawBot/",
          exists: true
        },
        {
          id: "reddit-openclaw-forget-tools-fix",
          title: "OpenClaw Oublie ses Outils — Causes & Fixes Architecture",
          subtitle: "r/OpenclawBot — Loading Discipline · Memory Hygiene · Provider Isolation · Cadence",
          tags: ["OpenClaw","Architecture","Memory","Governance","Provider","Debugging","Entropy"],
          file: "library/summaries/reddit-openclaw-forget-tools-fix.md",
          icon: "🔧",
          source_url: "https://www.reddit.com/r/OpenclawBot/",
          exists: true
        },
        {
          id: "reddit-openclaw-closed-loops-make-money",
          title: "AI Agents ne Font pas d'Argent — Les Closed Loops Oui",
          subtitle: "r/OpenclawBot — 98 cas d'usage · 6 Revenue Buckets · 5 Composants Loop · Trigger→Artifact",
          tags: ["OpenClaw","Business","Revenue","Closed Loop","Automation","Content","Monetisation"],
          file: "library/summaries/reddit-openclaw-closed-loops-make-money.md",
          icon: "🔄",
          source_url: "https://www.reddit.com/r/OpenclawBot/",
          exists: true
        },
        {
          id: "reddit-openclaw-safety-blast-radius",
          title: "OpenClaw Safety — Blast Radius, Prompt Injection & Setup Sécurisé",
          subtitle: "r/OpenclawBot — Read-Only Phase · Tailscale · Command Allowlist · Emergency Procedures",
          tags: ["OpenClaw","Security","Safety","Prompt Injection","Blast Radius","Infrastructure"],
          file: "library/summaries/reddit-openclaw-safety-blast-radius.md",
          icon: "🛡️",
          source_url: "https://www.reddit.com/r/OpenclawBot/",
          exists: true
        },
        {
          id: "reddit-openclaw-governed-workspace-generator",
          title: "Governed Workspace Generator — Prompt de Gouvernance Agent (8 fichiers)",
          subtitle: "r/OpenclawBot — Interview → Risk Profile → ROLE/SCOPE/TOOLS/SAFETY/HEARTBEAT/LOGGING",
          tags: ["OpenClaw","Gouvernance","Workspace","Agent","ROLE.md","SCOPE.md","Risk","Architecture"],
          file: "library/summaries/reddit-openclaw-governed-workspace-generator.md",
          icon: "🏛️",
          source_url: "https://www.reddit.com/r/OpenclawBot/",
          exists: true
        },
        {
          id: "reddit-openclaw-agent-swarm-architecture",
          title: "Agent Swarm Architecture — 3 Couches pour l'Autonomie sans Chaos",
          subtitle: "r/OpenclawBot — Orchestrator · Execution Layer · Trusted Skills · Audit Gate · State Machine",
          tags: ["OpenClaw","Multi-Agent","Architecture","Swarm","Orchestration","Governance","State Machine"],
          file: "library/summaries/reddit-openclaw-agent-swarm-architecture.md",
          icon: "🕸️",
          source_url: "https://www.reddit.com/r/OpenclawBot/",
          exists: true
        },
        {
          id: "reddit-openclaw-money-while-you-sleep",
          title: "Gagner de l'Argent avec OpenClaw — 8 Cas d'Usage (Budget Existant)",
          subtitle: "r/OpenclawBot — Infrastructure mindset · 8 workflows monétisables · Labour vs Tool",
          tags: ["OpenClaw","Monétisation","Business","Automation","SaaS","Infrastructure","Workflows"],
          file: "library/summaries/reddit-openclaw-money-while-you-sleep.md",
          icon: "💰",
          source_url: "https://www.reddit.com/r/OpenclawBot/",
          exists: true
        },
        {
          id: "akanoa-rtk-rust-token-killer",
          title: "RTK — Rust Token Killer : -60 à -90% tokens Claude Code",
          subtitle: "@_Akanoa_ → GitHub rtk-ai/rtk — Hook transparent · Binaire Rust · MIT",
          tags: ["Claude Code","Tokens","Optimisation","RTK","Rust","CLI","Coût","Performance"],
          file: "library/summaries/akanoa-rtk-rust-token-killer.md",
          icon: "⚡",
          source_url: "https://github.com/rtk-ai/rtk",
          exists: true
        },
        {
          id: "riyazzai-learn-claude-1h-free",
          title: "Apprendre Claude en 1 Heure — Cours Complet Gratuit",
          subtitle: "@riyazz_ai — 144K vues · 1.6K bookmarks · 60 min · Vidéo Twitter",
          tags: ["Claude","Formation","Gratuit","Débutant","Workflow","AI"],
          file: "library/summaries/riyazzai-learn-claude-1h-free.md",
          icon: "🎓",
          source_url: "https://x.com/riyazz_ai",
          exists: true
        },
        {
          id: "heynavtoor-claude-cowork-plugins-tierlist",
          title: "Tier List — 21 Plugins Claude Cowork Testés (La Vérité)",
          subtitle: "@heynavtoor — 1.2M vues · 14.9K bookmarks · S/A/B/C-tier · SaaSpocalypse",
          tags: ["Claude Cowork","Plugins","Tier List","Productivity","Marketing","Anthropic","MCP"],
          file: "library/summaries/heynavtoor-claude-cowork-plugins-tierlist.md",
          icon: "🔌",
          source_url: "https://x.com/heynavtoor",
          exists: true
        },
        {
          id: "hartdrawss-million-dollar-product-12-rules",
          title: "Million Dollar Product — 12 Règles pour Builder ce que les Users Adorent",
          subtitle: "@Hartdrawss — 50+ MVPs · Design System · UX States · Aha Moment · Retention",
          tags: ["Product","UX","Design","Retention","MVP","Brand","Onboarding","SaaS"],
          file: "library/summaries/hartdrawss-million-dollar-product-12-rules.md",
          icon: "💎",
          source_url: "https://x.com/Hartdrawss",
          exists: true
        },
        {
          id: "venturetwins-ai-character-swaps-guide",
          title: "Guide Complet — AI Character Swaps (Kling / Wan / Luma)",
          subtitle: "@venturetwins (Justine Moore, a16z AI) — 1.9M vues · 13.6K bookmarks · Workflow 4 étapes",
          tags: ["AI Video","Character Swap","Kling","Wan","Krea","ElevenLabs","UGC","Creative"],
          file: "library/summaries/venturetwins-ai-character-swaps-guide.md",
          icon: "✨",
          source_url: "https://x.com/venturetwins",
          exists: true
        },
        {
          id: "profitfounder-openclaw-1m-army",
          title: "AI Agents Army with OpenClaw — $1M/year",
          subtitle: "@ProfitFounder — Lead Agent System · Retention Agent · 100K Emails · 52 min",
          tags: ["OpenClaw","Multi-Agent","Lead Agent","Retention","Automation","Mission Control"],
          file: "library/summaries/profitfounder-openclaw-1m-army.md",
          icon: "🦞",
          source_url: "https://x.com/ProfitFounder",
          exists: true
        },
        {
          id: "bloggersarvesh-claude-seo-local",
          title: "Claude + SEO Local — Écraser les agences à $3K/mois pour $100",
          subtitle: "@bloggersarvesh — 5 étapes · Keywords DE · GBP · 200K vues · #1 SEO Favikon",
          tags: ["SEO","Claude","Local","GBP","Content","Keywords","Organic"],
          file: "library/summaries/bloggersarvesh-claude-seo-local.md",
          icon: "🔍",
          source_url: "https://x.com/bloggersarvesh",
          exists: true
        },
        {
          id: "businessbarista-openclaw-vps-setup",
          title: "Setup OpenClaw sur VPS Sécurisé — Sans Mac Mini",
          subtitle: "@businessbarista (Alex Lieberman 285K) — Hetzner + Tailscale + Hardening · 6 étapes",
          tags: ["OpenClaw","VPS","Hetzner","Tailscale","Security","Setup","Infrastructure"],
          file: "library/summaries/businessbarista-openclaw-vps-setup.md",
          icon: "🛡️",
          source_url: "https://x.com/businessbarista",
          exists: true
        },
        {
          id: "fyncas-makeugc-object-pov-168k",
          title: "$168K Skincare — Ad Object POV avec MakeUGC ($1/vidéo)",
          subtitle: "@FynCas — Object POV · Animated Product · No Creator · Scale ×10",
          tags: ["UGC","MakeUGC","Object POV","Creative","Video Ads","Meta Ads","Skincare"],
          file: "library/summaries/fyncas-makeugc-object-pov-168k.md",
          icon: "🎬",
          source_url: "https://x.com/FynCas",
          exists: true
        },
        {
          id: "polashai-tiktok-agent-claude-code",
          title: "TikTok AI Agent — Research-to-Brief Pipeline (Claude Code, 37 min)",
          subtitle: "@polash_ai — TikTok Spy · Gemini Hook Analysis · Comment Mining · Auto-Brief",
          tags: ["Claude Code","TikTok","AI Agent","Research","Creative Brief","Gemini","DTC"],
          file: "library/summaries/polashai-tiktok-agent-claude-code.md",
          icon: "🕵️",
          source_url: "https://x.com/polash_ai",
          exists: true
        },
        {
          id: "dtc-quizbuilder-funnel-arbitrage",
          title: "\"Funnel Arbitrage\" — Quiz = Nouveau Mécanisme",
          subtitle: "@DTC_Quizbuilder — CVR ×2-4 · Psychologie Schwartz · Quiz 8 étapes · ColonBroom",
          tags: ["DTC","Quiz","Funnel","CVR","Conversion","CRO","Schwartz","Market Sophistication"],
          file: "library/summaries/dtc-quizbuilder-funnel-arbitrage.md",
          icon: "🎯",
          source_url: "https://x.com/DTC_Quizbuilder",
          exists: true
        },
        {
          id: "wontdieaverage-lead-reactivation-agent-93k",
          title: "Agent Lead Reactivation — $93K avec 1 seul agent",
          subtitle: "@WontDieAverage_ — BuildMyAgent + Twilio SMS · Question Flow · LTV",
          tags: ["AI Agent","Lead Reactivation","SMS","Twilio","LTV","Retention","BuildMyAgent"],
          file: "library/summaries/wontdieaverage-lead-reactivation-agent-93k.md",
          icon: "💰",
          source_url: "https://x.com/WontDieAverage_",
          exists: true
        },
        {
          id: "ashen-20-prompts-openclaw-jarvis",
          title: "20 Prompts OpenClaw — Clanker → Jarvis",
          subtitle: "@ashen_one — 178K vues · 2034 bookmarks · Auto-évaluation Clawdbot Prime incluse",
          tags: ["OpenClaw","Prompts","SOUL.md","MEMORY.md","Agent","Configuration","Architecture"],
          file: "library/summaries/ashen-20-prompts-openclaw-jarvis.md",
          icon: "🦾",
          source_url: "https://x.com/ashen_one",
          exists: true
        },
        {
          id: "ernesto-openclaw-eddie-70k-mrr",
          title: "OpenClaw Agent \"Eddie\" — $70K/mois B2C Apps",
          subtitle: "@ErnestoSOFTWARE — 716K vues · 5630 bookmarks · $73K MRR · 5 usages réels",
          tags: ["OpenClaw","Automation","Agent","Content","Influencer","B2C","Apps","Eddie"],
          file: "library/summaries/ernesto-openclaw-eddie-70k-mrr.md",
          icon: "🤖",
          source_url: "https://x.com/ErnestoSOFTWARE/status/2027105511569809899",
          exists: true
        },
        {
          id: "youri-ai-ugc-ads-arcads-2026",
          title: "The NEW Way to Make AI UGC Ads in 2026",
          subtitle: "Youri van Hofwegen — Arcads pipeline · 9min · 13K vues",
          tags: ["UGC","AI","Arcads","Meta Ads","Créatives","2026"],
          file: "library/summaries/youri-ai-ugc-ads-arcads-2026.md",
          icon: "🎭",
          source_url: "https://www.youtube.com/watch?v=5NoTEUtr2gU",
          exists: true
        },
        {
          id: "nicksaraev-claude-code-full-course-4h",
          title: "Claude Code Full Course — Build & Sell (4h)",
          subtitle: "Nick Saraev — 353K vues · 4h10min · OMNIA/SaaS",
          tags: ["Claude Code","IA","Coding","SaaS","OMNIA","Build"],
          file: "library/summaries/nicksaraev-claude-code-full-course-4h.md",
          icon: "💻",
          source_url: "https://www.youtube.com/watch?v=QoQBzR1NIqI",
          exists: true
        },
        {
          id: "ecomking-dropshipping-course-6h",
          title: "Full Dropshipping Course — $30M Sales (6h)",
          subtitle: "THE ECOM KING (Kamil Sattar) — $40M revenue · 6h dropshipping complet",
          tags: ["Dropshipping","Shopify","Meta Ads","Scaling","E-commerce","Débutant"],
          file: "library/summaries/ecomking-dropshipping-course-6h.md",
          icon: "👑",
          source_url: "https://x.com/kamil_sattar/status/2023089119207862650",
          exists: true
        },
        {
          id: "chinchichou-ia-video-ads-015",
          title: "Vidéos IA Réalistes Sans Limite — $0.15/créatif",
          subtitle: "@ChinChiChou — kie.ai + Nano Banana + ElevenLabs · Brandsearch Discovery",
          tags: ["IA","Vidéo","kie.ai","Sora","Veo","ElevenLabs","Brandsearch","Creative"],
          file: "library/summaries/chinchichou-ia-video-ads-015.md",
          icon: "🎥",
          source_url: "https://x.com/ChinChiChou",
          exists: true
        },
        {
          id: "ai-theme-pages-30k-month",
          title: "AI Theme Pages — $30K+/mois (Guide Complet)",
          subtitle: "Notion Guide — Themely.ai + TikTok + Instagram · Serene Herbs $130K/45j",
          tags: ["AI","UGC","Organic","TikTok","Instagram","Theme Pages","Wellness","Funnel"],
          file: "library/summaries/ai-theme-pages-30k-month.md",
          icon: "📱",
          source_url: "https://themely.ai",
          exists: true
        },
        {
          id: "seergioo_gil-tts-alternative",
          title: "ElevenLabs is Dead — Alternatives TTS Open-Source",
          subtitle: "@seergioo_gil — Qwen3-TTS, Voicebox, Kokoro · Mars 2026",
          tags: ["TTS","Voix","Open-Source","Qwen3","ElevenLabs","Local","UGC"],
          file: "library/summaries/seergioo_gil-tts-alternative.md",
          icon: "🎙️",
          source_url: "https://x.com/seergioo_gil/status/2027845170792628256",
          exists: true
        },
        {
          id: "rixhabh-faceless-youtube-30k",
          title: "$30k avec une Chaîne YouTube Faceless en 2026",
          subtitle: "@rixhabh__ — YouTube faceless AI, RPM élevé · Mars 2026",
          tags: ["YouTube","Faceless","Revenu","IA","Contenu","Automatisation","Scaling"],
          file: "library/summaries/rixhabh-faceless-youtube-30k.md",
          icon: "📺",
          source_url: "https://x.com/rixhabh__/status/2028160902391034125",
          exists: true
        },
        {
          id: "itspaulai-openclaw-android",
          title: "Héberger OpenClaw sur un Vieux Téléphone Android",
          subtitle: "@itspaulai — Serveur AI $0 sur Android · Mars 2026",
          tags: ["OpenClaw","Android","Infrastructure","Local","Claude Code","Remote","Gratuit"],
          file: "library/summaries/itspaulai-openclaw-android.md",
          icon: "📱",
          source_url: "https://x.com/itspaulai/status/2028213201519640823",
          exists: true
        },
        {
          id: "alifcoder-github-ai-repo",
          title: "alifcoder — GitHub AI Repo Curation",
          subtitle: "@alifcoder — Repos AI outils pratiques · Mars 2026",
          tags: ["GitHub","Open-Source","Outils","AI","Automatisation","Développement"],
          file: "library/summaries/alifcoder-github-ai-repo.md",
          icon: "💻",
          source_url: "https://x.com/alifcoder/status/2028172987388821990",
          exists: true
        },
        {
          id: "nate_google_-youtube-ads-ecom",
          title: "30+ Marques Ecom à $50k/jour — YouTube Ads",
          subtitle: "@nate_google_ — YouTube Ads stratégie ecom · Mars 2026",
          tags: ["YouTube Ads","Ecom","Scaling","Google","DTC","ROAS","Targeting"],
          file: "library/summaries/nate_google_-youtube-ads-ecom.md",
          icon: "📈",
          source_url: "https://x.com/nate_google_/status/2028283890578706629",
          exists: true
        },
        {
          id: "jamiepine-voicebox",
          title: "Voicebox — Studio Synthèse Vocale Open-Source (Qwen3-TTS)",
          subtitle: "@jamiepine — Alternative ElevenLabs 100% locale · Mars 2026",
          tags: ["TTS","Voix","Open-Source","Qwen3","Local","API","Clone vocal","UGC"],
          file: "library/summaries/jamiepine-voicebox.md",
          icon: "🎤",
          source_url: "https://github.com/jamiepine/voicebox",
          exists: true
        },
        {
          id: "themattberman-meta-ads-ai",
          title: "Gérer ses Meta Ads avec Claude + MCP",
          subtitle: "@themattberman — Claude Code + MCP Meta Ads · Mars 2026",
          tags: ["Meta Ads","Claude","MCP","Automatisation","ROAS","AI","Media Buyer"],
          file: "library/summaries/themattberman-meta-ads-ai.md",
          icon: "🤖",
          source_url: "https://x.com/themattberman/status/2028667752467034500",
          exists: true
        },
        {
          id: "micahberkley-scrapling-ad-library",
          title: "Scrapling + Claude Code — Scraping Ad Library Meta",
          subtitle: "@micahberkley — Scrapling Python + Claude spy concurrents · Mars 2026",
          tags: ["Scraping","Scrapling","Claude Code","Meta Ads","Concurrents","Python","EVOLVE"],
          file: "library/summaries/micahberkley-scrapling-ad-library.md",
          icon: "🕷️",
          source_url: "https://x.com/micahberkley/status/2028546867080855868",
          exists: true
        },
        {
          id: "ihtesham-perplexica",
          title: "Perplexica — Clone Local Open-Source de Perplexity AI",
          subtitle: "@ihtesham2005 — Moteur de recherche AI auto-hébergé · Mars 2026",
          tags: ["Perplexica","Recherche","Open-Source","Local","LLM","EVOLVE","Research"],
          file: "library/summaries/ihtesham-perplexica.md",
          icon: "🔍",
          source_url: "https://x.com/ihtesham2005/status/2028723408670994600",
          exists: true
        },
        {
          id: "rohanpaul-ai-insights",
          title: "Rohan Paul AI — Insights Bleeding Edge AI Engineering",
          subtitle: "@rohanpaul_ai — Veille AI engineering · Mars 2026",
          tags: ["AI","Engineering","Agents","Veille","AGI","Anthropic","Sécurité"],
          file: "library/summaries/rohanpaul-ai-insights.md",
          icon: "🧠",
          source_url: "https://x.com/rohanpaul_ai/status/2028549741190291658",
          exists: true
        },
        {
          id: "storeindex-shopify-database",
          title: "StoreIndex — 2.5M+ Boutiques Shopify Database",
          subtitle: "storeindex.com — Base données Shopify vérifiée · Mars 2026",
          tags: ["Shopify","Base de données","Ecom","Prospection","Email","B2B","Leads"],
          file: "library/summaries/storeindex-shopify-database.md",
          icon: "🏪",
          source_url: "https://www.storeindex.com/#features",
          exists: true
        },
        {
          id: "hasantoxr-scrapy-scraping",
          title: "Scrapy — Framework Python de Web Scraping Industriel",
          subtitle: "@hasantoxr — Scrapy crawl structuré, zero SaaS · Mars 2026",
          tags: ["Scrapy","Python","Scraping","Crawling","Données","Research","EVOLVE"],
          file: "library/summaries/hasantoxr-scrapy-scraping.md",
          icon: "🕸️",
          source_url: "https://x.com/hasantoxr/status/2027793908093358351",
          exists: true
        },
        {
          id: "shalevhvs-ai-rabbis-blueprint",
          title: "AI Rabbis Blueprint — $10k en 30 Jours avec Personnages AI",
          subtitle: "@shalevhvs — Persona AI monetisé, produits digitaux · Mars 2026",
          tags: ["AI Influencer","Persona","Monétisation","TikTok","Instagram","Organique","Produits digitaux"],
          file: "library/summaries/shalevhvs-ai-rabbis-blueprint.md",
          icon: "💰",
          source_url: "https://x.com/shalevhvs/status/2027136441134764305",
          exists: true
        },
        {
          id: "maxxmalist-ai-ugc-kling",
          title: "AI UGC Hook — Nano Banana Pro + Kling 2.6 Motion Control",
          subtitle: "@maxxmalist — AI UGC hyperréaliste, motion control · Mars 2026",
          tags: ["AI UGC","Nano Banana","Kling","Motion Control","Créatifs","Meta Ads","Nellio"],
          file: "library/summaries/maxxmalist-ai-ugc-kling.md",
          icon: "🎬",
          source_url: "https://x.com/maxxmalist/status/2028502287954403477",
          exists: true
        },
        {
          id: "heynavtoor-pinchtab",
          title: "Pinchtab — Contrôle Navigateur HTTP pour Agents AI",
          subtitle: "@heynavtoor — Browser automation 12MB Go binary · Mars 2026",
          tags: ["Browser","Automation","Agents","Go","HTTP","Chrome","Scraping","Token-efficient"],
          file: "library/summaries/heynavtoor-pinchtab.md",
          icon: "🌐",
          source_url: "https://x.com/heynavtoor/status/2028922003365986705",
          exists: true
        },
        {
          id: "markkashef-claudeclaw",
          title: "ClaudeClaw — Remplacer OpenClaw par Claude Code en 1 Jour",
          subtitle: "@markkashef — Mega Prompt Claude Code, guide visuel · Mars 2026",
          tags: ["Claude Code","OpenClaw","Mega Prompt","Agents","Architecture","Migration","ClaudeClaw"],
          file: "library/summaries/markkashef-claudeclaw.md",
          icon: "🦞",
          source_url: "https://www.youtube.com/watch?v=9Svv-n11Ysk",
          exists: true
        },
        {
          id: "adriansolarzz-ai-ugc-geohacks",
          title: "VIRAL AI UGC — Geohacks Audiences Non-Saturées",
          subtitle: "@adriansolarzz — Géographies secondaires, CPM réduit · Mars 2026",
          tags: ["AI UGC","Geohacks","Meta Ads","Audiences","CPM","AT","CH","Nellio","Scaling"],
          file: "library/summaries/adriansolarzz-ai-ugc-geohacks.md",
          icon: "🌍",
          source_url: "https://x.com/adriansolarzz/status/2028753601474924660",
          exists: true
        },
      ]
    }
  ];

  // ── CARTE LIENS — section autonome (groupe 'liens', apparaît en page d'accueil) ──
  rawCatalog.push({
    category: "🔗 Liens — Ressources #ressources",
    color: "#f43f5e",
    docs: [
      {
        id: "liens-ressources-discord",
        title: "🔗 LIENS — Toutes les Ressources #ressources Discord",
        subtitle: "53 ressources (màj 12/03) — Formation Anti-Slop AI UGC · Guides Sora/Kling · Prompts · Tweets X · Assets · 4 nouvelles ressources 12/03",
        tags: ["Liens","Discord","AI UGC","Sora","Kling","Prompts","Formation","Ressources","Index","Quiz Funnels","Nano Banana","Agents"],
        file: "library/summaries/liens-ressources-discord.md",
        icon: "🔗",
        source_url: "https://discord.com/channels/1474514473262776633/1476994301803102312",
        exists: true
      }
    ]
  });

  // Assigner le groupe et la formation à chaque catégorie
  return rawCatalog.map(cat => {
    const group = assignGroup(cat);
    const formation = group === 'formations' ? assignFormation(cat.category) : null;
    return { ...cat, group, formation };
  });
}

// ─── ASSIGNATION THÈME ARTICLE ────────────────────────────────────────────────
function assignArticleTheme(doc) {
  const tags = (doc.tags || []).map(t => t.toLowerCase());
  const title = (doc.title || '').toLowerCase();

  if (tags.some(t => ['meta ads','andromeda','creative diversity','roas','dtc','campagne','adset','cbo'].includes(t)) ||
      title.includes('meta') || title.includes('andromeda')) return 'meta-ads-dtc';

  if (tags.some(t => ['openclaw','agents','claude','local model','automatisation','mcp','browser'].includes(t)) ||
      title.includes('openclaw') || title.includes('agent') || title.includes('claude')) return 'openclaw-agents';

  if (tags.some(t => ['ugc','ai ugc','hook','script','influencer','kling','arcads','ugc-style','ugc style'].includes(t)) ||
      title.includes('ugc') || title.includes('influencer') || title.includes('hook')) return 'ugc-creatifs';

  if (tags.some(t => ['e-commerce','shopify','aov','offre','bundle','funnel','lancement','cro','conversion'].includes(t)) ||
      title.includes('$1m') || title.includes('scale') || title.includes('shopify')) return 'strategie-ecom';

  if (tags.some(t => ['saas','reddit','youtube','faceless','growth','organique','viral','mrr'].includes(t)) ||
      title.includes('$1k') || title.includes('$30k') || title.includes('mrr') || title.includes('youtube')) return 'business-scaling';

  // scraping, tools, voice, github, tech
  return 'outils-tech';
}

const ARTICLE_THEME_DEFS = [
  { id: 'meta-ads-dtc',     label: 'Meta Ads & DTC',       emoji: '🎯', color: '#1d9bf0' },
  { id: 'openclaw-agents',  label: 'OpenClaw & Agents',    emoji: '🤖', color: '#3b82f6' },
  { id: 'ugc-creatifs',     label: 'UGC & Créatifs',       emoji: '🎬', color: '#0ea5e9' },
  { id: 'outils-tech',      label: 'Outils & Tech',        emoji: '🛠️', color: '#6366f1' },
  { id: 'business-scaling', label: 'Business & Scaling',   emoji: '💰', color: '#38bdf8' },
  { id: 'strategie-ecom',   label: 'Stratégie E-Commerce', emoji: '📈', color: '#60a5fa' },
];

// ─── RESSOURCES CHEF LOOKUP HELPER ───────────────────────────────────────────
function getRessourcesChefDocs() {
  // Extrait tous les docs de la section "Ressources Chef" depuis getFullCatalog
  try {
    const catalog = getFullCatalog();
    const cat = catalog.find(c => c.category && c.category.includes('Ressources Chef'));
    return (cat && cat.docs) ? cat.docs : [];
  } catch(e) { return []; }
}

// ─── FLAT DOC LOOKUP ──────────────────────────────────────────────────────────
function findDoc(id) {
  // Static
  for (const cat of STATIC_CATALOG) {
    for (const doc of cat.docs) {
      if (doc.id === id) return { ...doc, exists: true };
    }
  }
  // Books
  const bookCatalog = buildBookCatalog();
  for (const cat of bookCatalog) {
    for (const doc of cat.docs) {
      if (doc.id === id) return doc;
    }
  }
  // Playlist
  const playlistCatalog = buildPlaylistCatalog();
  for (const cat of playlistCatalog) {
    for (const doc of cat.docs) {
      if (doc.id === id) return doc;
    }
  }
  // CRO
  const croCatalog = buildCROCatalog();
  for (const cat of croCatalog) {
    for (const doc of (cat.docs || [])) {
      if (doc.id === id) return doc;
    }
  }
  // Davie Fogarty
  const fogartyCatalog = buildDavieFogartyCatalog();
  for (const cat of fogartyCatalog) {
    for (const doc of (cat.docs || [])) {
      if (doc.id === id) return doc;
    }
  }
  // Marketing Mania
  const maniaCatalog = buildMarketingManiaCatalog();
  for (const cat of maniaCatalog) {
    for (const doc of (cat.docs || [])) {
      if (doc.id === id) return doc;
    }
  }
  // EVOLVE Marketing summaries (par vidéo)
  const evolveMktCatalog = buildEVOLVEMarketingCatalog();
  for (const cat of evolveMktCatalog) {
    for (const doc of (cat.docs || [])) {
      if (doc.id === id) return doc;
    }
  }
  // EVOLVE Synthèse complète + gaps agents
  const evolveSynthCatalog = buildEVOLVESynthesisCatalog();
  for (const cat of evolveSynthCatalog) {
    for (const doc of (cat.docs || [])) {
      if (doc.id === id) return doc;
    }
  }
  // Master Pellegrini
  const masterPellegriniCatalog = buildMasterPellegriniCatalog();
  for (const cat of masterPellegriniCatalog) {
    for (const doc of (cat.docs || [])) {
      if (doc.id === id) return doc;
    }
  }
  // Ressources Chef (section inline de getFullCatalog non couverte par les autres builders)
  const ressourcesChefDocs = getRessourcesChefDocs();
  for (const doc of ressourcesChefDocs) {
    if (doc.id === id) return doc;
  }
  return null;
}

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(__dirname));
app.use((req, res, next) => { res.header('Access-Control-Allow-Origin', '*'); next(); });

// ─── ROUTES ───────────────────────────────────────────────────────────────────

const GROUP_DEFS = [
  { id: 'formations', label: 'Formations',              emoji: '📚' },
  { id: 'videos',     label: 'Vidéos & Playlists',      emoji: '📺', subtitle: 'Davie Fogarty (36 vidéos) · Playlists YouTube · Tutorials' },
  { id: 'articles',   label: 'Articles & Ressources Web', emoji: '🐦', subtitle: 'Pellegrini Stratégie · Ressources Chef · Meta Ads DTC · UGC · Outils' },
  { id: 'livres',     label: 'Livres',                  emoji: '📖' },
  { id: 'strategie',  label: 'Stratégie & Outils',      emoji: '🏗️' },
  { id: 'liens',      label: 'Liens #ressources',       emoji: '🔗', subtitle: '53 ressources Discord — Anti-Slop UGC · Sora · Kling · Prompts · Tweets X · Assets' },
];

app.get('/api/groups', (req, res) => {
  const catalog = getFullCatalog();
  const result = GROUP_DEFS.map(g => {
    const count = catalog
      .filter(c => c.group === g.id)
      .reduce((s, c) => s + (c.docs || []).length, 0);
    return { ...g, count };
  });
  res.json(result);
});

app.get('/api/formations', (req, res) => {
  const catalog = getFullCatalog();
  const result = FORMATION_DEFS.map(f => {
    const cats = catalog.filter(c => c.group === 'formations' && c.formation === f.id && (c.docs||[]).length > 0);
    const catCount = cats.length;
    const docCount = cats.reduce((s, c) => s + (c.docs||[]).length, 0);
    return { ...f, catCount, docCount };
  });
  res.json(result);
});

app.get('/api/catalog', (req, res) => {
  const catalog = getFullCatalog();
  const { group, formation } = req.query;
  if (formation) {
    res.json(catalog.filter(c => c.formation === formation));
  } else if (group) {
    res.json(catalog.filter(c => c.group === group));
  } else {
    res.json(catalog);
  }
});

app.get('/api/doc/:id', (req, res) => {
  const doc = findDoc(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document non trouvé' });

  // Essayer le chemin dans WORKSPACE, puis directement depuis __dirname
  const filePath = path.join(WORKSPACE, doc.file);
  const altPath  = path.join(__dirname, '..', doc.file);
  const tryPaths = [filePath, altPath];
  let content = null;
  for (const p of tryPaths) {
    try { content = fs.readFileSync(p, 'utf8'); break; } catch(e) {}
  }
  if (content === null) {
    return res.status(404).json({ error: 'Fichier introuvable : ' + doc.file, tried: tryPaths });
  }
  res.json({ ...doc, content });
});

app.get('/api/article-themes', (req, res) => {
  const docs = getRessourcesChefDocs();
  // Group docs by theme
  const byTheme = {};
  for (const def of ARTICLE_THEME_DEFS) byTheme[def.id] = [];
  for (const doc of docs) {
    const tid = assignArticleTheme(doc);
    if (!byTheme[tid]) byTheme[tid] = [];
    byTheme[tid].push({ id: doc.id, title: doc.title, subtitle: doc.subtitle, icon: doc.icon, source_url: doc.source_url, tags: doc.tags });
  }
  const result = ARTICLE_THEME_DEFS.map(def => ({
    ...def,
    docCount: byTheme[def.id].length,
    docs: byTheme[def.id]
  }));
  res.json(result);
});

app.get('/api/stats', (req, res) => {
  const catalog = getFullCatalog();
  let totalDocs = 0, totalLines = 0, totalSize = 0;
  for (const cat of catalog) {
    for (const doc of (cat.docs || [])) {
      totalDocs++;
      try {
        const content = fs.readFileSync(path.join(WORKSPACE, doc.file), 'utf8');
        totalLines += content.split('\n').length;
        totalSize += Buffer.byteLength(content, 'utf8');
      } catch (e) {}
    }
  }
  res.json({ totalDocs, totalLines, totalSize, categories: catalog.length });
});

// ── VIEWER MARKDOWN GÉNÉRIQUE ────────────────────────────────────────────────
// Sert n'importe quel fichier .md du workspace rendu en HTML
// Usage : http://localhost:4242/view?path=formations/whop-ecomtalent/transcripts/xxx_formatted.md
app.get('/view', (req, res) => {
  const rel  = (req.query.path || '').replace(/\.\./g, '');  // sécurité : no traversal
  const filePath = path.join(WORKSPACE, rel);
  if (!filePath.startsWith(WORKSPACE)) return res.status(403).send('Forbidden');
  let content;
  try { content = fs.readFileSync(filePath, 'utf8'); }
  catch(e) { return res.status(404).send(`<h2>Fichier introuvable</h2><code>${rel}</code>`); }
  const title = path.basename(filePath, '.md').replace(/_/g, ' ');
  res.send(`<!DOCTYPE html><html lang="fr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
<script src="/marked.min.js"></script>
<style>
  :root{--bg:#09090f;--bg-2:#0f0f1a;--text:#e8e8f0;--text-dim:#8888aa;--accent:#6366f1;--border:rgba(255,255,255,0.07);--f:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;--f-mono:'SF Mono','Fira Code',monospace;}
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{background:var(--bg);color:var(--text);font-family:var(--f);font-size:15px;line-height:1.7;}
  .wrap{max-width:820px;margin:0 auto;padding:40px 24px 80px;}
  .back{display:inline-block;margin-bottom:24px;color:var(--accent);text-decoration:none;font-size:13px;opacity:.8;}
  .back:hover{opacity:1;}
  h1{font-size:1.6rem;font-weight:700;margin-bottom:8px;color:#fff;}
  h2{font-size:1.15rem;font-weight:600;margin:28px 0 10px;color:var(--accent);}
  h3{font-size:1rem;font-weight:600;margin:20px 0 8px;color:#c0c0d8;}
  p{margin-bottom:14px;color:var(--text);}
  blockquote{border-left:3px solid var(--accent);padding:8px 16px;background:rgba(99,102,241,0.08);border-radius:0 8px 8px 0;margin:16px 0;}
  blockquote p{margin:0;color:var(--text-dim);}
  code{font-family:var(--f-mono);font-size:13px;background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:4px;}
  pre{background:#0f0f1a;border:1px solid var(--border);border-radius:8px;padding:16px;overflow-x:auto;margin:16px 0;}
  pre code{background:none;padding:0;}
  ul,ol{padding-left:20px;margin-bottom:14px;}
  li{margin-bottom:4px;}
  hr{border:none;border-top:1px solid var(--border);margin:28px 0;}
  strong{color:#fff;}
  .meta{font-size:12px;color:var(--text-dim);margin-bottom:24px;}
</style></head><body>
<div class="wrap">
  <a class="back" href="javascript:history.back()">← Retour</a>
  <div class="meta">📄 ${rel}</div>
  <div id="content"></div>
</div>
<script>
  marked.setOptions({breaks:true,gfm:true});
  document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(content)});
</script>
</body></html>`);
});

app.listen(PORT, () => {
  console.log(`\n⚡ Bibliothèque Clawdbot Prime`);
  console.log(`📚 Serveur → http://localhost:${PORT}`);
  console.log(`📁 Workspace : ${WORKSPACE}`);
  console.log(`📖 62 résumés de livres + 28 vidéos OpenClaw chargés\n`);
});
