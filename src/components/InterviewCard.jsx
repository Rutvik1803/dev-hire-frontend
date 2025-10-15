import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  VideoCameraIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import {
  formatInterviewDate,
  formatInterviewTime,
  getInterviewStatusDisplay,
  getInterviewStatusColor,
} from '../services/interviewService';

const InterviewCard = ({ interview, onEdit, showEditButton = false }) => {
  if (!interview) {
    return null;
  }

  const interviewDate = new Date(interview.scheduledDate);
  const now = new Date();
  const isPast = interviewDate < now;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <CalendarIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-textPrimary text-lg">
              Interview Scheduled
            </h3>
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${getInterviewStatusColor(
                interview.status
              )}`}
            >
              {getInterviewStatusDisplay(interview.status)}
            </span>
          </div>
        </div>
        {showEditButton && !isPast && interview.status !== 'CANCELLED' && (
          <button
            onClick={onEdit}
            className="p-2 rounded-lg bg-white border border-border hover:border-primary transition-colors"
            title="Reschedule interview"
          >
            <PencilIcon className="w-5 h-5 text-primary" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Date */}
        <div className="flex items-start gap-3">
          <CalendarIcon className="w-5 h-5 text-textSecondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-textSecondary">Date</p>
            <p className="font-medium text-textPrimary">
              {formatInterviewDate(interview.scheduledDate)}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-3">
          <ClockIcon className="w-5 h-5 text-textSecondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-textSecondary">Time</p>
            <p className="font-medium text-textPrimary">
              {formatInterviewTime(interview.scheduledDate)} (
              {interview.duration} minutes)
            </p>
          </div>
        </div>

        {/* Location */}
        {interview.location && (
          <div className="flex items-start gap-3">
            <MapPinIcon className="w-5 h-5 text-textSecondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-textSecondary">Location</p>
              <p className="font-medium text-textPrimary">
                {interview.location}
              </p>
            </div>
          </div>
        )}

        {/* Meeting Link */}
        {interview.meetingLink && (
          <div className="flex items-start gap-3">
            <VideoCameraIcon className="w-5 h-5 text-textSecondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-textSecondary">Meeting Link</p>
              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline break-all"
              >
                {interview.meetingLink}
              </a>
            </div>
          </div>
        )}

        {/* Notes (for recruiter view) */}
        {interview.interviewerNotes && (
          <div className="mt-4 p-3 bg-white/50 rounded-lg border border-border">
            <p className="text-sm text-textSecondary mb-1">Notes</p>
            <p className="text-sm text-textPrimary whitespace-pre-wrap">
              {interview.interviewerNotes}
            </p>
          </div>
        )}
      </div>

      {/* Status Message */}
      {isPast && interview.status === 'SCHEDULED' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            ⏰ This interview time has passed
          </p>
        </div>
      )}

      {interview.status === 'CANCELLED' && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            ❌ This interview was cancelled
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewCard;
