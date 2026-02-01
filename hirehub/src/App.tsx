import React from 'react';
import { JobsProvider } from './context/JobsContext';
import FilterBar from './components/jobs/FilterBar';
import './App.css';

function App() {
  return (
    <JobsProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find Your <span className="text-primary-600">Dream Job</span>
          </h1>
          <p className="text-gray-600 mb-8">With HireHub</p>
          
          <FilterBar />
        </div>
      </div>
    </JobsProvider>
  );
}

export default App;