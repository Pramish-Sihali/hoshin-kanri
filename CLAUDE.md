# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (starts Next.js dev server on http://localhost:3000)
- **Build**: `npm run build` (builds production Next.js app)
- **Start production**: `npm start` (starts production server)
- **Lint**: `npm run lint` (runs ESLint with Next.js config)

## Architecture Overview

This is a **Hoshin Kanri Strategic Planning** application built with Next.js 15, React 19, and TypeScript. The application implements strategic policy deployment using the Hoshin Kanri methodology with an interactive X-Matrix visualization.

### Core Architecture Patterns

**State Management**: Uses **Zustand** with persistence for all application state (`store/hoshinStore.ts`). The store manages strategic objectives, annual objectives, processes, metrics, and catchball items. All modifications set `currentDatasetId: null` to mark custom data.

**Page Navigation**: Single-page application with client-side routing managed by state. The main page (`app/page.tsx`) uses a `currentPage` state to render different components within a unified `Layout` wrapper.

**Authentication**: Uses NextAuth.js for authentication with an `AuthGuard` wrapper protecting the main application.

### Key Data Types

The application revolves around five main entity types defined in `types/hoshin.ts`:

1. **StrategicObjective**: Long-term (3-5 year) strategic goals
2. **AnnualObjective**: Yearly objectives linked to strategic objectives  
3. **Process**: Implementation processes linked to annual objectives
4. **Metric**: KPIs linked to processes for measurement
5. **CatchballItem**: Communication items for collaborative planning

Each entity includes SIPOC data support for process documentation.

### Component Structure

**Layout System**: 
- `Layout.tsx` - Main application shell with sidebar navigation, dataset management, and report generation
- `AuthGuard.tsx` - Authentication wrapper
- `AuthProvider.tsx` - NextAuth session provider

**Core Pages**:
- `Dashboard.tsx` - Main dashboard with overview cards and charts
- `XMatrix.tsx` - Interactive X-Matrix visualization (Hoshin Kanri framework)
- `ObjectivesManagement.tsx` - CRUD for strategic and annual objectives
- `ProcessManagement.tsx` - CRUD for processes with SIPOC integration  
- `CatchballBoard.tsx` - Collaborative communication board

**UI Components**: Shadcn/ui components in `components/ui/` (all actively used)

### Data Management

**Datasets**: Pre-built example datasets in `lib/dummyData.ts` (foreign policy, business scenarios). Users can load datasets or create custom data.

**Persistence**: Zustand persist middleware saves user data to localStorage, excluding the static dataset definitions.

**SIPOC Integration**: Processes and annual objectives can include SIPOC (Suppliers, Inputs, Process, Outputs, Customers) data for process documentation.

### Styling & UI

- **TailwindCSS v4** for styling
- **Lucide React** for icons  
- **Nunito font** (Google Fonts)
- Custom gradient and glass-morphism effects throughout
- Responsive design with mobile-first approach

### X-Matrix Implementation

The `InteractiveMatrix.tsx` component renders the core Hoshin Kanri X-Matrix with:
- **WHAT** (Strategic Objectives) - bottom section
- **HOW** (Processes) - top section  
- **HOW FAR** (Annual Objectives) - left section
- **HOW MUCH** (Metrics) - right section
- **WHO** (Resource owners) - top-right corner
- **Correlation matrix** in center showing relationships between annual objectives and processes
- Interactive elements with modal details and highlighting of related items
- Fullscreen mode for presentations

### State Mutations

All CRUD operations automatically invalidate the current dataset (`currentDatasetId: null`) to indicate custom modifications. The store includes comprehensive methods for adding, updating, and deleting all entity types.
