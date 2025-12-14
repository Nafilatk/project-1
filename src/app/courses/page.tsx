// // app/courses/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// // import api from "@/lib/axios";
// // import Sidebar from "@/components/Sidebar";

// interface Course {
//   id: string;
//   title: string;
//   category: string;
//   // Add other fields as needed
// }

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/courses");
//         setCourses(res.data);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch courses:", err);
//         setError("Failed to load courses. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const filteredCourses = courses.filter(course =>
//     course.title.toLowerCase().includes(search.toLowerCase()) &&
//     (category === "all" || course.category === category)
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-24 px-6 flex flex-col items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <p className="mt-4 text-lg">Loading courses...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen pt-24 px-6 flex flex-col items-center justify-center">
//         <div className="text-red-600 text-lg mb-4">⚠️ {error}</div>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="pt-24 px-6 flex gap-8 max-w-7xl mx-auto">
//         {/* Sidebar Component */}
//         <Sidebar
//           search={search}
//           category={category}
//           onSearchChange={setSearch}
//           onCategoryChange={setCategory}
//         />

//         {/* Main Content */}
//         <main className="flex-1">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
//               <p className="text-gray-600 mt-2">
//                 Browse and filter through our collection of courses
//               </p>
//             </div>
//             <div className="mt-4 sm:mt-0 text-sm bg-white px-4 py-2 rounded-lg border">
//               <span className="font-medium">{filteredCourses.length}</span>
//               <span className="text-gray-500 ml-1">
//                 {filteredCourses.length === 1 ? 'course' : 'courses'} found
//               </span>
//             </div>
//           </div>

//           {filteredCourses.length === 0 ? (
//             <div className="bg-white border rounded-xl p-12 text-center">
//               <div className="text-6xl mb-4">📚</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No courses found
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {search || category !== "all"
//                   ? "Try adjusting your search or filter criteria"
//                   : "No courses available at the moment"}
//               </p>
//               {(search || category !== "all") && (
//                 <button
//                   onClick={() => {
//                     setSearch("");
//                     setCategory("all");
//                   }}
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
//                 >
//                   Clear all filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredCourses.map((course) => (
//                 <Link
//                   key={course.id}
//                   href={`/courses/${course.id}`}
//                   className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
//                       <span className="text-blue-600 font-bold">
//                         {course.title.charAt(0)}
//                       </span>
//                     </div>
//                     <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
//                       {course.category}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
//                     {course.title}
//                   </h3>
//                   <div className="flex items-center text-sm text-blue-600 font-medium mt-4">
//                     View Details
//                     <svg
//                       className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M14 5l7 7m0 0l-7 7m7-7H3"
//                       />
//                     </svg>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }