'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/adminbar/AdminSidebar';

import CoursesHeader from '@/components/admin/admincourses/CoursesHeader';
import CoursesList from '@/components/admin/admincourses/CoursesList';
import CourseFormModal from '@/components/admin/admincourses/CourseFormModel';

// ⬇️ TYPES (unchanged)
type Course = { id: string; name: string; description: string; categoryId: string; thumbnail?: string; duration?: string; level?: string; };
type Video = { id: number; title: string; thumbnail: string; duration: string; videoUrl: string; ebookUrl: string; description: string; isCompleted: boolean; order: number; };
type Module = { id: number; title: string; videos: Video[]; };
type CourseDetail = { id: string; courseId: string; modules: Module[]; };
type Category = { id: string; name: string; };

export default function AdminCoursesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [thumbnail, setThumbnail] = useState('');
  const [modules, setModules] = useState<Module[]>([]);

  // 🔐 Admin guard
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) router.push('/');
  }, [user, loading, router]);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    const [c, d, cat] = await Promise.all([
      fetch('http://localhost:3001/courses'),
      fetch('http://localhost:3001/courseDetails'),
      fetch('http://localhost:3001/categories'),
    ]);
    setCourses(await c.json());
    setCourseDetails((await d.json()).filter((d: any) => d.modules));
    setCategories(await cat.json());
  };

  if (!user || user.role !== 'admin') {
    return <div className="flex items-center justify-center h-screen text-gray-300">Access Denied</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full overflow-y-auto">
        <AdminSidebar />
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-8 max-w-7xl mx-auto">

          <CoursesHeader onAdd={() => setFormOpen(true)} />

          <CoursesList
            courses={courses}
            courseDetails={courseDetails}
            categories={categories}
            expandedCourse={expandedCourse}
            setExpandedCourse={setExpandedCourse}
            onEdit={setEditingCourse}
            fetchAll={fetchAll}
          />

          {formOpen && (
            <CourseFormModal
              {...{
                formOpen,
                setFormOpen,
                editingCourse,
                setEditingCourse,
                name, setName,
                description, setDescription,
                categoryId, setCategoryId,
                duration, setDuration,
                level, setLevel,
                thumbnail, setThumbnail,
                modules, setModules,
                categories,
                courseDetails,
                fetchAll
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
