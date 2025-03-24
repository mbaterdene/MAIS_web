import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<Profile />} />
        <Route path="/" element={<Navigate to="/3341" replace />} />
        <Route path="/404" element={<div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600">Student not found</p>
          </div>
        </div>} />
      </Routes>
    </Router>
  );
}

export default App; 