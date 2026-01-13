// 'use client';
// import { Video } from '@/types/courses';
// import { useState, useEffect } from 'react';

// interface Props {
//   videos: Video[];
// }

// export default function Roadmap({ videos }: Props) {
//   const [completedVideos, setCompletedVideos] = useState<number[]>([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/watchHistory')
//       .then(res => res.json())
//       .then(history => {
//         const courseHistory = history.find((h: any) => h.courseId === videos[0]?.id);
//         setCompletedVideos(courseHistory?.completedVideos || []);
//       });
//   }, [videos]);

//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-8">
//       <h2 className="text-2xl font-bold mb-8">Learning Roadmap</h2>
//       <div className="flex items-center space-x-6">
//         {videos.map((video, index) => (
//           <div key={video.id} className="flex items-center relative">

//             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg transition-all ${
//               completedVideos.includes(video.order)
//                 ? 'bg-green-500 text-white scale-110' 
//                 : 'bg-gray-300 text-gray-600 hover:bg-blue-400 hover:text-white cursor-pointer'
//             }`}>
//               {completedVideos.includes(video.order) ? '✓' : (index + 1)}
//             </div>
            
//             {index < videos.length - 1 && (
//               <div className={`w-20 h-1 mx-2 ${
//                 completedVideos.includes(video.order) && !completedVideos.includes(videos[index + 1].order)
//                   ? 'bg-linear-to-r from-green-500 to-transparent'
//                   : completedVideos.includes(video.order)
//                     ? 'bg-green-500'
//                     : 'bg-gray-300'
//               }`} />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
