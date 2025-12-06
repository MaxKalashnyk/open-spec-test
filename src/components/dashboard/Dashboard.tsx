import { useState, useEffect } from 'react';
import { useDashboardStore } from '@/stores/dashboard-store';
import { mockProjects } from '@/data/mock-projects';
import { SummaryStats } from './SummaryStats';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { ProjectsTable } from './ProjectsTable';
import { FilterDialog } from './FilterDialog';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export function Dashboard() {
  const setProjects = useDashboardStore((state) => state.setProjects);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  // Load mock data on mount
  useEffect(() => {
    setProjects(mockProjects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Crypto Projects Dashboard</h1>
        <Button onClick={() => setFilterDialogOpen(true)}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <SummaryStats />

      <div className="grid gap-4 md:grid-cols-2">
        <LineChart />
        <BarChart />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <ProjectsTable />
      </div>

      <FilterDialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen} />
    </div>
  );
}

