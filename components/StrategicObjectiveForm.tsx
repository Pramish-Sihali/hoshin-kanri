// components/StrategicObjectiveForm.tsx
'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { StrategicObjective } from '../types/hoshin';
import { Target, Calendar, User, Flag, AlertCircle } from 'lucide-react';

interface StrategicObjectiveFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  objective?: StrategicObjective;
}

const StrategicObjectiveForm: React.FC<StrategicObjectiveFormProps> = ({
  open,
  onOpenChange,
  objective
}) => {
  const { addStrategicObjective, updateStrategicObjective } = useHoshinStore();
  const [formData, setFormData] = useState({
    title: objective?.title || '',
    description: objective?.description || '',
    targetYear: objective?.targetYear || new Date().getFullYear() + 3,
    owner: objective?.owner || '',
    status: objective?.status || 'planning' as const,
    priority: objective?.priority || 'medium' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (objective) {
      updateStrategicObjective(objective.id, formData);
    } else {
      addStrategicObjective(formData);
    }
    onOpenChange(false);
    setFormData({
      title: '',
      description: '',
      targetYear: new Date().getFullYear() + 3,
      owner: '',
      status: 'planning',
      priority: 'medium'
    });
  };

  const statusOptions = [
    { value: 'planning', label: 'Planning', icon: '📋' },
    { value: 'in-progress', label: 'In Progress', icon: '🔄' },
    { value: 'completed', label: 'Completed', icon: '✅' },
    { value: 'at-risk', label: 'At Risk', icon: '⚠️' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High Priority', icon: '🔴' },
    { value: 'medium', label: 'Medium Priority', icon: '🟡' },
    { value: 'low', label: 'Low Priority', icon: '🟢' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {objective ? 'Edit Strategic Objective' : 'Add Strategic Objective'}
                </div>
                <div className="text-sm text-slate-500 font-normal">
                  {objective ? 'Update your strategic objective details' : 'Define a new long-term strategic goal'}
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Target className="w-4 h-4 text-teal-600" />
              Objective Title
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a clear, measurable objective title"
              className="h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <AlertCircle className="w-4 h-4 text-teal-600" />
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed context, rationale, and expected outcomes"
              className="min-h-24 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="targetYear" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calendar className="w-4 h-4 text-teal-600" />
                Target Year
              </label>
              <Input
                id="targetYear"
                type="number"
                value={formData.targetYear}
                onChange={(e) => setFormData({ ...formData, targetYear: parseInt(e.target.value) })}
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 10}
                className="h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="owner" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <User className="w-4 h-4 text-teal-600" />
                Owner
              </label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="Responsible person or team"
                className="h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="status" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Flag className="w-4 h-4 text-teal-600" />
                Current Status
              </label>
              <Select
                id="status"
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value as StrategicObjective['status'] })}
                options={statusOptions}
                className="h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                placeholder="Select current status"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="priority" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <AlertCircle className="w-4 h-4 text-teal-600" />
                Priority Level
              </label>
              <Select
                id="priority"
                value={formData.priority}
                onChange={(value) => setFormData({ ...formData, priority: value as StrategicObjective['priority'] })}
                options={priorityOptions}
                className="h-12 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                placeholder="Select priority level"
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-6 border-t border-slate-200">
            <Button 
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {objective ? 'Update Objective' : 'Add Objective'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 border-slate-200 hover:bg-slate-50 font-semibold rounded-xl transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StrategicObjectiveForm;