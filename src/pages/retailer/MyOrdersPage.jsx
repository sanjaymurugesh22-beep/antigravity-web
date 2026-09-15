import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { InvoiceModal } from '../../components/common/InvoiceModal';
import {
  ShoppingCart,
  Search,
  Eye,
  FileText,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight
} from 'lucide-react';

export const MyOrdersPage = ({ onNavigate }) => {
  const { orders, retailers, activeRetailerId } = useCentralData();
  const customer = retailers.find((r) => r.id === activeRetailerId) || retailers[0];
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const myOrders = orders.filter(
    (o) => o.retailerId === customer.id || o.retailerName === customer.name
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Wholesale Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track order fulfillment status, delivery dispatch, and download GST tax invoices.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/retailer/order')}
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle"
        >
          + Place New Order
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-4">Ordered Items</th>
                <th className="py-3 px-3 text-right">Bags</th>
                <th className="py-3 px-4 text-right">Total (₹)</th>
                <th className="py-3 px-3 text-center">Payment Term</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{o.id}</td>
                  <td className="py-3.5 px-3 text-slate-500">{o.date}</td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {o.items?.map((it, idx) => (
                      <div key={idx} className="truncate max-w-xs">
                        {it.productName} ({it.quantity} bags)
                      </div>
                    ))}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-800">{o.totalBags}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                    ₹{o.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {o.paymentType}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : o.status === 'Out for Delivery'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedInvoiceOrder(o)}
                        className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Download Tax Invoice"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate('/retailer/delivery')}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Track Delivery"
                      >
                        <Truck className="w-4 h-4" />
                      </button>
                    </div>
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
