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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {objective ? 'Edit Strategic Objective' : 'Add Strategic Objective'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="targetYear" className="block text-sm font-medium mb-1">
                Target Year
              </label>
              <Input
                id="targetYear"
                type="number"
                value={formData.targetYear}
                onChange={(e) => setFormData({ ...formData, targetYear: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <label htmlFor="owner" className="block text-sm font-medium mb-1">
                Owner
              </label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status
              </label>
              <Select
                id="status"
                value={formData.status}
              

                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFormData({ ...formData, status: e.target.value as StrategicObjective['status'] })
                }
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="at-risk">At Risk</option>
              </Select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Priority
              </label>
              <Select
                id="priority"
                value={formData.priority}
               

                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFormData({ ...formData, priority: e.target.value as StrategicObjective['priority'] })
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">
              {objective ? 'Update' : 'Add'} Objective
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StrategicObjectiveForm;