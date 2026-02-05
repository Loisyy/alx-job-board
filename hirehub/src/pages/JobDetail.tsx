import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchJobById } from '../api/jobsAPI';
import { Job } from '../types';
import ApplyModal from '../components/jobs/ApplyModal';
import ScrollToTop from '../components/common/ScrollToTop';

const JobDetail: React.FC = () => {
  // Get the dynamic job ID from the URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State to store the fetched job data
  const [job, setJob] = useState<Job | null>(null);

  // Loading and error states for the API call
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal open state for applying to job
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for tracking if job is saved by the user
  const [isSaved, setIsSaved] = useState(false);

  // Fetch job details whenever `id` changes
  useEffect(() => {
    const loadJob = async () => {
      if (!id) return; // If no ID in URL, exit

      try {
        setIsLoading(true); // Show spinner
        setError(null);     // Clear previous errors
        const data = await fetchJobById(id); // Fetch job by ID
        
        if (!data) {
          setError('Job not found'); // Show error if no job returned
        } else {
          setJob(data); // Store job in state for rendering
        }
      } catch (err) {
        setError('Failed to load job details'); // Catch API/network errors
        console.error('Error fetching job:', err);
      } finally {
        setIsLoading(false); // Stop spinner regardless of success/error
      }
    };

    loadJob();
  }, [id]);

  // Open the apply modal
  const handleApply = () => {
    setIsModalOpen(true);
  };

  // Toggle job save state
  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  // -------------------------------
  // Conditional rendering for loading/error states
  // -------------------------------

  // Show spinner while loading job data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12" role="status">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Show error message if API fails or job not found
  if (error || !job) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        {/* Error icon */}
        <svg
          className="w-12 h-12 text-red-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          {error || 'Job Not Found'}
        </h3>
        <Link
          to="/"
          className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Job Listings
        </Link>
      </div>
    );
  }

  // Helper function to format salary display
  const formatSalary = (min: number, max: number, currency: string) => {
    if (job.experienceLevel === 'Internship' && min < 100) {
      return `$${min} - $${max}/hour`;
    }
    const formatNumber = (num: number) => {
      return num >= 1000 ? `$${(num / 1000).toFixed(0)}k` : `$${num}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)} per year`;
  };

  // -------------------------------
  // Main UI rendering
  // -------------------------------
  return (
    <>
      {/* Back button to return to job listings */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Job Listings
      </Link>

      {/* Job Header: company logo, title, basic info, action buttons */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {job.companyLogo || job.company.charAt(0)}
            </div>

            {/* Job Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-lg text-gray-600 mb-4">
                {job.company} • {job.location}
              </p>

              {/* Tags: experience, type, category */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                  {job.experienceLevel}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  {job.jobType}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  {job.category}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Apply and Save */}
          <div className="flex gap-3">
            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Apply Now
            </button>

            {/* Save/Unsave Job Button */}
            <button
              onClick={handleSaveJob}
              className={`px-4 py-3 border rounded-lg font-medium transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                isSaved
                  ? 'bg-primary-50 border-primary-600 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-label={isSaved ? 'Unsave job' : 'Save job'}
            >
              <svg
                className="w-5 h-5"
                fill={isSaved ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/main section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex gap-3">
                  <svg
                    className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5"
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
                  <span className="text-gray-700">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifications</h2>
            <ul className="space-y-3">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="flex gap-3">
                  <svg
                    className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5"
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
                  <span className="text-gray-700">{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* About company */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {job.company}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{job.companyDescription}</p>
            {/* Company links */}
            {(job.companyWebsite || job.companyLinkedin) && (
              <div className="flex gap-4">
                {job.companyWebsite && (
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Visit Website
                  </a>
                )}
                {job.companyLinkedin && (
                  <a
                    href={job.companyLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Job Overview Card */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Job Overview</h3>

            {/* Overview details */}
            <div className="space-y-4">
              {/* Salary */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  Salary
                </div>
                <p className="text-gray-900 font-semibold">
                  {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                </p>
              </div>

              {/* Job type */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  Job Type
                </div>
                <p className="text-gray-900 font-semibold">{job.jobType}</p>
              </div>

              {/* Experience level */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  Experience
                </div>
                <p className="text-gray-900 font-semibold">{job.experienceLevel}</p>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="w-full mt-6 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal job={job} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        {/*Scroll to Top Button*/}
        <ScrollToTop/>
    </>
  );
};

export default JobDetail;
