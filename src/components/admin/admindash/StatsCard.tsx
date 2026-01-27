import { Users, BookOpen, PlayCircle, UserX } from 'lucide-react';

export default function StatsCards({ stats }: any) {
  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: <Users />, color: 'green' },
    { label: 'Courses', value: stats.courses, icon: <BookOpen />, color: 'blue' },
    { label: 'Videos', value: stats.totalVideos, icon: <PlayCircle />, color: 'purple' },
    { label: 'Active Users', value: stats.activeUsers, icon: <UserX />, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="stat-card bg-white p-6 rounded-xl border shadow-sm"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">{c.label}</p>
              <p className="text-3xl font-bold mt-2">{c.value}</p>
            </div>
            <div className={`p-3 bg-${c.color}-50 rounded-lg`}>
              {c.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
