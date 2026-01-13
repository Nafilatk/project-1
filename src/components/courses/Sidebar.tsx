'use client';
import { useState } from 'react';
import { Course } from '@/lib/types/courses';
import Link from 'next/link';

interface Props {
  courses: Course[];
  onCourseSelect: (courseId: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedCourseId?: string;
}

export default function Sidebar({ courses, onCourseSelect, sidebarOpen, setSidebarOpen, selectedCourseId }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static
    `}>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b bg-gradient-to-b from-white to-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Courses
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 bg-white/80 shadow-lg"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course.id)}
              className={`w-full group flex items-center gap-4 p-5 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border transition-all shadow-sm hover:shadow-md hover:-translate-y-1 ${
                selectedCourseId === course.id ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500 shadow-blue-500/25 scale-105' : 'border-transparent hover:border-blue-200'
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-105">
                {course.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-bold text-lg text-gray-900 group-hover:text-blue-700 truncate">{course.name}</p>
                <p className="text-sm text-gray-600">{course.duration}</p>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
