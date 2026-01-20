// 'use client';
// interface Props {
//   onSearch: (term: string) => void;
// }

// export default function SearchBar({ onSearch }: Props) {
//   return (
//     <div className="relative mb-8">
//       <input
//         type="text"
//         placeholder="Search courses..."
//         className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg transition-all"
//         onChange={(e) => onSearch(e.target.value)}
//       />
//       <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//       </svg>
//     </div>
//   );
// }
