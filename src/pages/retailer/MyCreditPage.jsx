import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import {
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MyCreditPage = () => {
  const { retailers, activeRetailerId, ledgerTransactions, recordPayment } = useCentralData();
  const { addToast } = useToast();

  const customer = retailers.find((r) => r.id === activeRetailerId) || retailers[0];
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState(customer.outstanding.toString());
  const [payChannel, setPayChannel] = useState('UPI / GPay');

  const myTransactions = ledgerTransactions.filter((t) => t.customerId === customer.id);
  const availableCredit = Math.max(0, customer.creditLimit - customer.outstanding);
  const creditUsagePercent = Math.round((customer.outstanding / customer.creditLimit) * 100);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    const result = recordPayment({
      customerId: customer.id,
      amount: payAmount,
      paymentMode: payChannel,
      referenceNo: `UPI-SETTLE-${Date.now().toString().slice(-4)}`,
      notes: 'Online Retailer Payment'
    });

    if (result.success) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      addToast(`Payment of ₹${parseFloat(payAmount).toLocaleString()} processed successfully!`, 'success');
      setPayModalOpen(false);
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
            My Credit Account & Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review approved wholesale credit limit, pending bills, and make online settlements.
          </p>
        </div>
        <button
          onClick={() => {
            setPayAmount(customer.outstanding.toString());
            setPayModalOpen(true);
          }}
          disabled={customer.outstanding === 0}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-subtle ${
            customer.outstanding === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-emerald-800 hover:bg-emerald-700 text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Pay Outstanding Balance</span>
        </button>
      </div>

      {/* Credit Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Credit Limit</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{customer.creditLimit.toLocaleString()}
          </div>
          <span className="text-xs text-slate-500">Approved limit</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-card">
          <span className="text-[10px] uppercase font-bold text-amber-800 block">Outstanding Balance</span>
          <div className="text-2xl font-black text-amber-900 mt-1 font-mono">
            ₹{customer.outstanding.toLocaleString()}
          </div>
          <span className="text-xs text-amber-700 font-semibold">{creditUsagePercent}% of limit used</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-card">
          <span className="text-[10px] uppercase font-bold text-emerald-800 block">Available Credit</span>
          <div className="text-2xl font-black text-emerald-900 mt-1 font-mono">
            ₹{availableCredit.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-700 font-semibold">Available for new orders</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Due Date</span>
          <div className="text-xl font-black text-slate-900 mt-1">
            {customer.dueDate}
          </div>
          <span className={`text-xs font-bold ${customer.status === 'Overdue' ? 'text-rose-600' : 'text-slate-500'}`}>
            Status: {customer.status}
          </span>
        </div>
      </div>

      {/* Ledger History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Transaction History Statement</h3>
          <p className="text-xs text-slate-500">Chronological statement of credit dispatches and payments received</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-3 text-center">Type</th>
                <th className="py-3 px-3 text-right">Debit (+)</th>
                <th className="py-3 px-3 text-right">Credit (-)</th>
                <th className="py-3 px-4 text-right">Running Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myTransactions.map((tx) => {
                const isDebit = tx.type === 'DEBIT';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500">{tx.date}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">{tx.id}</td>
                    <td className="py-3.5 px-4 text-slate-800">
                      <div className="font-semibold">{tx.description}</div>
                      <span className="text-[10px] text-slate-400 font-mono">Ref: {tx.referenceNo}</span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDebit ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isDebit ? 'Order Billed' : 'Payment'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-amber-800">
                      {isDebit ? `₹${tx.amount.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {!isDebit ? `₹${tx.amount.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                      ₹{tx.balanceAfter.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Pay Outstanding Balance */}
      {payModalOpen && (
        <Modal
          isOpen={payModalOpen}
          onClose={() => setPayModalOpen(false)}
          title={`Pay Dues — ${customer.name}`}
          subtitle={`Current Outstanding: ₹${customer.outstanding.toLocaleString()}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handlePaySubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Payment Amount (₹) *
              </label>
              <input
                type="number"
                min="100"
                max={customer.outstanding}
                required
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Select Payment Channel
              </label>
              <select
                value={payChannel}
                onChange={(e) => setPayChannel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                <option value="UPI / GPay / PhonePe">UPI Instant QR (GPay / PhonePe)</option>
                <option value="Net Banking / NEFT">Net Banking / NEFT Transfer</option>
                <option value="Debit / Corporate Card">Debit / Business Card</option>
              </select>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Wholesale Merchant QR Code (Simulated)
              </span>
              <div className="w-32 h-32 bg-white border-2 border-slate-300 rounded-xl mx-auto flex items-center justify-center text-4xl shadow-xs">
                📲
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                UPI ID: srimurugantraders@icici
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPayModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Simulate ₹{parseFloat(payAmount || 0).toLocaleString()} Payment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
