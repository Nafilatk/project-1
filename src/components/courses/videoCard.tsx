import type { Video } from "@/types/video"; 

interface VideoCardProps {
  video: Video;
  courseName?: string;
}

export default function VideoCard({ video, courseName }: VideoCardProps) {
  return (
    <a
      href={video.url}
      rel="noopener noreferrer"
      className="video-card group block overflow-hidden rounded-2xl border border-blue-900/40 bg-black/70 shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-2 hover:border-blue-600/70 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:bg-blue-950/80"
    >
      <div className="relative aspect-video overflow-hidden bg-blue-950/50">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-all duration-400 group-hover:opacity-100" />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-white leading-tight">
          {video.title}
        </h3>
        {courseName && (
          <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-blue-400 border border-blue-900/50 inline-block px-2 py-1 rounded-full bg-blue-950/50">
            {courseName}
          </p>
        )}
      </div>
    </a>
  );
}