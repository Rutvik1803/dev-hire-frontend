import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'developer':
        return '/developer/dashboard';
      case 'recruiter':
        return '/recruiter/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
            <span className="text-xl font-bold text-textPrimary">DevHire</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                >
                  Dashboard
                </Link>
                {user.role === 'developer' && (
                  <>
                    <Link
                      to="/developer/jobs"
                      className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                    >
                      Browse Jobs
                    </Link>
                    <Link
                      to="/developer/resume"
                      className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                    >
                      My Resume
                    </Link>
                  </>
                )}
                {user.role === 'recruiter' && (
                  <>
                    <Link
                      to="/recruiter/jobs"
                      className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                    >
                      My Jobs
                    </Link>
                    <Link
                      to="/recruiter/jobs/new"
                      className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                    >
                      Post Job
                    </Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link
                      to="/admin/users"
                      className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                    >
                      Users
                    </Link>
                    <Link
                      to="/admin/jobs"
                      className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                    >
                      Jobs
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-textSecondary">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-gray-100 text-textPrimary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-textPrimary" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-textPrimary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block text-textSecondary hover:text-textPrimary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === 'developer' && (
                  <>
                    <Link
                      to="/developer/jobs"
                      className="block text-textSecondary hover:text-textPrimary transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Browse Jobs
                    </Link>
                    <Link
                      to="/developer/resume"
                      className="block text-textSecondary hover:text-textPrimary transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Resume
                    </Link>
                  </>
                )}
                {user.role === 'recruiter' && (
                  <>
                    <Link
                      to="/recruiter/jobs"
                      className="block text-textSecondary hover:text-textPrimary transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Jobs
                    </Link>
                    <Link
                      to="/recruiter/jobs/new"
                      className="block text-textSecondary hover:text-textPrimary transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Post Job
                    </Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link
                      to="/admin/users"
                      className="block text-textSecondary hover:text-textPrimary transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Users
                    </Link>
                    <Link
                      to="/admin/jobs"
                      className="block text-textSecondary hover:text-textPrimary transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                  </>
                )}
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-textSecondary mb-2">{user.name}</p>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gray-100 text-textPrimary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-textSecondary hover:text-textPrimary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
