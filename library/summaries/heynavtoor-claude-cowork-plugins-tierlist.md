# Tier List : 21 Plugins Claude Cowork Testés (La Vérité)
> Source: @heynavtoor (Nav Toor — theprohuman.ai) — X Article | 26 Feb 2026
> URL: https://x.com/heynavtoor/status/2027054100807106829
> Stats: 1.2M vues · 14,895 bookmarks · 3769 likes · 358 RT
> Auteur: 31.7K followers — Guides AI pratiques quotidiens
> Contexte: $285B de market cap software évaporé en 3 semaines après le lancement
> Intégré le: 2026-02-28

---

## 🎯 Concept Central

Anthropic a lancé 21 plugins pour Claude Cowork : 11 le 30 janvier, 10 autres le 24 février. **Ces plugins ne sont pas de meilleurs prompts — ils sont des méthodologies entières chargées dans la mémoire de travail de Claude.** La tier list honnête après 4 semaines d'usage réel sur du travail payant (pas des démos).

**Impact marché :** Thomson Reuters -18%, LegalZoom -20%, RELX -14%, Wolters Kluwer -13% = "SaaSpocalypse". JPMorgan : "les software companies sont condamnées avant d'être jugées — une abonnement $20/mois fait 40% de ce que des sièges enterprise à $150/mois faisaient."

---

## 📋 La Tier List Complète

### 🏆 S-TIER — Installer immédiatement

#### 1. Data Analysis ⭐ (meilleur plugin de la librairie)
```
/data:explore → Lit le CSV, résume chaque colonne, 
  flag anomalies, suggère 3 analyses
/data:write-query → Plain English → SQL validé + expliqué
```
**Preuve :** 45K lignes de données client → anomalie de pricing identifiée → $14K/mois récupérés. L'équipe data interne l'avait manqué pendant 2 trimestres.
**Connecteurs :** Snowflake, Databricks, BigQuery, Hex, Amplitude, Jira

#### 2. Productivity (le plugin que TOUT LE MONDE devrait installer en premier)
```
/productivity:start → Review journée, priorités, task list
```
**Connecteurs :** Slack, Notion, Asana, Linear, Jira, Monday, ClickUp, Microsoft 365
**Clé :** Compose avec les context files et global instructions → "Chief of Staff qui connaît ton emploi du temps, tes priorités, ton style de travail"

#### 3. Sales (absurdement bon pour le prospecting)
```
/sales:call-prep → Brief prospect depuis CRM + company research + talking points + objections
/sales:battlecard → Comparaison produit vs concurrent avec rebuttal language spécifique
```
**Résultat :** 90 min de prep appel → < 10 min
**Connecteurs :** HubSpot, Close, Clay, ZoomInfo, Slack, Jira, Fireflies, Microsoft 365

---

### 🥈 A-TIER — Utile, install si c'est ton rôle

#### 4. Legal (a crashé $285B de market cap — et pour cause)
- Automatise : revue de contrats, NDA triage, compliance workflows, legal briefings
- "60% du travail legal délégué aux juniors et paralegals → automatisé"
- LexisNexis a intégré ce plugin dans sa plateforme Protegé en 3 semaines
- **Raison A et pas S :** nécessite customisation pour le playbook spécifique de l'org

#### 5. Product Management
```
/product-management:write-spec → Idée vague → spec avec user stories + acceptance criteria + requirements
```
Roadmap, competitive analysis → 2-3 heures PM en quelques minutes
**Connecteurs :** Linear, Asana, Jira, Notion, Figma, Amplitude, Pendo, Intercom, Fireflies

#### 6. Marketing ✅ (pertinent Nellio)
```
/marketing:draft-content → Pointer sur brand-voice.md + audience + goal → contenu qui sonne comme ta brand
```
Campaign planning multi-canal avec messaging, timing, metrics par canal
**Connecteurs :** Slack, Canva, Figma, HubSpot, Amplitude, Notion, Ahrefs, SimilarWeb, **Klaviyo**

#### 7. Finance
- PwC partenariat Anthropic = signal fort
- Excel → PowerPoint seamless : analyse data → présentation branded = première fois qu'un outil AI couvre Microsoft Office cross-app proprement
- **Connecteurs :** Snowflake, Databricks, BigQuery, Microsoft 365, FactSet, MSCI

---

### 🥉 B-TIER — Solide, mais nécessite customisation (30-60 min)

| Plugin | Force principale | Besoin de customisation |
|--------|-----------------|------------------------|
| **8. Customer Support** | Ticket triage → KB article auto | Tone, escalation criteria, SLA structure |
| **9. HR** (new Feb 24) | Performance reviews axées comportements observables | Company-specific bands + market data |
| **10. Engineering** (new Feb 24) | Postmortem template complet (timeline, root cause, owner, deadlines) | Incident severity levels |
| **11. Operations** (new Feb 24) | Vendor evaluation → decision matrix ; process → runbook | Workflows très variables par org |
| **12. Design** (new Feb 24) | Accessibility audit WCAG + remediation ; UX copy | brand-voice.md bien écrit requis |
| **16. Financial Analysis** (new Feb 24) | Excel → PowerPoint cross-app | Templates + data sources spécifiques |
| **17-19. IB/Equity/PE** | Document review, comparable analysis, transcript parsing | Formatting standards + databases firm-spécifiques |
| **21. Brand Voice** (Tribe AI) | Analyser 10-20 exemples → brand voice guide réutilisable | Input material suffisant requis |

---

### 🔴 C-TIER — Concept fort, valeur limitée out-of-box

| Plugin | Problème |
|--------|---------|
| **13. Enterprise Search** | Qualité = fonction des connecteurs + qualité doc interne. Notion en désordre → Search en désordre. |
| **14. Bio Research** | Niche biotech R&D — PubMed, BioRender, ChEMBL. Très spécialisé. |
| **15. Cowork Plugin Management** | Meta-plugin pour créer d'autres plugins. Utile pour admins, inutile pour individus. |
| **20. Wealth Management** | Nécessite FactSet + MSCI connectés → rare le jour 1 |

---

## 🧠 Le Pattern Stratégique (que personne ne voit)

```
Wave 1 (30 Jan) → Horizontal : Productivity, Sales, Marketing, Data, Legal, Finance
                  → "SaaSpocalypse" : -$285B market cap software
Wave 2 (24 Feb) → Vertical : IB, PE, Equity Research, Wealth, HR, Engineering, Design, Ops
                  → Signal : Anthropic ne teste pas, il construit une plateforme
```

**L'arme secrète :** Les plugins sont des **markdown files**. Pas de code. Pas d'infrastructure. Open-source repo = 2,000 stars GitHub. Anthropic invite toutes les entreprises à builder les leurs. Private plugin marketplaces disponibles en enterprise.

**Mécanisme :**
```
Anthropic → modèle
MCP protocol → connexions
Plugins → expertise domain
Barrière à l'entrée → quasi zéro (fichiers texte)
```

> "This is how you go from 'AI chatbot' to 'AI operating system for work.' Not through a single killer feature. Through an ecosystem that compounds."

---

## 💡 Insights Actionnables

1. **Plugin Marketing pour Nellio** : `/marketing:draft-content` + brand-voice.md Nellio + connecteur Klaviyo → campagnes email DE multi-canal en quelques minutes (A-tier, priorité P1)
2. **Plugin Productivity pour Clawdbot Prime** : équivalent de notre HEARTBEAT.md + SOUL.md chargé comme context files → Chief of Staff effect déjà en place
3. **Créer un plugin Nellio custom** : markdown file = AGENT_BRAND_CONTEXT actuel → convertible en plugin Cowork pour les 26 agents OMNIA
4. **Plugin Customer Support pour Nellio** : après lancement → ticket → KB article DE automatique. Mais customiser avec le tone Nellio first
5. **Brand Voice plugin (Tribe AI)** : alimenter avec les 50 verbatims DE (research_v2/) + les 3 scripts Batch #1 → guide brand voice DE formalisé pour tous les agents

---

## 🏪 Applications directes pour drinknellio.com

| Plugin | Application Nellio | Priorité |
|--------|-------------------|----------|
| **Marketing** | `/marketing:draft-content` + brand-voice Nellio DE → copy Meta Ads | P1 |
| **Data Analysis** | CSV exports Meta Ads DE → anomalies ROAS → insights actionnables | P1 |
| **Sales** | Battlecard Nellio vs Jello vs natural elements → rebuttal language DE | P2 |
| **Brand Voice** | 50 verbatims DE → guide brand voice formalisé → tous les agents l'utilisent | P2 |
| **Customer Support** | Post-lancement → KB FAQ DE auto-générée depuis les tickets | P3 |

---

## ⚡ Citations Clés

> "When you install the Sales plugin, you're not just getting a prompt. You're loading an entire sales methodology into Claude's working memory."

> "The S-tier plugins already work. The A-tier plugins work with moderate setup. The B-tier plugins are frameworks waiting for your company's context."

> "Plugins are just markdown files. No code, no infrastructure, no build steps — barrier to creating new ones is essentially zero."

> "$20/month subscription doing 40% of what $150/month enterprise seats do." — JPMorgan analyst

> "Every knowledge worker will feel about Cowork the way engineers feel about Claude Code — like a tool they couldn't live without." — Kate Jensen, Anthropic Head of Americas

---

## 🔗 Liens avec la bibliothèque

- **SOUL.md + HEARTBEAT.md** = équivalent Clawdbot Prime du Productivity plugin (déjà en production)
- **AGENT_BRAND_CONTEXT** (EVOLVE) = convertible en plugin Cowork Nellio custom
- **OMNIA SaaS** : architecture modulaire des 26 agents = vision "plugin ecosystem" alignée avec la stratégie Anthropic

---

*Résumé généré automatiquement par Clawdbot Prime ⚡ — 2026-02-28*
