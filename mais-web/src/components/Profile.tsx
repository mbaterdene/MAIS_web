import React from 'react';
import Awards from './Awards';

interface GithubStats {
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributedTo: number;
}

interface Language {
  name: string;
  percentage: number;
  color: string;
}

const Profile: React.FC = () => {
  const stats: GithubStats = {
    totalStars: 494,
    totalCommits: 12,
    totalPRs: 3,
    totalIssues: 8,
    contributedTo: 0
  };

  const languages: Language[] = [
    { name: 'Python', percentage: 81.08, color: '#3572A5' },
    { name: 'HTML', percentage: 10.45, color: '#e34c26' },
    { name: 'Lua', percentage: 6.85, color: '#000080' },
    { name: 'Rust', percentage: 1.51, color: '#dea584' },
    { name: 'CSS', percentage: 0.09, color: '#563d7c' },
    { name: 'Shell', percentage: 0.02, color: '#89e051' }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#1f6feb] flex-shrink-0">
            <img
              src="https://avatars.githubusercontent.com/u/your-username"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 w-full text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Hello World! 👋 I'm Your Name
            </h1>
            
            <div className="bg-[#161b22] p-4 rounded-lg mb-4 overflow-x-auto">
              <pre className="font-mono text-xs md:text-sm whitespace-pre-wrap md:whitespace-pre">
                <code>
                  <span className="text-pink-500">class</span>{" "}
                  <span className="text-yellow-500">SoftwareEngineer</span>:
                  {"\n"}
                  {"    "}
                  <span className="text-pink-500">def</span>{" "}
                  <span className="text-blue-500">__init__</span>
                  {"(self):"}{"\n"}
                  {"        "}self.name = <span className="text-green-500">"Your Name"</span>
                  {"\n"}
                  {"        "}self.roles = [<span className="text-green-500">"Software Engineer"</span>, <span className="text-green-500">"Web Developer"</span>]
                  {"\n"}
                  {"        "}self.education = <span className="text-green-500">"Computer Science"</span>
                  {"\n"}
                  {"        "}self.code_languages = [<span className="text-green-500">"Python"</span>, <span className="text-green-500">"JavaScript"</span>, <span className="text-green-500">"TypeScript"</span>]
                  {"\n"}
                  {"        "}self.cloud_stack = [<span className="text-green-500">"AWS"</span>, <span className="text-green-500">"Docker"</span>, <span className="text-green-500">"Kubernetes"</span>]
                </code>
              </pre>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-3 mb-6">
              <a href="https://linkedin.com" className="bg-[#0a66c2] px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                LINKEDIN
              </a>
              <a href="https://instagram.com" className="bg-[#e4405f] px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">📊 My GitHub Stats</h2>
          <div className="bg-[#161b22] p-4 md:p-6 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center md:text-left">
                <div className="text-[#58a6ff]">Total Stars Earned:</div>
                <div className="text-xl md:text-2xl font-bold">{stats.totalStars}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-[#58a6ff]">Total Commits (2023):</div>
                <div className="text-xl md:text-2xl font-bold">{stats.totalCommits}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-[#58a6ff]">Total PRs:</div>
                <div className="text-xl md:text-2xl font-bold">{stats.totalPRs}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-[#58a6ff]">Total Issues:</div>
                <div className="text-xl md:text-2xl font-bold">{stats.totalIssues}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-[#58a6ff]">Contributed to:</div>
                <div className="text-xl md:text-2xl font-bold">{stats.contributedTo}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Most Used Languages */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">📝 Most Used Languages</h2>
          <div className="bg-[#161b22] p-4 md:p-6 rounded-lg">
            <div className="flex h-4 rounded-full overflow-hidden">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color
                  }}
                  className="h-full"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm md:text-base">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span>{lang.name}</span>
                  <span className="text-gray-400">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">🏆 Achievements</h2>
          <Awards />
        </div>
      </div>
    </div>
  );
};

export default Profile; 