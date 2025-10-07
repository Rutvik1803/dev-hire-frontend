import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UsersIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getDeveloperLinks = () => [
    { to: '/developer/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { to: '/developer/jobs', icon: BriefcaseIcon, label: 'Browse Jobs' },
    {
      to: '/developer/applications',
      icon: ClipboardDocumentListIcon,
      label: 'My Applications',
    },
    { to: '/developer/resume', icon: DocumentTextIcon, label: 'My Resume' },
  ];

  const getRecruiterLinks = () => [
    { to: '/recruiter/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { to: '/recruiter/jobs', icon: BriefcaseIcon, label: 'My Jobs' },
    { to: '/recruiter/jobs/new', icon: PlusCircleIcon, label: 'Post New Job' },
  ];

  const getAdminLinks = () => [
    { to: '/admin/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { to: '/admin/users', icon: UsersIcon, label: 'Manage Users' },
    { to: '/admin/jobs', icon: BriefcaseIcon, label: 'Manage Jobs' },
    { to: '/admin/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ];

  const getLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case 'developer':
        return getDeveloperLinks();
      case 'recruiter':
        return getRecruiterLinks();
      case 'admin':
        return getAdminLinks();
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col w-64 bg-surface border-r border-border min-h-[calc(100vh-4rem)]`}
      >
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-textSecondary hover:bg-gray-100 hover:text-textPrimary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 bg-surface border-r border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
                <span className="text-xl font-bold text-textPrimary">
                  DevHire
                </span>
              </div>
              <nav className="space-y-2">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-textSecondary hover:bg-gray-100 hover:text-textPrimary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
