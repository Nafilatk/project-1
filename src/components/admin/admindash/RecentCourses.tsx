'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, Users, Clock } from 'lucide-react';
import gsap from 'gsap';

interface Course {
  id: number | string;
  name: string;
  instructor?: string;
  category?: string;
}

interface CourseDetail {
  courseId: number | string;
  modules: {
    videos: any[];
  }[];
  students?: number;
  duration?: string;
}

interface RecentCoursesProps {
  courses: Course[];
  courseDetails: CourseDetail[];
}

export default function RecentCourses({ courses, courseDetails }: RecentCoursesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Color scheme - Updated for white theme
  const categoryColors: Record<string, { bg: string; text: string }> = {
    'Development': { bg: 'bg-blue-50', text: 'text-blue-600' },
    'Design': { bg: 'bg-purple-50', text: 'text-purple-600' },
    'Business': { bg: 'bg-green-50', text: 'text-green-600' },
    'Marketing': { bg: 'bg-red-50', text: 'text-red-600' },
    'default': { bg: 'bg-gray-100', text: 'text-gray-600' }
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

      // Item stagger animation
      gsap.from(itemRefs.current, {
        x: -15,
        opacity: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.4
      });

      // Hover animations
      itemRefs.current.forEach(item => {
        if (!item) return;
        
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            backgroundColor: 'rgba(243, 244, 246, 0.8)',
            duration: 0.2,
            ease: "power2.out"
          });
          
          const chevron = item.querySelector('.course-chevron');
          if (chevron) {
            gsap.to(chevron, {
              x: 4,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            duration: 0.2,
            ease: "power2.out"
          });
          
          const chevron = item.querySelector('.course-chevron');
          if (chevron) {
            gsap.to(chevron, {
              x: 0,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      });

      // Stats counter animation
      const statItems = containerRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.from(statItems, {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.2)",
          delay: 0.6
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Get color for category
  const getCategoryColor = (category?: string) => {
    if (!category) return categoryColors.default;
    return categoryColors[category] || categoryColors.default;
  };

  // Get video count
  const getVideoCount = (courseId: string | number) => {
    const detail = courseDetails.find(d => d.courseId === courseId);
    return detail?.modules.reduce((total, module) => total + module.videos.length, 0) || 0;
  };

  // Get student count
  const getStudentCount = (courseId: string | number) => {
    const detail = courseDetails.find(d => d.courseId === courseId);
    return detail?.students || 0;
  };

  // Get duration
  const getDuration = (courseId: string | number) => {
    const detail = courseDetails.find(d => d.courseId === courseId);
    return detail?.duration || 'N/A';
  };

  const recentCourses = courses.slice(0, 5);

  return (
    <div 
      ref={containerRef}
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Recent Courses</h3>
          <p className="text-sm text-gray-500 mt-1">
            Latest added courses
          </p>
        </div>
        <Link 
          href="/Admin/Admincourses" 
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors duration-200 group"
        >
          View all
          <ChevronRight 
            size={16} 
            className="group-hover:translate-x-1 transition-transform duration-200" 
          />
        </Link>
      </div>

      {/* Course List */}
      <div className="space-y-2">
        {recentCourses.map((c, index) => {
          const videoCount = getVideoCount(c.id);
          const studentCount = getStudentCount(c.id);
          const duration = getDuration(c.id);
          const categoryColor = getCategoryColor(c.category);

          return (
            <div
              key={c.id}
              ref={el => { itemRefs.current[index] = el; }}
              className="bg-white flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border ${categoryColor.bg}`}>
                    <Play className={`w-5 h-5 ${categoryColor.text}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-gray-800 truncate">
                      {c.name}
                    </h4>
                    {c.instructor && (
                      <p className="text-sm text-gray-500 truncate">
                        by {c.instructor}
                      </p>
                    )}
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 stat-item">
                    <Play className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {videoCount} videos
                    </span>
                  </div>
                  {studentCount > 0 && (
                    <div className="flex items-center gap-1 stat-item">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">
                        {studentCount} students
                      </span>
                    </div>
                  )}
                  {duration !== 'N/A' && (
                    <div className="flex items-center gap-1 stat-item">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">
                        {duration}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <ChevronRight 
                size={18} 
                className="text-gray-400 shrink-0 ml-4 course-chevron transition-transform duration-200 group-hover:text-blue-500" 
              />
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {recentCourses.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Play size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500">No courses available</p>
          <p className="text-sm text-gray-400 mt-1">
            Add your first course to get started
          </p>
        </div>
      )}
    </div>
  );
}