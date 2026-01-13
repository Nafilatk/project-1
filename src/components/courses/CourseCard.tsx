'use client';

import { Course } from '@/lib/types/courses';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, Target } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  isActive?: boolean;
}

export default function CourseCard({ course, isActive = false }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="block">
      <div
        className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:shadow-xl border-2 ${
          isActive 
            ? 'border-blue-500 bg-blue-50 shadow-lg' 
            : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <div className="relative mb-4">
          <Image
            src={course.thumbnail}
            alt={course.name}
            width={300}
            height={160}
            className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            <Play className="w-3 h-3 inline mr-1" /> Play
          </div>
        </div>
        
        <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-blue-600">
          {course.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center text-sm bg-linear-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full">
            <Target className="w-3 h-3 mr-1" />
            {course.level}
          </div>
        </div>
      </div>
    </Link>
  );
}
