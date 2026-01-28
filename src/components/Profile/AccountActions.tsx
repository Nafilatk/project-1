"use client";

interface AccountActionsProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
  isDeleting: boolean;
}

export default function AccountActions({
  onLogout,
  onDeleteAccount,
  isDeleting,
}: AccountActionsProps) {
  return (
    <div className="space-y-6 text-sm">
      {/* Section Title */}
      <div className="group relative">
        <h1 className="text-lg font-bold text-blue-950 tracking-tight">
          Account actions
        </h1>
      </div>

      {/* Logout Card */}
      <div className="group relative rounded-2xl border border-blue-900/40 bg-black/60 p-6 hover:bg-blue-950/50 transition-all duration-500 backdrop-blur-md overflow-hidden">
        <div className="relative z-10">
          <p className="text-base font-bold text-blue-200 mb-2">
            Sign out
          </p>
          <p className="text-sm text-blue-300 mb-4 leading-relaxed">
            Log out from this device. You can log back in at any time.
          </p>

          <button
            onClick={onLogout}
            className="group/btn relative inline-flex items-center justify-center rounded-full border-2 border-blue-500/50 bg-blue-950/50 px-6 py-3 text-sm font-bold text-blue-300 hover:bg-blue-900/70 hover:border-blue-400/70 hover:shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:scale-[1.05] transition-all duration-300 backdrop-blur-sm overflow-hidden"
          >
            <span className="relative z-10 tracking-wide">
              Logout
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full blur-sm" />
          </button>
        </div>

        {/* Card Glare */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl pointer-events-none" />
      </div>

      {/* Delete Account Card */}
      <div className="group relative rounded-2xl border border-red-500/40 bg-red-950/60 p-6 shadow-[0_10px_30px_rgba(239,68,68,0.15)] hover:shadow-[0_20px_50px_rgba(239,68,68,0.25)] hover:bg-red-900/50 transition-all duration-500 backdrop-blur-md overflow-hidden">
        <div className="relative z-10">
          <p className="text-base font-bold text-red-300 mb-2">
            Delete account
          </p>
          <p className="text-sm text-red-400 mb-4 leading-relaxed">
            This action is permanent and will remove your profile,
            enrolled courses, and progress.
          </p>

          <button
            onClick={onDeleteAccount}
            disabled={isDeleting}
            className="group/btn relative inline-flex items-center justify-center rounded-full border-2 border-red-500/50 bg-red-950/50 px-6 py-3 text-sm font-bold text-red-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none hover:bg-red-900/70 hover:border-red-400/70 hover:shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:scale-[1.05] transition-all duration-300 backdrop-blur-sm overflow-hidden"
          >
            <span className="relative z-10 tracking-wide">
              {isDeleting ? "Deleting..." : "Delete account"}
            </span>

            {!isDeleting && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full blur-sm" />
            )}
          </button>
        </div>

        {/* Card Glare */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
}
