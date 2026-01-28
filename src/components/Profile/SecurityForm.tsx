'use client';

import { FormEvent, ChangeEvent, useEffect, useRef } from "react";
import gsap from "gsap";
import PrimaryButton from "@/components/buttons";
import type { ForgotForm } from "@/lib/types/profile";

interface SecurityFormProps {
  forgotForm: ForgotForm;
  isResettingPassword: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function SecurityForm({
  forgotForm,
  isResettingPassword,
  onChange,
  onSubmit,
}: SecurityFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!formRef.current) return;

    const ctx = gsap.context(() => {
      // Form entrance animation
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );

      // Inputs stagger animation
      gsap.fromTo(
        inputsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
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
        ease: "power2.out",
      });
    }
  };

  const handleInputBlur = (index: number) => {
    const input = inputsRef.current[index];
    if (input) {
      gsap.to(input.parentElement, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { scale: 0.98 },
        { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }
      );
    }

    onSubmit(e);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 text-sm"
    >
      <div className="group relative">
        <h2 className="text-lg font-bold text-blue-950 tracking-tight">
          Change Password
        </h2>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        To update your password, please confirm your current password.
      </p>

      {/* Email */}
      <div className="space-y-2">
        <label className="block font-semibold text-gray-700">
          Email Address
        </label>
        <input
          ref={(el) => { if (el) inputsRef.current[0] = el; }}
          type="email"
          name="email"
          value={forgotForm.email}
          onChange={onChange}
          onFocus={() => handleInputFocus(0)}
          onBlur={() => handleInputBlur(0)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
      </div>

      {/* Current Password */}
      <div className="space-y-2">
        <label className="block font-semibold text-gray-700">
          Current Password
        </label>
        <input
          ref={(el) => { if (el) inputsRef.current[1] = el; }}
          type="password"
          name="currentPassword"
          value={forgotForm.currentPassword}
          onChange={onChange}
          onFocus={() => handleInputFocus(1)}
          onBlur={() => handleInputBlur(1)}
          placeholder="Enter current password"
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* New Password */}
        <div className="space-y-2">
          <label className="block font-semibold text-gray-700">
            New Password
          </label>
          <input
            ref={(el) => { if (el) inputsRef.current[2] = el; }}
            type="password"
            name="newPassword"
            value={forgotForm.newPassword}
            onChange={onChange}
            onFocus={() => handleInputFocus(2)}
            onBlur={() => handleInputBlur(2)}
            placeholder="Enter new password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block font-semibold text-gray-700">
            Confirm Password
          </label>
          <input
            ref={(el) => { if (el) inputsRef.current[3] = el; }}
            type="password"
            name="confirmPassword"
            value={forgotForm.confirmPassword}
            onChange={onChange}
            onFocus={() => handleInputFocus(3)}
            onBlur={() => handleInputBlur(3)}
            placeholder="Confirm new password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>
      </div>


      <PrimaryButton
        type="submit"
        disabled={isResettingPassword}
        className="w-full sm:w-auto"
      >
        {isResettingPassword ? "Updating..." : "Update Password"}
      </PrimaryButton>
    </form>
  );
}
