"use client";

import { useEffect, useState, useRef } from "react";
import CourseSidebar from "../../components/Sidebar";
import gsap from "gsap";
import { api } from "@/lib/axios";
import { Course,Video } from "@/types/video";
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
    <div className="flex h-screen bg-white text-gray-900">
      <CourseSidebar
        search={search}
        onSearchChange={setSearch}
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
      />

      <div className="flex flex-1 flex-col border-l border-gray-200 bg-white">

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
            <p className="mt-6 text-center text-sm text-gray-500">
              No videos found for this course yet. Please check again later.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
