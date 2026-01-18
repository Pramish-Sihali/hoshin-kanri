// components/ExecutiveReportGenerator.tsx
'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  FileText,
  Download,
  AlertTriangle,
  Clock,
  Target,
  BarChart3,
  Users,
  X,
  Zap,
  Sparkles,
  Bot
} from 'lucide-react';

interface ExecutiveReportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CriticalIssue {
  type: 'strategic' | 'annual' | 'process' | 'metric';
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  issue: string;
  recommendation: string;
  impact: string;
  timeline: string;
}

const ExecutiveReportGenerator: React.FC<ExecutiveReportProps> = ({ open, onOpenChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const {
    strategicObjectives,
    annualObjectives,
    processes,
    metrics,
    catchball,
    getCurrentDatasetName
  } = useHoshinStore();

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setReportGenerated(true);
    setIsGenerating(false);
  };

  const generateAiInsights = async () => {
    setIsAiLoading(true);
    try {
      const issues = analyzeCriticalIssues();
      const kpis = analyzeKPIPerformance();

      const payload = {
        datasetName: getCurrentDatasetName(),
        objectives: [
          ...strategicObjectives.filter(o => o.status === 'at-risk' || o.priority === 'high'),
          ...annualObjectives.filter(o => o.status === 'at-risk')
        ],
        metrics: kpis.filter(k => k.performance < 80),
        issues: issues.filter(i => i.severity === 'high')
      };

      const response = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const data = await response.json();
      setAiSummary(data.summary);
    } catch (error) {
      console.error('Error generating AI insights:', error);
      // Fallback or error toast could act here
    } finally {
      setIsAiLoading(false);
    }
  };

  const downloadReport = () => {
    const reportContent = generatePrintableReport();
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Executive_Report_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePrintableReport = () => {
    const criticalIssues = analyzeCriticalIssues();
    const kpiSummary = analyzeKPIPerformance();
    const projectHealth = analyzeProjectHealth();

    return `
<!DOCTYPE html>
<html>
<head>
    <title>Executive Report - ${getCurrentDatasetName()}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
        .header { border-bottom: 3px solid #0891b2; padding-bottom: 20px; margin-bottom: 30px; }
        .title { color: #0891b2; font-size: 28px; font-weight: bold; margin: 0; }
        .subtitle { color: #64748b; font-size: 16px; margin: 5px 0 0 0; }
        .section { margin: 30px 0; }
        .section-title { color: #1e293b; font-size: 20px; font-weight: bold; margin-bottom: 15px; }
        .critical-alert { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 15px 0; }
        .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .high-priority { border-left: 4px solid #ef4444; }
        .medium-priority { border-left: 4px solid #f59e0b; }
        .low-priority { border-left: 4px solid #10b981; }
        .progress-bar { background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: #0891b2; }
        .red-progress { background: #ef4444; }
        .yellow-progress { background: #f59e0b; }
        .recommendation { background: #f0f9ff; border: 1px solid #0891b2; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
        @media print { body { margin: 20px; } }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="title">Executive Strategic Report</h1>
        <p class="subtitle">${getCurrentDatasetName()} • Generated ${new Date().toLocaleDateString()}</p>
    </div>

    <div class="section">
        <h2 class="section-title">🚨 Critical Issues Requiring Immediate Attention</h2>
        ${criticalIssues.filter(issue => issue.severity === 'high').map(issue => `
            <div class="critical-alert high-priority">
                <strong>${issue.title}</strong><br>
                <strong>Issue:</strong> ${issue.issue}<br>
                <strong>Business Impact:</strong> ${issue.impact}<br>
                <strong>Recommended Action:</strong> ${issue.recommendation}<br>
                <strong>Timeline:</strong> ${issue.timeline}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2 class="section-title">📊 Key Performance Indicators Status</h2>
        ${kpiSummary.map(kpi => `
            <div class="metric-card">
                <strong>${kpi.name}</strong><br>
                <div style="margin: 10px 0;">
                    <div class="progress-bar">
                        <div class="progress-fill ${kpi.performance < 70 ? 'red-progress' : kpi.performance < 90 ? 'yellow-progress' : ''}" 
                             style="width: ${Math.min(kpi.performance, 100)}%"></div>
                    </div>
                    <small>${kpi.current} / ${kpi.target} ${kpi.unit} (${kpi.performance.toFixed(1)}%)</small>
                </div>
                ${kpi.performance < 80 ? `<div class="recommendation">⚠️ Below target - ${kpi.recommendation}</div>` : ''}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2 class="section-title">📈 Strategic Initiative Health</h2>
        ${projectHealth.map(project => `
            <div class="metric-card ${project.status === 'at-risk' ? 'high-priority' : project.status === 'in-progress' ? 'medium-priority' : 'low-priority'}">
                <strong>${project.title}</strong><br>
                <strong>Status:</strong> ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}<br>
                <strong>Progress:</strong> ${project.progress}%<br>
                <strong>Owner:</strong> ${project.owner}<br>
                ${project.recommendation ? `<div class="recommendation">${project.recommendation}</div>` : ''}
            </div>
        `).join('')}
    </div>

    <div class="footer">
        <p>This report was automatically generated from the Strategic Policy Deployment system.</p>
        <p>For detailed analysis and action plans, please review the full system dashboard.</p>
    </div>
</body>
</html>`;
  };

  const analyzeCriticalIssues = (): CriticalIssue[] => {
    const issues: CriticalIssue[] = [];

    // Analyze at-risk strategic objectives
    strategicObjectives.filter(obj => obj.status === 'at-risk').forEach(obj => {
      issues.push({
        type: 'strategic',
        id: obj.id,
        title: obj.title,
        severity: obj.priority === 'high' ? 'high' : 'medium',
        issue: `Strategic objective is marked as at-risk with ${obj.priority} priority`,
        recommendation: `Immediate executive intervention required. Reassess resource allocation and remove barriers.`,
        impact: `Could jeopardize ${obj.targetYear} strategic goals and organizational performance`,
        timeline: 'Immediate action required (0-30 days)'
      });
    });

    // Analyze underperforming metrics
    metrics.filter(metric => (metric.current / metric.target) < 0.7).forEach(metric => {
      const performance = (metric.current / metric.target) * 100;
      issues.push({
        type: 'metric',
        id: metric.id,
        title: metric.name,
        severity: performance < 50 ? 'high' : 'medium',
        issue: `Performance at ${performance.toFixed(1)}% of target (${metric.current}/${metric.target} ${metric.unit})`,
        recommendation: `Investigate root causes and implement corrective measures. Consider resource reallocation.`,
        impact: `Performance gap affecting overall organizational effectiveness`,
        timeline: performance < 50 ? 'Immediate (0-15 days)' : 'Short-term (15-45 days)'
      });
    });

    // Analyze delayed annual objectives
    annualObjectives.filter(obj => obj.progress < 50 && obj.status !== 'completed').forEach(obj => {
      const daysToTarget = Math.ceil((new Date(obj.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (daysToTarget < 90) {
        issues.push({
          type: 'annual',
          id: obj.id,
          title: obj.title,
          severity: daysToTarget < 30 ? 'high' : 'medium',
          issue: `Only ${obj.progress}% complete with ${daysToTarget} days remaining until target date`,
          recommendation: `Fast-track execution plan needed. Consider scope adjustment or deadline extension.`,
          impact: `Risk of missing annual targets affecting strategic goal delivery`,
          timeline: daysToTarget < 30 ? 'Critical (0-7 days)' : 'Urgent (7-30 days)'
        });
      }
    });

    // Analyze pending critical catchball items
    const criticalCatchball = catchball.filter(item =>
      item.status === 'pending' &&
      (item.type === 'concern' || item.type === 'approval') &&
      (new Date().getTime() - new Date(item.createdAt).getTime()) > (3 * 24 * 60 * 60 * 1000) // Older than 3 days
    );

    criticalCatchball.forEach(item => {
      issues.push({
        type: 'process',
        id: item.id,
        title: item.title,
        severity: item.type === 'approval' ? 'high' : 'medium',
        issue: `${item.type} pending for ${Math.ceil((new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days`,
        recommendation: `Escalate for immediate resolution. Assign executive sponsor if needed.`,
        impact: `Blocking operational progress and team productivity`,
        timeline: 'Immediate resolution required'
      });
    });

    return issues.sort((a, b) => {
      const severityWeight = { high: 3, medium: 2, low: 1 };
      return severityWeight[b.severity] - severityWeight[a.severity];
    });
  };

  const analyzeKPIPerformance = () => {
    return metrics.map(metric => {
      const performance = (metric.current / metric.target) * 100;
      let recommendation = '';

      if (performance < 70) {
        recommendation = 'Requires immediate attention and resource reallocation';
      } else if (performance < 90) {
        recommendation = 'Monitor closely and implement improvement measures';
      } else {
        recommendation = 'On track - maintain current approach';
      }

      return {
        name: metric.name,
        current: metric.current,
        target: metric.target,
        unit: metric.unit,
        performance,
        recommendation,
        owner: metric.owner
      };
    }).sort((a, b) => a.performance - b.performance);
  };

  const analyzeProjectHealth = () => {
    return annualObjectives.map(obj => {
      let recommendation = '';

      if (obj.status === 'at-risk') {
        recommendation = '🚨 Requires immediate executive intervention and resource support';
      } else if (obj.progress < 50) {
        const daysToTarget = Math.ceil((new Date(obj.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        if (daysToTarget < 90) {
          recommendation = '⚠️ Behind schedule - consider fast-track execution or scope adjustment';
        }
      }

      return {
        title: obj.title,
        status: obj.status,
        progress: obj.progress,
        owner: obj.owner,
        targetDate: obj.targetDate,
        recommendation
      };
    }).sort((a, b) => {
      const statusWeight = { 'at-risk': 3, 'planning': 2, 'in-progress': 1, 'completed': 0 };
      return statusWeight[a.status as keyof typeof statusWeight] - statusWeight[b.status as keyof typeof statusWeight];
    });
  };

  const getOverallHealthScore = () => {
    const totalItems = strategicObjectives.length + annualObjectives.length + processes.length + metrics.length;
    if (totalItems === 0) return 0;

    const atRiskItems = [
      ...strategicObjectives.filter(obj => obj.status === 'at-risk'),
      ...annualObjectives.filter(obj => obj.status === 'at-risk'),
      ...processes.filter(proc => proc.status === 'on-hold')
    ].length;

    const underperformingMetrics = metrics.filter(metric => (metric.current / metric.target) < 0.8).length;

    const healthScore = Math.max(0, 100 - ((atRiskItems + underperformingMetrics) / totalItems * 100));
    return Math.round(healthScore);
  };

  const criticalIssues = analyzeCriticalIssues();
  const healthScore = getOverallHealthScore();
  const highPriorityIssues = criticalIssues.filter(issue => issue.severity === 'high').length;

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        {!reportGenerated ? (
          // Report Generation View
          <div className="p-8 text-center">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                Executive Strategic Report
              </DialogTitle>
            </DialogHeader>

            {!isGenerating ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-left">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Report Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Strategic objectives analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>KPI performance review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>At-risk items identification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Resource allocation insights</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 max-w-2xl mx-auto">
                  This report will analyze your current strategic initiatives, identify critical issues,
                  and provide executive-level recommendations for immediate action.
                </p>

                <Button
                  onClick={generateReport}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Executive Report
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Generating Report...</h3>
                  <p className="text-slate-600">Analyzing strategic data and identifying critical issues</p>
                </div>
                <div className="max-w-md mx-auto">
                  <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Report View
          <>
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Executive Strategic Report</h2>
                <p className="text-slate-600">{getCurrentDatasetName()} • {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={downloadReport}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => onOpenChange(false)}
                  variant="outline"
                  className="p-2 rounded-xl"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-8">

              {/* AI Insights Section */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      AI Strategic Analysis
                    </h3>
                    {!aiSummary && (
                      <Button
                        onClick={generateAiInsights}
                        disabled={isAiLoading}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white border-0"
                        size="sm"
                      >
                        {isAiLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Bot className="w-4 h-4 mr-2" />
                            Generate Insights
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {aiSummary ? (
                    <div
                      className="prose prose-invert max-w-none bg-white/5 rounded-xl p-6 backdrop-blur-sm"
                      dangerouslySetInnerHTML={{ __html: aiSummary }}
                    />
                  ) : (
                    <div className="text-indigo-200 text-sm bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                      <Bot className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p>Click "Generate Insights" to utilize AWS Bedrock AI to analyze your performance data, seek root causes for critical issues, and provide executive recommendations.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Executive Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${healthScore >= 80 ? 'text-green-600' : healthScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {healthScore}%
                    </div>
                    <div className="text-sm text-slate-600">Overall Health Score</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${highPriorityIssues === 0 ? 'text-green-600' : highPriorityIssues <= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {highPriorityIssues}
                    </div>
                    <div className="text-sm text-slate-600">Critical Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 text-blue-600">
                      {annualObjectives.filter(obj => obj.status === 'in-progress').length}
                    </div>
                    <div className="text-sm text-slate-600">Active Initiatives</div>
                  </div>
                </div>
              </div>

              {/* Critical Issues */}
              {criticalIssues.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Critical Issues Requiring Immediate Attention
                  </h3>
                  <div className="space-y-4">
                    {criticalIssues.slice(0, 5).map((issue, index) => (
                      <div key={issue.id} className={`p-6 rounded-xl border-l-4 ${issue.severity === 'high' ? 'bg-red-50 border-red-500' :
                        issue.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                          'bg-blue-50 border-blue-500'
                        }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-slate-800 text-lg">{issue.title}</h4>
                            <Badge className={`mt-2 ${issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                              issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                              {issue.severity.toUpperCase()} PRIORITY
                            </Badge>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {issue.type}
                          </Badge>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong className="text-slate-700">Issue:</strong>
                            <p className="text-slate-600 mt-1">{issue.issue}</p>
                          </div>
                          <div>
                            <strong className="text-slate-700">Business Impact:</strong>
                            <p className="text-slate-600 mt-1">{issue.impact}</p>
                          </div>
                          <div>
                            <strong className="text-slate-700">Recommended Action:</strong>
                            <p className="text-slate-600 mt-1">{issue.recommendation}</p>
                          </div>
                          <div className="flex items-center gap-4 pt-2 border-t border-slate-200">
                            <div className="flex items-center gap-1 text-slate-500">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{issue.timeline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* KPI Performance */}
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Key Performance Indicators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analyzeKPIPerformance().slice(0, 6).map((kpi, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-slate-800">{kpi.name}</h4>
                        <Badge className={`${kpi.performance >= 90 ? 'bg-green-100 text-green-800' :
                          kpi.performance >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {kpi.performance.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <Progress
                          value={Math.min(kpi.performance, 100)}
                          className={`h-2 ${kpi.performance >= 90 ? 'bg-green-100 [&>div]:bg-green-500' :
                            kpi.performance >= 70 ? 'bg-yellow-100 [&>div]:bg-yellow-500' :
                              'bg-red-100 [&>div]:bg-red-500'
                            }`}
                        />
                        <div className="text-sm text-slate-600">
                          {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()} {kpi.unit}
                        </div>
                        {kpi.performance < 80 && (
                          <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                            📋 {kpi.recommendation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Recommended Next Steps</h3>
                <div className="space-y-3 text-blue-700">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                    <p>Address all high-priority critical issues within the next 7-14 days</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                    <p>Review resource allocation for underperforming KPIs and at-risk projects</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                    <p>Schedule weekly executive review meetings for next 30 days</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                    <p>Implement enhanced monitoring and reporting for identified risk areas</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExecutiveReportGenerator;