'use client';

import { Course, Category } from '@/lib/types/courses';
import { Book, ChevronRight } from 'lucide-react';

interface CourseSidebarProps {
  courses: Course[];
  categories: Category[];
  selectedCourse: Course;
  onCourseSelect: (course: Course) => void;
}

export default function CourseSidebar({
  courses,
  categories,
  selectedCourse,
  onCourseSelect,
}: CourseSidebarProps) {
  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <div className="h-full bg-gray-900 text-white">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Book className="text-blue-400" />
          Learnest.ai Courses
        </h2>
        <p className="text-gray-400 text-sm mt-1">Master your skills</p>
      </div>

      {/* Course List */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">All Courses</h3>
        <div className="space-y-2">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                selectedCourse.id === course.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedCourse.id === course.id
                    ? 'bg-blue-500'
                    : 'bg-gray-700 group-hover:bg-gray-600'
                }`}>
                  <Book size={18} />
                </div>
                <div>
                  <div className="font-medium">{course.name}</div>
                  <div className="text-xs opacity-75">
                    {getCategoryName(course.categoryId)}
                  </div>
                </div>
              </div>
              <ChevronRight
                size={16}
                className={`transition-transform ${
                  selectedCourse.id === course.id ? 'rotate-90' : ''
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Progress</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
          </div>
          <div className="text-xs text-gray-400 mt-2">2 of 6 courses completed</div>
        </div>
      </div>
    </div>
  );
}