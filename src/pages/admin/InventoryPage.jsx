import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import {
  Package,
  Search,
  Filter,
  Plus,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  CheckCircle2,
  TrendingDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const InventoryPage = ({ onNavigate }) => {
  const { products, purchases, sales, damageRecords, addPurchase } = useCentralData();
  const { addToast } = useToast();

  const [viewMode, setViewMode] = useState('cards'); // cards | table
  const [search, setSearch] = useState('');
  const [varietyFilter, setVarietyFilter] = useState('ALL');
  const [newBatchModalOpen, setNewBatchModalOpen] = useState(false);

  // New Batch / Purchase Form
  const [batchForm, setBatchForm] = useState({
    supplier: 'Sri Venkateswara Modern Rice Mill (Nellore)',
    supplierGst: '37AACCS9912L1ZZ',
    productId: 'prod-1',
    quantityBags: '150',
    ratePerBag: '1350',
    invoiceNumber: `INV-MILL-${Date.now().toString().slice(-4)}`,
    notes: 'Direct mill procurement batch'
  });

  const varieties = ['ALL', 'Ponni Rice', 'Idli Rice', 'Sona Masuri', 'Basmati Rice', 'Raw Rice', 'Boiled Rice'];

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.variety.toLowerCase().includes(search.toLowerCase());
    const matchVariety = varietyFilter === 'ALL' || p.variety === varietyFilter;
    return matchSearch && matchVariety;
  });

  const handleCreateBatch = (e) => {
    e.preventDefault();
    const product = products.find((p) => p.id === batchForm.productId);
    addPurchase({
      ...batchForm,
      productName: product ? product.name : 'Rice Variety'
    });
    addToast(`Added ${batchForm.quantityBags} bags of ${product?.name} to inventory!`, 'success');
    setNewBatchModalOpen(false);
  };

  // Compile Stock Movement History
  const stockMovements = [
    ...purchases.map((pur) => ({
      id: pur.id,
      date: pur.date,
      type: 'INFLOW',
      source: `Mill Purchase: ${pur.supplier.split('(')[0]}`,
      productName: pur.productName,
      bags: `+${pur.quantityBags}`,
      tagColor: 'bg-emerald-100 text-emerald-800'
    })),
    ...sales.map((sal) => ({
      id: sal.id,
      date: sal.date,
      type: 'OUTFLOW',
      source: `Wholesale Sale: ${sal.customerName}`,
      productName: sal.itemsSummary,
      bags: `-${sal.totalBags}`,
      tagColor: 'bg-blue-100 text-blue-800'
    })),
    ...damageRecords.map((dam) => ({
      id: dam.id,
      date: dam.date,
      type: 'DAMAGE',
      source: `Loss write-off (${dam.stage} on ${dam.vehicleNumber || 'Godown'})`,
      productName: dam.productName,
      bags: `-${dam.bagsDamaged}`,
      tagColor: 'bg-rose-100 text-rose-800'
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Rice Stock & Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time godown bag counts, buffer alerts, and multi-variety stock movements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-subtle">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'cards' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'table' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Table View
            </button>
          </div>
          <button
            onClick={() => setNewBatchModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle"
          >
            <Plus className="w-4 h-4" />
            <span>Receive Mill Batch</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search rice variety, brand, grade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-semibold mr-1 hidden sm:inline">Variety:</span>
          {varieties.map((v) => (
            <button
              key={v}
              onClick={() => setVarietyFilter(v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                varietyFilter === v
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const isLowStock = p.currentStock <= p.minStockLevel;
            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl border p-5 shadow-card hover:shadow-elevation transition-all flex flex-col justify-between ${
                  isLowStock ? 'border-amber-300 ring-1 ring-amber-300/40' : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        {p.variety} • HSN {p.hsn}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500">{p.brand} — {p.grade}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                        p.status === 'Low Stock'
                          ? 'bg-rose-100 text-rose-800 animate-pulse'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {/* Stock count gauge */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 my-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Available Bags</span>
                        <div className="text-2xl font-black text-slate-900 font-mono">
                          {p.currentStock} <span className="text-xs text-slate-500 font-sans font-normal">Bags ({p.bagSize}kg each)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Safety Min</span>
                        <span className="text-xs font-bold text-slate-700">{p.minStockLevel} Bags</span>
                      </div>
                    </div>

                    {isLowStock && (
                      <div className="mt-2 text-[11px] font-bold text-amber-700 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Below safety buffer. Immediate mill replenishment recommended.
                      </div>
                    )}
                  </div>

                  {/* Price breakdown */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Mill Buy Price</span>
                      <span className="font-bold text-slate-800 font-mono">₹{p.purchasePrice} / bag</span>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                      <span className="text-[10px] text-emerald-800 block">Wholesale Selling</span>
                      <span className="font-bold text-emerald-900 font-mono">₹{p.sellingPrice} / bag</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Margin: ₹{p.sellingPrice - p.purchasePrice} / bag
                  </span>
                  <button
                    onClick={() => {
                      setBatchForm((prev) => ({
                        ...prev,
                        productId: p.id,
                        ratePerBag: p.purchasePrice.toString()
                      }));
                      setNewBatchModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                  >
                    Receive Stock
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Rice Variety & Grade</th>
                  <th className="py-3 px-3">Brand</th>
                  <th className="py-3 px-3 text-center">Bag Size</th>
                  <th className="py-3 px-3 text-right">Current Stock</th>
                  <th className="py-3 px-3 text-right">Min Threshold</th>
                  <th className="py-3 px-3 text-right">Procure Price</th>
                  <th className="py-3 px-3 text-right">Wholesale Price</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-400">{p.variety} • HSN {p.hsn}</div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">{p.brand}</td>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-800">{p.bagSize} kg</td>
                    <td className="py-3.5 px-3 text-right font-mono font-black text-slate-900">
                      {p.currentStock} Bags
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-500">{p.minStockLevel} Bags</td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-700">₹{p.purchasePrice}</td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-900">₹{p.sellingPrice}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === 'Low Stock'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          setBatchForm((prev) => ({
                            ...prev,
                            productId: p.id,
                            ratePerBag: p.purchasePrice.toString()
                          }));
                          setNewBatchModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
                      >
                        + Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stock Movement Audit Log Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Stock Movement Audit Trail</h2>
            <p className="text-xs text-slate-500">Automated log: Purchases (+), Wholesale Sales (-), Damage write-offs (-)</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Last {stockMovements.length} logged events
          </span>
        </div>

        <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-60 overflow-y-auto">
          {stockMovements.map((move, idx) => (
            <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${move.tagColor}`}>
                  {move.type}
                </span>
                <div>
                  <div className="font-semibold text-slate-900">{move.source}</div>
                  <div className="text-[11px] text-slate-500">{move.productName}</div>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-mono font-black text-sm ${move.bags.startsWith('+') ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {move.bags} Bags
                </span>
                <div className="text-[10px] text-slate-400">{move.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: Receive Mill Batch Form */}
      {newBatchModalOpen && (
        <Modal
          isOpen={newBatchModalOpen}
          onClose={() => setNewBatchModalOpen(false)}
          title="Receive Stock Batch from Rice Mill"
          subtitle="Direct procurement incrementing inventory levels and purchase accounts"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateBatch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Rice Mill / Supplier *
              </label>
              <input
                type="text"
                required
                value={batchForm.supplier}
                onChange={(e) => setBatchForm({ ...batchForm, supplier: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Select Rice Variety *
              </label>
              <select
                value={batchForm.productId}
                onChange={(e) => {
                  const prod = products.find((p) => p.id === e.target.value);
                  setBatchForm({
                    ...batchForm,
                    productId: e.target.value,
                    ratePerBag: prod ? prod.purchasePrice.toString() : '1300'
                  });
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.bagSize}kg) — Current: {p.currentStock} Bags
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Received Bags *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={batchForm.quantityBags}
                  onChange={(e) => setBatchForm({ ...batchForm, quantityBags: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
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
                  value={batchForm.ratePerBag}
                  onChange={(e) => setBatchForm({ ...batchForm, ratePerBag: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between text-xs font-bold">
              <span>Total Procurement Cost:</span>
              <span className="font-mono text-slate-900">
                ₹{((parseInt(batchForm.quantityBags, 10) || 0) * (parseFloat(batchForm.ratePerBag) || 0)).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setNewBatchModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Add to Stock
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
