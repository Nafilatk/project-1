'use client';

import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { PersonalForm } from "@/lib/types/profile";

interface ProfileSidebarProps {
  personalForm: PersonalForm | null;
}

export default function ProfileSidebar({ personalForm }: ProfileSidebarProps) {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [personalForm?.name]);

  if (!personalForm) return null;

  const firstLetter = personalForm.name.charAt(0).toUpperCase();

  return (
    <aside className="sticky top-6 h-fit w-full max-w-xs rounded-2xl bg-white border shadow-lg p-6 space-y-6">
      
      {/* Letter Avatar */}
      <div className="flex justify-center">
        <div
          ref={circleRef}
          className="w-28 h-28 rounded-full bg-blue-600
                     flex items-center justify-center text-white text-5xl font-bold shadow-lg"
        >
          {firstLetter}
        </div>
      </div>

      {/* User Info */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-gray-900">
          {personalForm.name || "Your Name"}
        </h2>
        <p className="text-sm text-gray-500">
          {personalForm.email}
        </p>
      </div>

      {/* Bio */}
      {personalForm.bio && (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-gray-600 leading-relaxed">
          {personalForm.bio}
        </div>
      )}
    </aside>
  );
}
