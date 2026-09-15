import React, { useState } from 'react';
import { useCentralData } from '../../context/CentralDataContext';
import { useToast } from '../../context/ToastContext';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Truck,
  DollarSign,
  ArrowRight,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PlaceOrderPage = ({ onNavigate }) => {
  const { products, retailers, activeRetailerId, placeOrder } = useCentralData();
  const { addToast } = useToast();

  const customer = retailers.find((r) => r.id === activeRetailerId) || retailers[0];
  const [cart, setCart] = useState([]);
  const [paymentType, setPaymentType] = useState('Credit'); // Credit | Paid
  const [deliveryAddress, setDeliveryAddress] = useState(customer.address);
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [orderSuccessId, setOrderSuccessId] = useState(null);

  // Cart operations
  const addToCart = (product, qty = 10) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          bagSize: product.bagSize,
          price: product.sellingPrice,
          quantity: qty,
          image: product.image
        }
      ];
    });
    addToast(`Added ${qty} bags of ${product.name} to wholesale cart.`, 'success', 2000);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Calculations
  const totalBags = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWeightKg = cart.reduce((acc, item) => acc + item.quantity * item.bagSize, 0);
  const grandTotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const availableCredit = Math.max(0, customer.creditLimit - customer.outstanding);
  const isCreditBreached = paymentType === 'Credit' && customer.outstanding + grandTotal > customer.creditLimit;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      addToast('Your order cart is empty. Add at least one rice product.', 'error');
      return;
    }

    if (isCreditBreached) {
      addToast(
        `CREDIT LIMIT BLOCKED: Order total of ₹${grandTotal.toLocaleString()} exceeds your available credit of ₹${availableCredit.toLocaleString()}. Please choose Prepaid or settle past dues.`,
        'error',
        6000
      );
      return;
    }

    const result = placeOrder({
      retailerId: customer.id,
      retailerName: customer.name,
      phone: customer.phone,
      deliveryAddress,
      preferredDeliveryDate: preferredDate,
      paymentType,
      items: cart.map((c) => ({
        productId: c.productId,
        productName: `${c.productName} (${c.bagSize}kg)`,
        quantity: c.quantity,
        price: c.price,
        total: c.quantity * c.price
      })),
      totalBags,
      totalWeightKg,
      subtotal: grandTotal,
      grandTotal
    });

    if (result.success) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setOrderSuccessId(result.orderId);
      setCart([]);
    } else {
      addToast(result.error, 'error');
    }
  };

  if (orderSuccessId) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-elevation text-center space-y-5 my-8">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-subtle">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Wholesale Order Confirmed!</h2>
          <p className="text-xs font-mono font-bold text-emerald-800 mt-1">Order Ref: {orderSuccessId}</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Your wholesale grain order has been submitted to Sri Murugan Rice Traders. Warehouse dispatch staff will allocate stock and assign fleet delivery.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-3 border-t border-slate-100">
          <button
            onClick={() => onNavigate('/retailer/delivery')}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
          >
            Track Live Delivery
          </button>
          <button
            onClick={() => {
              setOrderSuccessId(null);
            }}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Place Wholesale Grain Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Order premium Ponni, Sona Masuri, Basmati and Idli rice directly from the mill godown.
          </p>
        </div>

        {/* Available Credit Pill */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-subtle text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Available Credit</span>
            <span className="font-mono font-bold text-slate-900">₹{availableCredit.toLocaleString()}</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Credit Limit</span>
            <span className="font-mono text-slate-600">₹{customer.creditLimit.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rice Product Catalog Grid (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => {
              const inCartItem = cart.find((c) => c.productId === p.id);
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-card hover:shadow-elevation transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          {p.variety} • {p.bagSize}kg Bag
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                        <p className="text-[11px] text-slate-500">{p.brand}</p>
                      </div>
                      <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        ₹{p.sellingPrice}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 my-2">
                      Grade: <span className="font-semibold text-slate-700">{p.grade}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    {inCartItem ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(p.id, -5)}
                          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono px-1">
                          {inCartItem.quantity} bags
                        </span>
                        <button
                          onClick={() => updateQuantity(p.id, 5)}
                          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(p, 10)}
                        className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add 10 Bags</span>
                      </button>
                    )}

                    <span className="text-[10px] text-slate-400">
                      Godown Stock: {p.currentStock}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary & Checkout Drawer (Right 1 col) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between h-fit space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-emerald-800" />
                <h3 className="text-sm font-bold text-slate-900">Wholesale Cart</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">
                {totalBags} Bags ({totalWeightKg} kg)
              </span>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-slate-100 max-h-52 overflow-y-auto my-3 pr-1">
              {cart.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  Select rice varieties to begin ordering.
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.productId} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 truncate max-w-[160px]">{item.productName}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.quantity} bags × ₹{item.price}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">
                        ₹{(item.quantity * item.price).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({totalBags} bags):</span>
                <span className="font-mono">₹{grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (0% Exempt Rice):</span>
                <span className="font-mono">₹0.00</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Order Total:</span>
                <span className="font-mono text-emerald-900">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Credit Limit Alert Banner */}
            {isCreditBreached && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Credit Limit Breached!</strong>
                  Your order (₹{grandTotal.toLocaleString()}) exceeds your available credit (₹{availableCredit.toLocaleString()}).
                  Please pay outstanding dues or select Prepaid payment.
                </div>
              </div>
            )}

            {/* Payment & Delivery Config */}
            <form onSubmit={handlePlaceOrder} className="space-y-3 mt-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1 text-[10px]">
                  Payment Method
                </label>
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="Credit">15-Day Wholesale Credit Account</option>
                  <option value="Paid">Prepaid / UPI / Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1 text-[10px]">
                  Preferred Delivery Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1 text-[10px]">
                  Delivery Address
                </label>
                <textarea
                  rows="2"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                disabled={isCreditBreached || cart.length === 0}
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-elevation transition-all flex items-center justify-center gap-1.5 ${
                  isCreditBreached || cart.length === 0
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                }`}
              >
                <span>Confirm & Place Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
