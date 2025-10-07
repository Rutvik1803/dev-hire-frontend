import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { convertJobTypeToFrontend } from '../services/jobService';

const JobCard = ({ job, showActions = true, actionButton }) => {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary mb-1">
            {job.title}
          </h3>
          <p className="text-textSecondary font-medium">
            {job.companyName || job.company}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-textSecondary">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-textSecondary">
          <BriefcaseIcon className="w-4 h-4 mr-2" />
          {job.jobType ? convertJobTypeToFrontend(job.jobType) : job.type}
        </div>
        {(job.salaryRange || job.salary) && (
          <div className="flex items-center text-sm text-textSecondary">
            <CurrencyDollarIcon className="w-4 h-4 mr-2" />
            {job.salaryRange || job.salary}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(job.requiredSkills || job.skills || [])
          .slice(0, 4)
          .map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        {(job.requiredSkills || job.skills || []).length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-textSecondary rounded-lg text-xs font-medium">
            +{(job.requiredSkills || job.skills).length - 4} more
          </span>
        )}
      </div>

      {showActions && (
        <div className="flex gap-2">
          {actionButton ? (
            actionButton
          ) : (
            <Link
              to={`/developer/jobs/${job.id}`}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center font-medium"
            >
              View Details
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCard;
