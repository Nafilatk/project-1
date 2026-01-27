import { User, CheckCircle, Ban, Shield } from 'lucide-react';

export default function UsersStats({ stats }: any) {
  const cards = [
    { label: 'Total Users', value: stats.total, icon: <User />, color: 'blue' },
    { label: 'Active Users', value: stats.active, icon: <CheckCircle />, color: 'green' },
    { label: 'Blocked Users', value: stats.blocked, icon: <Ban />, color: 'red' },
    { label: 'Admin Users', value: stats.admins, icon: <Shield />, color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map(c => (
        <div key={c.label} className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{c.label}</p>
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
