# SmartAgroPlan - UI/UX Documentation

> **Complete Interface Structure, User Scenarios, and UX Logic**  
> Version: 1.0  
> Last Updated: 2025-11-29

---

## Table of Contents

1. [Overview](#1-overview)
2. [Design System](#2-design-system)
3. [Interface Structure](#3-interface-structure)
4. [Navigation & Information Architecture](#4-navigation--information-architecture)
5. [Key User Flows & Scenarios](#5-key-user-flows--scenarios)
6. [Page-by-Page UX Logic](#6-page-by-page-ux-logic)
7. [Component Library](#7-component-library)
8. [Responsive Design Strategy](#8-responsive-design-strategy)
9. [Accessibility & Usability](#9-accessibility--usability)
10. [User Journey Maps](#10-user-journey-maps)

---

## 1. Overview

### 1.1 Product Vision
**SmartAgroPlan** is a comprehensive agricultural management platform designed to help farmers optimize their operations through data-driven decision-making. The interface focuses on clarity, efficiency, and accessibility while handling complex agricultural data.

### 1.2 Target Users
- **Primary**: Small to medium-sized farm owners and managers
- **Secondary**: Agricultural consultants, agronomists
- **Tertiary**: Farm workers, field supervisors

### 1.3 Core Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Clarity First** | Clean layouts with clear visual hierarchy using typography and spacing |
| **Data Visualization** | Charts, maps, and cards to present complex agricultural data intuitively |
| **Progressive Disclosure** | Show essential information first, details on demand |
| **Contextual Actions** | Relevant actions presented based on current context and user task |
| **Responsive Feedback** | Immediate visual feedback for all user interactions |
| **Agricultural Context** | Green color palette and farming-related icons to establish domain context |

---

## 2. Design System

### 2.1 Color Palette

#### Light Theme
```css
Primary (Green):
  - green-50:  #F0FDF4   (Backgrounds)
  - green-100: #DCFCE7   (Subtle highlights)
  - green-200: #BBF7D0   (Borders)
  - green-600: #16A34A   (Primary actions)
  - green-700: #15803D   (Primary hover)
  - green-800: #166534   (Text emphasis)

Neutrals:
  - gray-50:  #F9FAFB    (Page background)
  - gray-100: #F3F4F6    (Card background)
  - gray-600: #4B5563    (Secondary text)
  - gray-900: #111827    (Primary text)
  
Semantic:
  - blue-500:   #3B82F6  (Information)
  - yellow-500: #EAB308  (Warning)
  - red-500:    #EF4444  (Danger/Critical)
  - emerald-500: #10B981 (Success)
```

#### Dark Theme
```css
Primary (Green):
  - green-900: #14532D   (Backgrounds)
  - green-800: #166534   (Subtle highlights)
  - green-700: #15803D   (Borders)
  - green-400: #4ADE80   (Primary actions)
  - green-300: #86EFAC   (Primary hover)
  
Neutrals:
  - gray-950: #030712    (Page background)
  - gray-900: #111827    (Card background)
  - gray-400: #9CA3AF    (Secondary text)
  - gray-100: #F3F4F6    (Primary text)
```

### 2.2 Typography

```typescript
Font Family: System Default Stack
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial

Scale:
  - text-xs:   0.75rem (12px)  - Labels, captions
  - text-sm:   0.875rem (14px) - Body small, descriptions
  - text-base: 1rem (16px)     - Body text
  - text-lg:   1.125rem (18px) - Emphasized body
  - text-xl:   1.25rem (20px)  - Subheadings
  - text-2xl:  1.5rem (24px)   - Section headers
  - text-3xl:  1.875rem (30px) - Page titles
  - text-5xl:  3rem (48px)     - Hero headlines
  - text-7xl:  4.5rem (72px)   - Landing hero

Weights:
  - font-normal:     400 - Body text
  - font-medium:     500 - Emphasized text
  - font-semibold:   600 - Subheadings
  - font-bold:       700 - Headers
  - font-extrabold:  800 - Hero text
```

### 2.3 Spacing System

Based on 4px grid system:
```
0.5 = 2px   | 3  = 12px  | 8  = 32px
1   = 4px   | 4  = 16px  | 10 = 40px
1.5 = 6px   | 5  = 20px  | 12 = 48px
2   = 8px   | 6  = 24px  | 16 = 64px
```

### 2.4 Iconography

**Library**: Lucide React  
**Size Standards**:
- Small: 16px (size={16})
- Medium: 20px (size={20}) - Default
- Large: 24px (size={24}) - Headers
- Extra Large: 32px+ - Features, empty states

**Common Icons**:
- `Home` - Dashboard
- `MapPin` - Fields/Location
- `Leaf` - Agriculture/Crops
- `Droplets` - Irrigation
- `Calculator` - Fertilizer
- `Brain` - AI/Recommendations
- `Calendar` - Scheduling
- `BarChart3` - Analytics

---

## 3. Interface Structure

### 3.1 Layout Architecture

SmartAgroPlan uses a **two-zone layout** for the application:

```
┌─────────────────────────────────────┐
│  Landing Page (Full-Width)          │
│  - Navigation Bar                   │
│  - Hero Section                     │
│  - Feature Sections                 │
│  - Footer                           │
└─────────────────────────────────────┘

┌──────┬──────────────────────────────┐
│ Side │  Main Content Area           │
│ bar  │  - Page Header               │
│      │  - Content Sections          │
│ Nav  │  - Cards & Data              │
│      │  - Actions                   │
└──────┴──────────────────────────────┘
```

### 3.2 Sidebar Navigation

**Collapsed State**: 80px (20rem)  
**Expanded State**: 320px (80rem)  
**Transition**: 300ms ease-in-out

#### Structure:
```
┌─────────────────────────┐
│ Logo                    │
├─────────────────────────┤
│ Navigation Menu         │
│  ├─ Dashboard          │
│  ├─ Fields & Crops     │
│  ├─ Resources          │
│  ├─ Analytics          │
│  ├─ AI Recommendations │
│  ├─ Planning           │
│  ├─ Organization       │
│  └─ Knowledge Base     │
├─────────────────────────┤
│ Settings                │
│ Theme Toggle            │
└─────────────────────────┘
```

**Interaction Pattern**:
- **Hover**: Expands sidebar, reveals labels and submenus
- **Click on Main Item**: Toggles submenu expansion
- **Click on Submenu Item**: Navigates to page
- **Icon-only display** when collapsed (spatial consistency)

### 3.3 Main Content Area

**Structure**:
1. **Sticky Header** (top: 0, z-index: 10)
   - Page title
   - Primary action button
   - Contextual filters/controls

2. **Content Sections**
   - Spaced with gap-8 (32px)
   - Each section has header + content
   - Alternating layouts for visual rhythm

3. **Background Treatment**
   ```css
   bg-gradient-to-br from-green-50 via-white to-green-100
   dark:from-gray-900 dark:via-gray-950 dark:to-green-900
   ```

---

## 4. Navigation & Information Architecture

### 4.1 Primary Navigation Structure

```
SmartAgroPlan
│
├─ 🏠 Dashboard (Панель керування)
│  ├─ Farm Overview (Огляд ферми) - /dashboard
│  └─ Key Metrics (Ключові показники) - /dashboard/kpi
│
├─ 🌿 Fields & Crops (Поля та культури)
│  ├─ View Fields (Перегляд полів) - /fields
│  ├─ Manage Fields (Керування полями) - /fields/new
│  ├─ Crop List (Список культур) - /crops
│  ├─ Crop Rotation (Сівозміна) - /crops/rotation
│  └─ Work Calendar (Календар робіт) - /crops/calendar
│
├─ 💧 Resources (Ресурси)
│  ├─ Irrigation (Полив) - /irrigation
│  ├─ Fertilizer (Добрива) - /fertilizer
│  └─ Resource Planning (Планування) - /resources/planning
│
├─ 📊 Analytics & Risks (Аналітика та ризики)
│  ├─ Weather (Погода) - /weather
│  ├─ Risks (Ризики) - /risks
│  ├─ Alerts (Сповіщення) - /alerts
│  ├─ Yield Forecast (Прогноз урожаю) - /analytics/yield
│  ├─ Financial Analysis (Фінансовий аналіз) - /analytics/financial
│  └─ Reports (Звіти) - /analytics/reports
│
├─ 🧠 AI Recommendations (AI Рекомендації)
│  ├─ Personal Advice (Персональні поради) - /ai/recommendations
│  └─ Scenario Planner (Планувальник сценаріїв) - /ai/scenarios
│
├─ 📅 Planning (Планування)
│  ├─ Task List (Список завдань) - /tasks
│  ├─ Calendar (Календар) - /calendar
│  └─ Checklist (Чек-лист) - /checklist
│
├─ 🏢 Organization (Організація)
│  ├─ Farms/Organizations (Ферми) - /organization/farms
│  ├─ Users & Roles (Користувачі) - /organization/users
│  └─ Task Distribution (Розподіл завдань) - /organization/tasks
│
└─ 📚 Knowledge Base (База знань)
   ├─ Articles & Tips (Статті) - /knowledge/articles
   ├─ Guides (Довідники) - /knowledge/guides
   └─ Open Data (Відкриті дані) - /knowledge/opendata
```

### 4.2 Breadcrumb Logic

Pages implement implicit breadcrumbs through page titles and back buttons:
```
Fields → Field Details → Edit Field
Fertilizer Dashboard → Field Plan → Generate New Plan
```

---

## 5. Key User Flows & Scenarios

### 5.1 Scenario 1: New User Onboarding

**Goal**: Farmer wants to start managing their first field

**Entry Point**: Landing page

**Flow**:
```
1. Landing Page
   └─> Click "Почати безкоштовно" (Start Free)
   
2. Dashboard (First Time)
   └─> Empty state with CTA
   
3. Navigate to Fields
   └─> Sidebar: Поля та культури → Перегляд полів
   
4. View Fields List (Empty)
   └─> Empty state illustration
   └─> "Додати перше поле" button
   
5. Add Field Page (/fields/new)
   ├─> Left: Form (Name, Location, Crop, Soil)
   └─> Right: Interactive Map
       └─> Draw field boundaries
   
6. Submit Field
   └─> Success toast notification
   └─> Redirect to Fields List
   
7. View Field Details
   └─> Click on newly created field card
   └─> See field information, maps, recommendations
```

**Duration**: ~5-10 minutes  
**Key UX Elements**:
- Empty states with clear CTAs
- Side-by-side form + map (no context switching)
- Immediate visual feedback on map
- Success confirmation

### 5.2 Scenario 2: Daily Check - Irrigation Needs

**Goal**: Check which fields need watering today

**Flow**:
```
1. Dashboard
   └─> Overview cards show irrigation status
   
2. Navigate to Irrigation
   └─> Sidebar: Ресурси → Полив
   
3. Irrigation Dashboard (/irrigation)
   ├─> Summary Cards (top)
   │   ├─ Fields Needing Irrigation: 3
   │   ├─ Total Water Deficit: 45.2mm
   │   └─ Critical Fields: 1
   │
   └─> Field Cards (grid)
       └─> Each card shows:
           ├─ Field name + area
           ├─ Moisture status (gauge)
           ├─ Recommended action badge
           ├─ Water amount needed
           └─> "Детальніше" button
           
4. Click on Critical Field
   └─> Navigate to Detail Page (/irrigation/:id)
   
5. Irrigation Detail Page
   ├─> Moisture chart over time
   ├─> Weather integration
   ├─> Detailed recommendations
   └─> Schedule irrigation button
```

**Duration**: ~2-3 minutes  
**Key UX Elements**:
- At-a-glance summary metrics
- Color-coded urgency (Critical = red, Warning = yellow)
- Progressive disclosure (summary → details)
- Action-oriented interface

### 5.3 Scenario 3: Plan Fertilizer Application

**Goal**: Generate and review fertilizer plan for a field

**Flow**:
```
1. Fertilizer Dashboard (/fertilizer)
   └─> See all fields with nutrient status
   
2. Select Field Card
   └─> Shows nutrient deficits
   └─> "Generate Plan" button
   
3. Generate Plan Page (/fertilizer/generate-plan/:id)
   ├─> Left: Parameters Form
   │   ├─ Growth stage
   │   ├─ Target yield
   │   └─ Constraints (budget, organic)
   │
   └─> Right: Live Preview
       └─> Updates as parameters change
       
4. Generate Plan
   └─> AI processing indicator
   └─> Shows optimized recommendations
   
5. Review Generated Plan
   ├─> Timeline view of applications
   ├─> Product breakdown
   ├─> Cost estimation
   └─> Nutrient balance projection
   
6. Approve & Save Plan
   └─> Confirmation modal
   └─> Redirect to Plan Details
   
7. Plan Details Page (/fertilizer/plan/:id)
   ├─> Upcoming applications
   ├─> Application history
   └─> Record actual application
       └─> Modal with actual amounts
```

**Duration**: ~10-15 minutes  
**Key UX Elements**:
- Live preview during configuration
- Visual timeline of applications
- Product detail modals
- Easy recording of actual vs planned

### 5.4 Scenario 4: Field Management Workflow

**Goal**: View field details and update information

**Flow**:
```
1. Fields List (/fields)
   ├─> Map view (top)
   │   └─> Click on field polygon
   │       └─> Highlights corresponding card
   │
   └─> Card grid (bottom)
       └─> Click "Переглянути"
       
2. Field View Page (/fields/view/:id)
   ├─> Header with Edit button
   ├─> Field Info Section
   │   ├─ Name, area, location
   │   ├─ Current crop
   │   └─ Soil type
   │
   ├─> Map Visualization
   │   └─> Shows field boundary
   │
   ├─> Stats Cards
   │   ├─ Irrigation status
   │   ├─ Nutrient balance
   │   └─ Recent activities
   │
   └─> Quick Actions
       ├─ Plan Irrigation
       ├─ Plan Fertilizer
       └─ View History
       
3. Click Edit
   └─> Navigate to Edit Page (/fields/edit/:id)
   
4. Edit Field Page
   ├─> Pre-filled form
   ├─> Interactive map for boundary editing
   └─> Save Changes
       └─> Success notification
       └─> Back to Field View
```

**Duration**: ~3-5 minutes  
**Key UX Elements**:
- Map-card synchronization
- Contextual quick actions
- Non-destructive editing
- Clear save/cancel options

---

## 6. Page-by-Page UX Logic

### 6.1 Landing Page (`/`)

**Purpose**: Marketing, education, conversion

**Layout**:
```
┌─────────────────────────────────────┐
│ Navigation (Fixed Top)              │
├─────────────────────────────────────┤
│ Hero Section                        │
│  - Headline + Value Prop            │
│  - CTA Buttons                      │
│  - Visual/Animation                 │
├─────────────────────────────────────┤
│ Problem Statement                   │
│  - Pain points farmers face         │
├─────────────────────────────────────┤
│ Solution Overview                   │
│  - How SmartAgroPlan solves them    │
├─────────────────────────────────────┤
│ Key Features (Cards Grid)           │
│  - 6-8 main features with icons     │
├─────────────────────────────────────┤
│ How It Works (Steps)                │
│  - 3-4 step process                 │
├─────────────────────────────────────┤
│ Benefits (Metrics)                  │
│  - Quantifiable improvements        │
├─────────────────────────────────────┤
│ Demo Preview (Screenshots)          │
│  - Visual tour of interface         │
├─────────────────────────────────────┤
│ Testimonials (Cards)                │
│  - Social proof                     │
├─────────────────────────────────────┤
│ Pricing Preview (Plans)             │
│  - Tiered pricing options           │
├─────────────────────────────────────┤
│ Final CTA Section                   │
│  - Strong call to action            │
├─────────────────────────────────────┤
│ Footer                              │
│  - Links, contact, legal            │
└─────────────────────────────────────┘
```

**Key Interactions**:
- **Navigation**: Smooth scroll to sections via anchor links
- **Theme Toggle**: Available in navigation
- **CTA Buttons**: Multiple entry points to /dashboard
- **Responsive**: Hamburger menu on mobile

**Visual Design**:
- Gradient backgrounds (green-themed)
- Large typography for headers
- Icon-driven feature cards
- Testimonial cards with avatars
- Pricing comparison table

### 6.2 Dashboard (`/dashboard`)

**Purpose**: Overview of farm operations

**Layout**:
```
┌─────────────────────────────────────┐
│ Page Header: "Панель керування"     │
├──────────────┬──────────────────────┤
│ KPI Cards    │  Weather Widget      │
│  - Fields    │  - Current temp      │
│  - Crops     │  - Forecast          │
│  - Alerts    │                      │
├──────────────┴──────────────────────┤
│ Farm Map                            │
│  - All fields visualized            │
│  - Color-coded status               │
├─────────────────────────────────────┤
│ Recent Activities (Timeline)        │
│  - Last 10 actions                  │
├──────────────┬──────────────────────┤
│ Urgent Tasks │  Upcoming Schedule   │
└──────────────┴──────────────────────┘
```

**Information Hierarchy**:
1. **Critical Metrics** (top) - Immediate attention
2. **Spatial Overview** (map) - Context
3. **Temporal Overview** (timeline) - Recent & upcoming
4. **Action Items** (tasks) - What to do next

**Visual Indicators**:
- Red badges for critical alerts
- Yellow for warnings
- Green for healthy status
- Numbers in stat cards with trend arrows

### 6.3 Fields List Page (`/fields`)

**Purpose**: Manage all farm fields

**Header**:
- Title: "Поля"
- Primary Action: "+ Додати поле" (green button, prominent)

**Content Sections**:

1. **Map Section** (top)
   ```
   ┌─────────────────────────────────────┐
   │ "Розташування полів"                │
   │ ┌─────────────────────────────────┐ │
   │ │                                 │ │
   │ │   Interactive Map               │ │
   │ │   - All fields as polygons      │ │
   │ │   - Click highlights card       │ │
   │ │                                 │ │
   │ └─────────────────────────────────┘ │
   └─────────────────────────────────────┘
   ```

2. **Field Cards Grid** (bottom)
   ```
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │ Field A │ │ Field B │ │ Field C │
   │ 10.5 га │ │ 8.2 га  │ │ 15.0 га │
   │ Пшениця │ │ Соняшник│ │ Кукурудза│
   │         │ │         │ │         │
   │[Details]│ │[Details]│ │[Details]│
   └─────────┘ └─────────┘ └─────────┘
   ```

**Empty State**:
- Large icon (MapPinOff)
- Heading: "Немає полів"
- Description: Encouraging message
- CTA: "Додати перше поле"

**Card Interactions**:
- **Hover**: Scale up slightly (1.03x), shadow increases
- **Click on Map**: Scrolls to and highlights corresponding card
- **Click on Card**: Navigate to field view page

**Responsive**:
- 3 columns on large screens
- 2 columns on tablets
- 1 column on mobile

### 6.4 Add/Edit Field Pages (`/fields/new`, `/fields/edit/:id`)

**Layout**: Two-column split

**Left Column (Form)**:
```
┌─────────────────────────────────┐
│ "Інформація про поле"           │
├─────────────────────────────────┤
│ Form Fields:                    │
│                                 │
│ [Name Input]                    │
│ [Location Input]                │
│ [Field Type Dropdown]           │
│ [Current Crop Dropdown]         │
│ [Sowing Date Picker]            │
│ [Soil Type Dropdown]            │
│ [Boundary GeoJSON] (hidden)     │
│                                 │
│ [Cancel]  [Save Field]          │
└─────────────────────────────────┘
```

**Right Column (Map)**:
```
┌─────────────────────────────────┐
│ "Межі поля"                     │
├─────────────────────────────────┤
│ Map Tools:                      │
│ [🎨 Draw] [✏️ Edit] [🗑️ Delete]  │
│                                 │
│ Interactive Map:                │
│ - Click to draw polygon         │
│ - Drag vertices to adjust       │
│ - Real-time area calculation    │
│                                 │
│ Area: 10.5 га                   │
└─────────────────────────────────┘
```

**UX Flow**:
1. User fills form on left
2. User draws boundary on map (right)
3. Form auto-populates boundaryGeoJson
4. Map shows area calculation
5. Save button becomes enabled when valid
6. Click Save → API call → Success toast → Redirect

**Validation**:
- Real-time validation on blur
- Error messages below fields
- Disabled submit until valid
- Required fields marked with *

**Map Interaction**:
- **Add Mode**: Click to add vertices, double-click to complete
- **Edit Mode**: Drag vertices to adjust shape
- **Delete**: Confirm before removing boundary

### 6.5 Field View Page (`/fields/view/:id`)

**Purpose**: Detailed information about a single field

**Header**:
- Title: Field name
- Actions: Edit button, Delete button

**Layout**:
```
┌─────────────────────────────────────┐
│ Field Info Card                     │
│  - Name, Area, Location             │
│  - Current Crop, Sowing Date        │
│  - Soil Type                        │
├──────────────┬──────────────────────┤
│ Map          │  Stats               │
│ Visualization│   - Moisture         │
│              │   - Nutrients        │
│              │   - Health Score     │
├──────────────┴──────────────────────┤
│ Quick Actions (Buttons)             │
│  [Plan Irrigation] [Plan Fertilizer]│
│  [View History] [Record Activity]   │
├─────────────────────────────────────┤
│ Recent Activities (Timeline)        │
│  - Last fertilizer application      │
│  - Last irrigation                  │
│  - Soil test results                │
└─────────────────────────────────────┘
```

**Data Display Patterns**:
- **Key-Value Pairs**: Label on left, value on right
- **Stats**: Circular progress indicators or gauges
- **Timeline**: Vertical line with event markers
- **Map**: Field boundary with color fill based on health

**Actions**:
- Edit → Navigate to edit page (pre-filled)
- Delete → Confirmation modal → API call → Redirect to list
- Quick actions → Navigate to relevant modules with field pre-selected

### 6.6 Irrigation Dashboard (`/irrigation`)

**Purpose**: Monitor and manage irrigation across all fields

**Header**:
- Title: "Огляд Зрошення"
- Action: "🔄 Оновити" (Refresh button)

**Summary Cards Row**:
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Fields Need  │ │ Total Water  │ │ Critical     │
│ Irrigation   │ │ Deficit      │ │ Fields       │
│     3        │ │   45.2 mm    │ │     1        │
└──────────────┘ └──────────────┘ └──────────────┘
```

**Field Cards Grid**:
Each card shows:
```
┌─────────────────────────────────┐
│ 🌾 Field Name           10.5 га │
│                                 │
│ Moisture: [====----] 45%        │
│                                 │
│ [🔴 Critical Irrigation]        │
│ Recommended: 15.5 mm            │
│                                 │
│ [Детальніше →]                  │
└─────────────────────────────────┘
```

**Status Badges**:
- 🔴 **Critical** (Very Intensive): Red background
- 🟡 **Warning** (Moderate/Intensive): Yellow background
- 🟢 **Good** (Minimal/None): Green background

**Interaction**:
- Click "Детальніше" → Navigate to detail page
- Hover → Highlight and slight elevation
- Refresh button → Re-fetch all recommendations

**Loading State**:
- Centered spinner with message
- "Завантаження рекомендацій..."

**Error State**:
- ErrorDisplay component
- Retry button

### 6.7 Irrigation Detail Page (`/irrigation/:id`)

**Purpose**: Detailed irrigation information for one field

**Layout**:
```
┌─────────────────────────────────────┐
│ [← Back] Field Name                 │
├─────────────────────────────────────┤
│ Current Status Card                 │
│  - Moisture level: 45%              │
│  - Deficit: 15.5 mm                 │
│  - Recommendation: Critical         │
├─────────────────────────────────────┤
│ Moisture Chart (7 days)             │
│  - Line graph showing trend         │
│  - Threshold lines                  │
├──────────────┬──────────────────────┤
│ Weather      │ Crop Info            │
│  - Forecast  │  - Type              │
│  - Rain      │  - Stage             │
│  - Temp      │  - Water needs       │
├──────────────┴──────────────────────┤
│ Recommendations                     │
│  - When to irrigate                 │
│  - How much water                   │
│  - Method suggestions               │
├─────────────────────────────────────┤
│ [Schedule Irrigation] [Record Done] │
└─────────────────────────────────────┘
```

**Chart Visualization**:
- X-axis: Dates
- Y-axis: Moisture %
- Line: Actual moisture over time
- Horizontal lines: Thresholds (wilting point, field capacity)
- Color-coded zones

**Action Buttons**:
- **Schedule**: Opens modal/form to plan irrigation
- **Record**: Opens modal to log completed irrigation

### 6.8 Fertilizer Dashboard (`/fertilizer`)

**Purpose**: Overview of fertilizer needs and plans across fields

**Header**:
- Title: "Добрива"
- Action: "🔄 Оновити"

**Summary Section**:
```
┌─────────────────────────────────────┐
│ Dashboard Stats                     │
│  - Total fields tracked             │
│  - Fields with deficits             │
│  - Total applications planned       │
│  - Upcoming applications (7 days)   │
└─────────────────────────────────────┘
```

**Field Cards Grid**:
Each card shows:
```
┌─────────────────────────────────────┐
│ 🌾 Field Name               10.5 га │
│                                     │
│ Nutrient Status:                    │
│  N: [====----] 55% (Deficit: -45kg) │
│  P: [======--] 75% (Deficit: -12kg) │
│  K: [=======--] 80% (OK)            │
│                                     │
│ [View Plan] [Generate Plan]         │
└─────────────────────────────────────┘
```

**Nutrient Deficit Card**:
- Shows fields with highest deficits
- Sorted by severity
- Quick link to generate plan

**Upcoming Applications Card**:
- Timeline of next 7 days
- Applications grouped by date
- Quick record action

**Interactions**:
- **View Plan**: Navigate to plan details (if exists)
- **Generate Plan**: Navigate to plan generation page
- **Click on Application**: Open details modal

### 6.9 Fertilizer Plan Page (`/fertilizer/plan/:id`)

**Purpose**: View and manage fertilizer plan for a field

**Header**:
- Back button
- Field name
- Actions: "✨ Generate New", "🔄 Refresh"

**Plan Summary Card**:
```
┌─────────────────────────────────────┐
│ Season Plan 2024/2025               │
│  - Total applications: 4            │
│  - Total cost: ₴15,450              │
│  - Expected yield boost: +15%       │
│  - Status: Active                   │
└─────────────────────────────────────┘
```

**Applications Timeline**:
```
March 2025
  ┌──────────────────────────────────┐
  │ Application #1 - Base Fertilizer │
  │ Date: 2025-03-15                 │
  │ Products:                        │
  │  - NPK 16-16-16: 250 kg          │
  │  - Urea: 100 kg                  │
  │ Cost: ₴5,200                     │
  │ Status: [Planned]                │
  │ [View Products] [Record]         │
  └──────────────────────────────────┘

April 2025
  ┌──────────────────────────────────┐
  │ Application #2 - Top Dressing    │
  │ ...                              │
  └──────────────────────────────────┘
```

**Application Card States**:
- **Planned**: White/light background, no indicator
- **Completed**: Green checkmark, completed date
- **Overdue**: Red indicator, warning message

**Modal Interactions**:

1. **Product Details Modal**:
   - Triggered by clicking product name
   - Shows: Full name, NPK composition, price, manufacturer
   - Close button

2. **Record Application Modal**:
   - Triggered by "Record" button
   - Form fields:
     - Actual date (date picker)
     - Actual amounts (inputs for each product)
     - Notes (textarea)
   - Submit → Update plan → Close modal

### 6.10 Generate Fertilizer Plan Page (`/fertilizer/generate-plan/:id`)

**Purpose**: Create new fertilizer plan with AI assistance

**Layout**: Two-column split

**Left Column (Parameters)**:
```
┌─────────────────────────────────┐
│ Plan Parameters                 │
├─────────────────────────────────┤
│ Growth Stage:                   │
│ [Dropdown: Vegetative/...]      │
│                                 │
│ Target Yield:                   │
│ [Input: 5.5] t/ha               │
│                                 │
│ Budget Constraint:              │
│ [Input: 20000] ₴                │
│                                 │
│ Organic Only:                   │
│ [Checkbox]                      │
│                                 │
│ Application Preferences:        │
│ [Dropdown: Minimize/Optimize]   │
│                                 │
│ [Generate Plan]                 │
└─────────────────────────────────┘
```

**Right Column (Preview)**:
```
┌─────────────────────────────────┐
│ Plan Preview                    │
├─────────────────────────────────┤
│ (Updates as parameters change)  │
│                                 │
│ Estimated Applications: 3       │
│ Total Cost: ₴18,500             │
│ Expected Yield: 5.5 t/ha        │
│                                 │
│ Nutrient Balance:               │
│  N: [========] 100%             │
│  P: [========] 100%             │
│  K: [=======] 95%               │
│                                 │
│ Timeline Preview:               │
│ [Mini calendar with dates]      │
└─────────────────────────────────┘
```

**Generation Flow**:
1. User adjusts parameters
2. Preview updates in real-time (debounced)
3. Click "Generate Plan"
4. Loading indicator (AI processing)
5. Results appear
6. User can approve or adjust
7. Save plan → Navigate to plan details

**Loading State**:
- AI brain icon with pulse animation
- "Генерація оптимального плану..."
- Progress indicator

**Results Display**:
- Full plan layout
- Option to adjust and regenerate
- Save & Approve button

---

## 7. Component Library

### 7.1 UI Components (shadcn/ui based)

#### Button
```typescript
Variants:
  - default: Green gradient, white text
  - outline: Border with transparent bg
  - ghost: No border, subtle hover
  - destructive: Red for delete actions
  
Sizes:
  - sm: Compact (h-8)
  - default: Standard (h-10)
  - lg: Prominent (h-12)
  
Icons: Can include Lucide icons (left or right)
```

#### Card
```typescript
Structure:
  <Card>
    <CardHeader>
      <CardTitle>
      <CardDescription>
    </CardHeader>
    <CardContent>
      {/* Main content */}
    </CardContent>
    <CardFooter>
      {/* Actions */}
    </CardFooter>
  </Card>
  
Styling: White bg, rounded corners, subtle shadow
```

#### Badge
```typescript
Variants:
  - default: Green
  - secondary: Gray
  - destructive: Red
  - outline: Border only
  
Usage: Status indicators, tags, counts
```

#### Input/Select/Textarea
```typescript
Shared Styling:
  - Border: gray-300 dark:gray-700
  - Focus: green-600 ring
  - Error: red-500 border
  - Disabled: opacity-50

Label: Always paired with form fields
```

#### Dialog/Modal
```typescript
Structure:
  <Dialog>
    <DialogTrigger>Button/Link</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
        <DialogDescription>
      </DialogHeader>
      {/* Body */}
      <DialogFooter>
        {/* Actions */}
      </DialogFooter>
    </DialogContent>
  </Dialog>
  
Backdrop: Semi-transparent overlay
Animation: Fade + scale in
```

#### Calendar/DatePicker
```typescript
Usage: Date selection for sowing, applications, scheduling
Style: Green accents for selected dates
Range support: Start and end dates
```

#### Table
```typescript
Structure:
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Column</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Data</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  
Features:
  - Hover highlight rows
  - Sortable columns (future)
  - Responsive (scroll on mobile)
```

### 7.2 Custom Components

#### FeatureCard
```typescript
Purpose: Landing page features
Props: icon, title, description
Style: Gradient background, centered layout
```

#### StatCard
```typescript
Purpose: Dashboard metrics
Props: label, value, trend, icon
Style: Compact, icon + number prominent
```

#### TestimonialCard
```typescript
Purpose: Social proof on landing
Props: quote, author, avatar, role
Style: Quote marks, avatar left, text right
```

#### ErrorDisplay
```typescript
Purpose: Error states across app
Props: error object, onRetry function
Display: Icon, message, retry button
```

#### CTAButtonGroup
```typescript
Purpose: Primary actions in hero sections
Props: buttons array (label, icon, variant)
Layout: Horizontal group with gap
```

#### SectionContainer
```typescript
Purpose: Consistent section spacing
Props: children, className
Style: Padding, max-width, centered
```

#### SectionHeader
```typescript
Purpose: Section titles
Props: title, subtitle
Style: Large heading + smaller description
```

### 7.3 Feature-Specific Components

#### Field Components:
- **FieldCard**: Preview card with image, name, stats
- **FieldMap**: Interactive Leaflet map with drawing tools
- **UnifiedFieldForm**: Form for add/edit field
- **FieldPageHeader**: Consistent page header
- **FieldFormSection**: Left column wrapper
- **FieldMapSection**: Right column wrapper

#### Fertilizer Components:
- **FertilizerFieldCard**: Field card with nutrient status
- **NutrientDeficitCard**: Highlights deficit issues
- **FieldNutrientBalanceCard**: Visual nutrient levels
- **UpcomingApplicationCard**: Timeline of applications
- **ApplicationCard**: Single application details
- **ProductDetailsModal**: Product information popup
- **RecordApplicationModal**: Form to record actual application

#### Irrigation Components:
- **IrrigationFieldCard**: Field card with moisture gauge
- **IrrigationSummaryCards**: Dashboard summary metrics

#### Layout Components:
- **Sidebar**: Collapsible navigation
- **Layout**: Main wrapper with sidebar + content

---

## 8. Responsive Design Strategy

### 8.1 Breakpoints

```typescript
Tailwind defaults:
  sm:  640px   (Tablets portrait)
  md:  768px   (Tablets landscape)
  lg:  1024px  (Desktops)
  xl:  1280px  (Large desktops)
  2xl: 1536px  (Extra large)
```

### 8.2 Responsive Patterns

#### Navigation
- **Desktop**: Hover-expand sidebar, full menu
- **Tablet**: Same as desktop
- **Mobile**: Hamburger menu, full-screen overlay

#### Grid Layouts
```typescript
Field Cards:
  - Mobile:  1 column (grid-cols-1)
  - Tablet:  2 columns (sm:grid-cols-2)
  - Desktop: 3 columns (lg:grid-cols-3)

Dashboard Stats:
  - Mobile:  1 column
  - Tablet:  2 columns
  - Desktop: 4 columns
```

#### Form + Map Layout
```typescript
Add/Edit Field:
  - Mobile:  Stacked (form on top, map below)
  - Desktop: Side-by-side (lg:grid-cols-3)
             Form: 1 col, Map: 2 cols
```

#### Typography Scale
```typescript
Hero Headlines:
  - Mobile:  text-5xl (48px)
  - Desktop: text-7xl (72px)

Page Titles:
  - Mobile:  text-2xl (24px)
  - Desktop: text-3xl (30px)
```

#### Spacing
```typescript
Content Padding:
  - Mobile:  px-2 py-4 (8px, 16px)
  - Tablet:  px-4 py-6 (16px, 24px)
  - Desktop: px-8 py-8 (32px, 32px)
```

### 8.3 Touch Optimization

- **Minimum tap target**: 44x44px
- **Button sizes**: Increased on mobile (lg variant)
- **Form inputs**: Larger hit areas on mobile
- **Modal actions**: Full-width buttons on mobile

---

## 9. Accessibility & Usability

### 9.1 Accessibility Standards

**Target**: WCAG 2.1 Level AA

#### Color Contrast
```
Text on backgrounds:
  - Normal text: 4.5:1 minimum
  - Large text: 3:1 minimum
  
Checked: green-700 on green-50 (passes)
         gray-900 on white (passes)
```

#### Keyboard Navigation
- All interactive elements focusable
- Focus indicators visible (ring-2 ring-green-400)
- Logical tab order
- Skip links (future enhancement)

#### Screen Reader Support
- Semantic HTML (nav, main, section, article)
- ARIA labels on icon-only buttons
- Alt text on images
- Form labels associated with inputs

#### Theme Support
- Light and dark themes
- Persisted in localStorage
- System preference detection (future)

### 9.2 Usability Principles

#### Feedback
- **Immediate**: Hover states, button press
- **Progress**: Loading spinners, skeleton screens
- **Completion**: Success toasts, error messages
- **State**: Disabled buttons, validation errors

#### Error Prevention
- Confirmation modals for destructive actions
- Validation before submission
- Clear required field indicators
- Helpful error messages

#### Recognition Over Recall
- Recent activities visible
- Breadcrumbs (implicit through titles)
- Icons + labels (not just icons)
- Persistent navigation

#### Efficiency
- Quick actions on cards
- Keyboard shortcuts (future)
- Batch operations (irrigation recommendations)
- Smart defaults (date pickers)

---

## 10. User Journey Maps

### 10.1 First-Time User Journey

```
Phase 1: Discovery (Landing Page)
  Emotion: Curious 😊
  Actions: Read features, watch demo
  Pain Points: Overwhelming information?
  Solution: Progressive disclosure, clear sections

Phase 2: Registration (Not implemented yet)
  Emotion: Hopeful 🙂
  Actions: Sign up, provide farm details
  Pain Points: Too many fields?
  Solution: Multi-step wizard, optional fields

Phase 3: Onboarding (Dashboard → Add First Field)
  Emotion: Learning 🤔
  Actions: Navigate UI, add first field
  Pain Points: Complex map drawing?
  Solution: Tutorial tooltips, example fields

Phase 4: First Value (View Field + Recommendations)
  Emotion: Excited 😀
  Actions: See visualizations, get insights
  Pain Points: Understanding metrics?
  Solution: Contextual help, tooltips

Phase 5: Habitual Use (Daily Checks)
  Emotion: Confident 😎
  Actions: Check irrigation, plan fertilizer
  Pain Points: Finding specific data?
  Solution: Dashboard shortcuts, search
```

### 10.2 Recurring User Journey (Daily Use)

```
Morning Check:
1. Open app → Dashboard
   └─> See alert badge (3 fields need irrigation)
   
2. Click on Irrigation card
   └─> View critical fields
   
3. Review recommendations
   └─> Note down actions
   
4. Mark as scheduled
   └─> Adds to calendar

Field Work Day:
1. Navigate to Field View
   └─> Check today's tasks
   
2. Complete irrigation
   └─> Record actual amounts via mobile
   
3. Take notes
   └─> Add observations
   
4. View updated status
   └─> Confirm moisture improved

Weekly Planning:
1. Navigate to Fertilizer Dashboard
   └─> See fields approaching application dates
   
2. Generate new plan for Field X
   └─> Adjust parameters for budget
   
3. Review and approve
   └─> Plan saved
   
4. Export schedule
   └─> PDF for team members

Monthly Review:
1. Navigate to Analytics
   └─> View yield trends
   
2. Compare plans vs actual
   └─> Identify improvements
   
3. Adjust strategies
   └─> Update crop rotation
```

---

## Appendix: Design Tokens Reference

### Shadows
```css
sm:    0 1px 2px 0 rgb(0 0 0 / 0.05)
md:    0 4px 6px -1px rgb(0 0 0 / 0.1)
lg:    0 10px 15px -3px rgb(0 0 0 / 0.1)
xl:    0 20px 25px -5px rgb(0 0 0 / 0.1)
2xl:   0 25px 50px -12px rgb(0 0 0 / 0.25)
```

### Border Radius
```css
sm:    0.125rem (2px)
md:    0.375rem (6px)
lg:    0.5rem (8px)
xl:    0.75rem (12px)
2xl:   1rem (16px)
full:  9999px (circular)
```

### Transitions
```css
Duration:
  - fast:     150ms
  - normal:   200ms
  - slow:     300ms
  
Easing:
  - ease-in-out: Default
  - ease-out: Hover states
```

### Z-Index Scale
```typescript
-1:  Behind content
0:   Base layer
10:  Sticky headers, sidebars
20:  Dropdowns, tooltips
30:  Modals, dialogs
40:  Toast notifications
50:  Critical overlays
```

---

## Conclusion

SmartAgroPlan's UI/UX is designed with the farmer's workflow in mind—prioritizing quick access to critical information, clear data visualization, and efficient task completion. The interface balances agricultural complexity with modern web usability standards, ensuring both novice and experienced users can effectively manage their farm operations.

**Key Takeaways**:
1. **Progressive Disclosure**: Show what's needed, hide what's not
2. **Visual Hierarchy**: Important info stands out
3. **Consistent Patterns**: Learned behaviors transfer across modules
4. **Responsive Feedback**: Users always know system state
5. **Agricultural Context**: Design speaks the farmer's language

For questions or suggestions, please refer to the project README or contact the development team.

