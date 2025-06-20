// lib/dummyData.ts
import { StrategicObjective, AnnualObjective, Process, Metric, CatchballItem } from '../types/hoshin';

export const dummyStrategicObjectives: StrategicObjective[] = [
  {
    id: 'strategic-1',
    title: 'Secure Bilateral Trade Agreements for Market Access',
    description: 'Negotiate and finalize 5+ comprehensive bilateral trade agreements with key markets (US, EU, China, India, ASEAN) to facilitate Nepal\'s export growth by 2026.',
    targetYear: 2026,
    owner: 'Ministry of Foreign Affairs',
    status: 'at-risk',
    priority: 'high'
  },
  {
    id: 'strategic-2',
    title: 'Establish Strategic Export Market Penetration',
    description: 'Systematically penetrate priority export markets in North America, Europe, and Asia through coordinated diplomatic and commercial efforts to achieve USD 10 billion export target by 2030.',
    targetYear: 2030,
    owner: 'Trade Promotion Division, MoFA',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-3',
    title: 'Activate Economic Diaspora Networks',
    description: 'Mobilize Nepal\'s global diaspora as strategic economic partners for market access, investment flows, and technology transfer across key sectors.',
    targetYear: 2027,
    owner: 'Consular Services Division, MoFA',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-4',
    title: 'Attract Export-Oriented Foreign Direct Investment',
    description: 'Secure USD 2 billion in export-oriented FDI by 2028, focusing on hydropower, agri-tech, IT services, and manufacturing sectors.',
    targetYear: 2028,
    owner: 'Investment Board Nepal / MoFA',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-5',
    title: 'Develop Sector-Specific Diplomatic Support Systems',
    description: 'Create specialized diplomatic support frameworks for Nepal\'s five priority export sectors: hydropower, agri-tech, IT services, textiles, and handicrafts.',
    targetYear: 2026,
    owner: 'Economic Diplomacy Division, MoFA',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 'strategic-6',
    title: 'Establish Digital Economic Diplomacy Infrastructure',
    description: 'Deploy digital platforms and AI-powered tools for real-time coordination of economic diplomacy activities across embassies, trade offices, and stakeholders.',
    targetYear: 2025,
    owner: 'Digital Diplomacy Unit, MoFA',
    status: 'at-risk',
    priority: 'medium'
  }
];

export const dummyAnnualObjectives: AnnualObjective[] = [
  {
    id: 'annual-1',
    title: 'Conclude 2 Major Trade Agreements',
    description: 'Finalize trade agreements with European Union and ASEAN bloc, securing preferential market access for Nepal\'s priority export products.',
    strategicObjectiveIds: ['strategic-1'],
    targetDate: '2025-12-31',
    owner: 'Trade Negotiation Team, MoFA',
    status: 'in-progress',
    progress: 65
  },
  {
    id: 'annual-2',
    title: 'Execute 15 High-Impact Trade Missions',
    description: 'Conduct 15 sector-specific trade missions to US, EU, China, and Middle East markets, targeting USD 500 million in potential export deals.',
    strategicObjectiveIds: ['strategic-2'],
    targetDate: '2025-11-30',
    owner: 'Trade Promotion Division, MoFA',
    status: 'in-progress',
    progress: 73
  },
  {
    id: 'annual-3',
    title: 'Establish 8 Diaspora Business Networks',
    description: 'Create formal diaspora business networks in 8 key markets with 500+ active members to facilitate trade matchmaking and investment flows.',
    strategicObjectiveIds: ['strategic-3'],
    targetDate: '2025-10-31',
    owner: 'Honorary Consuls Coordination Unit',
    status: 'in-progress',
    progress: 80
  },
  {
    id: 'annual-4',
    title: 'Secure USD 300 Million in Export-FDI Commitments',
    description: 'Attract firm FDI commitments of USD 300 million in export-oriented projects, with focus on hydropower and agri-tech sectors.',
    strategicObjectiveIds: ['strategic-4'],
    targetDate: '2025-12-31',
    owner: 'Investment Promotion Team, IBN/MoFA',
    status: 'in-progress',
    progress: 45
  },
  {
    id: 'annual-5',
    title: 'Launch 5 Sector-Specific Trade Offices',
    description: 'Establish dedicated trade promotion offices in New York, Frankfurt, Shanghai, Dubai, and Delhi focusing on Nepal\'s priority export sectors.',
    strategicObjectiveIds: ['strategic-2', 'strategic-5'],
    targetDate: '2025-09-30',
    owner: 'Embassy Coordination Division, MoFA',
    status: 'in-progress',
    progress: 60
  },
  {
    id: 'annual-6',
    title: 'Deploy Economic Diplomacy Digital Platform',
    description: 'Launch integrated digital platform connecting all embassies, trade offices, exporters, and stakeholders for real-time coordination and market intelligence.',
    strategicObjectiveIds: ['strategic-6'],
    targetDate: '2025-08-31',
    owner: 'Digital Diplomacy Unit, MoFA',
    status: 'planning',
    progress: 30
  },
  {
    id: 'annual-7',
    title: 'Host 3 Major International Investment Summits',
    description: 'Organize Nepal Investment Summit 2025, Hydropower Investment Forum, and IT Services Expo to attract international investors and buyers.',
    strategicObjectiveIds: ['strategic-4', 'strategic-5'],
    targetDate: '2025-11-30',
    owner: 'Event Management Division, MoFA',
    status: 'in-progress',
    progress: 55
  },
  {
    id: 'annual-8',
    title: 'Achieve 25% Increase in Export Inquiries',
    description: 'Generate 25% increase in qualified export inquiries through coordinated embassy commercial activities and digital outreach campaigns.',
    strategicObjectiveIds: ['strategic-2', 'strategic-6'],
    targetDate: '2025-12-31',
    owner: 'Commercial Attachés Network',
    status: 'in-progress',
    progress: 68
  },
  {
    id: 'annual-9',
    title: 'Establish 50 Strategic Business Partnerships',
    description: 'Facilitate 50 formal business partnerships between Nepali exporters and international buyers/distributors through diplomatic channels.',
    strategicObjectiveIds: ['strategic-2', 'strategic-3'],
    targetDate: '2025-10-31',
    owner: 'Business Facilitation Unit, MoFA',
    status: 'in-progress',
    progress: 42
  },
  {
    id: 'annual-10',
    title: 'Launch Diaspora Investment Fund',
    description: 'Establish USD 50 million diaspora-led investment fund targeting Nepal\'s export-oriented SMEs with international market potential.',
    strategicObjectiveIds: ['strategic-3', 'strategic-4'],
    targetDate: '2025-12-31',
    owner: 'Diaspora Affairs Division, MoFA',
    status: 'planning',
    progress: 25
  }
];

export const dummyProcesses: Process[] = [
  {
    id: 'process-1',
    title: 'Quarterly Trade Agreement Review and Acceleration',
    description: 'Conduct quarterly high-level review meetings with trade negotiation teams to accelerate pending bilateral agreement processes.',
    annualObjectiveIds: ['annual-1'],
    owner: 'Foreign Secretary Office',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'completed',
    resources: ['Senior negotiators', 'Legal experts', 'Sector specialists', 'Embassy coordination', 'Translation services']
  },
  {
    id: 'process-2',
    title: 'Strategic Trade Mission Planning and Execution',
    description: 'Plan, coordinate, and execute high-impact trade missions with comprehensive pre-mission preparation and post-mission follow-up.',
    annualObjectiveIds: ['annual-2'],
    owner: 'Trade Promotion Division',
    startDate: '2025-02-01',
    endDate: '2025-11-30',
    status: 'in-progress',
    resources: ['Mission coordinators', 'B2B matchmaking platform', 'Marketing materials', 'Translator services', 'Embassy support']
  },
  {
    id: 'process-3',
    title: 'Diaspora Business Network Development',
    description: 'Systematically identify, engage, and organize diaspora entrepreneurs into formal business networks for trade facilitation.',
    annualObjectiveIds: ['annual-3'],
    owner: 'Honorary Consuls Coordination Unit',
    startDate: '2025-01-15',
    endDate: '2025-10-31',
    status: 'in-progress',
    resources: ['Diaspora database', 'Network coordinators', 'Digital platform', 'Event management', 'Communication tools']
  },
  {
    id: 'process-4',
    title: 'Investment Promotion and Pipeline Management',
    description: 'Develop and manage investment pipeline through systematic investor outreach, due diligence, and facilitation support.',
    annualObjectiveIds: ['annual-4'],
    owner: 'Investment Promotion Team',
    startDate: '2025-03-01',
    endDate: '2025-12-31',
    status: 'in-progress',
    resources: ['Investment officers', 'Project pipelines', 'Investor database', 'Due diligence teams', 'Legal support']
  },
  {
    id: 'process-5',
    title: 'Sector-Specific Trade Office Establishment',
    description: 'Establish and operationalize dedicated trade promotion offices in key markets with sector-specific expertise and mandate.',
    annualObjectiveIds: ['annual-5'],
    owner: 'Embassy Coordination Division',
    startDate: '2025-04-01',
    endDate: '2025-09-30',
    status: 'in-progress',
    resources: ['Office infrastructure', 'Trade officers', 'Market research tools', 'Networking budgets', 'Digital presence']
  },
  {
    id: 'process-6',
    title: 'Digital Platform Development and Integration',
    description: 'Develop comprehensive digital economic diplomacy platform integrating all stakeholders and providing real-time coordination capabilities.',
    annualObjectiveIds: ['annual-6'],
    owner: 'Digital Diplomacy Unit',
    startDate: '2025-03-01',
    endDate: '2025-08-31',
    status: 'planning',
    resources: ['Software developers', 'System architects', 'Integration specialists', 'User training programs', 'Cloud infrastructure']
  },
  {
    id: 'process-7',
    title: 'International Investment Summit Organization',
    description: 'Plan and execute major international investment summits with comprehensive participant management and follow-up protocols.',
    annualObjectiveIds: ['annual-7'],
    owner: 'Event Management Division',
    startDate: '2025-05-01',
    endDate: '2025-11-30',
    status: 'in-progress',
    resources: ['Event planners', 'Marketing teams', 'Venue management', 'VIP coordination', 'Media relations']
  },
  {
    id: 'process-8',
    title: 'Embassy Commercial Activities Coordination',
    description: 'Coordinate and standardize commercial promotion activities across all embassies and consulates for maximum export inquiry generation.',
    annualObjectiveIds: ['annual-8'],
    owner: 'Commercial Attachés Network',
    startDate: '2025-02-01',
    endDate: '2025-12-31',
    status: 'in-progress',
    resources: ['Commercial attachés', 'Marketing budgets', 'Digital outreach tools', 'Training programs', 'Reporting systems']
  },
  {
    id: 'process-9',
    title: 'Business Partnership Facilitation Program',
    description: 'Systematically identify and facilitate strategic business partnerships between Nepali exporters and international partners.',
    annualObjectiveIds: ['annual-9'],
    owner: 'Business Facilitation Unit',
    startDate: '2025-02-15',
    endDate: '2025-10-31',
    status: 'in-progress',
    resources: ['Partnership coordinators', 'Legal advisors', 'Sector experts', 'Matchmaking events', 'Due diligence support']
  },
  {
    id: 'process-10',
    title: 'Diaspora Investment Fund Setup and Management',
    description: 'Establish governance structure, raise capital, and operationalize diaspora-led investment fund for export-oriented SMEs.',
    annualObjectiveIds: ['annual-10'],
    owner: 'Diaspora Affairs Division',
    startDate: '2025-06-01',
    endDate: '2025-12-31',
    status: 'planning',
    resources: ['Fund managers', 'Legal framework', 'Investment committees', 'Due diligence teams', 'Portfolio management']
  }
];

export const dummyMetrics: Metric[] = [
  {
    id: 'metric-1',
    name: 'Trade Agreements Signed',
    description: 'Number of bilateral and multilateral trade agreements successfully concluded',
    processIds: ['process-1'],
    target: 2,
    current: 1,
    unit: 'agreements',
    frequency: 'quarterly',
    owner: 'Foreign Secretary'
  },
  {
    id: 'metric-2',
    name: 'Trade Mission Export Potential',
    description: 'Total USD value of potential export deals generated through trade missions',
    processIds: ['process-2'],
    target: 500,
    current: 320,
    unit: 'USD millions',
    frequency: 'monthly',
    owner: 'Trade Promotion Director'
  },
  {
    id: 'metric-3',
    name: 'Active Diaspora Network Members',
    description: 'Number of active members in formal diaspora business networks across key markets',
    processIds: ['process-3'],
    target: 500,
    current: 380,
    unit: 'members',
    frequency: 'monthly',
    owner: 'Honorary Consuls Coordinator'
  },
  {
    id: 'metric-4',
    name: 'FDI Commitment Value',
    description: 'Total USD value of firm foreign direct investment commitments in export-oriented projects',
    processIds: ['process-4'],
    target: 300,
    current: 135,
    unit: 'USD millions',
    frequency: 'monthly',
    owner: 'Investment Promotion Head'
  },
  {
    id: 'metric-5',
    name: 'Operational Trade Offices',
    description: 'Number of sector-specific trade promotion offices operational in key international markets',
    processIds: ['process-5'],
    target: 5,
    current: 3,
    unit: 'offices',
    frequency: 'quarterly',
    owner: 'Embassy Coordination Director'
  },
  {
    id: 'metric-6',
    name: 'Digital Platform User Adoption',
    description: 'Percentage of target stakeholders actively using the economic diplomacy digital platform',
    processIds: ['process-6'],
    target: 85,
    current: 30,
    unit: '% adoption',
    frequency: 'monthly',
    owner: 'Digital Diplomacy Chief'
  },
  {
    id: 'metric-7',
    name: 'Investment Summit Participation',
    description: 'Total number of international investors and buyers participating in Nepal investment summits',
    processIds: ['process-7'],
    target: 500,
    current: 280,
    unit: 'participants',
    frequency: 'quarterly',
    owner: 'Event Management Director'
  },
  {
    id: 'metric-8',
    name: 'Export Inquiry Growth Rate',
    description: 'Percentage increase in qualified export inquiries generated through embassy commercial activities',
    processIds: ['process-8'],
    target: 25,
    current: 18,
    unit: '% increase',
    frequency: 'monthly',
    owner: 'Commercial Attachés Coordinator'
  },
  {
    id: 'metric-9',
    name: 'Strategic Business Partnerships',
    description: 'Number of formal business partnerships facilitated between Nepali exporters and international partners',
    processIds: ['process-9'],
    target: 50,
    current: 21,
    unit: 'partnerships',
    frequency: 'monthly',
    owner: 'Business Facilitation Head'
  },
  {
    id: 'metric-10',
    name: 'Diaspora Fund Capital Raised',
    description: 'Total USD amount raised for the diaspora investment fund targeting export-oriented SMEs',
    processIds: ['process-10'],
    target: 50,
    current: 12,
    unit: 'USD millions',
    frequency: 'quarterly',
    owner: 'Diaspora Affairs Director'
  },
  {
    id: 'metric-11',
    name: 'Hydropower Export Value',
    description: 'Total USD value of hydropower and renewable energy exports facilitated through diplomatic channels',
    processIds: ['process-2', 'process-4'],
    target: 100,
    current: 25,
    unit: 'USD millions',
    frequency: 'quarterly',
    owner: 'Energy Sector Trade Attaché'
  },
  {
    id: 'metric-12',
    name: 'IT Services Export Growth',
    description: 'Percentage growth in IT services exports facilitated through economic diplomacy initiatives',
    processIds: ['process-2', 'process-8'],
    target: 50,
    current: 32,
    unit: '% growth',
    frequency: 'quarterly',
    owner: 'Technology Sector Coordinator'
  }
];

export const dummyCatchballItems: CatchballItem[] = [
  {
    id: 'catchball-1',
    type: 'concern',
    title: 'EU Trade Agreement Negotiation Delays',
    description: 'EU trade agreement negotiations are experiencing delays due to new sustainability requirements. Need urgent clarification on organic certification standards for Nepali agri-products.',
    from: 'Trade Negotiation Team Leader',
    to: 'Foreign Secretary',
    relatedItemId: 'annual-1',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-28T10:15:00Z',
    responses: [
      {
        id: 'response-1',
        message: 'Let\'s engage MOACS and TEPC immediately to develop accelerated organic certification framework. I\'ll schedule direct talks with EU Trade Commissioner next week.',
        author: 'Foreign Secretary',
        createdAt: '2025-05-28T15:30:00Z'
      }
    ]
  },
  {
    id: 'catchball-2',
    type: 'question',
    title: 'Trade Mission ROI Measurement Framework',
    description: 'How should we measure ROI for trade missions? Current tracking focuses on leads generated, but we need metrics for actual sales conversions and long-term partnerships.',
    from: 'Commercial Attaché, New York',
    to: 'Trade Promotion Director',
    relatedItemId: 'annual-2',
    relatedItemType: 'annual',
    status: 'addressed',
    createdAt: '2025-05-25T14:20:00Z',
    responses: [
      {
        id: 'response-2',
        message: 'Excellent point. We\'re implementing 18-month follow-up tracking system with quarterly conversion reports. Digital platform will automate this tracking.',
        author: 'Trade Promotion Director',
        createdAt: '2025-05-25T18:45:00Z'
      }
    ]
  },
  {
    id: 'catchball-3',
    type: 'approval',
    title: 'Additional Budget for Shanghai Trade Office Setup',
    description: 'Shanghai trade office requires additional USD 150,000 for premium location rental and specialized IT services staff. Critical for China market penetration.',
    from: 'Ambassador to China',
    to: 'Foreign Minister',
    relatedItemId: 'annual-5',
    relatedItemType: 'annual',
    status: 'addressed',
    createdAt: '2025-05-24T11:30:00Z',
    responses: [
      {
        id: 'response-3',
        message: 'Approved from contingency funds. China market is priority for hydropower equipment exports. Ensure quarterly performance reports to justify investment.',
        author: 'Foreign Minister',
        createdAt: '2025-05-24T16:20:00Z'
      }
    ]
  },
  {
    id: 'catchball-4',
    type: 'suggestion',
    title: 'Diaspora Venture Capital Network Integration',
    description: 'Silicon Valley diaspora suggests creating formal VC network to complement investment fund. Several Nepali-origin VCs willing to co-invest in Nepal startups.',
    from: 'Honorary Consul, San Francisco',
    to: 'Diaspora Affairs Director',
    relatedItemId: 'annual-10',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-27T09:45:00Z',
    responses: [
      {
        id: 'response-4',
        message: 'Brilliant idea! Let\'s formalize this as Phase 2 of diaspora fund. Can you prepare list of interested VCs and their investment criteria?',
        author: 'Diaspora Affairs Director',
        createdAt: '2025-05-27T13:15:00Z'
      }
    ]
  },
  {
    id: 'catchball-5',
    type: 'question',
    title: 'Coordination Between IBN and Embassy Investment Promotion',
    description: 'Need clarity on roles between Investment Board Nepal and embassy investment promotion activities. Some investors getting conflicting information.',
    from: 'Economic Counselor, Embassy in Berlin',
    to: 'Investment Promotion Head',
    relatedItemId: 'annual-4',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-29T08:30:00Z',
    responses: [
      {
        id: 'response-5',
        message: 'Valid concern. We\'re developing clear protocol: Embassies for initial outreach and facilitation, IBN for formal approvals and incentives. Joint SOPs coming next month.',
        author: 'Investment Promotion Head',
        createdAt: '2025-05-29T12:45:00Z'
      }
    ]
  },
  {
    id: 'catchball-6',
    type: 'concern',
    title: 'Digital Platform Security and Data Protection',
    description: 'Commercial attachés raising concerns about data security on new digital platform. Need to ensure compliance with GDPR and other international data protection laws.',
    from: 'Commercial Attachés Network Coordinator',
    to: 'Digital Diplomacy Chief',
    relatedItemId: 'annual-6',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-30T13:20:00Z',
    responses: [
      {
        id: 'response-6',
        message: 'Security is top priority. We\'re implementing ISO 27001 standards and EU GDPR compliance. External security audit scheduled before platform launch.',
        author: 'Digital Diplomacy Chief',
        createdAt: '2025-05-30T16:30:00Z'
      }
    ]
  },
  {
    id: 'catchball-7',
    type: 'suggestion',
    title: 'Nepal Pavilion at Major International Trade Fairs',
    description: 'Multiple embassies suggest coordinated Nepal pavilions at major trade fairs (Hannover Messe, CES, etc.) rather than individual participation. More cost-effective and impactful.',
    from: 'Ambassador to Germany',
    to: 'Trade Promotion Director',
    relatedItemId: 'annual-2',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-26T12:10:00Z',
    responses: [
      {
        id: 'response-7',
        message: 'Excellent coordination idea! Let\'s create annual calendar of priority trade fairs with coordinated Nepal pavilions. Will significantly improve our presence and reduce costs.',
        author: 'Trade Promotion Director',
        createdAt: '2025-05-26T17:25:00Z'
      }
    ]
  },
  {
    id: 'catchball-8',
    type: 'question',
    title: 'Honorary Consuls Authority and Accountability Framework',
    description: 'Need clear guidelines on honorary consuls\' authority limits for investment commitments and trade deal facilitation. Some confusion in Dubai and London offices.',
    from: 'Consular Services Division Chief',
    to: 'Honorary Consuls Coordinator',
    relatedItemId: 'annual-3',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-31T10:40:00Z',
    responses: [
      {
        id: 'response-8',
        message: 'Creating comprehensive authority matrix and accountability framework. Honorary consuls can facilitate and connect, but formal commitments require embassy/headquarters approval.',
        author: 'Honorary Consuls Coordinator',
        createdAt: '2025-05-31T14:50:00Z'
      }
    ]
  },
  {
    id: 'catchball-9',
    type: 'approval',
    title: 'Fast-Track Visa Processing for Trade Delegations',
    description: 'Request to implement fast-track visa processing for international trade delegations and investors. Current processing time affecting business visitor experience.',
    from: 'Business Facilitation Unit Head',
    to: 'Consular Services Division Chief',
    relatedItemId: 'annual-9',
    relatedItemType: 'annual',
    status: 'addressed',
    createdAt: '2025-05-23T15:25:00Z',
    responses: [
      {
        id: 'response-9',
        message: 'Approved! Implementing 48-hour visa processing for pre-approved business delegations. Digital application system to be deployed at major embassies by next quarter.',
        author: 'Consular Services Division Chief',
        createdAt: '2025-05-23T19:15:00Z'
      }
    ]
  },
  {
    id: 'catchball-10',
    type: 'concern',
    title: 'Language Barriers in Technical Sector Negotiations',
    description: 'Embassies reporting language barriers in technical negotiations for hydropower and IT services. Need specialized translators with sector expertise.',
    from: 'Economic Counselor, Embassy in Tokyo',
    to: 'Foreign Secretary',
    relatedItemId: 'annual-1',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-06-01T11:15:00Z',
    responses: [
      {
        id: 'response-10',
        message: 'Critical issue for technical sectors. Coordinating with universities to train specialized translators. Also exploring AI-powered translation tools for technical documents.',
        author: 'Foreign Secretary',
        createdAt: '2025-06-01T16:30:00Z'
      }
    ]
  }
];

export const allDummyData = {
  strategicObjectives: dummyStrategicObjectives,
  annualObjectives: dummyAnnualObjectives,
  processes: dummyProcesses,
  metrics: dummyMetrics,
  catchball: dummyCatchballItems
};