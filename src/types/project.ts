export interface Project {
  id: string;
  name: string;
  projectManager: string;
  status: 'active' | 'completed' | 'on-hold';
  funding: number;
  startDate: Date;
  endDate: Date | null;
}

