import React from 'react';
import { useJobs } from '../../context/JobsContext'; // Custom hook to access JobsContext
import { JobCategory, ExperienceLevel } from '../../types';

const FilterBar: React.FC = () => {
  // Destructure data and functions from JobsContext
  const { filters, updateFilters, filteredJobs, jobs } = useJobs();

  // Array of categories for the category dropdown filter
  const categories: (JobCategory | 'All Categories')[] = [
    'All Categories',
    'Frontend',
    'Backend',
    'Fullstack',
    'Design',
    'Marketing',
    'Data Science',
    'DevOps',
    'Product',
  ];

  // Array of locations for the location dropdown filter
  const locations: string[] = [
    'All Locations',
    'San Francisco, CA',
    'San Francisco, USA',
    'Seattle, USA',
    'London, UK',
    'Remote',
    'Austin, USA',
    'Berlin, Germany',
    'Chicago, USA',
    'Boston, USA',
  ];

  // Array of experience levels for the experience dropdown filter
  const experienceLevels: (ExperienceLevel | 'All Experience')[] = [
    'All Experience',
    'Entry-level',
    'Mid-level',
    'Senior',
    'Lead',
    'Internship',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Search Input */}
        <div className="lg:col-span-4">
          <label htmlFor="search" className="sr-only">
            Search for job title, keywords, or company
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search for job title, keywords..."
              value={filters.searchQuery} // Controlled input from context state
              onChange={(e) => 
                updateFilters({ searchQuery: e.target.value }) // Update context when user types
              }
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Search jobs by title or company"
            />
            {/* Magnifying glass icon */}
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
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
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category} // Controlled by context
            onChange={(e) => 
              updateFilters({ category: e.target.value as JobCategory | 'All Categories' }) // Update context
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            aria-label="Filter by job category"
          >
            {/* Render all category options */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            id="location"
            value={filters.location} // Controlled by context
            onChange={(e) => updateFilters({ location: e.target.value })} // Update context
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            aria-label="Filter by location"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Filter */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <select
            id="experience"
            value={filters.experience} // Controlled by context
            onChange={(e) => 
              updateFilters({ experience: e.target.value as ExperienceLevel | 'All Experience' }) // Update context
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            aria-label="Filter by experience level"
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Filters Button */}
        <div className="flex items-end">
          <button
            onClick={() => {/* Filters apply automatically, no extra code needed */}}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Apply selected filters"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Display number of results */}
      <div className="mt-4 text-sm text-gray-600" role="status" aria-live="polite">
        Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> of{' '}
        <span className="font-semibold text-gray-900">{jobs.length}</span> jobs
      </div>
    </div>
  );
};

export default FilterBar;
