import React, { useState, useEffect } from 'react';
import { useCentralData } from './context/CentralDataContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { SystemArchModal } from './components/common/SystemArchModal';

// Pages
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CustomersPage } from './pages/admin/CustomersPage';
import { CreditLedgerPage } from './pages/admin/CreditLedgerPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { DeliveriesPage } from './pages/admin/DeliveriesPage';
import { InventoryPage } from './pages/admin/InventoryPage';
import { DamageTrackerPage } from './pages/admin/DamageTrackerPage';
import { PurchasesPage } from './pages/admin/PurchasesPage';
import { SalesPage } from './pages/admin/SalesPage';
import { ExpensesPage } from './pages/admin/ExpensesPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { StaffPage } from './pages/admin/StaffPage';
import { SettingsPage } from './pages/admin/SettingsPage';

// Retailer Pages
import { RetailerDashboard } from './pages/retailer/RetailerDashboard';
import { PlaceOrderPage } from './pages/retailer/PlaceOrderPage';
import { MyOrdersPage } from './pages/retailer/MyOrdersPage';
import { MyCreditPage } from './pages/retailer/MyCreditPage';
import { TrackDeliveryPage } from './pages/retailer/TrackDeliveryPage';

// Delivery Staff Pages
import { DeliveryDashboard } from './pages/delivery/DeliveryDashboard';
import { AssignedDeliveriesPage } from './pages/delivery/AssignedDeliveriesPage';
import { ReportDamagePage } from './pages/delivery/ReportDamagePage';

export function App() {
  const { currentRole, setCurrentRole } = useCentralData();

  // Simple in-app router state (default to landing page '/' initially, or current URL hash)
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [systemArchModalOpen, setSystemArchModalOpen] = useState(false);

  // Sync hash in browser URL for easy reloading / bookmarking
  const navigate = (path) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== currentPath) {
        setCurrentPath(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPath]);

  // Global Cmd+K / Ctrl+K keyboard shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check if current page is full-width (Landing Page or Login)
  const isPublicPage = currentPath === '/' || currentPath === '/login';

  // Render current view
  const renderCurrentPage = () => {
    switch (currentPath) {
      // Landing & Auth
      case '/':
        return <LandingPage onNavigate={navigate} />;
      case '/login':
        return <LoginPage onNavigate={navigate} />;

      // Admin Modules
      case '/admin':
        return <AdminDashboard onNavigate={navigate} />;
      case '/admin/customers':
        return <CustomersPage onNavigate={navigate} />;
      case '/admin/credit':
        return <CreditLedgerPage onNavigate={navigate} />;
      case '/admin/orders':
        return <OrdersPage onNavigate={navigate} />;
      case '/admin/deliveries':
        return <DeliveriesPage onNavigate={navigate} />;
      case '/admin/inventory':
        return <InventoryPage onNavigate={navigate} />;
      case '/admin/damage':
        return <DamageTrackerPage onNavigate={navigate} />;
      case '/admin/purchases':
        return <PurchasesPage onNavigate={navigate} />;
      case '/admin/sales':
        return <SalesPage onNavigate={navigate} />;
      case '/admin/expenses':
        return <ExpensesPage onNavigate={navigate} />;
      case '/admin/reports':
        return <ReportsPage onNavigate={navigate} />;
      case '/admin/analytics':
        return <AnalyticsPage onNavigate={navigate} />;
      case '/admin/staff':
        return <StaffPage onNavigate={navigate} />;
      case '/admin/settings':
        return <SettingsPage onNavigate={navigate} />;

      // Retailer Portal
      case '/retailer':
        return <RetailerDashboard onNavigate={navigate} />;
      case '/retailer/order':
        return <PlaceOrderPage onNavigate={navigate} />;
      case '/retailer/orders':
        return <MyOrdersPage onNavigate={navigate} />;
      case '/retailer/credit':
        return <MyCreditPage onNavigate={navigate} />;
      case '/retailer/delivery':
        return <TrackDeliveryPage onNavigate={navigate} />;

      // Delivery Staff Portal
      case '/delivery':
        return <DeliveryDashboard onNavigate={navigate} />;
      case '/delivery/orders':
        return <AssignedDeliveriesPage onNavigate={navigate} />;
      case '/delivery/damage':
        return <ReportDamagePage onNavigate={navigate} />;

      default:
        return <AdminDashboard onNavigate={navigate} />;
    }
  };

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-[#F8FAF8]">
        {renderCurrentPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <Navbar
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenSystemArch={() => setSystemArchModalOpen(true)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={navigate}
        />

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Global Search Modal (Cmd+K) */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigate}
      />

      {/* Central Database & System Architecture Modal */}
      <SystemArchModal
        isOpen={systemArchModalOpen}
        onClose={() => setSystemArchModalOpen(false)}
      />
    </div>
  );
}

export default App;
