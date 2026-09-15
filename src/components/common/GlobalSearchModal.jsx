import React, { useState, useMemo, useEffect } from 'react';
import { Modal } from './Modal';
import { useCentralData } from '../../context/CentralDataContext';
import {
  Search,
  Users,
  Package,
  ShoppingCart,
  Truck,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const GlobalSearchModal = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const { retailers, products, orders, vehicles, ledgerTransactions } = useCentralData();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedCustomers = retailers.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.gstin.toLowerCase().includes(q)
    );

    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.variety.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );

    const matchedOrders = orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.retailerName.toLowerCase().includes(q) ||
        (o.deliveryAddress && o.deliveryAddress.toLowerCase().includes(q))
    );

    const matchedVehicles = vehicles.filter(
      (v) =>
        v.vehicleNumber.toLowerCase().includes(q) ||
        v.driverName.toLowerCase().includes(q)
    );

    const matchedLedger = ledgerTransactions.filter(
      (l) =>
        l.customerName.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.referenceNo.toLowerCase().includes(q)
    );

    return {
      customers: matchedCustomers,
      products: matchedProducts,
      orders: matchedOrders,
      vehicles: matchedVehicles,
      ledger: matchedLedger
    };
  }, [query, retailers, products, orders, vehicles, ledgerTransactions]);

  const totalResults = searchResults
    ? searchResults.customers.length +
      searchResults.products.length +
      searchResults.orders.length +
      searchResults.vehicles.length +
      searchResults.ledger.length
    : 0;

  const handleSelect = (route) => {
    onClose();
    if (onNavigate) {
      onNavigate(route);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Global Rice ERP Search"
      subtitle="Search instantly across Customers, Rice Stock, Orders, Fleet & Ledger"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Type customer name, rice variety (e.g. Ponni, Basmati), order ID (ORD-1024), truck no..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-1">
          {!query && (
            <div className="py-8 text-center text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">Search suggestions:</p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {['Ravi Traders', 'Ponni Rice', 'Basmati', 'ORD-1024', 'TN-28', 'Overdue'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="py-8 text-center text-slate-500">
              <p className="text-sm">No matching records found for "{query}".</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by rice name, customer or order ID.</p>
            </div>
          )}

          {/* Customers Section */}
          {searchResults && searchResults.customers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 mb-2">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                Customers ({searchResults.customers.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.customers.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect('/admin/customers')}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/70 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-900">
                        {c.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {c.address} • Phone: {c.phone}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-800">
                        Credit Due: ₹{c.outstanding.toLocaleString()}
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          c.status === 'Overdue'
                            ? 'bg-rose-100 text-rose-700'
                            : c.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Section */}
          {searchResults && searchResults.products.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 mb-2">
                <Package className="w-3.5 h-3.5 text-amber-600" />
                Rice Inventory ({searchResults.products.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.products.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect('/admin/inventory')}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-amber-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {p.brand} • {p.bagSize}kg Bag • Sell: ₹{p.sellingPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-800">
                        Stock: {p.currentStock} Bags
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          p.status === 'Low Stock'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Section */}
          {searchResults && searchResults.orders.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 mb-2">
                <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
                Orders ({searchResults.orders.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.orders.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => handleSelect('/admin/orders')}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/70 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-blue-900">
                        {o.id} — {o.retailerName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {o.totalBags} Bags • ₹{o.grandTotal.toLocaleString()} • {o.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fleet Section */}
          {searchResults && searchResults.vehicles.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 mb-2">
                <Truck className="w-3.5 h-3.5 text-purple-600" />
                Fleet & Logistics ({searchResults.vehicles.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => handleSelect('/admin/deliveries')}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-purple-50/70 border border-slate-200/70 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {v.vehicleNumber} ({v.model})
                      </div>
                      <div className="text-xs text-slate-500">
                        Driver: {v.driverName} • Capacity: {v.capacityBags} Bags
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
