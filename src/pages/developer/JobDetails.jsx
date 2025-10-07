import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';
import {
  getJobById,
  convertJobTypeToFrontend,
} from '../../services/jobService';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const data = await getJobById(id);
      setJob(data);
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

  const handleApply = () => {
    setToast({
      type: 'success',
      message: 'Application submitted successfully!',
    });
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
          <button
            onClick={handleApply}
            className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            Apply Now
          </button>
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
