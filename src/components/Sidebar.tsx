"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

type Course = { id: number; name: string };

export default function CourseSidebar({
  search,
  onSearchChange,
  selectedCourse,
  onSelectCourse,
}: any) {
  const [courses, setCourses] = useState<Course[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:3001/courses")
      .then((r) => r.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  const filteredCourses = useMemo(() => 
    courses.filter((c) => c.name.toLowerCase().includes(search.toLowerCase().trim())),
    [courses, search]
  );

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.15;
    const y = (clientY - top - height / 2) * 0.15;

    gsap.to(currentTarget, {
      x: x,
      y: y,
      rotateX: -y * 0.5,
      rotateY: x * 0.5,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <aside className="h-screen w-80 bg-black text-white flex flex-col p-6 gap-8 border-r border-blue-900/30 perspective-[1000px]">
      {/* Liquid Search Input */}
      <motion.div 
        initial={false}
        animate={search ? { width: "100%" } : { width: "90%" }}
        className="relative mx-auto h-12 w-full"
      >
        <input
          type="text"
          placeholder="Jump to..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-full bg-blue-950/80 border border-blue-800/50 rounded-2xl px-11 text-sm outline-none focus:border-blue-400/70 focus:bg-blue-900/90 transition-all font-medium text-white placeholder-white/50"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/70 text-lg">
          {search ? "✦" : "◈"}
        </span>
      </motion.div>

      {/* Floating Header */}
      <div className="flex items-center justify-between px-2">
        <span className="text-[10px] font-black tracking-[4px] uppercase text-blue-400/50">Modules</span>
        <div className="h-1px flex-1 mx-4 bg-linear-to-r from-blue-400/30 to-transparent" />
      </div>

      {/* 3D Deck List - Scrollbar Hidden */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide py-2">
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, rotateX: -45, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
              transition={{ 
                delay: i * 0.04, 
                type: "spring", 
                stiffness: 150, 
                damping: 20 
              }}
              className="origin-bottom"
            >
              <button
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => onSelectCourse(selectedCourse === course.id ? null : course.id)}
                className={`group relative w-full rounded-2xl p-5 text-left transition-all duration-500 ${
                  selectedCourse === course.id
                    ? "bg-white text-black shadow-[0_20px_40px_rgba(59,130,246,0.3)] scale-[1.02]"
                    : "bg-black/50 text-blue-200 border border-blue-900/50 hover:border-blue-600/70 hover:text-white hover:bg-blue-950/50 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {selectedCourse === course.id && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute -inset-1px bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl -z-10 blur-sm opacity-60"
                  />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className={`text-[9px] mb-1 font-mono uppercase tracking-widest ${selectedCourse === course.id ? "text-black/50" : "text-blue-400/40"}`}>
                      Level {String(i + 1).padStart(2, '0')}
                    </p>
                    <h4 className="text-[15px] font-bold leading-tight">
                      {course.name}
                    </h4>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:rotate-90 ${
                    selectedCourse === course.id ? "border-blue-500/80 bg-blue-500/20" : "border-blue-400/50"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${selectedCourse === course.id ? "bg-blue-500" : "bg-blue-300/60"}`} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-linear-to-br from-blue-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Glassmorphic Footer */}
      <div className="mt-auto p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-blue-900/40">
        <div className="flex justify-between items-center text-[10px] font-mono text-blue-300/80">
          <span>{filteredCourses.length} LOADED</span>
          <span className="text-blue-400 font-bold uppercase tracking-wider">System Ready</span>
        </div>
      </div>
    </aside>
  );
}
