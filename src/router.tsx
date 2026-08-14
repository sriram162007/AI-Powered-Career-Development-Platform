import { type RouteObject, createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import StudentDashboard from '@/pages/student/Dashboard';
import ResumeAnalysis from '@/pages/student/ResumeAnalysis';
import ResumeUpload from '@/pages/student/ResumeUpload';
import CareerPath from '@/pages/student/CareerPath';
import SkillsPage from '@/pages/student/Skills';
import MockInterviews from '@/pages/student/MockInterviews';
import AnalyticsPage from '@/pages/student/Analytics';
import SettingsPage from '@/pages/student/Settings';
import CareerProfile from '@/pages/student/CareerProfile';
import SkillsManagement from '@/pages/student/SkillsManagement';
import CoursesPage from '@/pages/student/CoursesPage';
import CertificatesPage from '@/pages/student/CertificatesPage';
import ProjectsPage from '@/pages/student/ProjectsPage';
import InternshipsPage from '@/pages/student/InternshipsPage';
import ResumeBuilder from '@/pages/student/ResumeBuilder';
import CareerReadinessEngine from '@/pages/student/CareerReadinessEngine';
import ProfileCompleteness from '@/pages/student/ProfileCompleteness';
import CareerDiscovery from '@/pages/student/CareerDiscovery';
import CareerDetails from '@/pages/student/CareerDetails';
import SkillGap from '@/pages/student/SkillGap';
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
      id: 'career-discovery',
      path: '/career-discovery',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <CareerDiscovery /> },
        { path: ':careerId', element: <CareerDetails /> },
      ],
    },
    {
      id: 'skill-gap',
      path: '/skill-gap',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <SkillGap /> },
      ],
    },
    {
      id: 'resume-upload',
      path: '/resume-upload',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <ResumeUpload /> },
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
    {
      id: 'profile',
      path: '/profile',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <CareerProfile /> },
      ],
    },
    {
      id: 'skills-management',
      path: '/skills-management',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <SkillsManagement /> },
      ],
    },
    {
      id: 'courses',
      path: '/courses',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <CoursesPage /> },
      ],
    },
    {
      id: 'certificates',
      path: '/certificates',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <CertificatesPage /> },
      ],
    },
    {
      id: 'projects',
      path: '/projects',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <ProjectsPage /> },
      ],
    },
    {
      id: 'internships',
      path: '/internships',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <InternshipsPage /> },
      ],
    },
    {
      id: 'resume-builder',
      path: '/resume-builder',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <ResumeBuilder /> },
      ],
    },
    {
      id: 'career-readiness',
      path: '/career-readiness',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <CareerReadinessEngine /> },
      ],
    },
    {
      id: 'profile-completeness',
      path: '/profile-completeness',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <ProfileCompleteness /> },
      ],
    },
  ];
}

export const router = createBrowserRouter(buildRoutes());
