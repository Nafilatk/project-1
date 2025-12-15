// // lib/api/courses.ts
// import api from "./axios";
// import { Course } from "@/types/course";

// export const fetchCourses = async (): Promise<Course[]> => {
//   const response = await api.get("/courses");
//   return response.data;
// };

// export const fetchCourseById = async (id: string | number): Promise<Course> => {
//   const response = await api.get(`/courses/${id}`);
//   return response.data;
// };

// export const searchCourses = async (query: string): Promise<Course[]> => {
//   const response = await api.get(`/courses?q=${query}`);
//   return response.data;
// };

// export const filterCoursesByCategory = async (category: string): Promise<Course[]> => {
//   if (category === 'all') {
//     return fetchCourses();
//   }
//   const response = await api.get(`/courses?category=${category}`);
//   return response.data;
// };