"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-6 pt-28 pb-20 md:flex-row md:items-start">
        <div className="w-full md:w-1/2 space-y-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            About learnest.ai
          </p>

          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Democratizing{" "}
            <span className="text-transparent bg-linear-to-r from-blue-400 to-blue-500 bg-clip-text ">AI education</span> 
            for everyone.
          </h1>

          <p className="text-lg md:text-xl text-blue-200 leading-relaxed">
            learnest.ai is a learning platform focused on practical AI,
            full‑stack development, and cyber security. The goal is to make
            advanced topics simple, structured, and project‑based so learners
            can move from basics to real‑world work with confidence.
          </p>

          <p className="text-lg md:text-xl text-blue-200 leading-relaxed">
            Courses, videos, and ebooks are organized by tracks like frontend,
            backend, and security, so you can follow a clear roadmap instead of
            jumping between random tutorials.
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="rounded-3xl bg-black/70 border border-blue-900/40 p-8 backdrop-blur-md shadow-[0_20px_60px_rgba(59,130,246,0.2)]">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
              What you'll find here
            </h2>

            <ul className="space-y-5 text-blue-200">
              <li className="flex gap-4 group">
                <span className="text-blue-400 font-bold text-xl group-hover:scale-110 transition-transform">•</span>
                <span>Structured video courses that take you from fundamentals to
                advanced topics in Python, JavaScript, React, MERN, and more.</span>
              </li>
              <li className="flex gap-4 group">
                <span className="text-blue-400 font-bold text-xl group-hover:scale-110 transition-transform">•</span>
                <span>Ebooks and PDFs attached to each module so you can revise
                concepts offline and keep your own notes.</span>
              </li>
              <li className="flex gap-4 group">
                <span className="text-blue-400 font-bold text-xl group-hover:scale-110 transition-transform">•</span>
                <span>Curated playlists and sidebars to quickly switch between
                development, AI, and cyber security content.</span>
              </li>
              <li className="flex gap-4 group">
                <span className="text-blue-400 font-bold text-xl group-hover:scale-110 transition-transform">•</span>
                <span>A modern, distraction‑free interface designed to keep you
                focused on learning, not searching.</span>
              </li>
            </ul>

            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div className="group rounded-2xl bg-black/80 border border-blue-900/50 px-6 py-6 shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all duration-300 backdrop-blur-md">
                <p className="text-3xl md:text-4xl font-black text-blue-400 group-hover:scale-110 transition-transform">
                  10k+
                </p>
                <p className="text-blue-300 font-medium mt-2 tracking-wide">Learners</p>
              </div>
              <div className="group rounded-2xl bg-black/80 border border-blue-900/50 px-6 py-6 shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all duration-300 backdrop-blur-md">
                <p className="text-3xl md:text-4xl font-black text-blue-400 group-hover:scale-110 transition-transform">
                  50+
                </p>
                <p className="text-blue-300 font-medium mt-2 tracking-wide">Countries</p>
              </div>
              <div className="group rounded-2xl bg-black/80 border border-blue-900/50 px-6 py-6 shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all duration-300 backdrop-blur-md">
                <p className="text-3xl md:text-4xl font-black text-blue-400 group-hover:scale-110 transition-transform">
                  100+
                </p>
                <p className="text-blue-300 font-medium mt-2 tracking-wide">Resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-3xl font-black mb-12 text-white tracking-tight">Core principles</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group rounded-2xl border border-blue-900/40 bg-black/70 p-8 shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.3)] hover:-translate-y-3 transition-all duration-500 backdrop-blur-md">
            <h3 className="mb-4 text-xl font-black text-white group-hover:text-blue-400 transition-colors">
              Practical first
            </h3>
            <p className="text-blue-300 leading-relaxed">
              Every course is built around real projects, not only theory, so
              you end up with work you can actually show.
            </p>
          </div>
          <div className="group rounded-2xl border border-blue-900/40 bg-black/70 p-8 shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.3)] hover:-translate-y-3 transition-all duration-500 backdrop-blur-md">
            <h3 className="mb-4 text-xl font-black text-white group-hover:text-blue-400 transition-colors">
              Clear structure
            </h3>
            <p className="text-blue-300 leading-relaxed">
              Sidebars, playlists, and ebooks are tied together so you always
              know what to learn next.
            </p>
          </div>
          <div className="group rounded-2xl border border-blue-900/40 bg-black/70 p-8 shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.3)] hover:-translate-y-3 transition-all duration-500 backdrop-blur-md">
            <h3 className="mb-4 text-xl font-black text-white group-hover:text-blue-400 transition-colors">
              Accessible to all
            </h3>
            <p className="text-blue-300 leading-relaxed">
              Content is designed to be beginner‑friendly while still giving
              enough depth for advanced learners to grow.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
