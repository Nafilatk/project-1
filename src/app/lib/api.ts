// src/app/lib/api.ts
import apiClient from "./axios";

export async function getCourses() {
  const res = await apiClient.get("/courses");
  return res.data;
}

export async function getVideosByCourse(courseId: number) {
  const res = await apiClient.get("/videos", {
    params: { courseId },
  });
  return res.data;
}

export async function getEbooksByCourse(courseId: number) {
  const res = await apiClient.get("/ebooks", {
    params: { courseId },
  });
  return res.data;
}
