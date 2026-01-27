'use client';

import { useEffect, useRef } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function DashboardHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // GSAP Animations
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

      // Title animation - Fade in with slide up
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.3
        });
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.5
        });
      }

      // Date card animation
      if (dateRef.current) {
        gsap.from(dateRef.current, {
          x: 30,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.2)",
          delay: 0.8
        });

        // Continuous subtle pulse on calendar icon
        const calendarIcon = dateRef.current.querySelector('.calendar-icon');
        if (calendarIcon) {
          gsap.to(calendarIcon, {
            rotation: 5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
          });
        }
      }

      // Background elements animation
      const bgElements = containerRef.current?.querySelectorAll('.bg-element');
      if (bgElements && bgElements.length > 0) {
        gsap.from(bgElements, {
          scale: 0,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.4
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative bg-linear-to-r from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="bg-element absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 to-purple-50/20"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
          {/* Left Section - Title and Stats */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 
                ref={titleRef}
                className="text-3xl md:text-4xl font-bold text-gray-800"
              >
                Welcome back, Admin
              </h1>
            </div>

            <p 
              ref={subtitleRef}
              className="text-gray-600 mt-2 max-w-2xl"
            >
              Here's what's happening with your platform today. Analytics are updated in real-time.
            </p>
          </div>

          {/* Right Section - Date */}
          <div 
            ref={dateRef}
            className="bg-white px-5 py-4 rounded-xl border border-gray-200 shadow-sm min-w-60"
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-gray-500 calendar-icon" />
              <span className="text-sm font-medium text-gray-500">
                Today's Date
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-800">
                {formattedDate}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {formattedTime}
                </p>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}