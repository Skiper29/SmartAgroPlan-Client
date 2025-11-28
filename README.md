# 🌾 SmartAgroPlan Client

<div align="center">

![SmartAgroPlan](./public/default-monochrome.svg)

**A modern, intelligent agricultural planning and management platform**

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [Key Dependencies](#-key-dependencies)
- [Architecture](#-architecture)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**SmartAgroPlan** is a comprehensive agricultural management system designed to help farmers optimize their crop production, manage fields efficiently, and make data-driven decisions. The client application provides an intuitive interface for:

- **Field Management**: Create, edit, and visualize agricultural fields with interactive maps
- **Fertilizer Planning**: Generate intelligent fertilizer application plans based on soil conditions and crop requirements
- **Irrigation Management**: Schedule and monitor irrigation activities with weather-based recommendations
- **Crop Management**: Track crop cycles, growth stages, and health monitoring
- **Analytics Dashboard**: Visualize farm performance with comprehensive charts and metrics

---

## ✨ Features

### 🗺️ **Interactive Field Mapping**
- Draw and edit field boundaries on interactive maps
- Geocoding and location search integration
- Multiple map layers and visualization options
- Field area calculations using Turf.js

### 🧪 **Smart Fertilizer Management**
- AI-driven fertilizer recommendations
- Season-long planning and application scheduling
- Nutrient balance tracking and analysis
- Product optimization and cost calculations
- Historical application records

### 💧 **Irrigation Scheduling**
- Weather-based irrigation recommendations
- Customizable irrigation schedules
- Water usage tracking and optimization
- Field-specific irrigation plans

### 📊 **Analytics & Reporting**
- Real-time dashboard with key metrics
- Interactive charts and visualizations using Recharts
- Nutrient balance analysis
- Application history and trends

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Dark/Light theme support
- Accessible components built with Radix UI
- Smooth animations and transitions

---

## 🛠️ Tech Stack

### **Core Framework**
- **[React 19.1.1](https://reactjs.org/)** - Modern UI library with latest features
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite 7.1.2](https://vitejs.dev/)** - Lightning-fast build tool and dev server

### **Styling & UI**
- **[TailwindCSS 4.1.13](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible, unstyled UI primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, reusable components
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[class-variance-authority](https://cva.style/)** - Component variant management
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Efficient Tailwind class merging

### **State Management & Data Fetching**
- **[TanStack Query (React Query)](https://tanstack.com/query/latest)** - Powerful async state management
- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### **Routing**
- **[React Router DOM v7](https://reactrouter.com/)** - Declarative routing for React

### **Maps & Geospatial**
- **[Leaflet](https://leafletjs.com/)** - Interactive maps library
- **[React Leaflet](https://react-leaflet.js.org/)** - React components for Leaflet
- **[Leaflet Draw](https://leaflet.github.io/Leaflet.draw/)** - Drawing and editing tools
- **[Leaflet GeoSearch](https://smeijer.github.io/leaflet-geosearch/)** - Geocoding provider
- **[Turf.js](https://turfjs.org/)** - Geospatial analysis toolkit

### **Data Visualization**
- **[Recharts](https://recharts.org/)** - Composable charting library

### **Utilities**
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client
- **[date-fns](https://date-fns.org/)** - Modern date utility library
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Toast notifications
- **[http-status-codes](https://www.npmjs.com/package/http-status-codes)** - HTTP status code constants

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting

---

## 📁 Project Structure

```
SmartAgroPlan-Client/
├── 📂 public/                      # Static assets
│   ├── agriculture-hand.svg
│   └── vite.svg
│
├── 📂 src/
│   ├── 📂 app/                     # Application core
│   │   ├── 📂 api/                 # Base API configuration
│   │   │   └── agent.api.ts        # Axios instance and interceptors
│   │   ├── 📂 constants/           # Global constants
│   │   │   └── api-routes.constants.ts
│   │   ├── 📂 providers/           # React context providers
│   │   │   ├── AppProvider.tsx     # Root provider wrapper
│   │   │   └── ThemeContext.tsx    # Theme management
│   │   └── 📂 routes/              # Application routing
│   │       └── AppRoutes.tsx
│   │
│   ├── 📂 assets/                  # Static resources
│   │   ├── farming.svg
│   │   └── react.svg
│   │
│   ├── 📂 components/              # Reusable components
│   │   ├── 📂 layout/              # Layout components
│   │   │   ├── Layout.tsx          # Main layout wrapper
│   │   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   │   └── menuItems.ts        # Menu configuration
│   │   ├── 📂 ui/                  # UI primitives (shadcn/ui)
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── CTAButtonGroup.tsx
│   │   ├── ErrorDisplay.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── SectionContainer.tsx
│   │   └── ...
│   │
│   ├── 📂 config/                  # Configuration files
│   │   └── env.ts                  # Environment variables
│   │
│   ├── 📂 features/                # Feature modules (domain-driven)
│   │   ├── 📂 crops/               # Crop management
│   │   │   ├── 📂 api/             # Crop API calls
│   │   │   └── 📂 hooks/           # Crop-specific hooks
│   │   │
│   │   ├── 📂 dashboard/           # Main dashboard
│   │   │   ├── 📂 components/
│   │   │   └── 📂 pages/
│   │   │
│   │   ├── 📂 fertilizer/          # Fertilizer management
│   │   │   ├── 📂 api/             # Fertilizer API calls
│   │   │   ├── 📂 components/      # Feature components
│   │   │   ├── 📂 hooks/           # React Query hooks
│   │   │   ├── 📂 pages/           # Page components
│   │   │   └── 📂 utils/           # Utility functions
│   │   │
│   │   ├── 📂 fields/              # Field management
│   │   │   ├── 📂 api/             # Field API calls
│   │   │   ├── 📂 components/      # Map components, forms
│   │   │   ├── 📂 contexts/        # Field context
│   │   │   ├── 📂 hooks/           # Field hooks
│   │   │   ├── 📂 pages/           # Field pages
│   │   │   ├── 📂 schemas/         # Validation schemas
│   │   │   └── 📂 utils/           # Field utilities
│   │   │
│   │   ├── 📂 irrigation/          # Irrigation management
│   │   │   ├── 📂 api/
│   │   │   ├── 📂 components/
│   │   │   ├── 📂 hooks/
│   │   │   ├── 📂 pages/
│   │   │   └── 📂 utils/
│   │   │
│   │   └── 📂 landing/             # Landing page
│   │       ├── 📂 components/
│   │       └── 📂 pages/
│   │
│   ├── 📂 hooks/                   # Global custom hooks
│   │
│   ├── 📂 lib/                     # Library configurations
│   │   └── utils.ts                # Utility functions (cn, etc.)
│   │
│   ├── 📂 models/                  # TypeScript models/interfaces
│   │   ├── 📂 calendar/
│   │   ├── 📂 crop/
│   │   ├── 📂 fertilizer/          # Fertilizer DTOs
│   │   │   ├── application-plan.model.ts
│   │   │   ├── application-record.model.ts
│   │   │   ├── nutrient-balance.model.ts
│   │   │   ├── season-plan.model.ts
│   │   │   └── ...
│   │   ├── 📂 field/
│   │   └── 📂 irrigation/
│   │
│   ├── 📂 testing/                 # Test data and utilities
│   │   └── 📂 data/
│   │
│   ├── 📂 types/                   # TypeScript type definitions
│   │   ├── api-error.type.ts
│   │   └── svg.d.ts
│   │
│   ├── 📂 utils/                   # Global utilities
│   │   ├── fieldColors.ts
│   │   └── utils.ts
│   │
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Application entry point
│   ├── index.css                   # Global styles
│   └── vite-env.d.ts               # Vite type definitions
│
├── 📄 components.json              # shadcn/ui configuration
├── 📄 eslint.config.js             # ESLint configuration
├── 📄 package.json                 # Dependencies and scripts
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 vite.config.ts               # Vite configuration
├── 📄 staticwebapp.config.json     # Azure Static Web App config
├── 📄 FERTILIZER_PLANNING_API_DOCUMENTATION.md
└── 📄 README.md                    # This file
```

### **Architecture Principles**

- **Feature-Based Organization**: Code is organized by features/domains (fields, fertilizer, irrigation, crops)
- **Separation of Concerns**: Each feature has its own API, components, hooks, and utilities
- **Type Safety**: Strong TypeScript usage with models for all data structures
- **Component Reusability**: Shared UI components in `/components/ui`
- **Custom Hooks**: React Query hooks for data fetching and state management
- **Context Providers**: Global state management via React Context

---

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** >= 18.0.0
- **npm** or **yarn** or **pnpm**
- **Git**

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smartagroplan-client.git
   cd smartagroplan-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://localhost:7168/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## ⚙️ Environment Configuration

The application uses Vite's environment variable system. Create a `.env` file based on your environment:

### **Development (.env.development)**
```env
VITE_API_BASE_URL=http://localhost:7168/api
```

### **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://localhost:7168/api` |

Access environment variables in code:
```typescript
import { env } from '@/config/env';

console.log(env.API_URL);
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Fix ESLint errors automatically |

---

## 📦 Key Dependencies

### **Production Dependencies**

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.1.1 | UI library |
| `react-router-dom` | 7.8.2 | Routing |
| `@tanstack/react-query` | 5.89.0 | Data fetching & caching |
| `axios` | 1.12.2 | HTTP client |
| `react-hook-form` | 7.62.0 | Form management |
| `zod` | 4.1.7 | Schema validation |
| `leaflet` | 1.9.4 | Interactive maps |
| `react-leaflet` | 5.0.0 | React wrapper for Leaflet |
| `@turf/turf` | 7.2.0 | Geospatial analysis |
| `recharts` | 3.2.1 | Data visualization |
| `date-fns` | 4.1.0 | Date utilities |
| `lucide-react` | 0.543.0 | Icons |
| `tailwindcss` | 4.1.13 | CSS framework |
| `react-toastify` | 11.0.5 | Notifications |

### **Development Dependencies**

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | 7.1.2 | Build tool |
| `typescript` | 5.8.3 | Type checking |
| `eslint` | 9.35.0 | Code linting |
| `prettier` | 3.6.2 | Code formatting |
| `@vitejs/plugin-react` | 5.0.0 | React plugin for Vite |

---

## 🏗️ Architecture

### **Component Hierarchy**

```
App
├── AppProvider (Theme, React Query)
│   └── Router
│       └── AppRoutes
│           ├── LandingPage
│           └── Layout (Sidebar + Content)
│               ├── DashboardPage
│               ├── FieldListPage
│               ├── FertilizerDashboardPage
│               └── IrrigationDashboardPage
```

### **Data Flow**

1. **Components** trigger actions (e.g., button clicks)
2. **Custom Hooks** (using React Query) handle API calls
3. **API Layer** (Axios) communicates with backend
4. **React Query** caches and manages server state
5. **Components** re-render with updated data

### **Form Handling**

```
User Input → React Hook Form → Zod Validation → API Call → Success/Error Toast
```

### **Map Integration**

```
Leaflet Base Map → React Leaflet Components → Drawing Tools → Turf.js Calculations
```

---

## 🔌 API Integration

The application integrates with the SmartAgroPlan backend API. All API calls are centralized in feature-specific API files.

### **API Client Configuration**

Located in `src/app/api/agent.api.ts`:
- Axios instance with base URL
- Request/response interceptors
- Error handling
- Authentication headers

### **API Endpoints**

See [FERTILIZER_PLANNING_API_DOCUMENTATION.md](./FERTILIZER_PLANNING_API_DOCUMENTATION.md) for detailed API documentation.

**Main API Modules:**
- `/api/fields` - Field management
- `/api/crops` - Crop information
- `/api/fertilizer` - Fertilizer planning and applications
- `/api/irrigation` - Irrigation scheduling

---

## 🎨 UI Components

Built with **shadcn/ui** and **Radix UI**, all components are:
- ✅ Fully accessible (ARIA compliant)
- ✅ Themeable (dark/light mode)
- ✅ Customizable with Tailwind CSS
- ✅ Type-safe with TypeScript

### **Component Categories**

- **Layout**: `Layout`, `Sidebar`
- **Forms**: `Input`, `Select`, `Textarea`, `Calendar`
- **Feedback**: `Dialog`, `Toast`, `Badge`
- **Data Display**: `Table`, `Card`, `Avatar`
- **Navigation**: `Button`, `Popover`

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Style**

- Follow the existing code style
- Run `npm run lint` before committing
- Use TypeScript for type safety
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Author

- Vitalii Demkiv - [GitHub](https://github.com/Skiper29)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Leaflet](https://leafletjs.com/)
- [TanStack Query](https://tanstack.com/query/)

---

<div align="center">
  Made with ❤️ for farmers and agriculture professionals
</div>

