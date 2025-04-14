import React, { useState, useMemo } from 'react';
import WorldMap, { CountryContext } from 'react-svg-worldmap';
import { AnimatePresence, motion } from 'framer-motion';
import { getAlumniByCountry, alumniData, Alumni } from '../data/alumniData';
import AlumniPopup from './ui/AlumniPopup';

interface CountryData {
  country: string;
  value: number;
  color?: string;
}

const countryData: CountryData[] = [
  {
    country: "US",
    value: 3,
    color: "#4287f5"
  },
  {
    country: "GB",
    value: 2,
    color: "#41e086"
  },
  {
    country: "CN",
    value: 2,
    color: "#f542b9"
  },
  {
    country: "DE",
    value: 2,
    color: "#f5a142"
  },
  {
    country: "AU",
    value: 1,
    color: "#42b0f5"
  },
  {
    country: "JP",
    value: 1,
    color: "#f5a142"
  },
  {
    country: "CA",
    value: 1,
    color: "#f54242"
  },
  {
    country: "FR",
    value: 1,
    color: "#42f5d1"
  },
  {
    country: "KR",
    value: 1,
    color: "#b042f5"
  }
];

const countryNames: { [key: string]: string } = {
  "US": "United States",
  "DE": "Germany",
  "CN": "China",
  "BR": "Brazil",
  "AU": "Australia",
  "IN": "India",
  "FR": "France",
  "GB": "United Kingdom",
  "CA": "Canada",
  "JP": "Japan",
  "KR": "South Korea",
  // Add more country names as needed
};

// Get unique fields of study from alumni data
const getUniqueFields = () => {
  const fields = alumniData.map(alumni => alumni.major);
  return Array.from(new Set(fields));
};

// Get graduation years range
const getGraduationYears = () => {
  const years = alumniData.map(alumni => alumni.graduationYear);
  return Array.from(new Set(years)).sort();
};

const WorldMapComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const uniqueFields = useMemo(() => getUniqueFields(), []);
  const graduationYears = useMemo(() => getGraduationYears(), []);

  // Filter alumni data based on selected filters
  const filteredAlumniData = useMemo(() => {
    return alumniData.filter(alumni => {
      const matchesSearch = searchTerm === '' || 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.major.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesField = selectedField === 'all' || alumni.major === selectedField;
      const matchesYear = selectedYear === 'all' || alumni.graduationYear.toString() === selectedYear;
      
      return matchesSearch && matchesField && matchesYear;
    });
  }, [searchTerm, selectedField, selectedYear]);

  // Create filtered country data for the map
  const filteredCountryData = useMemo(() => {
    const countryCounter: Record<string, number> = {};
    
    filteredAlumniData.forEach(alumni => {
      countryCounter[alumni.countryCode] = (countryCounter[alumni.countryCode] || 0) + 1;
    });
    
    return countryData.map(country => ({
      ...country,
      value: countryCounter[country.country] || 0
    })).filter(country => country.value > 0);
  }, [filteredAlumniData]);

  const getTooltipContent = (ctx: CountryContext) => {
    const data = filteredCountryData.find(item => item.country === ctx.countryCode);
    if (data) {
      return `${countryNames[ctx.countryCode] || ctx.countryCode}: ${data.value} ${data.value === 1 ? 'alumnus' : 'alumni'}`;
    }
    return "";
  };

  const handleCountryClick = (ctx: CountryContext) => {
    // Check if we have alumni data for this country
    const data = filteredCountryData.find(item => item.country === ctx.countryCode);
    if (data && data.value > 0) {
      setSelectedCountry(ctx.countryCode);
    }
  };

  const handleClosePopup = () => {
    setSelectedCountry(null);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedField('all');
    setSelectedYear('all');
  };

  // Get filtered alumni for selected country
  const selectedCountryAlumni = useMemo(() => {
    if (!selectedCountry) return [];
    return filteredAlumniData.filter(alumni => alumni.countryCode === selectedCountry);
  }, [selectedCountry, filteredAlumniData]);

  // Calculate statistics
  const totalFilteredAlumni = filteredAlumniData.length;
  const totalCountries = filteredCountryData.length;
  
  // Count universities
  const universities = useMemo(() => {
    const unis = filteredAlumniData.map(alumni => alumni.university);
    return new Set(unis).size;
  }, [filteredAlumniData]);
  
  // Count fields of study
  const fieldsOfStudy = useMemo(() => {
    const fields = filteredAlumniData.map(alumni => alumni.major);
    return new Set(fields).size;
  }, [filteredAlumniData]);

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden p-4 md:p-8 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Global Alumni Network</h2>
      
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Alumni
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, university..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Field of Study Filter */}
          <div>
            <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study
            </label>
            <select
              id="field"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
            >
              <option value="all">All Fields</option>
              {uniqueFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
          
          {/* Graduation Year Filter */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year
            </label>
            <select
              id="year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {graduationYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
          
          {/* Reset Button */}
          <div className="flex items-end">
            <button
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
        
      {/* Map Container */}
      <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm mb-8 overflow-hidden">
        <div className="flex justify-center items-center min-h-[400px] md:min-h-[600px] lg:min-h-[800px]">
          <div className="w-full max-w-[1600px]">
            {filteredCountryData.length > 0 ? (
              <WorldMap
                color="red"
                title=""
                valueSuffix="alumni"
                size="responsive"
                data={filteredCountryData}
                tooltipTextFunction={getTooltipContent}
                onClickFunction={handleCountryClick}
                styleFunction={(ctx: CountryContext) => {
                  const countryInfo = filteredCountryData.find(item => item.country === ctx.countryCode);
                  return {
                    fill: countryInfo?.color || "#F3F4F6",
                    stroke: "#E5E7EB",
                    strokeWidth: 0.5,
                    cursor: countryInfo ? 'pointer' : 'default',
                    hover: {
                      fill: countryInfo?.color ? `${countryInfo.color}dd` : "#E5E7EB",
                      outline: "none",
                      strokeWidth: 1,
                      stroke: "#000"
                    }
                  };
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No alumni match your filters</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria or reset the filters</p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={handleResetFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Legend */}
        {filteredCountryData.length > 0 && (
          <div className="flex flex-col items-center mt-4">
            <p className="text-sm font-medium mb-2 text-gray-700">Click on a colored country to see alumni details</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {filteredCountryData.map((item) => (
                <motion.div 
                  key={item.country} 
                  className="flex items-center bg-white px-2 py-1 rounded-md shadow-sm cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedCountry(item.country)}
                >
                  <div 
                    className="w-4 h-4 rounded-sm mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{countryNames[item.country] || item.country}: {item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Alumni Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{totalFilteredAlumni}</p>
          <p className="text-sm text-gray-600">Total Alumni Abroad</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{totalCountries}</p>
          <p className="text-sm text-gray-600">Countries</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{universities}</p>
          <p className="text-sm text-gray-600">Universities</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <p className="text-3xl font-bold text-orange-600">{fieldsOfStudy}</p>
          <p className="text-sm text-gray-600">Fields of Study</p>
        </div>
      </div>
      
      {/* Popup dialog */}
      <AnimatePresence>
        {selectedCountry && (
          <AlumniPopup
            alumni={selectedCountryAlumni}
            countryName={countryNames[selectedCountry] || selectedCountry}
            onClose={handleClosePopup}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorldMapComponent;