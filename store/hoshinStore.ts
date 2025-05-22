import { HoshinData, StrategicObjective, AnnualObjective, Process, Metric, CatchballItem } from '@/types/hoshin';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HoshinStore extends HoshinData {
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
}

export const useHoshinStore = create<HoshinStore>()(
  persist(
    (set, get) => ({
      strategicObjectives: [],
      annualObjectives: [],
      processes: [],
      metrics: [],
      catchball: [],
      
      addStrategicObjective: (objective) =>
        set((state) => ({
          strategicObjectives: [
            ...state.strategicObjectives,
            { ...objective, id: crypto.randomUUID() }
          ]
        })),
      
      updateStrategicObjective: (id, objective) =>
        set((state) => ({
          strategicObjectives: state.strategicObjectives.map((item) =>
            item.id === id ? { ...item, ...objective } : item
          )
        })),
      
      deleteStrategicObjective: (id) =>
        set((state) => ({
          strategicObjectives: state.strategicObjectives.filter((item) => item.id !== id)
        })),
      
      addAnnualObjective: (objective) =>
        set((state) => ({
          annualObjectives: [
            ...state.annualObjectives,
            { ...objective, id: crypto.randomUUID() }
          ]
        })),
      
      updateAnnualObjective: (id, objective) =>
        set((state) => ({
          annualObjectives: state.annualObjectives.map((item) =>
            item.id === id ? { ...item, ...objective } : item
          )
        })),
      
      deleteAnnualObjective: (id) =>
        set((state) => ({
          annualObjectives: state.annualObjectives.filter((item) => item.id !== id)
        })),
      
      addProcess: (process) =>
        set((state) => ({
          processes: [
            ...state.processes,
            { ...process, id: crypto.randomUUID() }
          ]
        })),
      
      updateProcess: (id, process) =>
        set((state) => ({
          processes: state.processes.map((item) =>
            item.id === id ? { ...item, ...process } : item
          )
        })),
      
      deleteProcess: (id) =>
        set((state) => ({
          processes: state.processes.filter((item) => item.id !== id)
        })),
      
      addMetric: (metric) =>
        set((state) => ({
          metrics: [
            ...state.metrics,
            { ...metric, id: crypto.randomUUID() }
          ]
        })),
      
      updateMetric: (id, metric) =>
        set((state) => ({
          metrics: state.metrics.map((item) =>
            item.id === id ? { ...item, ...metric } : item
          )
        })),
      
      deleteMetric: (id) =>
        set((state) => ({
          metrics: state.metrics.filter((item) => item.id !== id)
        })),
      
      addCatchballItem: (item) =>
        set((state) => ({
          catchball: [
            ...state.catchball,
            { ...item, id: crypto.randomUUID() }
          ]
        })),
      
      updateCatchballItem: (id, item) =>
        set((state) => ({
          catchball: state.catchball.map((catchballItem) =>
            catchballItem.id === id ? { ...catchballItem, ...item } : catchballItem
          )
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
          )
        }))
    }),
    {
      name: 'hoshin-kanri-storage'
    }
  )
);