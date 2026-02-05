import React, { useState, useEffect, useRef } from 'react';
import { Job } from '../../types'; // Import types for Job & JobApplication (for type safety)

// Props for the ApplyModal component
interface ApplyModalProps {
  job: Job | null; // Job being applied to, or null if none
  isOpen: boolean; // Controls whether modal is visible
  onClose: () => void; // Function to close the modal
}

// Main ApplyModal component
const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose }) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '', // Applicant's name
    email: '', // Applicant's email
    resume: null as File | null, // Resume file upload
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: '', 
    email: '', 
    resume: '',
  });

  // State to track if form is submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to show success message after submission
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Refs for DOM access
  const modalRef = useRef<HTMLDivElement>(null); // Ref to modal container (optional future use)
  const firstInputRef = useRef<HTMLInputElement>(null); // Ref to focus the first input when modal opens

  // Focus first input field when modal opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = 'unset'; // Unlock scroll
    }

    return () => {
      document.body.style.overflow = 'unset'; // Ensure scroll unlock on unmount
    };
  }, [isOpen]);

  // Reset form and errors when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', resume: null });
      setErrors({ name: '', email: '', resume: '' });
      setSubmitSuccess(false);
    }
  }, [isOpen]);

  // Form validation function
  const validateForm = (): boolean => {
    const newErrors = { name: '', email: '', resume: '' };
    let isValid = true;

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate Resume upload
    if (!formData.resume) {
      newErrors.resume = 'Please upload your resume';
      isValid = false;
    }

    setErrors(newErrors); // Update errors state
    return isValid; // Return overall validation result
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true); // Show loading state

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log application data (replace with actual API call)
    console.log('Application submitted:', {
      jobId: job?.id,
      jobTitle: job?.title,
      applicantName: formData.name,
      applicantEmail: formData.email,
      resume: formData.resume?.name,
    });

    setIsSubmitting(false); // Hide loading state
    setSubmitSuccess(true); // Show success message

    // Automatically close modal after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get first selected file
    setFormData({ ...formData, resume: file }); // Update formData with new file
    if (file) {
      setErrors({ ...errors, resume: '' }); // Clear resume error if file selected
    }
  };

  // Close modal if backdrop (outside modal) is clicked
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Do not render modal if it's closed or job is null
  if (!isOpen || !job) return null;

  return (
    // Backdrop / modal overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal container */}
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 id="modal-title" className="text-xl font-bold text-gray-900 mb-1">
              Apply for {job.title} at {job.company}
            </h2>
            <p className="text-sm text-gray-600">
              Complete your application by filling out the details below.
            </p>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-primary-500 rounded-lg p-1"
            aria-label="Close modal"
          >
            {/* X icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Success message after submission */}
        {submitSuccess && (
          <div className="p-6 bg-green-50 border-b border-green-200">
            <div className="flex items-center gap-3">
              {/* Checkmark icon */}
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-green-900">Application Submitted!</h3>
                <p className="text-sm text-green-700">
                  We'll get back to you soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Job info reminder */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            You are applying for the position of{' '}
            <span className="font-semibold text-gray-900">{job.title}</span> at{' '}
            <span className="font-semibold text-gray-900">{job.company}</span>.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="applicant-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={firstInputRef} // Ref for auto-focus
              id="applicant-name"
              type="text"
              value={formData.name} // Controlled input
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value }); // Update state
                setErrors({ ...errors, name: '' }); // Clear error on change
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Alice Wonderland"
              aria-required="true" // Accessibility: required field
              aria-invalid={!!errors.name} // Accessibility: invalid if error
              aria-describedby={errors.name ? 'name-error' : undefined} // Link error message
              disabled={isSubmitting || submitSuccess} // Disable while submitting or after success
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="applicant-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="applicant-email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="alice.wonderland@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={isSubmitting || submitSuccess}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Resume <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              {/* Custom styled file input */}
              <label
                htmlFor="resume-upload"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  errors.resume ? 'border-red-500' : 'border-gray-300'
                } ${isSubmitting || submitSuccess ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    {formData.resume ? (
                      <span className="font-medium text-primary-600">{formData.resume.name}</span>
                    ) : (
                      <>
                        <span className="text-primary-600 font-medium">Upload a file</span> or drag and
                        drop
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                </div>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="sr-only"
                  aria-required="true"
                  aria-invalid={!!errors.resume}
                  aria-describedby={errors.resume ? 'resume-error' : undefined}
                  disabled={isSubmitting || submitSuccess}
                />
              </label>
            </div>
            {errors.resume && (
              <p id="resume-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.resume}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              disabled={isSubmitting || submitSuccess}
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting || submitSuccess}
            >
              {isSubmitting ? (
                <>
                  {/* Loading spinner */}
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;


//Modal opens (isOpen = true)
//useEffect runs -> checks firstInputRef.current
//firstInputRef.current.focus()  ---> cursor appears in "Full Name" input automatically
