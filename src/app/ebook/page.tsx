"use client";

import { useEffect, useState } from "react";
import CourseSidebar from "@/components/Sidebar";
import { api } from "@/lib/axios";
import EbookCard from "@/components/ebooks/ebookCard";
import { Course,Ebook } from "@/types/ebook";



export default function EbookPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [search, setSearch] = useState("");

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
  const fetchEbooks = async () => {
    if (!selectedCourse) {
      setEbooks([]);
      return;
    }

    try {
      const res = await api.get<Ebook[]>("/ebooks", {
        params: { courseId: selectedCourse },
      });
      setEbooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchEbooks();
}, [selectedCourse]);


  const filteredEbooks = ebooks.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="flex h-screen bg-white text-neutral-900">
      <CourseSidebar
        search={search}
        onSearchChange={setSearch}
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
      />

      <main className="flex-1 flex flex-col">
<header className="px-6 py-4 ">
  <h1 className="text-xl font-semibold">
    {selectedCourse
      ? `${courses.find((c) => c.id === selectedCourse)?.name} Ebooks`
      : "Select a course to view ebooks"}
  </h1>

<div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
  <p className="text-sm text-neutral-800">
    Browse and read course-related ebooks here.
    <span className="text-blue-600 font-medium">
      {" "}Select a course
    </span>{" "}
    from the sidebar to view available ebooks.
  </p>

  <p className="mt-1 text-sm text-neutral-600">
    Click on any ebook to{" "}
    <span className="text-blue-600 font-medium">read online</span>{" "}
    or{" "}
    <span className="text-blue-600 font-medium">download</span>{" "}
    it for offline learning and quick reference.
  </p>
</div>

</header>


        <section className="flex-1 overflow-y-auto px-6 py-6">
          {selectedCourse && filteredEbooks.length === 0 && (
            <p className="text-neutral-500 text-sm">
              No ebooks found for this course.
            </p>
          )}

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredEbooks.map((ebook) => (              
              <EbookCard 
              key={ebook.id} 
              ebook={ebook} />
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}
