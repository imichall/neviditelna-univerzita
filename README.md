# Neviditelná Univerzita - Domain Registry

Vue 3 application for domain management based on Ferda registry design.

## Features

- **Authentication** - User account authentication system
- **Domain Detail** - Display information for domain neviditelna-univerzita.cz
- **Verbose Mode** - Toggle between brief and detailed view
- **Modern UI** - Responsive design with Tailwind CSS and PrimeVue components

## Technologies

- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **PrimeVue** - Vue component library (icons and behaviors only)
- **Pinia** - State management
- **Vue Router** - Routing with navigation guards

## Getting Started

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

## Authentication

Demo accounts for testing:

| Username | Password | Name           | Role  |
| -------- | -------- | -------------- | ----- |
| michal   | password | Michal Svoboda | admin |
| jan      | password | Jan Musílek    | admin |

## Architecture

### Components

- `AppLayout.vue` - Main layout with header and collapsible sidebar
- `HomeView.vue` - Complete domain detail view with all sections
- Individual card components for AuthInfo, Owner, Events, etc.

### Stores (Pinia)

- `useAuthStore` - User authentication management with localStorage persistence
- `useDomainStore` - Domain data and verbose mode management

### Data

- `src/data/users.json` - User list for authentication
- `src/data/domain-detail.json` - Domain detail information

## Styling Approach

Following user preferences:

- **PrimeVue for icons and behaviors only** (animations)
- **Tailwind CSS for all styling**
- **Compact, less modern design layout**

- **No inline styles**
- **No scoped CSS**
