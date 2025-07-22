// components/StrategicObjectiveForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Dialog, DialogContent } from './ui/dialog';
import { StrategicObjective } from '../types/hoshin';
import {
  Target, ChevronDown, PlusCircle, Trash2, CheckCircle, FileText, GanttChartSquare, 
  Clock, User, Tag, Ticket, Building, ShieldAlert, Users, BarChart3, 
  Globe, AlertTriangle, Star, Zap, DollarSign, Award, Briefcase, Calendar
} from 'lucide-react';

// --- Final, Comprehensive Type Definitions ---

interface RiskItem {
  id: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  mitigation: string;
}

interface Kpi {
  id: string;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
}

interface Milestone {
    id: string;
    description: string;
    targetCompletionDate: string;
    actualDate?: string;
}

interface TeamMember {
    id: string;
    role: string;
    name: string;
}

interface Approver {
    id: string;
    role: string;
    name: string;
}

interface CharterData {
  // Fields that match your StrategicObjective type
  objectiveTitle: string;
  objectiveOwner: string;
  priority: 'high' | 'medium' | 'low';
  status: 'planning' | 'in-progress' | 'completed' | 'at-risk';
  businessNeed: string; // This maps to your 'description' field

  // Upgraded & New Fields from Charter Image
  sponsor: string;
  projectType: 'Process Efficiency' | 'Cost Optimization' | 'Process Quality' | 'Tech Automation' | 'Compliance' | 'Marketing';
  ticketSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  strategicTheme: string;
  alignment: string;
  startDate: string;
  endDate: string;
  deliverables: string[];
  assumptions: string[];
  dependencies: string[];
  budgetAllocated: number;
  budgetCurrency: string;
  milestones: Milestone[];
  teamMembers: TeamMember[];
  approvers: Approver[];
  risksAndIssues: RiskItem[];
  performanceMetrics: Kpi[];
}

// Helper type to get only the keys that point to array properties.
type ArrayPropertyKeys<T> = {
  [K in keyof T]: T[K] extends any[] ? K : never;
}[keyof T];


// --- Helper Functions & Components ---

const getBadgeStyle = (type: 'priority' | 'status' | 'projectType' | 'ticketSize', value: string): string => {
    const styles = {
        priority: { high: 'bg-red-100 text-red-800', medium: 'bg-amber-100 text-amber-800', low: 'bg-green-100 text-green-800' },
        status: { planning: 'bg-slate-100 text-slate-800', 'in-progress': 'bg-blue-100 text-blue-800', 'at-risk': 'bg-orange-100 text-orange-800', completed: 'bg-green-100 text-green-800' },
        projectType: { 'Process Efficiency': 'bg-green-100 text-green-800', 'Cost Optimization': 'bg-amber-100 text-amber-800', 'Process Quality': 'bg-blue-100 text-blue-800', 'Tech Automation': 'bg-purple-100 text-purple-800', 'Compliance': 'bg-red-100 text-red-800', 'Marketing': 'bg-indigo-100 text-indigo-800' },
        ticketSize: { XS: 'bg-teal-100 text-teal-800', S: 'bg-cyan-100 text-cyan-800', M: 'bg-sky-100 text-sky-800', L: 'bg-indigo-100 text-indigo-800', XL: 'bg-orange-100 text-orange-800', XXL: 'bg-rose-100 text-rose-800' }
    };
    return (styles[type] as Record<string, string>)[value] || styles.status.planning;
};

const formatBadgeText = (text: string) => {
    if (!text) return '';
    const spacedText = text.replace(/-/g, ' ');
    return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
};

const Badge: React.FC<{text: string, className?: string}> = ({ text, className }) => (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border border-current/20 capitalize ${className}`}>{text}</span>
);

const CharterSection: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; description?: string; }> = ({ title, children, icon, description }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="flex justify-between items-center cursor-pointer group p-4 bg-slate-50/50 border-b border-slate-200 hover:bg-slate-100/70" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-1"><h3 className="flex items-center gap-3 text-lg font-semibold text-slate-800"><div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg">{icon}</div>{title}</h3>{description && <p className="text-sm text-slate-500 mt-1 ml-11">{description}</p>}</div>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && <div className="p-6 space-y-6">{children}</div>}
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean; error?: string; }> = ({ label, children, required, error }) => (
  <div className="flex flex-col gap-2"><label className="font-medium text-sm text-slate-700 flex items-center gap-2">{label}{required && <span className="text-red-500">*</span>}</label>{children}{error && <p className="text-xs text-red-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{error}</p>}</div>
);

const ProgressBar: React.FC<{ current: number; target: number; }> = ({ current, target }) => {
  const progress = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  return (
    <div className="space-y-1"><div className="relative"><div className="overflow-hidden h-2.5 text-xs flex rounded-full bg-slate-200"><div style={{ width: `${progress}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}/></div></div><div className="flex justify-between text-xs text-slate-500"><span>{current.toLocaleString()}</span><span>{target.toLocaleString()}</span></div></div>
  );
};

// --- Main Form Component ---
interface StrategicObjectiveFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  objective?: StrategicObjective;
}

const StrategicObjectiveForm: React.FC<StrategicObjectiveFormProps> = ({ open, onOpenChange, objective }) => {
  const { addStrategicObjective, updateStrategicObjective } = useHoshinStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const getInitialState = (): CharterData => ({
    objectiveTitle: objective?.title || '',
    objectiveOwner: objective?.owner || '',
    priority: objective?.priority || 'medium',
    status: objective?.status || 'planning',
    businessNeed: objective?.description || '',
    sponsor: (objective as any)?.sponsor || '',
    projectType: (objective as any)?.projectType || 'Process Efficiency',
    ticketSize: (objective as any)?.ticketSize || 'M',
    strategicTheme: (objective as any)?.strategicTheme || '',
    alignment: (objective as any)?.alignment || '',
    startDate: (objective as any)?.startDate || new Date().toISOString().split('T')[0],
    endDate: (objective as any)?.endDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    deliverables: (objective as any)?.deliverables || [''],
    assumptions: (objective as any)?.assumptions || [''],
    dependencies: (objective as any)?.dependencies || [''],
    budgetAllocated: (objective as any)?.budgetAllocated || 0,
    budgetCurrency: (objective as any)?.budgetCurrency || 'USD',
    milestones: (objective as any)?.milestones || [],
    teamMembers: (objective as any)?.teamMembers || [],
    approvers: (objective as any)?.approvers || [],
    risksAndIssues: (objective as any)?.risksAndIssues || [],
    performanceMetrics: (objective as any)?.performanceMetrics || [],
  });
  
  const [charterData, setCharterData] = useState<CharterData>(getInitialState());

  useEffect(() => {
    setCharterData(getInitialState());
    setErrors({});
  }, [objective, open]);

  const validateForm = (): boolean => { /* Validation logic here */ return true; };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const submissionData = {
      title: charterData.objectiveTitle,
      description: charterData.businessNeed,
      owner: charterData.objectiveOwner,
      priority: charterData.priority,
      status: charterData.status,
      targetYear: new Date(charterData.endDate).getFullYear(),
    };

    if (objective) {
      updateStrategicObjective(objective.id, submissionData);
    } else {
      addStrategicObjective(submissionData);
    }
    onOpenChange(false);
  };
  
  const handleAddItem = <K extends ArrayPropertyKeys<CharterData>>(listName: K, newItem: CharterData[K][number]) => {
      setCharterData(prev => ({ ...prev, [listName]: [...prev[listName], newItem] }));
  };
  const handleUpdateItem = <K extends ArrayPropertyKeys<CharterData>>(listName: K, index: number, field: keyof CharterData[K][number], value: any) => {
      const newList = [...charterData[listName]];
      // @ts-ignore - This is safe due to the generic constraints.
      newList[index] = { ...newList[index], [field]: value };
      setCharterData(prev => ({ ...prev, [listName]: newList }));
  };
  const handleRemoveItem = <K extends ArrayPropertyKeys<CharterData>>(listName: K, index: number) => {
      setCharterData(prev => ({ ...prev, [listName]: charterData[listName].filter((_, i) => i !== index) }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full p-0 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-800 text-white border-b border-slate-700 shrink-0">
          <div className="flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center"><Target className="w-7 h-7 text-white" /></div><div><h2 className="text-2xl font-bold">{objective ? 'Edit Strategic Objective' : 'New Strategic Objective Charter'}</h2><p className="text-slate-300 text-sm mt-1">A comprehensive plan for a high-level strategic initiative.</p></div></div><div className="hidden md:flex items-center gap-3"><Badge text={formatBadgeText(charterData.priority)} className={getBadgeStyle('priority', charterData.priority)} /><Badge text={formatBadgeText(charterData.status)} className={getBadgeStyle('status', charterData.status)} /><Badge text={charterData.projectType} className={getBadgeStyle('projectType', charterData.projectType)} /><Badge text={charterData.ticketSize} className={getBadgeStyle('ticketSize', charterData.ticketSize)} /></div></div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <div className="space-y-6">
            <CharterSection title="Basic Information" icon={<Target className="w-5 h-5"/>} description="High-level details and classification.">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     <FormField label="Objective Title" required><input type="text" value={charterData.objectiveTitle} onChange={(e) => setCharterData({...charterData, objectiveTitle: e.target.value})} className="h-11 px-4 w-full border border-slate-300 rounded-lg" /></FormField>
                    <FormField label="Objective Owner" required><input type="text" value={charterData.objectiveOwner} onChange={(e) => setCharterData({...charterData, objectiveOwner: e.target.value})} className="h-11 px-4 w-full border border-slate-300 rounded-lg" /></FormField>
                     <FormField label="Executive Sponsor"><input type="text" value={charterData.sponsor} onChange={(e) => setCharterData({...charterData, sponsor: e.target.value})} className="h-11 px-4 w-full border border-slate-300 rounded-lg" /></FormField>
                     <FormField label="Status"><select value={charterData.status} onChange={(e) => setCharterData({...charterData, status: e.target.value as CharterData['status']})} className="h-11 px-4 w-full border border-slate-300 rounded-lg bg-white"><option value="planning">Planning</option><option value="in-progress">In Progress</option><option value="at-risk">At Risk</option><option value="completed">Completed</option></select></FormField>
                     <FormField label="Start Date"><input type="date" value={charterData.startDate} onChange={(e) => setCharterData({...charterData, startDate: e.target.value})} className="h-11 px-4 w-full border border-slate-300 rounded-lg" /></FormField>
                     <FormField label="End Date"><input type="date" value={charterData.endDate} onChange={(e) => setCharterData({...charterData, endDate: e.target.value})} className="h-11 px-4 w-full border border-slate-300 rounded-lg" /></FormField>
                     <FormField label="Priority"><select value={charterData.priority} onChange={(e) => setCharterData({...charterData, priority: e.target.value as CharterData['priority']})} className="h-11 px-4 w-full border border-slate-300 rounded-lg bg-white"><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></FormField>
                     <FormField label="Project Type"><select value={charterData.projectType} onChange={(e) => setCharterData({...charterData, projectType: e.target.value as CharterData['projectType']})} className="h-11 px-4 w-full border border-slate-300 rounded-lg bg-white"><option>Process Efficiency</option><option>Cost Optimization</option><option>Process Quality</option><option>Tech Automation</option><option>Compliance</option><option>Marketing</option></select></FormField>
                </div>
            </CharterSection>

             <CharterSection title="Milestones Schedule" icon={<Calendar className="w-5 h-5"/>} description="Key checkpoints and dates for the objective's timeline.">
                 <div className="overflow-x-auto"><table className="w-full text-sm">
                    <thead className="bg-slate-100"><tr className="text-left text-slate-600">
                        <th className="p-3 font-semibold w-2/5">Milestone</th>
                        <th className="p-3 font-semibold">Target Date</th>
                        <th className="p-3 font-semibold">Actual Date</th>
                        <th className="p-3 font-semibold text-center">Action</th>
                    </tr></thead>
                    <tbody>{charterData.milestones.map((milestone, index) => (
                        <tr key={milestone.id || index} className="border-b border-slate-100">
                            <td className="p-2"><input type="text" value={milestone.description} placeholder="e.g., Complete UAT Testing" onChange={e => handleUpdateItem('milestones', index, 'description', e.target.value)} className="w-full h-10 px-2 border border-slate-200 rounded-md" /></td>
                            <td className="p-2"><input type="date" value={milestone.targetCompletionDate} onChange={e => handleUpdateItem('milestones', index, 'targetCompletionDate', e.target.value)} className="w-full h-10 px-2 border border-slate-200 rounded-md" /></td>
                            <td className="p-2"><input type="date" value={milestone.actualDate || ''} onChange={e => handleUpdateItem('milestones', index, 'actualDate', e.target.value)} className="w-full h-10 px-2 border border-slate-200 rounded-md" /></td>
                            <td className="p-2 text-center"><button type="button" onClick={() => handleRemoveItem('milestones', index)} className="p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4"/></button></td>
                        </tr>
                    ))}</tbody>
                 </table></div>
                 <button type="button" onClick={() => handleAddItem('milestones', {id: `m-${Date.now()}`, description: '', targetCompletionDate: charterData.endDate, actualDate: ''})} className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-blue-600 font-medium p-3 hover:bg-blue-50 rounded-lg border-2 border-dashed border-blue-200"><PlusCircle className="w-4 h-4"/> Add Milestone</button>
            </CharterSection>

            <CharterSection title="Key Performance Indicators (KPIs)" icon={<BarChart3 className="w-5 h-5"/>} description="Measurable values to track success against targets.">
                <div className="space-y-4">
                    {charterData.performanceMetrics.map((kpi, index) => (
                        <div key={kpi.id || index} className="p-4 bg-white border border-slate-200 rounded-lg">
                            <div className="flex justify-between items-center mb-4"><input type="text" value={kpi.name} placeholder="KPI Name (e.g., Customer Churn)" onChange={(e) => handleUpdateItem('performanceMetrics', index, 'name', e.target.value)} className="text-md font-semibold text-slate-700 outline-none bg-transparent w-full" /><button type="button" onClick={() => handleRemoveItem('performanceMetrics', index)} className="p-1 text-slate-400 hover:text-red-600 rounded-full"><Trash2 className="w-4 h-4"/></button></div>
                            <ProgressBar current={kpi.currentValue} target={kpi.targetValue} />
                            <div className="grid grid-cols-3 gap-4 pt-2">
                                <FormField label="Current"><input type="number" value={kpi.currentValue} onChange={(e) => handleUpdateItem('performanceMetrics', index, 'currentValue', parseFloat(e.target.value) || 0)} className="h-10 px-3 w-full border border-slate-300 rounded-lg" /></FormField>
                                <FormField label="Target"><input type="number" value={kpi.targetValue} onChange={(e) => handleUpdateItem('performanceMetrics', index, 'targetValue', parseFloat(e.target.value) || 0)} className="h-10 px-3 w-full border border-slate-300 rounded-lg" /></FormField>
                                <FormField label="Unit"><input type="text" value={kpi.unit} placeholder="e.g., %, $, users" onChange={(e) => handleUpdateItem('performanceMetrics', index, 'unit', e.target.value)} className="h-10 px-3 w-full border border-slate-300 rounded-lg" /></FormField>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddItem('performanceMetrics', {id: `kpi-${Date.now()}`, name: '', currentValue: 0, targetValue: 100, unit: '%'})} className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 font-medium p-3 hover:bg-blue-50 rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-300"><PlusCircle className="w-4 h-4"/> Add KPI</button>
                </div>
            </CharterSection>
            
            <CharterSection title="Risk Management" icon={<ShieldAlert className="w-5 h-5"/>} description="Potential risks, their impact, and mitigation plans.">
                <div className="space-y-4">
                     {charterData.risksAndIssues.map((risk, index) => (
                        <div key={risk.id || index} className="p-4 bg-white border border-slate-200 rounded-lg grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
                            <div className="lg:col-span-2"><FormField label="Risk / Issue Description"><textarea value={risk.description} onChange={e => handleUpdateItem('risksAndIssues', index, 'description', e.target.value)} rows={3} className="p-2 w-full text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500"></textarea></FormField></div>
                            <div className="lg:col-span-2"><FormField label="Mitigation Plan"><textarea value={risk.mitigation} onChange={e => handleUpdateItem('risksAndIssues', index, 'mitigation', e.target.value)} rows={3} className="p-2 w-full text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500"></textarea></FormField></div>
                            <div className="space-y-4">
                                <FormField label="Impact"><select value={risk.impact} onChange={e => handleUpdateItem('risksAndIssues', index, 'impact', e.target.value)} className="h-10 px-2 w-full text-sm border border-slate-300 rounded-lg bg-white"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></FormField>
                                <button type="button" onClick={() => handleRemoveItem('risksAndIssues', index)} className="w-full h-10 flex items-center justify-center gap-2 text-sm text-red-600 font-medium p-2 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200"><Trash2 className="w-4 h-4"/> Remove</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddItem('risksAndIssues', { id: `risk-${Date.now()}`, description: '', impact: 'medium', mitigation: '' })} className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 font-medium p-3 hover:bg-blue-50 rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-300"><PlusCircle className="w-4 h-4"/> Add Risk</button>
                </div>
            </CharterSection>

            <CharterSection title="Resources & Governance" icon={<Briefcase className="w-5 h-5"/>} description="Budget, team members, and approval committee.">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4 text-slate-500"/> Financials</h4>
                        <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-white">
                            <FormField label="Budget Currency"><select value={charterData.budgetCurrency} onChange={(e) => setCharterData({...charterData, budgetCurrency: e.target.value})} className="h-10 px-2 w-full border border-slate-300 rounded-md bg-white"><option>USD</option><option>NPR</option></select></FormField>
                            <FormField label="Budget Allocated"><input type="number" value={charterData.budgetAllocated} onChange={(e) => setCharterData({...charterData, budgetAllocated: parseFloat(e.target.value) || 0})} className="h-10 px-3 w-full border border-slate-300 rounded-md"/></FormField>
                        </div>
                    </div>
                     <div>
                         <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-slate-500"/> Approval Committee</h4>
                         <div className="space-y-2">{charterData.approvers.map((approver, index) => (
                             <div key={approver.id || index} className="flex gap-2 items-center">
                                <input type="text" value={approver.role} placeholder="Role (e.g., Finance Head)" onChange={e => handleUpdateItem('approvers', index, 'role', e.target.value)} className="w-1/2 h-10 px-2 border border-slate-200 rounded-md" />
                                <input type="text" value={approver.name} placeholder="Approver Name" onChange={e => handleUpdateItem('approvers', index, 'name', e.target.value)} className="flex-1 h-10 px-2 border border-slate-200 rounded-md" />
                                <button type="button" onClick={() => handleRemoveItem('approvers', index)} className="p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50"><Trash2 className="w-4 h-4"/></button>
                             </div>
                         ))}</div>
                         <button type="button" onClick={() => handleAddItem('approvers', {id: `a-${Date.now()}`, role: '', name: ''})} className="w-full mt-2 flex items-center justify-center gap-2 text-sm text-blue-600 font-medium p-2 hover:bg-blue-50 rounded-lg border-2 border-dashed border-blue-200"><PlusCircle className="w-4 h-4"/> Add Approver</button>
                    </div>
                </div>
            </CharterSection>

          </div>
        </form>
        
        {/* Footer */}
        <div className="flex gap-4 p-4 border-t border-slate-200 bg-white justify-end shrink-0">
            <button type="button" onClick={() => onOpenChange(false)} className="h-11 px-6 font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
            <button type="button" onClick={handleSubmit} className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg flex items-center gap-2">
              <Zap className="w-4 h-4"/>{objective ? 'Update Objective' : 'Save Objective'}
            </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StrategicObjectiveForm;