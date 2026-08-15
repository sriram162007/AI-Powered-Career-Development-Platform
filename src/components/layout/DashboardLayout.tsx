import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { MobileSidebarProvider } from '@/contexts/MobileSidebarContext';
import { MobileSidebarDrawer } from '@/components/layout/MobileSidebarDrawer';

export function DashboardLayout() {
  return (
    <MobileSidebarProvider>
      <div className="flex h-screen bg-navy-50 font-sans antialiased text-navy-900 overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <MobileSidebarDrawer />
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
}
