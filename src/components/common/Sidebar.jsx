import React from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ShoppingCart,
  Truck,
  Package,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
  FileBarChart2,
  BarChart3,
  UserCheck,
  Settings,
  PlusCircle,
  Clock,
  MapPin,
  X,
  Sparkles,
  Home
} from 'lucide-react';

export const Sidebar = ({ currentPath, onNavigate, isOpen, onClose }) => {
  const { currentRole, orders, products, retailers } = useCentralData();

  // Dynamic alert badges
  const pendingOrdersCount = orders.filter((o) => ['New', 'Confirmed', 'Preparing'].includes(o.status)).length;
  const lowStockCount = products.filter((p) => p.status === 'Low Stock').length;
  const overdueCount = retailers.filter((r) => r.status === 'Overdue').length;

  const adminNav = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Credit Ledger', path: '/admin/credit', icon: CreditCard, badge: overdueCount > 0 ? overdueCount : null, badgeColor: 'bg-rose-500' },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null, badgeColor: 'bg-emerald-600' },
    { label: 'Deliveries & Fleet', path: '/admin/deliveries', icon: Truck },
    { label: 'Rice Inventory', path: '/admin/inventory', icon: Package, badge: lowStockCount > 0 ? lowStockCount : null, badgeColor: 'bg-amber-500' },
    { label: 'Damage & Wastage', path: '/admin/damage', icon: AlertTriangle },
    { label: 'Purchases (Mills)', path: '/admin/purchases', icon: ArrowDownCircle },
    { label: 'Sales Entries', path: '/admin/sales', icon: ArrowUpCircle },
    { label: 'Expenses', path: '/admin/expenses', icon: Receipt },
    { label: 'Reports & P&L', path: '/admin/reports', icon: FileBarChart2 },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Staff Roster', path: '/admin/staff', icon: UserCheck },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const retailerNav = [
    { label: 'Retailer Dashboard', path: '/retailer', icon: LayoutDashboard },
    { label: 'Place New Order', path: '/retailer/order', icon: PlusCircle, isHighlight: true },
    { label: 'My Wholesale Orders', path: '/retailer/orders', icon: ShoppingCart },
    { label: 'Credit Balance & Dues', path: '/retailer/credit', icon: CreditCard },
    { label: 'Track Live Delivery', path: '/retailer/delivery', icon: MapPin },
  ];

  const deliveryNav = [
    { label: 'Driver Dashboard', path: '/delivery', icon: LayoutDashboard },
    { label: 'Assigned Deliveries', path: '/delivery/orders', icon: Truck, badge: 2, badgeColor: 'bg-blue-600' },
    { label: 'Report Damage / Loss', path: '/delivery/damage', icon: AlertTriangle },
  ];

  let navItems = adminNav;
  if (currentRole === 'retailer') navItems = retailerNav;
  if (currentRole === 'delivery') navItems = deliveryNav;

  const handleLinkClick = (path) => {
    onNavigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-trade-dark text-slate-200 border-r border-emerald-950/60 transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-900/40 flex items-center justify-between">
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              🌾
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-white flex items-center gap-1">
                Rice<span className="text-amber-400">ERP</span>
              </div>
              <p className="text-[10px] text-emerald-400/80 font-medium tracking-wide uppercase">
                Digital Trade Solution
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active User Pill */}
        <div className="px-4 py-3 bg-emerald-950/40 border-b border-emerald-900/30 text-xs flex items-center justify-between">
          <div className="truncate">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
              {currentRole === 'admin' ? 'Merchant Admin' : currentRole === 'retailer' ? 'Retailer Portal' : 'Driver Console'}
            </span>
            <span className="font-semibold text-slate-300 text-xs truncate block">
              {currentRole === 'admin' ? 'Sri Murugan Traders' : currentRole === 'retailer' ? 'Ravi Traders' : 'TN-28-AP-4521'}
            </span>
          </div>
          <button
            onClick={() => handleLinkClick('/')}
            className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 transition-colors"
            title="Go to Landing Page"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm font-bold'
                    : item.isHighlight
                    ? 'bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-emerald-950/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : item.isHighlight ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-extrabold text-white px-2 py-0.5 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Quick Info */}
        <div className="p-3 bg-emerald-950/60 border-t border-emerald-900/40 text-[11px] text-slate-400">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-300">Sync Status</span>
            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Online
            </span>
          </div>
          <p className="text-[10px] text-slate-500">
            Grain Wholesale ERP v2.4 • SIH Edition
          </p>
        </div>
      </aside>
    </>
  );
};
