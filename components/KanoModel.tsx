'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useHoshinStore, generateInsights } from '@/store/hoshinStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Plus, Trash2, Download, BarChart2, Table } from 'lucide-react';
import { CompanyKanoAnalysis, KanoFeature, KanoComparison } from '@/types/hoshin';

import { KanoMatrix } from './kano/KanoMatrix';
import { KanoFeatureCard } from './kano/KanoFeatureCard';
import { KanoFeatureForm } from './kano/KanoFeatureForm';
import { KanoAnalysisForm } from './kano/KanoAnalysisForm';
import { KanoComparisonChart } from './kano/KanoComparisonChart';
import { KanoInsightsPanel } from './kano/KanoInsightsPanel';

const KanoModel: React.FC = () => {
    const { kanoAnalyses, activeComparison, addKanoAnalysis, updateKanoAnalysis, deleteKanoAnalysis, addFeatureToAnalysis, updateFeature, deleteFeature, setActiveComparison, loadDefaultKanoData, hasKanoData } = useHoshinStore();

    const [activeTab, setActiveTab] = useState('kano-analysis');
    const [selectedAnalysisId, setSelectedAnalysisId] = useState<string>('');

    // UI State
    const [isAnalysisFormOpen, setIsAnalysisFormOpen] = useState(false);
    const [editingAnalysis, setEditingAnalysis] = useState<CompanyKanoAnalysis | null>(null);
    const [isFeatureFormOpen, setIsFeatureFormOpen] = useState(false);
    const [editingFeature, setEditingFeature] = useState<KanoFeature | null>(null);

    // Comparison State
    const [compSelfId, setCompSelfId] = useState<string>('');
    const [comp1Id, setComp1Id] = useState<string>('');
    const [comp2Id, setComp2Id] = useState<string>('');

    const selectedAnalysis = useMemo(() =>
        kanoAnalyses.find(a => a.id === selectedAnalysisId) || null
        , [selectedAnalysisId, kanoAnalyses]);

    // Auto-load default Kano data if empty
    useEffect(() => {
        if (!hasKanoData()) {
            loadDefaultKanoData();
        }
    }, [hasKanoData, loadDefaultKanoData]);

    // Set default selection if exists
    useEffect(() => {
        if (!selectedAnalysisId && kanoAnalyses.length > 0) {
            setSelectedAnalysisId(kanoAnalyses[0].id);
        }
    }, [kanoAnalyses, selectedAnalysisId]);

    // Filter lists
    const myCompanies = kanoAnalyses.filter(a => a.companyType === 'self');
    const otherCompanies = kanoAnalyses.filter(a => a.companyType === 'competitor');

    // Handlers
    const handleSaveAnalysis = (data: Omit<CompanyKanoAnalysis, 'id' | 'features' | 'overallScore' | 'strengthAreas' | 'weaknessAreas' | 'analysisDate'>) => {
        if (editingAnalysis) {
            updateKanoAnalysis(editingAnalysis.id, data);
        } else {
            addKanoAnalysis({
                ...data,
                features: [],
                overallScore: 0,
                strengthAreas: [],
                weaknessAreas: [],
                analysisDate: new Date().toISOString()
            });
        }
        setIsAnalysisFormOpen(false);
        setEditingAnalysis(null);
    };

    const handleSaveFeature = (data: Omit<KanoFeature, 'id' | 'createdAt' | 'updatedAt' | 'satisfactionImpact' | 'category'>) => {
        if (selectedAnalysisId) {
            if (editingFeature) {
                updateFeature(selectedAnalysisId, editingFeature.id, data);
            } else {
                addFeatureToAnalysis(selectedAnalysisId, data);
            }
            setIsFeatureFormOpen(false);
            setEditingFeature(null);
        }
    };

    const handleDeleteAnalysis = (id: string | undefined) => {
        if (!id) return;
        if (confirm('Are you sure you want to delete this analysis?')) {
            deleteKanoAnalysis(id);
            if (selectedAnalysisId === id) setSelectedAnalysisId('');
        }
    };

    const generateComparison = () => {
        const self = kanoAnalyses.find(a => a.id === compSelfId);
        if (!self) return;

        const competitors = kanoAnalyses.filter(a => a.id === comp1Id || a.id === comp2Id);

        const comparisonData: KanoComparison = {
            id: crypto.randomUUID(),
            selfCompany: self,
            competitors: competitors,
            insights: [], // Will be filled
            createdAt: new Date().toISOString()
        };

        comparisonData.insights = generateInsights(comparisonData);
        setActiveComparison(comparisonData);
    };

    return (
        <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                        Kano Model Analysis
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Categorize features by customer satisfaction and compare against competitors.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => { setEditingAnalysis(null); setIsAnalysisFormOpen(true); }}>
                        <Plus className="w-4 h-4 mr-2" /> New Analysis
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="kano-analysis">Feature Analysis</TabsTrigger>
                    <TabsTrigger value="comparison">Competitive Landscape</TabsTrigger>
                </TabsList>

                <TabsContent value="kano-analysis" className="space-y-6">
                    {/* Analysis Selector Header */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="w-full md:w-1/3">
                            <Select
                                value={selectedAnalysisId}
                                onChange={setSelectedAnalysisId}
                                placeholder="Select Company / Product"
                                options={kanoAnalyses.map(a => ({
                                    value: a.id,
                                    label: `${a.companyName} (${a.companyType === 'self' ? 'My Company' : 'Competitor'})`
                                }))}
                            />
                        </div>

                        {selectedAnalysis && (
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => { setEditingAnalysis(selectedAnalysis); setIsAnalysisFormOpen(true); }}>
                                    Edit Details
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteAnalysis(selectedAnalysis?.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {selectedAnalysis ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: List */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                        <Table className="w-5 h-5 text-slate-500" />
                                        Feature List ({selectedAnalysis.features.length})
                                    </h3>
                                    <Button size="sm" onClick={() => { setEditingFeature(null); setIsFeatureFormOpen(true); }}>
                                        <Plus className="w-4 h-4 mr-1" /> Add Feature
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2">
                                    {selectedAnalysis.features.map(feature => (
                                        <KanoFeatureCard
                                            key={feature.id}
                                            feature={feature}
                                            onEdit={() => { setEditingFeature(feature); setIsFeatureFormOpen(true); }}
                                            onDelete={(fid) => deleteFeature(selectedAnalysis.id, fid)}
                                        />
                                    ))}
                                    {selectedAnalysis.features.length === 0 && (
                                        <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                            <p className="text-slate-500">No features added yet.</p>
                                            <Button variant="link" onClick={() => setIsFeatureFormOpen(true)}>Add your first feature</Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Matrix */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                    <BarChart2 className="w-5 h-5 text-slate-500" />
                                    Analysis Matrix
                                </h3>
                                <KanoMatrix features={selectedAnalysis.features} />

                                <div className="mt-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
                                    <h4 className="font-medium text-teal-800 mb-2">Matrix Analysis</h4>
                                    <ul className="text-sm text-teal-700 space-y-1 list-disc pl-4">
                                        <li><strong>Excitement:</strong> Delighters. High priority for differentiation.</li>
                                        <li><strong>Performance:</strong> Linear features. More is better. Competitive battleground.</li>
                                        <li><strong>Basic:</strong> Must-haves. Entry cost. Don't over-engineer.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-medium text-slate-600">Select or create an analysis to begin</h3>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="comparison" className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                        <h3 className="font-bold text-lg text-slate-800">Setup Comparison</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-700">My Company</span>
                                <Select
                                    value={compSelfId}
                                    onChange={setCompSelfId}
                                    placeholder="Select us..."
                                    options={myCompanies.map(c => ({ value: c.id, label: c.companyName }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-700">Competitor A</span>
                                <Select
                                    value={comp1Id}
                                    onChange={setComp1Id}
                                    placeholder="Select..."
                                    options={otherCompanies.filter(c => c.id !== comp2Id).map(c => ({ value: c.id, label: c.companyName }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-700">Competitor B (Optional)</span>
                                <Select
                                    value={comp2Id}
                                    onChange={setComp2Id}
                                    placeholder="Select..."
                                    options={otherCompanies.filter(c => c.id !== comp1Id).map(c => ({ value: c.id, label: c.companyName }))}
                                />
                            </div>
                            <Button onClick={generateComparison} disabled={!compSelfId || !comp1Id} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                Generate Insights
                            </Button>
                        </div>
                    </div>

                    {activeComparison && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-slate-800">Competitive Landscape</h3>
                                <KanoComparisonChart companies={[activeComparison.selfCompany, ...activeComparison.competitors]} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-slate-800 flex items-center justify-between">
                                    <span>Strategic Insights</span>
                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{activeComparison.insights.length} Found</span>
                                </h3>
                                <div className="max-h-[500px] overflow-y-auto pr-2">
                                    <KanoInsightsPanel insights={activeComparison.insights} />
                                </div>
                            </div>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Forms Overlay */}
            {isAnalysisFormOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold mb-4">{editingAnalysis ? 'Edit Analysis' : 'New Company Analysis'}</h2>
                        <KanoAnalysisForm
                            initialData={editingAnalysis || {}}
                            onSubmit={handleSaveAnalysis}
                            onCancel={() => setIsAnalysisFormOpen(false)}
                        />
                    </div>
                </div>
            )}

            {isFeatureFormOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold mb-4">{editingFeature ? 'Edit Feature' : 'Add New Feature'}</h2>
                        <KanoFeatureForm
                            initialData={editingFeature || {}}
                            onSubmit={handleSaveFeature}
                            onCancel={() => setIsFeatureFormOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default KanoModel;
