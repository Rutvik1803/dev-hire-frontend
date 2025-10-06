import { useState } from 'react';
import { mockJobs } from '../../data/mockData';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';

const AdminJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const filteredJobs = mockJobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDeleteJob = (jobId) => {
    setToastMessage('Job deleted successfully');
    setShowToast(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Manage Jobs
        </h1>
        <p className="text-textSecondary">
          Oversee all job postings across the platform
        </p>
      </div>

      {/* Search */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mt-4">
          <p className="text-sm text-textSecondary">
            Showing {filteredJobs.length}{' '}
            {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-textPrimary">
                      {job.title}
                    </div>
                    <div className="text-sm text-textSecondary">{job.type}</div>
                  </td>
                  <td className="px-6 py-4 text-textPrimary">{job.company}</td>
                  <td className="px-6 py-4 text-textSecondary">
                    {job.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-textPrimary font-medium">
                      {job.applicants}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-textSecondary">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-textSecondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-textSecondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
      <div className="lg:hidden mt-6 space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-surface rounded-xl shadow-sm border border-border p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-textPrimary mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-textSecondary">{job.company}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {job.status}
              </span>
            </div>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-textSecondary">Location:</span>
                <span className="text-textPrimary">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Type:</span>
                <span className="text-textPrimary">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Applicants:</span>
                <span className="text-textPrimary font-medium">
                  {job.applicants}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Posted:</span>
                <span className="text-textPrimary">
                  {new Date(job.postedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                View Details
              </button>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default AdminJobs;
