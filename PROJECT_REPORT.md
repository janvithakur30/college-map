# Project Report: Laureate Campus Atlas

## Title Page

**Project Title:** Laureate Campus Atlas

**Submitted by:** [Your Name]

**Department:** Pharmacy

**Institution:** Laureate Institute of Pharmacy

**Course:** [Course Name]

**Academic Year:** 2025-2026

**Supervisor:** [Supervisor Name]

**Date:** April 2026

---

## Certificate

This is to certify that the project titled **"Laureate Campus Atlas"** is a genuine work carried out by me under the guidance of [Supervisor Name]. The report has not been submitted to any other institution for any degree or diploma.

**Signature:** ____________________

**Date:** ____________________

---

## Acknowledgements

I gratefully acknowledge the guidance, encouragement, and support of my project supervisor [Supervisor Name]. I also thank the faculty members and classmates who provided constructive feedback during the development of this application.

Special thanks to the developers of React, Vite, Tailwind CSS, Framer Motion, Radix UI, and all open-source libraries used in this project.

---

## Abstract

This project presents an interactive campus navigation web application for the Laureate Institute of Pharmacy. The application displays an immersive digital campus map, providing students, faculty, and visitors with a visually appealing and easy-to-use way to explore campus buildings, facilities, and services.

The system is built with modern web technologies including React, TypeScript, Vite, and Tailwind CSS. It uses data-driven components and intuitive interactions to deliver features such as building hotspots, hover zoom, click-to-open building details, drag-and-drop label positioning, and local storage persistence.

The report describes the problem statement, objectives, design process, implementation, testing, deployment, and future enhancements.

---

## Table of Contents

1. Introduction
2. Problem Statement
3. Objectives
4. Scope
5. Literature Review
6. System Analysis
7. System Design
8. Implementation
9. Testing and Validation
10. Deployment
11. Results and Discussion
12. Conclusion
13. Future Work
14. References
15. Appendices

---

## List of Figures and Tables

- Figure 1: Campus Map Interface
- Figure 2: Welcome Screen Flow
- Figure 3: Campus Map Interaction Flowchart
- Table 1: Functional Requirements
- Table 2: Non-functional Requirements
- Table 3: Component Responsibilities

---

## 1. Introduction

A campus navigation system is an important asset for colleges and universities. It helps new students, visitors, and staff locate buildings, understand campus facilities, and make the campus experience more accessible.

This project, **Laureate Campus Atlas**, is designed to provide a polished digital alternative to printed campus maps. It offers interactive exploration, building details, and a modern user interface.

### 1.1 Background

Physical campus maps and static PDFs can be difficult to use, especially for users who need quick information or are unfamiliar with campus landmarks. A web-based interactive map significantly improves usability and navigational efficiency.

### 1.2 Purpose of the Project

The purpose of this project is to create a responsive, interactive campus atlas that allows users to:

- visually explore the campus map
- hover over buildings to focus on them
- click to open a building inspector panel
- search for buildings quickly
- reposition labels and save the layout

### 1.3 Project Motivation

The motivation behind this system is to support better campus navigation and promote an engaging digital experience for the Laureate Institute of Pharmacy community.

---

## 2. Problem Statement

Navigating a campus can be challenging for new students and visitors, especially when the campus layout is complex or when facilities are spread across multiple buildings.

### 2.1 Key Problems

- Lack of interactive campus map solutions for the institute
- Difficulty identifying building locations quickly
- Static campus diagrams do not provide modern user interaction
- No easy way to view building details from a single interface

### 2.2 Impact

These challenges can lead to wasted time, frustration, and poor orientation during campus visits or first days of college.

---

## 3. Objectives

### 3.1 Main Objective

To develop a web-based campus atlas that provides interactive navigation across the Laureate Institute of Pharmacy campus.

### 3.2 Specific Objectives

- Build a responsive single-page web application
- Create interactive building hotspots
- Implement a welcome screen and dashboard layout
- Add a building inspector panel for detailed information
- Support hover zoom and click interaction on the campus map
- Enable drag-and-drop repositioning of labels
- Persist label positions using browser local storage

---

## 4. Scope

### 4.1 In Scope

- Frontend web development using React and TypeScript
- Interactive campus map rendering
- UI components for navigation and information display
- Data modeling for buildings and campus facilities
- Local storage for persistent settings

### 4.2 Out of Scope

- Backend server implementation
- Real-time live map updates
- GPS-based routing or external map provider integration
- User authentication or account management

---

## 5. Literature Review

### 5.1 Campus Navigation Systems

Digital campus navigation systems are typically implemented as mobile or web apps that combine searchable location directories with interactive maps. They improve orientation and provide users with detailed information about campus services.

### 5.2 UI/UX Considerations

Good campus navigation systems emphasize simplicity, accessibility, and rapid discovery. Common design patterns include:

- search-driven building lookup
- map zoom and highlight interactions
- contextual information cards
- responsive layouts for mobile and desktop

### 5.3 Technology Review

Modern web development frameworks such as React and Vite enable fast development cycles and maintainable component-based design. Styling libraries like Tailwind CSS improve productivity while keeping the UI clean.

Radix UI primitives and Framer Motion are useful for building accessible UI components and smooth animations.

---

## 6. System Analysis

### 6.1 Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| FR1 | Welcome screen | Display a cinematic entry screen with a video background |
| FR2 | Interactive map | Show a campus map with labeled hotspots |
| FR3 | Hover highlight | Zoom and emphasize buildings on hover |
| FR4 | Click inspector | Open building details when a building is clicked |
| FR5 | Search results | Show selected building name in a search result component |
| FR6 | Label editing | Allow label positions to be dragged while in edit mode |
| FR7 | Persistence | Save label positions in browser local storage |

### 6.2 Non-functional Requirements

- NFR1: Responsive design for desktop and large screens
- NFR2: Fast loading with optimized assets
- NFR3: Clean, readable codebase using TypeScript
- NFR4: Smooth transitions and animations
- NFR5: Accessible interaction patterns

### 6.3 Use Cases

- User loads the app and sees a welcome screen
- User enters the dashboard
- User hovers over a building label
- User clicks a building and sees details in an inspector card
- User enters edit mode and repositions labels
- User refreshes the page and verifies labels remain in place

---

## 7. System Design

### 7.1 Architecture Overview

The application follows a component-based architecture, separating layout, interaction, data, and presentation.

- `App.tsx` configures providers and router
- `Index.tsx` orchestrates layout, state, and page-level components
- `CampusMap.tsx` implements the interactive campus map and label editing
- `buildings.ts` contains the dataset for campus buildings
- UI helper components support navigation, search, and summary panels

### 7.2 Component Design

#### `App.tsx`

- Wraps the app in `QueryClientProvider` from React Query
- Registers `TooltipProvider` for tooltips
- Uses `BrowserRouter` and routes for page navigation
- Provides a catch-all route for unknown paths via `NotFound`

#### `Index.tsx`

- Holds top-level state such as selected building and welcome screen visibility
- Renders `TopNav`, `LeftSidebar`, `CampusMap`, `QuickInfo`, and `SearchResult`
- Displays a floating building inspector card when a building is selected
- Presents a welcome overlay with an autoplay video background

#### `CampusMap.tsx`

- Defines default building labels and initial placement coordinates
- Implements hover zoom with `mapScale` state
- Enables drag-and-drop label repositioning in edit mode
- Saves and loads label positions from `localStorage`
- Renders building labels and invisible interaction hotspots on the campus image

#### `buildings.ts`

- Stores the campus dataset as an array of typed `Building` objects
- Includes `title`, `description`, `images`, and `stats`
- Each building item supports the inspector panel with real photo paths

### 7.3 Data Model

The data model is defined in `src/data/buildings.ts`.

```ts
export type BuildingStat = {
  label: string;
  value: string;
};

export type Building = {
  id: string;
  title: string;
  description: string;
  images: string[];
  stats: BuildingStat[];
};
```

Each building entry includes:

- `id`: unique identifier
- `title`: human-readable building name
- `description`: short summary of the facility
- `images`: array of image paths for the building gallery
- `stats`: numerical or descriptive metrics for the building

### 7.4 UI Flow

The user flow begins with a welcome screen and transitions into the campus dashboard. The dashboard includes:

- a fixed background campus image
- a dark overlay for contrast
- a top navigation bar
- a left sidebar for navigation
- a central interactive campus map
- a right panel for quick campus information

When the user clicks a building label, a floating inspector card appears with detailed information.

---

## 8. Implementation

### 8.1 Technology Stack

- React 18
- Vite 5
- TypeScript 5
- Tailwind CSS 3
- Framer Motion
- React Router DOM
- Radix UI primitives
- React Query
- Vitest for testing

### 8.2 Development Setup

Development is initialized using Vite. The `package.json` includes scripts for development, build, preview, linting, and testing.

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

### 8.3 Core Implementations

#### Welcome Screen

The welcome screen is implemented inside `Index.tsx` using `AnimatePresence` and `motion.div` from Framer Motion. It includes a full-screen video background and an entrance button.

When the user clicks the button, the state `showWelcome` is set to `false` and the dashboard becomes visible.

#### Campus Map Interaction

`CampusMap.tsx` implements the map interface and label interactions.

Key behaviors:

- `hoveredBuilding`: tracks the label currently under the cursor
- `mapScale`: controls zoom level using CSS transform scale
- `labels`: stores label metadata with `top`, `left`, and `zoomLevel`
- `isEditing`: toggles drag-and-drop label editing

The map uses an HTML `img` element for the campus map asset and positions labels absolutely using percentage coordinates.

#### Label Editing and Persistence

The application stores custom label positions in browser `localStorage` under the key `campusMapLabelPositions`.

The code loads saved positions during initial state setup and falls back to default coordinates if none are found.

A `useEffect` hook updates local storage whenever the `labels` array changes.

#### Building Selection and Inspector Panel

The `handleBuildingClick` function in `Index.tsx` resolves a clicked building label to an entry from `buildings.ts`.

When a building is selected, `inspectorBuildingId` is set and a floating `BuildingCard` component is rendered with details.

The inspector panel can be dismissed by clicking outside the card or using the close action.

### 8.4 Functional Web Components

#### `TopNav`

Provides top-level navigation, branding, and global controls. It anchors the experience and supports consistent layout.

#### `LeftSidebar`

Displays primary navigation items and allows users to switch between dashboard modes. It is visible on larger screens.

#### `QuickInfo`

Shows contextual campus statistics or helpful pointers. It complements the map by surfacing quick facts.

#### `SearchResult`

Displays the selected building name after user interaction. It provides immediate context and helps users verify their selection.

### 8.5 Styling and Animation

Tailwind CSS is used for utility-first styling. The UI uses custom glassmorphism effects, gradients, shadows, and responsive spacing.

Framer Motion is used to animate the welcome screen, inspector panel, and button interactions.

### 8.6 Code Snippets

#### Building Hotspot Rendering

```tsx
{labels.map((label) => (
  <div
    key={`${label.id}-hotspot`}
    className="absolute cursor-pointer"
    style={{
      top: label.top,
      left: label.left,
      width: "10%",
      height: "10%",
      transform: "translate(-50%, -50%)",
    }}
    onMouseEnter={() => handleBuildingHover(label.name, label.zoomLevel)}
    onMouseLeave={handleBuildingLeave}
    onClick={() => onBuildingClick?.(label.name)}
  />
))}
```

#### Local Storage Persistence

```tsx
useEffect(() => {
  try {
    localStorage.setItem('campusMapLabelPositions', JSON.stringify(labels));
  } catch (e) {}
}, [labels]);
```

### 8.7 Error Handling

The code includes safe `try/catch` blocks around local storage access to prevent runtime failures in restricted environments.

---

## 9. Testing and Validation

### 9.1 Testing Strategy

Testing is performed with a combination of manual UI validation and unit test support via Vitest.

### 9.2 Manual Testing Checklist

- Verify the welcome screen appears on initial load
- Confirm the campus map loads correctly
- Hover over all building labels and ensure zoom behavior occurs
- Click each building label and inspect the building card details
- Toggle edit mode and drag labels to new positions
- Reload the page and verify labels remain in their new locations
- Test responsive layout on narrow and wide screens
- Confirm the `NotFound` route appears for unknown URLs

### 9.3 Test Tools

The project includes these testing dependencies:

- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`

### 9.4 Validation Criteria

- UI renders without console errors
- Application loads in major modern browsers
- Hover and click interactions are responsive
- Local storage saves and restores positions
- Animation transitions are smooth and stable

---

## 10. Deployment

### 10.1 Build Process

Run the production build with:

```bash
npm run build
```

### 10.2 Local Preview

Preview the production build locally using:

```bash
npm run preview
```

### 10.3 Hosting Options

This project is a static web application and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

### 10.4 Deployment Considerations

- Ensure all static assets are served correctly
- Validate that the route fallback works for deep linking
- Use HTTPS for secure access

---

## 11. Results and Discussion

### 11.1 Achievements

The project successfully delivers:

- a polished campus navigation UI
- interactive map hotspots
- building inspector cards
- responsive layout and animation
- editable label positions with persistence

### 11.2 User Experience

The welcome screen creates an immersive entry experience. The map interaction design emphasizes discovery and exploration.

### 11.3 Limitations

- There is no backend data source; all campus data is bundled statically.
- GPS routing and live directions are not included.
- Mobile-specific controls could be further optimized.

### 11.4 Performance

The app leverages Vite for fast development builds and static asset bundling. The use of CSS transforms ensures that hover zoom is smooth.

---

## 12. Conclusion

The Laureate Campus Atlas project demonstrates how a modern frontend application can transform campus navigation into a rich digital experience. It achieves the main objectives of interactive building discovery, responsive design, and persistent customization.

This system can support students, staff, and visitors by making campus orientation easier and more intuitive.

---

## 13. Future Work

### 13.1 Recommended Enhancements

- Add search autocomplete and building filtering
- Integrate a backend API for dynamic campus data
- Support mobile-first layout improvements
- Add accessibility improvements such as keyboard navigation
- Add dark mode and theme switching
- Include campus event scheduling and notifications

### 13.2 Advanced Features

- Real-time location tracking inside the campus
- Pathfinding and route planning
- Multi-language support
- Admin dashboard for managing building metadata

---

## 14. References

- React documentation: https://react.dev
- Vite documentation: https://vitejs.dev
- Tailwind CSS documentation: https://tailwindcss.com
- Framer Motion documentation: https://www.framer.com/motion/
- Radix UI documentation: https://www.radix-ui.com
- Vitest documentation: https://vitest.dev

---

## 15. Flowchart

The following flowchart illustrates the main application behavior and how user interaction flows through the dashboard.

```mermaid
flowchart TD
  A[Start] --> B[Load App]
  B --> C[Show Welcome Screen]
  C --> D[Enter Dashboard]
  D --> E[Render Campus Map]
  D --> F[Render Left Sidebar & Quick Info]
  E --> G[User Action]
  G --> H{Action Type}
  H --> I[Hover Building Label]
  H --> J[Click Building Label]
  H --> K[Drag Label in Edit Mode]
  H --> L[Click "Enter Campus"]
  I --> M[Zoom Map on Hover]
  J --> N[Open Building Inspector Card]
  K --> O[Update Label Position]
  O --> P[Save to LocalStorage]
  N --> Q[Show Building Details]
  Q --> R[Close Inspector]
  R --> G
  P --> R
  L --> E
```

### 15.1 Flowchart Description

- The app begins with a welcome screen.
- After entering, the dashboard renders the campus map and panels.
- Users can hover over building labels to focus the map.
- Clicking a building opens detailed information.
- In edit mode, labels can be dragged and repositioned.
- Custom positions are stored in local storage and persist across refreshes.

---

## 16. Appendices

### Appendix A: Project File Structure

```
src/
  App.tsx
  main.tsx
  pages/
    Index.tsx
    NotFound.tsx
  components/
    CampusMap.tsx
    BuildingCard.tsx
    LeftSidebar.tsx
    TopNav.tsx
    QuickInfo.tsx
    SearchResult.tsx
    ui/...
  data/
    buildings.ts
  assets/
    campus-map.png
    laure_video.mp4
    building/...
```

### Appendix B: Key Code Features

- `App.tsx` configures React Query and routing
- `Index.tsx` manages page state and overlays
- `CampusMap.tsx` handles hover, click, drag, and persistence
- `buildings.ts` provides building metadata

### Appendix C: Glossary

- SPA: Single Page Application
- UI: User Interface
- UX: User Experience
- API: Application Programming Interface
- `localStorage`: browser storage mechanism for persisting client-side data


*End of report.*
