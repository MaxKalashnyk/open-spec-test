import { useState, useEffect, useMemo } from 'react';
import { useDashboardStore } from '@/stores/dashboard-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/project';

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilterDialog({ open, onOpenChange }: FilterDialogProps) {
  const projects = useDashboardStore((state) => state.projects);
  const filters = useDashboardStore((state) => state.filters);
  const setProjectManagerFilter = useDashboardStore((state) => state.setProjectManagerFilter);
  const setDateRangeFilter = useDashboardStore((state) => state.setDateRangeFilter);
  const clearFilters = useDashboardStore((state) => state.clearFilters);

  // Local state for filter values (only applied when user clicks Apply)
  const [localFilters, setLocalFilters] = useState({
    projectManager: filters.projectManager,
    dateRange: {
      start: filters.dateRange.start,
      end: filters.dateRange.end,
    },
  });

  // Initialize local filters from store when dialog opens
  useEffect(() => {
    if (open) {
      setLocalFilters({
        projectManager: filters.projectManager,
        dateRange: {
          start: filters.dateRange.start,
          end: filters.dateRange.end,
        },
      });
    }
  }, [open, filters.projectManager, filters.dateRange.start, filters.dateRange.end]);

  // Get unique project managers
  const projectManagers = useMemo(() => {
    const managers = new Set(projects.map((p: Project) => p.projectManager));
    return Array.from(managers).sort();
  }, [projects]);

  // Format dates for input (YYYY-MM-DD)
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const parseDateFromInput = (dateString: string): Date | null => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  const handleProjectManagerChange = (value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      projectManager: value === 'all' ? null : value,
    }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const start = parseDateFromInput(e.target.value);
    setLocalFilters((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        start,
      },
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const end = parseDateFromInput(e.target.value);
    setLocalFilters((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        end,
      },
    }));
  };

  const handleApplyFilters = () => {
    // Apply local filters to store
    setProjectManagerFilter(localFilters.projectManager);
    setDateRangeFilter(localFilters.dateRange);
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    // Clear local filters
    setLocalFilters({
      projectManager: null,
      dateRange: { start: null, end: null },
    });
    // Also clear store filters
    clearFilters();
  };

  const hasActiveFilters =
    localFilters.projectManager !== null ||
    localFilters.dateRange.start !== null ||
    localFilters.dateRange.end !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Projects</DialogTitle>
          <DialogDescription>
            Filter projects by project manager and date range.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="project-manager" className="text-sm font-medium">
              Project Manager
            </label>
            <Select
              value={localFilters.projectManager || 'all'}
              onValueChange={handleProjectManagerChange}
            >
              <SelectTrigger id="project-manager" className="w-full">
                <SelectValue placeholder="All managers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All managers</SelectItem>
                {projectManagers.map((manager: string) => (
                  <SelectItem key={manager} value={manager}>
                    {manager}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="start-date" className="text-sm font-medium">
              Start Date
            </label>
            <Input
              id="start-date"
              type="date"
              value={formatDateForInput(localFilters.dateRange.start)}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="end-date" className="text-sm font-medium">
              End Date
            </label>
            <Input
              id="end-date"
              type="date"
              value={formatDateForInput(localFilters.dateRange.end)}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <DialogFooter>
          {hasActiveFilters && (
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          )}
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

