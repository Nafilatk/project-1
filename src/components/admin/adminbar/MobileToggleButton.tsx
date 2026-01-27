import { Menu, X } from 'lucide-react';

export default function MobileToggleButton({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-white border border-gray-700"
    >
      {isOpen ? <X /> : <Menu />}
    </button>
  );
}
