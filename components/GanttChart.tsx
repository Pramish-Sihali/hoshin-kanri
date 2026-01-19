'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHoshinStore } from '@/store/hoshinStore';

export function GanttChart() {
    const { gantt } = useHoshinStore();

    if (!gantt || gantt.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Strategic Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        No roadmap data available for this plan.
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Extract all unique periods from the first item to build the header
    const periods = gantt[0].timeline.map(t => t.period);

    const getCategoryColor = (category?: string) => {
        switch (category?.toLowerCase()) {
            case 'financial': return 'bg-emerald-500 hover:bg-emerald-600';
            case 'customer': return 'bg-blue-500 hover:bg-blue-600';
            case 'process': return 'bg-orange-500 hover:bg-orange-600';
            case 'people': return 'bg-purple-500 hover:bg-purple-600';
            case 'technology': return 'bg-cyan-500 hover:bg-cyan-600';
            case 'governance': return 'bg-slate-500 hover:bg-slate-600';
            default: return 'bg-primary/80 hover:bg-primary';
        }
    };

    return (
        <Card className="w-full overflow-hidden border-4 shadow-lg">
            <CardHeader>
                <CardTitle>Strategic Implementation Roadmap (5-Year View)</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* Header Row */}
                    <div className="grid grid-cols-[250px_1fr] gap-4 border-b pb-2 mb-2 font-semibold">
                        <div className="text-sm uppercase tracking-wider text-muted-foreground">Initiative</div>
                        <div className="grid grid-cols-10 gap-1 text-center">
                            {periods.map((period, index) => (
                                <div key={index} className="text-xs text-muted-foreground">{period}</div>
                            ))}
                        </div>
                    </div>

                    {/* Data Rows */}
                    <div className="space-y-3">
                        {gantt.map((item) => (
                            <div key={item.id} className="grid grid-cols-[250px_1fr] gap-4 items-center group">
                                <div className="pr-4">
                                    <div className="text-sm font-medium truncate" title={item.initiative}>
                                        {item.initiative}
                                    </div>
                                    {item.category && (
                                        <div className="text-xs text-muted-foreground capitalize">
                                            {item.category}
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-10 gap-1 h-8">
                                    {item.timeline.map((time, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-sm transition-all duration-200 ${time.active
                                                ? `${getCategoryColor(item.category)} shadow-sm`
                                                : 'bg-muted/30 group-hover:bg-muted/50'
                                                }`}
                                            title={`${item.initiative} - ${time.period}: ${time.active ? 'Active' : 'Inactive'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                                <span>Financial</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                                <span>Customer</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div>
                                <span>Technology</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                                <span>Process/Ecosystem</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                                <span>People</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-3 h-3 bg-muted/30 rounded-sm border border-slate-200"></div>
                            <span>Inactive Phase</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
