'use client';

import StatsCard from './StatsCard';

type WatchHistory = {
  isCourseCompleted: boolean;
  completedVideos: number[];
};

type Course = {
  id: string;
};

type Props = {
  titleRef: any;
  statsRef: any;
  watchHistory: WatchHistory[];
  courses: Course[];
};

export default function DashboardHeader({
  titleRef,
  statsRef,
  watchHistory,
  courses,
}: Props) {
  const completedCoursesCount = watchHistory.filter(
    h => h.isCourseCompleted
  ).length;

  const totalVideosWatched = watchHistory.reduce(
    (acc, h) => acc + h.completedVideos.length,
    0
  );

  const completedCoursesProgress =
    watchHistory.length > 0
      ? (completedCoursesCount / watchHistory.length) * 100
      : 0;

  return (
    <div className="mb-12 text-center">
      {/* TITLE */}
      <h1
        ref={titleRef}
        className="text-4xl md:text-5xl font-bold mb-4 text-blue-900"
      >
        My Learning Dashboard
      </h1>

      <p className="text-gray-600 text-lg">
        Track, Learn, and Grow Your Skills 📈
      </p>

      {/* STATS */}
      <div
        ref={statsRef}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatsCard
          icon="🏆"
          value={completedCoursesCount}
          label="Courses Completed"
          progress={completedCoursesProgress}
          color="green"
        />

        <StatsCard
          icon="🎥"
          value={totalVideosWatched}
          label="Videos Watched"
        />

        <StatsCard
          icon="📚"
          value={courses.length}
          label="Total Courses"
        />
      </div>
    </div>
  );
}
