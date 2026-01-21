'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  FileText,
  UserX,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  DollarSign,
  PlayCircle,
  Shield
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

type User = {
  id: string;
  name: string;
  email: string;
  isBlock: boolean;
  role: string;
  created_at: string;
};

type Course = {
  id: string;
  name: string;
  level: string;
  duration: string;
};

type Video = {
  id: number;
  title: string;
};

type CourseDetail = {
  id: string;
  courseId: string;
  modules: Array<{
    videos: Video[];
  }>;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeUsers: 0,
    totalVideos: 0,
    conversionRate: '0%',
  });

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001'
    });

    const fetchData = async () => {
      try {
        const [usersRes, coursesRes, courseDetailsRes] = await Promise.all([
          api.get('/users'),
          api.get('/courses'),
          api.get('/courseDetails')
        ]);

        setUsers(usersRes.data);
        setCourses(coursesRes.data);
        
        const validCourseDetails = courseDetailsRes.data.filter(
          (detail: any) => detail.modules && Array.isArray(detail.modules)
        );
        setCourseDetails(validCourseDetails);
        
        // Calculate total videos across all courses
        const totalVideos = validCourseDetails.reduce((total: number, detail: CourseDetail) => {
          return total + (detail.modules?.reduce((moduleTotal, module) => 
            moduleTotal + (module.videos?.length || 0), 0) || 0);
        }, 0);

        const blockedUsers = usersRes.data.filter((user: User) => user.isBlock).length;
        const activeUsers = usersRes.data.length - blockedUsers;
        const adminUsers = usersRes.data.filter((user: User) => user.role === 'admin').length;
        
        setStats({
          totalRevenue: activeUsers * 29.99,
          activeUsers,
          totalVideos,
          conversionRate: `${Math.round((activeUsers / Math.max(usersRes.data.length, 1)) * 100)}%`,
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="h-full overflow-y-auto">
          <AdminSidebar />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-300 animate-pulse">Loading dashboard...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  const recentCourses = [...courses].slice(0, 5);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="h-full overflow-y-auto">
        <AdminSidebar />
      </div>

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin</h1>
                <p className="text-gray-600 mt-2">Here's what's happening with your platform today.</p>
              </div>
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-500/50 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{users.length}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+12%</span>
                      <span className="text-sm text-gray-500">from last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-all">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500/50 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Courses</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{courses.length}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-600">+5%</span>
                      <span className="text-sm text-gray-500">from last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-all">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-purple-500/50 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Videos</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalVideos}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-purple-600">+8%</span>
                      <span className="text-sm text-gray-500">from last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-all">
                    <PlayCircle className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-red-500/50 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeUsers}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600">-2%</span>
                      <span className="text-sm text-gray-500">from last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-all">
                    <UserX className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Users */}
<div className="lg:col-span-2">
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold text-gray-800">Recent Users</h3>
      <Link 
        href="/Admin/users" 
        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors font-medium"
      >
        View all <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {recentUsers.slice(0, 5).map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate max-w-[150px]">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <Shield size={12} />
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.isBlock 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.isBlock ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
              {/* Recent Courses */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Recent Courses</h3>
                    <Link 
                      href="/Admin/Admincourses" 
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors font-medium"
                    >
                      View all <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentCourses.map((course) => {
                      const courseDetail = courseDetails.find(cd => cd.courseId === course.id);
                      const videoCount = courseDetail?.modules?.reduce((total, module) => 
                        total + (module.videos?.length || 0), 0) || 0;

                      return (
                        <div key={course.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div>
                            <p className="font-medium text-gray-800">{course.name}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-gray-500">{videoCount} videos</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                course.level === 'Beginner' 
                                  ? 'bg-green-100 text-green-800'
                                  : course.level === 'Intermediate'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {course.level}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/Admin/Admincourses"
                  className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:border-blue-300 transition-all group hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <ArrowUpRight className="h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Manage Courses</h4>
                  <p className="text-sm text-gray-600">Create and publish new courses</p>
                </Link>

                <Link
                  href="/Admin/users"
                  className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:border-purple-300 transition-all group hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                    <ArrowUpRight className="h-5 w-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Manage Users</h4>
                  <p className="text-sm text-gray-600">View and manage all users</p>
                </Link>

                {/* <Link
                  href="/Admin/settings"
                  className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:border-green-300 transition-all group hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                    <ArrowUpRight className="h-5 w-5 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Settings</h4>
                  <p className="text-sm text-gray-600">Update admin settings</p>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}