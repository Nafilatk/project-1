'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/admin-api';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

type User = {
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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminApi.get('/users');
      const usersData = Array.isArray(res.data) ? res.data : [];
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (userId: string, currentStatus: boolean) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'unblock' : 'block'} this user?`)) return;
    
    try {
      await adminApi.patch(`/users/${userId}`, { 
        isBlock: !currentStatus 
      });
      fetchUsers(); 
    } catch (error) {
      console.error('Failed to update user status:', error);
      alert('Failed to update user status');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    try {
      await adminApi.delete(`/users/${userId}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-300 animate-pulse">Loading users...</div>
      </div>
    );
  }

  return (
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-1 bg-white p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Users Management</h2>
                <p className="text-gray-400 mt-1">Manage {users.length} total users • {filteredUsers.length} shown</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm">
                              {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt={`${user.name} avatar`} className="w-10 h-10 rounded-full object-cover" />
                              ) : (
                                user.name.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{user.name}</div>
                              {user.phone && <div className="text-sm text-white">{user.phone}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-900/30 text-purple-300' : 'bg-gray-700 text-gray-300'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isBlock ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
                            {user.isBlock ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">{new Date(user.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center space-x-2">
                            <Link href={`/admin/users/${user.id}`} aria-label={`View ${user.name}`} className="text-purple-400 hover:text-purple-300 px-3 py-1 rounded-md hover:bg-gray-700 transition-all text-sm font-medium">View</Link>
                            <button onClick={() => handleToggleBlock(user.id, user.isBlock)} className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${user.isBlock ? 'bg-green-900/30 text-green-300 hover:bg-green-800/30' : 'bg-red-900/30 text-red-300 hover:bg-red-800/30'}`}>
                              {user.isBlock ? 'Unblock' : 'Block'}
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:text-red-300 px-3 py-1 rounded-md hover:bg-gray-700 transition-all text-sm font-medium">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}