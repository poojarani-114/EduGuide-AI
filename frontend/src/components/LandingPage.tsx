import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, Target, Brain, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 py-4 px-6 sm:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-brand-navy">
          <BookOpen className="w-8 h-8 text-brand-cyan" />
          <span className="text-xl font-bold tracking-tight">EduGuide AI</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 text-brand-teal hover:text-brand-navy font-medium transition-colors">
            Log in
          </Link>
          <Link to="/register" className="px-5 py-2 bg-brand-cyan text-white rounded-md font-medium hover:bg-teal-500 shadow-sm transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-brand-navy tracking-tight leading-tight">
            Your Future. <br className="sm:hidden" /> Your Path. <br className="sm:hidden" /> Your Guide.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Personalized Learning and Career Guidance, Powered by AI. Discover the right learning opportunities, explore career possibilities, and build personalized study plans.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-brand-navy hover:bg-brand-blue shadow-lg transition-all hover:-translate-y-0.5">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-brand-navy bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all">
              Explore Careers
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4 text-brand-cyan">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Personalized Paths</h3>
            <p className="text-gray-600 text-sm">Discover careers tailored to your unique interests and strengths.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4 text-brand-cyan">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">AI Education Assistant</h3>
            <p className="text-gray-600 text-sm">Get real-time answers, study summaries, and expert guidance.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4 text-brand-cyan">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Smart Roadmaps</h3>
            <p className="text-gray-600 text-sm">Generate adaptive study schedules to reach your career goals efficiently.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
