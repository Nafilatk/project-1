// import VideoCard from '@/components/courses/VideoCard';
// import YouTubePlayer from '@/components/courses/YoutubePlayer';
// import { getCourseDetails } from '@/lib/api';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ChevronLeft, PlayCircle, Clock, BookOpen } from 'lucide-react';

// interface Course {
//   id: string;
//   name: string;
//   description: string;
//   thumbnail: string;
//   duration: string;
//   level: string;
// }

// interface Video {
//   id: number;
//   title: string;
//   videoUrl: string;
//   thumbnail: string;
//   duration: string;
//   ebookUrl?: string;
//   isCompleted: boolean;
// }

// interface CourseDetail {
//   courseId: string;
//   modules: {
//     id: number;
//     title: string;
//     videos: Video[];
//   }[];
// }

// export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const { course, details } = await getCourseDetails(id);

//   if (!course || !details) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
//         <div className="text-center max-w-md">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Course not found</h2>
//           <Link href="/courses" className="text-blue-600 hover:underline">← Back to Courses</Link>
//         </div>
//       </div>
//     );
//   }

//   const totalVideos = details.modules.reduce((acc, module) => acc + module.videos.length, 0);
//   const completedVideos = details.modules.reduce((acc, module) => 
//     acc + module.videos.filter(v => v.isCompleted).length, 0
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Course Header */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
//           <div className="flex flex-col lg:flex-row items-start gap-6">
//             <Image
//               src={course.thumbnail || '/placeholder.jpg'}
//               alt={course.name}
//               width={200}
//               height={120}
//               className="w-48 h-32 object-cover rounded-2xl shadow-2xl shrink-0 lg:w-56 lg:h-36"
//             />
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-4 mb-4 flex-wrap">
//                 <Link href="/courses" className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
//                   <ChevronLeft className="w-4 h-4 mr-1" />
//                   Back to Courses
//                 </Link>
//                 <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-4 py-2 rounded-full">
//                   <PlayCircle className="w-4 h-4" />
//                   {completedVideos} / {totalVideos} videos
//                 </div>
//               </div>
//               <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight">
//                 {course.name}
//               </h1>
//               <p className="text-xl text-gray-600 mb-6">{course.description}</p>
//               <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-4 h-4" />
//                   {course.duration}
//                 </div>
//                 {details.modules[0]?.videos[0]?.ebookUrl && (
//                   <a href={details.modules[0].videos[0].ebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600">
//                     <BookOpen className="w-4 h-4" />
//                     View Resources
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Course Content */}
//           <div className="lg:col-span-2 space-y-6 max-h-[80vh] overflow-y-auto pr-4 lg:pr-8">
//             <h2 className="text-2xl font-bold mb-6 sticky top-0 bg-white/90 backdrop-blur-sm py-4 z-10 rounded-2xl shadow-sm">
//               Course Content ({totalVideos} videos)
//             </h2>
            
//             {details.modules.map((module) => (
//               <div key={module.id} className="space-y-4">
//                 <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 px-2">
//                   {module.title}
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {module.videos.map((video) => (
//                     <VideoCard
//                       key={video.id}
//                       video={video}
//                       videoUrl={video.videoUrl}
//                       isActive={false}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Player Placeholder */}
//           <div className="lg:col-span-2">
//             <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-16 text-center text-white sticky top-8 shadow-2xl border-4 border-white/20">
//               <PlayCircle className="w-24 h-24 mx-auto mb-8 opacity-75 animate-pulse" />
//               <h3 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Learning?</h3>
//               <p className="text-xl opacity-90 mb-8">Click any video from the course content to begin your learning journey</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
