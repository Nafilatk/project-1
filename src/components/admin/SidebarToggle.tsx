import { Menu, X } from 'lucide-react';

export default function SidebarToggle({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-lg text-white border border-blue-700 hover:bg-blue-700 transition-colors shadow-md"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}
