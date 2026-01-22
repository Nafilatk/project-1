'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-context";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/Admin') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const menuItems = [
    { 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: 'Dashboard', 
      href: '/Admin' 
    },
    { 
      icon: <BookOpen className="h-5 w-5" />, 
      label: 'Courses', 
      href: '/Admin/Admincourses' 
    },
    { 
      icon: <Users className="h-5 w-5" />, 
      label: 'Users', 
      href: '/Admin/users' 
    }
  ];

  const { logoutUser } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logoutUser();
      router.push('/');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-lg text-white border border-blue-700 hover:bg-blue-700 transition-colors shadow-md"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300 shadow-sm ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Learnest.ai</h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isCollapsed && setIsCollapsed(false)}
                className={`flex items-center rounded-lg transition-all group ${
                  isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
                } ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className={`${isActive(item.href) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-3 font-medium truncate">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-200">
          {isCollapsed ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all text-sm font-medium group border border-red-100"
            >
              <LogOut className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out shadow-xl ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Mobile Header */}
        <div className="p-6 border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Learnest.ai</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className={`${isActive(item.href) ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                <span className="ml-3 font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all text-sm font-medium border border-red-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}