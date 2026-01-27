import CourseCard from './CourseCard';

export default function CoursesList(props: any) {
  const {
    courses,
    courseDetails,
    categories,
    expandedCourse,
    setExpandedCourse,
    onEdit,
    fetchAll,
  } = props;

  return (
    <div className="space-y-4">
      {courses.map((course: any) => (
        <CourseCard
          key={course.id}
          course={course}
          courseDetails={courseDetails}
          categories={categories}
          expandedCourse={expandedCourse}
          setExpandedCourse={setExpandedCourse}
          onEdit={onEdit}
          fetchAll={fetchAll}
        />
      ))}
    </div>
  );
}
