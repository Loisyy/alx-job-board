import React, { useState } from 'react';

// Components used on the Home page
import FilterBar from '../components/jobs/FilterBar';
import JobList from '../components/jobs/JobList';
import ApplyModal from '../components/jobs/ApplyModal';

// Job type definition (TypeScript)
import { Job } from '../types';

// Home page component
const Home: React.FC = () => {
  /**
   * Holds the job the user clicked on.
   * - Job → when a job is selected
   * - null → when no job is selected
   */
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  /**
   * Controls whether the Apply Modal is open or closed
   * false → modal hidden
   * true  → modal visible
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Called when the user clicks "Apply" on a job
   * - Stores the clicked job
   * - Opens the modal
   */
  const handleOpenApplyModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  /**
   * Called when the modal is closed
   * - Closes the modal immediately
   * - Clears the selected job after 300ms (for close animation)
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);

    // Delay clearing the job so the modal close animation can finish
    setTimeout(() => setSelectedJob(null), 300);
  };

  return (
    <>
      {/* Hero Section (page heading) */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Find Your <span className="text-primary-600">Dream Job</span>
        </h1>
        <p className="text-gray-600 text-lg">With HireHub</p>
      </div>

      {/* Filter options for searching jobs */}
      <FilterBar />

      {/* Job list
          Passes handleOpenApplyModal down so each job can open the modal
      */}
      <JobList onOpenApplyModal={handleOpenApplyModal} />

      {/* Apply Modal
          - job: the currently selected job
          - isOpen: controls visibility
          - onClose: function to close the modal
      */}
      <ApplyModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Home;
