"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LogOut, Trash2, AlertTriangle, Shield, Lock } from "lucide-react";

interface AccountActionsProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
  isDeleting: boolean;
}

export default function AccountActions({
  onLogout,
  onDeleteAccount,
  isDeleting,
}: AccountActionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoutRef = useRef<HTMLDivElement>(null);
  const deleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, []);

  const hoverCard = (el: HTMLDivElement | null, color: string) => {
    if (!el) return;
    gsap.to(el, {
      y: -6,
      boxShadow: `0 20px 40px ${color}`,
      duration: 0.25,
    });
  };

  const resetCard = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.to(el, {
      y: 0,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      duration: 0.25,
    });
  };

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Header */}
      <div className="border-b pb-2">
        <h2 className="text-2xl font-bold">Account Management</h2>
        <p className="text-sm text-gray-500">
          Manage sessions and account security
        </p>
      </div>

      {/* Logout */}
      <div
        ref={logoutRef}
        onMouseEnter={() => hoverCard(logoutRef.current, "rgba(59,130,246,.2)")}
        onMouseLeave={() => resetCard(logoutRef.current)}
        className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg"
      >
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <LogOut className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900">Sign Out</h3>
            <p className="text-sm text-gray-600">
              End your current session securely.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="flex items-center gap-2 text-sm text-blue-700">
            <Shield className="w-4 h-4" /> Session protected
          </span>
          <button
            onClick={onLogout}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Delete */}
      <div
        ref={deleteRef}
        onMouseEnter={() => hoverCard(deleteRef.current, "rgba(239,68,68,.2)")}
        onMouseLeave={() => resetCard(deleteRef.current)}
        className="relative rounded-2xl border border-red-100 bg-white p-6 shadow-lg"
      >

        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">
            <Trash2 className="text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-red-900">Delete Account</h3>
            <p className="text-sm text-gray-600">
              Permanently remove your account and data.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="flex items-center gap-2 text-sm text-red-700">
            <Lock className="w-4 h-4" /> Permanent action
          </span>
          <button
            onClick={onDeleteAccount}
            disabled={isDeleting}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
