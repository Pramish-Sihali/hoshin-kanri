// utils/dummyData.ts
import { StrategicObjective, AnnualObjective, Process, Metric, CatchballItem } from '../types/hoshin';

export const dummyStrategicObjectives: StrategicObjective[] = [
  {
    id: 'strategic-1',
    title: 'Make Nepal Digital by 2030',
    description: 'Bring internet and digital services to all citizens across Nepal through the Digital Nepal Framework',
    targetYear: 2030,
    owner: 'Ministry of Communications and Information Technology',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-2',
    title: 'Reduce Poverty and Grow Economy',
    description: 'Help families earn more money and reduce poverty from 20% to 5% by 2028',
    targetYear: 2028,
    owner: 'Ministry of Finance',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-3',
    title: 'Build Better Roads and Infrastructure',
    description: 'Connect all villages with good roads and provide reliable electricity to everyone',
    targetYear: 2029,
    owner: 'Ministry of Physical Infrastructure and Transport',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'strategic-4',
    title: 'Make Government Services Easy and Honest',
    description: 'Make it simple for people to get government services without corruption or delays',
    targetYear: 2027,
    owner: 'Office of the Prime Minister',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 'strategic-5',
    title: 'Protect Environment and Fight Climate Change',
    description: 'Plant more trees, reduce pollution, and prepare for climate change effects',
    targetYear: 2045,
    owner: 'Ministry of Forests and Environment',
    status: 'planning',
    priority: 'medium'
  }
];

export const dummyAnnualObjectives: AnnualObjective[] = [
  {
    id: 'annual-1',
    title: 'Launch National ID Cards for Everyone',
    description: 'Give digital ID cards to all Nepali citizens so they can access government services easily',
    strategicObjectiveIds: ['strategic-1'],
    targetDate: '2025-12-31',
    owner: 'Department of National ID and Civil Registration',
    status: 'in-progress',
    progress: 70
  },
  {
    id: 'annual-2',
    title: 'Improve Nagarik App Usage',
    description: 'Make the Nagarik App better so more people use it for government services (currently only 75,000 out of 2 million downloads)',
    strategicObjectiveIds: ['strategic-1', 'strategic-4'],
    targetDate: '2025-09-30',
    owner: 'Department of Information Technology',
    status: 'in-progress',
    progress: 45
  },
  {
    id: 'annual-3',
    title: 'Expand Child Grant to All Districts',
    description: 'Give Rs. 532 monthly support to families with young children in all 77 districts (currently only 25 districts)',
    strategicObjectiveIds: ['strategic-2'],
    targetDate: '2025-12-31',
    owner: 'Ministry of Women, Children and Senior Citizens',
    status: 'planning',
    progress: 20
  },
  {
    id: 'annual-4',
    title: 'Connect 500 Villages with Roads',
    description: 'Build all-weather roads to connect remote villages so people can travel safely year-round',
    strategicObjectiveIds: ['strategic-3'],
    targetDate: '2025-11-30',
    owner: 'Department of Roads',
    status: 'in-progress',
    progress: 55
  },
  {
    id: 'annual-5',
    title: 'Speed Up Government Services',
    description: 'Make sure people get government services faster - target is 7 days for most services',
    strategicObjectiveIds: ['strategic-4'],
    targetDate: '2025-08-31',
    owner: 'Ministry of General Administration',
    status: 'in-progress',
    progress: 60
  },
  {
    id: 'annual-6',
    title: 'Plant Trees in 200 Communities',
    description: 'Help local communities plant and protect forests to fight climate change',
    strategicObjectiveIds: ['strategic-5'],
    targetDate: '2025-12-15',
    owner: 'Department of Forests and Soil Conservation',
    status: 'planning',
    progress: 15
  }
];

export const dummyProcesses: Process[] = [
  {
    id: 'process-1',
    title: 'Collect People\'s Information for ID Cards',
    description: 'Visit every district to take photos and fingerprints for national ID cards',
    annualObjectiveIds: ['annual-1'],
    owner: 'District Administration Offices',
    startDate: '2025-02-01',
    endDate: '2025-10-31',
    status: 'in-progress',
    resources: ['Fingerprint machines', 'Camera equipment', 'Staff for data collection', 'Mobile units for remote areas']
  },
  {
    id: 'process-2',
    title: 'Fix Problems with Nagarik App',
    description: 'Make the app work better and add more government services that people actually need',
    annualObjectiveIds: ['annual-2'],
    owner: 'IT Department Team',
    startDate: '2025-01-15',
    endDate: '2025-08-30',
    status: 'in-progress',
    resources: ['App developers', 'User testing team', 'Customer support staff', 'Server upgrade']
  },
  {
    id: 'process-3',
    title: 'Set Up Child Grant System',
    description: 'Create a system to identify families with young children and send them monthly payments',
    annualObjectiveIds: ['annual-3'],
    owner: 'Social Security Committee',
    startDate: '2025-04-01',
    endDate: '2025-11-30',
    status: 'planning',
    resources: ['Social workers', 'Bank partnerships', 'Community volunteers', 'Mobile payment system']
  },
  {
    id: 'process-4',
    title: 'Build Roads in Remote Areas',
    description: 'Work with local communities and contractors to build roads that work in all seasons',
    annualObjectiveIds: ['annual-4'],
    owner: 'Road Construction Teams',
    startDate: '2025-03-01',
    endDate: '2025-11-15',
    status: 'in-progress',
    resources: ['Construction equipment', 'Local workers', 'Engineering support', 'Quality control inspectors']
  },
  {
    id: 'process-5',
    title: 'Train Government Workers',
    description: 'Teach government office staff how to serve people better and faster',
    annualObjectiveIds: ['annual-5'],
    owner: 'Training Department',
    startDate: '2025-02-01',
    endDate: '2025-07-31',
    status: 'in-progress',
    resources: ['Training materials', 'Workshop facilitators', 'Online training platform', 'Performance tracking system']
  },
  {
    id: 'process-6',
    title: 'Support Communities to Plant Trees',
    description: 'Work with local groups to choose areas for planting and caring for new forests',
    annualObjectiveIds: ['annual-6'],
    owner: 'Forest Officers',
    startDate: '2025-05-01',
    endDate: '2025-12-01',
    status: 'planning',
    resources: ['Tree seedlings', 'Community coordinators', 'Farming tools', 'Water supply systems']
  }
];

export const dummyMetrics: Metric[] = [
  {
    id: 'metric-1',
    name: 'People with National ID Cards',
    description: 'How many Nepali citizens have received their new digital ID cards',
    processIds: ['process-1'],
    target: 85,
    current: 58,
    unit: '% of population',
    frequency: 'monthly',
    owner: 'Director, National ID Department'
  },
  {
    id: 'metric-2',
    name: 'Active Nagarik App Users',
    description: 'How many people actually use the Nagarik app each month (not just download)',
    processIds: ['process-2'],
    target: 500000,
    current: 75302,
    unit: 'active users',
    frequency: 'monthly',
    owner: 'IT Department Director'
  },
  {
    id: 'metric-3',
    name: 'Districts with Child Grant',
    description: 'Number of districts where families receive monthly child support payments',
    processIds: ['process-3'],
    target: 77,
    current: 25,
    unit: 'districts',
    frequency: 'quarterly',
    owner: 'Social Security Director'
  },
  {
    id: 'metric-4',
    name: 'Villages Connected by Roads',
    description: 'Number of remote villages now connected with all-weather roads',
    processIds: ['process-4'],
    target: 500,
    current: 275,
    unit: 'villages',
    frequency: 'monthly',
    owner: 'Department of Roads Director'
  },
  {
    id: 'metric-5',
    name: 'Government Service Speed',
    description: 'Average days it takes to complete common government services',
    processIds: ['process-5'],
    target: 7,
    current: 15,
    unit: 'days',
    frequency: 'monthly',
    owner: 'Service Delivery Monitor'
  },
  {
    id: 'metric-6',
    name: 'New Forest Areas',
    description: 'Hectares of new forest planted and protected by communities',
    processIds: ['process-6'],
    target: 25000,
    current: 4500,
    unit: 'hectares',
    frequency: 'quarterly',
    owner: 'Forest Department Director'
  },
  {
    id: 'metric-7',
    name: 'Citizen Satisfaction Score',
    description: 'How happy people are with government services (survey results)',
    processIds: ['process-2', 'process-5'],
    target: 4.0,
    current: 2.8,
    unit: 'out of 5',
    frequency: 'quarterly',
    owner: 'Public Service Monitor'
  }
];

export const dummyCatchballItems: CatchballItem[] = [
  {
    id: 'catchball-1',
    type: 'concern',
    title: 'Internet Problems in Remote Areas',
    description: 'Many villages still don\'t have good internet connection, making it hard for people to use digital ID cards and Nagarik app. We need better internet infrastructure first.',
    from: 'District IT Officer, Humla',
    to: 'Secretary, Ministry of Communications',
    relatedItemId: 'annual-1',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-25T09:30:00Z',
    responses: [
      {
        id: 'response-1',
        message: 'You\'re right. We\'ll prioritize fiber optic cable installation in remote districts. Let\'s meet next week to plan.',
        author: 'Secretary, Ministry of Communications',
        createdAt: '2025-05-25T14:20:00Z'
      }
    ]
  },
  {
    id: 'catchball-2',
    type: 'question',
    title: 'Why Aren\'t People Using Nagarik App?',
    description: 'We have 2 million downloads but only 75,000 people actually use the app. Should we do more training or make the app simpler to use?',
    from: 'App Development Team Lead',
    to: 'IT Department Director',
    relatedItemId: 'annual-2',
    relatedItemType: 'annual',
    status: 'addressed',
    createdAt: '2025-05-22T11:15:00Z',
    responses: [
      {
        id: 'response-2',
        message: 'Let\'s do both - simplify the app and run awareness campaigns in local languages. Start with the most popular services.',
        author: 'IT Department Director',
        createdAt: '2025-05-22T16:30:00Z'
      },
      {
        id: 'response-3',
        message: 'Good plan. We\'ll focus on making land registration and tax payment easier first, then add training videos.',
        author: 'App Development Team Lead',
        createdAt: '2025-05-24T10:45:00Z'
      }
    ]
  },
  {
    id: 'catchball-3',
    type: 'approval',
    title: 'More Money Needed for Road Construction',
    description: 'Construction materials are now 30% more expensive than planned. We need extra budget to finish road projects on time without reducing quality.',
    from: 'Road Construction Supervisor',
    to: 'Secretary, Ministry of Finance',
    relatedItemId: 'annual-4',
    relatedItemType: 'annual',
    status: 'addressed',
    createdAt: '2025-05-20T13:45:00Z',
    responses: [
      {
        id: 'response-4',
        message: 'Approved. Good roads are essential for connecting communities. Use emergency funds if needed.',
        author: 'Secretary, Ministry of Finance',
        createdAt: '2025-05-21T09:15:00Z'
      }
    ]
  },
  {
    id: 'catchball-4',
    type: 'suggestion',
    title: 'Use Mobile Banks for Child Grant Payments',
    description: 'Many families in remote areas don\'t have bank accounts. We should partner with mobile banking services to send child grant payments directly to their phones.',
    from: 'Social Worker, Karnali Province',
    to: 'Director, Social Security Department',
    relatedItemId: 'annual-3',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-23T10:20:00Z',
    responses: [
      {
        id: 'response-5',
        message: 'Excellent idea! This would help us reach more families. Let\'s talk to eSewa and Khalti about partnerships.',
        author: 'Director, Social Security Department',
        createdAt: '2025-05-23T15:30:00Z'
      }
    ]
  },
  {
    id: 'catchball-5',
    type: 'question',
    title: 'Training for Tree Planting Communities',
    description: 'Local communities want to help plant trees but don\'t know proper techniques. Should we organize training workshops before starting the tree planting program?',
    from: 'Forest Officer, Chitwan',
    to: 'Director, Forest Department',
    relatedItemId: 'process-6',
    relatedItemType: 'process',
    status: 'pending',
    createdAt: '2025-05-26T08:45:00Z',
    responses: [
      {
        id: 'response-6',
        message: 'Yes, definitely. Partner with agricultural colleges to provide training. Happy communities will take better care of forests.',
        author: 'Director, Forest Department',
        createdAt: '2025-05-26T11:30:00Z'
      }
    ]
  },
  {
    id: 'catchball-6',
    type: 'concern',
    title: 'Coordination Between Local and Federal Government',
    description: 'Local municipalities and federal ministries are not coordinating well on service delivery. People get confused about where to go for different services.',
    from: 'Mayor, Kathmandu Municipality',
    to: 'Secretary, Ministry of Federal Affairs',
    relatedItemId: 'annual-5',
    relatedItemType: 'annual',
    status: 'pending',
    createdAt: '2025-05-27T14:15:00Z',
    responses: [
      {
        id: 'response-7',
        message: 'Let\'s create a simple guide showing which services are available where. We\'ll also set up monthly coordination meetings.',
        author: 'Secretary, Ministry of Federal Affairs',
        createdAt: '2025-05-27T16:45:00Z'
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