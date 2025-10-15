import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Loading from './Loading';

const ScheduleInterviewModal = ({
  isOpen,
  onClose,
  onSchedule,
  existingInterview = null,
  applicationId,
}) => {
  const isEdit = !!existingInterview;

  const [formData, setFormData] = useState({
    scheduledDate: '',
    duration: 60,
    meetingLink: '',
    location: 'Virtual',
    interviewerNotes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill form if editing
  useEffect(() => {
    if (existingInterview && existingInterview.scheduledDate) {
      // Convert UTC date to local datetime-local format
      const date = new Date(existingInterview.scheduledDate);

      // Check if date is valid
      if (!isNaN(date.getTime())) {
        const localDateTime = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);

        setFormData({
          scheduledDate: localDateTime,
          duration: existingInterview.duration || 60,
          meetingLink: existingInterview.meetingLink || '',
          location: existingInterview.location || 'Virtual',
          interviewerNotes: existingInterview.interviewerNotes || '',
        });
      } else {
        // Invalid date, reset form
        setFormData({
          scheduledDate: '',
          duration: 60,
          meetingLink: '',
          location: 'Virtual',
          interviewerNotes: '',
        });
      }
    } else {
      // Reset form for new interview
      setFormData({
        scheduledDate: '',
        duration: 60,
        meetingLink: '',
        location: 'Virtual',
        interviewerNotes: '',
      });
    }
    setError('');
  }, [existingInterview, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate date is in the future
    const selectedDate = new Date(formData.scheduledDate);
    const now = new Date();
    if (selectedDate <= now) {
      setError('Interview date must be in the future');
      return;
    }

    setLoading(true);

    try {
      // Convert local datetime to UTC ISO string
      const interviewData = {
        ...(isEdit ? {} : { applicationId }),
        scheduledDate: new Date(formData.scheduledDate).toISOString(),
        duration: parseInt(formData.duration),
        meetingLink: formData.meetingLink.trim() || undefined,
        location: formData.location.trim() || undefined,
        interviewerNotes: formData.interviewerNotes.trim() || undefined,
        ...(isEdit ? { status: 'RESCHEDULED' } : {}),
      };

      await onSchedule(interviewData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-surface shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-primary" />
                    </div>
                    <Dialog.Title className="text-xl font-semibold text-textPrimary">
                      {isEdit ? 'Reschedule Interview' : 'Schedule Interview'}
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="text-textSecondary hover:text-textPrimary transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Date and Time */}
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">
                        Date & Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        disabled={loading}
                      />
                      <p className="text-xs text-textSecondary mt-1">
                        Select a future date and time for the interview
                      </p>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">
                        Duration (minutes){' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        disabled={loading}
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={45}>45 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1.5 hours</option>
                        <option value={120}>2 hours</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Virtual, Office Address"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={loading}
                      />
                    </div>

                    {/* Meeting Link */}
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">
                        Meeting Link
                      </label>
                      <input
                        type="url"
                        name="meetingLink"
                        value={formData.meetingLink}
                        onChange={handleChange}
                        placeholder="https://zoom.us/j/123456789"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={loading}
                      />
                      <p className="text-xs text-textSecondary mt-1">
                        Zoom, Google Meet, or other video conferencing link
                      </p>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">
                        Notes
                      </label>
                      <textarea
                        name="interviewerNotes"
                        value={formData.interviewerNotes}
                        onChange={handleChange}
                        placeholder="Any additional information for the interview..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={loading}
                      className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {isEdit ? 'Rescheduling...' : 'Scheduling...'}
                        </>
                      ) : (
                        <>{isEdit ? 'Reschedule' : 'Schedule Interview'}</>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScheduleInterviewModal;
