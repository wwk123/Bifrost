"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Timeframe } from '@/data/mock';

interface DashboardState {
  timeframe: Timeframe;
  selectedStrategyId: string | null;
  selectedShareTemplateId: string;
  setTimeframe: (timeframe: Timeframe) => void;
  setSelectedStrategyId: (id: string | null) => void;
  setSelectedShareTemplateId: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      timeframe: 'week',
      selectedStrategyId: null,
      selectedShareTemplateId: 'pink',
      setTimeframe: (timeframe) => set({ timeframe }),
      setSelectedStrategyId: (selectedStrategyId) => set({ selectedStrategyId }),
      setSelectedShareTemplateId: (selectedShareTemplateId) => set({ selectedShareTemplateId })
    }),
    {
      name: 'arena-dashboard-preferences'
    }
  )
);

