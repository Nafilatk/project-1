import { LogOut } from 'lucide-react';

export default function SidebarLogout({
  isCollapsed,
  onLogout,
}: {
  isCollapsed: boolean;
  onLogout: () => void;
}) {
  return (
    <div className="p-4 border-t border-gray-200">
      {isCollapsed ? (
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center p-3 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all text-sm font-medium group border border-red-100"
        >
          <LogOut className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      )}
    </div>
  );
}
