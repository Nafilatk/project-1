// lib/api.ts
import { api } from "./axios";
import { Course } from '@/lib/types/courses';

export async function getCourses(): Promise<Course[]> {
  const res = await api.get("/courses");
  return res.data;
}

export async function getCourseDetails(courseId: string) {
  const res = await api.get("/courseDetails");
  const allDetails = res.data;
  return allDetails.find((detail: any) => detail.courseId === courseId);
}

export async function getVideosByCourse(courseId: number) {
  const res = await api.get("/courseDetails");
  const allDetails = res.data;
  const courseDetail = allDetails.find((detail: any) => detail.courseId === courseId);
  return courseDetail ? courseDetail.modules.flatMap((module: any) => module.videos) : [];
}
