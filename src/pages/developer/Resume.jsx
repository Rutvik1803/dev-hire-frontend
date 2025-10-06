import ResumeUploader from '../../components/ResumeUploader';
import { DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Resume = () => {
  const [uploadedResume, setUploadedResume] = useState(null);

  const handleUpload = (file) => {
    setUploadedResume(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">My Resume</h1>
        <p className="text-textSecondary">
          Upload and manage your resume to apply for jobs
        </p>
      </div>

      {/* Current Resume Status */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            {uploadedResume ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <DocumentTextIcon className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-textPrimary mb-2">
              Resume Status
            </h2>
            {uploadedResume ? (
              <p className="text-green-600 font-medium">
                ✓ Resume uploaded and active
              </p>
            ) : (
              <p className="text-textSecondary">No resume uploaded yet</p>
            )}
            <p className="text-sm text-textSecondary mt-1">
              Keep your resume updated to increase your chances of getting
              noticed by recruiters
            </p>
          </div>
        </div>
      </div>

      {/* Resume Uploader */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-8">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">
          {uploadedResume ? 'Update Resume' : 'Upload Resume'}
        </h2>
        <ResumeUploader onUpload={handleUpload} />
      </div>

      {/* Resume Tips */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/20 p-8">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">
          Resume Tips
        </h2>
        <ul className="space-y-3 text-textSecondary">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-3">1.</span>
            <span>
              Keep your resume concise and focused (1-2 pages maximum)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-3">2.</span>
            <span>Highlight your most relevant skills and achievements</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-3">3.</span>
            <span>
              Use clear section headings and bullet points for readability
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-3">4.</span>
            <span>
              Include links to your portfolio, GitHub, or LinkedIn profile
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-3">5.</span>
            <span>Proofread carefully for spelling and grammar errors</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-3">6.</span>
            <span>
              Update your resume regularly with new skills and experiences
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Resume;
