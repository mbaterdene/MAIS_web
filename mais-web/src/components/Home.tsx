import React from 'react';
import { Link } from 'react-router-dom';
import Statistics from './Statistics';
import WorldMap from './WorldMap';
import Navbar from './Navbar/Navbar';

const Home = () => {
  return (
    
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to MAIS</h1>
          <p className="text-xl md:text-2xl mb-8">Mongol Aspiration International School</p>
          <Link 
            to="/3341" 
            className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors"
          >
            View Student Profiles
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* World Map Section */}
      <section className="py-16 bg-gray-50">
        
          <WorldMap />
        
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose MAIS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">International Curriculum</h3>
              <p className="text-gray-600">Following Cambridge International standards for global education excellence.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Diverse Community</h3>
              <p className="text-gray-600">A multicultural environment that fosters global understanding and collaboration.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Modern Facilities</h3>
              <p className="text-gray-600">State-of-the-art facilities designed for optimal learning and development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8">Discover how MAIS can help shape your future.</p>
          <Link 
            to="/3341" 
            className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors inline-block"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 