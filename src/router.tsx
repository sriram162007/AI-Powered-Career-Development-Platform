import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import StudentDashboard from '@/pages/student/Dashboard';
import ResumeAnalysis from '@/pages/student/ResumeAnalysis';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';

export const router = createBrowserRouter([
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
    element: <DashboardLayout />,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: 'resume-analysis', element: <ResumeAnalysis /> },
    ],
  },
]);
