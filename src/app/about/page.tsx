"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#333333]">
      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-6 pt-28 pb-20 md:flex-row md:items-start">
        <div className="w-full md:w-1/2 space-y-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0056D2]">
            About learnest.ai
          </p>

          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Democratizing{" "}
            <span className="text-[#0056D2]">AI education</span> 
            for everyone. 
          </h1>

          <p className="text-lg md:text-xl text-[#333333] leading-relaxed opacity-90">
            learnest.ai is a learning platform focused on practical AI,
            full‑stack development, and cyber security. The goal is to make
            advanced topics simple, structured, and project‑based so learners
            can move from basics to real‑world work with confidence.
          </p>

          <p className="text-lg md:text-xl text-[#333333] leading-relaxed opacity-90">
            Courses, videos, and ebooks are organized by tracks like frontend,
            backend, and security, so you can follow a clear roadmap instead of
            jumping between random tutorials.
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="rounded-3xl bg-white border border-[#66A6FF]/30 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#333333] mb-6 tracking-tight">
              What you'll find here
            </h2>

            <ul className="space-y-5 text-[#333333]">
              <li className="flex gap-4 group hover:bg-[#F7F8FA] p-3 rounded-lg transition-colors">
                <span className="text-[#0056D2] font-bold text-xl group-hover:scale-110 transition-transform">•</span>
                <span className="opacity-90">Structured video courses that take you from fundamentals to
                advanced topics in Python, JavaScript, React, MERN, and more.</span>
              </li>
              <li className="flex gap-4 group hover:bg-[#F7F8FA] p-3 rounded-lg transition-colors">
                <span className="text-[#0056D2] font-bold text-xl group-hover:scale-110 transition-transform">•</span>
                <span className="opacity-90">Ebooks and PDFs attached to each module so you can revise
                concepts offline and keep your own notes.</span>
              </li>
              <li className="flex gap-4 group hover:bg-[#F7F8FA] p-3 rounded-lg transition-colors">
                <span className="text-[#0056D2] font-bold text-xl group-hover:scale-110 transition-transform">•</span>
                <span className="opacity-90">Curated playlists and sidebars to quickly switch between
                development, AI, and cyber security content.</span>
              </li>
              <li className="flex gap-4 group hover:bg-[#F7F8FA] p-3 rounded-lg transition-colors">
                <span className="text-[#0056D2] font-bold text-xl group-hover:scale-110 transition-transform">•</span>
                <span className="opacity-90">A modern, distraction‑free interface designed to keep you
                focused on learning, not searching.</span>
              </li>
            </ul>

            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div className="group rounded-2xl bg-white border border-[#66A6FF]/30 px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300">
                <p className="text-3xl md:text-4xl font-black text-[#0056D2] group-hover:scale-110 transition-transform">
                  10k+
                </p>
                <p className="text-[#333333] font-medium mt-2 tracking-wide opacity-90">Learners</p>
              </div>
              <div className="group rounded-2xl bg-white border border-[#66A6FF]/30 px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300">
                <p className="text-3xl md:text-4xl font-black text-[#0056D2] group-hover:scale-110 transition-transform">
                  50+
                </p>
                <p className="text-[#333333] font-medium mt-2 tracking-wide opacity-90">Countries</p>
              </div>
              <div className="group rounded-2xl bg-white border border-[#66A6FF]/30 px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300">
                <p className="text-3xl md:text-4xl font-black text-[#0056D2] group-hover:scale-110 transition-transform">
                  100+
                </p>
                <p className="text-[#333333] font-medium mt-2 tracking-wide opacity-90">Resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-3xl font-black mb-12 text-[#333333] tracking-tight">Core principles</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group rounded-2xl border border-[#66A6FF]/30 bg-white p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#66A6FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#66A6FF]/20 transition-colors">
              <span className="text-[#0056D2] font-bold">1</span>
            </div>
            <h3 className="mb-4 text-xl font-bold text-[#333333] group-hover:text-[#0056D2] transition-colors">
              Practical first
            </h3>
            <p className="text-[#333333] leading-relaxed opacity-90">
              Every course is built around real projects, not only theory, so
              you end up with work you can actually show.
            </p>
          </div>
          <div className="group rounded-2xl border border-[#66A6FF]/30 bg-white p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#66A6FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#66A6FF]/20 transition-colors">
              <span className="text-[#0056D2] font-bold">2</span>
            </div>
            <h3 className="mb-4 text-xl font-bold text-[#333333] group-hover:text-[#0056D2] transition-colors">
              Clear structure
            </h3>
            <p className="text-[#333333] leading-relaxed opacity-90">
              Sidebars, playlists, and ebooks are tied together so you always
              know what to learn next.
            </p>
          </div>
          <div className="group rounded-2xl border border-[#66A6FF]/30 bg-white p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#66A6FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#66A6FF]/20 transition-colors">
              <span className="text-[#0056D2] font-bold">3</span>
            </div>
            <h3 className="mb-4 text-xl font-bold text-[#333333] group-hover:text-[#0056D2] transition-colors">
              Accessible to all
            </h3>
            <p className="text-[#333333] leading-relaxed opacity-90">
              Content is designed to be beginner‑friendly while still giving
              enough depth for advanced learners to grow.
            </p>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-[#0056D2] text-white rounded-xl font-semibold text-lg hover:bg-[#0046B2] transition-colors shadow-sm hover:shadow-md">
            Start Learning Now
          </button>
          <p className="mt-4 text-[#333333] opacity-80">
            Join thousands of students building practical skills
          </p>
        </div>
      </section>

    </main>
  );
}