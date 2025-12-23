"use client";

import { useEffect, useState, useRef } from "react";
import CourseSidebar from "../../components/Sidebar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { api } from "@/lib/axios";

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
  const [selectedCategory] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const topBarRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    api
      .get<Course[]>("/courses")
      .then((res) => setCourses(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedCourse) {
      setVideos([]);
      return;
    }

    api
      .get<Video[]>("/videos", { params: { courseId: selectedCourse } })
      .then((res) => {
        const data = res.data;
        setVideos(data);

        if (gridRef.current) {
          const cards = gridRef.current.querySelectorAll(".video-card");
          gsap.fromTo(
            cards,
            { opacity: 0, y: 20, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
            }
          );
        }
      })
      .catch(console.error);
  }, [selectedCourse]);

  useGSAP(() => {
    if (!topBarRef.current) return;
    gsap.from(topBarRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const filteredCourses = courses.filter((course) => {
    const byCategory =
      !selectedCategory || course.categoryId === selectedCategory;
    const bySearch = course.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    return byCategory && bySearch;
  });

  return (
    <div className="flex h-screen bg-white text-gray-900">
      <CourseSidebar
        search={search}
        onSearchChange={setSearch}
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
      />

      <div className="flex flex-1 flex-col border-l border-gray-200 bg-white">
        <div
          ref={topBarRef}
          className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3"
        >
          <button
            onClick={() => setSelectedCourse(null)}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm whitespace-nowrap transition ${
              !selectedCourse
                ? "bg-blue-600 text-white shadow shadow-blue-500/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {filteredCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm whitespace-nowrap capitalize transition ${
                selectedCourse === course.id
                  ? "bg-blue-800 text-white shadow shadow-blue-500/30"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto px-4 py-4">
          {!selectedCourse && (
            <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-sm leading-relaxed text-gray-700 shadow-sm">
              <h2 className="mb-1 text-base font-semibold text-gray-900">
                Explore Courses
              </h2>
              <p className="text-xs text-gray-600">
                Use the course chips above or the sidebar search to discover
                content. Select a course to load its lessons and start learning
                instantly.
              </p>
            </div>
          )}

          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-blue-800">
                    {courses.find((c) => c.id === video.courseId)?.name ??
                      "Course"}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {selectedCourse && videos.length === 0 && (
            <p className="mt-6 text-center text-sm text-gray-500">
              No videos found for this course yet. Please check again later.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
