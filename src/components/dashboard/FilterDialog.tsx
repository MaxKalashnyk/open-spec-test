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
import { useMemo } from 'react';
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

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const start = parseDateFromInput(e.target.value);
    setDateRangeFilter({
      start,
      end: filters.dateRange.end,
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const end = parseDateFromInput(e.target.value);
    setDateRangeFilter({
      start: filters.dateRange.start,
      end,
    });
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const hasActiveFilters =
    filters.projectManager !== null ||
    filters.dateRange.start !== null ||
    filters.dateRange.end !== null;

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
              value={filters.projectManager || 'all'}
              onValueChange={(value: string) =>
                setProjectManagerFilter(value === 'all' ? null : value)
              }
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
              value={formatDateForInput(filters.dateRange.start)}
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
              value={formatDateForInput(filters.dateRange.end)}
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
          <Button onClick={() => onOpenChange(false)}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

