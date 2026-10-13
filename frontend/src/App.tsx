import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';

import { Dashboard } from './components/Dashboard';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { CareerPaths } from './components/CareerPaths';
import { CareerDetails } from './components/CareerDetails';
import { Courses } from './components/Courses';
import { CoursePlayer } from './components/CoursePlayer';
import { Roadmap } from './components/Roadmap';
import { StudyPlanner } from './components/StudyPlanner';
import { AIAssistant } from './components/AIAssistant';
import { CodingPractice } from './components/CodingPractice';
import { Analytics } from './components/Analytics';

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          
          {/* Dashboard Nested Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="careers" element={<CareerPaths />} />
            <Route path="careers/:id" element={<CareerDetails />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CoursePlayer />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="planner" element={<StudyPlanner />} />
            <Route path="ai" element={<AIAssistant />} />
            <Route path="practice" element={<CodingPractice />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
