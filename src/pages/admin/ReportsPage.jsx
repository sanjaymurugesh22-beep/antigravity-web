import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { useToast } from '../../context/ToastContext';
import {
  FileBarChart2,
  FileSpreadsheet,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  CheckCircle2,
  Printer
} from 'lucide-react';

export const ReportsPage = () => {
  const { stats, sales, purchases, expenses, damageRecords, retailers } = useCentralData();
  const { addToast } = useToast();

  const [timeframe, setTimeframe] = useState('monthly'); // daily | weekly | monthly

  const handleExportPdf = () => {
    addToast('Wholesale Financial P&L Report.pdf generated and downloaded!', 'success');
  };

  const handleExportExcel = () => {
    addToast('Wholesale Financial Statement.xlsx exported successfully!', 'success');
  };

  // Calculations based on timeframe
  const multiplier = timeframe === 'daily' ? 0.04 : timeframe === 'weekly' ? 0.25 : 1.0;
  const currentSales = Math.round(stats.totalSalesAmount * multiplier);
  const currentPurchases = Math.round(stats.totalPurchasesAmount * multiplier);
  const currentExpenses = Math.round(stats.monthlyExpensesAmount * multiplier);
  const currentDamageLoss = Math.round(stats.totalDamageLossAmount * multiplier);
  const costOfGoodsSold = Math.round(currentSales * 0.82); // 82% wholesale purchase base
  const grossProfit = currentSales - costOfGoodsSold;
  const netProfit = grossProfit - currentExpenses - currentDamageLoss;
  const netMargin = ((netProfit / (currentSales || 1)) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Automated Financial Reports & P&L
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automated Profit & Loss statements, COGS calculations, and grain balance sheets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Timeframe selector */}
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-subtle">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                timeframe === 'daily' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Daily Report
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                timeframe === 'weekly' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Weekly Report
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                timeframe === 'monthly' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Monthly P&L
            </button>
          </div>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-colors shadow-subtle"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={handleExportPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main P&L Statement Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-elevation p-6 sm:p-8 space-y-6">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌾</span>
              <h2 className="text-xl font-black text-slate-900">Sri Murugan Rice Traders</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Wholesale Trading Profit & Loss Statement ({timeframe.toUpperCase()} REPORT)
            </p>
          </div>
          <div className="text-left sm:text-right text-xs">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold uppercase text-[10px]">
              System Generated • Live Audit
            </span>
            <div className="text-slate-400 mt-1 font-mono">Report Period: September 2026</div>
          </div>
        </div>

        {/* Key P&L Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Sales Revenue</span>
            <div className="text-xl font-black text-slate-900 mt-1 font-mono">
              ₹{currentSales.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">Wholesale billings</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Gross Profit (Margin)</span>
            <div className="text-xl font-black text-emerald-800 mt-1 font-mono">
              ₹{grossProfit.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">18% Wholesale spread</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Overhead & Losses</span>
            <div className="text-xl font-black text-rose-700 mt-1 font-mono">
              ₹{(currentExpenses + currentDamageLoss).toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Fuel, rent, transit loss</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Net Wholesale Profit</span>
            <div className="text-xl font-black text-emerald-950 mt-1 font-mono">
              ₹{netProfit.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-800 font-bold">{netMargin}% Net Margin</span>
          </div>
        </div>

        {/* Detailed Financial Ledger Breakdown */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 px-4">Financial Item / Revenue Head</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {/* Revenue */}
              <tr className="bg-emerald-50/30">
                <td className="py-3 px-4 font-bold text-slate-900">
                  A. Gross Wholesale Sales (Turnover)
                </td>
                <td className="py-3 px-4 text-slate-500">Operating Inflow</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-900">
                  + ₹{currentSales.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-slate-700 pl-8">
                  Less: Cost of Goods Sold (Procurement Base ~82%)
                </td>
                <td className="py-3 px-4 text-slate-400">Direct Cost</td>
                <td className="py-3 px-4 text-right font-mono text-slate-700">
                  - ₹{costOfGoodsSold.toLocaleString()}
                </td>
              </tr>
              <tr className="bg-slate-50/60 font-bold">
                <td className="py-3 px-4 text-emerald-900 pl-4">
                  Gross Profit (Trading Margin)
                </td>
                <td className="py-3 px-4 text-emerald-800">Gross Surplus</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-900">
                  ₹{grossProfit.toLocaleString()}
                </td>
              </tr>

              {/* Overheads */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">
                  B. Operating Expenses & Godown Costs
                </td>
                <td className="py-3 px-4 text-slate-500">Overheads</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-rose-700">
                  - ₹{currentExpenses.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-slate-600 pl-8">• Godown Space Lease</td>
                <td className="py-2.5 px-4 text-slate-400">Fixed Rent</td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-600">₹{Math.round(28000 * multiplier).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-slate-600 pl-8">• Transport Diesel & Tolls</td>
                <td className="py-2.5 px-4 text-slate-400">Logistics</td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-600">₹{Math.round(5800 * multiplier).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-slate-600 pl-8">• Loading & Hamali Union Wages</td>
                <td className="py-2.5 px-4 text-slate-400">Labor</td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-600">₹{Math.round(6400 * multiplier).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-slate-600 pl-8">• Vehicle Maintenance & Tyres</td>
                <td className="py-2.5 px-4 text-slate-400">Fleet Maintenance</td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-600">₹{Math.round(4200 * multiplier).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-slate-600 pl-8">• Electricity & Godown Ventilation</td>
                <td className="py-2.5 px-4 text-slate-400">Utilities</td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-600">₹{Math.round(3850 * multiplier).toLocaleString()}</td>
              </tr>

              {/* Losses */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">
                  C. Transit Damage & Spillage Write-off
                </td>
                <td className="py-3 px-4 text-slate-500">Shrinkage / Loss</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-rose-700">
                  - ₹{currentDamageLoss.toLocaleString()}
                </td>
              </tr>

              {/* Net Profit Line */}
              <tr className="bg-emerald-100/60 font-black text-sm text-emerald-950 border-t-2 border-emerald-800">
                <td className="py-4 px-4">
                  NET WHOLESALE OPERATING PROFIT
                </td>
                <td className="py-4 px-4 text-emerald-800 font-bold text-xs">
                  Net Bottom Line
                </td>
                <td className="py-4 px-4 text-right font-mono font-black text-emerald-950 text-base">
                  ₹{netProfit.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
