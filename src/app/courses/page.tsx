"use client";

import { useEffect, useState } from "react";
import CourseSidebar from "../components/Sidebar";
type Course = {
  id: number;
  name: string;
  categoryId: number;
};

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  courseId: number;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // load courses
  useEffect(() => {
    fetch("http://localhost:3001/courses")
      .then((r) => r.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  // load videos for selected course
  useEffect(() => {
    if (!selectedCourse) {
      setVideos([]);
      return;
    }

    fetch(`http://localhost:3001/videos?courseId=${selectedCourse}`)
      .then((r) => r.json())
      .then(setVideos)
      .catch(console.error);
  }, [selectedCourse]);

  // filter courses by category + search
  const filteredCourses = courses.filter((course) => {
    const byCategory =
      !selectedCategory || course.categoryId === selectedCategory;
    const bySearch = course.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    return byCategory && bySearch;
  });

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-50">
      {/* LEFT: sidebar (your separate component) */}
<CourseSidebar
  search={search}
  onSearchChange={setSearch}
  selectedCourse={selectedCourse}
  onSelectCourse={setSelectedCourse}
/>

      {/* RIGHT: top chips + video grid */}
      <div className="flex-1 flex flex-col">
        {/* Top filter bar (chips) */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800 bg-neutral-900 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCourse(null)}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
              !selectedCourse
                ? "bg-neutral-100 text-black"
                : "bg-neutral-800 text-neutral-200"
            }`}
          >
            All
          </button>

          {filteredCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap capitalize ${
                selectedCourse === course.id
                  ? "bg-neutral-100 text-black"
                  : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <main className="flex-1 overflow-y-auto px-4 py-4">
          {!selectedCourse && (
            <p className="text-neutral-400 text-sm mb-3">
              Select a course chip above to see its 6 videos.
            </p>
          )}

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.id}
                className="bg-neutral-900 rounded-xl overflow-hidden hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <div className="aspect-video bg-neutral-700">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {courses.find((c) => c.id === video.courseId)?.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
