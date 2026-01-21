'use client';
import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin-api';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Search, 
  User, 
  Mail, 
  Shield, 
  Ban, 
  CheckCircle, 
  Trash2, 
  Calendar 
} from 'lucide-react';

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

  const handleToggleBlock = async (userId: string, currentStatus: boolean, userRole: string) => {
    // Prevent blocking admins
    if (userRole === 'admin') {
      alert('Cannot block/unblock admin users');
      return;
    }

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

  const handleDeleteUser = async (userId: string, userRole: string) => {
    // Prevent deleting admins
    if (userRole === 'admin') {
      alert('Cannot delete admin users');
      return;
    }

    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    try {
      await adminApi.delete(`/users/${userId}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        {/* Fixed Sidebar */}
        <div className="h-full overflow-y-auto">
          <AdminSidebar />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-300 animate-pulse">Loading users...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Users Management</h1>
              <p className="text-gray-600">Manage all registered users in the platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <User className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Active Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.active}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Blocked Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.blocked}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <Ban className="text-red-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Admin Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.admins}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Shield className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Search Bar */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    Showing {filteredUsers.length} of {users.length} users
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined Date</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="text-gray-400">No users found matching your search</div>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                {user.avatarUrl ? (
                                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                  user.name.charAt(0).toUpperCase()
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{user.name}</div>
                                {user.phone && (
                                  <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                    <span className="text-gray-400">📱</span>
                                    {user.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Mail size={14} className="text-gray-400" />
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <Shield size={12} className="mr-1" />
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              user.isBlock 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.isBlock ? (
                                <>
                                  <Ban size={12} className="mr-1" />
                                  Blocked
                                </>
                              ) : (
                                <>
                                  <CheckCircle size={12} className="mr-1" />
                                  Active
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              {formatDate(user.created_at)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="inline-flex items-center space-x-2">
                              {/* Only show Block/Unblock for non-admin users */}
                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleToggleBlock(user.id, user.isBlock, user.role)}
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                    user.isBlock 
                                      ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                                      : 'bg-red-50 text-red-700 hover:bg-red-100'
                                  }`}
                                >
                                  {user.isBlock ? (
                                    <>
                                      <CheckCircle size={14} />
                                      Unblock
                                    </>
                                  ) : (
                                    <>
                                      <Ban size={14} />
                                      Block
                                    </>
                                  )}
                                </button>
                              )}

                              {/* Only show Delete for non-admin users */}
                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleDeleteUser(user.id, user.role)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              )}

                              {/* Show protected badge for admin users */}
                              {user.role === 'admin' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                                  <Shield size={14} />
                                  Protected
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}