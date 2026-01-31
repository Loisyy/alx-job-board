import React from 'react';
import { JobsProvider } from './context/JobsContext';
import './App.css';

function App() {
  return (
    <JobsProvider>
      <div className="App">
        <h1 className="text-3xl font-bold text-primary-600 text-center mt-8">
          HireHub - Job Board
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Context API is ready! Next: Build components
        </p>
      </div>
    </JobsProvider>
  );
}

export default App;