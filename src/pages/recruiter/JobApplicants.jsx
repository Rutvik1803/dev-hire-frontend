import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { getJobById } from '../../services/jobService';
import { getJobApplications, getStatusDisplay, getStatusColor } from '../../services/applicationService';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';

const JobApplicants = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchJobAndApplications();
  }, [id]);

  useEffect(() => {
    // Filter applications based on status
    if (statusFilter === 'ALL') {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((app) => app.status === statusFilter)
      );
    }
  }, [statusFilter, applications]);

  const fetchJobAndApplications = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch job details and applications in parallel
      const [jobData, applicationsResponse] = await Promise.all([
        getJobById(id),
        getJobApplications(id, { sort: 'desc' }),
      ]);

      setJob(jobData);
      setApplications(applicationsResponse.data || []);
      setFilteredApplications(applicationsResponse.data || []);
    } catch (err) {
      console.error('Error fetching job applications:', err);
      setError(err.message || 'Failed to load job applications');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">
          Job not found
        </h2>
        <Link to="/recruiter/jobs" className="text-primary hover:underline">
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link
        to="/recruiter/jobs"
        className="inline-flex items-center text-textSecondary hover:text-textPrimary mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Jobs
      </Link>

      {/* Job Info Header */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <BriefcaseIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-textPrimary mb-2">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-textSecondary">
              <span>{job.companyName}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.jobType?.replace('_', ' ')}</span>
              <span>•</span>
              <span className="font-semibold text-primary">
                {applications.length} Applicants
              </span>
            </div>
          </div>
          <Link
            to={`/recruiter/jobs/edit/${job.id}`}
            className="bg-gray-100 text-textPrimary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Edit Job
          </Link>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-xl font-semibold text-textPrimary">
          Applications ({filteredApplications.length})
        </h2>
        <div className="flex gap-2 ml-auto">
          {['ALL', 'APPLIED', 'IN_REVIEW', 'ACCEPTED', 'REJECTED'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-textPrimary hover:bg-gray-200'
                }`}
              >
                {status === 'ALL' ? 'All' : getStatusDisplay(status)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Applicants Grid */}
      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredApplications.map((application) => (
            <Link
              key={application.id}
              to={`/recruiter/applicants/${application.id}`}
              className="bg-surface rounded-xl shadow-sm border border-border p-6 hover:border-primary/50 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-1">
                    {application.applicant.name}
                  </h3>
                  <p className="text-textSecondary text-sm">
                    {application.applicant.email}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(
                    application.status
                  )}`}
                >
                  {getStatusDisplay(application.status)}
                </span>
              </div>

              {application.applicant.experience && (
                <p className="text-textSecondary text-sm mb-3">
                  Experience: {application.applicant.experience}
                </p>
              )}

              {application.applicant.skills &&
                application.applicant.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {application.applicant.skills.slice(0, 5).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {application.applicant.skills.length > 5 && (
                      <span className="text-xs text-textSecondary">
                        +{application.applicant.skills.length - 5} more
                      </span>
                    )}
                  </div>
                )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-textSecondary">
                  Applied {new Date(application.appliedDate).toLocaleDateString()}
                </span>
                <span className="text-primary text-sm font-medium hover:underline">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm border border-border p-12 text-center">
          <p className="text-textSecondary text-lg">
            {statusFilter === 'ALL'
              ? 'No applications yet for this position'
              : `No ${getStatusDisplay(statusFilter).toLowerCase()} applications`}
          </p>
          <p className="text-textSecondary text-sm mt-2">
            {statusFilter === 'ALL'
              ? 'Share your job posting to attract more candidates'
              : 'Try selecting a different status filter'}
          </p>
        </div>
      )}

      {showToast && error && (
        <Toast
          message={error}
          type="error"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default JobApplicants;
