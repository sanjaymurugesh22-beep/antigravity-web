import React, { useState, useRef, useEffect } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  Search,
  Bell,
  Calendar,
  Layers,
  ChevronDown,
  ShieldCheck,
  Store,
  Truck,
  CheckCheck,
  ExternalLink,
  Menu
} from 'lucide-react';

export const Navbar = ({ onOpenSearch, onOpenSystemArch, onToggleSidebar, onNavigate }) => {
  const {
    currentRole,
    setCurrentRole,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    retailers,
    activeRetailerId,
    setActiveRetailerId
  } = useCentralData();

  const [notifsOpen, setNotifsOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const notifRef = useRef(null);
  const roleRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Format today's date in Indian business format: "Tue, 15 Sep 2026"
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifsOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleConfig = {
    admin: {
      label: 'Shop Owner / Admin',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: ShieldCheck,
      userTitle: 'M. Senthil Kumar (Owner)'
    },
    retailer: {
      label: 'Retailer Portal',
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: Store,
      userTitle: 'Ravi Traders (Salem)'
    },
    delivery: {
      label: 'Delivery Staff',
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Truck,
      userTitle: 'Selvam M. (Driver)'
    }
  };

  const currentRoleDetails = roleConfig[currentRole] || roleConfig.admin;
  const RoleIcon = currentRoleDetails.icon;

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'admin') onNavigate('/admin');
    if (newRole === 'retailer') onNavigate('/retailer');
    if (newRole === 'delivery') onNavigate('/delivery');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Mobile Menu Button & Search Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search trigger bar */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-50 hover:bg-slate-100/90 text-slate-400 hover:text-slate-600 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-medium transition-colors w-44 sm:w-72 md:w-80 group shadow-subtle"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-colors" />
            <span className="truncate">Search customers, stock, orders...</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Date, System Architecture button, Notifications & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Current Date */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200/70">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>{formattedDate}</span>
          </div>

          {/* System Architecture button */}
          <button
            onClick={onOpenSystemArch}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/80 text-xs font-bold transition-colors"
            title="View Central Database Concept"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>Central Sync</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifsOpen(!notifsOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer */}
            {notifsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevation border border-slate-200/90 py-2 z-50 animate-slide-down">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No notifications right now.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          if (notif.link) {
                            onNavigate(notif.link);
                            setNotifsOpen(false);
                          }
                        }}
                        className={`p-3.5 transition-colors cursor-pointer hover:bg-slate-50 flex items-start gap-3 ${
                          !notif.read ? 'bg-emerald-50/40' : ''
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            notif.type === 'danger'
                              ? 'bg-rose-500'
                              : notif.type === 'warning'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                            <span>{notif.title}</span>
                            <span className="text-[10px] font-medium text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher & User Profile Pill */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-subtle ${currentRoleDetails.color}`}
            >
              <RoleIcon className="w-4 h-4 shrink-0" />
              <div className="text-left hidden sm:block">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                  Current Role
                </span>
                <span className="text-xs font-bold leading-tight">
                  {currentRoleDetails.label}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Role Switcher Dropdown */}
            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-elevation border border-slate-200 py-2 z-50 animate-slide-down">
                <div className="px-4 py-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Workspace Role
                  </span>
                </div>

                <div className="p-1 space-y-1">
                  <button
                    onClick={() => handleRoleChange('admin')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                      currentRole === 'admin'
                        ? 'bg-emerald-50 text-emerald-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <div>
                      <div>1. Shop Owner / Admin</div>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        Full ERP control & P&L
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleChange('retailer')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                      currentRole === 'retailer'
                        ? 'bg-amber-50 text-amber-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Store className="w-4 h-4 text-amber-600" />
                    <div>
                      <div>2. Retailer / Customer</div>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        Ravi Traders Order & Credit
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleChange('delivery')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                      currentRole === 'delivery'
                        ? 'bg-blue-50 text-blue-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-blue-700" />
                    <div>
                      <div>3. Delivery Staff</div>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        Selvam M. (Driver View)
                      </span>
                    </div>
                  </button>
                </div>

                <div className="border-t border-slate-100 mt-1 pt-1 px-1">
                  <button
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      onNavigate('/login');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100 transition-colors"
                  >
                    <span>Log Out / Login Screen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
