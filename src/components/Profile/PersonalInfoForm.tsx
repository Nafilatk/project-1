import { FormEvent, ChangeEvent } from "react";
import PrimaryButton from "@/components/buttons";
import type { PersonalForm } from "@/types/profile";

interface PersonalInfoFormProps {
  personalForm: PersonalForm | null;
  isSavingPersonal: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function PersonalInfoForm({
  personalForm,
  isSavingPersonal,
  onChange,
  onSubmit,
}: PersonalInfoFormProps) {
  if (!personalForm) return null;

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-sm">
      <div className="group relative">
        <h2 className="text-base font-bold text-white tracking-tight">
          Basic Information
        </h2>
        <div className="absolute -inset-1 bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 -z-10" />
      </div>

      {/* Full Name */}
      <div className="group relative">
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-400/70">
          Full Name
        </label>
        <div className="relative">
          <input
            type="text"
            name="name"
            value={personalForm.name}
            onChange={onChange}
            className="group relative w-full rounded-2xl border border-blue-900/50 bg-blue-950/60 px-4 py-3 text-sm font-medium text-white placeholder-blue-400/50 focus:border-blue-500/70 focus:bg-blue-900/80 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 backdrop-blur-sm hover:border-blue-800/70 hover:shadow-[0_5px_15px_rgba(59,130,246,0.1)]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur pointer-events-none" />
        </div>
      </div>

      {/* Email */}
      <div className="group relative">
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-400/70">
          Email Address (read-only)
        </label>
        <input
          type="email"
          name="email"
          value={personalForm.email}
          readOnly
          className="group relative w-full cursor-not-allowed rounded-2xl border border-blue-900/40 bg-blue-950/40 px-4 py-3 text-sm font-medium text-blue-200 opacity-70 hover:opacity-90 transition-all duration-300 backdrop-blur-sm"
        />
      </div>

      {/* Phone */}
      <div className="group relative">
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-400/70">
          Phone
        </label>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={personalForm.phone}
            onChange={onChange}
            placeholder="+91 98765 43210"
            className="group relative w-full rounded-2xl border border-blue-900/50 bg-blue-950/60 px-4 py-3 text-sm font-medium text-white placeholder-blue-400/50 focus:border-blue-500/70 focus:bg-blue-900/80 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 backdrop-blur-sm hover:border-blue-800/70 hover:shadow-[0_5px_15px_rgba(59,130,246,0.1)]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur pointer-events-none" />
        </div>
      </div>

      {/* Bio */}
      <div className="group relative">
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-400/70">
          Bio / Headline
        </label>
        <div className="relative">
          <textarea
            name="bio"
            value={personalForm.bio}
            onChange={onChange}
            rows={4}
            placeholder="Tell us a little about yourself..."
            className="group relative w-full rounded-2xl border border-blue-900/50 bg-blue-950/60 px-4 py-3 text-sm font-medium text-white placeholder-blue-400/50 resize-vertical focus:border-blue-500/70 focus:bg-blue-900/80 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 backdrop-blur-sm hover:border-blue-800/70 hover:shadow-[0_5px_15px_rgba(59,130,246,0.1)]"
          />
          <div className="absolute inset-0 bg-linear-to-rv from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur pointer-events-none" />
        </div>
      </div>

      <div className="pt-2">
        <PrimaryButton type="submit" disabled={isSavingPersonal}>
          {isSavingPersonal ? "Saving..." : "Save personal info"}
        </PrimaryButton>
      </div>
    </form>
  );
}
