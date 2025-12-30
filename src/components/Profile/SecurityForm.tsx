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
    <form onSubmit={onSubmit} className="space-y-6 text-sm">
      <div className="group relative">
        <h2 className="text-base font-bold text-white tracking-tight">
          Reset Password
        </h2>
        <div className="absolute -inset-1 bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 -z-10" />
      </div>
      
      <p className="text-sm text-blue-300 leading-relaxed">
        Update your password using your account email.
      </p>

      <div className="group relative">
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-400/70">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={forgotForm.email}
            onChange={onChange}
            className="group relative w-full rounded-2xl border border-blue-900/50 bg-blue-950/60 px-4 py-3 text-sm font-medium text-white placeholder-blue-400/50 focus:border-blue-500/70 focus:bg-blue-900/80 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 backdrop-blur-sm hover:border-blue-800/70 hover:shadow-[0_5px_15px_rgba(59,130,246,0.1)]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur pointer-events-none" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="group relative">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-400/70">
            New Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="newPassword"
              value={forgotForm.newPassword}
              onChange={onChange}
            />
            <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur pointer-events-none" />
          </div>
        </div>

        <div className="group relative">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-400/70">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={forgotForm.confirmPassword}
              onChange={onChange}
              className="group relative w-full rounded-2xl border border-blue-900/50 bg-blue-950/60 px-4 py-3 text-sm font-medium text-white placeholder-blue-400/50 focus:border-blue-500/70 focus:bg-blue-900/80 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 backdrop-blur-sm hover:border-blue-800/70 hover:shadow-[0_5px_15px_rgba(59,130,246,0.1)]"
            />
            <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <PrimaryButton type="submit" disabled={isResettingPassword}>
          {isResettingPassword ? "Updating..." : "Update Password"}
        </PrimaryButton>
      </div>
    </form>
  );
}
