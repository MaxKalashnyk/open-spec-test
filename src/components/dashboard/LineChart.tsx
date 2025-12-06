import { useMemo } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFilteredProjects } from '@/stores/dashboard-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types/project';

export function LineChart() {
  const projects = useFilteredProjects();

  const chartData = useMemo(() => {
    // Group projects by month
    const monthlyData: Record<string, { month: string; projects: number; funding: number }> = {};

    projects.forEach((project: Project) => {
      const monthKey = project.startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          projects: 0,
          funding: 0,
        };
      }

      monthlyData[monthKey].projects += 1;
      monthlyData[monthKey].funding += project.funding;
    });

    // Convert to array and sort by date
    return Object.values(monthlyData).sort((a, b) => {
      return new Date(a.month).getTime() - new Date(b.month).getTime();
    });
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
        <CardTitle>Projects Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="projects"
              stroke="#8884d8"
              name="Projects"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="funding"
              stroke="#82ca9d"
              name="Funding"
              strokeWidth={2}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

