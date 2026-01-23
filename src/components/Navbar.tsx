"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <header className="sticky top-0 left-0 w-full bg-black/15 backdrop-blur-md z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="site logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <h2 className="text-xl font-bold text-white">
            Learnest<span className="text-blue-600">.ai</span>
          </h2>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden gap-8 text-sm font-medium text-white md:flex">
          {/* Home always visible */}
          <Link href="/" className="transition-colors hover:text-blue-800">
            Home
          </Link>

          {/* Only when logged in */}
          {user && (
            <>
              <Link
                href="/courses"
                className="transition-colors hover:text-blue-800"
              >
                Courses
              </Link>

              <Link
                href="/about"
                className="transition-colors hover:text-blue-800"
              >
                About
              </Link>
                            <Link
                href="/progress"
                className="transition-colors hover:text-blue-800"
              >
                Progress
              </Link>
            </>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          {/* Logged OUT */}
          {!user && (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white hover:text-blue-800 transition-colors"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-blue-800 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}

          {/* Logged IN */}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white">
                {user.name}
              </span>

              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-800 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>

              <button
                onClick={logoutUser}
                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
