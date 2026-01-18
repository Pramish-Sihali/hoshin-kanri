// lib/dummyData.ts
import { StrategicObjective, AnnualObjective, Process, Metric, CatchballItem, HoshinData, CompanyKanoAnalysis, KanoFeature } from '../types/hoshin';

// =============================================================================
// CEO - Strategic Vision & Capital Pathways (Level 1)
// Breakthrough Objectives (5-Year) + Capital-Contingent Strategy
// =============================================================================
export const ceoData: HoshinData = {
  strategicObjectives: [
    {
      id: 'breakthrough-1',
      title: 'Restore EBITDA Quality ≥20% and Cash EBITDA ≥15%',
      description: 'Valuation credibility precedes any IPO or M&A. Achieve sustainable earnings quality through disciplined cost management, revenue optimization, and capital-aware execution.',
      targetYear: 2030,
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'breakthrough-2',
      title: 'Build Enterprise + VAS to ≥30% of EBITDA',
      description: 'Create structural hedge against price-led consumer wars through high-ARPU, SLA-backed enterprise revenues with predictable cash flows.',
      targetYear: 2030,
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'breakthrough-3',
      title: 'Achieve M&A-Ready Operating Architecture',
      description: 'Enable consolidation without value leakage through standardized processes, unified systems, and integration-ready infrastructure.',
      targetYear: 2028,
      owner: 'Chief Executive Officer',
      status: 'planning',
      priority: 'high'
    },
    {
      id: 'breakthrough-4',
      title: 'Establish OTT as Churn-Defence Ecosystem Lever',
      description: 'Position OTT as ARPU defense and bundling pillar - not a cost center. Prevent ARPU erosion while avoiding content traps through partner-first aggregator strategy.',
      targetYear: 2028,
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'breakthrough-5',
      title: 'Create Capital-Contingent Strategic Freedom',
      description: 'Strategy must survive both IPO and non-IPO outcomes. Pre-design capital pathways: IPO-led consolidator (Path A) vs Strategic Merger (Path B).',
      targetYear: 2027,
      owner: 'Chief Executive Officer',
      status: 'at-risk',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'ceo-annual-1',
      title: 'Execute Strategic Transformation Roadmap',
      description: 'Implement PMO-led transformation with clear milestones across all Four Pillars. Establish control layer as foundation for IPO and consolidation readiness.',
      strategicObjectiveIds: ['breakthrough-1', 'breakthrough-3'],
      targetDate: '2025-12-31',
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      progress: 45
    },
    {
      id: 'ceo-annual-2',
      title: 'Achieve M&A/IPO Decision Readiness Gate (Year 2 H2)',
      description: 'Complete pre-integration readiness assessment for Subisu/TechMinds (Path A) or WorldLink merger fast-track (Path B). Capital pathway activation.',
      strategicObjectiveIds: ['breakthrough-5', 'breakthrough-3'],
      targetDate: '2026-12-31',
      owner: 'Chief Executive Officer',
      status: 'planning',
      progress: 15
    }
  ],
  processes: [
    {
      id: 'ceo-process-1',
      title: 'Strategic Transformation Leadership & PMO',
      description: 'Executive leadership process for driving organizational transformation with PMO-led governance, workstreams, KPIs, and weekly governance cadence.',
      annualObjectiveIds: ['ceo-annual-1'],
      owner: 'Chief Executive Officer',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Executive team', 'PMO office', 'Strategic consultants', 'Change management'],
      sipoc: {
        suppliers: ['Board of Directors', 'External Advisors', 'Big-4 Consultants'],
        inputs: ['Strategic mandate', 'Capital constraints', 'Market intelligence', 'Audit findings'],
        process: 'PMO-led transformation with stage-gate governance and quarterly KPI reviews',
        outputs: ['Strategic roadmap', 'Initiative scorecards', 'Board dashboards', 'Capital pathway decisions'],
        customers: ['Board of Directors', 'Shareholders', 'All Departments', 'External Investors']
      }
    },
    {
      id: 'ceo-process-2',
      title: 'Capital Pathway Decision Framework',
      description: 'Pre-designed decision framework for Path A (IPO-led M&A) vs Path B (Strategic Merger) with ROIC gating and trigger points.',
      annualObjectiveIds: ['ceo-annual-2'],
      owner: 'Chief Executive Officer',
      startDate: '2025-06-01',
      endDate: '2026-12-31',
      status: 'planning',
      resources: ['Investment banking advisors', 'Legal team', 'M&A specialists', 'Due diligence teams']
    }
  ],
  metrics: [
    {
      id: 'ceo-metric-1',
      name: 'Strategic Objective Completion Rate',
      description: 'Percentage of breakthrough objectives on track with quarterly KPI gates passed',
      processIds: ['ceo-process-1'],
      target: 85,
      current: 45,
      unit: '% on-track',
      frequency: 'quarterly',
      owner: 'Chief Executive Officer'
    },
    {
      id: 'ceo-metric-2',
      name: 'M&A Readiness Score',
      description: 'Integration readiness assessment score for potential consolidation scenarios',
      processIds: ['ceo-process-2'],
      target: 80,
      current: 25,
      unit: '% ready',
      frequency: 'quarterly',
      owner: 'Chief Executive Officer'
    }
  ],
  catchball: [
    {
      id: 'ceo-catchball-1',
      type: 'approval',
      title: 'Strategic Architecture & Value Pillars Approval',
      description: 'Board approval required for Four Integrated Value Pillars and Control Layer architecture. Foundation for all subsequent capital decisions.',
      from: 'Chief Executive Officer',
      to: 'Board of Directors',
      relatedItemId: 'breakthrough-1',
      relatedItemType: 'strategic',
      status: 'pending',
      createdAt: '2025-01-15T09:00:00Z',
      responses: [
        {
          id: 'ceo-response-1',
          message: 'Board aligned on "discipline before ambition" approach. Proceed with Pillar I Control Layer First 18 Months implementation.',
          author: 'Board Chairman',
          createdAt: '2025-01-20T14:30:00Z'
        }
      ]
    },
    {
      id: 'ceo-catchball-2',
      type: 'question',
      title: 'Capital Pathway Decision Gate Timing',
      description: 'Request confirmation on Year 2 H2 as appropriate timing for Path A vs Path B decision. Market conditions may require acceleration.',
      from: 'Chief Executive Officer',
      to: 'Board of Directors',
      relatedItemId: 'breakthrough-5',
      relatedItemType: 'strategic',
      status: 'pending',
      createdAt: '2025-02-01T10:00:00Z',
      responses: []
    }
  ]
};

// =============================================================================
// CFO - Financial Core & Credibility Reset (Level 2 - Pillar I)
// EBITDA Restoration, Cash Flow, Capital Discipline, IPO-Grade Controls
// =============================================================================
export const cfoData: HoshinData = {
  strategicObjectives: [
    {
      id: 'theme-s1-financial',
      title: 'Financial Core First - Cash, Controls, ROIC Gating',
      description: 'Mandatory under all future scenarios. No optional growth until cash conversion is stabilized. Controls are valuation infrastructure, not compliance.',
      targetYear: 2027,
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'cfo-strategic-1',
      title: 'Achieve Sustainable EBITDA Margin ≥18-20%',
      description: 'Return to positive operating margin through EBITDA restoration with structural levers: vendor consolidation, enterprise mix shift, VAS bundling, tech efficiency.',
      targetYear: 2026,
      owner: 'Chief Financial Officer',
      status: 'at-risk',
      priority: 'high'
    },
    {
      id: 'cfo-strategic-2',
      title: 'Rebuild Cash Credibility & Working Capital Discipline',
      description: 'Restore operating cash predictability. CFO fell from 1,358.6m to 338.6m (-75.1%). Cash improved via financing, not operations - this must reverse.',
      targetYear: 2026,
      owner: 'Chief Financial Officer',
      status: 'at-risk',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'annual-a1',
      title: 'Stabilise EBITDA to ≥18% Run-Rate',
      description: 'Year 1 Foundation objective. Starting from ~13% baseline, achieve 18%+ through ZBB reset, vendor consolidation, and margin bridge implementation.',
      strategicObjectiveIds: ['theme-s1-financial', 'cfo-strategic-1'],
      targetDate: '2025-12-31',
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      progress: 35
    },
    {
      id: 'annual-a2',
      title: 'Restore Operating Cash Predictability',
      description: 'Year 1 Foundation objective. Implement working capital discipline, demand-linked capex, and ROIC gating. Target Cash EBITDA ≥15%.',
      strategicObjectiveIds: ['theme-s1-financial', 'cfo-strategic-2'],
      targetDate: '2025-12-31',
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      progress: 28
    },
    {
      id: 'cfo-annual-3',
      title: 'Implement IPO-Grade Financial Controls',
      description: 'Deploy segment P&Ls (DTH vs ISP vs OTT vs Data Center), weekly close + variance discipline, NFRS 15 compliance, Big-4 aligned audit model.',
      strategicObjectiveIds: ['theme-s1-financial'],
      targetDate: '2025-09-30',
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      progress: 42
    },
    {
      id: 'cfo-annual-4',
      title: 'Reduce FX Exposure to ≤2% of Revenue',
      description: 'Current FX impact ~7% of revenue. Implement hedging strategy and exposure cap to protect margins from currency volatility.',
      strategicObjectiveIds: ['cfo-strategic-1'],
      targetDate: '2025-12-31',
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      progress: 30
    }
  ],
  processes: [
    {
      id: 'cfo-process-1',
      title: 'Zero-Based Budgeting (ZBB) Reset',
      description: 'Complete ZBB reset for all controllable cost pools. No historical baseline assumptions - every expense justified from zero.',
      annualObjectiveIds: ['annual-a1'],
      owner: 'Financial Planning Manager',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      status: 'in-progress',
      resources: ['Financial analysts', 'Department heads', 'Cost accountants', 'Budget management system']
    },
    {
      id: 'cfo-process-2',
      title: 'Weekly Flash Close & Variance Discipline',
      description: 'Implement weekly flash close with monthly hard close. Real-time EBITDA visibility and variance analysis for rapid course correction.',
      annualObjectiveIds: ['annual-a1', 'cfo-annual-3'],
      owner: 'Financial Controller',
      startDate: '2025-02-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Finance team', 'ERP system', 'Reporting tools', 'Variance dashboards']
    },
    {
      id: 'cfo-process-3',
      title: 'Capex ROIC Gating & Demand-Linked Investment',
      description: 'Capital allocation gatekeeping with ROIC thresholds. No capex approved without demand linkage and payback analysis.',
      annualObjectiveIds: ['annual-a2'],
      owner: 'Treasury Manager',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Investment committee', 'Capital planning tools', 'Demand forecasting', 'ROI models']
    },
    {
      id: 'cfo-process-4',
      title: 'NFRS 15 Revenue Recognition Remediation',
      description: 'Address internal audit finding on revenue recognition weakness. Implement automated revenue deferral and contract performance obligation mapping.',
      annualObjectiveIds: ['cfo-annual-3'],
      owner: 'Revenue Operations Manager',
      startDate: '2025-02-01',
      endDate: '2025-08-31',
      status: 'in-progress',
      resources: ['Revenue accountants', 'External auditors', 'Legal team', 'Contract management system']
    }
  ],
  metrics: [
    {
      id: 'cfo-metric-1',
      name: 'EBITDA Margin Percentage',
      description: 'Operating EBITDA as percentage of revenue. Baseline ~13%, Target 18-20%',
      processIds: ['cfo-process-1', 'cfo-process-2'],
      target: 18,
      current: 13,
      unit: '% margin',
      frequency: 'monthly',
      owner: 'Chief Financial Officer'
    },
    {
      id: 'cfo-metric-2',
      name: 'Cash EBITDA Percentage',
      description: 'Cash conversion from EBITDA. Baseline ~10%, Target ≥15%',
      processIds: ['cfo-process-3'],
      target: 15,
      current: 10,
      unit: '% cash conversion',
      frequency: 'monthly',
      owner: 'Chief Financial Officer'
    },
    {
      id: 'cfo-metric-3',
      name: 'Return on Invested Capital (ROIC)',
      description: 'Capital efficiency measure. Currently <0%, Target ≥10%',
      processIds: ['cfo-process-3'],
      target: 10,
      current: -2,
      unit: '% ROIC',
      frequency: 'quarterly',
      owner: 'Chief Financial Officer'
    },
    {
      id: 'cfo-metric-4',
      name: 'FX Impact on Revenue',
      description: 'Foreign exchange losses as percentage of revenue. Current ~7%, Target ≤2%',
      processIds: ['cfo-process-1'],
      target: 2,
      current: 7,
      unit: '% revenue',
      frequency: 'monthly',
      owner: 'Treasury Manager'
    },
    {
      id: 'cfo-metric-5',
      name: 'Operating Cash Flow (NPR)',
      description: 'Operating cash flow in millions. FY81: 1,358.6m → FY82: 338.6m. Must recover.',
      processIds: ['cfo-process-2', 'cfo-process-3'],
      target: 1200,
      current: 339,
      unit: 'NPR Million',
      frequency: 'monthly',
      owner: 'Chief Financial Officer'
    }
  ],
  catchball: [
    {
      id: 'cfo-catchball-1',
      type: 'concern',
      title: 'Revenue Decline is Structural, Not Cyclical',
      description: 'Revenue from 5,159m to 3,715m (-28%). DTH revenue collapsed 54.5% while ISP held flat. Profitability erosion is economic. Incremental growth strategies no longer compound enterprise value.',
      from: 'Chief Financial Officer',
      to: 'Board of Directors',
      relatedItemId: 'cfo-strategic-1',
      relatedItemType: 'strategic',
      status: 'addressed',
      createdAt: '2025-01-10T11:00:00Z',
      responses: [
        {
          id: 'cfo-response-1',
          message: 'Acknowledged. Board approves pivot from growth-chasing to earnings and cash architecture. Value creation precedes valuation events.',
          author: 'Board Chairman',
          createdAt: '2025-01-12T15:00:00Z'
        }
      ]
    },
    {
      id: 'cfo-catchball-2',
      type: 'approval',
      title: 'NFRS 15 Revenue Recognition Remediation Budget',
      description: 'Request approval for external consultant engagement to address internal audit finding on revenue recognition weakness. IPO readiness requirement.',
      from: 'Financial Controller',
      to: 'Chief Financial Officer',
      relatedItemId: 'cfo-annual-3',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-02-05T09:30:00Z',
      responses: []
    }
  ]
};

// =============================================================================
// CTO - Technology, NOC & Platform Architecture (Level 2 - Pillar III)
// Programmable Infrastructure, AI-NOC, OSS/BSS, Cyber Governance
// =============================================================================
export const ctoData: HoshinData = {
  strategicObjectives: [
    {
      id: 'theme-s4-technology',
      title: 'Programmable Network & Distribution Reset',
      description: 'Transform from network operator to programmable infrastructure. Technology builds operating leverage and M&A readiness.',
      targetYear: 2028,
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'cto-strategic-1',
      title: 'Deploy AI-NOC for Predictive Operations',
      description: 'Implement AI-powered Network Operations Center with predictive incident detection, automated remediation, and proactive maintenance.',
      targetYear: 2027,
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'cto-strategic-2',
      title: 'Achieve Unified OSS/BSS Architecture',
      description: 'Consolidate operations and business support systems into unified platform. M&A-ready stack enabling seamless integration.',
      targetYear: 2027,
      owner: 'Chief Technology Officer',
      status: 'planning',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'annual-a7',
      title: 'Complete OSS/BSS & NOC Hardening',
      description: 'Year 2 Optionality objective. Deploy unified OSS/BSS blueprint and complete NOC resilience improvements.',
      strategicObjectiveIds: ['theme-s4-technology', 'cto-strategic-2'],
      targetDate: '2026-12-31',
      owner: 'Chief Technology Officer',
      status: 'planning',
      progress: 10
    },
    {
      id: 'cto-annual-1',
      title: 'Deploy AI-NOC Pilot',
      description: 'Year 1 H2 objective. Implement predictive incident detection and automated remediation pilot program.',
      strategicObjectiveIds: ['cto-strategic-1'],
      targetDate: '2025-12-31',
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      progress: 25
    },
    {
      id: 'cto-annual-2',
      title: 'Implement IAM/RBAC & SIEM Rollout',
      description: 'Address critical internal audit finding: unauthorized OSS access and ONT deletion incidents. Deploy zero-tolerance access controls.',
      strategicObjectiveIds: ['theme-s4-technology'],
      targetDate: '2025-09-30',
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      progress: 40
    },
    {
      id: 'cto-annual-3',
      title: 'Vendor Stack Consolidation',
      description: 'Reduce technology vendor complexity. Consolidate to strategic partners with standardized integrations.',
      strategicObjectiveIds: ['theme-s4-technology', 'cto-strategic-2'],
      targetDate: '2025-12-31',
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      progress: 20
    }
  ],
  processes: [
    {
      id: 'cto-process-1',
      title: 'AI-NOC Development & Deployment',
      description: 'Build predictive operations capability with ML-based incident prediction, automated ticketing, and self-healing network functions.',
      annualObjectiveIds: ['cto-annual-1'],
      owner: 'NOC Manager',
      startDate: '2025-04-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['ML engineers', 'NOC operators', 'Network architects', 'Monitoring tools']
    },
    {
      id: 'cto-process-2',
      title: 'Identity & Access Management (IAM) Implementation',
      description: 'Deploy comprehensive IAM with role-based access control, rapid deprovisioning, and SOC monitoring. Address audit observations.',
      annualObjectiveIds: ['cto-annual-2'],
      owner: 'Security Manager',
      startDate: '2025-02-01',
      endDate: '2025-09-30',
      status: 'in-progress',
      resources: ['Security team', 'IAM platform', 'SIEM tools', 'Incident response team']
    },
    {
      id: 'cto-process-3',
      title: 'OSS/BSS Unification Blueprint',
      description: 'Design and implement unified operations and business support system architecture for M&A readiness.',
      annualObjectiveIds: ['annual-a7'],
      owner: 'Enterprise Architecture Manager',
      startDate: '2025-06-01',
      endDate: '2026-12-31',
      status: 'planning',
      resources: ['Enterprise architects', 'System integrators', 'Process engineers', 'Vendor partners']
    }
  ],
  metrics: [
    {
      id: 'cto-metric-1',
      name: 'Network Uptime Percentage',
      description: 'Platform availability target. Industry standard 99.9%',
      processIds: ['cto-process-1'],
      target: 99.9,
      current: 98.5,
      unit: '% uptime',
      frequency: 'daily',
      owner: 'NOC Manager'
    },
    {
      id: 'cto-metric-2',
      name: 'Unauthorized Access Incidents',
      description: 'Critical security metric. Target zero unauthorized OSS/network access. Audit flagged multiple incidents.',
      processIds: ['cto-process-2'],
      target: 0,
      current: 8,
      unit: 'incidents/month',
      frequency: 'monthly',
      owner: 'Security Manager'
    },
    {
      id: 'cto-metric-3',
      name: 'Mean Time to Repair (MTTR)',
      description: 'Average time to resolve network incidents. Target reduction through AI-NOC.',
      processIds: ['cto-process-1'],
      target: 2,
      current: 6,
      unit: 'hours',
      frequency: 'weekly',
      owner: 'NOC Manager'
    },
    {
      id: 'cto-metric-4',
      name: 'System Integration Readiness',
      description: 'M&A integration readiness score based on OSS/BSS maturity',
      processIds: ['cto-process-3'],
      target: 85,
      current: 35,
      unit: '% ready',
      frequency: 'quarterly',
      owner: 'Enterprise Architecture Manager'
    }
  ],
  catchball: [
    {
      id: 'cto-catchball-1',
      type: 'concern',
      title: 'Critical: Unauthorized OSS Access & ONT Deletion',
      description: 'Internal audit flagged unauthorized OSS access and ONT deletion incidents. Service integrity and fraud risk. Zero-trust segments and configuration baselines urgently needed.',
      from: 'Security Manager',
      to: 'Chief Technology Officer',
      relatedItemId: 'cto-annual-2',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-01-25T14:00:00Z',
      responses: [
        {
          id: 'cto-response-1',
          message: 'Approved as priority. IAM/SIEM rollout accelerated to Y1 H1. All access logs reviewed. Deprovisioning workflow implemented.',
          author: 'Chief Technology Officer',
          createdAt: '2025-01-26T09:00:00Z'
        }
      ]
    },
    {
      id: 'cto-catchball-2',
      type: 'question',
      title: 'Mandatory IS Audit Compliance (Cyber Security By-laws 2077)',
      description: 'Internal audit notes mandatory IS audit not conducted. Regulatory and cyber exposure risk. Request guidance on audit vendor selection and timeline.',
      from: 'Security Manager',
      to: 'Chief Technology Officer',
      relatedItemId: 'theme-s4-technology',
      relatedItemType: 'strategic',
      status: 'pending',
      createdAt: '2025-02-01T10:00:00Z',
      responses: []
    }
  ]
};

// =============================================================================
// CMO - Enterprise, OTT & Customer Strategy (Level 2 - Pillar II & III)
// Enterprise GTM, OTT Repositioning, Customer Acquisition
// =============================================================================
export const cmoData: HoshinData = {
  strategicObjectives: [
    {
      id: 'theme-s2-enterprise',
      title: 'Enterprise-Led Value Expansion',
      description: 'SLA-backed, predictable, high-margin revenues. Enterprise is risk reducer (less price war exposure) and improves IPO narrative with recurring revenue.',
      targetYear: 2030,
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'theme-s3-ott',
      title: 'OTT & VAS With Economic Guardrails',
      description: 'Bundling, retention, diaspora monetisation. No exclusive content bidding wars. No minimum guarantees without scale proof. Partner-first aggregator strategy.',
      targetYear: 2028,
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'cmo-strategic-1',
      title: 'Achieve Enterprise ≥25-30% of EBITDA (5 Years)',
      description: 'Transform revenue mix from consumer-dependent to enterprise-balanced. High ARPU, multi-year contracts, SLA-backed revenues with predictable cash flows.',
      targetYear: 2030,
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'annual-a3',
      title: 'Launch Enterprise GTM v1 with SLA Discipline',
      description: 'Year 1 Foundation objective. Deploy account-based selling, standardized SLA templates with service credits, and uptime monitoring.',
      strategicObjectiveIds: ['theme-s2-enterprise', 'cmo-strategic-1'],
      targetDate: '2025-12-31',
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      progress: 30
    },
    {
      id: 'annual-a4',
      title: 'Reset OTT into Bundling-Led, ROI-Guarded Model',
      description: 'Year 1 Foundation objective. OTT as ARPU defense not cost center. Implement churn-based ROI tests, diaspora geo-pricing, ad-supported models.',
      strategicObjectiveIds: ['theme-s3-ott', 'breakthrough-4'],
      targetDate: '2025-12-31',
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      progress: 35
    },
    {
      id: 'annual-a6',
      title: 'Reach Enterprise ≥15% of EBITDA',
      description: 'Year 2 Optionality objective. Scale enterprise revenue contribution as hedge against consumer price wars.',
      strategicObjectiveIds: ['theme-s2-enterprise', 'cmo-strategic-1'],
      targetDate: '2026-12-31',
      owner: 'Chief Marketing Officer',
      status: 'planning',
      progress: 5
    },
    {
      id: 'cmo-annual-4',
      title: 'Deploy Kano-Based Enterprise Service Stack',
      description: 'Implement service architecture based on Kano model: Must-haves (compliance/reliability), Performance (margin drivers), Delighters (moat).',
      strategicObjectiveIds: ['theme-s2-enterprise'],
      targetDate: '2025-10-31',
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      progress: 25
    }
  ],
  processes: [
    {
      id: 'cmo-process-1',
      title: 'Account-Based Selling (ABM) Program',
      description: 'Enterprise GTM process with qualified pipeline management, account planning, and performance-linked incentives.',
      annualObjectiveIds: ['annual-a3'],
      owner: 'Enterprise Sales Director',
      startDate: '2025-02-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Enterprise sales team', 'CRM system', 'Marketing automation', 'Account managers']
    },
    {
      id: 'cmo-process-2',
      title: 'SLA Product Catalogue Development',
      description: 'Standardize enterprise SKUs with service level agreements, service credits, and uptime monitoring integration.',
      annualObjectiveIds: ['annual-a3', 'cmo-annual-4'],
      owner: 'Product Manager - Enterprise',
      startDate: '2025-03-01',
      endDate: '2025-09-30',
      status: 'in-progress',
      resources: ['Product team', 'Legal', 'Service delivery', 'Pricing analysts']
    },
    {
      id: 'cmo-process-3',
      title: 'OTT Bundling & Churn Analytics',
      description: 'Deploy churn analytics with cohort analysis, A/B testing on bundles, and ROI proof requirements before expansion.',
      annualObjectiveIds: ['annual-a4'],
      owner: 'OTT Product Manager',
      startDate: '2025-02-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Data analytics team', 'Content team', 'Marketing', 'Tech platform']
    },
    {
      id: 'cmo-process-4',
      title: 'Kano-Based Service Architecture Workshop',
      description: 'Define enterprise service stack using Kano economics: categorize features as Basic, Performance, or Delighter.',
      annualObjectiveIds: ['cmo-annual-4'],
      owner: 'Product Strategy Manager',
      startDate: '2025-03-01',
      endDate: '2025-06-30',
      status: 'in-progress',
      resources: ['Product team', 'Customer research', 'Pricing team', 'External facilitators']
    }
  ],
  metrics: [
    {
      id: 'cmo-metric-1',
      name: 'Enterprise Revenue as % of EBITDA',
      description: 'Enterprise contribution to profitability. Year 1 target 10%, Year 2 target 15%, 5-year target 25-30%',
      processIds: ['cmo-process-1', 'cmo-process-2'],
      target: 10,
      current: 5,
      unit: '% of EBITDA',
      frequency: 'monthly',
      owner: 'Enterprise Sales Director'
    },
    {
      id: 'cmo-metric-2',
      name: 'Enterprise Pipeline Value (NPR)',
      description: 'Qualified enterprise opportunity pipeline value',
      processIds: ['cmo-process-1'],
      target: 500,
      current: 180,
      unit: 'NPR Million',
      frequency: 'monthly',
      owner: 'Enterprise Sales Director'
    },
    {
      id: 'cmo-metric-3',
      name: 'OTT Attach Rate (Bundle)',
      description: 'Percentage of DTH/ISP customers with active OTT bundle',
      processIds: ['cmo-process-3'],
      target: 40,
      current: 18,
      unit: '% attach rate',
      frequency: 'monthly',
      owner: 'OTT Product Manager'
    },
    {
      id: 'cmo-metric-4',
      name: 'Churn Rate (Bundled vs Non-Bundled)',
      description: 'Comparative churn showing OTT bundle retention impact',
      processIds: ['cmo-process-3'],
      target: 2,
      current: 5,
      unit: '% monthly churn',
      frequency: 'monthly',
      owner: 'Customer Retention Manager'
    },
    {
      id: 'cmo-metric-5',
      name: 'Enterprise SLA Compliance Rate',
      description: 'Percentage of enterprise contracts meeting SLA commitments',
      processIds: ['cmo-process-2'],
      target: 99,
      current: 92,
      unit: '% compliance',
      frequency: 'weekly',
      owner: 'Service Delivery Manager'
    }
  ],
  catchball: [
    {
      id: 'cmo-catchball-1',
      type: 'suggestion',
      title: 'OTT Strategy Guardrail Proposal',
      description: 'Recommend explicit prohibitions: No exclusive content bidding wars, no minimum guarantees without scale proof. Partner-first aggregator approach.',
      from: 'OTT Product Manager',
      to: 'Chief Marketing Officer',
      relatedItemId: 'theme-s3-ott',
      relatedItemType: 'strategic',
      status: 'addressed',
      createdAt: '2025-01-20T11:00:00Z',
      responses: [
        {
          id: 'cmo-response-1',
          message: 'Approved. These guardrails are now mandatory policy. OTT is strategically sound but not yet financially clear on ROI - we proceed with discipline.',
          author: 'Chief Marketing Officer',
          createdAt: '2025-01-21T14:00:00Z'
        }
      ]
    },
    {
      id: 'cmo-catchball-2',
      type: 'question',
      title: 'Datalaya Integration for Enterprise Offerings',
      description: 'Datalaya can enable hosting, sovereignty, and CDN/caching for enterprise. However, internal audit flagged missing formal agreements. Clarify governance.',
      from: 'Enterprise Sales Director',
      to: 'Chief Marketing Officer',
      relatedItemId: 'annual-a3',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-02-10T09:00:00Z',
      responses: []
    }
  ]
};

// =============================================================================
// COO - Operations, Distribution & Vendor Management (Level 2 - Pillar IV)
// Ecosystem Control, Distributor Reset, Service Delivery
// =============================================================================
export const cooData: HoshinData = {
  strategicObjectives: [
    {
      id: 'theme-s5-ecosystem',
      title: 'Ecosystem Shift: From Fragmentation to Strategic Control',
      description: 'Vendor consolidation (reduce complexity, improve unit economics), performance-linked distributors, regional clustering for service efficiency.',
      targetYear: 2027,
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'coo-strategic-1',
      title: 'Achieve World-Class Service Delivery Standards',
      description: 'Implement comprehensive service excellence framework. Target industry-leading uptime and response times.',
      targetYear: 2027,
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'annual-a5',
      title: 'Implement PMO + Governance + Audit Closure',
      description: 'Year 1 Foundation objective. Establish control layer MVP with close discipline and access controls. Audit closure as mandatory KPI.',
      strategicObjectiveIds: ['theme-s5-ecosystem'],
      targetDate: '2025-12-31',
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      progress: 40
    },
    {
      id: 'annual-a9',
      title: 'Execute Vendor & Distributor Consolidation Wave-1',
      description: 'Year 2 objective. Implement vendor scorecards, consolidation wave plan, and distributor SOPs with audit rights.',
      strategicObjectiveIds: ['theme-s5-ecosystem'],
      targetDate: '2026-12-31',
      owner: 'Chief Operating Officer',
      status: 'planning',
      progress: 10
    },
    {
      id: 'coo-annual-3',
      title: 'Deploy Distributor SOPs & Performance Framework',
      description: 'Year 1 H1 objective. Standardize distributor processes, implement performance-linked payouts, and fraud controls.',
      strategicObjectiveIds: ['theme-s5-ecosystem'],
      targetDate: '2025-06-30',
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      progress: 55
    },
    {
      id: 'coo-annual-4',
      title: 'Regional Service Clustering for Efficiency',
      description: 'Reorganize service operations by regional clusters to reduce cost-to-serve and improve response times.',
      strategicObjectiveIds: ['coo-strategic-1'],
      targetDate: '2025-12-31',
      owner: 'Chief Operating Officer',
      status: 'in-progress',
      progress: 30
    }
  ],
  processes: [
    {
      id: 'coo-process-1',
      title: 'PMO Governance Framework',
      description: 'Establish Project Management Office with initiative tracking, benefit realization, and stage-gate governance.',
      annualObjectiveIds: ['annual-a5'],
      owner: 'PMO Director',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['PMO team', 'Project managers', 'Governance tools', 'Reporting dashboards']
    },
    {
      id: 'coo-process-2',
      title: 'Internal Audit Closure Program',
      description: 'Systematic closure of internal audit observations. Audit closure is KPI, not back-office item.',
      annualObjectiveIds: ['annual-a5'],
      owner: 'Internal Audit Manager',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Internal audit team', 'Department heads', 'Compliance officers', 'Tracking system']
    },
    {
      id: 'coo-process-3',
      title: 'Distributor SOPs & Fraud Controls',
      description: 'Standardize distributor operations with documented procedures, audit rights, and exception reporting.',
      annualObjectiveIds: ['coo-annual-3'],
      owner: 'Distribution Manager',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      status: 'in-progress',
      resources: ['Distribution team', 'Legal', 'Compliance', 'Field audit']
    },
    {
      id: 'coo-process-4',
      title: 'Vendor Scorecard & Consolidation Planning',
      description: 'Implement vendor performance scorecards and multi-wave consolidation plan for strategic partners.',
      annualObjectiveIds: ['annual-a9'],
      owner: 'Procurement Manager',
      startDate: '2025-06-01',
      endDate: '2026-12-31',
      status: 'planning',
      resources: ['Procurement team', 'Vendor managers', 'Legal', 'Finance']
    }
  ],
  metrics: [
    {
      id: 'coo-metric-1',
      name: 'Audit Observation Closure Rate',
      description: 'Percentage of internal audit findings closed within target timeline',
      processIds: ['coo-process-2'],
      target: 95,
      current: 68,
      unit: '% closed',
      frequency: 'monthly',
      owner: 'Internal Audit Manager'
    },
    {
      id: 'coo-metric-2',
      name: 'Distributor Commission Leakage',
      description: 'Revenue lost to commission scheme weaknesses or fraud. Internal audit flagged issues.',
      processIds: ['coo-process-3'],
      target: 0.5,
      current: 3.2,
      unit: '% of revenue',
      frequency: 'monthly',
      owner: 'Distribution Manager'
    },
    {
      id: 'coo-metric-3',
      name: 'Cost-to-Serve Reduction',
      description: 'Operational cost per customer served, targeting reduction through clustering',
      processIds: ['coo-process-4'],
      target: 15,
      current: 0,
      unit: '% reduction YoY',
      frequency: 'quarterly',
      owner: 'Operations Manager'
    },
    {
      id: 'coo-metric-4',
      name: 'Vendor Consolidation Progress',
      description: 'Number of vendors reduced through strategic consolidation',
      processIds: ['coo-process-4'],
      target: 30,
      current: 5,
      unit: '% vendors reduced',
      frequency: 'quarterly',
      owner: 'Procurement Manager'
    }
  ],
  catchball: [
    {
      id: 'coo-catchball-1',
      type: 'concern',
      title: 'Referral Issues & Commission Scheme Weaknesses',
      description: 'Internal audit identified significant control gaps in distributor commissions and referral programs. Risk of revenue leakage and fraud.',
      from: 'Distribution Manager',
      to: 'Chief Operating Officer',
      relatedItemId: 'coo-annual-3',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-01-28T10:00:00Z',
      responses: [
        {
          id: 'coo-response-1',
          message: 'Prioritize Distributor SOPs implementation. Implement maker-checker for all commission approvals. Monthly audit of top 20 distributors.',
          author: 'Chief Operating Officer',
          createdAt: '2025-01-29T11:00:00Z'
        }
      ]
    },
    {
      id: 'coo-catchball-2',
      type: 'approval',
      title: 'RBIA Policy Implementation',
      description: 'Internal audit noted absence of Risk-Based Internal Audit (RBIA) policy creating blind spots. Request approval for RBIA framework rollout.',
      from: 'Internal Audit Manager',
      to: 'Chief Operating Officer',
      relatedItemId: 'annual-a5',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-02-05T14:00:00Z',
      responses: []
    }
  ]
};

// =============================================================================
// Unified DishHome Dataset (All Levels Combined)
// =============================================================================
export const dishHomeUnifiedData: HoshinData = {
  strategicObjectives: [
    ...ceoData.strategicObjectives,
    ...cfoData.strategicObjectives,
    ...ctoData.strategicObjectives,
    ...cmoData.strategicObjectives,
    ...cooData.strategicObjectives
  ],
  annualObjectives: [
    ...ceoData.annualObjectives,
    ...cfoData.annualObjectives,
    ...ctoData.annualObjectives,
    ...cmoData.annualObjectives,
    ...cooData.annualObjectives
  ],
  processes: [
    ...ceoData.processes,
    ...cfoData.processes,
    ...ctoData.processes,
    ...cmoData.processes,
    ...cooData.processes
  ],
  metrics: [
    ...ceoData.metrics,
    ...cfoData.metrics,
    ...ctoData.metrics,
    ...cmoData.metrics,
    ...cooData.metrics
  ],
  catchball: [
    ...ceoData.catchball,
    ...cfoData.catchball,
    ...ctoData.catchball,
    ...cmoData.catchball,
    ...cooData.catchball
  ]
};

// =============================================================================
// Kano Model Data - DishHome & Competitors
// Based on Enterprise Product Architecture (Slide 11) and Competitive Landscape (Slide 16)
// =============================================================================

// DishHome Enterprise Service Features (Based on Kano Service Stack)
const dishHomeKanoFeatures: KanoFeature[] = [
  // BASIC (Must-Haves) - Entry cost, don't over-engineer
  {
    id: 'dh-feature-1',
    name: 'Dedicated Internet Connectivity',
    description: 'Enterprise-grade dedicated internet with guaranteed bandwidth allocation',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 1,
    importance: 5,
    satisfactionImpact: 0.3,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise'],
    notes: 'Must-have compliance requirement. Table stakes for enterprise deals.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'dh-feature-2',
    name: 'Network Redundancy & Failover',
    description: 'Automatic failover to backup links ensuring business continuity',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 1,
    importance: 5,
    satisfactionImpact: 0.3,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise'],
    notes: 'Enterprise customers expect this. Absence causes immediate dissatisfaction.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'dh-feature-3',
    name: 'Cybersecurity Baseline',
    description: 'Standard security features: firewall, DDoS protection, secure DNS',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 0,
    importance: 5,
    satisfactionImpact: 0.2,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise', 'theme-s4-technology'],
    notes: 'Compliance requirement. Expected standard, not differentiator.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  // PERFORMANCE (Margin Drivers) - More is better, competitive battleground
  {
    id: 'dh-feature-4',
    name: 'Managed WiFi Solutions',
    description: 'Enterprise WiFi with centralized management, analytics, and guest access',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 2,
    importance: 4,
    satisfactionImpact: 0.7,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise', 'cmo-strategic-1'],
    notes: 'Linear satisfaction driver. Key margin opportunity.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'dh-feature-5',
    name: 'SD-WAN Implementation',
    description: 'Software-defined WAN for multi-site enterprises with intelligent routing',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 2,
    importance: 4,
    satisfactionImpact: 0.75,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise', 'cmo-strategic-1'],
    notes: 'Growing enterprise requirement. Competitive battleground feature.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'dh-feature-6',
    name: 'Secure Access Service Edge (SASE)',
    description: 'Cloud-delivered security with zero-trust network access',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 2,
    importance: 3,
    satisfactionImpact: 0.65,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise'],
    notes: 'Emerging requirement. First-mover advantage potential.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'dh-feature-7',
    name: 'Real-Time Network Monitoring',
    description: 'Proactive monitoring with dashboards, alerts, and SLA tracking',
    category: 'performance',
    dysfunctionalScore: -1,
    functionalScore: 2,
    importance: 4,
    satisfactionImpact: 0.6,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise', 'cto-strategic-1'],
    notes: 'Increasingly expected. Quality differentiator.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  // EXCITEMENT (Delighters/Moat) - High priority for differentiation
  {
    id: 'dh-feature-8',
    name: 'Data Sovereignty Solutions',
    description: 'On-premise and Nepal-based data hosting ensuring regulatory compliance and sovereignty',
    category: 'excitement',
    dysfunctionalScore: 1,
    functionalScore: 2,
    importance: 4,
    satisfactionImpact: 0.9,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise', 'cmo-strategic-1'],
    notes: 'Unique differentiator via Datalaya integration. Moat feature.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'dh-feature-9',
    name: 'Edge Caching & CDN',
    description: 'Local edge caching for optimized content delivery and reduced latency',
    category: 'excitement',
    dysfunctionalScore: 1,
    functionalScore: 2,
    importance: 3,
    satisfactionImpact: 0.85,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise', 'theme-s3-ott'],
    notes: 'Delighter for content-heavy enterprises. OTT economics enabler.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'dh-feature-10',
    name: 'Enterprise OTT Distribution',
    description: 'White-label OTT distribution capability for enterprise content needs',
    category: 'excitement',
    dysfunctionalScore: 1,
    functionalScore: 2,
    importance: 3,
    satisfactionImpact: 0.8,
    linkedStrategicObjectiveIds: ['theme-s2-enterprise', 'theme-s3-ott', 'breakthrough-4'],
    notes: 'Unique offering. Creates stickiness and additional revenue streams.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
];

// WorldLink Competitor Features (Market Leader)
const worldLinkKanoFeatures: KanoFeature[] = [
  {
    id: 'wl-feature-1',
    name: 'Fiber Network Coverage',
    description: 'Extensive fiber infrastructure with widest market coverage',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 1,
    importance: 5,
    satisfactionImpact: 0.4,
    notes: 'Market leader advantage. 900k+ subscribers base.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'wl-feature-2',
    name: 'Network Redundancy',
    description: 'Standard redundancy features',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 1,
    importance: 5,
    satisfactionImpact: 0.3,
    notes: 'Table stakes delivery.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'wl-feature-3',
    name: 'Basic Security Services',
    description: 'Standard security package',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 0,
    importance: 5,
    satisfactionImpact: 0.2,
    notes: 'Compliance baseline.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'wl-feature-4',
    name: 'Enterprise WiFi Management',
    description: 'Managed WiFi for businesses',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 2,
    importance: 4,
    satisfactionImpact: 0.7,
    notes: 'Competitive offering.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'wl-feature-5',
    name: 'SD-WAN Services',
    description: 'Software-defined WAN for enterprise',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 2,
    importance: 4,
    satisfactionImpact: 0.7,
    notes: 'Similar to DishHome offering.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'wl-feature-6',
    name: 'SLA-Backed Enterprise Plans',
    description: 'Service level guarantees with compensation',
    category: 'performance',
    dysfunctionalScore: -1,
    functionalScore: 2,
    importance: 4,
    satisfactionImpact: 0.65,
    notes: '2तै program benchmark.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'wl-feature-7',
    name: 'Limited Data Center Services',
    description: 'Basic hosting and colocation',
    category: 'indifferent',
    dysfunctionalScore: 0,
    functionalScore: 1,
    importance: 2,
    satisfactionImpact: 0.3,
    notes: 'Not a focus area for WorldLink.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
];

// Nepal Telecom Features (Government-Backed)
const nepalTelecomKanoFeatures: KanoFeature[] = [
  {
    id: 'nt-feature-1',
    name: 'Nationwide Coverage',
    description: 'Broadest geographic reach including rural areas',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 2,
    importance: 5,
    satisfactionImpact: 0.5,
    notes: 'Government mandate coverage advantage.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'nt-feature-2',
    name: 'Basic Internet Services',
    description: 'Standard broadband connectivity',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 1,
    importance: 5,
    satisfactionImpact: 0.3,
    notes: 'Core offering.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'nt-feature-3',
    name: 'Government Pricing',
    description: 'Regulated pricing structure',
    category: 'basic',
    dysfunctionalScore: -1,
    functionalScore: 1,
    importance: 4,
    satisfactionImpact: 0.3,
    notes: 'Price advantage for cost-conscious segments.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'nt-feature-4',
    name: 'Enterprise Data Services',
    description: 'Leased lines and data services for enterprises',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 1,
    importance: 3,
    satisfactionImpact: 0.5,
    notes: 'Traditional enterprise focus.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'nt-feature-5',
    name: 'Limited Value-Added Services',
    description: 'Basic VAS offerings',
    category: 'indifferent',
    dysfunctionalScore: 0,
    functionalScore: 0,
    importance: 2,
    satisfactionImpact: 0.2,
    notes: 'Weakness area - limited innovation.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
];

// Vianet Features
const vianetKanoFeatures: KanoFeature[] = [
  {
    id: 'vn-feature-1',
    name: 'Fiber Connectivity',
    description: 'FTTH services in urban areas',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 1,
    importance: 5,
    satisfactionImpact: 0.35,
    notes: '300-350k subscriber base.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'vn-feature-2',
    name: 'Basic Enterprise Services',
    description: 'Standard business connectivity',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 1,
    importance: 4,
    satisfactionImpact: 0.3,
    notes: 'Mid-tier enterprise offering.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'vn-feature-3',
    name: 'Managed Services',
    description: 'IT managed services bundle',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 1,
    importance: 3,
    satisfactionImpact: 0.5,
    notes: 'Growing service area.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'vn-feature-4',
    name: 'Customer Support Quality',
    description: 'Responsive technical support',
    category: 'performance',
    dysfunctionalScore: -1,
    functionalScore: 2,
    importance: 4,
    satisfactionImpact: 0.6,
    notes: 'Differentiation attempt.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
];

// Subisu Features (Potential M&A Target)
const subisuKanoFeatures: KanoFeature[] = [
  {
    id: 'sb-feature-1',
    name: 'Cable Internet Services',
    description: 'HFC and fiber connectivity',
    category: 'basic',
    dysfunctionalScore: -2,
    functionalScore: 1,
    importance: 5,
    satisfactionImpact: 0.3,
    notes: '~300k subscriber base. M&A target.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'sb-feature-2',
    name: 'Cable TV Integration',
    description: 'Triple-play bundling capability',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 1,
    importance: 3,
    satisfactionImpact: 0.45,
    notes: 'Legacy cable infrastructure.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'sb-feature-3',
    name: 'Local Content',
    description: 'Localized content offerings',
    category: 'performance',
    dysfunctionalScore: 0,
    functionalScore: 1,
    importance: 3,
    satisfactionImpact: 0.4,
    notes: 'Content differentiation attempt.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
];

// Export Kano Analyses for Companies
export const dishHomeKanoAnalysis: CompanyKanoAnalysis = {
  id: 'kano-dishhome',
  companyName: 'DishHome',
  companyType: 'self',
  industry: 'Telecommunications - DTH/ISP/OTT',
  features: dishHomeKanoFeatures,
  overallScore: 72,
  strengthAreas: ['Data Sovereignty (Datalaya)', 'Enterprise OTT Distribution', 'Edge Caching', 'DTH-ISP-OTT Integration'],
  weaknessAreas: ['Market Scale vs WorldLink', 'Enterprise Sales Maturity', 'Current Financial Performance'],
  analysisDate: '2025-01-15T10:00:00Z'
};

export const worldLinkKanoAnalysis: CompanyKanoAnalysis = {
  id: 'kano-worldlink',
  companyName: 'WorldLink',
  companyType: 'competitor',
  industry: 'Telecommunications - ISP',
  features: worldLinkKanoFeatures,
  overallScore: 78,
  strengthAreas: ['Market Leadership', 'Scale (900k+ subscribers)', 'SLA Programs (2तै)', 'Distribution Network'],
  weaknessAreas: ['Data Center/Sovereignty', 'OTT Integration', 'DTH Cross-sell'],
  analysisDate: '2025-01-15T10:00:00Z'
};

export const nepalTelecomKanoAnalysis: CompanyKanoAnalysis = {
  id: 'kano-nepal-telecom',
  companyName: 'Nepal Telecom',
  companyType: 'competitor',
  industry: 'Telecommunications - Full Service',
  features: nepalTelecomKanoFeatures,
  overallScore: 65,
  strengthAreas: ['Nationwide Coverage', 'Government Backing', 'Capital Access', 'Enterprise Legacy'],
  weaknessAreas: ['Innovation Speed', 'Value-Added Services', 'Customer Experience'],
  analysisDate: '2025-01-15T10:00:00Z'
};

export const vianetKanoAnalysis: CompanyKanoAnalysis = {
  id: 'kano-vianet',
  companyName: 'Vianet',
  companyType: 'competitor',
  industry: 'Telecommunications - ISP',
  features: vianetKanoFeatures,
  overallScore: 62,
  strengthAreas: ['Customer Support', 'Urban Focus', 'Managed Services'],
  weaknessAreas: ['Scale (300-350k)', 'Enterprise Depth', 'Geographic Reach'],
  analysisDate: '2025-01-15T10:00:00Z'
};

export const subisuKanoAnalysis: CompanyKanoAnalysis = {
  id: 'kano-subisu',
  companyName: 'Subisu',
  companyType: 'competitor',
  industry: 'Telecommunications - Cable/ISP',
  features: subisuKanoFeatures,
  overallScore: 55,
  strengthAreas: ['Triple-Play Legacy', 'Local Content', 'Established Base'],
  weaknessAreas: ['Technology Modernization', 'Scale (~300k)', 'Enterprise Capability'],
  analysisDate: '2025-01-15T10:00:00Z'
};

// All Kano Analyses Array (for store initialization)
export const allKanoAnalyses: CompanyKanoAnalysis[] = [
  dishHomeKanoAnalysis,
  worldLinkKanoAnalysis,
  nepalTelecomKanoAnalysis,
  vianetKanoAnalysis,
  subisuKanoAnalysis
];

// =============================================================================
// Dataset Options for UI Selection
// =============================================================================
export interface DatasetOption {
  id: string;
  name: string;
  description: string;
  data: HoshinData;
}

export const availableDatasets: DatasetOption[] = [
  {
    id: 'dishhome-unified',
    name: 'DishHome Unified Strategic Plan (All Levels)',
    description: 'Complete 5-year Hoshin Kanri plan across all executive levels - Breakthrough Objectives, Annual Objectives, and Four Pillars',
    data: dishHomeUnifiedData
  },
  {
    id: 'ceo-strategic',
    name: 'CEO - Strategic Vision & Capital Pathways (Level 1)',
    description: 'Breakthrough objectives, capital-contingent strategy, M&A readiness, and PMO transformation leadership',
    data: ceoData
  },
  {
    id: 'cfo-financial',
    name: 'CFO - Financial Core & Credibility Reset (Pillar I)',
    description: 'EBITDA restoration, cash flow predictability, ROIC gating, and IPO-grade financial controls',
    data: cfoData
  },
  {
    id: 'cto-technology',
    name: 'CTO - Technology, NOC & Platform Architecture (Pillar III)',
    description: 'AI-NOC, OSS/BSS unification, IAM/SIEM, cyber governance, and M&A-ready infrastructure',
    data: ctoData
  },
  {
    id: 'cmo-enterprise',
    name: 'CMO - Enterprise, OTT & Customer Strategy (Pillar II)',
    description: 'Enterprise GTM, SLA product stack, OTT repositioning with economic guardrails, Kano-based architecture',
    data: cmoData
  },
  {
    id: 'coo-operations',
    name: 'COO - Operations, Distribution & Ecosystem (Pillar IV)',
    description: 'PMO governance, vendor/distributor consolidation, audit closure, and service delivery excellence',
    data: cooData
  }
];

// =============================================================================
// Legacy Exports for Backward Compatibility
// =============================================================================
export const dummyStrategicObjectives = dishHomeUnifiedData.strategicObjectives;
export const dummyAnnualObjectives = dishHomeUnifiedData.annualObjectives;
export const dummyProcesses = dishHomeUnifiedData.processes;
export const dummyMetrics = dishHomeUnifiedData.metrics;
export const dummyCatchballItems = dishHomeUnifiedData.catchball;
export const allDummyData = dishHomeUnifiedData;
