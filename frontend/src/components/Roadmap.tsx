import React, { useState } from 'react';
import { MapPin, CheckCircle, Circle, Lock } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const milestones = [
    { id: 1, title: 'Programming Foundations', status: 'completed', desc: 'Variables, loops, functions, and basic logic.' },
    { id: 2, title: 'Data Structures', status: 'active', desc: 'Arrays, Linked Lists, Trees, and Hash Maps.' },
    { id: 3, title: 'Web Development Basics', status: 'locked', desc: 'HTML, CSS, and vanilla JavaScript.' },
    { id: 4, title: 'Frontend Frameworks', status: 'locked', desc: 'React, component lifecycle, and state management.' },
    { id: 5, title: 'Backend Integration', status: 'locked', desc: 'APIs, databases, and authentication.' },
  ];

  const [activeTasks, setActiveTasks] = useState([
    { id: 1, text: 'Complete Binary Tree lesson', completed: true },
    { id: 2, text: 'Practice 5 array questions', completed: false }
  ]);

  const toggleTask = (id: number) => {
    setActiveTasks(activeTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Career Roadmap</h1>
        <p className="text-gray-600 mt-1">Your step-by-step path to becoming a Software Developer.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
        <div className="absolute left-12 top-12 bottom-12 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-12 relative z-10">
          {milestones.map((milestone, i) => (
            <div key={milestone.id} className={`flex items-start ${milestone.status === 'locked' ? 'opacity-60' : ''}`}>
              <div className="mr-6 bg-white py-1">
                {milestone.status === 'completed' && <CheckCircle className="w-8 h-8 text-brand-cyan bg-white rounded-full" />}
                {milestone.status === 'active' && <MapPin className="w-8 h-8 text-brand-blue bg-white" fill="currentColor" />}
                {milestone.status === 'locked' && <Circle className="w-8 h-8 text-gray-300 bg-white rounded-full" />}
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-100 p-6 rounded-xl hover:border-brand-cyan transition-colors">
                <div className="flex justify-between items-start">
                  <h3 className={`text-lg font-bold ${milestone.status === 'active' ? 'text-brand-blue' : 'text-brand-navy'}`}>
                    Stage {i + 1}: {milestone.title}
                  </h3>
                  {milestone.status === 'locked' && <Lock className="w-4 h-4 text-gray-400" />}
                </div>
                <p className="text-gray-600 mt-2">{milestone.desc}</p>
                
                {milestone.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-brand-navy mb-2">Current Tasks:</p>
                    <ul className="space-y-2">
                      {activeTasks.map(task => (
                        <li 
                          key={task.id} 
                          onClick={() => toggleTask(task.id)}
                          className={`flex items-center text-sm cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors ${task.completed ? 'text-gray-400' : 'text-gray-700'}`}
                        >
                          {task.completed ? (
                            <CheckCircle className="w-4 h-4 text-brand-cyan mr-2 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300 mr-2 flex-shrink-0" />
                          )}
                          <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
