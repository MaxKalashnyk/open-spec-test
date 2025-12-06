## ADDED Requirements

### Requirement: Dashboard Display

The system SHALL provide a dashboard page that displays crypto projects with summary statistics, data visualizations, and a data table.

#### Scenario: Dashboard loads successfully

- **WHEN** the user navigates to the dashboard page
- **THEN** the dashboard displays summary statistics at the top
- **AND** the dashboard displays line and bar charts
- **AND** the dashboard displays a data table with project information

### Requirement: Summary Statistics

The system SHALL display total numbers and summary statistics for crypto projects.

#### Scenario: Summary statistics are displayed

- **WHEN** the dashboard loads
- **THEN** summary statistics cards are visible showing totals (e.g., total projects, total funding, active projects)
- **AND** the statistics update when filters are applied

### Requirement: Data Table

The system SHALL provide a data table component using shadcn/ui that displays crypto project information with sorting and pagination capabilities.

#### Scenario: Data table displays projects

- **WHEN** the dashboard loads
- **THEN** a data table displays project information in rows
- **AND** the table supports column sorting
- **AND** the table supports pagination
- **AND** the table displays filtered results when filters are applied

#### Scenario: Data table sorting

- **WHEN** the user clicks on a column header
- **THEN** the table sorts by that column
- **AND** the sort direction toggles on subsequent clicks

### Requirement: Line Chart Visualization

The system SHALL display a line chart using Recharts that visualizes project data over time.

#### Scenario: Line chart displays data

- **WHEN** the dashboard loads
- **THEN** a line chart is displayed showing project data trends over time
- **AND** the chart updates when filters are applied

### Requirement: Bar Chart Visualization

The system SHALL display a bar chart using Recharts that visualizes project data by category.

#### Scenario: Bar chart displays data

- **WHEN** the dashboard loads
- **THEN** a bar chart is displayed showing project data by category (e.g., by project manager, by status)
- **AND** the chart updates when filters are applied

### Requirement: Filter Dialog

The system SHALL provide a filter dialog modal that allows users to filter projects by various criteria.

#### Scenario: Filter dialog opens

- **WHEN** the user clicks the filter button
- **THEN** a dialog modal opens
- **AND** the dialog displays filter options (project manager, date range, etc.)

#### Scenario: Filter dialog closes

- **WHEN** the user clicks outside the dialog or clicks a close button
- **THEN** the dialog modal closes
- **AND** any applied filters remain active

### Requirement: Project Manager Filter

The system SHALL allow filtering projects by project manager.

#### Scenario: Filter by project manager

- **WHEN** the user selects a project manager from the filter dialog
- **THEN** the data table shows only projects for that manager
- **AND** the charts update to reflect filtered data
- **AND** the summary statistics update to reflect filtered data

#### Scenario: Clear project manager filter

- **WHEN** the user clears the project manager filter
- **THEN** all projects are displayed regardless of manager

### Requirement: Date Range Filter

The system SHALL allow filtering projects by date range.

#### Scenario: Filter by date range

- **WHEN** the user selects a date range from the filter dialog
- **THEN** the data table shows only projects within that date range
- **AND** the charts update to reflect filtered data
- **AND** the summary statistics update to reflect filtered data

#### Scenario: Clear date range filter

- **WHEN** the user clears the date range filter
- **THEN** all projects are displayed regardless of date

### Requirement: State Management

The system SHALL use Zustand for managing dashboard state including projects data and filter values.

#### Scenario: State is managed centrally

- **WHEN** filters are changed
- **THEN** the Zustand store updates
- **AND** all components consuming the store update accordingly

#### Scenario: Filtered projects are computed

- **WHEN** projects data or filters change
- **THEN** filtered projects are computed from the store
- **AND** the computed value is available to all components

### Requirement: Multiple Filters

The system SHALL support applying multiple filters simultaneously.

#### Scenario: Apply multiple filters

- **WHEN** the user applies both project manager and date range filters
- **THEN** the dashboard shows only projects matching all active filters
- **AND** all visualizations update to reflect the combined filter criteria

#### Scenario: Clear all filters

- **WHEN** the user clicks clear/reset filters
- **THEN** all filters are cleared
- **AND** the dashboard displays all projects

