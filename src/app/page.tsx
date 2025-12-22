"use client";

import Link from "next/link";
import PrimaryButton from "./components/buttons";
import SparkleAnimation from "./components/SparkleAnimation";
// import TrendingTracks from "./components/TrendingTrackes";

export default function HomePage() {
  return (
    <div className="w-screen min-h-screen bg-white">
      {/* HERO */}
      <section className="w-screen h-screen bg-white">
        <div className="mx-auto flex h-full max-w-6xl items-center px-3 gap-5">
          <div className="w-full md:w-1/2 space-y-10">
            <h1 className="hero-text text-7xl md:text-7xl font-bold leading-tight text-black">
              Democratizing <br />
              <span className="text-blue-800">AI Education</span>
            </h1>

            <p className="hero-text mt-2 text-gray-600 max-w-xl text-lg">
              High-quality courses and ebooks to help you build real-world
              skills and grow your career with confidence.
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

          <div className="hidden md:block w-full md:w-1/2">
            <SparkleAnimation />
          </div>
        </div>
      </section>
      {/* <TrendingTracks /> */}
    </div>
  );
}
