import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import {
  CreditCard,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Send,
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  Filter
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const CreditLedgerPage = () => {
  const { ledgerTransactions, retailers, recordPayment } = useCentralData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedRetailerFilter, setSelectedRetailerFilter] = useState('ALL');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedRetailerId, setSelectedRetailerId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('UPI / QR Instant');

  const filteredTransactions = ledgerTransactions.filter((t) => {
    const matchSearch =
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.referenceNo.toLowerCase().includes(search.toLowerCase());
    const matchRetailer =
      selectedRetailerFilter === 'ALL' || t.customerId === selectedRetailerFilter;
    return matchSearch && matchRetailer;
  });

  const totalOutstanding = retailers.reduce((acc, r) => acc + r.outstanding, 0);

  const handleExport = () => {
    addToast('Credit Ledger exported to Excel (.xlsx) successfully!', 'success');
  };

  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    const result = recordPayment({
      customerId: selectedRetailerId,
      amount: paymentAmount,
      paymentMode,
      referenceNo: `PAY-MANUAL-${Date.now().toString().slice(-4)}`,
      notes: 'Ledger Settlement'
    });

    if (result.success) {
      setPaymentModalOpen(false);
      setPaymentAmount('');
    } else {
      addToast(result.error, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Digital Credit Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete audit trail of credit sales, payment settlements, and customer balances.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-colors shadow-subtle"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => {
              if (retailers.length > 0) {
                setSelectedRetailerId(retailers[0].id);
              }
              setPaymentModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle"
          >
            <DollarSign className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* Credit Aging Analysis Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Current (0 - 15 Days)</span>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">₹53,950</div>
          <span className="text-[10px] text-emerald-600 font-bold">Standard terms</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-amber-700 block">Due Soon (16 - 30 Days)</span>
          <div className="text-lg sm:text-xl font-black text-amber-900 mt-1">₹60,000</div>
          <span className="text-[10px] text-amber-700 font-bold">Murugan Stores</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-rose-600 block">Overdue (&gt; 30 Days)</span>
          <div className="text-lg sm:text-xl font-black text-rose-700 mt-1">₹14,450</div>
          <span className="text-[10px] text-rose-600 font-bold">Sri Lakshmi Stores</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Dues</span>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">₹{totalOutstanding.toLocaleString()}</div>
          <span className="text-[10px] text-slate-400 font-medium">Across all accounts</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, invoice or ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Filter Retailer:</span>
          <select
            value={selectedRetailerFilter}
            onChange={(e) => setSelectedRetailerFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
          >
            <option value="ALL">All Retailers</option>
            {retailers.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-4">Retailer</th>
                <th className="py-3 px-4">Description / Narration</th>
                <th className="py-3 px-3 text-center">Type</th>
                <th className="py-3 px-3 text-right">Debit (+)</th>
                <th className="py-3 px-3 text-right">Credit (-)</th>
                <th className="py-3 px-4 text-right">Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => {
                const isDebit = tx.type === 'DEBIT';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-500">{tx.date}</td>
                    <td className="py-3 px-3 font-mono text-slate-400">{tx.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{tx.customerName}</td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{tx.description}</div>
                      <span className="text-[10px] font-mono text-slate-400">Ref: {tx.referenceNo}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDebit ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isDebit ? 'Credit Sale' : 'Payment Recd'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-800">
                      {isDebit ? `₹${tx.amount.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">
                      {!isDebit ? `₹${tx.amount.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-slate-900">
                      ₹{tx.balanceAfter.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Recording Modal */}
      {paymentModalOpen && (
        <Modal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          title="Record Retailer Payment"
          subtitle="Directly credit ledger and adjust outstanding balance"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleRecordPaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Select Retailer
              </label>
              <select
                value={selectedRetailerId}
                onChange={(e) => setSelectedRetailerId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                {retailers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} (Due: ₹{r.outstanding.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Settlement Amount (₹)
              </label>
              <input
                type="number"
                required
                min="100"
                placeholder="e.g. 30000"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Payment Channel
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                <option value="UPI / QR Instant">UPI / QR Instant</option>
                <option value="NEFT / RTGS Bank Transfer">NEFT / RTGS Bank Transfer</option>
                <option value="Cheque Clearance">Cheque Clearance</option>
                <option value="Cash Deposit">Cash Deposit</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Post to Ledger
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
