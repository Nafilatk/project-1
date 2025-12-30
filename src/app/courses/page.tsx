"use client";

import { useEffect, useState, useRef } from "react";
import CourseSidebar from "../../components/Sidebar";
import gsap from "gsap";
import { api } from "@/lib/axios";
import { Course, Video } from "@/types/video";
import VideoCard from "@/components/courses/videoCard";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get<Course[]>("/courses");
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!selectedCourse) {
        setVideos([]);
        return;
      }

      try {
        const res = await api.get<Video[]>("/videos", {
          params: { courseId: selectedCourse },
        });
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, [selectedCourse]);

  return (
    <div className="flex h-screen bg-black text-white">
      <CourseSidebar
        search={search}
        onSearchChange={setSearch}
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
      />

      <div className="flex flex-1 flex-col border-l border-blue-900/30 bg-black/95">
        <main className="flex-1 overflow-y-auto scrollbar-hide px-6 py-8">
          {!selectedCourse && (
            <div className="mb-8 rounded-2xl border border-blue-900/40 bg-blue-950/60 p-6 text-sm leading-relaxed text-blue-200 shadow-[0_10px_30px_rgba(59,130,246,0.2)] backdrop-blur-md">
              <h2 className="mb-2 text-lg font-bold text-white">
                Explore Courses
              </h2>
              <p className="text-blue-300">
                Use the sidebar search or select a course to discover content. 
                Lessons load instantly when you choose a course.
              </p>
            </div>
          )}

          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {videos.map((video) => {
              const courseName = courses.find((c) => c.id === video.courseId)?.name;
              return (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  courseName={courseName ?? "Course"} 
                />
              );
            })}
          </div>

          {selectedCourse && videos.length === 0 && (
            <p className="mt-12 text-center text-sm text-blue-400">
              No videos found for this course yet. Please check again later.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
