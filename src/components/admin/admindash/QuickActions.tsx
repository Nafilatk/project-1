'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Users, BookOpen, PlusCircle, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: 'blue' | 'green' | 'red' | 'purple' | 'dark-blue';
}

export default function QuickActions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Color scheme - Updated for white theme
  const colorClasses: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
    'blue': {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-100 hover:border-blue-200'
    },
    'green': {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:bg-green-100 hover:border-green-200'
    },
    'red': {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      border: 'border-red-200',
      hover: 'hover:bg-red-100 hover:border-red-200'
    },
  };

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Manage Courses',
      description: 'Add, edit or remove courses',
      icon: <BookOpen className="w-5 h-5" />,
      href: '/Admin/Admincourses',
      color: 'blue'
    },
    {
      id: '2',
      title: 'Manage Users',
      description: 'View and manage all users',
      icon: <Users className="w-5 h-5" />,
      href: '/Admin/users',
      color: 'green'
    },
    {
      id: '3',
      title: 'Add New Course',
      description: 'Create a new course',
      icon: <PlusCircle className="w-5 h-5" />,
      href: '/Admin/Admincourses/new',
      color: 'red'
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Container entry animation
      gsap.from(containerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2
      });

      // Card stagger animation
      gsap.from(cardRefs.current, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)",
        delay: 0.4
      });

      // Icon animation
      gsap.from(iconRefs.current, {
        scale: 0,
        rotation: -10,
        duration: 0.4,
        stagger: 0.08,
        ease: "elastic.out(1, 0.5)",
        delay: 0.6
      });

      // Hover animations
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        const icon = iconRefs.current[index];
        const colors = colorClasses[quickActions[index].color];

        card.addEventListener('mouseenter', () => {
          // Card lift
          gsap.to(card, {
            y: -4,
            duration: 0.2,
            ease: "power2.out"
          });

          // Icon bounce
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.2,
              ease: "power2.out"
            });
          }

          // Arrow animation
          const arrow = card.querySelector('.action-arrow');
          if (arrow) {
            gsap.to(arrow, {
              x: 4,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          // Card reset
          gsap.to(card, {
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });

          // Icon reset
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.2,
              ease: "power2.out"
            });
          }

          // Arrow reset
          const arrow = card.querySelector('.action-arrow');
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
          <p className="text-sm text-gray-500 mt-1">
            Quick access to frequently used features
          </p>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const colors = colorClasses[action.color];
          
          return (
            <Link
              key={action.id}
              ref={el => { cardRefs.current[index] = el; }}
              href={action.href}
              className={`
                bg-white p-5 rounded-xl border ${colors.border} ${colors.hover}
                transition-all duration-200 transform flex flex-col
                group
              `}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div 
                    ref={el => { iconRefs.current[index] = el; }}
                    className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}
                  >
                    <div className={colors.icon}>
                      {action.icon}
                    </div>
                  </div>
                  <ArrowUpRight 
                    size={16} 
                    className={`action-arrow ${colors.icon}`}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}