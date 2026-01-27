'use client';

import { Play, CheckCircle, BookOpen, X, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Video } from '@/lib/types/courses';
import gsap from 'gsap';

interface VideoCardProps {
  video: Video;
  isSelected: boolean;
  onSelect: () => void;
}

export default function VideoCard({
  video,
  isSelected,
  onSelect,
}: VideoCardProps) {
  const [showPDF, setShowPDF] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card entry animation
      gsap.from(cardRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1
      });

      // Icon animation
      if (iconRef.current) {
        gsap.from(iconRef.current, {
          scale: 0,
          rotation: -10,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3
        });
      }

      // Hover animation
      const card = cardRef.current;
      if (card) {
        card.addEventListener('mouseenter', () => {
          if (!isSelected) {
            gsap.to(card, {
              x: 5,
              backgroundColor: 'rgba(59, 130, 246, 0.05)', // blue-500 with 5% opacity
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          if (!isSelected) {
            gsap.to(card, {
              x: 0,
              backgroundColor: 'transparent',
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      }

    }, cardRef);

    return () => ctx.revert();
  }, [isSelected]);

  // Modal animations
  useEffect(() => {
    if (showPDF && modalRef.current) {
      gsap.from(modalRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
    }
  }, [showPDF]);

  const openEbook = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); 
    if (video.ebookUrl) {
      setShowPDF(true);
    }
  };

  return (
    <>
      <button
        ref={cardRef}
        onClick={onSelect}
        className={`
          w-full text-left p-4 border-b border-gray-200 hover:bg-blue-50 transition-all duration-200
          ${isSelected 
            ? 'bg-linear-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500' 
            : 'hover:shadow-sm'
          }
        `}
      >
        <div className="flex items-start gap-3">
          <div
            ref={iconRef}
            className={`
              w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200
              ${video.isCompleted 
                ? 'bg-green-100 text-green-600 border border-green-200' 
                : 'bg-blue-100 text-blue-600 border border-blue-200'
              }
              ${isSelected ? 'scale-110' : ''}
            `}
          >
            {video.isCompleted ? <CheckCircle size={18} /> : <Play size={18} />}
          </div>

          <div className="flex-1">
            <h4
              className={`
                font-medium
                ${isSelected ? 'text-blue-700' : 'text-gray-800'}
              `}
            >
              {video.title}
            </h4>

            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">{video.duration}</span>

              {video.ebookUrl && (
                <div
                  onClick={openEbook}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 cursor-pointer transition-colors duration-200 group"
                >
                  <div className="p-1 bg-blue-50 rounded group-hover:bg-blue-100 transition-colors duration-200">
                    <BookOpen size={14} />
                  </div>
                  <span className="font-medium">E-Book</span>
                </div>
              )}
            </div>

            {/* Progress indicator for selected video */}
            {isSelected && (
              <div className="mt-3 pt-3 border-t border-gray-200/50">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: video.isCompleted ? '100%' : '0%' }}
                    ></div>
                  </div>
                  <span>{video.isCompleted ? 'Completed' : 'Not Started'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </button>

      {/* PDF Modal */}
      {showPDF && video.ebookUrl && (
        <div 
          ref={modalRef}
          className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}
        >
          <div className={`
            bg-white rounded-xl flex flex-col shadow-2xl border border-gray-200
            ${isFullscreen ? 'w-screen h-screen rounded-none' : 'w-full h-[90vh] max-w-5xl'}
          `}>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-linear-to-r from-blue-50 to-white">
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">{video.title} - E-Book</h3>
                <p className="text-sm text-gray-600 mt-1">Supplementary learning material</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button
                  onClick={() => setShowPDF(false)}
                  className="p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1">
              <iframe
                src={`${video.ebookUrl}#toolbar=1`}
                className="w-full h-full border-0"
                title={video.title}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Use the toolbar above to navigate through the document
              </p>
              <button
                onClick={() => setShowPDF(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Close E-Book
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}