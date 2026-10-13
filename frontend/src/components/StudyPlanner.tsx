import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, CheckSquare, Square } from 'lucide-react';

export const StudyPlanner: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Read Chapter 3', module: '', completed: true, due: 'Completed yesterday' },
    { id: 2, text: 'Build a basic REST API', module: 'Backend Integration module', completed: false, due: 'Due Today' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    const text = window.prompt("Enter new task name:");
    if (text) {
      setTasks([...tasks, { id: Date.now(), text, module: 'Custom Task', completed: false, due: 'Upcoming' }]);
    }
  };

  // Generate dynamic dates starting from this week's Monday
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday
  const diffToMonday = today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today);
  monday.setDate(diffToMonday);
  
  const calendarDates = Array.from({length: 14}).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      date: d.getDate(),
      isToday: d.toDateString() === new Date().toDateString(),
      hasTask1: i === 2 || i === 4, // mock task dots
      hasTask2: i === 5 || i === 8, // mock task dots
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Study Planner</h1>
          <p className="text-gray-600 mt-1">Organize your learning schedule and track assignments.</p>
        </div>
        <button 
          onClick={addTask}
          className="px-4 py-2 bg-brand-navy text-white rounded-lg font-medium shadow-sm hover:bg-brand-blue transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-1" /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-brand-navy flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-brand-cyan" /> Schedule
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">Today</button>
                <button className="px-3 py-1 bg-brand-cyan text-white border border-brand-cyan rounded text-sm">Week</button>
              </div>
            </div>
            <div className="p-6">
              {/* Mock Calendar Grid */}
              <div className="grid grid-cols-7 gap-4 mb-4 text-center text-sm font-medium text-gray-500">
                <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
              </div>
              <div className="grid grid-cols-7 gap-4 text-center">
                {calendarDates.map((day, i) => (
                  <div key={i} className={`p-2 rounded-lg border ${day.isToday ? 'border-brand-cyan bg-brand-cyan/5 text-brand-navy font-bold' : 'border-transparent hover:bg-gray-50 text-gray-600'}`}>
                    {day.date}
                    {day.hasTask1 && <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full mx-auto mt-1"></div>}
                    {day.hasTask2 && <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mx-auto mt-1"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Upcoming Tasks</h2>
            <div className="space-y-3">
              {tasks.map(task => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer ${
                    task.completed 
                      ? 'bg-gray-50 border-gray-100 hover:border-brand-cyan' 
                      : 'bg-white border-brand-cyan/30 shadow-sm hover:border-brand-cyan'
                  }`}
                >
                  <div className="flex items-center">
                    {task.completed ? (
                      <CheckSquare className="w-5 h-5 text-brand-cyan mr-3 flex-shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-brand-navy'}`}>
                        {task.text}
                      </p>
                      {task.module && (
                        <p className={`text-xs font-medium mt-1 ${task.completed ? 'text-gray-400' : 'text-brand-teal'}`}>
                          {task.module}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center text-sm font-medium px-2 py-1 rounded ${
                    task.completed ? 'text-gray-400 bg-transparent' : 'text-orange-500 bg-orange-50'
                  }`}>
                    {!task.completed && <Clock className="w-4 h-4 mr-1" />} 
                    {task.due}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-brand-navy rounded-xl shadow-sm p-6 text-white">
            <h3 className="font-bold mb-2">Weekly Summary</h3>
            <p className="text-gray-300 text-sm mb-4">You have scheduled 12 hours of study time this week.</p>
            <div className="w-full bg-brand-blue rounded-full h-2 mb-2">
              <div className="bg-brand-cyan h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-right text-brand-cyan">5.5 hrs completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
