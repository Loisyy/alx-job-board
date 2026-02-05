import React, { useState } from 'react';
import FilterBar from '../components/jobs/FilterBar';
import JobList from '../components/jobs/JobList';
import ApplyModal from '../components/jobs/ApplyModal';
import FeaturedCompanies from '../components/common/FeaturedCompanies';
import ScrollToTop from '../components/common/ScrollToTop';
import { Job } from '../types';

const Home: React.FC = () => {
  // State to track which job is selected for applying
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // State to control whether the Apply Modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the Apply Modal and set the selected job
  const handleOpenApplyModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Function to close the Apply Modal and reset the selected job
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay resetting selectedJob to allow modal close animation
    setTimeout(() => setSelectedJob(null), 300);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Find Your <span className="text-primary-600">Dream Job</span>
        </h1>
        <p className="text-gray-600 text-lg">With HireHub</p>
      </div>

      {/* Filter Bar: Allows users to filter job listings */}
      <FilterBar />

      {/* Featured Companies Section */}
      <FeaturedCompanies />

      {/* Job Listings: displays jobs and allows opening the apply modal */}
      <JobList onOpenApplyModal={handleOpenApplyModal} />

      {/* Apply Modal: shows modal to apply for the selected job */}
      <ApplyModal job={selectedJob} isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Scroll to Top Button: appears when user scrolls down */}
      <ScrollToTop />
    </>
  );
};

export default Home;
