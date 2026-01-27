'use client';

import { useEffect, useRef } from 'react';
import UserRow from './UsersRow';
import gsap from 'gsap';

export default function UsersTable(props: any) {
  const { users, onToggleBlock, onDelete, formatDate } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2
      });

      const header = containerRef.current?.querySelector('thead');
      if (header) {
        gsap.from(header, {
          y: -10,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.4
        });
      }

      const rows = containerRef.current?.querySelectorAll('tbody tr');
      if (rows && rows.length > 0) {
        gsap.from(rows, {
          x: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.6
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [users]);

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table 
          ref={tableRef}
          className="w-full"
        >
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                <th 
                  key={h} 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td 
                  colSpan={6} 
                  className="px-6 py-12 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <svg 
                        className="w-6 h-6 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.67 3.107a6 6 0 00-.67-2.577"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500">No users found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user: any, index: number) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onToggleBlock={onToggleBlock}
                  onDelete={onDelete}
                  formatDate={formatDate}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}