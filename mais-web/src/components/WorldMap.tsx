import React from 'react';
import WorldMap, { CountryContext } from 'react-svg-worldmap';

interface CountryData {
  country: string;
  value: number;
  color?: string;
}

const countryData: CountryData[] = [
  {
    country: "US",
    value: 88320,
    color: "#4287f5"
  },
  {
    country: "DE",
    value: 78541,
    color: "#41e086"
  },
  {
    country: "CN",
    value: 239570,
    color: "#f542b9"
  },
  {
    country: "BR",
    value: 12320,
    color: "#f5a142"
  },
  {
    country: "AU",
    value: 6097,
    color: "#42b0f5"
  },
  {
    country: "IN",
    value: 12320,
    color: "#f5a142"
  },
  {
    country: "FR",
    value: 12320,
    color: "#f5a142"
  }
];

const countryNames: { [key: string]: string } = {
  "US": "United States",
  "GB": "United Kingdom",
  "CA": "Canada",
  "JP": "Japan",
  "KR": "South Korea",
  // Add more country names as needed
};

interface Alumni {
  major: string;
  graduationYear: number;
}

// Sample alumni data - replace with your actual data
const alumniData: Alumni[] = [
  { major: "Computer Science", graduationYear: 2020 },
  { major: "Business", graduationYear: 2021 },
  // Add more sample data as needed
];

// Get unique fields of study from alumni data
const getUniqueFields = () => {
  const fields = alumniData.map((alumni: Alumni) => alumni.major);
  return Array.from(new Set(fields));
};

// Get graduation years range
const getGraduationYears = () => {
  const years = alumniData.map((alumni: Alumni) => alumni.graduationYear);
  return Array.from(new Set(years)).sort();
};

const WorldMapComponent = () => {
  const getTooltipContent = (ctx: CountryContext) => {
    const data = countryData.find(item => item.country === ctx.countryCode);
    if (data) {
      return `${countryNames[ctx.countryCode]}: ${data.value.toLocaleString()} students`;
    }
    return "";
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden p-4 md:p-8 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-8 text-center">Global Student Distribution</h2>
        
      {/* Map Container */}
      <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm mb-8 overflow-hidden">
        <div className="flex justify-center items-center min-h-[400px] md:min-h-[600px] lg:min-h-[800px]">
          <div className="w-full max-w-[1600px]">
            <WorldMap
              color="red"
              title=""
              valueSuffix="students"
              size="responsive"
              data={countryData}
              tooltipTextFunction={getTooltipContent}
              styleFunction={(ctx: CountryContext) => {
                const countryInfo = countryData.find(item => item.country === ctx.countryCode);
                return {
                  fill: countryInfo?.color || "#F3F4F6",
                  stroke: "#E5E7EB",
                  strokeWidth: 0.5,
                  hover: {
                    fill: countryInfo?.color ? `${countryInfo.color}dd` : "#E5E7EB",
                    outline: "none"
                  }
                };
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMapComponent; 