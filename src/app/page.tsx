"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="pt-24">

      {/* ---------------- Hero Section ---------------- */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Learn Skills That Matter
          <span className="text-blue-600">.</span>
        </h1>

        <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
          High-quality courses and ebooks to help you build real-world skills
          and grow your career with confidence.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/courses"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explore Courses
          </Link>

          <Link
            href="/ebook"
            className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition"
          >
            Browse Ebooks
          </Link>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h3 className="text-xl font-semibold">🎓 Expert Content</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Learn from industry-focused courses designed with real projects.
          </p>
        </div>

        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h3 className="text-xl font-semibold">📚 Free Ebooks</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Download ebooks to learn anytime, anywhere at your own pace.
          </p>
        </div>

        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h3 className="text-xl font-semibold">⚡ Easy Learning</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Beginner-friendly explanations with step-by-step guidance.
          </p>
        </div>
      </section>

      {/* ---------------- CTA Section ---------------- */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Start Learning Today
          </h2>
          <p className="text-gray-600 mt-3">
            Join thousands of learners and build your future skills now.
          </p>

          <Link
            href="/signup"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Free Account
          </Link>
        </div>
      </section>

    </div>
  );
}
