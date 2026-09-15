import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Store,
  CreditCard,
  Package,
  AlertTriangle,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  Database,
  BarChart3,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useCentralData } from '../../context/CentralDataContext';

export const LandingPage = ({ onNavigate }) => {
  const { setCurrentRole } = useCentralData();

  const handleLaunchRole = (role, path) => {
    setCurrentRole(role);
    onNavigate(path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-900 font-sans selection:bg-emerald-800 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-amber-500 flex items-center justify-center text-xl shadow-sm">
              🌾
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-slate-900">
                Rice<span className="text-amber-600">ERP</span>
              </div>
              <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                Digital Trade Solution
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#problems" className="hover:text-emerald-800 transition-colors">The Problems</a>
            <a href="#solutions" className="hover:text-emerald-800 transition-colors">Digital Solutions</a>
            <a href="#roles" className="hover:text-emerald-800 transition-colors">User Roles</a>
            <a href="#benefits" className="hover:text-emerald-800 transition-colors">Business Impact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/login')}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => handleLaunchRole('admin', '/admin')}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-subtle hover:shadow-elevation"
            >
              <span>Launch Demo ERP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-white via-[#F4F7F4] to-[#F8FAF8] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-6 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Digital Trade Transformation for Rice Wholesalers
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
              Smart Digital Management for <span className="text-emerald-800 underline decoration-amber-500/60 decoration-wavy">Rice Wholesale</span> Businesses
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Manage credit, wholesale orders, fleet deliveries, grain inventory, and automated business records — all in one connected, real-time platform.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => handleLaunchRole('admin', '/admin')}
                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-elevation transition-all hover:-translate-y-0.5"
              >
                <span>Launch Admin ERP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/login')}
                className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-sm font-bold border border-slate-300 shadow-subtle transition-all hover:-translate-y-0.5"
              >
                <span>Simulate 3 User Roles</span>
              </button>
            </div>

            {/* Quick badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> GST-Compliant Ledger
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transit Damage Tracking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real-time Multi-Role Sync
              </span>
            </div>
          </div>

          {/* Hero Dashboard Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-slate-200 to-slate-100 border border-slate-300 shadow-premium">
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200/90 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-400 ml-2">rice-erp.wholesale.trade/admin</span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Live Operations Feed
                </span>
              </div>

              {/* Mock Dashboard Preview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Wholesale Sales</span>
                  <div className="text-lg font-black text-slate-900 mt-1">₹4,85,600</div>
                  <span className="text-[10px] text-emerald-700 font-bold">+14.2% this month</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800">Outstanding Credit</span>
                  <div className="text-lg font-black text-amber-900 mt-1">₹1,28,400</div>
                  <span className="text-[10px] text-amber-700 font-bold">5 Overdue accounts</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Current Stock</span>
                  <div className="text-lg font-black text-slate-900 mt-1">2,450 Bags</div>
                  <span className="text-[10px] text-slate-500 font-medium">6 Rice Varieties</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200">
                  <span className="text-[10px] uppercase font-bold text-blue-800">Pending Deliveries</span>
                  <div className="text-lg font-black text-blue-900 mt-1">18 Dispatches</div>
                  <span className="text-[10px] text-blue-700 font-bold">3 Trucks en route</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                    Live Central Synchronization
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    Changes made in Retailer orders or Delivery Staff reports update the Merchant ledger instantly.
                  </div>
                </div>
                <button
                  onClick={() => handleLaunchRole('admin', '/admin')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0"
                >
                  Explore Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problems" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              The Real-World Dilemma
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Why Traditional Rice Wholesale Shops Struggle
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Rice wholesale businesses operate on slim 3–6% margins. Manual book-keeping and uncoordinated transit cause compounding losses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition-all">
              <div className="p-3 w-fit rounded-xl bg-rose-100 text-rose-700 mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Customer Credit Traps</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Handwritten khata books lack credit limit alerts. Retailers delay payments by months, crippling wholesale cash flow.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all">
              <div className="p-3 w-fit rounded-xl bg-amber-100 text-amber-700 mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Transportation Blindspots</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                No real-time tracking of bag dispatch, driver delivery proofs, or fleet capacity. Frequent phone calls waste hours daily.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all">
              <div className="p-3 w-fit rounded-xl bg-blue-100 text-blue-700 mb-4">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Manual Record Keeping</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Scattered receipts, bill books, and godown tallies. Calculating monthly net profit and GST invoices takes days.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all">
              <div className="p-3 w-fit rounded-xl bg-purple-100 text-purple-700 mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Untracked Damage & Wastage</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Hook tears, moisture seepage, and bad stacking go unrecorded. Wholesalers absorb thousands in unaccounted losses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section id="solutions" className="py-20 bg-[#F8FAF8] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              The Digital Solution
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              A Unified ERP Tailored for Grain Wholesale
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Every operation from mill procurement to retail shelf delivery in a single synchronized portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevation transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-800 text-white">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Digital Credit Ledger</h3>
                  <p className="text-xs text-slate-500">Automated limits, aging buckets & reminder triggers</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Set custom credit limits per retailer. The system automatically halts credit order creation when limits are breached, logs every payment installment, and generates WhatsApp/SMS settlement reminders.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Limit Warnings</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Aging Analysis</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">1-Click Statements</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevation transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-600 text-white">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Delivery & Fleet Manager</h3>
                  <p className="text-xs text-slate-500">Vehicle loading, trip stages & driver dispatch</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Assign orders directly to delivery staff and fleet trucks (Eicher, Tata 407). Track delivery progression from Order Confirmed → Preparing → Out for Delivery → Delivered in real-time.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Fleet Capacity Gauges</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Timeline Tracking</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Driver Portal</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevation transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-700 text-white">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Inventory & Damage Tracker</h3>
                  <p className="text-xs text-slate-500">Ponni, Idli, Sona Masuri, Basmati in 25/50kg bags</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Live bag inventory automatically increments with mill purchases and decrements on confirmed sales or reported transit damage. Low-stock alerts prevent stock-outs of high-demand grains.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Reorder Thresholds</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Transit Tear Auditing</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Auto Stock Reduction</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevation transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-700 text-white">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Automated Records & P&L</h3>
                  <p className="text-xs text-slate-500">Daily, Weekly & Monthly Profit & Loss Reports</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Seamlessly tallies sales, mill procurement, labor charges, diesel, and godown lease. Instant Gross Margin and Net Profit calculations with 1-click Excel and GST Tax Invoice export.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Automated P&L</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Excel / PDF Export</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700">Expense Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Role-Based Access
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Three Connected Roles. One Central System.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Select any role below to experience the specialized interface for each stakeholder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Role 1: Shop Owner / Admin */}
            <div className="p-6 rounded-2xl border-2 border-emerald-800 bg-emerald-50/30 flex flex-col justify-between shadow-subtle hover:shadow-elevation transition-all">
              <div>
                <div className="p-3 w-fit rounded-xl bg-emerald-800 text-white mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">1. Shop Owner / Admin</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Full command center. Monitor daily sales, approve credit limits, assign trucks, view automated P&L statements, and analyze recurring transit damage.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Complete 13 ERP modules</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Credit blocking controls</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Inventory & Mill purchases</li>
                </ul>
              </div>
              <button
                onClick={() => handleLaunchRole('admin', '/admin')}
                className="mt-6 w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Enter Admin Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Role 2: Retailer */}
            <div className="p-6 rounded-2xl border-2 border-amber-500 bg-amber-50/30 flex flex-col justify-between shadow-subtle hover:shadow-elevation transition-all">
              <div>
                <div className="p-3 w-fit rounded-xl bg-amber-600 text-white mb-4">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">2. Retailer / Customer</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Dedicated customer portal for grocery shops (e.g. Ravi Traders). Browse wholesale rice stock, place 25kg/50kg bag orders, check ledger dues, and track incoming delivery.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Place wholesale bag orders</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Real-time credit balance</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Live delivery stage tracking</li>
                </ul>
              </div>
              <button
                onClick={() => handleLaunchRole('retailer', '/retailer')}
                className="mt-6 w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Enter Retailer Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Role 3: Delivery Staff */}
            <div className="p-6 rounded-2xl border-2 border-blue-600 bg-blue-50/30 flex flex-col justify-between shadow-subtle hover:shadow-elevation transition-all">
              <div>
                <div className="p-3 w-fit rounded-xl bg-blue-700 text-white mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">3. Delivery Staff</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Mobile-friendly dispatch board for drivers (Selvam M.). View assigned drops, update trip progress (Out for Delivery → Arrived → Delivered), and report torn bags on the go.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> 1-tap delivery progress updates</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Quick damage reporting</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Trip mileage & fuel logs</li>
                </ul>
              </div>
              <button
                onClick={() => handleLaunchRole('delivery', '/delivery')}
                className="mt-6 w-full py-2.5 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Enter Driver Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
              Measurable Business ROI
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3 tracking-tight">
              Quantifiable Impact on Wholesale Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">85%</div>
              <div className="text-sm font-bold mt-2">Less Overdue Credit</div>
              <p className="text-xs text-emerald-200/80 mt-1">
                Automated credit blocking & reminder notices reduce payment default drastically.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">30%</div>
              <div className="text-sm font-bold mt-2">Lower Transport Overhead</div>
              <p className="text-xs text-emerald-200/80 mt-1">
                Optimized bag loading and route assignments eliminate empty backhauls.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">100%</div>
              <div className="text-sm font-bold mt-2">Accurate Records</div>
              <p className="text-xs text-emerald-200/80 mt-1">
                Zero discrepancies between bill books, godown tallies, and customer accounts.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-400">70%</div>
              <div className="text-sm font-bold mt-2">Reduced Transit Loss</div>
              <p className="text-xs text-emerald-200/80 mt-1">
                Identifying recurring vehicle and loading issues cuts torn bag spillage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌾</span>
            <div>
              <div className="text-sm font-bold text-white">RiceERP Wholesale Trade Platform</div>
              <p className="text-slate-500">“Digital Solution for Trade – Solving Rice Wholesale Shop Problems with a Website”</p>
            </div>
          </div>
          <div className="flex gap-6 font-medium">
            <button onClick={() => handleLaunchRole('admin', '/admin')} className="hover:text-white transition-colors">Admin ERP</button>
            <button onClick={() => handleLaunchRole('retailer', '/retailer')} className="hover:text-white transition-colors">Retailer Portal</button>
            <button onClick={() => handleLaunchRole('delivery', '/delivery')} className="hover:text-white transition-colors">Delivery App</button>
            <button onClick={() => onNavigate('/login')} className="hover:text-white transition-colors">Role Simulation</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
