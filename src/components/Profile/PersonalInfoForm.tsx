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
    <form onSubmit={onSubmit} className="space-y-5 text-sm">
      <h2 className="text-sm font-semibold text-slate-900">Basic Information</h2>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={personalForm.name}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          Email Address (read-only)
        </label>
        <input
          type="email"
          name="email"
          value={personalForm.email}
          readOnly
          className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-600"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={personalForm.phone}
          onChange={onChange}
          placeholder="+91 98765 43210"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          Bio / Headline
        </label>
        <textarea
          name="bio"
          value={personalForm.bio}
          onChange={onChange}
          rows={3}
          placeholder="Tell us a little about yourself..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="pt-1">
        <PrimaryButton type="submit" disabled={isSavingPersonal}>
          {isSavingPersonal ? "Saving..." : "Save personal info"}
        </PrimaryButton>
      </div>
    </form>
  );
}
