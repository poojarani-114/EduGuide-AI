import React, { useState, useEffect } from 'react';
import { Code, Play, Terminal, FileCode2, Send, Loader2, AlertCircle, ChevronDown, List } from 'lucide-react';

type Problem = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: React.ReactNode;
  templates: Record<string, string>;
};

const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: (
      <>
        <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
        <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
        <h3 className="text-brand-navy font-bold mt-6">Example:</h3>
        <pre className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <code>Input: nums = [2,7,11,15], target = 9{'\n'}Output: [0,1]</code>
        </pre>
      </>
    ),
    templates: {
      javascript: 'function twoSum(nums, target) {\n  // Write your JavaScript code here\n  \n}',
      python: 'def twoSum(nums, target):\n    # Write your Python code here\n    pass',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your Java code here\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your C++ code here\n    }\n};'
    }
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: (
      <>
        <p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>
        <p>You must do this by modifying the input array in-place with O(1) extra memory.</p>
        <h3 className="text-brand-navy font-bold mt-6">Example:</h3>
        <pre className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <code>Input: s = ["h","e","l","l","o"]{'\n'}Output: ["o","l","l","e","h"]</code>
        </pre>
      </>
    ),
    templates: {
      javascript: 'function reverseString(s) {\n  // Write your JavaScript code here\n  \n}',
      python: 'def reverseString(s):\n    # Write your Python code here\n    pass',
      java: 'class Solution {\n    public void reverseString(char[] s) {\n        // Write your Java code here\n    }\n}',
      cpp: 'class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write your C++ code here\n    }\n};'
    }
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: (
      <>
        <p>Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a palindrome, and <code>false</code> otherwise.</p>
        <h3 className="text-brand-navy font-bold mt-6">Example:</h3>
        <pre className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <code>Input: x = 121{'\n'}Output: true</code>
        </pre>
      </>
    ),
    templates: {
      javascript: 'function isPalindrome(x) {\n  // Write your JavaScript code here\n  \n}',
      python: 'def isPalindrome(x):\n    # Write your Python code here\n    pass',
      java: 'class Solution {\n    public boolean isPalindrome(int x) {\n        // Write your Java code here\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Write your C++ code here\n    }\n};'
    }
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: (
      <>
        <p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'{'}'</code>, <code>'{'}'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
        <h3 className="text-brand-navy font-bold mt-6">Example:</h3>
        <pre className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <code>Input: s = "()[]{}"{'\n'}Output: true</code>
        </pre>
      </>
    ),
    templates: {
      javascript: 'function isValid(s) {\n  // Write your JavaScript code here\n  \n}',
      python: 'def isValid(s):\n    # Write your Python code here\n    pass',
      java: 'class Solution {\n    public boolean isValid(String s) {\n        // Write your Java code here\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your C++ code here\n    }\n};'
    }
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: (
      <>
        <p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p>
        <p>Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.</p>
        <h3 className="text-brand-navy font-bold mt-6">Example:</h3>
        <pre className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <code>Input: list1 = [1,2,4], list2 = [1,3,4]{'\n'}Output: [1,1,2,3,4,4]</code>
        </pre>
      </>
    ),
    templates: {
      javascript: 'function mergeTwoLists(list1, list2) {\n  // Write your JavaScript code here\n  \n}',
      python: 'def mergeTwoLists(list1, list2):\n    # Write your Python code here\n    pass',
      java: 'class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your Java code here\n    }\n}',
      cpp: 'class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your C++ code here\n    }\n};'
    }
  }
];

const extensions: Record<string, string> = {
  javascript: 'solution.js',
  python: 'solution.py',
  java: 'Solution.java',
  cpp: 'solution.cpp'
};

export const CodingPractice: React.FC = () => {
  const [activeProblemId, setActiveProblemId] = useState(problems[0].id);
  const activeProblem = problems.find(p => p.id === activeProblemId)!;
  
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(activeProblem.templates['javascript']);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'submitting' | 'success' | 'error'>('idle');

  // Reset code when problem changes
  useEffect(() => {
    setCode(activeProblem.templates[language]);
    setOutput('');
    setStatus('idle');
  }, [activeProblemId, language]);

  const handleRun = () => {
    setStatus('running');
    setOutput('Running test cases...');
    setTimeout(() => {
      if (code.trim() === activeProblem.templates[language].trim()) {
        setOutput('Running test cases...\n\nTest Case 1 -> Failed ❌\nOutput: undefined');
        setStatus('error');
      } else {
        setOutput('Running test cases...\n\nTest Case 1 -> Passed ✅\nTest Case 2 -> Passed ✅\nTest Case 3 -> Passed ✅');
        setStatus('success');
      }
    }, 1200);
  };

  const handleSubmit = () => {
    setStatus('submitting');
    setOutput('Evaluating submission against hidden test cases...');
    setTimeout(() => {
      if (code.trim() === activeProblem.templates[language].trim()) {
        setOutput('Evaluating submission...\n\n❌ Wrong Answer\n\n54 / 57 test cases failed.');
        setStatus('error');
      } else {
        setOutput(`Evaluating submission...\n\nAll 57 hidden test cases passed. ✅\n\nRuntime: 54 ms, faster than 91.56% of submissions.\nMemory Usage: 42.1 MB, less than 85.12% of submissions.\n\nGreat job! You have completed the ${activeProblem.title} challenge.`);
        setStatus('success');
      }
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto space-y-6 pb-12" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy flex items-center">
            <Code className="w-8 h-8 mr-3 text-brand-cyan" /> Coding Practice
          </h1>
          <p className="text-gray-600 mt-1">Hone your skills with interactive coding challenges.</p>
        </div>
        
        <div className="flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
          <List className="w-5 h-5 text-gray-500 mr-2" />
          <select 
            value={activeProblemId}
            onChange={(e) => setActiveProblemId(e.target.value)}
            className="bg-transparent text-brand-navy font-bold focus:outline-none appearance-none pr-8 cursor-pointer relative z-10"
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            {problems.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 -ml-6 z-0" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Problem Description */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4 font-bold text-brand-navy flex items-center">
            <FileCode2 className="w-5 h-5 mr-2 text-gray-500" /> {activeProblem.title}
            <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">{activeProblem.difficulty}</span>
          </div>
          <div className="p-6 overflow-y-auto flex-1 prose prose-sm max-w-none text-gray-600">
            {activeProblem.description}
          </div>
        </div>

        {/* Right: Code Editor & Terminal */}
        <div className="flex flex-col space-y-6">
          <div className="bg-[#1e1e1e] rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden border border-gray-800">
            <div className="bg-[#2d2d2d] border-b border-[#404040] p-3 flex justify-between items-center text-gray-300 text-sm font-medium">
              <div className="flex items-center space-x-4">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-[#1e1e1e] border border-[#555] rounded px-2 py-1 text-gray-300 focus:outline-none focus:border-brand-cyan"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python 3</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <span>{extensions[language]}</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleRun}
                  disabled={status === 'running' || status === 'submitting'}
                  className="bg-gray-700 text-white px-4 py-1.5 rounded flex items-center hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  {status === 'running' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" fill="currentColor" />}
                  Run
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={status === 'running' || status === 'submitting'}
                  className="bg-brand-cyan text-white px-4 py-1.5 rounded flex items-center hover:bg-teal-500 transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                  Submit
                </button>
              </div>
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="flex-1 w-full bg-[#1e1e1e] text-gray-300 font-mono p-4 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className={`rounded-xl border shadow-sm p-4 h-48 flex flex-col transition-colors ${
            status === 'success' ? 'bg-green-50 border-green-200' : 
            status === 'error' ? 'bg-red-50 border-red-200' : 'bg-gray-900 border-gray-800'
          }`}>
            <div className={`font-bold flex items-center mb-2 ${
              status === 'success' ? 'text-green-700' : 
              status === 'error' ? 'text-red-700' : 'text-gray-400'
            }`}>
              {status === 'error' ? <AlertCircle className="w-4 h-4 mr-2" /> : <Terminal className="w-4 h-4 mr-2" />} 
              {status === 'success' ? 'Success!' : status === 'error' ? 'Test Failed' : 'Output Console'}
            </div>
            <pre className={`flex-1 overflow-y-auto text-sm font-mono whitespace-pre-wrap ${
              status === 'success' ? 'text-green-600' : 
              status === 'error' ? 'text-red-600' : 'text-gray-400'
            }`}>
              {output || '> Ready. Select a language and write your solution.'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
