"use client";

type CourseProgress = {
  courseId: string;
  courseTitle: string;
  completedVideos: number;
  totalVideos: number;
  progressPercent: number;
};

export type ProfileStats = {
  enrolledCourses: CourseProgress[];
  downloadedEbooks: number;
  recentlyWatched: {
    videoId: string;
    title: string;
    courseTitle: string;
    watchedAt: string;
  }[];
};

type Props = {
  stats: ProfileStats | null;
  isLoading: boolean;
};

export function ProfileStatsSummary({ stats, isLoading }: Props) {
  const totalCourses = stats?.enrolledCourses.length ?? 0;
  const totalCompletedVideos =
    stats?.enrolledCourses.reduce(
      (sum, c) => sum + c.completedVideos,
      0
    ) ?? 0;

  let avgProgress = 0;
  if (stats && stats.enrolledCourses.length > 0) {
    avgProgress =
      stats.enrolledCourses.reduce(
        (sum, c) => sum + c.progressPercent,
        0
      ) / stats.enrolledCourses.length;
    avgProgress = Math.round(avgProgress);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-800">
        Learning summary
      </h2>

      {isLoading && (
        <p className="text-xs text-slate-500">Loading progress...</p>
      )}

      {!isLoading && stats && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Enrolled courses</span>
            <span className="font-semibold text-slate-900">
              {totalCourses}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">Completed videos</span>
            <span className="font-semibold text-slate-900">
              {totalCompletedVideos}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">Downloaded ebooks</span>
            <span className="font-semibold text-slate-900">
              {stats.downloadedEbooks}
            </span>
          </div>

          {stats.enrolledCourses.length > 0 && (
            <div>
              <p className="mb-1 text-slate-600">Average progress</p>
              <div className="flex items-center gap-2">
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-500"
                    style={{ width: `${avgProgress}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-semibold text-slate-900">
                  {avgProgress}%
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
