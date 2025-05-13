import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Statistics from './Statistics';
import WorldMap from './WorldMap';
import SlidingHero from './ui/SlidingHero';
import NewsBlock from './ui/NewsBlock';

const Home = () => {
  // Sample school images - replace with actual image paths
  const schoolImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1432&q=80'
  ];

  // Sample news items
  const newsItems = [
    { id: 1, title: "Spring Festival Celebration 2025", date: "April 10, 2025" },
    { id: 2, title: "MAIS Students Win International Math Competition", date: "April 5, 2025" },
    { id: 3, title: "New Science Lab Opening Ceremony", date: "March 28, 2025" }
  ];
  
  // Animation for scroll reveal
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Hook for detecting when elements are in view
  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    
    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);
    
    return { ref, controls };
  };

  const { ref: featuresRef, controls: featuresControls } = useScrollAnimation();
  const { ref: newsRef, controls: newsControls } = useScrollAnimation();
  const { ref: ctaRef, controls: ctaControls } = useScrollAnimation();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Sliding Background */}
      <section className="relative h-screen">
        <SlidingHero images={schoolImages} interval={7000} overlayOpacity={0.6}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-4 max-w-4xl">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome to MAIS
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-white drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Mongol Aspiration International School
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Link 
                  to="/3341" 
                  className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-all hover:shadow-lg transform hover:-translate-y-1"
                >
                  View Student Profiles
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll down indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>
        </SlidingHero>
      </section>

      {/* News Highlights Section */}
      <motion.section 
        ref={newsRef}
        variants={fadeInUp}
        initial="hidden"
        animate={newsControls}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Latest News</h2>
          <p className="text-gray-600 text-center mb-8">Stay updated with the latest events and achievements</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {newsItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-medium mb-2">{item.date}</p>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <Link to="/news" className="text-blue-700 hover:text-blue-900 font-medium inline-flex items-center">
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/news" className="inline-block border border-blue-700 text-blue-700 px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors">
              View All News
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <Statistics />

      {/* World Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Our Global Impact</h2>
          <p className="text-gray-600 text-center mb-12">MAIS graduates are making a difference around the world</p>
          <WorldMap />
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        variants={fadeInUp}
        initial="hidden"
        animate={featuresControls}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose MAIS?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">Our school offers a unique learning environment designed to nurture global citizens ready for tomorrow's challenges.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">International Curriculum</h3>
              <p className="text-gray-600">Following Cambridge International standards for global education excellence with experienced educators from around the world.</p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Diverse Community</h3>
              <p className="text-gray-600">A multicultural environment that fosters global understanding and collaboration with students and staff from 15+ countries.</p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Modern Facilities</h3>
              <p className="text-gray-600">State-of-the-art facilities designed for optimal learning including science labs, digital classrooms, and sports complexes.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        ref={ctaRef}
        variants={fadeInUp}
        initial="hidden"
        animate={ctaControls}
        className="py-24 bg-gradient-to-r from-blue-900 to-blue-700 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Discover how MAIS can help shape your future with our world-class education and supportive community.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/3341" 
              className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-all hover:shadow-lg transform hover:-translate-y-1"
            >
              Learn More
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all hover:shadow-lg transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;