"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, BookOpen, PlayCircle, ChevronLeft } from "lucide-react";
import { Course, CourseDetail, Video } from "@/lib/types/courses";

export default function CourseLearningPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const resCourses = await fetch("http://localhost:3000/courses");
      const resDetails = await fetch("http://localhost:3000/courseDetails");
      setCourses(await resCourses.json());
      setCourseDetails(await resDetails.json());
    };
    fetchData();
  }, []);

  const currentCourseDetails = courseDetails.find(d => d.courseId === selectedCourseId);
  const currentCourseName = courses.find(c => c.id === selectedCourseId)?.name;

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden text-gray-800">
      
      {/* SIDEBAR - List of Courses */}
      <div className={`${isSidebarOpen ? "w-72" : "w-0"} bg-white border-r transition-all duration-300 flex flex-col`}>
        <div className="p-5 border-b flex justify-between items-center bg-blue-600 text-white">
          <h2 className="font-bold text-lg">My Learning</h2>
          <button onClick={() => setSidebarOpen(false)}><X size={20}/></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => { setSelectedCourseId(course.id); setActiveVideo(null); }}
              className={`w-full text-left p-3 rounded-md transition ${selectedCourseId === course.id ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600" : "hover:bg-gray-50"}`}
            >
              {course.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        <header className="h-16 bg-white border-b flex items-center px-6 gap-4 shadow-sm">
          {!isSidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold text-gray-700">
            {activeVideo ? activeVideo.title : (currentCourseName || "Select a Course")}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {!selectedCourseId ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <PlayCircle size={80} strokeWidth={1} />
              <p className="mt-4 text-lg">Please select a course from the sidebar to begin.</p>
            </div>
          ) : activeVideo ? (
            <div className="max-w-5xl mx-auto space-y-6">
              <button 
                onClick={() => setActiveVideo(null)} 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <ChevronLeft size={20}/> Back to Course Content
              </button>
              
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo.videoUrl)}?autoplay=1`}
                  allowFullScreen
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{activeVideo.title}</h2>
                  <p className="text-gray-500 mt-1">{activeVideo.description}</p>
                </div>
                <a 
                  href={activeVideo.ebookUrl} 
                  target="_blank" 
                  className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition shadow-lg font-bold"
                >
                  <BookOpen size={20} /> Download E-Book
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {currentCourseDetails?.modules.map((module) => (
                <div key={module.id}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-700">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">{module.id}</span>
                    {module.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {module.videos.map((video) => (
                      <div 
                        key={video.id} 
                        className="bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all group cursor-pointer"
                        onClick={() => setActiveVideo(video)}
                      >
                        <div className="relative aspect-video">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-all">
                            <PlayCircle className="text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all" size={50} />
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{video.duration}</span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-lg line-clamp-1">{video.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.description}</p>
                          <div className="mt-4 flex gap-2">
                             <button className="flex-1 bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">Watch</button>
                             <button 
                                onClick={(e) => { e.stopPropagation(); window.open(video.ebookUrl); }} 
                                className="p-2 border rounded-lg hover:bg-gray-100"
                             >
                               <BookOpen size={20} className="text-red-500" />
                             </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}