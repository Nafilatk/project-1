"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pt-28 pb-16 md:flex-row md:items-start">
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
            About learnest.ai
          </p>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Democratizing{" "}
            <span className="text-blue-600">AI education</span> for everyone.
          </h1>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            learnest.ai is a learning platform focused on practical AI,
            full‑stack development, and cyber security. The goal is to make
            advanced topics simple, structured, and project‑based so learners
            can move from basics to real‑world work with confidence.
          </p>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Courses, videos, and ebooks are organized by tracks like frontend,
            backend, and security, so you can follow a clear roadmap instead of
            jumping between random tutorials.
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border border-blue-200 p-6 md:p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What you&apos;ll find here
            </h2>

            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Structured video courses that take you from fundamentals to
                advanced topics in Python, JavaScript, React, MERN, and more.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Ebooks and PDFs attached to each module so you can revise
                concepts offline and keep your own notes.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Curated playlists and sidebars to quickly switch between
                development, AI, and cyber security content.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>A modern, distraction‑free interface designed to keep you
                focused on learning, not searching.</span>
              </li>
            </ul>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-white border border-blue-100 px-4 py-4 shadow-sm">
                <p className="text-2xl md:text-3xl font-bold text-blue-600">
                  10k+
                </p>
                <p className="text-gray-600 font-medium mt-1">Learners</p>
              </div>
              <div className="rounded-xl bg-white border border-blue-100 px-4 py-4 shadow-sm">
                <p className="text-2xl md:text-3xl font-bold text-blue-600">
                  50+
                </p>
                <p className="text-gray-600 font-medium mt-1">Countries</p>
              </div>
              <div className="rounded-xl bg-white border border-blue-100 px-4 py-4 shadow-sm">
                <p className="text-2xl md:text-3xl font-bold text-blue-600">
                  100+
                </p>
                <p className="text-gray-600 font-medium mt-1">Resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">Core principles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Practical first
            </h3>
            <p className="text-gray-600">
              Every course is built around real projects, not only theory, so
              you end up with work you can actually show.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Clear structure
            </h3>
            <p className="text-gray-600">
              Sidebars, playlists, and ebooks are tied together so you always
              know what to learn next.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Accessible to all
            </h3>
            <p className="text-gray-600">
              Content is designed to be beginner‑friendly while still giving
              enough depth for advanced learners to grow.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}