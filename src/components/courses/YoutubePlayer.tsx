'use client';

import { useState } from 'react';
import { PlayCircle, CheckCircle } from 'lucide-react';
import { Video } from '@/lib/types/courses';

interface VideoPlayerProps {
  video: Video;
  onComplete: () => void;
}

export default function VideoPlayer({ video, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube ID
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
    );
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(video.videoUrl);

  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-lg">

      {/* VIDEO */}
      {youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isPlaying ? 1 : 0}`}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          src={video.videoUrl}
          controls
          className="w-full aspect-video bg-black"
        />
      )}

      {/* CONTENT */}
      <div className="p-4 bg-gray-900 text-white">
        <h3 className="text-lg font-bold mb-2">{video.title}</h3>
        <p className="text-sm text-gray-300 mb-4">
          {video.description}
        </p>

        {/* COMPLETE BUTTON */}
        <button
          onClick={onComplete}
          disabled={video.isCompleted}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition
            ${
              video.isCompleted
                ? 'bg-green-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {video.isCompleted ? (
            <>
              <CheckCircle size={18} />
              Completed
            </>
          ) : (
            <>
              <PlayCircle size={18} />
              Mark as Complete
            </>
          )}
        </button>
      </div>
    </div>
  );
}
