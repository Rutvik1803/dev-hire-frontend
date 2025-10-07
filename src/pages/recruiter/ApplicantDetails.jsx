import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CalendarIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import {
  getApplicationById,
  updateApplicationStatus,
  APPLICATION_STATUS,
  getStatusDisplay,
} from '../../services/applicationService';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';

const ApplicantDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getApplicationById(id);
      setApplication(data);
      setStatus(data.status);
    } catch (err) {
      console.error('Error fetching application details:', err);
      setError(err.message || 'Failed to load application details');
      setToastMessage(err.message || 'Failed to load application details');
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) return;

    try {
      setUpdating(true);
      await updateApplicationStatus(
        id,
        newStatus,
        `Status updated to ${getStatusDisplay(newStatus)}`
      );
      setStatus(newStatus);
      setApplication({ ...application, status: newStatus });
      setToastMessage(
        `Application status updated to ${getStatusDisplay(newStatus)}`
      );
      setToastType('success');
      setShowToast(true);
    } catch (err) {
      console.error('Error updating status:', err);
      setToastMessage(err.message || 'Failed to update status');
      setToastType('error');
      setShowToast(true);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!application) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">
          Application not found
        </h2>
        <Link to="/recruiter/jobs" className="text-primary hover:underline">
          Back to jobs
        </Link>
      </div>
    );
  }

  const { applicant, job } = application;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to={`/recruiter/jobs/${application.jobId}/applicants`}
        className="inline-flex items-center text-textSecondary hover:text-textPrimary mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Applicants
      </Link>

      {/* Applicant Header */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-textPrimary mb-2">
              {applicant.name}
            </h1>
            {applicant.experience && (
              <p className="text-lg text-textSecondary">
                {applicant.experience}
              </p>
            )}
          </div>
          <span
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              status === 'ACCEPTED'
                ? 'bg-green-100 text-green-700'
                : status === 'REJECTED'
                ? 'bg-red-100 text-red-700'
                : status === 'IN_REVIEW'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {getStatusDisplay(status)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-border">
          <div className="flex items-center text-textSecondary">
            <EnvelopeIcon className="w-5 h-5 mr-3 flex-shrink-0" />
            <a
              href={`mailto:${applicant.email}`}
              className="hover:text-primary break-all"
            >
              {applicant.email}
            </a>
          </div>
          {applicant.phone && (
            <div className="flex items-center text-textSecondary">
              <span className="w-5 h-5 mr-3 flex-shrink-0">📱</span>
              <span>{applicant.phone}</span>
            </div>
          )}
          <div className="flex items-center text-textSecondary">
            <CalendarIcon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>
              Applied on{' '}
              {new Date(application.appliedDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-textSecondary">
            <BriefcaseIcon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>{job.title}</span>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {applicant.resumeUrl && (
            <div className="flex items-center text-textSecondary">
              <DocumentTextIcon className="w-5 h-5 mr-3 flex-shrink-0" />
              <a
                href={`http://localhost:4000${applicant.resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Resume
              </a>
            </div>
          )}
          {applicant.linkedinUrl && (
            <div className="flex items-center text-textSecondary">
              <span className="w-5 h-5 mr-3 flex-shrink-0">💼</span>
              <a
                href={applicant.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
          {applicant.githubUrl && (
            <div className="flex items-center text-textSecondary">
              <span className="w-5 h-5 mr-3 flex-shrink-0">🐙</span>
              <a
                href={applicant.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Profile
              </a>
            </div>
          )}
        </div>

        {/* Skills */}
        {applicant.skills && applicant.skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-textPrimary mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cover Letter */}
        {application.coverLetter && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-textPrimary mb-3">
              Cover Letter
            </h2>
            <p className="text-textSecondary whitespace-pre-wrap">
              {application.coverLetter}
            </p>
          </div>
        )}
      </div>

      {/* Status Management */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">
          Update Application Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.values(APPLICATION_STATUS).map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => handleStatusChange(statusOption)}
              disabled={updating}
              className={`px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                status === statusOption
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-textPrimary hover:bg-gray-200'
              }`}
            >
              {getStatusDisplay(statusOption)}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold">
            Schedule Interview
          </button>
          <a
            href={`mailto:${applicant.email}`}
            className="bg-gray-100 text-textPrimary px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center"
          >
            Send Email
          </a>
          {applicant.resumeUrl && (
            <a
              href={`http://localhost:4000${applicant.resumeUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="bg-gray-100 text-textPrimary px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center"
            >
              Download Resume
            </a>
          )}
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ApplicantDetails;
