# Change: Crypto Projects Dashboard

## Why

The application needs a comprehensive dashboard to manage and visualize crypto projects. This dashboard will provide project managers and stakeholders with an overview of project data, trends, and the ability to filter and analyze projects by various criteria.

## What Changes

- Add a new dashboard page/component for managing crypto projects
- Integrate shadcn/ui data table component for displaying project data
- Add Recharts line and bar charts for data visualization
- Display total numbers/summary statistics
- Implement filtering system (by project manager, by date, etc.) in a dialog modal
- Add Zustand for state management
- Install required dependencies: `zustand`, `recharts`, `@tanstack/react-table`

## Impact

- **Affected specs**: New capability `projects-dashboard`
- **Affected code**:
  - New dashboard component in `src/components/` or `src/pages/`
  - Zustand store in `src/stores/` or `src/lib/stores/`
  - Chart components using Recharts
  - Filter dialog component
  - Data table component using shadcn/ui
- **New dependencies**: `zustand`, `recharts`, `@tanstack/react-table`
- **Breaking changes**: None

