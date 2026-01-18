// types/hoshin.ts

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
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold' | 'planning';
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

export interface DatasetOption {
  id: string;
  name: string;
  description: string;
  data: HoshinData;
}

// Kano Model Types

export type KanoCategory = 'basic' | 'performance' | 'excitement' | 'indifferent' | 'reverse';

export interface KanoFeature {
  id: string;
  name: string;
  description: string;
  category: KanoCategory;
  dysfunctionalScore: number;  // -2 to 2 (dislike to like if feature ABSENT)
  functionalScore: number;     // -2 to 2 (dislike to like if feature PRESENT)
  importance: number;          // 1-5 priority score
  satisfactionImpact: number;  // Calculated
  linkedStrategicObjectiveIds?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyKanoAnalysis {
  id: string;
  companyName: string;
  companyType: 'self' | 'competitor';
  industry: string;
  features: KanoFeature[];
  overallScore: number;
  strengthAreas: string[];
  weaknessAreas: string[];
  analysisDate: string;
}

export interface KanoInsight {
  type: 'opportunity' | 'threat' | 'strength' | 'weakness';
  title: string;
  description: string;
  relatedFeatures: string[];  // Feature IDs
  priority: 'high' | 'medium' | 'low';
}

export interface KanoComparison {
  id: string;
  selfCompany: CompanyKanoAnalysis;
  competitors: CompanyKanoAnalysis[];  // 2 competitors
  insights: KanoInsight[];
  createdAt: string;
}