'use client';

import {
  Play,
  CheckCircle,
  BookOpen,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';
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

  /* ---------------- GSAP CARD ANIMATION ---------------- */
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current!, {
        x: -20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      if (iconRef.current) {
        gsap.from(iconRef.current, {
          scale: 0,
          rotation: -10,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.2,
        });
      }

      const card = cardRef.current!;
      const enter = () => {
        if (!isSelected) {
          gsap.to(card, {
            x: 5,
            backgroundColor: 'rgba(59,130,246,0.05)',
            duration: 0.2,
          });
        }
      };

      const leave = () => {
        if (!isSelected) {
          gsap.to(card, {
            x: 0,
            backgroundColor: 'transparent',
            duration: 0.2,
          });
        }
      };

      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);

      return () => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, [isSelected]);

  /* ---------------- MODAL ANIMATION ---------------- */
  useEffect(() => {
    if (showPDF && modalRef.current) {
      gsap.from(modalRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: 'back.out(1.2)',
      });
    }
  }, [showPDF]);

  /* ---------------- SCROLL LOCK ---------------- */
  useEffect(() => {
    if (showPDF) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPDF]);

  const openEbook = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (video.ebookUrl) setShowPDF(true);
  };

  /* ==================================================== */
  return (
    <>
      {/* ---------------- VIDEO CARD ---------------- */}
      <button
        ref={cardRef}
        onClick={onSelect}
        className={`
          w-full text-left p-4 border-b border-gray-200 transition-all duration-200
          ${
            isSelected
              ? 'bg-linear-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500'
              : 'hover:bg-blue-50 hover:shadow-sm'
          }
        `}
      >
        <div className="flex items-start gap-3">
          <div
            ref={iconRef}
            className={`
              w-10 h-10 rounded-lg flex items-center justify-center shrink-0
              ${
                video.isCompleted
                  ? 'bg-green-100 text-green-600 border border-green-200'
                  : 'bg-blue-100 text-blue-600 border border-blue-200'
              }
              ${isSelected ? 'scale-110' : ''}
            `}
          >
            {video.isCompleted ? (
              <CheckCircle size={18} />
            ) : (
              <Play size={18} />
            )}
          </div>

          <div className="flex-1">
            <h4
              className={`font-medium ${
                isSelected ? 'text-blue-700' : 'text-gray-800'
              }`}
            >
              {video.title}
            </h4>

            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">{video.duration}</span>

              {video.ebookUrl && (
                <div
                  onClick={openEbook}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <div className="p-1 bg-blue-50 rounded">
                    <BookOpen size={14} />
                  </div>
                  <span className="font-medium">E-Book</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* ---------------- EBOOK MODAL ---------------- */}
      {showPDF && video.ebookUrl && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-[9999] flex items-center justify-center"
        >
          <div
            className={`
              bg-white flex flex-col shadow-2xl border border-gray-200
              transition-all duration-300
              ${
                isFullscreen
                  ? 'w-screen h-screen rounded-none'
                  : 'w-[95vw] h-[95vh] max-w-none rounded-xl'
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b bg-linear-to-r from-blue-50 to-white">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {video.title} – E-Book
                </h3>
                <p className="text-sm text-gray-600">
                  Supplementary learning material
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-lg hover:bg-blue-50"
                >
                  {isFullscreen ? (
                    <Minimize2 size={20} />
                  ) : (
                    <Maximize2 size={20} />
                  )}
                </button>
                <button
                  onClick={() => setShowPDF(false)}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* PDF */}
            <div className="flex-1">
              <iframe
                src={`${video.ebookUrl}#toolbar=1`}
                className="w-full h-full border-0"
                title={video.title}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowPDF(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
