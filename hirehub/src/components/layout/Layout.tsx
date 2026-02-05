import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
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
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Find Jobs
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Companies
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2">
                Login
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-primary-500 rounded-lg"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <nav className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                  Find Jobs
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                  Companies
                </a>
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <button className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 border border-gray-300 rounded-lg">
                    Login
                  </button>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Sign Up
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

            <div>
  <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
  <ul className="space-y-2 text-sm text-gray-600">
    <li><Link to="/about" className="hover:text-gray-900">About Us</Link></li>
    <li><Link to="/careers" className="hover:text-gray-900">Careers</Link></li>
    <li><Link to="/blog" className="hover:text-gray-900">Blog</Link></li>
    <li><Link to="/press" className="hover:text-gray-900">Press</Link></li>
  </ul>
</div>

<div>
  <h3 className="font-semibold text-gray-900 mb-3">Candidates</h3>
  <ul className="space-y-2 text-sm text-gray-600">
    <li><Link to="/" className="hover:text-gray-900">Browse Jobs</Link></li>
    <li><a href="#salary-tools" className="hover:text-gray-900">Salary Tools</a></li>
    <li><a href="#resume-help" className="hover:text-gray-900">Resume Help</a></li>
    <li><a href="#job-alerts" className="hover:text-gray-900">Job Alerts</a></li>
  </ul>
</div>

<div>
  <h3 className="font-semibold text-gray-900 mb-3">Employers</h3>
  <ul className="space-y-2 text-sm text-gray-600">
    <li><a href="#post-job" className="hover:text-gray-900">Post a Job</a></li>
    <li><a href="#candidate-search" className="hover:text-gray-900">Candidate Search</a></li>
    <li><a href="#pricing" className="hover:text-gray-900">Pricing</a></li>
    <li><a href="#employer-hub" className="hover:text-gray-900">Employer Hub</a></li>
  </ul>
</div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © 2026 HireHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;