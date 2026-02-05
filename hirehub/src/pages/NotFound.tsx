import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    // Main container centers the content both vertically and horizontally
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center">
        {/* 404 Error Code */}
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>

        {/* Page Not Found Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>

        {/* Description / Message */}
        <p className="text-gray-600 mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {/* Link to Home Page */}
          <Link
            to="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Go to Home
          </Link>

          {/* Button to go back to previous page */}
          <button
            onClick={() => window.history.back()} // Goes back in browser history
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
