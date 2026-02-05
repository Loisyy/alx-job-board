import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobsProvider } from './context/JobsContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import './App.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <JobsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="job/:id" element={<JobDetail />} />
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </Router>
    </JobsProvider>
  );
}

export default App;