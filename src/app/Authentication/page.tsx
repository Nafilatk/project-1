"use client";

import { useState } from "react";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import { glamColors as colors } from "@/app/lib/theme";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: colors.cream }}
    >
      <div className="w-full max-w-md rounded-xl p-6 bg-white shadow">
        {/* Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden border">
          {["login", "signup"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`flex-1 py-2 font-semibold ${
                tab === t ? "bg-blue-900 text-white" : "bg-gray-100"
              }`}
            >
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {tab === "login" ? <LoginPage /> : <SignupPage />}
      </div>
    </div>
  );
}
