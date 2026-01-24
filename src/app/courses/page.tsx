'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

import Sidebar from '@/components/courses/Sidebar';
import VideoCard from '@/components/courses/VideoCard';
import VideoPlayer from '@/components/courses/YoutubePlayer';
import { Course, Video, CourseDetail } from '@/lib/types/courses';

export default function CoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [watchHistory, setWatchHistory] = useState<any[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

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

    // 🔹 find course details
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
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="h-full bg-[#F7F8FA] text-[#333333] flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <Sidebar
          courses={courses}
          selectedCourse={selectedCourse}
          onCourseSelect={handleCourseSelect}
        />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {selectedCourse && (
          <div className="max-w-7xl mx-auto">

            {/* COURSE HEADER */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold">
                {selectedCourse.name}
              </h1>
              <p className="text-gray-500 mt-2">
                {selectedCourse.description}
              </p>
            </div>

            {/* COURSE COMPLETED BANNER */}
            {isCourseCompleted && (
              <div className="mb-6 bg-green-100 border border-green-500 p-4 rounded-xl">
                <h2 className="font-bold text-green-700">
                  🎉 Course Completed Successfully!
                </h2>
                <p className="text-sm text-green-600">
                  You completed all videos in {selectedCourse.name}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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
                  <div className="bg-white border-2 border-dashed rounded-xl p-12 text-center">
                    <p className="text-gray-500">
                      Select a video to start learning
                    </p>
                  </div>
                )}
              </div>

              {/* PLAYLIST */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border overflow-hidden">
                  <div className="p-4 border-b bg-gray-50">
                    <h2 className="font-bold">Course Playlist</h2>
                    <p className="text-xs text-blue-600 mt-1">
                      {completedVideoIds.length}/{allVideos.length} completed
                    </p>
                  </div>

                  <div className="max-h-150 overflow-y-auto">
                    {allVideos.map(video => (
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
