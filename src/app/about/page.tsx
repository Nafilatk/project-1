"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. REFINED HEADING ANIMATION
      // We use a slightly longer duration and a smoother stagger
      tl.from(".char", {
        y: "120%",           // Start further down
        rotateX: -70,        // Less aggressive tilt for better legibility
        opacity: 0,
        stagger: 0.025,      // Faster stagger for a "wave" effect
        duration: 1.4,
        transformOrigin: "0% 50% -50", // Adds depth to the rotation
      })
      .from(".about-badge", {
        opacity: 0,
        y: -10,
        duration: 0.8,
      }, "-=1.1") // Start while letters are still animating
      .from(".about-desc", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
      }, "-=0.9")
      .from(".about-card", {
        scale: 0.9,
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.8");

      // 2. SCROLL TRIGGERED CARDS
      gsap.from(".principle-card", {
        scrollTrigger: {
          trigger: ".principles-grid",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out"
      });

      // 3. SMOOTH PARALLAX MOUSE EFFECT
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        // Grid rotation
        gsap.to(gridRef.current, {
          rotateY: xPos * 8,
          rotateX: -yPos * 8,
          duration: 1.5,
          ease: "power2.out",
        });

        // Floating layers
        gsap.to(".parallax-layer", {
          x: xPos * 30,
          y: yPos * 30,
          duration: 2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <main ref={rootRef} className="relative min-h-screen w-full bg-[#030303] overflow-hidden text-white perspective-1000">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          ref={gridRef}
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-3/5 space-y-8">
            <p className="about-badge text-xs font-bold uppercase tracking-[0.5em] text-blue-500">
              [ 01 ] Discover Learnest
            </p>

            <h1 className="text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter">
              {/* Added vertical padding (py-2) to ensure letters aren't clipped while rotating */}
              <div className="overflow-hidden py-2">
                {splitText("DEMOCRATIZING")}
              </div>
              <div className="overflow-hidden py-2  bg-clip-text font-yellow">
                {splitText("AI EDUCATION.")}
              </div>
            </h1>

            <div className="space-y-6 max-w-xl">
              <p className="about-desc text-xl text-white/50 leading-relaxed font-light">
                We bridge the gap between complex neural architectures and 
                practical, day-to-day implementation.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <div className="about-card parallax-layer relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-3xl bg-[#080808] border border-white/10 p-10 backdrop-blur-xl shadow-2xl">
                <h2 className="text-xl font-bold mb-8 text-blue-400 uppercase tracking-widest">Platform Core</h2>
                <ul className="space-y-6">
                  {["Next-Gen Video Tracks", "Neural Revision Guides", "Live Lab Environment"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group/item">
                      <div className="h-[1px] w-6 bg-blue-500/50 group-hover/item:w-10 transition-all duration-300" />
                      <span className="text-white/60 group-hover/item:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="principles-grid grid gap-8 md:grid-cols-3">
          {[
            ["Practical-First", "Execute code while you learn, no theory bloat."],
            ["Adaptive Path", "AI-driven curriculum that evolves with you."],
            ["Global Access", "Built for the next billion developers."]
          ].map(([title, desc], i) => (
            <div key={i} className="principle-card p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
              <div className="mb-4 text-xs font-mono text-blue-500/50">0{i+1}</div>
              <h3 className="text-xl font-bold mb-3 text-white/90">{title}</h3>
              <p className="text-white/40 leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link href="/signup">
            <button className="cta-button relative px-12 py-6 bg-white text-black rounded-full font-black text-xl hover:bg-blue-600 hover:text-white transition-all duration-500 hover:px-16 uppercase shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              Initialize Journey
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}