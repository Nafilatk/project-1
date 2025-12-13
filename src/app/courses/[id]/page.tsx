// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";

// export default function CourseVideos({ params }: any) {
//   const [course, setCourse] = useState<any>(null);

//   useEffect(() => {
//     api.get(`/courses/${params.id}`).then(res => setCourse(res.data));
//   }, [params.id]);

//   if (!course) return <p className="pt-24 text-center">Loading...</p>;

//   return (
//     <div className="pt-24 px-6">
//       <h1 className="text-3xl font-bold mb-6">{course.title}</h1>

//       {/* ---------- YOUTUBE STYLE GRID ---------- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {course.videos.map((video: string, index: number) => (
//           <div
//             key={index}
//             className="aspect-video rounded-lg overflow-hidden border"
//           >
//             <iframe
//               src={video}
//               className="w-full h-full"
//               allowFullScreen
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
