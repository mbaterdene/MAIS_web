import React from 'react';

interface Award {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
  count?: number;
  history?: {
    title: string;
    date: string;
  }[];
}

const awards: Award[] = [
  {
    id: 1,
    title: "Pull Shark",
    description: "Opened pull requests that have been merged",
    date: "First unlocked on Jul 1, 2022",
    icon: "🦈",
    count: 4,
    history: [
      {
        title: "Bronze and Silver unlocked",
        date: "Jul 1, 2022"
      },
      {
        title: "2nd pull request merged",
        date: "Jul 1, 2022"
      },
      {
        title: "16th pull request merged",
        date: "Jul 4, 2022"
      },
      {
        title: "128th pull request merged",
        date: "Jul 10, 2022"
      },
      {
        title: "1282th pull request merged",
        date: "Jul 10, 2025"
      }
    ]
  },
  {
    id: 2,
    title: "YOLO",
    description: "Merged pull requests without code review",
    date: "2023",
    icon: "🎯",
  },
  {
    id: 3,
    title: "Quick Draw",
    description: "Closed pull requests within 5 minutes of opening",
    date: "2023",
    icon: "⚡",
  },
  {
    id: 4,
    title: "d",
    description: "Closed pull requests within 5 minutes of opening",
    date: "2023",
    icon: "🔥",
  },
  {
    id: 5,
    title: "Quick ",
    description: "Closed pull requests within 5 minutes of opening",
    date: "2023",
    icon: "🔥",
  }
];

const Awards: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {awards.map((award) => (
            <div
              key={award.id}
              className="relative group"
            >
              {/* Default View - Only Icon */}
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center text-4xl bg-[#1f6feb] rounded-full hover:scale-105 transition-transform duration-200">
                  {award.icon}
                </div>
                {award.count && (
                  <div className="absolute -bottom-1 -right-1 bg-[#238636] text-white text-xs px-1.5 py-0.5 rounded-full">
                    x{award.count}
                  </div>
                )}
              </div>

              {/* Hover Popup */}
              <div className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-[#1f2937] rounded-lg p-4 shadow-lg border border-gray-700">
                  {/* Award Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center text-3xl bg-[#1f6feb] rounded-full">
                      {award.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{award.title}</h3>
                      <p className="text-sm text-gray-400">{award.description}</p>
                    </div>
                  </div>

                  {/* History Section */}
                  {award.history && (
                    <>
                      <div className="h-px bg-gray-700 my-3"></div>
                      <h4 className="text-gray-300 text-sm font-medium mb-3">History</h4>
                      <div className="relative pl-6">
                        {award.history.map((item, index) => (
                          <div key={index} className="relative mb-3 last:mb-0">
                            {/* Timeline dot */}
                            <div className="absolute left-0 top-2 w-2 h-2 bg-gray-500 rounded-full -translate-x-[5px]"></div>
                            {/* Timeline line */}
                            {index !== award.history!.length - 1 && (
                              <div className="absolute left-0 top-3 w-0.5 h-full bg-gray-700 -translate-x-[3px]"></div>
                            )}
                            {/* Content */}
                            <div className="text-sm">
                              <div className="text-white">{item.title}</div>
                              {item.date && (
                                <div className="text-gray-500">{item.date}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {/* Triangle pointer */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1f2937] border-l border-t border-gray-700 transform rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards; 