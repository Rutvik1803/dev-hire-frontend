import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import InterviewCard from '../../components/InterviewCard';
import { getApplicationById } from '../../services/applicationService';
import { getInterviewByApplicationId } from '../../services/interviewService';
import { convertJobTypeToFrontend } from '../../services/jobService';

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  const fetchApplicationDetails = async () => {
    setLoading(true);
    try {
      const [appData, interviewData] = await Promise.all([
        getApplicationById(id),
        getInterviewByApplicationId(id),
      ]);

      setApplication(appData);
      setInterview(interviewData);
    } catch (error) {
      let errorMessage = 'Failed to load application details.';

      if (error.status === 404) {
        errorMessage = 'Application not found.';
      } else if (error.status === 403) {
        errorMessage = 'You do not have permission to view this application.';
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

  if (loading) {
    return <Loading />;
  }

  if (!application) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">
          {toast ? toast.message : 'Application not found'}
        </h2>
        <Link
          to="/developer/applications"
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to applications
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/developer/applications"
        className="inline-flex items-center text-textSecondary hover:text-textPrimary mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Applications
      </Link>

      {/* Application Header */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary mb-2">
              {application.job.title}
            </h1>
            <p className="text-xl text-textSecondary font-medium">
              {application.job.companyName}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <StatusBadge status={application.status} />
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex items-center text-textSecondary">
            <MapPinIcon className="w-5 h-5 mr-3" />
            <span>{application.job.location}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <BriefcaseIcon className="w-5 h-5 mr-3" />
            <span>{convertJobTypeToFrontend(application.job.jobType)}</span>
          </div>
          {application.job.salaryRange && (
            <div className="flex items-center text-textSecondary">
              <CurrencyDollarIcon className="w-5 h-5 mr-3" />
              <span>{application.job.salaryRange}</span>
            </div>
          )}
          <div className="flex items-center text-textSecondary">
            <CalendarIcon className="w-5 h-5 mr-3" />
            <span>
              Applied on{' '}
              {new Date(application.appliedDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Cover Letter */}
        {application.coverLetter && (
          <div>
            <h2 className="text-lg font-semibold text-textPrimary mb-3">
              Your Cover Letter
            </h2>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-textSecondary leading-relaxed whitespace-pre-wrap">
                {application.coverLetter}
              </p>
            </div>
          </div>
        )}

        {/* Recruiter Notes */}
        {application.notes && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">
              Recruiter's Notes
            </h3>
            <p className="text-sm text-yellow-800">{application.notes}</p>
          </div>
        )}
      </div>

      {/* Interview Details */}
      {interview && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">
            Interview Details
          </h2>
          <InterviewCard interview={interview} showEditButton={false} />
        </div>
      )}

      {/* No Interview Scheduled */}
      {!interview && application.status === 'IN_REVIEW' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-blue-700">
            Your application is under review. You'll be notified when an
            interview is scheduled.
          </p>
        </div>
      )}

      {/* Job Description */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8">
        <h2 className="text-lg font-semibold text-textPrimary mb-3">
          Job Description
        </h2>
        <div className="text-textSecondary leading-relaxed whitespace-pre-wrap mb-6">
          {application.job.description}
        </div>

        {application.job.requiredSkills &&
          application.job.requiredSkills.length > 0 && (
            <>
              <h3 className="text-lg font-semibold text-textPrimary mb-3">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {application.job.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
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

export default ApplicationDetails;
