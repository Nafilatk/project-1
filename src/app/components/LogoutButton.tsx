// src/app/components/profile/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";

export function LogoutButton() {
  const router = useRouter();
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
    >
      Logout
    </button>
  );
}
