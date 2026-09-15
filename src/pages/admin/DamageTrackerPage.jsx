import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import {
  AlertTriangle,
  Plus,
  Truck,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Upload,
  Calendar,
  Layers,
  Sparkles,
  PieChart as PieIcon,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
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

export const DamageTrackerPage = () => {
  const { damageRecords, products, vehicles, staff, recordDamage } = useCentralData();
  const { addToast } = useToast();

  const [newDamageModalOpen, setNewDamageModalOpen] = useState(false);
  const [damageForm, setDamageForm] = useState({
    date: new Date().toISOString().split('T')[0],
    productId: 'prod-1',
    bagsDamaged: '3',
    stage: 'Transport', // Loading, Transport, Unloading, Storage
    vehicleNumber: 'TN-28-AP-4521',
    staffMember: 'Selvam M. (Driver)',
    cause: 'Hook tear during braking',
    description: 'Bags punctured against side metal bolt on bypass highway.',
    photoUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
  });

  // Calculate Metrics
  const totalDamagedBags = damageRecords.reduce((acc, d) => acc + (d.bagsDamaged || 0), 0);
  const totalQuantityLostKg = damageRecords.reduce((acc, d) => acc + (d.quantityLostKg || 0), 0);
  const totalFinancialLoss = damageRecords.reduce((acc, d) => acc + (d.estimatedFinancialLoss || 0), 0);
  const totalStockBags = products.reduce((acc, p) => acc + (p.currentStock || 0), 0);
  const damagePercentage = ((totalDamagedBags / (totalStockBags + totalDamagedBags)) * 100).toFixed(2);

  // Charts Data
  const damageByStageData = [
    { name: 'Transport', value: damageRecords.filter(d => d.stage === 'Transport').reduce((a, b) => a + b.bagsDamaged, 0) },
    { name: 'Loading', value: damageRecords.filter(d => d.stage === 'Loading').reduce((a, b) => a + b.bagsDamaged, 0) || 1 },
    { name: 'Unloading', value: damageRecords.filter(d => d.stage === 'Unloading').reduce((a, b) => a + b.bagsDamaged, 0) },
    { name: 'Storage', value: damageRecords.filter(d => d.stage === 'Storage').reduce((a, b) => a + b.bagsDamaged, 0) },
  ];

  const damageByVehicleData = [
    { vehicle: 'TN-28-AP-4521', bags: 7, loss: 11450 },
    { vehicle: 'TN-45-BC-8890', bags: 2, loss: 2560 },
    { vehicle: 'TN-30-X-1122', bags: 0, loss: 0 },
    { vehicle: 'Godown Pallet', bags: 2, loss: 1840 },
  ];

  const STAGE_COLORS = ['#dc2626', '#f59e0b', '#2563eb', '#64748b'];

  const handleSubmitDamage = (e) => {
    e.preventDefault();
    recordDamage(damageForm);
    addToast('Damage logged successfully. Stock reduced from inventory.', 'success');
    setNewDamageModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Damage & Wastage Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Audit grain leakage, transit tears, moisture spoiling, and financial loss metrics.
          </p>
        </div>
        <button
          onClick={() => setNewDamageModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle hover:shadow-elevation"
        >
          <Plus className="w-4 h-4" />
          <span>Report Damaged Bags</span>
        </button>
      </div>

      {/* Critical Recurring Problem Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950 via-rose-900 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-elevation">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-300 rounded-xl border border-rose-500/30 shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500 text-white">
                Recurring Problem Area
              </span>
              <span className="text-xs text-rose-200">Fleet Analytics Insight</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-1">
              Vehicle TN-28-AP-4521 accounts for 63% of transport transit tear
            </h2>
            <p className="text-xs text-rose-200/80 mt-0.5">
              Root cause identified: Protruding side body bolts and sharp tarpaulin hooks on rough Namakkal highway stretches.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            addToast('Maintenance inspection scheduled for Vehicle TN-28-AP-4521.', 'info');
          }}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors shrink-0"
        >
          Schedule Truck Check
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Damaged Bags</span>
          <div className="text-xl sm:text-2xl font-black text-rose-700 mt-1">{totalDamagedBags} Bags</div>
          <span className="text-[10px] text-slate-500 font-medium">All logged incidents</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Quantity Lost</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{totalQuantityLostKg} Kg</div>
          <span className="text-[10px] text-slate-500 font-medium">Rice grain spillage</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Financial Loss</span>
          <div className="text-xl sm:text-2xl font-black text-rose-700 mt-1 font-mono">
            ₹{totalFinancialLoss.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-medium">At mill purchase rate</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Damage Rate</span>
          <div className="text-xl sm:text-2xl font-black text-amber-700 mt-1">{damagePercentage}%</div>
          <span className="text-[10px] text-emerald-600 font-bold">Target: &lt; 0.50%</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Damage by Stage Pie */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Damage by Operational Stage</h2>
            <p className="text-xs text-slate-500">Breakdown: Loading, Transport, Unloading, and Godown Storage</p>
          </div>

          <div className="h-60 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={damageByStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {damageByStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STAGE_COLORS[index % STAGE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val} Bags Damaged`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
            <span className="text-slate-600">Transport: <strong className="text-rose-700">7 Bags (63%)</strong></span>
            <span className="text-slate-600">Unloading: <strong className="text-amber-700">2 Bags (18%)</strong></span>
          </div>
        </div>

        {/* Damage by Vehicle Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">Damage by Fleet Vehicle (₹ Loss)</h2>
            <p className="text-xs text-slate-500">Financial impact linked to specific fleet registrations</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={damageByVehicleData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="vehicle" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(val) => `₹${val}`} />
                <Tooltip formatter={(val) => [`₹${val.toLocaleString()}`, 'Financial Loss']} />
                <Bar dataKey="loss" name="Loss Amount (₹)" fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Damage Incident Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Detailed Damage Log</h3>
            <p className="text-xs text-slate-500">Incidents logged with automatic inventory deductions</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {damageRecords.length} Incidents Recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Rice Variety</th>
                <th className="py-3 px-3 text-center">Bags Lost</th>
                <th className="py-3 px-3 text-right">Kg Lost</th>
                <th className="py-3 px-3 text-right">Estimated Loss</th>
                <th className="py-3 px-3 text-center">Stage</th>
                <th className="py-3 px-3">Vehicle / Location</th>
                <th className="py-3 px-4">Cause & Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {damageRecords.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500">{d.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{d.productName}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 bg-rose-100 text-rose-800 font-mono font-bold rounded-full text-xs">
                      {d.bagsDamaged}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-medium text-slate-700">{d.quantityLostKg} kg</td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-rose-700">
                    ₹{d.estimatedFinancialLoss.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        d.stage === 'Transport'
                          ? 'bg-rose-100 text-rose-800'
                          : d.stage === 'Unloading'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {d.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-700">{d.vehicleNumber}</td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-sm">
                    <strong className="text-slate-800 block">{d.cause}</strong>
                    <span className="text-[11px] text-slate-500">{d.description}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Report Damage Form */}
      {newDamageModalOpen && (
        <Modal
          isOpen={newDamageModalOpen}
          onClose={() => setNewDamageModalOpen(false)}
          title="Report Damaged / Burst Bags"
          subtitle="Submitting this form automatically writes off inventory and alerts supervisors"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmitDamage} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Incident Date
                </label>
                <input
                  type="date"
                  required
                  value={damageForm.date}
                  onChange={(e) => setDamageForm({ ...damageForm, date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Damaged Bags Count *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={damageForm.bagsDamaged}
                  onChange={(e) => setDamageForm({ ...damageForm, bagsDamaged: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Rice Variety
              </label>
              <select
                value={damageForm.productId}
                onChange={(e) => setDamageForm({ ...damageForm, productId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.bagSize}kg) — Stock: {p.currentStock} Bags
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Incident Stage
                </label>
                <select
                  value={damageForm.stage}
                  onChange={(e) => setDamageForm({ ...damageForm, stage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
                >
                  <option value="Transport">Transport (En route transit)</option>
                  <option value="Loading">Loading (Godown to Truck)</option>
                  <option value="Unloading">Unloading (Truck to Shop)</option>
                  <option value="Storage">Storage (Godown Stack/Pallet)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Vehicle (if transit)
                </label>
                <select
                  value={damageForm.vehicleNumber}
                  onChange={(e) => setDamageForm({ ...damageForm, vehicleNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.vehicleNumber}>
                      {v.vehicleNumber} ({v.driverName})
                    </option>
                  ))}
                  <option value="Godown Yard">Godown Storage (No vehicle)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Primary Cause
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Iron hook puncture, rain moisture, stack burst"
                value={damageForm.cause}
                onChange={(e) => setDamageForm({ ...damageForm, cause: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Detailed Observation
              </label>
              <textarea
                rows="2"
                value={damageForm.description}
                onChange={(e) => setDamageForm({ ...damageForm, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
              />
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold">
              ⚠️ Immediate Action: {damageForm.bagsDamaged} bags will be written off from active inventory upon submission.
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setNewDamageModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Submit Incident Report
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
