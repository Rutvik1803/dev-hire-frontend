import { useParams, Link } from 'react-router-dom';
import { mockJobs } from '../../data/mockData';
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Toast from '../../components/Toast';

const JobDetails = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === parseInt(id));
  const [showToast, setShowToast] = useState(false);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">
          Job not found
        </h2>
        <Link to="/developer/jobs" className="text-primary hover:underline">
          Back to jobs
        </Link>
      </div>
    );
  }

  const handleApply = () => {
    setShowToast(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/developer/jobs"
        className="inline-flex items-center text-textSecondary hover:text-textPrimary mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Jobs
      </Link>

      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary mb-2">
              {job.title}
            </h1>
            <p className="text-xl text-textSecondary font-medium">
              {job.company}
            </p>
          </div>
          <span className="mt-4 sm:mt-0 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {job.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex items-center text-textSecondary">
            <MapPinIcon className="w-5 h-5 mr-3" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <BriefcaseIcon className="w-5 h-5 mr-3" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <CurrencyDollarIcon className="w-5 h-5 mr-3" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <CalendarIcon className="w-5 h-5 mr-3" />
            <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-3">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-3">
            Job Description
          </h2>
          <p className="text-textSecondary leading-relaxed">
            {job.description}
          </p>
          <p className="text-textSecondary leading-relaxed mt-4">
            We're looking for a talented developer to join our growing team.
            You'll work on cutting-edge projects, collaborate with skilled
            professionals, and have opportunities for growth and development.
          </p>
          <p className="text-textSecondary leading-relaxed mt-4">
            The ideal candidate should have strong problem-solving skills,
            attention to detail, and a passion for creating high-quality
            software. Experience with the listed technologies is required.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-3">
            What We Offer
          </h2>
          <ul className="space-y-2 text-textSecondary">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Competitive salary and equity package
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Flexible working hours and remote options
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Health insurance and wellness benefits
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Professional development opportunities
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Modern office with latest technology
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleApply}
            className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            Apply Now
          </button>
          <button className="flex-1 bg-gray-100 text-textPrimary px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
            Save for Later
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-textPrimary mb-4">
          About {job.company}
        </h2>
        <p className="text-textSecondary leading-relaxed mb-4">
          {job.company} is a leading technology company focused on innovation
          and excellence. We're committed to creating products that make a
          difference and building a team of talented individuals who share our
          vision.
        </p>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-semibold text-textPrimary">
              Company Size:
            </span>
            <span className="text-textSecondary ml-2">50-200 employees</span>
          </div>
          <div>
            <span className="font-semibold text-textPrimary">Industry:</span>
            <span className="text-textSecondary ml-2">Technology</span>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message="Application submitted successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default JobDetails;
