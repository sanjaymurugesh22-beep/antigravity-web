import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  ShieldCheck,
  Store,
  Truck,
  ArrowRight,
  Sparkles,
  Lock,
  User,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const LoginPage = ({ onNavigate }) => {
  const { setCurrentRole, setActiveRetailerId, retailers } = useCentralData();
  const { addToast } = useToast();

  const [selectedRole, setSelectedRole] = useState('admin');
  const [selectedRetailer, setSelectedRetailer] = useState('ret-1');
  const [password, setPassword] = useState('••••••••');

  const handleSimulateLogin = (role, targetPath, retailerId = 'ret-1') => {
    setCurrentRole(role);
    if (role === 'retailer') {
      setActiveRetailerId(retailerId);
    }
    addToast(`Logged in successfully as ${role.toUpperCase()}`, 'success');
    onNavigate(targetPath);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === 'admin') {
      handleSimulateLogin('admin', '/admin');
    } else if (selectedRole === 'retailer') {
      handleSimulateLogin('retailer', '/retailer', selectedRetailer);
    } else {
      handleSimulateLogin('delivery', '/delivery');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-3 cursor-pointer group mb-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-amber-500 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
            🌾
          </div>
          <div className="text-left">
            <div className="text-xl font-black tracking-tight text-slate-900">
              Rice<span className="text-amber-600">ERP</span>
            </div>
            <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
              Wholesale Business Management
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to Your Workspace
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Select or simulate any of the 3 real-world roles below
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-premium rounded-3xl border border-slate-200">
          {/* 1-Click Fast Role Switcher Cards */}
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
              Quick Role Simulation (1-Click Login)
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Role 1: Admin */}
              <button
                type="button"
                onClick={() => handleSimulateLogin('admin', '/admin')}
                className="p-3 rounded-2xl border-2 border-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-900 transition-all flex flex-col items-center text-center group"
              >
                <div className="p-2 rounded-xl bg-emerald-800 text-white mb-2 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">Admin</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Shop Owner</span>
              </button>

              {/* Role 2: Retailer */}
              <button
                type="button"
                onClick={() => handleSimulateLogin('retailer', '/retailer', 'ret-1')}
                className="p-3 rounded-2xl border-2 border-amber-600 bg-amber-50/50 hover:bg-amber-100/60 text-amber-900 transition-all flex flex-col items-center text-center group"
              >
                <div className="p-2 rounded-xl bg-amber-600 text-white mb-2 group-hover:scale-105 transition-transform">
                  <Store className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">Retailer</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Ravi Traders</span>
              </button>

              {/* Role 3: Delivery */}
              <button
                type="button"
                onClick={() => handleSimulateLogin('delivery', '/delivery')}
                className="p-3 rounded-2xl border-2 border-blue-600 bg-blue-50/50 hover:bg-blue-100/60 text-blue-900 transition-all flex flex-col items-center text-center group"
              >
                <div className="p-2 rounded-xl bg-blue-700 text-white mb-2 group-hover:scale-105 transition-transform">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">Delivery</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Selvam M.</span>
              </button>
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-slate-400 font-medium">Or configure login form</span>
            </div>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Select User Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                <option value="admin">Shop Owner / Wholesale Admin</option>
                <option value="retailer">Retailer / Grocery Store Customer</option>
                <option value="delivery">Delivery Driver / Fleet Staff</option>
              </select>
            </div>

            {selectedRole === 'retailer' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Select Retailer Account
                </label>
                <select
                  value={selectedRetailer}
                  onChange={(e) => setSelectedRetailer(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600"
                >
                  {retailers.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.address.split(',')[0]} - Due: ₹{r.outstanding.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-elevation transition-all mt-2"
            >
              <span>Authenticate & Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="text-emerald-800 hover:text-emerald-900 font-bold"
            >
              ← Back to Landing Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
