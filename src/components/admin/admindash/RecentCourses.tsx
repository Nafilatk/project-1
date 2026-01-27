import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function RecentCourses({ courses, courseDetails }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-semibold">Recent Courses</h3>
        <Link href="/Admin/Admincourses" className="text-blue-600 flex items-center">
          View all <ChevronRight size={16} />
        </Link>
      </div>

      {courses.slice(0, 5).map((c: any) => {
        const detail = courseDetails.find((d: any) => d.courseId === c.id);
        const videos = detail?.modules.reduce((t: number, m: any) => t + m.videos.length, 0) || 0;

        return (
          <div key={c.id} className="flex justify-between py-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-500">{videos} videos</p>
            </div>
            <ChevronRight />
          </div>
        );
      })}
    </div>
  );
}
