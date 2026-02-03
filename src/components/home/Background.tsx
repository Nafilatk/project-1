"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Background = forwardRef<HTMLDivElement>((_, ref) => {
  // Mouse tracking for the "Perspective Warp" effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -0.5 to 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
      {/* 1. Animated Gradient Glows */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[140px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* 2. Interactive 3D Grid */}
      <div className="absolute inset-0 [perspective:1200px] flex items-center justify-center">
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY }}
          className="relative w-[150%] h-[150%] opacity-40 transition-opacity duration-1000"
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
            }}
          />
        </motion.div>
      </div>

      {/* 3. Floating Data Shards (Parallax) */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: Math.random() * 100, opacity: 0 }}
          animate={{ 
            y: [0, -40, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          className="absolute w-[2px] h-[100px] bg-gradient-to-t from-blue-500/50 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* 4. Scanning Line Effect */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      />

      {/* 5. Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
    </div>
  );
});

Background.displayName = "Background";
export default Background;