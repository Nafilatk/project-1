import type { Ebook } from "@/types/ebook"; 

interface EbookCardProps {
  ebook: Ebook;
}

export default function EbookCard({ ebook }: EbookCardProps) {
  return (
    <article className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
      <div className="aspect-3/2 bg-neutral-200">
        <img
          src={ebook.thumbnail}
          alt={ebook.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-sm font-semibold line-clamp-2">
          {ebook.title}
        </h2>

        <p className="text-xs text-neutral-600 line-clamp-2">
          {ebook.description}
        </p>

        <a
          href={ebook.pdfUrl}
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-800 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
        >
          Open PDF
        </a>
        

      </div>
    </article>
  );
}
