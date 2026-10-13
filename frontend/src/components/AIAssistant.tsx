import React, { useState } from 'react';
import { Send, Bot, User, Brain, Paperclip, MoreHorizontal, Loader2 } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your EduGuide AI Assistant. How can I help you with your studies or career planning today?' },
    { role: 'user', content: 'Can you explain the difference between a list and a tuple in Python?' },
    { role: 'ai', content: 'Certainly! Both lists and tuples are used to store multiple items in a single variable in Python, but they have a key difference:\n\n**Lists are mutable:** This means you can change, add, or remove items after the list has been created. They are defined using square brackets `[]`.\n\n**Tuples are immutable:** Once a tuple is created, you cannot change its values. They are defined using parentheses `()`.\n\nUse a list when you expect the data to change, and a tuple when the data should remain constant.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: text.trim() }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const fallbacks = [
        "Hmm, that's an interesting topic! As a prototype AI for this demo, my knowledge is currently focused on Python, React, and Study Planning. Could you try asking me about one of those?",
        "I'm still learning! For this preview version, I'm best at answering questions about your coding curriculum. Want to try a Python quiz?",
        "That's a great point! While I can't fully answer that right now, in the final production version of EduGuide AI, I'll be able to tap into the full knowledge base to help you with that.",
        "I see what you're asking! Since I'm currently a mock assistant, try clicking one of the suggested prompts below to see how I handle specific course content!"
      ];
      
      let aiResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      
      const lowerText = text.toLowerCase();
      
      if (lowerText.match(/\b(how are you|how are u|how are ya)\b/)) {
        aiResponse = "I'm doing great, thanks for asking! 🤖 I'm here and ready to help you crush your learning goals. What should we tackle today?";
      } else if (lowerText.match(/\b(hi|hello|hey|greetings|hola)\b/)) {
        aiResponse = "Hello there! 👋 How can I assist you with your learning goals or career roadmap today?";
      } else if (lowerText.match(/\b(doubt|help|question|stuck|confused)\b/)) {
        aiResponse = "I'm here to help! Please go ahead and explain your doubt or question in detail. Whether it's a coding bug or a conceptual misunderstanding, we'll figure it out together.";
      } else if (lowerText.match(/\b(who are you|what are you)\b/)) {
        aiResponse = "I am the EduGuide AI Assistant! I'm an intelligent tutor built directly into your dashboard to help explain concepts, generate quizzes, and guide your career path.";
      } else if (lowerText.includes('python')) {
        aiResponse = "Python is an amazing language! It's a high-level, interpreted programming language known for its readability and ease of use. It's widely used in web development, data science, and AI. Would you like to try a quick quiz on Python basics?";
      } else if (lowerText.includes('react')) {
        aiResponse = "React Hooks are functions that let you \"hook into\" React state and lifecycle features from function components. The most common ones are `useState` (for managing local state) and `useEffect` (for handling side effects like data fetching).";
      } else if (lowerText.includes('study plan')) {
        aiResponse = "To build an effective study plan, I recommend the Pomodoro technique: study for 25 minutes, then take a 5-minute break. If you tell me which course you are focusing on, I can generate a customized weekly schedule for you!";
      } else if (lowerText.includes('ai') || lowerText.includes('artificial intelligence')) {
        aiResponse = "Artificial Intelligence (AI) refers to the simulation of human intelligence by software-coded heuristics. In the context of EduGuide, I use AI to analyze your skills, recommend optimal career paths, and provide personalized tutoring on complex topics!";
      } else if (lowerText.includes('thank')) {
        aiResponse = "You're very welcome! Keep up the great work with your studies. I'm always here if you need more help. 🚀";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="bg-brand-navy p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h2 className="font-bold">EduGuide AI Assistant</h2>
            <p className="text-xs text-gray-300">Always here to help you learn</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-brand-cyan text-brand-navy ml-3' : 'bg-brand-navy text-white mr-3'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-brand-cyan text-brand-navy rounded-tr-none' 
                  : 'bg-white border border-gray-200 text-brand-navy shadow-sm rounded-tl-none whitespace-pre-wrap'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] flex-row">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-brand-navy text-white mr-3">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-200 text-brand-navy shadow-sm rounded-tl-none flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <button className="p-3 text-gray-400 hover:text-brand-navy transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea 
              rows={1}
              placeholder="Ask me anything..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full resize-none py-3 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-colors ${
                inputValue.trim() && !isTyping ? 'bg-brand-cyan text-white hover:bg-teal-500' : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="mt-3 flex justify-center space-x-2">
          {['Quiz me on Python', 'Explain React Hooks', 'Write a study plan'].map((suggestion, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(suggestion)}
              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
