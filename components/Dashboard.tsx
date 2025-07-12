'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import StrategicObjectiveForm from './StrategicObjectiveForm';
import { Plus, Target, TrendingUp, Users, AlertCircle, Activity, CheckCircle2, Clock, AlertTriangle, Database, Info } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    strategicObjectives, 
    annualObjectives, 
    processes, 
    metrics, 
    catchball,
    currentDatasetId,
    getCurrentDatasetName,
    availableDatasets
  } = useHoshinStore();
  const [showObjectiveForm, setShowObjectiveForm] = useState(false);

  const getCurrentDataset = () => {
    if (!currentDatasetId) return null;
    return availableDatasets.find(d => d.id === currentDatasetId);
  };

  const getStatusStats = () => {
    const allItems = [...strategicObjectives, ...annualObjectives, ...processes];
    const stats = {
      total: allItems.length,
      completed: allItems.filter(item => item.status === 'completed').length,
      inProgress: allItems.filter(item => item.status === 'in-progress').length,
      atRisk: allItems.filter(item => item.status === 'at-risk').length
    };
    return stats;
  };

  const getMetricsPerformance = () => {
    if (metrics.length === 0) return 0;
    const totalPerformance = metrics.reduce((sum, metric) => {
      return sum + (metric.current / metric.target) * 100;
    }, 0);
    return totalPerformance / metrics.length;
  };

  const getPendingCatchball = () => {
    return catchball.filter(item => item.status === 'pending').length;
  };

  const stats = getStatusStats();
  const avgPerformance = getMetricsPerformance();
  const pendingCatchball = getPendingCatchball();
  const currentDataset = getCurrentDataset();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
              Strategic Policy Deployment Overview
            </h1>
            {currentDataset && (
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
                  <Database className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-semibold text-blue-800">{currentDataset.name}</div>
                    <div className="text-xs text-blue-600">{currentDataset.description}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Button 
            onClick={() => setShowObjectiveForm(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Strategic Objective
          </Button>
        </div>

        {/* Dataset Information Banner */}
        {!currentDatasetId && stats.total === 0 && (
          <Card className="border-5 shadow-lg bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-teal-800 mb-1">Welcome to Strategic Policy Deployment</h3>
                  <p className="text-teal-700 mb-3">
                    This application helps you implement Hoshin Kanri (Policy Deployment) methodology. 
                    Load demo data to explore features or start building your own strategic plan.
                  </p>
                  <p className="text-sm text-teal-600">
                    💡 Use the "Load Demo Data" dropdown in the top navigation to explore different industry examples
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-5 shadow-lg bg-gradient-to-br from-white to-teal-50/50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Total Objectives</p>
                  <p className="text-3xl font-bold text-teal-700">{stats.total}</p>
                </div>
                <div className="p-3 bg-teal-100 rounded-xl">
                  <Target className="w-7 h-7 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-5 shadow-lg bg-gradient-to-br from-white to-emerald-50/50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Avg Performance</p>
                  <p className="text-3xl font-bold text-emerald-700">{avgPerformance.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <TrendingUp className="w-7 h-7 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-5 shadow-lg bg-gradient-to-br from-white to-blue-50/50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Active Processes</p>
                  <p className="text-3xl font-bold text-blue-700">{processes.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-5 shadow-lg bg-gradient-to-br from-white to-orange-50/50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Pending Catchball</p>
                  <p className="text-3xl font-bold text-orange-700">{pendingCatchball}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl">
                  <AlertCircle className="w-7 h-7 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-5 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-600" />
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-600">Completed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1 rounded-full">
                      {stats.completed}
                    </Badge>
                    <span className="text-sm text-slate-500 min-w-[3rem] text-right">
                      {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={stats.total > 0 ? (stats.completed / stats.total) * 100 : 0} 
                  className="h-2 bg-emerald-100 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600"
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-slate-600">In Progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full">
                      {stats.inProgress}
                    </Badge>
                    <span className="text-sm text-slate-500 min-w-[3rem] text-right">
                      {stats.total > 0 ? ((stats.inProgress / stats.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0} 
                  className="h-2 bg-blue-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-blue-600"
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-slate-600">At Risk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-red-100 text-red-800 border-red-200 px-3 py-1 rounded-full">
                      {stats.atRisk}
                    </Badge>
                    <span className="text-sm text-slate-500 min-w-[3rem] text-right">
                      {stats.total > 0 ? ((stats.atRisk / stats.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={stats.total > 0 ? (stats.atRisk / stats.total) * 100 : 0} 
                  className="h-2 bg-red-100 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-5 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {catchball.slice(-5).map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50/50 transition-colors">
                    <div className="flex-shrink-0 w-3 h-3 mt-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-sm"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.from} → {item.to} • {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'pending' 
                          ? 'bg-amber-100 text-amber-800 border-amber-200' 
                          : 'bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
                {catchball.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500">No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Objectives */}
        <Card className="border-5 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-600" />
              Strategic Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strategicObjectives.slice(0, 5).map((objective) => (
                <div key={objective.id} className="group p-6 border border-slate-200 rounded-xl hover:shadow-md hover:border-teal-200 transition-all duration-200 bg-white/60">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                        {objective.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">{objective.description}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
                          Target: {objective.targetYear}
                        </span>
                        <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
                          Owner: {objective.owner}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <Badge
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          objective.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                          objective.priority === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {objective.priority}
                      </Badge>
                      <Badge
                        className={`text-xs px-3 py-1 rounded-full font-medium text-white ${
                          objective.status === 'completed' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                          objective.status === 'in-progress' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          objective.status === 'at-risk' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          'bg-gradient-to-r from-slate-500 to-slate-600'
                        }`}
                      >
                        {objective.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              {strategicObjectives.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">No strategic objectives defined yet</h3>
                  <p className="text-slate-500 mb-6">Start your strategic planning journey by adding your first objective</p>
                  <Button 
                    onClick={() => setShowObjectiveForm(true)}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Objective
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <StrategicObjectiveForm
          open={showObjectiveForm}
          onOpenChange={setShowObjectiveForm}
        />
      </div>
    </div>
  );
};

export default Dashboard;