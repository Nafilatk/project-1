'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/admin-api';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

type Course = {
  id: string;
  name: string;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
};

type Video = {
  id: string;
  courseId: string;
  title: string;
};

type NewCourse = {
  name: string;
  categoryId: string;
  videoUrl: string;
  description: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState<NewCourse>({ 
    name: '', 
    categoryId: '', 
    videoUrl: '', 
    description: '' 
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, categoriesRes, videosRes] = await Promise.all([
        adminApi.get('/courses'),
        adminApi.get('/categories'),
        adminApi.get('/videos')
      ]);
      
      setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
      setVideos(Array.isArray(videosRes.data) ? videosRes.data : []);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setCourses([]);
      setCategories([]);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  const getVideoCount = (courseId: string) => {
    return videos.filter(v => v.courseId === courseId).length;
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.post('/courses', { 
        ...newCourse
      });
      setNewCourse({ name: '', categoryId: '', videoUrl: '', description: '' });
      setShowForm(false);
      fetchData(); 
    } catch (error) {
      console.error('Failed to add course:', error);
      alert('Failed to create course. Please try again.');
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course? All related videos will be lost!')) return;
    try {
      await adminApi.delete(`/courses/${id}`);
      fetchData(); 
    } catch (error) {
      console.error('Failed to delete course:', error);
      alert('Failed to delete course. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-300 animate-pulse">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 bg-white overflow-hidden">
      <aside className="w-72 shrink-0 overflow-y-">
        <AdminSidebar />
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-700">Courses</h2>
              <p className="text-gray-700 mt-1">{courses.length} courses • {categories.length} categories</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg"
              disabled={categories.length === 0}
            >
              {showForm ? 'Cancel' : '➕ Add New Course'}
            </button>
          </div>

          {showForm && (
            <div className="bg-linear-to-br from-slate-800 via-purple-900/20 to-slate-900 p-8 rounded-2xl shadow-2xl border border-purple-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Create New Course</h3>
              
              <form onSubmit={handleAddCourse} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">Course Name</label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white transition-all shadow-sm"
                    placeholder="e.g., Complete React Developer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">Category</label>
                  <select
                    value={newCourse.categoryId}
                    onChange={(e) => setNewCourse({ ...newCourse, categoryId: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white transition-all shadow-sm"
                    required
                  >
                    <option value="" className="text-slate-500">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id} className="bg-slate-800">
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-slate-200 mb-3">Course Video URL</label>
                  <input
                    type="url"
                    value={newCourse.videoUrl}
                    onChange={(e) => setNewCourse({ ...newCourse, videoUrl: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white transition-all shadow-sm"
                    placeholder="https://youtube.com/watch?v=..."
                    required
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-slate-200 mb-3">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    rows={4}
                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white transition-all shadow-sm resize-vertical"
                    placeholder="Write about this course..."
                    required
                  />
                </div>

                <div className="lg:col-span-2 flex flex-col sm:flex-row gap-3 pt-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 sm:flex-none px-8 py-4 bg-slate-700/50 text-slate-200 rounded-xl hover:bg-slate-700 transition-all font-semibold border border-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-10 py-4 bg-linear-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:from-purple-700 hover:to-pink-600 font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    ➕ Create Course
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="bg-gray-800 rounded-lg shadow border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full min-w-180">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Course Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Videos</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {courses.map((course) => {
                    const videoCount = getVideoCount(course.id);
                    return (
                      <tr key={course.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{course.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 text-sm font-semibold bg-green-900/30 text-purple-300 rounded-full">
                            {getCategoryName(course.categoryId)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 text-sm font-semibold bg-blue-900/30 text-blue-300 rounded-full">
                            {videoCount} videos
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/courses/${course.id}/videos`} className="inline-flex items-center px-3 py-1 rounded-md bg-gray-700 text-green-300 hover:bg-gray-600">
                              Videos
                            </Link>
                            <button onClick={() => handleDeleteCourse(course.id)} className="inline-flex items-center px-3 py-1 rounded-md bg-gray-700 text-red-300 hover:bg-gray-600">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {courses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-300 text-lg mb-4">No courses found</p>
                <button onClick={() => setShowForm(true)} className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg" disabled={categories.length === 0}>
                  Create your first course
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
