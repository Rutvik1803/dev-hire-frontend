import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import { createJob, convertJobType } from '../../services/jobService';

const NewJob = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: 'FULL_TIME',
    salaryRange: '',
    skills: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      // Parse skills from comma-separated string
      const skillsArray = formData.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      // Validate skills
      if (skillsArray.length === 0) {
        setToast({
          type: 'error',
          message: 'Please enter at least one required skill.',
        });
        setLoading(false);
        return;
      }

      // Prepare job data
      const jobData = {
        title: formData.title,
        companyName: formData.companyName,
        location: formData.location,
        jobType: formData.jobType,
        salaryRange: formData.salaryRange,
        requiredSkills: skillsArray,
        description: formData.description,
      };

      // Create job via API
      await createJob(jobData);

      // Show success message
      setToast({
        type: 'success',
        message: 'Job posted successfully! Redirecting...',
      });

      // Navigate after short delay
      setTimeout(() => {
        navigate('/recruiter/jobs');
      }, 1500);
    } catch (error) {
      // Handle errors
      let errorMessage = 'Failed to post job. Please try again.';

      if (error.status === 400) {
        errorMessage = error.message || 'Please check all required fields.';
      } else if (error.status === 401) {
        errorMessage = 'Please log in to post a job.';
      } else if (error.status === 403) {
        errorMessage = 'You do not have permission to post jobs.';
      } else if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        type: 'error',
        message: errorMessage,
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Post a New Job
        </h1>
        <p className="text-textSecondary">
          Fill in the details to create a new job posting
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface rounded-xl shadow-sm border border-border p-8"
      >
        <div className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Developer"
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. TechCorp Inc."
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={loading}
            />
          </div>

          {/* Location and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-textPrimary mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA or Remote"
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-textPrimary mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
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
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              Salary Range <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="e.g. $100,000 - $150,000"
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={loading}
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. React, TypeScript, Node.js (comma separated)"
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={loading}
            />
            <p className="text-xs text-textSecondary mt-1">
              Separate skills with commas
            </p>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-semibold text-textPrimary mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows="6"
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
              disabled={loading}
            ></textarea>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/recruiter/jobs')}
              disabled={loading}
              className="flex-1 bg-gray-100 text-textPrimary px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting Job...' : 'Post Job'}
            </button>
          </div>
        </div>
      </form>

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

export default NewJob;
