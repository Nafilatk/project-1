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
    <div className="group relative rounded-2xl p-6 md:p-7 bg-black/60 border border-blue-900/40 shadow-[0_10px_30px_rgba(59,130,246,0.15)] backdrop-blur-md overflow-hidden hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all duration-500 flex items-center justify-between gap-6">
      
      {/* Glow Accent */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl -z-10 blur-sm opacity-0 group-hover:opacity-50 transition-all duration-500" />
      
      <div className="relative z-10 flex items-center gap-6">
        <div className="relative h-16 w-16 rounded-2xl bg-blue-950/60 border-2 border-blue-900/50 group-hover:border-blue-500/70 overflow-hidden transition-all duration-500 group-hover:scale-105">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-black bg-gradient-to-br from-blue-500 to-blue-600 text-transparent bg-clip-text">
              {personalForm?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}
          {/* Avatar Ring Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-blue-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        </div>
        
        <div className="space-y-1">
          <p className="text-base font-bold text-white tracking-tight">
            {personalForm?.name || "Your name"}
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-blue-400/70">
            Student • Premium Member
          </p>
        </div>
      </div>

      <label className="group/upload relative inline-flex cursor-pointer items-center rounded-full border-2 border-blue-500/50 bg-blue-950/50 px-6 py-3 text-sm font-bold text-blue-300 hover:bg-blue-900/70 hover:border-blue-400/70 hover:shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:scale-[1.05] transition-all duration-300 backdrop-blur-sm overflow-hidden">
        <span className="relative z-10 tracking-wide">Upload New Photo</span>
        {/* Button Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 opacity-0 group-hover/upload:opacity-100 transition-opacity duration-300 rounded-full blur-sm" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onAvatarChange}
        />
      </label>

      {/* Card Glare Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl pointer-events-none" />
    </div>
  );
}
