'use client';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white to-blue-50 flex items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <div className="absolute inset-0 w-24 h-24 border-4 border-blue-300 border-t-transparent rounded-full animate-spin animation-delay-300"></div>

        <div className="absolute inset-0 w-24 h-24 border-4 border-blue-700 border-t-transparent rounded-full animate-spin animation-delay-600"></div>

        <div className="mt-6 text-center text-blue-900 font-semibold tracking-wider animate-pulse">
          Loading your journey...
        </div>
      </div>
    </div>
  );
}
