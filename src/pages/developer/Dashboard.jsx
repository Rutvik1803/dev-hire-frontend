import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StatusBadge from '../../components/StatusBadge';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import {
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import {
  getDeveloperDashboardStats,
  getRecentApplications,
} from '../../services/developerService';

const DeveloperDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, applicationsData] = await Promise.all([
        getDeveloperDashboardStats(),
        getRecentApplications(5),
      ]);

      setStats(statsData);
      setRecentApplications(applicationsData);
    } catch (error) {
      let errorMessage = 'Failed to load dashboard data.';

      if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-textSecondary">Failed to load dashboard data</p>
        <button
          onClick={fetchDashboardData}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Applied Jobs',
      value: stats.appliedJobs,
      icon: BriefcaseIcon,
      color: 'bg-blue-500',
    },
    {
      label: 'In Review',
      value: stats.inReview,
      icon: ClockIcon,
      color: 'bg-yellow-500',
    },
    {
      label: 'Interviews',
      value: stats.interviews,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
    },
    {
      label: 'Offers',
      value: stats.offers,
      icon: XCircleIcon,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Developer Dashboard
        </h1>
        <p className="text-textSecondary">
          Track your job applications and opportunities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-surface rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-textPrimary mb-1">
                {stat.value}
              </div>
              <div className="text-textSecondary text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-textPrimary">
            Recent Applications
          </h2>
          <Link
            to="/developer/jobs"
            className="text-primary hover:underline font-medium"
          >
            Browse More Jobs
          </Link>
        </div>

        <div className="space-y-4">
          {recentApplications.length > 0 ? (
            recentApplications.map((application) => (
              <div
                key={application.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="mb-3 sm:mb-0">
                  <h3 className="font-semibold text-textPrimary mb-1">
                    {application.job.title}
                  </h3>
                  <p className="text-textSecondary text-sm">
                    {application.job.companyName}
                  </p>
                  <p className="text-textSecondary text-xs mt-1">
                    Applied on{' '}
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={application.status} />
                  <Link
                    to={`/developer/jobs/${application.jobId}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-textSecondary">
              <p>No applications yet</p>
              <Link
                to="/developer/jobs"
                className="inline-block mt-3 text-primary hover:underline font-medium"
              >
                Browse jobs and start applying
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/developer/jobs"
          className="bg-gradient-to-br from-primary to-secondary text-white rounded-xl p-8 hover:shadow-lg transition-shadow"
        >
          <BriefcaseIcon className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Browse Jobs</h3>
          <p className="text-white/90">
            Discover new opportunities matching your skills
          </p>
        </Link>
        <Link
          to="/developer/resume"
          className="bg-surface border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
        >
          <CheckCircleIcon className="w-10 h-10 mb-4 text-primary" />
          <h3 className="text-xl font-semibold text-textPrimary mb-2">
            Update Resume
          </h3>
          <p className="text-textSecondary">Keep your resume up to date</p>
        </Link>
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DeveloperDashboard;
