import React from 'react';
import { Job } from '../../types';

/**
 * Props expected by the JobCard component
 * - job: the job data to display
 * - onApply: function called when user clicks "Apply Now"
 * - onViewDetails: function called when user clicks "View Details"
 */
interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetails: (jobId: string) => void;
}

/**
 * JobCard displays a single job listing card
 */
const JobCard: React.FC<JobCardProps> = ({ job, onApply, onViewDetails }) => {

  /**
   * Helper function to format salary nicely for display
   * This function is ONLY used inside this component
   */
  const formatSalary = (min: number, max: number, currency: string) => {

    // If the job is an internship and salary looks hourly, show hourly format
    if (job.experienceLevel === 'Internship' && min < 100) {
      return `$${min} - $${max}/hour`;
    }

    /**
     * Converts large numbers into readable format
     * Example: 50000 → 50k
     */
    const formatNumber = (num: number) => {
      if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}k`;
      }
      return num.toString();
    };

    // Default yearly salary format
    return `$${formatNumber(min)} - $${formatNumber(max)} per year`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
      role="article"
      aria-label={`Job posting for ${job.title} at ${job.company}`}
    >
      {/* ================= HEADER SECTION ================= */}
      <div className="flex items-start justify-between mb-4">

        {/* Left side: Logo + Title */}
        <div className="flex items-start gap-4 flex-1">

          {/* Company Logo (or first letter if no logo exists) */}
          <div
            className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
            aria-hidden="true"
          >
            {job.companyLogo || job.company.charAt(0)}
          </div>

          {/* Job title and company name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {job.title}
            </h3>

            {/* Company name */}
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Office icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {job.company}
            </p>
          </div>
        </div>

        {/* Experience level badge (e.g., Senior, Entry-level) */}
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 whitespace-nowrap"
          aria-label={`Experience level: ${job.experienceLevel}`}
        >
          {job.experienceLevel}
        </span>
      </div>

      {/* ================= JOB DETAILS SECTION ================= */}
      <div className="space-y-2 mb-4">

        {/* Job Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {/* Location pin icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{job.location}</span>
        </div>

        {/* Job type (Full-time, Part-time, Contract, etc.) */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {/* Clock icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{job.jobType}</span>
        </div>

        {/* Salary information */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {/* Money icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          </span>
        </div>
      </div>

      {/* Short preview of job description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex gap-3">

        {/* Apply button – sends entire job object */}
        <button
          onClick={() => onApply(job)}
          className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label={`Apply for ${job.title} position`}
        >
          Apply Now
        </button>

        {/* View details button – sends only job ID */}
        <button
          onClick={() => onViewDetails(job.id)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label={`View details for ${job.title} position`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
