"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-line", {
        y: 100,
        skewY: 7,
        stagger: 0.1,
        duration: 1.5,
        opacity: 0,
      })
      .from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, "-=1")
      .from(".cta-button", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      }, "-=0.5");

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".parallax-layer", {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(gridRef.current, {
          rotateY: xPos * 0.2,
          rotateX: -yPos * 0.2,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="relative min-h-screen w-full bg-[#030303] overflow-hidden text-white">
      
      <div className="absolute inset-0 z-0">
        <div 
          ref={gridRef}
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            perspective: '1000px'
          }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <div className="max-w-5xl text-center">
          
          <div className="parallax-layer overflow-hidden">
            <span className="inline-block text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 hero-description">
              The Future of Learning is Generative
            </span>
          </div>

          <h1 ref={heroTextRef} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            <div className="overflow-hidden">
              <span className="inline-block hero-line">MASTER IN ANY</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block hero-line text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-indigo-400">
                STACK.
              </span>
            </div>
          </h1>

          <p className="hero-description mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Harness the power of Learnest.ai to create custom learning paths, 
            automated modules, and neural-driven insights tailored to your pace.
          </p>

        </div>
      </section>

      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className={`parallax-layer absolute hidden lg:block w-px h-20 bg-linear-to-b from-blue-500/50 to-transparent`}
          style={{
            left: `${20 * i + 10}%`,
            top: `${(i % 2 === 0 ? 30 : 60)}%`,
            opacity: 0.3
          }}
        />
      ))}

    </main>
  );
}