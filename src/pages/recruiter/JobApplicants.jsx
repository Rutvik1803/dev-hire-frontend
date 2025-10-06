import { useParams, Link } from 'react-router-dom';
import { mockJobs, mockApplicants } from '../../data/mockData';
import ApplicantCard from '../../components/ApplicantCard';
import { ArrowLeftIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const JobApplicants = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === parseInt(id));
  const applicants = mockApplicants.filter((a) => a.jobId === parseInt(id));

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
              <span>{job.company}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
              <span>•</span>
              <span className="font-semibold text-primary">
                {applicants.length} Applicants
              </span>
            </div>
          </div>
          <button className="bg-gray-100 text-textPrimary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Edit Job
          </button>
        </div>
      </div>

      {/* Applicants Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">
          Applicants ({applicants.length})
        </h2>
      </div>

      {applicants.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm border border-border p-12 text-center">
          <p className="text-textSecondary text-lg">
            No applicants yet for this position
          </p>
          <p className="text-textSecondary text-sm mt-2">
            Share your job posting to attract more candidates
          </p>
        </div>
      )}
    </div>
  );
};

export default JobApplicants;
