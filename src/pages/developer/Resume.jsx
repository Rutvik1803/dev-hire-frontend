import ResumeUploader from '../../components/ResumeUploader';
import {
  DocumentTextIcon,
  CheckCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import {
  getResumeDetails,
  uploadResume,
  deleteResume,
  validateResumeFile,
  formatFileSize,
} from '../../services/developerService';

const Resume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchResumeDetails();
  }, []);

  const fetchResumeDetails = async () => {
    setLoading(true);
    try {
      const data = await getResumeDetails();
      setResumeData(data);
    } catch (error) {
      let errorMessage = 'Failed to load resume details.';

      if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    // Validate file
    const validation = validateResumeFile(file);
    if (!validation.valid) {
      setToast({
        type: 'error',
        message: validation.error,
      });
      return;
    }

    setUploading(true);
    try {
      const data = await uploadResume(file);

      setToast({
        type: 'success',
        message: 'Resume uploaded successfully!',
      });

      // Refresh resume details
      await fetchResumeDetails();
    } catch (error) {
      let errorMessage = 'Failed to upload resume.';

      if (error.status === 400) {
        errorMessage = error.message || 'Invalid file format or size.';
      } else if (error.status === 413) {
        errorMessage = 'File size too large. Maximum size is 5MB.';
      } else if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your resume?')) {
      return;
    }

    setDeleting(true);
    try {
      await deleteResume();

      setToast({
        type: 'success',
        message: 'Resume deleted successfully',
      });

      setResumeData(null);
    } catch (error) {
      let errorMessage = 'Failed to delete resume.';

      if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleDownload = () => {
    if (resumeData?.resumeUrl) {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
      const fullUrl = `${baseUrl}${resumeData.resumeUrl}`;
      window.open(fullUrl, '_blank');
    }
  };

  if (loading) {
    return <Loading />;
  }

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
            {resumeData ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <DocumentTextIcon className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-textPrimary mb-2">
              Resume Status
            </h2>
            {resumeData ? (
              <>
                <p className="text-green-600 font-medium mb-2">
                  ✓ Resume uploaded and active
                </p>
                <div className="text-sm text-textSecondary space-y-1">
                  <p>
                    <span className="font-medium">File:</span>{' '}
                    {resumeData.fileName || 'Resume.pdf'}
                  </p>
                  {resumeData.fileSize && (
                    <p>
                      <span className="font-medium">Size:</span>{' '}
                      {formatFileSize(resumeData.fileSize)}
                    </p>
                  )}
                  {resumeData.uploadedAt && (
                    <p>
                      <span className="font-medium">Uploaded:</span>{' '}
                      {new Date(resumeData.uploadedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    View Resume
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <TrashIcon className="w-4 h-4" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-textSecondary">No resume uploaded yet</p>
            )}
            <p className="text-sm text-textSecondary mt-2">
              Keep your resume updated to increase your chances of getting
              noticed by recruiters
            </p>
          </div>
        </div>
      </div>

      {/* Resume Uploader */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-8 mb-8">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">
          {resumeData ? 'Update Resume' : 'Upload Resume'}
        </h2>
        <ResumeUploader onUpload={handleUpload} uploading={uploading} />
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

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Resume;
