'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import StrategicObjectiveForm from './StrategicObjectiveForm';
import { Plus, Target, TrendingUp, Users, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { strategicObjectives, annualObjectives, processes, metrics, catchball } = useHoshinStore();
  const [showObjectiveForm, setShowObjectiveForm] = useState(false);

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hoshin Kanri Dashboard</h1>
          <p className="text-gray-600 mt-1">Strategic Policy Deployment Overview</p>
        </div>
        <Button onClick={() => setShowObjectiveForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Strategic Objective
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Objectives</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-gray-900">{avgPerformance.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Processes</p>
                <p className="text-2xl font-bold text-gray-900">{processes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Catchball</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCatchball}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <div className="flex items-center">
                  <Badge className="bg-green-500 text-white mr-2">{stats.completed}</Badge>
                  <span className="text-sm text-gray-500">
                    {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
              <Progress value={stats.total > 0 ? (stats.completed / stats.total) * 100 : 0} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">In Progress</span>
                <div className="flex items-center">
                  <Badge className="bg-blue-500 text-white mr-2">{stats.inProgress}</Badge>
                  <span className="text-sm text-gray-500">
                    {stats.total > 0 ? ((stats.inProgress / stats.total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
              <Progress value={stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">At Risk</span>
                <div className="flex items-center">
                  <Badge className="bg-red-500 text-white mr-2">{stats.atRisk}</Badge>
                  <span className="text-sm text-gray-500">
                    {stats.total > 0 ? ((stats.atRisk / stats.total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
              <Progress value={stats.total > 0 ? (stats.atRisk / stats.total) * 100 : 0} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {catchball.slice(-5).map((item, _index) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      {item.from} → {item.to} • {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={item.status === 'pending' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
              {catchball.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Strategic Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strategicObjectives.slice(0, 5).map((objective) => (
              <div key={objective.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{objective.title}</h3>
                  <p className="text-sm text-gray-600">{objective.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-xs text-gray-500">Target: {objective.targetYear}</span>
                    <span className="text-xs text-gray-500">Owner: {objective.owner}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`text-xs ${
                      objective.priority === 'high' ? 'bg-red-100 text-red-800' :
                      objective.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {objective.priority}
                  </Badge>
                  <Badge
                    className={`text-xs ${
                      objective.status === 'completed' ? 'bg-green-500 text-white' :
                      objective.status === 'in-progress' ? 'bg-blue-500 text-white' :
                      objective.status === 'at-risk' ? 'bg-red-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}
                  >
                    {objective.status}
                  </Badge>
                </div>
              </div>
            ))}
            {strategicObjectives.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No strategic objectives defined yet</p>
                <Button onClick={() => setShowObjectiveForm(true)}>
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
  );
};

export default Dashboard;
