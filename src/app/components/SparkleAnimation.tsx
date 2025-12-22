"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const SparkleAnimation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  const gridSize = 100; 

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".sparkle", { opacity: 0, scale: 0 });
      gsap.set(logoRef.current, { opacity: 0, filter: "blur(10px)" });

      const tl = gsap.timeline();

      tl.to(".sparkle", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: {
          each: 0.02,
          from: "center",
          grid: [10, 10],
        },
        ease: "back.out(1.7)",
      })
        .to(
          ".sparkle",
          {
            opacity: 0.4,
            repeat: -1,
            yoyo: true,
            duration: 0.8,
            stagger: { amount: 1, from: "random" },
          },
          "-=0.5"
        )
        .to(
          logoRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power4.inOut",
          },
          "-=1"
        )
        .to(logoRef.current, {
          opacity: 0.1,
          rotate:360,
          repeat: -1,
          yoyo: true,
          duration: 4,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-105 w-full items-center justify-center bg-black text-white rounded-3xl overflow-hidden"
    >
      <div ref={logoRef} className="z-10 absolute">
        <Image src="/logo.svg" alt="logo" width={220} height={220} />
      </div>

      <div className="grid grid-cols-10 gap-2 w-64 h-64">
        {Array.from({ length: gridSize }).map((_, i) => (
          <div
            key={i}
            className="sparkle w-full h-full bg-blue-400 rounded-sm shadow-[0_0_8px_#facc15]"
          />
        ))}
      </div>
    </div>
  );
};

export default SparkleAnimation;
