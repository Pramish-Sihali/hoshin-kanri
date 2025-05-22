'use client';

import React from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const XMatrix: React.FC = () => {
  const { strategicObjectives, annualObjectives, processes, metrics } = useHoshinStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'at-risk': return 'bg-red-500';
      case 'planning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoshin Kanri X-Matrix</h1>
        <p className="text-gray-600">Strategic Policy Deployment Matrix</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategic Objectives Quadrant */}
        <Card className="h-96 overflow-y-auto">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-lg font-semibold text-blue-800">
              Strategic Objectives (3-5 Years)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {strategicObjectives.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No strategic objectives defined</p>
            ) : (
              strategicObjectives.map((objective) => (
                <div
                  key={objective.id}
                  className={`p-3 rounded-lg border-l-4 ${getPriorityColor(objective.priority)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{objective.title}</h3>
                    <Badge className={`text-xs ${getStatusColor(objective.status)} text-white`}>
                      {objective.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{objective.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: {objective.targetYear}</span>
                    <span>Owner: {objective.owner}</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Annual Objectives Quadrant */}
        <Card className="h-96 overflow-y-auto">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-lg font-semibold text-green-800">
              Annual Objectives & Breakthroughs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {annualObjectives.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No annual objectives defined</p>
            ) : (
              annualObjectives.map((objective) => (
                <div key={objective.id} className="p-3 rounded-lg border border-gray-200 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{objective.title}</h3>
                    <Badge className={`text-xs ${getStatusColor(objective.status)} text-white`}>
                      {objective.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{objective.description}</p>
                  <Progress value={objective.progress} className="mb-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{objective.progress}% Complete</span>
                    <span>Due: {new Date(objective.targetDate).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Owner: {objective.owner}</div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Processes Quadrant */}
        <Card className="h-96 overflow-y-auto">
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-lg font-semibold text-purple-800">
              Key Processes & Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {processes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No processes defined</p>
            ) : (
              processes.map((process) => (
                <div key={process.id} className="p-3 rounded-lg border border-gray-200 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{process.title}</h3>
                    <Badge className={`text-xs ${getStatusColor(process.status)} text-white`}>
                      {process.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{process.description}</p>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Start: {new Date(process.startDate).toLocaleDateString()}</span>
                    <span>End: {new Date(process.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>Owner: {process.owner}</span>
                    {process.resources.length > 0 && (
                      <span className="ml-2">Resources: {process.resources.join(', ')}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Metrics Quadrant */}
        <Card className="h-96 overflow-y-auto">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-lg font-semibold text-orange-800">
              Key Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {metrics.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No metrics defined</p>
            ) : (
              metrics.map((metric) => (
                <div key={metric.id} className="p-3 rounded-lg border border-gray-200 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{metric.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {metric.frequency}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{metric.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">
                      <span className="font-medium text-blue-600">{metric.current}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-gray-600">{metric.target}</span>
                      <span className="text-gray-500 ml-1">{metric.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {((metric.current / metric.target) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <Progress value={(metric.current / metric.target) * 100} className="mb-2" />
                  <div className="text-xs text-gray-500">Owner: {metric.owner}</div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Relationships Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Strategic Alignment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{strategicObjectives.length}</div>
              <div className="text-sm text-gray-600">Strategic Objectives</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{annualObjectives.length}</div>
              <div className="text-sm text-gray-600">Annual Objectives</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{processes.length}</div>
              <div className="text-sm text-gray-600">Active Processes</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{metrics.length}</div>
              <div className="text-sm text-gray-600">KPIs Tracked</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default XMatrix;