import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import {
  ArrowDownCircle,
  Search,
  Plus,
  FileSpreadsheet,
  Building2,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const PurchasesPage = () => {
  const { purchases, products, addPurchase } = useCentralData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [newPurchaseModal, setNewPurchaseModal] = useState(false);
  const [form, setForm] = useState({
    supplier: 'Sri Venkateswara Modern Rice Mill (Nellore)',
    supplierGst: '37AACCS9912L1ZZ',
    productId: 'prod-1',
    quantityBags: '200',
    ratePerBag: '1350',
    invoiceNumber: `INV-MILL-${Date.now().toString().slice(-4)}`,
    notes: 'Premium aged rice batch'
  });

  const filteredPurchases = purchases.filter(
    (p) =>
      p.supplier.toLowerCase().includes(search.toLowerCase()) ||
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalProcuredAmount = purchases.reduce((acc, p) => acc + (p.totalAmount || 0), 0);
  const totalProcuredBags = purchases.reduce((acc, p) => acc + (p.quantityBags || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const prod = products.find((pr) => pr.id === form.productId);
    addPurchase({
      ...form,
      productName: prod ? prod.name : 'Rice Variety'
    });
    addToast(`Purchase entry created and ${form.quantityBags} bags added to stock!`, 'success');
    setNewPurchaseModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Procurement & Mill Purchases
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Rice mill purchase bills, inbound container loads, and automated stock increment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast('Purchases exported to Excel (.xlsx)', 'success')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-colors shadow-subtle"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => setNewPurchaseModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle"
          >
            <Plus className="w-4 h-4" />
            <span>Record Mill Purchase</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Procurement Spend</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{totalProcuredAmount.toLocaleString()}
          </div>
          <span className="text-xs text-slate-500">Across direct mill suppliers</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Bags Received</span>
          <div className="text-2xl font-black text-emerald-800 mt-1 font-mono">
            {totalProcuredBags} Bags
          </div>
          <span className="text-xs text-slate-500">Auto-incremented into inventory</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Key Mill Partners</span>
          <div className="text-2xl font-black text-slate-900 mt-1">3 Modern Mills</div>
          <span className="text-xs text-slate-500">Nellore, Thanjavur, Karnal</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search mill, variety, invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
          />
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Purchase ID</th>
                <th className="py-3 px-4">Rice Mill / Supplier</th>
                <th className="py-3 px-4">Variety Purchased</th>
                <th className="py-3 px-3 text-right">Bags</th>
                <th className="py-3 px-3 text-right">Rate / Bag (₹)</th>
                <th className="py-3 px-4 text-right">Total Amount (₹)</th>
                <th className="py-3 px-3 text-center">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPurchases.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500">{p.date}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{p.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    <div>{p.supplier}</div>
                    <span className="text-[10px] font-mono text-slate-400">Bill: {p.invoiceNumber}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{p.productName}</td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900">{p.quantityBags}</td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-600">₹{p.ratePerBag}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-900">
                    ₹{p.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {p.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {newPurchaseModal && (
        <Modal
          isOpen={newPurchaseModal}
          onClose={() => setNewPurchaseModal(false)}
          title="Record Rice Mill Purchase Entry"
          subtitle="Direct procurement incrementing godown stock and financial ledger"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Rice Mill / Supplier *
              </label>
              <input
                type="text"
                required
                value={form.supplier}
                onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Rice Variety *
              </label>
              <select
                value={form.productId}
                onChange={(e) => setForm({ ...form, productId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.bagSize}kg)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Quantity (Bags) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.quantityBags}
                  onChange={(e) => setForm({ ...form, quantityBags: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Rate / Bag (₹) *
                </label>
                <input
                  type="number"
                  min="100"
                  required
                  value={form.ratePerBag}
                  onChange={(e) => setForm({ ...form, ratePerBag: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Mill Invoice Number
              </label>
              <input
                type="text"
                value={form.invoiceNumber}
                onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setNewPurchaseModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Add Purchase
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
