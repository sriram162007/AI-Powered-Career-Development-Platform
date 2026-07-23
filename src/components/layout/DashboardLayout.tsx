import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-navy-50 font-sans antialiased text-navy-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
