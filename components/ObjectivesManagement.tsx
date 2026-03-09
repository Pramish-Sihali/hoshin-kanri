// components/ObjectivesManagement.tsx
'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { getSIPOCData } from '../lib/sipocData';
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

  // Get SIPOC data from centralized source
  const getSIPOCForObjective = (objectiveId: string): SIPOCData | null => {
    // Map objective IDs to SIPOC process IDs
    const objectiveToSIPOCMap: Record<string, string> = {
      'ceo-strategic-1': 'ceo-strategic-transformation',
      'ceo-strategic-2': 'ceo-customer-acquisition',
      'coo-annual-1': 'coo-customer-service',
      'coo-annual-2': 'coo-customer-service',
      'coo-annual-3': 'coo-network-optimization',
      'cfo-annual-1': 'cfo-financial-recovery',
      'cfo-annual-2': 'cfo-financial-recovery',
      'cfo-annual-3': 'cfo-debt-optimization',
      'cio-annual-1': 'cio-platform-overhaul',
      'cio-annual-2': 'cio-digital-experience',
      'cio-annual-3': 'cio-digital-experience',
      'cmo-annual-1': 'cmo-freemium-strategy',
      'cmo-annual-2': 'cmo-content-strategy',
      'cmo-annual-3': 'cmo-freemium-strategy',
      'cto-annual-1': 'cto-platform-architecture',
      'cto-annual-2': 'cto-platform-architecture',
      'cto-annual-3': 'cto-ai-analytics'
    };

    const sipocId = objectiveToSIPOCMap[objectiveId];
    if (sipocId) {
      return getSIPOCData(sipocId) || null;
    }
    return null;
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
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-sm font-bold text-center text-slate-800 mb-4">SIPOC Model Diagram</h3>

      {/* Horizontal SIPOC Flow */}
      <div className="flex items-stretch gap-1.5 mb-4 min-h-[220px]">
        {/* Suppliers */}
        <div className="flex-1 bg-gradient-to-b from-orange-400 to-orange-500 rounded-l-lg p-3 text-white">
          <div className="text-center mb-2">
            <Building className="w-5 h-5 mx-auto mb-1" />
            <h4 className="text-xs font-bold">SUPPLIERS</h4>
            <p className="text-[9px] opacity-90">Who provides inputs?</p>
          </div>
          <div className="space-y-1 max-h-[160px] overflow-y-auto">
            {sipoc.suppliers.map((supplier, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-md p-1.5 text-[10px] font-medium">
                {supplier}
              </div>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="flex-1 bg-gradient-to-b from-pink-400 to-pink-500 p-3 text-white">
          <div className="text-center mb-2">
            <FileText className="w-5 h-5 mx-auto mb-1" />
            <h4 className="text-xs font-bold">INPUTS</h4>
            <p className="text-[9px] opacity-90">What goes in?</p>
          </div>
          <div className="space-y-1 max-h-[160px] overflow-y-auto">
            {sipoc.inputs.map((input, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-md p-1.5 text-[10px] font-medium">
                {input}
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="flex-1 bg-gradient-to-b from-teal-400 to-teal-500 p-3 text-white">
          <div className="text-center mb-2">
            <Settings className="w-5 h-5 mx-auto mb-1" />
            <h4 className="text-xs font-bold">PROCESS</h4>
            <p className="text-[9px] opacity-90">What do we do?</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-md p-3 min-h-[160px] flex items-center justify-center">
            <div className="text-center">
              <Workflow className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold text-[10px] leading-tight">{sipoc.process}</div>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="flex-1 bg-gradient-to-b from-green-400 to-green-500 p-3 text-white">
          <div className="text-center mb-2">
            <ArrowRight className="w-5 h-5 mx-auto mb-1" />
            <h4 className="text-xs font-bold">OUTPUTS</h4>
            <p className="text-[9px] opacity-90">What we produce?</p>
          </div>
          <div className="space-y-1 max-h-[160px] overflow-y-auto">
            {sipoc.outputs.map((output, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-md p-1.5 text-[10px] font-medium">
                {output}
              </div>
            ))}
          </div>
        </div>

        {/* Customers */}
        <div className="flex-1 bg-gradient-to-b from-slate-600 to-slate-700 rounded-r-lg p-3 text-white">
          <div className="text-center mb-2">
            <Users className="w-5 h-5 mx-auto mb-1" />
            <h4 className="text-xs font-bold">CUSTOMERS</h4>
            <p className="text-[9px] opacity-90">Who receives?</p>
          </div>
          <div className="space-y-1 max-h-[160px] overflow-y-auto">
            {sipoc.customers.map((customer, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-md p-1.5 text-[10px] font-medium">
                {customer}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Arrows */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 text-slate-600">
          <div className="w-4 h-4 bg-orange-400 rounded"></div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="w-4 h-4 bg-pink-400 rounded"></div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="w-4 h-4 bg-teal-400 rounded"></div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="w-4 h-4 bg-slate-600 rounded"></div>
        </div>
      </div>

      {/* Upstream and Downstream Processes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-1.5 text-xs">
            <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
            Upstream Processes
          </h4>
          <div className="space-y-1.5">
            {sipoc.upstreamProcesses.map((process, index) => (
              <div key={index} className="bg-white p-2 rounded-md text-[10px] border border-blue-200 text-blue-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="font-medium">{process}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <h4 className="font-bold text-green-800 mb-2 flex items-center gap-1.5 text-xs">
            <ArrowDown className="w-3.5 h-3.5 text-green-600" />
            Downstream Processes
          </h4>
          <div className="space-y-1.5">
            {sipoc.downstreamProcesses.map((process, index) => (
              <div key={index} className="bg-white p-2 rounded-md text-[10px] border border-green-200 text-green-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
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
    <div className="min-h-screen">
      <div className="p-5 space-y-5">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
              Objectives Management
            </h1>
            <p className="text-slate-600 text-xs">Strategic and annual objectives with process mapping</p>
          </div>
          <Button
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm hover:shadow-md transition-all duration-200 px-4 py-2 rounded-lg text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add New Objective
          </Button>
        </div>

        {/* Strategic Objectives Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Strategic Objectives */}
          <div className="lg:col-span-2">
            <Card className="border shadow-sm bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Target className="w-4 h-4 text-teal-600" />
                  Strategic Objectives (3-5 Years)
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-2">
                  {strategicObjectives.map((objective) => {
                    const StatusIcon = getStatusIcon(objective.status);
                    const relatedAnnuals = getRelatedAnnualObjectives(objective.id);
                    const relatedProcessIds = relatedAnnuals.map(a => a.id);
                    const relatedProcesses = getRelatedProcesses(relatedProcessIds);
                    const relatedMetrics = getRelatedMetrics(relatedProcesses.map(p => p.id));

                    return (
                      <div
                        key={objective.id}
                        className={`p-3 rounded-lg border-l-4 ${getPriorityColor(objective.priority)} hover:shadow-sm transition-all duration-200 group cursor-pointer`}
                        onClick={() => setSelectedObjective(selectedObjective === objective.id ? null : objective.id)}
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <h3 className="font-medium text-xs text-slate-800 group-hover:text-teal-700 transition-colors">
                            {objective.title}
                          </h3>
                          <div className="flex items-center gap-1.5">
                            <Badge className={`text-[10px] text-white font-medium ${getStatusColor(objective.status)}`}>
                              <StatusIcon className="w-2.5 h-2.5 mr-0.5" />
                              {objective.status}
                            </Badge>
                            <Badge
                              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                objective.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                                objective.priority === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                'bg-emerald-100 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              {objective.priority}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-600 mb-2 line-clamp-2">{objective.description}</p>

                        <div className="flex items-center gap-3 text-[10px] mb-2">
                          <div className="flex items-center gap-1 text-slate-500">
                            <Calendar className="w-3 h-3" />
                            <span>Target: {objective.targetYear}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <User className="w-3 h-3" />
                            <span>{objective.owner}</span>
                          </div>
                        </div>

                        {/* Connected Elements Summary */}
                        <div className="flex items-center gap-3 text-[10px] bg-white/60 p-2 rounded-md">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">{relatedAnnuals.length} Annual</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-2.5 h-2.5 text-blue-600" />
                            <span className="text-blue-700 font-medium">{relatedProcesses.length} Processes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-2.5 h-2.5 text-purple-600" />
                            <span className="text-purple-700 font-medium">{relatedMetrics.length} KPIs</span>
                          </div>
                        </div>

                        {/* Expanded View */}
                        {selectedObjective === objective.id && (
                          <div className="mt-3 border-t border-slate-200 pt-3">
                            <h4 className="font-semibold text-xs text-slate-800 mb-2">Connected Annual Objectives</h4>
                            <div className="space-y-2">
                              {relatedAnnuals.map((annual) => {
                                const AnnualStatusIcon = getStatusIcon(annual.status);
                                const sipocData = getSIPOCForObjective(annual.id);
                                return (
                                  <div key={annual.id} className="bg-white rounded-md p-3 border border-slate-200">
                                    <div className="flex justify-between items-start mb-1">
                                      <h5 className="font-medium text-[11px] text-slate-800">{annual.title}</h5>
                                      <div className="flex items-center gap-1.5">
                                        <Badge className={`text-[10px] text-white font-medium ${getStatusColor(annual.status)}`}>
                                          <AnnualStatusIcon className="w-2.5 h-2.5 mr-0.5" />
                                          {annual.status}
                                        </Badge>
                                        {sipocData && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setShowSIPOC(annual.id);
                                            }}
                                            className="text-[10px] px-1.5 py-0.5 h-auto"
                                          >
                                            <Eye className="w-2.5 h-2.5 mr-0.5" />
                                            SIPOC
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-[10px] text-slate-600 mb-2">{annual.description}</p>
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                        <span>Due: {new Date(annual.targetDate).toLocaleDateString()}</span>
                                        <span>Owner: {annual.owner}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-16 bg-slate-200 rounded-full h-1.5">
                                          <div
                                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full"
                                            style={{ width: `${annual.progress}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-[10px] font-medium text-emerald-600">{annual.progress}%</span>
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
                    <div className="text-center py-8">
                      <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="w-4 h-4 text-teal-600" />
                      </div>
                      <h3 className="text-xs font-medium text-slate-800 mb-1">No strategic objectives defined yet</h3>
                      <p className="text-[10px] text-slate-500 mb-4">Start your strategic planning journey by adding your first objective</p>
                      <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-sm transition-all duration-200 px-4 py-2 rounded-lg text-xs">
                        <Plus className="w-3 h-3 mr-1" />
                        Add Your First Objective
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="space-y-4">
            <Card className="border shadow-sm bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-xs font-semibold text-slate-800">Overview</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-600">Strategic Objectives</span>
                    <span className="text-sm font-bold text-teal-600">{strategicObjectives.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-600">Annual Objectives</span>
                    <span className="text-sm font-bold text-emerald-600">{annualObjectives.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-600">Active Processes</span>
                    <span className="text-sm font-bold text-blue-600">{processes.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-600">KPIs Tracked</span>
                    <span className="text-sm font-bold text-purple-600">{metrics.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-xs font-semibold text-slate-800">Progress Summary</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-3">
                  {annualObjectives.slice(0, 4).map((annual) => (
                    <div key={annual.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-medium text-slate-600 truncate flex-1 mr-2">
                          {annual.title}
                        </span>
                        <span className="text-[10px] font-bold text-slate-800">{annual.progress}%</span>
                      </div>
                      <Progress
                        value={annual.progress}
                        className="h-1.5 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600"
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
          <DialogContent className="max-w-[90vw] w-[90vw] max-h-[90vh] overflow-y-auto">
            {showSIPOC && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-sm font-semibold text-slate-800">
                    Process Map: {annualObjectives.find(a => a.id === showSIPOC)?.title}
                  </DialogTitle>
                </DialogHeader>
                {(() => {
                  const sipocData = getSIPOCForObjective(showSIPOC);
                  return sipocData ? renderSIPOCDiagram(sipocData) : (
                    <div className="text-center py-8">
                      <p className="text-slate-600">No SIPOC data available for this objective.</p>
                    </div>
                  );
                })()}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ObjectivesManagement;