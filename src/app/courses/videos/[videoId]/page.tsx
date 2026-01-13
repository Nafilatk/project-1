'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
  ebookUrl: string;
  description: string;
}

export default function VideoPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoData();
  }, [params.courseId, params.videoId]);

  const fetchVideoData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/courseDetails?courseId=${params.courseId}`);
      const data = await res.json();
      
      let allVideos: Video[] = [];
      if (data[0]?.modules) {
        allVideos = data[0].modules.flatMap((module: any) => module.videos || []);
      }
      
      setVideos(allVideos);
      const initialIndex = allVideos.findIndex((v: Video) => v.id === parseInt(params.videoId as string));
      setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);

      const historyRes = await fetch('http://localhost:3001/watchHistory');
      const history = await historyRes.json();
      const courseHistory = history.find((h: any) => h.courseId === params.courseId);
      setCompletedVideos(courseHistory?.completedVideos || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markVideoComplete = async () => {
    const videoId = videos[currentIndex]?.id;
    if (videoId && !completedVideos.includes(videoId)) {
      const newCompleted = [...completedVideos, videoId];
      await fetch(`http://localhost:3001/watchHistory/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: "1", 
          courseId: params.courseId, 
          completedVideos: newCompleted 
        })
      });
      setCompletedVideos(newCompleted);
    }
  };

  const goToVideo = (index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentIndex(index);
      router.push(`/courses/${params.courseId}/video/${videos[index].id}`);
    }
  };

  const currentVideo = videos[currentIndex];

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youTubeId = currentVideo ? getYouTubeId(currentVideo.videoUrl) : null;
  const embedUrl = youTubeId ? `https://www.youtube.com/embed/${youTubeId}?autoplay=1&modestbranding=1&rel=0` : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="text-xl">Loading video...</div>
        </div>
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
        <div className="text-center text-white max-w-md p-8">
          <h1 className="text-4xl font-bold mb-6">Video Not Found</h1>
          <Link href={`/courses/${params.courseId}`} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl inline-flex items-center gap-2">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-black text-white overflow-hidden">
      <div className="relative z-10 h-screen flex flex-col">
        {/* Top Navigation */}
        <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30 p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link 
              href={`/courses/${params.courseId}`}
              className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-3xl font-semibold transition-all group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Lessons
            </Link>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm text-sm font-semibold">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Lesson {currentIndex + 1} of {videos.length}
              </div>
              
              <Link
                href={`/courses/${params.courseId}/video/${currentVideo.id}/ebook`}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold rounded-3xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-2xl shadow-emerald-500/25 backdrop-blur-sm flex items-center gap-2"
              >
                📚 Ebook
              </Link>
            </div>
          </div>
        </header>

        {/* Video Player - IFRAME */}
        <main className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <div className="w-full max-w-5xl mx-auto">
            <div className="relative bg-black/80 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 backdrop-blur-xl aspect-video max-w-4xl mx-auto">
              {youTubeId && embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={markVideoComplete}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-3xl">
                  <div className="text-center text-gray-400">
                    <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-xl">Invalid YouTube URL</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="mt-12 px-8 max-w-4xl mx-auto">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                    {currentVideo.title}
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                    {currentVideo.description}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center mt-2 ml-4 text-lg font-bold shadow-lg ${
                  completedVideos.includes(currentVideo.id)
                    ? 'bg-emerald-500 text-white shadow-emerald-400/50'
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  {completedVideos.includes(currentVideo.id) ? '✓' : '○'}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Navigation Controls */}
        <footer className="bg-black/60 backdrop-blur-xl border-t border-white/10 p-8">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-8">
            <button
              onClick={() => goToVideo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="px-12 py-6 bg-white/10 hover:bg-white/20 disabled:bg-gray-800/50 disabled:cursor-not-allowed backdrop-blur-sm rounded-3xl font-bold text-xl transition-all flex items-center gap-3 shadow-xl border border-white/20 hover:border-white/40 group min-w-[140px]"
            >
              <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToVideo(index)}
                  className={`w-4 h-4 rounded-xl transition-all shadow-lg border-2 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 scale-125 border-white shadow-blue-500/50'
                      : completedVideos.includes(videos[index].id)
                      ? 'bg-emerald-500 border-emerald-600 hover:scale-110'
                      : 'bg-gray-600 border-gray-700 hover:bg-white/30 hover:scale-110'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goToVideo(currentIndex + 1)}
              disabled={currentIndex === videos.length - 1}
              className="px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-emerald-600/50 disabled:to-teal-600/50 disabled:cursor-not-allowed backdrop-blur-sm rounded-3xl font-bold text-xl transition-all shadow-2xl shadow-emerald-500/25 flex items-center gap-3 min-w-[140px]"
            >
              Next
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
