import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  TrendingUp,
  CreditCard,
  Package,
  Truck,
  Receipt,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Send,
  Eye,
  Plus,
  FileText
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useToast } from '../../context/ToastContext';
import { InvoiceModal } from '../../components/common/InvoiceModal';

export const AdminDashboard = ({ onNavigate }) => {
  const {
    stats,
    orders,
    retailers,
    products,
    damageRecords,
    sales,
    expenses,
    updateOrderStatus
  } = useCentralData();
  const { addToast } = useToast();

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [salesTimeframe, setSalesTimeframe] = useState('30d');

  // Chart data: 30-day or 7-day sales trend
  const salesTrendData = [
    { day: 'Sep 01', sales: 42000, profit: 7500 },
    { day: 'Sep 04', sales: 68000, profit: 12200 },
    { day: 'Sep 07', sales: 55000, profit: 9900 },
    { day: 'Sep 10', sales: 91000, profit: 16400 },
    { day: 'Sep 12', sales: 74000, profit: 13300 },
    { day: 'Sep 14', sales: 82000, profit: 14760 },
    { day: 'Sep 15', sales: 73600, profit: 13200 },
  ];

  // Monthly profit vs expenses
  const monthlyPnLData = [
    { month: 'Jun', profit: 92000, expenses: 44000 },
    { month: 'Jul', profit: 115000, expenses: 48000 },
    { month: 'Aug', profit: 138000, expenses: 51000 },
    { month: 'Sep (MTD)', profit: 87400, expenses: 48250 },
  ];

  // Stock distribution pie
  const stockDistribution = products.map((p) => ({
    name: p.variety,
    value: p.currentStock
  }));

  const PIE_COLORS = ['#047857', '#d97706', '#2563eb', '#7c3aed', '#dc2626', '#0891b2'];

  // Low stock products
  const lowStockProducts = products.filter(
    (p) => p.currentStock <= p.minStockLevel || p.status === 'Low Stock'
  );

  // Overdue retailers
  const overdueRetailers = retailers.filter(
    (r) => r.status === 'Overdue' || r.outstanding > r.creditLimit
  );

  // Pending deliveries
  const pendingOrders = orders.filter((o) =>
    ['New', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(o.status)
  ).slice(0, 4);

  const handleSendReminder = (retailer) => {
    addToast(
      `Payment reminder sent via WhatsApp & SMS to ${retailer.name} (${retailer.phone}) for ₹${retailer.outstanding.toLocaleString()}.`,
      'success'
    );
  };

  const handleQuickReorder = (product) => {
    addToast(
      `Purchase order drafted for 200 bags of ${product.name}. Redirecting to Purchases...`,
      'info'
    );
    onNavigate('/admin/purchases');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-trade-primary via-emerald-900 to-trade-dark p-6 rounded-3xl text-white shadow-elevation">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Wholesale Operations Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            Sri Murugan Rice Traders
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
            Live overview of sales, credit ledger, inventory stock, and fleet dispatches.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('/admin/orders')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Order
          </button>
          <button
            onClick={() => onNavigate('/admin/reports')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs border border-white/20 transition-colors"
          >
            <FileText className="w-4 h-4" />
            P&L Report
          </button>
        </div>
      </div>

      {/* 6 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Sales"
          value={`₹${(stats.totalSalesAmount || 0).toLocaleString()}`}
          subtitle="Gross turnover"
          icon={TrendingUp}
          trend="+18.4%"
          trendType="positive"
          colorScheme="emerald"
          onClick={() => onNavigate('/admin/sales')}
        />
        <StatCard
          title="Outstanding Credit"
          value={`₹${(stats.totalOutstandingCredit || 0).toLocaleString()}`}
          subtitle={`${overdueRetailers.length} overdue accounts`}
          icon={CreditCard}
          trend="₹33k due soon"
          trendType="neutral"
          colorScheme="amber"
          onClick={() => onNavigate('/admin/credit')}
        />
        <StatCard
          title="Current Stock"
          value={`${stats.totalCurrentStockBags || 0}`}
          subtitle="Bags in godowns"
          icon={Package}
          trend={`${lowStockProducts.length} low stock`}
          trendType={lowStockProducts.length > 0 ? 'negative' : 'positive'}
          colorScheme="blue"
          onClick={() => onNavigate('/admin/inventory')}
        />
        <StatCard
          title="Pending Deliveries"
          value={`${stats.pendingDeliveriesCount || 0}`}
          subtitle="Active fleet dispatches"
          icon={Truck}
          trend="3 trucks en route"
          trendType="neutral"
          colorScheme="purple"
          onClick={() => onNavigate('/admin/deliveries')}
        />
        <StatCard
          title="Monthly Expenses"
          value={`₹${(stats.monthlyExpensesAmount || 0).toLocaleString()}`}
          subtitle="Fuel, rent & labor"
          icon={Receipt}
          trend="Within budget"
          trendType="positive"
          colorScheme="slate"
          onClick={() => onNavigate('/admin/expenses')}
        />
        <StatCard
          title="Damage / Loss"
          value={`₹${(stats.totalDamageLossAmount || 0).toLocaleString()}`}
          subtitle={`${stats.totalDamagedBagsCount || 0} bags lost`}
          icon={AlertTriangle}
          trend="TN-28 check needed"
          trendType="negative"
          colorScheme="rose"
          onClick={() => onNavigate('/admin/damage')}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Wholesale Sales Trend</h2>
              <p className="text-xs text-slate-500">Daily gross wholesale sales & estimated gross profit</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSalesTimeframe('7d')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  salesTimeframe === '7d' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setSalesTimeframe('30d')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  salesTimeframe === '30d' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
                }`}
              >
                Last 30 Days
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="profitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val) => [`₹${val.toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Legend />
                <Area type="monotone" dataKey="sales" name="Sales Turnover (₹)" stroke="#047857" strokeWidth={2.5} fillOpacity={1} fill="url(#salesColor)" />
                <Area type="monotone" dataKey="profit" name="Gross Profit (₹)" stroke="#d97706" strokeWidth={2} fillOpacity={1} fill="url(#profitColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Breakdown Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Stock by Variety</h2>
            <p className="text-xs text-slate-500">Distribution of bags across warehouse godowns</p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {stockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val} Bags`, 'Quantity']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
            {stockDistribution.slice(0, 4).map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx] }} />
                <span className="text-slate-600 truncate">{s.name}:</span>
                <strong className="text-slate-900">{s.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Alert Cards Grid: Low Stock & Credit Due */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Low Stock Warnings</h3>
                <p className="text-xs text-slate-500">Varieties below minimum safety buffer</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/admin/inventory')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>View Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 mt-4">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-200/80"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-500">
                    Current: <strong className="text-rose-600">{p.currentStock} Bags</strong> (Min threshold: {p.minStockLevel} Bags)
                  </div>
                </div>
                <button
                  onClick={() => handleQuickReorder(p)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  Procure Mill Batch
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Due Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Credit Overdue Alerts</h3>
                <p className="text-xs text-slate-500">Retailers exceeding credit limits or payment dates</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/admin/credit')}
              className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
            >
              <span>Credit Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 mt-4">
            {overdueRetailers.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between p-3 rounded-xl bg-rose-50/50 border border-rose-200/80"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{r.name}</div>
                  <div className="text-[11px] text-slate-500">
                    Outstanding: <strong className="text-rose-700">₹{r.outstanding.toLocaleString()}</strong> (Limit: ₹{r.creditLimit.toLocaleString()}) • Due: {r.dueDate}
                  </div>
                </div>
                <button
                  onClick={() => handleSendReminder(r)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Notice</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Transactions & Pending Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Sales & Dispatches</h3>
              <p className="text-xs text-slate-500">Latest wholesale orders and invoice settlements</p>
            </div>
            <button
              onClick={() => onNavigate('/admin/sales')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>All Sales</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Grain Summary</th>
                  <th className="py-2.5 px-3 text-right">Bags</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sales.slice(0, 5).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 text-slate-500">{s.date}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{s.customerName}</td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-xs">{s.itemsSummary}</td>
                    <td className="py-3 px-3 text-right font-medium text-slate-800">{s.totalBags}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono">
                      ₹{s.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.paymentStatus === 'Credit'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {s.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => {
                          const linkedOrder = orders.find((o) => o.retailerName === s.customerName) || orders[0];
                          setSelectedInvoiceOrder(linkedOrder);
                        }}
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-emerald-800 transition-colors"
                        title="View Invoice"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Deliveries Section */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Dispatches</h3>
                <p className="text-xs text-slate-500">Live order delivery pipeline</p>
              </div>
              <button
                onClick={() => onNavigate('/admin/deliveries')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Fleet Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {pendingOrders.map((o) => (
                <div
                  key={o.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-slate-900">{o.id}</span>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">{o.retailerName}</div>
                      <div className="text-[11px] text-slate-500">{o.totalBags} Bags • {o.deliveryAddress?.split(',')[0]}</div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        o.status === 'Out for Delivery'
                          ? 'bg-blue-100 text-blue-800'
                          : o.status === 'Preparing'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Truck: <strong className="text-slate-700">{o.assignedVehicle || 'Unassigned'}</strong></span>
                    <span>{o.estimatedTime || 'En route'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigate('/admin/deliveries')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
            >
              Open Fleet Dispatch Board
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}
    </div>
  );
};
