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
        'Department of National ID and Civil Registration',
        'Local Registration Offices',
        'Biometric Equipment Vendors',
        'District Administration Offices'
      ],
      inputs: [
        'Citizenship certificates',
        'Birth certificates', 
        'Biometric data (fingerprints, photos)',
        'Personal information forms',
        'Digital infrastructure'
      ],
      process: 'National ID Card Issuance Process',
      outputs: [
        'Digital National ID Cards',
        'Citizen database records',
        'Verification certificates',
        'Access credentials for digital services'
      ],
      customers: [
        'Nepali Citizens',
        'Government Service Centers',
        'Banking Institutions',
        'Private Service Providers'
      ],
      upstreamProcesses: [
        'Birth Registration System',
        'Citizenship Verification Process',
        'Biometric Data Collection'
      ],
      downstreamProcesses: [
        'Government Service Access',
        'Banking KYC Process',
        'Digital Service Authentication',
        'Nagarik App Integration'
      ]
    },
    'annual-2': {
      suppliers: [
        'IT Department',
        'Software Development Teams',
        'User Experience Researchers',
        'Government Service Departments'
      ],
      inputs: [
        'User feedback data',
        'Service requirements',
        'Technical specifications',
        'Government policies',
        'Digital infrastructure'
      ],
      process: 'Nagarik App Enhancement Process',
      outputs: [
        'Improved mobile application',
        'Enhanced user interface',
        'New service integrations',
        'User training materials'
      ],
      customers: [
        'Nepali Citizens',
        'Government Service Users',
        'Local Communities',
        'Business Organizations'
      ],
      upstreamProcesses: [
        'User Research and Analysis',
        'Service Integration Planning',
        'Technical Architecture Design'
      ],
      downstreamProcesses: [
        'Digital Service Delivery',
        'Citizen Satisfaction Monitoring',
        'Service Usage Analytics',
        'Continuous Improvement Process'
      ]
    },
    'annual-3': {
      suppliers: [
        'Ministry of Women, Children and Senior Citizens',
        'Local Municipalities',
        'Banking Partners',
        'Social Security Department'
      ],
      inputs: [
        'Child birth records',
        'Family income data',
        'Eligibility criteria',
        'Banking infrastructure',
        'Government budget allocation'
      ],
      process: 'Child Grant Distribution Process',
      outputs: [
        'Monthly grant payments',
        'Beneficiary records',
        'Impact assessments',
        'Compliance reports'
      ],
      customers: [
        'Families with Children (0-5 years)',
        'Local Communities',
        'Child Development Programs',
        'Educational Institutions'
      ],
      upstreamProcesses: [
        'Birth Registration Process',
        'Family Verification System',
        'Budget Allocation Process'
      ],
      downstreamProcesses: [
        'Child Nutrition Monitoring',
        'Educational Enrollment Tracking',
        'Poverty Reduction Measurement',
        'Family Welfare Assessment'
      ]
    },
    'annual-4': {
      suppliers: [
        'Department of Roads',
        'Construction Companies',
        'Local Communities',
        'Engineering Consultants'
      ],
      inputs: [
        'Road construction materials',
        'Engineering designs',
        'Land acquisition permits',
        'Environmental clearances',
        'Budget allocations'
      ],
      process: 'Rural Road Construction Process',
      outputs: [
        'All-weather roads',
        'Bridge constructions',
        'Road maintenance plans',
        'Community access improvements'
      ],
      customers: [
        'Rural Communities',
        'Agricultural Producers',
        'Educational Institutions',
        'Healthcare Facilities',
        'Emergency Services'
      ],
      upstreamProcesses: [
        'Road Planning and Survey',
        'Environmental Impact Assessment',
        'Community Consultation Process'
      ],
      downstreamProcesses: [
        'Economic Development Activities',
        'Improved Healthcare Access',
        'Educational Service Delivery',
        'Agricultural Market Access'
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