'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function EbookPage() {
  const params = useParams();
  const [ebookUrl, setEbookUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEbook();
  }, [params]);

  const fetchEbook = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/courseDetails?courseId=${params.courseId}`);
      const data = await res.json();
      const allVideos = data[0]?.modules?.flatMap((m: any) => m.videos) || [];
      const currentVideo = allVideos.find((v: any) => v.id === parseInt(params.videoId as string));
      
      if (currentVideo) {
        setEbookUrl(currentVideo.ebookUrl);
        setVideoTitle(currentVideo.title);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-2xl text-emerald-600 animate-pulse">Loading ebook...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href={`/courses/${params.courseId}/video/${params.videoId}`}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl font-bold mb-12 hover:from-emerald-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Video
        </Link>

        <div className="bg-white/90 backdrop-blur-xl rounded-4xl shadow-2xl border p-12">
          <div className="flex items-start gap-8 mb-12">
            <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm0 4c-.989 0-1.804.818-1.804 1.827 0 .696.469 1.293 1.115 1.484v2.289h-2.113V13c.56-.118 1.239-.354 1.862-.707.59-.33 1.045-.741 1.396-1.318.35-.577.612-1.355.735-2.297h2.169c.123.942.385 1.72.735 2.297.351.577.806.988 1.396 1.318.623.353 1.302.589 1.862.707v1.092h-2.113v-2.289c.646-.191 1.115-.788 1.115-1.484.001-1.009-.815-1.827-1.804-1.827z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{videoTitle}</h1>
              <p className="text-xl text-gray-700">Companion ebook for the lesson</p>
            </div>
          </div>

          {ebookUrl ? (
            <>
              <iframe
                src={`${ebookUrl}#toolbar=1&navpanes=1`}
                className="w-full h-[70vh] rounded-3xl border-4 border-emerald-200 shadow-2xl"
                title="Ebook"
              />
              <div className="flex flex-col lg:flex-row gap-6 mt-12">
                <a href={ebookUrl} download className="flex-1 px-12 py-8 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xl rounded-3xl text-center flex items-center justify-center gap-4 hover:from-emerald-700">
                  💾 Download PDF
                </a>
                <a href={ebookUrl} target="_blank" className="flex-1 px-12 py-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-3xl text-center flex items-center justify-center gap-4 hover:from-blue-700">
                  🔗 Open Fullscreen
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-32">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Ebook Available</h3>
              <p className="text-xl text-gray-600">This lesson doesn't have an ebook yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
