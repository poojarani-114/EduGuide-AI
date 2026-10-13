import React from 'react';
import { BarChart3, TrendingUp, Clock, Target, Zap } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-brand-cyan" /> Analytics
        </h1>
        <p className="text-gray-600 mt-1">Track your learning progress and engagement over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mb-4">
             <Clock className="w-6 h-6" />
           </div>
           <p className="text-3xl font-bold text-brand-navy">42<span className="text-lg text-gray-500 font-normal">h</span></p>
           <p className="text-sm text-gray-500 mt-1">Total Time Studied</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
             <Target className="w-6 h-6" />
           </div>
           <p className="text-3xl font-bold text-brand-navy">12</p>
           <p className="text-sm text-gray-500 mt-1">Modules Completed</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
             <Zap className="w-6 h-6" />
           </div>
           <p className="text-3xl font-bold text-brand-navy">7</p>
           <p className="text-sm text-gray-500 mt-1">Day Streak</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
             <TrendingUp className="w-6 h-6" />
           </div>
           <p className="text-3xl font-bold text-brand-navy">94<span className="text-lg text-gray-500 font-normal">%</span></p>
           <p className="text-sm text-gray-500 mt-1">Average Quiz Score</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">Learning Activity</h2>
        <div className="h-64 flex items-end justify-between space-x-4">
          {/* Mock Bar Chart */}
          {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer h-full justify-end">
              <div className="w-full relative flex items-end justify-center" style={{ height: '100%' }}>
                <div className="absolute w-full bg-gray-100 rounded-t-md h-full bottom-0"></div>
                <div 
                  className="w-full bg-brand-cyan rounded-t-md relative z-10 transition-all duration-500 group-hover:bg-brand-blue" 
                  style={{ height: `${height}%` }}
                ></div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap">
                  {height} min
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-3 font-medium uppercase">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
