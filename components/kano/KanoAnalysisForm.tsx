'use client';

import React, { useState } from 'react';
import { CompanyKanoAnalysis } from '@/types/hoshin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface KanoAnalysisFormProps {
    initialData?: Partial<CompanyKanoAnalysis>;
    onSubmit: (data: Omit<CompanyKanoAnalysis, 'id' | 'features' | 'overallScore' | 'strengthAreas' | 'weaknessAreas' | 'analysisDate'>) => void;
    onCancel: () => void;
}

export const KanoAnalysisForm: React.FC<KanoAnalysisFormProps> = ({
    initialData,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState({
        companyName: initialData?.companyName || '',
        companyType: initialData?.companyType || 'competitor' as const,
        industry: initialData?.industry || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g., Acme Corp"
                    required
                />
            </div>

            <div>
                <Label htmlFor="companyType">Type</Label>
                <select
                    id="companyType"
                    value={formData.companyType}
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value as 'self' | 'competitor' })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="self">My Company</option>
                    <option value="competitor">Competitor</option>
                </select>
            </div>

            <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g., SaaS, Automotive"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    {initialData ? 'Update Analysis' : 'Create Analysis'}
                </Button>
            </div>
        </form>
    );
};
