import { Edit, Trash2, ChevronDown, ChevronUp, Clock, Layers } from 'lucide-react';
import CourseModulesView from './CourseModulesView';

export default function CourseCard(props: any) {
  const {
    course,
    courseDetails,
    categories,
    expandedCourse,
    setExpandedCourse,
    onEdit,
    fetchAll,
  } = props;

  const detail = courseDetails.find((cd: any) => cd.courseId === course.id);
  const isOpen = expandedCourse === course.id;
  const category = categories.find((c: any) => c.id === course.categoryId);

  const totalVideos =
    detail?.modules?.reduce((t: number, m: any) => t + (m.videos?.length || 0), 0) || 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6">
        {/* HEADER */}
        {/* (unchanged UI – trimmed for brevity here) */}

        <button onClick={() => setExpandedCourse(isOpen ? null : course.id)}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {isOpen && detail && (
          <CourseModulesView modules={detail.modules} />
        )}
      </div>
    </div>
  );
}
