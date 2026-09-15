import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  Fuel,
  ShieldAlert,
  Gauge,
  User,
  Phone,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const DeliveriesPage = () => {
  const { vehicles, orders, updateOrderStatus } = useCentralData();
  const { addToast } = useToast();

  const [selectedTab, setSelectedTab] = useState('active'); // active | fleet | map
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

  const activeDeliveries = orders.filter((o) =>
    ['Out for Delivery', 'Preparing', 'Confirmed'].includes(o.status)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Fleet & Delivery Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time transportation tracking, truck load capacity, and driver logistics.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-subtle">
          <button
            onClick={() => setSelectedTab('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedTab === 'active' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Active Trips ({activeDeliveries.length})
          </button>
          <button
            onClick={() => setSelectedTab('fleet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedTab === 'fleet' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Fleet Trucks ({vehicles.length})
          </button>
          <button
            onClick={() => setSelectedTab('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedTab === 'map' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Live GPS Route Map
          </button>
        </div>
      </div>

      {/* TAB 1: ACTIVE DELIVERIES */}
      {selectedTab === 'active' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card hover:shadow-elevation transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Pass: {delivery.deliveryId || 'DEL-801'}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        delivery.status === 'Out for Delivery'
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer</span>
                      <strong className="text-sm text-slate-900">{delivery.retailerName}</strong>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{delivery.deliveryAddress}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Assigned Truck</span>
                        <strong className="font-mono text-slate-800">{delivery.assignedVehicle || 'TN-28-AP-4521'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Driver</span>
                        <span className="font-medium text-slate-800">{delivery.assignedDriver || 'Selvam M.'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Payload</span>
                        <strong className="text-slate-900">{delivery.totalBags} Bags ({delivery.totalWeightKg || delivery.totalBags * 25} kg)</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">ETA</span>
                        <span className="text-emerald-700 font-semibold">{delivery.estimatedTime || 'Within 2 hrs'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Order Ref: {delivery.id}</span>
                  {delivery.status === 'Out for Delivery' ? (
                    <button
                      onClick={() => {
                        updateOrderStatus(delivery.id, 'Delivered');
                        addToast(`Delivery marked as completed for ${delivery.retailerName}!`, 'success');
                      }}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      Confirm Drop-off
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateOrderStatus(delivery.id, 'Out for Delivery');
                        addToast(`Order ${delivery.id} dispatched!`, 'success');
                      }}
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      Dispatch Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FLEET TRUCKS & CAPACITY */}
      {selectedTab === 'fleet' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((veh) => {
            const loadPercentage = Math.round((veh.currentLoadBags / veh.capacityBags) * 100);
            return (
              <div
                key={veh.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-100 text-slate-800 rounded-xl">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-black text-slate-900">{veh.vehicleNumber}</h3>
                      <p className="text-xs text-slate-500">{veh.model}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      veh.status === 'On Delivery'
                        ? 'bg-blue-100 text-blue-800'
                        : veh.status === 'Loading'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {veh.status}
                  </span>
                </div>

                {/* Capacity utilization gauge */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-semibold text-slate-700">
                    <span>Bag Load Capacity</span>
                    <span className="font-mono">{veh.currentLoadBags} / {veh.capacityBags} Bags ({loadPercentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        loadPercentage > 90 ? 'bg-rose-500' : loadPercentage > 50 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${loadPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Vehicle specifications */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Driver</span>
                    <strong className="text-slate-800">{veh.driverName}</strong>
                    <div className="text-[11px] text-slate-500">{veh.driverPhone}</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Fuel & Economy</span>
                    <span className="font-medium text-slate-700">{veh.fuelEfficiency}</span>
                    <div className="text-[11px] text-emerald-700 font-semibold">{veh.currentFuel} remaining</div>
                  </div>
                </div>

                {veh.damageIncidents > 2 && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      High transport damage reported ({veh.damageIncidents} incidents). Check cargo securing.
                    </span>
                  </div>
                )}

                <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                  <span>Last Service: {veh.lastService}</span>
                  <span className="font-bold text-slate-800">{veh.totalTrips} Total Trips</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: VISUAL GPS MAP TRACKER PLACEHOLDER */}
      {selectedTab === 'map' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Regional Wholesale Dispatch Map</h2>
              <p className="text-xs text-slate-500">Live positioning across Tamil Nadu & Andhra corridor (Salem, Madurai, Trichy, Coimbatore)</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-600" /> Warehouse Hub</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-600 animate-ping" /> Active Trucks</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" /> Retailer Shops</span>
            </div>
          </div>

          {/* Map Styled Visual Canvas Placeholder */}
          <div className="relative w-full h-96 bg-[#EBF2EA] rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-6">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Map Roads Simulation */}
            <svg className="absolute inset-0 w-full h-full text-slate-300 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <line x1="15%" y1="20%" x2="50%" y2="50%" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6 6" />
              <line x1="50%" y1="50%" x2="80%" y2="35%" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6 6" />
              <line x1="50%" y1="50%" x2="45%" y2="85%" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6 6" />
              <line x1="50%" y1="50%" x2="25%" y2="70%" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6 6" />
            </svg>

            {/* Central Godown Hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-emerald-900 text-white rounded-2xl shadow-elevation border-2 border-white flex flex-col items-center text-center z-10">
              <span className="text-xl">🌾</span>
              <span className="text-[11px] font-extrabold mt-0.5">Salem Central Yard</span>
              <span className="text-[9px] text-emerald-200">2,450 Bags in Godown</span>
            </div>

            {/* Truck Marker 1 */}
            <div className="absolute left-[65%] top-[42%] -translate-x-1/2 -translate-y-1/2 p-2 bg-blue-700 text-white rounded-xl shadow-elevation border-2 border-white flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform z-20">
              <Truck className="w-4 h-4 animate-bounce" />
              <div className="text-left text-[10px]">
                <strong className="block font-mono">TN-28-AP-4521</strong>
                <span className="text-blue-200">En Route to Shevapet (35 Bags)</span>
              </div>
            </div>

            {/* Truck Marker 2 */}
            <div className="absolute left-[35%] top-[60%] -translate-x-1/2 -translate-y-1/2 p-2 bg-blue-700 text-white rounded-xl shadow-elevation border-2 border-white flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform z-20">
              <Truck className="w-4 h-4" />
              <div className="text-left text-[10px]">
                <strong className="block font-mono">TN-45-BC-8890</strong>
                <span className="text-blue-200">Madurai Highway (40 Bags)</span>
              </div>
            </div>

            {/* Retailer Destination 1 */}
            <div className="absolute right-[15%] top-[30%] p-2 bg-amber-500 text-slate-950 rounded-xl shadow-card border border-white text-center z-10">
              <MapPin className="w-4 h-4 mx-auto text-slate-900" />
              <strong className="text-[10px] block">Ravi Traders</strong>
              <span className="text-[9px] text-slate-800">Bazaar St, Salem</span>
            </div>

            {/* Retailer Destination 2 */}
            <div className="absolute left-[20%] bottom-[20%] p-2 bg-amber-500 text-slate-950 rounded-xl shadow-card border border-white text-center z-10">
              <MapPin className="w-4 h-4 mx-auto text-slate-900" />
              <strong className="text-[10px] block">Sri Lakshmi Stores</strong>
              <span className="text-[9px] text-slate-800">West Masi St, Madurai</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
