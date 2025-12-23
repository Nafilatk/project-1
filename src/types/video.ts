export type Course = {
  id: number;
  name: string;
  categoryId: number;
};

export type Video = {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  courseId: number;
};
