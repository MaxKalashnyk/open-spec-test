import { useMemo } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFilteredProjects } from '@/stores/dashboard-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types/project';

export function BarChart() {
  const projects = useFilteredProjects();

  const chartData = useMemo(() => {
    // Group projects by project manager
    const managerData: Record<string, { manager: string; projects: number; funding: number }> = {};

    projects.forEach((project: Project) => {
      if (!managerData[project.projectManager]) {
        managerData[project.projectManager] = {
          manager: project.projectManager,
          projects: 0,
          funding: 0,
        };
      }

      managerData[project.projectManager].projects += 1;
      managerData[project.projectManager].funding += project.funding;
    });

    return Object.values(managerData).sort((a, b) => b.projects - a.projects);
  }, [projects]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects by Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="manager" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'Funding') {
                  return formatCurrency(value);
                }
                return value;
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="projects" fill="#8884d8" name="Projects" />
            <Bar yAxisId="right" dataKey="funding" fill="#82ca9d" name="Funding" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

