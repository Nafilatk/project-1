import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function SidebarHeader({
  isCollapsed,
  toggle,
}: {
  isCollapsed: boolean;
  toggle: () => void;
}) {
  return (
    <div className="p-6 border-b border-gray-200 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/logo.svg" 
              alt="Learnest.ai Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">Learnest.ai</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>

        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
    </div>
  );
}