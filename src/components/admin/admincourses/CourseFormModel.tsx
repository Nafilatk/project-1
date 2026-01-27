'use client';

import { useEffect, useRef } from 'react';
import { Plus, Save, X, Trash2 } from 'lucide-react';
import gsap from 'gsap';

interface CourseFormProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: any;
  categories: any[];
  modules: any[];
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: string, value: any) => void;
  onModuleChange: (moduleIndex: number, field: string, value: any) => void;
  onVideoChange: (moduleIndex: number, videoIndex: number, field: string, value: string) => void;
  onAddModule: () => void;
  onDeleteModule: (moduleIndex: number) => void;
  onAddVideo: (moduleIndex: number) => void;
  onRemoveVideo: (moduleIndex: number, videoIndex: number) => void;
}

export default function CourseForm({
  isOpen,
  isEditing,
  formData,
  categories,
  modules,
  onClose,
  onSave,
  onFormChange,
  onModuleChange,
  onVideoChange,
  onAddModule,
  onDeleteModule,
  onAddVideo,
  onRemoveVideo
}: CourseFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current && isOpen) {
      gsap.from(modalRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "back.out(1.2)"
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-5xl h-[90vh] flex flex-col"
      >
        <div className="shrink-0 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {isEditing ? 'Edit Course' : 'Add New Course'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Course Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  placeholder="Course name"
                  value={formData.name}
                  onChange={e => onFormChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={e => onFormChange('categoryId', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g., 15 hours"
                  value={formData.duration}
                  onChange={e => onFormChange('duration', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level
                </label>
                <select
                  value={formData.level}
                  onChange={e => onFormChange('level', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                placeholder="Course description"
                value={formData.description}
                onChange={e => onFormChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thumbnail URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={formData.thumbnail}
                onChange={e => onFormChange('thumbnail', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Modules Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Course Modules & Videos</h3>
                <button 
                  onClick={onAddModule}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  <Plus size={16} />
                  Add Module
                </button>
              </div>

              <div className="space-y-6">
                {modules.map((module, moduleIndex) => (
                  <div key={module.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Module Title
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Module title"
                            value={module.title}
                            onChange={e => onModuleChange(moduleIndex, 'title', e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {modules.length > 1 && (
                            <button
                              type="button"
                              onClick={() => onDeleteModule(moduleIndex)}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => onAddVideo(moduleIndex)}
                        type="button"
                        className="ml-4 inline-flex items-center gap-1 px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        <Plus size={14} />
                        Add Video
                      </button>
                    </div>

                    {/* Videos in Module */}
                    <div className="space-y-4">
                      {module.videos.map((video: any, videoIndex: number) => (
                        <div key={video.id} className="bg-white dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium text-gray-800 dark:text-white">Video {videoIndex + 1}</h4>
                            <button
                              type="button"
                              onClick={() => onRemoveVideo(moduleIndex, videoIndex)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Video Title *
                              </label>
                              <input
                                type="text"
                                placeholder="Video title"
                                value={video.title}
                                onChange={e => onVideoChange(moduleIndex, videoIndex, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Video URL *
                              </label>
                              <input
                                type="text"
                                placeholder="https://youtube.com/watch?v=..."
                                value={video.videoUrl}
                                onChange={e => onVideoChange(moduleIndex, videoIndex, 'videoUrl', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="shrink-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Save size={20} />
              {isEditing ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}