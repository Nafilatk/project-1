import Link from 'next/link';
import { Shield, ChevronRight } from 'lucide-react';

export default function RecentUsers({ users }: any) {
  const recent = [...users].slice(0, 5);

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-semibold">Recent Users</h3>
        <Link href="/Admin/users" className="text-blue-600 flex items-center">
          View all <ChevronRight size={16} />
        </Link>
      </div>

      <table className="w-full">
        <tbody>
          {recent.map((u: any) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="py-3 flex gap-3 items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white flex items-center justify-center">
                  {u.name[0]}
                </div>
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
              </td>
              <td>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  <Shield size={12} /> {u.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
