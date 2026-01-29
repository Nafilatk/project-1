"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const authSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(containerRef.current, 
        { y: -20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2 }
      )
      .from(".nav-link-item", {
        y: 15,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
      }, "-=0.8")
      .from(logoRef.current, {
        y : -50,
        opacity: 0,
        duration: 1,
      }, "-=1");

      gsap.to(".nav-bg-glow", {
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;

    gsap.to(containerRef.current, {
      rotateY: x * 2,
      rotateX: -y * 4,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const handleLinkMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.4,
      y: y * 0.4,
      scale: 1.1,
      duration: 0.3
    });
  };

  const resetLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)"
    });
  };

  return (
    <header 
      ref={navRef} 
      className="fixed top-0 left-0 w-full z-50  perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={containerRef}
        className="relative w-full flex items-center justify-between px-10 py-4
  bg-[#0a0a0a]/90 backdrop-blur-2xl
  border-b border-gray-900/80
  shadow-2xl shadow-black/50"
      >
        <div className="nav-bg-glow absolute inset-0 bg-linear-to-r from-indigo-900/10 via-transparent to-blue-900/10 pointer-events-none" />

        <Link 
          href="/" 
          ref={logoRef} 
          className="relative flex items-center gap-4 group z-10"
        >
          <div className="relative w-12 h-12">
             <div className="absolute inset-0 bg-indigo-900/30 blur-xl group-hover:bg-indigo-800/50 transition-all duration-500 rounded-full" />
             <Image
                src="/logo.svg"
                alt="logo"
                fill
                className=" brightness-100"
                priority
             />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-gray-100 uppercase ">
              Learnest<span className="text-indigo-400 text-shadow-glow">.ai</span>
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2 bg-gray-900/50 p-1.5 rounded-2xl border border-gray-600">
          {["Home", "Courses", "About", "Progress"].map((item, i) => (
             (item !== "Courses" && item !== "Progress" || user) && (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onMouseMove={handleLinkMagnetic}
                onMouseLeave={resetLink}
                className="nav-link-item relative px-5 py-2.5 rounded-xl transition-colors group"
              >
                <span className="relative z-10 text-sm font-bold text-gray-400 group-hover:text-gray-200 transition-colors">
                  {item}
                </span>
                <div className="absolute inset-0 bg-gray-800/0 group-hover:bg-gray-800/40 rounded-xl transition-all duration-300" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </Link>
            )
          ))}
        </nav>

        <div ref={authSectionRef} className="flex items-center gap-3">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-6 py-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-all">
                Login
              </Link>
              <Link href="/signup" className="relative px-6 py-3 bg-gray-800 rounded-xl overflow-hidden group border border-gray-700/50">
                <div className="absolute inset-0 bg-indigo-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-xs font-black uppercase tracking-tighter text-gray-300 group-hover:text-gray-100 transition-colors">
                  Sign Up
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-800/50">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-indigo-400 uppercase leading-none mb-1">Operator</p>
                <p className="text-sm font-bold text-gray-200 tracking-tight">{user.name}</p>
              </div>
              <Link href="/profile" className="relative h-11 w-11 rounded-full p-0.5 bg-linear-to-tr from-indigo-800 to-blue-900 hover:scale-110 transition-transform duration-300">
                <div className="h-full w-full bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
                  <span className="text-sm font-black text-gray-300">{user.name[0].toUpperCase()}</span>
                </div>
              </Link>
              <button 
                onClick={logoutUser}
                className="p-2 hover:bg-red-900/30 rounded-lg text-gray-600 hover:text-red-400 transition-all border border-transparent hover:border-red-900/30"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M15 3H7a2 2 0 00-2 2v14a2 2 0 002 2h8m4-9l-4-4m4 4l-4 4m4-4H9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>                                          
          )}
        </div>
      </div>
    </header>
  );
}