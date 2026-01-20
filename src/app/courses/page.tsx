'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/courses/Sidebar';
import VideoCard from '@/components/courses/VideoCard';
import VideoPlayer from '@/components/courses/YoutubePlayer';
import { Course, Video, CourseDetail } from '@/lib/types/courses';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, detailsRes] = await Promise.all([
        fetch('http://localhost:3001/courses'),
        fetch('http://localhost:3001/courseDetails')
      ]);
      
      const coursesData = await coursesRes.json();
      const detailsData = await detailsRes.json();
      
      setCourses(coursesData);
      setCourseDetails(detailsData);
      
      if (coursesData.length > 0) {
        setSelectedCourse(coursesData[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedVideo(null);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const currentCourseDetails = courseDetails.find(
    detail => detail.courseId === selectedCourse?.id
  );

  const allVideos = currentCourseDetails?.modules?.flatMap(module => module.videos) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <Sidebar
          courses={courses}
          selectedCourse={selectedCourse}
          onCourseSelect={handleCourseSelect}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {selectedCourse && (
          <div className="max-w-7xl mx-auto">
            {/* Course Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{selectedCourse.name}</h1>
              <p className="text-gray-400 mt-2">{selectedCourse.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Player - 2/3 width */}
              <div className="lg:col-span-2">
                {selectedVideo ? (
                  <VideoPlayer video={selectedVideo} />
                ) : (
                  <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-400">Select a video to start watching</p>
                  </div>
                )}
              </div>

              {/* Video List - 1/3 width */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h2 className="font-bold">Course Videos</h2>
                    <p className="text-sm text-gray-400">
                      {allVideos.length} videos
                    </p>
                  </div>
                  
                  <div className="max-h-125 overflow-y-auto">
                    {allVideos.map(video => (
                      <VideoCard
                        key={video.id}
                        video={video}
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