// components/StrategicObjectiveCharter.tsx
'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { StrategicObjective } from '../types/hoshin';
import { 
  Target, Calendar, User, Flag, AlertCircle, DollarSign, Users, 
  TrendingUp, CheckCircle2, Clock, AlertTriangle, Plus, Trash2,
  Building, FileText, Award, Zap, Settings, BarChart3, Briefcase,
  ChevronDown, ChevronRight, Save, X
} from 'lucide-react';

interface StrategicObjectiveCharterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  objective?: StrategicObjective;
}

interface Deliverable {
  id: string;
  description: string;
  targetDate: string;
  owner: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
}

interface Risk {
  id: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

interface Milestone {
  id: string;
  description: string;
  targetDate: string;
  actualDate?: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  responsibility: string;
}

interface KPI {
  id: string;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  frequency: string;
}

interface Approver {
  id: string;
  role: string;
  name: string;
  approvalDate?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const StrategicObjectiveCharter: React.FC<StrategicObjectiveCharterProps> = ({
  open,
  onOpenChange,
  objective
}) => {
  const { addStrategicObjective, updateStrategicObjective } = useHoshinStore();
  
  // Basic Information State
  const [formData, setFormData] = useState({
    title: objective?.title || '',
    description: objective?.description || '',
    targetYear: objective?.targetYear || new Date().getFullYear() + 3,
    owner: objective?.owner || '',
    status: objective?.status || 'planning' as const,
    priority: objective?.priority || 'medium' as const,
    // Charter-specific fields
    strategicTheme: '',
    projectType: 'Process Efficiency',
    ticketSize: 'M',
    startDate: '',
    sponsor: '',
    businessNeed: '',
    alignment: '',
    budgetAllocated: 0,
    budgetCurrency: 'USD',
    resourceRequirements: [] as string[],
    reviewFrequency: 'Monthly',
    nextReviewDate: ''
  });

  // Extended state for charter sections
  const [successCriteria, setSuccessCriteria] = useState<string[]>(['']);
  const [inScope, setInScope] = useState<string[]>(['']);
  const [outOfScope, setOutOfScope] = useState<string[]>(['']);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [assumptions, setAssumptions] = useState<string[]>(['']);
  const [dependencies, setDependencies] = useState<string[]>(['']);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [approvers, setApprovers] = useState<Approver[]>([]);

  // UI State
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([
    'basic', 'context', 'scope'
  ]));
  const [completionProgress, setCompletionProgress] = useState(25);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const addToArray = (setter: Function, current: any[], template: any) => {
    setter([...current, { ...template, id: Date.now().toString() }]);
  };

  const removeFromArray = (setter: Function, current: any[], id: string) => {
    setter(current.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const charterData = {
      ...formData,
      successCriteria,
      inScope,
      outOfScope,
      deliverables,
      risks,
      assumptions,
      dependencies,
      milestones,
      teamMembers,
      kpis,
      approvers
    };
    
    if (objective) {
      updateStrategicObjective(objective.id, formData);
    } else {
      addStrategicObjective(formData);
    }
    onOpenChange(false);
  };

  const projectTypeOptions = [
    { value: 'Process Efficiency', label: 'Process Efficiency', color: '#059669' },
    { value: 'Cost Optimization', label: 'Cost Optimization', color: '#d97706' },
    { value: 'Process Quality', label: 'Process Quality', color: '#3b82f6' },
    { value: 'Tech Automation', label: 'Tech Automation', color: '#8b5cf6' },
    { value: 'Compliance', label: 'Compliance', color: '#dc2626' }
  ];

  const ticketSizeOptions = [
    { value: 'XS', label: 'XS - Minimal', color: '#10b981' },
    { value: 'S', label: 'S - Small', color: '#06b6d4' },
    { value: 'M', label: 'M - Medium', color: '#3b82f6' },
    { value: 'L', label: 'L - Large', color: '#8b5cf6' },
    { value: 'XL', label: 'XL - Extra Large', color: '#f59e0b' },
    { value: 'XXL', label: 'XXL - Enterprise', color: '#ef4444' }
  ];

  const SectionHeader = ({ title, section, children }: { title: string; section: string; children: React.ReactNode }) => (
    <div className="border-b border-gray-100">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        {expandedSections.has(section) ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections.has(section) && (
        <div className="p-6 bg-gray-50/50">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        {/* Charter Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 text-center">
          <h1 className="text-2xl font-bold tracking-wider mb-2">STRATEGIC OBJECTIVE CHARTER</h1>
          <p className="text-blue-100">Executive-Level Strategic Planning Document</p>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-3 bg-white border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Form Completion</span>
            <span className="text-sm font-medium text-gray-700">{completionProgress}%</span>
          </div>
          <Progress value={completionProgress} className="h-2" />
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="space-y-0">
            
            {/* Basic Information Section */}
            <SectionHeader title="1. Basic Information" section="basic">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Objective Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter strategic objective title"
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Objective Owner *
                    </label>
                    <Input
                      value={formData.owner}
                      onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                      placeholder="Responsible person"
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      Executive Sponsor
                    </label>
                    <Input
                      value={formData.sponsor}
                      onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
                      placeholder="Executive sponsor"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      Strategic Theme
                    </label>
                    <Input
                      value={formData.strategicTheme}
                      onChange={(e) => setFormData({ ...formData, strategicTheme: e.target.value })}
                      placeholder="e.g., Growth, Operational Excellence"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Settings className="w-4 h-4 text-blue-600" />
                      Project Type
                    </label>
                    <Select
                      value={formData.projectType}
                      onChange={(value) => setFormData({ ...formData, projectType: value })}
                      options={projectTypeOptions.map(opt => ({ 
                        value: opt.value, 
                        label: opt.label 
                      }))}
                      className="h-12"
                    />
                    <Badge 
                      style={{ 
                        backgroundColor: projectTypeOptions.find(opt => opt.value === formData.projectType)?.color + '20',
                        color: projectTypeOptions.find(opt => opt.value === formData.projectType)?.color
                      }}
                      className="mt-2"
                    >
                      {formData.projectType}
                    </Badge>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      Ticket Size (Complexity)
                    </label>
                    <Select
                      value={formData.ticketSize}
                      onChange={(value) => setFormData({ ...formData, ticketSize: value })}
                      options={ticketSizeOptions.map(opt => ({ 
                        value: opt.value, 
                        label: opt.label 
                      }))}
                      className="h-12"
                    />
                    <Badge 
                      style={{ 
                        backgroundColor: ticketSizeOptions.find(opt => opt.value === formData.ticketSize)?.color + '20',
                        color: ticketSizeOptions.find(opt => opt.value === formData.ticketSize)?.color
                      }}
                      className="mt-2"
                    >
                      {formData.ticketSize} Size
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Flag className="w-4 h-4 text-blue-600" />
                        Priority
                      </label>
                      <Select
                        value={formData.priority}
                        onChange={(value) => setFormData({ ...formData, priority: value as StrategicObjective['priority'] })}
                        options={[
                          { value: 'high', label: 'High' },
                          { value: 'medium', label: 'Medium' },
                          { value: 'low', label: 'Low' }
                        ]}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        Status
                      </label>
                      <Select
                        value={formData.status}
                        onChange={(value) => setFormData({ ...formData, status: value as StrategicObjective['status'] })}
                        options={[
                          { value: 'planning', label: 'Planning' },
                          { value: 'in-progress', label: 'In Progress' },
                          { value: 'completed', label: 'Completed' },
                          { value: 'at-risk', label: 'At Risk' }
                        ]}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Objective Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed context, rationale, and expected outcomes"
                  className="min-h-24"
                  required
                />
              </div>
            </SectionHeader>

            {/* Strategic Context Section */}
            <SectionHeader title="2. Strategic Context" section="context">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600" />
                    Business Need
                  </label>
                  <Textarea
                    value={formData.businessNeed}
                    onChange={(e) => setFormData({ ...formData, businessNeed: e.target.value })}
                    placeholder="Why is this objective critical to the business?"
                    className="min-h-20"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    Strategic Alignment
                  </label>
                  <Textarea
                    value={formData.alignment}
                    onChange={(e) => setFormData({ ...formData, alignment: e.target.value })}
                    placeholder="How does this align with company vision and strategy?"
                    className="min-h-20"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Success Criteria
                  </label>
                  {successCriteria.map((criterion, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Input
                        value={criterion}
                        onChange={(e) => {
                          const newCriteria = [...successCriteria];
                          newCriteria[index] = e.target.value;
                          setSuccessCriteria(newCriteria);
                        }}
                        placeholder="What defines success for this objective?"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSuccessCriteria(successCriteria.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSuccessCriteria([...successCriteria, ''])}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Success Criterion
                  </Button>
                </div>
              </div>
            </SectionHeader>

            {/* Scope & Deliverables Section */}
            <SectionHeader title="3. Scope & Deliverables" section="scope">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    In Scope
                  </label>
                  {inScope.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newScope = [...inScope];
                          newScope[index] = e.target.value;
                          setInScope(newScope);
                        }}
                        placeholder="What's included in this objective?"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setInScope(inScope.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setInScope([...inScope, ''])}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add In-Scope Item
                  </Button>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <X className="w-4 h-4 text-red-600" />
                    Out of Scope
                  </label>
                  {outOfScope.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newScope = [...outOfScope];
                          newScope[index] = e.target.value;
                          setOutOfScope(newScope);
                        }}
                        placeholder="What's explicitly excluded?"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setOutOfScope(outOfScope.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOutOfScope([...outOfScope, ''])}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Out-of-Scope Item
                  </Button>
                </div>
              </div>
            </SectionHeader>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 p-6 border-t bg-gray-50">
            <Button 
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
            >
              <Save className="w-4 h-4 mr-2" />
              {objective ? 'Update Charter' : 'Create Charter'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 font-semibold"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StrategicObjectiveCharter;