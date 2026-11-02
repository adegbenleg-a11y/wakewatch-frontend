# WakeWatch • Front-End Application

> **Real-Time AI Drowsiness and Alertness Monitoring System**  
> Built for **Bitnox Technology Solutions Ltd.**  
> *Last Floor, Majek Kembo Plaza, 24 Lalubu Road, Oke-Ilewo, Abeokuta, Ogun State, Nigeria.*

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Bitnox-Proprietary-05e4fc.svg)](https://bitnoxsolution.com/)

---

## 📌 1. Project Overview

**WakeWatch** is an intelligent vision system that monitors alertness levels in software development hubs, training cohorts, and classroom environments. Using a live camera feed evaluated by custom machine learning models, WakeWatch classifies individuals into three primary states:

| Status State | Meaning | Visual Indicator | Sound / Alert Action |
| :--- | :--- | :--- | :--- |
| **`AWAKE`** | Full focus & standard eye openness | Emerald Green (`#10b981`) | Passive telemetry logging |
| **`DROWSY`** | Microsleep risk, slow blink, yawning | Amber (`#f59e0b`) | Warning toast + visual status pill |
| **`SLEEPING`** | Continuous eye closure > threshold duration | Crimson Red (`#ef4444`) | Immediate audible chime + supervisor toast |

---

## 👥 2. 4-Person GitHub Team Structure

This repository is shared across our 4-person engineering team:

| Member Role | Core Ownership | Interface Boundary |
| :--- | :--- | :--- |
| **Front-End Engineer** *(Owner of this codebase)* | React + Vite UI, webcam capture (`getUserMedia`), responsive layouts, state duration timers, alert audio/visual triggers | Isolated exclusively to `src/api/client.js`. Does not invent backend logic. |
| **Back-End Engineer** | REST endpoints, WebSocket camera routing, session databases, incident persistence | Implements the endpoints defined in [`API_CONTRACT.md`](./API_CONTRACT.md). |
| **ML Engineer 1** | Model training, Eye Aspect Ratio (EAR), PERCLOS fatigue algorithms | Outputs face bounding boxes & state classifications (`AWAKE`, `DROWSY`, `SLEEPING`). |
| **ML Engineer 2** | Model optimization, Mouth Aspect Ratio (MAR) yawn detector, head pose estimation | Optimizes real-time FPS throughput on edge video streams. |

---

## 🚀 3. Getting Started & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** / **pnpm**

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/bitnox-technology/wakewatch-frontend.git
cd wakewatch-frontend

# 2. Install dependencies
npm install

# 3. Create local environment configuration
cp .env.example .env

# 4. Start the development server
npm run dev
```
Open your browser at [http://localhost:3000](http://localhost:3000).

---

## 📜 4. Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR) at port 3000 |
| `npm run build` | Compiles production assets into the `/dist` directory |
| `npm run preview` | Locally serves the compiled production build for sanity testing |

---

## 📁 5. Folder Structure

```text
wakewatch/
├── public/                     # Static assets (favicons, icons)
├── src/
│   ├── api/
│   │   ├── client.js           # SINGLE SOURCE of all backend calls (documented with JSON schemas)
│   │   └── mock.js             # Realistic mock simulation layer (used when VITE_USE_MOCK=true)
│   ├── assets/                 # Brand logos, SVGs, imagery
│   ├── components/
│   │   ├── alerts/
│   │   │   └── IncidentSideDrawer.jsx  # Slide-over incident detail drawer (Acknowledge/Dismiss)
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx      # Route guard redirecting unauthenticated users to /login
│   │   ├── common/             # Reusable Bitnox UI primitives
│   │   │   ├── Badge.jsx       # Status and indicator badges with pulse dots
│   │   │   ├── Button.jsx      # Primary, secondary, outline, danger, loading states
│   │   │   ├── Card.jsx        # Frosted glass, solid, elevated, and interactive cards
│   │   │   ├── ErrorBoundary.jsx # Global error boundary fallback container
│   │   │   ├── Input.jsx       # Accessible form inputs with validation and icon slots
│   │   │   ├── Modal.jsx       # Accessible dialogs with backdrop blur
│   │   │   ├── Skeleton.jsx    # Pulsing skeleton loaders for async data
│   │   │   └── Table.jsx       # Responsive telemetry and log tables
│   │   ├── dashboard/
│   │   │   ├── AlertnessLineChart.jsx   # Recharts Line chart of focus across the day
│   │   │   ├── HourlyAlertsBarChart.jsx # Recharts Bar chart of Drowsy vs Sleeping flags
│   │   │   ├── NeedsAttentionList.jsx   # Cohort members currently flagged
│   │   │   └── StatCards.jsx            # 5 top KPI metrics cards
│   │   ├── detection/
│   │   │   ├── CameraViewport.jsx       # Webcam video feed with dynamic bounding box overlay
│   │   │   ├── DetectionLogPanel.jsx    # Recent 10 inferences stream (newest first)
│   │   │   ├── LiveControlsBar.jsx      # Start/stop, camera selector, sensitivity slider
│   │   │   ├── StatusDurationBanner.jsx # Large StatusPill + live MM:SS state duration timer
│   │   │   └── StatusPill.jsx           # AWAKE, DROWSY, SLEEPING domain indicator
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx   # Shell with desktop Sidebar, TopBar, and mobile BottomNav
│   │   │   ├── BottomNav.jsx   # Mobile bottom navigation bar
│   │   │   ├── Footer.jsx      # Persistent Bitnox Abeokuta address & credits
│   │   │   ├── Navbar.jsx      # Public navigation bar
│   │   │   ├── Sidebar.jsx     # Desktop left navigation bar
│   │   │   └── TopBar.jsx      # Top app bar with notifications popover and user menu
│   │   └── people/
│   │       └── PersonModal.jsx # Add / Edit cohort member modal dialog
│   ├── context/
│   │   └── AuthContext.jsx     # Auth state provider, role switcher, localStorage session
│   ├── hooks/
│   │   └── useWebcam.js        # Browser getUserMedia hook with camera enumeration
│   ├── pages/
│   │   ├── Alerts.jsx          # Incident logs table, search, filters, pagination, drawer, audio toast
│   │   ├── Dashboard.jsx       # Top KPIs, Recharts focus curves, needs attention list
│   │   ├── DesignSystem.jsx    # Style guide showcase (/design) with all component states
│   │   ├── Landing.jsx         # Public landing page with Hero HUD, 3-step workflow, privacy note
│   │   ├── LiveMonitor.jsx     # Camera viewport, live bounding box HUD, 1.5s inference polling
│   │   ├── Login.jsx           # Bitnox branded sign-in with 1-click role demo hints
│   │   ├── NotFound.jsx        # Cyber-telemetry 404 signal lost page
│   │   ├── People.jsx          # Cohort directory with Grid/Table view and Add modal
│   │   ├── PersonProfile.jsx   # Individual member profile, weekly chart, and flag history
│   │   ├── Reports.jsx         # Daily/Weekly/Monthly views, Recharts, CSV export, Print/PDF
│   │   └── Settings.jsx        # Thresholds, notifications, cameras, user roles, theme toggle
│   ├── styles/
│   │   └── tokens.css          # Bitnox Design System CSS custom properties
│   ├── utils/
│   │   └── audioAlert.js       # Synthetic Web Audio API alarm and warning chime synthesizer
│   ├── App.jsx                 # Top-level routing and layout configuration
│   ├── index.css               # Tailwind directives and Bitnox glassmorphic classes
│   └── main.jsx                # React DOM bootstrap
├── .env                        # Local active environment variables
├── .env.example                # Template for environment variables
├── API_CONTRACT.md             # Formal REST & WebSocket contract for backend teammates
├── index.html                  # HTML template with Google Fonts (Sora & Geist)
├── package.json                # Dependencies and npm scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind theme extended with Bitnox tokens
├── vite.config.js              # Vite build config with '@' path alias
└── README.md                   # This documentation
```

---

## ⚙️ 6. Environment Variables & Switching to Real Backend

### `.env` Configuration File
```bash
# Backend server URL (provided by backend teammate)
VITE_API_URL=http://localhost:8000/api

# Mock Mode Switch:
# - Set to "true" while backend is under development (uses mock.js)
# - Set to "false" to connect to real endpoints
VITE_USE_MOCK=true

# Application Metadata
VITE_APP_NAME="WakeWatch"
VITE_COMPANY_NAME="Bitnox Technology Solutions"
VITE_LOCATION="Abeokuta, Ogun State, Nigeria"
VITE_PORT=3000
```

### How to Switch to the Real Backend:
1. Open `.env`.
2. Change `VITE_USE_MOCK=true` to `VITE_USE_MOCK=false`.
3. Set `VITE_API_URL` to your backend server URL (e.g. `http://localhost:8000/api`).
4. Restart your Vite dev server (`npm run dev`).
5. All calls in `src/api/client.js` will now automatically query your backend teammate's endpoints without modifying any component code!

---

## 🤝 7. Team Contribution Rules (GitHub Collaboration)

To maintain code cleanliness across our 4-person repository:

### 1. Branch Naming Conventions
Always branch from `main`:
- **Front-End Features:** `feat/frontend-<feature-name>` (e.g., `feat/frontend-live-camera`)
- **Back-End Features:** `feat/backend-<endpoint-name>` (e.g., `feat/backend-alerts-api`)
- **ML Models:** `feat/model-<task-name>` (e.g., `feat/model-yawn-detector`)
- **Bug Fixes:** `fix/<issue-description>` (e.g., `fix/bounding-box-alignment`)
- **Documentation:** `docs/<topic>` (e.g., `docs/api-contract-update`)

### 2. Commit Message & PR Title Conventions
We follow the **Conventional Commits** specification:
- `feat(ui): add state duration timer and bounding box HUD to LiveMonitor`
- `feat(api): implement getPrediction inference polling in client.js`
- `fix(webcam): handle NotAllowedError with simulated feed fallback`
- `docs(readme): add contribution rules and environment setup guide`
- `style(theme): refine Bitnox cyan contrast ratio on dark surfaces`

### 3. Pull Request (PR) Requirements
1. **Scope:** One PR per discrete feature or chunk.
2. **Review:** At least 1 teammate must review and approve before merging into `main`.
3. **No Direct Pushes to `main`:** All code merges via Pull Requests with a clean linear commit history.

---

## 📑 8. Complete API Contract for Teammates
For the complete list of HTTP methods, request bodies, query parameters, and example response JSON payloads, refer to:  
👉 [**`API_CONTRACT.md`**](./API_CONTRACT.md)
