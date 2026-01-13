'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminHeader() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users, courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Right - User Menu */}
          <div className="flex items-center space-x-4 ml-4">
            <div className="flex items-center text-sm text-gray-700 font-medium">
              <span>Monday, January 5, 2026</span>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
              🔔
            </div>
            <div className="w-10 h-10 bg-linear-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all">
              <span className="font-bold text-sm">AP</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
