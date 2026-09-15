import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { useToast } from '../../context/ToastContext';
import {
  AlertTriangle,
  Upload,
  CheckCircle2,
  Camera,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const ReportDamagePage = ({ onNavigate }) => {
  const { products, vehicles, recordDamage } = useCentralData();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    productId: 'prod-1',
    bagsDamaged: '2',
    stage: 'Transport',
    vehicleNumber: 'TN-28-AP-4521',
    staffMember: 'Selvam M. (Driver)',
    cause: 'Hook puncture / sudden braking',
    description: 'Bags torn against side latch during transit on bypass.',
    photoUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
  });

  const [isPhotoAttached, setIsPhotoAttached] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    recordDamage(form);
    addToast(
      `Incident recorded: ${form.bagsDamaged} bags logged as damaged. Godown inventory automatically updated.`,
      'success',
      4000
    );
    onNavigate('/delivery');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Report Transit Damage / Wastage
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Delivery driver incident logger. Automatically adjusts godown stock and informs merchant.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Incident Date
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Number of Damaged Bags *
              </label>
              <input
                type="number"
                min="1"
                required
                value={form.bagsDamaged}
                onChange={(e) => setForm({ ...form, bagsDamaged: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Rice Variety Affected *
            </label>
            <select
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.bagSize}kg) — Stock: {p.currentStock} Bags
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Stage of Occurrence
              </label>
              <select
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
              >
                <option value="Transport">Transport (En route transit)</option>
                <option value="Loading">Loading at Godown</option>
                <option value="Unloading">Unloading at Retailer Shop</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Vehicle Registration
              </label>
              <input
                type="text"
                readOnly
                value={form.vehicleNumber}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Reason / Cause of Damage *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Iron hook puncture, wet canvas tarpaulin, rough road burst"
              value={form.cause}
              onChange={(e) => setForm({ ...form, cause: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Incident Notes
            </label>
            <textarea
              rows="2"
              placeholder="Explain how the damage happened..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800"
            />
          </div>

          {/* Photo Upload Simulator */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Damage Photo Proof (Simulated Upload)
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50 flex flex-col items-center justify-center">
              {isPhotoAttached ? (
                <div className="space-y-2">
                  <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-slate-300 mx-auto shadow-xs">
                    <img src={form.photoUrl} alt="Damage Proof" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-emerald-800 text-white text-[9px] px-1 py-0.5 rounded font-bold">
                      Attached
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">transit_tear_proof_tn28.jpg (1.8 MB)</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPhotoAttached(false);
                      setForm({ ...form, photoUrl: '' });
                    }}
                    className="text-[11px] text-rose-600 font-bold hover:underline"
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsPhotoAttached(true);
                    setForm({
                      ...form,
                      photoUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
                    });
                  }}
                  className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800"
                >
                  <Camera className="w-6 h-6 text-slate-400" />
                  <span className="text-xs font-bold">Click to Attach Camera Photo</span>
                  <span className="text-[10px] text-slate-400">JPG, PNG up to 10MB</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>
              Submitting will automatically deduct {form.bagsDamaged} bags from active inventory and update the Admin Damage Tracker.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onNavigate('/delivery')}
              className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-elevation transition-all"
            >
              Submit Damage Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
