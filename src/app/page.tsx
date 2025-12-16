"use client";

import Link from "next/link";
import PrimaryButton from "./components/buttons";

export default function HomePage() {
  return (
    <div className="w-screen h-screen    bg-white">
      <section className="w-screen h-screen bg-white pt-24">
        <div className="mx-auto flex h-full max-w-6xl items-center px-6 gap-5">
          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="hero-text text-4xl md:text-6xl font-bold leading-tight text-black">
              Democratizing{" "} <br />
              <span className="text-blue-800">AI Education</span>
            </h1>

            <p className="hero-text mt-2 text-gray-600 max-w-xl text-lg">
              High-quality courses and ebooks to help you build real-world skills
              and grow your career with confidence.
            </p>

            <div className="hero-text mt-6 flex flex-wrap gap-4">
    <PrimaryButton href="/courses">
    Explore Course
    </PrimaryButton>
   

            <PrimaryButton href="/ebook" variant="ghost">
            Browse Ebook
            </PrimaryButton>

            </div>
          </div>
        </div>
      </section>
      {/* ---------------- Features ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 bg-blue-900">
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
