'use client';

import React, { useState, useEffect } from 'react';
import { KanoFeature } from '@/types/hoshin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { categorizeFeature } from '@/store/hoshinStore';
import { KanoCategoryBadge } from './KanoCategoryBadge';

interface KanoFeatureFormProps {
    initialData?: Partial<KanoFeature>;
    onSubmit: (data: Omit<KanoFeature, 'id' | 'createdAt' | 'updatedAt' | 'satisfactionImpact' | 'category'>) => void;
    onCancel: () => void;
}

export const KanoFeatureForm: React.FC<KanoFeatureFormProps> = ({
    initialData,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        functionalScore: initialData?.functionalScore || 0,
        dysfunctionalScore: initialData?.dysfunctionalScore || 0,
        importance: initialData?.importance || 3
    });

    const [previewCategory, setPreviewCategory] = useState(
        categorizeFeature(formData.functionalScore, formData.dysfunctionalScore)
    );

    useEffect(() => {
        setPreviewCategory(
            categorizeFeature(formData.functionalScore, formData.dysfunctionalScore)
        );
    }, [formData.functionalScore, formData.dysfunctionalScore]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Feature Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Dark Mode"
                        required
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of the feature..."
                        className="mt-1"
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="space-y-4">
                        <div>
                            <Label className="text-slate-700">Functional Question</Label>
                            <p className="text-xs text-slate-500 mb-2">How do you feel if the feature is PRESENT?</p>
                            <input
                                type="range"
                                min="-2"
                                max="2"
                                step="1"
                                value={formData.functionalScore}
                                onChange={(e) => setFormData({ ...formData, functionalScore: parseInt(e.target.value) })}
                                className="w-full accent-teal-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>Dislike (-2)</span>
                                <span>Neutral (0)</span>
                                <span>Like (+2)</span>
                            </div>
                            <div className="text-center font-medium text-teal-700 mt-1">
                                Current: {formData.functionalScore}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-slate-700">Dysfunctional Question</Label>
                            <p className="text-xs text-slate-500 mb-2">How do you feel if the feature is ABSENT?</p>
                            <input
                                type="range"
                                min="-2"
                                max="2"
                                step="1"
                                value={formData.dysfunctionalScore}
                                onChange={(e) => setFormData({ ...formData, dysfunctionalScore: parseInt(e.target.value) })}
                                className="w-full accent-red-500"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>Like (+2)</span>
                                <span>Neutral (0)</span>
                                <span>Dislike (-2)</span>
                            </div>
                            <div className="text-center font-medium text-red-600 mt-1">
                                Current: {formData.dysfunctionalScore}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div>
                        <Label className="block mb-1">Resulting Category</Label>
                        <KanoCategoryBadge category={previewCategory} size="lg" />
                    </div>

                    <div className="w-1/3">
                        <Label htmlFor="importance" className="block mb-2">Importance (1-5)</Label>
                        <div className="flex items-center gap-3">
                            <input
                                id="importance"
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                value={formData.importance}
                                onChange={(e) => setFormData({ ...formData, importance: parseInt(e.target.value) })}
                                className="flex-1 accent-indigo-600"
                            />
                            <span className="font-bold text-indigo-700 w-6 text-center">{formData.importance}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
                    {initialData ? 'Update Feature' : 'Add Feature'}
                </Button>
            </div>
        </form>
    );
};
