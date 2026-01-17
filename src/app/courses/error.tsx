'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CoursesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Courses page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 max-w-md w-full text-center">
        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Failed to load courses</h2>
        <p className="text-lg text-gray-600 mb-8">
          {error.message || 'Something went wrong. Please try again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3 border border-gray-300 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
