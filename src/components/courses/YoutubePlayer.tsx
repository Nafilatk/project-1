'use client';

import { useState, useEffect, useRef } from 'react';
import { PlayCircle, CheckCircle, Play } from 'lucide-react';
import { Video } from '@/lib/types/courses';
import gsap from 'gsap';

interface VideoPlayerProps {
  video: Video;
  onComplete: () => void;
}

export default function VideoPlayer({ video, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // GSAP animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Container entry animation
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1
      });

      // Video container animation
      if (videoContainerRef.current) {
        gsap.from(videoContainerRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.2)",
          delay: 0.3
        });
      }

      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.6
        });
      }

      // Button hover animation
      if (buttonRef.current) {
        const button = buttonRef.current;
        
        button.addEventListener('mouseenter', () => {
          if (!video.isCompleted) {
            gsap.to(button, {
              scale: 1.05,
              y: -2,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });

        button.addEventListener('mouseleave', () => {
          if (!video.isCompleted) {
            gsap.to(button, {
              scale: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      }

      // Play button pulse animation if not completed
      if (!video.isCompleted) {
        const playIndicator = document.querySelector('.play-indicator');
        if (playIndicator) {
          gsap.to(playIndicator, {
            scale: 1.1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
          });
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, [video.isCompleted]);

  // Extract YouTube ID
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
    );
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(video.videoUrl);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200"
    >
      {/* Video Header */}
      <div className="p-4 border-b border-gray-200 bg-linear-to-r from-blue-50 to-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">Video Player</h3>
          {!video.isCompleted && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <div className="play-indicator w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Ready to watch</span>
            </div>
          )}
        </div>
      </div>

      {/* VIDEO */}
      <div ref={videoContainerRef} className="relative">
        {youtubeId ? (
          <div className="relative">
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 bg-black/30 flex items-center justify-center group"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-200">
                  <Play size={32} className="text-white ml-1" />
                </div>
              </button>
            )}
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1`}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          </div>
        ) : (
          <video
            src={video.videoUrl}
            controls
            className="w-full aspect-video bg-black"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* CONTENT */}
      <div 
        ref={contentRef}
        className="p-6 bg-white"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-3">{video.title}</h3>
        
        {/* Video Stats */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-full">
            Duration: {video.duration}
          </span>
          {video.isCompleted && (
            <span className="flex items-center gap-1 text-sm text-green-700 px-3 py-1 bg-green-50 rounded-full">
              <CheckCircle size={14} />
              Watched
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {video.description}
        </p>

        {/* COMPLETE BUTTON */}
        <button
          ref={buttonRef}
          onClick={onComplete}
          disabled={video.isCompleted}
          className={`
            flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold 
            transition-all duration-300 w-full max-w-md mx-auto
            ${video.isCompleted
              ? 'bg-linear-to-r from-green-100 to-green-50 text-green-700 border border-green-200 cursor-not-allowed'
              : 'bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
            }
          `}
        >
          {video.isCompleted ? (
            <>
              <CheckCircle size={20} />
              <span className="font-bold">Completed</span>
              <span className="text-xs opacity-80">✓</span>
            </>
          ) : (
            <>
              <PlayCircle size={20} />
              <span className="font-bold">Mark as Complete</span>
              <span className="text-xs opacity-90">Click when finished</span>
            </>
          )}
        </button>

        {/* Progress indicator */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{video.isCompleted ? '100%' : '0%'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                video.isCompleted ? 'bg-green-500 w-full' : 'bg-blue-500 w-0'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}