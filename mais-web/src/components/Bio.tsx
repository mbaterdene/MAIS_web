import React from 'react';

interface BioProps {
  name: string;
  school: string;
  bio: string;
  currentStudy: string;
}

const Bio: React.FC<BioProps> = ({ name, school, bio, currentStudy }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <p className="text-gray-600 mb-4">{bio}</p>
      <h1 className="text-4xl font-bold leading-tight mb-4">
        I'M <span className="font-outline-2">{name}</span>, AN 11TH GRADE STUDENT AT <span className="font-outline-2">{school}</span>.
      </h1>
      <div className="flex items-center gap-2 text-[#48b095] mb-6">
        <div className="w-2 h-2 rounded-full bg-[#48b095]"></div>
        <p>{currentStudy}</p>
      </div>
    </div>
  );
};

export default Bio; 