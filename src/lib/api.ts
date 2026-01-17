// lib/api.ts
export async function getCourses() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/courses`, {
      cache: 'force-cache',
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch courses');
    return await res.json();
  } catch (error) {
    console.error('getCourses error:', error);
    return [];
  }
}

export async function getCourseDetails(courseId: string) {
  try {
    const coursesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/courses`);
    const detailsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/courseDetails`);
    
    const courses = await coursesRes.json();
    const details = await detailsRes.json();
    
    const course = courses.find((c: any) => c.id === courseId);
    const detail = details.find((d: any) => d.courseId === courseId);
    
    return { course, details: detail };
  } catch (error) {
    console.error('getCourseDetails error:', error);
    return { course: null, details: null };
  }
}
