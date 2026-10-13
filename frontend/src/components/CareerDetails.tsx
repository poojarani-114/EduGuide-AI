import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, DollarSign, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';

export const CareerDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data based on ID, fallback to Software Developer
  const isDataScientist = id === '2';
  
  const career = {
    title: isDataScientist ? 'Data Scientist' : 'Software Developer',
    category: isDataScientist ? 'Analytics' : 'Technology',
    match: isDataScientist ? 88 : 95,
    salary: isDataScientist ? '$120,000' : '$105,000',
    growth: '+22% (Much faster than average)',
    description: isDataScientist 
      ? 'Data scientists use analytical, statistical, and programming skills to collect, analyze, and interpret large data sets. They then use this information to develop data-driven solutions to difficult business challenges.'
      : 'Software developers design, program, build, deploy and maintain software using many different skills and tools. They help build computer systems and applications to solve real-world problems.',
    skills: isDataScientist
      ? ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics']
      : ['JavaScript/TypeScript', 'React', 'Node.js', 'System Design', 'Git'],
    tasks: isDataScientist
      ? ['Develop machine learning models', 'Analyze complex datasets', 'Create data visualizations', 'Communicate findings to stakeholders']
      : ['Write clean, scalable code', 'Test and debug applications', 'Collaborate with cross-functional teams', 'Design software architecture']
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <button 
        onClick={() => navigate('/dashboard/careers')}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-brand-navy transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Career Paths
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-brand-navy p-8 text-white relative">
          <div className="absolute top-8 right-8 bg-brand-cyan text-white text-sm font-bold px-4 py-1.5 rounded-full">
            {career.match}% Match
          </div>
          <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
            {career.category}
          </span>
          <h1 className="text-4xl font-bold mb-4">{career.title}</h1>
          <p className="text-gray-300 max-w-2xl text-lg">{career.description}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-lg text-green-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Average Salary</p>
                <p className="text-xl font-bold text-brand-navy">{career.salary}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Job Growth</p>
                <p className="text-xl font-bold text-brand-navy">{career.growth}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Experience</p>
                <p className="text-xl font-bold text-brand-navy">Entry-Level</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-brand-navy mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-brand-cyan" /> Key Skills Required
              </h2>
              <ul className="space-y-3">
                {career.skills.map((skill, i) => (
                  <li key={i} className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <CheckCircle className="w-4 h-4 text-brand-cyan mr-3" />
                    <span className="font-medium text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-brand-navy mb-4">Daily Responsibilities</h2>
              <ul className="space-y-4">
                {career.tasks.map((task, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center pt-8 border-t border-gray-100">
            <button 
              onClick={() => navigate('/dashboard/roadmap')}
              className="px-8 py-3 bg-brand-cyan text-white rounded-xl font-bold shadow-sm hover:bg-teal-500 transition-colors text-lg"
            >
              Start this Career Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
