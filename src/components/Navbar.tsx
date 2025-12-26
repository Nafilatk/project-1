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
  const { user } = useAuth();

  return (
    <header className="sticky top-0 left-0 w-full bg-white/15 backdrop-blur-md border-b border-white/20 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="site logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />

          <h2 className="text-xl font-bold text-black">
            Learnest<span className="text-blue-800">.ai</span>
          </h2>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-black md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-blue-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!user && (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-black hover:text-blue-800 transition-colors"
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

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-blue-800 hover:text-black transition-colors">
                {user.name}
              </span>

              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-800 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
