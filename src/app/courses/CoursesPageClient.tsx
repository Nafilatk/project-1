'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, Maximize, SkipForward, BookOpen, CheckCircle, Clock } from 'lucide-react';
import CourseSidebar from '@/components/courses/Sidebar';
import VideoPlayer from '@/components/courses/YoutubePlayer';
import VideoList from '@/components/courses/VideoList';
import { Course, CourseDetail, Video } from '@/lib/types/courses';
import { courses, categories, courseDetails, users } from '@/app/data/db.json';

export default function CoursePageClient() {
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Get course details for selected course
  const currentCourseDetails = courseDetails.find(
    detail => detail.courseId === selectedCourse.id
  );

  // Get all videos from current course
  const allVideos = currentCourseDetails?.modules.flatMap(module => module.videos) || [];

  // Initialize with first video if none selected
  useEffect(() => {
    if (!selectedVideo && allVideos.length > 0) {
      setSelectedVideo(allVideos[0]);
    }
  }, [selectedCourse, allVideos]);

  // GSAP animations
  useEffect(() => {
    if (mainContentRef.current && sidebarRef.current) {
      if (sidebarOpen) {
        gsap.to(mainContentRef.current, {
          marginLeft: '280px',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(sidebarRef.current, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(mainContentRef.current, {
          marginLeft: '0',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(sidebarRef.current, {
          x: -280,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }
  }, [sidebarOpen]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedVideo(null); // Reset video selection
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleVideoComplete = (videoId: number) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
      // In a real app, update the backend here
    }
  };

  const handleNextVideo = () => {
    if (!selectedVideo || allVideos.length === 0) return;
    
    const currentIndex = allVideos.findIndex(v => v.id === selectedVideo.id);
    if (currentIndex < allVideos.length - 1) {
      setSelectedVideo(allVideos[currentIndex + 1]);
    }
  };

  const handlePrevVideo = () => {
    if (!selectedVideo || allVideos.length === 0) return;
    
    const currentIndex = allVideos.findIndex(v => v.id === selectedVideo.id);
    if (currentIndex > 0) {
      setSelectedVideo(allVideos[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg transition-colors"
      >
        {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-xl z-40 overflow-y-auto"
      >
        <CourseSidebar
          courses={courses}
          categories={categories}
          selectedCourse={selectedCourse}
          onCourseSelect={handleCourseSelect}
        />
      </div>

      {/* Main Content */}
      <div
        ref={mainContentRef}
        className="min-h-screen transition-all duration-300 p-4 pt-16"
      >
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{selectedCourse.name}</h1>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{selectedCourse.duration}</span>
              </div>
              <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                {selectedCourse.level}
              </span>
              <div className="flex items-center gap-1">
                <BookOpen size={16} />
                <span>{allVideos.length} videos</span>
              </div>
            </div>
            <p className="text-gray-400 mt-4 max-w-3xl">{selectedCourse.description}</p>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player and Details - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              {selectedVideo && (
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <VideoPlayer
                    video={selectedVideo}
                    onComplete={() => handleVideoComplete(selectedVideo.id)}
                    onNext={handleNextVideo}
                    onPrev={handlePrevVideo}
                    hasNext={allVideos.findIndex(v => v.id === selectedVideo.id) < allVideos.length - 1}
                    hasPrev={allVideos.findIndex(v => v.id === selectedVideo.id) > 0}
                  />
                </div>
              )}

              {/* Video Details */}
              {selectedVideo && (
                <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">{selectedVideo.title}</h2>
                    {completedVideos.includes(selectedVideo.id) && (
                      <span className="flex items-center gap-2 text-green-400">
                        <CheckCircle size={20} />
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-6">{selectedVideo.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
                      <a
                        href={selectedVideo.ebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <BookOpen size={18} />
                        Download eBook
                      </a>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <button
                        onClick={handlePrevVideo}
                        disabled={!selectedVideo || allVideos.findIndex(v => v.id === selectedVideo.id) === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                      >
                        <ChevronLeft size={20} />
                        Previous
                      </button>
                      
                      <button
                        onClick={handleNextVideo}
                        disabled={!selectedVideo || allVideos.findIndex(v => v.id === selectedVideo.id) === allVideos.length - 1}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                      >
                        Next
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video List - 1/3 width */}
            <div className="lg:col-span-1">
              <VideoList
                modules={currentCourseDetails?.modules || []}
                selectedVideoId={selectedVideo?.id}
                completedVideos={completedVideos}
                onVideoSelect={handleVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}