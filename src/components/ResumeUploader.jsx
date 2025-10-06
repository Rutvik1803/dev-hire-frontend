import { useState } from 'react';
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const ResumeUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      if (onUpload) onUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      if (onUpload) onUpload(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <DocumentArrowUpIcon className="w-16 h-16 mx-auto mb-4 text-textSecondary" />
          <h3 className="text-lg font-semibold text-textPrimary mb-2">
            Upload your resume
          </h3>
          <p className="text-textSecondary mb-4">
            Drag and drop your PDF file here, or click to browse
          </p>
          <label className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer font-medium">
            Choose File
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-textSecondary mt-3">
            PDF files only, max 5MB
          </p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <DocumentTextIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-textPrimary">
                  {selectedFile.name}
                </h4>
                <p className="text-sm text-textSecondary">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-textSecondary" />
            </button>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Upload Resume
            </button>
            <label className="flex-1 bg-gray-100 text-textPrimary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-center">
              Change File
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
