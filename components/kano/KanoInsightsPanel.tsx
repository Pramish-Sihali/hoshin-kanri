'use client';

import React, { useMemo } from 'react';
import { KanoInsight } from '@/types/hoshin';
import { AlertTriangle, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface KanoInsightsPanelProps {
    insights: KanoInsight[];
}

export const KanoInsightsPanel: React.FC<KanoInsightsPanelProps> = ({ insights }) => {
    // Sort insights: High priority first
    const sortedInsights = useMemo(() => {
        return [...insights].sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }, [insights]);

    if (insights.length === 0) {
        return (
            <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <p className="text-slate-500">No specific insights generated yet. Add more data to compare.</p>
            </div>
        );
    }

    const getIcon = (type: KanoInsight['type']) => {
        switch (type) {
            case 'opportunity': return <Zap className="w-5 h-5 text-amber-500" />;
            case 'threat': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case 'strength': return <ShieldCheck className="w-5 h-5 text-green-500" />;
            case 'weakness': return <TrendingUp className="w-5 h-5 text-orange-500" />; // Needs improvement icons
        }
    };

    const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
        switch (priority) {
            case 'high': return 'bg-red-50 text-red-700 border-red-100';
            case 'medium': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'low': return 'bg-blue-50 text-blue-700 border-blue-100';
        }
    };

    return (
        <div className="space-y-4">
            {sortedInsights.map((insight, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                    <div className="mt-1 flex-shrink-0 bg-slate-50 p-2 rounded-lg h-fit">
                        {getIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-slate-800">{insight.title}</h4>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(insight.priority)}`}>
                                {insight.priority} Priority
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{insight.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
