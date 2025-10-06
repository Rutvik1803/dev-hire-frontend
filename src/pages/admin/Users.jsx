import { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId, newRole) => {
    setToastMessage(`User role updated to ${newRole}`);
    setShowToast(true);
  };

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    setToastMessage(`User status changed to ${newStatus}`);
    setShowToast(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Manage Users
        </h1>
        <p className="text-textSecondary">View and manage all platform users</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary pointer-events-none" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="developer">Developers</option>
              <option value="recruiter">Recruiters</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-textSecondary">
            Showing {filteredUsers.length}{' '}
            {filteredUsers.length === 1 ? 'user' : 'users'}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-textPrimary">
                        {user.name}
                      </div>
                      <div className="text-sm text-textSecondary">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      defaultValue={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="px-3 py-1.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm capitalize"
                    >
                      <option value="developer">Developer</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 text-textSecondary">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusToggle(user.id, user.status)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        user.status === 'Active'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="lg:hidden mt-6 space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-surface rounded-xl shadow-sm border border-border p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-textPrimary mb-1">
                  {user.name}
                </h3>
                <p className="text-sm text-textSecondary">{user.email}</p>
              </div>
              <StatusBadge status={user.status} />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-textSecondary">Role:</span>
                <select
                  defaultValue={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="px-3 py-1 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm capitalize"
                >
                  <option value="developer">Developer</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-textSecondary">Joined:</span>
                <span className="text-textPrimary">
                  {new Date(user.joinedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleStatusToggle(user.id, user.status)}
              className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                user.status === 'Active'
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {user.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ))}
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default AdminUsers;
