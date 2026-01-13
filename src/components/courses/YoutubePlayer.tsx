// components/YouTubePlayer.tsx
'use client';

import { useEffect, useRef } from 'react';

interface YouTubePlayerProps {
  videoUrl: string;
  title: string;
}

export default function YouTubePlayer({ videoUrl, title }: YouTubePlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Extract video ID from YouTube URL
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    if (iframeRef.current && videoId) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
  }, [videoUrl]);

  return (
    <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
}
