"use client";

import { useEffect, useState } from "react";

type Course = { id: number; name: string };

interface CourseSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCourse: number | null;
  onSelectCourse: (id: number | null) => void;
}

export default function CourseSidebar({
  search,
  onSearchChange,
  selectedCourse,
  onSelectCourse,
}: CourseSidebarProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/courses")
      .then((r) => r.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <aside className="h-screen w-80 bg-white text-neutral-900 flex flex-col px-4 py-3 gap-6 border-r border-neutral-200">
      {/* top home bar */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-xl text-blue-600">🏠</span>
        </div>
        <button className="flex-1 h-9 rounded-full bg-blue-50 border border-blue-100 text-sm font-medium text-left px-4 hover:bg-blue-100 transition text-blue-700">
          Home
        </button>
      </div>

      {/* search bar */}
      <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-2 border border-blue-100">
        <span className="text-blue-500 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent text-sm outline-none w-full placeholder:text-blue-400 text-blue-800"
        />
      </div>

      {/* separator line */}
      <div className="h-px w-full bg-blue-100" />

      {/* title bar */}
      <div className="w-full flex items-center justify-between bg-blue-50 px-4 py-3 border border-blue-100 text-sm font-semibold tracking-wide text-blue-800">
        <span>Courses</span>
        <span className="text-blue-600 text-xs font-medium">
          {filteredCourses.length}
        </span>
      </div>

      {/* course buttons */}
      <div className="flex-1 flex flex-col gap-3 mt-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredCourses.map((course) => (
          <button
            key={course.id}
            onClick={() =>
              onSelectCourse(selectedCourse === course.id ? null : course.id)
            }
            className={`w-full rounded-md py-3 px-4 text-left text-base font-medium tracking-wide transition ${
              selectedCourse === course.id
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-50 text-blue-800 border border-blue-100 hover:bg-blue-100"
            }`}
          >
            {course.name}
          </button>
        ))}

        {filteredCourses.length === 0 && (
          <p className="text-xs text-blue-500 px-2">
            No courses match your search.
          </p>
        )}
      </div>
    </aside>
  );
}