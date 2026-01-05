import type { Ebook } from "@/types/ebook"; 

interface EbookCardProps {
  ebook: Ebook;
}

export default function EbookCard({ ebook }: EbookCardProps) {
  return (
    <article className="group relative w-full rounded-2xl p-6 text-left transition-all duration-500 bg-black/50 border border-blue-900/50 hover:border-blue-600/70 hover:bg-blue-950/50 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
      
      {/* Visual Accent Glow */}
      <div className="absolute -inset-1px bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl -z-10 blur-sm opacity-0 group-hover:opacity-60 transition-all duration-500" />

      <div className="relative z-10">
        {/* Thumbnail - Smaller aspect like course preview */}
        <div className="relative w-full h-32 mb-4 overflow-hidden rounded-xl bg-blue-950/60 group-hover:scale-105 transition-transform duration-500">
          <img
            src={ebook.thumbnail}
            alt={ebook.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div>
            <p className="text-[9px] mb-1 font-mono uppercase tracking-widest text-blue-400/60">
              Ebook
            </p>
            <h2 className="text-[15px] font-bold leading-tight text-white line-clamp-2">
              {ebook.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-xs text-blue-300 line-clamp-2 leading-relaxed">
            {ebook.description}
          </p>

          {/* PDF Button - Styled like course icon */}
        <a
          href={ebook.pdfUrl}
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:from-black hover:to-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.4)] transition-all duration-300 border border-blue-500/50 hover:border-blue-400/70 group-hover:scale-[1.02]"
        >
          Open PDF
        </a>
        </div>
      </div>

      {/* Internal Card Glare - Same as course card */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none" />
    </article>
  );
}