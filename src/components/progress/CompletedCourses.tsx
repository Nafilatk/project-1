'use client';

import CourseCard from './CourseCard';
import { Video } from '@/lib/types/courses';

type WatchHistory = {
  id: string;
  courseId: string;
  completedVideos: number[];
  isCourseCompleted: boolean;
};

type Course = {
  id: string;
  name: string;
};

type CourseDetail = {
  courseId: string;
  modules: {
    videos: Video[];
  }[];
};

type Props = {
  watchHistory: WatchHistory[];
  courses: Course[];
  courseDetails: CourseDetail[];
  toggleCourseDetails: (courseId: string) => void;
  courseCardsRef: any;
};

export default function CompletedCourses({
  watchHistory,
  courses,
  courseDetails,
  toggleCourseDetails,
  courseCardsRef,
}: Props) {
  const getVideosByCourse = (courseId: string): Video[] => {
    const detail = courseDetails.find(d => d.courseId === courseId);
    return detail ? detail.modules.flatMap(m => m.videos) : [];
  };

  const completedCourses = watchHistory.filter(h => h.isCourseCompleted);

  if (completedCourses.length === 0) return null;

  return (
    <section className="mb-12">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="p-3 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl shadow-md animate-pulse-slow">
            <span className="text-2xl text-white">🏅</span>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-900">
            Completed Courses
          </h2>
          <p className="text-gray-600">
            You've mastered these courses!
          </p>
        </div>
      </div>

      {/* COURSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedCourses.map((history, index) => {
          const courseInfo = courses.find(c => c.id === history.courseId);
          const allVideos = getVideosByCourse(history.courseId);

          return (
            <CourseCard
              key={history.id}
              completed
              cardRef={el => {
                courseCardsRef.current[index] = el;
              }}
              onClick={() => toggleCourseDetails(history.courseId)}
            >
              {/* BADGE */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-green-100 border border-green-300 text-green-700 rounded-full text-sm font-semibold animate-bounce-slow">
                COMPLETED
              </div>

              {/* CONTENT */}
              <div className="mb-4">
                <h3 className="font-bold text-blue-900 text-lg group-hover:text-blue-700 transition-colors mb-2">
                  {courseInfo?.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {allVideos.length} videos • 100% Complete
                </p>
              </div>

              {/* PROGRESS */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <span className="text-lg">✓</span> Mastered
                  </span>
                  <span className="text-blue-900 font-bold">100%</span>
                </div>

                <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-linear-to-r from-green-500 to-green-600 rounded-full shadow-sm" />
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex justify-center">
                <div className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-semibold flex items-center gap-2 group-hover:bg-blue-100 group-hover:border-blue-300 transition-all duration-300">
                  <span>View Details</span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </CourseCard>
          );
        })}
      </div>
    </section>
  );
}
