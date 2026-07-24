import { type RouteObject, createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import StudentDashboard from '@/pages/student/Dashboard';
import ResumeAnalysis from '@/pages/student/ResumeAnalysis';
import CareerPath from '@/pages/student/CareerPath';
import SkillsPage from '@/pages/student/Skills';
import MockInterviews from '@/pages/student/MockInterviews';
import AnalyticsPage from '@/pages/student/Analytics';
import SettingsPage from '@/pages/student/Settings';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import { useAuth } from '@/contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-navy-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-200 border-t-orange-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function buildRoutes(): RouteObject[] {
  return [
    {
      id: 'landing',
      path: '/',
      element: <LandingPage />,
    },
    {
      id: 'login',
      path: '/login',
      element: <LoginPage />,
    },
    {
      id: 'register',
      path: '/register',
      element: <RegisterPage />,
    },
    {
      id: 'dashboard',
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <StudentDashboard /> },
        { path: 'resume-analysis', element: <ResumeAnalysis /> },
      ],
    },
    {
      id: 'career-path',
      path: '/career-path',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <CareerPath /> },
      ],
    },
    {
      id: 'skills',
      path: '/skills',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <SkillsPage /> },
      ],
    },
    {
      id: 'interviews',
      path: '/interviews',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <MockInterviews /> },
      ],
    },
    {
      id: 'analytics',
      path: '/analytics',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <AnalyticsPage /> },
      ],
    },
    {
      id: 'settings',
      path: '/settings',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <SettingsPage /> },
      ],
    },
  ];
}

export const router = createBrowserRouter(buildRoutes());
