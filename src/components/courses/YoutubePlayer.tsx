'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize, Minimize, SkipForward, SkipBack, CheckCircle } from 'lucide-react';
import { Video } from '@/lib/types/courses';
import { gsap } from 'gsap';

interface VideoPlayerProps {
  video: Video;
  onComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function VideoPlayer({
  video,
  onComplete,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      
      const updateProgress = () => {
        setCurrentTime(videoElement.currentTime);
        setDuration(videoElement.duration);
        
        // Mark as complete if watched 95% of the video
        if (videoElement.currentTime / videoElement.duration > 0.95) {
          onComplete();
        }
      };

      videoElement.addEventListener('timeupdate', updateProgress);
      videoElement.addEventListener('loadedmetadata', () => {
        setDuration(videoElement.duration);
      });

      return () => {
        videoElement.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [onComplete]);

  useEffect(() => {
    // Animate video card when changed
    gsap.fromTo(
      playerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [video.id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
      setCurrentTime(percent * duration);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={playerRef}
      className={`relative bg-black ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl'}`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={`https://www.youtube.com/embed/${video.videoUrl.split('v=')[1]}`}
        className="w-full h-auto max-h-[70vh] rounded-t-xl"
        poster={video.thumbnail}
        onClick={togglePlay}
      />

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4">
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="h-1.5 bg-gray-700 rounded-full mb-4 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-blue-500 rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause size={24} className="text-white" />
              ) : (
                <Play size={24} className="text-white ml-1" />
              )}
            </button>

            {/* Skip Back */}
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="p-2 hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipBack size={20} />
            </button>

            {/* Skip Forward */}
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="p-2 hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward size={20} />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <Volume2 size={20} />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  if (videoRef.current) {
                    videoRef.current.volume = newVolume;
                  }
                }}
                className="w-24 accent-blue-500"
              />
            </div>

            {/* Time Display */}
            <div className="text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Playback Speed */}
            <select
              value={playbackRate}
              onChange={(e) => {
                const rate = parseFloat(e.target.value);
                setPlaybackRate(rate);
                if (videoRef.current) {
                  videoRef.current.playbackRate = rate;
                }
              }}
              className="bg-gray-800 text-white px-3 py-1 rounded-lg"
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Completion Badge */}
      {video.isCompleted && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
          <CheckCircle size={14} />
          Completed
        </div>
      )}

      {/* Title Overlay */}
      <div className="absolute top-4 left-4">
        <h3 className="text-xl font-bold text-white drop-shadow-lg">{video.title}</h3>
      </div>
    </div>
  );
}