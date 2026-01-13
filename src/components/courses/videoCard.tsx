'use client';

import { Video } from '@/lib/types/courses';
import Image from 'next/image';
import { Play, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface VideoCardProps {
  video: Video;
  isActive?: boolean;
  onVideoSelect: (videoUrl: string, videoTitle: string) => void;
}

export default function VideoCard({ video, isActive = false, onVideoSelect }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group cursor-pointer p-4 rounded-xl transition-all duration-300 border-2 hover:shadow-lg hover:-translate-y-1 ${
        isActive 
          ? 'border-green-500 bg-green-50 shadow-lg' 
          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onVideoSelect(video.videoUrl, video.title)}
    >
      <div className="flex items-start space-x-4">
        <div className="relative shrink-0">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={120}
            height={68}
            className="w-32 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
              <Play className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
          )}
          {video.isCompleted && (
            <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-500 bg-white rounded-full p-1 shadow-lg" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600">
            {video.title}
          </h4>
          <p className="text-xs text-gray-500 mb-2">{video.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{video.duration}</span>
            {video.ebookUrl && (
              <a 
                href={video.ebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
                title="View eBook"
              >
                <BookOpen className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
