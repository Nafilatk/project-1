import { ChangeEvent } from "react";
import type { PersonalForm } from "@/types/profile"

interface AvatarSectionProps {
  personalForm: PersonalForm | null;
  avatarPreview: string | null;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AvatarSection({
  personalForm,
  avatarPreview,
  onAvatarChange,
}: AvatarSectionProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
              {personalForm?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {personalForm?.name || "Your name"}
          </p>
          <p className="text-xs text-slate-500">Student • Premium Member</p>
        </div>
      </div>

      <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
        Upload New Photo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onAvatarChange}
        />
      </label>
    </div>
  );
}
