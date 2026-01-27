'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Shield, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
}

interface RecentUsersProps {
  users: User[];
}

export default function RecentUsers({ users }: RecentUsersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);

  const recent = [...users].slice(0, 5);

  // Color mapping for roles - Updated for white theme
  const roleColors: Record<string, { bg: string; text: string; avatar: string }> = {
    Admin: { 
      bg: 'bg-green-50', 
      text: 'text-green-700',
      avatar: 'from-green-900 to-green-900'
    },

    default: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700',
      avatar: ' bg-blue-900'
    }
  };

  // GSAP animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Container entry animation
      gsap.from(containerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2
      });

      // Row stagger animation
      gsap.from(rowsRef.current, {
        x: -15,
        opacity: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.4
      });

      // Hover animations for rows
      rowsRef.current.forEach(row => {
        if (!row) return;
        
        row.addEventListener('mouseenter', () => {
          gsap.to(row, {
            backgroundColor: 'rgba(243, 244, 246, 0.8)',
            duration: 0.2,
            ease: "power2.out"
          });
        });

        row.addEventListener('mouseleave', () => {
          gsap.to(row, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Get role color classes
  const getRoleColor = (role: string) => {
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    return roleColors[normalizedRole] || roleColors.default;
  };

  return (
    <div 
      ref={containerRef}
      className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Recent Users</h3>
          <p className="text-sm text-gray-500 mt-1">
            Latest user registrations
          </p>
        </div>
        <Link 
          href="/Admin/users" 
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors duration-200 group"
        >
          View all
          <ChevronRight 
            size={16} 
            className="group-hover:translate-x-1 transition-transform duration-200" 
          />
        </Link>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <tbody>
            {recent.map((u: User, index: number) => {
              const roleColor = getRoleColor(u.role);
              
              return (
                <tr 
                  key={u.id} 
                  ref={el => { if (el) rowsRef.current[index] = el; }}
                  className="border-b border-gray-100 last:border-0 transition-colors duration-200 cursor-pointer"
                >
                  <td className="py-4">
                    <div className="flex gap-3 items-center">
                      <div 
                        className={`w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-br ${roleColor.avatar} text-white font-semibold shadow-sm`}
                      >
                        {u.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{u.name}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">
                    <span 
                      className={`inline-flex items-center gap-1 ${roleColor.bg} ${roleColor.text} text-xs font-medium px-3 py-1.5 rounded-full border ${roleColor.bg.replace('50', '100')}`}
                    >
                      <Shield size={12} />
                      {u.role}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      ID: {u.id}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {recent.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Shield size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}