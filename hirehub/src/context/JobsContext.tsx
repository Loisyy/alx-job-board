import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, FilterState } from '../types';
import { fetchJobs } from '../api/jobsApi';

// Define context shape
interface JobsContextType {
  jobs: Job[];
  filteredJobs: Job[];
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

// Create context with undefined default
const JobsContext = createContext<JobsContextType | undefined>(undefined);

// Initial filter state
const initialFilters: FilterState = {
  category: 'All Categories',
  location: 'All Locations',
  experience: 'All Experience',
  searchQuery: '',
};

// Provider props
interface JobsProviderProps {
  children: ReactNode;
}

// Jobs Provider Component
export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs on mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchJobs();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Apply filters whenever filters or jobs change
  useEffect(() => {
    let result = [...jobs];

    // Filter by category
    if (filters.category !== 'All Categories') {
      result = result.filter(job => job.category === filters.category);
    }

    // Filter by location
    if (filters.location !== 'All Locations') {
      result = result.filter(job => job.location === filters.location);
    }

    // Filter by experience
    if (filters.experience !== 'All Experience') {
      result = result.filter(job => job.experienceLevel === filters.experience);
    }

    // Filter by search query (searches in title and company)
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query)
      );
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  // Update filters function
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset filters function
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const value: JobsContextType = {
    jobs,
    filteredJobs,
    filters,
    isLoading,
    error,
    updateFilters,
    resetFilters,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

// Custom hook to use JobsContext
export const useJobs = (): JobsContextType => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};