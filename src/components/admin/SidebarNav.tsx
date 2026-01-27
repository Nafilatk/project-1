import Link from 'next/link';
import { menuItems } from './MenuItems';

export default function SidebarNav({
  isCollapsed,
  isActive,
  expandSidebar,
}: {
  isCollapsed: boolean;
  isActive: (path: string) => boolean;
  expandSidebar: () => void;
}) {
  return (
    <nav className="flex-1 p-4 overflow-y-auto">
      <div className="space-y-1">
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => isCollapsed && expandSidebar()}
            className={`flex items-center rounded-lg transition-all group ${
              isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
            } ${
              isActive(item.href)
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div
              className={`${
                isActive(item.href)
                  ? 'text-blue-600'
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}
            >
              {item.icon}
            </div>

            {!isCollapsed && (
              <span className="ml-3 font-medium truncate">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
