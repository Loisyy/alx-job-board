import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Job, FilterState } from "../types";
import { fetchJobs } from "../api/jobsAPI";

/* =====================================================
   1. DEFINE THE SHAPE OF THE CONTEXT (BLUEPRINT)
   -----------------------------------------------------
   This interface describes:
   - what data the context will store
   - what functions it will expose
   Anyone using this context MUST match this shape
===================================================== */
interface JobsContextType {
  jobs: Job[]; // all jobs fetched from API
  filteredJobs: Job[]; // jobs after applying filters
  filters: FilterState; // current filter values
  isLoading: boolean; // loading indicator
  error: string | null; // error message (if any)
  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

/* =====================================================
   2. CREATE THE CONTEXT
   -----------------------------------------------------
   - We start with `undefined` because the real value
     will be provided by JobsProvider
   - TypeScript helps ensure correct usage
===================================================== */
const JobsContext = createContext<JobsContextType | undefined>(undefined);

/* =====================================================
   3. INITIAL FILTER VALUES
   -----------------------------------------------------
   Used when the app first loads or when filters reset
===================================================== */
const initialFilters: FilterState = {
  category: "All Categories",
  location: "All Locations",
  experience: "All Experience",
  searchQuery: "",
};

/* =====================================================
   4. PROPS FOR THE PROVIDER
   -----------------------------------------------------
   Provider must wrap other components, so it receives
   `children`
===================================================== */
interface JobsProviderProps {
  children: ReactNode;
}

/* =====================================================
   5. JOBS PROVIDER COMPONENT
   -----------------------------------------------------
   This component:
   - holds global state
   - fetches jobs
   - applies filters
   - shares everything via Context
===================================================== */
export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
  // All jobs from API
  const [jobs, setJobs] = useState<Job[]>([]);

  // Jobs after filtering
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Current filter state
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Error state
  const [error, setError] = useState<string | null>(null);

  /* =================================================
     6. FETCH JOBS WHEN COMPONENT MOUNTS
     -------------------------------------------------
     Runs ONCE when the provider loads
  ================================================= */
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true); // show loading
        setError(null); // clear old errors

        const data = await fetchJobs(); // fetch jobs
        setJobs(data); // save jobs
        setFilteredJobs(data); // show all initially
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false); // stop loading
      }
    };

    loadJobs();
  }, []); // empty dependency array → runs once

  /* =================================================
     7. APPLY FILTERS WHENEVER:
        - jobs change
        - filters change
  ================================================= */
  useEffect(() => {
    // Make a copy so we don’t mutate state directly
    let result = [...jobs];

    // Filter by category
    if (filters.category !== "All Categories") {
      result = result.filter((job) => job.category === filters.category);
    }

    // Filter by location
    if (filters.location !== "All Locations") {
      result = result.filter((job) => job.location === filters.location);
    }

    // Filter by experience level
    if (filters.experience !== "All Experience") {
      result = result.filter(
        (job) => job.experienceLevel === filters.experience,
      );
    }

    // Search filter (title or company)
    if (filters.searchQuery.trim() !== "") {
      const query = filters.searchQuery.toLowerCase();

      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query),
      );
    }

    // Save filtered results
    setFilteredJobs(result);
  }, [filters, jobs]); // rerun when filters or jobs change

  /* =================================================
     8. UPDATE FILTERS
     -------------------------------------------------
     - Accepts partial updates
     - Merges new filters with old ones
  ================================================= */
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev, // keep existing filters
      ...newFilters, // override changed ones
    }));
  };

  /* =================================================
     9. RESET FILTERS TO DEFAULT
  ================================================= */
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  /* =================================================
     10. VALUE PASSED TO CONTEXT
     -------------------------------------------------
     This is what ALL consumers will receive
  ================================================= */
  const value: JobsContextType = {
    jobs,
    filteredJobs,
    filters,
    isLoading,
    error,
    updateFilters,
    resetFilters,
  };

  /* =================================================
     11. PROVIDE THE CONTEXT TO CHILD COMPONENTS
  ================================================= */
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

/* =====================================================
   12. CUSTOM HOOK FOR CONSUMING CONTEXT
   -----------------------------------------------------
   - Makes usage cleaner
   - Prevents usage outside provider
===================================================== */
export const useJobs = (): JobsContextType => {
  const context = useContext(JobsContext);

  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider");
  }

  return context;
};
