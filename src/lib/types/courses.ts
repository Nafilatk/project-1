// types/course.ts
export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
  ebookUrl?: string;
  description: string;
  isCompleted: boolean;
  order: number;
}

export interface Course {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
}

export interface CourseVideo {
  id: number;
  courseId: number;
  title: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
  ebookUrl?: string;
  description: string;
  isCompleted: boolean;
  order: number;
}
