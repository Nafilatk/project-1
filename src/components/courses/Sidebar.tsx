import { Course } from '@/lib/types/courses';

interface SidebarProps {
  courses: Course[];
  selectedCourse: Course | null;
  onCourseSelect: (course: Course) => void;
}

export default function Sidebar({ courses, selectedCourse, onCourseSelect }: SidebarProps) {
  return (
    <div className="h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-bold text-lg">Courses</h2>
      </div>


      <div className="p-2">
        {courses.map(course => (
          <button
            key={course.id}
            onClick={() => onCourseSelect(course)}
            className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
              selectedCourse?.id === course.id
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <div className="font-medium">{course.name}</div>
            <div className="text-xs mt-1">
              <span className="px-2 py-1 bg-gray-700 rounded">
                {course.level}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}