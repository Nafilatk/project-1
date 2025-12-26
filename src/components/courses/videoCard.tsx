// import type { Video, Course } from "@/types/video"; 

// interface VideoCardProps {
//   video: Video;
//   courseName?: string;
// }

// export default function VideoCard({ video, courseName }: VideoCardProps) {
//   return (
//     <a
//       href={video.url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="video-card group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
//     >
//       <div className="relative aspect-video overflow-hidden bg-gray-100">
//         <img
//           src={video.thumbnail}
//           alt={video.title}
//           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-linear-to-t from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//       </div>

//       <div className="p-3">
//         <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
//           {video.title}
//         </h3>
//         {courseName && (
//           <p className="mt-1 text-[11px] uppercase tracking-wide text-blue-800">
//             {courseName}
//           </p>
//         )}
//       </div>
//     </a>
//   );
// }
