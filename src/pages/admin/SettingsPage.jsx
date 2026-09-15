import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { useToast } from '../../context/ToastContext';
import {
  Settings,
  Building2,
  CreditCard,
  Bell,
  RefreshCw,
  Save,
  CheckCircle2,
  Database
} from 'lucide-react';

export const SettingsPage = () => {
  const { resetToDefaults } = useCentralData();
  const { addToast } = useToast();

  const [businessProfile, setBusinessProfile] = useState({
    name: 'Sri Murugan Rice Traders',
    tagline: 'Wholesale Rice Merchant & Commission Agent',
    address: '142, Shevapet Grain Market, Salem - 636002, Tamil Nadu',
    gstin: '33AAMFS9041R1ZM',
    fssai: '12421008000412',
    phone: '+91 98421 99001',
    defaultCreditDays: 15,
    maxDefaultLimit: 150000,
    smsReminders: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Wholesale ERP business profile updated successfully!', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Reset all mock records (customers, orders, inventory) to clean default seed data?')) {
      resetToDefaults();
      addToast('System database reset to default demo data!', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          System & Enterprise Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Wholesale business profile, tax registration, credit limit guardrails, and demo reset.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-emerald-800" />
            <h2 className="text-sm font-bold text-slate-900">Wholesale Enterprise Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Firm Name
              </label>
              <input
                type="text"
                value={businessProfile.name}
                onChange={(e) => setBusinessProfile({ ...businessProfile, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Business Type
              </label>
              <input
                type="text"
                value={businessProfile.tagline}
                onChange={(e) => setBusinessProfile({ ...businessProfile, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                GSTIN
              </label>
              <input
                type="text"
                value={businessProfile.gstin}
                onChange={(e) => setBusinessProfile({ ...businessProfile, gstin: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                FSSAI License
              </label>
              <input
                type="text"
                value={businessProfile.fssai}
                onChange={(e) => setBusinessProfile({ ...businessProfile, fssai: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Registered Godown & Market Address
            </label>
            <textarea
              rows="2"
              value={businessProfile.address}
              onChange={(e) => setBusinessProfile({ ...businessProfile, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
            />
          </div>
        </div>

        {/* Credit Rules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CreditCard className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">Wholesale Credit Guardrails</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Default Credit Term (Days)
              </label>
              <input
                type="number"
                value={businessProfile.defaultCreditDays}
                onChange={(e) => setBusinessProfile({ ...businessProfile, defaultCreditDays: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Standard Credit Limit (₹)
              </label>
              <input
                type="number"
                value={businessProfile.maxDefaultLimit}
                onChange={(e) => setBusinessProfile({ ...businessProfile, maxDefaultLimit: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs border border-rose-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Database</span>
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-elevation transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
