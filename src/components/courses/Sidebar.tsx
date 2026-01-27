'use client';

import { useEffect, useRef } from 'react';
import { Course } from '@/lib/types/courses';
import gsap from 'gsap';

interface SidebarProps {
  courses: Course[];
  selectedCourse: Course | null;
  onCourseSelect: (course: Course) => void;
}

export default function Sidebar({ courses, selectedCourse, onCourseSelect }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // GSAP animations
  useEffect(() => {
    if (!sidebarRef.current) return;

    const ctx = gsap.context(() => {
      // Sidebar entry animation
      gsap.from(sidebarRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1
      });

      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.3
        });
      }

      // Button stagger animation
      gsap.from(buttonRefs.current, {
        x: -30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.5
      });

      // Hover animations for buttons
      buttonRefs.current.forEach(button => {
        if (!button) return;
        
        button.addEventListener('mouseenter', () => {
          if (button !== buttonRefs.current.find(b => b && b.dataset.selected === 'true')) {
            gsap.to(button, {
              x: 5,
              backgroundColor: 'rgba(37, 99, 235, 0.05)', // blue-600 with low opacity
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });

        button.addEventListener('mouseleave', () => {
          if (button !== buttonRefs.current.find(b => b && b.dataset.selected === 'true')) {
            gsap.to(button, {
              x: 0,
              backgroundColor: 'transparent',
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      });

    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  // Level badge colors - No orange
  const getLevelColor = (level: string, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-blue-300 text-blue-900';
    }
    
    switch(level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      case 'expert':
        return 'bg-purple-100 text-purple-800';
      case 'pro':
        return 'bg-pink-100 text-pink-800';
      case 'master':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div 
      ref={sidebarRef}
      className="h-screen bg-blue-50  border-gray-300 flex flex-col sticky top-0 left-0"
      style={{ height: '100vh' }}
    >
      {/* Header */}
      <div 
        ref={headerRef}
        className="p-5 border-b border-gray-200 bg-blue-50"
      >
        <h2 className="font-bold text-xl text-blue-700">Courses</h2>
        <p className="text-sm text-gray-600 mt-1">
          Select a course to view details
        </p>
      </div>

      {/* Scrollable Course List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          {courses.map((course, index) => {
            const isSelected = selectedCourse?.id === course.id;
            
            return (
              <button
                key={course.id}
                ref={el => { buttonRefs.current[index] = el; }}
                data-selected={isSelected}
                onClick={() => onCourseSelect(course)}
                className={`
                  w-full text-left p-4 rounded-xl mb-2 transition-all duration-200
                  flex flex-col relative overflow-hidden group
                  ${isSelected 
                    ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                    : 'text-gray-800 hover:bg-blue-50 hover:shadow-md'
                  }
                `}
              >
                {/* Selection indicator - Using bright yellow instead of orange */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
                )}

                {/* Course name */}
                <div className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                  {course.name}
                </div>
                
                {/* Course level badge */}
                <div className="mt-2">
                  <span className={`
                    inline-block px-3 py-1 text-xs font-medium rounded-full transition-all duration-200
                    ${getLevelColor(course.level, isSelected)}
                    ${isSelected ? 'shadow-sm' : ''}
                  `}>
                    {course.level}
                  </span>
                </div>

                {/* Progress indicator (optional) */}
                {course.duration && (
                  <div className="mt-3 pt-2 border-t border-gray-100/30">
                    <div className="flex items-center justify-between text-xs">
                      <span className={isSelected ? 'text-blue-100' : 'text-gray-500'}>
                        Duration
                      </span>
                      <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                        {course.duration}
                      </span>
                    </div>
                  </div>
                )}

                {/* Hover arrow for unselected */}
                {!isSelected && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>



      {/* Custom scrollbar styling */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
}