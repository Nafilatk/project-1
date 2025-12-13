"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Learnest<span className="text-blue-600">.ai</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/courses" className="hover:text-blue-600">Courses</Link>
          <Link href="/ebook" className="hover:text-blue-600">Ebooks</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/login" className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 text-sm">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/courses" onClick={() => setOpen(false)}>Courses</Link>
          <Link href="/ebook" onClick={() => setOpen(false)}>Ebooks</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block w-full text-center border py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
