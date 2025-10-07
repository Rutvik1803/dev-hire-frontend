import { useState, useEffect } from 'react';
import JobCard from '../../components/JobCard';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { getAllJobs } from '../../services/jobService';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';

const DeveloperJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (error) {
      let errorMessage = 'Failed to load jobs. Please try again.';

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

  // Extract all unique skills from jobs
  const allSkills = [
    ...new Set(jobs.flatMap((job) => job.requiredSkills || [])),
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || job.jobType === selectedType;
    const matchesSkill =
      selectedSkill === 'all' ||
      (job.requiredSkills || []).includes(selectedSkill);
    return matchesSearch && matchesType && matchesSkill;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Browse Jobs
        </h1>
        <p className="text-textSecondary">
          Find your next opportunity from {jobs.length} available positions
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
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative">
              <AdjustmentsHorizontalIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary pointer-events-none" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Skills</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-textSecondary">
            Showing {filteredJobs.length}{' '}
            {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
          {(searchQuery ||
            selectedType !== 'all' ||
            selectedSkill !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setSelectedSkill('all');
              }}
              className="text-sm text-primary hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm border border-border p-12 text-center">
          <p className="text-textSecondary text-lg">
            {jobs.length === 0
              ? 'No jobs available at the moment'
              : 'No jobs found matching your criteria'}
          </p>
          {(searchQuery ||
            selectedType !== 'all' ||
            selectedSkill !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setSelectedSkill('all');
              }}
              className="mt-4 text-primary hover:underline font-medium"
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

export default DeveloperJobs;
