// src/app/lib/api.ts

import { api } from "./axios";


export async function getCourses() {
  const res = await api.get("/courses");
  return res.data;
}

export async function getVideosByCourse(courseId: number) {
  const res = await api.get("/videos", {
    params: { courseId },
  });
  return res.data;
}

export async function getEbooksByCourse(courseId: number) {
  const res = await api.get("/ebooks", {
    params: { courseId },
  });
  return res.data;
}
