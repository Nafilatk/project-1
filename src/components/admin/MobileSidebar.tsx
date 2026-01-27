import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { menuItems } from './MenuItems';

export default function MobileSidebar({
  isOpen,
  close,
  isActive,
  onLogout,
}: {
  isOpen: boolean;
  close: () => void;
  isActive: (path: string) => boolean;
  onLogout: () => void;
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="lg:hidden fixed inset-0 bg-black/30 z-40"
        onClick={close}
      />

      <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-xl">
        {/* HEADER */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Learnest.ai</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="p-4">
          {menuItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`flex items-center px-4 py-3 rounded-lg ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              onLogout();
              close();
            }}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium border border-red-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
