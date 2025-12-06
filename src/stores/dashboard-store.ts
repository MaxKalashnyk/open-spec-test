import { create } from 'zustand';
import { useMemo } from 'react';
import type { Project } from '@/types/project';

interface DashboardStore {
  projects: Project[];
  filters: {
    projectManager: string | null;
    dateRange: { start: Date | null; end: Date | null };
  };
  setProjects: (projects: Project[]) => void;
  setProjectManagerFilter: (manager: string | null) => void;
  setDateRangeFilter: (range: { start: Date | null; end: Date | null }) => void;
  clearFilters: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  projects: [],
  filters: {
    projectManager: null,
    dateRange: { start: null, end: null },
  },
  setProjects: (projects) => set({ projects }),
  setProjectManagerFilter: (manager) =>
    set((state) => ({
      filters: { ...state.filters, projectManager: manager },
    })),
  setDateRangeFilter: (range) =>
    set((state) => ({
      filters: { ...state.filters, dateRange: range },
    })),
  clearFilters: () =>
    set({
      filters: {
        projectManager: null,
        dateRange: { start: null, end: null },
      },
    }),
}));

// Selector hook for filtered projects with proper memoization
export const useFilteredProjects = () => {
  const projects = useDashboardStore((state) => state.projects);
  const filters = useDashboardStore((state) => state.filters);

  return useMemo(() => {
    let filtered = [...projects];

    // Filter by project manager
    if (filters.projectManager) {
      filtered = filtered.filter(
        (project) => project.projectManager === filters.projectManager
      );
    }

    // Filter by date range
    if (filters.dateRange.start) {
      filtered = filtered.filter(
        (project) => project.startDate >= filters.dateRange.start!
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(
        (project) =>
          project.startDate <= filters.dateRange.end! ||
          (project.endDate && project.endDate <= filters.dateRange.end!)
      );
    }

    return filtered;
  }, [projects, filters.projectManager, filters.dateRange.start, filters.dateRange.end]);
};

