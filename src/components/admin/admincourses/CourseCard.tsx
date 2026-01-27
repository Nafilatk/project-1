'use client';

import { useEffect, useRef } from 'react';
import { Edit, Trash2, ChevronDown, ChevronUp, Clock, Layers, Play, BookOpen } from 'lucide-react';
import gsap from 'gsap';

interface CourseCardProps {
  course: any;
  detail: any;
  category: any;
  isOpen: boolean;
  onEdit: (course: any) => void;
  onDelete: (id: string) => void;
  onToggleExpand: () => void;
}

export default function CourseCard({ 
  course, 
  detail, 
  category, 
  isOpen, 
  onEdit, 
  onDelete, 
  onToggleExpand 
}: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Entry animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, []);

  // Expand/collapse animation
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isOpen]);

  const totalVideos = detail?.modules?.reduce((t: number, m: any) => t + (m.videos?.length || 0), 0) || 0;

  return (
    <div 
      ref={cardRef}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {course.thumbnail && (
                <img 
                  src={course.thumbnail} 
                  alt={course.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{course.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{course.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {category && (
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {category.name}
                    </span>
                  )}
                  {course.duration && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                  )}
                  {course.level && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.level === 'Beginner' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                        : course.level === 'Intermediate'
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                    }`}>
                      {course.level}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    <Layers size={14} />
                    {totalVideos} videos
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(course)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <Edit size={14} />
              Edit
            </button>
            <button
              onClick={() => onDelete(course.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <Trash2 size={14} />
              Delete
            </button>
            <button
              onClick={onToggleExpand}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {isOpen ? (
                <>
                  <ChevronUp size={14} />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Show
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modules and Videos Section */}
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          {isOpen && detail?.modules && detail.modules.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Course Content</h4>
              <div className="space-y-4">
                {detail.modules.map((module: any, moduleIndex: number) => (
                  <div key={module.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h5 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <Layers size={16} />
                      {module.title}
                    </h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {module.videos?.map((video: any) => (
                        <div key={video.id} className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                          <div className="flex items-start gap-3">
                            {video.thumbnail && (
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-800 dark:text-white text-sm mb-1">{video.title}</h6>
                              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-1">
                                {video.duration && (
                                  <span className="inline-flex items-center gap-1">
                                    <Play size={10} />
                                    {video.duration}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{video.description}</p>
                              {video.ebookUrl && (
                                <a 
                                  href={video.ebookUrl} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs"
                                >
                                  <BookOpen size={12} />
                                  Ebook
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}