'use client';

import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import { KanoFeature } from '@/types/hoshin';

interface KanoMatrixProps {
    features: KanoFeature[];
}

export const KanoMatrix: React.FC<KanoMatrixProps> = ({ features }) => {
    const data = features.map(f => ({
        x: f.dysfunctionalScore,
        y: f.functionalScore,
        z: f.importance, // Size bubble by importance
        name: f.name,
        category: f.category
    }));

    const categoryColors = {
        basic: '#3b82f6',        // blue-500
        performance: '#22c55e',  // green-500
        excitement: '#a855f7',   // purple-500
        indifferent: '#94a3b8',  // slate-400
        reverse: '#ef4444'       // red-500
    };

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm">
                    <p className="font-semibold text-slate-800">{data.name}</p>
                    <p className="text-slate-500 capitalize">{data.category}</p>
                    <div className="mt-1 text-xs text-slate-400">
                        Func: {data.y}, Dysfunc: {data.x}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-[400px] w-full bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative">
            <h3 className="font-bold text-slate-700 mb-4 text-center">Kano Evaluation Matrix</h3>

            {/* Matrix Background Labels */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-0 opacity-10">
                <div className="grid grid-cols-2 grid-rows-2 w-[80%] h-[70%]">
                    <div className="border-r border-b border-slate-400 flex items-center justify-center font-black text-2xl">REVERSE</div>
                    <div className="border-b border-slate-400 flex items-center justify-center font-black text-2xl">PERFORMANCE</div>
                    <div className="border-r border-slate-400 flex items-center justify-center font-black text-2xl">INDIFFERENT</div>
                    <div className="flex items-center justify-center font-black text-2xl">EXCITEMENT</div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis
                        type="number"
                        dataKey="x"
                        name="Dysfunctional"
                        domain={[-2.5, 2.5]}
                        tickCount={5}
                        label={{ value: 'Dysfunctional (Feature Absent)', position: 'bottom', offset: 0 }}
                    />
                    <YAxis
                        type="number"
                        dataKey="y"
                        name="Functional"
                        domain={[-2.5, 2.5]}
                        tickCount={5}
                        label={{ value: 'Functional (Feature Present)', angle: -90, position: 'left' }}
                    />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Importance" />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

                    <ReferenceLine x={0} stroke="#cbd5e1" />
                    <ReferenceLine y={0} stroke="#cbd5e1" />

                    <Scatter name="Features" data={data} fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={categoryColors[entry.category] || '#94a3b8'} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};
