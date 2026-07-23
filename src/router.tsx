import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import LandingPage from '@/pages/LandingPage';

export const router = createBrowserRouter([
  {
    id: 'landing',
    path: '/',
    element: <LandingPage />,
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [],
  },
]);
