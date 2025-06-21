
// export interface StrategicObjective {
//     id: string;
//     title: string;
//     description: string;
//     targetYear: number;
//     owner: string;
//     status: 'planning' | 'in-progress' | 'completed' | 'at-risk';
//     priority: 'high' | 'medium' | 'low';
//   }
  
//   export interface AnnualObjective {
//     id: string;
//     title: string;
//     description: string;
//     strategicObjectiveIds: string[];
//     targetDate: string;
//     owner: string;
//     status: 'planning' | 'in-progress' | 'completed' | 'at-risk';
//     progress: number;
//   }
  
//   export interface Process {
//     id: string;
//     title: string;
//     description: string;
//     annualObjectiveIds: string[];
//     owner: string;
//     startDate: string;
//     endDate: string;
//     status: 'not-started' | 'in-progress' | 'completed' | 'on-hold'| 'planning';
//     resources: string[];
//   }
  
//   export interface Metric {
//     id: string;
//     name: string;
//     description: string;
//     processIds: string[];
//     target: number;
//     current: number;
//     unit: string;
//     frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
//     owner: string;
//   }
  
//   export interface CatchballItem {
//     id: string;
//     type: 'question' | 'suggestion' | 'concern' | 'approval';
//     title: string;
//     description: string;
//     from: string;
//     to: string;
//     relatedItemId: string;
//     relatedItemType: 'strategic' | 'annual' | 'process' | 'metric';
//     status: 'pending' | 'addressed' | 'rejected';
//     createdAt: string;
//     responses: Array<{
//       id: string;
//       message: string;
//       author: string;
//       createdAt: string;
//     }>;
//   }
  
//   export interface HoshinData {
//     strategicObjectives: StrategicObjective[];
//     annualObjectives: AnnualObjective[];
//     processes: Process[];
//     metrics: Metric[];
//     catchball: CatchballItem[];
//   }
  
export interface SIPOCData {
  suppliers: string[];
  inputs: string[];
  process: string;
  outputs: string[];
  customers: string[];
  upstreamProcesses?: string[];
  downstreamProcesses?: string[];
}

export interface StrategicObjective {
  id: string;
  title: string;
  description: string;
  targetYear: number;
  owner: string;
  status: 'planning' | 'in-progress' | 'completed' | 'at-risk';
  priority: 'high' | 'medium' | 'low';
}

export interface AnnualObjective {
  id: string;
  title: string;
  description: string;
  strategicObjectiveIds: string[];
  targetDate: string;
  owner: string;
  status: 'planning' | 'in-progress' | 'completed' | 'at-risk';
  progress: number;
  sipoc?: SIPOCData; // Optional SIPOC data for annual objectives
}

export interface Process {
  id: string;
  title: string;
  description: string;
  annualObjectiveIds: string[];
  owner: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold'| 'planning';
  resources: string[];
  sipoc?: SIPOCData; // Optional SIPOC data for processes
}

export interface Metric {
  id: string;
  name: string;
  description: string;
  processIds: string[];
  target: number;
  current: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  owner: string;
}

export interface CatchballItem {
  id: string;
  type: 'question' | 'suggestion' | 'concern' | 'approval';
  title: string;
  description: string;
  from: string;
  to: string;
  relatedItemId: string;
  relatedItemType: 'strategic' | 'annual' | 'process' | 'metric';
  status: 'pending' | 'addressed' | 'rejected';
  createdAt: string;
  responses: Array<{
    id: string;
    message: string;
    author: string;
    createdAt: string;
  }>;
}

export interface HoshinData {
  strategicObjectives: StrategicObjective[];
  annualObjectives: AnnualObjective[];
  processes: Process[];
  metrics: Metric[];
  catchball: CatchballItem[];
}