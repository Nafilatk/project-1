// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/context/auth-context';
// import { useRouter } from 'next/navigation';
// import { Course, CourseDetail, Video } from '@/lib/types/courses';
// import { fetchUserProgress, createUserProgress } from '@/lib/progress-client-api';
// import { CheckCircle2, Clock, BookOpen, Play, Zap } from 'lucide-react';

// interface CourseProgress {
//   courseId: string;
//   completedVideos: number[];
//   isCourseCompleted: boolean;
//   completedAt: string | null;
// }

// interface UserProgress {
//   id: string;
//   userId: string;
//   courses: CourseProgress[];
// }

// export default function ProgressPage() {
//   const { user, loading: authLoading } = useAuth();
//   const router = useRouter();

//   const [courses, setCourses] = useState<Course[]>([]);
//   const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
//   const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
//   const [loading, setLoading] = useState(true);

//   /* ======================== AUTH ======================== */
//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push('/login');
//     }
//   }, [user, authLoading, router]);

//   /* ======================== FETCH DATA ======================== */
//   useEffect(() => {
//     if (user?.id) {
//       fetchData();
//     }
//   }, [user]);

//   const fetchData = async () => {
//     try {
//       // Ensure user has progress record
//       const existingProgress = await fetchUserProgress(user!.id);
//       if (!existingProgress) {
//         await createUserProgress(user!.id);
//       }

//       const [coursesRes, detailsRes, progressRes] = await Promise.all([
//         fetch('http://localhost:3001/courses'),
//         fetch('http://localhost:3001/courseDetails'),
//         fetch(`http://localhost:3001/userProgress?userId=${user!.id}`),
//       ]);

//       if (!coursesRes.ok || !detailsRes.ok || !progressRes.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const coursesData = await coursesRes.json();
//       const detailsData = await detailsRes.json();
//       const progressData = await progressRes.json();

//       setCourses(coursesData);
//       setCourseDetails(detailsData);
//       setUserProgress(progressData[0] || null);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ======================== HELPERS ======================== */
//   const getTotalVideos = (courseId: string): number => {
//     const detail = courseDetails.find(d => d.courseId === courseId);
//     return detail ? detail.modules.flatMap(m => m.videos).length : 0;
//   };

//   const getCourseInfo = (courseId: string) => {
//     return courses.find(c => c.id === courseId);
//   };

//   const getAllVideos = (courseId: string): Video[] => {
//     const detail = courseDetails.find(d => d.courseId === courseId);
//     return detail ? detail.modules.flatMap(m => m.videos) : [];
//   };

//   const getProgressPercent = (courseId: string, completed: number[]): number => {
//     const total = getTotalVideos(courseId);
//     return total === 0 ? 0 : Math.round((completed.length / total) * 100);
//   };

//   /* ======================== LOADING STATE ======================== */
//   if (loading || authLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-600 font-medium">Loading your progress...</p>
//         </div>
//       </div>
//     );
//   }

//   const completedCourses = userProgress?.courses.filter(c => c.isCourseCompleted) || [];
//   const inProgressCourses = userProgress?.courses.filter(c => !c.isCourseCompleted) || [];

//   // Get all completed videos across all courses
//   const allCompletedVideos: { courseId: string; videoId: number; video: Video; courseName: string }[] = [];
//   userProgress?.courses.forEach(course => {
//     const courseInfo = getCourseInfo(course.courseId);
//     const allVideos = getAllVideos(course.courseId);
//     course.completedVideos.forEach(videoId => {
//       const video = allVideos.find(v => v.id === videoId);
//       if (video) {
//         allCompletedVideos.push({
//           courseId: course.courseId,
//           videoId,
//           video,
//           courseName: courseInfo?.name || 'Unknown Course',
//         });
//       }
//     });
//   });

//   // Get all pending videos
//   const allPendingVideos: { courseId: string; videoId: number; video: Video; courseName: string }[] = [];
//   userProgress?.courses.forEach(course => {
//     const courseInfo = getCourseInfo(course.courseId);
//     const allVideos = getAllVideos(course.courseId);
//     allVideos.forEach(video => {
//       if (!course.completedVideos.includes(video.id)) {
//         allPendingVideos.push({
//           courseId: course.courseId,
//           videoId: video.id,
//           video,
//           courseName: courseInfo?.name || 'Unknown Course',
//         });
//       }
//     });
//   });

//   /* ======================== RENDER ======================== */
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6 md:p-10">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-10">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
//             📊 My Learning Progress
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Track your course completion and video progress
//           </p>
//         </div>

//         {/* STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//           <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">Courses Enrolled</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">
//                   {userProgress?.courses.length || 0}
//                 </p>
//               </div>
//               <BookOpen className="text-blue-500" size={32} />
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">Completed Courses</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">
//                   {completedCourses.length}
//                 </p>
//               </div>
//               <CheckCircle2 className="text-green-500" size={32} />
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">In Progress</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">
//                   {inProgressCourses.length}
//                 </p>
//               </div>
//               <Clock className="text-amber-500" size={32} />
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">Videos Completed</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">
//                   {allCompletedVideos.length}
//                 </p>
//               </div>
//               <Zap className="text-purple-500" size={32} />
//             </div>
//           </div>
//         </div>

//         {/* THREE COLUMN LAYOUT */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* COMPLETED COURSES */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl border-2 border-green-200 overflow-hidden shadow-sm">
//               <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
//                 <h2 className="text-xl font-bold flex items-center gap-2">
//                   <CheckCircle2 size={24} />
//                   Completed Courses
//                 </h2>
//               </div>
//               <div className="p-4 max-h-96 overflow-y-auto">
//                 {completedCourses.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8">No completed courses yet.</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {completedCourses.map(course => {
//                       const courseInfo = getCourseInfo(course.courseId);
//                       return (
//                         <div
//                           key={course.courseId}
//                           className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
//                         >
//                           <p className="font-semibold text-gray-800">{courseInfo?.name}</p>
//                           <p className="text-xs text-green-600 mt-1">
//                             ✓ Completed {new Date(course.completedAt!).toLocaleDateString()}
//                           </p>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* COMPLETED VIDEOS */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl border-2 border-blue-200 overflow-hidden shadow-sm">
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
//                 <h2 className="text-xl font-bold flex items-center gap-2">
//                   <Play size={24} />
//                   Completed Videos
//                 </h2>
//                 <p className="text-sm text-blue-100 mt-1">{allCompletedVideos.length} videos</p>
//               </div>
//               <div className="p-4 max-h-96 overflow-y-auto">
//                 {allCompletedVideos.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8">No videos completed yet.</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {allCompletedVideos.map((item, idx) => (
//                       <div
//                         key={`${item.courseId}-${item.videoId}-${idx}`}
//                         className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
//                       >
//                         <p className="font-semibold text-gray-800 text-sm line-clamp-2">
//                           {item.video.title}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">{item.courseName}</p>
//                         <p className="text-xs text-blue-600 font-medium mt-1">✓ Completed</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* PENDING VIDEOS */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl border-2 border-amber-200 overflow-hidden shadow-sm">
//               <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white">
//                 <h2 className="text-xl font-bold flex items-center gap-2">
//                   <Clock size={24} />
//                   Pending Videos
//                 </h2>
//                 <p className="text-sm text-amber-100 mt-1">{allPendingVideos.length} videos</p>
//               </div>
//               <div className="p-4 max-h-96 overflow-y-auto">
//                 {allPendingVideos.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8">All videos completed! 🎉</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {allPendingVideos.map((item, idx) => (
//                       <div
//                         key={`${item.courseId}-${item.videoId}-${idx}`}
//                         className="p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition cursor-pointer"
//                         onClick={() => router.push(`/courses?courseId=${item.courseId}`)}
//                       >
//                         <p className="font-semibold text-gray-800 text-sm line-clamp-2">
//                           {item.video.title}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">{item.courseName}</p>
//                         <p className="text-xs text-amber-600 font-medium mt-1">→ Start Learning</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* IN-PROGRESS COURSES SECTION */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             ⏳ In Progress Courses
//           </h2>

//           {inProgressCourses.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
//               <BookOpen className="mx-auto mb-4 text-gray-300" size={48} />
//               <p className="text-gray-500 text-lg">No courses in progress.</p>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-6">
//               {inProgressCourses.map(courseProgress => {
//                 const courseInfo = getCourseInfo(courseProgress.courseId);
//                 const totalVideos = getTotalVideos(courseProgress.courseId);
//                 const completedCount = courseProgress.completedVideos.length;
//                 const pendingCount = totalVideos - completedCount;
//                 const percent = getProgressPercent(courseProgress.courseId, courseProgress.completedVideos);

//                 return (
//                   <div
//                     key={courseProgress.courseId}
//                     className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <h3 className="text-lg font-bold text-gray-800">
//                           {courseInfo?.name || 'Unknown Course'}
//                         </h3>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {completedCount}/{totalVideos} videos
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-3xl font-bold text-blue-600">{percent}%</p>
//                       </div>
//                     </div>

//                     <div className="flex gap-4 mb-4 text-sm">
//                       <div className="flex-1">
//                         <p className="text-gray-500">Completed</p>
//                         <p className="font-bold text-green-600">{completedCount}</p>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-gray-500">Pending</p>
//                         <p className="font-bold text-amber-600">{pendingCount}</p>
//                       </div>
//                     </div>

//                     <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
//                       <div
//                         className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
//                         style={{ width: `${percent}%` }}
//                       />
//                     </div>

//                     <button
//                       onClick={() => router.push(`/courses?courseId=${courseProgress.courseId}`)}
//                       className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
//                     >
//                       <Play size={18} />
//                       Continue Learning
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }