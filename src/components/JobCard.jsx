import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const JobCard = ({ job, showActions = true, actionButton }) => {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary mb-1">
            {job.title}
          </h3>
          <p className="text-textSecondary font-medium">{job.company}</p>
        </div>
        {job.status && (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            {job.status}
          </span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-textSecondary">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-textSecondary">
          <BriefcaseIcon className="w-4 h-4 mr-2" />
          {job.type}
        </div>
        {job.salary && (
          <div className="flex items-center text-sm text-textSecondary">
            <CurrencyDollarIcon className="w-4 h-4 mr-2" />
            {job.salary}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills?.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium"
          >
            {skill}
          </span>
        ))}
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
