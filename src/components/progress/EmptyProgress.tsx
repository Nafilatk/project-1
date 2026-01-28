'use client';

import { useRouter } from 'next/navigation';

export default function EmptyProgress() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-blue-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="text-8xl mb-6 animate-float">📘</div>

        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Begin Your Learning Path
        </h1>

        <p className="text-gray-700 mb-8 text-lg">
          No progress found yet. Start your first course to see your progress here!
        </p>

        <button
          onClick={() => router.push('/courses')}
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:bg-blue-700 border border-blue-700"
        >
          Explore Courses →
        </button>
      </div>
    </div>
  );
}
