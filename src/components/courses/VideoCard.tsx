import { Play, CheckCircle, BookOpen, X, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import { Video } from '@/lib/types/courses';

interface VideoCardProps {
  video: Video;
  isSelected: boolean;
  onSelect: () => void;
}

export default function VideoCard({
  video,
  isSelected,
  onSelect,
}: VideoCardProps) {
  const [showPDF, setShowPDF] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openEbook = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); 
    if (video.ebookUrl) {
      setShowPDF(true);
    }
  };

  return (
    <>
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
        isSelected ? 'bg-blue-900/30 border-l-4 border-blue-500' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            video.isCompleted ? 'bg-green-600' : 'bg-gray-700'
          }`}
        >
          {video.isCompleted ? <CheckCircle size={18} /> : <Play size={18} />}
        </div>

        <div className="flex-1">
          <h4
            className={`font-medium ${
              isSelected ? 'text-blue-300' : 'text-white'
            }`}
          >
            {video.title}
          </h4>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-400">{video.duration}</span>

            {video.ebookUrl && (
              <div
                onClick={openEbook}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                <BookOpen size={14} />
                E-Book
              </div>
            )}
          </div>
        </div>
      </div>
    </button>

    {/* PDF Modal */}
    {showPDF && video.ebookUrl && (
      <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}>
        <div className={`bg-gray-800 rounded-lg flex flex-col ${isFullscreen ? 'w-screen h-screen' : 'w-full h-[90vh] max-w-4xl'}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">{video.title} - E-Book</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-gray-400 hover:text-white p-1"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button
                onClick={() => setShowPDF(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <iframe
            src={`${video.ebookUrl}#toolbar=1`}
            className="flex-1 w-full border-0"
            title={video.title}
          />
        </div>
      </div>
    )}
    </>
  );
}
