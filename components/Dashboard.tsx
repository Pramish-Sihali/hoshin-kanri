'use client';

import React, { useState, lazy, Suspense } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import StrategicObjectiveForm from './StrategicObjectiveForm';
import { Plus, Target, TrendingUp, Users, AlertCircle, Activity, CheckCircle2, Clock, AlertTriangle, Database, Info } from 'lucide-react';

const GanttChart = lazy(() => import('./GanttChart').then(m => ({ default: m.GanttChart })));

const GanttSkeleton = () => (
  <div className="space-y-3 p-4">
    <Skeleton className="h-5 w-48" />
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="p-5 space-y-5">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="h-7 w-72" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-9 w-44 rounded-xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-12" />
              </div>
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="border shadow-sm">
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export { DashboardSkeleton };

const Dashboard: React.FC = () => {
  const {
    strategicObjectives,
    annualObjectives,
    processes,
    metrics,
    catchball,
    currentDatasetId,
    availableDatasets
  } = useHoshinStore();
  const [showObjectiveForm, setShowObjectiveForm] = useState(false);

  const getCurrentDataset = () => {
    if (!currentDatasetId) return null;
    return availableDatasets.find(d => d.id === currentDatasetId);
  };

  const getStatusStats = () => {
    const allItems = [...strategicObjectives, ...annualObjectives, ...processes];
    return {
      total: allItems.length,
      completed: allItems.filter(item => item.status === 'completed').length,
      inProgress: allItems.filter(item => item.status === 'in-progress').length,
      atRisk: allItems.filter(item => item.status === 'at-risk').length
    };
  };

  const getMetricsPerformance = () => {
    if (metrics.length === 0) return 0;
    const totalPerformance = metrics.reduce((sum, metric) => {
      return sum + Math.min((metric.current / metric.target) * 100, 100);
    }, 0);
    return totalPerformance / metrics.length;
  };

  const getPendingCatchball = () => catchball.filter(item => item.status === 'pending').length;

  const stats = getStatusStats();
  const avgPerformance = getMetricsPerformance();
  const pendingCatchball = getPendingCatchball();
  const currentDataset = getCurrentDataset();

  return (
    <div className="min-h-screen">
      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
              Strategic Policy Deployment
            </h1>
            {currentDataset && (
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <Database className="w-3.5 h-3.5" />
                <span className="font-medium">{currentDataset.name}</span>
              </div>
            )}
          </div>
          <Button
            onClick={() => setShowObjectiveForm(true)}
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm hover:shadow-md transition-all rounded-lg text-xs px-4 py-2"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Strategic Objective
          </Button>
        </div>

        {/* Welcome Banner */}
        {!currentDatasetId && stats.total === 0 && (
          <Card className="border shadow-sm bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-teal-800">Welcome to Strategic Policy Deployment</h3>
                  <p className="text-xs text-teal-600 mt-0.5">
                    Click the &ldquo;Load Demo Data&rdquo; button in the top navigation to explore the platform
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Objectives', value: stats.total, icon: Target, color: 'teal' },
            { label: 'Avg Performance', value: `${avgPerformance.toFixed(1)}%`, icon: TrendingUp, color: 'emerald' },
            { label: 'Active Processes', value: processes.length, icon: Users, color: 'blue' },
            { label: 'Pending Catchball', value: pendingCatchball, icon: AlertCircle, color: 'orange' }
          ].map((card) => {
            const Icon = card.icon;
            const colorMap: Record<string, { bg: string; iconBg: string; text: string }> = {
              teal: { bg: 'from-white to-teal-50/50', iconBg: 'bg-teal-100', text: 'text-teal-700' },
              emerald: { bg: 'from-white to-emerald-50/50', iconBg: 'bg-emerald-100', text: 'text-emerald-700' },
              blue: { bg: 'from-white to-blue-50/50', iconBg: 'bg-blue-100', text: 'text-blue-700' },
              orange: { bg: 'from-white to-orange-50/50', iconBg: 'bg-orange-100', text: 'text-orange-700' }
            };
            const c = colorMap[card.color];
            return (
              <Card key={card.label} className={`border shadow-sm bg-gradient-to-br ${c.bg} hover:shadow-md transition-all`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">{card.label}</p>
                      <p className={`text-xl font-bold ${c.text} mt-1`}>{card.value}</p>
                    </div>
                    <div className={`p-2 ${c.iconBg} rounded-lg`}>
                      <Icon className={`w-4 h-4 ${c.text}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Status + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-4">
              {[
                { label: 'Completed', count: stats.completed, icon: CheckCircle2, color: 'emerald' },
                { label: 'In Progress', count: stats.inProgress, icon: Clock, color: 'blue' },
                { label: 'At Risk', count: stats.atRisk, icon: AlertTriangle, color: 'red' }
              ].map((row) => {
                const Icon = row.icon;
                const pct = stats.total > 0 ? ((row.count / stats.total) * 100) : 0;
                return (
                  <div key={row.label} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 text-${row.color}-500`} />
                        <span className="text-xs font-medium text-slate-600">{row.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-${row.color}-100 text-${row.color}-800 border-${row.color}-200 text-xs px-2 py-0.5 rounded-full`}>
                          {row.count}
                        </Badge>
                        <span className="text-xs text-slate-400 w-10 text-right">{pct.toFixed(1)}%</span>
                      </div>
                    </div>
                    <Progress
                      value={pct}
                      className={`h-1.5 bg-${row.color}-100 [&>div]:bg-gradient-to-r [&>div]:from-${row.color}-500 [&>div]:to-${row.color}-600`}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-2">
                {catchball.slice(-5).map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex-shrink-0 w-2 h-2 mt-1.5 bg-teal-500 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800 truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {item.from} → {item.to} &bull; {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${item.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
                {catchball.length === 0 && (
                  <div className="text-center py-6">
                    <Activity className="w-5 h-5 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Objectives */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-600" />
              Strategic Objectives
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              {strategicObjectives.slice(0, 5).map((objective) => (
                <div key={objective.id} className="group p-3 border border-slate-100 rounded-lg hover:shadow-sm hover:border-teal-200 transition-all bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                        {objective.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{objective.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                          {objective.targetYear}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                          {objective.owner}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Badge className={`text-[10px] px-2 py-0.5 rounded-full ${objective.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' : objective.priority === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                        {objective.priority}
                      </Badge>
                      <Badge className={`text-[10px] px-2 py-0.5 rounded-full text-white ${objective.status === 'completed' ? 'bg-emerald-500' : objective.status === 'in-progress' ? 'bg-blue-500' : objective.status === 'at-risk' ? 'bg-red-500' : 'bg-slate-400'}`}>
                        {objective.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              {strategicObjectives.length === 0 && (
                <div className="text-center py-8">
                  <Target className="w-6 h-6 text-teal-300 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-slate-700 mb-1">No strategic objectives yet</h3>
                  <p className="text-xs text-slate-400 mb-4">Add your first objective to get started</p>
                  <Button
                    onClick={() => setShowObjectiveForm(true)}
                    size="sm"
                    className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Objective
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Gantt Chart - Lazy Loaded */}
        <Suspense fallback={<GanttSkeleton />}>
          <GanttChart />
        </Suspense>

        <StrategicObjectiveForm
          open={showObjectiveForm}
          onOpenChange={setShowObjectiveForm}
        />
      </div>
    </div>
  );
};

export default Dashboard;
