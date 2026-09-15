import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  BarChart3,
  Calendar,
  TrendingUp,
  CreditCard,
  Package,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const AnalyticsPage = () => {
  const { stats, sales, products, retailers, damageRecords, vehicles } = useCentralData();
  const [filter, setFilter] = useState('30d'); // 'today' | '7d' | '30d' | '3m' | '1y'

  // Multi-timeframe trend data
  const revenueTrendData = [
    { period: 'Week 1', sales: 98000, profit: 17640, credit: 32000 },
    { period: 'Week 2', sales: 124000, profit: 22320, credit: 41000 },
    { period: 'Week 3', sales: 142000, profit: 25560, credit: 48000 },
    { period: 'Week 4', sales: 121600, profit: 21880, credit: 38000 },
  ];

  const inventoryTurnoverData = products.map((p) => ({
    name: p.variety.split(' ')[0],
    stock: p.currentStock,
    min: p.minStockLevel
  }));

  const creditAgingData = [
    { name: '0 - 15 Days (Good)', value: 53950, color: '#10b981' },
    { name: '16 - 30 Days (Due Soon)', value: 60000, color: '#f59e0b' },
    { name: '31 - 60 Days (Overdue)', value: 14450, color: '#ef4444' },
  ];

  const deliveryFleetData = vehicles.map((v) => ({
    vehicle: v.vehicleNumber.split('-')[1] + '-' + v.vehicleNumber.split('-')[3],
    trips: v.totalTrips,
    load: v.currentLoadBags,
    capacity: v.capacityBags
  }));

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Wholesale Business Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data-driven insights across sales, profit, customer credit risk, inventory turns, and damage.
          </p>
        </div>

        {/* 5 Filter tabs: Today, 7 Days, 30 Days, 3 Months, 1 Year */}
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-subtle overflow-x-auto">
          {[
            { id: 'today', label: 'Today' },
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '3m', label: '3 Months' },
            { id: '1y', label: '1 Year' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Gross Profit Margin</span>
          <div className="text-2xl font-black text-emerald-800 mt-1">18.2%</div>
          <span className="text-[10px] text-emerald-600 font-semibold">+1.2% vs previous term</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Credit Recovery Rate</span>
          <div className="text-2xl font-black text-amber-700 mt-1">87.4%</div>
          <span className="text-[10px] text-slate-500 font-medium">Within 20-day cycle</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Delivery Time</span>
          <div className="text-2xl font-black text-blue-700 mt-1">4.2 Hrs</div>
          <span className="text-[10px] text-slate-500 font-medium">From order confirmation</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Damage Shrinkage</span>
          <div className="text-2xl font-black text-rose-700 mt-1">0.45%</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Below 0.5% benchmark</span>
        </div>
      </div>

      {/* Grid 1: Sales & Profit vs Credit Trend */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Revenue, Profit & Credit Issuance</h2>
            <p className="text-xs text-slate-500">Correlation between wholesale turnover and credit expansion</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Timeframe: {filter.toUpperCase()}</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#047857" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="period" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, '']} />
              <Legend />
              <Area type="monotone" dataKey="sales" name="Sales Turnover (₹)" stroke="#047857" strokeWidth={2.5} fill="url(#salesGrad)" />
              <Area type="monotone" dataKey="profit" name="Gross Profit (₹)" stroke="#d97706" strokeWidth={2} fill="url(#profitGrad)" />
              <Line type="monotone" dataKey="credit" name="Credit Issued (₹)" stroke="#2563eb" strokeWidth={2} strokeDasharray="4 4" dot={true} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid 2: Inventory Turnover vs Credit Risk Aging */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Stock Levels by Variety */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">Inventory Stock vs Safety Thresholds</h2>
            <p className="text-xs text-slate-500">Available bags compared with minimum reorder point</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryTurnoverData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" name="Current Stock (Bags)" fill="#047857" radius={[4, 4, 0, 0]} />
                <Bar dataKey="min" name="Min Safety Level" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credit Risk Aging Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Customer Credit Risk Aging</h2>
            <p className="text-xs text-slate-500">Aging buckets of outstanding receivables</p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={creditAgingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {creditAgingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Outstanding Dues']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-slate-500 text-center border-t border-slate-100 pt-3">
            Total Outstanding Receivables: <strong className="text-slate-900 font-mono">₹{stats.totalOutstandingCredit.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
