"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function KineticLanding() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. KINETIC TEXT MARQUEE (Moves on Scroll)
    const marqueeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".marquee-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    marqueeTl.to(".marquee-inner", { xPercent: -50, ease: "none" });

    // 2. LENS REVEAL (Circular Clip-Path)
    const lensImages = gsap.utils.toArray(".lens-container");
    lensImages.forEach((img: any) => {
      gsap.fromTo(img.querySelector(".lens-img"), 
        { clipPath: "circle(0% at 50% 50%)", scale: 1.5 },
        {
          clipPath: "circle(70% at 50% 50%)",
          scale: 1,
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 3. PERSPECTIVE STACKING CARDS
    const stackCards = gsap.utils.toArray(".stack-card");
    stackCards.forEach((card: any, i) => {
      gsap.to(card, {
        scale: 1 - i * 0.05,
        y: i * 40, // Stacks cards as you scroll
        scrollTrigger: {
          trigger: card,
          start: "top 10%",
          endTrigger: ".stack-container",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });
    });

    // 4. FLOATING MAGNETIC DOTS (Background)
    const dots = gsap.utils.toArray(".bg-dot");
    dots.forEach((dot: any) => {
      gsap.to(dot, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#0a0a0a] text-white selection:bg-blue-600 selection:text-white">
      
      {/* SECTION 1: KINETIC HERO */}
      <section className="h-[120vh] flex flex-col justify-center items-center overflow-hidden relative">
        {/* Ambient background dots */}
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bg-dot absolute w-1 h-1 bg-blue-500/30 rounded-full" 
               style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
        ))}

        <div className="z-10 text-center">
          <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter mix-blend-difference">
            BEYOND<br/>
            <span className="text-transparent border-t border-b border-white px-4">LIMITS</span>
          </h1>
          <p className="mt-8 text-neutral-400 font-mono tracking-widest uppercase text-sm">
            Crafting Digital Transcendence / 2025
          </p>
        </div>

        {/* Floating Perspective Image */}
        <div className="lens-container absolute bottom-[-10%] right-[10%] w-[30vw] aspect-square group">
          <div className="lens-img w-full h-full bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070')] bg-cover bg-center rounded-full" />
        </div>
      </section>

      {/* SECTION 2: THE MARQUEE */}
      <section className="marquee-section py-20 border-y border-white/10 overflow-hidden whitespace-nowrap bg-blue-600 text-white">
        <div className="marquee-inner flex text-[10vw] font-black uppercase leading-none gap-20">
          <span>Push the boundaries • </span>
          <span>Redefine the possible • </span>
          <span>Push the boundaries • </span>
          <span>Redefine the possible • </span>
        </div>
      </section>

      {/* SECTION 3: STACKING REVEAL */}
      <section className="stack-container py-40 px-6 max-w-5xl mx-auto space-y-[20vh]">
        <h2 className="text-center text-5xl font-bold mb-20">Design Philosophy</h2>
        
        <div className="stack-card h-[60vh] bg-neutral-900 border border-white/10 rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden relative group">
          <div className="text-6xl font-black opacity-10">01</div>
          <div className="max-w-md">
            <h3 className="text-4xl font-bold mb-4">Precision</h3>
            <p className="text-neutral-400 text-lg">Every pixel serves a purpose. We eliminate the noise to find the essence of your brand.</p>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-3xl group-hover:bg-blue-600/40 transition-all" />
        </div>

        <div className="stack-card h-[60vh] bg-neutral-900 border border-white/10 rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden">
          <div className="text-6xl font-black opacity-10">02</div>
          <div className="max-w-md">
            <h3 className="text-4xl font-bold mb-4">Velocity</h3>
            <p className="text-neutral-400 text-lg">Speed is a feature. Our interfaces respond instantly to human intent.</p>
          </div>
        </div>

        <div className="stack-card h-[60vh] bg-blue-600 border border-white/10 rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden">
          <div className="text-6xl font-black opacity-20">03</div>
          <div className="max-w-md">
            <h3 className="text-4xl font-bold mb-4 text-white">Innovation</h3>
            <p className="text-blue-100 text-lg">We don't follow trends; we engineer them through rigorous creative testing.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: KINETIC FOOTER */}
      <footer className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-[20vw] font-black tracking-tighter leading-none text-center opacity-5 select-none absolute">
          PROJECTS
        </div>
        <button className="px-16 py-8 rounded-full border border-white text-2xl font-bold hover:bg-white hover:text-black transition-all duration-500 z-10 group">
          WORK WITH US <span className="inline-block group-hover:translate-x-4 transition-transform">→</span>
        </button>
      </footer>
    </div>
  );
}