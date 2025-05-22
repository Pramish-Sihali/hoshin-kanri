// utils/dummyData.ts
import { StrategicObjective, AnnualObjective, Process, Metric, CatchballItem } from '../types/hoshin';

export const dummyStrategicObjectives: StrategicObjective[] = [
  {
    id: 'strategic-1',
    title: 'Achieve Market Leadership in Sustainable Technology',
    description: 'Become the leading provider of sustainable technology solutions in our industry by 2027',
    targetYear: 2027,
    owner: 'CEO',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-2',
    title: 'Expand Global Presence',
    description: 'Establish operations in 5 new international markets',
    targetYear: 2026,
    owner: 'VP International',
    status: 'planning',
    priority: 'high'
  },
  {
    id: 'strategic-3',
    title: 'Digital Transformation Excellence',
    description: 'Complete digital transformation of all core business processes',
    targetYear: 2025,
    owner: 'CTO',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 'strategic-4',
    title: 'Employee Engagement & Development',
    description: 'Achieve top 10% employee satisfaction scores in industry',
    targetYear: 2026,
    owner: 'CHRO',
    status: 'planning',
    priority: 'medium'
  }
];

export const dummyAnnualObjectives: AnnualObjective[] = [
  {
    id: 'annual-1',
    title: 'Launch Green Product Line',
    description: 'Develop and launch 3 new sustainable products',
    strategicObjectiveIds: ['strategic-1'],
    targetDate: '2025-12-31',
    owner: 'Product Manager',
    status: 'in-progress',
    progress: 65
  },
  {
    id: 'annual-2',
    title: 'Reduce Carbon Footprint by 30%',
    description: 'Implement energy-efficient operations across all facilities',
    strategicObjectiveIds: ['strategic-1'],
    targetDate: '2025-11-30',
    owner: 'Operations Director',
    status: 'in-progress',
    progress: 45
  },
  {
    id: 'annual-3',
    title: 'Enter Asian Markets',
    description: 'Establish partnerships and distribution in Japan and South Korea',
    strategicObjectiveIds: ['strategic-2'],
    targetDate: '2025-09-30',
    owner: 'Regional Manager Asia',
    status: 'planning',
    progress: 20
  },
  {
    id: 'annual-4',
    title: 'Implement CRM System',
    description: 'Deploy new customer relationship management system company-wide',
    strategicObjectiveIds: ['strategic-3'],
    targetDate: '2025-08-15',
    owner: 'IT Director',
    status: 'in-progress',
    progress: 80
  },
  {
    id: 'annual-5',
    title: 'Employee Wellness Program',
    description: 'Launch comprehensive wellness and mental health support program',
    strategicObjectiveIds: ['strategic-4'],
    targetDate: '2025-06-30',
    owner: 'HR Manager',
    status: 'completed',
    progress: 100
  }
];

export const dummyProcesses: Process[] = [
  {
    id: 'process-1',
    title: 'Sustainable Materials Research',
    description: 'Research and develop eco-friendly materials for product manufacturing',
    annualObjectiveIds: ['annual-1'],
    owner: 'R&D Team Lead',
    startDate: '2025-01-15',
    endDate: '2025-08-30',
    status: 'in-progress',
    resources: ['Research Scientists', 'Lab Equipment', 'External Consultants']
  },
  {
    id: 'process-2',
    title: 'Energy Efficiency Audit',
    description: 'Conduct comprehensive energy audits across all facilities',
    annualObjectiveIds: ['annual-2'],
    owner: 'Facilities Manager',
    startDate: '2025-02-01',
    endDate: '2025-07-31',
    status: 'in-progress',
    resources: ['Energy Consultants', 'Measurement Equipment', 'Audit Team']
  },
  {
    id: 'process-3',
    title: 'Market Entry Strategy Development',
    description: 'Develop comprehensive strategy for Asian market entry',
    annualObjectiveIds: ['annual-3'],
    owner: 'Strategy Consultant',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    status: 'in-progress',
    resources: ['Market Research Team', 'Legal Advisors', 'Local Partners']
  },
  {
    id: 'process-4',
    title: 'CRM Data Migration',
    description: 'Migrate existing customer data to new CRM system',
    annualObjectiveIds: ['annual-4'],
    owner: 'Database Administrator',
    startDate: '2025-01-01',
    endDate: '2025-07-15',
    status: 'in-progress',
    resources: ['IT Team', 'Data Migration Tools', 'CRM Vendor Support']
  },
  {
    id: 'process-5',
    title: 'Wellness Program Rollout',
    description: 'Implement and launch employee wellness initiatives',
    annualObjectiveIds: ['annual-5'],
    owner: 'Wellness Coordinator',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    status: 'completed',
    resources: ['Wellness Coaches', 'Healthcare Partners', 'Communication Team']
  }
];

export const dummyMetrics: Metric[] = [
  {
    id: 'metric-1',
    name: 'Sustainable Product Revenue',
    description: 'Revenue generated from sustainable product lines',
    processIds: ['process-1'],
    target: 5000000,
    current: 3250000,
    unit: 'USD',
    frequency: 'monthly',
    owner: 'Sales Director'
  },
  {
    id: 'metric-2',
    name: 'Energy Consumption Reduction',
    description: 'Percentage reduction in energy consumption across facilities',
    processIds: ['process-2'],
    target: 30,
    current: 18,
    unit: '%',
    frequency: 'monthly',
    owner: 'Facilities Manager'
  },
  {
    id: 'metric-3',
    name: 'Market Entry Milestones',
    description: 'Number of market entry milestones completed',
    processIds: ['process-3'],
    target: 12,
    current: 7,
    unit: 'milestones',
    frequency: 'weekly',
    owner: 'Regional Manager Asia'
  },
  {
    id: 'metric-4',
    name: 'CRM User Adoption Rate',
    description: 'Percentage of employees actively using new CRM system',
    processIds: ['process-4'],
    target: 95,
    current: 78,
    unit: '%',
    frequency: 'weekly',
    owner: 'IT Director'
  },
  {
    id: 'metric-5',
    name: 'Employee Wellness Participation',
    description: 'Percentage of employees participating in wellness programs',
    processIds: ['process-5'],
    target: 80,
    current: 85,
    unit: '%',
    frequency: 'monthly',
    owner: 'HR Manager'
  },
  {
    id: 'metric-6',
    name: 'Customer Satisfaction Score',
    description: 'Overall customer satisfaction rating',
    processIds: ['process-1', 'process-4'],
    target: 4.5,
    current: 4.2,
    unit: '/5',
    frequency: 'quarterly',
    owner: 'Customer Success Manager'
  }
];

export const dummyCatchballItems: CatchballItem[] = [
  {
    id: 'catchball-1',
    type: 'question',
    title: 'Resource Allocation for R&D',
    description: 'Do we have sufficient budget allocation for the sustainable materials research? The current timeline might be aggressive given our resource constraints.',
    from: 'R&D Team Lead',
    to: 'CFO',
    relatedItemId: 'process-1',
    relatedItemType: 'process',
    status: 'pending',
    createdAt: '2025-05-20T10:30:00Z',
    responses: [
      {
        id: 'response-1',
        message: 'Let me review the current budget allocation and get back to you by end of week.',
        author: 'CFO',
        createdAt: '2025-05-20T14:15:00Z'
      }
    ]
  },
  {
    id: 'catchball-2',
    type: 'concern',
    title: 'CRM Implementation Timeline Risk',
    description: 'The current CRM implementation timeline seems optimistic. We might face delays due to data quality issues in legacy systems.',
    from: 'Database Administrator',
    to: 'IT Director',
    relatedItemId: 'annual-4',
    relatedItemType: 'annual',
    status: 'addressed',
    createdAt: '2025-05-18T09:15:00Z',
    responses: [
      {
        id: 'response-2',
        message: 'Good point. Let\'s schedule a risk assessment meeting this week.',
        author: 'IT Director',
        createdAt: '2025-05-18T11:30:00Z'
      },
      {
        id: 'response-3',
        message: 'Risk assessment completed. We\'ve added 2 weeks buffer to the timeline.',
        author: 'IT Director',
        createdAt: '2025-05-19T16:45:00Z'
      }
    ]
  },
  {
    id: 'catchball-3',
    type: 'suggestion',
    title: 'Partnership Opportunity in Japan',
    description: 'I\'ve identified a potential strategic partner in Japan that could accelerate our market entry. They have strong distribution networks and cultural expertise.',
    from: 'Regional Manager Asia',
    to: 'VP International',
    relatedItemId: 'annual-3',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-19T16:20:00Z',
    responses: []
  },
  {
    id: 'catchball-4',
    type: 'approval',
    title: 'Budget Increase for Energy Audit',
    description: 'We need approval for additional 15% budget increase for the energy efficiency audit to include more detailed analysis of HVAC systems.',
    from: 'Facilities Manager',
    to: 'Operations Director',
    relatedItemId: 'process-2',
    relatedItemType: 'process',
    status: 'addressed',
    createdAt: '2025-05-17T13:45:00Z',
    responses: [
      {
        id: 'response-4',
        message: 'Approved. The detailed HVAC analysis will provide better ROI insights.',
        author: 'Operations Director',
        createdAt: '2025-05-17T15:30:00Z'
      }
    ]
  },
  {
    id: 'catchball-5',
    type: 'question',
    title: 'Wellness Program Metrics',
    description: 'Should we track additional wellness metrics beyond participation rates? Mental health surveys, productivity indicators, etc.?',
    from: 'Wellness Coordinator',
    to: 'CHRO',
    relatedItemId: 'annual-5',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-21T08:30:00Z',
    responses: [
      {
        id: 'response-5',
        message: 'Yes, let\'s discuss this in our next 1:1. Mental health indicators would be valuable.',
        author: 'CHRO',
        createdAt: '2025-05-21T10:15:00Z'
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