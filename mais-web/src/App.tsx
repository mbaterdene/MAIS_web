import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
       
      <div className='pt-20'>
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
      </div>
    </>
  );
}

export default App; 