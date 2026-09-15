import React from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Package,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const TrackDeliveryPage = ({ onNavigate }) => {
  const { orders, retailers, activeRetailerId } = useCentralData();
  const { addToast } = useToast();

  const customer = retailers.find((r) => r.id === activeRetailerId) || retailers[0];
  const myOrders = orders.filter(
    (o) => o.retailerId === customer.id || o.retailerName === customer.name
  );
  const activeOrder = myOrders.find((o) => ['New', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(o.status)) || myOrders[0];

  const steps = [
    { title: 'Order Confirmed', desc: 'Rice bags allocated in godown' },
    { title: 'Preparing', desc: 'Loaded on truck & weighed' },
    { title: 'Out for Delivery', desc: 'En route to your shop' },
    { title: 'Arrived', desc: 'Vehicle at shop storefront' },
    { title: 'Delivered', desc: 'Signed receipt & bags unloaded' }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'New': return 0;
      case 'Confirmed': return 1;
      case 'Preparing': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 5;
      default: return 3;
    }
  };

  const currentStep = activeOrder ? getStepIndex(activeOrder.status) : 3;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Live Wholesale Delivery Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time GPS dispatch status from Salem godown to your storefront.
          </p>
        </div>
      </div>

      {activeOrder ? (
        <div className="space-y-6">
          {/* Main Delivery Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Shipment: {activeOrder.deliveryId || 'DEL-801'}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  Order Ref: {activeOrder.id}
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block">Estimated Arrival</span>
                <strong className="text-base font-black text-emerald-800 font-mono">
                  {activeOrder.estimatedTime || 'Today, 4:30 PM'}
                </strong>
              </div>
            </div>

            {/* Step-by-Step Progress Timeline */}
            <div className="py-4">
              <div className="relative flex items-center justify-between">
                {/* Connecting bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-600 transition-all duration-500 -z-0"
                  style={{ width: `${Math.min(100, (currentStep / (steps.length - 1)) * 100)}%` }}
                />

                {steps.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;
                  return (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isDone
                            ? 'bg-emerald-700 text-white shadow-md'
                            : 'bg-white text-slate-400 border-2 border-slate-200'
                        } ${isCurrent ? 'ring-4 ring-emerald-500/20 scale-110' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span className={`text-xs font-bold mt-2 hidden sm:block ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:block max-w-[100px]">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Driver & Truck Specs Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs shrink-0">
                  👨‍✈️
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Delivery Staff</span>
                  <strong className="text-slate-900 text-sm">{activeOrder.assignedDriver || 'Selvam M.'}</strong>
                  <div className="text-slate-500 mt-0.5">{activeOrder.driverPhone || '+91 98420 11990'}</div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-slate-200 pt-3 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fleet Truck Registration</span>
                  <strong className="font-mono text-sm text-slate-900">{activeOrder.assignedVehicle || 'TN-28-AP-4521'}</strong>
                  <div className="text-slate-500 text-[11px]">Eicher 14ft High Deck</div>
                </div>
                <button
                  onClick={() => addToast(`Dialing driver ${activeOrder.assignedDriver || 'Selvam M.'}...`, 'info')}
                  className="p-3 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700 transition-colors shadow-xs shrink-0"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cargo Manifest */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Order Payload Manifest
              </span>
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100">
                {activeOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">{item.productName}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">{item.quantity} Bags</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400">
          <Truck className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-sm">No active deliveries currently en route.</p>
        </div>
      )}
    </div>
  );
};
