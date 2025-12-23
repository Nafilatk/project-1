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
    <div className="space-y-5 text-sm">
      <h2 className="text-sm font-semibold text-slate-900">Account actions</h2>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-900">Sign out</p>
        <p className="mt-1 text-xs text-slate-500">
          Log out from this device. You can log back in at any time.
        </p>
        <button
          onClick={onLogout}
          className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-medium text-red-700">Delete account</p>
        <p className="mt-1 text-xs text-red-600">
          This action is permanent and will remove your profile, enrolled courses, and progress.
        </p>
        <button
          onClick={onDeleteAccount}
          disabled={isDeleting}
          className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:border-red-200 disabled:text-red-300"
        >
          {isDeleting ? "Deleting..." : "Delete account"}
        </button>
      </div>
    </div>
  );
}
