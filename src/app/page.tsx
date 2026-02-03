"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Background from "@/components/home/Background";
import Hero from "@/components/home/Hero";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Hero Entrance Animation
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
      }, "-=1");

      // 2. Features Scroll Animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });

      // 3. Mouse Parallax and Grid Rotation
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
    <main 
      ref={rootRef} 
      className="relative min-h-screen w-full bg-[#030303] text-white no-scrollbar overflow-x-hidden"
    >
      <Background ref={gridRef} />
      <Hero />
    </main>
  );
}