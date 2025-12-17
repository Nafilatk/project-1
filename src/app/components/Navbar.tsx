"use client"

import Image from "next/image"
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Ebooks", href: "ebook" },
  { label: "About", href: "about" },
];

export default function Navbar(){
  return (
    <header className="sticky  top-0 left-0 w-full bg-white/15 backdrop-blur-md border-b  border-white/20 z-50 ">
      <div className="mx=auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="h-13 w-10 overflow-hidden">
          <Image
          src="/logo.svg"
          alt="site logo "   
          width={40}
          height={40}
          className="h-13 w-10 object-contain"
          priority
          />

        </div>

        <div className="hidden gap-8 text-sm font-medium text-gray-200 md:flex ">
          {navLinks.map((link)=>(

            <Link
            key={link.label}
            href={link.href}
            className="nav-link transition-colors hover: text-black"
            >
              {link.label}
              </Link>
          ))}
        </div>
      
      </div>

    </header>
  )
}