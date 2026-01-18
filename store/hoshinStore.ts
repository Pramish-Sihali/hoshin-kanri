// store/hoshinStore.ts
import { HoshinData, StrategicObjective, AnnualObjective, Process, Metric, CatchballItem, CompanyKanoAnalysis, KanoComparison, KanoFeature, KanoInsight, KanoCategory } from '@/types/hoshin';
import { availableDatasets, DatasetOption, allKanoAnalyses } from '@/lib/dummyData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HoshinStore extends HoshinData {
  // Current dataset tracking
  currentDatasetId: string | null;

  // Dataset management
  availableDatasets: DatasetOption[];
  loadDataset: (datasetId: string) => void;
  getCurrentDatasetName: () => string;

  // Individual item management
  addStrategicObjective: (objective: Omit<StrategicObjective, 'id'>) => void;
  updateStrategicObjective: (id: string, objective: Partial<StrategicObjective>) => void;
  deleteStrategicObjective: (id: string) => void;

  addAnnualObjective: (objective: Omit<AnnualObjective, 'id'>) => void;
  updateAnnualObjective: (id: string, objective: Partial<AnnualObjective>) => void;
  deleteAnnualObjective: (id: string) => void;

  addProcess: (process: Omit<Process, 'id'>) => void;
  updateProcess: (id: string, process: Partial<Process>) => void;
  deleteProcess: (id: string) => void;

  addMetric: (metric: Omit<Metric, 'id'>) => void;
  updateMetric: (id: string, metric: Partial<Metric>) => void;
  deleteMetric: (id: string) => void;

  addCatchballItem: (item: Omit<CatchballItem, 'id'>) => void;
  updateCatchballItem: (id: string, item: Partial<CatchballItem>) => void;
  addCatchballResponse: (itemId: string, response: Omit<CatchballItem['responses'][0], 'id'>) => void;

  // Kano Model state
  kanoAnalyses: CompanyKanoAnalysis[];
  activeComparison: KanoComparison | null;

  // Kano CRUD methods
  addKanoAnalysis: (analysis: Omit<CompanyKanoAnalysis, 'id'>) => void;
  updateKanoAnalysis: (id: string, updates: Partial<CompanyKanoAnalysis>) => void;
  deleteKanoAnalysis: (id: string) => void;

  // Kano Feature methods
  addFeatureToAnalysis: (analysisId: string, feature: Omit<KanoFeature, 'id' | 'createdAt' | 'updatedAt' | 'satisfactionImpact' | 'category'>) => void;
  updateFeature: (analysisId: string, featureId: string, updates: Partial<KanoFeature>) => void;
  deleteFeature: (analysisId: string, featureId: string) => void;

  // Kano Comparison methods
  setActiveComparison: (comparison: KanoComparison | null) => void;

  // Kano data initialization
  loadDefaultKanoData: () => void;
  hasKanoData: () => boolean;

  // Bulk operations
  loadDummyData: (data: HoshinData) => void; // Legacy support
  clearAllData: () => void;
  hasDummyData: () => boolean;
}

export const useHoshinStore = create<HoshinStore>()(
  persist(
    (set, get) => ({
      // Initial state
      strategicObjectives: [],
      annualObjectives: [],
      processes: [],
      metrics: [],
      catchball: [],
      kanoAnalyses: [],
      activeComparison: null,
      currentDatasetId: null,
      availableDatasets: availableDatasets,

      // Dataset management
      loadDataset: (datasetId: string) => {
        const dataset = availableDatasets.find((d: { id: string; }) => d.id === datasetId);
        if (dataset) {
          // Also load Kano data if not already present
          const state = get();
          const shouldLoadKano = state.kanoAnalyses.length === 0;

          set(() => ({
            strategicObjectives: [...dataset.data.strategicObjectives],
            annualObjectives: [...dataset.data.annualObjectives],
            processes: [...dataset.data.processes],
            metrics: [...dataset.data.metrics],
            catchball: [...dataset.data.catchball],
            currentDatasetId: datasetId,
            ...(shouldLoadKano ? { kanoAnalyses: [...allKanoAnalyses] } : {})
          }));
        }
      },

      getCurrentDatasetName: () => {
        const state = get();
        if (!state.currentDatasetId) return '';
        const dataset = state.availableDatasets.find(d => d.id === state.currentDatasetId);
        return dataset ? dataset.name : '';
      },

      // Individual item management
      addStrategicObjective: (objective) =>
        set((state) => ({
          strategicObjectives: [
            ...state.strategicObjectives,
            { ...objective, id: crypto.randomUUID() }
          ],
          currentDatasetId: null // Mark as custom data
        })),

      updateStrategicObjective: (id, objective) =>
        set((state) => ({
          strategicObjectives: state.strategicObjectives.map((item) =>
            item.id === id ? { ...item, ...objective } : item
          ),
          currentDatasetId: null // Mark as custom data
        })),

      deleteStrategicObjective: (id) =>
        set((state) => ({
          strategicObjectives: state.strategicObjectives.filter((item) => item.id !== id),
          currentDatasetId: null // Mark as custom data
        })),

      addAnnualObjective: (objective) =>
        set((state) => ({
          annualObjectives: [
            ...state.annualObjectives,
            { ...objective, id: crypto.randomUUID() }
          ],
          currentDatasetId: null // Mark as custom data
        })),

      updateAnnualObjective: (id, objective) =>
        set((state) => ({
          annualObjectives: state.annualObjectives.map((item) =>
            item.id === id ? { ...item, ...objective } : item
          ),
          currentDatasetId: null // Mark as custom data
        })),

      deleteAnnualObjective: (id) =>
        set((state) => ({
          annualObjectives: state.annualObjectives.filter((item) => item.id !== id),
          currentDatasetId: null // Mark as custom data
        })),

      addProcess: (process) =>
        set((state) => ({
          processes: [
            ...state.processes,
            { ...process, id: crypto.randomUUID() }
          ],
          currentDatasetId: null // Mark as custom data
        })),

      updateProcess: (id, process) =>
        set((state) => ({
          processes: state.processes.map((item) =>
            item.id === id ? { ...item, ...process } : item
          ),
          currentDatasetId: null // Mark as custom data
        })),

      deleteProcess: (id) =>
        set((state) => ({
          processes: state.processes.filter((item) => item.id !== id),
          currentDatasetId: null // Mark as custom data
        })),

      addMetric: (metric) =>
        set((state) => ({
          metrics: [
            ...state.metrics,
            { ...metric, id: crypto.randomUUID() }
          ],
          currentDatasetId: null // Mark as custom data
        })),

      updateMetric: (id, metric) =>
        set((state) => ({
          metrics: state.metrics.map((item) =>
            item.id === id ? { ...item, ...metric } : item
          ),
          currentDatasetId: null // Mark as custom data
        })),

      deleteMetric: (id) =>
        set((state) => ({
          metrics: state.metrics.filter((item) => item.id !== id),
          currentDatasetId: null // Mark as custom data
        })),

      addCatchballItem: (item) =>
        set((state) => ({
          catchball: [
            ...state.catchball,
            { ...item, id: crypto.randomUUID() }
          ],
          currentDatasetId: null // Mark as custom data
        })),

      updateCatchballItem: (id, item) =>
        set((state) => ({
          catchball: state.catchball.map((catchballItem) =>
            catchballItem.id === id ? { ...catchballItem, ...item } : catchballItem
          ),
          currentDatasetId: null // Mark as custom data
        })),

      addCatchballResponse: (itemId, response) =>
        set((state) => ({
          catchball: state.catchball.map((item) =>
            item.id === itemId
              ? {
                ...item,
                responses: [
                  ...item.responses,
                  { ...response, id: crypto.randomUUID() }
                ]
              }
              : item
          ),
          currentDatasetId: null // Mark as custom data
        })),



      // Kano Model Implementation
      addKanoAnalysis: (analysis) =>
        set((state) => ({
          kanoAnalyses: [
            ...state.kanoAnalyses,
            { ...analysis, id: crypto.randomUUID() }
          ]
        })),

      updateKanoAnalysis: (id, updates) =>
        set((state) => ({
          kanoAnalyses: state.kanoAnalyses.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          )
        })),

      deleteKanoAnalysis: (id) =>
        set((state) => ({
          kanoAnalyses: state.kanoAnalyses.filter((item) => item.id !== id)
        })),

      addFeatureToAnalysis: (analysisId, featureData) => {
        const category = categorizeFeature(featureData.functionalScore, featureData.dysfunctionalScore);
        const satisfactionImpact = calculateSatisfactionImpact({ ...featureData, category });

        const newFeature: KanoFeature = {
          ...featureData,
          id: crypto.randomUUID(),
          category,
          satisfactionImpact,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          kanoAnalyses: state.kanoAnalyses.map((analysis) =>
            analysis.id === analysisId
              ? { ...analysis, features: [...analysis.features, newFeature] }
              : analysis
          )
        }));
      },

      updateFeature: (analysisId, featureId, updates) =>
        set((state) => ({
          kanoAnalyses: state.kanoAnalyses.map((analysis) => {
            if (analysis.id !== analysisId) return analysis;

            const updatedFeatures = analysis.features.map((feature) => {
              if (feature.id !== featureId) return feature;

              const updatedFeature = { ...feature, ...updates, updatedAt: new Date().toISOString() };

              // Recalculate if relevant scores changed
              if (updates.functionalScore !== undefined || updates.dysfunctionalScore !== undefined || updates.importance !== undefined) {
                updatedFeature.category = categorizeFeature(
                  updatedFeature.functionalScore,
                  updatedFeature.dysfunctionalScore
                );
                updatedFeature.satisfactionImpact = calculateSatisfactionImpact(updatedFeature);
              }

              return updatedFeature;
            });

            return { ...analysis, features: updatedFeatures };
          })
        })),

      deleteFeature: (analysisId, featureId) =>
        set((state) => ({
          kanoAnalyses: state.kanoAnalyses.map((analysis) =>
            analysis.id === analysisId
              ? { ...analysis, features: analysis.features.filter((f) => f.id !== featureId) }
              : analysis
          )
        })),

      setActiveComparison: (comparison) => set({ activeComparison: comparison }),

      // Kano data initialization
      loadDefaultKanoData: () => {
        set(() => ({
          kanoAnalyses: [...allKanoAnalyses]
        }));
      },

      hasKanoData: () => {
        const state = get();
        return state.kanoAnalyses.length > 0;
      },

      // Bulk operations
      loadDummyData: (data) =>
        set(() => ({
          strategicObjectives: data.strategicObjectives,
          annualObjectives: data.annualObjectives,
          processes: data.processes,
          metrics: data.metrics,
          catchball: data.catchball,
          currentDatasetId: 'foreign-policy' // Default to foreign policy for legacy compatibility
        })),

      clearAllData: () =>
        set(() => ({
          strategicObjectives: [],
          annualObjectives: [],
          processes: [],
          metrics: [],
          catchball: [],
          currentDatasetId: null
        })),

      hasDummyData: () => {
        const state = get();
        return state.strategicObjectives.length > 0 ||
          state.annualObjectives.length > 0 ||
          state.processes.length > 0 ||
          state.metrics.length > 0 ||
          state.catchball.length > 0;
      }
    }),
    {
      name: 'hoshin-kanri-storage',
      // Don't persist availableDatasets as they come from the imported data
      partialize: (state) => ({
        strategicObjectives: state.strategicObjectives,
        annualObjectives: state.annualObjectives,
        processes: state.processes,
        metrics: state.metrics,
        catchball: state.catchball,
        kanoAnalyses: state.kanoAnalyses,
        currentDatasetId: state.currentDatasetId
      })

    }
  )
);

// Kano Helper Functions
export function categorizeFeature(functional: number, dysfunctional: number): KanoCategory {
  if (functional >= 1 && dysfunctional <= -1) return 'basic';
  if (functional >= 1 && dysfunctional >= 0) return 'excitement';
  if (functional >= 0 && dysfunctional <= -1) return 'performance';
  if (functional <= 0 && dysfunctional >= 0) return 'reverse';
  return 'indifferent';
}

export function calculateSatisfactionImpact(feature: Omit<KanoFeature, 'id' | 'createdAt' | 'updatedAt' | 'satisfactionImpact'>): number {
  const { category, functionalScore, dysfunctionalScore, importance } = feature;

  const categoryWeights = {
    basic: 1.5,
    performance: 1.0,
    excitement: 1.2,
    indifferent: 0.3,
    reverse: -0.5
  };

  const baseScore = (functionalScore - dysfunctionalScore) / 2;
  return baseScore * categoryWeights[category] * (importance / 5);
}

export function generateInsights(comparison: KanoComparison): KanoInsight[] {
  const insights: KanoInsight[] = [];
  const { selfCompany, competitors } = comparison;

  if (!selfCompany || !competitors || competitors.length === 0) return [];

  // 1. Opportunity: Competitors have excitement features we don't
  competitors.forEach(competitor => {
    const theirExcitement = competitor.features.filter(f => f.category === 'excitement');
    const ourFeatures = new Set(selfCompany.features.map(f => f.name.toLowerCase()));

    theirExcitement.forEach(feature => {
      if (!ourFeatures.has(feature.name.toLowerCase())) {
        insights.push({
          type: 'opportunity',
          title: `Competitor Delight Opportunity: ${feature.name}`,
          description: `${competitor.companyName} offers "${feature.name}" as an excitement feature. Consider adding this to delight customers.`,
          relatedFeatures: [feature.id],
          priority: feature.importance >= 4 ? 'high' : 'medium'
        });
      }
    });
  });

  // 2. Strength: We have basic features competitors lack
  const ourBasics = selfCompany.features.filter(f => f.category === 'basic');
  ourBasics.forEach(feature => {
    const competitorsMissing = competitors.filter(c =>
      !c.features.some(f => f.name.toLowerCase() === feature.name.toLowerCase())
    );

    if (competitorsMissing.length > 0) {
      insights.push({
        type: 'strength',
        title: `Core Competitive Advantage: ${feature.name}`,
        description: `Your "${feature.name}" is a basic requirement that ${competitorsMissing.map(c => c.companyName).join(', ')} are missing.`,
        relatedFeatures: [feature.id],
        priority: 'medium'
      });
    }
  });

  // 3. Threat: Competitors have better performance on shared features
  const ourPerformance = selfCompany.features.filter(f => f.category === 'performance');
  ourPerformance.forEach(feature => {
    competitors.forEach(competitor => {
      const match = competitor.features.find(f => f.name.toLowerCase() === feature.name.toLowerCase());
      if (match && match.category === 'performance' && match.functionalScore > feature.functionalScore) {
        insights.push({
          type: 'threat',
          title: `Performance Gap: ${feature.name}`,
          description: `${competitor.companyName} is outperforming you on "${feature.name}" (Score: ${match.functionalScore} vs ${feature.functionalScore}).`,
          relatedFeatures: [feature.id, match.id],
          priority: 'high'
        });
      }
    });
  });

  // 4. Waste: Features we have that are Indifferent or Reverse
  const ourWaste = selfCompany.features.filter(f => f.category === 'indifferent' || f.category === 'reverse');
  ourWaste.forEach(feature => {
    insights.push({
      type: 'weakness',
      title: `Potential Resource Waste: ${feature.name}`,
      description: `"${feature.name}" is categorized as ${feature.category}. Consider removing or deprioritizing.`,
      relatedFeatures: [feature.id],
      priority: 'low'
    });
  });

  // 5. Strength: We have Excitement features competitors don't
  const ourExcitement = selfCompany.features.filter(f => f.category === 'excitement');
  ourExcitement.forEach(feature => {
    const competitorsMissing = competitors.filter(c =>
      !c.features.some(f => f.name.toLowerCase() === feature.name.toLowerCase())
    );

    if (competitorsMissing.length > 0) {
      insights.push({
        type: 'strength',
        title: `Unique Delighter: ${feature.name}`,
        description: `You have an excitement feature "${feature.name}" that ${competitorsMissing.map(c => c.companyName).join(', ')} lack. Market this heavily.`,
        relatedFeatures: [feature.id],
        priority: 'high'
      });
    }
  });

  return insights;
}