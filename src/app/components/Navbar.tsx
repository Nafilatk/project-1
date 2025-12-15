"use client"

import Image from "next/image"
import { gsap } from "gsap/gsap-core";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Courses", href: "#" },
  { label: "Ebooks", href: "#" },
  { label: "About", href: "#" },
];

export default function Navbar(){
  return (
    <header className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
      <div className="mx=auto flex max-w-6xl items-center px-6 py-3">
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

        <div>
          
        </div>
      
      </div>

    </header>
  )
}