import { useState } from 'react';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Loading from './Loading';
import { generateCoverLetter } from '../services/coverLetterService';

const AICoverLetterGenerator = ({ user, job, onGenerated, onClose }) => {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [abortController, setAbortController] = useState(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');

    // Create abort controller
    const controller = new AbortController();
    setAbortController(controller);

    try {
      // Prepare user details
      const userDetails = {
        name: user?.name || 'Applicant',
        email: user?.email,
        ...(user?.experience && { experience: user.experience }),
        ...(user?.skills && { skills: user.skills }),
        ...(user?.phone && { phone: user.phone }),
        ...(user?.linkedinUrl && { linkedinUrl: user.linkedinUrl }),
        ...(user?.githubUrl && { githubUrl: user.githubUrl }),
      };

      // Prepare job description
      const jobDescription = {
        title: job?.title || '',
        companyName: job?.companyName || '',
        description: job?.description || '',
        ...(job?.requiredSkills && { requiredSkills: job.requiredSkills }),
        ...(job?.location && { location: job.location }),
        ...(job?.jobType && { jobType: job.jobType }),
      };

      const data = await generateCoverLetter(
        userDetails,
        jobDescription,
        controller.signal
      );

      if (!controller.signal.aborted && data?.coverLetter) {
        onGenerated(data.coverLetter);
        onClose();
      }
    } catch (err) {
      if (err.name === 'AbortError' || controller.signal.aborted) {
        console.log('Cover letter generation cancelled');
        return;
      }

      console.error('Error generating cover letter:', err);
      setError(
        err.message || 'Failed to generate cover letter. Please try again.'
      );
    } finally {
      if (!controller.signal.aborted) {
        setGenerating(false);
        setAbortController(null);
      }
    }
  };

  const handleClose = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-textPrimary">
              AI Cover Letter Generator
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-textSecondary hover:text-textPrimary transition-colors"
            disabled={generating}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!generating && !error && (
            <>
              <p className="text-textSecondary mb-4">
                Let AI create a personalized cover letter for you based on your
                profile and the job requirements.
              </p>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-textPrimary mb-2">
                  This will generate a cover letter for:
                </p>
                <p className="text-sm text-textSecondary">
                  <strong>{job?.title}</strong> at{' '}
                  <strong>{job?.companyName}</strong>
                </p>
              </div>
            </>
          )}

          {generating && (
            <div className="text-center py-8">
              <Loading />
              <p className="text-textSecondary mt-4">
                Generating your personalized cover letter...
              </p>
              <p className="text-sm text-textSecondary mt-2">
                This may take a few moments
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XMarkIcon className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleGenerate}
                className="text-primary hover:underline font-medium"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!generating && !error && (
          <div className="p-6 border-t border-border flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-2"
            >
              <SparklesIcon className="w-5 h-5" />
              Generate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoverLetterGenerator;
