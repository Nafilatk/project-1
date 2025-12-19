"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Ebooks", href: "/ebook" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const { user } = useAuth(); // user is null when not logged in

  return (
    <header className="sticky top-0 left-0 w-full bg-white/15 backdrop-blur-md border-b border-white/20 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="h-10 w-10 overflow-hidden">
          <Image
            src="/logo.svg"
            alt="site logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
        </Link>

        {/* Center nav links */}
        <nav className="hidden gap-8 text-sm font-medium text-gray-200 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: auth / profile */}
        <div className="hidden md:flex items-center gap-3">
          {!user && (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-200 hover:text-black transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              {/* user name */}
              <span className="text-sm font-medium text-gray-100">
                {user.name}
              </span>

              {/* profile button */}
              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {/* simple initial avatar, e.g. first letter of name */}
                {user.name.charAt(0).toUpperCase()}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
