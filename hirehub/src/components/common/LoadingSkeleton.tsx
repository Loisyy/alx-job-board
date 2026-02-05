import React from 'react';

// JobCardSkeleton is a placeholder UI for loading state of a job card
export const JobCardSkeleton: React.FC = () => {
  return (
    // Main container with white background, rounded corners, shadow, border, and pulse animation
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
      
      {/* Top row: company logo and job title placeholders */}
      <div className="flex items-start gap-4 mb-4">
        {/* Placeholder for company logo */}
        <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>

        {/* Placeholder for job title and company name */}
        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Job title */}
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>       {/* Company name */}
        </div>

        {/* Placeholder for some badge or info (e.g., job type) */}
        <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
      </div>

      {/* Middle section: job details placeholders */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-2/3"></div> {/* First line */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div> {/* Second line */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Third line */}
      </div>

      {/* Additional description lines */}
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>

      {/* Bottom row: action buttons placeholders */}
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div> {/* Apply button */}
        <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>  {/* Save button */}
      </div>
    </div>
  );
};
