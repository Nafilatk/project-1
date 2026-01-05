'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
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
      href: '/Admin/courses' 
    },
    { 
      icon: <FileText className="h-5 w-5" />, 
      label: 'Ebooks', 
      href: '/Admin/ebooks' 
    },
    { 
      icon: <Users className="h-5 w-5" />, 
      label: 'Users', 
      href: '/Admin/users' 
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-white border border-gray-700 hover:bg-gray-700 transition-colors"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <aside
        className={`hidden lg:flex flex-col bg-gray-900 border-r border-gray-800 h-screen transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-6 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                  <p className="text-xs text-gray-400">Management System</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-600">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isCollapsed && setIsCollapsed(false)}
              className={`flex items-center rounded-lg transition-all group ${
                isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
              } ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-green-600/20 to-green-800/20 text-green-400 border-l-4 border-green-500 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <div className={isActive(item.href) ? 'text-green-500' : 'text-current group-hover:text-green-400'}>
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="ml-3 font-medium truncate">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>


          
          {!isCollapsed && (
            <button className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all text-sm font-medium group">
              <LogOut className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Logout
            </button>
          )}
      </aside>

      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Mobile Header */}
        <div className="p-6 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-gray-400">Management System</p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Custom Scrollbar */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-600">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-green-600/20 to-green-800/20 text-green-400 border-l-4 border-green-500 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <div className={isActive(item.href) ? 'text-green-500' : 'text-current'}>
                {item.icon}
              </div>
              <span className="ml-3 font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile User Profile */}
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          
          <button className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all text-sm font-medium">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
