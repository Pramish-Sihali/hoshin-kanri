'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CompanyKanoAnalysis } from '@/types/hoshin';

interface KanoComparisonChartProps {
    companies: CompanyKanoAnalysis[];
}

export const KanoComparisonChart: React.FC<KanoComparisonChartProps> = ({ companies }) => {
    // Aggregate data for the chart: Count of features per category per company
    const categories = ['basic', 'performance', 'excitement', 'indifferent'];

    const data = categories.map(category => {
        const dataPoint: { [key: string]: string | number } = { name: category.charAt(0).toUpperCase() + category.slice(1) };

        companies.forEach(company => {
            dataPoint[company.companyName] = company.features.filter(f => f.category === category).length;
        });

        return dataPoint;
    });

    const colors = ['#0d9488', '#f59e0b', '#6366f1']; // teal, amber, indigo

    return (
        <div className="h-[400px] w-full bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-6">Feature Composition Comparison</h3>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f1f5f9' }}
                    />
                    <Legend />

                    {companies.map((company, index) => (
                        <Bar
                            key={company.id}
                            dataKey={company.companyName}
                            fill={colors[index % colors.length]}
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
