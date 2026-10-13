import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle, FileText, ChevronDown, ChevronRight } from 'lucide-react';

export const CoursePlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isPython = id === '1';
  const courseTitle = isPython ? 'Python for Beginners' : 'Data Structures & Algorithms';
  const provider = isPython ? 'EduGuide Labs' : 'TechUniversity';

  const [expandedModules, setExpandedModules] = useState<number[]>([0, 1]);
  const [activeLessonIdx, setActiveLessonIdx] = useState({ modIndex: 1, lessIndex: 0 });

  const modules = [
    {
      title: 'Module 1: Introduction',
      duration: '45 min',
      completed: true,
      lessons: [
        { title: 'Welcome to the Course', type: 'video', duration: '5:00', completed: true, desc: 'An overview of what we will cover.' },
        { title: 'Setting up your Environment', type: 'video', duration: '15:30', completed: true, desc: 'How to install necessary tools and IDE.' },
        { title: 'Hello World Program', type: 'video', duration: '20:00', completed: true, desc: 'Writing your very first program.' },
        { title: 'Module 1 Quiz', type: 'quiz', duration: '5:00', completed: true, desc: 'Test your knowledge on Module 1.' },
      ]
    },
    {
      title: 'Module 2: Core Concepts',
      duration: '1 hr 15 min',
      completed: false,
      lessons: [
        { title: 'Variables and Data Types', type: 'video', duration: '18:45', completed: false, desc: 'In this lesson, we will explore how to declare variables and understand the fundamental data types available in the language. You will learn about integers, strings, booleans, and floats, and how they behave in memory.' },
        { title: 'Control Flow (If/Else)', type: 'video', duration: '22:10', completed: false, desc: 'Learn how to make decisions in your code using conditional statements.' },
        { title: 'Loops (For and While)', type: 'video', duration: '25:00', completed: false, desc: 'Understand how to iterate over sequences and run code repeatedly.' },
        { title: 'Practice Exercises', type: 'exercise', duration: '10:00', completed: false, desc: 'Hands-on practice with loops and conditionals.' },
      ]
    },
    {
      title: 'Module 3: Functions and Modules',
      duration: '2 hrs',
      completed: false,
      lessons: [
        { title: 'Defining Functions', type: 'video', duration: '30:00', completed: false, desc: 'How to encapsulate logic into reusable blocks of code.' },
        { title: 'Scope and Arguments', type: 'video', duration: '25:00', completed: false, desc: 'Understanding local vs global scope and passing parameters.' },
        { title: 'Importing Modules', type: 'video', duration: '20:00', completed: false, desc: 'How to use external libraries to supercharge your code.' },
      ]
    }
  ];

  const toggleModule = (index: number) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter(i => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };

  const activeLessonData = modules[activeLessonIdx.modIndex].lessons[activeLessonIdx.lessIndex];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="bg-brand-navy p-4 flex items-center text-white border-b border-brand-navy/80">
        <button onClick={() => navigate('/dashboard/courses')} className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-bold text-lg">{courseTitle}</h1>
          <p className="text-xs text-brand-cyan">{provider}</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area (Video Player) */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
          <div className="w-full bg-black aspect-video relative flex items-center justify-center">
            {/* Fake Video Player */}
            <div className="absolute inset-0 bg-brand-navy/90 flex flex-col items-center justify-center">
              {activeLessonData.type === 'video' ? (
                <>
                  <button className="w-16 h-16 bg-brand-cyan text-white rounded-full flex items-center justify-center hover:bg-teal-500 hover:scale-110 transition-all shadow-lg">
                    <PlayCircle className="w-8 h-8 ml-1" />
                  </button>
                  <h2 className="text-white mt-6 font-bold text-xl">{activeLessonData.title}</h2>
                  <p className="text-gray-300 text-sm mt-2">Module {activeLessonIdx.modIndex + 1} • Lesson {activeLessonIdx.lessIndex + 1}</p>
                </>
              ) : (
                <div className="text-center">
                  <FileText className="w-16 h-16 text-brand-cyan mx-auto mb-4" />
                  <h2 className="text-white font-bold text-xl">{activeLessonData.title}</h2>
                  <p className="text-gray-300 text-sm mt-2">Interactive {activeLessonData.type}</p>
                  <button className="mt-6 px-6 py-2 bg-brand-cyan text-white rounded-lg font-bold hover:bg-teal-500 transition-colors">
                    Start {activeLessonData.type === 'quiz' ? 'Quiz' : 'Exercise'}
                  </button>
                </div>
              )}
            </div>
            {/* Fake progress bar */}
            {activeLessonData.type === 'video' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <div className="h-full bg-brand-cyan w-1/3 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-cyan rounded-full shadow"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-8">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">{activeLessonData.title}</h2>
            <div className="prose max-w-none text-gray-600">
              <p>{activeLessonData.desc}</p>
              
              <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-brand-navy mb-4">Lesson Materials</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center text-brand-teal hover:text-brand-cyan">
                    <FileText className="w-4 h-4 mr-2" /> Download Slides (PDF)
                  </a>
                  <a href="#" className="flex items-center text-brand-teal hover:text-brand-cyan">
                    <FileText className="w-4 h-4 mr-2" /> Source Code (ZIP)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Syllabus) */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto hidden md:block">
          <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-brand-navy">
            Course Content
          </div>
          <div className="divide-y divide-gray-100">
            {modules.map((mod, modIndex) => {
              const isExpanded = expandedModules.includes(modIndex);
              return (
                <div key={modIndex} className="">
                  <div 
                    onClick={() => toggleModule(modIndex)}
                    className="p-4 bg-gray-50/50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy">{mod.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{mod.completed ? 'Completed' : mod.duration}</p>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  </div>
                  
                  {isExpanded && (
                    <div className="py-2">
                      {mod.lessons.map((lesson, lessIndex) => {
                        const isActive = activeLessonIdx.modIndex === modIndex && activeLessonIdx.lessIndex === lessIndex;
                        return (
                          <div 
                            key={lessIndex} 
                            onClick={() => setActiveLessonIdx({ modIndex, lessIndex })}
                            className={`px-4 py-3 flex items-start cursor-pointer transition-colors ${isActive ? 'bg-brand-cyan/10 border-l-4 border-brand-cyan' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                          >
                            <div className="mr-3 mt-0.5">
                              {lesson.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : lesson.type === 'video' ? (
                                <PlayCircle className={`w-4 h-4 ${isActive ? 'text-brand-cyan' : 'text-gray-400'}`} />
                              ) : (
                                <FileText className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${isActive ? 'font-bold text-brand-navy' : 'font-medium text-gray-700'}`}>{lesson.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
