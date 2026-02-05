import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobsContext';
import JobCard from './JobCard';
import { Job } from '../../types';

interface JobListProps {
  onOpenApplyModal: (job: Job) => void; // Callback when "Apply" is clicked
}

const JobList: React.FC<JobListProps> = ({ onOpenApplyModal }) => {
  const { filteredJobs, isLoading, error } = useJobs(); // Get jobs and state from context
  const navigate = useNavigate();


  // Handler for "View Details" action
  const handleViewDetails = (jobId: string) => {
    // Implement navigation to job detail page
    navigate(`/job/${jobId}`);
    window.scrollTo(0,0);
    
  };

  // -------------------------------
  // Loading State
  // -------------------------------
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-12"
        role="status" // Marks as a status message for screen readers
        aria-live="polite" // Updates announced politely without interrupting
      >
        <div className="text-center">
          {/* Spinner */}
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  // -------------------------------
  // Error State
  // -------------------------------
  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
        role="alert" // Marks as an alert for screen readers
        aria-live="assertive" // Immediately announces to screen readers
      >
        {/* Decorative error icon */}
        <svg
          className="w-12 h-12 text-red-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true" // Hides icon from screen readers
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Jobs</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // -------------------------------
  // Empty State (No matching jobs)
  // -------------------------------
  if (filteredJobs.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        {/* Decorative search icon */}
        <svg
          className="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
        <p className="text-gray-600 mb-4">
          We couldn't find any jobs matching your criteria.
        </p>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or search terms to see more results.
        </p>
      </div>
    );
  }

  // -------------------------------
  // Jobs Grid
  // -------------------------------
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Latest Job Listings
      </h2>

      {/* Job List Container */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list" // Marks container as a list for accessibility
        aria-label="Job listings" // Provides label for screen readers
      >
        {filteredJobs.map((job) => (
          <div key={job.id} role="listitem">
            {/* JobCard Component */}
            <JobCard
              job={job}
              onApply={onOpenApplyModal} // Callback when Apply clicked
              onViewDetails={handleViewDetails} // Callback for viewing details
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
