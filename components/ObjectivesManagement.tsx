// components/ObjectivesManagement.tsx
'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Target, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp,
  Calendar,
  User,
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Eye,
  Workflow,
  Building,
  FileText,
  Settings
} from 'lucide-react';

interface SIPOCData {
  suppliers: string[];
  inputs: string[];
  process: string;
  outputs: string[];
  customers: string[];
  upstreamProcesses: string[];
  downstreamProcesses: string[];
}

const ObjectivesManagement: React.FC = () => {
  const { strategicObjectives, annualObjectives, processes, metrics } = useHoshinStore();
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const [showSIPOC, setShowSIPOC] = useState<string | null>(null);

  // SIPOC data for demo purposes - this would normally come from the database
  const sipocData: Record<string, SIPOCData> = {
    'annual-1': {
      suppliers: [
        'Trade Negotiation Teams, MoFA',
        'Embassy Economic Sections',
        'Legal Advisory Units',
        'Sector Ministry Representatives'
      ],
      inputs: [
        'Bilateral negotiation frameworks',
        'Market access requirements', 
        'Trade policy guidelines',
        'Legal compliance documents',
        'Stakeholder consultation reports'
      ],
      process: 'Bilateral Trade Agreement Conclusion Process',
      outputs: [
        'Signed trade agreements',
        'Market access protocols',
        'Implementation roadmaps',
        'Ratification documents'
      ],
      customers: [
        'Nepal Export Community',
        'International Trading Partners',
        'Trade Promotion Organizations',
        'Economic Policy Makers'
      ],
      upstreamProcesses: [
        'Market Analysis and Prioritization',
        'Stakeholder Consultation Process',
        'Negotiation Strategy Development'
      ],
      downstreamProcesses: [
        'Agreement Implementation Monitoring',
        'Export Facilitation Services',
        'Market Penetration Activities',
        'Trade Volume Tracking'
      ]
    },
    'annual-2': {
      suppliers: [
        'Trade Promotion Division, MoFA',
        'Embassy Commercial Sections',
        'Event Management Companies',
        'Sector Export Associations'
      ],
      inputs: [
        'Market intelligence reports',
        'Export readiness assessments',
        'Buyer database information',
        'Mission logistics requirements',
        'B2B matchmaking platforms'
      ],
      process: 'High-Impact Trade Mission Execution Process',
      outputs: [
        'Executed trade missions',
        'Business partnership agreements',
        'Export contract pipelines',
        'Market entry strategies'
      ],
      customers: [
        'Nepali Exporters',
        'International Buyers',
        'Business Chambers',
        'Sector Development Agencies'
      ],
      upstreamProcesses: [
        'Export Sector Readiness Assessment',
        'Target Market Selection',
        'Participant Screening Process'
      ],
      downstreamProcesses: [
        'Contract Negotiation Support',
        'Export Transaction Facilitation',
        'Long-term Partnership Development',
        'Market Performance Monitoring'
      ]
    },
    'annual-3': {
      suppliers: [
        'Honorary Consuls Network',
        'Diaspora Organizations',
        'Embassy Consular Sections',
        'Digital Communication Platforms'
      ],
      inputs: [
        'Diaspora entrepreneur databases',
        'Business networking requirements',
        'Market opportunity mappings',
        'Communication infrastructure',
        'Network coordination protocols'
      ],
      process: 'Diaspora Business Network Establishment Process',
      outputs: [
        'Active diaspora business networks',
        'Trade facilitation partnerships',
        'Investment connection platforms',
        'Market intelligence channels'
      ],
      customers: [
        'Nepal Diaspora Entrepreneurs',
        'Domestic Export Companies',
        'International Market Partners',
        'Investment Agencies'
      ],
      upstreamProcesses: [
        'Diaspora Mapping and Identification',
        'Network Structure Design',
        'Platform Development Process'
      ],
      downstreamProcesses: [
        'Business Matchmaking Activities',
        'Investment Flow Facilitation',
        'Market Intelligence Sharing',
        'Trade Deal Coordination'
      ]
    },
    'annual-4': {
      suppliers: [
        'Investment Board Nepal',
        'Embassy Investment Sections',
        'Sector Development Agencies',
        'Due Diligence Consultants'
      ],
      inputs: [
        'Investment project portfolios',
        'Investor targeting databases',
        'Sector feasibility studies',
        'Regulatory framework updates',
        'Investment incentive packages'
      ],
      process: 'Export-Oriented FDI Commitment Securing Process',
      outputs: [
        'FDI commitment agreements',
        'Investment implementation plans',
        'Export capacity expansions',
        'Technology transfer arrangements'
      ],
      customers: [
        'International Investors',
        'Export Industry Sectors',
        'Employment Generation Programs',
        'Economic Development Agencies'
      ],
      upstreamProcesses: [
        'Investment Opportunity Development',
        'Investor Outreach and Targeting',
        'Project Preparation Process'
      ],
      downstreamProcesses: [
        'Investment Implementation Monitoring',
        'Export Production Scaling',
        'Market Access Facilitation',
        'Performance Impact Assessment'
      ]
    },
    'annual-5': {
      suppliers: [
        'Embassy Coordination Division',
        'Local Real Estate Partners',
        'Trade Office Service Providers',
        'Staff Recruitment Agencies'
      ],
      inputs: [
        'Market prioritization criteria',
        'Office establishment requirements',
        'Sector expertise specifications',
        'Operational infrastructure needs',
        'Budget allocation frameworks'
      ],
      process: 'Sector-Specific Trade Office Launch Process',
      outputs: [
        'Operational trade promotion offices',
        'Market-specific service capabilities',
        'Sector expertise deployment',
        'Export facilitation infrastructure'
      ],
      customers: [
        'Nepal Export Sectors',
        'International Business Community',
        'Host Country Partners',
        'Trade Development Organizations'
      ],
      upstreamProcesses: [
        'Market Selection and Analysis',
        'Infrastructure Planning Process',
        'Staff Deployment Strategy'
      ],
      downstreamProcesses: [
        'Export Promotion Services',
        'Market Intelligence Generation',
        'Business Facilitation Activities',
        'Partnership Development'
      ]
    },
    'annual-6': {
      suppliers: [
        'Digital Diplomacy Unit, MoFA',
        'Software Development Companies',
        'Cloud Infrastructure Providers',
        'Data Integration Specialists'
      ],
      inputs: [
        'Stakeholder requirements analysis',
        'System integration specifications',
        'Security compliance standards',
        'User interface designs',
        'Data management protocols'
      ],
      process: 'Economic Diplomacy Digital Platform Deployment Process',
      outputs: [
        'Integrated digital platform',
        'Real-time coordination capabilities',
        'Performance tracking dashboards',
        'Stakeholder collaboration tools'
      ],
      customers: [
        'Embassy Economic Officers',
        'Trade Promotion Staff',
        'Economic Diplomacy Coordinators',
        'Senior Government Officials'
      ],
      upstreamProcesses: [
        'Requirements Gathering Process',
        'Platform Architecture Design',
        'Security Framework Development'
      ],
      downstreamProcesses: [
        'Digital Coordination Activities',
        'Performance Analytics Generation',
        'Stakeholder Communication Enhancement',
        'Decision Support Systems'
      ]
    },
    'annual-7': {
      suppliers: [
        'Event Management Division, MoFA',
        'International Convention Centers',
        'Marketing and Communications Agencies',
        'VIP Protocol Services'
      ],
      inputs: [
        'Investor targeting strategies',
        'Sector presentation materials',
        'Event logistics requirements',
        'Media engagement plans',
        'Follow-up coordination systems'
      ],
      process: 'International Investment Summit Hosting Process',
      outputs: [
        'Executed investment summits',
        'Investor engagement outcomes',
        'Investment pipeline development',
        'International visibility enhancement'
      ],
      customers: [
        'International Investor Community',
        'Nepal Investment Agencies',
        'Sector Development Organizations',
        'Economic Policy Stakeholders'
      ],
      upstreamProcesses: [
        'Investor Outreach and Invitation',
        'Content Development Process',
        'Event Planning and Coordination'
      ],
      downstreamProcesses: [
        'Investment Commitment Follow-up',
        'Partnership Development Activities',
        'Market Visibility Leverage',
        'Investment Implementation Support'
      ]
    },
    'annual-8': {
      suppliers: [
        'Commercial Attachés Network',
        'Embassy Economic Sections',
        'Digital Marketing Platforms',
        'Market Research Organizations'
      ],
      inputs: [
        'Export promotion strategies',
        'Market intelligence requirements',
        'Digital outreach capabilities',
        'Performance measurement systems',
        'Coordination protocols'
      ],
      process: 'Export Inquiry Generation and Increase Process',
      outputs: [
        'Qualified export inquiries',
        'Market intelligence reports',
        'Export promotion campaigns',
        'Business lead databases'
      ],
      customers: [
        'Nepal Export Companies',
        'Trade Promotion Organizations',
        'International Buyers',
        'Business Development Agencies'
      ],
      upstreamProcesses: [
        'Market Intelligence Collection',
        'Export Promotion Strategy Design',
        'Digital Campaign Development'
      ],
      downstreamProcesses: [
        'Lead Qualification Process',
        'Business Matchmaking Activities',
        'Export Transaction Support',
        'Customer Relationship Management'
      ]
    },
    'annual-9': {
      suppliers: [
        'Business Facilitation Unit, MoFA',
        'Legal Advisory Services',
        'Sector Expert Networks',
        'Partnership Brokerage Organizations'
      ],
      inputs: [
        'Exporter capability assessments',
        'International partner databases',
        'Partnership framework templates',
        'Due diligence methodologies',
        'Market compatibility analyses'
      ],
      process: 'Strategic Business Partnership Establishment Process',
      outputs: [
        'Formal business partnerships',
        'Market access agreements',
        'Technology transfer arrangements',
        'Long-term trade relationships'
      ],
      customers: [
        'Nepali Export Companies',
        'International Business Partners',
        'Technology Recipients',
        'Market Development Agencies'
      ],
      upstreamProcesses: [
        'Partner Identification and Screening',
        'Compatibility Assessment Process',
        'Partnership Structure Design'
      ],
      downstreamProcesses: [
        'Partnership Implementation Support',
        'Performance Monitoring Activities',
        'Relationship Management Process',
        'Expansion and Scaling Support'
      ]
    },
    'annual-10': {
      suppliers: [
        'Diaspora Affairs Division, MoFA',
        'Financial Institution Partners',
        'Fund Management Specialists',
        'Legal and Regulatory Advisors'
      ],
      inputs: [
        'Diaspora investment capacity studies',
        'SME funding requirement analysis',
        'Fund governance frameworks',
        'Investment criteria development',
        'Portfolio management systems'
      ],
      process: 'Diaspora Investment Fund Launch Process',
      outputs: [
        'Operational investment fund',
        'SME funding mechanisms',
        'Investment portfolio strategies',
        'Diaspora capital mobilization'
      ],
      customers: [
        'Export-Oriented SMEs',
        'Nepal Diaspora Investors',
        'Economic Development Programs',
        'Employment Generation Initiatives'
      ],
      upstreamProcesses: [
        'Fund Structure Design Process',
        'Regulatory Approval Process',
        'Capital Raising Activities'
      ],
      downstreamProcesses: [
        'SME Investment Activities',
        'Portfolio Performance Monitoring',
        'Return Generation Process',
        'Fund Expansion Planning'
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
      case 'in-progress': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'at-risk': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'planning': return 'bg-gradient-to-r from-amber-500 to-amber-600';
      default: return 'bg-gradient-to-r from-slate-500 to-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2;
      case 'in-progress': return Clock;
      case 'at-risk': return AlertTriangle;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/80';
      case 'medium': return 'border-l-amber-500 bg-amber-50/80';
      case 'low': return 'border-l-emerald-500 bg-emerald-50/80';
      default: return 'border-l-slate-500 bg-slate-50/80';
    }
  };

  const getRelatedAnnualObjectives = (strategicId: string) => {
    return annualObjectives.filter(annual => 
      annual.strategicObjectiveIds.includes(strategicId)
    );
  };

  const getRelatedProcesses = (annualIds: string[]) => {
    return processes.filter(process => 
      process.annualObjectiveIds.some(id => annualIds.includes(id))
    );
  };

  const getRelatedMetrics = (processIds: string[]) => {
    return metrics.filter(metric => 
      metric.processIds.some(id => processIds.includes(id))
    );
  };

  const renderSIPOCDiagram = (sipoc: SIPOCData) => (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h3 className="text-3xl font-bold text-center text-slate-800 mb-8">SIPOC Model Diagram</h3>
      
      {/* Horizontal SIPOC Flow - Made wider for better visibility */}
      <div className="flex items-stretch gap-2 mb-8 min-h-[400px]">
        {/* Suppliers */}
        <div className="flex-1 bg-gradient-to-b from-orange-400 to-orange-500 rounded-l-xl p-4 text-white min-w-[200px]">
          <div className="text-center mb-4">
            <Building className="w-10 h-10 mx-auto mb-2" />
            <h4 className="text-lg font-bold">SUPPLIERS</h4>
            <p className="text-xs opacity-90">Who provides inputs?</p>
          </div>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {sipoc.suppliers.map((supplier, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-lg p-3 text-sm font-medium">
                {supplier}
              </div>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="flex-1 bg-gradient-to-b from-pink-400 to-pink-500 p-4 text-white min-w-[200px]">
          <div className="text-center mb-4">
            <FileText className="w-10 h-10 mx-auto mb-2" />
            <h4 className="text-lg font-bold">INPUTS</h4>
            <p className="text-xs opacity-90">What goes into the process?</p>
          </div>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {sipoc.inputs.map((input, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-lg p-3 text-sm font-medium">
                {input}
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="flex-1 bg-gradient-to-b from-teal-400 to-teal-500 p-4 text-white min-w-[200px]">
          <div className="text-center mb-4">
            <Settings className="w-10 h-10 mx-auto mb-2" />
            <h4 className="text-lg font-bold">PROCESS</h4>
            <p className="text-xs opacity-90">What do we do?</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-4 min-h-[280px] flex items-center justify-center">
            <div className="text-center">
              <Workflow className="w-12 h-12 mx-auto mb-3" />
              <div className="font-bold text-base leading-tight">{sipoc.process}</div>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="flex-1 bg-gradient-to-b from-green-400 to-green-500 p-4 text-white min-w-[200px]">
          <div className="text-center mb-4">
            <ArrowRight className="w-10 h-10 mx-auto mb-2" />
            <h4 className="text-lg font-bold">OUTPUTS</h4>
            <p className="text-xs opacity-90">What do we produce?</p>
          </div>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {sipoc.outputs.map((output, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-lg p-3 text-sm font-medium">
                {output}
              </div>
            ))}
          </div>
        </div>

        {/* Customers */}
        <div className="flex-1 bg-gradient-to-b from-slate-600 to-slate-700 rounded-r-xl p-4 text-white min-w-[200px]">
          <div className="text-center mb-4">
            <Users className="w-10 h-10 mx-auto mb-2" />
            <h4 className="text-lg font-bold">CUSTOMERS</h4>
            <p className="text-xs opacity-90">Who receives outputs?</p>
          </div>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {sipoc.customers.map((customer, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-lg p-3 text-sm font-medium">
                {customer}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Arrows */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-6 h-6 bg-orange-400 rounded-lg shadow-md"></div>
          <ArrowRight className="w-6 h-6 text-slate-400" />
          <div className="w-6 h-6 bg-pink-400 rounded-lg shadow-md"></div>
          <ArrowRight className="w-6 h-6 text-slate-400" />
          <div className="w-6 h-6 bg-teal-400 rounded-lg shadow-md"></div>
          <ArrowRight className="w-6 h-6 text-slate-400" />
          <div className="w-6 h-6 bg-green-400 rounded-lg shadow-md"></div>
          <ArrowRight className="w-6 h-6 text-slate-400" />
          <div className="w-6 h-6 bg-slate-600 rounded-lg shadow-md"></div>
        </div>
      </div>

      {/* Upstream and Downstream Processes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2 text-lg">
            <ArrowUp className="w-6 h-6 text-blue-600" />
            Upstream Processes
          </h4>
          <p className="text-sm text-blue-600 mb-4">Processes that feed into this one</p>
          <div className="space-y-3">
            {sipoc.upstreamProcesses.map((process, index) => (
              <div key={index} className="bg-white p-4 rounded-lg text-sm border border-blue-200 text-blue-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="font-medium">{process}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2 text-lg">
            <ArrowDown className="w-6 h-6 text-green-600" />
            Downstream Processes
          </h4>
          <p className="text-sm text-green-600 mb-4">Processes that depend on this one</p>
          <div className="space-y-3">
            {sipoc.downstreamProcesses.map((process, index) => (
              <div key={index} className="bg-white p-4 rounded-lg text-sm border border-green-200 text-green-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="font-medium">{process}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
              Objectives Management
            </h1>
            <p className="text-slate-600 text-lg">Strategic and annual objectives with process mapping</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Objective
          </Button>
        </div>

        {/* Strategic Objectives Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Strategic Objectives */}
          <div className="lg:col-span-2">
            <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <Target className="w-6 h-6 text-teal-600" />
                  Strategic Objectives (3-5 Years)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strategicObjectives.map((objective) => {
                    const StatusIcon = getStatusIcon(objective.status);
                    const relatedAnnuals = getRelatedAnnualObjectives(objective.id);
                    const relatedProcessIds = relatedAnnuals.map(a => a.id);
                    const relatedProcesses = getRelatedProcesses(relatedProcessIds);
                    const relatedMetrics = getRelatedMetrics(relatedProcesses.map(p => p.id));
                    
                    return (
                      <div
                        key={objective.id}
                        className={`p-6 rounded-xl border-l-4 ${getPriorityColor(objective.priority)} hover:shadow-md transition-all duration-200 group cursor-pointer`}
                        onClick={() => setSelectedObjective(selectedObjective === objective.id ? null : objective.id)}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-lg text-slate-800 group-hover:text-teal-700 transition-colors">
                            {objective.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs text-white font-medium ${getStatusColor(objective.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {objective.status}
                            </Badge>
                            <Badge
                              className={`text-xs px-2 py-1 rounded-full ${
                                objective.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                                objective.priority === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                'bg-emerald-100 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              {objective.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 mb-4 leading-relaxed">{objective.description}</p>
                        
                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-slate-500">
                              <Calendar className="w-4 h-4" />
                              <span>Target: {objective.targetYear}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500">
                              <User className="w-4 h-4" />
                              <span>{objective.owner}</span>
                            </div>
                          </div>
                        </div>

                        {/* Connected Elements Summary */}
                        <div className="flex items-center gap-4 text-xs bg-white/60 p-3 rounded-lg">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">{relatedAnnuals.length} Annual Objectives</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-blue-600" />
                            <span className="text-blue-700 font-medium">{relatedProcesses.length} Processes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3 text-purple-600" />
                            <span className="text-purple-700 font-medium">{relatedMetrics.length} KPIs</span>
                          </div>
                        </div>

                        {/* Expanded View */}
                        {selectedObjective === objective.id && (
                          <div className="mt-6 border-t border-slate-200 pt-6">
                            <h4 className="font-semibold text-slate-800 mb-4">Connected Annual Objectives</h4>
                            <div className="space-y-3">
                              {relatedAnnuals.map((annual) => {
                                const AnnualStatusIcon = getStatusIcon(annual.status);
                                return (
                                  <div key={annual.id} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                      <h5 className="font-medium text-slate-800">{annual.title}</h5>
                                      <div className="flex items-center gap-2">
                                        <Badge className={`text-xs text-white font-medium ${getStatusColor(annual.status)}`}>
                                          <AnnualStatusIcon className="w-3 h-3 mr-1" />
                                          {annual.status}
                                        </Badge>
                                        {sipocData[annual.id] && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setShowSIPOC(annual.id);
                                            }}
                                            className="text-xs px-2 py-1"
                                          >
                                            <Eye className="w-3 h-3 mr-1" />
                                            SIPOC
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3">{annual.description}</p>
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span>Due: {new Date(annual.targetDate).toLocaleDateString()}</span>
                                        <span>Owner: {annual.owner}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className="w-20 bg-slate-200 rounded-full h-2">
                                          <div 
                                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" 
                                            style={{ width: `${annual.progress}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-xs font-medium text-emerald-600">{annual.progress}%</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {strategicObjectives.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-teal-600" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-800 mb-2">No strategic objectives defined yet</h3>
                      <p className="text-slate-500 mb-6">Start your strategic planning journey by adding your first objective</p>
                      <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Objective
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="space-y-6">
            <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Strategic Objectives</span>
                    <span className="text-xl font-bold text-teal-600">{strategicObjectives.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Annual Objectives</span>
                    <span className="text-xl font-bold text-emerald-600">{annualObjectives.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Active Processes</span>
                    <span className="text-xl font-bold text-blue-600">{processes.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">KPIs Tracked</span>
                    <span className="text-xl font-bold text-purple-600">{metrics.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Progress Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {annualObjectives.slice(0, 4).map((annual) => (
                    <div key={annual.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-slate-600 truncate flex-1 mr-2">
                          {annual.title}
                        </span>
                        <span className="text-xs font-bold text-slate-800">{annual.progress}%</span>
                      </div>
                      <Progress 
                        value={annual.progress} 
                        className="h-2 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SIPOC Dialog */}
        <Dialog open={!!showSIPOC} onOpenChange={() => setShowSIPOC(null)}>
          <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] overflow-y-auto">
            {showSIPOC && sipocData[showSIPOC] && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-slate-800">
                    Process Map: {annualObjectives.find(a => a.id === showSIPOC)?.title}
                  </DialogTitle>
                </DialogHeader>
                {renderSIPOCDiagram(sipocData[showSIPOC])}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ObjectivesManagement;