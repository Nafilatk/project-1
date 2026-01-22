import { Course } from '@/lib/types/courses';

interface SidebarProps {
  courses: Course[];
  selectedCourse: Course | null;
  onCourseSelect: (course: Course) => void;
}

export default function Sidebar({ courses, selectedCourse, onCourseSelect }: SidebarProps) {
  return (
    <div className="h-full bg-[#F7F8FA]">
      <div className="p-4 border-b border-[#66A6FF]/30">
        <h2 className="font-bold text-lg text-[#333333]">Courses</h2>
      </div>

      <div className="p-2">
        {courses.map(course => (
          <button
            key={course.id}
            onClick={() => onCourseSelect(course)}
            className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 ${
              selectedCourse?.id === course.id
                ? 'bg-[#0056D2] text-white shadow-sm'
                : 'text-[#333333] hover:bg-[#66A6FF]/10 hover:shadow-sm'
            }`}
          >
            <div className="font-medium">{course.name}</div>
            <div className="text-xs mt-1">
              <span className={`px-2 py-1 rounded transition-colors ${
                selectedCourse?.id === course.id
                  ? 'bg-[#66A6FF]/30 text-white'
                  : 'bg-[#66A6FF]/10 text-[#333333]'
              }`}>
                {course.level}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}