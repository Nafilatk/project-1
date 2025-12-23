import { FormEvent, ChangeEvent } from "react";
import PrimaryButton from "@/components/buttons";
import type { ForgotForm } from "@/types/profile";

interface SecurityFormProps {
  forgotForm: ForgotForm;
  isResettingPassword: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function SecurityForm({
  forgotForm,
  isResettingPassword,
  onChange,
  onSubmit,
}: SecurityFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 text-sm">
      <h2 className="text-sm font-semibold text-slate-900">Reset password</h2>
      <p className="text-xs text-slate-500">Update your password using your account email.</p>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={forgotForm.email}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            New password
          </label>
          <input
            type="password"
            name="newPassword"
            value={forgotForm.newPassword}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={forgotForm.confirmPassword}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-1">
        <PrimaryButton type="submit" disabled={isResettingPassword}>
          {isResettingPassword ? "Updating..." : "Update password"}
        </PrimaryButton>
      </div>
    </form>
  );
}

