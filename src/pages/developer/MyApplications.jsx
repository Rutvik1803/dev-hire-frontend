import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import StatusBadge from '../../components/StatusBadge';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import {
  getDeveloperApplications,
  withdrawApplication,
  APPLICATION_STATUS,
} from '../../services/developerService';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [withdrawingId, setWithdrawingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [selectedStatus]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const options = {};
      if (selectedStatus !== 'all') {
        options.status = selectedStatus;
      }

      const data = await getDeveloperApplications(options);
      setApplications(data.data || []);
    } catch (error) {
      let errorMessage = 'Failed to load applications.';

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

  const handleWithdraw = async (applicationId) => {
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    setWithdrawingId(applicationId);
    try {
      await withdrawApplication(applicationId);

      setToast({
        type: 'success',
        message: 'Application withdrawn successfully',
      });

      // Refresh applications
      await fetchApplications();
    } catch (error) {
      let errorMessage = 'Failed to withdraw application.';

      if (error.status === 400) {
        errorMessage =
          'Cannot withdraw this application. Status may have changed.';
      } else if (error.status === 403) {
        errorMessage = 'You are not authorized to withdraw this application.';
      } else if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setWithdrawingId(null);
    }
  };

  // Filter applications by search query
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const canWithdraw = (status) => {
    return (
      status === APPLICATION_STATUS.APPLIED ||
      status === APPLICATION_STATUS.IN_REVIEW
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          My Applications
        </h1>
        <p className="text-textSecondary">
          Track and manage your job applications
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary pointer-events-none" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white cursor-pointer min-w-[200px]"
            >
              <option value="all">All Status</option>
              <option value={APPLICATION_STATUS.APPLIED}>Applied</option>
              <option value={APPLICATION_STATUS.IN_REVIEW}>In Review</option>
              <option value={APPLICATION_STATUS.ACCEPTED}>Accepted</option>
              <option value={APPLICATION_STATUS.REJECTED}>Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-textSecondary">
            Showing {filteredApplications.length}{' '}
            {filteredApplications.length === 1 ? 'application' : 'applications'}
          </p>
          {(searchQuery || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
              }}
              className="text-sm text-primary hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-surface rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link
                        to={`/developer/jobs/${application.job.id}`}
                        className="text-xl font-semibold text-textPrimary hover:text-primary transition-colors"
                      >
                        {application.job.title}
                      </Link>
                      <p className="text-textSecondary mt-1">
                        {application.job.companyName}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-textSecondary mt-3">
                    <span>📍 {application.job.location}</span>
                    <span>💼 {application.job.jobType?.replace('_', ' ')}</span>
                    <span>
                      📅 Applied{' '}
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </span>
                    {application.updatedDate !== application.appliedDate && (
                      <span>
                        🔄 Updated{' '}
                        {new Date(application.updatedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {application.coverLetter && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-textPrimary mb-1">
                        Cover Letter:
                      </p>
                      <p className="text-sm text-textSecondary line-clamp-2">
                        {application.coverLetter}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 lg:items-end">
                  <StatusBadge status={application.status} />

                  <div className="flex gap-2">
                    <Link
                      to={`/developer/jobs/${application.job.id}`}
                      className="px-4 py-2 bg-gray-100 text-textPrimary rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      View Job
                    </Link>

                    {canWithdraw(application.status) && (
                      <button
                        onClick={() => handleWithdraw(application.id)}
                        disabled={withdrawingId === application.id}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        {withdrawingId === application.id
                          ? 'Withdrawing...'
                          : 'Withdraw'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm border border-border p-12 text-center">
          <p className="text-textSecondary text-lg mb-4">
            {applications.length === 0
              ? "You haven't applied to any jobs yet"
              : 'No applications found matching your criteria'}
          </p>
          {applications.length === 0 ? (
            <Link
              to="/developer/jobs"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Browse Jobs
            </Link>
          ) : (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
              }}
              className="text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

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

export default MyApplications;
