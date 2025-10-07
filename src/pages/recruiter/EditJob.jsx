import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  getJobById,
  updateJob,
  convertJobType,
  JOB_TYPES,
} from '../../services/jobService';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: 'FULL_TIME',
    salaryRange: '',
    requiredSkills: '',
    description: '',
  });

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const job = await getJobById(id);

      // Populate form with existing job data
      setFormData({
        title: job.title || '',
        companyName: job.companyName || '',
        location: job.location || '',
        jobType: job.jobType || 'FULL_TIME',
        salaryRange: job.salaryRange || '',
        requiredSkills: job.requiredSkills ? job.requiredSkills.join(', ') : '',
        description: job.description || '',
      });
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError(err.message || 'Failed to load job details');
      setToast({
        type: 'error',
        message: err.message || 'Failed to load job details',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Job title is required');
      return;
    }
    if (!formData.companyName.trim()) {
      setError('Company name is required');
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Job description is required');
      return;
    }

    // Parse skills
    const skillsArray = formData.requiredSkills
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    if (skillsArray.length === 0) {
      setError('At least one skill is required');
      return;
    }

    try {
      setSubmitting(true);

      const jobData = {
        title: formData.title.trim(),
        companyName: formData.companyName.trim(),
        location: formData.location.trim(),
        jobType: formData.jobType,
        salaryRange: formData.salaryRange.trim(),
        requiredSkills: skillsArray,
        description: formData.description.trim(),
      };

      await updateJob(id, jobData);

      setToast({
        type: 'success',
        message: 'Job updated successfully!',
      });

      // Redirect to jobs list after a short delay
      setTimeout(() => {
        navigate('/recruiter/jobs');
      }, 1500);
    } catch (err) {
      console.error('Error updating job:', err);
      let errorMessage = 'Failed to update job. Please try again.';

      if (err.status === 401) {
        errorMessage = 'Please log in to update jobs.';
      } else if (err.status === 403) {
        errorMessage = 'You do not have permission to update this job.';
      } else if (err.status === 404) {
        errorMessage = 'Job not found.';
      } else if (err.status === 400) {
        errorMessage =
          err.message || 'Invalid job data. Please check your inputs.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/recruiter/jobs"
        className="inline-flex items-center text-textSecondary hover:text-textPrimary mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Jobs
      </Link>

      <div className="bg-surface rounded-xl shadow-sm border border-border p-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">Edit Job</h1>
        <p className="text-textSecondary mb-8">
          Update your job posting details
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-textPrimary mb-2"
            >
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Senior Frontend Developer"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-semibold text-textPrimary mb-2"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Tech Corp"
              required
            />
          </div>

          {/* Location and Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-textPrimary mb-2"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., San Francisco, CA"
                required
              />
            </div>

            <div>
              <label
                htmlFor="jobType"
                className="block text-sm font-semibold text-textPrimary mb-2"
              >
                Job Type *
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label
              htmlFor="salaryRange"
              className="block text-sm font-semibold text-textPrimary mb-2"
            >
              Salary Range
            </label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., $80k - $120k"
            />
          </div>

          {/* Required Skills */}
          <div>
            <label
              htmlFor="requiredSkills"
              className="block text-sm font-semibold text-textPrimary mb-2"
            >
              Required Skills *
            </label>
            <input
              type="text"
              id="requiredSkills"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., React, Node.js, TypeScript (comma-separated)"
              required
            />
            <p className="mt-2 text-sm text-textSecondary">
              Enter skills separated by commas
            </p>
          </div>

          {/* Job Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-textPrimary mb-2"
            >
              Job Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="8"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Describe the job role, responsibilities, and requirements..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Updating...' : 'Update Job'}
            </button>
            <Link
              to="/recruiter/jobs"
              className="px-6 py-3 bg-gray-100 text-textPrimary rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

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

export default EditJob;
