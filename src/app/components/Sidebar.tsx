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
    <aside className="h-screen w-80 bg-black text-white flex flex-col px-4 py-3 gap-6">
      {/* top home bar */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center">
          <span className="text-xl">🏠</span>
        </div>
        <button className="flex-1 h-9 rounded-full bg-neutral-800 text-sm font-medium text-left px-4">
          Home
        </button>
      </div>

      {/* search bar */}
      <div className="flex items-center gap-2 bg-neutral-900 rounded-full px-3 py-2 border border-neutral-700">
        <span className="text-neutral-400 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent text-sm outline-none w-full placeholder:text-neutral-500"
        />
      </div>

      {/* separator line */}
      <div className="h-px w-full bg-neutral-700" />

      {/* title bar */}
      <div className="w-full flex items-center justify-between bg-neutral-900 px-4 py-3 rounded-none text-sm font-semibold tracking-wide">
        <span>Courses</span>
        <span className="text-neutral-400 text-xs">
          {filteredCourses.length}
        </span>
      </div>

      {/* course buttons */}
      <div className="flex-1 flex flex-col gap-3 mt-2 overflow-y-auto">
        {filteredCourses.map((course) => (
          <button
            key={course.id}
            onClick={() =>
              onSelectCourse(selectedCourse === course.id ? null : course.id)
            }
            className={`w-full rounded-sm py-3 px-4 text-left text-base font-medium tracking-wide transition-colors ${
              selectedCourse === course.id
                ? "bg-neutral-200 text-black"
                : "bg-neutral-700 text-white hover:bg-neutral-600"
            }`}
          >
            {course.name}
          </button>
        ))}

        {filteredCourses.length === 0 && (
          <p className="text-xs text-neutral-500 px-2">
            No courses match your search.
          </p>
        )}
      </div>
    </aside>
  );
}
