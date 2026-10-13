import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Target, BookOpen, Clock, TrendingUp, CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for the charts and metrics
  const studyData = [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 3 },
    { name: 'Wed', hours: 1.5 },
    { name: 'Thu', hours: 4 },
    { name: 'Fri', hours: 2.5 },
    { name: 'Sat', hours: 5 },
    { name: 'Sun', hours: 3 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Greeting and Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Good Morning, {user?.name?.split(' ')[0] || 'Student'}!</h1>
          <p className="text-gray-600 mt-1">Here is what's happening with your learning journey today.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-3">
          <span className="text-sm text-gray-500 font-medium">Profile Completion</span>
          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-brand-cyan rounded-full"></div>
          </div>
          <span className="text-sm font-bold text-brand-navy">75%</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Career Goal</p>
            <p className="text-lg font-bold text-brand-navy mt-1">Software Developer</p>
          </div>
          <div className="p-3 bg-brand-blue/5 rounded-lg text-brand-blue">
            <Target className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Courses</p>
            <p className="text-2xl font-bold text-brand-navy mt-1">3</p>
          </div>
          <div className="p-3 bg-brand-teal/10 rounded-lg text-brand-teal">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Study Streak</p>
            <p className="text-2xl font-bold text-brand-navy mt-1">5 Days</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Weekly Goal</p>
            <p className="text-2xl font-bold text-brand-navy mt-1">12/15 hrs</p>
          </div>
          <div className="p-3 bg-brand-cyan/10 rounded-lg text-brand-cyan">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Plan */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-navy">Today's Plan</h2>
              <button onClick={() => navigate('/dashboard/planner')} className="text-sm text-brand-teal hover:text-brand-cyan font-medium">View Calendar</button>
            </div>
            <div className="space-y-4">
              {[
                { time: '10:00 AM', task: 'Complete Python loops lesson', course: 'Python Basics' },
                { time: '02:00 PM', task: 'Practice 10 programming questions', course: 'Algorithms' },
                { time: '04:30 PM', task: 'Review database normalization', course: 'Database Design' }
              ].map((item, i) => (
                <div key={i} className="flex items-start p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="mr-4 mt-0.5">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:border-brand-cyan"></div>
                  </div>
                  <div>
                    <p className="font-medium text-brand-navy">{item.task}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {item.time}</span>
                      <span className="flex items-center"><BookOpen className="w-3 h-3 mr-1"/> {item.course}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-brand-cyan mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-brand-navy text-sm">Recommended Next Step</h4>
                  <p className="text-sm text-brand-teal mt-1">Based on your recent progress, you should start building your first portfolio project this weekend.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Weekly Study Hours</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="hours" fill="#5BC0BE" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">
          {/* Continue Learning */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Continue Learning</h2>
            <div className="space-y-4">
              <div onClick={() => navigate('/dashboard/courses')} className="group cursor-pointer">
                <div className="h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                  <div className="absolute inset-0 bg-brand-navy/60 group-hover:bg-brand-navy/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                       <ArrowRight className="text-white w-6 h-6" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-brand-navy text-sm">Advanced Data Structures</h3>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>Module 4 of 8</span>
                  <span className="font-medium text-brand-teal">50% completed</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="w-1/2 h-full bg-brand-teal rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent AI Conversations */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-navy">Recent AI Chats</h2>
              <button onClick={() => navigate('/dashboard/ai')} className="text-sm text-brand-teal hover:text-brand-cyan">See All</button>
            </div>
            <div className="space-y-3">
              {[
                { topic: 'Explain Big O Notation', time: '2 hours ago' },
                { topic: 'Help with SQL Joins', time: 'Yesterday' },
                { topic: 'React useEffect hooks', time: '2 days ago' }
              ].map((chat, i) => (
                <div key={i} onClick={() => navigate('/dashboard/ai')} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-navy">{chat.topic}</p>
                      <p className="text-xs text-gray-500">{chat.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/dashboard/ai')} className="w-full mt-4 py-2 border-2 border-brand-cyan text-brand-teal rounded-lg font-medium hover:bg-brand-cyan hover:text-white transition-colors text-sm">
              New Conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
