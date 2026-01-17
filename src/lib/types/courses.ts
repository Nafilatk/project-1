export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
  ebookUrl: string;
  description: string;
  isCompleted: boolean;
  order: number;
}

export interface Module {
  id: number;
  title: string;
  videos: Video[];
}

export interface CourseDetail {
  courseId: string;
  modules: Module[];
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