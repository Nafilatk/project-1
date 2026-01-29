"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-badge", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".about-title", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.from(".about-desc", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-card",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-list-item", {
        scrollTrigger: {
          trigger: ".about-card",
          start: "top 75%",
        },
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".about-stat", {
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.7,
        ease: "back.out(1.6)",
      });
      gsap.from(".principle-card", {
        scrollTrigger: {
          trigger: ".principles",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".about-cta", {
        scrollTrigger: {
          trigger: ".about-cta",
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-[#F7F8FA] text-[#333333]"
    >
      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-6 pt-28 pb-20 md:flex-row md:items-start">
        <div className="w-full md:w-1/2 space-y-8">
          <p className="about-badge text-xs font-bold uppercase tracking-[0.25em] text-[#0056D2]">
            About learnest.ai
          </p>

          <h1 className="about-title text-4xl md:text-5xl font-black leading-tight">
            Democratizing{" "}
            <span className="text-[#0056D2]">AI education</span> for everyone.
          </h1>

          <p className="about-desc text-lg md:text-xl leading-relaxed opacity-90">
            learnest.ai is a learning platform focused on practical AI,
            full-stack development, and cyber security.
          </p>

          <p className="about-desc text-lg md:text-xl leading-relaxed opacity-90">
            Courses, videos, and ebooks are organized by tracks like frontend,
            backend, and security.
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="about-card rounded-3xl bg-white border border-[#66A6FF]/30 p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">
              What you'll find here
            </h2>

            <ul className="space-y-5">
              {[
                "Structured video courses from basics to advanced.",
                "Ebooks and PDFs for offline revision.",
                "Curated playlists across AI and security.",
                "A distraction-free modern interface.",
              ].map((text, i) => (
                <li
                  key={i}
                  className="about-list-item flex gap-4 p-3 rounded-lg"
                >
                  <span className="text-[#0056D2] font-bold text-xl">•</span>
                  <span className="opacity-90">{text}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      <section className="principles mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-3xl font-black mb-12 tracking-tight">
          Core principles
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Practical first", "Built around real projects."],
            ["Clear structure", "Always know what to learn next."],
            ["Accessible to all", "Beginner friendly, depth for pros."],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="principle-card rounded-2xl border border-[#66A6FF]/30 bg-white p-8 shadow-sm"
            >
              <h3 className="mb-4 text-xl font-bold">{title}</h3>
              <p className="opacity-90">{desc}</p>
            </div>
          ))}
        </div>

        <div className="about-cta mt-16 text-center">

<Link href="/signup">
  <button className="px-8 py-4 bg-[#0056D2] text-white rounded-xl font-semibold text-lg hover:bg-[#0046B2] transition-colors shadow-sm hover:shadow-md">
    SignUp to Start
  </button>
</Link>

          <p className="mt-4 opacity-80">
            Join thousands of students building practical skills
          </p>
        </div>
      </section>
    </main>
  );
}
