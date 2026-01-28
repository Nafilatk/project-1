'use client';

import { useRouter } from 'next/navigation';
import { Video } from '@/lib/types/courses';

type Props = {
  completedVideos: Video[];
  pendingVideos: Video[];
  courseId: string;
  isCourseCompleted: boolean;
};

export default function CourseDetails({
  completedVideos,
  pendingVideos,
  courseId,
  isCourseCompleted,
}: Props) {
  const router = useRouter();

  return (
    <div className="mt-6 animate-slide-down">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* COMPLETED VIDEOS */}
        <div className="bg-linear-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-lg text-blue-600">✅</span>
            </div>
            <h4 className="font-bold text-blue-900">Completed Videos</h4>
            <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-sm font-semibold">
              {completedVideos.length}
            </span>
          </div>

          {completedVideos.length === 0 ? (
            <div className="text-center py-4">
              <span className="text-4xl mb-2 block text-gray-400">📺</span>
              <p className="text-gray-500">
                Start watching to see progress here
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {completedVideos.map(video => (
                <div
                  key={video.id}
                  className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:bg-blue-50 transition-all duration-300 group/item hover:scale-[1.02]"
                >
                  <div className="p-2 bg-blue-100 rounded group-hover/item:bg-blue-200 transition-colors">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-900 font-medium">
                      {video.title}
                    </p>
                    <p className="text-gray-500 text-sm">Completed</p>
                  </div>
                  <div className="p-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PENDING VIDEOS */}
        <div className="bg-linear-to-br from-white to-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-lg text-blue-600">⏳</span>
            </div>
            <h4 className="font-bold text-blue-900">Pending Videos</h4>
            <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-sm font-semibold">
              {pendingVideos.length}
            </span>
          </div>

          {pendingVideos.length === 0 ? (
            <div className="text-center py-4">
              <span className="text-4xl mb-2 block text-green-500">🎉</span>
              <p className="text-green-600 font-semibold">
                All videos completed!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {pendingVideos.map(video => (
                <div
                  key={video.id}
                  className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:bg-blue-50 transition-all duration-300 group/item hover:scale-[1.02]"
                >
                  <div className="p-2 bg-blue-100 rounded group-hover/item:bg-blue-200 transition-colors">
                    <span className="text-blue-600">▶</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-900 font-medium">
                      {video.title}
                    </p>
                    <p className="text-gray-500 text-sm">Ready to watch</p>
                  </div>
                  <button
                    onClick={() => router.push(`/course/${courseId}`)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 border border-blue-700"
                  >
                    Watch
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      {!isCourseCompleted && pendingVideos.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push(`/course/${courseId}`)}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:scale-105 transform transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:bg-blue-700 border border-blue-700"
          >
            Continue Learning →
          </button>
        </div>
      )}
    </div>
  );
}
