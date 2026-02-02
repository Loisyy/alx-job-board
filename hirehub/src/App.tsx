import React, { useState } from 'react';
import { JobsProvider } from './context/JobsContext'; // Context provider for global job state
import FilterBar from './components/jobs/FilterBar'; // Filter component for job search
import JobList from './components/jobs/JobList'; // Job listings component
import { Job } from './types'; // TypeScript type for Job object
import './App.css'; // Global CSS (if any additional styles are needed)

function App() {
  // -------------------------------
  // Local State
  // -------------------------------
  // selectedJob will store the job the user wants to apply for
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // -------------------------------
  // Handlers
  // -------------------------------
  // Triggered when user clicks "Apply" on a JobCard
  const handleOpenApplyModal = (job: Job) => {
    setSelectedJob(job); // Set the selected job in state
    console.log('Open apply modal for:', job.title); // Temporary log
    // TODO: Open modal with job details for application
  };

  // -------------------------------
  // Main JSX
  // -------------------------------
  return (
    // -------------------------------
    // JobsProvider wraps the app to provide job data to children
    // -------------------------------
    <JobsProvider>
      <div className="min-h-screen bg-gray-50">
        {/* -------------------------------
            Header Section
        ------------------------------- */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              
              {/* Logo and Branding */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  {/* Logo Icon */}
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">HireHub</span>
              </div>
              
              {/* Navigation Links - hidden on mobile */}
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                  Find Jobs
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                  Companies
                </a>
              </nav>

              {/* Authentication Buttons */}
              <div className="flex items-center gap-3">
                <button className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2">
                  Login
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* -------------------------------
            Main Content
        ------------------------------- */}
        <main className="container mx-auto px-4 py-8">
          
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Find Your <span className="text-primary-600">Dream Job</span>
            </h1>
            <p className="text-gray-600 text-lg">With HireHub</p>
          </div>

          {/* Filter Bar */}
          <FilterBar />

          {/* Job Listings - passes callback to open modal */}
          <JobList onOpenApplyModal={handleOpenApplyModal} />
        </main>

        {/* -------------------------------
            Footer Section
        ------------------------------- */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-8">
            
            {/* Footer Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Brand Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="font-bold text-gray-900">HireHub</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Find your dream job with ease.
                </p>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                  <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                  <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="hover:text-gray-900">Press</a></li>
                </ul>
              </div>

              {/* Candidates Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Candidates</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">Browse Jobs</a></li>
                  <li><a href="#" className="hover:text-gray-900">Salary Tools</a></li>
                  <li><a href="#" className="hover:text-gray-900">Resume Help</a></li>
                  <li><a href="#" className="hover:text-gray-900">Job Alerts</a></li>
                </ul>
              </div>

              {/* Employers Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Employers</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">Post a Job</a></li>
                  <li><a href="#" className="hover:text-gray-900">Candidate Search</a></li>
                  <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                  <li><a href="#" className="hover:text-gray-900">Employer Hub</a></li>
                </ul>
              </div>
            </div>

            {/* Footer Copyright */}
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
              © 2026 HireHub. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </JobsProvider>
  );
}

export default App;
