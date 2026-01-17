'use client';

import Image from 'next/image';
import { Play, Clock, CheckCircle } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  ebookUrl?: string;
  isCompleted: boolean;
}

interface VideoCardProps {
  video: Video;
  videoUrl?: string;
  isActive?: boolean;
  onVideoSelect?: (url: string, title: string) => void;
}

export default function VideoCard({ 
  video, 
  videoUrl, 
  isActive = false, 
  onVideoSelect 
}: VideoCardProps) {
  const handleClick = () => {
    if (onVideoSelect && video.videoUrl) {
      onVideoSelect(video.videoUrl, video.title);
    }
  };

  return (
    <div
      className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border-2 hover:-translate-y-1 ${
        isActive
          ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200/50'
          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'
      }`}
      onClick={handleClick}
    >
      <div className="relative mb-4">
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={300}
          height={170}
          className="w-full h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
        <div className="absolute top-3 right-3 flex gap-1">
          {video.isCompleted && (
            <CheckCircle className="w-5 h-5 text-green-400 bg-white/90 rounded-full p-1" />
          )}
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
            <Play className="w-3 h-3" />
            Play
          </div>
        </div>
      </div>
      
      <h4 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600">
        {video.title}
      </h4>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{video.duration}</span>
        {video.ebookUrl && (
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
            📚 PDF
          </span>
        )}
      </div>
    </div>
  );
}
