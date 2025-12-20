"use client";

import type { ProfileStats } from "./ProfileSummery";

type Props = {
  stats: ProfileStats | null;
  isLoading: boolean;
};

export function RecentlyWatchedList({ stats, isLoading }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-800">
        Recently watched
      </h2>

      {isLoading && (
        <p className="text-xs text-slate-500">Loading...</p>
      )}

      {!isLoading && stats && stats.recentlyWatched.length === 0 && (
        <p className="text-xs text-slate-500">
          No videos watched yet.
        </p>
      )}

      {!isLoading &&
        stats &&
        stats.recentlyWatched.length > 0 && (
          <ul className="space-y-2 text-xs">
            {stats.recentlyWatched.slice(0, 5).map((v) => (
              <li
                key={v.videoId}
                className="rounded-lg bg-slate-50 px-3 py-2"
              >
                <p className="font-medium text-slate-800">
                  {v.title}
                </p>
                <p className="text-[11px] text-slate-500">
                  {v.courseTitle}
                </p>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
