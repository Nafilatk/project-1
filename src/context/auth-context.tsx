// src/app/context/auth-context.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "@/app/lib/auth-types";

type AuthContextValue = {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = (u: User) => setUser(u);
  const logoutUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
