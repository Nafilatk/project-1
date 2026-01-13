'use client';
import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin-api';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

type Ebook = {
  id: string;
  courseId: string;
  videoId: string;
  title: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
};

type Course = {
  id: string;
  name: string;
};

type Video = {
  id: string;
  courseId: string;
  title: string;
  thumbnail: string;
};

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEbook, setNewEbook] = useState({
    courseId: '',
    videoId: '',
    title: '',
    description: '',
    pdfUrl: '',
    thumbnail: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ebooksRes, coursesRes, videosRes] = await Promise.all([
        adminApi.get('/ebooks'),
        adminApi.get('/courses'),
        adminApi.get('/videos')
      ]);
      
      setEbooks(Array.isArray(ebooksRes.data) ? ebooksRes.data : []);
      setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      setVideos(Array.isArray(videosRes.data) ? videosRes.data : []);
    } catch (error) {
      console.error('Failed to fetch ebooks data:', error);
      setEbooks([]);
      setCourses([]);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course?.name || 'Unknown Course';
  };

  const getVideoTitle = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    return video?.title || `Video #${videoId}`;
  };

  const handleAddEbook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.post('/ebooks', newEbook);
      setNewEbook({ courseId: '', videoId: '', title: '', description: '', pdfUrl: '', thumbnail: '' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Failed to add ebook:', error);
      alert('Failed to create ebook');
    }
  };

  const handleDeleteEbook = async (id: string) => {
    if (!confirm('Delete this ebook?')) return;
    try {
      await adminApi.delete(`/ebooks/${id}`);
      fetchData();
    } catch (error) {
      alert('Failed to delete ebook');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-300">Loading ebooks...</div>;
  }

  return (
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-1 bg-white p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-700">Ebooks</h2>
          <p className="text-gray-700 mt-1">{ebooks.length} ebooks | {courses.length} courses</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
          disabled={courses.length === 0}
        >
          {showForm ? 'Cancel' : '📚 Add Ebook'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <form onSubmit={handleAddEbook} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Course</label>
              <select
                value={newEbook.courseId}
                onChange={(e) => {
                  setNewEbook({ ...newEbook, courseId: e.target.value });
                  setSelectedCourseId(e.target.value);
                }}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
                required
              >
                <option value="" className="bg-gray-700">Select Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id} className="bg-gray-700">{course.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Video</label>
              <select
                value={newEbook.videoId}
                onChange={(e) => setNewEbook({ ...newEbook, videoId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
                disabled={!selectedCourseId}
              >
                <option value="" className="bg-gray-700">Select Video</option>
                {videos
                  .filter(video => video.courseId === selectedCourseId)
                  .map(video => (
                    <option key={video.id} value={video.id} className="bg-gray-700">{video.title}</option>
                  ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
              <input
                type="text"
                value={newEbook.title}
                onChange={(e) => setNewEbook({ ...newEbook, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
                placeholder="Ebook title"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-200 mb-2">PDF URL</label>
              <input
                type="url"
                value={newEbook.pdfUrl}
                onChange={(e) => setNewEbook({ ...newEbook, pdfUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
                placeholder="https://example.com/ebook.pdf"
                required
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button type="submit" className="flex-1 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Add Ebook
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        {ebooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              📚
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No ebooks found</h3>
            <p className="text-gray-400 mb-6">Create ebooks for your course videos</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              disabled={courses.length === 0}
            >
              Add First Ebook
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Video</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">PDF URL</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {ebooks.map((ebook) => (
                  <tr key={ebook.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-white">{ebook.title}</td>
                    <td className="px-6 py-4">
                      <span className="text-purple-400 font-medium">{getCourseName(ebook.courseId)}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{getVideoTitle(ebook.videoId)}</td>
                    <td className="px-6 py-4">
                      <a href={ebook.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline text-sm">
                        {ebook.pdfUrl ? ebook.pdfUrl.slice(0, 40) + (ebook.pdfUrl.length > 40 ? '...' : '') : ''}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <a href={ebook.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 px-3 py-1 rounded hover:bg-gray-700">
                          📖 View
                        </a>
                        <button 
                          onClick={() => handleDeleteEbook(ebook.id)}
                          className="text-red-400 px-3 py-1 rounded hover:bg-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
          </div>
        </main>
      </div>
  );
}