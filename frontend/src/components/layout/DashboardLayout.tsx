import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LogOut, 
  BookOpen, 
  LayoutDashboard, 
  Target, 
  Map, 
  MessageSquare, 
  Calendar, 
  Settings,
  Bell,
  Code,
  X,
  Loader2,
  Check,
  BarChart3,
  Lock
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setIsSettingsOpen(false);
      }, 1000);
    }, 1200);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Career Paths', path: '/dashboard/careers', icon: Target },
    { name: 'Courses', path: '/dashboard/courses', icon: BookOpen },
    { name: 'Roadmap', path: '/dashboard/roadmap', icon: Map },
    { name: 'Study Planner', path: '/dashboard/planner', icon: Calendar },
    { name: 'Coding Practice', path: '/dashboard/practice', icon: Code },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'AI Assistant', path: '/dashboard/ai', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy text-white flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-brand-cyan" />
          <span className="text-xl font-bold tracking-tight">EduGuide AI</span>
        </div>
        
        <nav className="flex-1 px-4 mt-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-brand-blue border-l-4 border-brand-cyan text-white' 
                    : 'text-gray-300 hover:bg-brand-blue hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-brand-blue">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center justify-between mb-4 px-2 py-2 hover:bg-brand-blue/50 rounded-lg transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="text-sm">
                <p className="font-medium text-white truncate max-w-[120px]">{user?.name}</p>
                <p className="text-gray-400 text-xs">View Profile</p>
              </div>
            </div>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-brand-blue rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className="flex-1 ml-64 flex flex-col h-screen overflow-hidden transition-all duration-300"
        style={isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)', backgroundColor: '#fff' } : {}}
      >
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-end px-8 z-0">
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-brand-navy transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-gray-400 hover:text-brand-navy transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200" style={{ filter: 'none' }}>
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-brand-navy flex items-center">
                <Settings className="w-5 h-5 mr-2 text-brand-cyan" /> 
                Account Settings
              </h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">Profile Information</h3>
                <div className="space-y-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name || ''} 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-cyan text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email || ''} 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-cyan text-sm" 
                    />
                  </div>
                  <div className="pt-2">
                    <button className="text-sm font-medium text-brand-cyan hover:text-brand-blue transition-colors flex items-center">
                      <Lock className="w-4 h-4 mr-1" /> Reset Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">Preferences</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-600">Weekly progress reports and tips</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-cyan" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Play Videos</label>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-600">Automatically play next course module</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-cyan" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dark Mode</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-600">Enable dark theme prototype</span>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-brand-cyan" 
                      checked={isDarkMode}
                      onChange={(e) => setIsDarkMode(e.target.checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">Privacy & Security</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Public Profile</label>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-600">Allow recruiters to see my roadmap progress</span>
                    <input type="checkbox" className="w-4 h-4 accent-brand-cyan" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Two-Factor Authentication</label>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-600">Secure your account with 2FA</span>
                    <button className="px-3 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-medium text-brand-navy hover:bg-gray-200">Set Up</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={handleSaveSettings}
                disabled={isSaving || isSaved}
                className={`px-6 py-2 text-white rounded font-medium flex items-center transition-colors shadow-sm ${
                  isSaved ? 'bg-green-500' : 'bg-brand-navy hover:bg-brand-blue'
                }`}
              >
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isSaved && <Check className="w-4 h-4 mr-2" />}
                {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
