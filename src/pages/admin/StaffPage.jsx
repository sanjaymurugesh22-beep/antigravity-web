import React from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  UserCheck,
  Phone,
  Truck,
  Star,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const StaffPage = () => {
  const { staff } = useCentralData();
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Staff & Fleet Personnel Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Delivery drivers, warehouse supervisors, and logistics personnel.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staff.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-extrabold text-lg">
                  {s.name.charAt(0)}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {s.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{s.role}</p>

              <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{s.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono font-bold text-slate-800">{s.assignedVehicle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Rating: <strong>{s.rating} / 5.0</strong> ({s.tripsCompleted} trips)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => addToast(`Calling ${s.name} at ${s.phone}...`, 'info')}
                className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors"
              >
                Contact Staff
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
