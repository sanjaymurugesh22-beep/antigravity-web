import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import {
  Receipt,
  Search,
  Plus,
  FileSpreadsheet,
  Fuel,
  Home,
  Users,
  Wrench,
  Zap,
  DollarSign
} from 'lucide-react';

export const ExpensesPage = () => {
  const { expenses, addExpense } = useCentralData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [newExpenseModal, setNewExpenseModal] = useState(false);
  const [form, setForm] = useState({
    category: 'Transportation & Fuel',
    amount: '4500',
    description: 'Diesel for Eicher TN-28-AP-4521',
    paidTo: 'BPCL Highway Fuel Point',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    'ALL',
    'Transportation & Fuel',
    'Labor & Hamali Wages',
    'Godown Rent',
    'Vehicle Maintenance',
    'Electricity & Utilities'
  ];

  const filteredExpenses = expenses.filter((e) => {
    const matchSearch =
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.paidTo.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'ALL' || e.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalExpenseAmount = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(form);
    addToast(`Expense of ₹${form.amount} logged for ${form.category}`, 'success');
    setNewExpenseModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Operating Expenses Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track wholesale godown rent, diesel, loading hamali wages, and maintenance overheads.
          </p>
        </div>
        <button
          onClick={() => setNewExpenseModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle"
        >
          <Plus className="w-4 h-4" />
          <span>Record Expense</span>
        </button>
      </div>

      {/* Category Expense Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Expenses (MTD)</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{totalExpenseAmount.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">All operating heads</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Fleet Fuel</span>
          <div className="text-xl sm:text-2xl font-black text-blue-700 mt-1 font-mono">
            ₹5,800
          </div>
          <span className="text-[10px] text-slate-500">Diesel dispatches</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Hamali Loading</span>
          <div className="text-xl sm:text-2xl font-black text-amber-700 mt-1 font-mono">
            ₹6,400
          </div>
          <span className="text-[10px] text-slate-500">Union loading wages</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Godown Lease</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-800 mt-1 font-mono">
            ₹28,000
          </div>
          <span className="text-[10px] text-slate-500">5000 sq.ft grain yard</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search description, recipient, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-semibold mr-1 hidden sm:inline">Category:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                categoryFilter === c
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Expense ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Paid To</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500">{exp.date}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{exp.id}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-sm">{exp.description}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{exp.paidTo}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-rose-700">
                    ₹{exp.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {newExpenseModal && (
        <Modal
          isOpen={newExpenseModal}
          onClose={() => setNewExpenseModal(false)}
          title="Record Operational Expense"
          subtitle="Direct debit affecting monthly net profit calculations"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                <option value="Transportation & Fuel">Transportation & Fuel</option>
                <option value="Labor & Hamali Wages">Labor & Hamali Wages</option>
                <option value="Godown Rent">Godown Rent</option>
                <option value="Vehicle Maintenance">Vehicle Maintenance</option>
                <option value="Electricity & Utilities">Electricity & Utilities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                min="10"
                required
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Description
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Diesel for 14ft Eicher Salem trip"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Paid To (Vendor / Union)
              </label>
              <input
                type="text"
                required
                value={form.paidTo}
                onChange={(e) => setForm({ ...form, paidTo: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setNewExpenseModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Log Expense
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
