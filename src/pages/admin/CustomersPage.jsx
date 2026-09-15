import React, { useState, useMemo } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CreditCard,
  AlertTriangle,
  Send,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  MapPin,
  Building2,
  FileText
} from 'lucide-react';

export const CustomersPage = () => {
  const {
    retailers,
    addRetailer,
    updateRetailer,
    deleteRetailer,
    recordPayment,
    placeOrder,
    products,
    ledgerTransactions,
    orders
  } = useCentralData();
  const { addToast } = useToast();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, Paid, Pending, Overdue

  // Modal States
  const [profileModalCustomer, setProfileModalCustomer] = useState(null);
  const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [editCustomerModalCustomer, setEditCustomerModalCustomer] = useState(null);
  const [recordPaymentCustomer, setRecordPaymentCustomer] = useState(null);
  const [creditSaleCustomer, setCreditSaleCustomer] = useState(null);
  const [reminderModalCustomer, setReminderModalCustomer] = useState(null);

  // Form States for Add/Edit Retailer
  const [retailerFormData, setRetailerFormData] = useState({
    name: '',
    owner: '',
    phone: '',
    email: '',
    gstin: '',
    address: '',
    creditLimit: '150000',
    dueDate: '2026-09-30',
    notes: ''
  });

  // Form States for Record Payment
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentMode: 'NEFT / RTGS',
    referenceNo: '',
    notes: 'Partial settlement'
  });

  // Form States for Add Credit Sale
  const [creditSaleForm, setCreditSaleForm] = useState({
    productId: 'prod-1',
    quantity: '20',
    deliveryAddress: '',
    notes: ''
  });

  // Filtered Retailers
  const filteredRetailers = useMemo(() => {
    return retailers.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.phone.includes(searchQuery) ||
        r.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.owner && r.owner.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [retailers, searchQuery, statusFilter]);

  // Aggregate metrics
  const totalOutstanding = retailers.reduce((acc, r) => acc + (r.outstanding || 0), 0);
  const totalCreditLimits = retailers.reduce((acc, r) => acc + (r.creditLimit || 0), 0);
  const overdueAccounts = retailers.filter((r) => r.status === 'Overdue').length;

  // Open Edit Modal
  const handleOpenEdit = (customer) => {
    setRetailerFormData({
      name: customer.name,
      owner: customer.owner || '',
      phone: customer.phone,
      email: customer.email || '',
      gstin: customer.gstin || '',
      address: customer.address,
      creditLimit: customer.creditLimit.toString(),
      dueDate: customer.dueDate || '',
      notes: customer.notes || ''
    });
    setEditCustomerModalCustomer(customer);
  };

  // Submit Add/Edit
  const handleSaveRetailer = (e) => {
    e.preventDefault();
    if (!retailerFormData.name || !retailerFormData.phone) {
      addToast('Please enter retailer name and phone number', 'error');
      return;
    }

    if (editCustomerModalCustomer) {
      updateRetailer(editCustomerModalCustomer.id, {
        ...retailerFormData,
        creditLimit: parseFloat(retailerFormData.creditLimit) || 100000
      });
      setEditCustomerModalCustomer(null);
    } else {
      addRetailer(retailerFormData);
      setAddCustomerModalOpen(false);
    }
  };

  // Submit Payment
  const handleSubmitPayment = (e) => {
    e.preventDefault();
    const result = recordPayment({
      customerId: recordPaymentCustomer.id,
      amount: paymentForm.amount,
      paymentMode: paymentForm.paymentMode,
      referenceNo: paymentForm.referenceNo,
      notes: paymentForm.notes
    });

    if (result.success) {
      setRecordPaymentCustomer(null);
      setPaymentForm({ amount: '', paymentMode: 'NEFT / RTGS', referenceNo: '', notes: '' });
    } else {
      addToast(result.error, 'error');
    }
  };

  // Submit Credit Sale with Limit Warning Check
  const handleSubmitCreditSale = (e) => {
    e.preventDefault();
    const targetProduct = products.find((p) => p.id === creditSaleForm.productId);
    const qty = parseInt(creditSaleForm.quantity, 10);
    const orderTotal = qty * (targetProduct ? targetProduct.sellingPrice : 1500);

    // Credit limit warning & blocking check
    if (creditSaleCustomer.outstanding + orderTotal > creditSaleCustomer.creditLimit) {
      const available = Math.max(0, creditSaleCustomer.creditLimit - creditSaleCustomer.outstanding);
      addToast(
        `CREDIT BLOCKED: Order amount (₹${orderTotal.toLocaleString()}) exceeds available credit of ₹${available.toLocaleString()}! Collect payment before issuing new credit.`,
        'error',
        6000
      );
      return;
    }

    // Place wholesale order
    const result = placeOrder({
      retailerId: creditSaleCustomer.id,
      retailerName: creditSaleCustomer.name,
      phone: creditSaleCustomer.phone,
      deliveryAddress: creditSaleForm.deliveryAddress || creditSaleCustomer.address,
      paymentType: 'Credit',
      preferredDeliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      items: [
        {
          productId: targetProduct.id,
          productName: `${targetProduct.name} (${targetProduct.bagSize}kg)`,
          quantity: qty,
          price: targetProduct.sellingPrice,
          total: orderTotal
        }
      ],
      totalBags: qty,
      subtotal: orderTotal,
      grandTotal: orderTotal
    });

    if (result.success) {
      addToast(`Credit Sale of ${qty} bags approved for ${creditSaleCustomer.name}!`, 'success');
      setCreditSaleCustomer(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Customer Credit Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Wholesale retailer accounts, digital credit ledger, limits, and collection status.
          </p>
        </div>
        <button
          onClick={() => {
            setRetailerFormData({
              name: '',
              owner: '',
              phone: '',
              email: '',
              gstin: '',
              address: '',
              creditLimit: '150000',
              dueDate: '2026-09-30',
              notes: ''
            });
            setAddCustomerModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-subtle hover:shadow-elevation"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Retailer</span>
        </button>
      </div>

      {/* Overview Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Credit Outstanding</span>
          <div className="text-2xl font-black text-amber-700 mt-1">₹{totalOutstanding.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">Against total limit ₹{totalCreditLimits.toLocaleString()}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Active Retailers</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{retailers.length} Stores</div>
          <div className="text-xs text-slate-500 mt-1">Salem, Madurai, Trichy, Coimbatore</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-subtle bg-rose-50/20">
          <span className="text-[10px] uppercase font-bold text-rose-600 block">Overdue Accounts</span>
          <div className="text-2xl font-black text-rose-700 mt-1">{overdueAccounts} Stores</div>
          <div className="text-xs text-rose-600 mt-1 font-semibold">Immediate collection notice required</div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search retailer, owner, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 font-medium"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">Status:</span>
          {['ALL', 'Paid', 'Pending', 'Overdue'].map((status) => (
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

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Retailer Name</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3 text-right">Total Purchases</th>
                <th className="py-3 px-3 text-right">Amount Paid</th>
                <th className="py-3 px-3 text-right">Outstanding</th>
                <th className="py-3 px-3 text-right">Credit Limit</th>
                <th className="py-3 px-3 text-center">Due Date</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRetailers.map((r) => {
                const isOverLimit = r.outstanding > r.creditLimit;
                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{r.name}</div>
                      <div className="text-[11px] text-slate-400">{r.address.split(',')[0]} • Owner: {r.owner}</div>
                      {isOverLimit && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded mt-0.5">
                          <AlertTriangle className="w-3 h-3" /> Exceeded Limit
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">{r.phone}</td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-700">
                      ₹{r.totalPurchases.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-700 font-medium">
                      ₹{r.amountPaid.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900">
                      <span className={r.outstanding > 0 ? 'text-amber-800' : 'text-slate-400'}>
                        ₹{r.outstanding.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-500">
                      ₹{r.creditLimit.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-600">
                      {r.dueDate || '—'}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          r.status === 'Overdue'
                            ? 'bg-rose-100 text-rose-800'
                            : r.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setProfileModalCustomer(r)}
                          className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Customer Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setRecordPaymentCustomer(r)}
                          className="p-1.5 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Record Payment"
                        >
                          <DollarSign className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCreditSaleCustomer(r)}
                          className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Add Credit Sale"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(r)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit Retailer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete customer ${r.name}?`)) {
                              deleteRetailer(r.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Retailer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Customer Profile Details & Timeline */}
      {profileModalCustomer && (
        <Modal
          isOpen={!!profileModalCustomer}
          onClose={() => setProfileModalCustomer(null)}
          title={`Retailer Profile: ${profileModalCustomer.name}`}
          subtitle="Credit terms, transaction ledger, and order history"
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            {/* Header info card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Proprietor</span>
                <strong className="text-slate-900">{profileModalCustomer.owner || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                <span className="font-mono text-slate-800">{profileModalCustomer.phone}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">GSTIN</span>
                <span className="font-mono text-slate-800">{profileModalCustomer.gstin || 'Unregistered'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Due</span>
                <span className="font-semibold text-rose-700">{profileModalCustomer.dueDate || 'N/A'}</span>
              </div>
            </div>

            {/* Credit Gauge Card */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-700">Credit Limit Utilization</span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{profileModalCustomer.outstanding.toLocaleString()} / ₹{profileModalCustomer.creditLimit.toLocaleString()}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    profileModalCustomer.outstanding > profileModalCustomer.creditLimit
                      ? 'bg-rose-600'
                      : profileModalCustomer.outstanding / profileModalCustomer.creditLimit > 0.8
                      ? 'bg-amber-500'
                      : 'bg-emerald-600'
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      (profileModalCustomer.outstanding / (profileModalCustomer.creditLimit || 1)) * 100
                    )}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Available: ₹{Math.max(0, profileModalCustomer.creditLimit - profileModalCustomer.outstanding).toLocaleString()}</span>
                <span>Limit: ₹{profileModalCustomer.creditLimit.toLocaleString()}</span>
              </div>
            </div>

            {/* Transaction Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Ledger Transaction History
              </h4>
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-48 overflow-y-auto">
                {ledgerTransactions
                  .filter((t) => t.customerId === profileModalCustomer.id)
                  .map((t) => (
                    <div key={t.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-1.5 rounded-lg ${
                            t.type === 'DEBIT' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {t.type === 'DEBIT' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{t.description}</div>
                          <div className="text-[10px] text-slate-400">{t.date} • Ref: {t.referenceNo}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold font-mono ${t.type === 'DEBIT' ? 'text-amber-800' : 'text-emerald-700'}`}>
                          {t.type === 'DEBIT' ? '+' : '-'}₹{t.amount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">Bal: ₹{t.balanceAfter.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Actions in Profile */}
            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setProfileModalCustomer(null);
                  setReminderModalCustomer(profileModalCustomer);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Send Reminder
              </button>
              <button
                onClick={() => {
                  setProfileModalCustomer(null);
                  setRecordPaymentCustomer(profileModalCustomer);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-emerald-800 text-white hover:bg-emerald-700 rounded-xl text-xs font-bold transition-colors"
              >
                <DollarSign className="w-3.5 h-3.5" />
                Record Payment
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: Record Payment */}
      {recordPaymentCustomer && (
        <Modal
          isOpen={!!recordPaymentCustomer}
          onClose={() => setRecordPaymentCustomer(null)}
          title={`Record Payment — ${recordPaymentCustomer.name}`}
          subtitle={`Current Outstanding Balance: ₹${recordPaymentCustomer.outstanding.toLocaleString()}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSubmitPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Payment Amount (₹)
              </label>
              <input
                type="number"
                required
                max={recordPaymentCustomer.outstanding || 9999999}
                placeholder="Enter amount (e.g. 25000)"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Payment Mode
              </label>
              <select
                value={paymentForm.paymentMode}
                onChange={(e) => setPaymentForm({ ...paymentForm, paymentMode: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                <option value="UPI / QR Instant">UPI / QR Instant</option>
                <option value="NEFT / RTGS">NEFT / RTGS Bank Transfer</option>
                <option value="Cheque Clearance">Cheque Clearance</option>
                <option value="Cash Counter Settlement">Cash Counter Settlement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Reference / UTR / Cheque Number
              </label>
              <input
                type="text"
                placeholder="e.g. UTR-9824011284"
                value={paymentForm.referenceNo}
                onChange={(e) => setPaymentForm({ ...paymentForm, referenceNo: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Partial clearing of Invoice #SM/089"
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRecordPaymentCustomer(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Submit Payment
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL 3: Add Credit Sale (with Credit-Limit Warning Guard) */}
      {creditSaleCustomer && (
        <Modal
          isOpen={!!creditSaleCustomer}
          onClose={() => setCreditSaleCustomer(null)}
          title={`Add Credit Sale — ${creditSaleCustomer.name}`}
          subtitle={`Credit Limit: ₹${creditSaleCustomer.creditLimit.toLocaleString()} | Outstanding: ₹${creditSaleCustomer.outstanding.toLocaleString()}`}
          maxWidth="max-w-md"
        >
          {creditSaleCustomer.outstanding >= creditSaleCustomer.creditLimit && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Credit Limit Breached!</strong>
                Customer has reached their maximum credit allowance. System prevents creating additional credit sales until payment is recorded.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitCreditSale} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Select Rice Variety
              </label>
              <select
                value={creditSaleForm.productId}
                onChange={(e) => setCreditSaleForm({ ...creditSaleForm, productId: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.bagSize}kg) — ₹{p.sellingPrice}/bag [Stock: {p.currentStock} Bags]
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Number of Bags
              </label>
              <input
                type="number"
                min="1"
                required
                value={creditSaleForm.quantity}
                onChange={(e) => setCreditSaleForm({ ...creditSaleForm, quantity: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold"
              />
            </div>

            {/* Estimated Total Calculation */}
            {(() => {
              const p = products.find((pr) => pr.id === creditSaleForm.productId);
              const total = (parseInt(creditSaleForm.quantity, 10) || 0) * (p ? p.sellingPrice : 0);
              const willExceed = creditSaleCustomer.outstanding + total > creditSaleCustomer.creditLimit;

              return (
                <div className={`p-3 rounded-xl border text-xs ${willExceed ? 'bg-rose-50 border-rose-300 text-rose-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between font-bold">
                    <span>Order Total:</span>
                    <span className="font-mono">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mt-1 text-[11px] text-slate-500">
                    <span>New Balance if Approved:</span>
                    <span className={`font-mono font-bold ${willExceed ? 'text-rose-700' : 'text-slate-800'}`}>
                      ₹{(creditSaleCustomer.outstanding + total).toLocaleString()}
                    </span>
                  </div>
                  {willExceed && (
                    <span className="text-[10px] font-bold text-rose-600 block mt-1">
                      ⚠️ Exceeds limit by ₹{(creditSaleCustomer.outstanding + total - creditSaleCustomer.creditLimit).toLocaleString()}
                    </span>
                  )}
                </div>
              );
            })()}

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCreditSaleCustomer(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creditSaleCustomer.outstanding >= creditSaleCustomer.creditLimit}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-colors ${
                  creditSaleCustomer.outstanding >= creditSaleCustomer.creditLimit
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-emerald-800 hover:bg-emerald-700'
                }`}
              >
                Approve Credit Sale
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL 4: Send Reminder */}
      {reminderModalCustomer && (
        <Modal
          isOpen={!!reminderModalCustomer}
          onClose={() => setReminderModalCustomer(null)}
          title={`Send Reminder — ${reminderModalCustomer.name}`}
          subtitle={`Outstanding Dues: ₹${reminderModalCustomer.outstanding.toLocaleString()} (Due Date: ${reminderModalCustomer.dueDate})`}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Review pre-filled WhatsApp & SMS settlement reminder message:
            </p>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono leading-relaxed text-slate-800">
              Dear {reminderModalCustomer.name}, this is a gentle reminder from Sri Murugan Rice Traders. Your wholesale rice credit balance of ₹{reminderModalCustomer.outstanding.toLocaleString()} was due on {reminderModalCustomer.dueDate}. Kindly clear the pending balance to continue uninterrupted credit orders. Bank Details: ICICI A/C: 002105001298 (IFSC: ICIC0000021).
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReminderModalCustomer(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addToast(`Reminder dispatched to ${reminderModalCustomer.phone} via WhatsApp & SMS.`, 'success');
                  setReminderModalCustomer(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch Notice
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 5: Add / Edit Retailer Form */}
      {(addCustomerModalOpen || editCustomerModalCustomer) && (
        <Modal
          isOpen={addCustomerModalOpen || !!editCustomerModalCustomer}
          onClose={() => {
            setAddCustomerModalOpen(false);
            setEditCustomerModalCustomer(null);
          }}
          title={editCustomerModalCustomer ? `Edit Retailer — ${editCustomerModalCustomer.name}` : 'Register New Retailer'}
          subtitle="Set wholesale credit limits, billing address, and payment terms"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSaveRetailer} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Store / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Balaji Mart"
                  value={retailerFormData.name}
                  onChange={(e) => setRetailerFormData({ ...retailerFormData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Proprietor / Contact Person
                </label>
                <input
                  type="text"
                  placeholder="e.g. K. Balaji"
                  value={retailerFormData.owner}
                  onChange={(e) => setRetailerFormData({ ...retailerFormData, owner: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98420 00000"
                  value={retailerFormData.phone}
                  onChange={(e) => setRetailerFormData({ ...retailerFormData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  GSTIN (Optional)
                </label>
                <input
                  type="text"
                  placeholder="33AAAAA0000A1Z5"
                  value={retailerFormData.gstin}
                  onChange={(e) => setRetailerFormData({ ...retailerFormData, gstin: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Credit Limit (₹)
                </label>
                <input
                  type="number"
                  placeholder="100000"
                  value={retailerFormData.creditLimit}
                  onChange={(e) => setRetailerFormData({ ...retailerFormData, creditLimit: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Default Payment Cycle Date
                </label>
                <input
                  type="date"
                  value={retailerFormData.dueDate}
                  onChange={(e) => setRetailerFormData({ ...retailerFormData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Shop Address & Delivery Location
              </label>
              <textarea
                rows="2"
                placeholder="Shop number, Street, Market complex, City - Pincode"
                value={retailerFormData.address}
                onChange={(e) => setRetailerFormData({ ...retailerFormData, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setAddCustomerModalOpen(false);
                  setEditCustomerModalCustomer(null);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                {editCustomerModalCustomer ? 'Save Changes' : 'Register Retailer'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
