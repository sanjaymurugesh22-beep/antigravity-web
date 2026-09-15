import React from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  CreditCard,
  ShoppingCart,
  Truck,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const RetailerDashboard = ({ onNavigate }) => {
  const { retailers, activeRetailerId, orders, products } = useCentralData();
  const { addToast } = useToast();

  const customer = retailers.find((r) => r.id === activeRetailerId) || retailers[0];
  const myOrders = orders.filter((o) => o.retailerId === customer.id || o.retailerName === customer.name);
  const activeOrder = myOrders.find((o) => ['New', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(o.status));

  const availableCredit = Math.max(0, customer.creditLimit - customer.outstanding);
  const creditUsagePercent = Math.round((customer.outstanding / customer.creditLimit) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-trade-dark p-6 rounded-3xl text-white shadow-elevation flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Wholesale Buyer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            Welcome, {customer.name}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 mt-1">
            {customer.address} • Phone: {customer.phone}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/retailer/order')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Place Wholesale Order</span>
          </button>
        </div>
      </div>

      {/* Credit & Dues Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Outstanding Dues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Current Outstanding Dues</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  customer.status === 'Overdue'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {customer.status}
              </span>
            </div>
            <div className="text-2xl font-black text-amber-800 mt-2 font-mono">
              ₹{customer.outstanding.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Payment Due Date: <strong className="text-slate-700">{customer.dueDate}</strong>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/retailer/credit')}
            className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors text-center flex items-center justify-center gap-1"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Settle Payment Online</span>
          </button>
        </div>

        {/* Credit Limit & Available */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Available Credit Limit</span>
            <div className="text-2xl font-black text-emerald-800 mt-2 font-mono">
              ₹{availableCredit.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Total Limit: ₹{customer.creditLimit.toLocaleString()} ({creditUsagePercent}% utilized)
            </div>
            {/* Gauge */}
            <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full ${creditUsagePercent > 85 ? 'bg-rose-500' : 'bg-emerald-600'}`}
                style={{ width: `${Math.min(100, creditUsagePercent)}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Approved by Sri Murugan Traders</span>
        </div>

        {/* Total Wholesale Volume */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Lifetime Purchases</span>
            <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
              ₹{customer.totalPurchases.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {myOrders.length} wholesale shipments cleared
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold mt-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified Wholesale Retailer</span>
          </div>
        </div>
      </div>

      {/* Live Active Delivery Banner (if any) */}
      {activeOrder && (
        <div className="bg-white rounded-2xl border-2 border-emerald-700/60 p-5 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-3 gap-2">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-800 animate-bounce" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Wholesale Shipment: {activeOrder.id}</h3>
                <p className="text-xs text-slate-500">{activeOrder.totalBags} Bags • {activeOrder.estimatedTime}</p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {activeOrder.status}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-slate-600">
              Assigned Truck: <strong className="font-mono text-slate-900">{activeOrder.assignedVehicle || 'TN-28-AP-4521'}</strong> (Driver: {activeOrder.assignedDriver || 'Selvam M.'})
            </div>
            <button
              onClick={() => onNavigate('/retailer/delivery')}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Track Live Delivery Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">My Wholesale Orders</h2>
            <p className="text-xs text-slate-500">Order tracking and invoice history</p>
          </div>
          <button
            onClick={() => onNavigate('/retailer/orders')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {myOrders.map((o) => (
            <div key={o.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{o.id}</span>
                  <span className="text-xs text-slate-400">• {o.date}</span>
                </div>
                <div className="text-xs text-slate-700 mt-1 font-medium">
                  {o.items?.map((it) => `${it.productName} (${it.quantity} bags)`).join(', ')}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs font-mono font-black text-slate-900">₹{o.grandTotal.toLocaleString()}</div>
                  <span className="text-[10px] text-slate-400">{o.paymentType}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    o.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : o.status === 'Out for Delivery'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {o.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
