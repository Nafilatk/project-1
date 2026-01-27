import { Layers, Play, BookOpen } from 'lucide-react';

export default function CourseModulesView({ modules }: any) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
      {modules.map((module: any) => (
        <div key={module.id} className="bg-gray-50 p-4 rounded-lg border">
          <h5 className="font-medium flex items-center gap-2">
            <Layers size={16} />
            {module.title}
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            {module.videos.map((video: any) => (
              <div key={video.id} className="bg-white p-3 rounded border">
                <h6 className="font-medium text-sm">{video.title}</h6>
                {video.ebookUrl && (
                  <a className="text-blue-600 text-xs flex items-center gap-1">
                    <BookOpen size={12} /> Ebook
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
