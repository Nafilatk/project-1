// app/components/Sidebar.tsx
"use client";

import { isLoggedIn, logout } from "@/lib/auth";

interface SidebarProps {
  search: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function Sidebar({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: SidebarProps) {
  const loggedIn = isLoggedIn();
  const uniqueCategories = ['all', ...new Set(categories)].sort();

  return (
    <aside className="w-64 space-y-6">
      {/* User Profile Card if logged in */}
      {loggedIn && (
        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {typeof window !== 'undefined' 
                  ? localStorage.getItem('user')?.charAt(0).toUpperCase() || 'U'
                  : 'U'
                }
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Welcome back!</p>
              <button
                onClick={logout}
                className="text-xs text-red-600 hover:text-red-800 transition"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Card */}
      <div className="border rounded-xl p-4 bg-white shadow-sm h-fit sticky top-24">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h2>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-2 text-gray-700">
              Search Courses
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                className="w-full border border-gray-300 p-2 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                placeholder="Type to search..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2 text-gray-700">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                className="w-full border border-gray-300 p-2 pl-3 pr-8 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer appearance-none text-sm"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Reset Filters */}
          {(search || category !== 'all') && (
            <button
              onClick={() => {
                onSearchChange('');
                onCategoryChange('all');
              }}
              className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Stats Card */}
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <h3 className="font-medium text-sm mb-3 text-gray-700">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Courses</span>
            <span className="font-medium">{categories.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Categories</span>
            <span className="font-medium">{uniqueCategories.length - 1}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Showing</span>
            <span className="font-medium">
              {search || category !== 'all' ? 'Filtered' : 'All'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}