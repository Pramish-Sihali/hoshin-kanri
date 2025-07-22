'use client';

import React from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import InteractiveXMatrix from './InteractiveMatrix';
import { Target, TrendingUp, Users, BarChart3, Calendar, User, CheckCircle2, Clock, AlertTriangle, Zap } from 'lucide-react';

const XMatrix: React.FC = () => {
  const { strategicObjectives, annualObjectives, processes, metrics } = useHoshinStore();

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

  const EmptyState = ({ title, description, icon: Icon, color }: { 
    title: string; 
    description: string; 
    icon: React.ElementType; 
    color: string; 
  }) => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="p-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
        
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Strategic Policy Deployment Matrix - Visualize the alignment between your strategic objectives, 
            annual goals, key processes, and performance indicators
          </p>
        </div>

        {/* Strategic Alignment Overview */}
        <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-teal-600" />
              Strategic Alignment Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{strategicObjectives.length}</div>
                <div className="text-sm text-slate-600">Strategic Objectives</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{annualObjectives.length}</div>
                <div className="text-sm text-slate-600">Annual Objectives</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{processes.length}</div>
                <div className="text-sm text-slate-600">Active Processes</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{metrics.length}</div>
                <div className="text-sm text-slate-600">KPIs Tracked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* X-Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strategic Objectives Quadrant */}
          <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Target className="w-5 h-5" />
                Strategic Objectives (3-5 Years)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {strategicObjectives.length === 0 ? (
                  <EmptyState
                    title="No Strategic Objectives"
                    description="Define your long-term strategic goals to get started"
                    icon={Target}
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                  />
                ) : (
                  <div className="p-4 space-y-4">
                    {strategicObjectives.map((objective) => {
                      const StatusIcon = getStatusIcon(objective.status);
                      return (
                        <div
                          key={objective.id}
                          className={`p-5 rounded-xl border-l-4 ${getPriorityColor(objective.priority)} hover:shadow-lg transition-all duration-200 group`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-base text-slate-800 group-hover:text-blue-700 transition-colors leading-tight max-w-[70%]">
                              {objective.title}
                            </h3>
                            <Badge className={`text-xs text-white font-medium ${getStatusColor(objective.status)} ml-2 flex-shrink-0`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {objective.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{objective.description}</p>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center gap-2 text-slate-500">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium">Target: {objective.targetYear}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                              <User className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate font-medium">{objective.owner}</span>
                            </div>
                            <div className="col-span-2 mt-2 flex justify-end">
                              <Badge
                                className={`text-xs px-3 py-1 rounded-full font-medium ${
                                  objective.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                                  objective.priority === 'medium' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                  'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                }`}
                              >
                                {objective.priority.toUpperCase()} PRIORITY
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Annual Objectives Quadrant */}
          <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-xl">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Annual Objectives & Breakthroughs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {annualObjectives.length === 0 ? (
                  <EmptyState
                    title="No Annual Objectives"
                    description="Create annual objectives to support your strategic goals"
                    icon={TrendingUp}
                    color="bg-gradient-to-br from-emerald-500 to-emerald-600"
                  />
                ) : (
                  <div className="p-4 space-y-4">
                    {annualObjectives.map((objective) => {
                      const StatusIcon = getStatusIcon(objective.status);
                      return (
                        <div key={objective.id} className="p-5 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-200 group">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-base text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight max-w-[70%]">
                              {objective.title}
                            </h3>
                            <Badge className={`text-xs text-white font-medium ${getStatusColor(objective.status)} ml-2 flex-shrink-0`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {objective.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{objective.description}</p>
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-semibold text-slate-700">Progress</span>
                              <span className="text-lg font-bold text-emerald-600">{objective.progress}%</span>
                            </div>
                            <Progress 
                              value={objective.progress} 
                              className="h-3 bg-emerald-100 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600 shadow-inner"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center gap-2 text-slate-500">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium">Due: {new Date(objective.targetDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                              <User className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate font-medium">{objective.owner}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Processes Quadrant */}
          <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-xl">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Key Processes & Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {processes.length === 0 ? (
                  <EmptyState
                    title="No Processes Defined"
                    description="Add key processes that support your objectives"
                    icon={Users}
                    color="bg-gradient-to-br from-purple-500 to-purple-600"
                  />
                ) : (
                  <div className="p-4 space-y-4">
                    {processes.map((process) => {
                      const StatusIcon = getStatusIcon(process.status);
                      return (
                        <div key={process.id} className="p-5 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-200 group">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-base text-slate-800 group-hover:text-purple-700 transition-colors leading-tight max-w-[70%]">
                              {process.title}
                            </h3>
                            <Badge className={`text-xs text-white font-medium ${getStatusColor(process.status)} ml-2 flex-shrink-0`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {process.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{process.description}</p>
                          <div className="space-y-3 text-xs">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2 text-slate-500">
                                <Calendar className="w-4 h-4 flex-shrink-0 text-green-500" />
                                <div>
                                  <span className="font-medium text-slate-700">Start:</span>
                                  <span className="ml-1 font-medium">{new Date(process.startDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500">
                                <Calendar className="w-4 h-4 flex-shrink-0 text-red-500" />
                                <div>
                                  <span className="font-medium text-slate-700">End:</span>
                                  <span className="ml-1 font-medium">{new Date(process.endDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                              <div className="flex items-center gap-2 text-slate-500">
                                <User className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium">{process.owner}</span>
                              </div>
                              {process.resources.length > 0 && (
                                <Badge variant="outline" className="text-xs px-3 py-1 rounded-full border-purple-200 text-purple-700 font-medium">
                                  {process.resources.length} resources
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Metrics Quadrant */}
          <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-xl">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Key Performance Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {metrics.length === 0 ? (
                  <EmptyState
                    title="No Metrics Defined"
                    description="Define KPIs to measure your progress and success"
                    icon={BarChart3}
                    color="bg-gradient-to-br from-orange-500 to-orange-600"
                  />
                ) : (
                  <div className="p-4 space-y-4">
                    {metrics.map((metric) => {
                      const performancePercentage = (metric.current / metric.target) * 100;
                      const performanceColor = performancePercentage >= 90 ? 'from-emerald-500 to-emerald-600' :
                                              performancePercentage >= 70 ? 'from-amber-500 to-amber-600' :
                                              'from-red-500 to-red-600';
                      
                      return (
                        <div key={metric.id} className="p-5 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-200 group">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-base text-slate-800 group-hover:text-orange-700 transition-colors leading-tight max-w-[60%]">
                              {metric.name}
                            </h3>
                            <Badge variant="outline" className="text-xs px-3 py-1 rounded-full border-orange-200 text-orange-700 font-medium ml-2 flex-shrink-0">
                              {metric.frequency}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{metric.description}</p>
                          <div className="space-y-4">
                            <div className="bg-slate-50 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-2">
                                <div className="text-base">
                                  <span className="font-bold text-slate-800 text-lg">{metric.current.toLocaleString()}</span>
                                  <span className="text-slate-400 mx-2 text-lg">/</span>
                                  <span className="text-slate-600 font-semibold text-lg">{metric.target.toLocaleString()}</span>
                                  <span className="text-slate-500 ml-2 text-sm font-medium">{metric.unit}</span>
                                </div>
                                <div className="text-lg font-bold text-orange-600">
                                  {performancePercentage.toFixed(1)}%
                                </div>
                              </div>
                              <Progress 
                                value={performancePercentage} 
                                className={`h-3 bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:${performanceColor} shadow-inner`}
                              />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <User className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium">{metric.owner}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Matrix Section */}
        <Card className="border-5 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Zap className="w-6 h-6 text-teal-600" />
              Interactive X-Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveXMatrix />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default XMatrix;