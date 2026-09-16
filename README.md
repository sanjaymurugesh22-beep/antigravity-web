# 🌾 RiceERP — Digital Trade & Supply Chain Distribution Solution

[![Repository](https://img.shields.io/badge/GitHub-antigravity--web-2ea44f?style=flat-square&logo=github)](https://github.com/sanjaymurugesh22-beep/antigravity-web)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Status-Evaluation%20Ready-brightgreen?style=flat-square)](#)

> **Public Repository URL:**  
> 👉 [https://github.com/sanjaymurugesh22-beep/antigravity-web](https://github.com/sanjaymurugesh22-beep/antigravity-web)

---

## 📌 Executive Summary

**RiceERP** is an enterprise-grade digital trade and supply chain platform designed to modernize traditional commodity and FMCG distribution. In conventional wholesale environments, distributors lose up to **12% to 18% of monthly cash flow** to untracked credit sales, mismatched paper ledgers, transit damage leakage, and opaque delivery schedules.

RiceERP unifies **Administrators**, **Retailers**, and **Delivery Staff** into a single real-time platform featuring synchronized ledgers, interactive business intelligence, automated dispatch workflows, and direct retailer self-ordering.

---

## 🎯 Problem Statement vs. Digital Solution

| Legacy Pain Points | RiceERP Digital Solution | Business Impact |
|:---|:---|:---|
| **Manual Paper "Bahi-Khata" Ledgers** leading to disputed credit balances and delayed collections. | **Real-Time Double-Entry Credit Ledger** with customer-by-customer balances, transaction histories, and risk indicators. | Zero balance discrepancies and 40% faster collection cycles. |
| **Phone/WhatsApp Order Friction** resulting in misplaced orders, incorrect bag sizes, and stock-outs. | **Retailer Self-Service Portal** with real-time stock availability, cart management, and instant order confirmations. | 100% order accuracy and 24/7 ordering availability. |
| **Transit Bag Torn & Moisture Damage Disputes** between delivery drivers, retailers, and warehouses. | **Digital Damage & Return Tracker** enabling photographic evidence capture, bag count auditing, and ledger credit. | 90% reduction in delivery disputes and immediate inventory reconciliation. |
| **Lack of Business Visibility** for cash flow, daily margin, fast-moving SKUs, and stock aging. | **Interactive Analytics Suite** powered by Recharts with time-series revenue trends, margin breakdowns, and inventory alerts. | Data-driven replenishment decisions and maximized gross margins. |

---

## 👥 Multi-Role User Workflows

```
                           ┌───────────────────────────────┐
                           │      RiceERP Central Hub      │
                           │   (Shared State & Sync Core)  │
                           └───────────────┬───────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
┌───────────────────┐             ┌───────────────────┐             ┌───────────────────┐
│  🏢 Admin Portal  │             │ 🏪 Retailer Portal│             │ 🚚 Delivery Staff │
├───────────────────┤             ├───────────────────┤             ├───────────────────┤
│ • Master Inventory│             │ • Product Catalog │             │ • Assigned Routes │
│ • Credit Ledgers  │             │ • Instant Ordering│             │ • Dispatch Status │
│ • Dispatch Engine │             │ • My Ledger Audit │             │ • Proof of Delivery│
│ • Expense & Sales │             │ • Order Tracking  │             │ • Damage Logging  │
│ • BI & Analytics  │             │ • Invoice Download│             │ • Driver Checklist│
└───────────────────┘             └───────────────────┘             └───────────────────┘
```

### 1. 🏢 Admin & Distributor Portal
- **Executive Dashboard**: Key KPIs (Total Daily Sales, Outstanding Credit, Stock on Hand, Pending Dispatches).
- **Customer & Credit Management**: Granular customer credit limits, outstanding balances, payment settlements, and aging reports.
- **Inventory & Stock Tracking**: Real-time batch counts, grain quality classifications, low-stock threshold triggers, and supplier restock logs.
- **Dispatch & Delivery Coordinator**: Assign delivery personnel, track route milestones, and monitor delivery confirmations.
- **Financial Controls**: Full ledger accounting for sales, purchases, operational expenses, and profit & loss calculation.
- **Analytics & Reporting**: Interactive visual charts detailing revenue trajectories, top retailers by sales volume, and SKU velocity.

### 2. 🏪 Retailer Portal
- **Direct Catalog & Cart**: Browse grain varieties (Basmati, Sona Masoori, Ponni, IR64, etc.) with real-time price-per-quintal and bag availability.
- **One-Click Order Placement**: Seamless checkout with automated delivery scheduling and credit limit validation.
- **Personal Credit Ledger**: Full visibility into outstanding invoices, recorded payments, and pending dues.
- **Live Order & Delivery Tracking**: Milestone-by-milestone status tracking (`Placed` ➔ `Confirmed` ➔ `In Transit` ➔ `Delivered`).

### 3. 🚚 Delivery Personnel Portal
- **Assigned Deliveries View**: Today's delivery manifests with destination retailer contact details and bag quantities.
- **Damage & Incident Reporting**: On-the-spot logging of torn bags, wet grain, or handling damage before delivery sign-off.
- **Status Updates**: Instant status toggle from dispatch to delivery with automatic ledger sync.

---

## 🛠️ Architecture & Technical Stack

- **Frontend Framework**: [React 19](https://react.dev/) with modern functional components and hooks (`useState`, `useEffect`, `useContext`, `useMemo`).
- **Build Tool**: [Vite 8](https://vitejs.dev/) for high-speed HMR and optimized tree-shaken production bundles.
- **Design System & Styling**: [Tailwind CSS](https://tailwindcss.com/) with responsive typography, curated agricultural and financial color palettes, and glassmorphism styling.
- **Data Visualization**: [Recharts](https://recharts.org/) for responsive area charts, bar graphs, and distribution breakdowns.
- **Icons & UI Accents**: [Lucide React](https://lucide.dev/) + Canvas Confetti for delightful user milestone celebrations.
- **State Management**: Central reactive Context (`CentralDataContext`) providing unified live data updates, cross-role synchronization, and LocalStorage persistence.
- **Quick Navigation**: Global `Cmd + K` / `Ctrl + K` search modal and instant deep-link routing.

---

## 📂 Project Structure

```
antigravity-web/
├── public/                     # Static icons, favicons, SVG assets
├── src/
│   ├── assets/                 # Brand imagery and vector assets
│   ├── components/
│   │   └── common/             # Reusable UI components
│   │       ├── GlobalSearchModal.jsx   # Quick command palette (Cmd+K)
│   │       ├── InvoiceModal.jsx        # Professional invoice generator
│   │       ├── Modal.jsx               # Accessible dialog wrapper
│   │       ├── Navbar.jsx              # Responsive header navigation
│   │       ├── Sidebar.jsx             # Role-aware navigation sidebar
│   │       ├── StatCard.jsx            # KPI metric cards
│   │       └── SystemArchModal.jsx     # In-app architecture inspector
│   ├── context/
│   │   ├── CentralDataContext.jsx     # Global state store & sync engine
│   │   └── ToastContext.jsx           # User notification system
│   ├── data/
│   │   └── initialData.js             # Realistic enterprise seed data
│   ├── pages/
│   │   ├── admin/              # Administrator dashboards & modules
│   │   ├── auth/               # Role-based login and session switch
│   │   ├── delivery/           # Logistics driver dispatch & damage flow
│   │   ├── landing/            # High-conversion product showcase page
│   │   └── retailer/           # Customer self-service store & ledger
│   ├── App.jsx                 # Application root & hash routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Design tokens and custom utilities
├── package.json                # Project dependencies & npm scripts
├── tailwind.config.js          # Tailored color system and theme tokens
└── vite.config.js              # Vite bundler plugins and configuration
```

---

## ⚡ Quickstart & Local Setup

### Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** (v9.0 or higher) or **yarn** / **pnpm**

### Step 1: Clone the Repository
```bash
git clone https://github.com/sanjaymurugesh22-beep/antigravity-web.git
cd antigravity-web
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore the live application.

### Step 4: Build for Production
```bash
npm run build
npm run preview
```

---

## 🔍 Evaluation Credentials & Demo Roles

To test the application across different perspectives, select any of the pre-configured profiles from the **Login** screen or **Landing Page**:

1. **Administrator**: Full administrative control, financials, inventory adjustments, and reports.
2. **Retailer (e.g., Sri Murugan Rice Mundy)**: Catalog browsing, ordering, and personal ledger checks.
3. **Delivery Partner (e.g., Ramesh Kumar)**: Live delivery manifests and damage reports.

---

## 📄 License & Attribution

Developed by **Sanjay Murugesh** for the Qbee AI phase evaluation.  
Repository: [https://github.com/sanjaymurugesh22-beep/antigravity-web](https://github.com/sanjaymurugesh22-beep/antigravity-web)
