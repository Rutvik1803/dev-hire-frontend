import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';
import StatusBadge from '../../components/StatusBadge';
import {
  getJobById,
  convertJobTypeToFrontend,
} from '../../services/jobService';
import {
  checkApplicationStatus,
  applyToJob,
} from '../../services/developerService';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applying, setApplying] = useState(false);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const [jobData, statusData] = await Promise.all([
        getJobById(id),
        checkApplicationStatus(id),
      ]);

      setJob(jobData);
      setApplicationStatus(statusData);
    } catch (error) {
      let errorMessage = 'Failed to load job details.';

      if (error.status === 404) {
        errorMessage = 'Job not found.';
      } else if (error.status === 400) {
        errorMessage = 'Invalid job ID.';
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
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    setShowCoverLetterModal(true);
  };

  const handleApplySubmit = async () => {
    if (!coverLetter.trim()) {
      setToast({
        type: 'error',
        message: 'Please write a cover letter',
      });
      return;
    }

    setApplying(true);
    try {
      const result = await applyToJob(id, coverLetter);

      setToast({
        type: 'success',
        message: 'Application submitted successfully!',
      });

      setShowCoverLetterModal(false);
      setCoverLetter('');

      // Refresh application status
      const statusData = await checkApplicationStatus(id);
      setApplicationStatus(statusData);
    } catch (error) {
      let errorMessage = 'Failed to submit application.';

      if (error.status === 409) {
        errorMessage = 'You have already applied to this job.';
      } else if (error.status === 404) {
        errorMessage = 'Job not found.';
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
      setApplying(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">
          {toast ? toast.message : 'Job not found'}
        </h2>
        <Link
          to="/developer/jobs"
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/developer/jobs"
        className="inline-flex items-center text-textSecondary hover:text-textPrimary mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Jobs
      </Link>

      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary mb-2">
              {job.title}
            </h1>
            <p className="text-xl text-textSecondary font-medium">
              {job.companyName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex items-center text-textSecondary">
            <MapPinIcon className="w-5 h-5 mr-3" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <BriefcaseIcon className="w-5 h-5 mr-3" />
            <span>{convertJobTypeToFrontend(job.jobType)}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <CurrencyDollarIcon className="w-5 h-5 mr-3" />
            <span>{job.salaryRange}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <CalendarIcon className="w-5 h-5 mr-3" />
            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-3">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {(job.requiredSkills || []).map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-3">
            Job Description
          </h2>
          <div className="text-textSecondary leading-relaxed whitespace-pre-wrap">
            {job.description}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {applicationStatus?.hasApplied ? (
            <div className="flex-1 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2">
              <CheckCircleIcon className="w-5 h-5" />
              <span className="font-semibold">Applied</span>
              {applicationStatus.application && (
                <StatusBadge status={applicationStatus.application.status} />
              )}
            </div>
          ) : (
            <button
              onClick={handleApplyClick}
              disabled={applying}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          )}

          <button className="flex-1 bg-gray-100 text-textPrimary px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
            Save for Later
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-textPrimary mb-4">
          About {job.companyName}
        </h2>
        <p className="text-textSecondary leading-relaxed mb-4">
          {job.companyName} is a leading technology company focused on
          innovation and excellence. We're committed to creating products that
          make a difference and building a team of talented individuals who
          share our vision.
        </p>
        {job.recruiter && (
          <div className="mt-4">
            <p className="text-sm text-textSecondary">
              <span className="font-semibold text-textPrimary">Posted by:</span>{' '}
              {job.recruiter.name}
            </p>
          </div>
        )}
      </div>

      {/* Cover Letter Modal */}
      {showCoverLetterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-textPrimary">
                Apply for {job.title}
              </h2>
              <p className="text-textSecondary mt-1">{job.companyName}</p>
            </div>

            <div className="p-6">
              <label className="block text-sm font-semibold text-textPrimary mb-2">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell the recruiter why you're a great fit for this role..."
                rows={10}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-sm text-textSecondary mt-2">
                {coverLetter.length} characters
              </p>
            </div>

            <div className="p-6 border-t border-border flex gap-3">
              <button
                onClick={() => {
                  setShowCoverLetterModal(false);
                  setCoverLetter('');
                }}
                disabled={applying}
                className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApplySubmit}
                disabled={applying || !coverLetter.trim()}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
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

export default JobDetails;
