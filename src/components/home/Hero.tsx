export default function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
      <div className="max-w-5xl text-center">
        <div className="parallax-layer overflow-hidden">
          <span className="inline-block text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 hero-description">
            The Future of Learning is Generative
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
          <div className="overflow-hidden">
            <span className="inline-block hero-line">MASTER IN ANY</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block hero-line text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-indigo-400">
              STACK.
            </span>
          </div>
        </h1>

        <p className="hero-description mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          Harness the power of Learnest.ai to create custom learning paths, 
          automated modules, and neural-driven insights tailored to your pace.
        </p>
      </div>
    </section>
  );
}