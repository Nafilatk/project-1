'use client';

import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { PersonalForm } from "@/lib/types/profile";
import { Phone, MapPin, Globe } from "lucide-react";

interface ProfileSidebarProps {
  personalForm: PersonalForm | null;
}

export default function ProfileSidebar({ personalForm }: ProfileSidebarProps) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!personalForm || !cardRef.current) return;

    const ctx = gsap.context(() => {
      // Sidebar entrance
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Avatar pop
      gsap.fromTo(
        avatarRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "back.out(1.7)",
        }
      );
    });

    return () => ctx.revert();
  }, [personalForm?.name]);

  if (!personalForm) return null;

  const firstLetter = personalForm.name.charAt(0).toUpperCase();



  return (
    <aside
      ref={cardRef}
      className="
        sticky top-6 
        w-full max-w-xs h-fit
        rounded-2xl bg-white
        border border-slate-200
        shadow-xl overflow-hidden
      "
    >
      {/* Top Accent */}
      <div className="h-1 bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-400" />

      <div className="p-6 space-y-4">
        {/* Avatar */}
        <div className="flex justify-center">
          <div
            ref={avatarRef}
            className={`
              w-32 h-32 rounded-full
               bg-black
              flex items-center justify-center
              text-white text-5xl font-bold
              shadow-2xl ring-4 ring-blue-800
              transition-transform duration-300
              hover:scale-105
            `}
          >
            {firstLetter}
          </div>
        </div>

        {/* Name */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {personalForm.name}
          </h2>

          {personalForm.title && (
            <p className="text-sm text-blue-600 font-medium">
              {personalForm.title}
            </p>
          )}

          <p className="text-sm text-gray-500">
            {personalForm.email}
          </p>
        </div>

        {/* Contact */}
        {(personalForm.phone || personalForm.location || personalForm.website) && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Contact
            </h3>

            {personalForm.phone && (
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-blue-500" />
                {personalForm.phone}
              </div>
            )}



          </div>
        )}

        {/* Bio */}
        {personalForm.bio && (
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              About
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {personalForm.bio}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
          <div className="text-center p-3 rounded-xl bg-blue-50">
            <div className="text-xl font-bold">{personalForm.name.length}</div>
            <div className="text-xs text-gray-500">Chars</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-purple-50">
            <div className="text-xl font-bold">
              {personalForm.name.split(" ").length}
            </div>
            <div className="text-xs text-gray-500">Words</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-emerald-50">
            <div className="text-xl font-bold">{firstLetter}</div>
            <div className="text-xs text-gray-500">Initial</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
