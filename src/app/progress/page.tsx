'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/auth-context';
import { Course, CourseDetail, Video } from '@/lib/types/courses';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type WatchHistory = {
  id: string;
  userId: string;
  courseId: string;
  completedVideos: number[];
  isCourseCompleted: boolean;
};

export default function ProgressPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [watchHistory, setWatchHistory] = useState<WatchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  
  // Refs for animations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const courseCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    if (user?.id) fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [coursesRes, detailsRes, historyRes] = await Promise.all([
        axios.get('http://localhost:3001/courses'),
        axios.get('http://localhost:3001/courseDetails'),
        axios.get(`http://localhost:3001/watchHistory?userId=${user!.id}`),
      ]);

      setCourses(coursesRes.data);
      setCourseDetails(detailsRes.data);
      setWatchHistory(historyRes.data);
      
      // Animate after data loads
      setTimeout(() => {
        animatePage();
      }, 100);
    } catch (err) {
      console.error('Progress fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ANIMATIONS ---------------- */
  const animatePage = () => {
    // Animate title with blue accent
    gsap.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out",
        color: "#2563eb" // Blue color animation
      }
    );

    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        }
      );
    }

    gsap.fromTo(sectionsRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    courseCardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(card,
          { 
            x: i % 2 === 0 ? -20 : 20, 
            opacity: 0,
            rotation: i % 2 === 0 ? -5 : 5
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
  };

  const getVideosByCourse = (courseId: string): Video[] => {
    const detail = courseDetails.find(d => d.courseId === courseId);
    return detail ? detail.modules.flatMap(m => m.videos) : [];
  };

  const calculateProgress = (completed: number[], total: number) => {
    return total > 0 ? Math.round((completed.length / total) * 100) : 0;
  };

  const toggleCourseDetails = (courseId: string) => {
    setActiveCourse(activeCourse === courseId ? null : courseId);
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-white to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-blue-300 border-t-transparent rounded-full animate-spin animation-delay-300"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-blue-700 border-t-transparent rounded-full animate-spin animation-delay-600"></div>
          <div className="mt-6 text-center text-blue-900 font-semibold tracking-wider animate-pulse">
            Loading your journey...
          </div>
        </div>
      </div>
    );
  }

  if (watchHistory.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-white to-blue-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-fade-in-up">
          <div className="text-8xl mb-6 animate-float">📘</div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Begin Your Learning Path
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            No progress found yet. Start your first course to see your progress here!
          </p>
          <button
            onClick={() => router.push('/courses')}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:bg-blue-700"
          >
            Explore Courses →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12 text-center">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-blue-900"
          >
            My Learning Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Track, Learn, and Grow Your Skills 📈
          </p>
          
          <div ref={statsRef} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl text-blue-600">🏆</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-900">{watchHistory.filter(h => h.isCourseCompleted).length}</div>
                  <div className="text-blue-600 font-medium">Courses Completed</div>
                </div>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${(watchHistory.filter(h => h.isCourseCompleted).length / watchHistory.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl text-blue-600">🎥</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-900">
                    {watchHistory.reduce((acc, h) => acc + h.completedVideos.length, 0)}
                  </div>
                  <div className="text-blue-600 font-medium">Videos Watched</div>
                </div>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl text-green-600">📚</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-900">{courses.length}</div>
                  <div className="text-blue-600 font-medium">Total Courses</div>
                </div>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div ref={sectionsRef}>
          {watchHistory.filter(h => h.isCourseCompleted).length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="p-3 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl shadow-md animate-pulse-slow">
                    <span className="text-2xl text-white">🏅</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">Completed Courses</h2>
                  <p className="text-gray-600">You've mastered these courses!</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchHistory
                  .filter(h => h.isCourseCompleted)
                  .map((history, index) => {
                    const courseInfo = courses.find(c => c.id === history.courseId);
                    const allVideos = getVideosByCourse(history.courseId);
                    
                    return (
                      <div
                        key={history.id}
                        ref={el => {courseCardsRef.current[index] = el}}
                        className="bg-white border border-blue-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-blue-400 hover:scale-[1.02] transition-all duration-500 group cursor-pointer overflow-hidden relative"
                        onClick={() => toggleCourseDetails(history.courseId)}
                      >
                        <div className="absolute top-4 right-4 px-3 py-1 bg-green-100 border border-green-300 text-green-700 rounded-full text-sm font-semibold animate-bounce-slow">
                          COMPLETED
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="font-bold text-blue-900 text-lg group-hover:text-blue-700 transition-colors mb-2">
                            {courseInfo?.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {allVideos.length} videos • 100% Complete
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600 font-semibold flex items-center gap-1">
                              <span className="text-lg">✓</span> Mastered
                            </span>
                            <span className="text-blue-900 font-bold">100%</span>
                          </div>
                          <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-linear-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                          <div className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-semibold flex items-center gap-2 group-hover:bg-blue-100 group-hover:border-blue-300 transition-all duration-300">
                            <span>View Details</span>
                            <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
                <span className="text-2xl text-white">📊</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900">Active Courses</h2>
                <p className="text-gray-600">Track your ongoing learning progress</p>
              </div>
            </div>

            <div className="space-y-6">
              {watchHistory.map((history, index) => {
                const courseInfo = courses.find(c => c.id === history.courseId);
                const allVideos = getVideosByCourse(history.courseId);
                const completedVideos = allVideos.filter(v =>
                  history.completedVideos.includes(v.id)
                );
                const pendingVideos = allVideos.filter(
                  v => !history.completedVideos.includes(v.id)
                );
                const progress = calculateProgress(completedVideos.map(v => v.id), allVideos.length);

                return (
                  <div
                    key={history.id}
                    ref={el => { courseCardsRef.current[watchHistory.filter(h => h.isCourseCompleted).length + index] = el}}
                    className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-500 overflow-hidden group"
                  >
                    <div 
                      className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 cursor-pointer"
                      onClick={() => toggleCourseDetails(history.courseId)}
                    >
                      <div className="mb-4 lg:mb-0">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl ${history.isCourseCompleted ? 'bg-linear-to-r from-green-500 to-green-600' : 'bg-linear-to-r from-blue-500 to-blue-600'} shadow-sm`}>
                            <span className="text-xl text-white">{history.isCourseCompleted ? '✓' : '▶'}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-blue-900 text-xl group-hover:text-blue-700 transition-colors">
                              {courseInfo?.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {completedVideos.length} of {allVideos.length} videos completed
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="w-20 h-20">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="#dbeafe"
                                strokeWidth="8"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={history.isCourseCompleted ? "#10b981" : "#3b82f6"}
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={251.2}
                                strokeDashoffset={251.2 * (1 - progress / 100)}
                                transform="rotate(-90 50 50)"
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xl font-bold text-blue-900">{progress}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="hidden lg:block">
                          <div className={`px-4 py-2 rounded-lg ${history.isCourseCompleted ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-blue-50 border border-blue-200 text-blue-700'} font-semibold group-hover:scale-105 transition-transform`}>
                            {history.isCourseCompleted ? 'Complete' : 'In Progress'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {activeCourse === history.courseId && (
                      <div className="mt-6 animate-slide-down">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                          <div className="bg-linear-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-lg text-blue-600">✅</span>
                              </div>
                              <h4 className="font-bold text-blue-900">Completed Videos</h4>
                              <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-sm font-semibold">
                                {completedVideos.length}
                              </span>
                            </div>
                            
                            {completedVideos.length === 0 ? (
                              <div className="text-center py-4">
                                <span className="text-4xl mb-2 block text-gray-400">📺</span>
                                <p className="text-gray-500">Start watching to see progress here</p>
                              </div>
                            ) : (
                              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {completedVideos.map(v => (
                                  <div 
                                    key={v.id}
                                    className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:bg-blue-50 transition-all duration-300 group/item hover:scale-[1.02]"
                                  >
                                    <div className="p-2 bg-blue-100 rounded group-hover/item:bg-blue-200 transition-colors">
                                      <span className="text-blue-600">✓</span>
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-blue-900 font-medium">{v.title}</p>
                                      <p className="text-gray-500 text-sm">Completed</p>
                                    </div>
                                    <div className="p-2">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="bg-linear-to-br from-white to-blue-50 border border-blue-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-lg text-blue-600">⏳</span>
                              </div>
                              <h4 className="font-bold text-blue-900">Pending Videos</h4>
                              <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-sm font-semibold">
                                {pendingVideos.length}
                              </span>
                            </div>
                            
                            {pendingVideos.length === 0 ? (
                              <div className="text-center py-4">
                                <span className="text-4xl mb-2 block text-green-500">🎉</span>
                                <p className="text-green-600 font-semibold">All videos completed!</p>
                              </div>
                            ) : (
                              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {pendingVideos.map(v => (
                                  <div 
                                    key={v.id}
                                    className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:bg-blue-50 transition-all duration-300 group/item hover:scale-[1.02]"
                                  >
                                    <div className="p-2 bg-blue-100 rounded group-hover/item:bg-blue-200 transition-colors">
                                      <span className="text-blue-600">▶</span>
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-blue-900 font-medium">{v.title}</p>
                                      <p className="text-gray-500 text-sm">Ready to watch</p>
                                    </div>
                                    <button
                                      onClick={() => router.push(`/course/${history.courseId}`)}
                                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 border border-blue-700"
                                    >
                                      Watch
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {!history.isCourseCompleted && pendingVideos.length > 0 && (
                          <div className="mt-6 text-center">
                            <button
                              onClick={() => router.push(`/course/${history.courseId}`)}
                              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:scale-105 transform transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:bg-blue-700 border border-blue-700"
                            >
                              Continue Learning →
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-10">
          <button
            onClick={() => {
              gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power2.inOut" });
            }}
            className="p-4 bg-blue-600 text-white rounded-full hover:scale-110 transform transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:bg-blue-700 border border-blue-700 animate-float"
          >
            <span className="text-xl">↑</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
          border-radius: 10px;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          70% { 
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}





























































































































