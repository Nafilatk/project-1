export type Course = { 
  id: number; 
  name: string; 
};

export type Ebook = {
  id: number;
  title: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
  courseId: number;
  videoId: number;
};
