'use client';

import { FormEvent, ChangeEvent, useEffect, useRef } from "react";
import gsap from "gsap";
import PrimaryButton from "@/components/buttons";
import type { PersonalForm } from "@/lib/types/profile"

interface PersonalInfoFormProps {
  personalForm: PersonalForm | null;
  isSavingPersonal: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function PersonalInfoForm({
  personalForm,
  isSavingPersonal,
  onChange,
  onSubmit,
}: PersonalInfoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputsRef = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    if (!formRef.current) return;

    const ctx = gsap.context(() => {
      // Form entrance animation
      gsap.fromTo(formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Inputs sequential animation
      gsap.fromTo(inputsRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "power3.out"
        }
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleInputFocus = (index: number) => {
    const input = inputsRef.current[index];
    if (input) {
      gsap.to(input.parentElement, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleInputBlur = (index: number) => {
    const input = inputsRef.current[index];
    if (input) {
      gsap.to(input.parentElement, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  if (!personalForm) return null;

  return (
    <form 
      ref={formRef}
      onSubmit={onSubmit} 
      className="space-y-6 text-sm"
    >
      <div className="group relative">
        <h2 className="text-lg font-bold text-blue-950 tracking-tight mb-6">
          Basic Information
        </h2>
      </div>

      {/* Full Name */}
      <div className="group relative space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Full Name
        </label>
        <div className="relative transition-all duration-300 hover:scale-[1.01]">
          <input
            ref={el => { inputsRef.current[0] = el; }}
            type="text"
            name="name"
            value={personalForm.name}
            onChange={onChange}
            onFocus={() => handleInputFocus(0)}
            onBlur={() => handleInputBlur(0)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-md"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur pointer-events-none" />
        </div>
      </div>

      {/* Email */}
      <div className="group relative space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Email Address (read-only)
        </label>
        <div className="relative">
          <input
            ref={el => { inputsRef.current[1] = el; }}
            type="email"
            name="email"
            value={personalForm.email}
            readOnly
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 cursor-not-allowed focus:outline-none"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="group relative space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Phone Number
        </label>
        <div className="relative transition-all duration-300 hover:scale-[1.01]">
          <input
            ref={el => { inputsRef.current[2] = el; }}
            type="tel"
            name="phone"
            value={personalForm.phone}
            onChange={onChange}
            onFocus={() => handleInputFocus(2)}
            onBlur={() => handleInputBlur(2)}
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-md"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur pointer-events-none" />
        </div>
      </div>

      {/* Bio */}
      <div className="group relative space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Bio / Headline
        </label>
        <div className="relative transition-all duration-300 hover:scale-[1.01]">
          <textarea
            ref={el => { inputsRef.current[3] = el; }}
            name="bio"
            value={personalForm.bio}
            onChange={onChange}
            onFocus={() => handleInputFocus(3)}
            onBlur={() => handleInputBlur(3)}
            rows={4}
            placeholder="Tell us a little about yourself..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 resize-none focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-md"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur pointer-events-none" />
        </div>
      </div>

      <div className="pt-4">
        <PrimaryButton 
          type="submit" 
          disabled={isSavingPersonal}
          className="w-full sm:w-auto"
        >
          {isSavingPersonal ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⟳</span>
              Saving...
            </span>
          ) : "Save Personal Info"}
        </PrimaryButton>
      </div>
    </form>
  );
}