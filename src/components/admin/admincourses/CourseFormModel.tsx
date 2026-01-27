'use client';

import {
  Plus,
  Trash2,
  Save,
  X
} from 'lucide-react';

export default function CourseFormModal(props: any) {
  const {
    setFormOpen,
    editingCourse,

    name, setName,
    description, setDescription,
    categoryId, setCategoryId,
    duration, setDuration,
    level, setLevel,
    thumbnail, setThumbnail,

    modules, setModules,
    categories,

    courseDetails,
    fetchAll,
  } = props;

  /* ================= MODULE FUNCTIONS ================= */

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: Date.now(),
        title: `Module ${modules.length + 1}`,
        videos: [],
      },
    ]);
  };

  const deleteModule = (moduleIndex: number) => {
    if (modules.length <= 1) {
      alert('At least one module is required');
      return;
    }
    if (!confirm('Are you sure you want to delete this module?')) return;

    const updated = [...modules];
    updated.splice(moduleIndex, 1);
    setModules(updated);
  };

  const addVideo = (moduleIndex: number) => {
    const updated = [...modules];
    updated[moduleIndex].videos.push({
      id: Date.now(),
      title: '',
      thumbnail: '',
      duration: '',
      videoUrl: '',
      ebookUrl: '',
      description: '',
      isCompleted: false,
      order: updated[moduleIndex].videos.length + 1,
    });
    setModules(updated);
  };

  const removeVideo = (moduleIndex: number, videoIndex: number) => {
    const updated = [...modules];
    updated[moduleIndex].videos.splice(videoIndex, 1);
    setModules(updated);
  };

  const updateModuleTitle = (moduleIndex: number, value: string) => {
    const updated = [...modules];
    updated[moduleIndex].title = value;
    setModules(updated);
  };

  const updateVideo = (
    moduleIndex: number,
    videoIndex: number,
    field: string,
    value: string
  ) => {
    const updated = [...modules];
    // @ts-ignore
    updated[moduleIndex].videos[videoIndex][field] = value;
    setModules(updated);
  };

  /* ================= SAVE COURSE ================= */

  const saveCourse = async () => {
    try {
      let courseId = editingCourse?.id;

      const courseData = {
        name,
        description,
        categoryId,
        duration,
        level,
        thumbnail: thumbnail || '/assets/courses/default-thumb.jpg',
      };

      if (editingCourse) {
        await fetch(`http://localhost:3001/courses/${editingCourse.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData),
        });
      } else {
        const res = await fetch('http://localhost:3001/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData),
        });
        const newCourse = await res.json();
        courseId = newCourse.id;
      }

      const existingDetail = courseDetails.find(
        (cd: any) => cd.courseId === courseId
      );

      const detailData = {
        courseId,
        modules,
      };

      if (existingDetail) {
        await fetch(
          `http://localhost:3001/courseDetails/${existingDetail.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(detailData),
          }
        );
      } else {
        await fetch('http://localhost:3001/courseDetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detailData),
        });
      }

      setFormOpen(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Failed to save course');
    }
  };

  /* ================= JSX ================= */

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="shrink-0 p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <button
              onClick={() => setFormOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Course Name" />
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
              <option value="">Select category</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration" />
            <select value={level} onChange={e => setLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
          <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="Thumbnail URL" />

          {/* MODULES */}
          <div>
            <button onClick={addModule} className="mb-4 flex items-center gap-2">
              <Plus size={16} /> Add Module
            </button>

            {modules.map((module: any, mi: number) => (
              <div key={module.id} className="border p-4 mb-4 rounded">
                <input
                  value={module.title}
                  onChange={e => updateModuleTitle(mi, e.target.value)}
                />

                <button onClick={() => deleteModule(mi)}>Delete Module</button>

                <button onClick={() => addVideo(mi)}>Add Video</button>

                {module.videos.map((video: any, vi: number) => (
                  <div key={video.id} className="border p-3 mt-2">
                    <input
                      value={video.title}
                      onChange={e => updateVideo(mi, vi, 'title', e.target.value)}
                      placeholder="Video title"
                    />
                    <input
                      value={video.videoUrl}
                      onChange={e => updateVideo(mi, vi, 'videoUrl', e.target.value)}
                      placeholder="Video URL"
                    />
                    <button onClick={() => removeVideo(mi, vi)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={() => setFormOpen(false)}>Cancel</button>
          <button onClick={saveCourse} className="flex items-center gap-2">
            <Save size={18} />
            {editingCourse ? 'Update Course' : 'Create Course'}
          </button>
        </div>

      </div>
    </div>
  );
}
