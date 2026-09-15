import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  initialProducts,
  initialRetailers,
  initialOrders,
  initialVehicles,
  initialDamageRecords,
  initialPurchases,
  initialSales,
  initialExpenses,
  initialLedgerTransactions,
  initialStaff,
  initialNotifications
} from '../data/initialData';

const CentralDataContext = createContext(null);

export const CentralDataProvider = ({ children }) => {
  // Load from localStorage or initial mock data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('rice_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [retailers, setRetailers] = useState(() => {
    const saved = localStorage.getItem('rice_retailers');
    return saved ? JSON.parse(saved) : initialRetailers;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('rice_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('rice_vehicles');
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [damageRecords, setDamageRecords] = useState(() => {
    const saved = localStorage.getItem('rice_damage');
    return saved ? JSON.parse(saved) : initialDamageRecords;
  });

  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('rice_purchases');
    return saved ? JSON.parse(saved) : initialPurchases;
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('rice_sales');
    return saved ? JSON.parse(saved) : initialSales;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('rice_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [ledgerTransactions, setLedgerTransactions] = useState(() => {
    const saved = localStorage.getItem('rice_ledger');
    return saved ? JSON.parse(saved) : initialLedgerTransactions;
  });

  const [staff, setStaff] = useState(() => {
    const saved = localStorage.getItem('rice_staff');
    return saved ? JSON.parse(saved) : initialStaff;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('rice_notifs');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Active simulated user
  // 'admin' | 'retailer' | 'delivery'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('rice_active_role') || 'admin';
  });

  // Current logged in retailer profile if role is 'retailer'
  const [activeRetailerId, setActiveRetailerId] = useState('ret-1'); // Default to Ravi Traders

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('rice_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rice_retailers', JSON.stringify(retailers));
  }, [retailers]);

  useEffect(() => {
    localStorage.setItem('rice_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rice_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('rice_damage', JSON.stringify(damageRecords));
  }, [damageRecords]);

  useEffect(() => {
    localStorage.setItem('rice_purchases', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('rice_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('rice_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('rice_ledger', JSON.stringify(ledgerTransactions));
  }, [ledgerTransactions]);

  useEffect(() => {
    localStorage.setItem('rice_active_role', currentRole);
  }, [currentRole]);

  // System Notification Creator
  const pushNotification = (type, title, message, link = '/admin') => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      type,
      title,
      message,
      time: 'Just now',
      read: false,
      link
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // 1. PLACE ORDER (Called by Retailer or Admin)
  const placeOrder = (orderData) => {
    const newOrderId = `ORD-${1020 + orders.length + 1}`;
    const newDeliveryId = `DEL-${800 + orders.length + 1}`;
    
    // Find customer
    const customer = retailers.find((r) => r.id === orderData.retailerId);
    
    // Check credit limit if paying via credit
    if (orderData.paymentType === 'Credit' && customer) {
      if (customer.outstanding + orderData.grandTotal > customer.creditLimit) {
        return {
          success: false,
          error: `Credit limit breached! Order total (₹${orderData.grandTotal.toLocaleString()}) exceeds available credit (₹${Math.max(0, customer.creditLimit - customer.outstanding).toLocaleString()}).`
        };
      }
    }

    const newOrder = {
      id: newOrderId,
      deliveryId: newDeliveryId,
      date: new Date().toISOString().split('T')[0],
      status: 'New', // Initially 'New'
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);

    // If placed on credit, update customer outstanding immediately or upon confirmation
    if (customer && orderData.paymentType === 'Credit') {
      setRetailers((prev) =>
        prev.map((r) =>
          r.id === customer.id
            ? {
                ...r,
                totalPurchases: r.totalPurchases + orderData.grandTotal,
                outstanding: r.outstanding + orderData.grandTotal,
                ordersCount: (r.ordersCount || 0) + 1,
                status: (r.outstanding + orderData.grandTotal) > r.creditLimit ? 'Overdue' : 'Pending'
              }
            : r
        )
      );

      // Ledger Entry
      const newLedger = {
        id: `LED-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0],
        customerId: customer.id,
        customerName: customer.name,
        type: 'DEBIT',
        amount: orderData.grandTotal,
        description: `Order #${newOrderId} placed on credit`,
        referenceNo: newOrderId,
        balanceAfter: customer.outstanding + orderData.grandTotal
      };
      setLedgerTransactions((prev) => [newLedger, ...prev]);
    }

    // Auto-record in Sales
    const newSale = {
      id: `SAL-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: orderData.retailerName || customer?.name || 'Retailer Order',
      customerId: orderData.retailerId,
      itemsSummary: orderData.items.map(i => `${i.productName.split(' ')[0]} (${i.quantity})`).join(', '),
      totalBags: orderData.totalBags,
      amount: orderData.grandTotal,
      paymentStatus: orderData.paymentType,
      paymentMode: orderData.paymentType === 'Credit' ? 'Credit Ledger' : 'Direct Payment',
      invoiceNo: `SM/26-27/${100 + orders.length}`
    };
    setSales((prev) => [newSale, ...prev]);

    // Push notification to Admin & Delivery
    pushNotification(
      'info',
      'New Wholesale Order Placed',
      `Order ${newOrderId} placed by ${orderData.retailerName} for ${orderData.totalBags} bags (₹${orderData.grandTotal.toLocaleString()}).`,
      '/admin/orders'
    );

    return { success: true, orderId: newOrderId };
  };

  // 2. UPDATE ORDER STATUS (Admin or Delivery Staff)
  const updateOrderStatus = (orderId, newStatus, vehicleNumber = null, driverName = null) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    // When status advances to 'Confirmed' or 'Preparing' for the first time, DECREASE STOCK
    if (['Confirmed', 'Preparing', 'Out for Delivery'].includes(newStatus) && targetOrder.status === 'New') {
      // Reduce product stock
      targetOrder.items.forEach((item) => {
        setProducts((prev) =>
          prev.map((p) => {
            if (p.id === item.productId) {
              const remaining = Math.max(0, p.currentStock - item.quantity);
              return {
                ...p,
                currentStock: remaining,
                status: remaining === 0 ? 'Out of Stock' : remaining <= p.minStockLevel ? 'Low Stock' : 'In Stock'
              };
            }
            return p;
          })
        );
      });

      pushNotification(
        'info',
        `Stock Allocated for Order ${orderId}`,
        `Deducted ${targetOrder.totalBags} bags from inventory for dispatch.`,
        '/admin/inventory'
      );
    }

    // Update order object
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: newStatus,
            assignedVehicle: vehicleNumber || o.assignedVehicle,
            assignedDriver: driverName || o.assignedDriver,
            estimatedTime: newStatus === 'Delivered' ? 'Delivered successfully' : o.estimatedTime
          };
        }
        return o;
      })
    );

    // Update vehicle load status if assigned
    if (vehicleNumber) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.vehicleNumber === vehicleNumber
            ? {
                ...v,
                status: newStatus === 'Delivered' ? 'Available' : 'On Delivery',
                currentLoadBags: newStatus === 'Delivered' ? 0 : targetOrder.totalBags
              }
            : v
        )
      );
    }

    pushNotification(
      'info',
      `Order ${orderId} Status: ${newStatus}`,
      `Order for ${targetOrder.retailerName} marked as ${newStatus}.`,
      '/admin/orders'
    );
  };

  // 3. RECORD PAYMENT (Reduces Retailer Outstanding)
  const recordPayment = ({ customerId, amount, paymentMode, referenceNo, notes }) => {
    const numAmount = parseFloat(amount);
    const customer = retailers.find((r) => r.id === customerId);
    if (!customer || isNaN(numAmount) || numAmount <= 0) {
      return { success: false, error: 'Invalid payment details' };
    }

    const newOutstanding = Math.max(0, customer.outstanding - numAmount);
    const newPaid = customer.amountPaid + numAmount;
    const newStatus = newOutstanding === 0 ? 'Paid' : newOutstanding <= customer.creditLimit ? 'Pending' : 'Overdue';

    setRetailers((prev) =>
      prev.map((r) =>
        r.id === customerId
          ? {
              ...r,
              outstanding: newOutstanding,
              amountPaid: newPaid,
              status: newStatus
            }
          : r
      )
    );

    const newLedger = {
      id: `LED-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      customerId: customer.id,
      customerName: customer.name,
      type: 'CREDIT',
      amount: numAmount,
      description: `Payment received via ${paymentMode} - ${notes || 'Settlement'}`,
      referenceNo: referenceNo || `PAY-${Date.now().toString().slice(-4)}`,
      balanceAfter: newOutstanding
    };
    setLedgerTransactions((prev) => [newLedger, ...prev]);

    pushNotification(
      'success',
      'Payment Received',
      `Received ₹${numAmount.toLocaleString()} from ${customer.name}. New outstanding: ₹${newOutstanding.toLocaleString()}.`,
      '/admin/credit'
    );

    return { success: true };
  };

  // 4. RECORD DAMAGE (Reduces inventory stock & tracks vehicle/cause)
  const recordDamage = (damageData) => {
    const targetProduct = products.find((p) => p.id === damageData.productId);
    const bagCount = parseInt(damageData.bagsDamaged, 10);
    const costPerBag = targetProduct ? targetProduct.purchasePrice : 1300;
    const financialLoss = bagCount * costPerBag;

    const newDamage = {
      id: `DAM-${Date.now().toString().slice(-4)}`,
      date: damageData.date || new Date().toISOString().split('T')[0],
      productId: damageData.productId,
      productName: targetProduct ? `${targetProduct.name} (${targetProduct.bagSize}kg)` : 'Rice Variety',
      bagsDamaged: bagCount,
      quantityLostKg: bagCount * (targetProduct ? targetProduct.bagSize : 25),
      costPerBag,
      estimatedFinancialLoss: financialLoss,
      stage: damageData.stage,
      vehicleNumber: damageData.vehicleNumber,
      staffMember: damageData.staffMember,
      cause: damageData.cause,
      description: damageData.description,
      photoUrl: damageData.photoUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      resolved: true
    };

    // Add damage record
    setDamageRecords((prev) => [newDamage, ...prev]);

    // Automatically reduce product inventory
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === damageData.productId) {
          const remaining = Math.max(0, p.currentStock - bagCount);
          return {
            ...p,
            currentStock: remaining,
            status: remaining === 0 ? 'Out of Stock' : remaining <= p.minStockLevel ? 'Low Stock' : 'In Stock'
          };
        }
        return p;
      })
    );

    // If vehicle was involved, increment incident count
    if (damageData.vehicleNumber) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.vehicleNumber === damageData.vehicleNumber
            ? { ...v, damageIncidents: (v.damageIncidents || 0) + 1 }
            : v
        )
      );
    }

    pushNotification(
      'danger',
      'Damage Incident Logged',
      `${bagCount} bags written off (${damageData.stage} loss of ₹${financialLoss.toLocaleString()}). Inventory auto-deducted.`,
      '/admin/damage'
    );

    return { success: true };
  };

  // 5. ADD INVENTORY PURCHASE (Increases Stock)
  const addPurchase = (purchaseData) => {
    const bagCount = parseInt(purchaseData.quantityBags, 10);
    const newPur = {
      id: `PUR-${500 + purchases.length + 1}`,
      date: purchaseData.date || new Date().toISOString().split('T')[0],
      totalAmount: bagCount * parseFloat(purchaseData.ratePerBag),
      paymentStatus: 'Paid',
      ...purchaseData,
      quantityBags: bagCount,
      ratePerBag: parseFloat(purchaseData.ratePerBag)
    };

    setPurchases((prev) => [newPur, ...prev]);

    // Increment inventory stock
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === purchaseData.productId) {
          const newQty = p.currentStock + bagCount;
          return {
            ...p,
            currentStock: newQty,
            purchasePrice: parseFloat(purchaseData.ratePerBag) || p.purchasePrice,
            status: newQty > p.minStockLevel ? 'In Stock' : 'Low Stock'
          };
        }
        return p;
      })
    );

    pushNotification(
      'success',
      'Stock Received from Mill',
      `Added ${bagCount} bags to inventory from ${purchaseData.supplier}.`,
      '/admin/inventory'
    );
  };

  // 6. RECORD EXPENSE
  const addExpense = (expenseData) => {
    const newExp = {
      id: `EXP-${300 + expenses.length + 1}`,
      date: expenseData.date || new Date().toISOString().split('T')[0],
      amount: parseFloat(expenseData.amount),
      ...expenseData
    };
    setExpenses((prev) => [newExp, ...prev]);
    pushNotification('info', 'Expense Recorded', `Logged ₹${expenseData.amount} for ${expenseData.category}.`);
  };

  // 7. RETAILER MANAGEMENT (Add / Edit / Delete)
  const addRetailer = (retailerData) => {
    const newId = `ret-${retailers.length + 1}`;
    const newCustomer = {
      id: newId,
      totalPurchases: 0,
      amountPaid: 0,
      outstanding: 0,
      status: 'Paid',
      ordersCount: 0,
      rating: '5.0',
      ...retailerData,
      creditLimit: parseFloat(retailerData.creditLimit) || 100000
    };
    setRetailers((prev) => [...prev, newCustomer]);
    pushNotification('success', 'Retailer Added', `Registered ${newCustomer.name} with credit limit ₹${newCustomer.creditLimit.toLocaleString()}.`);
    return newId;
  };

  const updateRetailer = (id, updatedFields) => {
    setRetailers((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedFields } : r))
    );
    pushNotification('success', 'Retailer Updated', 'Customer account details modified successfully.');
  };

  const deleteRetailer = (id) => {
    setRetailers((prev) => prev.filter((r) => r.id !== id));
    pushNotification('warning', 'Retailer Removed', 'Customer record deleted from ledger.');
  };

  // 8. RESET DATA HELPER
  const resetToDefaults = () => {
    localStorage.clear();
    setProducts(initialProducts);
    setRetailers(initialRetailers);
    setOrders(initialOrders);
    setVehicles(initialVehicles);
    setDamageRecords(initialDamageRecords);
    setPurchases(initialPurchases);
    setSales(initialSales);
    setExpenses(initialExpenses);
    setLedgerTransactions(initialLedgerTransactions);
    setStaff(initialStaff);
    setNotifications(initialNotifications);
    setCurrentRole('admin');
    setActiveRetailerId('ret-1');
  };

  // Dynamic Calculated Metrics for Dashboards
  const stats = useMemo(() => {
    const totalSalesAmount = sales.reduce((acc, s) => acc + (s.amount || 0), 0);
    const totalOutstandingCredit = retailers.reduce((acc, r) => acc + (r.outstanding || 0), 0);
    const totalCurrentStockBags = products.reduce((acc, p) => acc + (p.currentStock || 0), 0);
    const pendingDeliveriesCount = orders.filter((o) => ['New', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(o.status)).length;
    const monthlyExpensesAmount = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
    const totalDamageLossAmount = damageRecords.reduce((acc, d) => acc + (d.estimatedFinancialLoss || 0), 0);
    const totalDamagedBagsCount = damageRecords.reduce((acc, d) => acc + (d.bagsDamaged || 0), 0);
    const totalPurchasesAmount = purchases.reduce((acc, p) => acc + (p.totalAmount || 0), 0);
    const grossProfit = totalSalesAmount - (totalSalesAmount * 0.82); // ~18% average wholesale gross margin
    const netProfit = grossProfit - monthlyExpensesAmount - totalDamageLossAmount;

    return {
      totalSalesAmount,
      totalOutstandingCredit,
      totalCurrentStockBags,
      pendingDeliveriesCount,
      monthlyExpensesAmount,
      totalDamageLossAmount,
      totalDamagedBagsCount,
      totalPurchasesAmount,
      grossProfit,
      netProfit
    };
  }, [sales, retailers, products, orders, expenses, damageRecords, purchases]);

  return (
    <CentralDataContext.Provider
      value={{
        // State
        products,
        retailers,
        orders,
        vehicles,
        damageRecords,
        purchases,
        sales,
        expenses,
        ledgerTransactions,
        staff,
        notifications,
        currentRole,
        activeRetailerId,
        stats,

        // Actions
        setCurrentRole,
        setActiveRetailerId,
        placeOrder,
        updateOrderStatus,
        recordPayment,
        recordDamage,
        addPurchase,
        addExpense,
        addRetailer,
        updateRetailer,
        deleteRetailer,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        pushNotification,
        resetToDefaults
      }}
    >
      {children}
    </CentralDataContext.Provider>
  );
};

export const useCentralData = () => {
  const context = useContext(CentralDataContext);
  if (!context) {
    throw new Error('useCentralData must be used within a CentralDataProvider');
  }
  return context;
};
