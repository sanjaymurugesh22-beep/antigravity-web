import React from 'react';
import { Modal } from './Modal';
import { useCentralData } from '../../context/CentralDataContext';
import {
  Database,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  Truck,
  Store,
  RefreshCw,
  TrendingUp,
  PackageCheck,
  AlertOctagon,
  CreditCard,
  Layers
} from 'lucide-react';

export const SystemArchModal = ({ isOpen, onClose }) => {
  const { currentRole, setCurrentRole, stats, resetToDefaults } = useCentralData();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Central Database & Real-Time Sync Architecture"
      subtitle="How the 3 roles communicate with live shared mock state across wholesale operations"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white flex items-center justify-between shadow-elevation">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30">
              <Database className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base">Unified Reactive State Engine</h4>
              <p className="text-xs text-emerald-200/80">
                Single source of truth syncing Admin, Retailer, and Delivery Staff instantly without page refresh.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all demo data back to clean initial state?')) {
                resetToDefaults();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-lg border border-white/20 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Demo Data
          </button>
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 relative overflow-hidden">
          {/* Top Level: User Roles */}
          <div className="text-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Connected Multi-Role Clients
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            {/* Role 1: Admin */}
            <div
              onClick={() => {
                setCurrentRole('admin');
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                currentRole === 'admin'
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-700 text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1. Shop Owner / Admin</div>
                  <div className="text-[11px] text-slate-500">Approvals, P&L, Fleet & Stock</div>
                </div>
              </div>
              {currentRole === 'admin' && (
                <div className="mt-2 text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded text-center">
                  Active View
                </div>
              )}
            </div>

            {/* Role 2: Retailer */}
            <div
              onClick={() => {
                setCurrentRole('retailer');
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                currentRole === 'retailer'
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-600 text-white">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">2. Retailer / Customer</div>
                  <div className="text-[11px] text-slate-500">Place Orders, Ledger, Dues</div>
                </div>
              </div>
              {currentRole === 'retailer' && (
                <div className="mt-2 text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded text-center">
                  Active View
                </div>
              )}
            </div>

            {/* Role 3: Delivery Staff */}
            <div
              onClick={() => {
                setCurrentRole('delivery');
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                currentRole === 'delivery'
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-700 text-white">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">3. Delivery Staff</div>
                  <div className="text-[11px] text-slate-500">Trip Status & Damage Logging</div>
                </div>
              </div>
              {currentRole === 'delivery' && (
                <div className="mt-2 text-[10px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded text-center">
                  Active View
                </div>
              )}
            </div>
          </div>

          {/* Central Connecting Arrows */}
          <div className="flex justify-center my-3 text-slate-400">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Hub: Central Database Engine */}
          <div className="bg-white border-2 border-emerald-700/80 rounded-2xl p-5 shadow-card text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              Central Database State (Reactive Store)
            </div>
            <p className="text-xs text-slate-600">
              Synchronizes in-memory and local storage data stores. Auto-computes margins, stock thresholds, and transaction ledgers.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Stock</span>
                <span className="text-sm font-extrabold text-slate-800">{stats.totalCurrentStockBags} Bags</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Credit</span>
                <span className="text-sm font-extrabold text-amber-700">₹{stats.totalOutstandingCredit.toLocaleString()}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending Drops</span>
                <span className="text-sm font-extrabold text-blue-700">{stats.pendingDeliveriesCount} Active</span>
              </div>
            </div>
          </div>

          {/* Downward Channels */}
          <div className="flex justify-center my-3 text-slate-400">
            <ArrowDown className="w-6 h-6 text-slate-300" />
          </div>

          {/* Operational Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <CreditCard className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-800">Credit Ledger & Dues</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Auto-blocks orders if limit exceeded</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <PackageCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-800">Order Dispatch & Fleet</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Live driver assignment & tracking</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <AlertOctagon className="w-5 h-5 text-rose-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-800">Damage & Inventory Sync</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Deducts stock immediately on loss</div>
            </div>
          </div>
        </div>

        {/* Live Interaction Demonstration Scenarios */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-700" />
            Live Sync Demonstration Scenarios
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <strong className="text-slate-900 block mb-1">Scenario A: Retailer Order</strong>
              <p className="text-slate-600">
                When a retailer places an order on credit, the credit ledger validates their balance. Upon order confirmation, stock automatically decrements and the delivery driver gets the trip alert.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <strong className="text-slate-900 block mb-1">Scenario B: Transit Damage</strong>
              <p className="text-slate-600">
                When a driver reports 3 torn bags on truck TN-28-AP-4521, inventory decreases immediately by 3 bags, financial loss is tallied, and the damage analytics chart updates.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <strong className="text-slate-900 block mb-1">Scenario C: Credit Settlement</strong>
              <p className="text-slate-600">
                When a retailer pays via UPI or Cheque, their outstanding balance drops, restoring available credit limit in real-time on both Admin and Retailer dashboards.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            Close Overview
          </button>
        </div>
      </div>
    </Modal>
  );
};
