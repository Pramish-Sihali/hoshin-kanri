// lib/dummyData.ts
import { StrategicObjective, AnnualObjective, Process, Metric, CatchballItem, HoshinData } from '../types/hoshin';

// DATASET 1: Foreign Policy & Economic Diplomacy (existing)
export const foreignPolicyData: HoshinData = {
  strategicObjectives: [
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
  ],
  annualObjectives: [
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
  ],
  processes: [
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
  ],
  metrics: [
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
  ],
  catchball: [
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
  ]
};

// DATASET 2: Healthcare System Strategic Planning
export const healthcareData: HoshinData = {
  strategicObjectives: [
    {
      id: 'healthcare-strategic-1',
      title: 'Achieve 95% Patient Satisfaction Rating',
      description: 'Implement comprehensive patient experience improvement program across all departments to achieve industry-leading satisfaction scores by 2027.',
      targetYear: 2027,
      owner: 'Chief Patient Experience Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'healthcare-strategic-2',
      title: 'Reduce Hospital Readmission Rates by 40%',
      description: 'Deploy predictive analytics and enhanced discharge planning to significantly reduce 30-day readmission rates and improve patient outcomes.',
      targetYear: 2026,
      owner: 'Chief Medical Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'healthcare-strategic-3',
      title: 'Digitize 100% of Patient Records and Workflows',
      description: 'Complete digital transformation of all clinical and administrative processes to improve efficiency and care coordination.',
      targetYear: 2025,
      owner: 'Chief Information Officer',
      status: 'at-risk',
      priority: 'high'
    },
    {
      id: 'healthcare-strategic-4',
      title: 'Establish Telemedicine as Primary Care Option',
      description: 'Scale telemedicine services to handle 60% of non-emergency consultations and expand rural healthcare access.',
      targetYear: 2026,
      owner: 'Director of Telehealth Services',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 'healthcare-strategic-5',
      title: 'Achieve Magnet Hospital Designation',
      description: 'Obtain Magnet recognition for nursing excellence through evidence-based practice and exceptional patient outcomes.',
      targetYear: 2028,
      owner: 'Chief Nursing Officer',
      status: 'planning',
      priority: 'medium'
    },
    {
      id: 'healthcare-strategic-6',
      title: 'Reduce Operating Costs by 25%',
      description: 'Implement lean healthcare practices and automation to achieve significant cost reduction while maintaining quality.',
      targetYear: 2027,
      owner: 'Chief Financial Officer',
      status: 'in-progress',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'healthcare-annual-1',
      title: 'Deploy Electronic Health Records System',
      description: 'Complete EHR implementation across all departments with full staff training and data migration from legacy systems.',
      strategicObjectiveIds: ['healthcare-strategic-3'],
      targetDate: '2025-09-30',
      owner: 'IT Implementation Team',
      status: 'in-progress',
      progress: 78
    },
    {
      id: 'healthcare-annual-2',
      title: 'Launch 24/7 Telemedicine Platform',
      description: 'Establish comprehensive telemedicine services with specialist consultations and remote patient monitoring capabilities.',
      strategicObjectiveIds: ['healthcare-strategic-4'],
      targetDate: '2025-08-31',
      owner: 'Telehealth Operations Manager',
      status: 'in-progress',
      progress: 85
    },
    {
      id: 'healthcare-annual-3',
      title: 'Implement AI-Powered Discharge Planning',
      description: 'Deploy machine learning algorithms to predict readmission risk and optimize discharge planning protocols.',
      strategicObjectiveIds: ['healthcare-strategic-2'],
      targetDate: '2025-11-30',
      owner: 'Clinical Analytics Team',
      status: 'in-progress',
      progress: 45
    },
    {
      id: 'healthcare-annual-4',
      title: 'Achieve 90% Patient Satisfaction in ED',
      description: 'Redesign emergency department workflows and implement patient experience improvements to reach satisfaction target.',
      strategicObjectiveIds: ['healthcare-strategic-1'],
      targetDate: '2025-12-31',
      owner: 'Emergency Department Director',
      status: 'in-progress',
      progress: 62
    },
    {
      id: 'healthcare-annual-5',
      title: 'Reduce Average Length of Stay by 15%',
      description: 'Streamline care processes and improve discharge efficiency to optimize bed utilization and patient flow.',
      strategicObjectiveIds: ['healthcare-strategic-6'],
      targetDate: '2025-10-31',
      owner: 'Care Coordination Manager',
      status: 'in-progress',
      progress: 55
    },
    {
      id: 'healthcare-annual-6',
      title: 'Complete Nursing Excellence Assessment',
      description: 'Conduct comprehensive assessment and implement improvements required for Magnet designation application.',
      strategicObjectiveIds: ['healthcare-strategic-5'],
      targetDate: '2025-12-31',
      owner: 'Magnet Program Coordinator',
      status: 'planning',
      progress: 30
    }
  ],
  processes: [
    {
      id: 'healthcare-process-1',
      title: 'Patient Flow Optimization',
      description: 'Streamline patient admission, treatment, and discharge processes to reduce wait times and improve throughput.',
      annualObjectiveIds: ['healthcare-annual-4', 'healthcare-annual-5'],
      owner: 'Operations Manager',
      startDate: '2025-01-15',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Process improvement specialists', 'Data analysts', 'Department liaisons', 'Training coordinators']
    },
    {
      id: 'healthcare-process-2',
      title: 'Clinical Quality Assurance Program',
      description: 'Implement comprehensive quality monitoring and improvement processes across all clinical departments.',
      annualObjectiveIds: ['healthcare-annual-3', 'healthcare-annual-6'],
      owner: 'Quality Assurance Director',
      startDate: '2025-02-01',
      endDate: '2025-11-30',
      status: 'in-progress',
      resources: ['Clinical reviewers', 'Quality metrics dashboard', 'Training materials', 'Audit tools']
    },
    {
      id: 'healthcare-process-3',
      title: 'Digital Health Platform Integration',
      description: 'Integrate EHR, telemedicine, and patient portal systems for seamless digital healthcare delivery.',
      annualObjectiveIds: ['healthcare-annual-1', 'healthcare-annual-2'],
      owner: 'Digital Health Coordinator',
      startDate: '2025-03-01',
      endDate: '2025-09-30',
      status: 'in-progress',
      resources: ['System integrators', 'Clinical informaticists', 'User training teams', 'Technical support']
    }
  ],
  metrics: [
    {
      id: 'healthcare-metric-1',
      name: 'Patient Satisfaction Score',
      description: 'Average patient satisfaction rating across all hospital departments and services.',
      processIds: ['healthcare-process-1'],
      target: 90,
      current: 82,
      unit: '% satisfaction',
      frequency: 'monthly',
      owner: 'Patient Experience Manager'
    },
    {
      id: 'healthcare-metric-2',
      name: '30-Day Readmission Rate',
      description: 'Percentage of patients readmitted within 30 days of discharge.',
      processIds: ['healthcare-process-2'],
      target: 8,
      current: 12,
      unit: '% readmissions',
      frequency: 'monthly',
      owner: 'Clinical Quality Director'
    },
    {
      id: 'healthcare-metric-3',
      name: 'Average Emergency Department Wait Time',
      description: 'Average time from patient arrival to being seen by medical provider in ED.',
      processIds: ['healthcare-process-1'],
      target: 45,
      current: 67,
      unit: 'minutes',
      frequency: 'daily',
      owner: 'ED Operations Manager'
    },
    {
      id: 'healthcare-metric-4',
      name: 'EHR System Uptime',
      description: 'Percentage of time electronic health records system is operational and accessible.',
      processIds: ['healthcare-process-3'],
      target: 99.5,
      current: 98.2,
      unit: '% uptime',
      frequency: 'weekly',
      owner: 'IT Operations Manager'
    }
  ],
  catchball: [
    {
      id: 'healthcare-catchball-1',
      type: 'concern',
      title: 'EHR Training Schedule Conflicts',
      description: 'Nursing staff reporting conflicts between EHR training sessions and patient care duties. Need to adjust training schedule to avoid impact on patient safety.',
      from: 'Nursing Supervisor',
      to: 'IT Implementation Team Lead',
      relatedItemId: 'healthcare-annual-1',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-10T09:30:00Z',
      responses: [
        {
          id: 'healthcare-response-1',
          message: 'Understood. We\'ll implement staggered training with additional overtime coverage and extend timeline by 2 weeks to ensure adequate staffing.',
          author: 'IT Implementation Team Lead',
          createdAt: '2025-07-10T14:20:00Z'
        }
      ]
    },
    {
      id: 'healthcare-catchball-2',
      type: 'question',
      title: 'Telemedicine Reimbursement Policies',
      description: 'Need clarification on insurance reimbursement rates for telemedicine consultations. This affects our revenue projections for the platform.',
      from: 'Revenue Cycle Manager',
      to: 'Telehealth Operations Manager',
      relatedItemId: 'healthcare-annual-2',
      relatedItemType: 'annual',
      status: 'addressed',
      createdAt: '2025-07-08T11:15:00Z',
      responses: [
        {
          id: 'healthcare-response-2',
          message: 'Insurance reimbursement is at 85% of in-person rates. I\'ll share the detailed reimbursement matrix with revenue projections.',
          author: 'Telehealth Operations Manager',
          createdAt: '2025-07-08T16:45:00Z'
        }
      ]
    }
  ]
};

// DATASET 3: Manufacturing & Supply Chain Optimization
export const manufacturingData: HoshinData = {
  strategicObjectives: [
    {
      id: 'manufacturing-strategic-1',
      title: 'Achieve World-Class Manufacturing Excellence',
      description: 'Implement Industry 4.0 technologies and lean manufacturing practices to achieve 95% Overall Equipment Effectiveness across all production lines.',
      targetYear: 2027,
      owner: 'VP of Manufacturing',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'manufacturing-strategic-2',
      title: 'Establish Sustainable Supply Chain Network',
      description: 'Build resilient and sustainable supply chain with 50% reduction in carbon footprint and 99.5% on-time delivery performance.',
      targetYear: 2026,
      owner: 'Chief Supply Chain Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'manufacturing-strategic-3',
      title: 'Launch Next-Generation Product Line',
      description: 'Develop and launch innovative smart product line leveraging IoT and AI technologies to capture 25% market share in premium segment.',
      targetYear: 2028,
      owner: 'Head of Product Development',
      status: 'planning',
      priority: 'high'
    },
    {
      id: 'manufacturing-strategic-4',
      title: 'Achieve Zero Defect Manufacturing',
      description: 'Implement advanced quality management systems and predictive maintenance to achieve less than 10 PPM defect rate.',
      targetYear: 2026,
      owner: 'Quality Assurance Director',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'manufacturing-strategic-5',
      title: 'Expand Global Manufacturing Footprint',
      description: 'Establish manufacturing facilities in 3 new geographical regions to serve local markets and reduce logistics costs.',
      targetYear: 2029,
      owner: 'VP of Global Operations',
      status: 'planning',
      priority: 'medium'
    },
    {
      id: 'manufacturing-strategic-6',
      title: 'Digitize Manufacturing Operations',
      description: 'Implement comprehensive digital manufacturing platform with real-time monitoring, predictive analytics, and automated decision-making.',
      targetYear: 2025,
      owner: 'Chief Technology Officer',
      status: 'at-risk',
      priority: 'high'
    }
  ],
  annualObjectives: [
    {
      id: 'manufacturing-annual-1',
      title: 'Install Automated Assembly Lines',
      description: 'Deploy robotic assembly systems on 3 production lines to increase throughput by 40% and reduce labor costs.',
      strategicObjectiveIds: ['manufacturing-strategic-1'],
      targetDate: '2025-11-30',
      owner: 'Automation Engineering Manager',
      status: 'in-progress',
      progress: 68
    },
    {
      id: 'manufacturing-annual-2',
      title: 'Implement Predictive Maintenance System',
      description: 'Deploy IoT sensors and AI-powered predictive maintenance across all critical equipment to reduce unplanned downtime by 60%.',
      strategicObjectiveIds: ['manufacturing-strategic-6'],
      targetDate: '2025-10-31',
      owner: 'Maintenance Operations Manager',
      status: 'in-progress',
      progress: 75
    },
    {
      id: 'manufacturing-annual-3',
      title: 'Achieve ISO 14001 Certification',
      description: 'Complete environmental management system implementation and certification to support sustainable supply chain goals.',
      strategicObjectiveIds: ['manufacturing-strategic-2'],
      targetDate: '2025-12-31',
      owner: 'Environmental Compliance Manager',
      status: 'in-progress',
      progress: 82
    },
    {
      id: 'manufacturing-annual-4',
      title: 'Launch Quality 4.0 Initiative',
      description: 'Implement AI-powered quality inspection and real-time defect prevention system across all production lines.',
      strategicObjectiveIds: ['manufacturing-strategic-4'],
      targetDate: '2025-09-30',
      owner: 'Quality Technology Lead',
      status: 'in-progress',
      progress: 58
    }
  ],
  processes: [
    {
      id: 'manufacturing-process-1',
      title: 'Lean Manufacturing Implementation',
      description: 'Deploy lean manufacturing principles including 5S, kanban, and continuous improvement across all production areas.',
      annualObjectiveIds: ['manufacturing-annual-1'],
      owner: 'Lean Manufacturing Manager',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Lean consultants', 'Kaizen facilitators', 'Training materials', 'Process mapping tools']
    },
    {
      id: 'manufacturing-process-2',
      title: 'Supply Chain Optimization',
      description: 'Optimize supplier relationships, inventory management, and logistics to improve efficiency and reduce costs.',
      annualObjectiveIds: ['manufacturing-annual-3'],
      owner: 'Supply Chain Manager',
      startDate: '2025-02-01',
      endDate: '2025-11-30',
      status: 'in-progress',
      resources: ['Supply chain analysts', 'Vendor management system', 'Logistics optimization software', 'Sustainability consultants']
    }
  ],
  metrics: [
    {
      id: 'manufacturing-metric-1',
      name: 'Overall Equipment Effectiveness (OEE)',
      description: 'Comprehensive measure of manufacturing productivity combining availability, performance, and quality.',
      processIds: ['manufacturing-process-1'],
      target: 85,
      current: 72,
      unit: '% OEE',
      frequency: 'daily',
      owner: 'Production Manager'
    },
    {
      id: 'manufacturing-metric-2',
      name: 'First Pass Yield',
      description: 'Percentage of products that pass quality inspection on first attempt without rework.',
      processIds: ['manufacturing-process-1'],
      target: 98,
      current: 94,
      unit: '% yield',
      frequency: 'daily',
      owner: 'Quality Control Manager'
    },
    {
      id: 'manufacturing-metric-3',
      name: 'On-Time Delivery Rate',
      description: 'Percentage of customer orders delivered on or before promised delivery date.',
      processIds: ['manufacturing-process-2'],
      target: 98,
      current: 92,
      unit: '% on-time',
      frequency: 'weekly',
      owner: 'Logistics Manager'
    }
  ],
  catchball: [
    {
      id: 'manufacturing-catchball-1',
      type: 'concern',
      title: 'Automation Project Budget Overrun',
      description: 'Robotic assembly line installation costs exceeding budget by 15% due to additional infrastructure requirements. Need approval for additional funding.',
      from: 'Automation Engineering Manager',
      to: 'VP of Manufacturing',
      relatedItemId: 'manufacturing-annual-1',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-09T10:45:00Z',
      responses: []
    }
  ]
};

// DATASET 4: Educational Institution Development
export const educationData: HoshinData = {
  strategicObjectives: [
    {
      id: 'education-strategic-1',
      title: 'Achieve Top 10 National University Ranking',
      description: 'Enhance academic programs, research output, and student outcomes to reach top 10 position in national university rankings by 2028.',
      targetYear: 2028,
      owner: 'University President',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'education-strategic-2',
      title: 'Increase Student Graduation Rate to 90%',
      description: 'Implement comprehensive student support programs and academic success initiatives to achieve 90% six-year graduation rate.',
      targetYear: 2027,
      owner: 'Provost',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'education-strategic-3',
      title: 'Establish World-Class Research Programs',
      description: 'Build internationally recognized research programs with $50M annual research funding and 500+ peer-reviewed publications.',
      targetYear: 2029,
      owner: 'Vice President for Research',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'education-strategic-4',
      title: 'Create Smart Campus Infrastructure',
      description: 'Deploy advanced technology infrastructure including high-speed wireless, smart classrooms, and digital learning platforms.',
      targetYear: 2026,
      owner: 'Chief Information Officer',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 'education-strategic-5',
      title: 'Achieve 95% Graduate Employment Rate',
      description: 'Enhance career services and industry partnerships to ensure 95% of graduates are employed within 6 months of graduation.',
      targetYear: 2027,
      owner: 'Director of Career Services',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'education-strategic-6',
      title: 'Expand Global Academic Partnerships',
      description: 'Establish strategic partnerships with 25 international universities for student exchange and collaborative research programs.',
      targetYear: 2026,
      owner: 'Director of International Affairs',
      status: 'planning',
      priority: 'medium'
    }
  ],
  annualObjectives: [
    {
      id: 'education-annual-1',
      title: 'Launch Online Learning Platform',
      description: 'Deploy comprehensive online learning management system with interactive content and virtual classroom capabilities.',
      strategicObjectiveIds: ['education-strategic-4'],
      targetDate: '2025-08-31',
      owner: 'Educational Technology Manager',
      status: 'in-progress',
      progress: 70
    },
    {
      id: 'education-annual-2',
      title: 'Implement Student Success Program',
      description: 'Launch early warning system and targeted intervention programs to improve student retention and academic performance.',
      strategicObjectiveIds: ['education-strategic-2'],
      targetDate: '2025-12-31',
      owner: 'Student Success Coordinator',
      status: 'in-progress',
      progress: 65
    },
    {
      id: 'education-annual-3',
      title: 'Establish Industry Partnership Program',
      description: 'Create formal partnerships with 15 major employers for internships, co-ops, and direct hiring programs.',
      strategicObjectiveIds: ['education-strategic-5'],
      targetDate: '2025-10-31',
      owner: 'Industry Relations Manager',
      status: 'in-progress',
      progress: 55
    }
  ],
  processes: [
    {
      id: 'education-process-1',
      title: 'Curriculum Development and Review',
      description: 'Systematic process for developing, updating, and reviewing academic curricula to meet industry needs and accreditation standards.',
      annualObjectiveIds: ['education-annual-2'],
      owner: 'Academic Affairs Dean',
      startDate: '2025-01-15',
      endDate: '2025-12-15',
      status: 'in-progress',
      resources: ['Faculty committees', 'Industry advisors', 'Curriculum specialists', 'Assessment tools']
    },
    {
      id: 'education-process-2',
      title: 'Student Enrollment and Retention',
      description: 'Comprehensive process managing student recruitment, admission, orientation, and retention support services.',
      annualObjectiveIds: ['education-annual-2'],
      owner: 'Enrollment Management Director',
      startDate: '2025-02-01',
      endDate: '2025-11-30',
      status: 'in-progress',
      resources: ['Admission counselors', 'Academic advisors', 'Support services', 'Data analytics platform']
    }
  ],
  metrics: [
    {
      id: 'education-metric-1',
      name: 'Student Satisfaction Rating',
      description: 'Overall student satisfaction with academic programs, facilities, and support services.',
      processIds: ['education-process-1'],
      target: 85,
      current: 78,
      unit: '% satisfaction',
      frequency: 'quarterly',
      owner: 'Student Affairs Director'
    },
    {
      id: 'education-metric-2',
      name: 'Faculty Research Publications',
      description: 'Number of peer-reviewed research publications by faculty members per academic year.',
      processIds: ['education-process-1'],
      target: 120,
      current: 85,
      unit: 'publications',
      frequency: 'quarterly',
      owner: 'Research Affairs Coordinator'
    }
  ],
  catchball: [
    {
      id: 'education-catchball-1',
      type: 'question',
      title: 'Online Platform Integration with SIS',
      description: 'How should we integrate the new online learning platform with our existing Student Information System to ensure seamless grade transfer?',
      from: 'Registrar',
      to: 'Educational Technology Manager',
      relatedItemId: 'education-annual-1',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-11T13:20:00Z',
      responses: []
    }
  ]
};

// DATASET 5: Technology Company Growth Strategy
export const technologyData: HoshinData = {
  strategicObjectives: [
    {
      id: 'tech-strategic-1',
      title: 'Achieve $100M Annual Recurring Revenue',
      description: 'Scale SaaS platform to reach $100M ARR through product innovation, market expansion, and strategic partnerships by 2027.',
      targetYear: 2027,
      owner: 'Chief Executive Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'tech-strategic-2',
      title: 'Launch AI-Powered Product Suite',
      description: 'Develop and launch comprehensive AI-powered analytics and automation suite to capture emerging market opportunities.',
      targetYear: 2026,
      owner: 'Chief Product Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'tech-strategic-3',
      title: 'Expand to 5 International Markets',
      description: 'Establish presence in European and Asia-Pacific markets with localized products and regional sales teams.',
      targetYear: 2028,
      owner: 'VP of International Business',
      status: 'planning',
      priority: 'medium'
    },
    {
      id: 'tech-strategic-4',
      title: 'Build World-Class Engineering Team',
      description: 'Scale engineering organization to 200+ developers with specialized teams for AI, cloud infrastructure, and security.',
      targetYear: 2026,
      owner: 'Chief Technology Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'tech-strategic-5',
      title: 'Achieve Industry-Leading Customer Satisfaction',
      description: 'Maintain 95%+ customer satisfaction and reduce churn rate to less than 5% annually through exceptional product and service quality.',
      targetYear: 2025,
      owner: 'Chief Customer Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'tech-strategic-6',
      title: 'Establish Strategic Partnership Ecosystem',
      description: 'Build network of 50+ strategic technology and channel partners to accelerate growth and market penetration.',
      targetYear: 2026,
      owner: 'VP of Business Development',
      status: 'in-progress',
      priority: 'medium'
    }
  ],
  annualObjectives: [
    {
      id: 'tech-annual-1',
      title: 'Release Next-Gen Platform Version',
      description: 'Launch major platform update with advanced analytics, improved user interface, and enhanced security features.',
      strategicObjectiveIds: ['tech-strategic-2'],
      targetDate: '2025-11-30',
      owner: 'Product Development Director',
      status: 'in-progress',
      progress: 72
    },
    {
      id: 'tech-annual-2',
      title: 'Achieve 98% Platform Uptime',
      description: 'Implement advanced monitoring, redundancy, and disaster recovery to ensure industry-leading platform reliability.',
      strategicObjectiveIds: ['tech-strategic-5'],
      targetDate: '2025-12-31',
      owner: 'Infrastructure Engineering Manager',
      status: 'in-progress',
      progress: 88
    },
    {
      id: 'tech-annual-3',
      title: 'Grow Engineering Team by 40%',
      description: 'Recruit and onboard 50 additional engineers across frontend, backend, AI/ML, and DevOps specializations.',
      strategicObjectiveIds: ['tech-strategic-4'],
      targetDate: '2025-12-31',
      owner: 'VP of Engineering',
      status: 'in-progress',
      progress: 65
    },
    {
      id: 'tech-annual-4',
      title: 'Launch Customer Success Program',
      description: 'Implement proactive customer success management with dedicated CSMs and usage analytics.',
      strategicObjectiveIds: ['tech-strategic-5'],
      targetDate: '2025-09-30',
      owner: 'Customer Success Director',
      status: 'in-progress',
      progress: 58
    }
  ],
  processes: [
    {
      id: 'tech-process-1',
      title: 'Agile Software Development',
      description: 'Implement scaled agile development methodology with continuous integration, automated testing, and rapid deployment.',
      annualObjectiveIds: ['tech-annual-1'],
      owner: 'Agile Coach',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Scrum masters', 'Development tools', 'Testing automation', 'CI/CD pipeline']
    },
    {
      id: 'tech-process-2',
      title: 'Customer Onboarding and Support',
      description: 'Streamlined process for customer onboarding, training, and ongoing technical support.',
      annualObjectiveIds: ['tech-annual-4'],
      owner: 'Customer Operations Manager',
      startDate: '2025-02-01',
      endDate: '2025-11-30',
      status: 'in-progress',
      resources: ['Support specialists', 'Training materials', 'Help desk system', 'Knowledge base']
    }
  ],
  metrics: [
    {
      id: 'tech-metric-1',
      name: 'Monthly Recurring Revenue',
      description: 'Total monthly recurring revenue from subscription customers.',
      processIds: ['tech-process-2'],
      target: 6000000,
      current: 4800000,
      unit: 'USD',
      frequency: 'monthly',
      owner: 'Revenue Operations Manager'
    },
    {
      id: 'tech-metric-2',
      name: 'Customer Churn Rate',
      description: 'Percentage of customers who cancel their subscription each month.',
      processIds: ['tech-process-2'],
      target: 2,
      current: 3.5,
      unit: '% monthly',
      frequency: 'monthly',
      owner: 'Customer Success Director'
    },
    {
      id: 'tech-metric-3',
      name: 'Platform Response Time',
      description: 'Average API response time for core platform functions.',
      processIds: ['tech-process-1'],
      target: 200,
      current: 285,
      unit: 'milliseconds',
      frequency: 'daily',
      owner: 'Site Reliability Engineer'
    }
  ],
  catchball: [
    {
      id: 'tech-catchball-1',
      type: 'suggestion',
      title: 'Implement Customer Feature Request Portal',
      description: 'Customers are requesting a transparent way to submit and vote on feature requests. This could improve engagement and help prioritize development.',
      from: 'Customer Success Manager',
      to: 'Product Development Director',
      relatedItemId: 'tech-annual-4',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-12T14:30:00Z',
      responses: []
    }
  ]
};

// DATASET 6: Retail Chain Expansion & Operations
export const retailData: HoshinData = {
  strategicObjectives: [
    {
      id: 'retail-strategic-1',
      title: 'Expand to 500 Store Locations',
      description: 'Aggressive expansion plan to reach 500 retail locations across 15 states through new store openings and strategic acquisitions.',
      targetYear: 2028,
      owner: 'Chief Expansion Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'retail-strategic-2',
      title: 'Achieve Omnichannel Excellence',
      description: 'Integrate online and offline customer experiences with unified inventory, seamless fulfillment, and consistent brand experience.',
      targetYear: 2026,
      owner: 'Chief Digital Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'retail-strategic-3',
      title: 'Increase Customer Lifetime Value by 50%',
      description: 'Implement comprehensive customer loyalty and personalization programs to significantly increase repeat purchases and customer value.',
      targetYear: 2027,
      owner: 'Chief Marketing Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'retail-strategic-4',
      title: 'Achieve Sustainable Operations Leadership',
      description: 'Become industry leader in sustainable retail practices with carbon-neutral operations and circular economy initiatives.',
      targetYear: 2029,
      owner: 'Chief Sustainability Officer',
      status: 'planning',
      priority: 'medium'
    },
    {
      id: 'retail-strategic-5',
      title: 'Optimize Supply Chain Efficiency',
      description: 'Implement advanced supply chain technologies to achieve 98% inventory accuracy and 24-hour fulfillment capability.',
      targetYear: 2026,
      owner: 'Chief Supply Chain Officer',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'retail-strategic-6',
      title: 'Create Premium Private Label Brand',
      description: 'Develop and launch premium private label product line representing 30% of total sales revenue.',
      targetYear: 2027,
      owner: 'VP of Merchandising',
      status: 'planning',
      priority: 'medium'
    }
  ],
  annualObjectives: [
    {
      id: 'retail-annual-1',
      title: 'Open 25 New Store Locations',
      description: 'Execute opening of 25 new retail locations in target markets with full staff training and inventory setup.',
      strategicObjectiveIds: ['retail-strategic-1'],
      targetDate: '2025-11-30',
      owner: 'Store Development Manager',
      status: 'in-progress',
      progress: 68
    },
    {
      id: 'retail-annual-2',
      title: 'Launch Mobile Commerce App',
      description: 'Deploy mobile shopping application with personalized recommendations, mobile payments, and store integration.',
      strategicObjectiveIds: ['retail-strategic-2'],
      targetDate: '2025-09-30',
      owner: 'Digital Commerce Director',
      status: 'in-progress',
      progress: 75
    },
    {
      id: 'retail-annual-3',
      title: 'Implement Customer Loyalty Program',
      description: 'Launch comprehensive loyalty program with points, personalized offers, and exclusive member benefits.',
      strategicObjectiveIds: ['retail-strategic-3'],
      targetDate: '2025-08-31',
      owner: 'Customer Experience Manager',
      status: 'in-progress',
      progress: 82
    },
    {
      id: 'retail-annual-4',
      title: 'Deploy Automated Inventory Management',
      description: 'Implement AI-powered inventory management system across all stores and distribution centers.',
      strategicObjectiveIds: ['retail-strategic-5'],
      targetDate: '2025-12-31',
      owner: 'Inventory Systems Manager',
      status: 'in-progress',
      progress: 45
    }
  ],
  processes: [
    {
      id: 'retail-process-1',
      title: 'Store Operations Management',
      description: 'Standardized processes for daily store operations including sales, inventory, customer service, and staff management.',
      annualObjectiveIds: ['retail-annual-1'],
      owner: 'Regional Operations Manager',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'in-progress',
      resources: ['Store managers', 'Operations manuals', 'Training programs', 'Performance dashboards']
    },
    {
      id: 'retail-process-2',
      title: 'Customer Experience Optimization',
      description: 'Continuous improvement process for enhancing customer shopping experience across all touchpoints.',
      annualObjectiveIds: ['retail-annual-3'],
      owner: 'Customer Experience Director',
      startDate: '2025-02-01',
      endDate: '2025-11-30',
      status: 'in-progress',
      resources: ['Mystery shoppers', 'Customer feedback systems', 'Experience designers', 'Analytics platform']
    }
  ],
  metrics: [
    {
      id: 'retail-metric-1',
      name: 'Sales per Square Foot',
      description: 'Average annual sales revenue generated per square foot of retail space.',
      processIds: ['retail-process-1'],
      target: 450,
      current: 385,
      unit: 'USD/sq ft',
      frequency: 'monthly',
      owner: 'Store Performance Manager'
    },
    {
      id: 'retail-metric-2',
      name: 'Customer Satisfaction Score',
      description: 'Average customer satisfaction rating based on surveys and feedback across all channels.',
      processIds: ['retail-process-2'],
      target: 88,
      current: 82,
      unit: '% satisfaction',
      frequency: 'monthly',
      owner: 'Customer Experience Manager'
    },
    {
      id: 'retail-metric-3',
      name: 'Inventory Turnover Rate',
      description: 'Number of times inventory is sold and replaced over a specific period.',
      processIds: ['retail-process-1'],
      target: 8,
      current: 6.5,
      unit: 'turns/year',
      frequency: 'quarterly',
      owner: 'Inventory Planning Manager'
    }
  ],
  catchball: [
    {
      id: 'retail-catchball-1',
      type: 'approval',
      title: 'Additional Budget for Mobile App Features',
      description: 'Need approval for additional $150K to implement advanced AR features and social shopping capabilities in mobile app.',
      from: 'Digital Commerce Director',
      to: 'Chief Digital Officer',
      relatedItemId: 'retail-annual-2',
      relatedItemType: 'annual',
      status: 'pending',
      createdAt: '2025-07-13T10:15:00Z',
      responses: []
    }
  ]
};

// Dataset definitions
export interface DatasetOption {
  id: string;
  name: string;
  description: string;
  data: HoshinData;
}

export const availableDatasets: DatasetOption[] = [
  {
    id: 'foreign-policy',
    name: 'Foreign Policy & Economic Diplomacy',
    description: 'Nepal\'s strategic economic diplomacy and trade promotion initiatives',
    data: foreignPolicyData
  },
  {
    id: 'healthcare',
    name: 'Healthcare System Strategic Planning',
    description: 'Hospital system transformation and patient care improvement initiatives',
    data: healthcareData
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Supply Chain Optimization',
    description: 'Industry 4.0 transformation and operational excellence programs',
    data: manufacturingData
  },
  {
    id: 'education',
    name: 'Educational Institution Development',
    description: 'University strategic planning for academic excellence and student success',
    data: educationData
  },
  {
    id: 'technology',
    name: 'Technology Company Growth Strategy',
    description: 'SaaS company scaling and product development initiatives',
    data: technologyData
  },
  {
    id: 'retail',
    name: 'Retail Chain Expansion & Operations',
    description: 'Retail expansion and omnichannel transformation strategy',
    data: retailData
  }
];

// Legacy exports for backward compatibility
export const dummyStrategicObjectives = foreignPolicyData.strategicObjectives;
export const dummyAnnualObjectives = foreignPolicyData.annualObjectives;
export const dummyProcesses = foreignPolicyData.processes;
export const dummyMetrics = foreignPolicyData.metrics;
export const dummyCatchballItems = foreignPolicyData.catchball;
export const allDummyData = foreignPolicyData;