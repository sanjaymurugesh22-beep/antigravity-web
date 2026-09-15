export const initialProducts = [
  {
    id: 'prod-1',
    name: 'BPT 5204 Deluxe Ponni Rice',
    variety: 'Ponni Rice',
    brand: 'Golden Harvest / Thanjavur Gold',
    bagSize: 25, // kg
    unit: 'Bags',
    currentStock: 480,
    minStockLevel: 150,
    purchasePrice: 1350,
    sellingPrice: 1580,
    hsn: '1006',
    status: 'In Stock',
    grade: 'Premium Aged 12 Months',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-2',
    name: 'BPT 5204 Deluxe Ponni Rice (50kg)',
    variety: 'Ponni Rice',
    brand: 'Golden Harvest / Thanjavur Gold',
    bagSize: 50,
    unit: 'Bags',
    currentStock: 320,
    minStockLevel: 100,
    purchasePrice: 2600,
    sellingPrice: 3050,
    hsn: '1006',
    status: 'In Stock',
    grade: 'Premium Aged 12 Months',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-3',
    name: 'IR 20 Special Idli Rice',
    variety: 'Idli Rice',
    brand: 'Chettinad Pride',
    bagSize: 25,
    unit: 'Bags',
    currentStock: 85,
    minStockLevel: 120, // Low Stock alert
    purchasePrice: 920,
    sellingPrice: 1100,
    hsn: '1006',
    status: 'Low Stock',
    grade: 'Short Grain Extra Fluffy',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-4',
    name: 'Kurnool Sona Masuri Steam Rice',
    variety: 'Sona Masuri',
    brand: 'Royal Telugu Classic',
    bagSize: 25,
    unit: 'Bags',
    currentStock: 540,
    minStockLevel: 180,
    purchasePrice: 1280,
    sellingPrice: 1490,
    hsn: '1006',
    status: 'In Stock',
    grade: 'Medium Grain A-Grade',
    image: 'https://images.unsplash.com/photo-1568644396922-5c3bfae12521?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-5',
    name: 'Royal 1121 Extra Long Basmati Rice',
    variety: 'Basmati Rice',
    brand: 'Kohinoor Sovereign',
    bagSize: 25,
    unit: 'Bags',
    currentStock: 210,
    minStockLevel: 80,
    purchasePrice: 2200,
    sellingPrice: 2650,
    hsn: '1006',
    status: 'In Stock',
    grade: 'XXL Grain 8.35mm',
    image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-6',
    name: 'CR 1009 Classic Raw Rice (Pacharisi)',
    variety: 'Raw Rice',
    brand: 'Cauvery River Gold',
    bagSize: 25,
    unit: 'Bags',
    currentStock: 45,
    minStockLevel: 100, // Low Stock alert
    purchasePrice: 980,
    sellingPrice: 1180,
    hsn: '1006',
    status: 'Low Stock',
    grade: 'Silky Polish Festival Grade',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-7',
    name: 'Swarna Premium Boiled Rice (Puzhungal)',
    variety: 'Boiled Rice',
    brand: 'Nellore Swarna Express',
    bagSize: 50,
    unit: 'Bags',
    currentStock: 390,
    minStockLevel: 120,
    purchasePrice: 1850,
    sellingPrice: 2150,
    hsn: '1006',
    status: 'In Stock',
    grade: 'Double Polished Clean Parboiled',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80'
  }
];

export const initialRetailers = [
  {
    id: 'ret-1',
    name: 'Ravi Traders',
    owner: 'Ravi Chandran',
    phone: '+91 98421 88412',
    email: 'contact@ravitraders.in',
    gstin: '33AABCR1245P1Z8',
    address: '42, Bazaar Street, Shevapet, Salem - 636002',
    totalPurchases: 485600,
    amountPaid: 357200,
    outstanding: 128400,
    creditLimit: 150000,
    dueDate: '2026-09-20',
    status: 'Pending', // Pending, Paid, Overdue
    rating: '4.8',
    ordersCount: 24,
    notes: 'Regular buyer of Ponni and Sona Masuri. Typically clears payments in 15-day cycles.'
  },
  {
    id: 'ret-2',
    name: 'Sri Lakshmi Stores',
    owner: 'Lakshmanan Pillai',
    phone: '+91 94432 55190',
    email: 'srilakshmi.madurai@gmail.com',
    gstin: '33AAACL8890K1ZP',
    address: '18, West Masi Street, Madurai - 625001',
    totalPurchases: 620000,
    amountPaid: 525000,
    outstanding: 95000,
    creditLimit: 100000,
    dueDate: '2026-09-12', // Overdue
    status: 'Overdue',
    rating: '4.2',
    ordersCount: 31,
    notes: 'Payment delayed by 3 days. Send friendly WhatsApp reminder.'
  },
  {
    id: 'ret-3',
    name: 'Kumar Agencies',
    owner: 'G. Senthil Kumar',
    phone: '+91 97890 33411',
    email: 'kumaragencies.try@yahoo.com',
    gstin: '33BBPKS4512N1Z4',
    address: '88, Gandhi Market Wholesale Complex, Trichy - 620008',
    totalPurchases: 340000,
    amountPaid: 340000,
    outstanding: 0,
    creditLimit: 120000,
    dueDate: '2026-09-30',
    status: 'Paid',
    rating: '5.0',
    ordersCount: 18,
    notes: 'A+ credit rating. Always pays on same day or within 5 days.'
  },
  {
    id: 'ret-4',
    name: 'Anand Supermarket',
    owner: 'Anand K.V.',
    phone: '+91 98401 22987',
    email: 'purchase@anandmarket.com',
    gstin: '33AACCA9014Q1Z1',
    address: '112, Usman Road, T. Nagar, Chennai - 600017',
    totalPurchases: 890000,
    amountPaid: 710000,
    outstanding: 180000,
    creditLimit: 160000, // EXCEEDED credit limit!
    dueDate: '2026-09-18',
    status: 'Overdue',
    rating: '3.9',
    ordersCount: 42,
    notes: 'CREDIT LIMIT BREACHED. Block credit sales until at least ₹50,000 is settled.'
  },
  {
    id: 'ret-5',
    name: 'Murugan Stores',
    owner: 'P. Murugesan',
    phone: '+91 94440 77610',
    email: 'murugan.stores.cbe@gmail.com',
    gstin: '33AADFM6732D1Z9',
    address: '76, Raja Street, Town Hall, Coimbatore - 641001',
    totalPurchases: 275000,
    amountPaid: 215000,
    outstanding: 60000,
    creditLimit: 100000,
    dueDate: '2026-09-25',
    status: 'Pending',
    rating: '4.6',
    ordersCount: 14,
    notes: 'Fast moving store for Idli Rice and Boiled Rice 50kg bags.'
  },
  {
    id: 'ret-6',
    name: 'Balaji Groceries & Mart',
    owner: 'S. Balasubramanian',
    phone: '+91 98940 11200',
    email: 'balaji.erode@rediffmail.com',
    gstin: '33AAFMB5514G1Z3',
    address: '34, Nethaji Road, Erode - 638001',
    totalPurchases: 190000,
    amountPaid: 190000,
    outstanding: 0,
    creditLimit: 80000,
    dueDate: '2026-10-05',
    status: 'Paid',
    rating: '4.7',
    ordersCount: 9,
    notes: 'New wholesale customer, prompt payments.'
  }
];

export const initialOrders = [
  {
    id: 'ORD-1024',
    retailerId: 'ret-1',
    retailerName: 'Ravi Traders',
    phone: '+91 98421 88412',
    date: '2026-09-15',
    preferredDeliveryDate: '2026-09-16',
    items: [
      { productId: 'prod-1', productName: 'BPT 5204 Deluxe Ponni Rice (25kg)', quantity: 20, price: 1580, total: 31600 },
      { productId: 'prod-4', productName: 'Kurnool Sona Masuri Steam Rice (25kg)', quantity: 15, price: 1490, total: 22350 }
    ],
    totalBags: 35,
    totalWeightKg: 875,
    subtotal: 53950,
    taxGst: 0, // 0% on unbranded/registered mill rice under threshold or exempt
    grandTotal: 53950,
    paymentType: 'Credit',
    status: 'Out for Delivery', // New, Confirmed, Preparing, Out for Delivery, Delivered, Cancelled
    deliveryAddress: '42, Bazaar Street, Shevapet, Salem - 636002',
    assignedVehicle: 'TN-28-AP-4521',
    assignedDriver: 'Selvam M.',
    driverPhone: '+91 98420 11990',
    estimatedTime: 'Today, 4:30 PM',
    deliveryId: 'DEL-801'
  },
  {
    id: 'ORD-1023',
    retailerId: 'ret-2',
    retailerName: 'Sri Lakshmi Stores',
    phone: '+91 94432 55190',
    date: '2026-09-15',
    preferredDeliveryDate: '2026-09-16',
    items: [
      { productId: 'prod-3', productName: 'IR 20 Special Idli Rice (25kg)', quantity: 30, price: 1100, total: 33000 },
      { productId: 'prod-7', productName: 'Swarna Premium Boiled Rice (50kg)', quantity: 10, price: 2150, total: 21500 }
    ],
    totalBags: 40,
    totalWeightKg: 1250,
    subtotal: 54500,
    grandTotal: 54500,
    paymentType: 'Credit',
    status: 'Preparing',
    deliveryAddress: '18, West Masi Street, Madurai - 625001',
    assignedVehicle: 'TN-45-BC-8890',
    assignedDriver: 'Kumar P.',
    driverPhone: '+91 94431 88721',
    estimatedTime: 'Tomorrow, 11:00 AM',
    deliveryId: 'DEL-802'
  },
  {
    id: 'ORD-1022',
    retailerId: 'ret-5',
    retailerName: 'Murugan Stores',
    phone: '+91 94440 77610',
    date: '2026-09-14',
    preferredDeliveryDate: '2026-09-15',
    items: [
      { productId: 'prod-5', productName: 'Royal 1121 Extra Long Basmati (25kg)', quantity: 12, price: 2650, total: 31800 },
      { productId: 'prod-2', productName: 'BPT 5204 Deluxe Ponni (50kg)', quantity: 8, price: 3050, total: 24400 }
    ],
    totalBags: 20,
    totalWeightKg: 700,
    subtotal: 56200,
    grandTotal: 56200,
    paymentType: 'Paid',
    status: 'Delivered',
    deliveryAddress: '76, Raja Street, Town Hall, Coimbatore - 641001',
    assignedVehicle: 'TN-30-X-1122',
    assignedDriver: 'Mani R.',
    driverPhone: '+91 97881 44520',
    estimatedTime: 'Delivered at 2:15 PM',
    deliveryId: 'DEL-800'
  },
  {
    id: 'ORD-1021',
    retailerId: 'ret-3',
    retailerName: 'Kumar Agencies',
    phone: '+91 97890 33411',
    date: '2026-09-14',
    preferredDeliveryDate: '2026-09-15',
    items: [
      { productId: 'prod-1', productName: 'BPT 5204 Deluxe Ponni (25kg)', quantity: 25, price: 1580, total: 39500 },
      { productId: 'prod-6', productName: 'CR 1009 Classic Raw Rice (25kg)', quantity: 10, price: 1180, total: 11800 }
    ],
    totalBags: 35,
    totalWeightKg: 875,
    subtotal: 51300,
    grandTotal: 51300,
    paymentType: 'Paid',
    status: 'Delivered',
    deliveryAddress: '88, Gandhi Market Complex, Trichy - 620008',
    assignedVehicle: 'TN-28-AP-4521',
    assignedDriver: 'Selvam M.',
    driverPhone: '+91 98420 11990',
    estimatedTime: 'Delivered Yesterday',
    deliveryId: 'DEL-798'
  },
  {
    id: 'ORD-1025',
    retailerId: 'ret-6',
    retailerName: 'Balaji Groceries & Mart',
    phone: '+91 98940 11200',
    date: '2026-09-15',
    preferredDeliveryDate: '2026-09-17',
    items: [
      { productId: 'prod-4', productName: 'Kurnool Sona Masuri (25kg)', quantity: 20, price: 1490, total: 29800 }
    ],
    totalBags: 20,
    totalWeightKg: 500,
    subtotal: 29800,
    grandTotal: 29800,
    paymentType: 'Paid',
    status: 'New',
    deliveryAddress: '34, Nethaji Road, Erode - 638001',
    assignedVehicle: null,
    assignedDriver: null,
    estimatedTime: 'Pending Dispatch Confirmation',
    deliveryId: null
  }
];

export const initialVehicles = [
  {
    id: 'veh-1',
    vehicleNumber: 'TN-28-AP-4521',
    model: 'Eicher Pro 2049 (14ft High Deck)',
    driverName: 'Selvam M.',
    driverPhone: '+91 98420 11990',
    capacityBags: 140,
    currentLoadBags: 35,
    fuelEfficiency: '6.8 km/l',
    currentFuel: '72%',
    status: 'On Delivery', // Available, On Delivery, Maintenance
    location: 'Omalur Highway, En Route to Salem',
    totalTrips: 142,
    damageIncidents: 4, // Recurring transit issue
    lastService: '2026-08-20'
  },
  {
    id: 'veh-2',
    vehicleNumber: 'TN-45-BC-8890',
    model: 'Tata 407 Gold SFC',
    driverName: 'Kumar P.',
    driverPhone: '+91 94431 88721',
    capacityBags: 90,
    currentLoadBags: 40,
    fuelEfficiency: '8.2 km/l',
    currentFuel: '88%',
    status: 'Loading',
    location: 'Main Godown Dock #2',
    totalTrips: 188,
    damageIncidents: 1,
    lastService: '2026-09-02'
  },
  {
    id: 'veh-3',
    vehicleNumber: 'TN-30-X-1122',
    model: 'Ashok Leyland BADA DOST i4',
    driverName: 'Mani R.',
    driverPhone: '+91 97881 44520',
    capacityBags: 55,
    currentLoadBags: 0,
    fuelEfficiency: '11.5 km/l',
    currentFuel: '95%',
    status: 'Available',
    location: 'Wholesale Yard Bay A',
    totalTrips: 94,
    damageIncidents: 0,
    lastService: '2026-09-10'
  }
];

export const initialDamageRecords = [
  {
    id: 'DAM-201',
    date: '2026-09-14',
    productId: 'prod-1',
    productName: 'BPT 5204 Deluxe Ponni (25kg)',
    bagsDamaged: 3,
    quantityLostKg: 75,
    costPerBag: 1350,
    estimatedFinancialLoss: 4050,
    stage: 'Transport', // Loading, Transport, Unloading, Storage
    vehicleNumber: 'TN-28-AP-4521',
    staffMember: 'Selvam M. (Driver)',
    cause: 'Hook tear during emergency braking & metal latch protrusion',
    description: 'Bags punctured against side body bolt when swerving on bypass. Rice spillage inside truck bed.',
    photoUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    resolved: true
  },
  {
    id: 'DAM-202',
    date: '2026-09-11',
    productId: 'prod-4',
    productName: 'Kurnool Sona Masuri (25kg)',
    bagsDamaged: 2,
    quantityLostKg: 50,
    costPerBag: 1280,
    estimatedFinancialLoss: 2560,
    stage: 'Unloading',
    vehicleNumber: 'TN-45-BC-8890',
    staffMember: 'Karthik (Hamali Crew)',
    cause: 'Rough handling with sharp handling hook',
    description: 'Hamali worker used sharp iron hook directly on bag center, tearing stitch seam.',
    photoUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    resolved: true
  },
  {
    id: 'DAM-203',
    date: '2026-09-08',
    productId: 'prod-7',
    productName: 'Swarna Premium Boiled Rice (50kg)',
    bagsDamaged: 4,
    quantityLostKg: 200,
    costPerBag: 1850,
    estimatedFinancialLoss: 7400,
    stage: 'Transport',
    vehicleNumber: 'TN-28-AP-4521',
    staffMember: 'Selvam M. (Driver)',
    cause: 'Tarpaulin rain seepage',
    description: 'Heavy sudden thunderstorm on Namakkal stretch. Tarpaulin corner tore loose, causing water moisture damage.',
    photoUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
    resolved: true
  },
  {
    id: 'DAM-204',
    date: '2026-09-02',
    productId: 'prod-3',
    productName: 'IR 20 Special Idli Rice (25kg)',
    bagsDamaged: 2,
    quantityLostKg: 50,
    costPerBag: 920,
    estimatedFinancialLoss: 1840,
    stage: 'Storage',
    vehicleNumber: 'Godown Pallet #4',
    staffMember: 'Natarajan (Godown Keeper)',
    cause: 'Stack collapse due to uneven wooden pallet',
    description: 'Bottom row leaned against godown wall, top 2 bags burst upon hitting floor.',
    photoUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80',
    resolved: true
  }
];

export const initialPurchases = [
  {
    id: 'PUR-501',
    supplier: 'Sri Venkateswara Modern Rice Mill (Nellore)',
    supplierGst: '37AACCS9912L1ZZ',
    productId: 'prod-4',
    productName: 'Kurnool Sona Masuri (25kg)',
    quantityBags: 200,
    ratePerBag: 1280,
    totalAmount: 256000,
    date: '2026-09-12',
    invoiceNumber: 'SVMRM/2026/0942',
    paymentStatus: 'Paid',
    notes: 'Received batch in good condition. Moisture test passed at 11.8%.'
  },
  {
    id: 'PUR-502',
    supplier: 'Cauvery Agro Processors (Thanjavur)',
    supplierGst: '33AABCT7811M1ZQ',
    productId: 'prod-1',
    productName: 'BPT 5204 Deluxe Ponni (25kg)',
    quantityBags: 250,
    ratePerBag: 1350,
    totalAmount: 337500,
    date: '2026-09-10',
    invoiceNumber: 'CAP/TN/26-88',
    paymentStatus: 'Paid',
    notes: 'Direct mill procurement, certified 1-year aged paddy milling.'
  },
  {
    id: 'PUR-503',
    supplier: 'Royal Punjab Agro Grain Mills (Karnal)',
    supplierGst: '06AACCR4421R1ZK',
    productId: 'prod-5',
    productName: 'Royal 1121 Extra Long Basmati (25kg)',
    quantityBags: 100,
    ratePerBag: 2200,
    totalAmount: 220000,
    date: '2026-09-05',
    invoiceNumber: 'RPAG/26-27/119',
    paymentStatus: 'Paid',
    notes: 'Premium export grade 1121 steam basmati.'
  }
];

export const initialSales = [
  {
    id: 'SAL-1024',
    date: '2026-09-15',
    customerName: 'Ravi Traders',
    customerId: 'ret-1',
    itemsSummary: 'Ponni (20), Sona Masuri (15)',
    totalBags: 35,
    amount: 53950,
    paymentStatus: 'Credit',
    paymentMode: '15-day Credit Account',
    invoiceNo: 'SM/26-27/089'
  },
  {
    id: 'SAL-1023',
    date: '2026-09-15',
    customerName: 'Sri Lakshmi Stores',
    customerId: 'ret-2',
    itemsSummary: 'Idli Rice (30), Boiled Rice (10)',
    totalBags: 40,
    amount: 54500,
    paymentStatus: 'Credit',
    paymentMode: 'Credit',
    invoiceNo: 'SM/26-27/088'
  },
  {
    id: 'SAL-1022',
    date: '2026-09-14',
    customerName: 'Murugan Stores',
    customerId: 'ret-5',
    itemsSummary: 'Basmati (12), Ponni 50kg (8)',
    totalBags: 20,
    amount: 56200,
    paymentStatus: 'Paid',
    paymentMode: 'NEFT / Bank Transfer',
    invoiceNo: 'SM/26-27/087'
  },
  {
    id: 'SAL-1021',
    date: '2026-09-14',
    customerName: 'Kumar Agencies',
    customerId: 'ret-3',
    itemsSummary: 'Ponni (25), Raw Rice (10)',
    totalBags: 35,
    amount: 51300,
    paymentStatus: 'Paid',
    paymentMode: 'UPI Instant Settlement',
    invoiceNo: 'SM/26-27/086'
  },
  {
    id: 'SAL-1020',
    date: '2026-09-13',
    customerName: 'City Caterers (Counter Sale)',
    customerId: null,
    itemsSummary: 'Sona Masuri (10), Boiled Rice (5)',
    totalBags: 15,
    amount: 25650,
    paymentStatus: 'Paid',
    paymentMode: 'Cash',
    invoiceNo: 'SM/26-27/085'
  }
];

export const initialExpenses = [
  {
    id: 'EXP-301',
    date: '2026-09-15',
    category: 'Transportation & Fuel',
    amount: 5800,
    description: 'Diesel for Eicher TN-28-AP-4521 (Salem & Namakkal round trips)',
    paidTo: 'Bharat Petroleum Highway Outlet'
  },
  {
    id: 'EXP-302',
    date: '2026-09-14',
    category: 'Labor & Hamali Wages',
    amount: 6400,
    description: 'Loading and stacking wages for 450 bags from railway rake container',
    paidTo: 'Shevapet Hamali Union Group B'
  },
  {
    id: 'EXP-303',
    date: '2026-09-10',
    category: 'Godown Rent',
    amount: 28000,
    description: 'Monthly lease for Godown 2 (5,000 sq.ft grain storage yard)',
    paidTo: 'Salem Industrial Estate Realty'
  },
  {
    id: 'EXP-304',
    date: '2026-09-08',
    category: 'Vehicle Maintenance',
    amount: 4200,
    description: 'Rear leaf spring re-tensioning and side body latch welding on TN-28-AP-4521',
    paidTo: 'Sri Ram Body Works, Salem'
  },
  {
    id: 'EXP-305',
    date: '2026-09-05',
    category: 'Electricity & Utilities',
    amount: 3850,
    description: 'TANGEDCO Commercial power bill for godown exhaust & CCTV operations',
    paidTo: 'TNEB Electricity Board'
  }
];

export const initialLedgerTransactions = [
  {
    id: 'LED-701',
    date: '2026-09-15',
    customerId: 'ret-1',
    customerName: 'Ravi Traders',
    type: 'DEBIT', // Credit sale adds to outstanding
    amount: 53950,
    description: 'Invoice #SM/26-27/089 (35 bags dispatch)',
    referenceNo: 'ORD-1024',
    balanceAfter: 128400
  },
  {
    id: 'LED-702',
    date: '2026-09-10',
    customerId: 'ret-1',
    customerName: 'Ravi Traders',
    type: 'CREDIT', // Payment reduces outstanding
    amount: 45000,
    description: 'Cheque Clearance (HDFC Chq #440129)',
    referenceNo: 'CHQ-440129',
    balanceAfter: 74450
  },
  {
    id: 'LED-703',
    date: '2026-09-06',
    customerId: 'ret-2',
    customerName: 'Sri Lakshmi Stores',
    type: 'CREDIT',
    amount: 30000,
    description: 'RTGS Settlement - ICICI Bank',
    referenceNo: 'RTGS-26090688',
    balanceAfter: 95000
  },
  {
    id: 'LED-704',
    date: '2026-09-02',
    customerId: 'ret-4',
    customerName: 'Anand Supermarket',
    type: 'DEBIT',
    amount: 98000,
    description: 'Invoice #SM/26-27/074 (Bulk Basmati delivery)',
    referenceNo: 'ORD-988',
    balanceAfter: 180000
  }
];

export const initialStaff = [
  {
    id: 'stf-1',
    name: 'Selvam M.',
    role: 'Senior Delivery Driver',
    phone: '+91 98420 11990',
    assignedVehicle: 'TN-28-AP-4521',
    status: 'On Duty',
    tripsCompleted: 142,
    rating: '4.8'
  },
  {
    id: 'stf-2',
    name: 'Kumar P.',
    role: 'Delivery Driver',
    phone: '+91 94431 88721',
    assignedVehicle: 'TN-45-BC-8890',
    status: 'On Duty',
    tripsCompleted: 188,
    rating: '4.9'
  },
  {
    id: 'stf-3',
    name: 'Mani R.',
    role: 'Delivery Driver',
    phone: '+91 97881 44520',
    assignedVehicle: 'TN-30-X-1122',
    status: 'Available',
    tripsCompleted: 94,
    rating: '4.7'
  },
  {
    id: 'stf-4',
    name: 'Natarajan S.',
    role: 'Godown Supervisor & Stock Keeper',
    phone: '+91 98424 33112',
    assignedVehicle: 'Godown 1 & 2',
    status: 'On Duty',
    tripsCompleted: 0,
    rating: '5.0'
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    type: 'warning',
    title: 'Payment Overdue Alert',
    message: 'Sri Lakshmi Stores has an overdue payment of ₹95,000 (Due Date: 12 Sep 2026).',
    time: '10 mins ago',
    read: false,
    link: '/admin/credit'
  },
  {
    id: 'notif-2',
    type: 'danger',
    title: 'Low Stock Alert: Idli Rice',
    message: 'IR 20 Idli Rice is at 85 bags (Min threshold is 120 bags). Reorder immediately.',
    time: '45 mins ago',
    read: false,
    link: '/admin/inventory'
  },
  {
    id: 'notif-3',
    type: 'info',
    title: 'Vehicle Dispatched',
    message: 'Vehicle TN-28-AP-4521 has departed for Salem with Order #ORD-1024.',
    time: '2 hours ago',
    read: false,
    link: '/admin/deliveries'
  },
  {
    id: 'notif-4',
    type: 'warning',
    title: 'Damage Incident Logged',
    message: 'Driver Selvam reported 3 damaged bags on TN-28-AP-4521 due to rough transport.',
    time: 'Yesterday',
    read: true,
    link: '/admin/damage'
  }
];
