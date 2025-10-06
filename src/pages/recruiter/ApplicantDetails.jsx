import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockApplicants } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import Toast from '../../components/Toast';
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CalendarIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const ApplicantDetails = () => {
  const { id } = useParams();
  const applicant = mockApplicants.find((a) => a.id === parseInt(id));
  const [status, setStatus] = useState(applicant?.status || 'Applied');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!applicant) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">
          Applicant not found
        </h2>
        <Link to="/recruiter/jobs" className="text-primary hover:underline">
          Back to jobs
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setToastMessage(`Applicant status updated to ${newStatus}`);
    setShowToast(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to={`/recruiter/jobs/${applicant.jobId}`}
        className="inline-flex items-center text-textSecondary hover:text-textPrimary mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Applicants
      </Link>

      {/* Applicant Header */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-textPrimary mb-2">
              {applicant.name}
            </h1>
            <p className="text-lg text-textSecondary">
              {applicant.experience} of experience
            </p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-border">
          <div className="flex items-center text-textSecondary">
            <EnvelopeIcon className="w-5 h-5 mr-3" />
            <a
              href={`mailto:${applicant.email}`}
              className="hover:text-primary"
            >
              {applicant.email}
            </a>
          </div>
          <div className="flex items-center text-textSecondary">
            <CalendarIcon className="w-5 h-5 mr-3" />
            <span>
              Applied on {new Date(applicant.appliedDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-textSecondary">
            <BriefcaseIcon className="w-5 h-5 mr-3" />
            <span>{applicant.jobTitle}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <DocumentTextIcon className="w-5 h-5 mr-3" />
            <a
              href={applicant.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {applicant.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Status Management */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">
          Update Application Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Applied', 'In Review', 'Accepted', 'Rejected'].map(
            (statusOption) => (
              <button
                key={statusOption}
                onClick={() => handleStatusChange(statusOption)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  status === statusOption
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-textPrimary hover:bg-gray-200'
                }`}
              >
                {statusOption}
              </button>
            )
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold">
            Schedule Interview
          </button>
          <a
            href={`mailto:${applicant.email}`}
            className="bg-gray-100 text-textPrimary px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center"
          >
            Send Email
          </a>
          <a
            href={applicant.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 text-textPrimary px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center"
          >
            Download Resume
          </a>
        </div>
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

export default ApplicantDetails;
