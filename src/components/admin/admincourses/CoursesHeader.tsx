import { Plus } from 'lucide-react';

export default function CoursesHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Courses Management
        </h1>
        <p className="text-gray-600">
          Create, edit, and manage all courses
        </p>
      </div>

      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
      >
        <Plus size={20} />
        Add Course
      </button>
    </div>
  );
}
