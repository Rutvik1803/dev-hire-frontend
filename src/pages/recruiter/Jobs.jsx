import { Link } from 'react-router-dom';
import { mockJobs } from '../../data/mockData';
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const RecruiterJobs = () => {
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
                  Applicants
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
              {mockJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-textPrimary">
                        {job.title}
                      </div>
                      <div className="text-sm text-textSecondary">
                        {job.company}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-textSecondary">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 text-textSecondary">{job.type}</td>
                  <td className="px-6 py-4">
                    <span className="text-textPrimary font-medium">
                      {job.applicants}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/recruiter/jobs/${job.id}`}
                        className="p-2 text-textSecondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="View Applicants"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </Link>
                      <button
                        className="p-2 text-textSecondary hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Job"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
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
      <div className="lg:hidden space-y-4 mt-6">
        {mockJobs.map((job) => (
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
            </div>
            <div className="flex gap-2">
              <Link
                to={`/recruiter/jobs/${job.id}`}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center font-medium"
              >
                View Applicants
              </Link>
              <button className="px-4 py-2 bg-gray-100 text-textPrimary rounded-lg hover:bg-gray-200 transition-colors">
                <PencilIcon className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-gray-100 text-textPrimary rounded-lg hover:bg-gray-200 transition-colors">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterJobs;
