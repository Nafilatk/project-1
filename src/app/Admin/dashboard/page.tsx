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
  ChevronRight
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

type User = {
  id: string;
  name: string;
  email: string;
  isBlock: boolean;
  role: string;
  created_at: string;
};

type Course = {
  id: number;
  title: string;
};

type Ebook = {
  id: string;
  title: string;
  created_at: string;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeSubscriptions: 0,
    conversionRate: '0%',
  });

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001'
    });

    const fetchData = async () => {
      try {
        const [usersRes, coursesRes, ebooksRes] = await Promise.all([
          api.get('/users'),
          api.get('/courses'),
          api.get('/ebooks')
        ]);

        setUsers(usersRes.data);
        setCourses(coursesRes.data);
        setEbooks(ebooksRes.data || []);
        
        const blockedUsers = usersRes.data.filter((user: User) => user.isBlock).length;
        const activeUsers = usersRes.data.length - blockedUsers;
        
        setStats({
          totalRevenue: activeUsers * 29.99, 
          activeSubscriptions: activeUsers,
          conversionRate: `${Math.round((activeUsers / usersRes.data.length) * 100)}%`,
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 shrink-0 overflow-y-auto">
          <AdminSidebar />
        </aside>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>

          <h1 className="text-3xl font-bold text-black">Welcome back, Admin</h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your platform today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-gray-300">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-white mt-2">{users.length}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">+12%</span>
                <span className="text-sm text-gray-400">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-all">
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Courses</p>
              <p className="text-3xl font-bold text-white mt-2">{courses.length}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-blue-500">+5%</span>
                <span className="text-sm text-gray-400">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Ebooks</p>
              <p className="text-3xl font-bold text-white mt-2">{ebooks.length}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-purple-500">+8%</span>
                <span className="text-sm text-gray-400">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all">
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Blocked Users</p>
              <p className="text-3xl font-bold text-white mt-2">
                {users.filter(u => u.isBlock).length}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">-2%</span>
                <span className="text-sm text-gray-400">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-all">
              <UserX className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      <div className=" gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Users</h3>
              <Link 
                href="/Admin/users" 
                className="text-sm text-green-500 hover:text-green-400 flex items-center gap-1 transition-colors"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="max-h-72 overflow-auto">
              <table className="w-full table-fixed">
                <thead className="text-xs text-gray-400 uppercase">
                  <tr>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.slice().reverse().slice(0, 10).map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 bg-linear-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-white truncate">{user.name}</p>
                            <p className="text-sm text-gray-400 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{user.role}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isBlock 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                            : 'bg-green-500/10 text-green-400 border border-green-500/20'
                        }`}>
                          {user.isBlock ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/Admin/courses"
            className="p-6 bg-linear-to-br from-green-600/10 to-green-800/10 border border-green-500/20 rounded-xl hover:border-green-500/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-green-500" />
              <ArrowUpRight className="h-5 w-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Add New Course</h4>
            <p className="text-sm text-gray-400">Create and publish a new course</p>
          </Link>

          <Link
            href="/Admin/ebooks"
            className="p-6 bg-linear-to-br from-blue-600/10 to-blue-800/10 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <ArrowUpRight className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Upload Ebook</h4>
            <p className="text-sm text-gray-400">Add new ebooks to your library</p>
          </Link>

          <Link
            href="/Admin/users"
            className="p-6 bg-linear-to-br from-purple-600/10 to-purple-800/10 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-purple-500" />
              <ArrowUpRight className="h-5 w-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Manage Users</h4>
            <p className="text-sm text-gray-400">View and manage all users</p>
          </Link>
        </div>
      </div>
          </div>
        </main>
      </div>
    </div>
  );
}