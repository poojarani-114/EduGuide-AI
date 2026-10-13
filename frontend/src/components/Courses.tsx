import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlayCircle, Star, Clock, Filter, BookOpen } from 'lucide-react';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');
  
  const allCourses = [
    { id: 1, title: 'Python for Beginners', provider: 'EduGuide Labs', category: 'Programming', duration: '4 weeks', level: 'Beginner', rating: 4.8, img: 'bg-blue-100' },
    { id: 2, title: 'Data Structures & Algorithms', provider: 'TechUniversity', category: 'Programming', duration: '8 weeks', level: 'Intermediate', rating: 4.9, img: 'bg-indigo-100' },
    { id: 3, title: 'Digital Marketing Fundamentals', provider: 'CodeAcademy', category: 'Marketing', duration: '12 weeks', level: 'Beginner', rating: 4.7, img: 'bg-teal-100' },
    { id: 4, title: 'Advanced React Patterns', provider: 'Frontend Masters', category: 'Programming', duration: '3 weeks', level: 'Advanced', rating: 4.9, img: 'bg-cyan-100' },
    { id: 5, title: 'UI/UX Principles', provider: 'Design School', category: 'Design', duration: '6 weeks', level: 'Beginner', rating: 4.8, img: 'bg-pink-100' },
  ];

  const filteredCourses = allCourses.filter(c => {
    const matchesCategory = activeCategory === 'All Courses' || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Course Explorer</h1>
          <p className="text-gray-600 mt-1">Find the best courses to bridge your skill gaps.</p>
        </div>
        <div className="flex w-full md:w-auto space-x-3">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search subjects, skills, providers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-brand-cyan focus:border-brand-cyan"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {['All Courses', 'Programming', 'Data Science', 'Design', 'Business', 'Marketing'].map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-brand-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className={`h-32 ${course.img} flex items-center justify-center relative`}>
              <BookOpen className="w-12 h-12 text-black/10" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-navy flex items-center">
                <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" /> {course.rating}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs font-medium text-brand-cyan mb-1">{course.provider}</span>
              <h3 className="font-bold text-brand-navy mb-2 line-clamp-2">{course.title}</h3>
              
              <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {course.duration}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{course.level}</span>
                </div>
                <button 
                  onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                  className="w-full py-2 bg-brand-light text-brand-teal font-medium rounded-lg hover:bg-brand-cyan hover:text-white transition-colors flex items-center justify-center text-sm"
                >
                  <PlayCircle className="w-4 h-4 mr-2" /> Start Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
