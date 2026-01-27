'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function UsersHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1
        });
      }

      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          y: 10,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.3
        });
      }

      const accent = document.createElement('div');
      accent.className = 'absolute -left-4 top-0 w-1 h-full bg-blue-600 rounded';
      containerRef.current?.appendChild(accent);
      
      gsap.from(accent, {
        height: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative mb-8 pl-6"
    >
      <h1 
        ref={titleRef}
        className="text-3xl font-bold text-gray-800 mb-2"
      >
        Users Management
      </h1>
      <p 
        ref={descriptionRef}
        className="text-gray-600"
      >
        Manage all registered users in the platform
      </p>
    </div>
  );
}