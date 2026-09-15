import React from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  Navigation,
  Package,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AssignedDeliveriesPage = ({ onNavigate }) => {
  const { orders, vehicles, updateOrderStatus } = useCentralData();
  const { addToast } = useToast();

  const driverVehicle = vehicles[0];

  const handleAdvanceStatus = (order, nextStatus) => {
    updateOrderStatus(order.id, nextStatus, driverVehicle.vehicleNumber, 'Selvam M.');
    addToast(`Order ${order.id} updated to "${nextStatus}". Live status synced to customer and merchant.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Assigned Wholesale Deliveries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Driver trip list for Truck {driverVehicle.vehicleNumber} ({driverVehicle.model}).
          </p>
        </div>
        <button
          onClick={() => onNavigate('/delivery/damage')}
          className="flex items-center gap-1.5 px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Report Transit Damage</span>
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-slate-900">{order.id}</span>
                    <span className="text-xs text-slate-400">• Pass: {order.deliveryId || 'DEL-801'}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{order.retailerName}</h3>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'Out for Delivery'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Location & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Destination Address</span>
                  <div className="flex items-start gap-1.5 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Store Phone</span>
                    <div className="font-mono font-bold text-slate-900">{order.phone}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToast(`Opening GPS route to ${order.retailerName}...`, 'info')}
                      className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                      title="GPS Route"
                    >
                      <Navigation className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToast(`Calling ${order.retailerName} (${order.phone})...`, 'info')}
                      className="p-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700"
                      title="Call Retailer"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cargo list */}
              <div className="text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Cargo Details</span>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-medium text-slate-700">
                  {order.items?.map((it) => `${it.productName} (${it.quantity} bags)`).join(', ')} — Total: <strong>{order.totalBags} Bags</strong>
                </div>
              </div>

              {/* One-Tap Milestone Progression */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-slate-400">Step Progression:</span>
                <div className="flex flex-wrap gap-2">
                  {order.status === 'Preparing' && (
                    <button
                      onClick={() => handleAdvanceStatus(order, 'Out for Delivery')}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                    >
                      1. Start Trip (Out for Delivery)
                    </button>
                  )}

                  {order.status === 'Out for Delivery' && (
                    <button
                      onClick={() => handleAdvanceStatus(order, 'Delivered')}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                    >
                      2. Confirm Delivered & Signed
                    </button>
                  )}

                  {order.status === 'Delivered' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" /> Delivered & Receipt Stamped
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
