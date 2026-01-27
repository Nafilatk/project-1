'use client';

import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import gsap from 'gsap';

export default function UsersSearchBar(props: any) {
  const { searchTerm, setSearchTerm, total, filtered } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1
      });

      if (inputRef.current) {
        inputRef.current.addEventListener('focus', () => {
          gsap.to(inputRef.current, {
            scale: 1.02,
            borderColor: '#3b82f6', 
            duration: 0.2,
            ease: "power2.out"
          });
        });

        inputRef.current.addEventListener('blur', () => {
          gsap.to(inputRef.current, {
            scale: 1,
            borderColor: '#e5e7eb',
            duration: 0.2,
            ease: "power2.out"
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-white p-6 border border-gray-200 rounded-xl mb-6 flex justify-between items-center shadow-sm"
    >
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="text-sm text-gray-500">
        Showing <span className="font-semibold text-blue-600">{filtered}</span> of{' '}
        <span className="font-semibold text-gray-700">{total}</span> users
      </div>
    </div>
  );
}