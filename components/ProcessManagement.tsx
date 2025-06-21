// components/ProcessManagement.tsx
'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Users, 
  Calendar,
  User,
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Eye,
  Building,
  ArrowRight,
  ArrowUp,
  Settings,
  Target,
  TrendingUp,
  Activity,
  FileText,
  Cog,
  Package,
  UserCheck,
  X
} from 'lucide-react';

interface SIPOCData {
  suppliers: string[];
  inputs: string[];
  process: string;
  outputs: string[];
  customers: string[];
}

const ProcessManagement: React.FC = () => {
  const { processes, annualObjectives, metrics } = useHoshinStore();
  const [showSIPOC, setShowSIPOC] = useState<string | null>(null);

  // SIPOC data for processes
  const sipocData: Record<string, SIPOCData> = {
    'process-1': {
      suppliers: [
        'Foreign Secretary Office',
        'Trade Negotiation Teams',
        'Embassy Economic Sections',
        'Legal Advisory Units',
        'Sector Ministry Representatives'
      ],
      inputs: [
        'Bilateral trade agreement drafts',
        'Negotiation status reports',
        'Market access requirements',
        'Legal compliance frameworks',
        'Stakeholder feedback'
      ],
      process: 'Quarterly Trade Agreement Review and Acceleration Process',
      outputs: [
        'Accelerated negotiation timelines',
        'Resolved negotiation bottlenecks',
        'Strategic intervention plans',
        'High-level diplomatic initiatives'
      ],
      customers: [
        'Ministry of Foreign Affairs',
        'Trade and Export Promotion Centre',
        'Nepal Exporters',
        'International Trading Partners'
      ]
    },
    'process-2': {
      suppliers: [
        'Trade Promotion Division, MoFA',
        'Embassy Commercial Sections',
        'Federation of Nepalese Chambers of Commerce',
        'Event Management Companies'
      ],
      inputs: [
        'Market intelligence reports',
        'Export sector readiness data',
        'Buyer database information',
        'Mission logistics requirements',
        'B2B matchmaking criteria'
      ],
      process: 'Strategic Trade Mission Planning and Execution Process',
      outputs: [
        'Executed trade missions',
        'Export business leads',
        'Market penetration strategies',
        'Partnership agreements'
      ],
      customers: [
        'Nepali Exporters',
        'International Buyers',
        'Trade Promotion Organizations',
        'Sector-Specific Associations'
      ]
    },
    'process-3': {
      suppliers: [
        'Honorary Consuls Network',
        'Diaspora Organizations',
        'Embassy Consular Sections',
        'Digital Platform Developers'
      ],
      inputs: [
        'Diaspora entrepreneur database',
        'Business network requirements',
        'Market-specific opportunities',
        'Communication platforms',
        'Network coordination tools'
      ],
      process: 'Diaspora Business Network Development Process',
      outputs: [
        'Active diaspora business networks',
        'Trade facilitation partnerships',
        'Investment pipeline connections',
        'Market intelligence networks'
      ],
      customers: [
        'Nepal Diaspora Community',
        'Domestic Exporters',
        'International Market Partners',
        'Investment Promotion Organizations'
      ]
    },
    'process-4': {
      suppliers: [
        'Investment Board Nepal',
        'Embassy Investment Sections',
        'Sector Ministry Liaisons',
        'Due Diligence Consultants'
      ],
      inputs: [
        'Investment opportunity pipelines',
        'Investor database information',
        'Sector-specific project proposals',
        'Regulatory framework updates',
        'Market feasibility studies'
      ],
      process: 'Investment Promotion and Pipeline Management Process',
      outputs: [
        'FDI commitment agreements',
        'Investment pipeline tracking',
        'Investor facilitation services',
        'Project implementation support'
      ],
      customers: [
        'International Investors',
        'Export-Oriented Industries',
        'Government Revenue Agencies',
        'Employment Beneficiaries'
      ]
    },
    'process-5': {
      suppliers: [
        'Embassy Coordination Division',
        'Host Country Real Estate Agencies',
        'Trade Office Equipment Providers',
        'Local Staff Recruitment Agencies'
      ],
      inputs: [
        'Market prioritization analysis',
        'Office infrastructure requirements',
        'Sector expertise specifications',
        'Operational budget allocations',
        'Digital connectivity needs'
      ],
      process: 'Sector-Specific Trade Office Establishment Process',
      outputs: [
        'Operational trade promotion offices',
        'Market-specific trade services',
        'Sector expertise deployment',
        'Export facilitation infrastructure'
      ],
      customers: [
        'Nepal Export Community',
        'International Business Partners',
        'Host Country Trade Organizations',
        'Sector-Specific Associations'
      ]
    },
    'process-6': {
      suppliers: [
        'Digital Diplomacy Unit, MoFA',
        'Software Development Companies',
        'Cloud Infrastructure Providers',
        'Cybersecurity Specialists'
      ],
      inputs: [
        'Stakeholder coordination requirements',
        'Real-time data integration needs',
        'Security and compliance standards',
        'User interface specifications',
        'API integration protocols'
      ],
      process: 'Digital Platform Development and Integration Process',
      outputs: [
        'Integrated economic diplomacy platform',
        'Real-time coordination capabilities',
        'Stakeholder collaboration tools',
        'Performance tracking dashboards'
      ],
      customers: [
        'Embassy Network',
        'Trade Promotion Officers',
        'Economic Diplomacy Stakeholders',
        'Senior Government Officials'
      ]
    },
    'process-7': {
      suppliers: [
        'Event Management Division, MoFA',
        'International Convention Centers',
        'Marketing and PR Agencies',
        'VIP Protocol Services'
      ],
      inputs: [
        'Investor target databases',
        'Sector promotion materials',
        'Event logistics requirements',
        'Media and communication plans',
        'Follow-up coordination systems'
      ],
      process: 'International Investment Summit Organization Process',
      outputs: [
        'Executed investment summits',
        'Investor engagement outcomes',
        'Investment commitment agreements',
        'Market visibility enhancement'
      ],
      customers: [
        'International Investor Community',
        'Nepal Investment Promotion Agencies',
        'Sector Development Organizations',
        'Economic Policy Makers'
      ]
    },
    'process-8': {
      suppliers: [
        'Commercial Attachés Network',
        'Embassy Economic Sections',
        'Digital Marketing Agencies',
        'Market Research Organizations'
      ],
      inputs: [
        'Export promotion strategies',
        'Market intelligence requirements',
        'Digital outreach tools',
        'Performance reporting systems',
        'Coordination protocols'
      ],
      process: 'Embassy Commercial Activities Coordination Process',
      outputs: [
        'Standardized commercial activities',
        'Qualified export inquiries',
        'Market intelligence reports',
        'Export promotion campaigns'
      ],
      customers: [
        'Nepal Export Community',
        'Trade Promotion Organizations',
        'International Buyers',
        'Economic Diplomacy Coordinators'
      ]
    },
    'process-9': {
      suppliers: [
        'Business Facilitation Unit, MoFA',
        'Legal Advisory Services',
        'Sector Expert Consultants',
        'Partnership Brokerage Organizations'
      ],
      inputs: [
        'Exporter capability assessments',
        'International partner databases',
        'Due diligence frameworks',
        'Partnership agreement templates',
        'Market compatibility analysis'
      ],
      process: 'Business Partnership Facilitation Program Process',
      outputs: [
        'Strategic business partnerships',
        'Export market access agreements',
        'Technology transfer arrangements',
        'Long-term trade relationships'
      ],
      customers: [
        'Nepali Exporters',
        'International Business Partners',
        'Technology Transfer Recipients',
        'Market Development Agencies'
      ]
    },
    'process-10': {
      suppliers: [
        'Diaspora Affairs Division, MoFA',
        'Financial Institution Partners',
        'Fund Management Companies',
        'Legal and Regulatory Advisors'
      ],
      inputs: [
        'Diaspora investment capacity analysis',
        'SME funding requirements',
        'Fund governance frameworks',
        'Investment criteria specifications',
        'Portfolio management systems'
      ],
      process: 'Diaspora Investment Fund Setup and Management Process',
      outputs: [
        'Operational diaspora investment fund',
        'SME funding pipeline',
        'Investment portfolio management',
        'Diaspora capital mobilization'
      ],
      customers: [
        'Export-Oriented SMEs',
        'Nepal Diaspora Investors',
        'Economic Development Agencies',
        'Employment Generation Programs'
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
      case 'in-progress': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'at-risk': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'planning': return 'bg-gradient-to-r from-amber-500 to-amber-600';
      case 'on-hold': return 'bg-gradient-to-r from-slate-500 to-slate-600';
      default: return 'bg-gradient-to-r from-slate-500 to-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2;
      case 'in-progress': return Clock;
      case 'at-risk': return AlertTriangle;
      case 'on-hold': return Activity;
      default: return Clock;
    }
  };

  const getRelatedObjectives = (processId: string) => {
    const process = processes.find(p => p.id === processId);
    if (!process) return [];
    return annualObjectives.filter(obj => 
      process.annualObjectiveIds.includes(obj.id)
    );
  };

  const getProcessMetrics = (processId: string) => {
    return metrics.filter(metric => 
      metric.processIds.includes(processId)
    );
  };

  const renderSimpleSIPOC = (sipoc: SIPOCData) => (
    <div className="w-full max-w-[90vw] mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-slate-800">SIPOC Model Diagram</h3>
          <button
            onClick={() => setShowSIPOC(null)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>
        
        {/* Horizontal SIPOC Flow */}
        <div className="flex items-stretch gap-2 mb-8 min-h-[400px]">
          {/* Suppliers */}
          <div className="flex-1 bg-gradient-to-b from-orange-400 to-orange-500 rounded-l-xl p-4 text-white min-w-[180px]">
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
          <div className="flex-1 bg-gradient-to-b from-pink-400 to-pink-500 p-4 text-white min-w-[180px]">
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
          <div className="flex-1 bg-gradient-to-b from-teal-400 to-teal-500 p-4 text-white min-w-[180px]">
            <div className="text-center mb-4">
              <Cog className="w-10 h-10 mx-auto mb-2" />
              <h4 className="text-lg font-bold">PROCESS</h4>
              <p className="text-xs opacity-90">What do we do?</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4 min-h-[280px] flex items-center justify-center">
              <div className="text-center">
                <Settings className="w-12 h-12 mx-auto mb-3" />
                <div className="font-bold text-base leading-tight">{sipoc.process}</div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="flex-1 bg-gradient-to-b from-green-400 to-green-500 p-4 text-white min-w-[180px]">
            <div className="text-center mb-4">
              <Package className="w-10 h-10 mx-auto mb-2" />
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
          <div className="flex-1 bg-gradient-to-b from-slate-600 to-slate-700 rounded-r-xl p-4 text-white min-w-[180px]">
            <div className="text-center mb-4">
              <UserCheck className="w-10 h-10 mx-auto mb-2" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2 text-lg">
              <ArrowUp className="w-6 h-6 text-blue-600" />
              Upstream Processes
            </h4>
            <p className="text-sm text-blue-600 mb-4">Processes that feed into this one</p>
            <div className="space-y-3">
              {[
                'Planning and Requirements Gathering',
                'Resource Allocation and Budgeting', 
                'Stakeholder Identification and Engagement',
                'Technical Infrastructure Setup'
              ].map((process, index) => (
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
              <ArrowRight className="w-6 h-6 text-green-600" />
              Downstream Processes
            </h4>
            <p className="text-sm text-green-600 mb-4">Processes that depend on this one</p>
            <div className="space-y-3">
              {[
                'Quality Assurance and Testing',
                'User Training and Support',
                'Performance Monitoring and Evaluation',
                'Continuous Improvement and Optimization'
              ].map((process, index) => (
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
              Process Management
            </h1>
            <p className="text-slate-600 text-lg">SIPOC mapping and process optimization</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Process
          </Button>
        </div>

        {/* Process Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Processes', value: processes.length, icon: Users, color: 'from-blue-500 to-blue-600' },
            { label: 'In Progress', value: processes.filter(p => p.status === 'in-progress').length, icon: Clock, color: 'from-emerald-500 to-emerald-600' },
            { label: 'Planning', value: processes.filter(p => p.status === 'planning').length, icon: Target, color: 'from-amber-500 to-amber-600' },
            { label: 'Completed', value: processes.filter(p => p.status === 'completed').length, icon: CheckCircle2, color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <Card key={index} className="border-5 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Processes List */}
        <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-600" />
              Active Processes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processes.map((process) => {
                const StatusIcon = getStatusIcon(process.status);
                const relatedObjectives = getRelatedObjectives(process.id);
                const processMetrics = getProcessMetrics(process.id);
                const hasSIPOC = sipocData[process.id];
                
                return (
                  <div
                    key={process.id}
                    className="p-6 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg text-slate-800 group-hover:text-teal-700 transition-colors">
                        {process.title}
                      </h3>
                      <Badge className={`text-xs text-white font-medium ${getStatusColor(process.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {process.status}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed text-sm">{process.description}</p>
                    
                    <div className="space-y-3 text-xs mb-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <User className="w-3 h-3" />
                        <span className="font-medium">Owner:</span>
                        <span>{process.owner}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span className="font-medium">Timeline:</span>
                        <span>{new Date(process.startDate).toLocaleDateString()} - {new Date(process.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Connected Elements Summary */}
                    <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">{relatedObjectives.length} Objectives</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3 text-purple-600" />
                          <span className="text-purple-700 font-medium">{processMetrics.length} KPIs</span>
                        </div>
                      </div>
                    </div>

                    {/* SIPOC Button */}
                    {hasSIPOC && (
                      <Button
                        size="sm"
                        onClick={() => setShowSIPOC(process.id)}
                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View SIPOC Model
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
            
            {processes.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">No processes defined yet</h3>
                <p className="text-slate-500 mb-6">Add processes to start mapping your organizational workflows</p>
                <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Process
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SIPOC Dialog */}
        <Dialog open={!!showSIPOC} onOpenChange={() => setShowSIPOC(null)}>
          <DialogContent className="w-[90vw] max-w-[90vw] p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>
                {processes.find(p => p.id === showSIPOC)?.title}
              </DialogTitle>
            </DialogHeader>
            {showSIPOC && sipocData[showSIPOC] && renderSimpleSIPOC(sipocData[showSIPOC])}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProcessManagement;