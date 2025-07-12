// store/hoshinStore.ts
import { HoshinData, StrategicObjective, AnnualObjective, Process, Metric, CatchballItem } from '@/types/hoshin';
import { availableDatasets, DatasetOption } from '@/lib/dummyData';
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
      currentDatasetId: null,
      availableDatasets: availableDatasets,
      
      // Dataset management
      loadDataset: (datasetId: string) => {
        const dataset = availableDatasets.find((d: { id: string; }) => d.id === datasetId);
        if (dataset) {
          set(() => ({
            strategicObjectives: [...dataset.data.strategicObjectives],
            annualObjectives: [...dataset.data.annualObjectives],
            processes: [...dataset.data.processes],
            metrics: [...dataset.data.metrics],
            catchball: [...dataset.data.catchball],
            currentDatasetId: datasetId
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
        currentDatasetId: state.currentDatasetId
      })
    }
  )
);