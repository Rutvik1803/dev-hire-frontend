import { dashboardStats } from '../../data/mockData';
import {
  UsersIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = dashboardStats.admin;

  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      label: 'Total Jobs',
      value: stats.totalJobs,
      icon: BriefcaseIcon,
      color: 'bg-purple-500',
      change: '+8%',
    },
    {
      label: 'Total Applicants',
      value: stats.totalApplicants,
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      change: '+15%',
    },
    {
      label: 'Active Recruiters',
      value: stats.activeRecruiters,
      icon: UserGroupIcon,
      color: 'bg-orange-500',
      change: '+5%',
    },
  ];

  const recentActivity = [
    {
      type: 'user',
      message: 'New developer registered: John Doe',
      time: '5 minutes ago',
    },
    {
      type: 'job',
      message: 'New job posted: Senior Frontend Developer',
      time: '12 minutes ago',
    },
    {
      type: 'application',
      message: '5 new applications received',
      time: '1 hour ago',
    },
    {
      type: 'user',
      message: 'New recruiter registered: Jane Smith',
      time: '2 hours ago',
    },
    {
      type: 'job',
      message: 'Job closed: Backend Engineer',
      time: '3 hours ago',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Admin Dashboard
        </h1>
        <p className="text-textSecondary">
          Overview of platform metrics and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-surface rounded-xl shadow-sm border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-textPrimary mb-1">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-textSecondary text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-surface rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-textPrimary mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'user'
                      ? 'bg-blue-100 text-blue-600'
                      : activity.type === 'job'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {activity.type === 'user' ? (
                    <UsersIcon className="w-5 h-5" />
                  ) : activity.type === 'job' ? (
                    <BriefcaseIcon className="w-5 h-5" />
                  ) : (
                    <DocumentTextIcon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-textPrimary">{activity.message}</p>
                  <p className="text-textSecondary text-sm mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-textPrimary mb-6">
            Quick Stats
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-textSecondary">Developers</span>
                <span className="text-textPrimary font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: '68%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-textSecondary">Recruiters</span>
                <span className="text-textPrimary font-medium">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: '32%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-textSecondary">Active Jobs</span>
                <span className="text-textPrimary font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: '85%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-textSecondary">Success Rate</span>
                <span className="text-textPrimary font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: '92%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="bg-gradient-to-br from-primary to-secondary text-white rounded-xl p-8 hover:shadow-lg transition-shadow"
        >
          <UsersIcon className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
          <p className="text-white/90">View and manage all platform users</p>
        </Link>
        <Link
          to="/admin/jobs"
          className="bg-surface border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
        >
          <BriefcaseIcon className="w-10 h-10 mb-4 text-primary" />
          <h3 className="text-xl font-semibold text-textPrimary mb-2">
            Manage Jobs
          </h3>
          <p className="text-textSecondary">Oversee all job postings</p>
        </Link>
        <div className="bg-surface border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
          <DocumentTextIcon className="w-10 h-10 mb-4 text-primary" />
          <h3 className="text-xl font-semibold text-textPrimary mb-2">
            View Reports
          </h3>
          <p className="text-textSecondary">Generate platform analytics</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
