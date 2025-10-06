import { Link } from 'react-router-dom';
import { mockJobs, mockApplicants, dashboardStats } from '../../data/mockData';
import {
  BriefcaseIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const RecruiterDashboard = () => {
  const stats = dashboardStats.recruiter;
  const recentJobs = mockJobs.slice(0, 3);
  const recentApplicants = mockApplicants.slice(0, 4);

  const statCards = [
    {
      label: 'Jobs Posted',
      value: stats.jobsPosted,
      icon: BriefcaseIcon,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Applicants',
      value: stats.totalApplicants,
      icon: UsersIcon,
      color: 'bg-purple-500',
    },
    {
      label: 'In Review',
      value: stats.inReview,
      icon: ClockIcon,
      color: 'bg-yellow-500',
    },
    {
      label: 'Hired',
      value: stats.hired,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Recruiter Dashboard
        </h1>
        <p className="text-textSecondary">
          Manage your job postings and review candidates
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-surface rounded-xl shadow-sm border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-textPrimary mb-1">
                {stat.value}
              </div>
              <div className="text-textSecondary text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Jobs */}
        <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-textPrimary">
              Recent Job Posts
            </h2>
            <Link
              to="/recruiter/jobs"
              className="text-primary hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <Link
                key={job.id}
                to={`/recruiter/jobs/${job.id}`}
                className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold text-textPrimary mb-1">
                  {job.title}
                </h3>
                <p className="text-textSecondary text-sm mb-2">
                  {job.location}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-textSecondary">
                    {job.applicants} applicants
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    {job.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-textPrimary">
              Recent Applicants
            </h2>
            <Link
              to="/recruiter/jobs"
              className="text-primary hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentApplicants.map((applicant) => (
              <Link
                key={applicant.id}
                to={`/recruiter/applicants/${applicant.id}`}
                className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-textPrimary">
                    {applicant.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      applicant.status === 'Accepted'
                        ? 'bg-green-100 text-green-700'
                        : applicant.status === 'Rejected'
                        ? 'bg-red-100 text-red-700'
                        : applicant.status === 'In Review'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {applicant.status}
                  </span>
                </div>
                <p className="text-textSecondary text-sm">
                  {applicant.jobTitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/recruiter/jobs/new"
          className="bg-gradient-to-br from-primary to-secondary text-white rounded-xl p-8 hover:shadow-lg transition-shadow"
        >
          <BriefcaseIcon className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Post New Job</h3>
          <p className="text-white/90">
            Create a new job posting and find top talent
          </p>
        </Link>
        <Link
          to="/recruiter/jobs"
          className="bg-surface border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
        >
          <UsersIcon className="w-10 h-10 mb-4 text-primary" />
          <h3 className="text-xl font-semibold text-textPrimary mb-2">
            Manage Applications
          </h3>
          <p className="text-textSecondary">
            Review and manage candidate applications
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
