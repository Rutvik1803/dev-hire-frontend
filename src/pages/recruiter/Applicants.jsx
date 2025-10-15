import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import StatusBadge from '../../components/StatusBadge';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import {
  getAllApplications,
  APPLICATION_STATUS,
} from '../../services/applicationService';

const Applicants = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

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

      const data = await getAllApplications(options);
      setApplications(data.data || []);
    } catch (error) {
      let errorMessage = 'Failed to load applicants.';

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

  // Filter applications by search query
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          All Applicants
        </h1>
        <p className="text-textSecondary">
          Review and manage all job applicants
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
              placeholder="Search by name, email, or job title..."
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
            {filteredApplications.length === 1 ? 'applicant' : 'applicants'}
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

      {/* Applicants Grid */}
      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <Link
              key={application.id}
              to={`/recruiter/applicants/${application.id}`}
              className="bg-surface rounded-xl shadow-sm border border-border p-6 hover:shadow-md hover:border-primary/50 transition-all"
            >
              {/* Applicant Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-textPrimary text-lg truncate">
                    {application.applicant.name}
                  </h3>
                  <p className="text-sm text-textSecondary truncate">
                    {application.applicant.email}
                  </p>
                </div>
              </div>

              {/* Job Applied For */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-textSecondary mb-1">Applied for</p>
                <p className="font-medium text-textPrimary text-sm truncate">
                  {application.job.title}
                </p>
              </div>

              {/* Experience & Skills */}
              {application.applicant.experience && (
                <div className="mb-3">
                  <p className="text-xs text-textSecondary">Experience</p>
                  <p className="text-sm font-medium text-textPrimary">
                    {application.applicant.experience}
                  </p>
                </div>
              )}

              {application.applicant.skills &&
                application.applicant.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-textSecondary mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {application.applicant.skills
                        .slice(0, 3)
                        .map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      {application.applicant.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-textSecondary rounded text-xs">
                          +{application.applicant.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <StatusBadge status={application.status} />
                <p className="text-xs text-textSecondary">
                  {new Date(application.appliedDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm border border-border p-12 text-center">
          <UserIcon className="w-16 h-16 text-textSecondary mx-auto mb-4" />
          <p className="text-textSecondary text-lg mb-4">
            {applications.length === 0
              ? 'No applicants yet'
              : 'No applicants found matching your criteria'}
          </p>
          {applications.length > 0 && (
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

export default Applicants;
