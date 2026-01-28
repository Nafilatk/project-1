'use client';

import CourseCard from './CourseCard';
import CourseDetails from './CourseDetails';
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
  activeCourse: string | null;
  toggleCourseDetails: (courseId: string) => void;
  calculateProgress: (completed: number[], total: number) => number;
  router: any;
  courseCardsRef: any;
};

export default function ActiveCourses({
  watchHistory,
  courses,
  courseDetails,
  activeCourse,
  toggleCourseDetails,
  calculateProgress,
  router,
  courseCardsRef,
}: Props) {
  const getVideosByCourse = (courseId: string): Video[] => {
    const detail = courseDetails.find(d => d.courseId === courseId);
    return detail ? detail.modules.flatMap(m => m.videos) : [];
  };

  return (
    <section>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
          <span className="text-2xl text-white">📊</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Active Courses</h2>
          <p className="text-gray-600">Track your ongoing learning progress</p>
        </div>
      </div>

      <div className="space-y-6">
        {watchHistory.map((history, index) => {
          const courseInfo = courses.find(c => c.id === history.courseId);
          const allVideos = getVideosByCourse(history.courseId);

          const completedVideos = allVideos.filter(v =>
            history.completedVideos.includes(v.id)
          );

          const pendingVideos = allVideos.filter(
            v => !history.completedVideos.includes(v.id)
          );

          const progress = calculateProgress(
            completedVideos.map(v => v.id),
            allVideos.length
          );

          return (
            <CourseCard
              key={history.id}
              cardRef={el => {
                courseCardsRef.current[index] = el;
              }}
            >
              {/* TOP SECTION */}
              <div
                className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 cursor-pointer"
                onClick={() => toggleCourseDetails(history.courseId)}
              >
                <div className="mb-4 lg:mb-0">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl shadow-sm ${
                        history.isCourseCompleted
                          ? 'bg-linear-to-r from-green-500 to-green-600'
                          : 'bg-linear-to-r from-blue-500 to-blue-600'
                      }`}
                    >
                      <span className="text-xl text-white">
                        {history.isCourseCompleted ? '✓' : '▶'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-blue-900 text-xl group-hover:text-blue-700 transition-colors">
                        {courseInfo?.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {completedVideos.length} of {allVideos.length} videos completed
                      </p>
                    </div>
                  </div>
                </div>

                {/* PROGRESS CIRCLE */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#dbeafe"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={history.isCourseCompleted ? '#10b981' : '#3b82f6'}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 * (1 - progress / 100)}
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-900">
                          {progress}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <div
                      className={`px-4 py-2 rounded-lg font-semibold group-hover:scale-105 transition-transform ${
                        history.isCourseCompleted
                          ? 'bg-green-50 border border-green-200 text-green-700'
                          : 'bg-blue-50 border border-blue-200 text-blue-700'
                      }`}
                    >
                      {history.isCourseCompleted ? 'Complete' : 'In Progress'}
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {activeCourse === history.courseId && (
                <CourseDetails
                  completedVideos={completedVideos}
                  pendingVideos={pendingVideos}
                  courseId={history.courseId}
                  isCourseCompleted={history.isCourseCompleted}
                />
              )}
            </CourseCard>
          );
        })}
      </div>
    </section>
  );
}
