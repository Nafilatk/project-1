'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin-api';
import AdminSidebar from '@/components/admin/adminbar/AdminSidebar';

import UsersHeader from '@/components/admin/adminusers/UsersHeader';
import UsersStats from '@/components/admin/adminusers/UsersStats';
import UsersSearchBar from '@/components/admin/adminusers/UsersSeacrchBar';
import UsersTable from '@/components/admin/adminusers/UsersTable';

export type UserType = {
  id: string;
  name: string;
  email: string;
  isBlock: boolean;
  role: string;
  created_at: string;
  phone?: string;
  avatarUrl?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminApi.get('/users');
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (id: string, isBlock: boolean, role: string) => {
    if (role === 'admin') return alert('Cannot block admin users');
    if (!confirm(`Are you sure you want to ${isBlock ? 'unblock' : 'block'} this user?`)) return;

    await adminApi.patch(`/users/${id}`, { isBlock: !isBlock });
    fetchUsers();
  };

  const handleDeleteUser = async (id: string, role: string) => {
    if (role === 'admin') return alert('Cannot delete admin users');
    if (!confirm('Are you sure you want to delete this user?')) return;

    await adminApi.delete(`/users/${id}`);
    fetchUsers();
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    active: users.filter(u => !u.isBlock).length,
    blocked: users.filter(u => u.isBlock).length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="h-full overflow-y-auto">
          <AdminSidebar />
        </div>
        <main className="flex-1 bg-gray-50 flex items-center justify-center text-gray-300 animate-pulse">
          Loading users...
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full overflow-y-auto">
        <AdminSidebar />
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-8 max-w-7xl mx-auto">
          <UsersHeader />
          <UsersStats stats={stats} />
          <UsersSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            total={users.length}
            filtered={filteredUsers.length}
          />
          <UsersTable
            users={filteredUsers}
            onToggleBlock={handleToggleBlock}
            onDelete={handleDeleteUser}
            formatDate={formatDate}
          />
        </div>
      </main>
    </div>
  );
}
