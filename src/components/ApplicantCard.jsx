import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  EnvelopeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import StatusBadge from './StatusBadge';

const ApplicantCard = ({ applicant }) => {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary mb-1">
            {applicant.name}
          </h3>
          <p className="text-textSecondary text-sm">
            {applicant.experience} experience
          </p>
        </div>
        <StatusBadge status={applicant.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-textSecondary">
          <EnvelopeIcon className="w-4 h-4 mr-2" />
          {applicant.email}
        </div>
        <div className="flex items-center text-sm text-textSecondary">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Applied on {new Date(applicant.appliedDate).toLocaleDateString()}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {applicant.skills?.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <a
          href={applicant.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-textPrimary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          <DocumentTextIcon className="w-4 h-4" />
          View Resume
        </a>
        <Link
          to={`/recruiter/applicants/${applicant.id}`}
          className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ApplicantCard;
