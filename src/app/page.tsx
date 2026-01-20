"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COURSES = [
  { id: 1, title: "Neural Networks 101", category: "AI & Data", color: "#3b82f6" },
  { id: 2, title: "Advanced Typography", category: "Design", color: "#ec4899" },
  { id: 3, title: "Quantum Computing", category: "Physics", color: "#8b5cf6" },
  { id: 4, title: "Ethical Hacking", category: "Security", color: "#10b981" },
];

export default function EduPlatform() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. HERO TEXT REVEAL
    gsap.from(".hero-title span", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
    });

    // 2. COUNTER ANIMATION
    const counters = gsap.utils.toArray(".counter-val");
    counters.forEach((counter: any) => {
      const target = parseInt(counter.innerText);
      gsap.fromTo(counter, 
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
          }
        }
      );
    });

    // 3. HORIZONTAL COURSE SCROLL
    const sections = gsap.utils.toArray(".course-card");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-scroll-wrapper",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + (container.current?.offsetWidth || 0),
      }
    });

    // 4. PARALLAX ELEMENTS
    gsap.to(".floating-shape", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        scrub: true,
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#050505] text-white overflow-x-hidden">
      

      {/* --- HERO SECTION --- */}
      <section className="hero-section min-h-screen flex flex-col justify-center px-10 relative">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-blue-600/20 blur-[120px] floating-shape rounded-full" />
        
        <h1 className="hero-title text-[10vw] font-black leading-none uppercase">
          <span className="block">Unleash</span>
          <span className="block text-blue-600">Cognitive</span>
          <span className="block">Potential.</span>
        </h1>
        
        <div className="mt-12 flex flex-col md:flex-row gap-20 items-end">
          <p className="max-w-md text-neutral-400 text-lg leading-relaxed">
            A radical new approach to digital learning. Master high-demand skills through 
            immersive, project-based kinetic experiences.
          </p>
          <div className="flex gap-12">
            <div>
              <div className="text-4xl font-bold counter-val">450</div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold counter-val">120</div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">Mentors</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HORIZONTAL COURSES --- */}
      <section className="horizontal-scroll-wrapper h-screen overflow-hidden bg-neutral-900">
        <div className="flex h-full items-center px-[10vw] gap-20">
          <div className="min-w-[40vw]">
            <h2 className="text-6xl font-bold">Featured<br/><span className="text-blue-500">Pathways</span></h2>
            <p className="text-neutral-500 mt-4">Scroll to explore our flagship programs.</p>
          </div>
          
          {COURSES.map((course) => (
            <div 
              key={course.id} 
              className="course-card min-w-[350px] h-[500px] rounded-3xl p-8 flex flex-col justify-between border border-white/10 group cursor-pointer relative overflow-hidden"
              style={{ backgroundColor: '#111' }}
            >
              <div className="z-10">
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full">
                  {course.category}
                </span>
                <h3 className="text-3xl font-bold mt-6 group-hover:text-blue-400 transition-colors">{course.title}</h3>
              </div>
              <div className="z-10 flex justify-between items-end">
                <div className="text-neutral-500 text-sm">12 Modules<br/>Senior Level</div>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold">→</div>
              </div>
              {/* Background Glow */}
              <div 
                className="absolute -bottom-20 -right-20 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity" 
                style={{ backgroundColor: course.color }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-40 flex flex-col items-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <button className="relative px-20 py-10 bg-black rounded-full text-4xl font-black border border-white/10">
            START LEARNING
          </button>
        </div>
        <p className="mt-10 text-neutral-500 font-mono">Join 50,000+ students globally</p>
      </section>
    </div>
  );
}