"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pt-28 pb-16 md:flex-row md:items-start">
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            About learnest.ai
          </p>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Democratizing{" "}
            <span className="text-blue-400">AI education</span> for everyone.
          </h1>

          <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
            learnest.ai is a learning platform focused on practical AI,
            full‑stack development, and cyber security. The goal is to make
            advanced topics simple, structured, and project‑based so learners
            can move from basics to real‑world work with confidence.
          </p>

          <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
            Courses, videos, and ebooks are organized by tracks like frontend,
            backend, and security, so you can follow a clear roadmap instead of
            jumping between random tutorials.
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="rounded-3xl bg-linear-to-br from-blue-600/20 via-blue-400/10 to-sky-400/10 border border-neutral-800 p-6 md:p-8 shadow-[0_0_40px_rgba(37,99,235,0.25)]">
            <h2 className="text-lg font-semibold mb-4">
              What you&apos;ll find here
            </h2>

            <ul className="space-y-4 text-sm text-neutral-200">
              <li>
                • Structured video courses that take you from fundamentals to
                advanced topics in Python, JavaScript, React, MERN, and more.
              </li>
              <li>
                • Ebooks and PDFs attached to each module so you can revise
                concepts offline and keep your own notes.
              </li>
              <li>
                • Curated playlists and sidebars to quickly switch between
                development, AI, and cyber security content.
              </li>
              <li>
                • A modern, distraction‑free interface designed to keep you
                focused on learning, not searching.
              </li>
            </ul>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs md:text-sm">
              <div className="rounded-2xl bg-neutral-900/70 px-3 py-3">
                <p className="text-lg md:text-xl font-bold text-blue-400">
                  10k+
                </p>
                <p className="text-neutral-400">Learners</p>
              </div>
              <div className="rounded-2xl bg-neutral-900/70 px-3 py-3">
                <p className="text-lg md:text-xl font-bold text-blue-400">
                  50+
                </p>
                <p className="text-neutral-400">Countries</p>
              </div>
              <div className="rounded-2xl bg-neutral-900/70 px-3 py-3">
                <p className="text-lg md:text-xl font-bold text-blue-400">
                  100+
                </p>
                <p className="text-neutral-400">Resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="text-xl font-semibold mb-4">Core principles</h2>
        <div className="grid gap-4 md:grid-cols-3 text-sm text-neutral-300">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
            <h3 className="mb-2 text-sm font-semibold text-neutral-50">
              Practical first
            </h3>
            <p>
              Every course is built around real projects, not only theory, so
              you end up with work you can actually show.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
            <h3 className="mb-2 text-sm font-semibold text-neutral-50">
              Clear structure
            </h3>
            <p>
              Sidebars, playlists, and ebooks are tied together so you always
              know what to learn next.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
            <h3 className="mb-2 text-sm font-semibold text-neutral-50">
              Accessible to all
            </h3>
            <p>
              Content is designed to be beginner‑friendly while still giving
              enough depth for advanced learners to grow.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
