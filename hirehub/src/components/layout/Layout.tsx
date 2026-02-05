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
            {/* Logo */}
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

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/jobs" className="text-gray-600 hover:text-gray-900 font-medium">
                Find Jobs
              </Link>
              <Link to="/companies" className="text-gray-600 hover:text-gray-900 font-medium">
                Companies
              </Link>
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2"
              >
                Login
              </button>
              <button
                type="button"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-primary-500 rounded-lg"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <nav className="flex flex-col gap-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Find Jobs</Link>
                <Link to="/companies" onClick={() => setIsMobileMenuOpen(false)}>Companies</Link>

                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <button type="button" className="border border-gray-300 rounded-lg px-4 py-2">
                    Login
                  </button>
                  <button type="button" className="bg-primary-600 text-white rounded-lg px-4 py-2">
                    Sign Up
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <p className="text-gray-600 text-sm">Find your dream job with ease.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/press">Press</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Candidates</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/jobs">Browse Jobs</Link></li>
                <li><Link to="/salary-tools">Salary Tools</Link></li>
                <li><Link to="/resume-help">Resume Help</Link></li>
                <li><Link to="/job-alerts">Job Alerts</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Employers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/post-job">Post a Job</Link></li>
                <li><Link to="/candidate-search">Candidate Search</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/employer-hub">Employer Hub</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            © 2026 HireHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
