import Link from 'next/link';
import { Users, BookOpen, ArrowUpRight } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/Admin/Admincourses" className="quick-card p-6 rounded-xl border">
          <BookOpen />
          <h4 className="font-semibold mt-2">Manage Courses</h4>
        </Link>

        <Link href="/Admin/users" className="quick-card p-6 rounded-xl border">
          <Users />
          <h4 className="font-semibold mt-2">Manage Users</h4>
        </Link>
      </div>
    </div>
  );
}
