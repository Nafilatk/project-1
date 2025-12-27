"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(
    () => {
      /* MINIMAL BACKGROUND GRADIENT ANIMATION */
      gsap.to(".bg-gradient", {
        backgroundPosition: "50% 0%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      /* BACKGROUND GRID PULSE */
      gsap.to(".bg-grid", {
        opacity: 0.3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* FLOATING PARTICLES */
      gsap.to(".floating-particle", {
        x: (index) => (index % 2 === 0 ? 20 : -20),
        y: (index) => (index % 3 === 0 ? 15 : -15),
        duration: 8 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      /* HERO SECTION */
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-title span", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          ".hero-sub",
          {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        .from(
          ".hero-btn",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.5"
        );

      /* FEATURES SECTION */
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        scale: 0.8,
        stagger: {
          amount: 1,
          from: "center",
        },
        duration: 0.8,
        ease: "back.out(1.2)",
      });

      /* FLOW SECTION */
      const flowTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flow-section",
          start: "top 70%",
          scrub: 0.5,
        },
      });

      flowTl.from(".flow-step", {
        x: -100,
        opacity: 0,
        stagger: {
          each: 0.2,
          from: "start",
        },
        duration: 0.6,
        ease: "power3.out",
      });

      /* STATS COUNTER */
      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 80%",
        onEnter: () => {
          gsap.from(".stat-number", {
            innerText: 0,
            duration: 2,
            ease: "power3.out",
            snap: { innerText: 1 },
            stagger: 0.3,
          });
        },
      });

      /* TESTIMONIALS */
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 75%",
          scrub: 0.8,
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.2)",
      });

      /* CTA */
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      ctaTl
        .from(".cta-text", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".cta-button",
          {
            y: 40,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.3"
        );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="relative overflow-hidden">
      {/* MINIMAL BACKGROUND ANIMATIONS */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* ANIMATED GRADIENT BACKGROUND */}
        <div className="absolute inset-0 bg-gradient bg-gradient-to-br from-white via-blue-50 to-white opacity-90"></div>
        
        {/* SUBTLE GRID PATTERN */}
        <div className="absolute inset-0 bg-grid opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
        
        {/* FLOATING PARTICLES */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`floating-particle absolute rounded-full ${
              i % 4 === 0 ? 'bg-blue-100' : 
              i % 4 === 1 ? 'bg-blue-50' : 
              i % 4 === 2 ? 'bg-blue-200' : 'bg-white'
            }`}
            style={{
              width: `${4 + (i % 3)}px`,
              height: `${4 + (i % 3)}px`,
              top: `${15 + (i * 7) % 70}%`,
              left: `${10 + (i * 13) % 80}%`,
              opacity: 0.4,
            }}
          ></div>
        ))}
        
        {/* ANIMATED LINES */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="hero-title text-5xl md:text-7xl font-bold max-w-4xl">
          Learn. Practice. Build.
          <span className="block text-blue-600 mt-3">
            A Complete Learning Platform
          </span>
        </h1>

        <p className="hero-sub text-neutral-600 text-lg md:text-xl mt-6 max-w-2xl">
          Courses, ebooks, roadmaps, tasks and real-world projects — structured
          to make learning clear and practical.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="hero-btn mt-10 px-10 py-4 rounded-xl bg-black text-white hover:bg-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold text-lg transform hover:-translate-y-1"
        >
          Start Learning Journey
        </button>
      </section>

      {/* FEATURES */}
      <section className="features-section py-32 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Feature title="Structured Courses" />
          <Feature title="Ebooks & Resources" />
          <Feature title="Roadmaps & Tasks" />
        </div>
      </section>

      {/* FLOW */}
      <section className="flow-section py-32 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          How Learning Works
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          <FlowStep text="Learn concepts with guided courses" />
          <FlowStep text="Understand deeply using ebooks" />
          <FlowStep text="Follow a clear roadmap" />
          <FlowStep text="Practice daily with tasks" />
          <FlowStep text="Build real-world projects" />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <Stat number={10000} label="Active Learners" />
          <Stat number={500} label="Courses" />
          <Stat number={1000} label="Projects Built" />
          <Stat number={98} label="Satisfaction" suffix="%" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section py-32 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          What Learners Say
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Testimonial
            quote="This platform transformed my learning journey completely."
            author="Alex Johnson"
            role="Developer"
          />
          <Testimonial
            quote="The structured approach made complex topics easy."
            author="Maria Garcia"
            role="Data Scientist"
          />
          <Testimonial
            quote="Best investment in my career development."
            author="David Chen"
            role="Designer"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta py-32 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <h2 className="cta-text text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Skills?
        </h2>
        
        <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
          Join thousands of successful learners today.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="cta-button px-12 py-5 bg-white text-black rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-blue-50"
        >
          Start Free Trial
        </button>
      </section>
    </div>
  );
}

/* COMPONENTS */

function Feature({ title }: { title: string }) {
  return (
    <div className="feature-card bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-neutral-600 mt-3">
        Designed for clarity, consistency and real progress.
      </p>
    </div>
  );
}

function FlowStep({ text }: { text: string }) {
  return (
    <div className="flow-step bg-white border border-neutral-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
      {text}
    </div>
  );
}

function Stat({
  number,
  label,
  suffix = "",
}: {
  number: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="stat-number text-5xl font-bold mb-2">
        {number}
        {suffix}
      </div>
      <div className="text-neutral-300">{label}</div>
    </div>
  );
}

function Testimonial({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="testimonial-card bg-white border border-blue-100 rounded-2xl p-8 shadow-lg">
      <div className="text-4xl text-blue-600 mb-4">"</div>
      <p className="text-lg text-black mb-6">{quote}</p>
      <div>
        <div className="font-bold text-black">{author}</div>
        <div className="text-blue-600 text-sm">{role}</div>
      </div>
    </div>
  );
}