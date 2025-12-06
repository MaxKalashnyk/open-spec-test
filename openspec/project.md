# Project Context

## Purpose

A modern React application built with Vite, TypeScript, and shadcn/ui components. This project uses OpenSpec for spec-driven development, enabling structured change proposals and requirements tracking.

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.17 (with @tailwindcss/vite plugin)
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **State Management**: React hooks (useState, etc.)
- **React Compiler**: babel-plugin-react-compiler (enabled)

## Project Conventions

### Code Style

- **Formatting**: Prettier with ES5 trailing commas, 2-space tabs, semicolons, single quotes
- **Import Order**: CSS imports first, then third-party modules, then `@/` aliases, then relative imports
- **Naming**:
  - Components: PascalCase (e.g., `Button.tsx`)
  - Utilities: camelCase (e.g., `cn()`)
  - Files: kebab-case for non-component files
- **Path Aliases**: Use `@/` prefix for src directory imports (configured in `vite.config.ts` and `tsconfig.json`)

### Architecture Patterns

- **Component Structure**:
  - UI components in `src/components/ui/`
  - Utilities in `src/lib/`
  - Main app in `src/App.tsx`
- **Styling Approach**:
  - Tailwind CSS with CSS variables for theming
  - Dark mode support via `.dark` class
  - shadcn/ui component system with class-variance-authority for variants
- **Type Safety**: Strict TypeScript with path aliases configured

### Testing Strategy

- Testing approach not yet defined (to be added as project evolves)

### Git Workflow

- Git workflow not yet defined (to be added as project evolves)

## Domain Context

- This is a starter/template project with OpenSpec integration
- Uses shadcn/ui component library with "New York" style variant
- Configured for React Compiler optimization
- ESLint configured with React hooks and TypeScript rules

## Important Constraints

- React Compiler is enabled (may impact Vite dev & build performance)
- TypeScript strict mode enabled
- ESLint configured with recommended React and TypeScript rules
- Path aliases must use `@/` prefix for src directory

## External Dependencies

- **shadcn/ui**: Component library (installed via components.json)
- **Radix UI**: Used by shadcn/ui for accessible primitives (@radix-ui/react-slot)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **OpenSpec**: Spec-driven development workflow system
