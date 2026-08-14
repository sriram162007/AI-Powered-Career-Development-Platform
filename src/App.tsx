import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import AppProviders from './contexts/AppProviders';

export default function App() {
  return (
    <AuthProvider>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </AuthProvider>
  );
}
