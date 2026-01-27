'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '@/components/admin/adminbar/AdminSidebar';

import DashboardHeader from '@/components/admin/admindash/DashHeader';
import StatsCards from '@/components/admin/admindash/StatsCard';
import RecentUsers from '@/components/admin/admindash/RecentUsers';
import RecentCourses from '@/components/admin/admindash/RecentCourses';
import QuickActions from '@/components/admin/admindash/QuickActions';
import DashboardAnimations from '@/components/admin/admindash/DashAnimations';

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [courseDetails, setCourseDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    const api = axios.create({ baseURL: 'http://localhost:3001' });

    const fetchData = async () => {
      const [u, c, d] = await Promise.all([
        api.get('/users'),
        api.get('/courses'),
        api.get('/courseDetails'),
      ]);

      setUsers(u.data);
      setCourses(c.data);
      setCourseDetails(d.data.filter((x: any) => x.modules));

      const blocked = u.data.filter((x: any) => x.isBlock).length;
      const active = u.data.length - blocked;

const totalVideos = d.data.reduce((total: number, detail: any) => {
  if (!Array.isArray(detail.modules)) return total;

  return (
    total +
    detail.modules.reduce((moduleTotal: number, module: any) => {
      return moduleTotal + (module.videos?.length || 0);
    }, 0)
  );
}, 0);


      setStats({
        totalUsers: u.data.length,
        courses: c.data.length,
        activeUsers: active,
        totalVideos,
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center text-gray-300 animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardAnimations /> {/* 👈 GSAP HOOK */}

      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <DashboardHeader />
            <StatsCards stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RecentUsers users={users} />
              <RecentCourses courses={courses} courseDetails={courseDetails} />
            </div>
            <QuickActions />
          </div>
        </main>
      </div>
    </>
  );
}
