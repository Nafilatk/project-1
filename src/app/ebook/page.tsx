"use client";

import { useEffect, useState } from "react";
import CourseSidebar from "../components/Sidebar";

type Course = { id: number; name: string };
type Ebook = {
  id: number;
  title: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
  courseId: number;
  videoId: number;
};

export default function EbookPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/courses")
      .then((r) => r.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedCourse) {
      setEbooks([]);
      return;
    }

    fetch(`http://localhost:3001/ebooks?courseId=${selectedCourse}`)
      .then((r) => r.json())
      .then(setEbooks)
      .catch(console.error);
  }, [selectedCourse]);

  const filteredEbooks = ebooks.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="flex h-screen bg-neutral-100 text-neutral-900">
      {/* Sidebar */}
      <CourseSidebar
        search={search}
        onSearchChange={setSearch}
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
      />

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="px-6 py-4 border-b border-neutral-200 bg-white flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {selectedCourse
              ? `${courses.find((c) => c.id === selectedCourse)?.name} Ebooks`
              : "Select a course to view ebooks"}
          </h1>
        </header>

        <section className="flex-1 overflow-y-auto px-6 py-6">
          {selectedCourse && filteredEbooks.length === 0 && (
            <p className="text-neutral-500 text-sm">
              No ebooks found for this course.
            </p>
          )}

          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredEbooks.map((ebook) => (
              <article
                key={ebook.id}
                className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-blue-500 hover:shadow-lg transition cursor-pointer"
              >
                <div className="aspect-[3/2] bg-neutral-200">
                  <img
                    src={ebook.thumbnail}
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-sm font-semibold line-clamp-2">
                    {ebook.title}
                  </h2>

                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {ebook.description}
                  </p>

                  <a
                    href={ebook.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                  >
                    Open PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
