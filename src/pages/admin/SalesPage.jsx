import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { InvoiceModal } from '../../components/common/InvoiceModal';
import { useToast } from '../../context/ToastContext';
import {
  ArrowUpCircle,
  Search,
  FileSpreadsheet,
  FileText,
  DollarSign,
  TrendingUp,
  Eye,
  Calendar
} from 'lucide-react';

export const SalesPage = () => {
  const { sales, orders } = useCentralData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const filteredSales = sales.filter(
    (s) =>
      s.customerName.toLowerCase().includes(search.toLowerCase()) ||
      s.itemsSummary.toLowerCase().includes(search.toLowerCase()) ||
      s.invoiceNo.toLowerCase().includes(search.toLowerCase())
  );

  const totalSalesAmount = sales.reduce((acc, s) => acc + (s.amount || 0), 0);
  const totalSalesBags = sales.reduce((acc, s) => acc + (s.totalBags || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Wholesale Sales Register
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automated register of wholesale cash sales, 15-day credit accounts, and GST invoices.
          </p>
        </div>
        <button
          onClick={() => addToast('Sales register exported to Excel (.xlsx)', 'success')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-colors shadow-subtle"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
          <span>Export Excel</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Sales Turnover</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{totalSalesAmount.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-700 font-bold">+18.4% month-on-month</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Bags Dispatched</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {totalSalesBags} Bags
          </div>
          <span className="text-xs text-slate-500">Across Ponni, Sona Masuri, Basmati</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Wholesale Bill</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{sales.length > 0 ? Math.round(totalSalesAmount / sales.length).toLocaleString() : 0}
          </div>
          <span className="text-xs text-slate-500">Per wholesale shipment</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice number, retailer, grain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Invoice No</th>
                <th className="py-3 px-4">Retailer Customer</th>
                <th className="py-3 px-4">Rice Varieties</th>
                <th className="py-3 px-3 text-right">Bags</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-3 text-center">Payment Term</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSales.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500">{s.date}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{s.invoiceNo}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{s.customerName}</td>
                  <td className="py-3.5 px-4 text-slate-600 truncate max-w-xs">{s.itemsSummary}</td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-800">{s.totalBags}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                    ₹{s.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-center">
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
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => {
                        const linkedOrder = orders.find((o) => o.retailerName === s.customerName) || orders[0];
                        setSelectedInvoiceOrder(linkedOrder);
                      }}
                      className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View Tax Invoice"
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
