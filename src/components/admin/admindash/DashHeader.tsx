import { Calendar } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, Admin
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your platform today.
        </p>
      </div>

      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border">
        <Calendar className="h-5 w-5 text-gray-500" />
        <span className="text-gray-700">
          {new Date().toDateString()}
        </span>
      </div>
    </div>
  );
}
