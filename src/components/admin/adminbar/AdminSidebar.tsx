'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';

import SidebarToggle from './SidebarToggle';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';
import SidebarLogout from './SidebarLogout';
import MobileSidebar from './MobileSidebar';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutUser } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/Admin') return pathname === path;
    return pathname.startsWith(path);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logoutUser();
      router.push('/');
    }
  };

  return (
    <>
      <SidebarToggle
        isOpen={isMobileMenuOpen}
        toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300 shadow-sm ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          toggle={() => setIsCollapsed(!isCollapsed)}
        />

        <SidebarNav
          isCollapsed={isCollapsed}
          isActive={isActive}
          expandSidebar={() => setIsCollapsed(false)}
        />

        <SidebarLogout
          isCollapsed={isCollapsed}
          onLogout={handleLogout}
        />
      </aside>

      <MobileSidebar
        isOpen={isMobileMenuOpen}
        close={() => setIsMobileMenuOpen(false)}
        isActive={isActive}
        onLogout={handleLogout}
      />
    </>
  );
}
