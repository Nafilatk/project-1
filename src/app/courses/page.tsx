'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import Sidebar from '@/components/courses/Sidebar';
import VideoCard from '@/components/courses/VideoCard';
import VideoPlayer from '@/components/courses/YoutubePlayer';
import { Course, Video, CourseDetail } from '@/lib/types/courses';
import gsap from 'gsap';

export default function CoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [watchHistory, setWatchHistory] = useState<any[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- GSAP Animations ---------------- */
  useEffect(() => {
    if (!containerRef.current || loading || authLoading) return;

    const ctx = gsap.context(() => {
      // Main container entry
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3
        });
      }

      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.6
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [loading, authLoading, selectedCourse]);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [coursesRes, detailsRes, historyRes] = await Promise.all([
        fetch('http://localhost:3001/courses'),
        fetch('http://localhost:3001/courseDetails'),
        fetch(`http://localhost:3001/watchHistory?userId=${user?.id}`),
      ]);

      const coursesData = await coursesRes.json();
      const detailsData = await detailsRes.json();
      const historyData = await historyRes.json();

      setCourses(coursesData);
      setCourseDetails(detailsData);
      setWatchHistory(historyData);

      if (coursesData.length > 0) {
        setSelectedCourse(coursesData[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- HANDLERS ---------------- */
  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedVideo(null);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  /* ---------------- DERIVED DATA ---------------- */
  const currentCourseDetails = courseDetails.find(
    d => d.courseId === selectedCourse?.id
  );

  const allVideos: Video[] =
    currentCourseDetails?.modules?.flatMap(m => m.videos) || [];

  const currentHistory = watchHistory.find(
    h => h.courseId === selectedCourse?.id
  );

  const completedVideoIds: number[] =
    currentHistory?.completedVideos || [];

  const isCourseCompleted =
    allVideos.length > 0 &&
    completedVideoIds.length === allVideos.length;

  /* ---------------- VIDEO COMPLETE ---------------- */
  const handleVideoComplete = async () => {
    if (!user || !selectedCourse || !selectedVideo) return;

    // Find course details
    const courseDetail = courseDetails.find(
      d => d.courseId === selectedCourse.id
    );
    if (!courseDetail) return;

    const totalVideosInCourse =
      courseDetail.modules.flatMap(m => m.videos).length;

    let history = watchHistory.find(
      h => h.courseId === selectedCourse.id
    );

    /* -------- CREATE WATCH HISTORY -------- */
    if (!history) {
      const completedVideos = [selectedVideo.id];

      const isCourseCompleted =
        completedVideos.length === totalVideosInCourse;

      const res = await fetch('http://localhost:3001/watchHistory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          courseId: selectedCourse.id,
          completedVideos,
          isCourseCompleted,
          completedAt: isCourseCompleted
            ? new Date().toISOString()
            : null,
        }),
      });

      const newHistory = await res.json();
      setWatchHistory(prev => [...prev, newHistory]);
      return;
    }

    /* -------- ALREADY COMPLETED -------- */
    if (history.completedVideos.includes(selectedVideo.id)) return;

    /* -------- UPDATE HISTORY -------- */
    const updatedCompletedVideos = [
      ...history.completedVideos,
      selectedVideo.id,
    ];

    const isCourseCompleted =
      updatedCompletedVideos.length === totalVideosInCourse;

    const updatedHistory = {
      ...history,
      completedVideos: updatedCompletedVideos,
      isCourseCompleted,
      completedAt: isCourseCompleted
        ? new Date().toISOString()
        : history.completedAt || null,
    };

    await fetch(`http://localhost:3001/watchHistory/${history.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHistory),
    });

    setWatchHistory(prev =>
      prev.map(h => (h.id === history.id ? updatedHistory : h))
    );
  };

  /* ---------------- LOADING ---------------- */
  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div 
      ref={containerRef}
      className="h-screen bg-white text-gray-800 flex overflow-hidden"
    >
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200">
        <Sidebar
          courses={courses}
          selectedCourse={selectedCourse}
          onCourseSelect={handleCourseSelect}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {selectedCourse && (
          <div className="max-w-7xl mx-auto">
            {/* COURSE HEADER */}
            <div 
              ref={headerRef}
              className="mb-8 p-6 bg-linear-to-r from-blue-50 to-white rounded-xl border border-gray-200"
            >
              <h1 className="text-3xl font-bold text-gray-800">
                {selectedCourse.name}
              </h1>
              <p className="text-gray-600 mt-3">
                {selectedCourse.description}
              </p>
              
              {/* Course Stats */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {selectedCourse.level} Level
                  </span>
                </div>
                {selectedCourse.duration && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Duration: {selectedCourse.duration}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {allVideos.length} Videos
                  </span>
                </div>
              </div>
            </div>

            {/* COURSE COMPLETED BANNER */}
            {isCourseCompleted && (
              <div className="mb-6 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 p-5 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">🎉</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-green-800 text-lg">
                      Course Completed Successfully!
                    </h2>
                    <p className="text-sm text-green-600">
                      You've completed all {allVideos.length} videos in "{selectedCourse.name}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div 
              ref={contentRef}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* VIDEO PLAYER */}
              <div className="lg:col-span-2">
                {selectedVideo ? (
                  <VideoPlayer
                    video={{
                      ...selectedVideo,
                      isCompleted: completedVideoIds.includes(
                        selectedVideo.id
                      ),
                    }}
                    onComplete={handleVideoComplete}
                  />
                ) : (
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-300 transition-colors duration-200">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Select a video to start learning
                    </h3>
                    <p className="text-gray-500">
                      Choose a video from the playlist to begin your course
                    </p>
                  </div>
                )}
              </div>

              {/* PLAYLIST */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  {/* Playlist Header */}
                  <div className="p-5 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-bold text-gray-800 text-lg">Course Playlist</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <p className="text-sm text-blue-600 font-medium">
                            {completedVideoIds.length} of {allVideos.length} completed
                          </p>
                        </div>
                      </div>
                      <div className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {Math.round((completedVideoIds.length / allVideos.length) * 100)}%
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round((completedVideoIds.length / allVideos.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(completedVideoIds.length / allVideos.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Videos List */}
                  <div className="max-h-[calc(100vh-300px)] overflow-y-auto no-scrollbar">
                    {allVideos.map((video, index) => (
                      <VideoCard
                        key={video.id}
                        video={{
                          ...video,
                          isCompleted: completedVideoIds.includes(video.id),
                        }}
                        isSelected={selectedVideo?.id === video.id}
                        onSelect={() => handleVideoSelect(video)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}