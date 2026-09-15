import React from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Fuel,
  Gauge,
  ArrowRight,
  Phone,
  Navigation
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const DeliveryDashboard = ({ onNavigate }) => {
  const { orders, vehicles, updateOrderStatus } = useCentralData();
  const { addToast } = useToast();

  const driverVehicle = vehicles[0]; // TN-28-AP-4521 assigned to Selvam M.
  const myAssignedOrders = orders.filter(
    (o) => o.assignedVehicle === driverVehicle.vehicleNumber || ['New', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(o.status)
  );

  const completedToday = orders.filter((o) => o.status === 'Delivered').length;
  const pendingTrips = myAssignedOrders.filter((o) => o.status !== 'Delivered').length;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Driver Welcome Card */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-trade-dark p-6 rounded-3xl text-white shadow-elevation flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Delivery Staff Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            Driver: Selvam M.
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/80 mt-1 font-mono">
            Assigned Vehicle: <strong className="text-white">{driverVehicle.vehicleNumber}</strong> ({driverVehicle.model})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/delivery/damage')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Report Torn Bag</span>
          </button>
        </div>
      </div>

      {/* Driver Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending Drops</span>
          <div className="text-2xl font-black text-blue-700 mt-1 font-mono">{pendingTrips} Active</div>
          <span className="text-[10px] text-slate-500">Salem & Namakkal</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Today</span>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">{completedToday} Drops</div>
          <span className="text-[10px] text-emerald-600 font-bold">100% on-time</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Odometer Distance</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">148 km</div>
          <span className="text-[10px] text-slate-400">Today's routes</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Diesel Tank</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{driverVehicle.currentFuel}</div>
          <span className="text-[10px] text-slate-500">{driverVehicle.fuelEfficiency} avg</span>
        </div>
      </div>

      {/* Assigned Deliveries Priority List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Today's Assigned Wholesale Drops</h2>
            <p className="text-xs text-slate-500">Advance trip milestones to update customer & admin portal live</p>
          </div>
          <button
            onClick={() => onNavigate('/delivery/orders')}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Full Route List</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {myAssignedOrders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{order.id}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.status === 'Out for Delivery'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <strong className="text-sm text-slate-900 block mt-1">{order.retailerName}</strong>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{order.deliveryAddress}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Payload: <strong>{order.totalBags} Bags</strong> ({order.totalWeightKg || order.totalBags * 25} kg)
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => addToast(`Opening Google Maps navigation to ${order.retailerName}...`, 'info')}
                  className="p-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                  title="Navigate"
                >
                  <Navigation className="w-4 h-4" />
                </button>
                <button
                  onClick={() => addToast(`Calling ${order.retailerName} (${order.phone})...`, 'info')}
                  className="p-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                  title="Call Shop"
                >
                  <Phone className="w-4 h-4" />
                </button>

                {order.status === 'Preparing' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'Out for Delivery', driverVehicle.vehicleNumber, 'Selvam M.');
                      addToast(`Order ${order.id} marked Out for Delivery!`, 'success');
                    }}
                    className="px-3.5 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                  >
                    Start Trip
                  </button>
                )}

                {order.status === 'Out for Delivery' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'Delivered', driverVehicle.vehicleNumber, 'Selvam M.');
                      addToast(`Order ${order.id} marked as Delivered!`, 'success');
                    }}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
