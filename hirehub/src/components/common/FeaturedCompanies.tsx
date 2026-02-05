import React from 'react';

const FeaturedCompanies: React.FC = () => {
  // Array of featured companies with name, logo letter, and gradient color for styling
  const companies = [
    { name: 'Google', logo: 'G', color: 'from-blue-400 to-blue-600' },
    { name: 'Microsoft', logo: 'M', color: 'from-green-400 to-green-600' },
    { name: 'Amazon', logo: 'A', color: 'from-orange-400 to-orange-600' },
    { name: 'Meta', logo: 'M', color: 'from-blue-500 to-indigo-600' },
    { name: 'Apple', logo: 'A', color: 'from-gray-400 to-gray-600' },
    { name: 'Netflix', logo: 'N', color: 'from-red-500 to-red-700' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Companies</h2>

      {/* Grid of company cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {companies.map((company, index) => (
          // Each company is rendered as a button for accessibility and interactivity
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={`View jobs at ${company.name}`} // Accessible label for screen readers
          >
            {/* Company Logo with gradient background */}
            <div
              className={`w-12 h-12 bg-gradient-to-br ${company.color} rounded-lg flex items-center justify-center text-white font-bold text-xl`}
            >
              {company.logo} {/* Single-letter logo */}
            </div>
            {/* Company Name */}
            <span className="text-sm font-medium text-gray-700">{company.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCompanies;
