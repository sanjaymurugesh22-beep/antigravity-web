import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { Modal } from '../../components/common/Modal';
import { InvoiceModal } from '../../components/common/InvoiceModal';
import { useToast } from '../../context/ToastContext';
import {
  ShoppingCart,
  Search,
  Filter,
  Plus,
  Truck,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
  ArrowRight,
  Eye,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

export const OrdersPage = () => {
  const {
    orders,
    retailers,
    products,
    vehicles,
    placeOrder,
    updateOrderStatus
  } = useCentralData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [newOrderModalOpen, setNewOrderModalOpen] = useState(false);
  const [assignDispatchOrder, setAssignDispatchOrder] = useState(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // New Order Form
  const [orderForm, setOrderForm] = useState({
    retailerId: '',
    productId: 'prod-1',
    quantity: '25',
    preferredDeliveryDate: '2026-09-17',
    paymentType: 'Credit',
    deliveryAddress: ''
  });

  // Assign Driver / Vehicle Form
  const [assignForm, setAssignForm] = useState({
    vehicleNumber: 'TN-28-AP-4521',
    driverName: 'Selvam M.'
  });

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.retailerName.toLowerCase().includes(search.toLowerCase()) ||
      (o.deliveryAddress && o.deliveryAddress.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const customer = retailers.find((r) => r.id === orderForm.retailerId);
    const product = products.find((p) => p.id === orderForm.productId);
    const qty = parseInt(orderForm.quantity, 10);
    const total = qty * (product ? product.sellingPrice : 1500);

    if (!customer) {
      addToast('Please select a retailer', 'error');
      return;
    }

    const result = placeOrder({
      retailerId: customer.id,
      retailerName: customer.name,
      phone: customer.phone,
      deliveryAddress: orderForm.deliveryAddress || customer.address,
      preferredDeliveryDate: orderForm.preferredDeliveryDate,
      paymentType: orderForm.paymentType,
      items: [
        {
          productId: product.id,
          productName: `${product.name} (${product.bagSize}kg)`,
          quantity: qty,
          price: product.sellingPrice,
          total
        }
      ],
      totalBags: qty,
      totalWeightKg: qty * product.bagSize,
      subtotal: total,
      grandTotal: total
    });

    if (result.success) {
      addToast(`Order ${result.orderId} created successfully!`, 'success');
      setNewOrderModalOpen(false);
    } else {
      addToast(result.error, 'error');
    }
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    updateOrderStatus(
      assignDispatchOrder.id,
      'Out for Delivery',
      assignForm.vehicleNumber,
      assignForm.driverName
    );
    addToast(`Order ${assignDispatchOrder.id} dispatched with ${assignForm.vehicleNumber}!`, 'success');
    setAssignDispatchOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Order & Delivery Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track wholesale grain purchase orders, dispatch vehicles, and generate invoices.
          </p>
        </div>
        <button
          onClick={() => {
            if (retailers.length > 0) {
              setOrderForm((prev) => ({ ...prev, retailerId: retailers[0].id }));
            }
            setNewOrderModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle hover:shadow-elevation"
        >
          <Plus className="w-4 h-4" />
          <span>New Wholesale Order</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order ID, customer, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">Stage:</span>
          {['ALL', 'New', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-4">Retailer</th>
                <th className="py-3 px-4">Rice Varieties Ordered</th>
                <th className="py-3 px-3 text-right">Bags</th>
                <th className="py-3 px-3 text-right">Total (₹)</th>
                <th className="py-3 px-3 text-center">Payment</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Dispatch Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{o.id}</td>
                  <td className="py-3.5 px-3 text-slate-500">{o.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{o.retailerName}</div>
                    <div className="text-[11px] text-slate-400">{o.deliveryAddress?.split(',')[0]}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {o.items?.map((it, idx) => (
                      <div key={idx} className="truncate max-w-xs">
                        {it.productName}: <strong className="text-slate-900">{it.quantity} bags</strong>
                      </div>
                    ))}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-800">{o.totalBags}</td>
                  <td className="py-3.5 px-3 text-right font-mono font-black text-slate-900">
                    ₹{o.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        o.paymentType === 'Credit'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
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
                          : o.status === 'Preparing'
                          ? 'bg-amber-100 text-amber-800'
                          : o.status === 'Confirmed'
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-slate-200 text-slate-700'
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
                        title="View GST Tax Invoice"
                      >
                        <FileText className="w-4 h-4" />
                      </button>

                      {o.status === 'New' && (
                        <button
                          onClick={() => updateOrderStatus(o.id, 'Confirmed')}
                          className="px-2 py-1 bg-emerald-800 text-white font-bold rounded-lg text-[10px] hover:bg-emerald-700 transition-colors"
                        >
                          Confirm & Deduct Stock
                        </button>
                      )}

                      {o.status === 'Confirmed' && (
                        <button
                          onClick={() => updateOrderStatus(o.id, 'Preparing')}
                          className="px-2 py-1 bg-amber-600 text-white font-bold rounded-lg text-[10px] hover:bg-amber-700 transition-colors"
                        >
                          Start Packing
                        </button>
                      )}

                      {o.status === 'Preparing' && (
                        <button
                          onClick={() => setAssignDispatchOrder(o)}
                          className="px-2 py-1 bg-blue-700 text-white font-bold rounded-lg text-[10px] hover:bg-blue-800 transition-colors flex items-center gap-1"
                        >
                          <Truck className="w-3 h-3" />
                          Assign Truck
                        </button>
                      )}

                      {o.status === 'Out for Delivery' && (
                        <button
                          onClick={() => updateOrderStatus(o.id, 'Delivered')}
                          className="px-2 py-1 bg-emerald-700 text-white font-bold rounded-lg text-[10px] hover:bg-emerald-800 transition-colors"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Create New Wholesale Order */}
      {newOrderModalOpen && (
        <Modal
          isOpen={newOrderModalOpen}
          onClose={() => setNewOrderModalOpen(false)}
          title="Create Wholesale Grain Order"
          subtitle="Direct order entry with automatic stock allocation & credit check"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleCreateOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Select Retailer *
              </label>
              <select
                value={orderForm.retailerId}
                onChange={(e) => {
                  const cust = retailers.find((r) => r.id === e.target.value);
                  setOrderForm({
                    ...orderForm,
                    retailerId: e.target.value,
                    deliveryAddress: cust ? cust.address : ''
                  });
                }}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                {retailers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} (Outstanding: ₹{r.outstanding.toLocaleString()} / Limit: ₹{r.creditLimit.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Rice Variety *
                </label>
                <select
                  value={orderForm.productId}
                  onChange={(e) => setOrderForm({ ...orderForm, productId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.bagSize}kg) — ₹{p.sellingPrice}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Quantity (Bags) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Payment Terms
                </label>
                <select
                  value={orderForm.paymentType}
                  onChange={(e) => setOrderForm({ ...orderForm, paymentType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                >
                  <option value="Credit">Credit (15 Days Wholesale)</option>
                  <option value="Paid">Prepaid / Cash / Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preferred Delivery Date
                </label>
                <input
                  type="date"
                  value={orderForm.preferredDeliveryDate}
                  onChange={(e) => setOrderForm({ ...orderForm, preferredDeliveryDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Delivery Address
              </label>
              <textarea
                rows="2"
                value={orderForm.deliveryAddress}
                onChange={(e) => setOrderForm({ ...orderForm, deliveryAddress: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setNewOrderModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Create Order
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: Assign Dispatch Truck & Driver */}
      {assignDispatchOrder && (
        <Modal
          isOpen={!!assignDispatchOrder}
          onClose={() => setAssignDispatchOrder(null)}
          title={`Assign Truck & Driver — Order ${assignDispatchOrder.id}`}
          subtitle={`${assignDispatchOrder.retailerName} (${assignDispatchOrder.totalBags} Bags)`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAssignSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Select Fleet Vehicle
              </label>
              <select
                value={assignForm.vehicleNumber}
                onChange={(e) => {
                  const veh = vehicles.find((v) => v.vehicleNumber === e.target.value);
                  setAssignForm({
                    vehicleNumber: e.target.value,
                    driverName: veh ? veh.driverName : 'Selvam M.'
                  });
                }}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.vehicleNumber}>
                    {v.vehicleNumber} ({v.model} - Cap: {v.capacityBags} Bags)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Assigned Driver
              </label>
              <input
                type="text"
                readOnly
                value={assignForm.driverName}
                className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
              />
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
              Driver will receive instant dispatch alert on their Delivery Staff console.
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAssignDispatchOrder(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Dispatch Vehicle
              </button>
            </div>
          </form>
        </Modal>
      )}

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
