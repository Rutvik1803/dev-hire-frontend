import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import {
  getMyJobs,
  deleteJob,
  convertJobTypeToFrontend,
} from '../../services/jobService';
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getMyJobs();
      setJobs(data);
    } catch (error) {
      let errorMessage = 'Failed to load jobs. Please try again.';

      if (error.status === 401) {
        errorMessage = 'Please log in to view your jobs.';
      } else if (error.status === 403) {
        errorMessage = 'You do not have permission to view jobs.';
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

  const handleDeleteJob = async (jobId, jobTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${jobTitle}"?`)) {
      return;
    }

    setDeletingJobId(jobId);
    try {
      await deleteJob(jobId);

      // Remove job from local state
      setJobs(jobs.filter((job) => job.id !== jobId));

      setToast({
        type: 'success',
        message: 'Job deleted successfully!',
      });
    } catch (error) {
      let errorMessage = 'Failed to delete job. Please try again.';

      if (error.status === 401) {
        errorMessage = 'Please log in to delete jobs.';
      } else if (error.status === 403) {
        errorMessage = 'You do not have permission to delete this job.';
      } else if (error.status === 404) {
        errorMessage = 'Job not found.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setDeletingJobId(null);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary mb-2">
            My Job Postings
          </h1>
          <p className="text-textSecondary">Manage your active job listings</p>
        </div>
        <Link
          to="/recruiter/jobs/new"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-surface rounded-xl shadow-sm border border-border p-12 text-center">
          <p className="text-textSecondary text-lg mb-4">
            You haven't posted any jobs yet
          </p>
          <Link
            to="/recruiter/jobs/new"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <PlusIcon className="w-5 h-5" />
            Post Your First Job
          </Link>
        </div>
      ) : (
        <>
          {/* Jobs Table */}
          <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-textPrimary">
                            {job.title}
                          </div>
                          <div className="text-sm text-textSecondary">
                            {job.companyName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-textSecondary">
                        {job.location}
                      </td>
                      <td className="px-6 py-4 text-textSecondary">
                        {convertJobTypeToFrontend(job.jobType)}
                      </td>
                      <td className="px-6 py-4 text-textSecondary">
                        {job.salaryRange}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/recruiter/jobs/${job.id}/applicants`}
                            className="p-2 text-textSecondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="View Applicants"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </Link>
                          <Link
                            to={`/recruiter/jobs/edit/${job.id}`}
                            className="p-2 text-textSecondary hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Job"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteJob(job.id, job.title)}
                            disabled={deletingJobId === job.id}
                            className="p-2 text-textSecondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Job"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-4 mt-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-surface rounded-xl shadow-sm border border-border p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-textPrimary mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-textSecondary">
                      {job.companyName}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Location:</span>
                    <span className="text-textPrimary">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Type:</span>
                    <span className="text-textPrimary">
                      {convertJobTypeToFrontend(job.jobType)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Salary:</span>
                    <span className="text-textPrimary">{job.salaryRange}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/recruiter/jobs/${job.id}/applicants`}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center font-medium"
                  >
                    View Applicants
                  </Link>
                  <Link
                    to={`/recruiter/jobs/edit/${job.id}`}
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit Job"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteJob(job.id, job.title)}
                    disabled={deletingJobId === job.id}
                    className="px-4 py-2 bg-gray-100 text-textPrimary rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
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

export default RecruiterJobs;
