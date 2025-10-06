import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

const ProtectedLayout = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 p-6 lg:p-8">
          {/* Mobile menu button */}
          <button
            className="lg:hidden mb-4 p-2 rounded-lg hover:bg-surface transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-6 h-6 text-textPrimary" />
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
