'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Clock,
  BookOpen,
  Save,
  X,
  Layers
} from 'lucide-react';

type Course = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  thumbnail?: string;
  duration?: string;
  level?: string;
};

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
  ebookUrl: string;
  description: string;
  isCompleted: boolean;
  order: number;
};

type Module = {
  id: number;
  title: string;
  videos: Video[];
};

type CourseDetail = {
  id: string;
  courseId: string;
  modules: Module[];
};

type Category = {
  id: string;
  name: string;
};

export default function AdminCoursesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  // Add / Edit state
  const [formOpen, setFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [thumbnail, setThumbnail] = useState('');
  const [modules, setModules] = useState<Module[]>([{
    id: 1,
    title: 'Main Module',
    videos: []
  }]);

  // 🔐 Admin protection
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  // 📦 Fetch all data
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [cRes, dRes, catRes] = await Promise.all([
        fetch('http://localhost:3001/courses'),
        fetch('http://localhost:3001/courseDetails'),
        fetch('http://localhost:3001/categories'),
      ]);

      const coursesData = await cRes.json();
      const detailsData = await dRes.json();
      const categoriesData = await catRes.json();

      setCourses(coursesData);
      setCourseDetails(detailsData.filter((d: any) => d.modules)); // Filter out empty courseDetails
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // ➕➕ COURSE FORM
  const openAdd = () => {
    setEditingCourse(null);
    setName('');
    setDescription('');
    setCategoryId(categories[0]?.id || '');
    setDuration('');
    setLevel('Beginner');
    setThumbnail('');
    setModules([{
      id: Date.now(),
      title: 'Main Module',
      videos: []
    }]);
    setFormOpen(true);
  };

  const openEdit = (course: Course) => {
    const detail = courseDetails.find(cd => cd.courseId === course.id);

    setEditingCourse(course);
    setName(course.name);
    setDescription(course.description);
    setCategoryId(course.categoryId);
    setDuration(course.duration || '');
    setLevel(course.level || 'Beginner');
    setThumbnail(course.thumbnail || '');
    setModules(detail?.modules || [{
      id: Date.now(),
      title: 'Main Module',
      videos: []
    }]);
    setFormOpen(true);
  };

  const saveCourse = async () => {
    try {
      let courseId = editingCourse?.id;

      const courseData = {
        name,
        description,
        categoryId,
        duration,
        level,
        thumbnail: thumbnail || '/assets/courses/default-thumb.jpg'
      };

      if (editingCourse) {
        await fetch(`http://localhost:3001/courses/${editingCourse.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData),
        });
        courseId = editingCourse.id;
      } else {
        const res = await fetch('http://localhost:3001/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData),
        });
        const newCourse = await res.json();
        courseId = newCourse.id;
      }

      // Save courseDetails with modules
      const existingDetail = courseDetails.find(cd => cd.courseId === courseId);
      const detailData = {
        courseId,
        modules: modules.map(module => ({
          ...module,
          videos: module.videos.map((video, index) => ({
            ...video,
            order: index + 1,
            isCompleted: video.isCompleted || false,
            thumbnail: video.thumbnail || `https://img.youtube.com/vi/default/maxresdefault.jpg`,
            description: video.description || `Learn ${video.title}`
          }))
        }))
      };

      if (existingDetail) {
        await fetch(`http://localhost:3001/courseDetails/${existingDetail.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detailData),
        });
      } else {
        await fetch('http://localhost:3001/courseDetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detailData),
        });
      }

      setFormOpen(false);
      fetchAll();
    } catch (error) {
      console.error('Failed to save course:', error);
      alert('Failed to save course');
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course? All videos will also be deleted.')) return;

    try {
      await fetch(`http://localhost:3001/courses/${id}`, { method: 'DELETE' });

      const detail = courseDetails.find(cd => cd.courseId === id);
      if (detail) {
        await fetch(`http://localhost:3001/courseDetails/${detail.id}`, {
          method: 'DELETE',
        });
      }

      fetchAll();
    } catch (error) {
      console.error('Failed to delete course:', error);
      alert('Failed to delete course');
    }
  };

  // ➕ Add Module
  const addModule = () => {
    setModules([
      ...modules,
      {
        id: Date.now(),
        title: `Module ${modules.length + 1}`,
        videos: []
      },
    ]);
  };

  // 🗑️ Delete Module
  const deleteModule = (moduleIndex: number) => {
    if (modules.length <= 1) {
      alert('At least one module is required');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this module? All videos in this module will also be deleted.')) return;
    
    const updatedModules = [...modules];
    updatedModules.splice(moduleIndex, 1);
    setModules(updatedModules);
  };

  // ➕ Add Video to Module
  const addVideo = (moduleIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videos.push({
      id: Date.now(),
      title: '',
      thumbnail: '',
      duration: '',
      videoUrl: '',
      ebookUrl: '',
      description: '',
      isCompleted: false,
      order: updatedModules[moduleIndex].videos.length + 1
    });
    setModules(updatedModules);
  };

  const removeVideo = (moduleIndex: number, videoIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videos.splice(videoIndex, 1);
    setModules(updatedModules);
  };

  const updateModuleTitle = (moduleIndex: number, title: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].title = title;
    setModules(updatedModules);
  };

  const updateVideo = (moduleIndex: number, videoIndex: number, field: string, value: string) => {
    const updatedModules = [...modules];
    // @ts-ignore
    updatedModules[moduleIndex].videos[videoIndex][field] = value;
    setModules(updatedModules);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-300">Access Denied</div>
      </div>
    );
  }

  const getTotalVideos = (courseId: string) => {
    const detail = courseDetails.find(cd => cd.courseId === courseId);
    if (!detail?.modules) return 0;
    return detail.modules.reduce((total, module) => total + (module.videos?.length || 0), 0);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="h-full overflow-y-auto">
        <AdminSidebar />
      </div>

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Courses Management</h1>
                  <p className="text-gray-600">Create, edit, and manage all courses</p>
                </div>
                <button 
                  onClick={openAdd}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus size={20} />
                  Add Course
                </button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="space-y-4">
              {courses.map(course => {
                const detail = courseDetails.find(cd => cd.courseId === course.id);
                const isOpen = expandedCourse === course.id;
                const category = categories.find(c => c.id === course.categoryId);
                const totalVideos = getTotalVideos(course.id);

                return (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            {course.thumbnail && (
                              <img 
                                src={course.thumbnail} 
                                alt={course.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
                              <p className="text-gray-600 mb-3">{course.description}</p>
                              <div className="flex items-center gap-4">
                                {category && (
                                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                    {category.name}
                                  </span>
                                )}
                                {course.duration && (
                                  <span className="inline-flex items-center gap-1 text-gray-500">
                                    <Clock size={14} />
                                    {course.duration}
                                  </span>
                                )}
                                {course.level && (
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    course.level === 'Beginner' 
                                      ? 'bg-green-100 text-green-800'
                                      : course.level === 'Intermediate'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {course.level}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1 text-gray-500">
                                  <Layers size={14} />
                                  {totalVideos} videos
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(course)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                          <button
                            onClick={() => setExpandedCourse(isOpen ? null : course.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                          >
                            {isOpen ? (
                              <>
                                <ChevronUp size={14} />
                                Hide Content
                              </>
                            ) : (
                              <>
                                <ChevronDown size={14} />
                                Show Content
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Modules and Videos Section */}
                      {isOpen && detail?.modules && detail.modules.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-700 mb-4">Course Content</h4>
                          <div className="space-y-4">
                            {detail.modules.map((module, moduleIndex) => (
                              <div key={module.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                                  <Layers size={16} />
                                  {module.title}
                                </h5>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {module.videos?.map(video => (
                                    <div key={video.id} className="bg-white p-3 rounded border border-gray-200 hover:border-gray-300 transition-colors">
                                      <div className="flex items-start gap-3">
                                        {video.thumbnail && (
                                          <img 
                                            src={video.thumbnail} 
                                            alt={video.title}
                                            className="w-12 h-12 object-cover rounded"
                                          />
                                        )}
                                        <div className="flex-1">
                                          <h6 className="font-medium text-gray-800 text-sm mb-1">{video.title}</h6>
                                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                            {video.duration && (
                                              <span className="inline-flex items-center gap-1">
                                                <Play size={10} />
                                                {video.duration}
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{video.description}</p>
                                          {video.ebookUrl && (
                                            <a 
                                              href={video.ebookUrl} 
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                                            >
                                              <BookOpen size={12} />
                                              Ebook Available
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add/Edit Form Modal */}
            {formOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl h-[90vh] flex flex-col">
                  <div className="flex-shrink-0 p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {editingCourse ? 'Edit Course' : 'Add New Course'}
                      </h2>
                      <button
                        onClick={() => setFormOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      {/* Course Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Name *
                          </label>
                          <input
                            type="text"
                            placeholder="Course name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                          </label>
                          <select
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select category</option>
                            {categories.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., 15 hours"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Level
                          </label>
                          <select
                            value={level}
                            onChange={e => setLevel(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          placeholder="Course description"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thumbnail URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          value={thumbnail}
                          onChange={e => setThumbnail(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Modules Section */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-800">Course Modules & Videos</h3>
                          <button 
                            onClick={addModule}
                            type="button"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                          >
                            <Plus size={16} />
                            Add Module
                          </button>
                        </div>

                        <div className="space-y-6">
                          {modules.map((module, moduleIndex) => (
                            <div key={module.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex-1">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Module Title
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      placeholder="Module title"
                                      value={module.title}
                                      onChange={e => updateModuleTitle(moduleIndex, e.target.value)}
                                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {modules.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => deleteModule(moduleIndex)}
                                        className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                                      >
                                        <Trash2 size={14} />
                                        Delete Module
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <button 
                                  onClick={() => addVideo(moduleIndex)}
                                  type="button"
                                  className="ml-4 inline-flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                                >
                                  <Plus size={14} />
                                  Add Video
                                </button>
                              </div>

                              {/* Videos in Module */}
                              <div className="space-y-4">
                                {module.videos.map((video, videoIndex) => (
                                  <div key={video.id} className="bg-white p-4 rounded border border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                      <h4 className="font-medium text-gray-800">Video {videoIndex + 1}</h4>
                                      <button
                                        type="button"
                                        onClick={() => removeVideo(moduleIndex, videoIndex)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Video Title *
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Video title"
                                          value={video.title}
                                          onChange={e => updateVideo(moduleIndex, videoIndex, 'title', e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          required
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Video URL *
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="https://youtube.com/watch?v=..."
                                          value={video.videoUrl}
                                          onChange={e => updateVideo(moduleIndex, videoIndex, 'videoUrl', e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          required
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Duration
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="e.g., 15:32"
                                          value={video.duration}
                                          onChange={e => updateVideo(moduleIndex, videoIndex, 'duration', e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Thumbnail URL
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="https://img.youtube.com/vi/..."
                                          value={video.thumbnail}
                                          onChange={e => updateVideo(moduleIndex, videoIndex, 'thumbnail', e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                      </div>

                                      <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Ebook URL
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="https://example.com/ebook.pdf"
                                          value={video.ebookUrl}
                                          onChange={e => updateVideo(moduleIndex, videoIndex, 'ebookUrl', e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                      </div>

                                      <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Description
                                        </label>
                                        <textarea
                                          placeholder="Video description"
                                          value={video.description}
                                          onChange={e => updateVideo(moduleIndex, videoIndex, 'description', e.target.value)}
                                          rows={2}
                                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions - Fixed at bottom */}
                  <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setFormOpen(false)}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveCourse}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Save size={20} />
                        {editingCourse ? 'Update Course' : 'Create Course'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}