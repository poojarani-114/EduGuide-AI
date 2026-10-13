import React, { useState } from 'react';
import { Search, Filter, Briefcase, ChevronRight, Star, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CareerPaths: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const recommendedCareers = [
    { id: 1, title: 'Software Developer', match: 95, category: 'Technology', desc: 'Design, build, and maintain software applications.' },
    { id: 2, title: 'Data Scientist', match: 88, category: 'Analytics', desc: 'Analyze complex data sets to inform business decisions.' },
  ];

  const exploreCareers = [
    { id: 3, title: 'UX/UI Designer', category: 'Design', salary: '$85,000' },
    { id: 4, title: 'Cloud Engineer', category: 'Technology', salary: '$110,000' },
    { id: 5, title: 'Product Manager', category: 'Business', salary: '$105,000' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Career Paths</h1>
          <p className="text-gray-600 mt-1">Discover and compare career opportunities tailored to you.</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-white rounded-lg font-medium shadow-sm hover:bg-teal-500 transition-colors">
          Retake Assessment
        </button>
      </div>

      {/* Recommended Section */}
      <section>
        <h2 className="text-xl font-bold text-brand-navy mb-4 flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" /> Top Recommendations for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedCareers.map(career => (
            <div key={career.id} className="bg-white p-6 rounded-xl border border-brand-cyan/30 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-cyan text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                {career.match}% Match
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-light rounded-lg text-brand-teal">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy">{career.title}</h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">{career.category}</span>
                  <p className="text-sm text-gray-600 mt-3">{career.desc}</p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button onClick={() => navigate('/dashboard/roadmap')} className="flex-1 py-2 text-sm font-medium border border-brand-cyan text-brand-teal rounded-lg hover:bg-brand-cyan hover:text-white transition-colors">
                  View Roadmap
                </button>
                <button onClick={() => navigate(`/dashboard/careers/${career.id}`)} className="flex-1 py-2 text-sm font-medium bg-brand-navy text-white rounded-lg hover:bg-brand-blue transition-colors">
                  Career Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-brand-navy">Explore All Careers</h2>
          <div className="flex w-full md:w-auto space-x-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search careers..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-brand-cyan focus:border-brand-cyan"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <th className="py-3 px-6">Career Title</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Avg. Entry Salary</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exploreCareers.map(career => (
                <tr key={career.id} onClick={() => navigate(`/dashboard/careers/${career.id}`)} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="py-4 px-6 flex items-center">
                    <Briefcase className="w-4 h-4 text-brand-teal mr-3" />
                    <span className="font-medium text-brand-navy">{career.title}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{career.category}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{career.salary}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-brand-teal hover:text-brand-cyan p-1">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
