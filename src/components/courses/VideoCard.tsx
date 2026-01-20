import { Play, CheckCircle } from 'lucide-react';
import { Video } from '@/lib/types/courses'
interface VideoCardProps {
  video: Video;
  isSelected: boolean;
  onSelect: () => void;
}

export default function VideoCard({ video, isSelected, onSelect }: VideoCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
        isSelected ? 'bg-blue-900/30 border-l-4 border-blue-500' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          video.isCompleted ? 'bg-green-600' : 'bg-gray-700'
        }`}>
          {video.isCompleted ? (
            <CheckCircle size={18} />
          ) : (
            <Play size={18} />
          )}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-medium ${isSelected ? 'text-blue-300' : 'text-white'}`}>
            {video.title}
          </h4>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-400">{video.duration}</span>
            {video.isCompleted && (
              <span className="text-xs text-green-400 flex items-center gap-1">
                <CheckCircle size={12} />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}