import React from 'react';
import { Modal } from './Modal';
import { Printer, Download, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const InvoiceModal = ({ isOpen, onClose, order }) => {
  const { addToast } = useToast();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    addToast(`Tax Invoice #${order.id}.pdf generated and downloaded successfully!`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Wholesale Tax Invoice — ${order.id}`}
      subtitle="GST-compliant Wholesale Grain Merchant Tax Invoice"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        {/* Printable Area */}
        <div
          id="printable-invoice"
          className="p-6 bg-white border border-slate-200 rounded-xl font-sans text-slate-800 text-xs shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🌾</span>
                <span className="text-base font-extrabold text-emerald-900 tracking-tight">
                  SRI MURUGAN RICE TRADERS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Wholesale Rice Merchant & Commission Agent
              </p>
              <p className="text-[11px] text-slate-500">
                142, Shevapet Grain Market, Salem - 636002, Tamil Nadu
              </p>
              <p className="text-[11px] font-semibold text-slate-700 mt-1">
                GSTIN: <span className="font-mono">33AAMFS9041R1ZM</span> | FSSAI: <span className="font-mono">12421008000412</span>
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-xs uppercase tracking-wider">
                TAX INVOICE
              </span>
              <div className="mt-2 text-slate-600">
                <div>Invoice No: <strong className="font-mono text-slate-900">SM/26-27/{order.id.replace('ORD-', '')}</strong></div>
                <div>Date: <strong className="text-slate-900">{order.date || '2026-09-15'}</strong></div>
                <div>Order Ref: <strong className="font-mono text-slate-900">{order.id}</strong></div>
              </div>
            </div>
          </div>

          {/* Bill To & Dispatch Details */}
          <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-200">
            <div>
              <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block mb-1">
                Billed & Shipped To:
              </span>
              <strong className="text-sm text-slate-900 block">{order.retailerName}</strong>
              <div className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                {order.deliveryAddress || 'Commercial Yard, South Zone'}
                <br />
                Phone: {order.phone || '+91 98421 88412'}
                <br />
                Terms: <span className="font-semibold text-slate-800">{order.paymentType || 'Credit (15 Days)'}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block mb-1">
                Logistics & Transport
              </span>
              <div className="space-y-1 text-[11px] text-slate-600">
                <div>Vehicle No: <strong className="font-mono text-slate-900">{order.assignedVehicle || 'TN-28-AP-4521'}</strong></div>
                <div>Driver: <strong className="text-slate-900">{order.assignedDriver || 'Selvam M.'}</strong></div>
                <div>Delivery Pass: <strong className="font-mono text-slate-900">{order.deliveryId || 'DEL-801'}</strong></div>
                <div>Dispatch Status: <strong className="text-emerald-700">{order.status}</strong></div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-3">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-[11px] uppercase font-bold">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Description of Goods</th>
                  <th className="py-2 px-2">HSN</th>
                  <th className="py-2 px-2 text-right">Quantity</th>
                  <th className="py-2 px-2 text-right">Rate / Bag (₹)</th>
                  <th className="py-2 px-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items && order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2 px-2 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-2 px-2">
                      <strong className="text-slate-900 font-semibold">{item.productName}</strong>
                    </td>
                    <td className="py-2 px-2 font-mono text-slate-500">1006</td>
                    <td className="py-2 px-2 text-right font-medium">{item.quantity} Bags</td>
                    <td className="py-2 px-2 text-right font-mono">₹{item.price.toLocaleString()}</td>
                    <td className="py-2 px-2 text-right font-bold font-mono">₹{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-start">
            <div className="max-w-xs text-[11px] text-slate-500">
              <strong>Declaration:</strong> Certified that all grains supplied comply with FSSAI standards. Interest @18% p.a. charged on bills unpaid after credit due date.
            </div>
            <div className="w-56 space-y-1 text-right text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Bags:</span>
                <span className="font-bold text-slate-900">{order.totalBags} Bags</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{order.subtotal?.toLocaleString() || order.grandTotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (0% Exempt grain):</span>
                <span className="font-mono">₹0.00</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-emerald-900 pt-2 border-t border-slate-200">
                <span>Invoice Total:</span>
                <span className="font-mono">₹{order.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-end text-[11px] text-slate-500">
            <div>
              <div className="font-mono text-[10px] text-slate-400">E-way Bill Generated Online</div>
              <div>Authorized Signatory</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-800">For SRI MURUGAN RICE TRADERS</div>
              <div className="mt-4 border-t border-slate-300 pt-1 text-[10px]">Managing Partner / Authorized Signatory</div>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};
