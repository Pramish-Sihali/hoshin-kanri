// lib/dummyData.ts
import { StrategicObjective, AnnualObjective, Process, Metric, CatchballItem } from '../types/hoshin';

export const dummyStrategicObjectives: StrategicObjective[] = [
  {
    id: 'strategic-1',
    title: 'Enhance Budget Credibility and Execution Effectiveness',
    description: 'Ensure that over 95% of capital budget allocations are executed timely, transparently, and in alignment with national priorities by FY 2082/83.',
    targetYear: 2026,
    owner: 'Ministry of Finance',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-2',
    title: 'Strengthen Public Financial Management Systems',
    description: 'Modernize and integrate financial management information systems across all levels of government to improve transparency and accountability.',
    targetYear: 2027,
    owner: 'Financial Comptroller General Office',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-3',
    title: 'Improve Procurement Efficiency and Transparency',
    description: 'Streamline procurement processes and reduce average procurement time while maintaining transparency and competition.',
    targetYear: 2025,
    owner: 'Public Procurement Monitoring Office',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-4',
    title: 'Enhance Subnational Financial Capacity',
    description: 'Build capacity at provincial and local levels for effective budget planning, execution, and monitoring.',
    targetYear: 2026,
    owner: 'Ministry of Federal Affairs and Local Development',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 'strategic-5',
    title: 'Strengthen Oversight and Accountability',
    description: 'Implement robust monitoring and evaluation systems with real-time dashboards for budget execution tracking.',
    targetYear: 2025,
    owner: 'Office of the Auditor General',
    status: 'in-progress',
    priority: 'high'
  }
];

export const dummyAnnualObjectives: AnnualObjective[] = [
  {
    id: 'annual-1',
    title: 'Achieve 80% Capital Budget Execution',
    description: 'Execute 80% of allocated capital budget for infrastructure and development projects by end of fiscal year, improving from current 58% execution rate.',
    strategicObjectiveIds: ['strategic-1'],
    targetDate: '2025-07-15',
    owner: 'Ministry of Finance / FCGO',
    status: 'in-progress',
    progress: 58
  },
  {
    id: 'annual-2',
    title: 'Reduce Procurement Time to 90 Days',
    description: 'Streamline procurement processes to reduce average procurement time from 200 days to 90 days through e-GP system improvements.',
    strategicObjectiveIds: ['strategic-3'],
    targetDate: '2025-12-31',
    owner: 'Public Procurement Monitoring Office',
    status: 'in-progress',
    progress: 65
  },
  {
    id: 'annual-3',
    title: 'Achieve 100% NPB Clearance for Large Projects',
    description: 'Ensure all large infrastructure projects undergo National Planning Board clearance before implementation, improving from current 60%.',
    strategicObjectiveIds: ['strategic-1', 'strategic-5'],
    targetDate: '2025-12-31',
    owner: 'National Planning Commission',
    status: 'in-progress',
    progress: 85
  },
  {
    id: 'annual-4',
    title: 'Deploy Budget Support Units in 5 Provinces',
    description: 'Establish functional budget support units in 5 provinces to strengthen subnational financial management capacity.',
    strategicObjectiveIds: ['strategic-4'],
    targetDate: '2025-11-30',
    owner: 'Ministry of Federal Affairs and Local Development',
    status: 'in-progress',
    progress: 70
  },
  {
    id: 'annual-5',
    title: 'Launch Public Budget Tracking Dashboard',
    description: 'Deploy live public dashboard for tracking top 50 development projects with real-time budget execution data.',
    strategicObjectiveIds: ['strategic-5'],
    targetDate: '2025-09-30',
    owner: 'Office of the Auditor General / NPC',
    status: 'completed',
    progress: 100
  },
  {
    id: 'annual-6',
    title: 'Integrate AI for Procurement Delay Alerts',
    description: 'Deploy AI-powered system to automatically flag procurement delays and bottlenecks in the e-GP system.',
    strategicObjectiveIds: ['strategic-3', 'strategic-2'],
    targetDate: '2025-12-31',
    owner: 'Department of Information Technology',
    status: 'planning',
    progress: 15
  },
  {
    id: 'annual-7',
    title: 'Expand FMIS to 85% of Subnational Governments',
    description: 'Roll out Financial Management Information System to 85% of provincial and local governments, up from current 48%.',
    strategicObjectiveIds: ['strategic-2', 'strategic-4'],
    targetDate: '2025-12-31',
    owner: 'Financial Comptroller General Office',
    status: 'in-progress',
    progress: 55
  },
  {
    id: 'annual-8',
    title: 'Recruit 10 Public Finance Data Analysts',
    description: 'Hire specialized data analysts to support budget monitoring and performance measurement across ministries.',
    strategicObjectiveIds: ['strategic-2', 'strategic-5'],
    targetDate: '2025-08-31',
    owner: 'Ministry of Finance',
    status: 'at-risk',
    progress: 25
  }
];

export const dummyProcesses: Process[] = [
  {
    id: 'process-1',
    title: 'Monthly Budget Execution Review',
    description: 'Conduct monthly review meetings with line ministries to track capital budget execution and address implementation bottlenecks.',
    annualObjectiveIds: ['annual-1'],
    owner: 'Budget Division, Ministry of Finance',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'in-progress',
    resources: ['Budget monitoring system', 'Line ministry coordinators', 'Performance tracking tools', 'Monthly review meetings', 'Execution reports']
  },
  {
    id: 'process-2',
    title: 'e-GP System Enhancement',
    description: 'Upgrade electronic Government Procurement system with automated workflows and AI-powered delay detection.',
    annualObjectiveIds: ['annual-2', 'annual-6'],
    owner: 'Public Procurement Monitoring Office',
    startDate: '2025-02-01',
    endDate: '2025-11-30',
    status: 'in-progress',
    resources: ['Software developers', 'AI specialists', 'System integration experts', 'User training programs', 'Server infrastructure']
  },
  {
    id: 'process-3',
    title: 'NPB Project Clearance Standardization',
    description: 'Standardize and digitize National Planning Board project clearance processes for large infrastructure projects.',
    annualObjectiveIds: ['annual-3'],
    owner: 'National Planning Commission',
    startDate: '2025-01-15',
    endDate: '2025-10-31',
    status: 'in-progress',
    resources: ['Digital platform development', 'Evaluation specialists', 'Project assessment tools', 'Inter-ministry coordination', 'Quality assurance system']
  },
  {
    id: 'process-4',
    title: 'Provincial Budget Support Unit Setup',
    description: 'Establish and operationalize budget support units in provincial governments with trained staff and systems.',
    annualObjectiveIds: ['annual-4'],
    owner: 'Ministry of Federal Affairs and Local Development',
    startDate: '2025-03-01',
    endDate: '2025-11-15',
    status: 'in-progress',
    resources: ['Trained financial analysts', 'Budget management software', 'Office infrastructure', 'Capacity building programs', 'Technical support staff']
  },
  {
    id: 'process-5',
    title: 'Public Dashboard Development and Deployment',
    description: 'Develop and launch real-time public dashboard for tracking development project progress and budget execution.',
    annualObjectiveIds: ['annual-5'],
    owner: 'Office of the Auditor General',
    startDate: '2024-12-01',
    endDate: '2025-09-30',
    status: 'completed',
    resources: ['Web developers', 'Data visualization experts', 'Real-time data feeds', 'Public communication team', 'Hosting infrastructure']
  },
  {
    id: 'process-6',
    title: 'FMIS Integration and Rollout',
    description: 'Integrate Financial Management Information System with existing systems and roll out to subnational governments.',
    annualObjectiveIds: ['annual-7'],
    owner: 'Financial Comptroller General Office',
    startDate: '2025-02-01',
    endDate: '2025-12-31',
    status: 'in-progress',
    resources: ['System integration specialists', 'Training coordinators', 'Technical support teams', 'Data migration tools', 'Change management support']
  },
  {
    id: 'process-7',
    title: 'Specialized Staff Recruitment',
    description: 'Recruit and onboard public finance data analysts with expertise in budget monitoring and performance measurement.',
    annualObjectiveIds: ['annual-8'],
    owner: 'Human Resources, Ministry of Finance',
    startDate: '2025-04-01',
    endDate: '2025-08-31',
    status: 'planning',
    resources: ['Recruitment specialists', 'Technical assessment panels', 'Competitive salary packages', 'Professional development programs', 'IT equipment and tools']
  },
  {
    id: 'process-8',
    title: 'AI Alert System Development',
    description: 'Develop and deploy AI-powered alert system for procurement delays and budget execution bottlenecks.',
    annualObjectiveIds: ['annual-6'],
    owner: 'Department of Information Technology',
    startDate: '2025-05-01',
    endDate: '2025-12-31',
    status: 'planning',
    resources: ['AI developers', 'Data scientists', 'Machine learning infrastructure', 'Integration specialists', 'Testing and validation teams']
  }
];

export const dummyMetrics: Metric[] = [
  {
    id: 'metric-1',
    name: 'Capital Budget Execution Rate',
    description: 'Percentage of allocated capital budget actually spent on approved projects',
    processIds: ['process-1'],
    target: 80,
    current: 58,
    unit: '% executed',
    frequency: 'monthly',
    owner: 'Budget Division Director'
  },
  {
    id: 'metric-2',
    name: 'Average Procurement Days',
    description: 'Average number of days from procurement initiation to contract award',
    processIds: ['process-2'],
    target: 90,
    current: 180,
    unit: 'days',
    frequency: 'monthly',
    owner: 'PPMO Director'
  },
  {
    id: 'metric-3',
    name: 'Projects with NPB Clearance',
    description: 'Percentage of large infrastructure projects that have completed NPB clearance process',
    processIds: ['process-3'],
    target: 100,
    current: 85,
    unit: '% cleared',
    frequency: 'quarterly',
    owner: 'NPC Secretary'
  },
  {
    id: 'metric-4',
    name: 'Functional Budget Support Units',
    description: 'Number of provinces with operational budget support units',
    processIds: ['process-4'],
    target: 5,
    current: 4,
    unit: 'units',
    frequency: 'quarterly',
    owner: 'MoFALD Secretary'
  },
  {
    id: 'metric-5',
    name: 'Dashboard Uptime',
    description: 'Percentage of time the public budget tracking dashboard is operational and accessible',
    processIds: ['process-5'],
    target: 99.5,
    current: 99.8,
    unit: '% uptime',
    frequency: 'daily',
    owner: 'OAG IT Director'
  },
  {
    id: 'metric-6',
    name: 'FMIS Adoption Rate',
    description: 'Percentage of subnational governments using integrated FMIS',
    processIds: ['process-6'],
    target: 85,
    current: 55,
    unit: '% adoption',
    frequency: 'monthly',
    owner: 'FCGO Director'
  },
  {
    id: 'metric-7',
    name: 'Budget Monitoring Staff',
    description: 'Number of specialized public finance data analysts recruited',
    processIds: ['process-7'],
    target: 10,
    current: 3,
    unit: 'analysts',
    frequency: 'monthly',
    owner: 'MoF HR Director'
  },
  {
    id: 'metric-8',
    name: 'AI Alert System Coverage',
    description: 'Percentage of procurement processes covered by AI delay alert system',
    processIds: ['process-8'],
    target: 100,
    current: 15,
    unit: '% coverage',
    frequency: 'monthly',
    owner: 'DoIT Director'
  },
  {
    id: 'metric-9',
    name: 'Inter-Ministerial Review Meetings',
    description: 'Number of multi-agency budget implementation review meetings held',
    processIds: ['process-1'],
    target: 12,
    current: 8,
    unit: 'meetings',
    frequency: 'monthly',
    owner: 'Budget Coordination Team'
  },
  {
    id: 'metric-10',
    name: 'Public Satisfaction with Budget Transparency',
    description: 'Citizen satisfaction score with government budget transparency and accountability',
    processIds: ['process-5'],
    target: 8.0,
    current: 6.2,
    unit: 'score out of 10',
    frequency: 'quarterly',
    owner: 'Public Communication Director'
  }
];

export const dummyCatchballItems: CatchballItem[] = [
  {
    id: 'catchball-1',
    type: 'concern',
    title: 'Delayed Fund Release Affecting Project Implementation',
    description: 'Ministry of Urban Development is experiencing significant delays in fund release from Treasury, affecting capital project execution. Current execution rate is only 45% due to cash flow issues.',
    from: 'Secretary, Ministry of Urban Development',
    to: 'Financial Comptroller General',
    relatedItemId: 'annual-1',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-25T09:30:00Z',
    responses: [
      {
        id: 'response-1',
        message: 'We are implementing monthly disbursement ceilings and Treasury pacing to address this. Let\'s set up weekly coordination meetings during Q4.',
        author: 'Financial Comptroller General',
        createdAt: '2025-05-25T14:20:00Z'
      }
    ]
  },
  {
    id: 'catchball-2',
    type: 'question',
    title: 'e-GP System Integration with AI Alerts',
    description: 'How will the new AI alert system integrate with existing e-GP processes? Our procurement staff need training on the new automated flagging system for delays over 60 days.',
    from: 'Procurement Officer, Ministry of Education',
    to: 'PPMO Director',
    relatedItemId: 'annual-6',
    relatedItemType: 'annual',
    status: 'addressed',
    createdAt: '2025-05-22T11:15:00Z',
    responses: [
      {
        id: 'response-2',
        message: 'The AI system will automatically flag delays and suggest interventions. We\'ll conduct training workshops for all procurement officers starting next month.',
        author: 'PPMO Director',
        createdAt: '2025-05-22T16:30:00Z'
      }
    ]
  },
  {
    id: 'catchball-3',
    type: 'approval',
    title: 'Budget Ceiling Adjustment for Infrastructure Projects',
    description: 'Department of Roads requests budget ceiling adjustment due to increased material costs. Need approval to use emergency infrastructure funds while maintaining quality standards.',
    from: 'Director General, Department of Roads',
    to: 'Secretary, Ministry of Finance',
    relatedItemId: 'annual-1',
    relatedItemType: 'annual',
    status: 'addressed',
    createdAt: '2025-05-20T13:45:00Z',
    responses: [
      {
        id: 'response-3',
        message: 'Approved for use of emergency infrastructure funds. Ensure all additional spending is properly documented and maintains NPB clearance requirements.',
        author: 'Secretary, Ministry of Finance',
        createdAt: '2025-05-21T09:15:00Z'
      }
    ]
  },
  {
    id: 'catchball-4',
    type: 'suggestion',
    title: 'Provincial FMIS Implementation Strategy',
    description: 'Province 2 suggests phased rollout of FMIS starting with larger municipalities first. This could help identify integration issues before full deployment.',
    from: 'Finance Secretary, Province 2',
    to: 'FCGO Director',
    relatedItemId: 'annual-7',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-23T10:20:00Z',
    responses: [
      {
        id: 'response-4',
        message: 'Excellent approach. Let\'s implement this phased strategy across all provinces. Start with municipalities with budget above NPR 100 million.',
        author: 'FCGO Director',
        createdAt: '2025-05-23T15:30:00Z'
      }
    ]
  },
  {
    id: 'catchball-5',
    type: 'question',
    title: 'NPB Clearance Timeline for Project Approval',
    description: 'Large infrastructure projects are experiencing delays in NPB clearance process. Can we establish clearer timelines and digital tracking for clearance stages?',
    from: 'Project Director, Mega Infrastructure Project',
    to: 'NPC Secretary',
    relatedItemId: 'annual-3',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-26T08:45:00Z',
    responses: [
      {
        id: 'response-5',
        message: 'We are developing digital NPB clearance dashboard with clear timelines. All clearance stages will be trackable online starting next quarter.',
        author: 'NPC Secretary',
        createdAt: '2025-05-26T11:30:00Z'
      }
    ]
  },
  {
    id: 'catchball-6',
    type: 'concern',
    title: 'Technical Expertise Gap in Budget Support Units',
    description: 'Provincial budget support units lack technical expertise in financial analysis and budget monitoring. Need specialized training and possibly external technical assistance.',
    from: 'Planning Officer, Province 5',
    to: 'Secretary, MoFALD',
    relatedItemId: 'annual-4',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-27T14:15:00Z',
    responses: [
      {
        id: 'response-6',
        message: 'We will arrange specialized training through NPC and consider hiring external consultants for initial support. Let\'s also establish peer learning networks.',
        author: 'Secretary, MoFALD',
        createdAt: '2025-05-27T16:45:00Z'
      }
    ]
  },
  {
    id: 'catchball-7',
    type: 'suggestion',
    title: 'Public Dashboard Enhancement with Mobile Access',
    description: 'Citizens are requesting mobile-friendly version of budget tracking dashboard. Many access internet primarily through smartphones in rural areas.',
    from: 'Civil Society Representative',
    to: 'OAG IT Director',
    relatedItemId: 'annual-5',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-28T12:30:00Z',
    responses: [
      {
        id: 'response-7',
        message: 'Great suggestion! Mobile optimization is planned for next phase. We\'ll also develop SMS alerts for major project updates.',
        author: 'OAG IT Director',
        createdAt: '2025-05-28T16:20:00Z'
      }
    ]
  },
  {
    id: 'catchball-8',
    type: 'question',
    title: 'Coordination Between LMBIS and NPB Dashboards',
    description: 'How will Line Ministry Budget Information System integrate with NPB project dashboards? We need unified view to prevent virement without proper reprogramming.',
    from: 'Budget Officer, Ministry of Health',
    to: 'Budget Division Director, MoF',
    relatedItemId: 'annual-1',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-29T09:15:00Z',
    responses: [
      {
        id: 'response-8',
        message: 'API integration between LMBIS and NPB systems is in development. This will provide real-time alerts for any unauthorized budget virements.',
        author: 'Budget Division Director, MoF',
        createdAt: '2025-05-29T14:45:00Z'
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